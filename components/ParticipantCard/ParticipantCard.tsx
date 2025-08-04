import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";

interface ParticipantCardProps {
  name: string;
  paid: boolean;
  onTogglePaid: () => void;
  onRemove: () => void;
}

const ParticipantCard = (props: ParticipantCardProps) => {
  const { name, paid, onTogglePaid, onRemove } = props;
  return (
    <View style={styles.participantItem}>
      <View style={styles.rowContainer}>
        <TouchableOpacity
          onPress={onTogglePaid}
          accessibilityLabel={paid ? "Mark as unpaid" : "Mark as paid"}
        >
          <FontAwesome
            name={paid ? "check-circle" : "circle-o"}
            size={22}
            color={paid ? "#4caf50" : "#bbb"}
          />
        </TouchableOpacity>
        <View style={{ marginLeft: 12 }} />
        <Text style={[styles.participantText, paid && styles.paidText]}>
          {name}
        </Text>
      </View>
      <TouchableOpacity onPress={onRemove}>
        <Text style={styles.removeText}>Remove</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ParticipantCard;

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
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
