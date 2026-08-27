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
 * The notes around the frame. They are the club's voice about a screen that is not
 * the club's — what happens after the activation, where a card comes from, and where
 * to go when something does not work — none of which the framed form says.
 *
 * They sit under the frame rather than beside it now that the frame runs full width.
 * That is also the better place for them: nobody reads five lines of context before
 * doing the one thing they came to do, and the header above the frame already says
 * what this page is.
 */
const NOTES: { icon: IconName; text: string }[] = [
  { icon: "badge-percent", text: "ההנחה יורדת בקופה במקום — בלי צבירה ובלי קופון." },
  { icon: "credit-card", text: "מזינים את המספר המלא המודפס על הכרטיס, בלי רווחים." },
  { icon: "package", text: `עוד לא קיבלתם כרטיס? קבלת הכרטיס מתבצעת ב${CARD_ORDER_CHANNEL}, ללא עלות.` },
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

      {/* No horizontal padding on this block: the frame inside it is full-bleed and
          holds its own chrome to the container. */}
      <div className="bg-[var(--color-canvas)] py-[clamp(24px,4vw,40px)]">
        <ActivateFrame />
      </div>

      <div className="bg-[var(--color-canvas-warm)] px-[clamp(16px,4vw,24px)] py-[clamp(32px,6vw,56px)]">
        <Container>
          <div className="flex flex-col gap-[clamp(18px,3vw,24px)]">
            <b className="text-[clamp(18px,2.8vw,22px)]">כדאי לדעת</b>
            <ul className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(min(280px,100%),1fr))] gap-x-[clamp(20px,4vw,40px)] gap-y-4 p-0">
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
          </div>
        </Container>
      </div>
    </>
  );
}
