import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface IUser {
  id: string;
  name: string;
  bio: string | null;
  email: string;
  // biome-ignore lint/style/useNamingConvention: matching API response
  email_verified: boolean;
  location: string | null;
  // biome-ignore lint/style/useNamingConvention: matching API response
  avatar_url: string | null;
  // biome-ignore lint/style/useNamingConvention: matching API response
  website_url: string | null;
  // biome-ignore lint/style/useNamingConvention: matching API response
  created_at: string;
  // biome-ignore lint/style/useNamingConvention: matching API response
  updated_at: string;
}

interface IAuthStore {
  isAuthenticated: boolean;
  setIsAuthenticated: (val: boolean) => void;
  token: string | null;
  setToken: (token: string | null) => void;
  user: IUser | null;
  setUser: (user: IUser | null) => void;
  _hasHydrated: boolean;
  setHasHydrated: (val: boolean) => void;
}

export const useAuthStore = create<IAuthStore>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
      token: null,
      setToken: (token) => set({ token }),
      user: null,
      setUser: (user) => set({ user }),
      _hasHydrated: false,
      setHasHydrated: (val) => set({ _hasHydrated: val }),
    }),
    {
      name: "auth-store",
    },
  ),
);
