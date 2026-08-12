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
import { branchLabel, partnerInitials, type Partner } from "@/lib/data/partners";

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
  onOpenChange,
}: {
  partner: Partner | null;
  onOpenChange: (open: boolean) => void;
}) {
  const tier = partner ? BENEFIT_TIERS[partner.tier] : null;

  return (
    <Dialog open={!!partner} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[calc(100dvh-2rem)] gap-0 overflow-y-auto p-0 sm:max-w-[520px]">
        {partner && tier ? (
          <>
            <DialogHeader className="flex flex-col gap-4 border-b border-[var(--color-border)] p-[clamp(20px,5vw,28px)] text-start sm:text-start">
              <div className="flex items-start gap-4">
                <span className="grid size-14 flex-none place-items-center overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-canvas-soft)] font-[family-name:var(--font-display)] text-xl font-extrabold text-[var(--color-primary-deep)]">
                  {partnerInitials(partner.name)}
                </span>
                <div className="flex min-w-0 flex-1 flex-col gap-1">
                  <DialogTitle className="font-[family-name:var(--font-display)] text-[clamp(20px,3.6vw,26px)] leading-[1.2] font-extrabold">
                    {partner.name}
                  </DialogTitle>
                  <DialogDescription className="text-[length:var(--text-body-sm)] text-[var(--color-mute)]">
                    {partner.category} · {partner.city}
                  </DialogDescription>
                </div>
              </div>

              <Badge tone={tier.tone} icon={tier.icon} className="self-start">
                {tier.label}
              </Badge>
            </DialogHeader>

            <div className="flex flex-col gap-6 p-[clamp(20px,5vw,28px)]">
              <div className="flex flex-col gap-2">
                <span className="text-[length:var(--text-caption)] font-bold tracking-[var(--tracking-wide)] text-[var(--color-mute)]">
                  ההטבה
                </span>
                <b className="text-[clamp(17px,2.6vw,20px)] leading-[1.4]">{partner.benefit}</b>
                <span className="text-[length:var(--text-body-sm)] leading-[1.6] text-[var(--color-body)]">
                  {tier.description}
                </span>
              </div>

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

              <div className="flex items-center gap-2.5 border-t border-[var(--color-border)] pt-5 text-[length:var(--text-body-sm)] text-[var(--color-body)]">
                <Icon name="map-pin" size={18} color="var(--color-primary-deep)" />
                <span>{branchLabel(partner.branches)} · {partner.city}</span>
              </div>

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
                    אין לי כרטיס עדיין
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
