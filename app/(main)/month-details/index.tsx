import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams, Link } from "expo-router";
import { AntDesign, Feather } from "@expo/vector-icons";

const MonthDetails = () => {
  const router = useRouter();
  const { month } = useLocalSearchParams();
  return (
    <SafeAreaView>
      <View style={{ marginHorizontal: 16 }}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => router.back()}>
            <AntDesign name="leftcircleo" size={30} color="black" />
          </TouchableOpacity>
          <Link href="/month-details/modal" asChild>
            <TouchableOpacity>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={styles.addBillText}>Add Bill</Text>
                <Feather name="plus" size={24} color="black" />
              </View>
            </TouchableOpacity>
          </Link>
        </View>
        <Text style={styles.monthText}>{month}</Text>
      </View>
    </SafeAreaView>
  );
};

export default MonthDetails;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  monthText: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 16,
    textAlign: "center",
  },
  addBillText: {
    fontSize: 16,
    marginRight: 8,
  },
});
