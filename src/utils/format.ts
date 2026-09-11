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

