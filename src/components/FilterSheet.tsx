import { useState } from "react";
import {
  Modal,
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
  Platform,
} from "react-native";
import type { Category } from "@/hooks/useCategories";
import type { ListingSort } from "@/hooks/useListings";
import { formatBookFormat, formatCondition } from "@/utils/format";
import { BlurView } from "expo-blur";
import { Glass } from "@/components/Glass";
import { NAVY, NAVY_SOFT, INK, LINE, WHITE, GLASS_FILL_STRONG } from "@/theme/brand";

export type FilterDimension = "sort" | "price" | "condition" | "format" | "category";

export interface AppliedFilters {
  sort: ListingSort;
  condition?: string;
  format?: string;
  category?: string;
  minPriceMinor?: number;
  maxPriceMinor?: number;
}

export const PRICE_PRESETS: {
  label: string;
  minPriceMinor?: number;
  maxPriceMinor?: number;
}[] = [
  { label: "Any price" },
  { label: "Under £5", maxPriceMinor: 500 },
  { label: "£5–£10", minPriceMinor: 500, maxPriceMinor: 1000 },
  { label: "£10–£20", minPriceMinor: 1000, maxPriceMinor: 2000 },
  { label: "£20+", minPriceMinor: 2000 },
];

export const CONDITIONS = ["like_new", "very_good", "good", "acceptable"] as const;
export const FORMATS = ["paperback", "hardcover", "ebook", "audiobook"] as const;
export const SORTS: { key: ListingSort; label: string }[] = [
  { key: "newest", label: "Newest" },
  { key: "price_asc", label: "Price: low to high" },
  { key: "price_desc", label: "Price: high to low" },
];

interface FilterSheetProps {
  visible: boolean;
  dimension: FilterDimension;
  value: AppliedFilters;
  categories: Category[];
  onClose: () => void;
  onApply: (next: AppliedFilters) => void;
}

export function FilterSheet({
  visible,
  dimension,
  value,
  categories,
  onClose,
  onApply,
}: FilterSheetProps) {
  const [draft, setDraft] = useState<AppliedFilters>(value);

  const title =
    dimension === "sort"
      ? "Sort"
      : dimension === "price"
        ? "Price"
        : dimension === "condition"
          ? "Condition"
          : dimension === "format"
            ? "Format"
            : "Category";

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
      onShow={() => setDraft(value)}
    >
      <Pressable
        style={styles.backdrop}
        onPress={onClose}
        accessibilityLabel="Close filters"
      >
        {Platform.OS === "android" ? (
          <View style={styles.androidDim} />
        ) : (
          <BlurView
            intensity={40}
            tint="systemChromeMaterialLight"
            experimentalBlurMethod="dimezisBlurView"
            style={StyleSheet.absoluteFill}
          />
        )}
      </Pressable>
      <Glass style={styles.sheet} intensity={80} overlayColor={GLASS_FILL_STRONG}>
        <View style={styles.head}>
          <Pressable onPress={onClose} accessibilityRole="button" accessibilityLabel="Close">
            <Text style={styles.headAction}>Close</Text>
          </Pressable>
          <Text style={styles.headTitle}>{title}</Text>
          <Pressable
            onPress={() => {
              const cleared: AppliedFilters = { sort: "newest" };
              setDraft(cleared);
            }}
            accessibilityRole="button"
            accessibilityLabel="Clear filters"
          >
            <Text style={styles.headAction}>Clear</Text>
          </Pressable>
        </View>
        <ScrollView contentContainerStyle={styles.body}>
          {dimension === "sort" &&
            SORTS.map((opt) => (
              <Row
                key={opt.key}
                label={opt.label}
                selected={draft.sort === opt.key}
                onPress={() => setDraft({ ...draft, sort: opt.key })}
              />
            ))}
          {dimension === "price" &&
            PRICE_PRESETS.map((opt) => (
              <Row
                key={opt.label}
                label={opt.label}
                selected={
                  draft.minPriceMinor === opt.minPriceMinor &&
                  draft.maxPriceMinor === opt.maxPriceMinor
                }
                onPress={() =>
                  setDraft({
                    ...draft,
                    minPriceMinor: opt.minPriceMinor,
                    maxPriceMinor: opt.maxPriceMinor,
                  })
                }
              />
            ))}
          {dimension === "condition" && (
            <>
              <Row
                label="Any condition"
                selected={!draft.condition}
                onPress={() => setDraft({ ...draft, condition: undefined })}
              />
              {CONDITIONS.map((c) => (
                <Row
                  key={c}
                  label={formatCondition(c)}
                  selected={draft.condition === c}
                  onPress={() => setDraft({ ...draft, condition: c })}
                />
              ))}
            </>
          )}
          {dimension === "format" && (
            <>
              <Row
                label="Any format"
                selected={!draft.format}
                onPress={() => setDraft({ ...draft, format: undefined })}
              />
              {FORMATS.map((f) => (
                <Row
                  key={f}
                  label={formatBookFormat(f)}
                  selected={draft.format === f}
                  onPress={() => setDraft({ ...draft, format: f })}
                />
              ))}
            </>
          )}
          {dimension === "category" && (
            <>
              <Row
                label="All categories"
                selected={!draft.category}
                onPress={() => setDraft({ ...draft, category: undefined })}
              />
              {categories.map((cat) => {
                const slug = cat.slug ?? cat.id;
                return (
                  <Row
                    key={cat.id}
                    label={cat.name}
                    selected={draft.category === slug}
                    onPress={() => setDraft({ ...draft, category: slug })}
                  />
                );
              })}
            </>
          )}
        </ScrollView>
        <Pressable
          style={styles.apply}
          onPress={() => onApply(draft)}
          accessibilityRole="button"
          accessibilityLabel="Show results"
        >
          <Text style={styles.applyText}>Show results</Text>
        </Pressable>
      </Glass>
    </Modal>
  );
}

function Row({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      style={[styles.row, selected && styles.rowOn]}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected }}
    >
      <Text style={[styles.rowText, selected && styles.rowTextOn]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(15, 23, 42, 0.18)",
    overflow: "hidden",
  },
  androidDim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(15, 23, 42, 0.36)",
  },
  sheet: {
    backgroundColor: "transparent",
    maxHeight: "70%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 16,
    borderWidth: 0,
  },
  head: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: LINE,
  },
  headTitle: { fontSize: 16, fontWeight: "700", color: INK },
  headAction: { fontSize: 14, color: NAVY, fontWeight: "600" },
  body: { paddingVertical: 8, paddingBottom: 24 },
  row: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: LINE,
  },
  rowOn: { backgroundColor: NAVY_SOFT },
  rowText: { fontSize: 15, color: INK },
  rowTextOn: { color: NAVY, fontWeight: "700" },
  apply: {
    marginHorizontal: 16,
    backgroundColor: NAVY,
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
  },
  applyText: { color: WHITE, fontWeight: "700", fontSize: 16 },
});

export function priceChipLabel(filters: AppliedFilters): string {
  const match = PRICE_PRESETS.find(
    (p) =>
      p.minPriceMinor === filters.minPriceMinor &&
      p.maxPriceMinor === filters.maxPriceMinor
  );
  if (!match || match.label === "Any price") return "Price";
  return match.label;
}

export function sortChipLabel(sort: ListingSort): string {
  return SORTS.find((s) => s.key === sort)?.label ?? "Newest";
}