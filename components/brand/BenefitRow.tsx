import * as React from "react";
import { cn } from "@/lib/utils";
import { Icon, type IconName } from "./Icon";

/**
 * Mirrors components/brand/BenefitRow.jsx — the purchase / activity row.
 * Savings are always framed as a positive gain in green, never a negative number.
 */
export type BenefitRowProps = React.ComponentPropsWithoutRef<"div"> & {
  title?: React.ReactNode;
  meta?: React.ReactNode;
  amount?: React.ReactNode;
  saved?: React.ReactNode;
  icon?: IconName;
  divider?: boolean;
};

export function BenefitRow({
  title,
  meta,
  amount,
  saved,
  icon = "shopping-bag",
  divider = true,
  className,
  ...rest
}: BenefitRowProps) {
  return (
    <div
      className={cn(
        // The gap tightens and the icon disc shrinks below 480px: title, amount and
        // saving all have to share a card that is only ~250px wide inside at 320px.
        "flex items-center gap-3 py-[var(--space-lg)] min-[480px]:gap-[var(--space-lg)]",
        "font-[family-name:var(--font-ui)]",
        divider ? "border-b border-[var(--color-border)]" : "border-b-0",
        className,
      )}
      {...rest}
    >
      <span className="grid size-10 shrink-0 place-items-center rounded-full bg-[var(--color-canvas-soft)] min-[480px]:size-11">
        <Icon name={icon} size={20} color="var(--color-primary-deep)" />
      </span>

      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="text-[length:var(--text-body-md)] font-bold">{title}</span>
        {meta ? (
          <span className="text-[length:var(--text-body-sm)] text-[var(--color-mute)]">{meta}</span>
        ) : null}
      </span>

      <span className="flex shrink-0 flex-col items-end gap-0.5">
        {amount ? (
          <span className="tnum text-[length:var(--text-body-md)] font-bold">{amount}</span>
        ) : null}
        {saved ? (
          <span className="tnum text-[length:var(--text-body-sm)] font-semibold text-[var(--color-positive)]">
            {saved}
          </span>
        ) : null}
      </span>
    </div>
  );
}
