"use client";

import { DevicesIcon, MoonStarsIcon, SunDimIcon } from "@phosphor-icons/react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import React from "react";

import { cn } from "@/lib/utils";

type TToggleThemeProps = {
  icon: React.ReactNode;
  value: string;
};

const THEME_OPTIONS: TToggleThemeProps[] = [
  {
    icon: (
      <DevicesIcon
        className="size-5"
        weight="duotone"
      />
    ),
    value: "system",
  },
  {
    icon: (
      <SunDimIcon
        className="size-5"
        weight="duotone"
      />
    ),
    value: "light",
  },
  {
    icon: (
      <MoonStarsIcon
        className="size-5"
        weight="duotone"
      />
    ),
    value: "dark",
  },
];

export function ToggleTheme() {
  const { theme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div className="flex h-8 w-24" />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-muted inline-flex items-center overflow-hidden rounded-xl border p-1"
      role="radiogroup"
    >
      {THEME_OPTIONS.map((option) => {
        const isActive = theme === option.value;

        return (
          <label
            key={option.value}
            className="relative flex size-8 items-center justify-center"
          >
            <input
              type="radio"
              name="theme"
              value={option.value}
              checked={isActive}
              onChange={() => setTheme(option.value)}
              className="sr-only"
              aria-label={`Switch to ${option.value} theme`}
            />

            <span
              className={cn(
                "relative flex h-full w-full cursor-pointer items-center justify-center rounded-lg transition-colors",
                isActive
                  ? "text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="theme-option"
                  transition={{
                    type: "spring",
                    stiffness: 320,
                    damping: 28,
                  }}
                  className="absolute inset-0 rounded-lg bg-primary/90 shadow-sm"
                />
              )}

              <span className="relative z-1">{option.icon}</span>
            </span>
          </label>
        );
      })}
    </motion.div>
  );
}
