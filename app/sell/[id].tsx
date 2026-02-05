import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Pressable,
  ActivityIndicator,
  Image,
  Alert,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { supabase } from "@/integrations/supabase/client";
import { useCategories } from "@/hooks/useCategories";
import Toast from "react-native-toast-message";
import { formatPrice } from "@/utils/format";

const CONDITIONS = [
  { value: "like_new", label: "Like new" },
  { value: "very_good", label: "Very good" },
  { value: "good", label: "Good" },
  { value: "acceptable", label: "Acceptable" },
] as const;

const MIN_PRICE = 50; // pence

export default function SellWizardScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { categories } = useCategories();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [isbn, setIsbn] = useState("");
  const [condition, setCondition] = useState("good");
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [priceMinor, setPriceMinor] = useState(300); // £3.00
  const [description, setDescription] = useState("");
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [uploadedPath, setUploadedPath] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Toast.show({ type: "error", text1: "Camera roll permission needed" });
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 0.9,
    });
    if (!result.canceled && result.assets[0]) {
      setPhotoUri(result.assets[0].uri);
      setUploadedPath(null);
    }
  };

  const saveDraft = async () => {
    if (!id) return;
    setSaving(true);
    try {
      const payload: any = {
        action: "update_draft",
        id,
        title: title || undefined,
        author: author || undefined,
        isbn: isbn || null,
        condition: condition.toUpperCase().replace(" ", "_"),
        category_id: categoryId || null,
        price_minor: priceMinor,
        description: description || "No description.",
      };
      if (photoUri && !uploadedPath) {
        const name = "photo.jpg";
        const mime = "image/jpeg";
        const { data: signData, error: signErr } = await supabase.functions.invoke("listings", {
          body: { action: "sign_uploads", listingId: id, files: [{ name, mime, size: 500000 }] },
        });
        if (signErr || !(signData as any)?.uploads?.[0]) throw new Error("Could not get upload URL");
        const { path, signedUrl } = (signData as any).uploads[0];
        const response = await fetch(photoUri);
        const blob = await response.blob();
        const uploadRes = await fetch(signedUrl, { method: "PUT", body: blob, headers: { "Content-Type": mime } });
        if (!uploadRes.ok) throw new Error("Upload failed");
        payload.add_images = [{ path }];
        setUploadedPath(path);
      }
      const { error } = await supabase.functions.invoke("listings", { body: payload });
      if (error) throw error;
      Toast.show({ type: "success", text1: "Draft saved" });
    } catch (e: unknown) {
      Toast.show({
        type: "error",
        text1: "Save failed",
        text2: e instanceof Error ? e.message : "Try again",
      });
    } finally {
      setSaving(false);
    }
  };

  const handlePublish = async () => {
    if (!id || !title.trim() || !author.trim()) {
      Toast.show({ type: "error", text1: "Title and author required" });
      return;
    }
    if (priceMinor < MIN_PRICE) {
      Toast.show({ type: "error", text1: `Minimum price is ${formatPrice(MIN_PRICE)}` });
      return;
    }
    await saveDraft();
    setPublishing(true);
    try {
      const { data, error } = await supabase.functions.invoke("listings", {
        body: { action: "publish", id },
      });
      if (error) throw error;
      Toast.show({ type: "success", text1: "Listing published!" });
      router.replace({ pathname: "/sell/confirm", params: { id } } as any);
    } catch (e: unknown) {
      Toast.show({
        type: "error",
        text1: "Publish failed",
        text2: e instanceof Error ? e.message : "Try again",
      });
    } finally {
      setPublishing(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.label}>Title *</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Book title"
      />
      <Text style={styles.label}>Author *</Text>
      <TextInput
        style={styles.input}
        value={author}
        onChangeText={setAuthor}
        placeholder="Author name"
      />
      <Text style={styles.label}>ISBN (optional)</Text>
      <TextInput
        style={styles.input}
        value={isbn}
        onChangeText={setIsbn}
        placeholder="10 or 13 digits"
        keyboardType="number-pad"
      />
      <Text style={styles.label}>Condition</Text>
      <View style={styles.row}>
        {CONDITIONS.map((c) => (
          <Pressable
            key={c.value}
            style={[styles.chip, condition === c.value && styles.chipActive]}
            onPress={() => setCondition(c.value)}
          >
            <Text style={[styles.chipText, condition === c.value && styles.chipTextActive]}>{c.label}</Text>
          </Pressable>
        ))}
      </View>
      <Text style={styles.label}>Category</Text>
      <View style={styles.row}>
        {categories.slice(0, 6).map((cat) => (
          <Pressable
            key={cat.id}
            style={[styles.chip, categoryId === cat.id && styles.chipActive]}
            onPress={() => setCategoryId(categoryId === cat.id ? null : cat.id)}
          >
            <Text style={[styles.chipText, categoryId === cat.id && styles.chipTextActive]} numberOfLines={1}>
              {cat.name}
            </Text>
          </Pressable>
        ))}
      </View>
      <Text style={styles.label}>Price (£) *</Text>
      <TextInput
        style={styles.input}
        value={priceMinor ? (priceMinor / 100).toFixed(2) : ""}
        onChangeText={(t) => {
          const v = Math.round(parseFloat(t.replace(/[^0-9.]/g, "")) * 100);
          if (!Number.isNaN(v)) setPriceMinor(Math.max(MIN_PRICE, v));
        }}
        placeholder="3.00"
        keyboardType="decimal-pad"
      />
      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        value={description}
        onChangeText={setDescription}
        placeholder="Condition notes, etc."
        multiline
      />
      <Text style={styles.label}>Photo</Text>
      {photoUri ? (
        <View style={styles.photoWrap}>
          <Image source={{ uri: photoUri }} style={styles.photo} />
          <Pressable style={styles.removePhoto} onPress={() => setPhotoUri(null)}>
            <Text style={styles.removePhotoText}>Remove</Text>
          </Pressable>
        </View>
      ) : (
        <Pressable style={styles.addPhoto} onPress={pickImage}>
          <Text style={styles.addPhotoText}>+ Add photo</Text>
        </Pressable>
      )}
      <Pressable style={[styles.btn, styles.btnSecondary]} onPress={saveDraft} disabled={saving}>
        <Text style={styles.btnTextSecondary}>{saving ? "Saving…" : "Save draft"}</Text>
      </Pressable>
      <Pressable
        style={[styles.btn, styles.btnPrimary, publishing && styles.disabled]}
        onPress={handlePublish}
        disabled={publishing}
      >
        {publishing ? <ActivityIndicator color="#fff" /> : <Text style={styles.btnText}>Publish listing</Text>}
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16, paddingBottom: 32 },
  label: { fontSize: 14, fontWeight: "600", marginBottom: 6 },
  input: {
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  textArea: { minHeight: 80 },
  row: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: 16 },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: "#f1f5f9",
  },
  chipActive: { backgroundColor: "#0ea5e9" },
  chipText: { fontSize: 14 },
  chipTextActive: { color: "#fff", fontWeight: "600" },
  addPhoto: {
    height: 120,
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "#cbd5e1",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  addPhotoText: { color: "#64748b" },
  photoWrap: { marginBottom: 16 },
  photo: { width: "100%", height: 200, borderRadius: 8 },
  removePhoto: { marginTop: 8 },
  removePhotoText: { color: "#ef4444", fontSize: 14 },
  btn: { padding: 14, borderRadius: 8, alignItems: "center", marginBottom: 12 },
  btnPrimary: { backgroundColor: "#0ea5e9" },
  btnText: { color: "#fff", fontWeight: "600" },
  btnSecondary: { backgroundColor: "#f1f5f9" },
  btnTextSecondary: { color: "#0ea5e9", fontWeight: "600" },
  disabled: { opacity: 0.7 },
});
