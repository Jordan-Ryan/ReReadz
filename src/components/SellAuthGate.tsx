import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { supabase } from "@/integrations/supabase/client";
import { storage } from "@/storage";
import Toast from "react-native-toast-message";
import { useTabClearance } from "@/hooks/useTabClearance";
import {
  FONT_SANS,
  INK,
  LINE,
  MUTED,
  NAVY,
  NAVY_SOFT,
  SELL_GATE_EYEBROW,
  SELL_GATE_HINT,
  SELL_GATE_SUB,
  SELL_GATE_TITLE,
  SELLERS_KEEP,
  WHITE,
} from "@/theme/brand";

const MIN_PASSWORD_LENGTH = 6;

type GateTab = "signup" | "login";

export function SellAuthGate() {
  const router = useRouter();
  const clearance = useTabClearance();
  const [tab, setTab] = useState<GateTab>("signup");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [terms, setTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  const finishSignedIn = async (userId?: string) => {
    await storage.setItem("rereadz_returning_user", "true");
    if (userId) {
      const { data: prof } = await supabase
        .from("profiles")
        .select("agreed_terms_at")
        .eq("id", userId)
        .maybeSingle();
      if (!prof?.agreed_terms_at) {
        router.replace("/(auth)/complete-signup");
        return;
      }
    }
    router.replace("/(tabs)/sell" as any);
  };

  const handleLogin = async () => {
    if (!email.trim() || !password) {
      Toast.show({ type: "error", text1: "Enter email and password" });
      return;
    }
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });
      if (error) {
        Toast.show({ type: "error", text1: "Login failed", text2: error.message });
        return;
      }
      await finishSignedIn(data.user?.id);
    } catch (error) {
      console.error("SellAuthGate: login failed", error);
      Toast.show({
        type: "error",
        text1: "Something went wrong",
        text2: error instanceof Error ? error.message : "Try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async () => {
    if (!firstName.trim() || !lastName.trim()) {
      Toast.show({ type: "error", text1: "Enter your first and last name" });
      return;
    }
    if (!email.trim() || !password) {
      Toast.show({ type: "error", text1: "Enter email and password" });
      return;
    }
    if (password.length < MIN_PASSWORD_LENGTH) {
      Toast.show({
        type: "error",
        text1: "Password too short",
        text2: `Use at least ${MIN_PASSWORD_LENGTH} characters`,
      });
      return;
    }
    if (!terms) {
      Toast.show({
        type: "error",
        text1: "Please accept the Terms and Privacy Policy",
      });
      return;
    }
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: {
            first_name: firstName.trim(),
            last_name: lastName.trim(),
            display_name: `${firstName.trim()} ${lastName.trim()}`,
            agreed_terms_at: new Date().toISOString(),
          },
        },
      });
      if (error) {
        Toast.show({ type: "error", text1: "Sign up failed", text2: error.message });
        return;
      }
      if (data.session) {
        Toast.show({ type: "success", text1: "Account created" });
        await finishSignedIn(data.user?.id);
        return;
      }
      Toast.show({
        type: "success",
        text1: "Check your email",
        text2: "Open the confirmation link, then sign in.",
      });
      setTab("login");
    } catch (error) {
      console.error("SellAuthGate: signup failed", error);
      Toast.show({
        type: "error",
        text1: "Something went wrong",
        text2: error instanceof Error ? error.message : "Try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={[styles.content, { paddingBottom: clearance + 24 }]}
    >
      <Text style={styles.eyebrow}>{SELL_GATE_EYEBROW}</Text>
      <Text style={styles.title}>{SELL_GATE_TITLE}</Text>
      <Text style={styles.sub}>{SELL_GATE_SUB}</Text>
      <Text style={styles.hint}>{SELL_GATE_HINT}</Text>

      <View style={styles.tabs}>
        <Pressable
          style={[styles.tab, tab === "signup" && styles.tabOn]}
          onPress={() => setTab("signup")}
          accessibilityRole="tab"
          accessibilityState={{ selected: tab === "signup" }}
          accessibilityLabel="I'm new"
        >
          <Text style={[styles.tabText, tab === "signup" && styles.tabTextOn]}>
            I'm new
          </Text>
        </Pressable>
        <Pressable
          style={[styles.tab, tab === "login" && styles.tabOn]}
          onPress={() => setTab("login")}
          accessibilityRole="tab"
          accessibilityState={{ selected: tab === "login" }}
          accessibilityLabel="Log in"
        >
          <Text style={[styles.tabText, tab === "login" && styles.tabTextOn]}>
            Log in
          </Text>
        </Pressable>
      </View>

      {tab === "signup" ? (
        <View style={styles.form}>
          <Text style={styles.label}>First name</Text>
          <TextInput
            style={styles.input}
            value={firstName}
            onChangeText={setFirstName}
            autoCapitalize="words"
            accessibilityLabel="First name"
          />
          <Text style={styles.label}>Last name</Text>
          <TextInput
            style={styles.input}
            value={lastName}
            onChangeText={setLastName}
            autoCapitalize="words"
            accessibilityLabel="Last name"
          />
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            accessibilityLabel="Email"
          />
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            accessibilityLabel="Password"
          />
          <View style={styles.termsRow}>
            <Pressable
              onPress={() => setTerms((prev) => !prev)}
              accessibilityRole="checkbox"
              accessibilityState={{ checked: terms }}
              accessibilityLabel="Agree to Terms and Privacy Policy"
            >
              <View style={[styles.check, terms && styles.checkOn]}>
                {terms ? (
                  <Ionicons name="checkmark" size={14} color={WHITE} />
                ) : null}
              </View>
            </Pressable>
            <Text style={styles.termsText}>
              I'm 16 or over and I agree to the{" "}
              <Text
                style={styles.termsLink}
                onPress={() => router.push("/terms" as any)}
                accessibilityRole="link"
              >
                Terms
              </Text>
              {" "}and{" "}
              <Text
                style={styles.termsLink}
                onPress={() => router.push("/privacy" as any)}
                accessibilityRole="link"
              >
                Privacy Policy
              </Text>
              .
            </Text>
          </View>
          <Pressable
            style={[styles.cta, loading && styles.disabled]}
            onPress={handleSignUp}
            disabled={loading}
            accessibilityRole="button"
            accessibilityLabel="Create a free account"
          >
            {loading ? (
              <ActivityIndicator color={WHITE} />
            ) : (
              <Text style={styles.ctaText}>Create a free account</Text>
            )}
          </Pressable>
        </View>
      ) : (
        <View style={styles.form}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            accessibilityLabel="Email"
          />
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            accessibilityLabel="Password"
          />
          <Pressable
            onPress={() => router.push("/(auth)/forgot-password" as any)}
            accessibilityRole="link"
            accessibilityLabel="Forgot password"
            style={styles.forgot}
          >
            <Text style={styles.termsLink}>Forgot password?</Text>
          </Pressable>
          <Pressable
            style={[styles.cta, loading && styles.disabled]}
            onPress={handleLogin}
            disabled={loading}
            accessibilityRole="button"
            accessibilityLabel="Log in"
          >
            {loading ? (
              <ActivityIndicator color={WHITE} />
            ) : (
              <Text style={styles.ctaText}>Log in</Text>
            )}
          </Pressable>
        </View>
      )}

      <Text style={styles.keep}>
        Listing is free. You keep {SELLERS_KEEP} of every sale.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: WHITE },
  content: { paddingHorizontal: 20, paddingTop: 16 },
  eyebrow: {
    fontFamily: FONT_SANS,
    fontSize: 13,
    fontWeight: "600",
    color: NAVY,
    marginBottom: 8,
  },
  title: {
    fontFamily: FONT_SANS,
    fontSize: 28,
    fontWeight: "800",
    color: INK,
    letterSpacing: -0.4,
    marginBottom: 8,
  },
  sub: {
    fontFamily: FONT_SANS,
    fontSize: 15,
    lineHeight: 22,
    color: MUTED,
    marginBottom: 10,
  },
  hint: {
    fontFamily: FONT_SANS,
    fontSize: 14,
    color: INK,
    marginBottom: 16,
  },
  tabs: {
    flexDirection: "row",
    backgroundColor: NAVY_SOFT,
    borderRadius: 14,
    padding: 4,
    marginBottom: 18,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  tabOn: { backgroundColor: WHITE },
  tabText: { fontFamily: FONT_SANS, fontSize: 14, fontWeight: "600", color: MUTED },
  tabTextOn: { color: NAVY },
  form: { gap: 4 },
  label: {
    fontFamily: FONT_SANS,
    fontSize: 13,
    fontWeight: "600",
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
    color: INK,
    backgroundColor: WHITE,
  },
  termsRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    marginTop: 14,
    marginBottom: 16,
  },
  check: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: LINE,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2,
  },
  checkOn: { backgroundColor: NAVY, borderColor: NAVY },
  termsText: { flex: 1, fontFamily: FONT_SANS, fontSize: 13, color: MUTED, lineHeight: 18 },
  termsLink: { color: NAVY, fontWeight: "700" },
  forgot: { alignSelf: "flex-start", marginTop: 8, marginBottom: 12 },
  cta: {
    backgroundColor: NAVY,
    borderRadius: 999,
    paddingVertical: 16,
    alignItems: "center",
  },
  ctaText: { color: WHITE, fontFamily: FONT_SANS, fontWeight: "700", fontSize: 16 },
  disabled: { opacity: 0.7 },
  keep: {
    fontFamily: FONT_SANS,
    fontSize: 13,
    color: MUTED,
    textAlign: "center",
    marginTop: 18,
  },
});
