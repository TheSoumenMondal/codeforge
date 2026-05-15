import axios from "axios";
import type { TSubmissionResponseType } from "@/types/submission";
import { apiClient } from "../client";

export async function submitCode(
  token: string,
  code: string,
  language: string,
  problemId?: string,
) {
  try {
    const response = await apiClient.post(
      `/submission/${problemId}`,
      { code, language },
      {
        headers: {
          // biome-ignore lint/style/useNamingConvention: ignore
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!response.data?.success) {
      throw new Error(response.data?.message || "Failed to make submission");
    }

    return response.data.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const message =
        err.response?.data?.message || err.message || "Axios error";
      throw new Error(`Failed to make submission: ${message}`);
    }

    if (err instanceof Error) {
      throw new Error(`Failed to make submission: ${err.message}`);
    }

    throw new Error("Failed to make submission");
  }
}

export async function getSubmissionResult(
  token: string,
  submissionId: string,
): Promise<TSubmissionResponseType> {
  try {
    const response = await apiClient.get(`/submission/${submissionId}`, {
      headers: {
        // biome-ignore lint/style/useNamingConvention: ignore
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.data?.success) {
      throw new Error(
        response.data?.message || "Failed to get submission result",
      );
    }

    return response.data.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const message =
        err.response?.data?.message || err.message || "Axios error";
      throw new Error(`Failed to make submission: ${message}`);
    }

    if (err instanceof Error) {
      throw new Error(`Failed to make submission: ${err.message}`);
    }

    throw new Error("Failed to make submission");
  }
}
