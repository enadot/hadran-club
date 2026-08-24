import * as React from "react";
import { cn } from "@/lib/utils";
import { Icon, type IconName } from "./Icon";

/**
 * Mirrors components/feedback/EmptyState.jsx.
 * Illustration is not part of the identity — where a picture would go, this sand
 * panel with a gold icon disc goes instead.
 */
export type EmptyStateProps = React.ComponentPropsWithoutRef<"div"> & {
  icon?: IconName;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
};

export function EmptyState({
  icon = "inbox",
  title,
  description,
  action,
  className,
  ...rest
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-[var(--space-md)] text-center",
        "rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-canvas-warm)]",
        "px-[var(--card-padding)] py-[var(--space-3xl)] font-[family-name:var(--font-ui)]",
        className,
      )}
      {...rest}
    >
      <span className="grid size-16 place-items-center rounded-full bg-[var(--color-primary-pale)]">
        <Icon name={icon} size={28} color="var(--color-primary-deep)" />
      </span>
      <h4 className="m-0 font-[family-name:var(--font-display)] text-[length:var(--text-display-xs)] font-extrabold">
        {title}
      </h4>
      {description ? (
        <p className="m-0 max-w-[380px] text-[var(--color-body)]">{description}</p>
      ) : null}
      {action}
    </div>
  );
}
