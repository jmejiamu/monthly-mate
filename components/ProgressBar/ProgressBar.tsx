import { StyleSheet, Text, View } from "react-native";
import React from "react";
interface ProgressBarProps {
  paidCount: number;
  total: number;
}
const ProgressBar = (props: ProgressBarProps) => {
  const { paidCount, total } = props;
  const percent = total > 0 ? paidCount / total : 0;

  return (
    <View style={styles.progressBarContainer}>
      <View style={[styles.progressBar, { width: `${percent * 100}%` }]} />
      <Text style={styles.progressText}>
        {paidCount}/{total} paid
      </Text>
    </View>
  );
};

export default ProgressBar;

const styles = StyleSheet.create({
  progressBarContainer: {
    height: 18,
    backgroundColor: "#eee",
    borderRadius: 8,
    marginTop: 8,
    marginBottom: 4,
    overflow: "hidden",
    position: "relative",
    justifyContent: "center",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#399cb5ff",
    borderRadius: 8,
    position: "absolute",
    left: 0,
    top: 0,
  },
  progressText: {
    textAlign: "center",
    fontSize: 12,
    color: "#333",
    fontWeight: "600",
    zIndex: 1,
  },
});
