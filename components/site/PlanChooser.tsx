"use client";

import * as React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { SpotlightCard } from "@/components/reactbits/spotlight-card";
import { Badge } from "@/components/brand/Badge";
import { Button } from "@/components/brand/Button";
import { Icon } from "@/components/brand/Icon";
import { PLANS, type PlanId } from "@/lib/data/plans";
import { cn } from "@/lib/utils";

/**
 * The two membership tracks, in one component used twice: as a plain comparison on
 * the home page, and as the selection step inside /activate.
 *
 * Passing `value` makes it a controlled radiogroup — the whole card is the target,
 * which is the only sensible hit area on a phone, and Radix keeps arrow-key
 * navigation and the roving tabindex that the hand-rolled `role="radio"` buttons in
 * the activation flow did not have. Without `value` it renders as a comparison with
 * its own call to action.
 */
export type PlanChooserProps = {
  value?: PlanId;
  onChange?: (id: PlanId) => void;
  className?: string;
};

export function PlanChooser({ value, onChange, className }: PlanChooserProps) {
  const selectable = value !== undefined;

  const cards = PLANS.map((plan) => {
    const on = value === plan.id;
    return (
      // Pointer-only warmth on the surface a visitor is deciding between. Nothing
      // moves until a cursor is on the card, and nothing happens at all on a
      // phone or under prefers-reduced-motion.
      <SpotlightCard
        key={plan.id}
        spotlightColor="var(--gold-200)"
        className="h-full rounded-[var(--radius-xl)]"
      >
      <label
        htmlFor={selectable ? `plan-${plan.id}` : undefined}
        className={cn(
          "flex h-full flex-col gap-4 rounded-[var(--radius-xl)] border p-[clamp(20px,4vw,28px)]",
          "transition-[border-color,background-color] duration-[var(--duration-base)] ease-[var(--ease-out)]",
          selectable && "cursor-pointer",
          on
            ? "border-2 border-[var(--color-ink)] bg-[var(--gold-50)]"
            : "border border-[var(--color-border)] bg-[var(--color-canvas)]",
          // Keeps the two cards the same height when only one carries the flag row.
          !on && selectable && "hover:border-[var(--color-primary-neutral)]",
        )}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            {selectable ? (
              <RadioGroupItem
                id={`plan-${plan.id}`}
                value={plan.id}
                aria-label={`${plan.name} · ${plan.price} ${plan.period}`}
              />
            ) : null}
            <b className="text-[clamp(17px,2.6vw,21px)]">{plan.name}</b>
          </div>
          {plan.flag ? (
            <Badge tone="gold" className="flex-none text-[length:var(--text-caption)]">
              {plan.flag}
            </Badge>
          ) : null}
        </div>

        <div className="flex items-baseline gap-2">
          <span className="tnum font-[family-name:var(--font-display)] text-[clamp(32px,7vw,48px)] leading-none font-extrabold">
            {plan.price}
          </span>
          <span className="text-[length:var(--text-body-sm)] text-[var(--color-mute)]">
            {plan.period}
          </span>
        </div>

        <span className="text-[length:var(--text-body-sm)] leading-[1.6] text-[var(--color-body)]">
          {plan.summary}
        </span>

        <ul className="m-0 flex flex-1 list-none flex-col gap-2.5 border-t border-[var(--color-border)] p-0 pt-4">
          {plan.includes.map((item) => (
            <li key={item.text} className="flex items-start gap-2.5">
              <span className="mt-0.5 flex-none">
                <Icon name={item.icon} size={17} color="var(--color-primary-deep)" />
              </span>
              <span className="text-[length:var(--text-body-sm)] leading-[1.5] text-[var(--color-body)]">
                {item.text}
              </span>
            </li>
          ))}
        </ul>

        {!selectable ? (
          <Button
            as="a"
            href="/activate"
            variant={plan.flag ? "primary" : "tertiary"}
            fullWidth
            className="justify-center"
          >
            להזמנת כרטיס
          </Button>
        ) : null}
      </label>
      </SpotlightCard>
    );
  });

  const grid = cn(
    "grid grid-cols-1 items-stretch gap-4 min-[720px]:grid-cols-2",
    className,
  );

  if (!selectable) return <div className={grid}>{cards}</div>;

  return (
    <RadioGroup
      value={value}
      onValueChange={(v) => onChange?.(v as PlanId)}
      aria-label="בחירת מסלול"
      className={grid}
    >
      {cards}
    </RadioGroup>
  );
}
