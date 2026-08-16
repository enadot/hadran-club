import type { Metadata } from "next";
import { Suspense } from "react";
import { Band, Container, Eyebrow } from "@/components/site/Band";
import { Button } from "@/components/brand/Button";
import { Card } from "@/components/brand/Card";
import { Skeleton } from "@/components/ui/skeleton";
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
  return (
    <>
      <section className="bg-[var(--color-canvas-soft)] px-[clamp(16px,4vw,24px)] pt-[clamp(40px,7vw,72px)] pb-[clamp(32px,5vw,56px)]">
        <Container className="flex flex-col gap-7">
          <div className="flex max-w-[720px] flex-col gap-3.5">
            <Eyebrow>הנבחרת שלנו</Eyebrow>
            <h1 className="m-0 text-[clamp(30px,7vw,52px)] leading-[1.06]">בתי העסק השותפים</h1>
            <p className="m-0 text-[clamp(16px,2.4vw,19px)] leading-[1.6] text-[var(--color-body)]">
              ההטבה נקבעת מול כל שותף בנפרד. פותחים בית עסק כדי לראות את התנאים המלאים.
            </p>
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
                  ספרו לנו איפה אתם קונים, או הפנו את בעל העסק אלינו.
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
