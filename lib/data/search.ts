/** Search index — verbatim from the PARTNERS / PAGES / FAQS arrays in Search.dc.html. */

export type SearchKind = "partner" | "page" | "faq";

export type SearchResult = {
  kind: SearchKind;
  name: string;
  meta: string;
  href: string;
  initials: string;
  showDiscount: boolean;
};

export const SEARCH_PARTNERS = [
  { name: "שפע ברכת השם", category: "רשת מזון ומכולת", city: "ירושלים" },
  { name: "מכולת הבית", category: "רשת מזון ומכולת", city: "בני ברק" },
  { name: "קצביית הכשרות", category: "בשר, עוף ודגים", city: "בני ברק" },
  { name: "דגי הצפון", category: "בשר, עוף ודגים", city: "חיפה" },
  { name: "הלבשה למשפחה", category: "ביגוד והנעלה", city: "ירושלים" },
  { name: "נעלי הדר", category: "ביגוד והנעלה", city: "אלעד" },
  { name: "אוצר הספרים", category: "ספרי קודש ויודאיקה", city: "ירושלים" },
  { name: "יודאיקה מהדרין", category: "ספרי קודש ויודאיקה", city: "בית שמש" },
  { name: "כלי בית שלמה", category: "כלי בית וריהוט", city: "מודיעין עילית" },
  { name: "פארם משפחה", category: "פארמה וטיפוח", city: "בני ברק" },
];

export const SEARCH_PAGES = [
  {
    name: "הפעלת הכרטיס",
    meta: "הפעלה של כרטיס שהתקבל או הזמנת כרטיס חדש",
    href: "/activate",
    kw: "הפעלה כרטיס חדש הזמנה",
  },
  {
    name: "בדיקת יתרה",
    meta: "יתרה לשימוש, חיסכון מצטבר והיסטוריית קניות",
    href: "/balance",
    kw: "יתרה חיסכון היסטוריה כמה נשאר",
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
    kw: "הנחה קופה 5% איך",
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
];

export const SEARCH_CHIPS = [
  "הכל",
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
  "מזון ומכולת": "מזון",
  "בשר ודגים": "בשר",
  ביגוד: "ביגוד",
  "ספרי קודש": "ספרי",
  ירושלים: "ירושלים",
  "בני ברק": "בני ברק",
};

export const RECENT_SEARCHES = ["מכולת בני ברק", "ספרי קודש", "בדיקת יתרה"];

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

  const partners: SearchResult[] = SEARCH_PARTNERS.filter(
    (p) => hit(p.name) || hit(p.category) || hit(p.city),
  ).map((p) => ({
    kind: "partner",
    name: p.name,
    meta: `${p.category} · ${p.city}`,
    href: "/benefits",
    initials: p.name.trim().slice(0, 2),
    showDiscount: true,
  }));

  const pages: SearchResult[] = SEARCH_PAGES.filter(
    (p) => hit(p.name) || hit(p.meta) || hit(p.kw),
  ).map((p) => ({
    kind: "page",
    name: p.name,
    meta: p.meta,
    href: p.href,
    initials: "דף",
    showDiscount: false,
  }));

  const faqs: SearchResult[] = SEARCH_FAQS.filter(
    (p) => hit(p.name) || hit(p.meta) || hit(p.kw),
  ).map((p) => ({
    kind: "faq",
    name: p.name,
    meta: p.meta,
    href: p.href,
    initials: "?",
    showDiscount: false,
  }));

  return (
    [
      { kind: "partner" as const, title: GROUP_TITLES.partner, items: partners },
      { kind: "page" as const, title: GROUP_TITLES.page, items: pages },
      { kind: "faq" as const, title: GROUP_TITLES.faq, items: faqs },
    ] satisfies { kind: SearchKind; title: string; items: SearchResult[] }[]
  ).filter((g) => g.items.length > 0);
}
