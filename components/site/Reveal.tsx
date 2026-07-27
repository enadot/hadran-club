"use client";

import * as React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";
import { DURATION, STAGGER, prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Scroll reveal — a fade plus a 16px rise over 320ms on the token easing.
 *
 * Deliberately modest: the design system rules out parallax, pinning, bounce and
 * spring. With `stagger`, the element's direct children come in 60ms apart, which is
 * how the card grids and stat strips are animated.
 *
 * Everything runs inside useGSAP's context so triggers and tweens are reverted on
 * unmount. Under prefers-reduced-motion nothing is animated and nothing is hidden —
 * the CSS in globals.css already forces [data-reveal] visible, so content is never
 * trapped behind an animation that will not run.
 */
export type RevealProps = React.ComponentPropsWithoutRef<"div"> & {
  /** Stagger the direct children instead of revealing the wrapper as one block. */
  stagger?: boolean;
  /** Seconds to wait once the trigger fires. */
  delay?: number;
  /** ScrollTrigger start position. */
  start?: string;
};

export function Reveal({
  stagger = false,
  delay = 0,
  start = "top 88%",
  className,
  children,
  ...rest
}: RevealProps) {
  const ref = React.useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || prefersReducedMotion()) return;

      const targets = stagger ? Array.from(el.children) : [el];
      if (!targets.length) return;

      gsap.set(targets, { opacity: 0, y: 16 });
      gsap.to(targets, {
        opacity: 1,
        y: 0,
        duration: DURATION.slow,
        ease: "power2.out",
        delay,
        stagger: stagger ? STAGGER : 0,
        scrollTrigger: { trigger: el, start, once: true },
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} data-reveal="" className={cn(className)} {...rest}>
      {children}
    </div>
  );
}
