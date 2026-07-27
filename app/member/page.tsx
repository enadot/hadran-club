import type { Metadata } from "next";
import { MemberArea } from "./MemberArea";

export const metadata: Metadata = {
  title: "אזור אישי",
  description: "ניהול החברות, פרטי המשפחה והכרטיסים, ההיסטוריה והחיסכון שנצבר.",
};

export default function MemberPage() {
  return <MemberArea />;
}
