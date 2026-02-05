import { View, Text, ScrollView, StyleSheet } from "react-native";

export default function PrivacyScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Privacy Policy</Text>
      <Text style={styles.paragraph}>
        ReReadz respects your privacy. We collect and use your data to provide the marketplace, process payments, and communicate with you about orders and account.
      </Text>
      <Text style={styles.paragraph}>
        We do not sell your personal data. Data is stored securely and used in line with applicable data protection laws. For the full policy, see the ReReadz website.
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
