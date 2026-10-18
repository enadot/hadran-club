import type { Metadata } from "next";
import "./globals.css";
import { afek, frankRuhlLibre } from "@/lib/fonts";
import { RtlProvider } from "@/components/site/RtlProvider";
import { SearchProvider } from "@/components/site/SearchDialog";
import { SiteNav } from "@/components/site/SiteNav";
import { Footer } from "@/components/site/Footer";
import { SITE_URL } from "@/lib/data/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: "הדרן קלאב",
  title: {
    default: "הדרן קלאב · מועדון ההטבות והחיסכון",
    template: "%s · הדרן קלאב",
  },
  description:
    "הדרן קארד הוא כרטיס פיזי אחד שפותח רשת רחבה של הטבות — מהנחות קבועות ליום-יום ועד לחנויות שההטבה בהן זמינה רק לחברי המועדון. ההנחה יורדת בקופה, במקום.",
  openGraph: {
    type: "website",
    locale: "he_IL",
    siteName: "הדרן קלאב",
    images: [{ url: "/hero-card.webp", alt: "הדרן קארד" }],
  },
  // The Search Console ownership token. Set per environment, so the property can be
  // verified without a code change.
  verification: process.env.GOOGLE_SITE_VERIFICATION
    ? { google: process.env.GOOGLE_SITE_VERIFICATION }
    : undefined,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl" className={`${afek.variable} ${frankRuhlLibre.variable}`}>
      <body>
        <RtlProvider>
          <SearchProvider>
            <SiteNav />
            <main>{children}</main>
            <Footer />
          </SearchProvider>
        </RtlProvider>
      </body>
    </html>
  );
}
