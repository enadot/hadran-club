import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * A full-width horizontal band. Bands alternate sand → white → sand; a single ink
 * band is allowed per page and is reserved for the footer or one promo card.
 *
 * Vertical rhythm is `clamp(56px,9vw,112px)`, up from the prototypes'
 * `clamp(37px,7.1vw,64px)`. 64px between two full sections reads as a list of
 * blocks; the air is what separates them into distinct arguments, and it is the
 * cheapest way to buy the page the room a premium brand is supposed to have.
 * Horizontal padding is unchanged at `clamp(16px,4vw,24px)`.
 */
const TONE_CLASS = {
  white: "bg-[var(--color-canvas)]",
  sand: "bg-[var(--color-canvas-soft)]",
  warm: "bg-[var(--color-canvas-warm)]",
  ink: "bg-[var(--color-canvas-ink)] text-[var(--color-on-ink)]",
} as const;

export type BandProps = React.ComponentPropsWithoutRef<"section"> & {
  tone?: keyof typeof TONE_CLASS;
  /** Set false when the band needs its own vertical padding. */
  padded?: boolean;
};

export function Band({ tone = "white", padded = true, className, children, ...rest }: BandProps) {
  return (
    <section
      className={cn(
        TONE_CLASS[tone],
        padded && "px-[clamp(16px,4vw,24px)] py-[clamp(56px,9vw,112px)]",
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

/** The small caps-style label above a section heading — 13px, bold, +0.08em. */
export function Eyebrow({ className, children, ...rest }: React.ComponentPropsWithoutRef<"span">) {
  return (
    <span
      className={cn(
        "text-[13px] font-bold tracking-[var(--tracking-wide)] text-[var(--color-primary-deep)]",
        className,
      )}
      {...rest}
    >
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
    <h2 className={cn("m-0 text-[clamp(27px,6vw,44px)]", className)} {...rest}>
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
      className={cn("m-0 text-[clamp(16px,2.4vw,19px)] text-[var(--color-body)]", className)}
      {...rest}
    >
      {children}
    </p>
  );
}
