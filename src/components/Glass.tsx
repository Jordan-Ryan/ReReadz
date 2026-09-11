import { BlurView, type BlurTint } from "expo-blur";
import {
  Platform,
  StyleSheet,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import {
  ANDROID_CHROME_FILL,
  GLASS_FILL,
  GLASS_IOS_INTENSITY,
  GLASS_STROKE,
} from "@/theme/brand";

interface GlassProps {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  intensity?: number;
  tint?: BlurTint;
  overlayColor?: string;
}

/**
 * ReReadz chrome only (header, tab bar, sheets). Not Coach / Hub / Nutrition.
 * iOS: liquid glass (UIVisualEffect). Android: peer craft, not literal glass.
 */
export function Glass({
  children,
  style,
  intensity = GLASS_IOS_INTENSITY,
  tint = "systemChromeMaterialLight",
  overlayColor = GLASS_FILL,
}: GlassProps) {
  if (Platform.OS === "android") {
    return (
      <View style={[styles.clip, styles.androidPeer, style]}>
        {children}
      </View>
    );
  }

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
    backdropFilter: "blur(28px) saturate(200%)",
    WebkitBackdropFilter: "blur(28px) saturate(200%)",
  } as ViewStyle,
  androidPeer: {
    backgroundColor: ANDROID_CHROME_FILL,
    borderColor: "rgba(23,0,173,0.12)",
    elevation: 10,
    shadowColor: "#1700AD",
    shadowOpacity: 0.12,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
  },
});
