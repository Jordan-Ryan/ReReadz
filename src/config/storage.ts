/**
 * Storage bucket names. Override via env for different backends.
 */
export const AVATAR_BUCKET =
  (typeof process !== "undefined" && process.env?.EXPO_PUBLIC_AVATAR_BUCKET) || "avatars";
