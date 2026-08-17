"use client";

import * as React from "react";
import { DriftWall } from "@/components/reactbits/drift-wall";
import { PARTNERS } from "@/lib/data/partners";

/**
 * The drifting wall of partner logos behind the card in the hero.
 *
 * The point of it is scale: the headline says the club has hundreds of partners,
 * and this is what hundreds looks like. So the tiles are the real logos from the
 * directory, spread across the list rather than taken off the top, so the wall shows
 * a supermarket beside a bookshop beside an optician instead of six shops in one
 * trade.
 *
 * It is scenery, not a control: `decorative` makes the tiles inert and hides the
 * whole wall from assistive technology. Everything it says, the copy beside it says
 * too — and the same logos are a browsable list one click away on /benefits.
 *
 * The tuning is deliberately quiet. It sits under the LCP element and behind a
 * gold bloom, so the tiles are dimmed, tinted toward the sand background and drifting
 * at roughly half the library's default speed. Under prefers-reduced-motion the wall
 * composes and then holds still.
 */

/** 24 logos, evenly sampled so the trades stay mixed. */
const TILES = (() => {
  const withLogo = PARTNERS.filter((p) => p.logo);
  const want = Math.min(24, withLogo.length);
  const step = Math.max(1, Math.floor(withLogo.length / want));
  // `logo` is already a path under /public — "/partners/p001.webp".
  return Array.from({ length: want }, (_, i) => withLogo[(i * step) % withLogo.length]).map((p) => ({
    image: p.logo as string,
    title: p.name,
  }));
})();

export function HeroLogoWall() {
  return (
    <DriftWall
      items={TILES}
      className="hc-hero-wall"
      decorative
      columns={5}
      tileWidth={148}
      tileHeight={96}
      gap={14}
      radius={12}
      tilt={13}
      turn={-16}
      perspective={1100}
      depth={150}
      speed={22}
      variance={0.4}
      parallax={0.45}
      lift={0}
      fade={0.52}
      dim={0.62}
      overlayColor="var(--color-canvas-soft)"
      overlayOpacity={0.14}
      fit="contain"
      tileBackground="var(--color-canvas)"
      padding={10}
    />
  );
}
