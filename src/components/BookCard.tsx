import React from "react";
import { View, Text, Pressable, StyleSheet, Image, Platform } from "react-native";
import { useRouter } from "expo-router";
import { coverInitial, coverTone, formatPrice } from "@/utils/format";
import { DELIVERY_LINE, INK, MUTED, NAVY, WHITE } from "@/theme/brand";

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
  const initial = coverInitial(book.title);
  const emptyTone = !book.image_url && initial ? coverTone(book.title) : undefined;

  return (
    <Pressable
      style={[styles.card, flex && styles.cardFlex]}
      onPress={() => router.push(linkTo as any)}
      accessibilityRole="link"
      accessibilityLabel={`${book.title}, ${formatPrice(book.price_minor)}`}
    >
      <View
        style={[
          styles.imageWrap,
          flex && styles.imageWrapFlex,
          emptyTone ? styles.imageWrapInitial : null,
          emptyTone ? { backgroundColor: emptyTone } : null,
        ]}
      >
        {book.image_url ? (
          <Image
            source={{ uri: book.image_url }}
            style={styles.image}
            resizeMode="cover"
            accessibilityIgnoresInvertColors
          />
        ) : initial ? (
          <Text style={styles.initial} accessibilityLabel={`${book.title} cover`}>
            {initial}
          </Text>
        ) : null}
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
    marginRight: 8,
  },
  cardFlex: { width: "100%", marginRight: 0 },
  imageWrap: {
    width: CARD_WIDTH,
    aspectRatio: 3 / 4,
    borderRadius: 4,
    overflow: "hidden",
    backgroundColor: WHITE,
    position: "relative",
  },
  imageWrapFlex: { width: "100%" },
  imageWrapInitial: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
    ...(Platform.OS === "web" ? { objectFit: "cover" as const } : {}),
  },
  initial: {
    fontSize: 36,
    fontWeight: "600",
    color: NAVY,
    letterSpacing: 0.6,
    opacity: 0.88,
  },
  title: { fontSize: 13, fontWeight: "600", marginTop: 4, color: INK },
  price: { fontSize: 13, fontWeight: "700", marginTop: 2, color: INK },
  delivery: { fontSize: 11, color: MUTED, marginTop: 1 },
});
