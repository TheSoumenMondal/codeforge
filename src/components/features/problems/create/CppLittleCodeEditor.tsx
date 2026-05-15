"use client";

import { cppLanguage } from "@codemirror/lang-cpp";

import { EditorView } from "@codemirror/view";
import { materialDark } from "@fsegurai/codemirror-theme-material-dark";
import CodeMirror from "@uiw/react-codemirror";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { littleCodemirrorLayoutExtensions } from "./littleCodemirrorLayout";

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

const CppLittleCodeEditor = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) => {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";

  return (
    <div
      className={`w-full min-w-0 max-w-full overflow-hidden border ${theme === "dark" ? "border-secondary" : "border-secondary"}`}
    >
      <CodeMirror
        value={value}
        height="200px"
        extensions={[cppLanguage, ...littleCodemirrorLayoutExtensions]}
        style={{ maxWidth: "100%" }}
        theme={isDark ? materialDark : lightTheme}
        onChange={(val) => onChange(val)}
        basicSetup={{
          autocompletion: true,
          lineNumbers: false,
          foldGutter: false,
        }}
      />
    </div>
  );
};

export default CppLittleCodeEditor;
