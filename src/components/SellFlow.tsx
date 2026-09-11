import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ScrollView,
  Modal,
  ActivityIndicator,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useTabClearance } from "@/hooks/useTabClearance";
import { formatPrice } from "@/utils/format";
import {
  FONT_SANS,
  INK,
  LINE,
  MUTED,
  NAVY,
  NAVY_SOFT,
  SELL_AVG_TIME,
  SELL_FASTEST,
  SELL_MULTIPLE,
  SELL_SCAN_BODY,
  SELL_SCAN_CTA,
  SELL_SCAN_TITLE,
  SELL_STEPS,
  SELL_TYPE_ISBN,
  SELLERS_KEEP,
  WHITE,
} from "@/theme/brand";

const CONDITIONS = [
  { value: "like_new", label: "Like new" },
  { value: "very_good", label: "Very good" },
  { value: "good", label: "Good" },
  { value: "acceptable", label: "Acceptable" },
] as const;

const MIN_PRICE = 50;

async function lookupIsbn(isbn: string): Promise<{
  title?: string;
  author?: string;
  description?: string;
}> {
  const digits = isbn.replace(/[^0-9Xx]/g, "");
  if (digits.length < 10) throw new Error("ISBN needs 10 or 13 digits");
  try {
    const { data, error } = await supabase.functions.invoke("isbn-lookup", {
      body: { isbn: digits },
    });
    if (!error && data && typeof data === "object") {
      const row = data as {
        title?: string;
        author?: string;
        authors?: string[];
        description?: string;
      };
      return {
        title: row.title,
        author: row.author ?? row.authors?.join(", "),
        description: row.description,
      };
    }
  } catch (error) {
    console.warn("SellFlow: isbn-lookup function failed, trying Open Library", error);
  }
  const res = await fetch(`https://openlibrary.org/isbn/${digits}.json`);
  if (!res.ok) throw new Error("We couldn't find that ISBN");
  const json = (await res.json()) as {
    title?: string;
    description?: string | { value?: string };
    authors?: { key: string }[];
  };
  let author: string | undefined;
  const firstAuthor = json.authors?.[0]?.key;
  if (firstAuthor) {
    try {
      const authorRes = await fetch(`https://openlibrary.org${firstAuthor}.json`);
      if (authorRes.ok) {
        const authorJson = (await authorRes.json()) as { name?: string };
        author = authorJson.name;
      }
    } catch (error) {
      console.warn("SellFlow: author lookup failed", error);
    }
  }
  const description =
    typeof json.description === "string"
      ? json.description
      : json.description?.value;
  return { title: json.title, author, description };
}

export function SellFlow() {
  const router = useRouter();
  const { session } = useAuth();
  const clearance = useTabClearance();
  const [permission, requestPermission] = useCameraPermissions();
  const [step, setStep] = useState(0);
  const [draftId, setDraftId] = useState<string | null>(null);
  const [scanner, setScanner] = useState(false);
  const [isbnOpen, setIsbnOpen] = useState(false);
  const [bulkOpen, setBulkOpen] = useState(false);
  const [isbnDraft, setIsbnDraft] = useState("");
  const [bulkDraft, setBulkDraft] = useState("");
  const [looking, setLooking] = useState(false);
  const [saving, setSaving] = useState(false);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [isbn, setIsbn] = useState("");
  const [condition, setCondition] = useState("good");
  const [priceMinor, setPriceMinor] = useState(300);
  const [photoUri, setPhotoUri] = useState<string | null>(null);

  const ensureDraft = async () => {
    if (draftId || !session) return draftId;
    const { data, error } = await supabase.functions.invoke("listings", {
      body: { action: "create_draft" },
    });
    if (error) throw error;
    const id = (data as { id?: string } | null)?.id;
    if (!id) throw new Error("No draft ID");
    setDraftId(id);
    return id;
  };

  const applyIsbn = async (value: string) => {
    setLooking(true);
    try {
      const found = await lookupIsbn(value);
      setIsbn(value.replace(/[^0-9Xx]/g, ""));
      if (found.title) setTitle(found.title);
      if (found.author) setAuthor(found.author);
      if (found.description) setDescription(found.description);
      Toast.show({
        type: "success",
        text1: found.title ? "Details filled in" : "ISBN saved",
        text2: "Check Details, then set your price.",
      });
      setIsbnOpen(false);
      setScanner(false);
    } catch (error) {
      console.error("SellFlow: ISBN lookup failed", error);
      Toast.show({
        type: "error",
        text1: "Could not look up ISBN",
        text2: error instanceof Error ? error.message : "Type the details instead.",
      });
    } finally {
      setLooking(false);
    }
  };

  const openScanner = async () => {
    try {
      const next = permission?.granted ? permission : await requestPermission();
      if (!next?.granted) {
        setIsbnOpen(true);
        Toast.show({
          type: "info",
          text1: "Camera needs permission",
          text2: "Type the ISBN from the back of the book instead.",
        });
        return;
      }
      setScanner(true);
    } catch (error) {
      console.error("SellFlow: camera permission failed", error);
      setIsbnOpen(true);
    }
  };

  const pickPhoto = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Toast.show({ type: "error", text1: "Photo library permission needed" });
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.9,
    });
    if (!result.canceled && result.assets[0]) {
      setPhotoUri(result.assets[0].uri);
    }
  };

  const goNext = async () => {
    if (step >= SELL_STEPS.length - 1) {
      await publish();
      return;
    }
    if (step === 1 && (!title.trim() || !author.trim())) {
      Toast.show({ type: "error", text1: "Title and author are required" });
      return;
    }
    if (step === 2 && priceMinor < MIN_PRICE) {
      Toast.show({
        type: "error",
        text1: `Minimum price is ${formatPrice(MIN_PRICE)}`,
      });
      return;
    }
    try {
      await ensureDraft();
    } catch (error) {
      console.warn("SellFlow: draft create skipped or failed", error);
    }
    setStep((prev) => Math.min(prev + 1, SELL_STEPS.length - 1));
  };

  const publish = async () => {
    if (!title.trim() || !author.trim()) {
      Toast.show({ type: "error", text1: "Title and author are required" });
      setStep(1);
      return;
    }
    if (!session) {
      Toast.show({
        type: "info",
        text1: "Sign in to publish",
        text2: "This preview cannot create a live listing.",
      });
      return;
    }
    setSaving(true);
    try {
      const id = await ensureDraft();
      if (!id) throw new Error("Could not create draft");
      const { error: updateError } = await supabase.functions.invoke("listings", {
        body: {
          action: "update_draft",
          id,
          title: title.trim(),
          author: author.trim(),
          isbn: isbn || null,
          condition: condition.toUpperCase(),
          price_minor: priceMinor,
          description: description.trim() || "No description provided.",
        },
      });
      if (updateError) throw updateError;
      const { error: publishError } = await supabase.functions.invoke("listings", {
        body: { action: "publish", id },
      });
      if (publishError) throw publishError;
      Toast.show({ type: "success", text1: "Listing published" });
      router.replace({ pathname: "/sell/confirm", params: { id } } as any);
    } catch (error) {
      console.error("SellFlow: publish failed", error);
      Toast.show({
        type: "error",
        text1: "Publish failed",
        text2: error instanceof Error ? error.message : "Try again.",
      });
    } finally {
      setSaving(false);
    }
  };

  const startBulk = () => {
    const codes = bulkDraft
      .split(/\n|,/)
      .map((row) => row.replace(/[^0-9Xx]/g, ""))
      .filter((row) => row.length >= 10);
    if (codes.length === 0) {
      Toast.show({ type: "error", text1: "Add at least one ISBN" });
      return;
    }
    setBulkOpen(false);
    void applyIsbn(codes[0]);
    if (codes.length > 1) {
      Toast.show({
        type: "info",
        text1: `First of ${codes.length} books`,
        text2: "Publish this one, then Sell again for the next ISBN.",
      });
    }
  };

  return (
    <View style={styles.shell}>
      <View style={styles.banner}>
        <Text style={styles.bannerText}>⚡ {SELL_AVG_TIME}</Text>
      </View>

      <View style={styles.stepper}>
        {SELL_STEPS.map((label, index) => {
          const on = index === step;
          const done = index < step;
          return (
            <View key={label} style={styles.stepItem}>
              <View
                style={[
                  styles.stepDot,
                  (on || done) && styles.stepDotOn,
                ]}
              >
                <Text style={[styles.stepNum, (on || done) && styles.stepNumOn]}>
                  {index + 1}
                </Text>
              </View>
              <Text style={[styles.stepLabel, on && styles.stepLabelOn]}>
                {label}
              </Text>
              {index < SELL_STEPS.length - 1 ? (
                <View style={[styles.stepLine, done && styles.stepLineOn]} />
              ) : null}
            </View>
          );
        })}
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.body, { paddingBottom: clearance + 88 }]}
      >
        {step === 0 ? (
          <View>
            <View style={styles.scanCard}>
              <View style={styles.fastest}>
                <Text style={styles.fastestText}>{SELL_FASTEST}</Text>
              </View>
              <View style={styles.scanMark}>
                <Ionicons name="barcode-outline" size={36} color={WHITE} />
              </View>
              <Text style={styles.scanTitle}>{SELL_SCAN_TITLE}</Text>
              <Text style={styles.scanBody}>{SELL_SCAN_BODY}</Text>
              <Pressable
                style={styles.scanCta}
                onPress={openScanner}
                accessibilityRole="button"
                accessibilityLabel={SELL_SCAN_CTA}
              >
                <Ionicons name="scan-outline" size={20} color={WHITE} />
                <Text style={styles.scanCtaText}>{SELL_SCAN_CTA}</Text>
              </Pressable>
              <View style={styles.scanMeta}>
                <Text style={styles.metaBit}>~10 seconds</Text>
                <Text style={styles.metaBit}>Cover auto-added</Text>
                <Text style={styles.metaBit}>Smart price tip</Text>
              </View>
              <View style={styles.scanLinks}>
                <Pressable
                  onPress={() => setIsbnOpen(true)}
                  accessibilityRole="button"
                  accessibilityLabel={SELL_TYPE_ISBN}
                >
                  <Text style={styles.link}>{SELL_TYPE_ISBN}</Text>
                </Pressable>
                <Text style={styles.dot}>·</Text>
                <Pressable
                  onPress={() => setBulkOpen(true)}
                  accessibilityRole="button"
                  accessibilityLabel={SELL_MULTIPLE}
                >
                  <Text style={styles.link}>{SELL_MULTIPLE}</Text>
                </Pressable>
              </View>
            </View>

            <View style={styles.manualCard}>
              <Text style={styles.manualTitle}>No barcode or ISBN?</Text>
              <Text style={styles.manualBody}>
                No problem. Take a photo of your book and type the details in
                yourself.
              </Text>
              <Pressable
                style={styles.manualBtn}
                onPress={pickPhoto}
                accessibilityRole="button"
                accessibilityLabel="List without an ISBN"
              >
                <Text style={styles.manualBtnText}>
                  {photoUri ? "Photo added" : "List without an ISBN"}
                </Text>
              </Pressable>
            </View>
          </View>
        ) : null}

        {step === 1 ? (
          <View>
            <Text style={styles.label}>Title</Text>
            <TextInput
              style={styles.input}
              value={title}
              onChangeText={setTitle}
              placeholder="Book title"
            />
            <Text style={styles.label}>Author</Text>
            <TextInput
              style={styles.input}
              value={author}
              onChangeText={setAuthor}
              placeholder="Author name"
            />
            <Text style={styles.label}>ISBN</Text>
            <TextInput
              style={styles.input}
              value={isbn}
              onChangeText={setIsbn}
              placeholder="10 or 13 digits"
              keyboardType="number-pad"
            />
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={[styles.input, styles.area]}
              value={description}
              onChangeText={setDescription}
              placeholder="Condition notes, edition, anything a buyer should know"
              multiline
            />
          </View>
        ) : null}

        {step === 2 ? (
          <View>
            <Text style={styles.label}>Condition</Text>
            <View style={styles.row}>
              {CONDITIONS.map((item) => (
                <Pressable
                  key={item.value}
                  style={[
                    styles.chip,
                    condition === item.value && styles.chipOn,
                  ]}
                  onPress={() => setCondition(item.value)}
                >
                  <Text
                    style={[
                      styles.chipText,
                      condition === item.value && styles.chipTextOn,
                    ]}
                  >
                    {item.label}
                  </Text>
                </Pressable>
              ))}
            </View>
            <Text style={styles.label}>Price (£)</Text>
            <TextInput
              style={styles.input}
              value={(priceMinor / 100).toFixed(2)}
              onChangeText={(raw) => {
                const next = Math.round(parseFloat(raw.replace(/[^0-9.]/g, "")) * 100);
                if (!Number.isNaN(next)) setPriceMinor(Math.max(MIN_PRICE, next));
              }}
              keyboardType="decimal-pad"
            />
            <Text style={styles.keep}>
              Listing is free. You keep {SELLERS_KEEP} of the sale.
            </Text>
          </View>
        ) : null}

        {step === 3 ? (
          <View style={styles.summary}>
            <Text style={styles.summaryTitle}>{title || "Untitled book"}</Text>
            <Text style={styles.summaryMeta}>{author || "Author needed"}</Text>
            <Text style={styles.summaryPrice}>{formatPrice(priceMinor)}</Text>
            <Text style={styles.summaryMeta}>
              Condition: {CONDITIONS.find((item) => item.value === condition)?.label}
            </Text>
            {isbn ? <Text style={styles.summaryMeta}>ISBN {isbn}</Text> : null}
            <Text style={styles.keep}>
              Ready to publish. You keep {SELLERS_KEEP}. Tracked delivery from £2.99
              is added on the listing.
            </Text>
          </View>
        ) : null}
      </ScrollView>

      <View style={[styles.footer, { bottom: clearance - 12 }]}>
        <Pressable
          style={styles.back}
          onPress={() => setStep((prev) => Math.max(0, prev - 1))}
          disabled={step === 0}
          accessibilityRole="button"
          accessibilityLabel="Back"
        >
          <Ionicons name="chevron-back" size={18} color={step === 0 ? LINE : NAVY} />
        </Pressable>
        <Text style={styles.progress}>{step + 1}/4</Text>
        <Pressable
          style={styles.next}
          onPress={goNext}
          disabled={saving}
          accessibilityRole="button"
          accessibilityLabel={step === 3 ? "Publish" : "Next"}
        >
          {saving ? (
            <ActivityIndicator color={WHITE} />
          ) : (
            <Text style={styles.nextText}>{step === 3 ? "Publish" : "Next"}</Text>
          )}
        </Pressable>
      </View>

      <Modal visible={isbnOpen} transparent animationType="slide">
        <View style={styles.sheetWrap}>
          <View style={styles.sheet}>
            <Text style={styles.sheetTitle}>{SELL_TYPE_ISBN}</Text>
            <TextInput
              style={styles.input}
              value={isbnDraft}
              onChangeText={setIsbnDraft}
              placeholder="978..."
              keyboardType="number-pad"
              autoFocus
            />
            <Pressable
              style={styles.scanCta}
              onPress={() => void applyIsbn(isbnDraft)}
              disabled={looking}
            >
              {looking ? (
                <ActivityIndicator color={WHITE} />
              ) : (
                <Text style={styles.scanCtaText}>Look up ISBN</Text>
              )}
            </Pressable>
            <Pressable onPress={() => setIsbnOpen(false)}>
              <Text style={styles.cancel}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Modal visible={bulkOpen} transparent animationType="slide">
        <View style={styles.sheetWrap}>
          <View style={styles.sheet}>
            <Text style={styles.sheetTitle}>{SELL_MULTIPLE}</Text>
            <Text style={styles.manualBody}>
              Paste one ISBN per line. We'll start with the first book.
            </Text>
            <TextInput
              style={[styles.input, styles.area]}
              value={bulkDraft}
              onChangeText={setBulkDraft}
              placeholder={"9780000000001\n9780000000002"}
              multiline
            />
            <Pressable style={styles.scanCta} onPress={startBulk}>
              <Text style={styles.scanCtaText}>Start with first ISBN</Text>
            </Pressable>
            <Pressable onPress={() => setBulkOpen(false)}>
              <Text style={styles.cancel}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Modal visible={scanner} animationType="fade">
        <View style={styles.scanner}>
          {Platform.OS !== "web" || permission?.granted ? (
            <CameraView
              style={StyleSheet.absoluteFill}
              barcodeScannerSettings={{
                barcodeTypes: ["ean13", "ean8", "upc_a", "upc_e"],
              }}
              onBarcodeScanned={({ data }) => {
                void applyIsbn(data);
              }}
            />
          ) : (
            <View style={styles.scannerFallback}>
              <Text style={styles.scanBody}>
                Camera isn't available here. Type the ISBN instead.
              </Text>
            </View>
          )}
          <Pressable
            style={styles.scannerClose}
            onPress={() => {
              setScanner(false);
              setIsbnOpen(true);
            }}
          >
            <Text style={styles.scanCtaText}>{SELL_TYPE_ISBN}</Text>
          </Pressable>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  shell: { flex: 1, backgroundColor: WHITE },
  banner: {
    backgroundColor: NAVY_SOFT,
    paddingVertical: 8,
    alignItems: "center",
  },
  bannerText: {
    fontFamily: FONT_SANS,
    fontSize: 12,
    fontWeight: "700",
    color: NAVY,
  },
  stepper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: LINE,
  },
  stepItem: { flex: 1, alignItems: "center", position: "relative" },
  stepDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: LINE,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: WHITE,
  },
  stepDotOn: { backgroundColor: NAVY, borderColor: NAVY },
  stepNum: { fontSize: 11, fontWeight: "700", color: MUTED },
  stepNumOn: { color: WHITE },
  stepLabel: {
    fontFamily: FONT_SANS,
    fontSize: 11,
    color: MUTED,
    marginTop: 4,
    fontWeight: "600",
  },
  stepLabelOn: { color: NAVY },
  stepLine: {
    position: "absolute",
    top: 12,
    left: "70%",
    right: "-70%",
    height: 1,
    backgroundColor: LINE,
    zIndex: -1,
  },
  stepLineOn: { backgroundColor: NAVY },
  scroll: { flex: 1 },
  body: { padding: 16 },
  scanCard: {
    borderWidth: 2,
    borderColor: "rgba(23,0,173,0.28)",
    backgroundColor: NAVY_SOFT,
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
  },
  fastest: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: NAVY,
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  fastestText: {
    color: WHITE,
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 0.6,
  },
  scanMark: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: NAVY,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
    marginBottom: 14,
  },
  scanTitle: {
    fontFamily: FONT_SANS,
    fontSize: 24,
    fontWeight: "800",
    color: INK,
    marginBottom: 8,
    textAlign: "center",
  },
  scanBody: {
    fontFamily: FONT_SANS,
    fontSize: 14,
    lineHeight: 20,
    color: MUTED,
    textAlign: "center",
    marginBottom: 16,
  },
  scanCta: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: NAVY,
    borderRadius: 999,
    minHeight: 52,
    paddingHorizontal: 22,
    alignSelf: "stretch",
  },
  scanCtaText: { color: WHITE, fontWeight: "700", fontSize: 16 },
  scanMeta: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 10,
    marginTop: 14,
  },
  metaBit: { fontFamily: FONT_SANS, fontSize: 12, color: MUTED, fontWeight: "600" },
  scanLinks: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 16,
    paddingTop: 14,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "rgba(23,0,173,0.15)",
  },
  link: { fontFamily: FONT_SANS, fontSize: 13, color: NAVY, fontWeight: "700" },
  dot: { color: MUTED },
  manualCard: {
    marginTop: 16,
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "rgba(23,0,173,0.28)",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
  },
  manualTitle: {
    fontFamily: FONT_SANS,
    fontSize: 16,
    fontWeight: "700",
    color: INK,
    marginBottom: 6,
  },
  manualBody: {
    fontFamily: FONT_SANS,
    fontSize: 13,
    color: MUTED,
    textAlign: "center",
    marginBottom: 12,
  },
  manualBtn: {
    borderWidth: 1,
    borderColor: NAVY,
    borderRadius: 999,
    paddingVertical: 12,
    paddingHorizontal: 18,
  },
  manualBtnText: { color: NAVY, fontWeight: "700" },
  label: {
    fontFamily: FONT_SANS,
    fontSize: 13,
    fontWeight: "700",
    color: INK,
    marginBottom: 6,
    marginTop: 8,
  },
  input: {
    fontFamily: FONT_SANS,
    borderWidth: 1,
    borderColor: LINE,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 10,
    color: INK,
  },
  area: { minHeight: 90, textAlignVertical: "top" },
  row: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: 12 },
  chip: {
    borderWidth: 1,
    borderColor: LINE,
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: WHITE,
  },
  chipOn: { backgroundColor: NAVY_SOFT, borderColor: NAVY },
  chipText: { fontFamily: FONT_SANS, color: INK, fontWeight: "600" },
  chipTextOn: { color: NAVY },
  keep: { fontFamily: FONT_SANS, fontSize: 13, color: MUTED, marginTop: 8 },
  summary: {
    borderWidth: 1,
    borderColor: LINE,
    borderRadius: 16,
    padding: 16,
    backgroundColor: NAVY_SOFT,
  },
  summaryTitle: {
    fontFamily: FONT_SANS,
    fontSize: 20,
    fontWeight: "800",
    color: INK,
  },
  summaryMeta: { fontFamily: FONT_SANS, fontSize: 14, color: MUTED, marginTop: 4 },
  summaryPrice: {
    fontFamily: FONT_SANS,
    fontSize: 22,
    fontWeight: "800",
    color: INK,
    marginTop: 10,
  },
  footer: {
    position: "absolute",
    left: 16,
    right: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: WHITE,
    borderWidth: 1,
    borderColor: LINE,
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  back: { width: 44, height: 44, alignItems: "center", justifyContent: "center" },
  progress: { fontFamily: FONT_SANS, fontSize: 15, fontWeight: "700", color: MUTED },
  next: {
    backgroundColor: NAVY,
    borderRadius: 999,
    paddingHorizontal: 22,
    minHeight: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  nextText: { color: WHITE, fontWeight: "700", fontSize: 15 },
  sheetWrap: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(15,23,42,0.35)",
  },
  sheet: {
    backgroundColor: WHITE,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    gap: 8,
  },
  sheetTitle: {
    fontFamily: FONT_SANS,
    fontSize: 18,
    fontWeight: "800",
    color: INK,
    marginBottom: 8,
  },
  cancel: {
    textAlign: "center",
    color: MUTED,
    fontWeight: "600",
    paddingVertical: 10,
  },
  scanner: { flex: 1, backgroundColor: INK },
  scannerFallback: { flex: 1, justifyContent: "center", padding: 24 },
  scannerClose: {
    position: "absolute",
    bottom: 32,
    left: 24,
    right: 24,
    backgroundColor: NAVY,
    borderRadius: 999,
    paddingVertical: 14,
    alignItems: "center",
  },
});
