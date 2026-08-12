import type { Purchase } from "./activity";

/** Three months of usage history — verbatim from ACTIVITY in Member.dc.html. */
export const MEMBER_ACTIVITY: Record<string, Purchase[]> = {
  tamuz: [
    { title: "רשת מזון ומכולת", meta: "בני ברק · כ״א בתמוז", amount: "₪1,320", saved: "חסכתם ₪66" },
    { title: "בשר, עוף ודגים", meta: "בני ברק · י״ט בתמוז", amount: "₪310", saved: "חסכתם ₪15.50" },
    {
      title: "ספרי קודש ויודאיקה",
      meta: "ירושלים · י״ז בתמוז",
      amount: "₪240",
      saved: "חסכתם ₪12",
    },
    { title: "ביגוד והנעלה לילדים", meta: "אלעד · ט״ו בתמוז", amount: "₪480", saved: "חסכתם ₪24" },
    { title: "כלי בית וריהוט", meta: "בית שמש · י״ב בתמוז", amount: "₪690", saved: "חסכתם ₪34.50" },
    { title: "רשת מזון ומכולת", meta: "בני ברק · ט׳ בתמוז", amount: "₪1,180", saved: "חסכתם ₪59" },
    { title: "פארמה וטיפוח", meta: "ירושלים · ז׳ בתמוז", amount: "₪215", saved: "חסכתם ₪10.75" },
    { title: "רשת מזון ומכולת", meta: "בני ברק · ג׳ בתמוז", amount: "₪1,290", saved: "חסכתם ₪64.50" },
  ],
  sivan: [
    {
      title: "רשת מזון ומכולת",
      meta: "בני ברק · כ״ז בסיוון",
      amount: "₪1,410",
      saved: "חסכתם ₪70.50",
    },
    { title: "צעצועים ומתנות", meta: "בני ברק · כ״ב בסיוון", amount: "₪180", saved: "חסכתם ₪9" },
    { title: "בשר, עוף ודגים", meta: "בני ברק · י״ח בסיוון", amount: "₪340", saved: "חסכתם ₪17" },
    {
      title: "רשת מזון ומכולת",
      meta: "בני ברק · י׳ בסיוון",
      amount: "₪1,250",
      saved: "חסכתם ₪62.50",
    },
    { title: "צרכי כתיבה ומשרד", meta: "אלעד · ה׳ בסיוון", amount: "₪95", saved: "חסכתם ₪4.75" },
  ],
  iyar: [
    { title: "רשת מזון ומכולת", meta: "בני ברק · כ״ה באייר", amount: "₪1,360", saved: "חסכתם ₪68" },
    { title: "אופטיקה", meta: "מודיעין עילית · י״ט באייר", amount: "₪740", saved: "חסכתם ₪37" },
    { title: "בשר, עוף ודגים", meta: "בני ברק · י״ד באייר", amount: "₪290", saved: "חסכתם ₪14.50" },
    { title: "רשת מזון ומכולת", meta: "בני ברק · ו׳ באייר", amount: "₪1,120", saved: "חסכתם ₪56" },
  ],
};

export const MONTH_OPTIONS = [
  { value: "tamuz", label: "תמוז תשפ״ו" },
  { value: "sivan", label: "סיוון תשפ״ו" },
  { value: "iyar", label: "אייר תשפ״ו" },
];

export const MEMBER_CITY_OPTIONS = [
  "בני ברק",
  "ירושלים",
  "בית שמש",
  "מודיעין עילית",
  "אלעד",
  "ביתר עילית",
];

/** Sums the saved column of a month, formatted as the prototype does: two decimals,
 *  with a trailing ".00" dropped. */
export function monthSavings(rows: Purchase[]) {
  const total = rows.reduce((sum, r) => sum + Number(r.saved.replace(/[^\d.]/g, "")), 0);
  return "₪" + total.toFixed(2).replace(/\.00$/, "");
}

/** Headline savings figures, by window. The member area used to lead with a
 *  "יתרה זמינה" — a stored balance the card only has if a budget was loaded onto
 *  it. What every member has, and what the club is actually selling, is the
 *  accumulated saving, so that is the number the page opens with now. */
export const SAVINGS_WINDOWS = [
  { value: "month", label: "החודש", amount: 286, purchases: 14, note: "תמוז תשפ״ו" },
  { value: "year", label: "מתחילת השנה", amount: 2914, purchases: 132, note: "תשפ״ו" },
  { value: "all", label: "מאז ההצטרפות", amount: 7480, purchases: 361, note: "מאז תשפ״ד" },
] as const;

export type SavingsWindow = (typeof SAVINGS_WINDOWS)[number]["value"];
