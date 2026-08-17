import type { Metadata } from "next";
import { LegalDocument } from "@/components/site/LegalDocument";
import { TERMS_OF_USE } from "@/lib/data/legal";

export const metadata: Metadata = {
  title: TERMS_OF_USE.title,
  description: TERMS_OF_USE.summary,
};

export default function TermsOfUsePage() {
  return <LegalDocument doc={TERMS_OF_USE} />;
}
