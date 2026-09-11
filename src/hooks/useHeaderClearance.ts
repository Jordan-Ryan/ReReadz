import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDesktopShell } from "@/hooks/useDesktopShell";
import { HEADER_BAR_HEIGHT, HEADER_BAR_HEIGHT_DESKTOP } from "@/theme/brand";

/** Space reserved so tab scenes sit below the overlay glass header. */
export function useHeaderClearance(): number {
  const insets = useSafeAreaInsets();
  const isDesktop = useDesktopShell();
  return insets.top + (isDesktop ? HEADER_BAR_HEIGHT_DESKTOP : HEADER_BAR_HEIGHT);
}
