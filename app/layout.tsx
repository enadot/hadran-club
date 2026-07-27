import type { Metadata } from "next";
import "./globals.css";
import { afek, frankRuhlLibre } from "@/lib/fonts";
import { RtlProvider } from "@/components/site/RtlProvider";
import { SearchProvider } from "@/components/site/SearchDialog";
import { SiteNav } from "@/components/site/SiteNav";
import { Footer } from "@/components/site/Footer";

export const metadata: Metadata = {
  title: {
    default: "הדרן קלאב · מועדון ההטבות והחיסכון",
    template: "%s · הדרן קלאב",
  },
  description:
    "הדרן קארד הוא כרטיס פיזי אחד שמוריד 5% מכל קנייה, במקום. בלי נקודות, בלי קופונים ובלי טעינה מראש.",
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
