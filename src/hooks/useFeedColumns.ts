import { useWindowDimensions } from "react-native";
import { DESKTOP_SHELL_MIN_WIDTH } from "@/hooks/useDesktopShell";

/** Half-gutter on each cell. Full gap between cards is 6px (Vinted-tight). */
export const FEED_CELL_PAD = 3;
export const FEED_GRID_PAD = 6;

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
