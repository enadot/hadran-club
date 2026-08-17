"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/brand/Badge";
import { Button } from "@/components/brand/Button";
import { Icon } from "@/components/brand/Icon";
import { BENEFIT_TIERS, BENEFIT_DISCLAIMER, EXACT_BENEFIT_CTA } from "@/lib/data/benefits";
import { branchLabel, type Partner } from "@/lib/data/partners";
import { PartnerLogo } from "@/components/brand/PartnerLogo";

/**
 * The partner detail sheet.
 *
 * The FAQ has always promised that per-merchant rules — whether the benefit stacks
 * with a sale, what is excluded by law, whether there is a cap — appear "בכרטיס בית
 * העסק". There was no such card: the directory tile was a dead end. This is it.
 *
 * The shape follows the pattern the category has converged on (Cash App's offer
 * sheet, Grab's deal terms): the benefit as the headline, then the conditions as
 * discrete labelled rows rather than a paragraph of small print, then the action.
 */
export function PartnerDetailDialog({
  partner,
  open,
  onOpenChange,
  restoreFocusTo,
}: {
  partner: Partner | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** The row that opened the dialog, refocused on close. */
  restoreFocusTo?: React.RefObject<HTMLButtonElement | null>;
}) {
  // The partner is held past the close rather than cleared with it. Driving
  // `open` off `partner === null` meant the content unmounted in the same commit
  // as the close, and Radix — which restores focus to whatever was focused when
  // it opened — had nothing left to restore to, so focus fell to <body>.
  const tier = partner?.tier ? BENEFIT_TIERS[partner.tier] : null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-h-[calc(100dvh-2rem)] gap-0 overflow-y-auto p-0 sm:max-w-[520px]"
        // Radix restores focus to its own DialogTrigger. This dialog has none —
        // it is opened from whichever row was clicked — so without this the
        // caret lands on <body> and a keyboard user restarts from the top of the
        // page every time they close a shop.
        onCloseAutoFocus={(e) => {
          const target = restoreFocusTo?.current;
          if (!target) return;
          e.preventDefault();
          target.focus();
        }}
      >
        {partner ? (
          <>
            <DialogHeader className="flex flex-col gap-4 border-b border-[var(--color-border)] p-[clamp(20px,5vw,28px)] text-start sm:text-start">
              <div className="flex items-start gap-4">
                <PartnerLogo
                  name={partner.name}
                  src={partner.logo}
                  className="size-14 flex-none text-xl"
                />
                <div className="flex min-w-0 flex-1 flex-col gap-1">
                  <DialogTitle className="font-[family-name:var(--font-display)] text-[clamp(20px,3.6vw,26px)] leading-[1.2] font-extrabold">
                    {partner.name}
                  </DialogTitle>
                  <DialogDescription className="text-[length:var(--text-body-sm)] text-[var(--color-mute)]">
                    {[partner.trade ?? partner.category, partner.city]
                      .filter(Boolean)
                      .join(" · ") ||
                      "בית עסק שותף"}
                  </DialogDescription>
                </div>
              </div>

              {tier ? (
                <Badge tone={tier.tone} icon={tier.icon} className="self-start">
                  {tier.label}
                </Badge>
              ) : null}
            </DialogHeader>

            <div className="flex flex-col gap-6 p-[clamp(20px,5vw,28px)]">
              <div className="flex flex-col gap-2">
                <span className="text-[length:var(--text-caption)] font-bold tracking-[var(--tracking-wide)] text-[var(--color-mute)]">
                  ההטבה
                </span>
                {partner.benefit ? (
                  <b className="text-[clamp(17px,2.6vw,20px)] leading-[1.4]">{partner.benefit}</b>
                ) : (
                  <b className="text-[clamp(17px,2.6vw,20px)] leading-[1.4]">
                    ההטבה המדויקת מוצגת עם מספר הכרטיס
                  </b>
                )}
                {tier ? (
                  <span className="text-[length:var(--text-body-sm)] leading-[1.6] text-[var(--color-body)]">
                    {tier.description}
                  </span>
                ) : null}
              </div>

              {partner.terms?.length ? (
              <div className="flex flex-col gap-3 border-t border-[var(--color-border)] pt-5">
                <span className="text-[length:var(--text-caption)] font-bold tracking-[var(--tracking-wide)] text-[var(--color-mute)]">
                  התנאים אצל השותף הזה
                </span>
                <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
                  {partner.terms.map((t) => (
                    <li key={t} className="flex items-start gap-2.5">
                      <span className="mt-0.5 flex-none">
                        <Icon name="check" size={17} color="var(--color-primary-deep)" />
                      </span>
                      <span className="text-[length:var(--text-body-sm)] leading-[1.6] text-[var(--color-body)]">
                        {t}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              ) : null}

              {partner.city || partner.branches ? (
                <div className="flex items-center gap-2.5 border-t border-[var(--color-border)] pt-5 text-[length:var(--text-body-sm)] text-[var(--color-body)]">
                  <Icon name="map-pin" size={18} color="var(--color-primary-deep)" />
                  <span>
                    {[partner.branches ? branchLabel(partner.branches) : null, partner.city]
                      .filter(Boolean)
                      .join(" · ")}
                  </span>
                </div>
              ) : null}

              <div className="flex flex-col gap-3 rounded-[var(--radius-lg)] bg-[var(--color-canvas-soft)] p-4">
                <span className="text-[length:var(--text-body-sm)] leading-[1.5] font-semibold">
                  {EXACT_BENEFIT_CTA}
                </span>
                <div className="flex flex-col gap-2.5 min-[420px]:flex-row">
                  <Button as="a" href="/balance" size="sm" className="justify-center">
                    כניסה עם מספר כרטיס
                  </Button>
                  <Button
                    as="a"
                    href="/activate"
                    size="sm"
                    variant="tertiary"
                    className="justify-center"
                  >
                    הפעלת כרטיס
                  </Button>
                </div>
              </div>

              <span className="text-[length:var(--text-caption)] leading-[1.5] text-[var(--color-mute)]">
                {BENEFIT_DISCLAIMER}
              </span>
            </div>
          </>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
