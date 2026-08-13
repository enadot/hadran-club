/**
 * The partner directory behind /benefits and the global search.
 *
 * The original handoff titled every tile by category, because no trade names came
 * with it — while Search.dc.html carried a *separate* list that did have names. The
 * two drifted: searching "אוצר הספרים" returned a result that linked to /benefits,
 * where no such shop existed. They are one list now, and lib/data/search.ts reads
 * from here.
 *
 * There is no percentage and no benefit-tier label on this record — see
 * lib/data/benefits.ts. What the shop gives is said once, in the merchant's own
 * words, in `benefit`. `terms` are the per-merchant rules the FAQ already promises
 * live "בכרטיס בית העסק"; before this they had nowhere to be shown.
 */
export type Partner = {
  name: string;
  category: string;
  city: string;
  /** Branch count as a number, so it can be sorted and pluralised correctly. */
  branches: number;
  /**
   * Set only on shops whose benefit exists nowhere else. It carries no badge of its
   * own — `benefit` says so in words — but it orders the roster and backs the
   * "חנויות בלעדיות" deep link from the footer.
   */
  exclusive?: boolean;
  /**
   * Path to the shop's logo under public/partners/, e.g. "/partners/hadar.svg".
   * Absent until the partner supplies one; every surface falls back to the Hebrew
   * initials plate. See public/partners/README.md.
   */
  logo?: string;
  /** The benefit in the merchant's own words, e.g. "הנחה על הסל כולו". */
  benefit: string;
  /** Per-merchant conditions, shown in the detail dialog. */
  terms: string[];
};

/** "4 סניפים" / "סניף אחד" — Hebrew has no bare "1 branch". */
export function branchLabel(n: number) {
  return n === 1 ? "סניף אחד" : `${n} סניפים`;
}

export const PARTNERS: Partner[] = [
  {
    name: "שפע ברכת השם",
    category: "רשת מזון ומכולת",
    city: "ירושלים",
    branches: 7,
    benefit: "הנחה על הסל כולו, בכל קנייה",
    terms: [
      "ההנחה חלה על הסל כולו, גם על מחירי מבצע",
      "מוצרים בפיקוח מחירים מוחרגים על פי חוק",
      "ללא מינימום קנייה",
    ],
  },
  {
    name: "מכולת הבית",
    category: "רשת מזון ומכולת",
    city: "בני ברק",
    branches: 4,
    benefit: "הנחה על הסל כולו, בכל קנייה",
    terms: ["ההנחה חלה על הסל כולו", "מוצרים בפיקוח מחירים מוחרגים על פי חוק"],
  },
  {
    name: "שער המזון",
    category: "רשת מזון ומכולת",
    city: "בית שמש",
    branches: 2,
    benefit: "הנחה על הסל כולו, בכל קנייה",
    terms: ["ההנחה חלה על הסל כולו", "מוצרים בפיקוח מחירים מוחרגים על פי חוק"],
  },
  {
    name: "מכולת שכונת הגפן",
    category: "מכולת שכונתית",
    city: "מודיעין עילית",
    branches: 1,
    benefit: "הנחה על הסל כולו, בכל קנייה",
    terms: ["ההנחה חלה על הסל כולו", "אינה חלה על מוצרי טבק ועל פיקדון"],
  },
  {
    name: "קצביית הכשרות",
    category: "בשר, עוף ודגים",
    city: "בני ברק",
    branches: 3,
    benefit: "הנחה על כל הקנייה בקצבייה",
    terms: ["ההנחה חלה על כל המוצרים בקצבייה", "אינה מצטברת עם מבצעי סוף יום"],
  },
  {
    name: "דגי הצפון",
    category: "בשר, עוף ודגים",
    city: "ירושלים",
    branches: 1,
    benefit: "הנחה על כל הקנייה",
    terms: ["ההנחה חלה על כל המוצרים", "ללא מינימום קנייה"],
  },
  {
    name: "הלבשה למשפחה",
    category: "ביגוד והנעלה",
    city: "בני ברק",
    branches: 2,
    benefit: "הנחה מוגדלת על כל הקולקציה",
    terms: [
      "ההטבה חלה על הקולקציה המלאה, כולל פריטי עונה",
      "אינה מצטברת עם מבצעי סוף עונה",
      "מימוש בסניפים המשתתפים בלבד",
    ],
  },
  {
    name: "נעלי הדר",
    category: "ביגוד והנעלה",
    city: "אלעד",
    branches: 1,
    benefit: "הנחה מוגדלת על כל דגמי הנעליים",
    terms: ["ההטבה חלה על כל דגמי הנעליים", "אינה מצטברת עם מבצעים אחרים"],
  },
  {
    name: "בגדי ילדים · הדר הבית",
    category: "ביגוד והנעלה",
    city: "ירושלים",
    branches: 3,
    exclusive: true,
    benefit: "הטבה שזמינה אך ורק לחברי הדרן קלאב",
    terms: [
      "ההטבה אינה מוצעת ללקוחות שאינם חברי המועדון",
      "יש להציג את הדרן קארד לפני התשלום",
      "מימוש בכל הסניפים",
    ],
  },
  {
    name: "אוצר הספרים",
    category: "ספרי קודש ויודאיקה",
    city: "ירושלים",
    branches: 3,
    benefit: "הנחה על כל הספרים והיודאיקה",
    terms: ["ההנחה חלה על כל המדף", "אינה חלה על הזמנות מיוחדות"],
  },
  {
    name: "יודאיקה מהדרין",
    category: "ספרי קודש ויודאיקה",
    city: "בני ברק",
    branches: 1,
    benefit: "הנחה מוגדלת על תשמישי קדושה",
    terms: ["ההטבה חלה על תשמישי קדושה ועל מהדורות מיוחדות", "אינה חלה על עבודות סופר סת״ם"],
  },
  {
    name: "כלי בית שלמה",
    category: "כלי בית וריהוט",
    city: "בית שמש",
    branches: 2,
    benefit: "הנחה מוגדלת על כלי בית ומטבח",
    terms: ["ההטבה חלה על כלי בית ועל כלי מטבח", "ריהוט בהזמנה — בתיאום מול הסניף"],
  },
  {
    name: "בית וריהוט · ביתר",
    category: "כלי בית וריהוט",
    city: "ביתר עילית",
    branches: 1,
    benefit: "הנחה על כל החנות",
    terms: ["ההנחה חלה על כל מוצרי החנות"],
  },
  {
    name: "עולם הצעצועים",
    category: "צעצועים ומתנות",
    city: "בני ברק",
    branches: 1,
    benefit: "הנחה מוגדלת על צעצועים ומתנות",
    terms: ["ההטבה חלה על כל החנות", "אינה חלה על כרטיסי מתנה"],
  },
  {
    name: "פארם משפחה",
    category: "פארמה וטיפוח",
    city: "ירושלים",
    branches: 4,
    benefit: "הנחה על מוצרי טיפוח ופארמה",
    terms: ["ההנחה חלה על מוצרי טיפוח", "תרופות מרשם מוחרגות על פי חוק"],
  },
  {
    name: "אופטיקה מרכז",
    category: "אופטיקה",
    city: "מודיעין עילית",
    branches: 1,
    exclusive: true,
    benefit: "הטבה שזמינה אך ורק לחברי הדרן קלאב",
    terms: [
      "ההטבה אינה מוצעת ללקוחות שאינם חברי המועדון",
      "כוללת בדיקת ראייה ללא תשלום",
      "חלה על מסגרות ועל עדשות",
    ],
  },
  {
    name: "צרכי כתיבה · הדר",
    category: "צרכי כתיבה ומשרד",
    city: "אלעד",
    branches: 2,
    benefit: "הנחה על כל צרכי הכתיבה",
    terms: ["ההנחה חלה על כל החנות", "ערכות בית ספר — בתיאום מול הסניף"],
  },
];

export const PARTNER_CATEGORIES = [
  "כל הקטגוריות",
  "רשת מזון ומכולת",
  "בשר, עוף ודגים",
  "ביגוד והנעלה",
  "ספרי קודש ויודאיקה",
  "כלי בית וריהוט",
  "פארמה וטיפוח",
];

export const CITY_OPTIONS = [
  { value: "all", label: "כל הערים" },
  { value: "בני ברק", label: "בני ברק" },
  { value: "ירושלים", label: "ירושלים" },
  { value: "בית שמש", label: "בית שמש" },
  { value: "מודיעין עילית", label: "מודיעין עילית" },
  { value: "אלעד", label: "אלעד" },
  { value: "ביתר עילית", label: "ביתר עילית" },
];

export const SORT_OPTIONS = [
  { value: "featured", label: "מיון: הנבחרת שלנו" },
  { value: "name", label: "מיון: לפי שם" },
  { value: "branches", label: "מיון: לפי מספר סניפים" },
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
  "פארמה וטיפוח": "shopping-bag",
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
