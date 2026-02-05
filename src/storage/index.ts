import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * App storage layer replacing localStorage/sessionStorage from the web app.
 * Use the same keys as the web for compatibility (onboarding-completed,
 * recentSearches, cookie consent, charity context, etc.).
 */

const PREFIX = "rereadz_";

export const storage = {
  async getItem(key: string): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(PREFIX + key);
    } catch (e) {
      console.warn("[storage] getItem error:", key, e);
      return null;
    }
  },

  async setItem(key: string, value: string): Promise<void> {
    try {
      await AsyncStorage.setItem(PREFIX + key, value);
    } catch (e) {
      console.warn("[storage] setItem error:", key, e);
    }
  },

  async removeItem(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(PREFIX + key);
    } catch (e) {
      console.warn("[storage] removeItem error:", key, e);
    }
  },
};

/** Session-scoped storage (conceptually sessionStorage). Keys not prefixed for app; same API. */
export const sessionStorage = {
  async getItem(key: string): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(PREFIX + "session_" + key);
    } catch (e) {
      console.warn("[sessionStorage] getItem error:", key, e);
      return null;
    }
  },

  async setItem(key: string, value: string): Promise<void> {
    try {
      await AsyncStorage.setItem(PREFIX + "session_" + key, value);
    } catch (e) {
      console.warn("[sessionStorage] setItem error:", key, e);
    }
  },

  async removeItem(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(PREFIX + "session_" + key);
    } catch (e) {
      console.warn("[sessionStorage] removeItem error:", key, e);
    }
  },
};
