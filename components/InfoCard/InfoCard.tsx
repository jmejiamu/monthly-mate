import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { Bill, deleteBill } from "@/redux/features/billSlice/billSlice";
import ProgressBar from "../ProgressBar/ProgressBar";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store/store";
import { MaterialIcons } from "@expo/vector-icons";

interface InfoCardProps {
  item: Bill;
  index: number;
  year: string;
}

const InfoCard = (props: InfoCardProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { item, index, year } = props;
  return (
    <View style={styles.monthCard}>
      <View style={[styles.containerRow, { alignItems: "center" }]}>
        <View style={{ flex: 1 }}>
          <View style={[styles.containerRow]}>
            <Text style={styles.billAmount} numberOfLines={1}>
              {item.description}
            </Text>
            <Text style={styles.billAmount}>${item.amount}</Text>
          </View>
          {item.participants.length > 0 && (
            <View style={[styles.containerRow]}>
              <Text style={styles.billSplit}>Split per person</Text>
              <Text style={[styles.billSplit]}>
                $
                {item.participants.length > 0
                  ? (Number(item.amount) / item.participants.length).toFixed(2)
                  : "0.00"}
              </Text>
            </View>
          )}
          {item.participants.length > 0 && (
            <Text style={styles.billParticipants}>
              Participants:{" "}
              {item.participants
                .map((p: any) => (typeof p === "string" ? p : p.name))
                .join(", ")}
            </Text>
          )}
        </View>
        <View
          style={{
            marginLeft: "auto",
            alignItems: "flex-end",
            paddingLeft: 15,
          }}
        >
          <MaterialIcons name="arrow-forward-ios" size={24} color="#333" />
        </View>
      </View>

      <View
        style={{
          height: StyleSheet.hairlineWidth,
          backgroundColor: "#eee",
          marginVertical: 10,
        }}
      />
      {/* Progress Bar */}
      {item.participants.length > 0 && (
        <ProgressBar
          paidCount={
            item.participants.filter(
              (p: any) => typeof p === "object" && p.paid
            ).length
          }
          total={item.participants.length}
        />
      )}
      <TouchableOpacity
        onPress={() =>
          dispatch(
            deleteBill({
              month: String(item.month),
              billIndex: index,
              year: String(year),
            })
          )
        }
        style={item.participants.length > 0 ? { marginTop: 10 } : {}}
      >
        <Text style={{ color: "red", fontWeight: "bold" }}>Remove Bill</Text>
      </TouchableOpacity>
    </View>
  );
};

export default InfoCard;

const styles = StyleSheet.create({
  containerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  // monthCard
  monthCard: {
    paddingVertical: 18,
    paddingHorizontal: 24,
    borderRadius: 16,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    // backgroundColor: "#fcf7e6",
    backgroundColor: "white",
  },
  // Bill details styles
  billAmount: {
    fontSize: 18,
    fontWeight: "bold",
    // color: "#ffffffff",
    color: "#333",
  },
  billDescription: {
    fontSize: 16,
    color: "#555",
    marginBottom: 2,
  },
  billParticipants: {
    fontSize: 16,
    color: "#333",
    marginBottom: 2,
    fontStyle: "italic",
    fontWeight: "600",
  },
  billSplit: {
    fontSize: 16,
    color: "#333",
    fontWeight: "600",
    marginTop: 6,
  },
});
