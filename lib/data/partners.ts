import type { BenefitTier } from "./benefits";
import type { LiveBranch } from "./live-benefits";

/**
 * The partner directory behind /benefits and the global search.
 *
 * These are the club's real partners, with the logo each one supplied and the
 * trade the club's own category list assigns it. Four shops that list marks
 * "ודאות נמוכה" — סקובה, פיומה, רקורד, שהחיינו קולורס — carry no category here:
 * the list itself recommends verifying them with the shop first, and a
 * directory that guesses is worse than one that says nothing.
 *
 * The benefit and its conditions have still not been handed over, so they are
 * absent rather than invented. Every field below `name` is optional, and the UI
 * renders a partner from what that partner actually has.
 *
 * `tier` describes the depth of the benefit, not its size — see lib/data/benefits.ts
 * for why there is no percentage on this record. `terms` are the per-merchant rules
 * the FAQ promises live "בכרטיס בית העסק".
 */
export type Partner = {
  name: string;
  /** Path under /public/partners. Absent for a partner whose logo the club has
   *  not supplied — the plate falls back to initials. */
  logo?: string;
  /** What the shop sells, in the club's own words, e.g. "חליפות ואופנת גברים".
   *  This is what a row shows; `category` is the coarser axis it filters on. */
  trade?: string;
  /** The filter group. One of a dozen, so the picker stays a picker — the trade
   *  labels alone run to some fifty distinct strings. */
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

  /* The four below are only ever set on a partner built from a live per-card
     lookup — see lib/data/live-benefits.ts. A partner from the static directory
     carries none of them, and every consumer treats them as optional. */

  /** Every town the partner has a branch in, where `city` names at most one. */
  cities?: string[];
  /** Named branches with address and opening hours, for the detail dialog. */
  branchList?: LiveBranch[];
  /** The platform's featured flag, which the "מומלצים" sort leads with. */
  featured?: boolean;
};

/** "4 סניפים" / "סניף אחד" — Hebrew has no bare "1 branch". */
export function branchLabel(n: number) {
  return n === 1 ? "סניף אחד" : `${n} סניפים`;
}

export const PARTNERS: Partner[] = [
  {
    name: "בורסלינו - כובעים",
    logo: "/partners/p001.webp",
    trade: "כובעים ואופנת גברים",
    category: "ביגוד והנעלה",
  },
  {
    name: "ויסטה - בני ברק",
    logo: "/partners/p002.webp",
    trade: "אופטיקה ומשקפיים",
    category: "אופטיקה",
    city: "בני ברק",
  },
  {
    name: "מעיין 2000",
    logo: "/partners/p003.webp",
    trade: "סופרמרקט ומזון קמעונאי",
    category: "מזון ומכולת",
  },
  {
    name: "פניצה",
    logo: "/partners/p004.webp",
    trade: "כובעים",
    category: "ביגוד והנעלה",
  },
  {
    name: "שפע ברכת השם",
    logo: "/partners/p005.webp",
    trade: "סופרמרקט ומכולת",
    category: "מזון ומכולת",
  },
  {
    name: "101 חליפות",
    logo: "/partners/p006.webp",
    trade: "חליפות ואופנת גברים",
    category: "ביגוד והנעלה",
  },
  {
    name: "280 (יו אופטיק) - אלעד",
    logo: "/partners/p007.webp",
    trade: "אופטיקה ומשקפיים",
    category: "אופטיקה",
    city: "אלעד",
  },
  {
    name: "אביבית ויצמן",
    logo: "/partners/p008.webp",
    trade: "אופנת נשים צנועה",
    category: "ביגוד והנעלה",
  },
  {
    name: "אדור - אהרונוביץ",
    logo: "/partners/p009.webp",
    trade: "אופנת גברים וחליפות",
    category: "ביגוד והנעלה",
  },
  {
    name: "אדור - בית אופנה לגברים",
    logo: "/partners/p010.webp",
    trade: "אופנת גברים וחליפות",
    category: "ביגוד והנעלה",
  },
  {
    name: "אוטו בני ברק",
    logo: "/partners/p011.webp",
    trade: "רכב ושירותי רכב",
    category: "שירותים",
    city: "בני ברק",
  },
  {
    name: "אופטיוויו",
    logo: "/partners/p012.webp",
    trade: "אופטיקה ומשקפיים",
    category: "אופטיקה",
  },
  {
    name: "אופטימלי - בית שמש",
    logo: "/partners/p013.webp",
    trade: "אופטיקה ומשקפיים",
    category: "אופטיקה",
    city: "בית שמש",
  },
  {
    name: "אופטימלי - מלכי ישראל",
    logo: "/partners/p014.webp",
    trade: "אופטיקה ומשקפיים",
    category: "אופטיקה",
  },
  {
    name: "אופטיקה סיגנר",
    logo: "/partners/p015.webp",
    trade: "אופטיקה ומשקפיים",
    category: "אופטיקה",
  },
  {
    name: "אורדמן - חלוקים",
    logo: "/partners/p016.webp",
    trade: "חלוקים וביגוד לבית",
    category: "ביגוד והנעלה",
  },
  {
    name: "אקסוס - ביתר",
    logo: "/partners/p017.webp",
    trade: "אופנת גברים וחליפות",
    category: "ביגוד והנעלה",
    city: "ביתר עילית",
  },
  {
    name: "אקסוס - בני ברק",
    logo: "/partners/p018.webp",
    trade: "אופנת גברים וחליפות",
    category: "ביגוד והנעלה",
    city: "בני ברק",
  },
  {
    name: "ארבעת המינים - גדות כינרת רוטנברג",
    logo: "/partners/p019.webp",
    trade: "תשמישי מצווה וארבעת המינים",
    category: "ספרי קודש ויודאיקה",
  },
  {
    name: "בגיר",
    logo: "/partners/p020.webp",
    trade: "אופנת גברים וחליפות",
    category: "ביגוד והנעלה",
  },
  {
    name: "בזאר שטראוס - אלעד",
    logo: "/partners/p021.webp",
    trade: "ביגוד, צעצועים ומוצרים לבית",
    category: "קמעונאות כללית",
    city: "אלעד",
  },
  {
    name: "בלאן",
    logo: "/partners/p022.webp",
    trade: "אופנת גברים",
    category: "ביגוד והנעלה",
  },
  {
    name: "בלייזר חליפות",
    logo: "/partners/p023.webp",
    trade: "חליפות ואופנת גברים",
    category: "ביגוד והנעלה",
  },
  {
    name: "ברודווי הלבשה חסידית",
    logo: "/partners/p024.webp",
    trade: "אופנת גברים חסידית",
    category: "ביגוד והנעלה",
  },
  {
    name: "ברון",
    logo: "/partners/p025.webp",
    trade: "אופנת גברים וחליפות",
    category: "ביגוד והנעלה",
  },
  {
    name: "ברטון חליפות",
    logo: "/partners/p026.webp",
    trade: "חליפות חתן ואופנת גברים",
    category: "ביגוד והנעלה",
  },
  {
    name: "ג'יבאני",
    logo: "/partners/p027.webp",
    trade: "אופנת גברים",
    category: "ביגוד והנעלה",
  },
  {
    name: "גלורי קידס בע\"מ",
    logo: "/partners/p028.webp",
    trade: "אופנת ילדים",
    category: "ביגוד והנעלה",
  },
  {
    name: "גרביים עד הבית",
    logo: "/partners/p029.webp",
    trade: "גרביים ואביזרי לבוש",
    category: "ביגוד והנעלה",
  },
  {
    name: "גרונר שעונים",
    logo: "/partners/p030.webp",
    trade: "שעונים ותכשיטים",
    category: "תכשיטים ושעונים",
  },
  {
    name: "דפוס sos",
    logo: "/partners/p031.webp",
    trade: "דפוס ושירותי הדפסה",
    category: "שירותים",
  },
  {
    name: "האטסטון - חידוש וייצור כובעים",
    logo: "/partners/p032.webp",
    trade: "ייצור, תיקון וחידוש כובעים",
    category: "ביגוד והנעלה",
  },
  {
    name: "המכירה לקהילה שלך",
    logo: "/partners/p033.webp",
    trade: "מסחר מקוון ושירותי מכירה",
    category: "שירותים",
  },
  {
    name: "המעדניה ליזרוביץ",
    logo: "/partners/p034.webp",
    trade: "מעדנייה ומזון מוכן",
    category: "מזון ומכולת",
  },
  {
    name: "המשקף",
    logo: "/partners/p035.webp",
    trade: "אופטיקה ומשקפיים",
    category: "אופטיקה",
  },
  {
    name: "ויסטה - ירושלים",
    logo: "/partners/p036.webp",
    trade: "אופטיקה ומשקפיים",
    category: "אופטיקה",
    city: "ירושלים",
  },
  {
    name: "חולצות ניו יורק",
    logo: "/partners/p037.webp",
    trade: "חולצות ואופנת גברים",
    category: "ביגוד והנעלה",
  },
  {
    name: "חמדת הארץ",
    logo: "/partners/p038.webp",
    trade: "מכולת וסופרמרקט",
    category: "מזון ומכולת",
  },
  {
    name: "טיימינג שעונים",
    logo: "/partners/p039.webp",
    trade: "שעונים ואביזרי אופנה",
    category: "תכשיטים ושעונים",
  },
  {
    name: "טמבור פלוס",
    logo: "/partners/p040.webp",
    trade: "צבע, חומרי בניין וציוד לבית",
    category: "כלי בית וריהוט",
  },
  {
    name: "כובעי פוקס",
    logo: "/partners/p041.webp",
    trade: "כובעים",
    category: "ביגוד והנעלה",
  },
  {
    name: "כשר פון",
    logo: "/partners/p042.webp",
    trade: "טלפונים כשרים ותקשורת",
    category: "סלולר ותקשורת",
  },
  {
    name: "לוסו (LUSSO) בגדי יוקרה לתינוקות ופעוטות",
    logo: "/partners/p043.webp",
    trade: "אופנת תינוקות וילדים",
    category: "ביגוד והנעלה",
  },
  {
    name: "לוקסמן",
    logo: "/partners/p044.webp",
    trade: "אופנת גברים",
    category: "ביגוד והנעלה",
  },
  {
    name: "לורנס - קרית יערים",
    logo: "/partners/p045.webp",
    trade: "אופנה וביגוד",
    category: "ביגוד והנעלה",
    city: "קרית יערים",
  },
  {
    name: "לורנס פריז - צפת",
    logo: "/partners/p046.webp",
    trade: "אופנה וביגוד",
    category: "ביגוד והנעלה",
    city: "צפת",
  },
  {
    name: "לטס גו",
    logo: "/partners/p047.webp",
    trade: "אופנה וביגוד",
    category: "ביגוד והנעלה",
  },
  {
    name: "ליבוביץ",
    logo: "/partners/p048.webp",
    trade: "אופנה וביגוד",
    category: "ביגוד והנעלה",
  },
  {
    name: "ליברו - שדרת הבשמים",
    logo: "/partners/p049.webp",
    trade: "בשמים וקוסמטיקה",
    category: "פארמה וטיפוח",
  },
  {
    name: "לידר",
    logo: "/partners/p050.webp",
    trade: "אופנה וביגוד",
    category: "ביגוד והנעלה",
  },
  {
    name: "לייביש טשונט",
    logo: "/partners/p051.webp",
    trade: "אוכל מוכן — טשולנט",
    category: "מזון ומכולת",
  },
  {
    name: "ליל שישי בגג",
    logo: "/partners/p052.webp",
    trade: "מסעדה ואוכל",
    category: "מזון ומכולת",
  },
  {
    name: "מאפיית קציר חיטים",
    logo: "/partners/p053.webp",
    trade: "מאפייה ומוצרי מאפה",
    category: "מזון ומכולת",
  },
  {
    name: "מחסני קרעסטיר",
    logo: "/partners/p054.webp",
    trade: "מזון קמעונאי ומוצרים לבית",
    category: "קמעונאות כללית",
  },
  {
    name: "מטאל - סלולר כשר",
    logo: "/partners/p055.webp",
    trade: "טלפונים כשרים וסלולר",
    category: "סלולר ותקשורת",
  },
  {
    name: "מילאנו אופטיק",
    logo: "/partners/p056.webp",
    trade: "אופטיקה ומשקפיים",
    category: "אופטיקה",
  },
  {
    name: "מקימי",
    logo: "/partners/p057.webp",
    trade: "אופנת נשים צנועה",
    category: "ביגוד והנעלה",
  },
  {
    name: "מרכז התתים",
    logo: "/partners/p058.webp",
    trade: "שירותים למוסדות תורה",
    category: "שירותים",
  },
  {
    name: "משביר לעמו",
    logo: "/partners/p059.webp",
    trade: "קמעונאות ומוצרי צריכה",
    category: "קמעונאות כללית",
  },
  {
    name: "משכן התכלת",
    logo: "/partners/p060.webp",
    trade: "תשמישי קדושה, טליתות ויודאיקה",
    category: "ספרי קודש ויודאיקה",
  },
  {
    name: "משקפופר",
    logo: "/partners/p061.webp",
    trade: "אופטיקה ומשקפיים",
    category: "אופטיקה",
  },
  {
    name: "מתאים לי",
    logo: "/partners/p062.webp",
    trade: "אופנה וביגוד",
    category: "ביגוד והנעלה",
  },
  {
    name: "נעלי סטפס",
    logo: "/partners/p063.webp",
    trade: "נעליים והנעלה",
    category: "ביגוד והנעלה",
  },
  {
    name: "נתי קלמן ביטוח",
    logo: "/partners/p064.webp",
    trade: "ביטוח ושירותים פיננסיים",
    category: "שירותים",
  },
  {
    name: "סלולארג'",
    logo: "/partners/p065.webp",
    trade: "טלפונים, סלולר ואביזרים",
    category: "סלולר ותקשורת",
  },
  {
    name: "ספרייתי גיטלר",
    logo: "/partners/p066.webp",
    trade: "ספרים ומוצרי תרבות",
    category: "ספרי קודש ויודאיקה",
  },
  {
    name: "סקובה",
    logo: "/partners/p067.webp",
  },
  {
    name: "סקול",
    logo: "/partners/p068.webp",
    trade: "תלבושת אחידה וביגוד לילדים",
    category: "ביגוד והנעלה",
  },
  {
    name: "עור והדר",
    logo: "/partners/p069.webp",
    trade: "יודאיקה ומוצרי עור",
    category: "ספרי קודש ויודאיקה",
  },
  {
    name: "פאקו מישל",
    logo: "/partners/p070.webp",
    trade: "נעליים והנעלה",
    category: "ביגוד והנעלה",
  },
  {
    name: "פאר הרהיטים",
    logo: "/partners/p071.webp",
    trade: "ריהוט לבית",
    category: "כלי בית וריהוט",
  },
  {
    name: "פביו",
    logo: "/partners/p072.webp",
    trade: "אופנת גברים וילדים",
    category: "ביגוד והנעלה",
  },
  {
    name: "פוד אפיל",
    logo: "/partners/p073.webp",
    trade: "כלי בישול, אפייה ואירוח",
    category: "כלי בית וריהוט",
  },
  {
    name: "פיומה",
    logo: "/partners/p074.webp",
  },
  {
    name: "פינת הגלידה",
    logo: "/partners/p075.webp",
    trade: "גלידריה, קינוחים ובית קפה",
    category: "מזון ומכולת",
  },
  {
    name: "פיצה שמש",
    logo: "/partners/p076.webp",
    trade: "פיצרייה ומזון מהיר",
    category: "מזון ומכולת",
  },
  {
    name: "פמילי פאשן",
    logo: "/partners/p077.webp",
    trade: "אופנת משפחה וביגוד",
    category: "ביגוד והנעלה",
  },
  {
    name: "פרסטר",
    logo: "/partners/p078.webp",
    trade: "כובעים",
    category: "ביגוד והנעלה",
  },
  {
    name: "צ'ירינה",
    logo: "/partners/p079.webp",
    trade: "דגים ומוצרי מזון",
    category: "מזון ומכולת",
  },
  {
    name: "צולנט עולמי",
    logo: "/partners/p080.webp",
    trade: "אוכל מוכן — טשולנט",
    category: "מזון ומכולת",
  },
  {
    name: "צרכניית אחיעזר",
    logo: "/partners/p081.webp",
    trade: "מכולת וסופרמרקט",
    category: "מזון ומכולת",
  },
  {
    name: "קינדר טויס",
    logo: "/partners/p082.webp",
    trade: "צעצועים ומשחקים",
    category: "צעצועים ומתנות",
  },
  {
    name: "קלאס מן",
    logo: "/partners/p083.webp",
    trade: "אופנת גברים",
    category: "ביגוד והנעלה",
  },
  {
    name: "רפאלי - כל הסניפים",
    logo: "/partners/p084.webp",
    trade: "אופנה וביגוד",
    category: "ביגוד והנעלה",
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
    trade: "נעליים והנעלה",
    category: "ביגוד והנעלה",
  },
  {
    name: "שטיין יודאיקה",
    logo: "/partners/p088.webp",
    trade: "יודאיקה ותשמישי קדושה",
    category: "ספרי קודש ויודאיקה",
  },
  {
    name: "שיא החשמל והמיזוג",
    logo: "/partners/p089.webp",
    trade: "מוצרי חשמל ומיזוג",
    category: "כלי בית וריהוט",
  },
  {
    name: "שיק מן",
    logo: "/partners/p090.webp",
    trade: "אופנת גברים",
    category: "ביגוד והנעלה",
  },
  {
    name: "שפע סטוק - בני ברק",
    logo: "/partners/p091.webp",
    trade: "חנות סטוק וקמעונאות",
    category: "קמעונאות כללית",
    city: "בני ברק",
  },
  {
    name: "תכשיק",
    logo: "/partners/p092.webp",
    trade: "תכשיטים ואביזרי אופנה",
    category: "תכשיטים ושעונים",
  },
  {
    name: "אקסוס - אלעד",
    logo: "/partners/p018.webp",
    trade: "אופנת גברים וחליפות",
    category: "ביגוד והנעלה",
    city: "אלעד",
  },
  {
    name: "נטו חיסכון",
  },
]

/* The category and city pickers used to be derived here, off this list alone. The
 * directory now has a second source — the per-card benefit list, which carries its
 * own towns and its own trades — so they are derived from whatever list is on screen
 * instead: citiesOf() and categoriesOf() in ./live-benefits. */

export const SORT_OPTIONS = [
  // "הנבחרת שלנו" was the club's own name for this order and told a first-time
  // reader nothing about what it would do to the list. A sort control has to say
  // what it sorts by in words anyone reads the same way.
  { value: "featured", label: "מיון: מומלצים" },
  { value: "name", label: "מיון: לפי שם" },
  { value: "city", label: "מיון: לפי עיר" },
];

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
