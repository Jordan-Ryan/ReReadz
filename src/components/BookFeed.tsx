import { View, StyleSheet } from "react-native";
import { BookCard, type BookCardData } from "@/components/BookCard";

interface BookFeedProps {
  books: BookCardData[];
}

export function BookFeed({ books }: BookFeedProps) {
  return (
    <View style={styles.grid}>
      {books.map((book) => (
        <View key={book.id} style={styles.cell}>
          <BookCard book={book} flex />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 8,
  },
  cell: {
    width: "50%",
    paddingHorizontal: 4,
    marginBottom: 16,
  },
});