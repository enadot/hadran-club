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
  /** Inset around the artwork. Larger plates want more of it. */
  padding?: string;
  /** "soft" is the sand plate for small marks; "plain" is white, which is what
   *  a large panel needs — most of these logos carry their own white ground,
   *  and a sand plate framed each one in a visible rectangle. */
  tone?: "soft" | "plain";
  className?: string;
};

export function PartnerLogo({
  name,
  src,
  padding = "p-1.5",
  tone = "soft",
  className,
}: PartnerLogoProps) {
  return (
    <span
      className={cn(
        "relative grid place-items-center overflow-hidden rounded-[var(--radius-lg)]",
        tone === "plain" ? "bg-[var(--color-canvas)]" : "bg-[var(--color-canvas-soft)]",
        "font-[family-name:var(--font-display)] font-extrabold text-[var(--color-primary-deep)]",
        className,
      )}
    >
      {src ? (
        // Decorative: the shop's name is always rendered as text beside it.
        //
        // Positioned, not laid out: a percentage height against a parent sized
        // by aspect-ratio resolves to auto in Chrome, so a tall logo rendered
        // at its full width and had its bottom clipped off. inset-0 is a
        // definite box in both axes; the padding is on the image, so
        // object-contain fits inside it.
        <img
          src={src}
          alt=""
          loading="lazy"
          decoding="async"
          className={cn("absolute inset-0 size-full object-contain", padding)}
        />
      ) : (
        partnerInitials(name)
      )}
    </span>
  );
}
