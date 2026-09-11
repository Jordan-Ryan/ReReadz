import { Text, Pressable, StyleSheet, View } from "react-native";
import { useRouter } from "expo-router";
import { Glass } from "@/components/Glass";
import {
  CTA_HOW_SELL,
  CTA_SELL,
  GLASS_FILL_STRONG,
  INK,
  MUTED,
  NAVY,
  SELL_CTA_KICKER,
  SELL_CTA_LEAD,
  SELL_CTA_POINTS,
  SELL_CTA_TITLE,
  WHITE,
} from "@/theme/brand";

export function SellShelfCta() {
  const router = useRouter();

  return (
    <Glass style={styles.card} intensity={56} overlayColor={GLASS_FILL_STRONG}>
      <Text style={styles.kicker}>{SELL_CTA_KICKER}</Text>
      <Text style={styles.title}>{SELL_CTA_TITLE}</Text>
      <Text style={styles.lead}>{SELL_CTA_LEAD}</Text>
      {SELL_CTA_POINTS.map((point) => (
        <Text key={point} style={styles.point}>
          · {point}
        </Text>
      ))}
      <View style={styles.actions}>
        <Pressable
          style={styles.btn}
          onPress={() => router.push("/(tabs)/sell" as any)}
          accessibilityRole="button"
          accessibilityLabel={CTA_SELL}
        >
          <Text style={styles.btnText}>{CTA_SELL}</Text>
        </Pressable>
        <Pressable
          onPress={() => router.push("/selling-guide" as any)}
          accessibilityRole="button"
          accessibilityLabel={CTA_HOW_SELL}
        >
          <Text style={styles.link}>{CTA_HOW_SELL}</Text>
        </Pressable>
      </View>
    </Glass>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 8,
    borderRadius: 16,
    padding: 16,
    maxWidth: 1120,
    alignSelf: "center",
    width: "100%",
  },
  kicker: {
    fontSize: 12,
    fontWeight: "700",
    color: NAVY,
    letterSpacing: 0.2,
    marginBottom: 4,
  },
  title: {
    fontSize: 20,
    lineHeight: 24,
    fontWeight: "800",
    color: INK,
    marginBottom: 8,
  },
  lead: {
    fontSize: 14,
    lineHeight: 20,
    color: MUTED,
    marginBottom: 8,
  },
  point: {
    fontSize: 13,
    lineHeight: 20,
    color: MUTED,
  },
  actions: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 14,
    marginTop: 12,
  },
  btn: {
    backgroundColor: NAVY,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
  },
  btnText: { color: WHITE, fontWeight: "700", fontSize: 13 },
  link: { color: NAVY, fontWeight: "700", fontSize: 13 },
});
