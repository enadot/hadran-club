import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Mirrors components/brand/MemberCard.jsx — the club's hero image.
 *
 * Credit-card aspect ratio 1.586:1, --radius-2xl (32px), the reserved brand
 * gradient as fill, and --shadow-gold beneath. The gold variant renders the logo
 * mark in ink via brightness(0); the ink variant keeps the gold artwork as-is.
 */
export type MemberCardProps = Omit<React.ComponentPropsWithoutRef<"div">, "style"> & {
  holder?: string;
  number?: string;
  tier?: string;
  discount?: string;
  variant?: "gold" | "ink";
  logoSrc?: string;
  /** Any CSS length — the prototype passes e.g. "min(400px, calc(100vw - 48px))". */
  width?: string | number;
  style?: React.CSSProperties;
};

export function MemberCard({
  holder = "ישראל ישראלי",
  number = "4271 •••• •••• 8032",
  tier = "חבר מועדון",
  discount = "5%",
  variant = "gold",
  logoSrc = "/logo-mark.svg",
  width = 400,
  className,
  style,
  ...rest
}: MemberCardProps) {
  const dark = variant === "ink";
  return (
    <div
      className={cn(
        "relative flex flex-col justify-between overflow-hidden",
        "rounded-[var(--radius-2xl)] p-[var(--space-xl)]",
        "font-[family-name:var(--font-ui)] shadow-[var(--shadow-gold)]",
        dark
          ? "bg-[var(--color-canvas-ink)] text-[var(--color-primary)]"
          : "bg-[image:var(--gradient-brand)] text-[var(--color-ink)]",
        className,
      )}
      style={{ width, aspectRatio: "1.586 / 1", ...style }}
      {...rest}
    >
      <div className="flex items-start justify-between">
        <img
          src={logoSrc}
          alt=""
          className="h-[46px]"
          style={{ filter: dark ? "none" : "brightness(0)", opacity: dark ? 1 : 0.85 }}
        />
        <span className="font-[family-name:var(--font-display)] text-[length:var(--text-display-sm)] font-extrabold leading-none tracking-[-0.02em]">
          {discount}
        </span>
      </div>

      <div className="flex items-end justify-between gap-[var(--space-lg)]">
        <div className="flex flex-col gap-1">
          <span className="text-[length:var(--text-caption)] tracking-[var(--tracking-wide)] opacity-70">
            {tier}
          </span>
          <span className="text-[length:var(--text-body-lg)] font-bold">{holder}</span>
          <span className="tnum ltr text-[length:var(--text-body-sm)] opacity-75">{number}</span>
        </div>
      </div>
    </div>
  );
}
