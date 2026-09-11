import { Text, Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Glass } from "@/components/Glass";
import {
  CTA_SELL,
  INK,
  MUTED,
  NAVY,
  SELL_CTA_POINTS,
  SELL_CTA_TITLE,
  WHITE,
} from "@/theme/brand";

export function SellShelfCta() {
  const router = useRouter();

  return (
    <Glass style={styles.card} intensity={56}>
      <Text style={styles.kicker}>Have books to sell?</Text>
      <Text style={styles.title}>{SELL_CTA_TITLE}</Text>
      {SELL_CTA_POINTS.map((point) => (
        <Text key={point} style={styles.point}>
          · {point}
        </Text>
      ))}
      <Pressable
        style={styles.btn}
        onPress={() => router.push("/(tabs)/sell" as any)}
        accessibilityRole="button"
        accessibilityLabel={CTA_SELL}
      >
        <Text style={styles.btnText}>{CTA_SELL}</Text>
      </Pressable>
    </Glass>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 8,
    borderRadius: 16,
    padding: 16,
  },
  kicker: {
    fontSize: 12,
    fontWeight: "700",
    color: NAVY,
    letterSpacing: 0.2,
    marginBottom: 4,
  },
  title: {
    fontSize: 18,
    lineHeight: 22,
    fontWeight: "800",
    color: INK,
    marginBottom: 8,
  },
  point: {
    fontSize: 13,
    lineHeight: 20,
    color: MUTED,
  },
  btn: {
    marginTop: 12,
    backgroundColor: NAVY,
    alignSelf: "flex-start",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
  },
  btnText: { color: WHITE, fontWeight: "700", fontSize: 13 },
});
