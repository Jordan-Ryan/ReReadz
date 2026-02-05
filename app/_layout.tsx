import "../global.css";
import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { AuthProvider } from "@/contexts/AuthContext";
import { OptionalStripeProvider } from "@/integrations/stripe/optionalStripe";
import Toast from "react-native-toast-message";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const stripePublishableKey =
  process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? "";

function RootLayout() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <OptionalStripeProvider
          publishableKey={stripePublishableKey}
          merchantIdentifier="merchant.com.rereadz"
        >
          <AuthProvider>
            <Stack screenOptions={{ headerShown: false }} />
            <Toast />
          </AuthProvider>
        </OptionalStripeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default RootLayout;
