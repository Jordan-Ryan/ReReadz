import { Stack } from "expo-router";

export default function BookClubsLayout() {
  return (
    <Stack screenOptions={{ headerShown: true, title: "Book clubs" }}>
      <Stack.Screen name="index" options={{ title: "Book clubs" }} />
      <Stack.Screen name="[id]" options={{ title: "Book club" }} />
    </Stack>
  );
}
