import { View, Text, ScrollView, StyleSheet } from "react-native";

export default function AboutScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>About ReReadz</Text>
      <Text style={styles.paragraph}>
        ReReadz is a marketplace for buying and selling second-hand books. We help readers find affordable books and give used books a new life.
      </Text>
      <Text style={styles.paragraph}>
        Sellers list books they no longer need; buyers discover and purchase them. Payments are held securely until delivery, and sellers receive payouts to their bank account.
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
