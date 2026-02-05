# ReReadz – Deep links & redirect URLs

The app uses the custom scheme **`rereadz`**. Use these paths for Supabase and Stripe redirect URLs.

## Supabase Auth (Dashboard → Authentication → URL configuration)

- **Site URL**: `rereadz://` (or your production web URL if you use a redirect page)
- **Redirect URLs** (add all that you use):
  - `rereadz://reset-password` – password recovery
  - `rereadz://verify-email` – email confirmation
  - `rereadz://accept-invite` – invite links
  - `rereadz://` – generic fallback

For **password recovery** and **email confirmation**, set the redirect URL in the email templates to:

- `rereadz://reset-password` (recovery)
- `rereadz://verify-email` (signup confirmation)

Supabase appends the token hash to the URL (e.g. `rereadz://reset-password#access_token=...`). The app parses the hash and completes the flow.

## Stripe Connect (seller payouts)

After Stripe Connect onboarding, users are sent to the **return URL** configured in your backend (e.g. `stripe-connect-onboard` Edge Function). To return users to the app:

1. Set the return URL to a web page that redirects to the app, e.g.  
   `https://yourapp.com/stripe-return` → redirect to `rereadz://stripe-return`
2. Or, if your Edge Function accepts a `returnUrl` in the request body, pass:  
   `Linking.createURL('stripe-return')` (Expo) so the URL is `rereadz://stripe-return`.

The **Stripe return** screen (`app/stripe-return.tsx`) calls `stripe-connect-complete` and then redirects to the main app.

## Checkout from offer

To open checkout from an accepted offer (e.g. from Messages), navigate to:

- `rereadz://checkout/offer?offerId=<offer_thread_id>`

The app will call `checkout-from-offer`, then redirect to the main checkout flow with the created order.
