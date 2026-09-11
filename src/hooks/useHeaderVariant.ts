import { useSegments } from "expo-router";

export type HeaderVariant = "home" | "search" | "compact";

/**
 * Home keeps the live ReReadz lockup. Browse is search-owned.
 * Other tabs stay compact so the mark does not eat the chrome.
 */
export function useHeaderVariant(): HeaderVariant {
  const segments = useSegments();
  const tab = segments.find((segment) => !segment.startsWith("("));
  if (!tab || tab === "index") return "home";
  if (tab === "listings") return "search";
  return "compact";
}
