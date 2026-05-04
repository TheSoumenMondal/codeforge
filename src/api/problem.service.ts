import { apiClient } from "./client";

export async function getAllProblems() {
  try {
    const response = await apiClient.get("/problem");
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
