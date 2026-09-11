import { View, StyleSheet } from "react-native";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { DiscoveryHeader } from "@/components/DiscoveryHeader";
import { useDesktopShell } from "@/hooks/useDesktopShell";
import { NAVY, MUTED, WHITE } from "@/theme/brand";

export default function TabsLayout() {
  const isDesktop = useDesktopShell();

  return (
    <View style={styles.shell}>
      <DiscoveryHeader />
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: NAVY,
          tabBarInactiveTintColor: MUTED,
          headerShown: false,
          tabBar: isDesktop ? () => null : undefined,
          tabBarStyle: isDesktop ? styles.tabBarHidden : styles.tabBarMobile,
          tabBarLabelStyle: { fontSize: 11, fontWeight: "600" },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarLabel: "Home",
            tabBarIcon: ({ color, size, focused }) => (
              <Ionicons
                name={focused ? "home" : "home-outline"}
                size={size}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="listings"
          options={{
            title: "Browse",
            tabBarLabel: "Browse",
            tabBarIcon: ({ color, size, focused }) => (
              <Ionicons
                name={focused ? "search" : "search-outline"}
                size={size}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="sell"
          options={{
            title: "Sell",
            tabBarLabel: "Sell",
            tabBarIcon: ({ color, size, focused }) => (
              <Ionicons
                name={focused ? "add-circle" : "add-circle-outline"}
                size={size}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="messages"
          options={{
            title: "Messages",
            tabBarLabel: "Messages",
            tabBarIcon: ({ color, size, focused }) => (
              <Ionicons
                name={focused ? "chatbubbles" : "chatbubbles-outline"}
                size={size}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="account"
          options={{
            title: "You",
            tabBarLabel: "You",
            tabBarIcon: ({ color, size, focused }) => (
              <Ionicons
                name={focused ? "person" : "person-outline"}
                size={size}
                color={color}
              />
            ),
          }}
        />
      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  shell: { flex: 1, backgroundColor: WHITE },
  tabBarMobile: { backgroundColor: WHITE },
  tabBarHidden: {
    display: "none",
    height: 0,
    overflow: "hidden",
    borderTopWidth: 0,
    elevation: 0,
  },
});