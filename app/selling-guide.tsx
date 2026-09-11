import { View, Text, ScrollView, StyleSheet, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { INK, MUTED, NAVY, WHITE } from "@/theme/brand";

export default function SellingGuideScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Selling guide</Text>
      <Text style={styles.paragraph}>
        1. Tap Sell and create a new listing. Add a clear photo, title, author, condition, and price.
      </Text>
      <Text style={styles.paragraph}>
        2. When someone buys, you'll see the order in You → Orders. Reveal the delivery address and ship the book.
      </Text>
      <Text style={styles.paragraph}>
        3. Mark the order as dispatched when you've posted it. After delivery, funds are released to your wallet. Connect Stripe in You → Wallet to receive payouts.
      </Text>
      <Text style={styles.paragraph}>
        Sold a book? Get a QR code straight to your phone. Drop it at your nearest Royal Mail, Evri or InPost point — no printer, no labels, no faff. Tracked delivery from £2.99.
      </Text>

      <Pressable
        style={styles.primary}
        onPress={() => router.push("/(tabs)/sell" as any)}
        accessibilityRole="link"
        accessibilityLabel="Open Sell"
      >
        <Text style={styles.primaryText}>Open Sell</Text>
      </Pressable>

      <View style={styles.links}>
        <Pressable
          style={styles.linkRow}
          onPress={() => router.push("/(tabs)/account/orders" as any)}
          accessibilityRole="link"
          accessibilityLabel="Orders"
        >
          <Ionicons name="receipt-outline" size={18} color={NAVY} />
          <Text style={styles.link}>Orders</Text>
          <Ionicons name="chevron-forward" size={16} color={MUTED} />
        </Pressable>
        <Pressable
          style={styles.linkRow}
          onPress={() => router.push("/(tabs)/account/wallet" as any)}
          accessibilityRole="link"
          accessibilityLabel="Wallet"
        >
          <Ionicons name="wallet-outline" size={18} color={NAVY} />
          <Text style={styles.link}>Wallet</Text>
          <Ionicons name="chevron-forward" size={16} color={MUTED} />
        </Pressable>
        <Pressable
          style={styles.linkRow}
          onPress={() => router.push("/help/selling" as any)}
          accessibilityRole="link"
          accessibilityLabel="Selling help"
        >
          <Ionicons name="help-circle-outline" size={18} color={NAVY} />
          <Text style={styles.link}>Selling help</Text>
          <Ionicons name="chevron-forward" size={16} color={MUTED} />
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: WHITE },
  content: { padding: 16, paddingBottom: 40 },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 16, color: INK },
  paragraph: { fontSize: 14, color: MUTED, lineHeight: 22, marginBottom: 12 },
  primary: {
    backgroundColor: NAVY,
    borderRadius: 999,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignSelf: "flex-start",
    marginTop: 8,
  },
  primaryText: { color: WHITE, fontWeight: "700", fontSize: 14 },
  links: { marginTop: 20 },
  linkRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 12,
  },
  link: { flex: 1, color: INK, fontWeight: "600", fontSize: 15 },
});
