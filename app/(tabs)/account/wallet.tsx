import { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  ActivityIndicator,
  StyleSheet,
  FlatList,
} from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { formatPrice } from "@/utils/format";
import Toast from "react-native-toast-message";

interface WalletData {
  balance_minor: number;
  hold_minor: number;
  currency: string;
}

interface SellerStatus {
  onboarded: boolean;
  payouts_enabled: boolean;
  details_submitted: boolean;
}

interface WalletTx {
  id: string;
  amount_minor: number;
  type: string;
  description: string | null;
  created_at: string;
}

export default function WalletScreen() {
  const { user } = useAuth();
  const [wallet, setWallet] = useState<WalletData | null>(null);
  const [sellerStatus, setSellerStatus] = useState<SellerStatus | null>(null);
  const [transactions, setTransactions] = useState<WalletTx[]>([]);
  const [loading, setLoading] = useState(true);
  const [withdrawing, setWithdrawing] = useState(false);
  const [connecting, setConnecting] = useState(false);

  const load = useCallback(async () => {
    if (!user?.id) return;
    setLoading(true);
    try {
      const { data: statusData } = await supabase.functions.invoke("seller-status");
      setSellerStatus((statusData as SellerStatus) ?? null);

      const { data: walletData } = await supabase
        .from("wallet_accounts")
        .select("id, balance_minor, hold_minor, currency")
        .eq("user_id", user.id)
        .maybeSingle();

      if (walletData) {
        const row = walletData as WalletData & { id: string };
        setWallet({ balance_minor: row.balance_minor, hold_minor: row.hold_minor, currency: row.currency });
        const accountId = row.id;
        if (accountId) {
          const { data: txData } = await supabase
            .from("wallet_transactions")
            .select("id, amount_minor, type, description, created_at")
            .eq("account_id", accountId)
            .order("created_at", { ascending: false })
            .limit(100);
          setTransactions((txData as WalletTx[]) ?? []);
        } else {
          setTransactions([]);
        }
      } else {
        const { data: escrow } = await supabase
          .from("orders")
          .select("total_minor, shipping_minor")
          .eq("seller_id", user.id)
          .eq("escrow_status", "held");
        let hold = 0;
        if (escrow?.length) {
          escrow.forEach((o: { total_minor: number; shipping_minor?: number }) => {
            const sub = o.total_minor - (o.shipping_minor ?? 0);
            hold += sub - Math.ceil(sub * 0.075);
          });
        }
        setWallet({ balance_minor: 0, hold_minor: hold, currency: "GBP" });
        setTransactions([]);
      }
    } catch (e) {
      console.error(e);
      setWallet({ balance_minor: 0, hold_minor: 0, currency: "GBP" });
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    load();
  }, [load]);

  const openStripeConnect = async () => {
    if (!user) return;
    setConnecting(true);
    try {
      const returnUrl = Linking.createURL("stripe-return");
      const { data, error } = await supabase.functions.invoke("stripe-connect-onboard", {
        body: { returnUrl },
      });
      if (error) throw error;
      const url = (data as { url?: string })?.url;
      if (url) {
        await WebBrowser.openBrowserAsync(url);
        load();
      } else {
        throw new Error("No URL returned");
      }
    } catch (e) {
      Toast.show({
        type: "error",
        text1: "Could not start setup",
        text2: e instanceof Error ? e.message : "Try again.",
      });
    } finally {
      setConnecting(false);
    }
  };

  const withdraw = async () => {
    if (!wallet || wallet.balance_minor <= 0) {
      Toast.show({ type: "info", text1: "No available balance to withdraw." });
      return;
    }
    setWithdrawing(true);
    try {
      const { data, error } = await supabase.functions.invoke("payouts", {
        body: { amount_minor: wallet.balance_minor },
      });
      if (error || (data as { error?: string })?.error) {
        throw new Error((data as { message?: string })?.message ?? (data as { error?: string })?.error ?? error?.message);
      }
      Toast.show({ type: "success", text1: "Payout initiated" });
      load();
    } catch (e) {
      Toast.show({
        type: "error",
        text1: "Payout failed",
        text2: e instanceof Error ? e.message : "Try again.",
      });
    } finally {
      setWithdrawing(false);
    }
  };

  if (!user) {
    return (
      <View style={styles.centered}>
        <Text style={styles.subtitle}>Sign in to view your wallet.</Text>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0ea5e9" />
      </View>
    );
  }

  const onboarded = sellerStatus?.onboarded ?? false;
  const available = wallet?.balance_minor ?? 0;
  const pending = wallet?.hold_minor ?? 0;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.card}>
        <Text style={styles.cardLabel}>Available</Text>
        <Text style={styles.amount}>{formatPrice(available)}</Text>
        <Text style={styles.cardLabel}>Pending (from sales)</Text>
        <Text style={styles.amountSmall}>{formatPrice(pending)}</Text>
      </View>

      {!onboarded && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Seller payouts</Text>
          <Text style={styles.cardDesc}>
            Connect your Stripe account to receive payouts when you sell books.
          </Text>
          <Pressable
            style={[styles.btn, styles.btnPrimary, connecting && styles.disabled]}
            onPress={openStripeConnect}
            disabled={connecting}
          >
            {connecting ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.btnText}>Connect Stripe</Text>
            )}
          </Pressable>
        </View>
      )}

      {onboarded && available > 0 && (
        <Pressable
          style={[styles.btn, styles.btnPrimary, withdrawing && styles.disabled]}
          onPress={withdraw}
          disabled={withdrawing}
        >
          {withdrawing ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.btnText}>Withdraw {formatPrice(available)}</Text>
          )}
        </Pressable>
      )}

      <Text style={styles.hint}>
        After a sale, funds are held briefly, then added to your balance. You can withdraw to your connected bank account.
      </Text>

      {transactions.length > 0 && (
        <View style={styles.txSection}>
          <Text style={styles.txSectionTitle}>Transaction history</Text>
          <FlatList
            data={transactions}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            renderItem={({ item }) => {
              const isCredit = item.amount_minor >= 0;
              return (
                <View style={styles.txRow}>
                  <View style={styles.txRowLeft}>
                    <Text style={styles.txType}>{item.type ?? "transaction"}</Text>
                    {item.description ? (
                      <Text style={styles.txDesc} numberOfLines={1}>{item.description}</Text>
                    ) : null}
                    <Text style={styles.txDate}>
                      {new Date(item.created_at).toLocaleDateString(undefined, {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </Text>
                  </View>
                  <Text style={[styles.txAmount, isCredit ? styles.txAmountCredit : styles.txAmountDebit]}>
                    {isCredit ? "+" : ""}{formatPrice(item.amount_minor)}
                  </Text>
                </View>
              );
            }}
          />
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16, paddingBottom: 32 },
  centered: { flex: 1, justifyContent: "center", alignItems: "center", padding: 24 },
  subtitle: { color: "#64748b" },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  cardLabel: { fontSize: 12, color: "#64748b", marginBottom: 4 },
  cardTitle: { fontSize: 16, fontWeight: "600", marginBottom: 8 },
  cardDesc: { fontSize: 14, color: "#64748b", marginBottom: 12 },
  amount: { fontSize: 28, fontWeight: "700", color: "#0f172a", marginBottom: 16 },
  amountSmall: { fontSize: 18, fontWeight: "600", color: "#0f172a" },
  btn: { padding: 14, borderRadius: 8, alignItems: "center", marginBottom: 12 },
  btnPrimary: { backgroundColor: "#0ea5e9" },
  btnText: { color: "#fff", fontWeight: "600" },
  disabled: { opacity: 0.7 },
  hint: { fontSize: 12, color: "#94a3b8" },
  txSection: { marginTop: 24, marginBottom: 16 },
  txSectionTitle: { fontSize: 16, fontWeight: "600", marginBottom: 12, color: "#0f172a" },
  txRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingVertical: 12,
    paddingHorizontal: 0,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#e2e8f0",
  },
  txRowLeft: { flex: 1, marginRight: 12 },
  txType: { fontSize: 14, fontWeight: "600", textTransform: "capitalize", color: "#0f172a" },
  txDesc: { fontSize: 12, color: "#64748b", marginTop: 2 },
  txDate: { fontSize: 11, color: "#94a3b8", marginTop: 2 },
  txAmount: { fontSize: 14, fontWeight: "600" },
  txAmountCredit: { color: "#166534" },
  txAmountDebit: { color: "#991b1b" },
});
