import localFont from "next/font/local";
import { Frank_Ruhl_Libre } from "next/font/google";

/**
 * Afek (א.א.א) — the client-supplied brand face, weights 400–800. It carries both
 * the display voice (800, matching the logo wordmark) and all UI/body copy.
 * Heebo / Assistant are the metric-compatible fallbacks named by the design system.
 */
export const afek = localFont({
  src: [
    { path: "../public/fonts/afek-regular-aaa.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/afek-medium-aaa.woff2", weight: "500", style: "normal" },
    { path: "../public/fonts/afek-demibold-aaa.woff2", weight: "600", style: "normal" },
    { path: "../public/fonts/afek-bold-aaa.woff2", weight: "700", style: "normal" },
    { path: "../public/fonts/afek-ultrabold-aaa.woff2", weight: "800", style: "normal" },
  ],
  display: "swap",
  variable: "--font-afek",
  fallback: ["Heebo", "Assistant", "Arial Hebrew", "system-ui", "sans-serif"],
});

/** The ceremonial serif — pull-quotes only, at most twice per page. */
export const frankRuhlLibre = Frank_Ruhl_Libre({
  subsets: ["hebrew", "latin"],
  weight: ["400", "500", "700", "900"],
  display: "swap",
  variable: "--font-frank",
});
