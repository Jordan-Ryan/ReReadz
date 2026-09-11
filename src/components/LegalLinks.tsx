import { Pressable, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { INK, LINE, MUTED, NAVY } from "@/theme/brand";

const LINKS: { href: string; label: string; icon: keyof typeof Ionicons.glyphMap }[] = [
  { href: "/terms", label: "Terms", icon: "document-text-outline" },
  { href: "/privacy", label: "Privacy", icon: "lock-closed-outline" },
  { href: "/cookie", label: "Cookies", icon: "file-tray-outline" },
  { href: "/accessibility", label: "Accessibility", icon: "eye-outline" },
  { href: "/help", label: "Help", icon: "help-circle-outline" },
  { href: "/contact", label: "Contact", icon: "mail-outline" },
  { href: "/selling-guide", label: "Selling guide", icon: "book-outline" },
];

/** Footer of real in-app legal/help routes. No mailto-only or unsigned stubs. */
export function LegalLinks() {
  const router = useRouter();

  return (
    <View style={styles.wrap} accessibilityRole="text">
      <Text style={styles.heading}>More from ReReadz</Text>
      {LINKS.map((link, index) => (
        <Pressable
          key={link.href}
          style={[styles.row, index > 0 && styles.rowBorder]}
          onPress={() => router.push(link.href as any)}
          accessibilityRole="link"
          accessibilityLabel={link.label}
        >
          <Ionicons name={link.icon} size={18} color={NAVY} />
          <Text style={styles.label}>{link.label}</Text>
          <Ionicons name="chevron-forward" size={16} color={MUTED} />
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginTop: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: LINE,
    paddingTop: 8,
  },
  heading: {
    fontSize: 13,
    fontWeight: "700",
    color: MUTED,
    letterSpacing: 0.3,
    textTransform: "uppercase",
    marginBottom: 4,
    marginTop: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 12,
  },
  rowBorder: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: LINE,
  },
  label: { flex: 1, fontSize: 15, fontWeight: "600", color: INK },
});
