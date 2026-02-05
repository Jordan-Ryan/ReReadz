import { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useRouter, Link, useLocalSearchParams } from "expo-router";
import { supabase } from "@/integrations/supabase/client";
import Toast from "react-native-toast-message";
import { storage } from "@/storage";

const PRIMARY = "#1e40af";
const PRIMARY_LIGHT = "rgba(30, 64, 175, 0.1)";
const PRIMARY_BORDER = "rgba(30, 64, 175, 0.2)";
const MUTED = "#64748b";
const MIN_PASSWORD_LENGTH = 6;

type Tab = "login" | "signup";

export default function LoginScreen() {
  const params = useLocalSearchParams<{ tab?: string }>();
  const initialTab: Tab = params.tab === "signup" ? "signup" : "login";
  const [activeTab, setActiveTab] = useState<Tab>(initialTab);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [termsChecked, setTermsChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (params.tab === "signup") setActiveTab("signup");
    else
      storage.getItem("rereadz_returning_user").then((v) => {
        if (v === "true" && !params.tab) setActiveTab("login");
      });
  }, [params.tab]);

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
        setLoading(false);
        return;
      }
      await storage.setItem("rereadz_returning_user", "true");
      const userId = data.user?.id;
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
      router.replace("/(tabs)");
    } catch (e: unknown) {
      Toast.show({
        type: "error",
        text1: "Something went wrong",
        text2: e instanceof Error ? e.message : "Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async () => {
    const trimmed = signupEmail.trim();
    if (!trimmed || !signupPassword) {
      Toast.show({ type: "error", text1: "Enter email and password" });
      return;
    }
    if (signupPassword.length < MIN_PASSWORD_LENGTH) {
      Toast.show({
        type: "error",
        text1: "Password too short",
        text2: `Use at least ${MIN_PASSWORD_LENGTH} characters`,
      });
      return;
    }
    if (signupPassword !== confirmPassword) {
      Toast.show({ type: "error", text1: "Passwords don't match" });
      return;
    }
    if (!termsChecked) {
      Toast.show({
        type: "error",
        text1: "Please accept the Terms & Conditions and Privacy Policy to continue.",
      });
      return;
    }
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email: trimmed,
        password: signupPassword,
        options: {
          data: { agreed_terms_at: new Date().toISOString() },
        },
      });
      if (error) {
        Toast.show({ type: "error", text1: "Sign up failed", text2: error.message });
        setLoading(false);
        return;
      }
      if (data.session) {
        Toast.show({ type: "success", text1: "Account created" });
        const userId = data.user?.id;
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
        router.replace("/(tabs)");
      } else {
        Toast.show({
          type: "success",
          text1: "Check your email",
          text2: "We sent a confirmation link. Open it to verify your account, then sign in.",
        });
        setActiveTab("login");
      }
    } catch (e: unknown) {
      Toast.show({
        type: "error",
        text1: "Something went wrong",
        text2: e instanceof Error ? e.message : "Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Background orbs (match web) */}
        <View style={styles.orb1} />
        <View style={styles.orb2} />

        <View style={styles.hero}>
          <View style={styles.pill}>
            <View style={styles.pillDot} />
            <Text style={styles.pillText}>
              {activeTab === "login"
                ? "Welcome back to ReReadz"
                : "Join the ReReadz community"}
            </Text>
          </View>
          <Text style={styles.title}>
            {activeTab === "login" ? "Welcome Back" : "Start Your Journey"}
          </Text>
          <Text style={styles.subtitle}>
            {activeTab === "login"
              ? "Continue your book journey with us"
              : "Discover, trade, and connect with fellow book lovers"}
          </Text>
        </View>

        <View style={styles.card}>
          <View style={styles.tabs}>
            <Pressable
              style={[styles.tab, activeTab === "login" && styles.tabActive]}
              onPress={() => setActiveTab("login")}
              accessibilityRole="tab"
              accessibilityState={{ selected: activeTab === "login" }}
              accessibilityLabel="Log in"
            >
              <Text style={[styles.tabText, activeTab === "login" && styles.tabTextActive]}>
                Log in
              </Text>
            </Pressable>
            <Pressable
              style={[styles.tab, activeTab === "signup" && styles.tabActive]}
              onPress={() => setActiveTab("signup")}
              accessibilityRole="tab"
              accessibilityState={{ selected: activeTab === "signup" }}
              accessibilityLabel="Sign up"
            >
              <Text style={[styles.tabText, activeTab === "signup" && styles.tabTextActive]}>
                Sign up
              </Text>
            </Pressable>
          </View>

          {activeTab === "login" ? (
            <View style={styles.form}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="you@example.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                editable={!loading}
                accessibilityLabel="Email"
              />
              <View style={styles.labelRow}>
                <Text style={styles.label}>Password</Text>
                <Link href="/(auth)/forgot-password" asChild>
                  <Pressable hitSlop={8}>
                    <Text style={styles.forgotLink}>Forgot password?</Text>
                  </Pressable>
                </Link>
              </View>
              <Text style={styles.hint}>
                There are 123456 reasons why you should have a strong password. Make it count.
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Your password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                editable={!loading}
                accessibilityLabel="Password"
              />
              <Pressable
                style={[styles.button, loading && styles.buttonDisabled]}
                onPress={handleLogin}
                disabled={loading}
                accessibilityRole="button"
                accessibilityLabel="Sign in"
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.buttonText}>Sign in</Text>
                )}
              </Pressable>
            </View>
          ) : (
            <View style={styles.form}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="you@example.com"
                value={signupEmail}
                onChangeText={setSignupEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                editable={!loading}
                accessibilityLabel="Email"
              />
              <Text style={styles.label}>Password</Text>
              <Text style={styles.hint}>
                There are 123456 reasons why you need a good password. Make this one count!
              </Text>
              <TextInput
                style={styles.input}
                placeholder="At least 6 characters"
                value={signupPassword}
                onChangeText={setSignupPassword}
                secureTextEntry
                editable={!loading}
                accessibilityLabel="Password"
              />
              <Text style={styles.label}>Confirm password</Text>
              <TextInput
                style={styles.input}
                placeholder="Confirm your password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                editable={!loading}
                accessibilityLabel="Confirm password"
              />
              <Pressable
                style={styles.termsRow}
                onPress={() => setTermsChecked(!termsChecked)}
                accessibilityRole="checkbox"
                accessibilityState={{ checked: termsChecked }}
                accessibilityLabel="I agree to the Terms & Conditions and Privacy Policy"
              >
                <View style={[styles.checkbox, termsChecked && styles.checkboxChecked]}>
                  {termsChecked && <Text style={styles.checkmark}>✓</Text>}
                </View>
                <Text style={styles.termsText}>
                  I agree to the{" "}
                  <Pressable onPress={() => router.push("/terms")} hitSlop={8}>
                    <Text style={styles.termsLink}>Terms & Conditions</Text>
                  </Pressable>{" "}
                  and{" "}
                  <Pressable onPress={() => router.push("/privacy")} hitSlop={8}>
                    <Text style={styles.termsLink}>Privacy Policy</Text>
                  </Pressable>
                </Text>
              </Pressable>
              <Pressable
                style={[styles.button, loading && styles.buttonDisabled]}
                onPress={handleSignUp}
                disabled={loading}
                accessibilityRole="button"
                accessibilityLabel="Create account"
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.buttonText}>Create account</Text>
                )}
              </Pressable>
              <Text style={styles.switchText}>
                Already have an account?{" "}
                <Text
                  style={styles.switchLink}
                  onPress={() => setActiveTab("login")}
                >
                  Sign in
                </Text>
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8fafc" },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 40,
    maxWidth: 480,
    width: "100%",
    alignSelf: "center",
  },
  orb1: {
    position: "absolute",
    top: 80,
    left: 40,
    width: 200,
    height: 200,
    borderRadius: 999,
    backgroundColor: PRIMARY_LIGHT,
  },
  orb2: {
    position: "absolute",
    bottom: 100,
    right: 20,
    width: 260,
    height: 260,
    borderRadius: 999,
    backgroundColor: "rgba(248, 250, 252, 0.9)",
  },
  hero: {
    alignItems: "center",
    marginBottom: 24,
  },
  pill: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    gap: 8,
    backgroundColor: PRIMARY_LIGHT,
    borderWidth: 1,
    borderColor: PRIMARY_BORDER,
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginBottom: 16,
  },
  pillDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: PRIMARY,
  },
  pillText: {
    fontSize: 14,
    fontWeight: "500",
    color: PRIMARY,
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: PRIMARY,
    textAlign: "center",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 17,
    color: MUTED,
    textAlign: "center",
    lineHeight: 24,
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.06)",
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 30,
    elevation: 8,
  },
  tabs: {
    flexDirection: "row",
    backgroundColor: "rgba(0, 0, 0, 0.04)",
    borderRadius: 12,
    padding: 4,
    marginBottom: 24,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
  },
  tabActive: {
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  tabText: {
    fontSize: 16,
    fontWeight: "600",
    color: MUTED,
  },
  tabTextActive: {
    color: "#0f172a",
  },
  form: { gap: 0 },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: "#0f172a",
    marginBottom: 8,
  },
  labelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  forgotLink: {
    fontSize: 14,
    fontWeight: "500",
    color: PRIMARY,
  },
  hint: {
    fontSize: 12,
    color: MUTED,
    marginBottom: 8,
    fontStyle: "italic",
  },
  input: {
    height: 48,
    borderWidth: 2,
    borderColor: "#e2e8f0",
    borderRadius: 8,
    paddingHorizontal: 14,
    fontSize: 16,
    marginBottom: 20,
  },
  termsRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    marginBottom: 24,
    padding: 12,
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.06)",
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#cbd5e1",
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxChecked: {
    backgroundColor: PRIMARY,
    borderColor: PRIMARY,
  },
  checkmark: { color: "#fff", fontSize: 14, fontWeight: "700" },
  termsText: {
    flex: 1,
    fontSize: 14,
    color: "#334155",
    lineHeight: 20,
  },
  termsLink: {
    color: PRIMARY,
    fontWeight: "500",
    textDecorationLine: "underline",
  },
  button: {
    height: 48,
    borderRadius: 999,
    backgroundColor: PRIMARY,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: PRIMARY,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonDisabled: { opacity: 0.7 },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  switchText: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 14,
    color: MUTED,
  },
  switchLink: {
    color: PRIMARY,
    fontWeight: "600",
  },
});
