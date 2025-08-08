import { Stack } from "expo-router";

export default function StatsLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
          contentStyle: {
            backgroundColor: "white",
          },
        }}
      />
    </Stack>
  );
}
