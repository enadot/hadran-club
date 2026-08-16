import type { BenefitTier } from "./benefits";

/**
 * The partner directory behind /benefits and the global search.
 *
 * These are the club's real partners, with the logo each one supplied. What is
 * *not* here is the commercial detail: the club has not handed over a category,
 * a city, a benefit or its conditions for most of these shops, and this file
 * does not invent them — a directory that guesses "עד 20%" is worse than one
 * that says nothing. Every field below `logo` is therefore optional, and the UI
 * shows a row with what that row actually has.
 *
 * `tier` describes the depth of the benefit, not its size — see lib/data/benefits.ts
 * for why there is no percentage on this record. `terms` are the per-merchant rules
 * the FAQ promises live "בכרטיס בית העסק".
 */
export type Partner = {
  name: string;
  /** Path under /public/partners. Every partner here has one. */
  logo: string;
  /** Set only where the trade name states the trade. */
  category?: string;
  /** Set only where the trade name states the place. */
  city?: string;
  /** Branch count as a number, so it can be sorted and pluralised correctly. */
  branches?: number;
  tier?: BenefitTier;
  /** The benefit in the merchant's own words, e.g. "הנחה על הסל כולו". */
  benefit?: string;
  /** Per-merchant conditions, shown in the detail dialog. */
  terms?: string[];
};

/** "4 סניפים" / "סניף אחד" — Hebrew has no bare "1 branch". */
export function branchLabel(n: number) {
  return n === 1 ? "סניף אחד" : `${n} סניפים`;
}

export const PARTNERS: Partner[] = [
  {
    name: "בורסלינו - כובעים",
    logo: "/partners/p001.webp",
    category: "ביגוד והנעלה",
  },
  {
    name: "ויסטה - בני ברק",
    logo: "/partners/p002.webp",
    city: "בני ברק",
  },
  {
    name: "מעיין 2000",
    logo: "/partners/p003.webp",
  },
  {
    name: "פניצה",
    logo: "/partners/p004.webp",
  },
  {
    name: "שפע ברכת השם",
    logo: "/partners/p005.webp",
  },
  {
    name: "101 חליפות",
    logo: "/partners/p006.webp",
    category: "ביגוד והנעלה",
  },
  {
    name: "280 (יו אופטיק) - אלעד",
    logo: "/partners/p007.webp",
    category: "אופטיקה",
    city: "אלעד",
  },
  {
    name: "אביבית ויצמן",
    logo: "/partners/p008.webp",
  },
  {
    name: "אדור - אהרונוביץ",
    logo: "/partners/p009.webp",
  },
  {
    name: "אדור - בית אופנה לגברים",
    logo: "/partners/p010.webp",
    category: "ביגוד והנעלה",
  },
  {
    name: "אוטו בני ברק",
    logo: "/partners/p011.webp",
    city: "בני ברק",
  },
  {
    name: "אופטיוויו",
    logo: "/partners/p012.webp",
    category: "אופטיקה",
  },
  {
    name: "אופטימלי - בית שמש",
    logo: "/partners/p013.webp",
    category: "אופטיקה",
    city: "בית שמש",
  },
  {
    name: "אופטימלי - מלכי ישראל",
    logo: "/partners/p014.webp",
    category: "אופטיקה",
  },
  {
    name: "אופטיקה סיגנר",
    logo: "/partners/p015.webp",
    category: "אופטיקה",
  },
  {
    name: "אורדמן - חלוקים",
    logo: "/partners/p016.webp",
    category: "ביגוד והנעלה",
  },
  {
    name: "אקסוס - ביתר",
    logo: "/partners/p017.webp",
    city: "ביתר עילית",
  },
  {
    name: "אקסוס - בני ברק",
    logo: "/partners/p018.webp",
    city: "בני ברק",
  },
  {
    name: "ארבעת המינים - גדות כינרת רוטנברג",
    logo: "/partners/p019.webp",
    category: "ספרי קודש ויודאיקה",
  },
  {
    name: "בגיר",
    logo: "/partners/p020.webp",
    category: "ביגוד והנעלה",
  },
  {
    name: "בזאר שטראוס - אלעד",
    logo: "/partners/p021.webp",
    city: "אלעד",
  },
  {
    name: "בלאן",
    logo: "/partners/p022.webp",
  },
  {
    name: "בלייזר חליפות",
    logo: "/partners/p023.webp",
    category: "ביגוד והנעלה",
  },
  {
    name: "ברודווי הלבשה חסידית",
    logo: "/partners/p024.webp",
    category: "ביגוד והנעלה",
  },
  {
    name: "ברון",
    logo: "/partners/p025.webp",
  },
  {
    name: "ברטון חליפות",
    logo: "/partners/p026.webp",
    category: "ביגוד והנעלה",
  },
  {
    name: "ג'יבאני",
    logo: "/partners/p027.webp",
  },
  {
    name: "גלורי קידס בע\"מ",
    logo: "/partners/p028.webp",
  },
  {
    name: "גרביים עד הבית",
    logo: "/partners/p029.webp",
    category: "ביגוד והנעלה",
  },
  {
    name: "גרונר שעונים",
    logo: "/partners/p030.webp",
  },
  {
    name: "דפוס sos",
    logo: "/partners/p031.webp",
    category: "צרכי כתיבה ומשרד",
  },
  {
    name: "האטסטון - חידוש וייצור כובעים",
    logo: "/partners/p032.webp",
    category: "ביגוד והנעלה",
  },
  {
    name: "המכירה לקהילה שלך",
    logo: "/partners/p033.webp",
  },
  {
    name: "המעדניה ליזרוביץ",
    logo: "/partners/p034.webp",
  },
  {
    name: "המשקף",
    logo: "/partners/p035.webp",
    category: "אופטיקה",
  },
  {
    name: "ויסטה - ירושלים",
    logo: "/partners/p036.webp",
    city: "ירושלים",
  },
  {
    name: "חולצות ניו יורק",
    logo: "/partners/p037.webp",
    category: "ביגוד והנעלה",
  },
  {
    name: "חמדת הארץ",
    logo: "/partners/p038.webp",
  },
  {
    name: "טיימינג שעונים",
    logo: "/partners/p039.webp",
  },
  {
    name: "טמבור פלוס",
    logo: "/partners/p040.webp",
  },
  {
    name: "כובעי פוקס",
    logo: "/partners/p041.webp",
    category: "ביגוד והנעלה",
  },
  {
    name: "כשר פון",
    logo: "/partners/p042.webp",
  },
  {
    name: "לוסו (LUSSO) בגדי יוקרה לתינוקות ופעוטות",
    logo: "/partners/p043.webp",
    category: "ביגוד והנעלה",
  },
  {
    name: "לוקסמן",
    logo: "/partners/p044.webp",
  },
  {
    name: "לורנס - קרית יערים",
    logo: "/partners/p045.webp",
    city: "קרית יערים",
  },
  {
    name: "לורנס פריז - צפת",
    logo: "/partners/p046.webp",
    city: "צפת",
  },
  {
    name: "לטס גו",
    logo: "/partners/p047.webp",
  },
  {
    name: "ליבוביץ",
    logo: "/partners/p048.webp",
  },
  {
    name: "ליברו - שדרת הבשמים",
    logo: "/partners/p049.webp",
  },
  {
    name: "לידר",
    logo: "/partners/p050.webp",
  },
  {
    name: "לייביש טשונט",
    logo: "/partners/p051.webp",
  },
  {
    name: "ליל שישי בגג",
    logo: "/partners/p052.webp",
  },
  {
    name: "מאפיית קציר חיטים",
    logo: "/partners/p053.webp",
  },
  {
    name: "מחסני קרעסטיר",
    logo: "/partners/p054.webp",
  },
  {
    name: "מטאל - סלולר כשר",
    logo: "/partners/p055.webp",
  },
  {
    name: "מילאנו אופטיק",
    logo: "/partners/p056.webp",
    category: "אופטיקה",
  },
  {
    name: "מקימי",
    logo: "/partners/p057.webp",
  },
  {
    name: "מרכז התתים",
    logo: "/partners/p058.webp",
  },
  {
    name: "משביר לעמו",
    logo: "/partners/p059.webp",
  },
  {
    name: "משכן התכלת",
    logo: "/partners/p060.webp",
    category: "ספרי קודש ויודאיקה",
  },
  {
    name: "משקפופר",
    logo: "/partners/p061.webp",
    category: "אופטיקה",
  },
  {
    name: "מתאים לי",
    logo: "/partners/p062.webp",
  },
  {
    name: "נעלי סטפס",
    logo: "/partners/p063.webp",
    category: "ביגוד והנעלה",
  },
  {
    name: "נתי קלמן ביטוח",
    logo: "/partners/p064.webp",
  },
  {
    name: "סלולארג'",
    logo: "/partners/p065.webp",
  },
  {
    name: "ספרייתי גיטלר",
    logo: "/partners/p066.webp",
    category: "ספרי קודש ויודאיקה",
  },
  {
    name: "סקובה",
    logo: "/partners/p067.webp",
  },
  {
    name: "סקול",
    logo: "/partners/p068.webp",
  },
  {
    name: "עור והדר",
    logo: "/partners/p069.webp",
  },
  {
    name: "פאקו מישל",
    logo: "/partners/p070.webp",
  },
  {
    name: "פאר הרהיטים",
    logo: "/partners/p071.webp",
    category: "כלי בית וריהוט",
  },
  {
    name: "פביו",
    logo: "/partners/p072.webp",
  },
  {
    name: "פוד אפיל",
    logo: "/partners/p073.webp",
  },
  {
    name: "פיומה",
    logo: "/partners/p074.webp",
  },
  {
    name: "פינת הגלידה",
    logo: "/partners/p075.webp",
  },
  {
    name: "פיצה שמש",
    logo: "/partners/p076.webp",
  },
  {
    name: "פמילי פאשן",
    logo: "/partners/p077.webp",
    category: "ביגוד והנעלה",
  },
  {
    name: "פרסטר",
    logo: "/partners/p078.webp",
  },
  {
    name: "צ'ירינה",
    logo: "/partners/p079.webp",
  },
  {
    name: "צולנט עולמי",
    logo: "/partners/p080.webp",
  },
  {
    name: "צרכניית אחיעזר",
    logo: "/partners/p081.webp",
    category: "מכולת שכונתית",
  },
  {
    name: "קינדר טויס",
    logo: "/partners/p082.webp",
    category: "צעצועים ומתנות",
  },
  {
    name: "קלאס מן",
    logo: "/partners/p083.webp",
  },
  {
    name: "רפאלי - כל הסניפים",
    logo: "/partners/p084.webp",
  },
  {
    name: "רקורד",
    logo: "/partners/p085.webp",
  },
  {
    name: "שהחיינו קולורס",
    logo: "/partners/p086.webp",
  },
  {
    name: "שוזים",
    logo: "/partners/p087.webp",
  },
  {
    name: "שטיין יודאיקה",
    logo: "/partners/p088.webp",
    category: "ספרי קודש ויודאיקה",
  },
  {
    name: "שיא החשמל והמיזוג",
    logo: "/partners/p089.webp",
  },
  {
    name: "שיק מן",
    logo: "/partners/p090.webp",
  },
  {
    name: "שפע סטוק - בני ברק",
    logo: "/partners/p091.webp",
    city: "בני ברק",
  },
  {
    name: "תכשיק",
    logo: "/partners/p092.webp",
  },
]

/** The categories actually present in the directory, for the filter. Derived, not
 *  declared: a hardcoded list offered filters that matched nothing. */
export const PARTNER_CATEGORIES = [
  "כל הקטגוריות",
  ...Array.from(new Set(PARTNERS.map((p) => p.category).filter(Boolean) as string[])).sort(
    (a, b) => a.localeCompare(b, "he"),
  ),
];

/** Likewise the cities. */
export const CITY_OPTIONS = [
  { value: "all", label: "כל הערים" },
  ...Array.from(new Set(PARTNERS.map((p) => p.city).filter(Boolean) as string[]))
    .sort((a, b) => a.localeCompare(b, "he"))
    .map((c) => ({ value: c, label: c })),
];

export const SORT_OPTIONS = [
  { value: "featured", label: "מיון: הנבחרת שלנו" },
  { value: "name", label: "מיון: לפי שם" },
  { value: "city", label: "מיון: לפי עיר" },
];

/** Icon per category, for the plate where a partner logo will sit. */
export const CATEGORY_ICON: Record<string, string> = {
  "רשת מזון ומכולת": "shopping-cart",
  "מכולת שכונתית": "store",
  "בשר, עוף ודגים": "utensils",
  "ביגוד והנעלה": "shirt",
  "ספרי קודש ויודאיקה": "book",
  "כלי בית וריהוט": "package",
  "צעצועים ומתנות": "gift",
  "פארמה וטיפוח": "plus",
  אופטיקה: "search",
  "צרכי כתיבה ומשרד": "pencil",
};

/** Two-letter mark for the logo plate fallback.
 *  Takes the first letter of each of the first two words where there are two, so
 *  "כלי בית שלמה" reads "כב" rather than "כל". Hebrew has no case to lean on and
 *  no definite-article rule worth applying — stripping a leading ה turned
 *  "הלבשה למשפחה" into "לב", which is not the shop. */
export function partnerInitials(name: string) {
  const words = name.replace(/[·]/g, " ").split(/\s+/).filter(Boolean);
  if (words.length >= 2) return words[0][0] + words[1][0];
  return (words[0] ?? "").slice(0, 2);
}
