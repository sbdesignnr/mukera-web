import type { Metadata } from "next";
import { LanguageProvider } from "@/components/i18n";
import { CookieConsentProvider, CookieBanner } from "@/components/CookieConsent";
import { Gdpr } from "@/components/Gdpr";

export const metadata: Metadata = {
  title: "Ochrana osobných údajov a cookies | JUDr. Peter Múkera",
  description:
    "Zásady ochrany osobných údajov (GDPR) a používania cookies — advokátska kancelária JUDr. Peter Múkera, Banská Bystrica.",
};

export default function GdprPage() {
  return (
    <LanguageProvider>
      <CookieConsentProvider>
        <Gdpr />
        <CookieBanner />
      </CookieConsentProvider>
    </LanguageProvider>
  );
}
