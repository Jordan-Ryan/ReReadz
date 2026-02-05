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
  };
  return map[condition] ?? condition;
}
