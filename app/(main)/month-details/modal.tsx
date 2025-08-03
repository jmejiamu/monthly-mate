import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";

const Modal = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add a new Expense</Text>
      <Text style={styles.description}>
        It's important to keep track of your expenses.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Amount"
        keyboardType="numeric"
      />
      <TextInput style={styles.input} placeholder="Description" />
      <Text style={styles.label}>Add Participants</Text>
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
});
