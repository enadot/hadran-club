import * as React from "react";
import { cn } from "@/lib/utils";
import { Icon, type IconName } from "./Icon";

/** Mirrors components/core/Badge.jsx — 4px/12px pill, 14px semibold. */
const TONE_CLASS = {
  gold: "bg-[var(--color-primary-pale)] text-[var(--color-ink-deep)]",
  positive: "bg-[var(--color-positive-pale)] text-[var(--color-positive-deep)]",
  warning: "bg-[var(--color-warning-pale)] text-[var(--color-warning-deep)]",
  negative: "bg-[var(--color-negative-bg)] text-white",
  neutral: "bg-[var(--color-canvas-soft)] text-[var(--color-body)]",
  ink: "bg-[var(--color-canvas-ink)] text-[var(--color-primary)]",
} as const;

export type BadgeTone = keyof typeof TONE_CLASS;

export type BadgeProps = React.ComponentPropsWithoutRef<"span"> & {
  tone?: BadgeTone;
  icon?: IconName;
};

export function Badge({ tone = "gold", icon, className, children, ...rest }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-[var(--space-xs)] px-3 py-1",
        "rounded-[var(--radius-pill)] font-[family-name:var(--font-ui)]",
        "text-[length:var(--text-body-sm)] font-semibold leading-[var(--lh-body-sm)]",
        TONE_CLASS[tone],
        className,
      )}
      {...rest}
    >
      {icon ? <Icon name={icon} size={14} /> : null}
      {children}
    </span>
  );
}
