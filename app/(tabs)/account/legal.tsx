import { ScrollView, StyleSheet, Text, View } from "react-native";
import {
  ALL_LEGAL_SECTIONS,
  LEGAL_LEAD,
} from "@/content/legal";
import { LegalLinks } from "@/components/LegalLinks";
import { INK, MUTED, WHITE } from "@/theme/brand";

export default function LegalScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.lead}>{LEGAL_LEAD}</Text>
      {ALL_LEGAL_SECTIONS.map((section) => (
        <View key={section.title} style={styles.block}>
          <Text style={styles.heading}>{section.title}</Text>
          {section.paragraphs.map((paragraph) => (
            <Text key={paragraph} style={styles.body}>
              {paragraph}
            </Text>
          ))}
        </View>
      ))}
      <LegalLinks />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: WHITE },
  content: { padding: 16, paddingBottom: 40 },
  lead: { fontSize: 15, lineHeight: 22, color: INK, fontWeight: "600", marginBottom: 16 },
  block: { marginBottom: 20 },
  heading: { fontSize: 17, fontWeight: "700", color: INK, marginBottom: 8 },
  body: { fontSize: 14, lineHeight: 21, color: MUTED, marginBottom: 8 },
});
