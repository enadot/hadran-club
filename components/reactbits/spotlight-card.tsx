"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * React Bits' SpotlightCard, adapted to this design system.
 *
 * A soft radial highlight follows the pointer across the card. It is hover
 * feedback rather than ambient motion — nothing moves unless a pointer is on the
 * element — so it does not spend the page's one "magic moment", which is still
 * the BorderBeam around the hero card.
 *
 * Four changes from the upstream component, all of them required here:
 *
 * 1. No surface of its own. Upstream hard-codes `rounded-3xl border-neutral-800
 *    bg-neutral-900 p-8`, which is a different design system. The wrapper is
 *    transparent now and the caller's <Card> keeps owning the surface.
 * 2. `spotlightColor` was typed as an rgba() template literal, so a token could
 *    not be passed. It takes any CSS colour, and defaults to the brand gold.
 * 3. Disabled for coarse pointers and under prefers-reduced-motion. On a phone
 *    there is no cursor to follow, and the effect would only fire on tap.
 * 4. Keyboard focus lights the centre of the card instead of its top corner —
 *    upstream leaves the position at 0,0 on focus, which reads as a stray smudge.
 */
export type SpotlightCardProps = React.ComponentPropsWithoutRef<"div"> & {
  /** Any CSS colour. Defaults to --color-spotlight from the token bridge. */
  spotlightColor?: string;
  /** Radius of the highlight. */
  size?: number;
};

export function SpotlightCard({
  spotlightColor = "var(--gold-300)",
  size = 320,
  className,
  children,
  ...rest
}: SpotlightCardProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = React.useState(false);
  const [pos, setPos] = React.useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = React.useState(0);

  React.useEffect(() => {
    // A fine pointer that is actually capable of hovering, and a reader who has
    // not asked for less movement.
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setEnabled(mq.matches && !rm.matches);
    sync();
    mq.addEventListener("change", sync);
    rm.addEventListener("change", sync);
    return () => {
      mq.removeEventListener("change", sync);
      rm.removeEventListener("change", sync);
    };
  }, []);

  const centre = () => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setPos({ x: r.width / 2, y: r.height / 2 });
  };

  if (!enabled) {
    return (
      <div ref={ref} className={cn("relative", className)} {...rest}>
        {children}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={cn("relative", className)}
      onPointerMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        setPos({ x: e.clientX - r.left, y: e.clientY - r.top });
      }}
      onPointerEnter={() => setOpacity(1)}
      onPointerLeave={() => setOpacity(0)}
      onFocusCapture={() => {
        centre();
        setOpacity(1);
      }}
      onBlurCapture={() => setOpacity(0)}
      {...rest}
    >
      {/* Sits above the card surface and below its content; inherits the card's
          own radius so the glow never bleeds past a rounded corner. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 rounded-[inherit] transition-opacity duration-[var(--duration-slow)] ease-[var(--ease-out)]"
        style={{
          opacity,
          background: `radial-gradient(${size}px circle at ${pos.x}px ${pos.y}px, ${spotlightColor}, transparent 70%)`,
        }}
      />
      <div className="relative z-[1] h-full">{children}</div>
    </div>
  );
}
