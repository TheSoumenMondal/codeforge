import clsx from "clsx";
import React, { createContext, useContext, useState } from "react";
import { twMerge } from "tailwind-merge";
import { buttonVariants } from "@/components/ui/button";

const SwitchContext = createContext<{
  value: string | null;
  setValue: (value: string) => void;
} | null>(null);

interface ISwitchProps {
  children: React.ReactNode;
  size?: "small" | "medium" | "large";
  style?: React.CSSProperties;
  value?: string | null;
  onChange?: (value: string) => void;
}

export const Switch = ({
  children,
  size = "medium",
  style,
  value: controlledValue,
  onChange,
}: ISwitchProps) => {
  const [internalValue, setInternalValue] = useState<string | null>(null);
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  const setValue = (newValue: string) => {
    if (!isControlled) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  };

  return (
    <SwitchContext.Provider value={{ value, setValue }}>
      <div
        className={clsx(
          "inline-flex overflow-hidden border border-gray-alpha-400 rounded-xl p-1 shadow-sm items-center bg-secondary",
          size === "small" && "h-8",
          size === "medium" && "h-10",
          size === "large" && "h-12",
        )}
        style={style}
      >
        {React.Children.map(children, (child) =>
          React.cloneElement(child as React.ReactElement<ISwitchControlProps>, {
            size,
          }),
        )}
      </div>
    </SwitchContext.Provider>
  );
};

interface ISwitchControlProps {
  label?: string;
  value: string;
  disabled?: boolean;
  size?: "small" | "medium" | "large";
  icon?: React.ReactNode;
}

const SwitchControl = ({
  label,
  value,
  disabled = false,
  size = "medium",
  icon,
}: ISwitchControlProps) => {
  const context = useContext(SwitchContext);
  const checked = value === context?.value;

  const inactiveButtonClassName = twMerge(
    clsx(
      "relative inline-flex min-w-0 flex-1 items-center justify-center overflow-hidden outline-none whitespace-nowrap transition-[background-color,color,box-shadow,transform] duration-150 ease-out",
      checked
        ? buttonVariants({
            variant: "info",
            size: "sm",
            animation: "none",
          })
        : buttonVariants({
            variant: "ghost",
            size: "sm",
            animation: "none",
          }),
      checked
        ? "shadow-[inset_0_1px_0_rgba(255,255,255,0.14)]"
        : "text-gray-900 hover:text-gray-1000",
      size === "small" && "min-h-6 px-3 text-xs",
      size === "medium" && "min-h-7 px-4 text-sm",
      size === "large" && "min-h-8 px-5 text-sm",
      disabled && "cursor-not-allowed pointer-events-none opacity-60",
    ),
  );

  return (
    <button
      type="button"
      className={inactiveButtonClassName}
      onClick={() => context?.setValue(value)}
      disabled={disabled}
      aria-pressed={checked}
    >
      <span
        className={twMerge(
          clsx(
            "relative z-10 flex items-center justify-center gap-2 cursor-pointer font-sm font-sans leading-none select-none",
            checked ? "fill-gray-1000" : "fill-gray-900 hover:fill-gray-1000",
            !icon && size === "small" && "text-xs px-1.5",
            !icon && size === "medium" && "text-sm px-1",
            !icon && size === "large" && "text-sm px-1",
            icon && size === "small" && "py-1 px-2",
            icon && size === "medium" && "py-1.5 px-3",
            icon && size === "large" && "p-3",
          ),
        )}
      >
        {icon ? (
          <span className={clsx(size === "large" && "scale-125")}>{icon}</span>
        ) : (
          label
        )}
      </span>
    </button>
  );
};

Switch.Control = SwitchControl;
