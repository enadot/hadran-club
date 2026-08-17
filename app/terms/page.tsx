import type { Metadata } from "next";
import { LegalDocument } from "@/components/site/LegalDocument";
import { CLUB_TERMS } from "@/lib/data/legal";

export const metadata: Metadata = {
  title: CLUB_TERMS.title,
  description: CLUB_TERMS.summary,
};

export default function ClubTermsPage() {
  return <LegalDocument doc={CLUB_TERMS} />;
}
