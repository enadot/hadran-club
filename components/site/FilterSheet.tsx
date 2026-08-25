"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/brand/Button";
import { Select } from "@/components/brand/Select";
import { FilterChip } from "@/components/site/FilterChip";
import { BENEFIT_TIERS, type BenefitTier } from "@/lib/data/benefits";
import { SORT_OPTIONS } from "@/lib/data/partners";

/**
 * Every filter axis except the search box, in one sheet.
 *
 * The bar used to carry all of them inline: a search field and three pickers, which
 * on a phone stacked into four full-width rows. Measured on a 360×740 handset that
 * was 303px of sticky chrome under a 65px nav — half the screen gone, permanently,
 * while scrolling a grid of shops. The directory pattern every rewards app has
 * converged on (Satispay, Klarna, Tabby, Grab, foodpanda, Snoonu) is the opposite:
 * one search row, one control that collapses the rest, and a count on the control so
 * the state is legible without opening anything.
 *
 * Changes apply as they are made rather than on a submit — the filters are already
 * URL-synced and the list behind the sheet is live — so the primary button is not
 * "apply" but the count itself, the way Instagram, CVS and Best Buy word it: press it
 * to go look at what you just narrowed to.
 */
export type FilterSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  city: string;
  category: string;
  tier: BenefitTier | "all";
  sort: string;
  cityOptions: { value: string; label: string }[];
  categoryOptions: string[];
  /** The tiers present in the list on screen, or empty where none carries one. */
  tiers: BenefitTier[];
  /** How many partners the current selection leaves. */
  resultCount: number;
  activeCount: number;
  onChange: (patch: {
    city?: string;
    cat?: string;
    tier?: BenefitTier | "all";
    sort?: string;
  }) => void;
  onReset: () => void;
};

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <span className="text-[length:var(--text-caption)] font-bold tracking-[var(--tracking-wide)] text-[var(--color-mute)]">
        {title}
      </span>
      {children}
    </div>
  );
}

export function FilterSheet({
  open,
  onOpenChange,
  city,
  category,
  tier,
  sort,
  cityOptions,
  categoryOptions,
  tiers,
  resultCount,
  activeCount,
  onChange,
  onReset,
}: FilterSheetProps) {
  const allCategories = categoryOptions[0];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[calc(100dvh-2rem)] gap-0 overflow-hidden p-0 sm:max-w-[520px]">
        <DialogHeader className="border-b border-[var(--color-border)] p-[clamp(20px,5vw,26px)] text-start sm:text-start">
          <DialogTitle className="font-[family-name:var(--font-display)] text-[clamp(19px,3.4vw,24px)] leading-[1.2] font-extrabold">
            סינון ומיון
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-7 overflow-y-auto p-[clamp(20px,5vw,26px)]">
          <Group title="מיון">
            <div className="flex flex-wrap gap-2">
              {SORT_OPTIONS.map((o) => (
                <FilterChip
                  key={o.value}
                  selected={sort === o.value}
                  onClick={() => onChange({ sort: o.value })}
                >
                  {/* The bar had to say "מיון:" inside the picker to explain itself.
                      Under a heading that already says it, the prefix is noise. */}
                  {o.label.replace(/^מיון:\s*/, "")}
                </FilterChip>
              ))}
            </div>
          </Group>

          {tiers.length ? (
            <Group title="סוג ההטבה">
              <div className="flex flex-wrap gap-2">
                <FilterChip selected={tier === "all"} onClick={() => onChange({ tier: "all" })}>
                  הכל
                </FilterChip>
                {tiers.map((t) => (
                  <FilterChip
                    key={t}
                    selected={tier === t}
                    onClick={() => onChange({ tier: t })}
                  >
                    {BENEFIT_TIERS[t].label}
                  </FilterChip>
                ))}
              </div>
            </Group>
          ) : null}

          <Group title="קטגוריה">
            <div className="flex flex-wrap gap-2">
              {categoryOptions.map((c) => (
                <FilterChip
                  key={c}
                  selected={category === c}
                  onClick={() => onChange({ cat: c })}
                >
                  {c === allCategories ? "הכל" : c}
                </FilterChip>
              ))}
            </div>
          </Group>

          {/* A card's list reaches some eighty towns. Chips would be a wall of them;
              this is the one axis that stays a picker. */}
          <Group title="עיר">
            <Select
              options={cityOptions}
              value={city}
              aria-label="סינון לפי עיר"
              onValueChange={(v) => onChange({ city: v })}
            />
          </Group>
        </div>

        <div className="flex items-center gap-3 border-t border-[var(--color-border)] bg-[var(--color-canvas)] p-[clamp(16px,4vw,20px)]">
          {activeCount > 0 ? (
            <Button variant="ghost" icon="x" onClick={onReset} className="flex-none">
              ניקוי
            </Button>
          ) : null}
          <Button fullWidth className="justify-center" onClick={() => onOpenChange(false)}>
            {resultCount === 0
              ? "אין בתי עסק בסינון הזה"
              : `הצגת ${resultCount} ${resultCount === 1 ? "בית עסק" : "בתי עסק"}`}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
