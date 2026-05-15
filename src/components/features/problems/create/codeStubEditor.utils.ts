import type { initialCodes } from "@/constant/initial-code";

type TCodeStubLanguage = keyof typeof initialCodes;

export type TCodeStubEditorData = {
  id: string;
  language: string;
  startCode?: string;
  userCode?: string;
  endCode?: string;
};

export const normalizeCodeStubLanguage = (
  language: string,
): TCodeStubLanguage | null => {
  const normalized = language.toLowerCase().replace(/\s+/g, "");

  if (normalized.includes("javascript") || normalized === "js") {
    return "javascript";
  }

  if (normalized.includes("python") || normalized === "py") {
    return "python";
  }

  if (normalized.includes("cpp") || normalized.includes("c++")) {
    return "cpp";
  }

  if (normalized.includes("java")) {
    return "java";
  }

  return null;
};

export const getCodeStubContent = (stub: TCodeStubEditorData) => ({
  start: stub.startCode ?? "",
  user: stub.userCode ?? "",
  end: stub.endCode ?? "",
});
