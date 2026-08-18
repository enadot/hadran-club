"use client";

import * as React from "react";
import { Button } from "@/components/brand/Button";
import { PartnerCard } from "@/components/site/PartnerCard";
import { PartnerDetailDialog } from "@/components/site/PartnerDetailDialog";
import {
  BENEFIT_DISCLAIMER,
  BENEFIT_TIERS,
  EXACT_BENEFIT_CTA,
  type BenefitTier,
} from "@/lib/data/benefits";
import { PARTNERS, type Partner } from "@/lib/data/partners";

const TIER_RANK: Record<BenefitTier, number> = { exclusive: 0, deep: 1, basic: 2 };

/**
 * The partner directory — "מנוע החיסכון האישי" in the brief.
 *
 * The search box, the selects and the tier chips are out for now: the list is
 * short enough to scan whole, and the filter rail cost more attention than it
 * saved. The directory keeps the club's own order — exclusive shops first, then
 * depth, then name — and every card opens the detail sheet.
 */
export function PartnerBrowser() {
  const [selected, setSelected] = React.useState<Partner | null>(null);
  const [detailOpen, setDetailOpen] = React.useState(false);
  const lastTrigger = React.useRef<HTMLButtonElement | null>(null);

  const shown = React.useMemo(
    () =>
      [...PARTNERS].sort(
        (a, b) =>
          // Partners without a tier sort last rather than first: an unranked
          // shop is not the club's pick, it is a shop we have no depth for yet.
          (a.tier ? TIER_RANK[a.tier] : 9) - (b.tier ? TIER_RANK[b.tier] : 9) ||
          a.name.localeCompare(b.name, "he"),
      ),
    [],
  );

  const anyTiered = React.useMemo(() => PARTNERS.some((p) => p.tier), []);

  return (
    <>
      <div className="bg-[var(--color-canvas)] px-[clamp(16px,4vw,24px)] pt-[clamp(16px,3vw,32px)] pb-16">
        <div className="mx-auto flex max-w-[var(--container-max)] flex-col gap-5">
          {/* The logo is the card. Two columns on a phone, up to five on a wide
              screen — a directory of marks a family recognises, not a list of
              names with a stamp beside each. */}
          <ul className="m-0 grid list-none grid-cols-2 gap-3 p-0 min-[560px]:grid-cols-3 min-[900px]:grid-cols-4 min-[1200px]:grid-cols-5 min-[560px]:gap-4">
            {shown.map((p) => (
              <li key={p.name} className="min-w-0">
                <button
                  type="button"
                  onClick={(e) => {
                    lastTrigger.current = e.currentTarget;
                    setSelected(p);
                    setDetailOpen(true);
                  }}
                  aria-label={`${p.name}${
                    p.tier ? ` — ${BENEFIT_TIERS[p.tier].label}` : ""
                  }. פתיחת פרטי ההטבה`}
                  className="group h-full w-full cursor-pointer text-start"
                >
                  <PartnerCard partner={p} />
                </button>
              </li>
            ))}
          </ul>

          {/* The list is a shop window until the member can see their own number on
              it. This is the brief's "הזינו מספר כרטיס לצפייה בהטבה המדויקת שלכם". */}
          <div className="mt-2 flex flex-col gap-4 rounded-[var(--radius-xl)] bg-[var(--color-canvas-soft)] p-[clamp(18px,4vw,28px)] min-[720px]:flex-row min-[720px]:items-center min-[720px]:justify-between">
            <div className="flex flex-col gap-1.5">
              <b className="text-[clamp(17px,2.6vw,20px)]">{EXACT_BENEFIT_CTA}</b>
              <span className="text-[length:var(--text-body-sm)] leading-[1.6] text-[var(--color-body)]">
                {anyTiered
                  ? "הרשימה כאן מציגה את סוג ההטבה. עם מספר הכרטיס רואים את ההטבה המדויקת בכל שותף, כולל החנויות הבלעדיות למועדון."
                  : "עם מספר הכרטיס רואים את ההטבה המדויקת בכל אחד מבתי העסק ברשימה."}
              </span>
            </div>
            <div className="flex flex-col gap-2.5 min-[420px]:flex-row min-[720px]:flex-none">
              <Button as="a" href="/balance" className="justify-center">
                כניסה עם מספר כרטיס
              </Button>
              <Button as="a" href="/activate" variant="tertiary" className="justify-center">
                הפעלת כרטיס
              </Button>
            </div>
          </div>

          <span className="text-[length:var(--text-caption)] text-[var(--color-mute)]">
            {BENEFIT_DISCLAIMER}
          </span>
        </div>
      </div>

      <PartnerDetailDialog
        partner={selected}
        open={detailOpen}
        onOpenChange={setDetailOpen}
        restoreFocusTo={lastTrigger}
      />
    </>
  );
}
