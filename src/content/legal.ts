import {
  SELLERS_KEEP,
  SHIELD_NAME,
  TRACKED_DELIVERY,
} from "@/theme/brand";

export interface LegalSection {
  title: string;
  paragraphs: string[];
}

/** In-app legal copy. Locked commercial facts only — do not invent fees. */
export const LEGAL_LEAD =
  "These terms apply when you use the ReReadz app to buy or sell pre-loved books in the UK.";

export const MARKETPLACE_TERMS: LegalSection = {
  title: "Marketplace terms",
  paragraphs: [
    "ReReadz is a UK marketplace for pre-loved books. Readers buy and sell directly with each other.",
    `Listing is free. When a book sells, the seller keeps ${SELLERS_KEEP} of the sale price (7.5% to ReReadz).`,
    `Postage is ${TRACKED_DELIVERY}. After a sale, sellers get a QR code to drop the book at Royal Mail, Evri or InPost — no printer required.`,
    `${SHIELD_NAME} covers every order: the buyer can get a refund if the book does not arrive.`,
    "Payment is held until delivery is confirmed. Sellers withdraw earnings from Wallet after connecting payouts.",
  ],
};

export const PRIVACY_TERMS: LegalSection = {
  title: "Privacy",
  paragraphs: [
    "We use your account details to run the marketplace: sign-in, listings, orders, messages, and payouts.",
    "We do not sell your personal data. Order and payment data is used only to complete sales and protect buyers and sellers.",
    "You can update your name, photo, and notification preferences in You → Edit profile and Settings.",
  ],
};

export const STORAGE_TERMS: LegalSection = {
  title: "Local storage",
  paragraphs: [
    "This app stores a sign-in session and a few preferences on your device so you stay signed in. We do not use third-party advertising cookies.",
  ],
};

export const ACCESS_TERMS: LegalSection = {
  title: "Accessibility",
  paragraphs: [
    "ReReadz supports system font scaling and works with the screen reader on your phone. If something is hard to use, email support@rereadz.com.",
  ],
};

export const ALL_LEGAL_SECTIONS: LegalSection[] = [
  MARKETPLACE_TERMS,
  PRIVACY_TERMS,
  STORAGE_TERMS,
  ACCESS_TERMS,
];
