import { View, Text, StyleSheet } from "react-native";
import { Glass } from "@/components/Glass";
import { NAVY, TRUST_PILLS } from "@/theme/brand";

export function TrustPills() {
  return (
    <View style={styles.row} accessibilityRole="text">
      {TRUST_PILLS.map((label) => (
        <Glass key={label} style={styles.pill} intensity={48}>
          <Text style={styles.text}>{label}</Text>
        </Glass>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 4,
  },
  pill: {
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  text: {
    color: NAVY,
    fontSize: 12,
    fontWeight: "600",
  },
});
