import type { Metadata } from "next";
import { Band, Container, Eyebrow, SectionLead, SectionTitle } from "@/components/site/Band";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { Button } from "@/components/brand/Button";
import { Card } from "@/components/brand/Card";
import { Icon } from "@/components/brand/Icon";
import { StoreDirectory } from "@/components/site/StoreDirectory";
import { CallbackDialog } from "./CallbackDialog";
import { STORE_CITY_COUNT, STORE_COUNT } from "@/lib/data/stores";

export const metadata: Metadata = {
  title: "הצטרפות להדרן",
  description:
    "הצטרפות להדרן נעשית באחת החנויות המשווקות, או בשיחה טלפונית שאנחנו יוזמים אליכם. עם ההצטרפות מגיע גם כרטיס הדרן קלאב, ללא עלות.",
};

/** Why a reader who is not a Hadran customer yet would keep reading. Kept to the
 *  club's side of the story — the device itself is Hadran's to describe. */
const REASONS = [
  {
    icon: "shield-check",
    title: "השקט הדיגיטלי",
    body: "מערכת ההגנה של הדרן היא הסיבה הראשונה להצטרף, והיא זו שממשיכה לעבוד בשקט ברקע.",
  },
  {
    icon: "credit-card",
    title: "והכרטיס בא איתה",
    body: "לקוחות הדרן מקבלים את כרטיס הדרן קלאב ללא עלות — בלי דמי חבר ובלי התחייבות.",
  },
  {
    icon: "badge-percent",
    title: "הנחות במאות בתי עסק",
    body: "מהנחות קבועות ליום-יום ועד עשרות אחוזים, וחנויות שההטבה בהן בלעדית לחברי המועדון.",
  },
] as const;

const HOW = [
  {
    n: "1",
    title: "בוחרים איך נוח",
    body: "מגיעים לאחת החנויות המשווקות שברשימה, או משאירים פרטים ונציג הדרן מתקשר אליכם.",
  },
  {
    n: "2",
    title: "מצטרפים להדרן",
    body: "מקבלים את המכשיר ואת ההגנה של הדרן, ואיתם את כרטיס הדרן קלאב.",
  },
  {
    n: "3",
    title: "מפעילים וחוסכים",
    body: "מפעילים את הכרטיס כאן באתר בדקה, ומציגים אותו בקופה — ההנחה יורדת מיד.",
  },
] as const;

export default function JoinHadranPage() {
  return (
    <>
      <PageHero
        eyebrow="הצטרפות להדרן"
        title="רוצים להצטרף להדרן וליהנות מהמועדון?"
        lead={`הצטרפות להדרן נעשית באחת החנויות המשווקות — ${STORE_COUNT} נקודות ב-${STORE_CITY_COUNT} ערים — או בשיחה טלפונית שאנחנו יוזמים אליכם. עם ההצטרפות מגיע גם כרטיס הדרן קלאב, ללא עלות.`}
        actions={
          <>
            <CallbackDialog>השארת פרטים לשיחה טלפונית</CallbackDialog>
            <Button as="a" href="#stores" size="lg" variant="tertiary">
              לרשימת החנויות
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
            {REASONS.map((reason) => (
              <Card key={reason.title} tone="pale" className="flex flex-col gap-2.5">
                <Icon name={reason.icon} size={22} color="var(--color-primary-deep)" />
                <b className="text-[length:var(--text-body-lg)] leading-[1.3]">{reason.title}</b>
                <p className="m-0 text-[length:var(--text-body-sm)] leading-[1.6] text-[var(--color-body)]">
                  {reason.body}
                </p>
              </Card>
            ))}
          </Reveal>

          <Reveal className="flex flex-col gap-3">
            <Eyebrow>איך מצטרפים</Eyebrow>
            <SectionTitle>שלושה צעדים, וזהו</SectionTitle>
            <SectionLead>אפשר להגיע לחנות, ואפשר שנתקשר אליכם — התוצאה אותה תוצאה.</SectionLead>
          </Reveal>

          <Reveal stagger className="flex flex-col">
            {HOW.map((step) => (
              <div
                key={step.n}
                className="grid grid-cols-[auto_minmax(0,1fr)] items-baseline gap-x-5 gap-y-1 border-t border-[var(--color-border)] py-6 first:border-0 first:pt-0"
              >
                <span className="font-[family-name:var(--font-display)] text-[clamp(28px,5vw,40px)] leading-none font-extrabold tabular-nums text-[var(--color-primary-deep)]">
                  {step.n}
                </span>
                <b className="text-[length:var(--text-body-lg)] leading-[1.3]">{step.title}</b>
                <p className="col-start-2 m-0 text-[length:var(--text-body-sm)] leading-[1.6] text-[var(--color-body)]">
                  {step.body}
                </p>
              </div>
            ))}
          </Reveal>
        </Container>
      </Band>

      <Band id="stores" tone="sand" divided>
        <Container className="flex flex-col gap-[var(--section-gap)]">
          <Reveal className="flex flex-col gap-3">
            <Eyebrow>החנויות המשווקות</Eyebrow>
            <SectionTitle>איפה מצטרפים להדרן</SectionTitle>
            <SectionLead>
              באותן חנויות מקבלים גם את כרטיס הדרן קלאב. כדאי לוודא טלפונית לפני הגעה.
            </SectionLead>
          </Reveal>

          <StoreDirectory />
        </Container>
      </Band>

      <Band tone="ink">
        <Container className="flex flex-col items-start gap-5">
          <SectionTitle>מעדיפים שנתקשר?</SectionTitle>
          <p className="m-0 max-w-[56ch] text-[clamp(16px,2.4vw,19px)] leading-[1.6] text-[var(--sand-300)]">
            משאירים שם ומספר, ונציג הדרן חוזר אליכם ומסביר על ההצטרפות, על המכשירים ועל הכרטיס שמגיע
            איתם.
          </p>
          <CallbackDialog>השארת פרטים לשיחה טלפונית</CallbackDialog>
        </Container>
      </Band>
    </>
  );
}
