import { useProblemStore } from "@/store/problem-store";

export function useProblem() {
  const store = useProblemStore();
  const mode = store.mode;
  const setMode = store.setMode;
  const currentProblemInEditor = store.currentProblemInEditor;
  const setCurrentProblemInEditor = store.setCurrentProblemInEditor;
  const codeStubsState = store.codeStubsState;
  const setCodeStubsState = store.setCodeStubsState;
  const testCasesState = store.testCasesState;
  const setTestCasesState = store.setTestCasesState;
  const hasJustSavedProblem = store.hasJustSavedProblem;
  const setHasJustSavedProblem = store.setHasJustSavedProblem;
  const hasJustSavedStub = store.hasJustSavedStub;
  const setHasJustSavedStub = store.setHasJustSavedStub;
  const resetEditorState = store.resetEditorState;

  return {
    mode,
    setMode,
    currentProblemInEditor,
    setCurrentProblemInEditor,
    codeStubsState,
    setCodeStubsState,
    testCasesState,
    setTestCasesState,
    hasJustSavedProblem,
    setHasJustSavedProblem,
    hasJustSavedStub,
    setHasJustSavedStub,
    resetEditorState,
  };
}
