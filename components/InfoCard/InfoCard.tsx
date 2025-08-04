import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { Bill } from "@/redux/features/billSlice/billSlice";
import ProgressBar from "../ProgressBar/ProgressBar";
import { colorsTheme } from "@/theme/colors";

interface InfoCardProps {
  item: Bill;
  index: number;
}

const InfoCard = (props: InfoCardProps) => {
  const { item, index } = props;
  return (
    <View
      style={[
        {
          padding: 10,
          backgroundColor: colorsTheme[index % colorsTheme.length],
        },
        styles.monthCard,
      ]}
    >
      <View style={styles.containerRow}>
        <Text style={styles.billAmount}>{item.description}</Text>
        <Text style={styles.billAmount}>${item.amount}</Text>
      </View>
      <View style={styles.containerRow}>
        <Text style={styles.billSplit}>Split per person:</Text>
        <Text style={styles.billSplit}>
          $
          {item.participants.length > 0
            ? (Number(item.amount) / item.participants.length).toFixed(2)
            : "0.00"}
        </Text>
      </View>
      <Text style={styles.billParticipants}>
        Participants:{" "}
        {item.participants
          .map((p: any) => (typeof p === "string" ? p : p.name))
          .join(", ")}
      </Text>
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
  },
  // Bill details styles
  billAmount: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#222",
  },
  billDescription: {
    fontSize: 16,
    color: "#555",
    marginBottom: 2,
  },
  billParticipants: {
    fontSize: 16,
    color: "#666",
    marginBottom: 2,
    fontStyle: "italic",
    fontWeight: "600",
  },
  billSplit: {
    fontSize: 16,
    // color: "#008060",
    fontWeight: "600",
    marginTop: 6,
  },
});
