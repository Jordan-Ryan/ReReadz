import { View, Text, Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { TrustPills } from "@/components/TrustPills";
import type { HomeCollection } from "@/components/CategoryGrid";
import {
  CTA_BROWSE,
  CTA_LIST,
  HERO_SUBTITLE,
  HERO_TITLE,
  HOT_OFF_PRESS,
  INK,
  LINE,
  LIVE_NOW,
  MUTED,
  NAVY,
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
  liveBooks: number | null;
  liveReaders: number | null;
  onBrowse: (params?: Record<string, string>) => void;
}

export function HomeHero({
  collections,
  liveBooks,
  liveReaders,
  onBrowse,
}: HomeHeroProps) {
  const router = useRouter();

  return (
    <View style={styles.wrap}>
      <Text style={styles.eyebrow}>{HOT_OFF_PRESS}</Text>
      <Text style={styles.title}>{HERO_TITLE}</Text>
      <Text style={styles.sub}>{HERO_SUBTITLE}</Text>

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

      <TrustPills />

      {(liveBooks != null || liveReaders != null) && (
        <Text style={styles.live} accessibilityRole="text">
          {LIVE_NOW}
          {liveBooks != null ? ` · ${liveBooks.toLocaleString("en-GB")} books to buy` : ""}
          {liveReaders != null
            ? ` · ${liveReaders.toLocaleString("en-GB")} readers`
            : ""}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    paddingTop: 16,
    paddingBottom: 4,
  },
  eyebrow: {
    paddingHorizontal: 16,
    fontSize: 12,
    fontWeight: "700",
    color: NAVY,
    letterSpacing: 0.4,
    textTransform: "uppercase",
  },
  title: {
    paddingHorizontal: 16,
    marginTop: 6,
    fontSize: 28,
    lineHeight: 32,
    fontWeight: "800",
    color: INK,
    letterSpacing: -0.7,
  },
  sub: {
    paddingHorizontal: 16,
    marginTop: 8,
    fontSize: 14,
    lineHeight: 20,
    color: MUTED,
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
    borderColor: LINE,
    backgroundColor: "rgba(255,255,255,0.72)",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  chipText: { fontSize: 13, color: INK, fontWeight: "600" },
  actions: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    paddingHorizontal: 16,
    marginTop: 14,
  },
  primary: {
    backgroundColor: NAVY,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
  },
  primaryText: { color: WHITE, fontWeight: "700", fontSize: 13 },
  secondary: {
    backgroundColor: "rgba(23,0,173,0.08)",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
  },
  secondaryText: { color: NAVY, fontWeight: "700", fontSize: 13 },
  live: {
    paddingHorizontal: 16,
    paddingTop: 4,
    fontSize: 13,
    fontWeight: "600",
    color: NAVY,
  },
});
