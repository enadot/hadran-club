import Link from "next/link";
import { FOOTER_COLUMNS, FOOTER_NOTE, LEGAL_LINE, OPERATOR_LINE } from "@/lib/data/site";

/**
 * Mirrors components/navigation/Footer.jsx plus the legal strip that every screen
 * renders beneath it.
 *
 * The ink band is the one dark surface the design system allows per page, and it is
 * reserved for the footer. The desktop grid is `1.4fr repeat(3, 1fr)`; the
 * prototype's media queries collapse it to two columns at 880px and one at 560px.
 */
export function Footer() {
  return (
    <>
      <footer className="bg-[var(--color-canvas-ink)] px-[var(--space-xl)] py-[var(--space-3xl)] font-[family-name:var(--font-ui)] text-[var(--color-on-ink)]">
        <div className="mx-auto grid max-w-[var(--container-max)] grid-cols-1 gap-[22px] min-[560px]:grid-cols-2 min-[560px]:gap-6 min-[880px]:grid-cols-[1.4fr_repeat(3,1fr)] min-[880px]:gap-[var(--space-2xl)]">
          <div className="flex flex-col gap-[var(--space-lg)]">
            <img
              src="/logo-lockup-on-dark.svg"
              alt="הדרן קלאב"
              className="h-11 self-start"
              width={842}
              height={44}
            />
            <p className="max-w-[320px] text-[length:var(--text-body-sm)] leading-[var(--lh-body-md)] text-[var(--sand-400)]">
              {FOOTER_NOTE}
            </p>
          </div>

          {FOOTER_COLUMNS.map((column) => (
            <div key={column.title} className="flex flex-col gap-[var(--space-md)]">
              <h4 className="m-0 font-[family-name:var(--font-ui)] text-[length:var(--text-body-sm)] font-bold tracking-[var(--tracking-wide)] text-[var(--color-primary)]">
                {column.title}
              </h4>
              {column.links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-[length:var(--text-body-sm)] text-[var(--sand-300)] no-underline transition-colors duration-[var(--duration-fast)] ease-[var(--ease-out)] hover:text-[var(--color-primary)] hover:underline hover:underline-offset-[3px]"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          ))}
        </div>
      </footer>

      <div className="border-t border-[rgba(241,236,227,.12)] bg-[var(--color-canvas-ink)] px-[clamp(16px,4vw,24px)] py-[18px]">
        <div className="mx-auto flex max-w-[var(--container-max)] flex-wrap justify-between gap-4 text-[length:var(--text-caption)] text-[var(--sand-400)]">
          <span>{LEGAL_LINE}</span>
          <span>{OPERATOR_LINE}</span>
        </div>
      </div>
    </>
  );
}
