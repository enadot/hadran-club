"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Icon } from "./Icon";

/**
 * Mirrors components/forms/Select.jsx.
 *
 * Kept as a native <select> — it matches the prototype pixel for pixel, and on
 * mobile it gives the platform picker, which beats a custom listbox for this
 * audience. The chevron sits at inset-inline-end so it lands on the left in RTL.
 */
export type SelectOption = { value: string; label: string } | string;

export type SelectProps = Omit<React.ComponentPropsWithoutRef<"select">, "children" | "style"> & {
  label?: React.ReactNode;
  hint?: React.ReactNode;
  options?: SelectOption[];
  wrapperClassName?: string;
  style?: React.CSSProperties;
};

export function Select({
  label,
  hint,
  options = [],
  id,
  className,
  wrapperClassName,
  style,
  ...rest
}: SelectProps) {
  const reactId = React.useId();
  const selectId = id ?? `sel-${reactId}`;

  return (
    <div
      className={cn(
        "flex flex-col gap-[var(--space-sm)] font-[family-name:var(--font-ui)]",
        wrapperClassName,
      )}
      style={style}
    >
      {label ? (
        <label htmlFor={selectId} className="text-[length:var(--text-body-sm)] font-semibold">
          {label}
        </label>
      ) : null}

      <div className="relative flex items-center">
        <select
          id={selectId}
          className={cn(
            "w-full appearance-none rounded-[var(--radius-md)] border px-4 py-3",
            "border-[var(--color-border)] bg-[var(--color-canvas)] font-inherit outline-none",
            "text-[length:var(--text-body-md)] text-[var(--color-ink)]",
            "transition-[border-color,box-shadow] duration-[var(--duration-base)] ease-[var(--ease-out)]",
            "focus:border-[var(--color-ink)] focus:shadow-[var(--focus-ring)]",
            className,
          )}
          {...rest}
        >
          {options.map((o) => {
            const value = typeof o === "string" ? o : o.value;
            const text = typeof o === "string" ? o : o.label;
            return (
              <option key={value} value={value}>
                {text}
              </option>
            );
          })}
        </select>
        <Icon
          name="chevron-down"
          size={18}
          color="var(--color-mute)"
          style={{ position: "absolute", insetInlineEnd: 16, pointerEvents: "none" }}
        />
      </div>

      {hint ? (
        <span className="text-[length:var(--text-caption)] text-[var(--color-mute)]">{hint}</span>
      ) : null}
    </div>
  );
}
