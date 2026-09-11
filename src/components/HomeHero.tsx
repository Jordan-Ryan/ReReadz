import { View, Text, Pressable, StyleSheet, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import type { BookCardData } from "@/components/BookCard";
import { listingCoverCandidates } from "@/utils/cover";
import type { HomeCollection } from "@/components/CategoryGrid";
import { useDesktopShell } from "@/hooks/useDesktopShell";
import {
  CTA_BROWSE,
  CTA_LIST,
  FONT_DISPLAY,
  FONT_SANS,
  FONT_SERIF,
  GOLD,
  HERO_SUBTITLE,
  HERO_TITLE,
  HOT_OFF_PRESS,
  LIVE_NOW,
  NAVY,
  TRUST_PILLS,
  WHITE,
} from "@/theme/brand";

const QUICK_CHIPS: {
  label: string;
  categoryNeedles?: string[];
  condition?: string;
  maxPrice?: string;
}[] = [
  { label: "New releases" },
  { label: "Under £5", maxPrice: "500" },
  { label: "Like new", condition: "like_new" },
  { label: "Crime & thriller", categoryNeedles: ["crime", "thriller"] },
  { label: "Romance", categoryNeedles: ["romance"] },
];

function findSlug(
  collections: HomeCollection[],
  needles: string[]
): string | undefined {
  const match = collections.find((cat) => {
    const hay = `${cat.slug ?? ""} ${cat.name}`.toLowerCase();
    return needles.some((needle) => hay.includes(needle));
  });
  return match?.slug ?? match?.id;
}

interface HomeHeroProps {
  collections: HomeCollection[];
  covers?: BookCardData[];
  liveBooks: number | null;
  liveReaders: number | null;
  topInset?: number;
  onBrowse: (params?: Record<string, string>) => void;
}

export function HomeHero({
  collections,
  covers = [],
  liveBooks,
  liveReaders,
  topInset = 0,
  onBrowse,
}: HomeHeroProps) {
  const router = useRouter();
  const isDesktop = useDesktopShell();
  const collage = covers
    .map((book) => listingCoverCandidates(book)[0])
    .filter(Boolean)
    .slice(0, 6) as string[];

  return (
    <View style={[styles.hero, isDesktop && styles.heroDesktop]}>
      <View style={styles.collage} pointerEvents="none">
        {collage.map((uri) => (
          <Image key={uri} source={{ uri }} style={styles.collageImage} />
        ))}
      </View>
      <View style={styles.wash} pointerEvents="none" />

      <View style={[styles.copy, { paddingTop: topInset + (isDesktop ? 28 : 20) }]}>
      <View style={styles.eyebrowPill}>
        <Ionicons name="sparkles" size={12} color={WHITE} />
        <Text style={styles.eyebrow}>{HOT_OFF_PRESS}</Text>
      </View>
      <Text style={[styles.title, isDesktop && styles.titleDesktop]}>
        {HERO_TITLE.replace("pre-loved books", "").trimEnd()}{" "}
        <Text style={styles.titleGold}>pre-loved books</Text>
      </Text>
      <Text style={[styles.sub, isDesktop && styles.subDesktop]}>{HERO_SUBTITLE}</Text>

      <View style={styles.chipRow}>
        {QUICK_CHIPS.map((chip) => (
          <Pressable
            key={chip.label}
            style={styles.chip}
            onPress={() => {
              const params: Record<string, string> = {};
              if (chip.condition) params.condition = chip.condition;
              if (chip.maxPrice) params.maxPrice = chip.maxPrice;
              if (chip.categoryNeedles) {
                const slug = findSlug(collections, chip.categoryNeedles);
                if (slug) params.category = slug;
              }
              onBrowse(params);
            }}
            accessibilityRole="button"
            accessibilityLabel={chip.label}
          >
            <Text style={styles.chipText}>{chip.label}</Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.actions}>
        <Pressable
          style={styles.primary}
          onPress={() => onBrowse()}
          accessibilityRole="button"
          accessibilityLabel={CTA_BROWSE}
        >
          <Text style={styles.primaryText}>{CTA_BROWSE}</Text>
        </Pressable>
        <Pressable
          style={styles.secondary}
          onPress={() => router.push("/(tabs)/sell" as any)}
          accessibilityRole="button"
          accessibilityLabel={CTA_LIST}
        >
          <Text style={styles.secondaryText}>{CTA_LIST}</Text>
        </Pressable>
      </View>

      <View style={styles.trust} accessibilityRole="text">
        {TRUST_PILLS.map((pill, index) => (
          <View key={pill} style={styles.trustPill}>
            <Ionicons
              name={
                index === 0
                  ? "bicycle-outline"
                  : index === 1
                    ? "shield-checkmark-outline"
                    : "cash-outline"
              }
              size={13}
              color={WHITE}
            />
            <Text style={styles.trustItem}>{pill}</Text>
          </View>
        ))}
      </View>

      {(liveBooks != null || liveReaders != null) && (
        <Text style={styles.live} accessibilityRole="text">
          {LIVE_NOW}
          {liveBooks != null
            ? ` · ${liveBooks.toLocaleString("en-GB")} books to buy`
            : ""}
          {liveReaders != null
            ? ` · ${liveReaders.toLocaleString("en-GB")} readers`
            : ""}
        </Text>
      )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: {
    backgroundColor: "#111118",
    paddingBottom: 22,
    overflow: "hidden",
    position: "relative",
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  heroDesktop: {
    paddingBottom: 36,
  },
  copy: {
    maxWidth: 720,
  },
  collage: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: "row",
    opacity: 0.5,
  },
  collageImage: {
    flex: 1,
    height: "100%",
  },
  wash: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(8, 6, 18, 0.52)",
  },
  eyebrowPill: {
    alignSelf: "flex-start",
    marginHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(255,255,255,0.12)",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  eyebrow: {
    fontFamily: FONT_DISPLAY,
    fontSize: 11,
    fontWeight: "700",
    color: WHITE,
    letterSpacing: 0.6,
    textTransform: "uppercase",
  },
  title: {
    paddingHorizontal: 16,
    marginTop: 10,
    fontFamily: FONT_SERIF,
    fontSize: 32,
    lineHeight: 38,
    fontWeight: "800",
    color: WHITE,
    letterSpacing: -0.5,
  },
  titleGold: {
    color: GOLD,
    fontFamily: FONT_SERIF,
    fontWeight: "800",
  },
  titleDesktop: {
    fontSize: 56,
    lineHeight: 62,
    letterSpacing: -0.8,
  },
  sub: {
    paddingHorizontal: 16,
    marginTop: 8,
    fontFamily: FONT_SANS,
    fontSize: 14,
    lineHeight: 20,
    color: "rgba(255,255,255,0.88)",
  },
  subDesktop: {
    fontSize: 16,
    lineHeight: 24,
    maxWidth: 560,
  },
  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    paddingHorizontal: 16,
    paddingTop: 14,
  },
  chip: {
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.28)",
    backgroundColor: "rgba(255,255,255,0.12)",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  chipText: { fontSize: 13, color: WHITE, fontWeight: "600" },
  actions: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    paddingHorizontal: 16,
    marginTop: 14,
  },
  primary: {
    backgroundColor: NAVY,
    paddingHorizontal: 16,
    paddingVertical: 11,
    borderRadius: 999,
  },
  primaryText: { color: WHITE, fontWeight: "700", fontSize: 13 },
  secondary: {
    backgroundColor: "rgba(255,255,255,0.12)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.35)",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
  },
  secondaryText: { color: WHITE, fontWeight: "700", fontSize: 13 },
  trust: {
    paddingHorizontal: 16,
    paddingTop: 12,
    gap: 6,
  },
  trustPill: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(255,255,255,0.10)",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  trustItem: {
    fontFamily: FONT_SANS,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "600",
    color: "rgba(255,255,255,0.92)",
  },
  live: {
    paddingHorizontal: 16,
    paddingTop: 12,
    fontFamily: FONT_SANS,
    fontSize: 13,
    fontWeight: "600",
    color: WHITE,
  },
});
