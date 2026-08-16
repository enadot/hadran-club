import Link from "next/link";
import { Band, Container, Eyebrow, SectionLead, SectionTitle } from "@/components/site/Band";
import { Reveal } from "@/components/site/Reveal";
import { Badge } from "@/components/brand/Badge";
import { Button } from "@/components/brand/Button";
import { Card } from "@/components/brand/Card";
import { Icon } from "@/components/brand/Icon";
import { StatBlock } from "@/components/brand/StatBlock";
import { Figure } from "@/components/brand/Figure";
import { AnimatedShinyText } from "@/components/magic/animated-shiny-text";
import { SpotlightCard } from "@/components/reactbits/spotlight-card";
import { BENEFIT_TIERS, BENEFIT_TIER_ORDER } from "@/lib/data/benefits";
import { MEMBERSHIP_INCLUDES } from "@/lib/data/membership";
import { PARTNERS, partnerInitials } from "@/lib/data/partners";
import { MEMBER_AREA_URL } from "@/lib/data/site";

/** The hero's three facts, one phrase each. */
const HERO_FACTS = ["ללא עלות", "משלוח עד הבית", "הנחה מיידית בקופה"] as const;

/** The three how-it-works steps. */
const STEPS = [
  {
    n: "1",
    title: "מזמינים את הכרטיס",
    body: "ממלאים פרטים באתר. הכרטיס מגיע עד הבית תוך חמישה ימי עסקים.",
    icon: "truck",
  },
  {
    n: "2",
    title: "מפעילים בדקה",
    body: "מזינים את מספר הכרטיס והפרטים האישיים, והוא פעיל על שמכם.",
    icon: "credit-card",
  },
  {
    n: "3",
    title: "מציגים בקופה",
    body: "מציגים את הכרטיס לפני התשלום. ההנחה יורדת מהחשבון מיד.",
    icon: "badge-percent",
  },
] as const;

const AUDIENCES = [
  {
    icon: "users",
    title: "משפחה שרוצה לחסוך",
    body: "כל משפחה יכולה להצטרף, גם ללא קשר קודם להדרן.",
    cta: "קבלת כרטיס",
    href: "/activate",
  },
  {
    icon: "wallet",
    title: "לקוח הדרן קיים",
    body: "החיסכון שנצבר מחכה לכם באזור האישי.",
    cta: "לאזור האישי",
    href: MEMBER_AREA_URL,
    external: true,
  },
  {
    icon: "store",
    title: "בעל עסק",
    body: "חשיפה לקהל ממוקד ותנועת לקוחות קבועה.",
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
      <section className="relative isolate overflow-hidden bg-[var(--color-canvas-soft)] px-[clamp(16px,4vw,24px)] pt-[clamp(40px,8vw,88px)] pb-[clamp(56px,9vw,112px)]">
        {/* Backdrop in two layers, both decorative — they carry nothing the copy
            does not already say, so neither is an <img>.

            The CSS mesh is the floor: it paints immediately, and it is the whole
            backdrop until the raster above it decodes. The raster is the
            generated gradient; as a background-image a missing file degrades to
            nothing rather than to a broken-image icon, which keeps the hero
            intact if the asset has not landed yet. Neither layer animates — this
            block sits over the LCP element. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-20 bg-[image:var(--gradient-hero)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-[url('/hero-gradient.jpg')] bg-cover bg-[position:30%_center] opacity-80"
        />
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

            {/* Two lines. The hero used to carry four, which put the whole
                benefit model above the fold and left nothing for the sections
                built to explain it. */}
            <p className="m-0 max-w-[440px] text-[clamp(18px,2.6vw,21px)] leading-[1.55] text-[var(--color-body)]">
              כרטיס אחד שפותח הטבות במאות בתי עסק.
              <br />
              מציגים בקופה — ומשלמים פחות.
            </p>

            <div className="flex w-full flex-col gap-3 min-[480px]:w-auto min-[480px]:flex-row min-[480px]:flex-wrap">
              <Button as="a" href="/activate" size="lg">
                קבלת הדרן קארד
              </Button>
              <Button as="a" href="/benefits" size="lg" variant="tertiary">
                לרשימת בתי העסק
              </Button>
            </div>

            {/* Three facts standing apart, not one sentence joined by dots. A
                dot-separated run-on is read as prose and skipped; three short
                items with a mark each are read as a list and scanned. */}
            <ul className="m-0 flex list-none flex-wrap gap-x-7 gap-y-2.5 p-0">
              {HERO_FACTS.map((fact) => (
                <li
                  key={fact}
                  className="flex items-center gap-2 text-[length:var(--text-body-sm)] font-semibold text-[var(--color-body)]"
                >
                  <Icon name="check" size={16} color="var(--color-primary-deep)" />
                  {fact}
                </li>
              ))}
            </ul>
          </div>

          {/* The club's own product shot of the card. It replaces the CSS
              MemberCard that stood in for it here — and with it the BorderBeam,
              which traced that div's rectangle and has nothing to trace on a
              tilted card wrapped in a ribbon. The page keeps its one brand
              moment; it is now the gold bloom behind the artwork, which costs no
              animation over the LCP element.

              No tilt either: the artwork is photographed on an angle already,
              and rotating it a second time reads as a mistake.

              A list of the three benefit tiers used to sit under the card. It
              said the same thing as the three cards in "עומק ההטבות" further
              down the page, and it made the hero argue its case before the
              visitor had read the headline. The section below is where that
              argument belongs; the hero just shows the card.

              MemberCard itself stays in the codebase — /activate renders it
              live as the holder types their name and card number.

              `isolate` scopes the bloom's negative z-index to this wrapper. The
              section is the nearest stacking context otherwise, and the bloom
              would resolve against the backdrop layers instead of the card. */}
          {/* 520px, not the 440px the CSS card used. The artwork frames the card in
              a ribbon that eats roughly a quarter of the box on every side, so at
              440px the card itself read smaller than the headline it sits beside. */}
          <div className="relative isolate mx-auto w-full max-w-[520px]">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-[6%] -z-10 rounded-[50%] bg-[image:var(--gradient-hero-bloom)] blur-[44px]"
            />
            {/* Decorative: the headline and paragraph beside it already carry
                every claim the picture makes. Sized eagerly and given explicit
                intrinsic dimensions so the column does not reflow around it. */}
            <img
              src="/hero-card.webp"
              alt=""
              width={2000}
              height={1185}
              fetchPriority="high"
              decoding="async"
              className="block h-auto w-full"
            />
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
              sublabel="ונוספים מדי חודש"
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
              sublabel="עם שותפים בכל אחד מהם"
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
        <Container className="flex flex-col gap-[clamp(28px,4vw,48px)]">
          <Reveal className="flex max-w-[720px] flex-col gap-3">
            <Eyebrow>עומק וטווח ההטבות</Eyebrow>
            <SectionTitle>מהנחה שוטפת ועד עשרות אחוזים</SectionTitle>
            <SectionLead>
              ההטבה נקבעת מול כל שותף בנפרד — מהנחה שוטפת על הסל ועד עשרות אחוזים
              בקטגוריות נבחרות.
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
                  רוצים לדעת מה ההטבה המדויקת באזור שלכם?
                </b>
                <span className="text-[length:var(--text-body-sm)] leading-[1.6] text-[var(--color-body)]">
                  ברשימה מופיעים סוג ההטבה והתנאים של כל שותף.
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
        <Container className="flex flex-col gap-[clamp(28px,4vw,48px)]">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <div className="flex max-w-[620px] flex-col gap-3">
              <Eyebrow>הנבחרת שלנו</Eyebrow>
              <SectionTitle>איפה הכרטיס עובד</SectionTitle>
              <SectionLead>
                מזון, ביגוד, ספרי קודש, אופטיקה וכלי בית — בערים שבהן הקהילה שלנו קונה.
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
        <Container className="flex flex-col gap-[clamp(28px,4vw,48px)]">
          <Reveal className="flex flex-col gap-3">
            <Eyebrow>איך זה עובד</Eyebrow>
            <SectionTitle>שלושה צעדים, וזהו</SectionTitle>
            <SectionLead className="max-w-[620px]">
              ההצטרפות לוקחת דקה. מכאן הכרטיס פשוט עובד.
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

      {/* ── Membership ───────────────────────────────────────────────────────
          This section used to compare two paid tracks side by side. The card is
          free, so there is nothing to compare — and "how much does it cost" is
          the first question a visitor arrives with, which makes the answer worth
          a section of its own rather than a line in the FAQ. */}
      <Band tone="sand">
        <Container className="flex flex-col gap-[clamp(28px,4vw,48px)]">
          <Reveal className="flex max-w-[640px] flex-col gap-3">
            <Eyebrow>החברות במועדון</Eyebrow>
            <SectionTitle>החברות במועדון ללא עלות</SectionTitle>
            <SectionLead>
              אין דמי חבר, אין תשלום חודשי ואין התחייבות.
            </SectionLead>
          </Reveal>

          <Reveal>
            <Card tone="plain" padding="clamp(20px,5vw,32px)">
              <div className="flex flex-col gap-6 min-[720px]:flex-row min-[720px]:items-center min-[720px]:justify-between min-[720px]:gap-10">
                <ul className="m-0 flex flex-1 list-none flex-col gap-3 p-0">
                  {MEMBERSHIP_INCLUDES.map((item) => (
                    <li key={item.text} className="flex items-start gap-3">
                      <span className="mt-0.5 flex-none">
                        <Icon name={item.icon} size={20} color="var(--color-primary-deep)" />
                      </span>
                      <span className="leading-[1.5] text-[var(--color-body)]">{item.text}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  as="a"
                  href="/activate"
                  size="lg"
                  className="w-full justify-center min-[720px]:w-auto min-[720px]:flex-none"
                >
                  קבלת הדרן קארד
                </Button>
              </div>
            </Card>
          </Reveal>
        </Container>
      </Band>

      {/* ── Who it is for ────────────────────────────────────────────────── */}
      <Band tone="white">
        <Container className="flex flex-col gap-[clamp(28px,4vw,48px)]">
          <Reveal className="flex flex-col gap-3">
            {/* The title used to read "בחרו את המסלול שלכם" — but this section is
                about audiences, not tracks, and "מסלול" is the word the pricing
                section directly above already owns. Two different meanings of the
                same word, one screen apart. */}
            <Eyebrow>הקהילה שלנו</Eyebrow>
            <SectionTitle>למי הכרטיס מתאים</SectionTitle>
          </Reveal>

          <Reveal
            stagger
            className="grid grid-cols-[repeat(auto-fit,minmax(min(270px,100%),1fr))] gap-6"
          >
            {AUDIENCES.map((a) => {
              const external = "external" in a && a.external;
              const card = (
                <SpotlightCard
                  spotlightColor="var(--gold-200)"
                  className="h-full rounded-[var(--radius-xl)]"
                >
                  <Card tone="hairline" padding="clamp(18px,5vw,28px)" interactive className="h-full">
                    <div className="flex h-full flex-col gap-3.5">
                      <Icon name={a.icon} size={28} color="var(--color-primary-deep)" />
                      <b className="text-[clamp(18px,2.8vw,22px)] text-[var(--color-ink)]">{a.title}</b>
                      <span className="flex-1 leading-[1.6] text-[var(--color-body)]">{a.body}</span>
                      <span className="flex items-center gap-1.5 font-bold text-[var(--color-primary-deep)]">
                        {a.cta}
                        <Icon name={external ? "external-link" : "arrow-left"} size={18} />
                      </span>
                    </div>
                  </Card>
                </SpotlightCard>
              );

              return external ? (
                <a
                  key={a.title}
                  href={a.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="no-underline"
                >
                  {card}
                </a>
              ) : (
                <Link key={a.title} href={a.href} className="no-underline">
                  {card}
                </Link>
              );
            })}
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
              בהן הטבה בלי הכרטיס — היום אנחנו מתחילים את הקניות דווקא שם.״
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
