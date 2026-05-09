/** biome-ignore-all lint/style/useNamingConvention: <> */
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
