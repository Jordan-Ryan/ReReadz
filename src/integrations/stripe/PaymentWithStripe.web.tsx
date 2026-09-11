import { View, Text, StyleSheet } from "react-native";

/** Native Stripe PaymentSheet is not available on web. */
export function PaymentWithStripe() {
  return (
    <View style={styles.wrap}>
      <Text style={styles.text}>Card payment is available in the ReReadz app.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { padding: 16 },
  text: { color: "#64748b" },
});