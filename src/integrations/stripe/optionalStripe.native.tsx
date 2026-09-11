/**
 * Optional Stripe provider: only loads when native Stripe/Onramp modules are
 * available (e.g. in a development build with the Stripe Expo plugin).
 * In Expo Go, OnrampSdk is not in the native binary, so we skip Stripe entirely
 * so the app can load.
 */
import React, { ReactNode } from "react";

let StripeProviderComponent: React.ComponentType<{
  children: ReactNode;
  publishableKey: string;
  merchantIdentifier?: string;
}> | null = null;

try {
  const stripe = require("@stripe/stripe-react-native");
  StripeProviderComponent = stripe.StripeProvider;
} catch {
  // Native Stripe/Onramp modules not available (e.g. Expo Go)
}

export const StripeAvailable = StripeProviderComponent !== null;

export function OptionalStripeProvider({
  children,
  publishableKey,
  merchantIdentifier,
}: {
  children: ReactNode;
  publishableKey: string;
  merchantIdentifier?: string;
}): React.ReactElement {
  if (StripeProviderComponent && publishableKey) {
    return (
      <StripeProviderComponent
        publishableKey={publishableKey}
        merchantIdentifier={merchantIdentifier ?? "merchant.com.rereadz"}
      >
        {children}
      </StripeProviderComponent>
    );
  }
  return <>{children}</>;
}