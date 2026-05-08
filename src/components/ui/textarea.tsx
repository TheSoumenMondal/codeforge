import type { ComponentPropsWithoutRef } from "react";
import * as React from "react";

import { cn } from "@/lib/utils";
import { buttonVariants } from "./button";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  ComponentPropsWithoutRef<"textarea"> & {
    className?: string;
    variant?:
      | "default"
      | "destructive"
      | "outline"
      | "secondary"
      | "ghost"
      | "link";
  }
>(({ className = "", variant, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      data-slot="textarea"
      className={cn(
        "border-input bg-input/20 dark:bg-input/30 focus-visible:border-ring focus-visible:ring-ring/30 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 resize-y rounded-md border px-2 py-2 text-sm transition-colors md:text-xs/relaxed placeholder:text-muted-foreground min-h-16 w-full max-w-full box-border overflow-auto outline-none disabled:cursor-not-allowed disabled:opacity-50",
        variant &&
          buttonVariants({
            variant,
            animation: "colors",
            className: "cursor-text",
          }),
        className,
      )}
      {...props}
    />
  );
});

Textarea.displayName = "Textarea";

export { Textarea };
