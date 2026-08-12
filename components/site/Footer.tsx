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
      {/* The same gutter clamp as every band above it — a flat 24px left the footer
          content a step further in than the page it closes on a 320px screen. */}
      <footer className="bg-[var(--color-canvas-ink)] px-[clamp(16px,4vw,24px)] py-[clamp(32px,6vw,48px)] font-[family-name:var(--font-ui)] text-[var(--color-on-ink)]">
        <div className="mx-auto grid max-w-[var(--container-max)] grid-cols-1 gap-[22px] min-[560px]:grid-cols-2 min-[560px]:gap-6 min-[880px]:grid-cols-[1.4fr_repeat(3,1fr)] min-[880px]:gap-[var(--space-2xl)]">
          <div className="flex flex-col gap-[var(--space-lg)]">
            {/* 84×44, matching the artwork's 1330×695.2 viewBox. At the previous
                842×44 the box was ten times too wide, so `max-width: 100%` sized it
                to the column and the lockup rendered centred inside it. */}
            <img
              src="/logo-lockup-on-dark.svg"
              alt="הדרן קלאב"
              className="h-11 w-auto self-start"
              width={84}
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
              {column.links.map((link) => {
                const className =
                  "text-[length:var(--text-body-sm)] text-[var(--sand-300)] no-underline transition-colors duration-[var(--duration-fast)] ease-[var(--ease-out)] hover:text-[var(--color-primary)] hover:underline hover:underline-offset-[3px]";

                // The member area lives on the operator's platform, not here.
                if (link.external) {
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={className}
                    >
                      {link.label}
                    </a>
                  );
                }

                return (
                  <Link key={link.label} href={link.href} className={className}>
                    {link.label}
                  </Link>
                );
              })}
            </div>
          ))}
        </div>
      </footer>

      <div className="border-t border-[rgba(241,236,227,.12)] bg-[var(--color-canvas-ink)] px-[clamp(16px,4vw,24px)] py-[18px]">
        {/* Stacked on a phone: wrapped, these two lines end up ragged against
            opposite edges and read as one broken sentence. */}
        <div className="mx-auto flex max-w-[var(--container-max)] flex-col gap-1.5 text-[length:var(--text-caption)] text-[var(--sand-400)] min-[720px]:flex-row min-[720px]:flex-wrap min-[720px]:justify-between min-[720px]:gap-4">
          <span>{LEGAL_LINE}</span>
          <span>{OPERATOR_LINE}</span>
        </div>
      </div>
    </>
  );
}
