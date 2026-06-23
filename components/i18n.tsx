"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  translations,
  LOCALES,
  LOCALE_LABELS,
  LOCALE_NAMES,
  type Locale,
  type Translation,
} from "./translations";

const STORAGE_KEY = "mukera-locale";

interface I18nValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: Translation;
}

const I18nContext = createContext<I18nValue | null>(null);

const isLocale = (v: string | null): v is Locale =>
  v !== null && (LOCALES as string[]).includes(v);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [locale, setLocaleState] = useState<Locale>("sk");

  // Po mount-e: použij uloženú voľbu, inak jazyk prehliadača (ak ho podporujeme)
  useEffect(() => {
    let initial: Locale | null = null;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (isLocale(stored)) initial = stored;
    } catch {
      /* localStorage nedostupné */
    }
    if (!initial) {
      const browser = navigator.language.slice(0, 2).toLowerCase();
      if (isLocale(browser)) initial = browser;
    }
    // Až po mount-e (kvôli hydratácii statického exportu) — preto setState v efekte.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (initial && initial !== "sk") setLocaleState(initial);
  }, []);

  // Drž <html lang> v synchu s vybraným jazykom
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* ignore */
    }
  };

  return (
    <I18nContext.Provider value={{ locale, setLocale, t: translations[locale] }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = (): I18nValue => {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within LanguageProvider");
  return ctx;
};

// ─── Prepínač jazykov ──────────────────────────────────────────────────────────

export const LanguageSwitcher = ({ size = "sm" }: { size?: "sm" | "lg" }) => {
  const { locale, setLocale } = useI18n();
  const big = size === "lg";

  return (
    <div
      role="group"
      aria-label="Výber jazyka / Language"
      style={{ display: "flex", alignItems: "center", gap: big ? "12px" : "9px" }}
    >
      {LOCALES.map((l, i) => {
        const isActive = locale === l;
        return (
          <span key={l} style={{ display: "flex", alignItems: "center", gap: big ? "12px" : "9px" }}>
            <button
              type="button"
              onClick={() => setLocale(l)}
              aria-current={isActive}
              aria-label={LOCALE_NAMES[l]}
              style={{
                background: "none",
                border: "none",
                padding: 0,
                cursor: "pointer",
                fontFamily: "var(--font-ui)",
                fontSize: big ? "15px" : "12px",
                letterSpacing: "0.15em",
                color: isActive ? "#C9A96E" : "rgba(255,255,255,0.5)",
                transition: "color 250ms ease",
              }}
              onMouseEnter={(e) => {
                if (!isActive) (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.85)";
              }}
              onMouseLeave={(e) => {
                if (!isActive) (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.5)";
              }}
            >
              {LOCALE_LABELS[l]}
            </button>
            {i < LOCALES.length - 1 && (
              <span aria-hidden="true" style={{ color: "rgba(181,148,90,0.3)", fontSize: "9px" }}>
                ·
              </span>
            )}
          </span>
        );
      })}
    </div>
  );
};
