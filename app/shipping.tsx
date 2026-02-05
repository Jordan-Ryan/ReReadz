import { View, Text, ScrollView, StyleSheet } from "react-native";

export default function ShippingScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Shipping information</Text>
      <Text style={styles.paragraph}>
        Sellers are responsible for posting the book to the buyer. After payment, the buyer's delivery address is shared with the seller.
      </Text>
      <Text style={styles.paragraph}>
        We recommend using tracked delivery for higher-value orders. Sellers can use their preferred carrier (Royal Mail, Parcelforce, etc.) or any courier that supports the delivery address.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16 },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 16 },
  paragraph: { fontSize: 14, color: "#475569", lineHeight: 22, marginBottom: 12 },
});
