import React from "react";
import { useWindowDimensions, StyleSheet } from "react-native";
import RenderHTML from "react-native-render-html";
import Markdown from "react-native-markdown-display";
import * as Linking from "expo-linking";

const CONTENT_PADDING = 32;

function looksLikeHtml(content: string): boolean {
  const trimmed = content.trim();
  return (
    trimmed.startsWith("<") ||
    /<\/?(p|div|span|h[1-6]|ul|ol|li|strong|em|a|img|br|blockquote|pre|code)\b/i.test(trimmed)
  );
}

interface BlogContentProps {
  content: string;
}

export function BlogContent({ content }: BlogContentProps): React.ReactElement {
  const { width } = useWindowDimensions();
  const contentWidth = Math.max(0, width - CONTENT_PADDING);

  const handleLinkPress = (url: string): boolean => {
    Linking.openURL(url).catch(() => {});
    return true;
  };

  if (looksLikeHtml(content)) {
    return (
      <RenderHTML
        contentWidth={contentWidth}
        source={{ html: content }}
        baseStyle={htmlBaseStyle}
        tagsStyles={{
          body: htmlBaseStyle,
          p: { marginTop: 0, marginBottom: 12 },
          h1: { fontSize: 22, fontWeight: "700", marginBottom: 12 },
          h2: { fontSize: 18, fontWeight: "600", marginBottom: 10 },
          h3: { fontSize: 16, fontWeight: "600", marginBottom: 8 },
          a: { color: "#0ea5e9", textDecorationLine: "underline" },
          ul: { marginBottom: 12 },
          ol: { marginBottom: 12 },
          li: { marginBottom: 4 },
          blockquote: { borderLeftWidth: 4, borderLeftColor: "#e2e8f0", paddingLeft: 12, marginVertical: 12, fontStyle: "italic", color: "#64748b" },
        }}
        systemFonts={[]}
        enableExperimentalMarginCollapsing
      />
    );
  }

  return (
    <Markdown
      style={markdownStyles}
      onLinkPress={(url) => {
        handleLinkPress(url);
        return false;
      }}
    >
      {content}
    </Markdown>
  );
}

const htmlBaseStyle = {
  fontSize: 16,
  lineHeight: 26,
  color: "#334155",
};

const markdownStyles = StyleSheet.create({
  body: { fontSize: 16, lineHeight: 26, color: "#334155" },
  paragraph: { marginTop: 0, marginBottom: 12 },
  heading1: { fontSize: 22, fontWeight: "700" as const, marginBottom: 12, color: "#0f172a" },
  heading2: { fontSize: 18, fontWeight: "600" as const, marginBottom: 10, color: "#0f172a" },
  heading3: { fontSize: 16, fontWeight: "600" as const, marginBottom: 8, color: "#0f172a" },
  link: { color: "#0ea5e9", textDecorationLine: "underline" as const },
  list_item: { marginBottom: 4 },
  bullet_list: { marginBottom: 12 },
  ordered_list: { marginBottom: 12 },
  blockquote: { borderLeftWidth: 4, borderLeftColor: "#e2e8f0", paddingLeft: 12, marginVertical: 12, fontStyle: "italic" as const, color: "#64748b" },
  code_inline: { backgroundColor: "#f1f5f9", paddingHorizontal: 4, borderRadius: 4, fontSize: 14 },
  code_block: { backgroundColor: "#f1f5f9", padding: 12, borderRadius: 8, marginVertical: 12, fontSize: 14 },
});
