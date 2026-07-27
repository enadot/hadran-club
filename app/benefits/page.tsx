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

          <div className="flex flex-wrap items-center gap-8">
            <div className="flex items-baseline gap-2">
              <span className="tnum font-[family-name:var(--font-display)] text-[clamp(23px,4.5vw,32px)] font-extrabold">
                312
              </span>
              <span className="text-[var(--color-body)]">בתי עסק</span>
            </div>
            <div className="h-7 w-px bg-[var(--color-border)]" />
            <div className="flex items-baseline gap-2">
              <span className="tnum font-[family-name:var(--font-display)] text-[clamp(23px,4.5vw,32px)] font-extrabold">
                7
              </span>
              <span className="text-[var(--color-body)]">קטגוריות</span>
            </div>
            <div className="h-7 w-px bg-[var(--color-border)]" />
            <div className="flex items-baseline gap-2">
              <span className="tnum font-[family-name:var(--font-display)] text-[clamp(23px,4.5vw,32px)] font-extrabold">
                5%
              </span>
              <span className="text-[var(--color-body)]">בכל אחד מהם</span>
            </div>
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
              <div className="flex flex-wrap gap-3">
                <Button as="a" href="/merchants">
                  הצטרפות בתי עסק
                </Button>
                <Button as="a" href="/faq" variant="tertiary">
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
