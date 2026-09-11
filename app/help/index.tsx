import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const ARTICLES = [
  { slug: "getting-started", title: "Getting started" },
  { slug: "selling", title: "Selling on ReReadz" },
  { slug: "shipping", title: "Shipping" },
  { slug: "buyer-protection", title: "Buyer protection" },
  { slug: "contact", title: "Contact support" },
];

export default function HelpCentreScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Help Centre</Text>
      <Text style={styles.intro}>
        Browse help articles or contact support.
      </Text>
      {ARTICLES.map((a) => (
        <Pressable
          key={a.slug}
          style={styles.row}
          onPress={() => router.push(`/help/${a.slug}` as any)}
          accessibilityRole="link"
          accessibilityLabel={a.title}
        >
          <Text style={styles.rowTitle}>{a.title}</Text>
          <Ionicons name="chevron-forward" size={20} color="#94a3b8" />
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16, paddingBottom: 32 },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 8 },
  intro: { fontSize: 14, color: "#64748b", marginBottom: 20 },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#e2e8f0",
  },
  rowTitle: { fontSize: 16, fontWeight: "500", color: "#0f172a" },
});
