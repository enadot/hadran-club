"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * A logo hosted by the platform rather than by the club.
 *
 * The per-card benefits lookup returns partners the static directory has never
 * carried, and their marks live on the platform's own host — a fifth of the list on
 * a good day. A file that has been moved, or a third-party host a member's network
 * blocks, would otherwise leave an empty plate on the grid; falling back to the
 * initials puts the plate back to what it looks like for a partner with no logo at
 * all, which is a shape the directory already reads correctly.
 *
 * Only remote sources go through here. The club's own webp files are shipped with
 * the site, cannot 404, and stay on the plain server-rendered path in PartnerLogo.
 */
export function RemoteLogo({
  src,
  padding,
  fallback,
}: {
  src: string;
  padding: string;
  fallback: string;
}) {
  const [failed, setFailed] = React.useState(false);
  if (failed) return <>{fallback}</>;
  return (
    // Decorative: the shop's name is always rendered as text beside it.
    <img
      src={src}
      alt=""
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className={cn("absolute inset-0 size-full object-contain", padding)}
    />
  );
}
