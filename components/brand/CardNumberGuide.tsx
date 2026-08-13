import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Where the numbers are on the physical card.
 *
 * The activation step used to ask for "16 ספרות" and "שלוש הספרות בגב הכרטיס" and
 * leave it there. Someone holding an unfamiliar card in one hand and a phone in the
 * other is looking for *which* row of digits — a sentence does not answer that, a
 * picture does. This is the back of the card at a glance, with the two fields the
 * form asks for called out on it.
 *
 * Decorative: the real instruction is the labelled text, which is why the whole
 * figure is aria-hidden and every label is repeated in the field hints.
 */
export function CardNumberGuide({ className }: { className?: string }) {
  return (
    <figure className={cn("m-0 flex flex-col gap-3", className)} aria-hidden="true">
      <div
        className="relative flex w-full flex-col justify-between overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-canvas-ink)] p-4"
        style={{ aspectRatio: "1.9 / 1" }}
      >
        {/* Magnetic stripe */}
        <div className="-mx-4 h-6 bg-[var(--color-on-ink)]/15" />

        <div className="flex flex-col gap-2">
          {/* The 16-digit row */}
          <div className="flex items-center gap-2">
            <span className="rounded-[var(--radius-sm)] bg-[var(--color-primary)] px-2 py-1">
              <span
                className="tnum ltr block text-[clamp(11px,2.6vw,15px)] font-bold tracking-[0.06em] text-[var(--color-ink)]"
                dir="ltr"
              >
                0000 0000 0000 0000
              </span>
            </span>
          </div>

          {/* The verification code, on its own line as it is on the card */}
          <div className="flex items-center gap-2">
            <span className="text-[length:var(--text-caption)] text-[var(--sand-400)]">
              CVV
            </span>
            <span className="rounded-[var(--radius-sm)] bg-[var(--color-primary)] px-2 py-0.5">
              <span
                className="tnum ltr block text-[clamp(11px,2.6vw,15px)] font-bold tracking-[0.06em] text-[var(--color-ink)]"
                dir="ltr"
              >
                000
              </span>
            </span>
          </div>
        </div>
      </div>

      <figcaption className="flex flex-col gap-1.5">
        <span className="flex items-baseline gap-2 text-[length:var(--text-caption)] leading-[1.5] text-[var(--color-body)]">
          <span className="mt-1 size-2 flex-none rounded-full bg-[var(--color-primary)]" />
          <span>
            <b className="text-[var(--color-ink)]">מספר הכרטיס</b> — שורת 16 הספרות הארוכה,
            על גב הכרטיס מתחת לפס המגנטי.
          </span>
        </span>
        <span className="flex items-baseline gap-2 text-[length:var(--text-caption)] leading-[1.5] text-[var(--color-body)]">
          <span className="mt-1 size-2 flex-none rounded-full bg-[var(--color-primary)]" />
          <span>
            <b className="text-[var(--color-ink)]">קוד אימות</b> — שלוש הספרות הקצרות
            שמתחתיה.
          </span>
        </span>
      </figcaption>
    </figure>
  );
}
