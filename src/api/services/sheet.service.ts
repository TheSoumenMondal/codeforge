/** biome-ignore-all lint/style/useNamingConvention: <> */
import type { TSheet } from "@/types/sheet";
import { apiClient } from "../client";

export async function getAllProblems(): Promise<TSheet[]> {
  try {
    const response = await apiClient.get("/sheet");
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    return response.data.data;
  } catch (error) {
    throw new Error(
      "Failed to fetch problems",
      error instanceof Error ? { cause: error } : undefined,
    );
  }
}

export async function createSheet(
  token: string,
  data: {
    title: string;
    description: string;
    visibility: "public" | "private";
    categories: string[];
  },
) {
  try {
    const response = await apiClient.post("/sheet", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    return response.data.data;
  } catch (error) {
    throw new Error(
      "Failed to create sheet",
      error instanceof Error ? { cause: error } : undefined,
    );
  }
}
