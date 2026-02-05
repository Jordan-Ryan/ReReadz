import React from "react";
import { View, Text, ScrollView, StyleSheet, ActivityIndicator } from "react-native";
import { BookCard, type BookCardData } from "./BookCard";

interface BookCarouselProps {
  title: string;
  books: BookCardData[];
  isLoading: boolean;
  emptyMessage?: string;
}

export function BookCarousel({
  title,
  books,
  isLoading,
  emptyMessage = "No books yet.",
}: BookCarouselProps) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {isLoading ? (
        <View style={styles.loader}>
          <ActivityIndicator size="small" />
        </View>
      ) : books.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>{emptyMessage}</Text>
        </View>
      ) : (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  section: { marginBottom: 24 },
  sectionTitle: { fontSize: 18, fontWeight: "700", marginBottom: 12 },
  loader: { height: 200, justifyContent: "center" },
  empty: { height: 120, justifyContent: "center" },
  emptyText: { color: "#64748b", fontSize: 14 },
  scrollContent: { paddingRight: 16 },
});
