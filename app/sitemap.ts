import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/data/site";

/** The indexable pages. /search and /archive/* are noindex and stay out. */
const ROUTES: { path: string; priority: number }[] = [
  { path: "/", priority: 1 },
  { path: "/benefits", priority: 0.9 },
  { path: "/stores", priority: 0.8 },
  { path: "/join-hadran", priority: 0.8 },
  { path: "/activate", priority: 0.7 },
  { path: "/balance", priority: 0.7 },
  { path: "/merchants", priority: 0.6 },
  { path: "/faq", priority: 0.6 },
  { path: "/terms", priority: 0.3 },
  { path: "/privacy", priority: 0.3 },
  { path: "/terms-of-use", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map(({ path, priority }) => ({
    url: `${SITE_URL}${path === "/" ? "" : path}`,
    priority,
  }));
}
