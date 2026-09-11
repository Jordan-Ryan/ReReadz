import { Platform } from "react-native";

/** Locked ReReadz brand tokens. Do not restyle to Vinted teal. */
export const NAVY = "#1700AD";
export const NAVY_DEEP = "#0C0066";
export const NAVY_SOFT = "#EEF0FF";
export const GOLD = "#E4C36A";
export const INK = "#0f172a";
export const MUTED = "#64748b";
export const LINE = "#e2e8f0";
export const SURFACE = "#f8fafc";
export const WHITE = "#ffffff";

export const BRAND = {
  navy: NAVY,
  navySoft: NAVY_SOFT,
  ink: INK,
  muted: MUTED,
  line: LINE,
  surface: SURFACE,
  white: WHITE,
} as const;

/** Locked commercial copy — do not invent rates. */
export const SELLERS_KEEP = "92.5%";
export const TRACKED_DELIVERY = "tracked delivery from £2.99";
export const DELIVERY_LINE = "+£2.99 delivery";
export const DETAIL_DELIVERY = "Tracked delivery from £2.99";
export const SHIELD_NAME = "Reader's Shield";
export const TRUST_STRIP =
  "Sellers keep 92.5% · Shield on every order";
export const SEARCH_PLACEHOLDER = "Search for your next book...";
export const SEARCH_FIELD = "#F5F5F5";
export const BADGE_FREQUENT = "Frequent";
export const BADGE_SOLD = "Sold";

/** Live rereadz.com type — Inter / Inter Tight / Noto Serif Display. */
export const FONT_SANS = Platform.select({
  web: "Inter, system-ui, sans-serif",
  default: "System",
}) as string;
export const FONT_DISPLAY = Platform.select({
  web: '"Inter Tight", Inter, system-ui, sans-serif',
  default: "System",
}) as string;
export const FONT_SERIF = Platform.select({
  web: '"Noto Serif Display", Georgia, serif',
  default: "Georgia",
}) as string;

/** Live rereadz.com Home copy — keep wording locked. */
export const HERO_TITLE = "The UK marketplace for pre-loved books";
export const HERO_SUBTITLE =
  "Think Vinted, but for books. Buy and sell directly with real UK readers, keep 92.5% of every sale, tracked delivery from £2.99.";
export const TRUST_PILLS = [
  "Tracked delivery from £2.99",
  "Reader's Shield on every order",
  "Sellers keep 92.5%",
] as const;
export const HOT_OFF_PRESS = "Hot off the press";
export const SHELF_EYEBROW = "The Shelf";
export const SHELF_TITLE = "Just Listed by Readers";
export const SHELF_SUB = "Fresh arrivals from our community of book lovers";
export const SHELF_EMPTY = "No new books yet — check back soon for fresh arrivals!";
export const CATEGORY_TITLE = "Browse by category";
export const CATEGORY_SUB = "Pick a category to start browsing pre-loved books.";
export const SELL_CTA_KICKER = "Have books to sell?";
export const SELL_CTA_TITLE = "Turn the shelf you have finished with into cash";
export const SELL_CTA_LEAD =
  "Scan a barcode, we fill in the details, you set the price. Listing is free and you keep 92.5% of every sale.";
export const SELL_CTA_POINTS = [
  "List in about 60 seconds",
  "Free to list, 7.5% on sale",
  "We create the postage label",
] as const;
export const QR_KICKER = "New feature";
export const QR_TITLE = "Ship easier with QR codes";
export const QR_LEAD =
  "Sold a book? Get a QR code straight to your phone. Drop it at your nearest Royal Mail, Evri or InPost point - no printer, no labels, no faff.";
export const QR_POINTS = [
  "Instant QR code",
  "Tracked delivery",
  "No printer needed",
] as const;
export const QR_DROPOFF = "Drop off with InPost";
export const CTA_BROWSE = "Browse all books";
export const CTA_LIST = "List a book in 60s";
export const CTA_SELL = "Start selling";
export const SELL_AVG_TIME = "Average listing time: 1 min 45 sec";
export const SELL_STEPS = ["Photos", "Details", "Price", "Publish"] as const;
export const SELL_SCAN_TITLE = "Scan the barcode";
export const SELL_SCAN_BODY =
  "Point your camera at the back of the book. We'll auto-fill the title, author, cover and category in seconds.";
export const SELL_SCAN_CTA = "Scan barcode to autofill";
export const SELL_TYPE_ISBN = "Type ISBN instead";
export const SELL_MULTIPLE = "Sell multiple books";
export const SELL_FASTEST = "FASTEST WAY";
export const SELL_GATE_EYEBROW = "Like Vinted, but for books";
export const SELL_GATE_TITLE = "Buy & Sell Books";
export const SELL_GATE_SUB =
  "A UK marketplace where readers buy and sell their own books. List a book in 60 seconds, keep 92.5% of every sale.";
export const SELL_GATE_HINT =
  "First time here? Signing up takes under a minute.";
export const CTA_HOW_SELL = "How selling works";
export const CTA_QR = "See how it works";
export const LIVE_NOW = "Live now";
export const TRUST_POINTS = [
  {
    title: "Flat £2.99 UK delivery",
    detail: "Tracked on every order",
    icon: "bicycle-outline" as const,
  },
  {
    title: "Reader's Shield",
    detail: "Refund if it doesn't arrive",
    icon: "shield-checkmark-outline" as const,
  },
  {
    title: "Just 7.5% to sell",
    detail: "Sellers keep 92.5%",
    icon: "pricetag-outline" as const,
  },
  {
    title: "Good for your pocket",
    detail: "And good for the planet",
    icon: "leaf-outline" as const,
  },
] as const;

/** ReReadz chrome only. iOS = liquid glass. Android = peer craft, not glass. */
export const GLASS_FILL = "rgba(255,255,255,0.18)";
export const GLASS_FILL_STRONG = "rgba(255,255,255,0.28)";
export const GLASS_FILL_CHROME = "rgba(255,255,255,0.32)";
export const GLASS_STROKE = "rgba(23,0,173,0.12)";
export const GLASS_IOS_INTENSITY = 92;
export const ANDROID_CHROME_FILL = "rgba(255,255,255,0.97)";
export const TAB_BAR_HEIGHT = 68;
export const TAB_BAR_INSET = 10;
export const TAB_BAR_CLEARANCE = TAB_BAR_HEIGHT + TAB_BAR_INSET * 2 + 16;
export const SELL_FAB_SIZE = 52;
export const HEADER_BAR_HEIGHT = 56;
/** Marketing Home: live one-row lockup + search. */
export const HEADER_BAR_HEIGHT_HOME = 60;
/** Browse/feed: search pill is the chrome. */
export const HEADER_BAR_HEIGHT_SEARCH = 100;
/** Sell / Messages / You: mark + BETA, no logo-eating search. */
export const HEADER_BAR_HEIGHT_COMPACT = 48;
export const HEADER_BAR_HEIGHT_DESKTOP = 64;

/** Quiet empty cover — paper well, never a letter monogram or grey box. */
export const COVER_PAPER = "#F4F1EA";
export const COVER_SPINE = "#D9D1C3";
