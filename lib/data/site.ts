/** Shared chrome data — the nav links and footer columns from the prototypes. */

export type NavLink = { label: string; href: string; icon: string };

/** Order and labels are verbatim from the `links` array in every *.dc.html.
 *  Icons come from SiteNav.dc.html's ICONS map. */
export const NAV_LINKS: NavLink[] = [
  { label: "דף הבית", href: "/", icon: "home" },
  { label: "בתי העסק", href: "/benefits", icon: "store" },
  { label: "הפעלת כרטיס", href: "/activate", icon: "credit-card" },
  { label: "בדיקת יתרה", href: "/balance", icon: "wallet" },
  { label: "לבתי עסק", href: "/merchants", icon: "store" },
  { label: "שאלות ותשובות", href: "/faq", icon: "help-circle" },
  { label: "אזור אישי", href: "/member", icon: "user" },
];

/**
 * Column titles and labels are verbatim from `footerCols` in the prototypes. The
 * prototype rendered every link as href="#"; here the ones that map onto a real
 * route are wired up, and the rest stay inert until those pages exist.
 */
export const FOOTER_COLUMNS: {
  title: string;
  links: { label: string; href: string }[];
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
      { label: "אזור אישי", href: "/member" },
      { label: "אובדן או גניבה", href: "/faq" },
    ],
  },
  {
    title: "בתי עסק",
    links: [
      { label: "רשימת בתי העסק", href: "/benefits" },
      { label: "הצטרפות עסקים", href: "/merchants#form" },
      { label: "אזור בעלי עסקים", href: "/merchants" },
      { label: "יצירת קשר", href: "/merchants#form" },
    ],
  },
];

export const FOOTER_NOTE =
  "מועדון ההטבות של הדרן. 5% הנחה מיידית בקופה בכל בתי העסק השותפים — בלי נקודות, בלי קופונים ובלי טעינה מראש.";

export const LEGAL_LINE = "© תשפ״ו הדרן קלאב · בכפוף לתקנון המועדון · ט.ל.ח.";
export const OPERATOR_LINE = "מופעל על ידי קהילות קארד";

export const SUPPORT_PHONE = "03-000-0000";
export const SUPPORT_HOURS = "שירות הלקוחות · א׳–ה׳ 9:00–17:00";
