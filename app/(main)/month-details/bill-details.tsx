import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";

import { removeParticipantFromBill } from "@/redux/features/billSlice/removeParticipantFromBill";
import { selectBillByMonthAndIndex } from "@/redux/features/billSlice/selectBillByMonthAndIndex";
import { toggleParticipantPaid } from "@/redux/features/billSlice/billSlice";
import ParticipantCard from "@/components/ParticipantCard/ParticipantCard";
import { AppDispatch } from "@/redux/store/store";

const BillDetails = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { month, billIndex } = useLocalSearchParams();

  const bill = useSelector(
    selectBillByMonthAndIndex(month as string, Number(billIndex))
  );

  const participants = bill?.participants || [];

  const handleTogglePaid = (participantName: string) => {
    dispatch(
      toggleParticipantPaid({
        month: month as string,
        billIndex: Number(billIndex),
        participantName,
      })
    );
  };

  const handleRemoveParticipant = (participantName: string) => {
    dispatch(
      removeParticipantFromBill({
        month: month as string,
        billIndex: Number(billIndex),
        participant: participantName,
      })
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={{ marginHorizontal: 16, flex: 1 }}>
        <TouchableOpacity
          style={{ marginBottom: 16 }}
          onPress={() => router.back()}
        >
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
        <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 16 }}>
          {month} Bill Details
        </Text>
        <View
          style={{
            alignItems: "center",
            borderRadius: 8,
          }}
        >
          <FontAwesome name="money" size={46} color="black" />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={[styles.textStyle, { fontWeight: "semibold" }]}>
            Bill type
          </Text>
          <Text style={styles.textStyle}>{bill?.description}</Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={[styles.textStyle, { fontWeight: "semibold" }]}>
            Full Amount{" "}
          </Text>
          <Text style={styles.textStyle}>${bill?.amount}</Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={[styles.textStyle, { fontWeight: "semibold" }]}>
            Per Person
          </Text>
          <Text style={styles.textStyle}>
            $
            {participants.length > 0
              ? (Number(bill?.amount) / participants.length).toFixed(2)
              : "0.00"}
          </Text>
        </View>
        <FlatList
          data={participants}
          keyExtractor={(item, idx) => `${item.name}-${idx}`}
          renderItem={({ item }) => {
            // Support both string and object formats
            const name = typeof item === "string" ? item : item?.name;
            const paid = typeof item === "object" && item?.paid;
            return (
              <ParticipantCard
                name={name}
                paid={paid}
                onTogglePaid={() => handleTogglePaid(name)}
                onRemove={() => handleRemoveParticipant(name)}
              />
            );
          }}
          style={{ marginTop: 8 }}
          ListHeaderComponent={
            <Text style={styles.textStyle}>Participants</Text>
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default BillDetails;

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 25,
  },
  /// Participant list styles
  participantItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  participantText: {
    fontSize: 16,
    color: "#333",
  },
  removeText: {
    color: "#ff4444",
    fontSize: 14,
    paddingVertical: 8,
  },
  paidText: {
    textDecorationLine: "line-through",
    color: "#4caf50",
  },
});
