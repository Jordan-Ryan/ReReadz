import { Stack } from "expo-router";
import { NAVY, WHITE } from "@/theme/brand";

export default function AccountLayout() {
  return (
    <Stack
      screenOptions={{
        headerBackTitle: "You",
        headerTintColor: NAVY,
        headerShadowVisible: false,
        headerBlurEffect: "systemChromeMaterialLight",
        headerStyle: { backgroundColor: "rgba(255,255,255,0.88)" },
        headerTitleStyle: { fontWeight: "700" },
        contentStyle: { backgroundColor: WHITE },
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false, title: "You" }} />
      <Stack.Screen name="orders" options={{ title: "My Orders" }} />
      <Stack.Screen name="order/[id]" options={{ title: "Order" }} />
      <Stack.Screen name="listings" options={{ title: "My Listings" }} />
      <Stack.Screen name="profile" options={{ title: "Edit profile" }} />
      <Stack.Screen name="settings" options={{ title: "Settings" }} />
      <Stack.Screen name="notifications" options={{ title: "Notifications" }} />
      <Stack.Screen name="wallet" options={{ title: "Wallet" }} />
      <Stack.Screen name="bookshelf" options={{ title: "Bookshelf" }} />
    </Stack>
  );
}
