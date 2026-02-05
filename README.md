# ReReadz (React Native)

React Native app for the ReReadz book marketplace. It uses the **same Supabase project** as the web app (page-turner-trades): same auth, database, storage, and Edge Functions.

## Setup

1. **Install dependencies**

   ```sh
   npm install
   ```

2. **Environment (optional)**

   The app works with the default Supabase project (URL and anon key are in code). To override, create a `.env` file or set:

   - `EXPO_PUBLIC_SUPABASE_URL` – Supabase project URL
   - `EXPO_PUBLIC_SUPABASE_ANON_KEY` – Supabase anon (public) key

   Use the same values as the web app for production.

3. **Run**

   ```sh
   npx expo start
   ```

   Then press `i` for iOS simulator or `a` for Android emulator.

## Backend

- **Supabase**: Same project as the web app. No backend changes required.
- **Stripe / SendCloud**: Used only via Supabase Edge Functions; no keys in the app.
- **Deep links**: Scheme `rereadz://` for password reset, email confirmation, and Stripe return. Configure in `app.json` and your Supabase auth URL settings.

## Structure

- `app/` – Expo Router screens (tabs, auth, listing detail, checkout).
- `src/` – Supabase client, storage, contexts, hooks, components, utils.
- Same Supabase `Database` types and Edge Function names as the web app.

## Features (MVP)

- Auth: login, forgot password, sign out.
- Home: hero, recently added and staff picks carousels, categories.
- Browse: listings list with search and category filter, listing detail, buy CTA → checkout placeholder.
- Account: profile, sign out.
- Sell / Messages: placeholders for full flows.

Tier 2 (Spotlight, help, static pages) and Tier 3 (charity, community, admin) can be added on top of this base.
