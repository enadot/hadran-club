import type { Metadata } from "next";
import { PageHero } from "@/components/site/PageHero";
import { SearchLanding } from "./SearchLanding";

export const metadata: Metadata = {
  title: "חיפוש באתר",
  description:
    "החיפוש מאתר בתי עסק שותפים, עמודים באתר ותשובות נפוצות — מכל עמוד במועדון, בלי לעזוב את המקום.",
};

export default function SearchPage() {
  // min-h-dvh, not vh: on mobile Safari 100vh is the *expanded* viewport, so a
  // 100vh page always hides a strip of itself behind the browser chrome.
  return (
    <div className="flex min-h-dvh flex-col bg-[var(--color-canvas-soft)]">
      <PageHero
        eyebrow="חיפוש באתר"
        title={
          <>
            מוצאים בית עסק
            <br />
            בשלוש אותיות
          </>
        }
        lead="החיפוש מאתר בתי עסק שותפים, עמודים באתר ותשובות נפוצות — מכל עמוד במועדון, בלי לעזוב את המקום."
        actions={<SearchLanding />}
      />
    </div>
  );
}
