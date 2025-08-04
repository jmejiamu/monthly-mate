import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams, Link } from "expo-router";
import { AntDesign, Feather } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import LottieView from "lottie-react-native";
import { selectBillsByMonth } from "@/redux/features/billSlice/selectors";

const MonthDetails = () => {
  const router = useRouter();
  const { month, emoji } = useLocalSearchParams();
  const colors = [
    "#A7C7E7", // Light Blue
    "#F7CAC9", // Light Pink
    "#92A8D1", // Soft Purple
    "#B5EAD7", // Mint Green
    "#FFF2B2", // Light Yellow
    "#FFDAC1", // Peach
  ];

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
          <>
            <Text style={styles.monthText}>{month}</Text>
            <Text style={{ fontSize: 60, textAlign: "center" }}>{emoji}</Text>
          </>
        )}

        {!billForMonth && (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              flex: 1,
            }}
          >
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
        {billForMonth ? (
          <FlatList
            data={billsForMonth}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                onPress={() =>
                  router.push({
                    pathname: "/month-details/bill-details",
                    params: { month, billIndex: index },
                  })
                }
              >
                <View
                  style={[
                    {
                      padding: 10,
                      backgroundColor: colors[index % colors.length],
                    },
                    styles.monthCard,
                  ]}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={styles.billAmount}>{item.description}</Text>
                    <Text style={styles.billAmount}>${item.amount}</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={styles.billSplit}>Split per person:</Text>
                    <Text style={styles.billSplit}>
                      $
                      {item.participants.length > 0
                        ? (
                            Number(item.amount) / item.participants.length
                          ).toFixed(2)
                        : "0.00"}
                    </Text>
                  </View>
                  <Text style={styles.billParticipants}>
                    Participants:{" "}
                    {item.participants
                      .map((p: any) => (typeof p === "string" ? p : p.name))
                      .join(", ")}
                  </Text>
                  {/* Progress Bar */}
                  {item.participants.length > 0 &&
                    (() => {
                      // Count paid participants (support both string and object)
                      const paidCount = item.participants.filter(
                        (p: any) => typeof p === "object" && p.paid
                      ).length;
                      const percent = paidCount / item.participants.length;
                      return (
                        <View style={styles.progressBarContainer}>
                          <View
                            style={[
                              styles.progressBar,
                              { width: `${percent * 100}%` },
                            ]}
                          />
                          <Text style={styles.progressText}>
                            {paidCount}/{item.participants.length} paid
                          </Text>
                        </View>
                      );
                    })()}
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => item.description + index}
          />
        ) : null}
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
    color: "#333",
  },
  addBillText: {
    fontSize: 16,
    marginRight: 8,
  },

  // monthCard
  monthCard: {
    paddingVertical: 18,
    paddingHorizontal: 24,
    borderRadius: 16,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  // Bill details styles
  billAmount: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#222",
  },
  billDescription: {
    fontSize: 16,
    color: "#555",
    marginBottom: 2,
  },
  billParticipants: {
    fontSize: 16,
    color: "#666",
    marginBottom: 2,
    fontStyle: "italic",
    fontWeight: "600",
  },
  billSplit: {
    fontSize: 16,
    // color: "#008060",
    fontWeight: "600",
    marginTop: 6,
  },

  // Progress bar styles
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
    backgroundColor: "#4caf50",
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
