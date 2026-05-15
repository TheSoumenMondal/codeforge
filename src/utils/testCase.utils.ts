export type TTestCaseData = {
  id: string;
  input: string;
  output: string;
};

export type TTestCaseApiResponse = {
  id: string;
  problemId?: string;
  input: string;
  // biome-ignore lint/style/useNamingConvention: <>
  expected_output?: string;
  output?: string;
  expectedOutput?: string;
  totalExecutionTime?: number;
  createdAt?: string;
  updatedAt?: string;
};

export const normalizeTestCase = (tc: TTestCaseApiResponse): TTestCaseData => ({
  id: tc.id,
  input: tc.input ?? "",
  output: tc.expected_output ?? tc.output ?? tc.expectedOutput ?? "",
});

export const normalizeTestCases = (
  testCases: TTestCaseApiResponse[],
): TTestCaseData[] => testCases.map(normalizeTestCase);
