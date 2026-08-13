/**
 * The global search index.
 *
 * Partners are no longer duplicated here: the prototype kept a second, differently
 * named list, so a hit could link to /benefits and then not exist there. The one
 * list in lib/data/partners.ts is the source now.
 */
import { PARTNERS, partnerInitials } from "./partners";

import { MEMBER_AREA_URL } from "./site";

export type SearchKind = "partner" | "page" | "faq";

export type SearchResult = {
  kind: SearchKind;
  name: string;
  meta: string;
  href: string;
  initials: string;
  /** Leaves the site — the operator's member area is the only such destination. */
  external?: boolean;
};

export const SEARCH_PAGES = [
  {
    name: "הפעלת הכרטיס",
    meta: "הפעלה של כרטיס שהתקבל או הזמנת כרטיס חדש",
    href: "/activate",
    kw: "הפעלה כרטיס חדש הזמנה",
  },
  {
    name: "בדיקת יתרה",
    meta: "יתרה זמינה בכרטיס, סטטוס וטעינה עצמית",
    href: "/balance",
    kw: "יתרה טעינה סטטוס חיסכון כמה נשאר כמה חסכתי",
  },
  {
    name: "אזור אישי",
    meta: "ניהול החברות, פרטי המשפחה והכרטיסים — במערכת קהילות קארד",
    href: MEMBER_AREA_URL,
    kw: "אישי חברות משפחה",
    external: true,
  },
  {
    name: "הצטרפות בית עסק",
    meta: "טופס לבעלי עסקים שרוצים להיכנס לרשימה",
    href: "/merchants",
    kw: "עסק הצטרפות בעל עסק שותף",
  },
];

export const SEARCH_FAQS = [
  {
    name: "איך מקבלים את ההנחה בקופה?",
    meta: "מציגים את הכרטיס לפני התשלום — ההנחה יורדת מהחשבון",
    href: "/faq",
    kw: "הנחה קופה איך אחוז",
  },
  {
    name: "מה קורה אם הכרטיס אבד?",
    meta: "חוסמים באזור האישי ומזמינים כרטיס חלופי",
    href: "/faq",
    kw: "אבד גניבה חסימה כרטיס חלופי",
  },
  {
    name: "האם צריך לטעון כסף מראש?",
    meta: "לא. הכרטיס נותן הנחה מיידית, בלי טעינה ובלי נקודות",
    href: "/faq",
    kw: "טעינה נקודות קופון מראש",
  },
  {
    name: "אילו חנויות בלעדיות למועדון?",
    meta: "יש בתי עסק שההטבה בהם זמינה אך ורק לחברי הדרן קלאב",
    href: "/benefits?exclusive=1",
    kw: "בלעדי בלעדיות רק לחברים נבחרת",
  },
];

export const SEARCH_CHIPS = [
  "הכל",
  "בלעדי",
  "מזון ומכולת",
  "בשר ודגים",
  "ביגוד",
  "ספרי קודש",
  "ירושלים",
  "בני ברק",
] as const;

/** Each chip stands in for a query string; "הכל" clears the search. */
export const CHIP_QUERY: Record<string, string> = {
  הכל: "",
  בלעדי: "בלעדי",
  "מזון ומכולת": "מזון",
  "בשר ודגים": "בשר",
  ביגוד: "ביגוד",
  "ספרי קודש": "ספרי",
  ירושלים: "ירושלים",
  "בני ברק": "בני ברק",
};

export const RECENT_SEARCHES = ["מכולת בני ברק", "ספרי קודש", "חנויות בלעדיות"];

export const GROUP_TITLES: Record<SearchKind, string> = {
  partner: "בתי עסק שותפים",
  page: "עמודים באתר",
  faq: "שאלות ותשובות",
};

/** Substring match across the indexed fields, exactly as the prototype did. */
export function searchAll(query: string): { kind: SearchKind; title: string; items: SearchResult[] }[] {
  const q = query.trim();
  if (!q) return [];
  const hit = (s: string) => (s || "").includes(q);

  const partners: SearchResult[] = PARTNERS.filter(
    (p) =>
      hit(p.name) ||
      hit(p.category) ||
      hit(p.city) ||
      // So the "בלעדי" chip and a typed "בלעדי" both reach the club-only shops,
      // which say so in their own benefit line rather than through a badge.
      (!!p.exclusive && hit("בלעדי")) ||
      hit(p.benefit),
  ).map((p) => ({
    kind: "partner",
    name: p.name,
    meta: `${p.category} · ${p.city}`,
    // Deep-links the directory straight to the shop, so the result lands on the
    // row it promised rather than on an unfiltered list of everything.
    href: `/benefits?q=${encodeURIComponent(p.name)}`,
    initials: partnerInitials(p.name),
  }));

  const pages: SearchResult[] = SEARCH_PAGES.filter(
    (p) => hit(p.name) || hit(p.meta) || hit(p.kw),
  ).map((p) => ({
    kind: "page",
    name: p.name,
    meta: p.meta,
    href: p.href,
    initials: "דף",
    external: "external" in p ? p.external : undefined,
  }));

  const faqs: SearchResult[] = SEARCH_FAQS.filter(
    (p) => hit(p.name) || hit(p.meta) || hit(p.kw),
  ).map((p) => ({
    kind: "faq",
    name: p.name,
    meta: p.meta,
    href: p.href,
    initials: "?",
  }));

  return (
    [
      { kind: "partner" as const, title: GROUP_TITLES.partner, items: partners },
      { kind: "page" as const, title: GROUP_TITLES.page, items: pages },
      { kind: "faq" as const, title: GROUP_TITLES.faq, items: faqs },
    ] satisfies { kind: SearchKind; title: string; items: SearchResult[] }[]
  ).filter((g) => g.items.length > 0);
}
