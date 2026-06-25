import { LanguageProvider } from "@/components/i18n";
import { CookieConsentProvider, CookieBanner } from "@/components/CookieConsent";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { Faq } from "@/components/Faq";
import { Reviews } from "@/components/Reviews";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <LanguageProvider>
      <CookieConsentProvider>
        <main>
          <Navbar />
          <Hero />
          <div id="o-nas" />
          <About />
          <Services />
          <Contact />
          <Reviews />
          <Faq />
          <Footer />
        </main>
        <CookieBanner />
      </CookieConsentProvider>
    </LanguageProvider>
  );
}
