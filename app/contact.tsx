import { View, Text, ScrollView, StyleSheet, Linking, Pressable } from "react-native";

export default function ContactScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Contact us</Text>
      <Text style={styles.paragraph}>
        For support with orders, account, or selling, get in touch:
      </Text>
      <Pressable onPress={() => Linking.openURL("mailto:support@rereadz.com")}>
        <Text style={styles.link}>support@rereadz.com</Text>
      </Pressable>
      <Text style={styles.paragraph}>
        Include your order ID or account email so we can help you quickly.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16 },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 16 },
  paragraph: { fontSize: 14, color: "#475569", lineHeight: 22, marginBottom: 12 },
  link: { fontSize: 16, color: "#0ea5e9", fontWeight: "500", marginBottom: 8 },
});
