import { ScrollView, StyleSheet, Text } from "react-native";
import { ACCESS_TERMS } from "@/content/legal";
import { INK, MUTED, WHITE } from "@/theme/brand";

export default function AccessibilityScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>{ACCESS_TERMS.title}</Text>
      {ACCESS_TERMS.paragraphs.map((paragraph) => (
        <Text key={paragraph} style={styles.body}>
          {paragraph}
        </Text>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: WHITE },
  content: { padding: 16, paddingBottom: 40 },
  title: { fontSize: 22, fontWeight: "800", color: INK, marginBottom: 12 },
  body: { fontSize: 14, lineHeight: 21, color: MUTED, marginBottom: 10 },
});
