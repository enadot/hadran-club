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
import { PlanChooser } from "@/components/site/PlanChooser";
import { BENEFIT_TIERS, BENEFIT_TIER_ORDER } from "@/lib/data/benefits";
import { PARTNERS, partnerInitials } from "@/lib/data/partners";

/** The three how-it-works steps. */
const STEPS = [
  {
    n: "1",
    title: "מזמינים את הכרטיס",
    body: "ממלאים פרטים בסיסיים באתר. הכרטיס הפיזי נשלח עד הבית תוך חמישה ימי עסקים, ללא עלות משלוח.",
    icon: "truck",
  },
  {
    n: "2",
    title: "מפעילים בדקה",
    body: "מזינים את מספר הכרטיס ואת הפרטים האישיים באתר, והכרטיס פעיל ומשויך אליכם.",
    icon: "credit-card",
  },
  {
    n: "3",
    title: "מציגים בקופה",
    body: "לפני התשלום מציגים את הכרטיס. ההנחה יורדת מהחשבון מיד — בלי טפסים, בלי קופונים ובלי בקשות.",
    icon: "badge-percent",
  },
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
    body: "הכרטיס הוא המשך טבעי של הקשר. נכנסים לאזור האישי ורואים את החיסכון שנצבר.",
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

/** Four partners for the shop-window strip, exclusive shops first. */
const SHOWCASE = [...PARTNERS]
  .sort((a, b) => (a.tier === "exclusive" ? -1 : 0) - (b.tier === "exclusive" ? -1 : 0))
  .slice(0, 8);

export default function HomePage() {
  const exclusiveCount = PARTNERS.filter((p) => p.tier === "exclusive").length;
  const cityCount = new Set(PARTNERS.map((p) => p.city)).size;

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────────
          Rendered without a scroll reveal: it is above the fold, so animating it
          in would only delay the LCP. */}
      <section className="bg-[var(--color-canvas-soft)] px-[clamp(16px,4vw,24px)] pt-[clamp(32px,8vw,72px)] pb-[clamp(40px,8vw,80px)]">
        <Container className="grid grid-cols-[repeat(auto-fit,minmax(min(440px,100%),1fr))] items-center gap-[clamp(32px,6vw,56px)]">
          <div className="flex flex-col items-start gap-6">
            <Badge tone="gold" icon="ticket">
              <AnimatedShinyText
                shimmerWidth={90}
                className="mx-0 max-w-none text-[var(--color-ink-deep)] via-[var(--color-ink-deep)]"
              >
                מועדון ההטבות של הדרן
              </AnimatedShinyText>
            </Badge>

            <h1 className="m-0 font-[family-name:var(--font-display)] text-[clamp(38px,9vw,68px)] leading-[1.04] font-extrabold tracking-[-0.015em]">
              חיסכון מהודר
              <br />
              לבית שלכם
            </h1>

            <p className="m-0 max-w-[480px] text-[clamp(17px,2.5vw,20px)] leading-[1.6] text-[var(--color-body)]">
              הדרן קארד הוא כרטיס פיזי אחד שפותח רשת רחבה של הטבות — מהנחות קבועות בקנייה
              השבועית ועד לחנויות שההטבה בהן שמורה לחברי המועדון בלבד. מציגים בקופה, וההנחה
              כבר בחשבון.
            </p>

            <div className="flex w-full flex-col gap-3 min-[480px]:w-auto min-[480px]:flex-row min-[480px]:flex-wrap">
              <Button as="a" href="/activate" size="lg">
                קבלת הדרן קארד
              </Button>
              <Button as="a" href="/benefits" size="lg" variant="tertiary">
                לרשימת בתי העסק
              </Button>
            </div>

            <div className="flex items-start gap-2 text-[length:var(--text-body-sm)] leading-[1.5] text-[var(--color-mute)]">
              <span className="mt-0.5 flex-none">
                <Icon name="shield-check" size={18} color="var(--color-primary-deep)" />
              </span>
              הכרטיס מגיע עד הבית · ההנחה תקפה מהרגע הראשון · ללא התחייבות
            </div>
          </div>

          <div className="flex flex-col items-center gap-6">
            {/* The one brand moment on this page: a soft gold beam around the card.
                The tilt is dropped below 480px — there the card already fills the
                column, and a rotated 400px box would stick out past the gutter.
                The width stays explicit at every size: MemberCard is min(400px,100%),
                so an `w-auto` wrapper leaves it no containing width to resolve
                against and the artwork collapses to its content. */}
            <div className="order-2 w-full max-w-[400px] rotate-0 min-[480px]:rotate-[-3deg]">
              <div className="relative rounded-[var(--radius-2xl)]">
                <MemberCard holder="משפחת כהן" tier="חבר מועדון · הדרן קארד" />
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

            {/* Replaces the hero's giant "5%". The benefit is a range set per
                merchant, so the honest headline figure is the shape of the range,
                not a number the club would have to defend at every till. */}
            <ul className="order-1 m-0 flex w-full max-w-[400px] list-none flex-col gap-1.5 p-0 min-[480px]:order-3">
              {BENEFIT_TIER_ORDER.map((t) => {
                const meta = BENEFIT_TIERS[t];
                return (
                  <li
                    key={t}
                    className="flex items-center gap-2.5 rounded-[var(--radius-md)] bg-[var(--color-canvas)] px-3.5 py-2.5"
                  >
                    <Icon name={meta.icon} size={18} color="var(--color-primary-deep)" />
                    <span className="text-[length:var(--text-body-sm)] font-semibold">
                      {meta.label}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </Container>
      </section>

      {/* ── Stat strip ───────────────────────────────────────────────────── */}
      <section className="border-b border-[var(--color-border)] bg-[var(--color-canvas)] px-[clamp(16px,4vw,24px)] py-[clamp(28px,5.3vw,48px)]">
        <div className="mx-auto flex max-w-[var(--container-max)] flex-col gap-4">
          <Reveal
            stagger
            className="grid grid-cols-2 gap-x-5 gap-y-7 min-[900px]:grid-cols-4 min-[900px]:gap-6"
          >
            <StatBlock
              value={<Figure value={24800} />}
              label="משפחות במועדון"
              sublabel="בבני ברק, ירושלים ובית שמש"
              icon="users"
            />
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
              value={<Figure value={cityCount} />}
              label="יישובים"
              sublabel="ובכל אחד מהם הנבחרת שלנו"
              icon="map-pin"
            />
          </Reveal>
          <span className="text-[length:var(--text-caption)] text-[var(--color-mute)]">
            הנתונים להמחשה. בכפוף לתקנון המועדון. ט.ל.ח.
          </span>
        </div>
      </section>

      {/* ── The depth of the benefit ─────────────────────────────────────────
          Section 2 of the content brief, and the section the site was missing
          entirely. It replaces a savings calculator that multiplied the basket by
          a flat 5% — a rate the club does not actually offer. */}
      <Band tone="white">
        <Container className="flex flex-col gap-8">
          <Reveal className="flex max-w-[720px] flex-col gap-3">
            <Eyebrow>עומק וטווח ההטבות</Eyebrow>
            <SectionTitle>לא הנחה אחת. טווח שלם</SectionTitle>
            <SectionLead>
              ההטבה נקבעת מול כל שותף בנפרד. יש חנויות עם הנחה קבועה שמלווה את הקנייה השבועית,
              ויש קטגוריות שבהן כוח הקנייה של הקהילה מביא הטבות עמוקות משמעותית.
            </SectionLead>
          </Reveal>

          <Reveal stagger className="grid grid-cols-[repeat(auto-fit,minmax(min(280px,100%),1fr))] gap-4">
            {BENEFIT_TIER_ORDER.map((t) => {
              const meta = BENEFIT_TIERS[t];
              const isExclusive = t === "exclusive";
              return (
                <Card
                  key={t}
                  tone={isExclusive ? "ink" : "sand"}
                  padding="clamp(20px,5vw,28px)"
                  className="h-full"
                >
                  <div className="flex h-full flex-col gap-3.5">
                    <Icon
                      name={meta.icon}
                      size={28}
                      color={isExclusive ? "var(--color-primary)" : "var(--color-primary-deep)"}
                    />
                    <b
                      className={`text-[clamp(18px,2.8vw,22px)] ${
                        isExclusive ? "text-[var(--color-primary)]" : "text-[var(--color-ink)]"
                      }`}
                    >
                      {meta.label}
                    </b>
                    <span
                      className={`flex-1 leading-[1.6] ${
                        isExclusive ? "text-[var(--sand-300)]" : "text-[var(--color-body)]"
                      }`}
                    >
                      {meta.description}
                    </span>
                    {isExclusive ? (
                      <Link
                        href="/benefits?tier=exclusive"
                        className="flex items-center gap-1.5 font-bold text-[var(--color-primary)] no-underline hover:underline hover:underline-offset-[3px]"
                      >
                        {exclusiveCount === 1
                          ? "לחנות הבלעדית"
                          : `ל-${exclusiveCount} החנויות הבלעדיות`}
                        <Icon name="arrow-left" size={18} />
                      </Link>
                    ) : null}
                  </div>
                </Card>
              );
            })}
          </Reveal>

          <Reveal>
            <div className="flex flex-col gap-4 rounded-[var(--radius-xl)] border border-[var(--color-border)] p-[clamp(18px,4vw,28px)] min-[720px]:flex-row min-[720px]:items-center min-[720px]:justify-between">
              <div className="flex flex-col gap-1.5">
                <b className="text-[clamp(17px,2.6vw,20px)]">
                  רוצים לדעת מה ההטבה המדויקת אצלכם בשכונה?
                </b>
                <span className="text-[length:var(--text-body-sm)] leading-[1.6] text-[var(--color-body)]">
                  ברשימת בתי העסק מופיע סוג ההטבה והתנאים המלאים של כל שותף.
                </span>
              </div>
              <Button
                as="a"
                href="/benefits"
                iconAfter="arrow-left"
                className="w-full justify-center min-[720px]:w-auto min-[720px]:flex-none"
              >
                לרשימת בתי העסק
              </Button>
            </div>
          </Reveal>
        </Container>
      </Band>

      {/* ── The shop window ──────────────────────────────────────────────── */}
      <Band tone="sand">
        <Container className="flex flex-col gap-8">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <div className="flex max-w-[620px] flex-col gap-3">
              <Eyebrow>הנבחרת שלנו</Eyebrow>
              <SectionTitle>איפה הכרטיס עובד</SectionTitle>
              <SectionLead>
                רשתות מזון, ביגוד, ספרי קודש, אופטיקה וכלי בית — בשכונות ובערים שבהן הקהילה
                קונה ממילא.
              </SectionLead>
            </div>
            <Button
              as="a"
              href="/benefits"
              variant="tertiary"
              iconAfter="arrow-left"
              className="w-full justify-center min-[480px]:w-auto"
            >
              לכל בתי העסק
            </Button>
          </Reveal>

          {/* Named shops, not category placeholders. A row of four identical
              "רשת מזון" plates said nothing a member could recognise; the club's
              argument is that these are the shops they already walk into. */}
          <Reveal
            stagger
            className="grid grid-cols-2 gap-3 min-[720px]:grid-cols-4 min-[720px]:gap-4"
          >
            {SHOWCASE.slice(0, 8).map((p) => {
              const meta = BENEFIT_TIERS[p.tier];
              return (
                <Link key={p.name} href={`/benefits?q=${encodeURIComponent(p.name)}`} className="no-underline">
                  <Card
                    tone="plain"
                    padding="clamp(14px,3.5vw,18px)"
                    interactive
                    className="h-full"
                  >
                    <div className="flex h-full flex-col gap-3">
                      {/* No partner logos shipped with the handoff. Until they do,
                          the plate carries the shop's own initials rather than a
                          category icon repeated across the row. */}
                      <div className="grid h-[clamp(56px,15vw,70px)] place-items-center rounded-[var(--radius-md)] bg-[var(--color-canvas-soft)] font-[family-name:var(--font-display)] text-[clamp(18px,4vw,22px)] font-extrabold text-[var(--color-primary-deep)]">
                        {partnerInitials(p.name)}
                      </div>
                      <div className="flex flex-1 flex-col gap-1">
                        <b className="text-[length:var(--text-body-sm)] leading-[1.3] text-[var(--color-ink)]">
                          {p.name}
                        </b>
                        <span className="text-[length:var(--text-caption)] text-[var(--color-mute)]">
                          {p.city}
                        </span>
                      </div>
                      {p.tier === "exclusive" ? (
                        <Badge tone="ink" icon={meta.icon} className="self-start text-[length:var(--text-caption)]">
                          בלעדי
                        </Badge>
                      ) : null}
                    </div>
                  </Card>
                </Link>
              );
            })}
          </Reveal>
        </Container>
      </Band>

      {/* ── How it works ─────────────────────────────────────────────────── */}
      <Band id="how" tone="white">
        <Container className="flex flex-col gap-8">
          <Reveal className="flex flex-col gap-3">
            <Eyebrow>איך זה עובד</Eyebrow>
            <SectionTitle>שלושה צעדים, פעם אחת</SectionTitle>
            <SectionLead className="max-w-[620px]">
              ההצטרפות לוקחת שתי דקות. אחר כך הכרטיס פשוט עובד — בלי לזכור מבצעים ובלי לאסוף
              קופונים.
            </SectionLead>
          </Reveal>

          <Reveal
            stagger
            className="grid grid-cols-[repeat(auto-fit,minmax(min(270px,100%),1fr))] gap-6"
          >
            {STEPS.map((step) => (
              <Card key={step.n} tone="sand">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="font-[family-name:var(--font-display)] text-[clamp(26px,5.5vw,40px)] leading-none font-extrabold text-[var(--color-primary-deep)]">
                      {step.n}
                    </span>
                    <Icon name={step.icon} size={24} color="var(--color-primary-neutral)" />
                  </div>
                  <b className="text-[clamp(17px,2.6vw,21px)]">{step.title}</b>
                  <span className="leading-[1.6] text-[var(--color-body)]">{step.body}</span>
                </div>
              </Card>
            ))}
          </Reveal>
        </Container>
      </Band>

      {/* ── Membership ───────────────────────────────────────────────────── */}
      <Band tone="sand">
        <Container className="flex flex-col gap-8">
          <Reveal className="flex max-w-[640px] flex-col gap-3">
            <Eyebrow>החברות במועדון</Eyebrow>
            <SectionTitle>שני מסלולים, אותן הטבות</SectionTitle>
            <SectionLead>
              שני המסלולים פותחים בדיוק את אותם שותפים, כולל החנויות הבלעדיות. ההבדל היחיד הוא
              איך משלמים.
            </SectionLead>
          </Reveal>
          <Reveal>
            <PlanChooser />
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
              ״קונים בדיוק אותו דבר ומשלמים פחות. מה שהפתיע אותי זה דווקא החנויות שאי אפשר לקבל
              בהן הטבה בלי הכרטיס — לשם אנחנו הולכים עכשיו קודם.״
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
            <Card tone="ink" padding="clamp(20px,5vw,48px)">
              <div className="flex flex-wrap items-center justify-between gap-[clamp(20px,4vw,32px)]">
                <div className="flex flex-col gap-3">
                  <h3 className="m-0 font-[family-name:var(--font-display)] text-[clamp(26px,5.5vw,40px)] font-extrabold text-[var(--color-primary)]">
                    קונים בהדרן, חוסכים בהידור
                  </h3>
                  <p className="m-0 max-w-[520px] text-[clamp(16px,2.3vw,18px)] leading-[1.6] text-[var(--sand-300)]">
                    מזמינים את הדרן קארד עוד היום, ומתחילים לחסוך כבר בקנייה הראשונה.
                  </p>
                </div>
                <Button
                  as="a"
                  href="/activate"
                  size="lg"
                  className="w-full justify-center min-[480px]:w-auto"
                >
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
