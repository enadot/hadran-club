"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Icon } from "./Icon";

/**
 * Mirrors components/forms/Checkbox.jsx — a 22px box, 8px radius, gold fill with an
 * ink check when on. The real input stays in the DOM (visually hidden) so it keeps
 * native keyboard and form semantics.
 */
export type CheckboxProps = Omit<React.ComponentPropsWithoutRef<"input">, "type" | "style"> & {
  label?: React.ReactNode;
  style?: React.CSSProperties;
};

export function Checkbox({ label, checked, disabled, className, style, ...rest }: CheckboxProps) {
  return (
    <label
      className={cn(
        "relative inline-flex items-center gap-[var(--space-md)]",
        "font-[family-name:var(--font-ui)] text-[length:var(--text-body-md)]",
        disabled
          ? "cursor-not-allowed text-[var(--color-mute)]"
          : "cursor-pointer text-[var(--color-ink)]",
        className,
      )}
      style={style}
    >
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        className="absolute size-0 opacity-0"
        {...rest}
      />
      <span
        aria-hidden="true"
        className={cn(
          "inline-flex size-[22px] shrink-0 items-center justify-center",
          "rounded-[var(--radius-sm)] border",
          "transition-[background-color,border-color] duration-[var(--duration-base)] ease-[var(--ease-out)]",
          checked
            ? "border-[var(--color-ink)] bg-[var(--color-primary)]"
            : "border-[var(--color-border)] bg-[var(--color-canvas)]",
        )}
      >
        {checked ? <Icon name="check" size={14} color="var(--color-ink)" /> : null}
      </span>
      {label}
    </label>
  );
}
