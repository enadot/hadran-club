/**
 * The benefit-depth model.
 *
 * The strategic brief is explicit that the discount is a *range*, not a number:
 * "אחוזים בודדים במוצרי יסוד וברשתות הגדולות, ועד עשרות אחוזים במותגי אופנה,
 * אופטיקה ומוצרים ייעודיים". Until the real per-merchant figures arrive from the
 * קהילות קארד API, the site describes that range qualitatively rather than
 * publishing a single flat percentage it cannot stand behind.
 *
 * Three tiers, in ascending order of depth. `exclusive` is not "deeper still" —
 * it is a different axis (access rather than size) and is the club's strongest
 * argument, so it carries the ink badge that nothing else on the page uses.
 */
import type { IconName } from "@/components/brand/Icon";
import type { BadgeTone } from "@/components/brand/Badge";

export type BenefitTier = "basic" | "deep" | "exclusive";

export type BenefitTierMeta = {
  /** The badge label on a partner row. */
  label: string;
  /** The same thing in one word, for badges sharing a line with a shop name on a
   *  phone — the full label wrapped and left every row a different height. */
  short: string;
  /** One line explaining what the tier means, for the detail sheet and legend. */
  description: string;
  /** Badge tone from the design system's existing palette — no new tokens. */
  tone: BadgeTone;
  /** Chosen from the icon set already in components/brand/Icon.tsx. */
  icon: IconName;
};

export const BENEFIT_TIERS: Record<BenefitTier, BenefitTierMeta> = {
  basic: {
    label: "הטבה קבועה",
    short: "קבועה",
    description:
      "הנחה שוטפת על הסל, במוצרי היסוד וברשתות הגדולות.",
    tone: "neutral",
    icon: "shopping-cart",
  },
  deep: {
    label: "הטבה מורחבת",
    short: "מורחבת",
    description:
      "הנחה גדולה בהרבה — ביגוד, אופטיקה ומוצרים ייעודיים.",
    tone: "gold",
    // A price tag, not sparkles. The sparkle read as decoration rather than as a
    // deal, and `percent` was already spoken for by the third how-it-works step.
    icon: "tag",
  },
  exclusive: {
    label: "בלעדי לחברי המועדון",
    short: "בלעדי",
    description:
      "בית עסק שההטבה בו זמינה אך ורק דרך הדרן קלאב.",
    tone: "ink",
    icon: "ticket",
  },
};

/** The order tiers are listed in filters and legends. */
export const BENEFIT_TIER_ORDER: BenefitTier[] = ["exclusive", "deep", "basic"];

/**
 * The line shown wherever the exact figure would otherwise go. Deliberately not a
 * number: the club's own terms make the figure per-merchant, so a headline
 * percentage here would be the "5% בכל מקום" claim the brief rules out.
 */
export const EXACT_BENEFIT_CTA = "הזינו מספר כרטיס לצפייה בהטבה המדויקת שלכם";

/** The standing disclaimer under any benefit figure or list. */
export const BENEFIT_DISCLAIMER =
  "ההטבה משתנה לפי בית העסק ובכפוף לתקנון המועדון ולתנאי בית העסק.";
