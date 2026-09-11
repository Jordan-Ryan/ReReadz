import { Platform } from "react-native";

/** Capture-only signed-in preview. Not a product nav item. */
export function isFrameSignedIn(): boolean {
  if (Platform.OS !== "web" || typeof window === "undefined") return false;
  try {
    return new URLSearchParams(window.location.search).get("__frameSignedIn") === "1";
  } catch (error) {
    console.warn("frameSignedIn: failed to read query", error);
    return false;
  }
}
