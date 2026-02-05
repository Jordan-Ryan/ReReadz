import { Stack } from "expo-router";

export default function SellerIdLayout() {
  return (
    <Stack screenOptions={{ headerBackTitle: "Seller" }}>
      <Stack.Screen name="index" options={{ title: "Seller" }} />
      <Stack.Screen name="bundle" options={{ title: "Bundle" }} />
    </Stack>
  );
}
