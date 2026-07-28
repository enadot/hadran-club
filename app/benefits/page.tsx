import type { Metadata } from "next";
import { Band, Container } from "@/components/site/Band";
import { Button } from "@/components/brand/Button";
import { Card } from "@/components/brand/Card";
import { PartnerBrowser } from "./PartnerBrowser";

export const metadata: Metadata = {
  title: "בתי העסק השותפים",
  description:
    "בכל בית עסק ברשימה הדרן קארד מוריד 5% מהחשבון בקופה — הנחה קבועה, בכל קנייה, בלי מינימום ובלי תוקף.",
};

export default function BenefitsPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="bg-[var(--color-canvas-soft)] px-[clamp(16px,4vw,24px)] pt-[clamp(32px,6.2vw,56px)] pb-10">
        <Container className="flex flex-col gap-7">
          <div className="flex max-w-[720px] flex-col gap-3.5">
            <span className="text-[13px] font-bold tracking-[var(--tracking-wide)] text-[var(--color-primary-deep)]">
              רשימת ההטבות
            </span>
            <h1 className="m-0 text-[clamp(30px,7vw,52px)] leading-[1.06]">בתי העסק השותפים</h1>
            <p className="m-0 text-[clamp(16px,2.4vw,19px)] text-[var(--color-body)]">
              בכל בית עסק ברשימה הדרן קארד מוריד 5% מהחשבון בקופה — הנחה קבועה, בכל קנייה, בלי מינימום
              ובלי תוקף.
            </p>
          </div>

          {/* Three figures on one line. The rule between them is drawn as a leading
              border rather than as its own flex child, so a wrap on a narrow screen
              cannot strand a divider at the end of a row — and it is dropped below
              560px, where the three stats stack. */}
          <div className="flex flex-wrap gap-x-8 gap-y-3">
            {[
              { value: "312", label: "בתי עסק" },
              { value: "7", label: "קטגוריות" },
              { value: "5%", label: "בכל אחד מהם" },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className={
                  i === 0
                    ? "flex items-baseline gap-2"
                    : "flex items-baseline gap-2 min-[560px]:border-s min-[560px]:border-[var(--color-border)] min-[560px]:ps-8"
                }
              >
                <span className="tnum font-[family-name:var(--font-display)] text-[clamp(23px,4.5vw,32px)] font-extrabold">
                  {stat.value}
                </span>
                <span className="text-[var(--color-body)]">{stat.label}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Sticky filter bar + results grid. */}
      <PartnerBrowser />

      {/* ── Missing a shop? ──────────────────────────────────────────────── */}
      <Band tone="sand" padded={false} className="px-[clamp(16px,4vw,24px)] py-[clamp(32px,6.2vw,56px)]">
        <Container>
          <Card tone="plain" padding="clamp(18px,5vw,40px)">
            <div className="flex flex-wrap items-center justify-between gap-8">
              <div className="flex flex-col gap-2.5">
                <h3 className="m-0 text-[clamp(23px,4.5vw,32px)]">חסר לכם בית עסק ברשימה?</h3>
                <p className="m-0 text-[clamp(15px,2.2vw,17px)] text-[var(--color-body)]">
                  ספרו לנו איפה אתם קונים, או הפנו את בעל העסק להצטרפות למועדון.
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
