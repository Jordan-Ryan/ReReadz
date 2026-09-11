import { COVER_TONES } from "@/theme/brand";

export function formatPrice(pence: number): string {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  }).format(pence / 100);
}

export function formatCondition(condition: string | undefined): string {
  if (!condition) return "Unknown";
  const map: Record<string, string> = {
    new: "New",
    like_new: "Like new",
    very_good: "Very good",
    good: "Good",
    acceptable: "Acceptable",
    poor: "Poor",
  };
  return map[condition] ?? condition;
}

export function formatBookFormat(format: string | undefined): string {
  if (!format) return "Any format";
  const map: Record<string, string> = {
    hardcover: "Hardcover",
    paperback: "Paperback",
    ebook: "Ebook",
    audiobook: "Audiobook",
  };
  return map[format] ?? format;
}

/** First letter for empty cover wells — never render a “No cover” grey box. */
export function coverInitial(title: string | undefined | null): string {
  const trimmed = (title ?? "").trim();
  if (!trimmed) return "";
  const cleaned = trimmed.replace(/^(the|a|an)\s+/i, "");
  const letter = (cleaned || trimmed).charAt(0);
  return letter ? letter.toUpperCase() : "";
}

export function coverTone(title: string | undefined | null): string {
  const key = (title ?? "").trim();
  let hash = 0;
  for (let i = 0; i < key.length; i += 1) {
    hash = (hash * 31 + key.charCodeAt(i)) >>> 0;
  }
  return COVER_TONES[hash % COVER_TONES.length];
}
