import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IChallengeSubmissionCodeStore {
  activeLanguage: string;
  setActiveLanguage: (language: string) => void;
  codeByLanguage: Record<string, string>;
  setCodeForLanguage: (language: string, code: string) => void;
}

export const useChallengeSubmissionCodeStore =
  create<IChallengeSubmissionCodeStore>()(
    persist(
      (set) => ({
        activeLanguage: "cpp",
        setActiveLanguage: (language) => set({ activeLanguage: language }),
        codeByLanguage: {},
        setCodeForLanguage: (language, code) =>
          set((store) => ({
            codeByLanguage: {
              ...store.codeByLanguage,
              [language]: code,
            },
          })),
      }),
      {
        name: "challenge-submission-code-store",
      },
    ),
  );
