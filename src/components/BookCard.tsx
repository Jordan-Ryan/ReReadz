import React, { useEffect, useMemo, useState } from "react";
import { View, Text, Pressable, StyleSheet, Image, Platform } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { formatCondition, formatPrice } from "@/utils/format";
import { listingCoverCandidates } from "@/utils/cover";
import { useFavourites } from "@/hooks/useFavourites";
import {
  BADGE_FREQUENT,
  BADGE_SOLD,
  COVER_PAPER,
  COVER_SPINE,
  FONT_SANS,
  INK,
  MUTED,
  NAVY,
  SHIELD_NAME,
  WHITE,
} from "@/theme/brand";

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
  format?: string;
  created_at?: string;
  status?: string;
  frequent?: boolean;
}

interface BookCardProps {
  book: BookCardData;
  /** When true, card fills container width (e.g. in grid). */
  flex?: boolean;
  /** Wider merchandising tile for Home editorial shelves. */
  featured?: boolean;
}

export function BookCard({ book, flex, featured }: BookCardProps) {
  const router = useRouter();
  const { isFavourite, toggleFavourite } = useFavourites();
  const slug = book.slug ?? book.id;
  const linkTo = `/listing/${slug}`;
  const coverCandidates = useMemo(
    () => listingCoverCandidates(book),
    [book.image_url, book.primary_image_url, book.isbn13, book.isbn10]
  );
  const coverKey = coverCandidates.join("|");
  const [coverIndex, setCoverIndex] = useState(0);
  const sold = (book.status ?? "").toLowerCase() === "sold";
  const favoured = isFavourite(book.id);
  const metaLine = [book.author, formatCondition(book.condition)]
    .filter((part) => part && part !== "Unknown")
    .join(" · ");

  useEffect(() => {
    setCoverIndex(0);
  }, [book.id, coverKey]);

  const coverUrl = coverCandidates[coverIndex] ?? null;
  const showCover = Boolean(coverUrl);

  return (
    <Pressable
      style={[styles.card, flex && styles.cardFlex, featured && styles.cardFeatured]}
      onPress={() => router.push(linkTo as any)}
      accessibilityRole="link"
      accessibilityLabel={`${book.title}, ${formatPrice(book.price_minor)}`}
    >
      <View
        style={[
          styles.imageWrap,
          flex && styles.imageWrapFlex,
          featured && styles.imageWrapFeatured,
        ]}
      >
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

        {book.frequent && !sold ? (
          <View style={styles.frequent} accessibilityRole="text">
            <Text style={styles.frequentText}>{BADGE_FREQUENT}</Text>
          </View>
        ) : null}

        <Pressable
          style={styles.heart}
          onPress={() => {
            void toggleFavourite(book.id);
          }}
          accessibilityRole="button"
          accessibilityLabel={
            favoured ? "Remove from favourites" : "Save to favourites"
          }
          hitSlop={8}
        >
          <Ionicons
            name={favoured ? "heart" : "heart-outline"}
            size={16}
            color={favoured ? NAVY : INK}
          />
        </Pressable>

        {sold ? (
          <View style={styles.soldBar} accessibilityRole="text">
            <Text style={styles.soldText}>{BADGE_SOLD}</Text>
          </View>
        ) : null}
      </View>
      <View style={styles.meta}>
        <Text style={styles.title} numberOfLines={2}>
          {book.title}
        </Text>
        {metaLine ? (
          <Text style={styles.detail} numberOfLines={1}>
            {metaLine}
          </Text>
        ) : null}
        <View style={styles.priceBlock}>
          <Text style={styles.price}>{formatPrice(book.price_minor)}</Text>
          {!sold ? (
            <View style={styles.shieldRow}>
              <Ionicons name="shield-checkmark" size={12} color={NAVY} />
              <Text style={styles.shield}>{SHIELD_NAME}</Text>
            </View>
          ) : null}
        </View>
      </View>
    </Pressable>
  );
}

const CARD_WIDTH = 120;
const FEATURED_WIDTH = 156;

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    marginRight: 10,
  },
  cardFlex: { width: "100%", marginRight: 0 },
  cardFeatured: {
    width: FEATURED_WIDTH,
  },
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
  imageWrapFeatured: {
    width: FEATURED_WIDTH,
  },
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
  heart: {
    position: "absolute",
    right: 6,
    bottom: 6,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.92)",
    alignItems: "center",
    justifyContent: "center",
  },
  frequent: {
    position: "absolute",
    top: 6,
    left: 6,
    backgroundColor: WHITE,
    borderRadius: 999,
    paddingHorizontal: 7,
    paddingVertical: 3,
  },
  frequentText: {
    fontSize: 10,
    fontWeight: "700",
    color: NAVY,
    letterSpacing: 0.2,
  },
  soldBar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(15,23,42,0.72)",
    paddingVertical: 6,
    alignItems: "center",
  },
  soldText: {
    color: WHITE,
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },
  meta: {
    paddingTop: 6,
    paddingHorizontal: 0,
  },
  title: {
    fontFamily: FONT_SANS,
    fontSize: 12,
    lineHeight: 15,
    fontWeight: "600",
    color: INK,
  },
  detail: {
    fontFamily: FONT_SANS,
    fontSize: 11,
    lineHeight: 14,
    color: MUTED,
    marginTop: 2,
  },
  priceBlock: {
    marginTop: 3,
    gap: 2,
  },
  price: {
    fontFamily: FONT_SANS,
    fontSize: 13,
    lineHeight: 16,
    fontWeight: "700",
    color: INK,
  },
  shieldRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  shield: {
    fontSize: 11,
    lineHeight: 13,
    fontWeight: "600",
    color: NAVY,
  },
});
