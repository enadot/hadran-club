"use client";

import { Direction } from "radix-ui";

/**
 * Tells Radix the whole app is right-to-left.
 *
 * Without this, every Radix root (Tabs, Accordion, Select, Dialog …) calls
 * `useDirection()` with no provider in scope, falls back to "ltr", and stamps
 * `dir="ltr"` on its own DOM node — which flips the direction for everything inside
 * it, regardless of `<html dir="rtl">`. That mirrored the membership card inside the
 * member area's tabs and reversed the tab order.
 */
export function RtlProvider({ children }: { children: React.ReactNode }) {
  return <Direction.DirectionProvider dir="rtl">{children}</Direction.DirectionProvider>;
}
