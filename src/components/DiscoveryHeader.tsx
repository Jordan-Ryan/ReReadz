import { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Platform,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useDesktopShell } from "@/hooks/useDesktopShell";
import { useHeaderVariant } from "@/hooks/useHeaderVariant";
import { Glass } from "@/components/Glass";
import {
  NAVY,
  LINE,
  INK,
  MUTED,
  WHITE,
  SEARCH_PLACEHOLDER,
  SEARCH_FIELD,
  GLASS_FILL_CHROME,
  FONT_DISPLAY,
  FONT_SANS,
} from "@/theme/brand";

const LOGO = require("../../assets/logo-rereadz.png");

interface DiscoveryHeaderProps {
  onSubmitSearch?: (query: string) => void;
}

export function DiscoveryHeader({ onSubmitSearch }: DiscoveryHeaderProps) {
  const router = useRouter();
  const isDesktop = useDesktopShell();
  const variant = useHeaderVariant();
  const params = useLocalSearchParams<{ q?: string; category?: string }>();
  const [value, setValue] = useState(params.q ?? "");
  const inputRef = useRef<TextInput>(null);
  const showLockup = isDesktop || variant === "home" || variant === "compact";
  const showSearch = isDesktop || variant === "home" || variant === "search";

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

  const lockup = (
    <Pressable
      onPress={() => router.push("/(tabs)" as any)}
      accessibilityRole="link"
      accessibilityLabel="ReReadz home"
      style={styles.brand}
    >
      <View style={styles.markWrap}>
        <Image
          source={LOGO}
          style={styles.mark}
          resizeMode="contain"
          accessibilityIgnoresInvertColors
        />
        <View style={styles.beta} accessibilityRole="text">
          <Text style={styles.betaText}>BETA</Text>
        </View>
      </View>
      <Text style={[styles.wordmark, isDesktop && styles.wordmarkDesktop]}>
        ReReadz.
      </Text>
    </Pressable>
  );

  const search = (
    <View
      style={[
        styles.search,
        isDesktop && styles.searchDesktop,
        variant === "search" && !isDesktop && styles.searchOwned,
      ]}
    >
      <Ionicons name="search-outline" size={18} color={MUTED} />
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
  );

  return (
    <View style={styles.chrome}>
      <Glass
        intensity={96}
        tint="systemChromeMaterialLight"
        overlayColor={GLASS_FILL_CHROME}
        style={StyleSheet.absoluteFill}
      />
      <SafeAreaView edges={["top"]} style={styles.safe}>
        <View
          style={[
            styles.wrap,
            isDesktop && styles.wrapDesktop,
            !isDesktop && variant === "home" && styles.wrapRow,
            !isDesktop && variant === "search" && styles.wrapSearch,
            !isDesktop && variant === "compact" && styles.wrapCompact,
          ]}
        >
          {showLockup ? lockup : null}
          {showSearch ? search : null}
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
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  wrapRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  wrapSearch: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  wrapCompact: {
    minHeight: 32,
  },
  wrapDesktop: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 14,
    flexDirection: "row",
    alignItems: "center",
  },
  brand: {
    backgroundColor: "transparent",
    borderWidth: 0,
    paddingTop: 4,
    paddingRight: 4,
    margin: 0,
    flexShrink: 0,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  markWrap: {
    width: 28,
    height: 28,
    position: "relative",
  },
  mark: {
    width: 28,
    height: 28,
  },
  wordmark: {
    color: NAVY,
    fontFamily: FONT_DISPLAY,
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: -0.45,
    lineHeight: 20,
  },
  wordmarkDesktop: { fontSize: 20, lineHeight: 24 },
  beta: {
    position: "absolute",
    top: -5,
    right: -10,
    backgroundColor: NAVY,
    borderRadius: 999,
    paddingHorizontal: 4,
    paddingVertical: 1,
    flexShrink: 0,
  },
  betaText: {
    fontFamily: FONT_DISPLAY,
    fontSize: 7,
    fontWeight: "800",
    color: WHITE,
    letterSpacing: 0.4,
    lineHeight: 9,
  },
  desktopActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  sellBtn: {
    backgroundColor: NAVY,
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 999,
  },
  sellBtnText: { color: WHITE, fontWeight: "700", fontSize: 13 },
  youLink: { color: NAVY, fontWeight: "700", fontSize: 14 },
  search: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: SEARCH_FIELD,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: LINE,
    borderRadius: 22,
    paddingHorizontal: 16,
    minHeight: 46,
    ...(Platform.OS === "web"
      ? ({
          backdropFilter: "blur(18px) saturate(180%)",
          WebkitBackdropFilter: "blur(18px) saturate(180%)",
        } as object)
      : {}),
    ...(Platform.OS === "android"
      ? { borderWidth: 0, elevation: 0, minHeight: 52 }
      : {}),
  },
  searchOwned: {
    minHeight: 52,
    paddingHorizontal: 18,
    borderRadius: 26,
    ...(Platform.OS === "android" ? { minHeight: 56, borderRadius: 28 } : {}),
  },
  searchDesktop: {
    minHeight: 44,
    paddingHorizontal: 16,
  },
  input: {
    flex: 1,
    fontFamily: FONT_SANS,
    fontSize: 16,
    color: INK,
    paddingVertical: Platform.OS === "web" ? 10 : 0,
    ...(Platform.OS === "web"
      ? ({ outlineStyle: "none", outlineWidth: 0 } as object)
      : {}),
  },
  hint: {
    fontSize: 11,
    color: MUTED,
    fontWeight: "600",
    backgroundColor: WHITE,
    borderWidth: 1,
    borderColor: LINE,
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
    overflow: "hidden",
  },
});
