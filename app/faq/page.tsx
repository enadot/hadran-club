import type { Metadata } from "next";
import { FaqBrowser } from "./FaqBrowser";

export const metadata: Metadata = {
  title: "שאלות ותשובות",
  description:
    "כל מה שחברי המועדון שואלים על הדרן קארד — ההנחה, המימוש בקופה, הכרטיס עצמו ובתי העסק השותפים.",
};

export default function FaqPage() {
  return (
    <>
      {/* Hero sits in the 760px reading column, not the 1200px container. */}
      <section className="bg-[var(--color-canvas-soft)] px-[clamp(16px,4vw,24px)] pt-[clamp(32px,6.2vw,56px)] pb-11">
        <div className="mx-auto flex max-w-[var(--container-narrow)] flex-col gap-3.5">
          <span className="text-[13px] font-bold tracking-[var(--tracking-wide)] text-[var(--color-primary-deep)]">
            מוקד המידע
          </span>
          <h1 className="m-0 text-[clamp(30px,7vw,52px)] leading-[1.06]">שאלות ותשובות</h1>
          <p className="m-0 text-[clamp(16px,2.4vw,19px)] text-[var(--color-body)]">
            כל מה שחברי המועדון שואלים על הדרן קארד — ההנחה, המימוש בקופה, הכרטיס עצמו ובתי העסק
            השותפים.
          </p>
        </div>
      </section>

      <FaqBrowser />
    </>
  );
}
