"use client";

import { defaultKeymap } from "@codemirror/commands";
import { cpp } from "@codemirror/lang-cpp";
import { java } from "@codemirror/lang-java";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { EditorState } from "@codemirror/state";
import {
  EditorView,
  gutter,
  highlightActiveLine,
  keymap,
  lineNumbers,
} from "@codemirror/view";
import { vsCodeLight } from "@fsegurai/codemirror-theme-vscode-light";
import {
  CalendarHeartIcon,
  PaperPlaneTiltIcon,
  TrayArrowDownIcon,
} from "@phosphor-icons/react";
import { monokai } from "@uiw/codemirror-theme-monokai";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import EditorSettings from "@/components/features/challenge/Settings";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/hooks/useAuth";
import type { TProblemTotalData } from "@/types/problem";

const LANGUAGES = [
  { value: "cpp", label: "C++" },
  { value: "java", label: "Java" },
  { value: "js", label: "JavaScript" },
  { value: "python", label: "Python" },
];

export function CodeEditor({ data }: { data: TProblemTotalData }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { resolvedTheme } = useTheme();

  const defaultLang = data.code_stubs?.[0]?.language ?? "cpp";
  const [language, setLanguage] = useState(defaultLang);
  const currentCodeRefs = useRef<Record<string, string>>({});
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!containerRef.current) return;

    let initialCode = currentCodeRefs.current[language];
    if (initialCode === undefined) {
      initialCode =
        data.code_stubs?.find((stub) => stub.language === language)
          ?.user_code ?? "";
      currentCodeRefs.current[language] = initialCode;
    }

    const langExtension =
      language === "cpp"
        ? cpp()
        : language === "java"
          ? java()
          : language === "python"
            ? python()
            : javascript();

    const themeExtensions = [];
    if (resolvedTheme === "dark") {
      themeExtensions.push(monokai);
    } else {
      themeExtensions.push(vsCodeLight);
    }

    const state = EditorState.create({
      doc: initialCode,
      extensions: [
        keymap.of(defaultKeymap),
        langExtension,
        gutter({
          class: "y-sc",
        }),
        lineNumbers(),
        highlightActiveLine(),
        EditorView.lineWrapping,
        ...themeExtensions,
        EditorView.baseTheme({
          "&.cm-focused": {
            outline: "none !important",
          },
          "&.cm-focused .cm-content": {
            outline: "none",
          },
        }),
        EditorView.theme({
          "&": {
            height: "100%",
            fontSize: "14px",
          },
          ".cm-content": {
            fontFamily: "'Fira Code'",
            fontSize: "13px",
            fontWeight: "600",
            backgroundColor: resolvedTheme === "dark" ? "#272727" : "#F5F5F5",
          },
          ".cm-lineNumbers": {
            backgroundColor: resolvedTheme === "dark" ? "#272727" : "#F5F5F5",
            width: "20px",
            display: "flex",
            alignItems: "start",
          },
          ".cm-activeLine": {
            backgroundColor: resolvedTheme === "dark" ? "#272727" : "#F5F5F5",
          },
          ".cm-gutters": {
            backgroundColor: resolvedTheme === "dark" ? "#272727" : "#F5F5F5",
            borderRight: "none",
          },
        }),
        EditorView.updateListener.of((update) => {
          if (update.docChanged) {
            currentCodeRefs.current[language] = update.state.doc.toString();
          }
        }),
      ],
    });

    const view = new EditorView({
      state,
      parent: containerRef.current,
    });

    return () => view.destroy();
  }, [data, language, resolvedTheme]);

  return (
    <div className="w-full h-full flex-col bg-secondary p-4 rounded-md border">
      <div className="h-[calc(100%-40px)] w-full p-1.5">
        <div
          ref={containerRef}
          className="w-full h-full [&_.cm-editor]:outline-none [&_.cm-editor.cm-focused]:outline-none [&_.cm-editor.cm-focused]:ring-0"
        />
      </div>
      <div className="h-12 flex items-center justify-between px-2 pt-3 border-t">
        <div className="flex items-center gap-2 justify-center">
          <Select
            value={language}
            onValueChange={(val) => {
              if (val) setLanguage(val);
            }}
          >
            <SelectTrigger
              variant="default"
              size="default"
              className={"min-w-20"}
            >
              <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent>
              {LANGUAGES.map((lang) => (
                <SelectItem
                  key={lang.value}
                  value={lang.value}
                >
                  {lang.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <EditorSettings />
          <Button
            variant="default"
            size="icon-lg"
            animation="none"
          >
            <CalendarHeartIcon
              size={32}
              weight="duotone"
            />
          </Button>
          <Button
            variant="default"
            size="icon-lg"
            animation="none"
          >
            <TrayArrowDownIcon
              size={32}
              weight="duotone"
            />
          </Button>
        </div>
        <Button
          disabled={!isAuthenticated}
          animation="none"
          variant="info"
          size="lg"
        >
          Submit
          <PaperPlaneTiltIcon
            size={32}
            weight="duotone"
          />
        </Button>
      </div>
    </div>
  );
}
