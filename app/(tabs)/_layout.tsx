import { View, StyleSheet, Platform } from "react-native";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { DiscoveryHeader } from "@/components/DiscoveryHeader";
import { Glass } from "@/components/Glass";
import { useDesktopShell } from "@/hooks/useDesktopShell";
import { useHeaderClearance } from "@/hooks/useHeaderClearance";
import {
  GLASS_FILL_CHROME,
  NAVY,
  MUTED,
  TAB_BAR_HEIGHT,
  TAB_BAR_INSET,
  WHITE,
} from "@/theme/brand";

function GlassTabBarBackground() {
  return (
    <Glass
      intensity={88}
      tint="systemChromeMaterialLight"
      overlayColor={GLASS_FILL_CHROME}
      style={styles.tabGlass}
    />
  );
}

export default function TabsLayout() {
  const isDesktop = useDesktopShell();
  const headerClearance = useHeaderClearance();

  return (
    <View style={styles.shell}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: NAVY,
          tabBarInactiveTintColor: MUTED,
          headerShown: false,
          sceneStyle: { paddingTop: headerClearance },
          tabBarBackground: isDesktop ? undefined : GlassTabBarBackground,
          tabBarStyle: isDesktop ? styles.tabBarHidden : styles.tabBarMobile,
          tabBarItemStyle: { paddingVertical: 4 },
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
      <View style={styles.headerOverlay} pointerEvents="box-none">
        <DiscoveryHeader />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  shell: { flex: 1, backgroundColor: WHITE },
  headerOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 20,
  },
  tabGlass: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 22,
    borderWidth: StyleSheet.hairlineWidth,
  },
  tabBarMobile: {
    position: "absolute",
    left: TAB_BAR_INSET,
    right: TAB_BAR_INSET,
    bottom: TAB_BAR_INSET,
    height: TAB_BAR_HEIGHT,
    backgroundColor: "transparent",
    borderTopWidth: 0,
    borderTopColor: "transparent",
    elevation: 0,
    borderRadius: 22,
    overflow: "hidden",
    shadowColor: "#1700AD",
    shadowOpacity: 0.18,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 8 },
    ...(Platform.OS === "web"
      ? ({
          backdropFilter: "blur(22px) saturate(180%)",
          WebkitBackdropFilter: "blur(22px) saturate(180%)",
          backgroundColor: "rgba(255,255,255,0.38)",
        } as object)
      : {}),
    ...(Platform.OS === "android" ? { marginHorizontal: TAB_BAR_INSET } : {}),
  },
  tabBarHidden: {
    display: "none",
    height: 0,
    overflow: "hidden",
    borderTopWidth: 0,
    elevation: 0,
  },
});
