"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Icon, type IconName } from "./Icon";

/**
 * Mirrors components/core/Button.jsx from the design-system bundle.
 *
 * The prototype tracked hover/press in React state; here the same colours are
 * expressed as CSS states so the component needs no client state of its own.
 * Hover goes *lighter* (gold → #f7e8c4), press adds the darker gold plus a 1px
 * downward translate — never a scale-down.
 */
const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-[var(--space-sm)]",
    "font-[family-name:var(--font-ui)] font-semibold",
    "border border-transparent cursor-pointer no-underline whitespace-nowrap",
    "rounded-[var(--radius-xl)]",
    "transition-[background-color,color,border-color] duration-[var(--duration-fast)] ease-[var(--ease-out)]",
    "active:translate-y-px",
    "disabled:cursor-not-allowed disabled:bg-[var(--sand-200)] disabled:text-[var(--color-mute)]",
    "disabled:active:translate-y-0 disabled:border-transparent",
  ],
  {
    variants: {
      variant: {
        primary:
          "bg-[var(--color-primary)] text-[var(--color-on-primary)] hover:bg-[var(--color-primary-active)] active:bg-[var(--gold-400)]",
        secondary:
          "bg-[var(--color-canvas-soft)] text-[var(--color-ink)] hover:bg-[var(--sand-300)] active:bg-[var(--sand-400)]",
        tertiary:
          "bg-[var(--color-canvas)] text-[var(--color-ink)] border-[var(--color-ink)] hover:bg-[var(--color-canvas-soft)] active:bg-[var(--sand-300)]",
        ghost:
          "bg-transparent text-[var(--color-ink)] hover:bg-[var(--color-canvas-soft)] active:bg-[var(--sand-300)]",
        danger:
          "bg-[var(--color-negative)] text-white hover:bg-[var(--color-negative-deep)] active:bg-[var(--color-negative-deep)]",
      },
      size: {
        sm: "text-[length:var(--text-body-sm)] px-4 py-2 rounded-[var(--radius-lg)] min-h-9",
        md: "text-[length:var(--text-button)] px-6 py-3 min-h-12",
        lg: "text-[length:var(--text-body-lg)] px-8 py-4 min-h-14",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: { variant: "primary", size: "md", fullWidth: false },
  },
);

type ButtonBaseProps = {
  icon?: IconName;
  iconAfter?: IconName;
  fullWidth?: boolean;
  className?: string;
  children?: React.ReactNode;
};

type ButtonAsButton = ButtonBaseProps &
  Omit<React.ComponentPropsWithoutRef<"button">, "className"> & { as?: "button" };
type ButtonAsAnchor = ButtonBaseProps &
  Omit<React.ComponentPropsWithoutRef<"a">, "className"> & { as: "a" };

export type ButtonProps = (ButtonAsButton | ButtonAsAnchor) &
  Omit<VariantProps<typeof buttonVariants>, "fullWidth">;

export function Button({
  variant = "primary",
  size = "md",
  icon,
  iconAfter,
  fullWidth,
  as = "button",
  className,
  children,
  ...rest
}: ButtonProps) {
  const iconSize = size === "sm" ? 16 : 20;
  const classes = cn(buttonVariants({ variant, size, fullWidth: !!fullWidth }), className);
  const content = (
    <>
      {icon ? <Icon name={icon} size={iconSize} /> : null}
      {children}
      {iconAfter ? <Icon name={iconAfter} size={iconSize} /> : null}
    </>
  );

  if (as === "a") {
    return (
      <a className={classes} {...(rest as React.ComponentPropsWithoutRef<"a">)}>
        {content}
      </a>
    );
  }

  return (
    <button className={classes} {...(rest as React.ComponentPropsWithoutRef<"button">)}>
      {content}
    </button>
  );
}
