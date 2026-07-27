"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Icon } from "./Icon";

/**
 * Mirrors components/core/Tag.jsx — the filter chip. Selected flips to ink with
 * gold text; unselected hovers one step darker (sand → sand-300).
 *
 * Rendered as a <button> rather than the prototype's <span> so chips are
 * keyboard-reachable, which the filter bars on /benefits and /faq rely on.
 */
export type TagProps = Omit<React.ComponentPropsWithoutRef<"button">, "children"> & {
  selected?: boolean;
  onRemove?: () => void;
  children?: React.ReactNode;
};

export function Tag({ selected, onRemove, className, children, ...rest }: TagProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      className={cn(
        "inline-flex items-center gap-[var(--space-sm)] px-3.5 py-1.5",
        "rounded-[var(--radius-pill)] border border-transparent",
        "font-[family-name:var(--font-ui)] text-[length:var(--text-body-sm)] font-semibold",
        "cursor-pointer transition-[background-color,color] duration-[var(--duration-base)] ease-[var(--ease-out)]",
        selected
          ? "bg-[var(--color-ink)] text-[var(--color-primary)]"
          : "bg-[var(--color-canvas-soft)] text-[var(--color-ink)] hover:bg-[var(--sand-300)]",
        className,
      )}
      {...rest}
    >
      {children}
      {onRemove ? (
        <span
          role="button"
          tabIndex={-1}
          aria-label="הסרה"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="cursor-pointer opacity-60"
        >
          <Icon name="x" size={14} />
        </span>
      ) : null}
    </button>
  );
}
