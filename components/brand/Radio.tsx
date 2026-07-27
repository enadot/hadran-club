"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/** Mirrors components/forms/Radio.jsx — 22px ring, 12px deep-gold dot when on. */
export type RadioProps = Omit<React.ComponentPropsWithoutRef<"input">, "type" | "style"> & {
  label?: React.ReactNode;
  description?: React.ReactNode;
  style?: React.CSSProperties;
};

export function Radio({ label, description, checked, className, style, ...rest }: RadioProps) {
  return (
    <label
      className={cn(
        "relative flex cursor-pointer items-start gap-[var(--space-md)]",
        "font-[family-name:var(--font-ui)]",
        className,
      )}
      style={style}
    >
      <input type="radio" checked={checked} className="absolute size-0 opacity-0" {...rest} />
      <span
        aria-hidden="true"
        className={cn(
          "mt-px inline-flex size-[22px] shrink-0 items-center justify-center rounded-full border",
          "bg-[var(--color-canvas)] transition-[border-color] duration-[var(--duration-base)] ease-[var(--ease-out)]",
          checked ? "border-[var(--color-ink)]" : "border-[var(--color-border)]",
        )}
      >
        {checked ? <span className="size-3 rounded-full bg-[var(--color-primary-deep)]" /> : null}
      </span>
      <span className="flex flex-col gap-0.5">
        <span className="text-[length:var(--text-body-md)] font-semibold text-[var(--color-ink)]">
          {label}
        </span>
        {description ? (
          <span className="text-[length:var(--text-body-sm)] text-[var(--color-mute)]">
            {description}
          </span>
        ) : null}
      </span>
    </label>
  );
}
