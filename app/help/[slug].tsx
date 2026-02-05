import { useLocalSearchParams } from "expo-router";
import { View, Text, ScrollView, StyleSheet } from "react-native";

const HELP_ARTICLES: Record<string, { title: string; body: string }> = {
  "getting-started": {
    title: "Getting started",
    body: "Welcome to ReReadz. You can browse books, buy from sellers, or list your own. Create an account, add a payment method at checkout, and start buying or selling. Sellers receive payouts to their connected bank account after completing Stripe Connect setup in Account → Wallet.",
  },
  "selling": {
    title: "Selling on ReReadz",
    body: "Tap Sell, create a draft listing, add a photo and details (title, author, condition, price), then publish. When someone buys, you'll get an order in Account → My Orders. Ship the book and mark as dispatched. After delivery, funds are released to your wallet; withdraw from Account → Wallet.",
  },
  "shipping": {
    title: "Shipping",
    body: "Sellers are responsible for posting the book. Buyers receive the delivery address after payment. Sellers can use their preferred carrier. We recommend tracked delivery for higher-value orders.",
  },
  "buyer-protection": {
    title: "Buyer protection",
    body: "ReReadz holds payment until the order is complete. If there's an issue, contact the seller via Messages. Disputes can be raised from the order detail screen. Keep payments in the app for protection.",
  },
  "contact": {
    title: "Contact support",
    body: "For account or order help, use the Help Centre from the web app or email support@rereadz.com. For urgent issues, include your order ID.",
  },
};

export default function HelpArticleScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const article = slug ? HELP_ARTICLES[slug] : null;

  if (!article) {
    return (
      <View style={styles.centered}>
        <Text style={styles.title}>Article not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>{article.title}</Text>
      <Text style={styles.body}>{article.body}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16, paddingBottom: 32 },
  centered: { flex: 1, justifyContent: "center", padding: 16 },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 16 },
  body: { fontSize: 15, color: "#475569", lineHeight: 24 },
});
