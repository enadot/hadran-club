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
            "w-full rounded-[var(--radius-lg)] border px-4 py-3 shadow-none",
            "h-auto data-[size=default]:h-auto data-[size=default]:min-h-[52px]",
            "border-[var(--color-border)] bg-[var(--color-canvas)]",
            "text-[length:var(--text-body-md)] text-[var(--color-ink)]",
            "transition-[border-color,box-shadow] duration-[var(--duration-base)] ease-[var(--ease-out)]",
            "focus-visible:border-[var(--color-ink)] focus-visible:ring-0 focus-visible:shadow-[var(--focus-ring)]",
            "[&_svg:not([class*='text-'])]:text-[var(--color-mute)]",
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
