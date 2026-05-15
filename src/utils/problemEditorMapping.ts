import type { TProblemTotalData } from "@/types/problem";

/** Maps `/problem/:id` (or equivalent) payload into problem-store editor shape. */
export function mapProblemTotalToEditorStore(api: TProblemTotalData) {
  return {
    id: api.id,
    title: api.title,
    description: api.description,
    difficulty: api.difficulty,
    codeStubs: api.code_stubs.map((stub) => ({
      id: stub.id,
      problemId: stub.problem_id,
      language: stub.language,
      startCode: stub.start_code,
      userCode: stub.user_code,
      endCode: stub.end_code,
    })),
    testCases: api.test_cases.map((tc) => ({
      id: tc.id,
      problemId: api.id,
      input: tc.input,
      expectedOutput: tc.output,
      totalExecutionTime: tc.totalExecutionTime,
    })),
  };
}
