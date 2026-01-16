import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Modal } from "react-native";
import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { z } from "zod";

import { removeParticipantFromBill } from "@/redux/features/billSlice/removeParticipantFromBill";
import { selectBillByYearMonthAndIndex } from "@/redux/features/billSlice/selectBillByMonthAndIndex";
import {
  addParticipantToBill,
  setAmount,
  setDescription,
  toggleParticipantPaid,
  updateBill,
} from "@/redux/features/billSlice/billSlice";
import ParticipantCard from "@/components/ParticipantCard/ParticipantCard";
import { AppDispatch } from "@/redux/store/store";
import { Controller, useForm } from "react-hook-form";
import BaseButton from "@/components/BaseButton/BaseButton";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  participant: z.string().min(2).max(100),
});

type FormData = {
  participant: string;
};

const BillDetails = () => {
  // ...existing code...
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { year, month, billIndex } = useLocalSearchParams();
  const {
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      participant: "",
    },
  });

  const bill = useSelector(
    selectBillByYearMonthAndIndex(
      year as string,
      month as string,
      Number(billIndex),
    ),
  );
  const [editModalVisible, setEditModalVisible] = React.useState(false);
  const [editedDescription, setEditedDescription] = React.useState("");
  const [editedAmount, setEditedAmount] = React.useState("");
  // const {
  //   setAmount,
  //   setDescription,
  // } = require("@/redux/features/billSlice/billSlice");
  const editMode = editModalVisible;
  React.useEffect(() => {
    if (editMode && bill) {
      setEditedDescription(bill.description || "");
      setEditedAmount(bill.amount?.toString() || "");
    }
  }, [editMode, bill]);

  const participants = bill?.participants || [];

  const handleTogglePaid = (participantName: string) => {
    dispatch(
      toggleParticipantPaid({
        year: year as string,
        month: month as string,
        billIndex: Number(billIndex),
        participantName,
      }),
    );
  };

  const handleRemoveParticipant = (participantName: string) => {
    dispatch(
      removeParticipantFromBill({
        year: year as string,
        month: month as string,
        billIndex: Number(billIndex),
        participant: participantName,
      }),
    );
  };

  const handleAddParticipant = () => {
    const participantName = watch("participant");
    if (participantName && participantName.trim() !== "") {
      dispatch(
        addParticipantToBill({
          year: year as string,
          month: month as string,
          billIndex: Number(billIndex),
          participantName: participantName.trim(),
        }),
      );
      setValue("participant", ""); // Clear input after adding
    }
  };

  const MY_NAME = "Me";

  const handleAddMe = () => {
    if (
      !participants.some(
        (p: any) => (typeof p === "string" ? p : p.name) === MY_NAME,
      )
    ) {
      dispatch(
        addParticipantToBill({
          year: year as string,
          month: month as string,
          billIndex: Number(billIndex),
          participantName: MY_NAME,
        }),
      );
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={{ marginHorizontal: 16, flex: 1 }}>
        <TouchableOpacity
          style={{ marginBottom: 16 }}
          onPress={() => router.back()}
        >
          <AntDesign name="left-circle" size={30} color="black" />
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 16,
          }}
        >
          <Text style={{ fontSize: 24, fontWeight: "bold" }}>
            {month} Bill Details
          </Text>
          <TouchableOpacity
            onPress={() => setEditModalVisible(true)}
            style={{ marginLeft: 12 }}
            accessibilityLabel="Edit Bill"
          >
            <FontAwesome name="edit" size={24} color="#007AFF" />
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
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

        {/* Edit Bill Modal */}
        <Modal
          visible={editModalVisible}
          animationType="fade"
          transparent={true}
          onRequestClose={() => setEditModalVisible(false)}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0,0,0,0.3)",
            }}
          >
            <View
              style={{
                backgroundColor: "#fff",
                padding: 24,
                borderRadius: 16,
                minWidth: 300,
              }}
            >
              <Text
                style={{ fontSize: 20, fontWeight: "bold", marginBottom: 16 }}
              >
                Edit Bill
              </Text>
              <Text style={{ marginBottom: 8 }}>Description</Text>
              <TextInput
                style={[styles.input, { marginBottom: 16 }]}
                value={editedDescription}
                onChangeText={setEditedDescription}
                placeholder="Description"
              />
              <Text style={{ marginBottom: 8 }}>Amount</Text>
              <TextInput
                style={[styles.input, { marginBottom: 16 }]}
                value={editedAmount}
                onChangeText={setEditedAmount}
                placeholder="Amount"
                keyboardType="numeric"
              />
              <View
                style={{ flexDirection: "row", justifyContent: "flex-end" }}
              >
                <TouchableOpacity
                  onPress={() => {
                    dispatch(
                      updateBill({
                        year: year as string,
                        month: month as string,
                        billIndex: Number(billIndex),
                        description: editedDescription,
                        amount: editedAmount,
                      }),
                    );
                    setEditModalVisible(false);
                  }}
                  style={{
                    backgroundColor: "#007AFF",
                    padding: 12,
                    borderRadius: 8,
                    marginRight: 8,
                  }}
                >
                  <Text style={{ color: "#fff", fontWeight: "bold" }}>
                    Save
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setEditModalVisible(false)}
                  style={{
                    backgroundColor: "#ccc",
                    padding: 12,
                    borderRadius: 8,
                  }}
                >
                  <Text style={{ color: "#333", fontWeight: "bold" }}>
                    Cancel
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {participants.length > 0 && (
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
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
        )}
        <View style={styles.participantRow}>
          <Controller
            control={control}
            name="participant"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={[styles.input, { flex: 1, marginBottom: 0 }]}
                placeholder="Participant name"
                value={value}
                onChangeText={onChange}
              />
            )}
          />
          <BaseButton
            title="Add"
            onPress={handleSubmit(handleAddParticipant)}
            buttonStyle={styles.btnAddStyle}
          />
          <BaseButton
            title="Add Me"
            onPress={handleAddMe}
            buttonStyle={[
              styles.btnAddStyle,
              {
                backgroundColor: participants.some(
                  (p: any) => (typeof p === "string" ? p : p.name) === MY_NAME,
                )
                  ? "#cccccc"
                  : "#92A8D1",
              },
            ]}
            disabled={participants.some(
              (p: any) => (typeof p === "string" ? p : p.name) === MY_NAME,
            )}
          />
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
            <>
              {participants.length > 0 && (
                <Text style={styles.textStyle}>Participants</Text>
              )}
            </>
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
  //
  participantRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 18,
    marginBottom: 16,
  },
  btnAddStyle: {
    height: 50,
    justifyContent: "center",
  },
});
