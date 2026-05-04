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
