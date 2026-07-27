import Link from "next/link";
import { Band, Container, Eyebrow, SectionLead, SectionTitle } from "@/components/site/Band";
import { Reveal } from "@/components/site/Reveal";
import { Badge } from "@/components/brand/Badge";
import { Button } from "@/components/brand/Button";
import { Card } from "@/components/brand/Card";
import { Icon } from "@/components/brand/Icon";
import { MemberCard } from "@/components/brand/MemberCard";
import { StatBlock } from "@/components/brand/StatBlock";
import { Figure } from "@/components/brand/Figure";
import { BorderBeam } from "@/components/magic/border-beam";
import { AnimatedShinyText } from "@/components/magic/animated-shiny-text";
import { SavingsCalculator } from "@/components/site/SavingsCalculator";

/** The three how-it-works steps, verbatim from Home.dc.html. */
const STEPS = [
  {
    n: "1",
    title: "מזמינים את הכרטיס",
    body: "ממלאים פרטים בסיסיים באתר. הכרטיס הפיזי נשלח עד הבית תוך חמישה ימי עסקים.",
  },
  {
    n: "2",
    title: "מפעילים בדקה",
    body: "הזנת מספר הכרטיס והפרטים האישיים באתר, והכרטיס פעיל ומשויך אליכם.",
  },
  {
    n: "3",
    title: "מציגים בקופה",
    body: "לפני התשלום מציגים את הכרטיס. 5% יורדים מהחשבון מיד — בלי טפסים ובלי בקשות.",
  },
];

/** The weekly basket, before and after the card. */
const BASKET = [
  { label: "מזון ומכולת", amount: "₪620" },
  { label: "בשר, עוף ודגים", amount: "₪310" },
  { label: "ביגוד והנעלה לילדים", amount: "₪240" },
  { label: "ספרי קודש וצרכי בית", amount: "₪150" },
];

const PARTNER_TILES = [
  { category: "רשת מזון", placeholder: "לוגו רשת מזון", icon: "shopping-cart" },
  { category: "ביגוד והנעלה", placeholder: "לוגו רשת ביגוד", icon: "shirt" },
  { category: "ספרי קודש ויודאיקה", placeholder: "לוגו חנות ספרים", icon: "book" },
  { category: "כלי בית וריהוט", placeholder: "לוגו כלי בית", icon: "package" },
] as const;

const AUDIENCES = [
  {
    icon: "users",
    title: "משפחה שרוצה לחסוך",
    body: "כל אחד יכול להצטרף למועדון ולקבל הדרן קארד — גם ללא קשר קודם להדרן.",
    cta: "קבלת כרטיס",
    href: "/activate",
  },
  {
    icon: "wallet",
    title: "לקוח הדרן קיים",
    body: "הכרטיס הוא הטבה נוספת ללקוחות הדרן. נכנסים לאזור האישי ורואים את החיסכון שנצבר.",
    cta: "לאזור האישי",
    href: "/member",
  },
  {
    icon: "store",
    title: "בעל עסק",
    body: "חשיפה לקהל ממוקד ואיכותי, תנועת לקוחות קבועה ושותפות עם מותג בעל מוניטין במגזר.",
    cta: "הצטרפות עסקים",
    href: "/merchants",
  },
] as const;

export default function HomePage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────────
          Headline against the membership card. Rendered without a scroll reveal:
          it is above the fold, so animating it in would only delay the LCP. */}
      <section className="bg-[var(--color-canvas-soft)] px-[clamp(16px,4vw,24px)] pt-[clamp(42px,8vw,72px)] pb-20">
        <Container className="grid grid-cols-[repeat(auto-fit,minmax(min(440px,100%),1fr))] items-center gap-14">
          <div className="flex flex-col items-start gap-6">
            <Badge tone="gold" icon="badge-percent">
              <AnimatedShinyText
                shimmerWidth={90}
                className="mx-0 max-w-none text-[var(--color-ink-deep)] via-[var(--color-ink-deep)]"
              >
                5% הנחה מיידית בקופה
              </AnimatedShinyText>
            </Badge>

            <h1 className="m-0 font-[family-name:var(--font-display)] text-[clamp(38px,9vw,68px)] leading-[1.04] font-extrabold tracking-[-0.015em]">
              חיסכון מהודר
              <br />
              לבית שלכם
            </h1>

            <p className="m-0 max-w-[470px] text-[clamp(17px,2.5vw,20px)] leading-[1.6] text-[var(--color-body)]">
              הדרן קארד הוא כרטיס פיזי אחד שמוריד 5% מכל קנייה, במקום. בלי נקודות, בלי קופונים ובלי
              טעינה מראש — מציגים בקופה וההנחה כבר בחשבון.
            </p>

            <div className="flex flex-wrap gap-3">
              <Button as="a" href="/activate" size="lg">
                קבלת הדרן קארד
              </Button>
              <Button as="a" href="/benefits" size="lg" variant="tertiary">
                לרשימת בתי העסק
              </Button>
            </div>

            <div className="flex items-center gap-2 text-[length:var(--text-body-sm)] text-[var(--color-mute)]">
              <Icon name="shield-check" size={18} color="var(--color-primary-deep)" />
              הכרטיס מגיע עד הבית · ההנחה תקפה מהרגע הראשון · ללא התחייבות
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-5">
            <div className="flex flex-col items-start gap-2.5">
              <span
                className="font-[family-name:var(--font-display)] text-[148px] leading-[0.8] font-extrabold tracking-[-0.04em] text-[var(--gold-700)]"
                dir="ltr"
              >
                5%
              </span>
              <span className="text-[length:var(--text-body-sm)] leading-[1.45] font-bold tracking-[var(--tracking-wide)] text-[var(--color-primary-deep)]">
                הנחה מיידית
                <br />
                בקופה, בכל קנייה
              </span>
            </div>

            {/* The one brand moment on this page: a soft gold beam around the card. */}
            <div className="rotate-[-3deg]">
              <div className="relative rounded-[var(--radius-2xl)]">
                <MemberCard
                  holder="משפחת כהן"
                  tier="חבר מועדון · הדרן קארד"
                  width="min(400px, calc(100vw - 48px))"
                />
                <BorderBeam
                  size={110}
                  duration={9}
                  borderWidth={2}
                  colorFrom="var(--gold-100)"
                  colorTo="var(--gold-300)"
                  className="rounded-[var(--radius-2xl)]"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Stat strip ───────────────────────────────────────────────────── */}
      <section className="border-b border-[var(--color-border)] bg-[var(--color-canvas)] px-[clamp(16px,4vw,24px)] py-[clamp(28px,5.3vw,48px)]">
        <Reveal
          stagger
          className="mx-auto grid max-w-[var(--container-max)] grid-cols-[repeat(auto-fit,minmax(min(210px,100%),1fr))] gap-6"
        >
          <StatBlock value="5%" label="הנחה מיידית" sublabel="בקופה, בכל קנייה" icon="badge-percent" />
          <StatBlock
            value={<Figure value={312} />}
            label="בתי עסק שותפים"
            sublabel="ומצטרפים חדשים כל חודש"
            icon="store"
          />
          <StatBlock
            value={<Figure value={1240} prefix="₪" />}
            label="חיסכון חודשי ממוצע"
            sublabel="למשפחה בת שש נפשות"
            icon="wallet"
          />
          <StatBlock
            value={<Figure value={24800} />}
            label="משפחות במועדון"
            sublabel="בבני ברק, ירושלים ובית שמש"
            icon="users"
          />
        </Reveal>
      </section>

      {/* ── How it works ─────────────────────────────────────────────────── */}
      <Band id="how" tone="white">
        <Container className="flex flex-col gap-8">
          <Reveal className="flex flex-col gap-3">
            <Eyebrow>איך זה עובד</Eyebrow>
            <SectionTitle>שלושה צעדים, פעם אחת</SectionTitle>
            <SectionLead className="max-w-[620px]">
              ההצטרפות לוקחת שתי דקות. אחר כך הכרטיס פשוט עובד — בלי לזכור מבצעים ובלי לאסוף קופונים.
            </SectionLead>
          </Reveal>

          <Reveal
            stagger
            className="grid grid-cols-[repeat(auto-fit,minmax(min(270px,100%),1fr))] gap-6"
          >
            {STEPS.map((step) => (
              <Card key={step.n} tone="sand">
                <div className="flex flex-col gap-3">
                  <span className="font-[family-name:var(--font-display)] text-[clamp(26px,5.5vw,40px)] leading-none font-extrabold text-[var(--color-primary-deep)]">
                    {step.n}
                  </span>
                  <b className="text-[clamp(17px,2.6vw,21px)]">{step.title}</b>
                  <span className="leading-[1.6] text-[var(--color-body)]">{step.body}</span>
                </div>
              </Card>
            ))}
          </Reveal>
        </Container>
      </Band>

      {/* ── Savings calculator ───────────────────────────────────────────── */}
      <Band tone="sand">
        <SavingsCalculator />
      </Band>

      {/* ── One basket, before and after ─────────────────────────────────── */}
      <Band tone="white">
        <Container className="grid grid-cols-[repeat(auto-fit,minmax(min(380px,100%),1fr))] items-center gap-12">
          <Reveal className="flex flex-col gap-5">
            <Eyebrow>דוגמה מהחיים</Eyebrow>
            <SectionTitle>סל קניות אחד, לפני ואחרי</SectionTitle>
            <SectionLead>
              קנייה שגרתית לשבוע במשפחה בת שש נפשות. אותם מוצרים, אותן חנויות — סכום אחר בקופה.
            </SectionLead>
            <div className="flex items-center gap-2 text-[length:var(--text-body-sm)] text-[var(--color-mute)]">
              <Icon name="receipt" size={18} color="var(--color-primary-deep)" />
              ההנחה מחושבת על הסל כולו, לא על מוצרים נבחרים
            </div>
          </Reveal>

          <Reveal>
            <Card tone="sand" padding="clamp(18px,5vw,32px)">
              <div className="flex flex-col gap-3.5">
                {BASKET.map((row) => (
                  <div
                    key={row.label}
                    className="flex justify-between text-[clamp(15px,2.2vw,17px)]"
                  >
                    <span>{row.label}</span>
                    <span className="tnum font-semibold">{row.amount}</span>
                  </div>
                ))}

                <div className="my-1 h-px bg-[var(--color-border)]" />

                <div className="flex justify-between text-[clamp(15px,2.2vw,17px)] text-[var(--color-body)]">
                  <span>סך הסל</span>
                  <span className="tnum">₪1,320</span>
                </div>
                <div className="flex justify-between text-[clamp(15px,2.2vw,17px)] font-bold text-[var(--color-positive)]">
                  <span>הנחת הדרן קארד · 5%</span>
                  <span className="tnum">‎−₪66</span>
                </div>

                <div className="flex items-baseline justify-between border-t-2 border-[var(--color-ink)] pt-2.5">
                  <span className="text-[clamp(16px,2.4vw,19px)] font-bold">לתשלום בקופה</span>
                  <span className="tnum font-[family-name:var(--font-display)] text-[clamp(25px,5vw,36px)] font-extrabold">
                    ₪1,254
                  </span>
                </div>

                <span className="text-[length:var(--text-caption)] text-[var(--color-mute)]">
                  ₪66 בשבוע · ₪286 בחודש · ₪3,432 בשנה. בכפוף לתקנון המועדון. ט.ל.ח.
                </span>
              </div>
            </Card>
          </Reveal>
        </Container>
      </Band>

      {/* ── Where the card works ─────────────────────────────────────────── */}
      <Band tone="sand">
        <Container className="flex flex-col gap-8">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <div className="flex flex-col gap-3">
              <Eyebrow>בתי עסק שותפים</Eyebrow>
              <SectionTitle>איפה הכרטיס עובד</SectionTitle>
              <SectionLead className="max-w-[620px]">
                רשתות מזון, ביגוד, ספרי קודש וכלי בית — בשכונות שבהן הקהילה קונה ממילא.
              </SectionLead>
            </div>
            <Button as="a" href="/benefits" variant="tertiary" iconAfter="arrow-left">
              לכל בתי העסק
            </Button>
          </Reveal>

          <Reveal
            stagger
            className="grid grid-cols-[repeat(auto-fit,minmax(min(200px,100%),1fr))] gap-4"
          >
            {PARTNER_TILES.map((tile) => (
              <Card key={tile.category} tone="plain" padding="20px">
                <div className="flex flex-col gap-3">
                  {/* No partner logos shipped with the handoff — the design system's
                      fallback is a sand panel with a gold icon disc. */}
                  <div className="grid h-[74px] place-items-center rounded-[var(--radius-md)] bg-[var(--color-canvas-soft)]">
                    <Icon name={tile.icon} size={26} color="var(--color-primary-deep)" />
                    <span className="sr-only">{tile.placeholder}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[length:var(--text-body-sm)] text-[var(--color-mute)]">
                      {tile.category}
                    </span>
                    <b className="text-[var(--color-primary-deep)]">5%</b>
                  </div>
                </div>
              </Card>
            ))}
          </Reveal>
        </Container>
      </Band>

      {/* ── Who it is for ────────────────────────────────────────────────── */}
      <Band tone="white">
        <Container className="flex flex-col gap-8">
          <Reveal className="flex flex-col gap-3">
            <Eyebrow>למי זה מיועד</Eyebrow>
            <SectionTitle>בחרו את המסלול שלכם</SectionTitle>
          </Reveal>

          <Reveal
            stagger
            className="grid grid-cols-[repeat(auto-fit,minmax(min(270px,100%),1fr))] gap-6"
          >
            {AUDIENCES.map((a) => (
              <Link key={a.title} href={a.href} className="no-underline">
                <Card tone="hairline" padding="clamp(18px,5vw,28px)" interactive className="h-full">
                  <div className="flex h-full flex-col gap-3.5">
                    <Icon name={a.icon} size={28} color="var(--color-primary-deep)" />
                    <b className="text-[clamp(18px,2.8vw,22px)] text-[var(--color-ink)]">{a.title}</b>
                    <span className="flex-1 leading-[1.6] text-[var(--color-body)]">{a.body}</span>
                    <span className="flex items-center gap-1.5 font-bold text-[var(--color-primary-deep)]">
                      {a.cta}
                      <Icon name="arrow-left" size={18} />
                    </span>
                  </div>
                </Card>
              </Link>
            ))}
          </Reveal>
        </Container>
      </Band>

      {/* ── Testimonial ──────────────────────────────────────────────────── */}
      <Band tone="sand">
        <Reveal>
          <Container narrow className="flex flex-col items-center gap-5 text-center">
            <Icon name="quote" size={32} color="var(--gold-500)" />
            <span className="font-[family-name:var(--font-serif)] text-[clamp(23px,4.5vw,32px)] leading-[1.4] font-bold">
              ״קונים בדיוק אותו דבר ומשלמים פחות. אחרי חודשיים הכרטיס כבר החזיר את עצמו, ובעיקר — אין
              צורך לרוץ אחרי מבצעים.״
            </span>
            <span className="text-[15px] text-[var(--color-body)]">
              משפחת פרידמן · בני ברק · חברי מועדון מאז תשפ״ד
            </span>
          </Container>
        </Reveal>
      </Band>

      {/* ── Closing CTA ──────────────────────────────────────────────────── */}
      <Band tone="white">
        <Container>
          <Reveal>
            <Card tone="ink" padding="clamp(18px,5vw,48px)">
              <div className="flex flex-wrap items-center justify-between gap-8">
                <div className="flex flex-col gap-3">
                  <h3 className="m-0 font-[family-name:var(--font-display)] text-[clamp(26px,5.5vw,40px)] font-extrabold text-[var(--color-primary)]">
                    מגיע לכם שקט נפשי גם בקניות
                  </h3>
                  <p className="m-0 text-[clamp(16px,2.3vw,18px)] text-[var(--sand-300)]">
                    מזמינים את הדרן קארד עוד היום, ומתחילים לחסוך בקנייה הראשונה.
                  </p>
                </div>
                <Button as="a" href="/activate" size="lg">
                  קבלת הדרן קארד
                </Button>
              </div>
            </Card>
          </Reveal>
        </Container>
      </Band>
    </>
  );
}
