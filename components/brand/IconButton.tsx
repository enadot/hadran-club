import * as React from "react";
import { cn } from "@/lib/utils";
import { Icon, type IconName } from "./Icon";

/** Mirrors components/core/IconButton.jsx — circular, 32/40/48px. */
const SIZE_CLASS = { sm: "size-8", md: "size-10", lg: "size-12" } as const;

const VARIANT_CLASS = {
  solid:
    "bg-[var(--color-canvas)] text-[var(--color-ink)] border-transparent hover:bg-[var(--color-canvas-soft)]",
  gold: "bg-[var(--color-primary)] text-[var(--color-on-primary)] border-transparent hover:bg-[var(--color-primary-active)]",
  outline:
    "bg-transparent text-[var(--color-ink)] border-[var(--color-ink)] hover:bg-[var(--color-canvas-soft)]",
  ghost:
    "bg-transparent text-[var(--color-body)] border-transparent hover:bg-[var(--color-canvas-soft)]",
} as const;

export type IconButtonProps = Omit<React.ComponentPropsWithoutRef<"button">, "children"> & {
  icon: IconName;
  size?: keyof typeof SIZE_CLASS;
  variant?: keyof typeof VARIANT_CLASS;
  /** Required — an icon-only button must carry an accessible name. */
  label: string;
};

export function IconButton({
  icon,
  size = "md",
  variant = "solid",
  label,
  className,
  ...rest
}: IconButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      className={cn(
        "inline-flex cursor-pointer items-center justify-center rounded-full border p-0",
        "transition-[background-color,border-color] duration-[var(--duration-base)] ease-[var(--ease-out)]",
        SIZE_CLASS[size],
        VARIANT_CLASS[variant],
        className,
      )}
      {...rest}
    >
      <Icon name={icon} size={size === "sm" ? 16 : 20} />
    </button>
  );
}
