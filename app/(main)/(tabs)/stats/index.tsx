import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, Text, View } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import { useSelector } from "react-redux";

import { selectBillsByMonth } from "@/redux/features/billSlice/selectors";

const MONTHS = [
  { full: "January", short: "Jan" },
  { full: "February", short: "Feb" },
  { full: "March", short: "Mar" },
  { full: "April", short: "Apr" },
  { full: "May", short: "May" },
  { full: "June", short: "Jun" },
  { full: "July", short: "Jul" },
  { full: "August", short: "Aug" },
  { full: "September", short: "Sep" },
  { full: "October", short: "Oct" },
  { full: "November", short: "Nov" },
  { full: "December", short: "Dec" },
];

const StatsScreen = () => {
  const { billsByMonth } = useSelector(selectBillsByMonth);

  // Map billsByMonth to chart data
  const chartData = MONTHS.map(({ full, short }) => {
    const bills = billsByMonth?.[full] || [];
    const total = bills.reduce(
      (sum, bill) => sum + Number(bill.amount || 0),
      0
    );
    return { label: short, value: total };
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Monthly Expenses</Text>
      </View>
      <Text style={{ marginTop: 16, marginHorizontal: 16 }}>
        Total expenses for each month
      </Text>
      <View style={styles.chartContainer}>
        <BarChart
          data={chartData}
          barWidth={35}
          cappedBars
          capColor={"rgba(78, 0, 142)"}
          capThickness={4}
          showGradient
          gradientColor={"rgba(200, 100, 244,0.8)"}
          frontColor={"rgba(219, 182, 249,0.2)"}
        />
      </View>
    </SafeAreaView>
  );
};

export default StatsScreen;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    alignItems: "center",
    marginTop: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  chartContainer: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
});
