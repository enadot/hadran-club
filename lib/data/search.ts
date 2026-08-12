/**
 * The global search index.
 *
 * Partners are no longer duplicated here: the prototype kept a second, differently
 * named list, so a hit could link to /benefits and then not exist there. The one
 * list in lib/data/partners.ts is the source now.
 */
import { PARTNERS, partnerInitials } from "./partners";
import { BENEFIT_TIERS } from "./benefits";

export type SearchKind = "partner" | "page" | "faq";

export type SearchResult = {
  kind: SearchKind;
  name: string;
  meta: string;
  href: string;
  initials: string;
  /** The benefit tier label, shown on partner rows. Absent on pages and questions. */
  benefitLabel?: string;
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
    meta: "החיסכון שנצבר, מצב הכרטיס והיסטוריית הקניות",
    href: "/balance",
    kw: "יתרה חיסכון היסטוריה כמה נשאר כמה חסכתי",
  },
  {
    name: "אזור אישי",
    meta: "ניהול החברות, פרטי המשפחה והכרטיסים",
    href: "/member",
    kw: "אישי חברות משפחה",
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
    href: "/benefits?tier=exclusive",
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
      // So the "בלעדי" chip and a typed "בלעדי" both reach the exclusive shops.
      hit(BENEFIT_TIERS[p.tier].label) ||
      hit(p.benefit),
  ).map((p) => ({
    kind: "partner",
    name: p.name,
    meta: `${p.category} · ${p.city}`,
    // Deep-links the directory straight to the shop, so the result lands on the
    // row it promised rather than on an unfiltered list of everything.
    href: `/benefits?q=${encodeURIComponent(p.name)}`,
    initials: partnerInitials(p.name),
    benefitLabel: BENEFIT_TIERS[p.tier].label,
  }));

  const pages: SearchResult[] = SEARCH_PAGES.filter(
    (p) => hit(p.name) || hit(p.meta) || hit(p.kw),
  ).map((p) => ({
    kind: "page",
    name: p.name,
    meta: p.meta,
    href: p.href,
    initials: "דף",
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
