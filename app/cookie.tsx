import { View, Text, ScrollView, StyleSheet } from "react-native";

export default function CookieScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Cookie Policy</Text>
      <Text style={styles.paragraph}>
        This app may use local storage (similar to cookies) to keep you signed in and remember preferences. We do not use third-party advertising cookies.
      </Text>
      <Text style={styles.paragraph}>
        For full details, see the ReReadz website cookie policy.
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
