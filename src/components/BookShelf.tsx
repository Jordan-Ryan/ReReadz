import { View, Text, ScrollView, StyleSheet, ActivityIndicator, Pressable } from "react-native";
import { BookCard, type BookCardData } from "@/components/BookCard";
import { FONT_DISPLAY, FONT_SANS, INK, MUTED, NAVY } from "@/theme/brand";

interface BookShelfProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  books: BookCardData[];
  isLoading: boolean;
  emptyMessage?: string;
  onSeeAll?: () => void;
  seeAllLabel?: string;
  featured?: boolean;
}

/** Horizontal merchandising shelf — not a Browse results grid. */
export function BookShelf({
  eyebrow,
  title,
  subtitle,
  books,
  isLoading,
  emptyMessage = "No books yet.",
  onSeeAll,
  seeAllLabel,
  featured,
}: BookShelfProps) {
  return (
    <View style={styles.section}>
      <View style={styles.head}>
        <View style={styles.copy}>
          {eyebrow ? <Text style={styles.eyebrow}>{eyebrow}</Text> : null}
          <Text style={styles.title}>{title}</Text>
          {subtitle ? <Text style={styles.sub}>{subtitle}</Text> : null}
        </View>
        {onSeeAll && seeAllLabel ? (
          <Pressable
            onPress={onSeeAll}
            accessibilityRole="button"
            accessibilityLabel={seeAllLabel}
          >
            <Text style={styles.seeAll}>{seeAllLabel}</Text>
          </Pressable>
        ) : null}
      </View>
      {isLoading ? (
        <View style={styles.loader}>
          <ActivityIndicator size="small" color={NAVY} />
        </View>
      ) : books.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>{emptyMessage}</Text>
        </View>
      ) : (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.row}
        >
          {books.map((book) => (
            <BookCard key={book.id} book={book} featured={featured} />
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  section: { paddingTop: 10, paddingBottom: 4 },
  head: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginBottom: 8,
    gap: 12,
  },
  copy: { flex: 1 },
  eyebrow: {
    fontFamily: FONT_DISPLAY,
    fontSize: 12,
    fontWeight: "700",
    color: NAVY,
    letterSpacing: 0.3,
    marginBottom: 2,
  },
  title: {
    fontFamily: FONT_DISPLAY,
    fontSize: 20,
    fontWeight: "800",
    color: INK,
    letterSpacing: -0.3,
  },
  sub: {
    marginTop: 4,
    fontFamily: FONT_SANS,
    fontSize: 13,
    color: MUTED,
    lineHeight: 18,
  },
  seeAll: { fontSize: 13, fontWeight: "700", color: NAVY },
  loader: { height: 180, justifyContent: "center" },
  empty: { paddingHorizontal: 16, paddingVertical: 20 },
  emptyText: { color: MUTED, fontSize: 14 },
  row: { paddingHorizontal: 16 },
});
