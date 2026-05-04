"use client";

import { defaultKeymap } from "@codemirror/commands";
import { javascript } from "@codemirror/lang-javascript";
import { EditorState } from "@codemirror/state";
import {
  EditorView,
  gutter,
  highlightActiveLine,
  keymap,
  lineNumbers,
} from "@codemirror/view";
import {
  CalendarHeartIcon,
  PaperPlaneTiltIcon,
  TrayArrowDownIcon,
} from "@phosphor-icons/react";
import { monokai } from "@uiw/codemirror-theme-monokai";
import { useEffect, useRef } from "react";
import EditorSettings from "@/components/features/challenge/Settings";
import { Button } from "@/components/ui/button";

export function CodeEditor() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const state = EditorState.create({
      doc: `function hello() {
      console.log("Hello World");
    }`,
      extensions: [
        keymap.of(defaultKeymap),
        javascript(),
        gutter({
          class: "y-sc",
        }),
        lineNumbers(),
        highlightActiveLine(),
        monokai,
        EditorView.theme({
          "&": {
            height: "100%",
            fontSize: "14px",
          },
          ".cm-content": {
            fontFamily: "monospace",
            backgroundColor: "#191919",
          },

          ".cm-lineNumbers": {
            backgroundColor: "#1e1e1e",
            width: "60px",
            display: "flex",
            alignItems: "center",
          },
          ".cm-activeLine": {
            backgroundColor: "#1e1e1e",
          },
        }),
      ],
    });

    const view = new EditorView({
      state,
      parent: containerRef.current,
    });

    return () => view.destroy();
  }, []);

  return (
    <div className="w-full h-full flex-col">
      <div className="h-[calc(100%-40px)] w-full p-1.5 bg-background">
        <div
          ref={containerRef}
          className="w-full h-full"
        />
      </div>
      <div className=" h-12 flex items-center justify-between">
        <div className="flex items-center gap-2 justify-center">
          <EditorSettings />
          <Button
            variant="info"
            size="lg"
            animation="none"
          >
            <CalendarHeartIcon
              size={32}
              weight="duotone"
            />
          </Button>
          <Button
            variant="warning"
            size="lg"
            animation="none"
          >
            <TrayArrowDownIcon
              size={32}
              weight="duotone"
            />
          </Button>
        </div>
        <Button
          animation="none"
          variant="success"
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
