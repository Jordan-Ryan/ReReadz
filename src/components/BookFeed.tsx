import { View, StyleSheet } from "react-native";
import { BookCard, type BookCardData } from "@/components/BookCard";
import {
  FEED_CELL_PAD,
  FEED_GRID_PAD,
  useFeedColumns,
} from "@/hooks/useFeedColumns";

interface BookFeedProps {
  books: BookCardData[];
}

export function BookFeed({ books }: BookFeedProps) {
  const columns = useFeedColumns();
  const cellWidth = `${100 / columns}%` as const;

  return (
    <View style={styles.grid}>
      {books.map((book) => (
        <View key={book.id} style={[styles.cell, { width: cellWidth }]}>
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
    paddingHorizontal: FEED_GRID_PAD,
  },
  cell: {
    paddingHorizontal: FEED_CELL_PAD,
    marginBottom: 10,
  },
});
