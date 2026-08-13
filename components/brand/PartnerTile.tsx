import * as React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "./Badge";

/**
 * Mirrors components/brand/PartnerTile.jsx — the partner directory row.
 *
 * Partner logos come from the partner. None were supplied with the handoff, so the
 * 56px sand square falls back to two Hebrew initials in deep gold, exactly as the
 * design system prescribes. Drop a file in public/partners/ and pass `logoSrc` to
 * replace it.
 */
export type PartnerTileProps = React.ComponentPropsWithoutRef<"div"> & {
  name?: string;
  category?: string;
  /** The benefit tier label, e.g. "הטבה מורחבת". Never a bare percentage. */
  benefit?: string;
  benefitTone?: "neutral" | "gold" | "ink";
  logoSrc?: string;
  initials?: string;
};

export function PartnerTile({
  name,
  category,
  benefit,
  benefitTone = "gold",
  logoSrc,
  initials,
  className,
  ...rest
}: PartnerTileProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-[var(--space-lg)] p-[var(--space-lg)]",
        "rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-canvas)]",
        "cursor-pointer font-[family-name:var(--font-ui)]",
        "transition-[transform,box-shadow] duration-[var(--duration-base)] ease-[var(--ease-out)]",
        "hover:-translate-y-0.5 hover:shadow-[var(--shadow-raised)]",
        className,
      )}
      {...rest}
    >
      <span className="grid size-14 shrink-0 place-items-center overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-canvas-soft)] font-[family-name:var(--font-display)] text-xl font-extrabold text-[var(--color-primary-deep)]">
        {logoSrc ? (
          <img src={logoSrc} alt={name} className="size-full object-contain" />
        ) : (
          (initials ?? (name ?? "").slice(0, 2))
        )}
      </span>

      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="text-[length:var(--text-body-md)] font-bold text-[var(--color-ink)]">
          {name}
        </span>
        <span className="text-[length:var(--text-body-sm)] text-[var(--color-mute)]">
          {category}
        </span>
      </span>

      {benefit ? <Badge tone={benefitTone}>{benefit}</Badge> : null}
    </div>
  );
}
