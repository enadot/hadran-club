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
import { benefitParagraphs, reachLabel } from "@/lib/data/live-benefits";
import { type Partner } from "@/lib/data/partners";
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
  live = false,
}: {
  partner: Partner | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** The row that opened the dialog, refocused on close. */
  restoreFocusTo?: React.RefObject<HTMLButtonElement | null>;
  /** True once a card is loaded: the benefit shown is that card's own, so the
   *  panel asking for a card number has nothing left to ask for. */
  live?: boolean;
}) {
  // The partner is held past the close rather than cleared with it. Driving
  // `open` off `partner === null` meant the content unmounted in the same commit
  // as the close, and Radix — which restores focus to whatever was focused when
  // it opened — had nothing left to restore to, so focus fell to <body>.
  const tier = partner?.tier ? BENEFIT_TIERS[partner.tier] : null;

  const branches = partner?.branchList ?? [];
  const reach = partner ? reachLabel(partner) : null;

  // The claim, then its conditions. A first sentence past ~110 characters is not a
  // headline any more — it is the whole benefit written as one run — so it drops to
  // the reading size with the rest rather than being set at display scale.
  const parts = partner?.benefit ? benefitParagraphs(partner.benefit) : [];
  const [claim, ...conditions] = parts;
  const claimIsHeadline = !!claim && claim.length <= 110;

  // Which shop's branch list is expanded, rather than a boolean — the dialog is one
  // mounted component reused for every shop, and a boolean stayed open when the next
  // one was opened. Naming the shop makes the collapse reset a consequence of the
  // partner changing instead of an effect that has to chase it.
  const [expandedFor, setExpandedFor] = React.useState<string | null>(null);
  const showAllBranches = !!partner && expandedFor === partner.name;

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
              {/* The benefit is what the sheet is for, so it gets a panel of its
                  own — the gold rung of the surface ladder inside a white dialog,
                  which is the one place on the page that treatment is not already
                  spoken for. Set on the flat white it shared with the branch list
                  and the disclaimer, the number a member came here to read carried
                  no more weight than the small print under it. */}
              <div className="flex flex-col gap-3 rounded-[var(--radius-lg)] border border-[var(--gold-300)] bg-[var(--color-canvas-pale)] p-[clamp(16px,4vw,22px)]">
                <span className="text-[length:var(--text-caption)] font-bold tracking-[var(--tracking-wide)] text-[var(--color-primary-deep)]">
                  ההטבה
                </span>

                {claim ? (
                  <p
                    className={
                      claimIsHeadline
                        ? "m-0 font-[family-name:var(--font-display)] text-[clamp(22px,4.6vw,30px)] leading-[1.25] font-extrabold tracking-[var(--tracking-display-sm)] text-[var(--color-ink)]"
                        : "m-0 text-[clamp(17px,2.8vw,20px)] leading-[1.6] font-semibold text-[var(--color-ink)]"
                    }
                  >
                    {claim}
                  </p>
                ) : (
                  <p className="m-0 text-[clamp(19px,3.4vw,24px)] leading-[1.3] font-bold text-[var(--color-ink)]">
                    ההטבה המדויקת מוצגת עם מספר הכרטיס
                  </p>
                )}

                {conditions.length ? (
                  <div className="flex flex-col gap-2 border-t border-[var(--gold-300)] pt-3">
                    {conditions.map((c, i) => (
                      <p
                        key={`${i}-${c.slice(0, 12)}`}
                        className="m-0 text-[clamp(15px,2.4vw,17px)] leading-[1.7] text-[var(--color-body)]"
                      >
                        {c}
                      </p>
                    ))}
                  </div>
                ) : null}

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

              {reach || partner.branchList?.length ? (
                <div className="flex flex-col gap-3 border-t border-[var(--color-border)] pt-5">
                  {reach ? (
                    <div className="flex items-center gap-2.5 text-[length:var(--text-body-sm)] text-[var(--color-body)]">
                      <Icon name="map-pin" size={18} color="var(--color-primary-deep)" />
                      <span>{reach}</span>
                    </div>
                  ) : null}

                  {/* A chain can run to forty addresses. Six is enough to answer
                      "is there one near me", and the rest are one press away
                      rather than a scroll the dialog has to absorb. */}
                  {branches.length ? (
                    <>
                      <ul className="m-0 flex list-none flex-col gap-2 p-0">
                        {(showAllBranches ? branches : branches.slice(0, 6)).map((b, i) => {
                          const title = b.name || b.city || b.address || "";
                          const detail = [b.address, b.city && b.city !== title ? b.city : null]
                            .filter(Boolean)
                            .join(", ");
                          return (
                            <li
                              key={`${title}-${b.address ?? ""}-${i}`}
                              className="flex flex-col gap-0.5 rounded-[var(--radius-md)] bg-[var(--color-canvas-soft)] px-3.5 py-2.5"
                            >
                              <b className="text-[length:var(--text-body-sm)] leading-[1.4]">{title}</b>
                              {detail ? (
                                <span className="text-[length:var(--text-caption)] leading-[1.45] text-[var(--color-mute)]">
                                  {detail}
                                </span>
                              ) : null}
                              {b.hours ? (
                                <span className="text-[length:var(--text-caption)] leading-[1.45] text-[var(--color-mute)]">
                                  {b.hours}
                                </span>
                              ) : null}
                            </li>
                          );
                        })}
                      </ul>
                      {branches.length > 6 ? (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="self-start"
                          iconAfter={showAllBranches ? "chevron-up" : "chevron-down"}
                          onClick={() =>
                            setExpandedFor(showAllBranches ? null : (partner.name ?? null))
                          }
                        >
                          {showAllBranches
                            ? "הצגת פחות סניפים"
                            : `הצגת כל ${branches.length} הסניפים`}
                        </Button>
                      ) : null}
                    </>
                  ) : null}
                </div>
              ) : null}

              {live ? null : (
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
              )}

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
