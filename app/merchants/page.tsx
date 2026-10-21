import type { Metadata } from "next";
import { Band, Container, Eyebrow, SectionLead, SectionTitle } from "@/components/site/Band";
import { Reveal } from "@/components/site/Reveal";
import { Badge } from "@/components/brand/Badge";
import { Button } from "@/components/brand/Button";
import { Card } from "@/components/brand/Card";
import { Icon } from "@/components/brand/Icon";
import { Figure } from "@/components/brand/Figure";
import { MERCHANT_ONBOARDING_URL } from "@/lib/data/site";
import { MerchantJoinDialog } from "./MerchantJoinDialog";

export const metadata: Metadata = {
  title: "הצטרפות בתי עסק",
  description:
    "חברי הדרן קלאב מחפשים איפה הכרטיס עובד לפני שהם יוצאים לקנות. נרשמים באתר, בוחרים את שיעור ההנחה, והעסק נכנס לרשימה — בלי עלות הקמה ובלי מערכת חדשה בקופה.",
  alternates: { canonical: "/merchants" },
};

const HERO_STATS = [
  { value: 24800, label: "משפחות במועדון" },
  { value: 312, label: "בתי עסק שותפים" },
  { value: 1240, prefix: "₪", label: "קנייה חודשית ממוצעת למשפחה" },
  { value: 0, label: "עלות הקמה והצטרפות" },
] as const;

const BENEFITS = [
  {
    icon: "users",
    title: "קהל ממוקד ואיכותי",
    body: "קהילת הדרן והמגזר החרדי — לקוחות נאמנים, סל קנייה גדול וקנייה חוזרת בתדירות גבוהה.",
  },
  {
    icon: "receipt",
    title: "בלי מערכת חדשה בקופה",
    body: "ההנחה מוגדרת פעם אחת מול קהילות קארד. הקופאי רק מזהה את הכרטיס — וזה הכל.",
  },
  {
    icon: "badge-percent",
    title: "חשיפה בכל נקודות המועדון",
    body: "העסק מופיע ברשימת בתי העסק באתר, באזור האישי של החברים ובעדכונים החודשיים.",
  },
  {
    icon: "shield-check",
    title: "דוחות מימוש שקופים",
    body: "באזור בעלי העסקים רואים כמה עסקאות מומשו, באילו סניפים ובאיזה היקף.",
  },
] as const;

const STEPS = [
  {
    n: "1",
    title: "נרשמים באתר",
    body: "ממלאים את טופס ההצטרפות המקוון — פרטי העסק, הסניפים ושיעור ההנחה שבוחרים לתת לחברים.",
  },
  {
    n: "2",
    title: "אישור והגדרה",
    body: "צוות המועדון עובר על הפרטים, וההנחה מוגדרת במערכת קהילות קארד לכל הסניפים.",
  },
  {
    n: "3",
    title: "עולים לאוויר",
    body: "העסק מתפרסם ברשימה, והחברים מתחילים להציג את הכרטיס בקופה.",
  },
];

export default function MerchantsPage() {
  return (
    <>
      {/* ── Ink hero — this page's one dark band ─────────────────────────── */}
      <Band tone="ink">
        <Container className="grid grid-cols-[repeat(auto-fit,minmax(min(380px,100%),1fr))] items-center gap-12">
          <div className="flex flex-col items-start gap-[22px]">
            <Badge tone="gold" icon="store">
              הצטרפות בתי עסק
            </Badge>
            <h1 className="m-0 text-[clamp(32px,7.5vw,56px)] leading-[1.06] tracking-[var(--tracking-display-lg)] text-[var(--color-primary)]">
              הקהילה כבר קונה.
              <br />
              שווה שתקנה אצלכם
            </h1>
            <p className="m-0 max-w-[520px] text-[clamp(16px,2.4vw,19px)] leading-[1.6] text-[var(--sand-300)]">
              חברי הדרן קלאב מחפשים איפה הכרטיס עובד לפני שהם יוצאים לקנות. הצטרפות למועדון מכניסה את
              העסק שלכם לרשימה הזו — בלי עלות הקמה ובלי מערכת חדשה בקופה.
            </p>
            <div className="flex w-full flex-col gap-3 min-[480px]:w-auto min-[480px]:flex-row min-[480px]:flex-wrap">
              <Button
                as="a"
                href={MERCHANT_ONBOARDING_URL}
                target="_blank"
                rel="noopener noreferrer"
                size="lg"
                iconAfter="external-link"
                className="w-full justify-center min-[480px]:w-auto"
              >
                להצטרפות העסק למועדון
              </Button>
              {/* A borderless ghost on the ink band reads as loose text once it is
                  stacked under the primary, so it carries a hairline here. */}
              <Button
                as="a"
                href="/benefits"
                size="lg"
                variant="ghost"
                className="w-full justify-center border-[rgba(241,236,227,.28)] text-[var(--color-primary)] hover:bg-[rgba(241,236,227,.08)] min-[480px]:w-auto"
              >
                לרשימת בתי העסק
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(150px,100%),1fr))] gap-5">
            {HERO_STATS.map((s) => (
              <div
                key={s.label}
                className="flex flex-col gap-1.5 rounded-[var(--radius-xl)] bg-[rgba(241,236,227,.06)] p-6"
              >
                <span className="tnum font-[family-name:var(--font-display)] text-[clamp(27px,6vw,44px)] leading-none font-extrabold text-[var(--color-primary)]">
                  <Figure value={s.value} prefix={"prefix" in s ? s.prefix : undefined} />
                </span>
                <b className="text-[15px] text-[var(--sand-200)]">{s.label}</b>
              </div>
            ))}
          </div>
        </Container>
      </Band>

      {/* ── What the business gets ───────────────────────────────────────── */}
      <Band tone="white">
        <Container className="flex flex-col gap-8">
          <Reveal className="flex max-w-[700px] flex-col gap-3">
            <Eyebrow>מה העסק מקבל</Eyebrow>
            <SectionTitle>שותפות, לא פרסום</SectionTitle>
            <SectionLead>
              ההנחה שאתם נותנים חוזרת אליכם כתנועת לקוחות קבועה — וכשהמועדון ממליץ, הקהילה מקשיבה.
            </SectionLead>
          </Reveal>

          <Reveal
            stagger
            className="grid grid-cols-[repeat(auto-fit,minmax(min(270px,100%),1fr))] gap-6"
          >
            {BENEFITS.map((b) => (
              <Card key={b.title} tone="sand" padding="sm">
                <div className="flex flex-col gap-3">
                  <Icon name={b.icon} size={28} color="var(--color-primary-deep)" />
                  <b className="text-[clamp(17px,2.5vw,20px)]">{b.title}</b>
                  <span className="leading-[1.6] text-[var(--color-body)]">{b.body}</span>
                </div>
              </Card>
            ))}
          </Reveal>
        </Container>
      </Band>

      {/* ── Three steps ──────────────────────────────────────────────────── */}
      <Band tone="sand">
        <Container className="flex flex-col gap-8">
          <Reveal>
            <SectionTitle>מהפנייה ועד ההנחה הראשונה</SectionTitle>
          </Reveal>
          {/* Explicit 1→3 columns rather than auto-fit, because the rule between the
              steps has to follow the axis they are laid out on: an inline-end border
              on a stacked column draws a stray vertical hairline down the phone
              layout, which is what the auto-fit version did. */}
          <Reveal className="grid grid-cols-1 overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-canvas)] min-[820px]:grid-cols-3">
            {STEPS.map((s, i) => (
              <div
                key={s.n}
                className={`flex flex-col gap-2.5 p-[clamp(20px,5vw,28px)] ${
                  i < STEPS.length - 1
                    ? "border-b border-[var(--color-border)] min-[820px]:border-b-0 min-[820px]:border-e"
                    : ""
                }`}
              >
                <span className="font-[family-name:var(--font-display)] text-[clamp(23px,4.5vw,32px)] leading-none font-extrabold text-[var(--color-primary-deep)]">
                  {s.n}
                </span>
                <b className="text-[clamp(17px,2.5vw,20px)]">{s.title}</b>
                <span className="leading-[1.6] text-[var(--color-body)]">{s.body}</span>
              </div>
            ))}
          </Reveal>
        </Container>
      </Band>

      {/* ── The ask ──────────────────────────────────────────────────────────
          A band, not a form. Joining is self-serve on the operator's onboarding
          screen, which opens in a new tab; the enquiry dialog stays beside it for
          the owner who would rather talk to someone before signing up. */}
      <Band id="form" tone="pale" className="scroll-mt-[90px]">
        <Container narrow className="flex flex-col items-center gap-[22px] text-center">
          <Eyebrow>הצטרפות למועדון</Eyebrow>
          <SectionTitle>נשמח לשמוע על העסק</SectionTitle>
          <p className="m-0 max-w-[560px] text-[clamp(16px,2.3vw,18px)] leading-[1.6] text-[var(--color-body)]">
            ההצטרפות נעשית בטופס מקוון: ממלאים את פרטי העסק ובוחרים את שיעור ההנחה לחברים. אין
            עלות הצטרפות ואין התחייבות לתקופה. מעדיפים לדבר קודם? משאירים פרטים ונציג המועדון חוזר
            בתוך יום עסקים אחד.
          </p>

          <div className="flex w-full flex-col gap-3 min-[480px]:w-auto min-[480px]:flex-row min-[480px]:flex-wrap min-[480px]:justify-center">
            <Button
              as="a"
              href={MERCHANT_ONBOARDING_URL}
              target="_blank"
              rel="noopener noreferrer"
              size="lg"
              iconAfter="external-link"
              className="w-full justify-center min-[480px]:w-auto"
            >
              לטופס ההצטרפות
            </Button>
            <MerchantJoinDialog
              variant="tertiary"
              className="w-full justify-center min-[480px]:w-auto"
            >
              לשיחה עם נציג
            </MerchantJoinDialog>
          </div>
        </Container>
      </Band>
    </>
  );
}
