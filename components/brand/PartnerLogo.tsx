import * as React from "react";
import { cn } from "@/lib/utils";
import { partnerInitials } from "@/lib/data/partners";

/**
 * The plate a partner's logo sits on.
 *
 * The logos arrive as the partners supplied them — mixed backgrounds, mixed
 * aspect ratios, some with the trade name baked in. `object-contain` on a
 * neutral canvas-soft square is what keeps a row of them from turning into a
 * ransom note: no logo is cropped, none is stretched, and the plate rather than
 * the artwork sets the rhythm of the list. Padding keeps the darker logos off
 * the plate's edge so they read as artwork rather than as a filled tile.
 *
 * Without a file it falls back to the two Hebrew initials the design system
 * prescribes, so a partner added before its logo arrives still renders.
 */
export type PartnerLogoProps = {
  name: string;
  src?: string;
  className?: string;
};

export function PartnerLogo({ name, src, className }: PartnerLogoProps) {
  return (
    <span
      className={cn(
        "grid place-items-center overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-canvas-soft)]",
        "font-[family-name:var(--font-display)] font-extrabold text-[var(--color-primary-deep)]",
        className,
      )}
    >
      {src ? (
        // Decorative: the shop's name is always rendered as text beside it.
        <img
          src={src}
          alt=""
          loading="lazy"
          decoding="async"
          className="size-full object-contain p-1.5"
        />
      ) : (
        partnerInitials(name)
      )}
    </span>
  );
}
