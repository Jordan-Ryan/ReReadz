import React, { ReactNode } from "react";

/** Stripe native SDK is not available on web. Checkout stays on the native path. */
export const StripeAvailable = false;

export function OptionalStripeProvider({
  children,
}: {
  children: ReactNode;
  publishableKey: string;
  merchantIdentifier?: string;
}): React.ReactElement {
  return <>{children}</>;
}