import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { DiscoveryHeader } from "@/components/DiscoveryHeader";
import { NAVY, INK, MUTED, WHITE } from "@/theme/brand";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: NAVY,
        tabBarInactiveTintColor: MUTED,
        headerShown: true,
        headerStyle: { backgroundColor: WHITE },
        headerShadowVisible: false,
        headerTintColor: INK,
        tabBarStyle: { backgroundColor: WHITE },
        tabBarLabelStyle: { fontSize: 11, fontWeight: "600" },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarLabel: "Home",
          header: () => <DiscoveryHeader />,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="listings"
        options={{
          title: "Browse",
          tabBarLabel: "Browse",
          header: () => <DiscoveryHeader />,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="sell"
        options={{
          title: "Sell",
          tabBarLabel: "Sell",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="messages"
        options={{
          title: "Messages",
          tabBarLabel: "Messages",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="chatbubbles" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: "You",
          tabBarLabel: "You",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}