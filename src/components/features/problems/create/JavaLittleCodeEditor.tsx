"use client";

import { javaLanguage } from "@codemirror/lang-java";

import { EditorView } from "@codemirror/view";
import { materialDark } from "@fsegurai/codemirror-theme-material-dark";
import CodeMirror from "@uiw/react-codemirror";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const lightTheme = EditorView.theme({
  "&": {
    backgroundColor: "#ffffff",
    color: "#1f2937",
  },
  ".cm-content": {
    caretColor: "#111827",
  },
  "&.cm-focused .cm-cursor": {
    borderLeftColor: "#111827",
  },
  "&.cm-focused .cm-selectionBackground, ::selection": {
    backgroundColor: "#dbeafe",
  },
  ".cm-gutters": {
    backgroundColor: "#f9fafb",
    color: "#6b7280",
    border: "none",
  },
});

const JavaLittleCodeEditor = ({
  placeholderCode,
}: {
  placeholderCode: string;
}) => {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [code, setCode] = useState(placeholderCode);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";

  return (
    <div
      className={`w-full h-full overflow-hidden border ${theme === "dark" ? "border-secondary" : "border-secondary"}`}
    >
      <CodeMirror
        value={code}
        height="200px"
        extensions={[javaLanguage]}
        theme={isDark ? materialDark : lightTheme}
        onChange={(value) => setCode(value)}
        basicSetup={{
          autocompletion: true,
          lineNumbers: false,
          foldGutter: false,
        }}
      />
    </div>
  );
};

export default JavaLittleCodeEditor;
