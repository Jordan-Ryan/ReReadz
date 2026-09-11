import { View, Text, StyleSheet } from "react-native";
import { NAVY, NAVY_SOFT, TRUST_STRIP } from "@/theme/brand";

export function TrustStrip() {
  return (
    <View style={styles.wrap} accessibilityRole="text">
      <Text style={styles.text}>{TRUST_STRIP}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginHorizontal: 12,
    marginVertical: 12,
    paddingVertical: 10,
    paddingHorizontal: 14,
    backgroundColor: NAVY_SOFT,
    borderRadius: 8,
  },
  text: {
    color: NAVY,
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center",
  },
});