import type { Metadata } from "next";
import { ActivateForm } from "./ActivateForm";

export const metadata: Metadata = {
  title: "הפעלת הדרן קארד",
  description:
    "קיבלתם כרטיס? הזנת המספר שעל הכרטיס ופרטי בעל הכרטיס משייכת אותו אליכם ומפעילה את ההנחה בקופה.",
};

export default function ActivatePage() {
  return <ActivateForm />;
}
