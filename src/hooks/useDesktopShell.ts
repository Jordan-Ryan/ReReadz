import { useWindowDimensions } from "react-native";

/** Matches the plan’s desktop shell (header-only). Mobile tabs stay below this. */
export const DESKTOP_SHELL_MIN_WIDTH = 768;

export function useDesktopShell() {
  const { width } = useWindowDimensions();
  return width >= DESKTOP_SHELL_MIN_WIDTH;
}