import { Stack } from "expo-router";

export default function CharitiesLayout() {
  return (
    <Stack screenOptions={{ headerShown: true, title: "Charities" }}>
      <Stack.Screen name="index" options={{ title: "Charities" }} />
      <Stack.Screen name="[id]" options={{ title: "Charity" }} />
    </Stack>
  );
}
