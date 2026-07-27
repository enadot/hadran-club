import type { Metadata } from "next";
import { ActivateFlow } from "./ActivateFlow";

export const metadata: Metadata = {
  title: "הפעלת הדרן קארד",
  description:
    "קיבלתם כרטיס? הזנת מספר הכרטיס והפרטים האישיים תשייך אותו אליכם ותפעיל את ההנחה. אפשר גם להזמין כרטיס חדש.",
};

export default function ActivatePage() {
  return <ActivateFlow />;
}
