import React, { use } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, Text, View } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import { useSelector } from "react-redux";

import { RootState } from "@/redux/store/store";

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
  // const { billsByMonth } = useSelector(selectBillsByMonth);
  const { billsByYear } = useSelector((state: RootState) => state.bill);
  const currentYear = new Date().getFullYear();
  const billsByMonth = billsByYear?.[currentYear] || [];

  // Map billsByMonth to chart data
  const chartData = MONTHS?.map(({ full, short }) => {
    const bills = billsByMonth?.[full] || [];
    const total = bills?.reduce(
      (sum, bill) => sum + Number(bill?.amount || 0),
      0
    );
    return { label: short, value: total };
  });

  const totalYear = chartData?.reduce(
    (sum, item) => sum + (item?.value || 0),
    0
  );
  const avgMonth = chartData?.length ? totalYear / chartData?.length : 0;
  const hasData =
    Array.isArray(chartData) &&
    chartData.length > 0 &&
    chartData.some((item) => item.value > 0);
  const maxMonth = hasData
    ? chartData.reduce(
        (max, m) => (m?.value > max?.value ? m : max),
        chartData[0]
      )
    : { label: "-", value: 0 };
  const minMonth = hasData
    ? chartData.reduce(
        (min, m) => (m?.value < min?.value ? m : min),
        chartData[0]
      )
    : { label: "-", value: 0 };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Monthly Expenses</Text>
      </View>
      <Text
        style={{
          marginTop: 16,
          marginHorizontal: 16,
          fontSize: 16,
          fontWeight: "semibold",
          textAlign: "center",
        }}
      >
        Total expenses for each month
      </Text>
      {Array.isArray(chartData) &&
      chartData.length > 0 &&
      chartData.some((item) => item.value > 0) ? (
        <View style={styles.chartContainer}>
          <BarChart
            data={chartData}
            barWidth={35}
            cappedBars
            capColor={"rgba(167, 199, 231)"}
            capThickness={4}
            showGradient
            gradientColor={"rgba(167, 199, 231,0.8)"}
            frontColor={"rgba(167, 199, 231,0.2)"}
          />
        </View>
      ) : (
        <Text style={{ textAlign: "center", marginTop: 32 }}>
          No data to display
        </Text>
      )}
      <View style={styles.statsContainer}>
        <Text style={styles.statsTitle}>Key Stats</Text>
        <View style={[styles.textContainer, { marginBottom: 30 }]}>
          <Text style={{ fontWeight: "semibold", fontSize: 16 }}>
            Total Yearly Expenses
          </Text>
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>
            ${hasData ? totalYear.toFixed(2) : "0.00"}
          </Text>
        </View>
        <View style={[styles.textContainer, { marginBottom: 30 }]}>
          <Text style={{ fontWeight: "semibold", fontSize: 16 }}>
            Average Monthly Expense
          </Text>
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>
            ${hasData ? avgMonth.toFixed(2) : "0.00"}
          </Text>
        </View>
        <View style={[styles.textContainer, { marginBottom: 30 }]}>
          <Text style={{ fontWeight: "semibold", fontSize: 16 }}>
            Highest Month
          </Text>
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>
            {maxMonth.label} (${maxMonth.value.toFixed(2)})
          </Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={{ fontWeight: "semibold", fontSize: 16 }}>
            Lowest Month
          </Text>
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>
            {minMonth.label} (${minMonth.value.toFixed(2)})
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default StatsScreen;

const styles = StyleSheet.create({
  textContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
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

  //
  statsContainer: {
    marginTop: 32,
    marginHorizontal: 16,
    padding: 16,
    backgroundColor: "rgba(167, 199, 231,0.3)",
    borderRadius: 12,
    // elevation: 2,
  },
  statsTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 30,
  },
});
