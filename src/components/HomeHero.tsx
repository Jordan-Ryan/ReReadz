import { View, Text, Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import {
  CTA_BROWSE,
  CTA_LIST,
  HERO_SUBTITLE,
  HERO_TITLE,
  INK,
  MUTED,
  NAVY,
  WHITE,
} from "@/theme/brand";

export function HomeHero() {
  const router = useRouter();

  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>{HERO_TITLE}</Text>
      <Text style={styles.sub}>{HERO_SUBTITLE}</Text>
      <View style={styles.actions}>
        <Pressable
          style={styles.primary}
          onPress={() => router.push("/(tabs)/listings" as any)}
          accessibilityRole="button"
          accessibilityLabel={CTA_BROWSE}
        >
          <Text style={styles.primaryText}>{CTA_BROWSE}</Text>
        </Pressable>
        <Pressable
          style={styles.secondary}
          onPress={() => router.push("/(tabs)/sell" as any)}
          accessibilityRole="button"
          accessibilityLabel={CTA_LIST}
        >
          <Text style={styles.secondaryText}>{CTA_LIST}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 8,
  },
  title: {
    fontSize: 26,
    lineHeight: 30,
    fontWeight: "800",
    color: INK,
    letterSpacing: -0.6,
  },
  sub: {
    marginTop: 8,
    fontSize: 14,
    lineHeight: 20,
    color: MUTED,
  },
  actions: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 14,
  },
  primary: {
    backgroundColor: NAVY,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
  },
  primaryText: { color: WHITE, fontWeight: "700", fontSize: 13 },
  secondary: {
    backgroundColor: "rgba(23,0,173,0.08)",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
  },
  secondaryText: { color: NAVY, fontWeight: "700", fontSize: 13 },
});
