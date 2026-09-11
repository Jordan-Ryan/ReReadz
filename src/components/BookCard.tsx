import React, { useEffect, useMemo, useState } from "react";
import { View, Text, Pressable, StyleSheet, Image, Platform } from "react-native";
import { useRouter } from "expo-router";
import { formatPrice } from "@/utils/format";
import { listingCoverCandidates } from "@/utils/cover";
import { COVER_PAPER, COVER_SPINE, DELIVERY_LINE, INK, MUTED, WHITE } from "@/theme/brand";

export interface BookCardData {
  id: string;
  slug?: string | null;
  title: string;
  author: string;
  price_minor: number;
  image_url?: string | null;
  primary_image_url?: string | null;
  isbn13?: string | null;
  isbn10?: string | null;
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
  const coverCandidates = useMemo(
    () => listingCoverCandidates(book),
    [book.image_url, book.primary_image_url, book.isbn13, book.isbn10]
  );
  const coverKey = coverCandidates.join("|");
  const [coverIndex, setCoverIndex] = useState(0);

  useEffect(() => {
    setCoverIndex(0);
  }, [book.id, coverKey]);

  const coverUrl = coverCandidates[coverIndex] ?? null;
  const showCover = Boolean(coverUrl);

  return (
    <Pressable
      style={[styles.card, flex && styles.cardFlex]}
      onPress={() => router.push(linkTo as any)}
      accessibilityRole="link"
      accessibilityLabel={`${book.title}, ${formatPrice(book.price_minor)}`}
    >
      <View style={[styles.imageWrap, flex && styles.imageWrapFlex]}>
        {showCover ? (
          <Image
            source={{ uri: coverUrl as string }}
            style={styles.image}
            resizeMode="cover"
            accessibilityIgnoresInvertColors
            accessibilityLabel={`${book.title} cover`}
            onError={() => {
              console.warn("BookCard cover failed", {
                id: book.id,
                coverUrl,
              });
              setCoverIndex((index) => index + 1);
            }}
          />
        ) : (
          <View
            style={styles.quietCover}
            accessibilityLabel={`${book.title} cover unavailable`}
          >
            <View style={styles.spine} />
          </View>
        )}
      </View>
      <View style={styles.meta}>
        <Text style={styles.title} numberOfLines={2}>
          {book.title}
        </Text>
        <Text style={styles.price}>{formatPrice(book.price_minor)}</Text>
        <Text style={styles.delivery}>{DELIVERY_LINE}</Text>
      </View>
    </Pressable>
  );
}

const CARD_WIDTH = 120;

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    marginRight: 10,
  },
  cardFlex: { width: "100%", marginRight: 0 },
  imageWrap: {
    width: CARD_WIDTH,
    aspectRatio: 3 / 4,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: WHITE,
    position: "relative",
    padding: 0,
  },
  imageWrapFlex: { width: "100%", alignSelf: "stretch" },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
    ...(Platform.OS === "web"
      ? { objectFit: "cover" as const, objectPosition: "center" as const }
      : {}),
  },
  quietCover: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COVER_PAPER,
    flexDirection: "row",
  },
  spine: {
    width: 5,
    height: "100%",
    backgroundColor: COVER_SPINE,
  },
  meta: {
    paddingTop: 6,
    paddingHorizontal: 0,
  },
  title: {
    fontSize: 12,
    lineHeight: 15,
    fontWeight: "600",
    color: INK,
  },
  price: {
    fontSize: 13,
    lineHeight: 16,
    fontWeight: "700",
    color: INK,
    marginTop: 2,
  },
  delivery: {
    fontSize: 11,
    lineHeight: 14,
    color: MUTED,
    marginTop: 0,
  },
});
