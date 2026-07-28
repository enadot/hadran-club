import type { Metadata } from "next";
import { Container } from "@/components/site/Band";
import { SearchLanding } from "./SearchLanding";

export const metadata: Metadata = {
  title: "חיפוש באתר",
  description:
    "החיפוש מאתר בתי עסק שותפים, עמודים באתר ותשובות נפוצות — מכל עמוד במועדון, בלי לעזוב את המקום.",
};

export default function SearchPage() {
  // dvh, not vh: on mobile Safari 100vh is the *expanded* viewport, so a 100vh
  // page always hides a strip of itself behind the browser chrome.
  return (
    <div className="min-h-dvh bg-[var(--color-canvas-soft)]">
      <Container className="flex flex-col gap-6 px-[clamp(16px,4vw,24px)] py-[clamp(37px,7.1vw,64px)]">
        <span className="text-[13px] font-bold tracking-[var(--tracking-wide)] text-[var(--color-primary-deep)]">
          חיפוש באתר
        </span>
        <h1 className="m-0 max-w-[620px] text-[clamp(30px,7vw,52px)] leading-[1.06]">
          מוצאים בית עסק
          <br />
          בשלוש אותיות
        </h1>
        <p className="m-0 max-w-[620px] text-[clamp(16px,2.4vw,19px)] text-[var(--color-body)]">
          החיפוש מאתר בתי עסק שותפים, עמודים באתר ותשובות נפוצות — מכל עמוד במועדון, בלי לעזוב את
          המקום.
        </p>

        <SearchLanding />
      </Container>
    </div>
  );
}
