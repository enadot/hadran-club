import type { Metadata } from "next";
import { Container } from "@/components/site/Band";
import { PageHero } from "@/components/site/PageHero";
import { BalanceChecker } from "./BalanceChecker";

export const metadata: Metadata = {
  title: "בדיקת יתרה",
  description:
    "הזנת מספר הדרן קארד מציגה את היתרה הזמינה בכרטיס ואת הסטטוס שלו, בלי התחברות ובלי מסירת פרטים אישיים.",
};

export default function BalancePage() {
  return (
    <>
      <PageHero
        narrow
        eyebrow="הדרן קארד"
        title="בדיקת יתרה"
        lead="הזנת מספר הדרן קארד מציגה את היתרה הזמינה בכרטיס ואת הסטטוס שלו — בלי התחברות ובלי מסירת פרטים אישיים."
      />

      {/* Rung 1, not canvas: the panel below is a white card, and a white card on a
          white band is not a card. Depth here is the one tint between them. */}
      <div className="bg-[var(--color-canvas-warm)] px-[clamp(16px,4vw,24px)] py-[clamp(32px,6vw,56px)]">
        <Container narrow>
          <BalanceChecker />
        </Container>
      </div>
    </>
  );
}
