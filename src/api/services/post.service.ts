import axios from "axios";
import type { TCreatePostRequest, TPost } from "@/types/post";
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
export async function createPost(
  token: string,
  data: TCreatePostRequest,
): Promise<TPost> {
  try {
    const response = await apiClient.post("/post", data, {
      headers: {
        // biome-ignore lint/style/useNamingConvention: ignore
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.data?.success) {
      throw new Error(response.data?.message || "Post creation failed");
    }

    return response.data.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const message =
        err.response?.data?.message || err.message || "Axios error";
      throw new Error(`Failed to create post: ${message}`);
    }

    if (err instanceof Error) {
      throw new Error(`Failed to create post: ${err.message}`);
    }

    throw new Error("Failed to create post");
  }
}

export async function uploadPostFiles(
  token: string,
  files: File[],
): Promise<string[]> {
  try {
    const formData = new FormData();
    for (const file of files) {
      formData.append("files", file);
    }

    const response = await apiClient.post("/post/files", formData, {
      headers: {
        // biome-ignore lint/style/useNamingConvention: ignore
        Authorization: `Bearer ${token}`,
        // Let axios set Content-Type with boundary
      },
    });

    if (!response.data?.success) {
      throw new Error(response.data?.message || "File upload failed");
    }
    const payload = response.data.data;
    if (payload && Array.isArray(payload.uploaded)) {
      return payload.uploaded.map(
        (uploadedItem: { url: string }) => uploadedItem.url,
      );
    }

    if (Array.isArray(payload)) {
      return payload as string[];
    }

    if (payload && Array.isArray(payload.data)) {
      return payload.data as string[];
    }

    throw new Error("Unexpected response shape from file upload");
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const message =
        err.response?.data?.message || err.message || "Axios error";
      throw new Error(`Failed to upload files: ${message}`);
    }

    if (err instanceof Error) {
      throw new Error(`Failed to upload files: ${err.message}`);
    }

    throw new Error("Failed to upload files");
  }
}
