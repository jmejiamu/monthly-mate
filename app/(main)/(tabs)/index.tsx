import { useRouter } from "expo-router";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  const router = useRouter();
  const months = [
    { name: "January", emoji: "❄️" },
    { name: "February", emoji: "❤️" },
    { name: "March", emoji: "🍀" },
    { name: "April", emoji: "🌧️" },
    { name: "May", emoji: "🌸" },
    { name: "June", emoji: "☀️" },
    { name: "July", emoji: "🎆" },
    { name: "August", emoji: "🏖️" },
    { name: "September", emoji: "🍂" },
    { name: "October", emoji: "🎃" },
    { name: "November", emoji: "🦃" },
    { name: "December", emoji: "🎄" },
  ];
  const colors = [
    "#A7C7E7", // Light Blue
    "#F7CAC9", // Light Pink
    "#92A8D1", // Soft Purple
    "#B5EAD7", // Mint Green
    "#FFF2B2", // Light Yellow
    "#FFDAC1", // Peach
  ];
  const handleMonthPress = (month: string, emoji: string) => {
    router.navigate({ pathname: `/month-details`, params: { month, emoji } });
  };
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={{}}>
        {/* <Text style={styles.header}>Welcome to Monthly Mate</Text> */}
        <FlatList
          data={months}
          keyExtractor={(item) => item.name}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => handleMonthPress(item.name, item.emoji)}
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
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={{ fontSize: 30 }}>{item.emoji}</Text>
                  <View style={{ marginLeft: 16 }}>
                    <Text style={styles.monthText}>{item.name}</Text>
                  </View>
                </View>
              </View>
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
    // flex: 1,
    backgroundColor: "#F8F9FB",
    paddingHorizontal: 16,
  },
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
