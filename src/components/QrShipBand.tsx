import { Text, Pressable, StyleSheet, View } from "react-native";
import { useRouter } from "expo-router";
import { Glass } from "@/components/Glass";
import {
  CTA_QR,
  GLASS_FILL_STRONG,
  INK,
  MUTED,
  NAVY,
  QR_DROPOFF,
  QR_KICKER,
  QR_LEAD,
  QR_POINTS,
  QR_TITLE,
  WHITE,
} from "@/theme/brand";

export function QrShipBand() {
  const router = useRouter();

  return (
    <Glass style={styles.card} intensity={64} overlayColor={GLASS_FILL_STRONG}>
      <Text style={styles.kicker}>{QR_KICKER}</Text>
      <Text style={styles.title}>{QR_TITLE}</Text>
      <Text style={styles.lead}>{QR_LEAD}</Text>
      <View style={styles.points}>
        {QR_POINTS.map((point) => (
          <Text key={point} style={styles.point}>
            · {point}
          </Text>
        ))}
      </View>
      <Text style={styles.drop}>{QR_DROPOFF}</Text>
      <Pressable
        style={styles.btn}
        onPress={() => router.push("/(tabs)/sell" as any)}
        accessibilityRole="button"
        accessibilityLabel={CTA_QR}
      >
        <Text style={styles.btnText}>{CTA_QR}</Text>
      </Pressable>
    </Glass>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 16,
    padding: 16,
  },
  kicker: {
    fontSize: 12,
    fontWeight: "700",
    color: NAVY,
    letterSpacing: 0.3,
    textTransform: "uppercase",
  },
  title: {
    marginTop: 4,
    fontSize: 20,
    lineHeight: 24,
    fontWeight: "800",
    color: INK,
  },
  lead: {
    marginTop: 8,
    fontSize: 14,
    lineHeight: 20,
    color: MUTED,
  },
  points: { marginTop: 10, gap: 2 },
  point: { fontSize: 13, lineHeight: 20, color: INK, fontWeight: "600" },
  drop: { marginTop: 8, fontSize: 12, color: MUTED, fontWeight: "600" },
  btn: {
    marginTop: 14,
    backgroundColor: NAVY,
    alignSelf: "flex-start",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
  },
  btnText: { color: WHITE, fontWeight: "700", fontSize: 13 },
});
