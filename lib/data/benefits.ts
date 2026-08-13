/**
 * The shared benefit copy.
 *
 * The strategic brief is explicit that the discount is a *range*, not a number: the
 * benefit is set per merchant, so the site describes it qualitatively and defers the
 * exact figure to the member's own card rather than publishing a headline percentage
 * it cannot stand behind at every till.
 *
 * The directory used to carry a three-tier vocabulary on top of this (a fixed /
 * extended / exclusive label badged on every row and offered as a filter). It was
 * removed: the per-merchant `benefit` line on each partner record already says what
 * the shop gives, in the merchant's own words, without a taxonomy in front of it.
 */

/**
 * The line shown wherever the exact figure would otherwise go. Deliberately not a
 * number: the club's own terms make the figure per-merchant, so a headline
 * percentage here would be the "5% בכל מקום" claim the brief rules out.
 */
export const EXACT_BENEFIT_CTA = "הזינו מספר כרטיס לצפייה בהטבה המדויקת שלכם";

/** The standing disclaimer under any benefit figure or list. */
export const BENEFIT_DISCLAIMER =
  "ההטבה משתנה לפי בית העסק ובכפוף לתקנון המועדון ולתנאי בית העסק. ט.ל.ח.";
