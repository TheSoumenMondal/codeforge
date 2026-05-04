"use client";

import React from "react";
import { cn } from "@/lib/utils";

const sizeMap = {
  sm: "h-5 w-[34px]",
  md: "h-6 w-[40px]",
  lg: "h-8 w-[52px]",
};

const baseStyles = {
  switch: `relative inline-block cursor-pointer`,
  input: `h-full w-full appearance-none rounded-full cursor-pointer
    bg-[var(--c-default)] transition-colors duration-300
    hover:bg-[var(--c-default-dark)]
    data-[checked=true]:bg-[var(--c-background)]`,
  svg: `pointer-events-none absolute inset-0 fill-white`,
  circle: `transition-transform duration-300`,
};

interface IToggleProps {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  variant?: "default" | "success" | "warning" | "danger";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Toggle({
  checked = false,
  onCheckedChange,
  variant = "default",
  size = "md",
  className,
}: IToggleProps) {
  const [isChecked, setIsChecked] = React.useState(checked);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.checked;
    setIsChecked(value);
    onCheckedChange?.(value);
  };

  return (
    <label
      className={cn(
        baseStyles.switch,
        sizeMap[size],
        className,

        // CSS variables
        "[--c-default:#D2D6E9]",
        "[--c-default-dark:#C7CBDF]",

        variant === "default" && "[--c-background:#275EFE]",
        variant === "success" && "[--c-background:#10B981]",
        variant === "warning" && "[--c-background:#F59E0B]",
        variant === "danger" && "[--c-background:#EF4444]",
      )}
    >
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleChange}
        data-checked={isChecked}
        className={baseStyles.input}
      />

      <svg
        viewBox="0 0 52 32"
        filter="url(#goo)"
        className={baseStyles.svg}
        aria-hidden="true"
      >
        {/* left blob */}
        <circle
          cx="16"
          cy="16"
          r="10"
          className={baseStyles.circle}
          style={{
            transform: `translateX(${isChecked ? "12px" : "0"}) scale(${isChecked ? 0 : 1})`,
            transformOrigin: "16px 16px",
          }}
        />

        {/* right blob */}
        <circle
          cx="36"
          cy="16"
          r="10"
          className={baseStyles.circle}
          style={{
            transform: `translateX(${isChecked ? "0" : "-12px"}) scale(${isChecked ? 1 : 0})`,
            transformOrigin: "36px 16px",
          }}
        />

        {/* drop */}
        {isChecked && (
          <circle
            cx="35"
            cy="-1"
            r="2.5"
          />
        )}
      </svg>
    </label>
  );
}

export function GooeyFilter() {
  return (
    <svg
      className="fixed w-0 h-0"
      aria-hidden="true"
    >
      <defs>
        <filter id="goo">
          <feGaussianBlur
            in="SourceGraphic"
            stdDeviation="2"
            result="b"
          />
          <feColorMatrix
            in="b"
            mode="matrix"
            values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 18 -7"
            result="goo"
          />
          <feComposite
            in="SourceGraphic"
            in2="goo"
            operator="atop"
          />
        </filter>
      </defs>
    </svg>
  );
}
