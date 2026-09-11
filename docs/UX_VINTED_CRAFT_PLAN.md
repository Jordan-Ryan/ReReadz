# ReReadz website — Vinted craft update plan

**Status:** Plan only. No pixel implementation in this document’s PR.  
**Audience:** Jordan (founder walk) + whoever ships the later UI PRs.  
**Live reference:** [https://rereadz.com](https://rereadz.com)  
**As-is shots (2026-09-11):** home, browse/search, PDP, sell wall, checkout-trust.  
**This repo:** React Native companion that shares the same Supabase project, Edge Functions, and primary IA (Home / Browse / Sell / Messages / You). The live website is the surface this plan redesigns. Later implementation PRs should land on the web app first, then keep RN chrome aligned so the two clients do not diverge in flow.

---

## 1. What we are closing

Craft scores are **look / feel / flow**, not a feature shopping list. Close these gaps; do not add Vinted products ReReadz does not already have.

| Surface | Score now | Gap to close |
|---|---|---|
| Home | 2 | Marketing-first, dual search, tall pastel chrome → **feed-first, one search, shorter chrome** |
| Browse | 3 | **Quieter density, one search, less banner noise** |
| PDP | 2 | **Offer + Buy now only; calm price stack; lighter trust chrome** |
| Sell | 2 | **Photo-first multi-step rhythm (Vinted Sell), not a signup-interrupt wall** |
| Overall brand | 3 | Navy is fine; **reduce busy discovery / PDP** |

---

## 2. Brand lock (do not reopen)

| Locked | Rule |
|---|---|
| Primary | Navy `#1700AD` — keep. Do not restyle to Vinted teal. |
| Wordmark / logo | Keep the ReReadz mark as-is. |
| BETA | Keep the BETA chip. |
| Protection name | Keep **Reader’s Shield**. Do not rename to “Buyer Protection”. |
| Locale | UK English throughout (`colour` is not needed in UI copy; keep existing UK phrasing). |
| Economics | Do not invent take-rates. Keep **sellers keep 92.5%** and **tracked delivery from £2.99** exactly as shown on the live site. |
| Paige | Keep the mascot / Ask Paige. She is brand, not chrome to delete. Demote her from hero-scale marketing blocks. |

**Not locked (may change):** hero height, second search field, number of header rows, PDP right-rail density, sell-page-as-signup, checkout-as-signup, card chrome (hearts + badges + Buy on every tile), pastel section backgrounds.

---

## 3. Craft principles (apply on every view)

1. **One search.** A single persistent search in the header (⌘K stays). Remove in-page duplicate search fields on Home and Browse.
2. **Feed before manifesto.** Books first. Marketing copy, live counters, and QR / 92.5% stories sit *below* or *beside* inventory — never as a second viewport of chrome before the first cover.
3. **Two actions on a listing.** Primary **Buy now** (navy fill) + secondary **Make an offer** (navy outline). Message seller, bundle, compare, and Shield detail are not peer CTAs.
4. **Trust is a line, not a wall.** One Shield sentence + one delivery line. Long checklists move behind a disclosure or to checkout.
5. **Sell starts with a photo.** Auth is a gate at *publish / payout*, not the first screen of Sell or Buy.
6. **Shorter chrome.** Target: one header row (logo · search · Sell · account) + one thin utility row *or* a compact category strip. Kill the tall pastel hero slab.
7. **Reuse before rebuild.** Same listings API, BookCard data, ISBN/barcode fill, Stripe checkout, Reader’s Shield policy, category taxonomy, 92.5% / £2.99 copy.

---

## 4. Required Mobbin references (examined)

These five are the minimum craft canon. Cite them in later implementation PRs.

| Intent | Mobbin | What we take |
|---|---|---|
| Home | [Vinted Home explore](https://mobbin.com/explore/flows/bc3ebba4-4eaf-454f-8294-fe4e083da886) · examined sibling [Home](https://mobbin.com/flows/c94824db-23d3-4cff-b390-88c61ebc8a12) | One search, category chips under it, **Recommended** 2-up photo grid immediately. No marketing hero. |
| Sell | [Vinted Sell](https://mobbin.com/flows/f6d5c7c8-cc36-4fdb-9896-e6e93476f22e) · detail rhythm [Adding listing details](https://mobbin.com/flows/e8264d2b-0e3f-40a8-9fde-b6b1c6fe6143) | Photo first → title/description → row pickers (category, condition, price) → one **Upload**. |
| Listing / PDP | [Listing details](https://mobbin.com/flows/f0d145e2-673a-438e-b3b7-ed22c94d90d3) | Photo → seller chip → title / price / incl. line → **Make an offer** + **Buy now** sticky. Specs as a quiet list. |
| Purchasing | [Purchasing an item](https://mobbin.com/flows/a02dd5dc-06d1-423e-9968-e756c5265547) | Compact payment stack: totals, address, delivery, pay. No signup manifesto. |
| Filtering | [Filtering explore](https://mobbin.com/explore/flows/f9970233-c084-423e-885d-3f97855d704f) · examined [Filtering listings](https://mobbin.com/flows/a5e0401b-f094-4566-a5f6-a682adc45602) · [Sorting](https://mobbin.com/flows/bbb5223a-1e2b-409d-8464-2528b8c69263) | One search, chip filters, photo-led 2-up (mobile) / quiet grid (web). No Paige banner, no trust ticker above results. |

Supporting flows used below: [Searching Vinted](https://mobbin.com/flows/98eb8b39-8b6a-49b5-9f90-339e2586a5a0), [Making an offer](https://mobbin.com/flows/4150e22a-fd53-48c8-a858-d129b77b4cae), [Messaging a seller](https://mobbin.com/flows/63dd9766-37f1-4a1a-9148-2ce0a5ed5740), [Inbox](https://mobbin.com/flows/481e4b65-2d0e-4b06-9de1-cfd4a2ae6c68), [Profile](https://mobbin.com/flows/db390543-53ae-42ed-8e06-33690faea0e9), [Profile settings](https://mobbin.com/flows/5d831b78-8cc0-46b0-86fb-b00aa0ac17ec), [My orders](https://mobbin.com/flows/9061a93e-a56f-43e9-ad4f-1f4445314244), [Favorite items](https://mobbin.com/flows/ed3a95b6-2f10-4b7f-aa5c-6fddb37d6c5a), [Help center](https://mobbin.com/flows/9b795a0e-8bd3-4aa6-973d-413de49a6be4).

---

## 5. View-by-view plan

Each view: **craft problem · Vinted Mobbin URL · proposed layout / flow · reuse notes · out of scope.**

### 5.1 Home

**Craft problem.** As-is (`01-home.png`) and live `/` are a marketing landing page: dark/pastel hero, Paige, dual search (header ⌘K **and** hero field), live counters, category icon directory, then “Hot off the press” / “Just Listed”, then QR and “keep 92.5%” slabs. The first books sit below a tall chrome stack. Feels like a campaign site, not a marketplace you can shop in one scroll.

**Vinted Mobbin URL.** [Home explore](https://mobbin.com/explore/flows/bc3ebba4-4eaf-454f-8294-fe4e083da886) · [Home](https://mobbin.com/flows/c94824db-23d3-4cff-b390-88c61ebc8a12)

**Proposed layout / flow.**

```
[ Logo | ONE search | Sell books | Sign in ]
[ Optional thin chips: All · Fiction · Crime · Romance · Children’s · … ]
[ 2–6 column photo feed: Just listed / Recommended ]
     cover · title · price · +£2.99 delivery (muted)
[ After ~2 rows: slim “Sellers keep 92.5% · Shield on every order” strip ]
[ Optional: category rail, then more feed ]
[ Footer — unchanged IA ]
```

- Guest and signed-in share the same feed-first home. Signed-in can say “Welcome back” as a single line, not a new hero.
- “Hot off the press” and “Just Listed” collapse into **one** inventory feed (Just listed first; staff picks as a later row, not a second hero).
- QR / Royal Mail story moves below the fold or to Help / Selling guide. One line on Home at most.
- Header search is the only search. Hero search and “Scan ISBN” on Home go away (ISBN scan stays on Sell).

**Reuse notes.** Live category taxonomy and `useRecentlyAdded` / `useStaffPicks` (this repo: `app/(tabs)/index.tsx`, `BookCarousel`). Keep existing book cards’ data contract. Keep 92.5% / £2.99 / Reader’s Shield wording — just stop repeating them in a hero, a ticker, and a footer CTA.

**Out of scope.** New personalisation engine, Vinted “See only good fits” onboarding, size/brand follows, changing the logo lockup, new take-rate claims, deleting Paige from the brand.

---

### 5.2 Browse / search

**Craft problem.** As-is (`02-browse.png`) stacks: header search + page H1 + **second** search + ISBN scan + six filter chips + 21-book count + Paige companion banner + four trust pills, then a dense 6-up grid where every tile has condition badge, heart, title, author, price, delivery, and a navy **Buy**. Banner noise and dual search fight the covers. Live `/search?q=harry` also dumps a “No books found” empty + email capture + “explore other options” even when similar inventory exists below.

**Vinted Mobbin URL.** [Filtering explore](https://mobbin.com/explore/flows/f9970233-c084-423e-885d-3f97855d704f) · [Filtering listings](https://mobbin.com/flows/a5e0401b-f094-4566-a5f6-a682adc45602) · [Searching Vinted](https://mobbin.com/flows/98eb8b39-8b6a-49b5-9f90-339e2586a5a0)

**Proposed layout / flow.**

```
[ Same one search — query already in the header ]
[ “21 books” · Sort ]                    [ Filter chips: Price · Condition · Format · Category ]
[ Photo grid. Card = cover + title + £price. Heart optional. No Buy on the tile. ]
[ Sticky mobile: Filter ]
```

- Filters open as a sheet / popover (Vinted Filter list: Sort, Category, Condition, Price → **Show results**). Do not add a second full search field.
- Card click goes to PDP. Buy happens there. This is the single biggest density win.
- Trust pills and Paige banner leave Browse. Empty state: one sentence + category links — no email-capture slab above related results.
- ISBN scan lives on Sell, or as an icon *inside* the one header search — not a second control.

**Reuse notes.** Existing filter dimensions (price, format, condition, edition, category) stay. Live search + this repo’s `app/(tabs)/listings.tsx` / `useListings`. `BookCard` already omits Buy — prefer that quieter card on web.

**Out of scope.** New filter dimensions (colour, brand, material), saved-search product, bumping, changing relevance ranking.

---

### 5.3 Category

**Craft problem.** Live `/categories` is a long directory (31 categories, counts, subcats, “coming soon”). Useful as an index, but it is another marketing page: H1 + stats + cards + another Browse CTA. There is no quiet “you are in Thriller, here are the books” rhythm. Category-from-home currently dumps people into Browse-with-noise rather than a feed.

**Vinted Mobbin URL.** [Home](https://mobbin.com/flows/c94824db-23d3-4cff-b390-88c61ebc8a12) (category tabs over a feed) · [Filtering listings](https://mobbin.com/flows/a5e0401b-f094-4566-a5f6-a682adc45602) · [Saving a category](https://mobbin.com/flows/81a52561-e915-4d2b-84f1-0b74b33a08e8)

**Proposed layout / flow.**

- **Index (`/categories`):** compact list or chip cloud — name + count only. No hero paragraph. Keep subcategory expanders.
- **Category results (`/categories/[slug]` or Browse `?category=`):** same template as Browse — one search, title = category name, chip filters, photo grid. Optional subcategory chips under the title (Children’s → Picture Books / Early Readers).
- Home category chips deep-link here, not to a second marketing page.

**Reuse notes.** Existing 31-category tree and book counts. Same grid component as Browse. This repo already routes category chips into `listings` with a `category` param.

**Out of scope.** Recategorising the taxonomy, new “coming soon” merchandising, Vinted brand-shop modules.

---

### 5.4 PDP (listing)

**Craft problem.** As-is (`03-pdp.png`) is a busy two-column product page: large cover; long description; “More by the author”; composition / bookmarks; then a right rail with £price, delivery, **Make offer**, **Buy now**, a full Reader’s Shield checklist, bundle CTA, compare-prices card, “create a bundle”, and more seller merchandising. Below: another dense “More from [seller]” grid. Three competing commercial stories (buy, offer, bundle, compare, Shield). Message is not even the problem — the rail is.

**Vinted Mobbin URL.** [Listing details](https://mobbin.com/flows/f0d145e2-673a-438e-b3b7-ed22c94d90d3) · [Making an offer](https://mobbin.com/flows/4150e22a-fd53-48c8-a858-d129b77b4cae)

**Proposed layout / flow.**

```
Desktop:
  [ Cover gallery ]     [ Seller chip · Message (text link) ]
                        [ Title · author · condition · format ]
                        [ £10.00 ]
                        [ + tracked delivery from £2.99 ]
                        [ Protected by Reader’s Shield → ]
                        [ Make an offer ] [ Buy now ]
                        [ Description ]
                        [ Quiet spec rows: category, edition, ISBN ]

Mobile:
  Full-bleed cover → same stack → sticky [ Offer | Buy now ]
```

- **Only two buttons** in the purchase cluster: Offer (outline) + Buy now (navy fill).
- Message seller becomes a seller-chip action, not a third full-width button.
- Shield: one line + disclosure (“What’s covered”). Do not reprint the checklist on every PDP.
- Bundle / compare / “more from seller” move **below** the fold as a single “More from this seller” row — same quiet cards as Browse (no Buy on tile).
- Offer sheet: asking price, optional quick chips, custom amount, Shield-inclusive line, submit → existing thread. Do not invent new offer economics; keep the current 50% floor already in `app/listing/make-offer.tsx`.

**Reuse notes.** Live listing-detail payload (`listing-detail` function). This repo’s `app/listing/[slug].tsx` already has Offer / Message / Buy — **drop Message from the primary cluster** on web to match the score. Checkout still via `checkout-session`. Keep condition labels (Like new / Very good / Good / Acceptable).

**Out of scope.** New bundle product, price-comparison crawler, changing Shield policy or fees, adding Vinted’s buyer-protection *fee line as a new charge*, bumping.

---

### 5.5 Sell / list steps

**Craft problem.** As-is (`04-sell.png`) and live `/sell` are a **signup wall** wearing marketplace copy: “Buy & Sell Books”, 92.5%, I’m new / Log in, full name / email / password, marketing opt-in. The user asked to list a book and got an account form. That is the opposite of [Vinted Sell](https://mobbin.com/flows/f6d5c7c8-cc36-4fdb-9896-e6e93476f22e), which opens on **Upload photos**. This repo’s `app/(tabs)/sell.tsx` is closer (Start listing → draft) but still auth-blocks before a photo.

**Vinted Mobbin URL.** [Sell](https://mobbin.com/flows/f6d5c7c8-cc36-4fdb-9896-e6e93476f22e) · [Adding listing details](https://mobbin.com/flows/e8264d2b-0e3f-40a8-9fde-b6b1c6fe6143)

**Proposed layout / flow.**

```
Step 0  Sell books (if logged out): one line “List in about 60 seconds · you keep 92.5%”
         Primary: Upload photos / Scan ISBN
         Auth only when they hit Publish (or when draft must persist).
Step 1  Photos — large add tile + thumbnails. Soft tip: “Natural light, cover + spine.”
Step 2  Title · author · description (ISBN scan can autofill these — already a ReReadz strength)
Step 3  Row pickers: Category ›  Condition ›  Price ›  Postage (tracked from £2.99, existing)
Step 4  Preview → Publish
```

- Rhythm is **one focused column**, not a marketing page with a form card.
- Do not put first name / last name / newsletter on the Sell route.
- Guest drafts: local-only until publish, *or* soft account sheet (“Save this listing”) with email + password only — no manifesto headline.
- After publish: existing confirm + QR shipping story (that feature stays; it just is not the Home hero).

**Reuse notes.** `listings` Edge Function: `create_draft`, `sign_uploads`, `update_draft`, `publish`. This repo’s `app/sell/[id].tsx` already has title, author, ISBN, condition, category, price, photo, save, publish. Reorder that wizard to **photo → identity → pickers → publish**. Keep min price and condition enum. Keep “free to list, 7.5% on sale” as the *existing* 92.5% keep — do not rewrite the rate.

**Out of scope.** New postage products, printerless QR rebuild, Spotlight / bump paywalls, Depop-style hashtag taxonomies, changing payout timing.

---

### 5.6 Checkout / payment

**Craft problem.** As-is (`05-checkout-trust.png`) reuses the **same signup wall** as Sell (“Almost yours”, I’m new / Log in, full account form) *before* address or pay. Vinted’s [Purchasing an item](https://mobbin.com/flows/a02dd5dc-06d1-423e-9968-e756c5265547) goes listing → compact payment (totals, address, delivery, card, **Pay**). Trust is one “secure encrypted payment” line, not a landing page.

**Vinted Mobbin URL.** [Purchasing an item](https://mobbin.com/flows/a02dd5dc-06d1-423e-9968-e756c5265547)

**Proposed layout / flow.**

```
If guest: compact account sheet (email + password or magic link) OR guest checkout if already supported.
Then one Payment screen:
  Book thumb + title
  Item · tracked delivery from £2.99 · Reader’s Shield · Total
  Address (edit)
  Delivery method (existing carriers)
  Stripe payment
  [ Pay ]
```

- No “Almost yours” marketing hero. No newsletter checkbox on the payment path.
- Shield appears once in the totals stack (“Reader’s Shield included” / existing protection line). Do not reprint the PDP checklist.
- Success: order confirmation + “track in Orders”. Sold listing state can follow Vinted’s quiet “Sold” banner on the PDP — no new product.

**Reuse notes.** Live Stripe Checkout / `checkout-session` + this repo’s `app/checkout/*` (`get_data`, `update_address`, payment, success/cancel). Keep buyer-protection fee **as already charged** — do not add or rename fees. Keep Stripe / SSL footer marks.

**Out of scope.** New PSPs, Apple Pay as a project, changing Shield coverage, address-book rebuild, bundling checkout redesign (existing bundle pay can stay).

---

### 5.7 Orders / trust

**Craft problem.** Orders are not in the five as-is shots. Live trust is scattered: Home ticker, Browse pills, PDP checklist, checkout signup, Help “What is Reader’s Shield?”, footer SSL marks. That scatter is why PDP/Browse feel busy. Orders themselves (this repo: `app/(tabs)/account/orders.tsx`) already have Bought / Sold and real status labels (`paid`, `dispatched`, `in_transit`, `delivered`, `disputed`, …). The craft job is a **calm order list + one Shield moment**, not more badges on discovery.

**Vinted Mobbin URL.** [My orders](https://mobbin.com/flows/9061a93e-a56f-43e9-ad4f-1f4445314244) · [Purchasing an item](https://mobbin.com/flows/a02dd5dc-06d1-423e-9968-e756c5265547) (sold / receipt end state)

**Proposed layout / flow.**

```
Orders
  [ Bought | Sold ]
  [ All · In progress · Completed ]
  Row: thumb · title · £total · status · ›
Order detail
  Status timeline (existing states)
  Tracked postage + QR if seller
  Reader’s Shield: one “Need help?” → Help / dispute (existing)
```

- Remove duplicate Shield chrome from Home / Browse / PDP once this view (plus the one PDP line) owns trust.
- Seller shipping QR stays on the **sold order**, not the marketing home.

**Reuse notes.** `orders` table + status map already in this repo. Help article “What is Reader’s Shield?” stays the policy source of truth.

**Out of scope.** New dispute workflow, new insurance product, renaming Shield, changing 92.5% or £2.99.

---

### 5.8 Messages

**Craft problem.** Not in the as-is set. Live mobile shell already has Messages. This repo has a working inbox (`app/(tabs)/messages`) and thread with offers / attachments. Risk after the PDP change: Message is demoted on the listing, so the **thread** must still carry Offer + Buy and the listing thumb, or conversations become dead ends.

**Vinted Mobbin URL.** [Inbox](https://mobbin.com/flows/481e4b65-2d0e-4b06-9de1-cfd4a2ae6c68) · [Messaging a seller](https://mobbin.com/flows/63dd9766-37f1-4a1a-9148-2ce0a5ed5740) · [Accepting an offer](https://mobbin.com/flows/d3d1048c-94f2-4441-b27c-71e105acec6f)

**Proposed layout / flow.**

```
Inbox: Messages | Notifications (if notifications already exist)
  Row: avatar · name · last line · listing thumb · time

Thread:
  Sticky listing card: thumb · title · £price · [ Make an offer ] [ Buy now ]
  Safety one-liner (keep existing “don’t share personal details” if present)
  Bubbles
  Composer
```

- Offer / accept / decline stay in-thread (already started in RN).
- Do not add a third primary CTA on PDP in order to “save” messaging — the thread header is the right place.

**Reuse notes.** `message_threads`, `messages`, `offers-submit`, `ThreadListItem`, `ChatInput`. Web should match this structure rather than invent a helpdesk inbox.

**Out of scope.** New chat platform, voice notes, leaving ReReadz to WhatsApp as a designed path.

---

### 5.9 You / profile

**Craft problem.** Live header is “Sign Up” + Sell for guests; logged-in account is a long settings dump (this repo’s `account/index.tsx` lists profile, orders, listings, notifications, settings, wallet, bookshelf, bundles, subscription, spotlight, gift card, admin, plus every legal page). Vinted splits **closet (You)** from **settings**. Community/legal links do not belong on the first screen of You.

**Vinted Mobbin URL.** [Profile](https://mobbin.com/flows/db390543-53ae-42ed-8e06-33690faea0e9) · [Profile settings](https://mobbin.com/flows/5d831b78-8cc0-46b0-86fb-b00aa0ac17ec)

**Proposed layout / flow.**

```
You
  Avatar · username · Reviews (if we have them)
  [ Closet / Listings | About ]
  Rows: Favourites / Bookshelf · Orders · Wallet & payouts
  Your listings grid (same quiet cards)
  Footer of You: Settings ›

Settings (second screen)
  Profile, notifications, vacation, legal, help
```

- Guest “You” = compact sign-in (not the Sell manifesto).
- Public seller page (`/seller/[id]`) stays a closet grid + about — not a Community landing page.

**Reuse notes.** Existing account routes in this repo and live footer IA. Do not delete Spotlight / bundles / wallet — nest them under Settings or a “Selling” group.

**Out of scope.** New loyalty, Vinted badges / streaks as a product, donation-percentage product (charity shops already exist as a separate surface).

---

### 5.10 Bookshelf

**Craft problem.** Header nav includes Bookshelf; live `/bookshelf` 404s when logged out (Paige 404). Community page promises “Your Bookshelf — track every page you turn.” This repo already has `bookshelves` / `shelf_items` (`app/(tabs)/account/bookshelf.tsx`) with named shelves. Craft issue: Bookshelf is treated as a marketing destination in the top nav, then fails or competes with Browse.

**Vinted Mobbin URL.** [Favorite items](https://mobbin.com/flows/ed3a95b6-2f10-4b7f-aa5c-6fddb37d6c5a)

**Proposed layout / flow.**

- Logged out: simple empty state — “Save books you want” + Sign in. **No 404.**
- Logged in: shelf tabs + photo grid (same cards as Browse). Heart on PDP / cards writes here.
- Remove Bookshelf from the **primary marketing subnav** (Discover / Categories / Community / Help). It lives under You — same as Vinted Favourites.

**Reuse notes.** `bookshelves`, `shelf_items`, existing heart on browse cards. Keep Want to Read / reading-goal data if it already exists; do not design a new Goodreads.

**Out of scope.** Social reading graphs, new goal engine, public bookshelf SEO as a v1 craft task.

---

### 5.11 Community / help

**Craft problem.** Community (`/community`) is another tall marketing page: “A home for book lovers”, cover mosaic, Reading Room / charities / bookshelf cards, live activity (sometimes raw emails), featured members, duplicate book-club modules, long FAQ. Help (`/help`) is stronger (search, Ask Paige, topic list) but still a double “Ask Paige” header and a heavy footer. Vinted Help is a **search + topic list**. Community can stay distinctive — it should not steal Home’s job.

**Vinted Mobbin URL.** [Help center](https://mobbin.com/flows/9b795a0e-8bd3-4aa6-973d-413de49a6be4)

**Proposed layout / flow.**

**Help**

```
How can we help?
[ Search guides ]
Ask Paige (one module)
Topics as a quiet list: Getting started · Buying · Selling · Payments & Reader’s Shield · Shipping · Refunds · Safety · Account
```

**Community**

- One H1, three links (Reading Room, Book clubs, Charities), then activity. Kill the second book-club grid and the email-leaking activity names.
- Book clubs (`/book-clubs`) keep filters; drop the extra “Love Books? Join Our Community” closing slab that repeats Home.

**Reuse notes.** Existing help slugs, Paige, `book-clubs`, `charities`, blog. This repo’s `app/help/index.tsx` topic list is the right density.

**Out of scope.** New forum product, leaderboards redesign, changing charity take-rates, Paige model work.

---

### 5.12 Mobile nav / shell

**Craft problem.** Live mobile already exposes **Home · Browse · Sell · Messages · You** — correct IA, same as this repo’s tabs. Desktop adds a second nav row (Discover / Categories / Bookshelf / Community / Help) plus header search plus Sign Up plus Sell — three layers. Tall pastel/dark heroes make the shell feel taller than Vinted’s “search + tabs”. Tab bar active colour in this repo is sky `#0ea5e9`; web brand lock is navy `#1700AD`.

**Vinted Mobbin URL.** Any examined iOS flow (tab bar on [Home](https://mobbin.com/flows/c94824db-23d3-4cff-b390-88c61ebc8a12), [Sell](https://mobbin.com/flows/f6d5c7c8-cc36-4fdb-9896-e6e93476f22e), [Inbox](https://mobbin.com/flows/481e4b65-2d0e-4b06-9de1-cfd4a2ae6c68), [Profile](https://mobbin.com/flows/db390543-53ae-42ed-8e06-33690faea0e9))

**Proposed layout / flow.**

| Viewport | Shell |
|---|---|
| Mobile | Top: logo + search icon. Bottom: Home · Browse · **Sell** (centre) · Messages · You. Navy active state. |
| Desktop | One row: logo · search · Sell books · You. Utility links (Categories, Community, Help) in footer and/or a single overflow. |

- Sell is a **tab / primary action**, not a landing-page campaign button that opens signup.
- Cookie banner stays; do not add more global toasts.
- 404 (“Paige dozed off”) is fine; Bookshelf must not 404.

**Reuse notes.** Expo tabs in `app/(tabs)/_layout.tsx`. Live footer columns already hold Shop / Sell / Community / Support / Company / Legal — that is where secondary IA belongs.

**Out of scope.** New app download interstitial, changing the wordmark, adding a sixth tab.

---

## 6. Cross-cutting inventory (stop repeating)

These blocks appear on too many pages today. After the update they have **one** home:

| Block | Lives on | Removed from |
|---|---|---|
| Search field | Header only | Home hero, Browse body |
| 92.5% / £2.99 | Home slim strip + Sell step 0 + footer | Browse ticker, checkout hero, Community closer |
| Reader’s Shield checklist | Help article + checkout totals line | Home, Browse, PDP rail |
| Paige | Help (Ask Paige) + 404 | Browse companion banner, Home-as-mascot-hero |
| Signup form | Auth routes + soft sheet at Publish / Pay | `/sell` as the page, `/checkout` as the page |
| Bookshelf | You | Primary subnav |
| QR postage | Sold-order + Selling guide | Home mid-page feature |

---

## 7. Phased milestones

Implementation is **later PRs**. This run ships the plan only. Phases are craft slices a founder can walk, not calendar estimates.

### Phase 0 — Lock (this PR)

- [x] Written plan, brand lock, Mobbin canon, view coverage, walk gates.
- [ ] Jordan signs the brand lock and the two-CTA PDP rule.

### Phase 1 — Shell + Home + Browse + Category

**Ship:** one search; shorter header; feed-first Home; quiet Browse/Category grids (no Buy on tiles); Bookshelf out of primary nav; mobile tab navy.

**Does not ship:** Sell rewrite, PDP rail, checkout.

### Phase 2 — PDP + Sell

**Ship:** Offer + Buy only; calm price stack; Shield disclosure; photo-first list steps; auth deferred to publish.

**Does not ship:** checkout signup removal (can start, but walk Phase 2 on listing + sell even if pay still asks for an account).

### Phase 3 — Checkout + Orders + Messages + You

**Ship:** compact pay stack; Orders Bought/Sold; thread with listing + Offer/Buy; You = closet + few rows; Bookshelf empty state (no 404).

### Phase 4 — Community / Help quieting + leftover chrome

**Ship:** Help = search + topics + one Paige; Community loses mosaic/FAQ bloat; strip remaining 92.5% / Shield repeats.

Each phase is allowed to touch shared components (`BookCard`, header, footer) only if earlier phases stay green on the walk gates below.

---

## 8. Founder walk gates

Jordan walks **production or a preview**, not Figma. Fail the phase if any gate fails. Do not compensate by adding features.

### Gate A — Brand lock (every phase)

1. Wordmark is the current ReReadz logo. BETA still visible.
2. Primary buttons / links are navy `#1700AD`, not teal, not sky.
3. Copy still says **Reader’s Shield**, **92.5%**, **tracked delivery from £2.99**. No new percentages.
4. UK English. No “buyer protection fee” rename.

### Gate B — Home (Phase 1)

1. From load, **covers are visible without scrolling past a tall hero** on a 13" laptop and on iPhone.
2. There is **one** search control.
3. No second “Search books, authors or ISBN” in the body.
4. First feed is inventory (Just listed / recommended), not QR or category directory.
5. 92.5% / Shield appear at most once below the first rows.

### Gate C — Browse + Category (Phase 1)

1. Search results do not render a second search field.
2. No Paige banner and no four-pill trust ticker above the grid.
3. Cards have no Buy button; click opens PDP.
4. Opening Thriller (or any category) shows a feed titled as that category, not a manifesto.
5. Filter chips still include Price, Condition, Category (existing dimensions).

### Gate D — PDP (Phase 2)

1. Purchase cluster is **exactly** Make an offer + Buy now.
2. Price stack is: asking £ · delivery from £2.99 · one Shield line.
3. No Shield checklist, compare-price card, or bundle CTA in the first screenful.
4. Message is available from the seller chip / later, not a third full button.
5. Mobile: Offer + Buy stick to the bottom.

### Gate E — Sell (Phase 2)

1. `/sell` opens on **photos** (or ISBN → photos), not first-name / email / password.
2. Logged-out user can add a photo and title before being asked to create an account.
3. Account, when it appears, is a small sheet — not “Buy & Sell Books” marketing.
4. Publish still results in a live listing with existing 92.5% economics.
5. Condition + category + price pickers feel like a list of rows, not a long single form under a hero.

### Gate F — Checkout / Orders (Phase 3)

1. Buy now does not open the “Almost yours” signup landing. Account is a sheet or already signed in.
2. Payment screen shows item, delivery from £2.99, Shield, total, address, Stripe, Pay — no newsletter.
3. Orders: Bought / Sold, thumb + status, tap through to tracking / QR for sellers.
4. Fees on the receipt match pre-plan (no new lines).

### Gate G — Messages / You / Bookshelf (Phase 3)

1. Inbox rows show listing thumb + last message.
2. Thread header can Offer and Buy the book.
3. You shows listings / orders / bookshelf first; legal pages are not the first fold.
4. Bookshelf logged-out = empty state, **not** Paige 404.
5. Bookshelf is not in the top marketing subnav.

### Gate H — Community / Help / shell (Phase 4 + always)

1. Help is searchable topics + one Ask Paige. No double Paige header.
2. Community does not out-shout Home (no full-bleed mosaic + FAQ + second club grid).
3. Mobile: five tabs, Sell in the centre, navy selected.
4. Desktop header is one row + search. Footer still has the legal / shop sitemap.
5. Walk Home → Browse → PDP → Offer or Buy → (account sheet) → Pay path in under a minute of chrome.

### Final walk (all phases green)

Jordan does this once on preview:

1. Land on Home — buy a book with two thumbs (search → PDP → Buy now).
2. Land on Home — list a book starting with a photo, without a signup lecture.
3. Open Messages on that listing and still see Offer + Buy.
4. Confirm navy, logo, BETA, Reader’s Shield, 92.5%, £2.99 unchanged.

If that walk still feels like a campaign site, Phase 1 is not done — do not add Community features to compensate.

---

## 9. Repo / implementation notes (for the next PR, not this one)

| Surface | Live web (rereadz.com) | This RN repo |
|---|---|---|
| Home | Marketing hero + dual search | Simpler hero + carousels — closer to the target; do not copy the web hero into RN |
| Browse | Dense Buy-on-card grid | `BookCard` is already quieter — **promote this card to web** |
| PDP | Busy rail | Offer + Message + Buy — drop Message from the primary cluster |
| Sell | Signup wall | Draft wizard exists — **reorder photo-first**; defer auth |
| Checkout | Signup wall | Address + totals + Stripe — closer to Vinted Payment |
| Orders / Messages / Bookshelf | Partially hidden / 404 | Already structured — web should follow |

**Do not in later PRs:** restyle to Vinted teal; replace the logo; add take-rates; implement this plan as a greenfield app; spawn extra marketing sections to “use the space” after chrome is removed.

---

## 10. Explicitly out of scope (whole programme)

- Pixel work or component restyle in the PR that only adds this document.
- Fee, payout, or postage price changes.
- New brand colours, new wordmark, dropping BETA, renaming Reader’s Shield.
- Feature build-out: bumping, saved searches as a product, new PSPs, Goodreads clone, Vinted donations %, size personalisation.
- Copy that claims rates other than **92.5%** and **tracked from £2.99**.
- Treating Community as the new Home.

---

## 11. Source shots (as-is, 2026-09-11)

| Shot | File (as provided) | Used for |
|---|---|---|
| Home | `gtm/rereadz-as-is-2026-09-11/01-home.png` | Dual search, tall chrome, category directory, QR slab |
| Browse | `gtm/rereadz-as-is-2026-09-11/02-browse.png` | Second search, Paige banner, trust pills, Buy-on-card density |
| PDP | `gtm/rereadz-as-is-2026-09-11/03-pdp.png` | Offer + Buy plus Shield wall, bundle, compare |
| Sell | `gtm/rereadz-as-is-2026-09-11/04-sell.png` | Signup interrupt |
| Checkout-trust | `gtm/rereadz-as-is-2026-09-11/05-checkout-trust.png` | Same interrupt on Buy |

Live spot-check the same day: `/`, `/sell`, `/help`, `/categories`, `/search?q=harry`, `/community`, `/book-clubs`. `/browse` and `/bookshelf` 404 when unauthenticated — fix those in Phase 1 / 3 rather than designing more 404 personality.
