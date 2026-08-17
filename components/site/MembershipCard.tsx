import { SpotlightCard } from "@/components/reactbits/spotlight-card";
import { MEMBERSHIP } from "@/lib/data/membership";
import { cn } from "@/lib/utils";

/**
 * The membership panel on the home page.
 *
 * It has no call to action any more. The club is a benefit of being a Hadran
 * customer, so there is nothing here to order and nobody to sign up — the panel
 * states what the membership is and stops.
 *
 * It carries its own section heading now. It used to sit under an eyebrow, a
 * title and a lead that between them said "no fee" three times before the card
 * repeated it as a price figure — so the heading moved in here and the claim is
 * made once, at display size, where it can carry the section on its own.
 *
 * The four bulleted rows of Lucide glyphs are gone with it. A ticket, a pair of
 * people, a truck and a wallet stacked in a column is the house style of every
 * generated feature list; hairline-separated rows with a gold numeral read as a
 * ledger of what is included, which is what this is. Nothing here animates: the
 * page's one brand moment is the bloom behind the hero artwork.
 */
export type MembershipCardProps = {
  className?: string;
};

export function MembershipCard({ className }: MembershipCardProps) {
  return (
    // Pointer-only warmth on the surface a visitor is deciding on. Nothing moves
    // until a cursor is on the panel, and nothing at all on a phone or under
    // prefers-reduced-motion.
    <SpotlightCard
      spotlightColor="var(--gold-200)"
      size={420}
      // A container, not a media query: this panel is full-width on the home
      // page and sits in a ~600px column inside /activate, and only its own width
      // says which of the two layouts fits.
      className={cn("@container rounded-[var(--radius-2xl)]", className)}
    >
      {/* Gold hairline and gold shadow rather than the sand border every other
          card on the page wears — this is the one surface asking for a decision,
          and it should look like the card it is selling. */}
      <div
        className={cn(
          "relative isolate grid gap-[clamp(24px,4cqi,44px)] overflow-hidden rounded-[var(--radius-2xl)]",
          "border border-[var(--gold-300)] bg-[var(--color-canvas)] shadow-[var(--shadow-gold)]",
          "p-[clamp(24px,4.6cqi,52px)]",
          // Two columns once the panel is 820px wide: the claim and its button
          // stacked in the first column, the list spanning both rows beside them.
          // Narrower than that the source order takes over — claim, list, then the
          // button, so a phone reads what is included before it is asked to decide.
          "@min-[820px]:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)] @min-[820px]:grid-rows-[auto_auto]",
        )}
      >
        {/* A warm bloom behind the one word this section is about — the same
            device that lifts the card artwork in the hero, in the same gold.
            Two stops, not the hero token's four: spread this wide and blurred,
            the token's intermediate stops banded into visible rings. */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-[34%] -z-10 h-[min(105%,540px)] w-[min(72%,600px)] bg-[radial-gradient(closest-side,var(--gold-200),transparent)] blur-[40px] ltr:-left-[14%] rtl:-right-[14%]"
        />

        {/* ── The claim ─────────────────────────────────────────────────── */}
        <div className="flex flex-col items-start gap-[clamp(10px,1.6cqi,14px)] @min-[820px]:col-start-1 @min-[820px]:row-start-1 @min-[820px]:self-end">
          <span className="text-[13px] font-bold tracking-[var(--tracking-wide)] text-[var(--color-primary-deep)]">
            {MEMBERSHIP.eyebrow}
          </span>

          <h2 className="m-0 font-[family-name:var(--font-display)] font-extrabold">
            {/* Gold at display size only. The token is never used for small text
                on canvas; at 48px and up it clears AA with room to spare. */}
            <span className="block text-[clamp(48px,10.5cqi,104px)] leading-[0.92] tracking-[-0.02em] text-[var(--color-primary-deep)]">
              {MEMBERSHIP.headline}
            </span>
            <span className="block text-[clamp(23px,4cqi,38px)] leading-[1.15] text-[var(--color-ink)]">
              {MEMBERSHIP.headlineTail}
            </span>
          </h2>
        </div>

        {/* ── What is included ──────────────────────────────────────────── */}
        <ul className="m-0 flex list-none flex-col p-0 @min-[820px]:col-start-2 @min-[820px]:row-span-2 @min-[820px]:row-start-1 @min-[820px]:self-center">
          {MEMBERSHIP.includes.map((text, i) => (
            <li
              key={text}
              className="flex items-baseline gap-[clamp(14px,2.4cqi,24px)] border-t border-[var(--color-border)] py-[clamp(14px,2.2cqi,20px)] last:border-b"
            >
              <span
                aria-hidden
                className="tnum flex-none font-[family-name:var(--font-display)] text-[clamp(16px,2cqi,20px)] leading-none font-extrabold text-[var(--color-primary-deep)]"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-[clamp(16px,1.8cqi,19px)] leading-[1.5] text-[var(--color-ink)]">
                {text}
              </span>
            </li>
          ))}
        </ul>

        {/* ── The fine print ────────────────────────────────────────────── */}
        <div className="flex flex-col items-start gap-3 @min-[820px]:col-start-1 @min-[820px]:row-start-2">
          {/* Everything the old eyebrow, lead and two of the bullets were saying,
              in one line. Each term holds together on its own line so a narrow
              screen breaks between them rather than mid-phrase. */}
          <span className="flex flex-wrap items-baseline gap-x-2 text-[length:var(--text-body-sm)] leading-[1.6] text-[var(--color-mute)]">
            {MEMBERSHIP.terms.map((term, i) => (
              <span key={term} className="whitespace-nowrap">
                {term}
                {i < MEMBERSHIP.terms.length - 1 ? (
                  <span aria-hidden className="ms-2 text-[var(--sand-400)]">
                    ·
                  </span>
                ) : null}
              </span>
            ))}
          </span>
        </div>
      </div>
    </SpotlightCard>
  );
}
