/** biome-ignore-all lint/style/useNamingConvention: <> */

export type TSheetProblem = {
  id: string;
  title: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
  created_by: string;
  created_at: string;
  updated_at: string;
};

export type TSheet = {
  id: string;
  title: string;
  description: string;
  visibility: "public" | "private";
  categories: string[];
  created_at: string;
  updated_at: string;
  creator: {
    id: string;
    email: string;
    avatar: string;
    name: string;
  };
};
