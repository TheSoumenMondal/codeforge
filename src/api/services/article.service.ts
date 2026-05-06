import type { TArticle, TTopAuthor } from "@/types/article";
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
      "Failed to fetch posts",
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
