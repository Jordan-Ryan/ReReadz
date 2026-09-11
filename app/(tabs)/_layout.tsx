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
  SELL_FAB_SIZE,
  TAB_BAR_HEIGHT,
  TAB_BAR_INSET,
  WHITE,
} from "@/theme/brand";

function GlassTabBarBackground() {
  return (
    <Glass
      intensity={96}
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
          tabBarItemStyle: styles.tabItem,
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
            tabBarIcon: ({ focused }) => (
              <View
                style={[styles.sellMark, focused && styles.sellMarkOn]}
                accessibilityElementsHidden
              >
                <Ionicons name="add" size={26} color={WHITE} />
              </View>
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
    overflow: "hidden",
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
    overflow: "visible",
    shadowColor: "#1700AD",
    shadowOpacity: 0.18,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 8 },
    ...(Platform.OS === "web"
      ? ({
          backdropFilter: "blur(28px) saturate(200%)",
          WebkitBackdropFilter: "blur(28px) saturate(200%)",
          backgroundColor: "rgba(255,255,255,0.28)",
          overflow: "visible",
        } as object)
      : {}),
    ...(Platform.OS === "android"
      ? {
          marginHorizontal: TAB_BAR_INSET,
          backgroundColor: "rgba(255,255,255,0.97)",
          elevation: 16,
        }
      : {}),
  },
  tabItem: {
    paddingVertical: 4,
    overflow: "visible",
  },
  tabBarHidden: {
    display: "none",
    height: 0,
    overflow: "hidden",
    borderTopWidth: 0,
    elevation: 0,
  },
  sellMark: {
    width: SELL_FAB_SIZE,
    height: SELL_FAB_SIZE,
    borderRadius: SELL_FAB_SIZE / 2,
    backgroundColor: NAVY,
    alignItems: "center",
    justifyContent: "center",
    marginTop: -22,
    shadowColor: NAVY,
    shadowOpacity: 0.32,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
    ...(Platform.OS === "web"
      ? ({ boxShadow: "0 8px 18px rgba(23, 0, 173, 0.28)" } as object)
      : {}),
  },
  sellMarkOn: {
    backgroundColor: NAVY,
    opacity: 1,
  },
});
