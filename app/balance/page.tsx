import type { Metadata } from "next";
import { BalanceChecker } from "./BalanceChecker";

export const metadata: Metadata = {
  title: "בדיקת יתרה",
  description:
    "הזנת מספר הכרטיס וארבע ספרות אחרונות של מספר הזהות מציגה את היתרה בכרטיס, את החיסכון שנצבר ואת הקניות האחרונות.",
};

export default function BalancePage() {
  return (
    <div className="bg-[var(--color-canvas-soft)] px-[clamp(16px,4vw,24px)] pt-[clamp(28px,5.3vw,48px)] pb-16">
      <div className="mx-auto flex max-w-[var(--container-narrow)] flex-col gap-7">
        <div className="flex flex-col gap-3">
          <span className="text-[13px] font-bold tracking-[var(--tracking-wide)] text-[var(--color-primary-deep)]">
            הדרן קארד
          </span>
          <h1 className="m-0 text-[clamp(27px,6vw,44px)] leading-[1.08]">בדיקת יתרה</h1>
          <p className="m-0 text-[clamp(16px,2.3vw,18px)] text-[var(--color-body)]">
            הזנת מספר הכרטיס וארבע ספרות אחרונות של מספר הזהות מציגה את היתרה בכרטיס, את החיסכון
            שנצבר ואת הקניות האחרונות.
          </p>
        </div>

        <BalanceChecker />
      </div>
    </div>
  );
}
