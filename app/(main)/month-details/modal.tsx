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
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";

import { resetBill, saveBill } from "@/redux/features/billSlice/billSlice";
import BaseButton from "@/components/BaseButton/BaseButton";
import { AppDispatch } from "@/redux/store/store";
import { SafeAreaView } from "react-native-safe-area-context";

const schema = z.object({
  amount: z
    .string()
    .min(1, "Amount is required")
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Amount must be a positive number",
    }),
  description: z.string().min(3, "Description must be at least 3 characters"),
  participant: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const Modal = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { month, year } = useLocalSearchParams();
  const router = useRouter();

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
      amount: "",
      description: "",
      participant: "",
    },
  });

  const MY_NAME = "Me";

  // Store participants as objects with name and paid
  const [participants, setParticipants] = useState<
    { name: string; paid: boolean }[]
  >([]);

  const handleAddParticipant = () => {
    const participant = watch("participant");
    if (participant && participant.trim()) {
      setParticipants((prev) => [...prev, { name: participant, paid: false }]);
      setValue("participant", "");
    }
  };

  const handleAddMe = () => {
    // Prevent duplicate "Me" entries
    if (!participants.some((p) => p.name === MY_NAME)) {
      setParticipants((prev) => [...prev, { name: MY_NAME, paid: false }]);
    }
  };

  const removeParticipant = (participantName: string) => {
    setParticipants((prev) => prev.filter((p) => p.name !== participantName));
  };

  const handleCancel = () => {
    reset();
    router.back();
  };

  const onSubmit = (data: FormData) => {
    dispatch(
      saveBill({
        year: year as string,
        month: month as string,
        participants: participants.map((p) =>
          typeof p === "string" ? { name: p, paid: false } : p
        ),
        amount: data.amount,
        description: data.description,
      })
    );
    dispatch(resetBill());
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Add a new Expense</Text>
      <Text style={styles.description}>
        It's important to keep track of your expenses.
      </Text>

      <Controller
        control={control}
        name="amount"
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <TextInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              style={styles.input}
              placeholder="Amount"
              keyboardType="numeric"
            />
            {errors.amount && (
              <Text style={{ color: "#ff4444", marginBottom: 8 }}>
                {errors.amount.message}
              </Text>
            )}
          </>
        )}
      />
      <Controller
        control={control}
        name="description"
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <TextInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              style={styles.input}
              placeholder="Description"
            />
            {errors.description && (
              <Text style={{ color: "#ff4444", marginBottom: 8 }}>
                {errors.description.message}
              </Text>
            )}
          </>
        )}
      />
      <Text style={styles.label}>Add Participants</Text>

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
          onPress={handleAddParticipant}
          buttonStyle={styles.btnAddStyle}
        />
        <BaseButton
          title="Add Me"
          onPress={handleAddMe}
          buttonStyle={[
            styles.btnAddStyle,
            {
              backgroundColor: participants.some((p) => p.name === MY_NAME)
                ? "#cccccc" // Disabled color
                : "#92A8D1", // Enabled color
            },
          ]}
          disabled={participants.some((p) => p.name === MY_NAME)}
        />
      </View>
      <FlatList
        data={participants}
        keyExtractor={(item, idx) => `${item.name}-${idx}`}
        renderItem={({ item }) => (
          <View style={styles.participantItem}>
            <Text
              style={[
                styles.participantText,
                item.name === MY_NAME && styles.meParticipantText,
              ]}
            >
              {item.name}
            </Text>
            <TouchableOpacity onPress={() => removeParticipant(item.name)}>
              <Text style={styles.removeText}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
        style={{ marginTop: 8 }}
      />
      <Text style={styles.label}>Total Expenses: {watch("amount")}</Text>
      <Text style={styles.label}>
        Total Participants: {participants?.length || 0}
      </Text>
      <Text style={styles.label}>
        Evenly Split:{" "}
        {participants?.length > 0
          ? ((parseFloat(watch("amount")) || 0) / participants.length).toFixed(
              2
            )
          : 0}
      </Text>

      <View style={{ flexDirection: "row", marginTop: 16 }}>
        <View style={{ flex: 1 }}>
          <BaseButton title="Save Expense" onPress={handleSubmit(onSubmit)} />
        </View>
        <View style={{ flex: 1 }}>
          <BaseButton title="Cancel" onPress={handleCancel} />
        </View>
      </View>
    </SafeAreaView>
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
  meParticipantText: {
    color: "black",
    fontWeight: "bold",
  },
  removeText: {
    color: "#ff4444",
    fontSize: 14,
    paddingVertical: 8,
  },
});
