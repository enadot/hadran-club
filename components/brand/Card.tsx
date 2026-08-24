import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * A flat panel. Depth is tint, never elevation.
 *
 * The tones are rungs on the surface ladder in styles/tokens/colors.css. A card
 * reads as raised because it sits a rung away from the band behind it — a white
 * card on sand, a pale-gold card on white — which is why none of them carries a
 * shadow. On this warm cream ground a drop shadow desaturates to grey and reads as
 * smudge under the box; the ring tokens do the same job in the palette.
 *
 * `interactive` therefore lifts and takes a gold hairline rather than a shadow. The
 * 2px rise stays: it is the one part of the old hover that was doing real work, and
 * it costs nothing on a compositor.
 */
const TONE_CLASS = {
  plain: "bg-[var(--color-canvas)] text-[var(--color-ink)] border-transparent",
  warm: "bg-[var(--color-canvas-warm)] text-[var(--color-ink)] border-transparent",
  sand: "bg-[var(--color-canvas-soft)] text-[var(--color-ink)] border-transparent",
  pale: "bg-[var(--color-canvas-pale)] text-[var(--color-ink)] border-transparent",
  gold: "bg-[var(--color-primary-pale)] text-[var(--color-ink)] border-transparent",
  ink: "bg-[var(--color-canvas-ink)] text-[var(--color-primary)] border-transparent",
  outline: "bg-[var(--color-canvas)] text-[var(--color-ink)] border-[var(--color-ink)]",
  hairline: "bg-[var(--color-canvas)] text-[var(--color-ink)] border-[var(--color-border)]",
} as const;

export type CardTone = keyof typeof TONE_CLASS;

/** Named steps, so a page stops re-typing the same clamp at every call site. */
const PADDING = {
  sm: "var(--card-padding-sm)",
  md: "var(--card-padding)",
  lg: "var(--card-padding-lg)",
} as const;

export type CardProps = Omit<React.ComponentPropsWithoutRef<"div">, "style"> & {
  tone?: CardTone;
  /** One of the named steps, or any CSS length. Defaults to `md`. */
  padding?: keyof typeof PADDING | (string & {});
  radius?: string;
  interactive?: boolean;
  style?: React.CSSProperties;
};

export function Card({
  tone = "plain",
  padding = "md",
  radius = "var(--radius-xl)",
  interactive,
  className,
  style,
  children,
  ...rest
}: CardProps) {
  const resolvedPadding = padding in PADDING ? PADDING[padding as keyof typeof PADDING] : padding;

  return (
    <div
      className={cn(
        "border transition-[transform,box-shadow,border-color,background-color]",
        "duration-[var(--duration-base)] ease-[var(--ease-out)]",
        TONE_CLASS[tone],
        interactive &&
          "cursor-pointer hover:-translate-y-0.5 hover:border-[var(--color-primary-neutral)] hover:shadow-[var(--ring-gold)]",
        className,
      )}
      style={{ padding: resolvedPadding, borderRadius: radius, ...style }}
      {...rest}
    >
      {children}
    </div>
  );
}
