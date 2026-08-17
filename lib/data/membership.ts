/**
 * Membership in the club. One card, one level, no fee — and nothing to sign up for.
 *
 * Hadran Club is the benefits club of Hadran's own customers: the card comes with
 * being one. So this panel states what the membership is rather than selling it, and
 * it carries no call to action — there is no order to place.
 *
 * The copy is deliberately short. The fee-free claim used to be made four times
 * inside one screen — an eyebrow, a title, a lead, a price figure and two of the
 * bullets all said some form of "ללא עלות" — so the section read as an argument being
 * repeated rather than a fact being stated. It is stated once now, as the headline,
 * and the qualifiers that go with it sit in a single line of fine print beneath it.
 */
export const MEMBERSHIP = {
  eyebrow: "החברות במועדון",
  /** The whole proposition, in one word. Set large and in gold. */
  headline: "חינם",
  /** Completes the heading on a second line, in ink. */
  headlineTail: "לכל לקוחות הדרן",
  /** What a member gets. No icons: three short lines read faster without them. */
  includes: [
    "גישה מלאה לכל השותפים, כולל החנויות הבלעדיות",
    "כרטיס נוסף לבן/בת הזוג",
    "מעקב חיסכון מצטבר באזור האישי",
  ],
  /** The fine print, in one line, in the one place it is said. */
  terms: ["ללא דמי חבר", "ללא דמי חידוש", "כלול בלקוחות הדרן"],
};
