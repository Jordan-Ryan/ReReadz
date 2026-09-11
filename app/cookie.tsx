import { ScrollView, StyleSheet, Text } from "react-native";
import { STORAGE_TERMS } from "@/content/legal";
import { LegalLinks } from "@/components/LegalLinks";
import { INK, MUTED, WHITE } from "@/theme/brand";

export default function CookieScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>{STORAGE_TERMS.title}</Text>
      {STORAGE_TERMS.paragraphs.map((paragraph) => (
        <Text key={paragraph} style={styles.body}>
          {paragraph}
        </Text>
      ))}
      <LegalLinks />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: WHITE },
  content: { padding: 16, paddingBottom: 40 },
  title: { fontSize: 22, fontWeight: "800", color: INK, marginBottom: 12 },
  body: { fontSize: 14, lineHeight: 21, color: MUTED, marginBottom: 10 },
});
