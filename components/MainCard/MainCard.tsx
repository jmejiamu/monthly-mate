import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { colorsTheme } from "@/theme/colors";
import { AntDesign } from "@expo/vector-icons";

interface MonthCardProps {
  item: {
    name: string;
    emoji: string;
  };
  index: number;
}

const MainCard = (props: MonthCardProps) => {
  const { item, index } = props;
  return (
    <View
      style={[
        {
          padding: 10,
          backgroundColor: colorsTheme[index % colorsTheme.length],
        },
        styles.monthCard,
      ]}
    >
      <View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 45 }}>{item.emoji}</Text>
          <AntDesign name="rightcircleo" size={24} color="#858585" />
        </View>
        <View>
          <Text style={styles.monthText}>{item.name}</Text>
        </View>
      </View>
    </View>
  );
};

export default MainCard;

const styles = StyleSheet.create({
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
  monthText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#22223B",
    letterSpacing: 0.5,
  },
});
