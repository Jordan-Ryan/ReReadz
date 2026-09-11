import { Stack } from "expo-router";

export default function AccountLayout() {
  return (
    <Stack screenOptions={{ headerBackTitle: "Account" }}>
      <Stack.Screen name="index" options={{ title: "You" }} />
      <Stack.Screen name="orders" options={{ title: "My Orders" }} />
      <Stack.Screen name="order/[id]" options={{ title: "Order" }} />
      <Stack.Screen name="listings" options={{ title: "My Listings" }} />
      <Stack.Screen name="profile" options={{ title: "Edit profile" }} />
      <Stack.Screen name="settings" options={{ title: "Settings" }} />
      <Stack.Screen name="notifications" options={{ title: "Notifications" }} />
      <Stack.Screen name="wallet" options={{ title: "Wallet" }} />
      <Stack.Screen name="bookshelf" options={{ title: "Bookshelf" }} />
      <Stack.Screen name="bundles" options={{ title: "My Bundles" }} />
      <Stack.Screen name="subscription" options={{ title: "Subscription" }} />
      <Stack.Screen name="spotlight" options={{ title: "Spotlight" }} />
      <Stack.Screen name="gift-card" options={{ title: "Redeem gift card" }} />
      <Stack.Screen name="admin" options={{ title: "Admin" }} />
    </Stack>
  );
}
