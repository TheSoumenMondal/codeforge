import type { Extension } from "@codemirror/state";
import { EditorView } from "@codemirror/view";

/** Keeps small editors bounded to their column and wraps long lines vertically. */
export const littleCodemirrorLayoutExtensions: Extension[] = [
  EditorView.lineWrapping,
  EditorView.theme({
    "&": { width: "100%", maxWidth: "100%", minWidth: "0" },
    ".cm-editor": { maxWidth: "100%", width: "100%" },
    ".cm-scroller": {
      overflowX: "hidden",
      overflowY: "auto",
      maxWidth: "100%",
    },
    ".cm-content": {
      maxWidth: "100%",
      minWidth: "0",
    },
  }),
];
