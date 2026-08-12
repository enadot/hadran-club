import type { Metadata } from "next";
import { Suspense } from "react";
import { Band, Container, Eyebrow } from "@/components/site/Band";
import { Button } from "@/components/brand/Button";
import { Card } from "@/components/brand/Card";
import { Icon } from "@/components/brand/Icon";
import { Skeleton } from "@/components/ui/skeleton";
import { BENEFIT_TIERS, BENEFIT_TIER_ORDER } from "@/lib/data/benefits";
import { PARTNERS } from "@/lib/data/partners";
import { PartnerBrowser } from "./PartnerBrowser";

export const metadata: Metadata = {
  title: "בתי העסק השותפים",
  description:
    "הנבחרת שלנו — רשתות מזון, ביגוד, ספרי קודש, אופטיקה וכלי בית. לכל שותף סוג ההטבה שלו, ויש חנויות שההטבה בהן זמינה אך ורק לחברי הדרן קלאב.",
};

/** The filter bar and the list are one interactive unit; this stands in for both
 *  while the client boundary hydrates, at roughly the height they occupy. */
function BrowserSkeleton() {
  return (
    <div className="mx-auto flex max-w-[var(--container-max)] flex-col gap-4 px-[clamp(16px,4vw,24px)] py-8">
      <Skeleton className="h-12 w-full rounded-[var(--radius-md)]" />
      <div className="flex gap-2">
        {[0, 1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-11 w-28 rounded-full" />
        ))}
      </div>
      <div className="flex flex-col gap-2.5">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <Skeleton key={i} className="h-[84px] w-full rounded-[var(--radius-xl)]" />
        ))}
      </div>
    </div>
  );
}

export default function BenefitsPage() {
  const exclusive = PARTNERS.filter((p) => p.tier === "exclusive").length;
  const categories = new Set(PARTNERS.map((p) => p.category)).size;
  const cities = new Set(PARTNERS.map((p) => p.city)).size;

  return (
    <>
      <section className="bg-[var(--color-canvas-soft)] px-[clamp(16px,4vw,24px)] pt-[clamp(32px,6.2vw,56px)] pb-9">
        <Container className="flex flex-col gap-7">
          <div className="flex max-w-[720px] flex-col gap-3.5">
            <Eyebrow>הנבחרת שלנו</Eyebrow>
            <h1 className="m-0 text-[clamp(30px,7vw,52px)] leading-[1.06]">בתי העסק השותפים</h1>
            <p className="m-0 text-[clamp(16px,2.4vw,19px)] leading-[1.6] text-[var(--color-body)]">
              ההטבה נקבעת מול כל שותף בנפרד — מהנחה קבועה על הסל היום-יומי ועד להטבות עמוקות
              בקטגוריות נבחרות. יש כאן גם חנויות שההטבה בהן זמינה אך ורק לחברי המועדון.
            </p>
          </div>

          {/* A legend, not a stat strip. The three tiers are the vocabulary the whole
              page is filtered and badged by, so they are explained once, up front —
              the previous strip advertised a flat figure the club does not offer. */}
          <div className="grid grid-cols-1 gap-2.5 min-[720px]:grid-cols-3 min-[720px]:gap-3">
            {BENEFIT_TIER_ORDER.map((t) => {
              const meta = BENEFIT_TIERS[t];
              return (
                <div
                  key={t}
                  className="flex items-start gap-3 rounded-[var(--radius-lg)] bg-[var(--color-canvas)] p-3.5"
                >
                  <span className="mt-0.5 flex-none">
                    <Icon name={meta.icon} size={20} color="var(--color-primary-deep)" />
                  </span>
                  <span className="flex flex-col gap-0.5">
                    <b className="text-[length:var(--text-body-sm)]">{meta.label}</b>
                    <span className="text-[length:var(--text-caption)] leading-[1.5] text-[var(--color-mute)]">
                      {meta.description}
                    </span>
                  </span>
                </div>
              );
            })}
          </div>

          <div className="flex flex-wrap gap-x-8 gap-y-3">
            {[
              { value: String(PARTNERS.length), label: "שותפים ברשימה" },
              { value: String(exclusive), label: "בלעדיים למועדון" },
              { value: String(categories), label: "קטגוריות" },
              { value: String(cities), label: "יישובים" },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className={
                  i === 0
                    ? "flex items-baseline gap-2"
                    : "flex items-baseline gap-2 min-[560px]:border-s min-[560px]:border-[var(--color-border)] min-[560px]:ps-8"
                }
              >
                <span className="tnum font-[family-name:var(--font-display)] text-[clamp(21px,4vw,28px)] font-extrabold">
                  {stat.value}
                </span>
                <span className="text-[length:var(--text-body-sm)] text-[var(--color-body)]">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <Suspense fallback={<BrowserSkeleton />}>
        <PartnerBrowser />
      </Suspense>

      <Band tone="sand" padded={false} className="px-[clamp(16px,4vw,24px)] py-[clamp(32px,6.2vw,56px)]">
        <Container>
          <Card tone="plain" padding="clamp(18px,5vw,40px)">
            <div className="flex flex-wrap items-center justify-between gap-8">
              <div className="flex flex-col gap-2.5">
                <h3 className="m-0 text-[clamp(23px,4.5vw,32px)]">חסר לכם בית עסק ברשימה?</h3>
                <p className="m-0 text-[clamp(15px,2.2vw,17px)] text-[var(--color-body)]">
                  פניות של חברים הן הדרך העיקרית שבה שותפים חדשים מצטרפים. ספרו לנו איפה אתם קונים,
                  או הפנו את בעל העסק אלינו.
                </p>
              </div>
              <div className="flex w-full flex-col gap-3 min-[480px]:w-auto min-[480px]:flex-row min-[480px]:flex-wrap">
                <Button as="a" href="/merchants" className="w-full justify-center min-[480px]:w-auto">
                  הצטרפות בתי עסק
                </Button>
                <Button
                  as="a"
                  href="/faq"
                  variant="tertiary"
                  className="w-full justify-center min-[480px]:w-auto"
                >
                  שאלות ותשובות
                </Button>
              </div>
            </div>
          </Card>
        </Container>
      </Band>
    </>
  );
}
