import * as React from "react";
import Link from "next/link";
import { Band, Container, Eyebrow, SectionLead, SectionTitle } from "@/components/site/Band";
import { Reveal } from "@/components/site/Reveal";
import { Button } from "@/components/brand/Button";
import { Card } from "@/components/brand/Card";
import { Icon, type IconName } from "@/components/brand/Icon";
import { SpotlightCard } from "@/components/reactbits/spotlight-card";
import { HeroLogoWall } from "@/components/site/HeroLogoWall";
import { MembershipCard } from "@/components/site/MembershipCard";
import { BENEFIT_TIERS, BENEFIT_TIER_ORDER } from "@/lib/data/benefits";
import { PARTNERS } from "@/lib/data/partners";
import { PartnerCard } from "@/components/site/PartnerCard";
import { MEMBER_AREA_URL } from "@/lib/data/site";

/** The three how-it-works steps. Receiving the card is not one of them: it comes
 *  with being a Hadran customer, so the first thing a member does here is activate
 *  the card already in their hand. */
const STEPS = [
  {
    n: "1",
    title: "מקבלים את הכרטיס",
    body: "לקוחות הדרן מזמינים את הכרטיס באפליקציית שירות ותמיכה שבמכשיר, ללא עלות.",
    icon: "credit-card",
  },
  {
    n: "2",
    title: "מפעילים בדקה",
    body: "מזינים את מספר הכרטיס באתר, והוא רשום על שמכם.",
    icon: "circle-check",
  },
  {
    n: "3",
    title: "מציגים בקופה",
    body: "מציגים לפני התשלום, וההנחה יורדת מהחשבון מיד.",
    icon: "badge-percent",
  },
] as const;

/** What this site does, in the order a member needs it. */
const SERVICES = [
  {
    icon: "store",
    title: "רשימת בתי העסק",
    body: "איפה הכרטיס עובד, מה ההטבה בכל שותף ואילו חנויות בלעדיות למועדון.",
    cta: "לרשימה",
    href: "/benefits",
  },
  {
    icon: "wallet",
    title: "בדיקת יתרה",
    body: "מספר הכרטיס מספיק כדי לראות את היתרה הזמינה ואת סטטוס הכרטיס.",
    cta: "לבדיקת יתרה",
    href: "/balance",
  },
  {
    icon: "user",
    title: "האזור האישי",
    body: "החיסכון שנצבר, הקניות שבהן מומשה ההנחה וניהול הכרטיסים במשפחה.",
    cta: "לאזור האישי",
    href: MEMBER_AREA_URL,
    external: true,
  },
  {
    icon: "handshake",
    title: "בעלי עסקים",
    body: "בית עסק שרוצה להיחשף לתנועת הלקוחות הקבועה של הקהילה.",
    cta: "לאזור בעלי העסקים",
    href: "/merchants",
  },
] as const;

/** Eight partners for the shop window, exclusive shops first. */
const SHOWCASE = [...PARTNERS]
  .sort((a, b) => (a.tier === "exclusive" ? -1 : 0) - (b.tier === "exclusive" ? -1 : 0))
  .slice(0, 8);

/* Deliberately not counters: see the strip's own note. Kept here rather than in
   lib/data so it stays beside the only section that renders it. */
const PROOF_POINTS = [
  { icon: "users", value: "אלפי משפחות", label: "מחזיקות כרטיס וחוסכות בקנייה השוטפת" },
  { icon: "store", value: "מאות בתי עסק", label: "שותפים למועדון, חלקם בהטבה בלעדית לחברים" },
  {
    icon: "wallet",
    // Isolated LTR so bidi cannot move the sign behind the digits: the house rule
    // is ₪ against the front of the number, in Hebrew copy as everywhere else.
    value: (
      <>
        מעל <bdi dir="ltr">₪1,000</bdi>
      </>
    ),
    label: "חיסכון חודשי ממוצע למשפחה",
  },
] as const satisfies readonly { icon: IconName; value: React.ReactNode; label: string }[];

export default function HomePage() {
  const exclusiveCount = PARTNERS.filter((p) => p.tier === "exclusive").length;

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────────
          Rendered without a scroll reveal: it is above the fold, so animating it
          in would only delay the LCP. */}
      <section className="relative isolate overflow-hidden bg-[var(--color-canvas-soft)] px-[clamp(16px,4vw,24px)] pt-[clamp(40px,9vw,96px)] pb-[clamp(56px,10vw,112px)]">
        {/* Decorative backdrop — it carries nothing the copy does not already
            say, so it is not an <img>. A second layer used to sit on top of it
            pointing at /hero-gradient.jpg, an asset that never shipped: every
            load fetched it and got a 404. The CSS mesh paints immediately and
            needs no request. It does not animate — this block sits over the LCP
            element. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-20 bg-[image:var(--gradient-hero)]"
        />
        <Container className="grid grid-cols-[repeat(auto-fit,minmax(min(440px,100%),1fr))] items-center gap-[clamp(32px,6vw,56px)]">
          <div className="flex flex-col items-start gap-6">
            <h1 className="m-0 font-[family-name:var(--font-display)] text-[clamp(38px,9vw,68px)] leading-[1.04] font-extrabold tracking-[-0.015em]">
              החיסכון שמרגישים
              <br />
              בסוף החודש
            </h1>

            <p className="m-0 max-w-[540px] text-[clamp(17px,2.5vw,20px)] leading-[1.6] text-[var(--color-body)]">
              מועדון ההטבות של לקוחות הדרן — מאות בתי עסק, חלקם בהטבה בלעדית לחברי המועדון,
              בתנאים שלא תמצאו לבד
            </p>

            <div className="flex w-full flex-col gap-3 min-[480px]:w-auto min-[480px]:flex-row min-[480px]:flex-wrap">
              <Button as="a" href="/benefits" size="lg">
                לרשימת בתי העסק
              </Button>
              <Button as="a" href="/activate" size="lg" variant="tertiary">
                הפעלת כרטיס
              </Button>
            </div>
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

              MemberCard itself stays in the codebase — /activate renders it in
              its success state, carrying the holder name and masked number the
              platform saved.

              `isolate` scopes the bloom's negative z-index to this wrapper. The
              section is the nearest stacking context otherwise, and the bloom
              would resolve against the backdrop layers instead of the card. */}
          {/* 520px, not the 440px the CSS card used. The artwork frames the card in
              a ribbon that eats roughly a quarter of the box on every side, so at
              440px the card itself read smaller than the headline it sits beside. */}
          <div className="relative isolate mx-auto w-full max-w-[520px]">
            {/* The partner logos, drifting in perspective behind the card. It bleeds
                past the card's box on every side — that is the effect — and the
                section's overflow-hidden clips it at the band edge. Its own mask
                dissolves the edges before that, so it never ends on a hard line.

                Under the bloom, which keeps the card readable against it. */}
            {/* Logical insets, not a symmetric one: the card column sits beside the
                copy, so the wall bleeds wide on its outer side and barely at all on
                the side the headline is on. */}
            <div className="pointer-events-none absolute -top-[20%] -bottom-[20%] start-[-6%] end-[-30%] -z-20 hidden min-[560px]:block">
              <HeroLogoWall />
            </div>
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

      {/* ── Proof strip ──────────────────────────────────────────────────
          Qualitative on purpose. The exact head-counts the club can publish move
          week to week, and a precise-looking figure the site cannot stand behind
          reads as marketing rather than proof — the brief's "no false promises"
          rule. Orders of magnitude are the honest claim, so they are what the
          strip states, with the savings figure kept as a floor ("מעל"). The
          ט.ל.ח line lives once, in the footer. */}
      <section className="border-b border-[var(--color-border)] bg-[var(--color-canvas)] px-[clamp(16px,4vw,24px)] py-[clamp(40px,7vw,72px)]">
        <Reveal
          stagger
          className="mx-auto grid max-w-[var(--container-max)] grid-cols-[repeat(auto-fit,minmax(min(260px,100%),1fr))] gap-4"
        >
          {PROOF_POINTS.map((p) => (
            <div
              key={p.label}
              className="flex flex-col items-start gap-[var(--space-sm)] rounded-[var(--radius-2xl)] border border-[var(--color-border)] bg-[var(--color-canvas-soft)] p-[var(--card-padding)]"
            >
              <span
                aria-hidden
                className="flex size-11 items-center justify-center rounded-full bg-[var(--color-primary-pale)]"
              >
                <Icon name={p.icon} size={22} color="var(--color-primary-deep)" />
              </span>
              <span className="tnum font-[family-name:var(--font-display)] text-[clamp(var(--text-display-sm),5.5vw,var(--text-display-md))] leading-[var(--lh-display-md)] font-extrabold tracking-[var(--tracking-display)] text-[var(--color-ink)]">
                {p.value}
              </span>
              <span className="text-[length:var(--text-body-md)] leading-[1.5] text-[var(--color-body)]">
                {p.label}
              </span>
            </div>
          ))}
        </Reveal>
      </section>

      {/* ── The depth of the benefit ─────────────────────────────────────────
          Section 2 of the content brief, and the section the site was missing
          entirely. It replaces a savings calculator that multiplied the basket by
          a flat 5% — a rate the club does not actually offer. */}
      <Band tone="white">
        <Container className="flex flex-col gap-[clamp(32px,6vw,56px)]">
          <Reveal className="flex max-w-[720px] flex-col gap-3">
            <Eyebrow>עומק וטווח ההטבות</Eyebrow>
            <SectionTitle>מהנחה שוטפת ועד עשרות אחוזים</SectionTitle>
            <SectionLead>ההטבה נקבעת מול כל שותף בנפרד.</SectionLead>
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
                    {isExclusive && exclusiveCount > 0 ? (
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

        </Container>
      </Band>

      {/* ── The shop window ──────────────────────────────────────────────── */}
      <Band tone="sand">
        <Container className="flex flex-col gap-[clamp(32px,6vw,56px)]">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <div className="flex max-w-[620px] flex-col gap-3">
              <Eyebrow>הנבחרת שלנו</Eyebrow>
              <SectionTitle>איפה הכרטיס עובד</SectionTitle>
              <SectionLead>מזון, ביגוד, ספרי קודש, אופטיקה וכלי בית.</SectionLead>
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

          {/* The same card the directory uses, so a shop looks the same wherever
              it appears — and the logo, not a plate of initials, is what a
              family recognises at a glance. */}
          <Reveal
            stagger
            className="grid grid-cols-2 gap-3 min-[560px]:grid-cols-3 min-[900px]:grid-cols-4 min-[900px]:gap-4"
          >
            {SHOWCASE.map((p) => (
              <Link
                key={p.name}
                href={`/benefits?q=${encodeURIComponent(p.name)}`}
                className="group no-underline"
              >
                <PartnerCard partner={p} />
              </Link>
            ))}
          </Reveal>
        </Container>
      </Band>

      {/* ── How it works ─────────────────────────────────────────────────── */}
      <Band id="how" tone="white">
        <Container className="flex flex-col gap-[clamp(32px,6vw,56px)]">
          <Reveal className="flex flex-col gap-3">
            <Eyebrow>איך זה עובד</Eyebrow>
            <SectionTitle>שלושה צעדים, וזהו</SectionTitle>
            <SectionLead>ההפעלה לוקחת דקה. מכאן הכרטיס פשוט עובד.</SectionLead>
          </Reveal>

          {/* One row per step, separated by a hairline rather than boxed into a
              card each. Three cards side by side made three short lines look
              like three dense blocks; a rule and a wide number column let the
              eye run down the list. */}
          <Reveal stagger className="flex flex-col">
            {STEPS.map((step) => (
              <div
                key={step.n}
                className="flex items-baseline gap-[clamp(16px,4vw,40px)] border-t border-[var(--color-border)] py-[clamp(20px,4vw,32px)] last:border-b"
              >
                <span className="tnum w-[clamp(28px,6vw,56px)] flex-none font-[family-name:var(--font-display)] text-[clamp(20px,4vw,28px)] leading-none font-extrabold text-[var(--color-primary-deep)]">
                  {step.n}
                </span>
                <div className="flex flex-1 flex-col gap-1.5 min-[720px]:flex-row min-[720px]:items-baseline min-[720px]:gap-8">
                  <b className="text-[clamp(18px,2.8vw,22px)] min-[720px]:w-[240px] min-[720px]:flex-none">
                    {step.title}
                  </b>
                  <span className="leading-[1.6] text-[var(--color-body)]">{step.body}</span>
                </div>
                <span className="hidden flex-none min-[720px]:block">
                  <Icon name={step.icon} size={22} color="var(--color-primary-neutral)" />
                </span>
              </div>
            ))}
          </Reveal>
        </Container>
      </Band>

      {/* ── Membership ───────────────────────────────────────────────────────
          No heading block above the panel, and no button inside it: membership
          comes with being a Hadran customer, so there is nothing to order and
          nobody to sign up. The panel states what the membership is and stops. */}
      <Band tone="sand">
        <Container>
          <Reveal>
            <MembershipCard />
          </Reveal>
        </Container>
      </Band>

      {/* ── What this site does ──────────────────────────────────────────────
          This was "למי הכרטיס מתאים", three audience cards whose first was a
          family with no connection to Hadran — an audience the club does not
          have. The club's members already hold a card, so the useful question is
          not who it is for but what there is to do here. */}
      <Band tone="white">
        <Container className="flex flex-col gap-[clamp(32px,6vw,56px)]">
          <Reveal className="flex flex-col gap-3">
            <Eyebrow>הקהילה שלנו</Eyebrow>
            <SectionTitle>מה אפשר לעשות כאן</SectionTitle>
          </Reveal>

          <Reveal
            stagger
            className="grid grid-cols-[repeat(auto-fit,minmax(min(270px,100%),1fr))] gap-6"
          >
            {SERVICES.map((a) => {
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
              ״קונים בדיוק אותו דבר ומשלמים פחות.״
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
                    הכרטיס כבר אצלכם. באזור האישי רואים את החיסכון שנצבר ואת ההטבות שלכם.
                  </p>
                </div>
                <Button
                  as="a"
                  href={MEMBER_AREA_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  size="lg"
                  iconAfter="external-link"
                  className="w-full justify-center min-[480px]:w-auto"
                >
                  לאזור האישי
                </Button>
              </div>
            </Card>
          </Reveal>
        </Container>
      </Band>
    </>
  );
}
