import * as React from "react";
import { cn } from "@/lib/utils";
import { Icon, type IconName } from "./Icon";

/** Mirrors components/brand/StatBlock.jsx. */
const TONE_CLASS = {
  plain: "bg-transparent text-[var(--color-ink)] p-0",
  sand: "bg-[var(--color-canvas-soft)] text-[var(--color-ink)] p-[var(--card-padding)]",
  gold: "bg-[var(--color-primary-pale)] text-[var(--color-ink)] p-[var(--card-padding)]",
  ink: "bg-[var(--color-canvas-ink)] text-[var(--color-primary)] p-[var(--card-padding)]",
} as const;

export type StatBlockTone = keyof typeof TONE_CLASS;

export type StatBlockProps = React.ComponentPropsWithoutRef<"div"> & {
  /** Accepts a node so the pages can drop a <NumberTicker> in place of a string. */
  value?: React.ReactNode;
  label?: React.ReactNode;
  sublabel?: React.ReactNode;
  icon?: IconName;
  tone?: StatBlockTone;
  align?: "start" | "center";
};

export function StatBlock({
  value,
  label,
  sublabel,
  icon,
  tone = "plain",
  align = "start",
  className,
  ...rest
}: StatBlockProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-[var(--space-xs)] rounded-[var(--radius-xl)]",
        "font-[family-name:var(--font-ui)]",
        align === "center" ? "items-center text-center" : "items-start text-start",
        TONE_CLASS[tone],
        className,
      )}
      {...rest}
    >
      {icon ? (
        <Icon
          name={icon}
          size={24}
          color="var(--color-primary-deep)"
          style={{ marginBottom: "var(--space-sm)" }}
        />
      ) : null}
      {/* Scales down to --text-display-sm on a phone: at the token 40px a five-figure
          number no longer fits a half-width column at 320px. */}
      <span className="tnum font-[family-name:var(--font-display)] text-[clamp(var(--text-display-sm),7vw,var(--text-display-md))] font-extrabold leading-[var(--lh-display-md)] tracking-[var(--tracking-display)]">
        {value}
      </span>
      <span className="text-[length:var(--text-body-md)] font-semibold">{label}</span>
      {sublabel ? (
        <span
          className={cn(
            "text-[length:var(--text-body-sm)]",
            tone === "ink" ? "text-[var(--sand-400)]" : "text-[var(--color-mute)]",
          )}
        >
          {sublabel}
        </span>
      ) : null}
    </div>
  );
}
