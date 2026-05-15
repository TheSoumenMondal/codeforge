/** biome-ignore-all lint/style/useNamingConvention: <> */
import type {
  TCodeStubUpdationRequestPayload,
  TCreateCodeStubRequestPayload,
  TCreateProblemRequestPayload,
  TProblemCreationResponseData,
  TProblemTotalData,
  TTestCaseUpdationRequestPayload,
  TUpdateProblemRequestPayload,
} from "@/types/problem";
import { apiClient } from "../client";

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

export async function getProblemById(id: string): Promise<TProblemTotalData> {
  try {
    const response = await apiClient.get(`/problem/${id}`);
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    return response.data.data;
  } catch (error) {
    throw new Error(
      "Failed to fetch problem",
      error instanceof Error ? { cause: error } : undefined,
    );
  }
}

export async function createProblem(
  token: string,
  payload: TCreateProblemRequestPayload,
): Promise<TProblemCreationResponseData> {
  try {
    const response = await apiClient.post("/problem", payload, {
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
      "Failed to create problem",
      error instanceof Error ? { cause: error } : undefined,
    );
  }
}

export async function getMyCreatedProblems(
  token: string,
): Promise<TProblemTotalData[]> {
  try {
    const response = await apiClient.get("/problem/my-problems", {
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
      "Failed to fetch my created problems",
      error instanceof Error ? { cause: error } : undefined,
    );
  }
}

export async function createCodeStub(
  token: string,
  payload: TCreateCodeStubRequestPayload,
) {
  try {
    const response = await apiClient.post(
      "/problem/code-stub",
      {
        problemId: payload.problemId,
        language: payload.language,
        startCode: payload.startCode,
        userCode: payload.userCode,
        endCode: payload.endCode,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!response.data?.success) {
      throw new Error(response.data?.message || "Failed to create code stub");
    }

    return response.data.data;
  } catch (err) {
    throw new Error(
      err instanceof Error ? err.message : "Failed to create code stub",
    );
  }
}

export async function createTestCase(
  token: string,
  problemId: string,
  payload: { input: string; output: string; totalExecutionTime?: number },
) {
  try {
    const response = await apiClient.post(
      `/problem/${problemId}/test-case`,
      {
        input: payload.input,
        output: payload.output,
        totalExecutionTime: payload.totalExecutionTime ?? 1,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!response.data?.success) {
      throw new Error(response.data?.message || "Failed to create test case");
    }

    return response.data.data;
  } catch (err) {
    throw new Error(
      err instanceof Error ? err.message : "Failed to create test case",
    );
  }
}

export async function updateProblem(
  token: string,
  problemId: string,
  payload: TUpdateProblemRequestPayload,
): Promise<TProblemTotalData> {
  try {
    const response = await apiClient.put(`/problem/${problemId}`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.data?.success) {
      throw new Error(response.data?.message || "Failed to update problem");
    }

    return response.data.data;
  } catch (err) {
    throw new Error(
      err instanceof Error ? err.message : "Failed to update problem",
    );
  }
}

export async function updateCodeStub(
  token: string,
  payload: TCodeStubUpdationRequestPayload,
) {
  try {
    const body: {
      startCode?: string;
      userCode?: string;
      endCode?: string;
    } = {};
    if (payload.startCode !== undefined) body.startCode = payload.startCode;
    if (payload.userCode !== undefined) body.userCode = payload.userCode;
    if (payload.endCode !== undefined) body.endCode = payload.endCode;

    const response = await apiClient.put(
      `/problem/${payload.problemId}/code-stub`,
      body,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { language: payload.language },
      },
    );

    if (!response.data?.success) {
      throw new Error(response.data?.message || "Failed to update code stub");
    }

    return response.data.data;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Failed to update code stub",
    );
  }
}

export async function updateTestCase(
  token: string,
  payload: TTestCaseUpdationRequestPayload,
) {
  try {
    const body: Record<string, unknown> = {
      testCaseId: payload.testCaseId,
    };
    if (payload.input !== undefined) body.input = payload.input;
    if (payload.output !== undefined) body.output = payload.output;
    if (payload.totalExecutionTime !== undefined) {
      body.totalExecutionTime = payload.totalExecutionTime;
    }

    const response = await apiClient.put(
      `/problem/${payload.problemId}/test-case`,
      body,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!response.data?.success) {
      throw new Error(response.data?.message || "Failed to update test case");
    }

    return response.data.data;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Failed to update test case",
    );
  }
}

export async function deleteTestCase(
  token: string,
  problemId: string,
  testCaseId: string,
) {
  try {
    const response = await apiClient.delete(
      `/problem/${problemId}/test-case/${testCaseId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!response.data?.success) {
      throw new Error(response.data?.message || "Failed to delete test case");
    }

    return response.data.data;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Failed to delete test case",
    );
  }
}

export async function deleteProblem(token: string, problemId: string) {
  try {
    const response = await apiClient.delete(`/problem/${problemId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.data?.success) {
      throw new Error(response.data?.message || "Failed to delete problem");
    }

    return response.data.data;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Failed to delete problem",
    );
  }
}
