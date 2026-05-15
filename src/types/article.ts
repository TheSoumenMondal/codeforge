/** biome-ignore-all lint/style/useNamingConvention: <> */

export type TCreateArticlePayload = {
  title: string;
  content: string;
  excerpt?: string;
  cover_image?: string;
};

export type TArticle = {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  cover_image: string;
  author: {
    id: string;
    name: string;
    avatar_url: string;
  };
  status: string;
  views: number;
  created_at: string;
  updated_at: string;
  published_at: string;
};

export type TTopAuthor = {
  id: string;
  name: string;
  avatar_url: string;
  article_count: number;
};
