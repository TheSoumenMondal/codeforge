/** biome-ignore-all lint/style/useNamingConvention: ignore */
import { apiClient } from "../client";

export async function handleLogin({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    const response = await apiClient.post("/auth/login", { email, password });
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    return response.data.data;
  } catch (error) {
    throw new Error(
      "Failed to login",
      error instanceof Error ? { cause: error } : undefined,
    );
  }
}

export async function registerUser({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) {
  try {
    const response = await apiClient.post("/auth/signup", {
      name,
      email,
      password,
    });
    if (!response.data.success)
      throw new Error(response.data.message || "Failed to register");
    return response.data;
  } catch (error) {
    throw new Error(
      "Failed to register",
      error instanceof Error ? { cause: error } : undefined,
    );
  }
}

export async function getProfile(token: string) {
  try {
    const response = await apiClient.get("/user/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.data.success && !response.data) {
      throw new Error(response.data?.message || "Failed to fetch profile");
    }
    return response.data;
  } catch (error) {
    throw new Error(
      "Failed to get profile",
      error instanceof Error ? { cause: error } : undefined,
    );
  }
}
