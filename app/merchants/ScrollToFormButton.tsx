"use client";

import * as React from "react";
import { Button } from "@/components/brand/Button";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * Scrolls to the join form, leaving 90px clear for the sticky nav — the offset the
 * prototype uses. Falls back to an instant jump under prefers-reduced-motion.
 */
export function ScrollToFormButton({
  children,
  size = "lg",
  className,
}: {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const scroll = () => {
    const el = document.getElementById("form");
    if (!el) return;
    window.scrollTo({
      top: el.getBoundingClientRect().top + window.scrollY - 90,
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  };

  return (
    <Button size={size} className={className} onClick={scroll}>
      {children}
    </Button>
  );
}
