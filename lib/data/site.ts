/** Shared chrome data — the nav links and footer columns from the prototypes. */

/**
 * The member area is not part of this site. It is operated by Kehilot Card on their
 * own platform, so every "אזור אישי" affordance here is an outbound link. The address
 * is set per environment, which lets the operator point it wherever their member login
 * lives without a code change.
 */
export const MEMBER_AREA_URL =
  process.env.NEXT_PUBLIC_MEMBER_AREA_URL ?? "https://kehilotcard.co.il";

export type NavLink = {
  label: string;
  href: string;
  icon: string;
  /** Leaves the site — rendered as a plain anchor opening in a new tab. */
  external?: boolean;
};

/** Order and labels are verbatim from the `links` array in every *.dc.html.
 *  Icons come from SiteNav.dc.html's ICONS map.
 *
 *  The member area is not in this list: it is the nav's own button, on both the
 *  desktop bar and the drawer, because it is where a member of the club actually
 *  goes — and listing it twice in the same header said it was two destinations. */
export const NAV_LINKS: NavLink[] = [
  { label: "דף הבית", href: "/", icon: "home" },
  { label: "בתי העסק", href: "/benefits", icon: "store" },
  { label: "הפעלת כרטיס", href: "/activate", icon: "credit-card" },
  { label: "בדיקת יתרה", href: "/balance", icon: "wallet" },
  { label: "לבתי עסק", href: "/merchants", icon: "store" },
  { label: "שאלות ותשובות", href: "/faq", icon: "help-circle" },
];

/**
 * Column titles and labels are verbatim from `footerCols` in the prototypes. The
 * prototype rendered every link as href="#"; here the ones that map onto a real
 * route are wired up, and the rest stay inert until those pages exist.
 */
export const FOOTER_COLUMNS: {
  title: string;
  links: { label: string; href: string; external?: boolean }[];
}[] = [
  {
    title: "המועדון",
    links: [
      { label: "אודות הדרן קלאב", href: "/" },
      { label: "איך זה עובד", href: "/#how" },
      { label: "שאלות ותשובות", href: "/faq" },
      { label: "תקנון המועדון", href: "#" },
    ],
  },
  {
    title: "הכרטיס",
    links: [
      { label: "הפעלת כרטיס", href: "/activate" },
      { label: "בדיקת יתרה", href: "/balance" },
      { label: "אזור אישי", href: MEMBER_AREA_URL, external: true },
      { label: "אובדן או גניבה", href: "/faq" },
    ],
  },
  {
    title: "בתי עסק",
    links: [
      { label: "רשימת בתי העסק", href: "/benefits" },
      { label: "חנויות בלעדיות", href: "/benefits?tier=exclusive" },
      { label: "הצטרפות עסקים", href: "/merchants#form" },
      { label: "אזור בעלי עסקים", href: "/merchants" },
      { label: "יצירת קשר", href: "/merchants#form" },
    ],
  },
];

export const FOOTER_NOTE =
  "מועדון ההטבות של לקוחות הדרן. כרטיס אחד שפותח רשת רחבה של הטבות אצל השותפים שלנו — ההנחה יורדת בקופה, בלי נקודות ובלי קופונים.";

export const LEGAL_LINE = "© תשפ״ו הדרן קלאב · בכפוף לתקנון המועדון · ט.ל.ח.";
export const OPERATOR_LINE = "מופעל על ידי קהילות קארד";

export const SUPPORT_PHONE = "03-000-0000";
export const SUPPORT_HOURS = "שירות הלקוחות · א׳–ה׳ 9:00–17:00";
