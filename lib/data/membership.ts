import type { IconName } from "@/components/brand/Icon";

/**
 * What the membership carries.
 *
 * This file replaces lib/data/plans.ts, which modelled two paid tracks — ₪249 a
 * year and ₪29 a month. The club does not charge for the card: membership is
 * free, so there is nothing to choose between and no figure to publish. The
 * four lines below are what the two tracks had in common, which is now simply
 * what every member gets.
 *
 * Nothing here states a price, including a struck-through one. "Was ₪249, now
 * free" is the kind of manufactured urgency the brief rules out, and it invites
 * the question of when the charging starts.
 */
export type MembershipInclude = { icon: IconName; text: string };

export const MEMBERSHIP_INCLUDES: MembershipInclude[] = [
  { icon: "ticket", text: "גישה מלאה לכל השותפים, כולל החנויות הבלעדיות" },
  { icon: "truck", text: "משלוח הכרטיס עד הבית, ללא עלות" },
  { icon: "users", text: "כרטיס נוסף לבן או בת הזוג, תחת אותה חברות" },
  { icon: "wallet", text: "מעקב אחר החיסכון המצטבר באזור האישי" },
];
