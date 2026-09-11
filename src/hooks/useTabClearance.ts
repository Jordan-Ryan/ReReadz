import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useDesktopShell } from "@/hooks/useDesktopShell";
import { TAB_BAR_CLEARANCE } from "@/theme/brand";

/** Extra scroll padding so content clears the floating glass tab bar. */
export function useTabClearance(): number {
  const isDesktop = useDesktopShell();
  const tabHeight = useBottomTabBarHeight();
  if (isDesktop) return 32;
  return Math.max(tabHeight + 20, TAB_BAR_CLEARANCE);
}
