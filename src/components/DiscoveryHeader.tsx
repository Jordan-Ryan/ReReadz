import { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useDesktopShell } from "@/hooks/useDesktopShell";
import { Glass } from "@/components/Glass";
import {
  NAVY,
  NAVY_SOFT,
  LINE,
  INK,
  MUTED,
  WHITE,
  SEARCH_PLACEHOLDER,
  GLASS_FILL_CHROME,
} from "@/theme/brand";

interface DiscoveryHeaderProps {
  onSubmitSearch?: (query: string) => void;
}

export function DiscoveryHeader({ onSubmitSearch }: DiscoveryHeaderProps) {
  const router = useRouter();
  const isDesktop = useDesktopShell();
  const params = useLocalSearchParams<{ q?: string; category?: string }>();
  const [value, setValue] = useState(params.q ?? "");
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    setValue(params.q ?? "");
  }, [params.q]);

  useEffect(() => {
    if (Platform.OS !== "web" || typeof window === "undefined") return;
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const submit = (next: string) => {
    const query = next.trim();
    if (onSubmitSearch) {
      onSubmitSearch(query);
      return;
    }
    router.push({
      pathname: "/(tabs)/listings",
      params: {
        q: query,
        category: "",
      },
    } as any);
  };

  return (
    <View style={styles.chrome}>
      <Glass
        intensity={86}
        tint="systemChromeMaterialLight"
        overlayColor={GLASS_FILL_CHROME}
        style={StyleSheet.absoluteFill}
      />
      <SafeAreaView edges={["top"]} style={styles.safe}>
      <View style={[styles.wrap, isDesktop && styles.wrapDesktop]}>
        <Pressable
          onPress={() => router.push("/(tabs)" as any)}
          accessibilityRole="link"
          accessibilityLabel="ReReadz home"
          style={styles.brand}
        >
          <Text style={[styles.wordmark, isDesktop && styles.wordmarkDesktop]}>
            ReReadz
          </Text>
        </Pressable>
        <View style={styles.search}>
          <Ionicons name="search" size={16} color={MUTED} />
          <TextInput
            ref={inputRef}
            style={styles.input}
            value={value}
            onChangeText={setValue}
            placeholder={SEARCH_PLACEHOLDER}
            placeholderTextColor={MUTED}
            returnKeyType="search"
            onSubmitEditing={() => submit(value)}
            accessibilityLabel="Search books"
            autoCorrect={false}
            autoCapitalize="none"
          />
          {value.length > 0 && (
            <Pressable
              onPress={() => {
                setValue("");
                submit("");
              }}
              accessibilityRole="button"
              accessibilityLabel="Clear search"
              hitSlop={8}
            >
              <Ionicons name="close-circle" size={16} color={MUTED} />
            </Pressable>
          )}
          {isDesktop && <Text style={styles.hint}>⌘K</Text>}
        </View>
        <View style={styles.beta}>
          <Text style={styles.betaText}>BETA</Text>
        </View>
        {isDesktop && (
          <View style={styles.desktopActions}>
            <Pressable
              style={styles.sellBtn}
              onPress={() => router.push("/(tabs)/sell" as any)}
              accessibilityRole="button"
              accessibilityLabel="Sell books"
            >
              <Text style={styles.sellBtnText}>Sell books</Text>
            </Pressable>
            <Pressable
              onPress={() => router.push("/(tabs)/account" as any)}
              accessibilityRole="link"
              accessibilityLabel="You"
            >
              <Text style={styles.youLink}>You</Text>
            </Pressable>
          </View>
        )}
      </View>
    </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  chrome: { backgroundColor: "transparent" },
  safe: { backgroundColor: "transparent" },
  wrap: {
    backgroundColor: "transparent",
    paddingHorizontal: 10,
    paddingVertical: 6,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "rgba(23,0,173,0.08)",
  },
  wrapDesktop: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 12,
  },
  brand: {
    backgroundColor: "transparent",
    borderWidth: 0,
    padding: 0,
    margin: 0,
    flexShrink: 0,
  },
  wordmark: {
    color: NAVY,
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: -0.4,
    lineHeight: 18,
  },
  wordmarkDesktop: { fontSize: 18, lineHeight: 20 },
  desktopActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  sellBtn: {
    backgroundColor: NAVY,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
  },
  sellBtnText: { color: WHITE, fontWeight: "700", fontSize: 13 },
  youLink: { color: NAVY, fontWeight: "700", fontSize: 14 },
  beta: {
    backgroundColor: NAVY_SOFT,
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 3,
    flexShrink: 0,
  },
  betaText: {
    fontSize: 10,
    fontWeight: "700",
    color: NAVY,
    letterSpacing: 0.6,
  },
  search: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#f8fafc",
    borderWidth: 1,
    borderColor: LINE,
    borderRadius: 999,
    paddingHorizontal: 12,
    minHeight: 40,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: INK,
    paddingVertical: Platform.OS === "web" ? 8 : 0,
  },
  hint: {
    fontSize: 11,
    color: MUTED,
    fontWeight: "600",
  },
});
