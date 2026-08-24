"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Textarea as TextareaPrimitive } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

/**
 * Brand shell around the shadcn/ui textarea — same border, radius, focus ring and
 * error treatment as Input, so a multi-line field sits in a form without a seam.
 */
export type TextareaProps = Omit<React.ComponentPropsWithoutRef<"textarea">, "style"> & {
  label?: React.ReactNode;
  hint?: React.ReactNode;
  error?: React.ReactNode;
  wrapperClassName?: string;
  style?: React.CSSProperties;
};

export function Textarea({
  label,
  hint,
  error,
  id,
  className,
  wrapperClassName,
  style,
  ...rest
}: TextareaProps) {
  const reactId = React.useId();
  const areaId = id ?? `ta-${reactId}`;
  const describedBy = hint || error ? `${areaId}-desc` : undefined;

  return (
    <div
      className={cn(
        "flex flex-col gap-[var(--space-sm)] font-[family-name:var(--font-ui)]",
        wrapperClassName,
      )}
      style={style}
    >
      {label ? (
        <Label
          htmlFor={areaId}
          className="text-[length:var(--text-body-sm)] font-semibold text-[var(--color-ink)]"
        >
          {label}
        </Label>
      ) : null}

      <TextareaPrimitive
        id={areaId}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={cn(
          "rounded-[var(--radius-lg)] border bg-[var(--color-canvas)] px-4 py-3 shadow-none",
          "text-[length:var(--text-body-md)] md:text-[length:var(--text-body-md)] text-[var(--color-ink)]",
          "font-inherit placeholder:text-[var(--color-mute)]",
          "transition-[border-color,box-shadow] duration-[var(--duration-base)] ease-[var(--ease-out)]",
          "focus-visible:ring-0 focus-visible:shadow-[var(--focus-ring)]",
          error
            ? "border-[var(--color-negative)] focus-visible:border-[var(--color-negative)]"
            : "border-[var(--color-border)] focus-visible:border-[var(--color-ink)]",
          className,
        )}
        {...rest}
      />

      {hint || error ? (
        <span
          id={describedBy}
          className={cn(
            "text-[length:var(--text-caption)]",
            error ? "text-[var(--color-negative)]" : "text-[var(--color-mute)]",
          )}
        >
          {error || hint}
        </span>
      ) : null}
    </div>
  );
}
