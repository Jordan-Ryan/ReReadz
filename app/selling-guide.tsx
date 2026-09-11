import { View, Text, ScrollView, StyleSheet } from "react-native";

export default function SellingGuideScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Selling guide</Text>
      <Text style={styles.paragraph}>
        1. Tap Sell and create a new listing. Add a clear photo, title, author, condition, and price.
      </Text>
      <Text style={styles.paragraph}>
        2. When someone buys, you'll see the order in Account → My Orders. Reveal the delivery address and ship the book.
      </Text>
      <Text style={styles.paragraph}>
        3. Mark the order as dispatched when you've posted it. After delivery, funds are released to your wallet. Connect Stripe in Account → Wallet to receive payouts.
      </Text>
      <Text style={styles.paragraph}>
        Sold a book? Get a QR code straight to your phone. Drop it at your nearest Royal Mail, Evri or InPost point — no printer, no labels, no faff. Tracked delivery from £2.99.
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
