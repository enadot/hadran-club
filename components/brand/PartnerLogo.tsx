import * as React from "react";
import { cn } from "@/lib/utils";
import { partnerInitials, type Partner } from "@/lib/data/partners";

/**
 * The partner logo plate — the one place a shop's mark is rendered.
 *
 * Partner logos come from the partner, and none were supplied with the handoff. So
 * every surface that shows a shop (the home-page roster, the directory rows, the
 * detail sheet) renders this: a sand square that holds the logo when there is one
 * and two Hebrew initials in deep gold when there is not. Dropping a file into
 * public/partners/ and setting `logo` on the record is the whole of what it takes
 * to fill it — no other file has to change. See public/partners/README.md.
 *
 * A raw <img> rather than next/image, per the project's standing choice: these are
 * small, already-optimised marks that must not be re-encoded, and the lint rule is
 * disabled for exactly this reason.
 */
export function PartnerLogo({
  partner,
  className,
}: {
  partner: Pick<Partner, "name" | "logo">;
  /** Sizing and radius come from the caller — the plate differs per surface. */
  className?: string;
}) {
  return (
    <span
      className={cn(
        // flex, not grid: a percentage max-height on the logo has to resolve
        // against this box, and it cannot do that inside an auto-sized grid row.
        "flex flex-none items-center justify-center overflow-hidden rounded-[var(--radius-lg)] p-1.5",
        "bg-[var(--color-canvas-soft)] font-[family-name:var(--font-display)]",
        "font-extrabold text-[var(--color-primary-deep)]",
        className,
      )}
    >
      {partner.logo ? (
        // Bounded by max-*, not sized by w/h-full: the plates are not all square
        // (the roster strip's is a wide rectangle), and a logo told to fill one
        // resolves its height against its own aspect ratio and overflows the box.
        // Capped and centred, a mark of any proportion sits inside every plate.
        //
        // Decorative: the shop name is always rendered next to this plate, so an
        // alt text here would have a screen reader say it twice.
        <img src={partner.logo} alt="" className="max-h-full max-w-full object-contain" />
      ) : (
        partnerInitials(partner.name)
      )}
    </span>
  );
}
