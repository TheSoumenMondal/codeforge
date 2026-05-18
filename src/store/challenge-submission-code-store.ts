import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IChallengeSubmissionCodeStore {
  activeLanguage: string;
  setActiveLanguage: (language: string) => void;
  currentProblemId: string | null;
  setCurrentProblemId: (problemId: string | null) => void;
  codeByProblemAndLanguage: Record<string, string>;
  codeByLanguage: Record<string, string>;
  setCodeForLanguage: (
    problemId: string,
    language: string,
    code: string,
  ) => void;
}

const createProblemLanguageKey = (problemId: string, language: string) =>
  `${problemId}:${language}`;

export const useChallengeSubmissionCodeStore =
  create<IChallengeSubmissionCodeStore>()(
    persist(
      (set) => ({
        activeLanguage: "cpp",
        setActiveLanguage: (language) => set({ activeLanguage: language }),
        currentProblemId: null,
        setCurrentProblemId: (problemId) =>
          set({ currentProblemId: problemId }),
        codeByProblemAndLanguage: {},
        codeByLanguage: {},
        setCodeForLanguage: (problemId, language, code) =>
          set((store) => ({
            codeByProblemAndLanguage: {
              ...store.codeByProblemAndLanguage,
              [createProblemLanguageKey(problemId, language)]: code,
            },
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
