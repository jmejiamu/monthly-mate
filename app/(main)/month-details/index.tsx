import React from "react";
import { useRouter, useLocalSearchParams, Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign, Feather } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import { useSelector } from "react-redux";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";

import { selectBillsByMonth } from "@/redux/features/billSlice/selectors";
import InfoCard from "@/components/InfoCard/InfoCard";

const MonthDetails = () => {
  const router = useRouter();
  const { month, emoji } = useLocalSearchParams();

  const { billsByMonth } = useSelector(selectBillsByMonth);
  const billsForMonth = billsByMonth[month as string] || [];
  const billForMonth = billsForMonth.length > 0;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={{ marginHorizontal: 16, flex: 1 }}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => router.back()}>
            <AntDesign name="leftcircleo" size={30} color="black" />
          </TouchableOpacity>
          <Link
            href={{ pathname: "/month-details/modal", params: { month } }}
            asChild
          >
            <TouchableOpacity>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={styles.addBillText}>Add Bill</Text>
                <Feather name="plus" size={24} color="black" />
              </View>
            </TouchableOpacity>
          </Link>
        </View>
        {billForMonth && (
          <Text style={[styles.monthText, { marginBottom: 10 }]}>{month}</Text>
        )}

        {!billForMonth && (
          <View style={styles.containerEmpty}>
            <Text style={styles.monthText}>No Bills for {month}</Text>
            <Text style={{ fontSize: 20, textAlign: "center", marginTop: 8 }}>
              Add your first bill for this month!
            </Text>
            <LottieView
              source={require("@/assets/animations/empty-box.json")}
              autoPlay
              loop
              style={{ width: 200, height: 200, alignSelf: "center" }}
            />
          </View>
        )}
        {billForMonth && (
          <FlatList
            data={billsForMonth}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                activeOpacity={0.94}
                onPress={() =>
                  router.push({
                    pathname: "/month-details/bill-details",
                    params: { month, billIndex: index },
                  })
                }
              >
                <InfoCard item={item} index={index} />
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => item.description + index}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default MonthDetails;

const styles = StyleSheet.create({
  containerEmpty: { justifyContent: "center", alignItems: "center", flex: 1 },
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
    color: "#333",
  },
  addBillText: {
    fontSize: 16,
    marginRight: 8,
  },
});
