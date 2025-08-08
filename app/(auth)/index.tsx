import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { GradientText } from "universal-gradient-text";
import { LinearGradient } from "expo-linear-gradient";
import BaseButton from "@/components/BaseButton/BaseButton";
import { useRouter } from "expo-router";

const WelcomeScreen = () => {
  const router = useRouter();

  return (
    <LinearGradient
      colors={["#F7CAC9", "#E0BBE4", "#A7C7E7"]}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.content}>
        <GradientText
          style={styles.title}
          colors={["#4ebcf4", "#6b40ba"]}
          direction="rtl"
        >
          Welcome to Monthly Mate
        </GradientText>
        <Text style={styles.subtitle}>
          Manage your monthly expenses with ease.
        </Text>

        <BaseButton
          onPress={() => router.replace("/(main)/(tabs)")}
          title="Get Started"
        />
      </View>
    </LinearGradient>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    alignItems: "center",
    paddingHorizontal: 32,
    paddingVertical: 40,
  },
  title: {
    fontWeight: "700",
    fontSize: 35,
    marginBottom: 16,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#333",
    marginBottom: 32,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#4ebcf4",
    paddingVertical: 12,
    paddingHorizontal: 36,
    borderRadius: 20,
    elevation: 2,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 18,
  },
});
