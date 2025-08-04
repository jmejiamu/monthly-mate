import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { removeParticipantFromBill } from "@/redux/features/billSlice/removeParticipantFromBill";
import { useSelector } from "react-redux";
import { selectBillByMonthAndIndex } from "@/redux/features/billSlice/selectBillByMonthAndIndex";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store/store";

const BillDetails = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { month, billIndex } = useLocalSearchParams();
  const bill = useSelector(
    selectBillByMonthAndIndex(month as string, Number(billIndex))
  );
  const participants = bill?.participants || [];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={{ marginHorizontal: 16, flex: 1 }}>
        <Text>Bill Details</Text>
        <Text>Month: {month}</Text>
        <Text>Description: {bill?.description}</Text>
        <Text>Amount: ${bill?.amount}</Text>
        <FlatList
          data={participants}
          keyExtractor={(item, idx) => item + idx}
          renderItem={({ item }) => (
            <View style={styles.participantItem}>
              <Text style={styles.participantText}>{item}</Text>
              <TouchableOpacity
                onPress={() =>
                  dispatch(
                    removeParticipantFromBill({
                      month: month as string,
                      billIndex: Number(billIndex),
                      participant: item,
                    })
                  )
                }
              >
                <Text style={styles.removeText}>Remove</Text>
              </TouchableOpacity>
            </View>
          )}
          style={{ marginTop: 8 }}
        />
      </View>
    </SafeAreaView>
  );
};

export default BillDetails;

const styles = StyleSheet.create({
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
});
