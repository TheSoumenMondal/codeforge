"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const InputGroup = React.forwardRef<
  HTMLFieldSetElement,
  React.ComponentProps<"fieldset">
>(({ className, ...props }, ref) => {
  return (
    <fieldset
      ref={ref}
      data-slot="input-group"
      className={cn(
        "group/input-group relative flex h-8 w-full min-w-0 items-center rounded-lg border border-input transition-colors outline-none",
        "has-disabled:bg-input/50 has-disabled:opacity-50",
        "has-[[data-slot][aria-invalid=true]]:border-destructive",
        "has-[>[data-align=block-end]]:h-auto has-[>[data-align=block-end]]:flex-col",
        "has-[>[data-align=block-start]]:h-auto has-[>[data-align=block-start]]:flex-col",
        "has-[>textarea]:h-auto",
        "dark:bg-input/30 dark:has-disabled:bg-input/80",
        className,
      )}
      {...props}
    />
  );
});
InputGroup.displayName = "InputGroup";

const inputGroupAddonVariants = cva(
  "flex h-auto cursor-text items-center justify-center gap-2 py-1.5 text-sm font-medium text-muted-foreground select-none group-data-[disabled=true]/input-group:opacity-50 [&>kbd]:rounded-[calc(var(--radius)-5px)] [&>svg:not([class*='size-'])]:size-4",
  {
    variants: {
      align: {
        "inline-start": "order-first pl-2 has-[>button]:ml-[-0.3rem]",
        "inline-end": "order-last pr-2 has-[>button]:mr-[-0.3rem]",
        "block-start": "order-first w-full justify-start px-2.5 pt-2",
        "block-end": "order-last w-full justify-start px-2.5 pb-2",
      },
    },
    defaultVariants: {
      align: "inline-start",
    },
  },
);

type TInputGroupAddonProps = React.ComponentProps<"button"> &
  VariantProps<typeof inputGroupAddonVariants>;

const InputGroupAddon = React.forwardRef<
  HTMLButtonElement,
  TInputGroupAddonProps
>(({ className, align = "inline-start", ...props }, ref) => {
  return (
    <button
      ref={ref}
      type="button"
      data-slot="input-group-addon"
      data-align={align}
      className={cn(inputGroupAddonVariants({ align }), className)}
      onClick={(event) => {
        const target = event.target as HTMLElement;
        // If click originated from a focusable/control element inside, don't override
        if (
          target !== event.currentTarget &&
          target.closest("button, a, input, textarea, select")
        )
          return;

        event.currentTarget.parentElement
          ?.querySelector<HTMLInputElement>("input")
          ?.focus();
      }}
      {...props}
    />
  );
});
InputGroupAddon.displayName = "InputGroupAddon";

const inputGroupButtonVariants = cva(
  "flex items-center gap-2 text-sm shadow-none",
  {
    variants: {
      size: {
        xs: "h-6 gap-1 rounded-[calc(var(--radius)-3px)] px-1.5",
        sm: "",
        "icon-xs": "size-6 rounded-[calc(var(--radius)-3px)] p-0",
        "icon-sm": "size-8 p-0",
      },
    },
    defaultVariants: {
      size: "xs",
    },
  },
);

type TInputGroupButtonProps = Omit<
  React.ComponentProps<typeof Button>,
  "size"
> &
  VariantProps<typeof inputGroupButtonVariants>;

const InputGroupButton = React.forwardRef<
  HTMLButtonElement,
  TInputGroupButtonProps
>(
  (
    { className, type = "button", variant = "ghost", size = "xs", ...props },
    ref,
  ) => {
    return (
      <Button
        ref={ref}
        type={type}
        data-size={size}
        variant={
          variant as unknown as React.ComponentProps<typeof Button>["variant"]
        }
        className={cn(
          inputGroupButtonVariants({
            size: size as VariantProps<typeof inputGroupButtonVariants>["size"],
          }) as string,
          className as string,
        )}
        {...props}
      />
    );
  },
);
InputGroupButton.displayName = "InputGroupButton";

const InputGroupText = React.forwardRef<
  HTMLSpanElement,
  React.ComponentProps<"span">
>(({ className, ...props }, ref) => {
  return (
    <span
      ref={ref}
      className={cn(
        "flex items-center gap-2 text-sm text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
});
InputGroupText.displayName = "InputGroupText";

const InputGroupInput = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input">
>(({ className, ...props }, ref) => {
  return (
    <Input
      ref={ref}
      data-slot="input-group-control"
      className={cn(
        "flex-1 rounded-none border-0 bg-transparent shadow-none disabled:bg-transparent aria-invalid:border-destructive dark:bg-transparent dark:disabled:bg-transparent",
        className,
      )}
      {...props}
    />
  );
});
InputGroupInput.displayName = "InputGroupInput";

const InputGroupTextarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <Textarea
      ref={ref}
      data-slot="input-group-control"
      className={cn(
        "flex-1 resize-none rounded-none border-0 bg-transparent py-2 shadow-none disabled:bg-transparent aria-invalid:border-destructive dark:bg-transparent dark:disabled:bg-transparent",
        className,
      )}
      {...props}
    />
  );
});
InputGroupTextarea.displayName = "InputGroupTextarea";

export {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
};
