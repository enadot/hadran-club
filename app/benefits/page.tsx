import type { Metadata } from "next";
import { Suspense } from "react";
import { Band, Container } from "@/components/site/Band";
import { Button } from "@/components/brand/Button";
import { Card } from "@/components/brand/Card";
import { Skeleton } from "@/components/ui/skeleton";
import { PartnerBrowser } from "./PartnerBrowser";

export const metadata: Metadata = {
  title: "רשימת ההטבות",
  description:
    "רשימת החנויות וההטבות שלכם — רשתות מזון, ביגוד, ספרי קודש, אופטיקה וכלי בית. לכל שותף סוג ההטבה שלו, ויש חנויות שההטבה בהן זמינה אך ורק לחברי הדרן קלאב.",
};

/** The filter bar and the list are one interactive unit; this stands in for both
 *  while the client boundary hydrates, at roughly the height they occupy. */
function BrowserSkeleton() {
  return (
    <div className="mx-auto flex max-w-[var(--container-max)] flex-col gap-4 px-[clamp(16px,4vw,24px)] py-8">
      <Skeleton className="h-[180px] w-full rounded-[var(--radius-xl)]" />
      <div className="flex gap-2.5">
        <Skeleton className="h-[52px] flex-1 rounded-[var(--radius-lg)]" />
        <Skeleton className="h-[52px] w-[52px] rounded-[var(--radius-lg)] min-[900px]:hidden" />
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
      {/* No PageHero here, alone among the sub-pages.
       *
       * The header restated the page's own title, its lead listed the categories the
       * filter lists anyway, and together they pushed the card gate — the one thing
       * this page asks for — below the fold on a phone. The gate opens the page
       * instead, and says what the page is for in the act of offering it.
       *
       * The h1 stays, unseen: a document needs one, /search links here by title, and
       * the gate's own heading changes to a status line once a card is loaded. */}
      <h1 className="sr-only">רשימת החנויות וההטבות שלכם</h1>

      <Suspense fallback={<BrowserSkeleton />}>
        <PartnerBrowser />
      </Suspense>

      <Band tone="sand" padded={false} className="px-[clamp(16px,4vw,24px)] py-[clamp(32px,6.2vw,56px)]">
        <Container>
          <Card tone="plain" padding="lg">
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
