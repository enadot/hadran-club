/** Purchase rows — verbatim from the BenefitRow list in Balance.dc.html. */
export type Purchase = {
  title: string;
  meta: string;
  amount: string;
  saved: string;
};

export const RECENT_PURCHASES: Purchase[] = [
  {
    title: "רשת מזון ומכולת",
    meta: "בני ברק · כ״א בתמוז",
    amount: "₪1,320",
    saved: "חסכתם ₪66",
  },
  { title: "בשר, עוף ודגים", meta: "בני ברק · י״ט בתמוז", amount: "₪310", saved: "חסכתם ₪15.50" },
  {
    title: "ספרי קודש ויודאיקה",
    meta: "ירושלים · י״ז בתמוז",
    amount: "₪240",
    saved: "חסכתם ₪12",
  },
  { title: "ביגוד והנעלה לילדים", meta: "אלעד · ט״ו בתמוז", amount: "₪480", saved: "חסכתם ₪24" },
  { title: "כלי בית וריהוט", meta: "בית שמש · י״ב בתמוז", amount: "₪690", saved: "חסכתם ₪34.50" },
];
