import type { Metadata } from "next";
import { Band, Container } from "@/components/site/Band";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { Button } from "@/components/brand/Button";
import { Card } from "@/components/brand/Card";
import { Icon } from "@/components/brand/Icon";
import { StoreDirectory } from "@/components/site/StoreDirectory";
import { STORE_CITY_COUNT, STORE_COUNT } from "@/lib/data/stores";

export const metadata: Metadata = {
  title: "איפה מקבלים את הכרטיס",
  description:
    "כרטיס הדרן קלאב ניתן ללא עלות ללקוחות הדרן, באיסוף עצמי מהחנויות המשווקות. כאן הרשימה לפי אזור ועיר.",
};

/** Three lines of expectation-setting, so a member does not drive to a shop and
 *  discover there was something they should have brought. */
const NOTES = [
  {
    icon: "credit-card",
    title: "הכרטיס ללא עלות",
    body: "אין דמי הנפקה, אין דמי חבר ואין התחייבות — החברות כלולה בהיותכם לקוחות הדרן.",
  },
  {
    icon: "user",
    title: "מגיעים כלקוחות הדרן",
    body: "הכרטיס מיועד ללקוחות הדרן, ולכן כדאי להגיע עם מכשיר הדרן או עם פרטי הלקוח שברשותכם.",
  },
  {
    icon: "circle-check",
    title: "מפעילים אחרי הקבלה",
    body: "אחרי שהכרטיס בידיים, מפעילים אותו כאן באתר בדקה — ומציגים אותו בקופה.",
  },
] as const;

export default function StoresPage() {
  return (
    <>
      <PageHero
        eyebrow="לקוחות הדרן"
        title="איפה מקבלים את כרטיס הדרן קלאב"
        lead={`הכרטיס נמסר באיסוף עצמי מהחנויות המשווקות של הדרן, ללא עלות. ${STORE_COUNT} נקודות מסירה ב-${STORE_CITY_COUNT} ערים — בוחרים את הקרובה אליכם ומגיעים.`}
        actions={
          <>
            <Button as="a" href="/activate" size="lg">
              כבר קיבלתי — להפעלת הכרטיס
            </Button>
            <Button as="a" href="/benefits" size="lg" variant="tertiary">
              לרשימת בתי העסק
            </Button>
          </>
        }
      />

      <Band tone="white">
        <Container className="flex flex-col gap-[var(--section-gap)]">
          <Reveal
            stagger
            className="grid grid-cols-[repeat(auto-fit,minmax(min(280px,100%),1fr))] gap-4"
          >
            {NOTES.map((note) => (
              <Card key={note.title} tone="pale" className="flex flex-col gap-2.5">
                <Icon name={note.icon} size={22} color="var(--color-primary-deep)" />
                <b className="text-[length:var(--text-body-lg)] leading-[1.3]">{note.title}</b>
                <p className="m-0 text-[length:var(--text-body-sm)] leading-[1.6] text-[var(--color-body)]">
                  {note.body}
                </p>
              </Card>
            ))}
          </Reveal>
        </Container>
      </Band>

      <Band tone="sand" divided>
        <Container className="flex flex-col gap-[var(--section-gap)]">
          <StoreDirectory />

          <p className="m-0 text-[length:var(--text-caption)] text-[var(--color-mute)]">
            הרשימה מתעדכנת מעת לעת. כדאי לוודא טלפונית מול החנות לפני הגעה. בכפוף לתקנון המועדון.
            ט.ל.ח.
          </p>
        </Container>
      </Band>
    </>
  );
}
