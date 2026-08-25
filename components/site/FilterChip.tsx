"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * The filter chip used by /benefits and /faq.
 *
 * Distinct from the design system's `Tag`: this one sits on a white surface, so its
 * resting state is a hairline-bordered white pill rather than a sand one. Selected is
 * ink with gold text. Exactly the `chip(on)` style both prototypes define inline.
 */
export type FilterChipProps = React.ComponentPropsWithoutRef<"button"> & {
  selected?: boolean;
  /**
   * "sm" is for a panel that stacks dozens of them — the filter sheet runs to some
   * fifteen chips over five rows, and at the standing height that alone was most of
   * a short phone's screen. 40px is still a comfortable target for chips packed
   * against each other, and above Material's own 32dp filter chip.
   */
  size?: "md" | "sm";
};

export function FilterChip({
  selected,
  size = "md",
  className,
  children,
  ...rest
}: FilterChipProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      className={cn(
        // min-h-11 keeps the chip on the 44px touch target the design system asks
        // for; the visual height is unchanged on a pointer device.
        "inline-flex cursor-pointer items-center rounded-full border",
        size === "sm"
          ? "min-h-10 px-3.5 py-1.5 text-[14px]"
          : "min-h-11 px-4 py-[9px] text-[length:var(--text-body-sm)]",
        "font-[family-name:var(--font-ui)] font-semibold",
        "transition-[background-color,color,border-color] duration-[var(--duration-fast)] ease-[var(--ease-out)]",
        selected
          ? "border-[var(--color-ink)] bg-[var(--color-ink)] text-[var(--color-primary)]"
          : "border-[var(--color-border)] bg-[var(--color-canvas)] text-[var(--color-body)] hover:bg-[var(--color-canvas-soft)]",
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
