import type { IconName } from "@/components/brand/Icon";

/**
 * The two membership tracks.
 *
 * Pricing lived in exactly one place before — step two of the "order a card" track
 * inside /activate — so a visitor deciding whether to join could not find out what
 * it cost without starting the form. It is data now, and the home page states it.
 */
export type PlanId = "year" | "month";

export type Plan = {
  id: PlanId;
  name: string;
  price: string;
  /** The unit under the figure, e.g. "לשנה". */
  period: string;
  summary: string;
  /** Shown on the recommended plan only. */
  flag?: string;
  includes: { icon: IconName; text: string }[];
};

export const PLANS: Plan[] = [
  {
    id: "year",
    name: "מסלול שנתי",
    price: "₪249",
    period: "לשנה",
    summary: "המסלול שרוב המשפחות בוחרות. כרטיס נוסף לבן או בת הזוג כלול במחיר.",
    flag: "הבחירה של רוב החברים",
    includes: [
      { icon: "users", text: "כרטיס נוסף לבן/בת הזוג, ללא תוספת תשלום" },
      { icon: "ticket", text: "גישה מלאה לכל השותפים, כולל החנויות הבלעדיות" },
      { icon: "truck", text: "משלוח עד הבית ללא עלות" },
      { icon: "wallet", text: "מעקב חיסכון מצטבר באזור האישי" },
    ],
  },
  {
    id: "month",
    name: "מסלול חודשי",
    price: "₪29",
    period: "לחודש",
    summary: "בלי התחייבות. מתחילים, מתנסים, ומבטלים בכל עת בלי דמי ביטול.",
    includes: [
      { icon: "ticket", text: "גישה מלאה לכל השותפים, כולל החנויות הבלעדיות" },
      { icon: "truck", text: "משלוח עד הבית ללא עלות" },
      { icon: "wallet", text: "מעקב חיסכון מצטבר באזור האישי" },
      { icon: "refresh-cw", text: "ביטול בכל עת, ללא דמי ביטול" },
    ],
  },
];

export function planById(id: PlanId) {
  return PLANS.find((p) => p.id === id) ?? PLANS[0];
}

/** One-line summary used in confirmation summaries. */
export function planSummaryLine(id: PlanId) {
  const p = planById(id);
  return `${p.name.replace("מסלול ", "")} · ${p.price}`;
}
