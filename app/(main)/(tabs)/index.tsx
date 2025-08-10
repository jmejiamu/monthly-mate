import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import MainCard from "@/components/MainCard/MainCard";
import { months } from "@/utils/data";

export default function Home() {
  const router = useRouter();

  const handleMonthPress = (month: string, emoji: string) => {
    router.navigate({ pathname: `/month-details`, params: { month, emoji } });
  };
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View>
        <FlatList
          data={months}
          keyExtractor={(item) => item.name}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              activeOpacity={0.94}
              onPress={() => handleMonthPress(item.name, item.emoji)}
            >
              <MainCard item={item} index={index} />
            </TouchableOpacity>
          )}
          ListHeaderComponent={
            <Text style={styles.header}>Welcome to Monthly Mate</Text>
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F8F9FB",
    paddingHorizontal: 16,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 24,
    marginBottom: 16,
    textAlign: "center",
    color: "#22223B",
    letterSpacing: 1,
  },
});
