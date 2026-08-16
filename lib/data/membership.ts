import type { IconName } from "@/components/brand/Icon";

/**
 * Membership in the club. One card, one level, no fee — so there is nothing to
 * compare and nothing to choose. What used to be two priced tracks is a single
 * list of what a member gets, stated once and reused by the home page and by the
 * order flow.
 */
export const MEMBERSHIP = {
  name: "מה כלול",
  /** Stands where the price figure used to stand. */
  price: "ללא עלות",
  summary: "חברות אחת לכל המשפחה, לכל בתי העסק השותפים.",
  includes: [
    { icon: "ticket", text: "גישה מלאה לכל השותפים, כולל החנויות הבלעדיות" },
    { icon: "users", text: "כרטיס נוסף לבן/בת הזוג, ללא תוספת תשלום" },
    { icon: "truck", text: "משלוח עד הבית ללא עלות" },
    { icon: "wallet", text: "מעקב חיסכון מצטבר באזור האישי" },
  ] satisfies { icon: IconName; text: string }[],
};
