import type { TPost } from "@/types/post";
import { apiClient } from "../client";

export async function getAllPosts(): Promise<TPost[]> {
  try {
    const response = await apiClient.get("/post");
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
