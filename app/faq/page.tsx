import type { Metadata } from "next";
import { PageHero } from "@/components/site/PageHero";
import { FaqBrowser } from "./FaqBrowser";

export const metadata: Metadata = {
  title: "שאלות ותשובות",
  description:
    "כל מה שחברי המועדון שואלים על הדרן קארד — ההנחה, המימוש בקופה, הכרטיס עצמו ובתי העסק השותפים.",
};

export default function FaqPage() {
  return (
    <>
      {/* The header sits in the 760px reading column, like the answers under it.
          `flush` because the group chips are the first thing below and they need to
          sit close enough to read as this page's controls. */}
      <PageHero
        narrow
        flush
        eyebrow="מוקד המידע"
        title="שאלות ותשובות"
        lead="כל מה שחברי המועדון שואלים על הדרן קארד — ההנחה, המימוש בקופה, הכרטיס עצמו ובתי העסק השותפים."
      />

      <FaqBrowser />
    </>
  );
}
