import { BlurView, type BlurTint } from "expo-blur";
import {
  Platform,
  StyleSheet,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { GLASS_FILL, GLASS_STROKE } from "@/theme/brand";

interface GlassProps {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  intensity?: number;
  tint?: BlurTint;
  overlayColor?: string;
}

/**
 * Real translucent material. Uses expo-blur (UIVisualEffect / CSS backdrop-filter).
 * Do not replace with a flat grey box.
 */
export function Glass({
  children,
  style,
  intensity = 72,
  tint = "light",
  overlayColor = GLASS_FILL,
}: GlassProps) {
  if (Platform.OS === "web") {
    return (
      <View
        style={[
          styles.clip,
          styles.webFrost,
          { backgroundColor: overlayColor },
          style,
        ]}
      >
        {children}
      </View>
    );
  }

  return (
    <View style={[styles.clip, style]}>
      <BlurView
        intensity={intensity}
        tint={tint}
        experimentalBlurMethod="dimezisBlurView"
        style={StyleSheet.absoluteFill}
      />
      <View
        pointerEvents="none"
        style={[styles.wash, { backgroundColor: overlayColor }]}
      />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  clip: {
    overflow: "hidden",
    borderColor: GLASS_STROKE,
    borderWidth: StyleSheet.hairlineWidth,
  },
  wash: {
    ...StyleSheet.absoluteFillObject,
  },
  webFrost: {
    // CSS backdrop-filter — expo-blur paints opaque white on web.
    ...( {
      backdropFilter: "blur(22px) saturate(180%)",
      WebkitBackdropFilter: "blur(22px) saturate(180%)",
    } as ViewStyle),
  },
});
