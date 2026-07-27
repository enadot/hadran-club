import type { Metadata } from "next";
import { Band, Container, Eyebrow, SectionLead, SectionTitle } from "@/components/site/Band";
import { Reveal } from "@/components/site/Reveal";
import { Badge } from "@/components/brand/Badge";
import { Button } from "@/components/brand/Button";
import { Card } from "@/components/brand/Card";
import { Icon } from "@/components/brand/Icon";
import { Figure } from "@/components/brand/Figure";
import { MerchantJoinForm } from "./MerchantJoinForm";
import { ScrollToFormButton } from "./ScrollToFormButton";
import { SUPPORT_PHONE } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "הצטרפות בתי עסק",
  description:
    "חברי הדרן קלאב מחפשים איפה הכרטיס עובד לפני שהם יוצאים לקנות. הצטרפות למועדון מכניסה את העסק שלכם לרשימה — בלי עלות הקמה ובלי מערכת חדשה בקופה.",
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
    title: "שיחה קצרה",
    body: "ממלאים את הטופס, ונציג המועדון חוזר בתוך יום עסקים אחד.",
  },
  {
    n: "2",
    title: "הסכם והגדרה",
    body: "חותמים על הסכם פשוט, וההנחה מוגדרת במערכת קהילות קארד לכל הסניפים.",
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
            <h1 className="m-0 text-[clamp(32px,7.5vw,56px)] leading-[1.06] text-[var(--color-primary)]">
              הקהילה כבר קונה.
              <br />
              שווה שתקנה אצלכם
            </h1>
            <p className="m-0 max-w-[520px] text-[clamp(16px,2.4vw,19px)] leading-[1.6] text-[var(--sand-300)]">
              חברי הדרן קלאב מחפשים איפה הכרטיס עובד לפני שהם יוצאים לקנות. הצטרפות למועדון מכניסה את
              העסק שלכם לרשימה הזו — בלי עלות הקמה ובלי מערכת חדשה בקופה.
            </p>
            <div className="flex flex-wrap gap-3">
              <ScrollToFormButton size="lg">רוצים לשמוע עוד</ScrollToFormButton>
              <Button as="a" href="/benefits" size="lg" variant="ghost" className="text-[var(--color-primary)] hover:bg-[rgba(241,236,227,.08)]">
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
              <Card key={b.title} tone="sand" padding="clamp(18px,5vw,28px)">
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
          <Reveal className="grid grid-cols-[repeat(auto-fit,minmax(min(240px,100%),1fr))] overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-canvas)]">
            {STEPS.map((s, i) => (
              <div
                key={s.n}
                className={`flex flex-col gap-2.5 p-7 ${
                  i < STEPS.length - 1 ? "border-e border-[var(--color-border)]" : ""
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

      {/* ── Join form ────────────────────────────────────────────────────── */}
      <Band id="form" tone="white" className="scroll-mt-[90px]">
        <Container className="grid grid-cols-[repeat(auto-fit,minmax(min(360px,100%),1fr))] items-start gap-12">
          <div className="flex flex-col gap-[18px]">
            <Eyebrow>טופס הצטרפות</Eyebrow>
            <SectionTitle>נשמח לשמוע על העסק</SectionTitle>
            <p className="m-0 text-[clamp(16px,2.3vw,18px)] text-[var(--color-body)]">
              משאירים פרטים ונציג המועדון חוזר אליכם בתוך יום עסקים אחד. אין עלות הצטרפות ואין
              התחייבות לתקופה.
            </p>
            <div className="mt-2 flex flex-col gap-3">
              <a
                href={`tel:${SUPPORT_PHONE.replace(/-/g, "")}`}
                className="flex items-center gap-2.5 text-[15px] text-[var(--color-body)] no-underline hover:text-[var(--color-ink)]"
              >
                <Icon name="phone" size={20} color="var(--color-primary-deep)" />
                <span className="tnum ltr">{SUPPORT_PHONE}</span>
              </a>
              <a
                href="mailto:business@hadranclub.co.il"
                className="flex items-center gap-2.5 text-[15px] text-[var(--color-body)] no-underline hover:text-[var(--color-ink)]"
              >
                <Icon name="mail" size={20} color="var(--color-primary-deep)" />
                <span className="ltr">business@hadranclub.co.il</span>
              </a>
            </div>
          </div>

          <MerchantJoinForm />
        </Container>
      </Band>
    </>
  );
}
