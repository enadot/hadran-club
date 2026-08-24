import type { Metadata } from "next";
import { Container } from "@/components/site/Band";
import { PageHero } from "@/components/site/PageHero";
import { Icon, type IconName } from "@/components/brand/Icon";
import { CARD_ORDER_CHANNEL, SUPPORT_CHANNEL } from "@/lib/data/site";
import { ActivateFrame } from "./ActivateFrame";

export const metadata: Metadata = {
  title: "הפעלת הדרן קארד",
  description:
    "קיבלתם כרטיס? הזנת המספר שעל הכרטיס ופרטי בעל הכרטיס משייכת אותו אליכם ומפעילה את ההנחה בקופה.",
};

/**
 * The notes beside the frame. They are the club's voice around a screen that is not
 * the club's — what happens after the activation, where a card comes from, and where
 * to go when something does not work — none of which the framed form says.
 */
const NOTES: { icon: IconName; text: string }[] = [
  { icon: "badge-percent", text: "ההנחה יורדת בקופה במקום — בלי צבירה ובלי קופון." },
  { icon: "credit-card", text: "מזינים את המספר המלא המודפס על הכרטיס, בלי רווחים." },
  { icon: "package", text: `עוד לא קיבלתם כרטיס? הזמנת הכרטיס מתבצעת ב${CARD_ORDER_CHANNEL}.` },
  { icon: "shield-check", text: "הפרטים נשמרים במאובטח ומשמשים לזיהוי בעל הכרטיס בלבד." },
  { icon: "help-circle", text: `צריכים עזרה? השירות והתמיכה למועדון נמצאים ב${SUPPORT_CHANNEL}.` },
];

export default function ActivatePage() {
  return (
    <>
      <PageHero
        eyebrow="הדרן קארד"
        title="הפעלת הדרן קארד"
        lead="קיבלתם כרטיס? מזינים את המספר שעליו ואת פרטי בעל הכרטיס, והכרטיס משויך אליכם ומוכן לשימוש בקופה."
      />

      <div className="bg-[var(--color-canvas)] px-[clamp(16px,4vw,24px)] py-[clamp(28px,5vw,48px)]">
        {/* The frame gets the wide column and the notes sit beside it from 1060px up.
            Below that the notes follow the form: on a phone nobody reads five lines
            of context before the thing they came to do. */}
        <Container className="grid items-start gap-[clamp(24px,4vw,40px)] min-[1060px]:grid-cols-[minmax(0,1fr)_300px]">
          <ActivateFrame />

          <aside className="flex flex-col gap-4 rounded-[var(--radius-xl)] bg-[var(--color-canvas-pale)] p-[var(--card-padding)]">
            <b className="text-[clamp(17px,2.5vw,19px)]">כדאי לדעת</b>
            <ul className="m-0 flex list-none flex-col gap-3.5 p-0">
              {NOTES.map((note) => (
                <li key={note.text} className="flex items-start gap-2.5">
                  <span className="mt-0.5 flex-none">
                    <Icon name={note.icon} size={18} color="var(--color-primary-deep)" />
                  </span>
                  <span className="text-[length:var(--text-body-sm)] leading-[1.6] text-[var(--color-body)]">
                    {note.text}
                  </span>
                </li>
              ))}
            </ul>
          </aside>
        </Container>
      </div>
    </>
  );
}
