import { Text, ScrollView, StyleSheet, Linking, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { LegalLinks } from "@/components/LegalLinks";
import { NAVY } from "@/theme/brand";

export default function ContactScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Contact us</Text>
      <Text style={styles.paragraph}>
        For support with orders, account, or selling, get in touch:
      </Text>
      <Pressable
        onPress={() => Linking.openURL("mailto:support@rereadz.com")}
        accessibilityRole="link"
        accessibilityLabel="Email support"
      >
        <Text style={styles.link}>support@rereadz.com</Text>
      </Pressable>
      <Pressable
        onPress={() => router.push("/help" as any)}
        accessibilityRole="link"
        accessibilityLabel="Help"
        style={styles.help}
      >
        <Text style={styles.link}>Help Centre</Text>
      </Pressable>
      <Text style={styles.paragraph}>
        Include your order ID or account email so we can help you quickly.
      </Text>
      <LegalLinks />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16 },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 16 },
  paragraph: { fontSize: 14, color: "#475569", lineHeight: 22, marginBottom: 12 },
  help: { marginBottom: 8 },
  link: { fontSize: 16, color: NAVY, fontWeight: "700", marginBottom: 8 },
});
