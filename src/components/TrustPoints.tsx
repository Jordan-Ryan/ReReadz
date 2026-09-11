import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { INK, MUTED, NAVY, TRUST_POINTS } from "@/theme/brand";

export function TrustPoints() {
  return (
    <View style={styles.row}>
      {TRUST_POINTS.map((point) => (
        <View key={point.title} style={styles.cell}>
          <Ionicons name={point.icon} size={22} color={NAVY} />
          <Text style={styles.title}>{point.title}</Text>
          <Text style={styles.detail}>{point.detail}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 10,
    paddingTop: 8,
    paddingBottom: 4,
  },
  cell: {
    width: "50%",
    paddingHorizontal: 6,
    paddingVertical: 10,
  },
  title: {
    marginTop: 6,
    fontSize: 13,
    fontWeight: "700",
    color: INK,
  },
  detail: {
    marginTop: 2,
    fontSize: 12,
    color: MUTED,
    lineHeight: 16,
  },
});
