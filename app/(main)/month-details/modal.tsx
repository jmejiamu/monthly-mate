import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store/store";

import { resetBill, saveBill } from "@/redux/features/billSlice/billSlice";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useForm } from "@/hooks/useForm/useForm";

const Modal = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { month } = useLocalSearchParams();
  const router = useRouter();

  const { formData, handleChange, resetForm, validate, errors, isFormChanged } =
    useForm({
      amount: "",
      description: "",
      participant: "",
    });

  const [participants, setParticipants] = useState<string[]>([]);

  const handleAddParticipant = () => {
    if (formData.participant.trim()) {
      setParticipants((prev) => [...prev, formData.participant]);
      handleChange("participant", "");
    }
  };

  const removeParticipant = (participant: string) => {
    setParticipants((prev) => prev.filter((p) => p !== participant));
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
        <TouchableOpacity
          style={styles.addButton}
          onPress={handleAddParticipant}
        >
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={participants}
        keyExtractor={(item, idx) => item + idx}
        renderItem={({ item }) => (
          <View style={styles.participantItem}>
            <Text style={styles.participantText}>{item}</Text>
            <TouchableOpacity onPress={() => removeParticipant(item)}>
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
        <TouchableOpacity
          onPress={() => {
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
          }}
          style={[styles.addButton, { alignItems: "center", flex: 1 }]}
        >
          <Text style={styles.addButtonText}>Save Expense</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => resetForm()}
          style={[styles.addButton, { alignItems: "center", flex: 1 }]}
        >
          <Text style={styles.addButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Modal;

const styles = StyleSheet.create({
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
  addButton: {
    backgroundColor: "#22223B",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginLeft: 8,
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
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
