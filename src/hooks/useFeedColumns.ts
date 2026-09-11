import { useWindowDimensions } from "react-native";
import { DESKTOP_SHELL_MIN_WIDTH } from "@/hooks/useDesktopShell";

/**
 * Dele bar: 8–12px gutters (not magazine margins).
 * Grid pad 5 + cell pad 5 = 10px screen edge and 10px between covers.
 */
export const FEED_CELL_PAD = 5;
export const FEED_GRID_PAD = 5;
export const FEED_GUTTER = 10;
export const FEED_ROW_GAP = 12;

export function feedColumnCount(width: number): number {
  if (width >= 1280) return 6;
  if (width >= 1024) return 5;
  if (width >= DESKTOP_SHELL_MIN_WIDTH) return 4;
  return 2;
}

export function useFeedColumns(): number {
  const { width } = useWindowDimensions();
  return feedColumnCount(width);
}
