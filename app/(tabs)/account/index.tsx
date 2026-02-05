import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Ionicons } from "@expo/vector-icons";

export default function AccountScreen() {
  const { user } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.replace("/(auth)/login");
  };

  const link = (href: string, label: string, icon: keyof typeof Ionicons.glyphMap) => (
    <Pressable
      style={styles.linkRow}
      onPress={() => router.push(href as any)}
      accessibilityRole="button"
      accessibilityLabel={label}
    >
      <Ionicons name={icon} size={20} color="#0ea5e9" />
      <Text style={styles.linkText}>{label}</Text>
      <Ionicons name="chevron-forward" size={20} color="#94a3b8" />
    </Pressable>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Account</Text>
      {user?.email && (
        <Text style={styles.email}>{user.email}</Text>
      )}
      {link("profile", "Edit profile", "person-outline")}
      {link("orders", "My Orders", "receipt-outline")}
      {link("listings", "My Listings", "list-outline")}
      {link("notifications", "Notifications", "notifications-outline")}
      {link("settings", "Settings", "settings-outline")}
      {link("wallet", "Wallet & payouts", "wallet-outline")}
      {link("bookshelf", "Bookshelf", "book-outline")}
      {link("bundles", "My Bundles", "layers-outline")}
      {link("subscription", "Subscription", "card-outline")}
      {link("spotlight", "Spotlight", "flash-outline")}
      {link("gift-card", "Redeem gift card", "gift-outline")}
      {link("admin", "Admin", "shield-outline")}
      {link("/blog", "Blog", "newspaper-outline")}
      {link("/charities", "Charities", "heart-outline")}
      {link("/book-clubs", "Book clubs", "people-outline")}
      {link("/help", "Help Centre", "help-circle-outline")}
      {link("/about", "About", "information-circle-outline")}
      {link("/contact", "Contact", "mail-outline")}
      {link("/terms", "Terms & Conditions", "document-text-outline")}
      {link("/privacy", "Privacy policy", "shield-checkmark-outline")}
      {link("/cookie", "Cookie policy", "ellipse-outline")}
      {link("/accessibility", "Accessibility", "accessibility-outline")}
      {link("/shipping", "Shipping info", "car-outline")}
      {link("/selling-guide", "Selling guide", "book-outline")}
      <Pressable
        style={styles.button}
        onPress={handleSignOut}
        accessibilityRole="button"
        accessibilityLabel="Sign out"
      >
        <Text style={styles.buttonText}>Sign out</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16, paddingBottom: 32 },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 8 },
  email: { color: "#64748b", marginBottom: 16 },
  linkRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#e2e8f0",
  },
  linkText: { color: "#0ea5e9", fontSize: 16, flex: 1 },
  button: {
    marginTop: 24,
    backgroundColor: "#ef4444",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "600" },
});
