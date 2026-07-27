import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Mirrors components/core/Card.jsx.
 *
 * Surface contrast carries elevation — a white card on the sand canvas gets no
 * shadow. Only an `interactive` card lifts 2px and gains --shadow-raised on hover.
 */
const TONE_CLASS = {
  plain: "bg-[var(--color-canvas)] text-[var(--color-ink)] border-transparent",
  sand: "bg-[var(--color-canvas-soft)] text-[var(--color-ink)] border-transparent",
  gold: "bg-[var(--color-primary-pale)] text-[var(--color-ink)] border-transparent",
  ink: "bg-[var(--color-canvas-ink)] text-[var(--color-primary)] border-transparent",
  outline: "bg-[var(--color-canvas)] text-[var(--color-ink)] border-[var(--color-ink)]",
  hairline: "bg-[var(--color-canvas)] text-[var(--color-ink)] border-[var(--color-border)]",
} as const;

export type CardTone = keyof typeof TONE_CLASS;

export type CardProps = Omit<React.ComponentPropsWithoutRef<"div">, "style"> & {
  tone?: CardTone;
  /** Any CSS length. Defaults to the token --card-padding (24px). */
  padding?: string;
  radius?: string;
  interactive?: boolean;
  style?: React.CSSProperties;
};

export function Card({
  tone = "plain",
  padding = "var(--card-padding)",
  radius = "var(--radius-xl)",
  interactive,
  className,
  style,
  children,
  ...rest
}: CardProps) {
  return (
    <div
      className={cn(
        "border transition-[transform,box-shadow] duration-[var(--duration-base)] ease-[var(--ease-out)]",
        TONE_CLASS[tone],
        interactive &&
          "cursor-pointer hover:-translate-y-0.5 hover:shadow-[var(--shadow-raised)]",
        className,
      )}
      style={{ padding, borderRadius: radius, ...style }}
      {...rest}
    >
      {children}
    </div>
  );
}
