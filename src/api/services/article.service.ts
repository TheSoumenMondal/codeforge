import type {
  TArticle,
  TCreateArticlePayload,
  TTopAuthor,
} from "@/types/article";
import { apiClient } from "../client";

export async function getAllArticles(): Promise<TArticle[]> {
  try {
    const response = await apiClient.get("/article");
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    return response.data.data;
  } catch (error) {
    throw new Error(
      "Failed to fetch articles",
      error instanceof Error ? { cause: error } : undefined,
    );
  }
}

export async function getArticleBySlug(slug: string): Promise<TArticle> {
  try {
    const response = await apiClient.get(`/article/slug/${slug}`);
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    return response.data.data;
  } catch (error) {
    throw new Error(
      "Failed to fetch article",
      error instanceof Error ? { cause: error } : undefined,
    );
  }
}

export async function createArticle(
  token: string,
  payload: TCreateArticlePayload,
): Promise<TArticle> {
  try {
    const response = await apiClient.post("/article", payload, {
      // biome-ignore lint/style/useNamingConvention: HTTP header
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    return response.data.data;
  } catch (error) {
    throw new Error(
      "Failed to create article",
      error instanceof Error ? { cause: error } : undefined,
    );
  }
}

export async function getTopAuthors(): Promise<TTopAuthor[]> {
  try {
    const response = await apiClient.get("/article/top-authors");
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    return response.data.data;
  } catch (error) {
    throw new Error(
      "Failed to fetch top authors",
      error instanceof Error ? { cause: error } : undefined,
    );
  }
}
