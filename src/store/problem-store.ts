import { create } from "zustand";
import { persist } from "zustand/middleware";
import { initialCodes } from "@/constant/initial-code";

interface ICodeStub {
  id: string;
  problemId: string;
  language: string;
  startCode: string;
  userCode: string;
  endCode: string;
}

interface ITestCase {
  id: string;
  problemId: string;
  input: string;
  expectedOutput: string;
  totalExecutionTime: number;
}

interface IProblemData {
  id: string;
  title: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
  codeStubs: ICodeStub[];
  testCases: ITestCase[];
}

type TCodeStubLanguage = keyof typeof initialCodes;

interface IProblemStore {
  mode: "create" | "edit";
  setMode: (mode: "create" | "edit") => void;
  currentProblemInEditor: IProblemData | null;
  setCurrentProblemInEditor: (problem: IProblemData | null) => void;
  // Editor state persistence
  codeStubsState: Record<string, { start: string; user: string; end: string }>;
  setCodeStubsState: (
    state:
      | Record<string, { start: string; user: string; end: string }>
      | ((
          prev: Record<string, { start: string; user: string; end: string }>,
        ) => Record<string, { start: string; user: string; end: string }>),
  ) => void;
  testCasesState: { id: string; input: string; output: string }[];
  setTestCasesState: (
    state:
      | { id: string; input: string; output: string }[]
      | ((
          prev: { id: string; input: string; output: string }[],
        ) => { id: string; input: string; output: string }[]),
  ) => void;
  hasJustSavedProblem: boolean;
  setHasJustSavedProblem: (flag: boolean) => void;
  hasJustSavedStub: TCodeStubLanguage | null;
  setHasJustSavedStub: (lang: TCodeStubLanguage | null) => void;
  resetEditorState: () => void;
}

const initialCodeStubs = { ...initialCodes };

export const useProblemStore = create<IProblemStore>()(
  persist(
    (set) => ({
      mode: "create",
      setMode: (mode) => set({ mode }),
      currentProblemInEditor: null,
      setCurrentProblemInEditor: (problem) =>
        set({ currentProblemInEditor: problem }),
      codeStubsState: { ...initialCodeStubs },
      setCodeStubsState: (state) =>
        set((store) => ({
          codeStubsState:
            typeof state === "function" ? state(store.codeStubsState) : state,
        })),
      testCasesState: [],
      setTestCasesState: (state) =>
        set((store) => ({
          testCasesState:
            typeof state === "function" ? state(store.testCasesState) : state,
        })),
      hasJustSavedProblem: false,
      setHasJustSavedProblem: (flag) => set({ hasJustSavedProblem: flag }),
      hasJustSavedStub: null,
      setHasJustSavedStub: (lang) => set({ hasJustSavedStub: lang }),
      resetEditorState: () =>
        set({
          codeStubsState: { ...initialCodeStubs },
          testCasesState: [],
          hasJustSavedProblem: false,
          hasJustSavedStub: null,
        }),
    }),
    {
      name: "problem-store",
    },
  ),
);

const initialPersistedSlices = (): Pick<
  IProblemStore,
  | "mode"
  | "currentProblemInEditor"
  | "codeStubsState"
  | "testCasesState"
  | "hasJustSavedProblem"
  | "hasJustSavedStub"
> => ({
  mode: "create",
  currentProblemInEditor: null,
  codeStubsState: { ...initialCodeStubs },
  testCasesState: [],
  hasJustSavedProblem: false,
  hasJustSavedStub: null,
});

/** Resets persisted problem draft state (e.g. on logout / invalid session). */
export function clearProblemStore() {
  useProblemStore.setState(initialPersistedSlices());
}
