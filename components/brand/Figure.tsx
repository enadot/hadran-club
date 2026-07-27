"use client";

import * as React from "react";
import { NumberTicker } from "@/components/magic/number-ticker";
import { cn } from "@/lib/utils";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * A counted-up figure — Magic UI's NumberTicker, wrapped so this brand's rules hold.
 *
 * NumberTicker renders its `startValue` (0) until the spring first runs, so on its own
 * it would ship "0" in the server HTML and leave any off-screen figure reading zero.
 * The club's numbers *are* the argument, so instead the true value is rendered until
 * the figure is about to enter the viewport; only then is the ticker mounted, and it
 * counts up from zero as intended. That keeps the real number in the SSR markup, with
 * no JavaScript, and under prefers-reduced-motion.
 *
 * The shekel sign sits before the digits and is never animated. NumberTicker's spring
 * is overdamped (damping 60 / stiffness 100), so it eases in and settles without
 * overshoot — no bounce, which the design system forbids.
 */
export type FigureProps = {
  value: number;
  /** e.g. "₪" — rendered before the digits. */
  prefix?: string;
  /** e.g. "%" */
  suffix?: string;
  decimalPlaces?: number;
  className?: string;
};

export function Figure({ value, prefix, suffix, decimalPlaces = 0, className }: FigureProps) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const [animate, setAnimate] = React.useState(false);

  React.useEffect(() => {
    if (prefersReducedMotion()) return;
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setAnimate(true);
          io.disconnect();
        }
      },
      // Arm slightly before the figure scrolls in, so the count-up starts as it lands.
      { rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const formatted = value.toLocaleString("en-US", {
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
  });

  return (
    <span ref={ref} className={cn("tnum inline-flex items-baseline", className)} dir="ltr">
      {prefix}
      {animate ? (
        <NumberTicker
          value={value}
          decimalPlaces={decimalPlaces}
          // Undo the component's own colour and tracking so it inherits the
          // surrounding display type.
          className="inline-block tracking-[inherit] text-inherit dark:text-inherit"
        />
      ) : (
        <span>{formatted}</span>
      )}
      {suffix}
    </span>
  );
}
