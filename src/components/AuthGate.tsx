"use client";

import { CircleNotchIcon } from "@phosphor-icons/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { getProfile } from "@/api/services/auth.service";
import { useAuth } from "@/hooks/useAuth";

export function AuthGate({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, token, setIsAuthenticated, setToken, setUser } =
    useAuth();
  const [hasMounted, setHasMounted] = useState(false);
  const [validating, setValidating] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const isAuthPage = pathname === "/login" || pathname === "/signup";
  const isProtectedRoute = pathname.startsWith("/problems/create");

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (!hasMounted) return;

    let cancelled = false;
    async function validateToken() {
      if (token) {
        try {
          const response = await getProfile(token);
          if (!cancelled) {
            setIsAuthenticated(true);
            setUser(response.data);
          }
        } catch (error) {
          if (!cancelled) {
            toast.error(
              `Token validation failed: ${error instanceof Error ? error.message : "Unknown error"}`,
            );
            setIsAuthenticated(false);
            setToken(null);
            setUser(null);
          }
        }
      } else {
        if (!cancelled) {
          setIsAuthenticated(false);
          setUser(null);
        }
      }
      if (!cancelled) {
        setValidating(false);
      }
    }

    validateToken();

    return () => {
      cancelled = true;
    };
  }, [hasMounted, token, setIsAuthenticated, setToken, setUser]);

  useEffect(() => {
    if (hasMounted && !validating) {
      if (isAuthenticated && isAuthPage) {
        router.replace("/explore");
      } else if (!isAuthenticated && isProtectedRoute) {
        router.replace("/login");
      }
    }
  }, [
    hasMounted,
    validating,
    isAuthenticated,
    isAuthPage,
    isProtectedRoute,
    router,
  ]);

  if (!hasMounted || validating) {
    return (
      <div className="flex h-screen items-center justify-center">
        <CircleNotchIcon
          className="h-8 w-8 animate-spin"
          weight="duotone"
        />
      </div>
    );
  }

  if (isAuthenticated && isAuthPage) {
    return (
      <div className="flex h-screen items-center justify-center">
        <CircleNotchIcon
          className="h-8 w-8 animate-spin"
          weight="duotone"
        />
      </div>
    );
  }

  if (!isAuthenticated && isProtectedRoute) {
    return (
      <div className="flex h-screen items-center justify-center">
        <CircleNotchIcon
          className="h-8 w-8 animate-spin"
          weight="duotone"
        />
      </div>
    );
  }

  return <>{children}</>;
}
