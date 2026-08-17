import type { Metadata } from "next";
import { LegalDocument } from "@/components/site/LegalDocument";
import { PRIVACY_POLICY } from "@/lib/data/legal";

export const metadata: Metadata = {
  title: PRIVACY_POLICY.title,
  description: PRIVACY_POLICY.summary,
};

export default function PrivacyPolicyPage() {
  return <LegalDocument doc={PRIVACY_POLICY} />;
}
