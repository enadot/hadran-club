/** The design system's easing, as a GSAP-compatible cubic bezier. */
export const EASE_OUT = "cubic-bezier(.2,.8,.2,1)";

/** Token durations, in seconds, for GSAP. */
export const DURATION = {
  fast: 0.12,
  base: 0.2,
  slow: 0.32,
} as const;

/** Reveal stagger — 60ms between siblings. */
export const STAGGER = 0.06;

export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
