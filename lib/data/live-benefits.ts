/**
 * The per-card benefit list, as the site models it.
 *
 * /benefits has two modes. Without a card it is a shop window: the static directory
 * in lib/data/partners.ts, which says who the partners are and nothing about what a
 * given member gets. With a card it is the brief's "מנוע החיסכון האישי" — the
 * platform answers for that card, and every figure on screen is the merchant's own.
 *
 * This module is the seam between them. The wire types below are what
 * /api/card/benefits returns (already stripped of the operating club's identity and
 * wallet — see the route handler), and `partnerFromLiveStore` folds one of them into
 * the same `Partner` record the directory already renders, so the card, the dialog
 * and the filters do not need a second shape to understand.
 *
 * It imports nothing from lib/api/* on purpose: both the route handler and the
 * browser use it, and lib/api/kehilot.ts reads environment that must not cross into
 * a client bundle.
 */
import { PARTNERS, type Partner } from "./partners";

/** One address of a partner. No phone: the club publishes none, anywhere. */
export type LiveBranch = {
  name?: string;
  address?: string;
  city?: string;
  hours?: string;
};

/** One partner on a card's benefit list. */
export type LiveStore = {
  id: number;
  name: string;
  /** Resolved by the route handler — the club's own file where it has one, the
   *  platform's URL otherwise. */
  logo?: string;
  /** What the shop sells, in the platform's own words. */
  trade?: string;
  /** The club's coarse filter group, mapped from the trade. */
  category?: string;
  /** Available only through the club. */
  exclusive: boolean;
  /** The platform's featured flag — the club's "הנבחרת שלנו" ordering. */
  featured: boolean;
  /** The benefit in the merchant's own words. */
  benefit: string;
  branchCount: number;
  cities: string[];
  branches: LiveBranch[];
};

export type LiveBenefits = {
  /** False when the platform does not know the card. Not an error — a lookup that
   *  came back empty-handed, which the gate has its own copy for. */
  exists: boolean;
  stores: LiveStore[];
};

/**
 * City names arrive as they were typed into the platform, so the same place shows up
 * with a trailing space, in the ktiv male spelling and in the short form. Left alone
 * they split one city into three entries in the filter, none of which lists all its
 * shops. Trimming fixes the whitespace; the aliases below fix the six towns the
 * brief names, which are the ones a member actually filters by.
 */
const CITY_ALIASES: Record<string, string> = {
  "ביתר": "ביתר עילית",
  "ביתר עלית": "ביתר עילית",
  "מודיעין עלית": "מודיעין עילית",
  "בתי ים": "בת ים",
  "יאושלים": "ירושלים",
  "קרית אתא": "קריית אתא",
  "קרית גת": "קריית גת",
  "קרית שמונה": "קריית שמונה",
};

export function normalizeCity(raw: string | null | undefined): string | undefined {
  const city = (raw ?? "").replace(/\s+/g, " ").trim();
  if (!city) return undefined;
  return CITY_ALIASES[city] ?? city;
}

/**
 * The platform's trade names, in the club's own category vocabulary.
 *
 * The brief fixes the club's map of trade categories, and the directory already
 * filters on it; the platform keeps a finer list of its own, which would otherwise
 * change the language of the filter the moment a card was entered. The finer name is
 * not thrown away — it becomes the partner's `trade` and is what the card shows, so
 * "כובעים" still appears under the shop's name while "ביגוד והנעלה" is what the
 * picker offers. Anything unmapped keeps its own name rather than disappearing.
 */
const CLUB_CATEGORY: Record<string, string> = {
  "כובעים": "ביגוד והנעלה",
  "ביגוד גברים": "ביגוד והנעלה",
  "ביגוד נשים": "ביגוד והנעלה",
  "ביגוד חסידי": "ביגוד והנעלה",
  "בגדי ילדים": "ביגוד והנעלה",
  "נעליים": "ביגוד והנעלה",
  "אופטיקה": "אופטיקה",
  "מזון": "מזון ומכולת",
  "בשמים": "פארמה וטיפוח",
  "תשמישי קדושה": "ספרי קודש ויודאיקה",
  "ספרים": "ספרי קודש ויודאיקה",
  "ריהוט ומזרונים": "כלי בית וריהוט",
  "קרמיקה תאורה וכלי בית": "כלי בית וריהוט",
  "חשמל": "כלי בית וריהוט",
  "אלקטרוניק וסלולר": "סלולר ותקשורת",
  "כלי כתיבה וצעצועים": "צעצועים ומתנות",
  "תכשיטים ושעונים": "תכשיטים ושעונים",
  "רכב": "שירותים",
  "ביטוחים": "שירותים",
  "כללי": "קמעונאות כללית",
};

export function clubCategory(trade: string | null | undefined): string | undefined {
  const name = (trade ?? "").replace(/\s+/g, " ").trim();
  if (!name) return undefined;
  return CLUB_CATEGORY[name] ?? name;
}

/**
 * The club's own logo files, keyed by partner name.
 *
 * Most of the platform's partners are already in the static directory with a webp the
 * club optimised itself. Preferring it keeps those marks crisp and same-origin, and
 * only the partners the directory has never carried fall back to the platform's file.
 */
const LOCAL_LOGOS = new Map(
  PARTNERS.filter((p) => p.logo).map((p) => [p.name.replace(/\s+/g, " ").trim(), p.logo!]),
);

export function localLogoFor(name: string): string | undefined {
  return LOCAL_LOGOS.get(name.replace(/\s+/g, " ").trim());
}

/**
 * A live store as the directory's own record.
 *
 * `tier` is set only for an exclusive partner. The other two tiers describe the depth
 * of a benefit, and the platform states the benefit in prose rather than as a number —
 * ranking "10 אחוז הנחה בכל קניה" as "מורחבת" would be the site inventing a claim the
 * merchant did not make.
 */
export function partnerFromLiveStore(store: LiveStore): Partner {
  const single = store.cities.length === 1 ? store.cities[0] : undefined;
  return {
    name: store.name,
    logo: store.logo,
    trade: store.trade,
    category: store.category,
    city: single,
    cities: store.cities,
    branches: store.branchCount || undefined,
    branchList: store.branches,
    featured: store.featured,
    tier: store.exclusive ? "exclusive" : undefined,
    benefit: store.benefit || undefined,
  };
}

/** "38 סניפים · 11 ערים" — where a partner spans more towns than a line can name. */
export function reachLabel(p: Partner): string | null {
  const parts: string[] = [];
  if (p.branches) parts.push(p.branches === 1 ? "סניף אחד" : `${p.branches} סניפים`);
  if (p.cities && p.cities.length > 1) parts.push(`${p.cities.length} ערים`);
  else if (p.cities?.length === 1) parts.push(p.cities[0]);
  else if (p.city) parts.push(p.city);
  return parts.length ? parts.join(" · ") : null;
}

/** True when the partner has a branch in the city the filter names. */
export function servesCity(p: Partner, city: string): boolean {
  if (p.cities?.length) return p.cities.includes(city);
  return p.city === city;
}

/** Every city a list of partners reaches, deduped and sorted for the picker. */
export function citiesOf(partners: Partner[]): string[] {
  const set = new Set<string>();
  for (const p of partners) {
    if (p.cities?.length) p.cities.forEach((c) => set.add(c));
    else if (p.city) set.add(p.city);
  }
  return [...set].sort((a, b) => a.localeCompare(b, "he"));
}

/** Likewise the categories. */
export function categoriesOf(partners: Partner[]): string[] {
  const set = new Set<string>();
  for (const p of partners) if (p.category) set.add(p.category);
  return [...set].sort((a, b) => a.localeCompare(b, "he"));
}
