import * as React from "react";
import { cn } from "@/lib/utils";
import { Icon, type IconName } from "./Icon";

/**
 * Inline feedback for a request that failed, was refused, or came back with a caveat.
 *
 * Sits above the action it belongs to, never as a floating toast — a member who just
 * pressed a button should not have to look elsewhere to learn what happened.
 */
const TONE = {
  negative: {
    className: "bg-[var(--color-negative-pale)] text-[var(--color-negative-deep)]",
    icon: "circle-alert" as IconName,
    color: "var(--color-negative)",
  },
  warning: {
    className: "bg-[var(--color-warning-pale)] text-[var(--color-warning-deep)]",
    icon: "info" as IconName,
    color: "var(--color-warning-deep)",
  },
  positive: {
    className: "bg-[var(--color-positive-pale)] text-[var(--color-positive-deep)]",
    icon: "circle-check" as IconName,
    color: "var(--color-positive)",
  },
} as const;

export type AlertTone = keyof typeof TONE;

export type AlertProps = React.ComponentPropsWithoutRef<"div"> & {
  tone?: AlertTone;
  icon?: IconName;
};

export function Alert({ tone = "negative", icon, className, children, ...rest }: AlertProps) {
  const t = TONE[tone];
  return (
    <div
      // An error is the answer to something the member just did, so it is announced
      // the moment it lands rather than waiting for the next focus move.
      role={tone === "negative" ? "alert" : "status"}
      className={cn(
        "flex items-start gap-[var(--space-sm)] rounded-[var(--radius-lg)] px-4 py-3.5",
        "font-[family-name:var(--font-ui)] text-[length:var(--text-body-sm)] leading-[1.55] font-semibold",
        t.className,
        className,
      )}
      {...rest}
    >
      <Icon name={icon ?? t.icon} size={18} color={t.color} className="mt-0.5 shrink-0" />
      <span>{children}</span>
    </div>
  );
}
