"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { GooeyFilter, Toggle } from "@/components/ui/liquid-toggle";

export default function ThemeToggleChallengeNavbar({
  className,
}: {
  className?: string;
}) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className={className}>
      <div className="relative">
        <GooeyFilter />
        {mounted ? (
          <Toggle
            variant="danger"
            checked={resolvedTheme === "dark"}
            onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
          />
        ) : (
          <div className="h-8 w-13" />
        )}
      </div>
    </div>
  );
}
