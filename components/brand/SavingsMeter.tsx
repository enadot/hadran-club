"use client";

import * as React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Mirrors components/brand/SavingsMeter.jsx — 10px pill track on --sand-300 with a
 * brand-gradient fill.
 *
 * The prototype relied on a CSS width transition. Here the fill additionally grows
 * from zero the first time it scrolls into view (320ms, the token easing) and the
 * percentage counts along with it; later value changes tween the same way. Under
 * prefers-reduced-motion the fill is painted at its final width immediately.
 */
export type SavingsMeterProps = Omit<React.ComponentPropsWithoutRef<"div">, "style"> & {
  value?: number;
  max?: number;
  label?: React.ReactNode;
  caption?: React.ReactNode;
  tone?: "gold" | "ink";
  style?: React.CSSProperties;
};

export function SavingsMeter({
  value = 0,
  max = 100,
  label,
  caption,
  tone = "gold",
  className,
  style,
  ...rest
}: SavingsMeterProps) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  const rootRef = React.useRef<HTMLDivElement>(null);
  const fillRef = React.useRef<HTMLDivElement>(null);
  const pctRef = React.useRef<HTMLSpanElement>(null);
  const revealed = React.useRef(false);

  useGSAP(
    () => {
      const fill = fillRef.current;
      if (!fill) return;

      const paint = (p: number) => {
        fill.style.width = `${p}%`;
        if (pctRef.current) pctRef.current.textContent = `${Math.round(p)}%`;
      };

      if (prefersReducedMotion()) {
        paint(pct);
        revealed.current = true;
        return;
      }

      // Animate the reading itself, so the width and the percentage stay in step.
      const state = { p: revealed.current ? Number(fill.dataset.p ?? 0) : 0 };
      const tween = gsap.to(state, {
        p: pct,
        duration: 0.32,
        ease: "power2.out",
        onUpdate: () => paint(state.p),
        onComplete: () => {
          fill.dataset.p = String(pct);
        },
        paused: !revealed.current,
      });

      if (revealed.current) return () => tween.kill();

      paint(0);
      const trigger = ScrollTrigger.create({
        trigger: rootRef.current,
        start: "top 90%",
        once: true,
        onEnter: () => {
          revealed.current = true;
          tween.play();
        },
      });
      return () => {
        trigger.kill();
        tween.kill();
      };
    },
    { dependencies: [pct], scope: rootRef },
  );

  return (
    <div
      ref={rootRef}
      className={cn("flex flex-col gap-[var(--space-sm)] font-[family-name:var(--font-ui)]", className)}
      style={style}
      {...rest}
    >
      {label ? (
        <div className="flex items-baseline justify-between gap-[var(--space-md)]">
          <span className="text-[length:var(--text-body-sm)] font-bold">{label}</span>
          <span
            ref={pctRef}
            className="tnum text-[length:var(--text-body-sm)] text-[var(--color-mute)]"
          >
            {Math.round(pct)}%
          </span>
        </div>
      ) : null}

      <div
        className="h-2.5 overflow-hidden rounded-[var(--radius-pill)] bg-[var(--sand-300)]"
        role="progressbar"
        aria-valuenow={Math.round(pct)}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          ref={fillRef}
          className={cn(
            "h-full rounded-[var(--radius-pill)]",
            tone === "ink" ? "bg-[var(--color-canvas-ink)]" : "bg-[image:var(--gradient-brand)]",
          )}
          style={{ width: `${pct}%` }}
        />
      </div>

      {caption ? (
        <span className="text-[length:var(--text-caption)] text-[var(--color-mute)]">{caption}</span>
      ) : null}
    </div>
  );
}
