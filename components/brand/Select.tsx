"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Select as SelectRoot,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

/**
 * Brand shell around the shadcn/ui (Radix) select — same border, radius and focus
 * treatment as Input, so a picker sits in a form without a seam. RtlProvider feeds
 * the direction in, so the panel and the check mark land on the right side in
 * Hebrew.
 *
 * The API stays what the pages already pass: a list of options and a value. The
 * change handler is Radix's `onValueChange`, which hands over the value itself.
 */
export type SelectOption = { value: string; label: string } | string;

export type SelectProps = {
  label?: React.ReactNode;
  hint?: React.ReactNode;
  /**
   * "md" is the form field — full width, 52px, matching Input beside it in a form.
   *
   * "sm" is the filter pill: a compact, hairline control that names the axis and
   * carries its current value. It exists because a directory's pickers are not form
   * fields. Given the field's own weight and height they read as four things of
   * equal importance, when only one of them — the search box — is what a visitor
   * came to use. Every web directory worth copying makes the same distinction
   * (Faire, Skillshare, Whop, Selfridges, Base44, Kit): one field, then pills.
   */
  size?: "md" | "sm";
  /** A pill whose value is set. Fills, so what is in force is legible at a glance. */
  active?: boolean;
  options?: SelectOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  name?: string;
  id?: string;
  className?: string;
  wrapperClassName?: string;
  style?: React.CSSProperties;
  "aria-label"?: string;
};

export function Select({
  label,
  hint,
  size = "md",
  active = false,
  options = [],
  value,
  defaultValue,
  onValueChange,
  placeholder,
  disabled,
  name,
  id,
  className,
  wrapperClassName,
  style,
  ...rest
}: SelectProps) {
  const reactId = React.useId();
  const selectId = id ?? `sel-${reactId}`;
  const describedBy = hint ? `${selectId}-desc` : undefined;

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
          htmlFor={selectId}
          className="text-[length:var(--text-body-sm)] font-semibold text-[var(--color-ink)]"
        >
          {label}
        </Label>
      ) : null}

      <SelectRoot
        value={value}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        disabled={disabled}
        name={name}
      >
        <SelectTrigger
          id={selectId}
          aria-describedby={describedBy}
          className={cn(
            // data-[size=default] is how the shadcn trigger sets its 36px height,
            // and a bare h-auto loses to it — the picker ended up shorter than the
            // Input beside it. Overriding on the same variant matches the field.
            "border shadow-none transition-[background-color,border-color,box-shadow]",
            "duration-[var(--duration-base)] ease-[var(--ease-out)]",
            "focus-visible:ring-0 focus-visible:shadow-[var(--focus-ring)]",
            size === "sm"
              ? [
                  // min-h-11 keeps the 44px touch target the design system asks for
                  // while reading as a pill rather than a field.
                  "w-auto rounded-full px-4 py-2",
                  "h-auto data-[size=default]:h-auto data-[size=default]:min-h-11",
                  "text-[length:var(--text-body-sm)] font-semibold",
                  active
                    ? "border-[var(--color-ink)] bg-[var(--color-ink)] text-[var(--color-primary)] [&_svg:not([class*='text-'])]:text-[var(--color-primary)]"
                    : "border-[var(--color-border)] bg-[var(--color-canvas)] text-[var(--color-body)] hover:bg-[var(--color-canvas-soft)] focus-visible:border-[var(--color-ink)] [&_svg:not([class*='text-'])]:text-[var(--color-mute)]",
                ]
              : [
                  "w-full rounded-[var(--radius-lg)] px-4 py-3",
                  "h-auto data-[size=default]:h-auto data-[size=default]:min-h-[52px]",
                  "border-[var(--color-border)] bg-[var(--color-canvas)]",
                  "text-[length:var(--text-body-md)] text-[var(--color-ink)]",
                  "focus-visible:border-[var(--color-ink)]",
                  "[&_svg:not([class*='text-'])]:text-[var(--color-mute)]",
                ],
            className,
          )}
          {...rest}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>

        <SelectContent className="border-[var(--color-border)] bg-[var(--color-canvas)]">
          {options.map((o) => {
            const optionValue = typeof o === "string" ? o : o.value;
            const text = typeof o === "string" ? o : o.label;
            return (
              <SelectItem
                key={optionValue}
                value={optionValue}
                className="text-[length:var(--text-body-md)] text-[var(--color-ink)]"
              >
                {text}
              </SelectItem>
            );
          })}
        </SelectContent>
      </SelectRoot>

      {hint ? (
        <span
          id={describedBy}
          className="text-[length:var(--text-caption)] text-[var(--color-mute)]"
        >
          {hint}
        </span>
      ) : null}
    </div>
  );
}
