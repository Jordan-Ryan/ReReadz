import { Stack } from "expo-router";

export default function ListingLayout() {
  return (
    <Stack screenOptions={{ headerShown: true, title: "Listing" }}>
      <Stack.Screen name="[slug]" options={{ title: "" }} />
    </Stack>
  );
}
