"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useI18n } from "./i18n";

type Consent = "unset" | "accepted" | "declined";
const STORAGE_KEY = "mukera-cookie-consent";

interface ConsentValue {
  consent: Consent;
  hydrated: boolean;
  accept: () => void;
  decline: () => void;
}

const ConsentContext = createContext<ConsentValue | null>(null);

export const CookieConsentProvider = ({ children }: { children: React.ReactNode }) => {
  const [consent, setConsent] = useState<Consent>("unset");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (stored === "accepted" || stored === "declined") setConsent(stored);
    } catch {
      /* localStorage nedostupné */
    }
    setHydrated(true);
  }, []);

  const persist = (c: Consent) => {
    setConsent(c);
    try {
      localStorage.setItem(STORAGE_KEY, c);
    } catch {
      /* ignore */
    }
  };

  return (
    <ConsentContext.Provider
      value={{ consent, hydrated, accept: () => persist("accepted"), decline: () => persist("declined") }}
    >
      {children}
    </ConsentContext.Provider>
  );
};

export const useCookieConsent = (): ConsentValue => {
  const ctx = useContext(ConsentContext);
  if (!ctx) throw new Error("useCookieConsent must be used within CookieConsentProvider");
  return ctx;
};

// ─── Cookie lišta ───────────────────────────────────────────────────────────────

export const CookieBanner = () => {
  const { t } = useI18n();
  const { consent, hydrated, accept, decline } = useCookieConsent();

  // Po mount-e a len ak ešte nebola voľba urobená
  if (!hydrated || consent !== "unset") return null;

  return (
    <div
      role="dialog"
      aria-label={t.cookies.bannerTitle}
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 80,
        background: "rgba(8,15,30,0.98)",
        backdropFilter: "blur(14px)",
        borderTop: "0.5px solid rgba(181,148,90,0.3)",
        boxShadow: "0 -20px 50px rgba(0,0,0,0.4)",
        padding: "clamp(1rem, 2.5vw, 1.5rem) clamp(1.25rem, 5vw, 3rem)",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem 1.5rem",
        }}
      >
        <div style={{ flex: "1 1 420px", minWidth: 0 }}>
          <p
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "1.05rem",
              color: "#C9A96E",
              marginBottom: "4px",
            }}
          >
            {t.cookies.bannerTitle}
          </p>
          <p
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: "13px",
              color: "rgba(255,255,255,0.6)",
              lineHeight: 1.6,
            }}
          >
            {t.cookies.bannerText}{" "}
            <a
              href="/gdpr/"
              style={{ color: "rgba(201,169,110,0.95)", textDecoration: "underline", textUnderlineOffset: "2px" }}
            >
              {t.cookies.more}
            </a>
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "12px", flexShrink: 0 }}>
          <button
            type="button"
            onClick={decline}
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: "11px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.6)",
              background: "none",
              border: "0.5px solid rgba(255,255,255,0.18)",
              padding: "11px 18px",
              cursor: "pointer",
              whiteSpace: "nowrap",
              transition: "color 250ms ease, border-color 250ms ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.9)";
              (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.4)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.6)";
              (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.18)";
            }}
          >
            {t.cookies.decline}
          </button>
          <button
            type="button"
            onClick={accept}
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: "11px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#0B1220",
              background: "#B5945A",
              border: "0.5px solid #B5945A",
              padding: "11px 22px",
              cursor: "pointer",
              whiteSpace: "nowrap",
              transition: "background 250ms ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "#C9A96E";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "#B5945A";
            }}
          >
            {t.cookies.accept}
          </button>
        </div>
      </div>
    </div>
  );
};
