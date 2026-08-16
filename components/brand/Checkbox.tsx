"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Checkbox as CheckboxPrimitive } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

/**
 * Brand shell around the shadcn/ui (Radix) checkbox — a 22px box, 8px radius, gold
 * fill with an ink check when on. Radix supplies the keyboard and form semantics;
 * the classes below pull the box back onto the brand tokens.
 */
export type CheckboxProps = Omit<
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive>,
  "style"
> & {
  label?: React.ReactNode;
  style?: React.CSSProperties;
};

export function Checkbox({ label, checked, disabled, id, className, style, ...rest }: CheckboxProps) {
  const reactId = React.useId();
  const boxId = id ?? `cb-${reactId}`;

  return (
    <div
      className={cn(
        "flex items-center gap-[var(--space-md)]",
        "font-[family-name:var(--font-ui)] text-[length:var(--text-body-md)]",
        className,
      )}
      style={style}
    >
      <CheckboxPrimitive
        id={boxId}
        checked={checked}
        disabled={disabled}
        className={cn(
          "size-[22px] shrink-0 rounded-[var(--radius-sm)] shadow-none",
          "border-[var(--color-border)] bg-[var(--color-canvas)]",
          "transition-[background-color,border-color] duration-[var(--duration-base)] ease-[var(--ease-out)]",
          "data-[state=checked]:border-[var(--color-ink)] data-[state=checked]:bg-[var(--color-primary)]",
          "data-[state=checked]:text-[var(--color-ink)]",
          "focus-visible:ring-0 focus-visible:shadow-[var(--focus-ring)]",
        )}
        {...rest}
      />
      {label ? (
        <Label
          htmlFor={boxId}
          className={cn(
            "text-[length:var(--text-body-md)] font-normal",
            disabled
              ? "cursor-not-allowed text-[var(--color-mute)]"
              : "cursor-pointer text-[var(--color-ink)]",
          )}
        >
          {label}
        </Label>
      ) : null}
    </div>
  );
}
