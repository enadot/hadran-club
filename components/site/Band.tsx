import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * A full-width horizontal band.
 *
 * Bands walk the surface ladder in styles/tokens/colors.css rather than alternating
 * two tones. The page used to run white → sand → white → sand from top to bottom,
 * which reads as a stripe pattern: every section looked like the same section again.
 * With `pale` and `wash` on the ladder a page can build a rhythm instead — canvas
 * for the sections that carry copy, a tint where a section is a set of panels, and
 * the one warm gold rung reserved for the section the page is actually about.
 *
 * The ink band stays one per page, for the footer or a single closing promo.
 *
 * The default padding is the prototypes' `clamp(37px,7.1vw,64px) clamp(16px,4vw,24px)`.
 */
const TONE_CLASS = {
  white: "bg-[var(--color-canvas)]",
  warm: "bg-[var(--color-canvas-warm)]",
  sand: "bg-[var(--color-canvas-soft)]",
  pale: "bg-[var(--color-canvas-pale)]",
  wash: "bg-[var(--color-canvas-wash)]",
  ink: "bg-[var(--color-canvas-ink)] text-[var(--color-on-ink)]",
} as const;

export type BandTone = keyof typeof TONE_CLASS;

export type BandProps = React.ComponentPropsWithoutRef<"section"> & {
  tone?: BandTone;
  /** Set false when the band needs its own vertical padding. */
  padded?: boolean;
  /**
   * Draws a hairline on the edge the band shares with the next one. Two adjacent
   * bands a single rung apart (canvas → sand-100) are barely a tint apart, and
   * without a rule the seam between them reads as a rendering artefact rather than
   * a section change.
   */
  divided?: boolean;
};

export function Band({
  tone = "white",
  padded = true,
  divided = false,
  className,
  children,
  ...rest
}: BandProps) {
  return (
    <section
      className={cn(
        TONE_CLASS[tone],
        // The prototypes' 37–64px read cramped once the sections were stacked:
        // every band's own gaps compounded into one dense column. Roughly half
        // again as much air above and below is what separates them into
        // sections a reader can scan.
        padded && "px-[clamp(16px,4vw,24px)] py-[clamp(56px,10vw,104px)]",
        divided && "border-t border-[var(--color-border)]",
        className,
      )}
      {...rest}
    >
      {children}
    </section>
  );
}

/** The 1200px container, or the 760px reading column when `narrow`.
 *  Typed with ComponentProps so callers can attach a ref (React 19 passes `ref`
 *  through as an ordinary prop) — the savings calculator uses it as a GSAP scope. */
export function Container({
  narrow,
  className,
  children,
  ...rest
}: React.ComponentProps<"div"> & { narrow?: boolean }) {
  return (
    <div
      className={cn(
        "mx-auto",
        narrow ? "max-w-[var(--container-narrow)]" : "max-w-[var(--container-max)]",
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}

/**
 * The small label above a section heading.
 *
 * Hebrew has no case, so the uppercase-and-track device that carries an eyebrow in a
 * latin system does half its work here: all that is left is the tracking, and 13px
 * bold gold tracked out on a cream ground looked like a heading that had lost its
 * size rather than a marker above one. The short gold rule gives it back the shape
 * an eyebrow needs — the eye reads the mark, then the label, then the heading.
 *
 * It is a marker, not decoration: nothing else on the site uses --tracking-wide at
 * this size, which is what keeps it recognisable wherever it appears.
 */
export function Eyebrow({
  className,
  children,
  ...rest
}: React.ComponentPropsWithoutRef<"span">) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5",
        "text-[13px] leading-[1.2] font-bold tracking-[var(--tracking-wide)]",
        "text-[var(--color-primary-deep)]",
        className,
      )}
      {...rest}
    >
      <span aria-hidden className="h-px w-6 flex-none bg-[var(--gold-500)]" />
      {children}
    </span>
  );
}

/** Section heading — the prototypes' `clamp(27px,6vw,44px)` display size. */
export function SectionTitle({
  className,
  children,
  ...rest
}: React.ComponentPropsWithoutRef<"h2">) {
  return (
    <h2
      className={cn(
        "m-0 text-[clamp(27px,6vw,44px)] tracking-[var(--tracking-display)]",
        className,
      )}
      {...rest}
    >
      {children}
    </h2>
  );
}

/** Body copy under a section heading — `clamp(16px,2.4vw,19px)`. */
export function SectionLead({
  className,
  children,
  ...rest
}: React.ComponentPropsWithoutRef<"p">) {
  return (
    <p
      className={cn(
        "m-0 max-w-[62ch] text-[clamp(16px,2.4vw,19px)] leading-[1.6] text-[var(--color-body)]",
        className,
      )}
      {...rest}
    >
      {children}
    </p>
  );
}
