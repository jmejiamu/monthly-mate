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
import { removeParticipantFromBill } from "@/redux/features/billSlice/removeParticipantFromBill";
import { toggleParticipantPaid } from "@/redux/features/billSlice/billSlice";
import { useSelector } from "react-redux";
import { selectBillByMonthAndIndex } from "@/redux/features/billSlice/selectBillByMonthAndIndex";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store/store";
import { AntDesign, FontAwesome } from "@expo/vector-icons";

const BillDetails = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { month, billIndex } = useLocalSearchParams();
  const bill = useSelector(
    selectBillByMonthAndIndex(month as string, Number(billIndex))
  );
  // Support both string and object formats for participants
  const participants = bill?.participants || [];

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
        <Text style={{ fontSize: 18, fontWeight: "600" }}>
          {bill?.description}
        </Text>
        <Text style={{ fontSize: 18, fontWeight: "600" }}>
          Full Amount ${bill?.amount}
        </Text>
        <Text style={{ fontSize: 18, fontWeight: "600" }}>
          Per Person $
          {participants.length > 0
            ? (Number(bill?.amount) / participants.length).toFixed(2)
            : "0.00"}
        </Text>
        <FlatList
          data={participants}
          keyExtractor={(item, idx) => {
            if (typeof item === "string") return `${item}-${idx}`;
            if (item && typeof item === "object" && "name" in item)
              return `${item.name}-${idx}`;
            return `${idx}`;
          }}
          renderItem={({ item }) => {
            // Support both string and object formats
            const name = typeof item === "string" ? item : item?.name;
            const paid = typeof item === "object" && item?.paid;
            return (
              <View style={styles.participantItem}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    flex: 1,
                  }}
                >
                  <TouchableOpacity
                    onPress={() =>
                      name &&
                      dispatch(
                        toggleParticipantPaid({
                          month: month as string,
                          billIndex: Number(billIndex),
                          participantName: name,
                        })
                      )
                    }
                    accessibilityLabel={
                      paid ? "Mark as unpaid" : "Mark as paid"
                    }
                  >
                    <FontAwesome
                      name={paid ? "check-circle" : "circle-o"}
                      size={22}
                      color={paid ? "#4caf50" : "#bbb"}
                    />
                  </TouchableOpacity>
                  <View style={{ marginLeft: 12 }} />
                  <Text
                    style={[styles.participantText, paid && styles.paidText]}
                  >
                    {name}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() =>
                    name &&
                    dispatch(
                      removeParticipantFromBill({
                        month: month as string,
                        billIndex: Number(billIndex),
                        participant: name,
                      })
                    )
                  }
                >
                  <Text style={styles.removeText}>Remove</Text>
                </TouchableOpacity>
              </View>
            );
          }}
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
  paidText: {
    textDecorationLine: "line-through",
    color: "#4caf50",
  },
});
