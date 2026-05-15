"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { handleLogin, registerUser } from "@/api/services/auth.service";
import { useAuthStore } from "@/store/auth-store";
import { clearProblemStore } from "@/store/problem-store";

export function useAuth() {
  const store = useAuthStore();
  const router = useRouter();

  const login = useCallback(
    async (email: string, password: string) => {
      const data = await handleLogin({ email, password });
      store.setToken(data.access_token || data.token || data);
      store.setIsAuthenticated(true);
    },
    [store],
  );

  const signup = useCallback(
    async (name: string, email: string, password: string) => {
      await registerUser({ name, email, password });
    },
    [],
  );

  const logout = useCallback(() => {
    store.setToken(null);
    store.setIsAuthenticated(false);
    store.setUser(null);
    clearProblemStore();
    router.push("/login");
  }, [store, router]);

  return {
    ...store,
    login,
    signup,
    logout,
  };
}
