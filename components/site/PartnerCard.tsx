import * as React from "react";
import { Badge } from "@/components/brand/Badge";
import { PartnerLogo } from "@/components/brand/PartnerLogo";
import { BENEFIT_TIERS } from "@/lib/data/benefits";
import { reachLabel } from "@/lib/data/live-benefits";
import { type Partner } from "@/lib/data/partners";
import { cn } from "@/lib/utils";

/**
 * One partner, as a card whose largest element is the logo.
 *
 * The directory used to be text rows with a 56px plate at the start of each,
 * which is the right shape for a list of *facts* — and the wrong one here.
 * These shops are recognised by their mark long before their name is read, so
 * the mark gets the top two thirds of the card and the text sits under it, the
 * way every rewards directory worth copying does it (Rakuten, ShopBack, PayPal).
 *
 * The panel is a fixed 4:3 on a neutral ground: 92 logos of different aspect
 * ratios still line up as one grid, and none is cropped to fit.
 */
export type PartnerCardProps = {
  partner: Partner;
  /** Shows category · city · branches under the name. */
  withMeta?: boolean;
  className?: string;
};

export function PartnerCard({ partner: p, withMeta = true, className }: PartnerCardProps) {
  const meta = p.tier ? BENEFIT_TIERS[p.tier] : null;
  const metaLine = withMeta
    ? [
        p.tier && p.tier !== "exclusive" ? BENEFIT_TIERS[p.tier].label : null,
        // The trade, not the filter group: "חליפות ואופנת גברים" tells a
        // visitor more than "ביגוד והנעלה", which is only there to be filtered on.
        p.trade ?? p.category,
        reachLabel(p),
      ]
        .filter(Boolean)
        .join(" · ")
    : "";

  return (
    <div
      className={cn(
        "flex h-full flex-col overflow-hidden rounded-[var(--radius-xl)] border bg-[var(--color-canvas)]",
        "transition-[border-color,box-shadow,transform] duration-[var(--duration-base)] ease-[var(--ease-out)]",
        // Flat hover: the card rises 2px and its hairline turns gold. It used to
        // gain a drop shadow, which on a grid of twenty tiles put twenty grey
        // smudges on a cream ground the moment a cursor crossed it.
        "group-hover:-translate-y-0.5",
        // An exclusive shop keeps its ink hairline, so it reads as a different
        // class of thing while scrolling past rather than only once the badge
        // is read.
        p.tier === "exclusive"
          ? "border-[var(--color-ink)] group-hover:shadow-[var(--ring-ink)]"
          : "border-[var(--color-border)] group-hover:border-[var(--color-primary-neutral)] group-hover:shadow-[var(--ring-gold)]",
        className,
      )}
    >
      <PartnerLogo
        name={p.name}
        src={p.logo}
        tone="plain"
        className="aspect-[4/3] w-full rounded-none text-[clamp(20px,5vw,28px)]"
        padding="p-[clamp(14px,4vw,22px)]"
      />

      <div className="flex flex-1 flex-col gap-1 border-t border-[var(--color-border)] p-[clamp(12px,3vw,16px)]">
        <div className="flex items-start justify-between gap-2">
          <b className="min-w-0 text-[clamp(14px,2.2vw,16px)] leading-[1.35] text-[var(--color-ink)]">
            {p.name}
          </b>
          {p.tier === "exclusive" && meta ? (
            <Badge
              tone={meta.tone}
              icon={meta.icon}
              className="flex-none text-[length:var(--text-caption)]"
            >
              בלעדי
            </Badge>
          ) : null}
        </div>
        {/* With a card loaded the merchant's own line is the reason the tile is
            worth looking at, so it outranks the trade and the branch count. Two
            lines, because these are prose the merchants wrote at whatever length
            they liked — the whole of it is in the dialog a tap away. */}
        {p.benefit ? (
          <span className="line-clamp-2 text-[length:var(--text-body-sm)] leading-[1.45] font-semibold text-[var(--color-primary-deep)]">
            {p.benefit}
          </span>
        ) : null}

        {metaLine ? (
          <span className="text-[length:var(--text-caption)] leading-[1.4] text-[var(--color-mute)]">
            {metaLine}
          </span>
        ) : null}
      </div>
    </div>
  );
}
