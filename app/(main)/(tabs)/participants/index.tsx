import { StyleSheet, Text, View } from "react-native";
import React from "react";

const ParticipantsScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Participants</Text>
    </View>
  );
};

export default ParticipantsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
