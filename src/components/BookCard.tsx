import React from "react";
import { View, Text, Pressable, StyleSheet, Image } from "react-native";
import { useRouter } from "expo-router";
import { formatPrice } from "@/utils/format";
import { DELIVERY_LINE, INK, MUTED, SURFACE } from "@/theme/brand";

export interface BookCardData {
  id: string;
  slug?: string | null;
  title: string;
  author: string;
  price_minor: number;
  image_url?: string | null;
  condition?: string;
  created_at?: string;
}

interface BookCardProps {
  book: BookCardData;
  /** When true, card fills container width (e.g. in grid). */
  flex?: boolean;
}

export function BookCard({ book, flex }: BookCardProps) {
  const router = useRouter();
  const slug = book.slug ?? book.id;
  const linkTo = `/listing/${slug}`;

  return (
    <Pressable
      style={[styles.card, flex && styles.cardFlex]}
      onPress={() => router.push(linkTo as any)}
      accessibilityRole="link"
      accessibilityLabel={`${book.title}, ${formatPrice(book.price_minor)}`}
    >
      <View style={[styles.imageWrap, flex && styles.imageWrapFlex]}>
        {book.image_url ? (
          <Image
            source={{ uri: book.image_url }}
            style={styles.image}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.placeholderImage}>
            <Text style={styles.placeholderText}>No cover</Text>
          </View>
        )}
      </View>
      <Text style={styles.title} numberOfLines={2}>
        {book.title}
      </Text>
      <Text style={styles.price}>{formatPrice(book.price_minor)}</Text>
      <Text style={styles.delivery}>{DELIVERY_LINE}</Text>
    </Pressable>
  );
}

const CARD_WIDTH = 120;

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    marginRight: 12,
  },
  cardFlex: { width: "100%", marginRight: 0 },
  imageWrap: {
    width: CARD_WIDTH,
    aspectRatio: 3 / 4,
    borderRadius: 4,
    overflow: "hidden",
    backgroundColor: SURFACE,
  },
  imageWrapFlex: { width: "100%" },
  image: {
    width: "100%",
    height: "100%",
  },
  placeholderImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: { fontSize: 10, color: MUTED },
  title: { fontSize: 13, fontWeight: "600", marginTop: 8, color: INK },
  price: { fontSize: 13, fontWeight: "700", marginTop: 4, color: INK },
  delivery: { fontSize: 11, color: MUTED, marginTop: 2 },
});