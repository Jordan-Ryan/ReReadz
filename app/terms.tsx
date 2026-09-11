import { ScrollView, StyleSheet, Text } from "react-native";
import { LEGAL_LEAD, MARKETPLACE_TERMS } from "@/content/legal";
import { LegalLinks } from "@/components/LegalLinks";
import { INK, MUTED, WHITE } from "@/theme/brand";

export default function TermsScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>{MARKETPLACE_TERMS.title}</Text>
      <Text style={styles.lead}>{LEGAL_LEAD}</Text>
      {MARKETPLACE_TERMS.paragraphs.map((paragraph) => (
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
  title: { fontSize: 22, fontWeight: "800", color: INK, marginBottom: 10 },
  lead: { fontSize: 15, lineHeight: 22, color: INK, fontWeight: "600", marginBottom: 14 },
  body: { fontSize: 14, lineHeight: 21, color: MUTED, marginBottom: 10 },
});
