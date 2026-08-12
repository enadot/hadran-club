import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Mirrors components/brand/MemberCard.jsx — the club's hero image.
 *
 * Credit-card aspect ratio 1.586:1, --radius-2xl (32px), the reserved brand
 * gradient as fill, and --shadow-gold beneath. The gold variant renders the logo
 * mark in ink via brightness(0); the ink variant keeps the gold artwork as-is.
 *
 * The artwork used to print "5%" where `mark` now sits. The benefit is per-merchant,
 * so a single figure embossed on the card was the one claim the card could never
 * keep — and it aged the artwork to whatever the rate happened to be that quarter.
 * The wordmark says the same thing the card is actually for: membership.
 */
export type MemberCardProps = Omit<React.ComponentPropsWithoutRef<"div">, "style"> & {
  holder?: string;
  number?: string;
  tier?: string;
  /** The top-end lockup. Defaults to the club wordmark. */
  mark?: string;
  variant?: "gold" | "ink";
  logoSrc?: string;
  /**
   * Any CSS length. Defaults to `min(400px, 100%)` — the artwork is never wider
   * than its column. The prototype wrote this as `min(400px, calc(100vw - 48px))`,
   * which only holds while the card is the full width of the page: dropped into a
   * two-column grid it stays 400px wide inside a narrower track and pushes the
   * document sideways.
   */
  width?: string | number;
  style?: React.CSSProperties;
};

export function MemberCard({
  holder = "ישראל ישראלי",
  number = "4271 •••• •••• 8032",
  tier = "חבר מועדון",
  mark = "הדרן קלאב",
  variant = "gold",
  logoSrc = "/logo-mark.svg",
  width = "min(400px, 100%)",
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
        <span className="text-[length:var(--text-body-sm)] font-bold tracking-[var(--tracking-wide)] opacity-70">
          {mark}
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
