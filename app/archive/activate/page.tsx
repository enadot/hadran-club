import type { Metadata } from "next";
import { Alert } from "@/components/brand/Alert";
import { Container } from "@/components/site/Band";
import { ActivateForm } from "./ActivateForm";

/**
 * The club's own activation form, parked.
 *
 * /activate now embeds the operator's activation screen, because the public
 * card-activate endpoint this form posts to is not accepting activations for the
 * club yet. Nothing here was deleted — the form, its validation and its success
 * state are the ones that were live, and the route goes back to /activate the day
 * the endpoint is fixed.
 *
 * Kept out of the index in the meantime: two activation screens in a search result
 * is one more than a member can choose between.
 */
export const metadata: Metadata = {
  title: "ארכיון · הפעלת הדרן קארד",
  description:
    "גרסת הארכיון של טופס הפעלת הדרן קארד, שמורה לשימוש עתידי. ההפעלה הפעילה נמצאת בעמוד הפעלת כרטיס.",
  robots: { index: false, follow: false },
};

export default function ArchivedActivatePage() {
  return (
    <>
      <div className="bg-[var(--color-canvas-soft)] px-[clamp(16px,4vw,24px)] pt-[clamp(20px,4vw,32px)]">
        <Container className="max-w-[620px]">
          <Alert tone="warning" icon="info">
            עמוד ארכיון. הטופס כאן שמור לשימוש עתידי ואינו ערוץ ההפעלה הפעיל — הפעלת כרטיס מתבצעת
            בעמוד הפעלת כרטיס.
          </Alert>
        </Container>
      </div>
      <ActivateForm />
    </>
  );
}
