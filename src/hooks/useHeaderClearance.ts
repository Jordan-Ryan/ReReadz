import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDesktopShell } from "@/hooks/useDesktopShell";
import { useHeaderVariant } from "@/hooks/useHeaderVariant";
import {
  HEADER_BAR_HEIGHT_COMPACT,
  HEADER_BAR_HEIGHT_DESKTOP,
  HEADER_BAR_HEIGHT_HOME,
  HEADER_BAR_HEIGHT_SEARCH,
} from "@/theme/brand";

/** Space reserved so tab scenes sit below the overlay glass header. */
export function useHeaderClearance(): number {
  const insets = useSafeAreaInsets();
  const isDesktop = useDesktopShell();
  const variant = useHeaderVariant();

  if (isDesktop) {
    return insets.top + HEADER_BAR_HEIGHT_DESKTOP;
  }

  const bar =
    variant === "home"
      ? HEADER_BAR_HEIGHT_HOME
      : variant === "search"
        ? HEADER_BAR_HEIGHT_SEARCH
        : HEADER_BAR_HEIGHT_COMPACT;

  return insets.top + bar;
}
