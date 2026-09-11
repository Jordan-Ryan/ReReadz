import { Pressable, ScrollView, StyleSheet, Text } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { INK, LINE, MUTED, WHITE } from "@/theme/brand";

const DOCS = [
  { href: "/terms", label: "Terms & Conditions" },
  { href: "/privacy", label: "Privacy policy" },
  { href: "/cookie", label: "Cookie policy" },
  { href: "/accessibility", label: "Accessibility" },
] as const;

export default function LegalScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.lead}>
        ReReadz policies that apply in this app. Each opens the full document.
      </Text>
      {DOCS.map((doc) => (
        <Pressable
          key={doc.href}
          style={styles.row}
          onPress={() => router.push(doc.href as any)}
          accessibilityRole="link"
          accessibilityLabel={doc.label}
        >
          <Text style={styles.label}>{doc.label}</Text>
          <Ionicons name="chevron-forward" size={18} color={MUTED} />
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: WHITE },
  content: { padding: 16, paddingBottom: 32 },
  lead: { fontSize: 14, color: MUTED, lineHeight: 20, marginBottom: 12 },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: LINE,
  },
  label: { flex: 1, fontSize: 16, fontWeight: "600", color: INK },
});
