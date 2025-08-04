import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useDispatch } from "react-redux";

import { resetBill, saveBill } from "@/redux/features/billSlice/billSlice";
import BaseButton from "@/components/BaseButton/BaseButton";
import { useForm } from "@/hooks/useForm/useForm";
import { AppDispatch } from "@/redux/store/store";

const Modal = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { month } = useLocalSearchParams();
  const router = useRouter();

  const { formData, handleChange, resetForm } = useForm({
    amount: "",
    description: "",
    participant: "",
  });

  // Store participants as objects with name and paid
  const [participants, setParticipants] = useState<
    { name: string; paid: boolean }[]
  >([]);

  const handleAddParticipant = () => {
    if (formData.participant.trim()) {
      setParticipants((prev) => [
        ...prev,
        { name: formData.participant, paid: false },
      ]);
      handleChange("participant", "");
    }
  };

  const removeParticipant = (participantName: string) => {
    setParticipants((prev) => prev.filter((p) => p.name !== participantName));
  };

  const handleCancel = () => {
    resetForm();
    router.back();
  };

  const handleSubmit = () => {
    dispatch(
      saveBill({
        month: month as string,
        participants,
        amount: formData.amount,
        description: formData.description,
      })
    );
    dispatch(resetBill());
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add a new Expense</Text>
      <Text style={styles.description}>
        It's important to keep track of your expenses.
      </Text>

      <TextInput
        value={formData.amount}
        onChangeText={(text) => handleChange("amount", text)}
        style={styles.input}
        placeholder="Amount"
        keyboardType="numeric"
      />
      <TextInput
        value={formData.description}
        onChangeText={(text) => handleChange("description", text)}
        style={styles.input}
        placeholder="Description"
      />
      <Text style={styles.label}>Add Participants</Text>

      <View style={styles.participantRow}>
        <TextInput
          style={[styles.input, { flex: 1, marginBottom: 0 }]}
          placeholder="Participant name"
          value={formData.participant}
          onChangeText={(text) => handleChange("participant", text)}
        />
        <BaseButton
          title="Add"
          onPress={handleAddParticipant}
          buttonStyle={styles.btnAddStyle}
        />
      </View>
      <FlatList
        data={participants}
        keyExtractor={(item, idx) => `${item.name}-${idx}`}
        renderItem={({ item }) => (
          <View style={styles.participantItem}>
            <Text style={styles.participantText}>{item.name}</Text>
            <TouchableOpacity onPress={() => removeParticipant(item.name)}>
              <Text style={styles.removeText}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
        style={{ marginTop: 8 }}
      />
      <Text style={styles.label}>Total Expenses: {formData.amount}</Text>
      <Text style={styles.label}>
        Total Participants: {participants?.length || 0}
      </Text>
      <Text style={styles.label}>
        Evenly Split:{" "}
        {participants?.length > 0
          ? (parseFloat(formData.amount) || 0) / participants.length
          : 0}
      </Text>

      <View style={{ flexDirection: "row", marginTop: 16 }}>
        <View style={{ flex: 1 }}>
          <BaseButton title="Save Expense" onPress={handleSubmit} />
        </View>
        <View style={{ flex: 1 }}>
          <BaseButton title="Cancel" onPress={handleCancel} />
        </View>
      </View>
    </View>
  );
};

export default Modal;

const styles = StyleSheet.create({
  btnAddStyle: {
    height: 50,
    justifyContent: "center",
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "white",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  description: {
    fontSize: 16,
    marginBottom: 32,
    color: "#666",
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
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  participantRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
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
});
