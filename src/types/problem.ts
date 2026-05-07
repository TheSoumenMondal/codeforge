/** biome-ignore-all lint/style/useNamingConvention: false */
export type TProblemDataType = {
  id: string;
  title: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
  created_at: string;
  updated_at: string;
  creator: {
    id: string;
    name: string;
    avatar_url: string;
  };
};

export type TCodeStub = {
  id: string;
  problem_id: string;
  language: string;
  start_code: string;
  user_code: string;
  end_code: string;
  created_at: string;
  updated_at: string;
};

export type TTestCase = {
  id: string;
  input: string;
  output: string;
  totalExecutionTime: number;

  // backend uses camelCase here
  createdAt: string;
  updatedAt: string;
};

export type TCreator = {
  id: string;
  name: string;
  bio: string;
  email: string;
  email_verified: boolean;
  avatar_url: string;
  location: string;
  website_url: string;
  created_at: string;
  updated_at: string;
};

export type TProblemTotalData = {
  id: string;
  title: string;
  description: string;

  difficulty: "easy" | "medium" | "hard";

  created_at: string;
  updated_at: string;
  created_by: string;

  creator: TCreator;

  code_stubs: TCodeStub[];
  test_cases: TTestCase[];
};

export type TProblemResponse = {
  success: boolean;
  message: string;
  data: TProblemTotalData;
  error: string | null;
};
