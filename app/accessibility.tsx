import { View, Text, ScrollView, StyleSheet } from "react-native";

export default function AccessibilityScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Accessibility</Text>
      <Text style={styles.paragraph}>
        We aim to make ReReadz usable for everyone. The app supports system font scaling and works with screen readers where supported by the platform.
      </Text>
      <Text style={styles.paragraph}>
        If you encounter an accessibility issue, please contact support so we can improve.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16 },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 16 },
  paragraph: { fontSize: 14, color: "#475569", lineHeight: 22, marginBottom: 12 },
});
