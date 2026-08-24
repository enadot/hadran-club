"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Input as InputPrimitive } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icon, type IconName } from "./Icon";

/**
 * Brand shell around the shadcn/ui input — 16px radius, hairline border, ink border
 * on focus plus the soft gold ring, negative border and helper text on error. The
 * primitive keeps the field DOM and a11y wiring; the tokens keep the look.
 */
export type InputProps = Omit<React.ComponentPropsWithoutRef<"input">, "style"> & {
  label?: React.ReactNode;
  hint?: React.ReactNode;
  error?: React.ReactNode;
  icon?: IconName;
  suffix?: React.ReactNode;
  wrapperClassName?: string;
  style?: React.CSSProperties;
};

export function Input({
  label,
  hint,
  error,
  icon,
  suffix,
  id,
  className,
  wrapperClassName,
  style,
  ...rest
}: InputProps) {
  const reactId = React.useId();
  const inputId = id ?? `in-${reactId}`;
  const describedBy = hint || error ? `${inputId}-desc` : undefined;

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
          htmlFor={inputId}
          className="text-[length:var(--text-body-sm)] font-semibold text-[var(--color-ink)]"
        >
          {label}
        </Label>
      ) : null}

      <div
        className={cn(
          "flex items-center gap-[var(--space-sm)] rounded-[var(--radius-lg)]",
          "border bg-[var(--color-canvas)] px-4 py-3",
          "transition-[border-color,box-shadow] duration-[var(--duration-base)] ease-[var(--ease-out)]",
          "focus-within:shadow-[var(--focus-ring)]",
          error
            ? "border-[var(--color-negative)]"
            : "border-[var(--color-border)] focus-within:border-[var(--color-ink)]",
        )}
      >
        {icon ? <Icon name={icon} size={18} color="var(--color-mute)" /> : null}
        <InputPrimitive
          id={inputId}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={cn(
            "h-auto min-w-0 flex-1 rounded-none border-none bg-transparent p-0 font-inherit shadow-none outline-none",
            "text-[length:var(--text-body-md)] md:text-[length:var(--text-body-md)] text-[var(--color-ink)]",
            "placeholder:text-[var(--color-mute)]",
            "focus-visible:border-none focus-visible:ring-0 aria-invalid:border-none aria-invalid:ring-0",
            className,
          )}
          {...rest}
        />
        {suffix ? (
          <span className="text-[length:var(--text-body-sm)] font-semibold text-[var(--color-mute)]">
            {suffix}
          </span>
        ) : null}
      </div>

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
