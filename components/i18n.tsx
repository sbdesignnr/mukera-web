"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
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

// ─── Vlajky (vlastné SVG — konzistentné naprieč platformami, nie emoji) ─────────

const FLAG_SVG: Record<Locale, React.ReactNode> = {
  sk: (
    <svg width="20" height="14" viewBox="0 0 20 14" style={{ display: "block" }}>
      <rect width="20" height="14" fill="#fff" />
      <rect y="4.667" width="20" height="4.667" fill="#0B4EA2" />
      <rect y="9.334" width="20" height="4.666" fill="#EE1620" />
      {/* štátny znak — zjednodušený dvojkríž na trojvrší */}
      <g transform="translate(2.3,2.3)">
        <path
          d="M0,0.8 Q0,0 0.9,0 H6 Q6.9,0 6.9,0.8 V5.3 Q6.9,8.4 3.45,9.5 Q0,8.4 0,5.3 Z"
          fill="#EE1620"
          stroke="#fff"
          strokeWidth="0.5"
        />
        <path d="M0.7,6.5 Q2,5.1 3.45,6.5 Q4.9,5.1 6.2,6.5 V8.1 Q3.45,9.3 0.7,8.1 Z" fill="#0B4EA2" />
        <g fill="#fff">
          <rect x="3.05" y="1.0" width="0.8" height="5.4" />
          <rect x="2.0" y="2.2" width="2.9" height="0.7" />
          <rect x="1.5" y="3.7" width="3.9" height="0.7" />
        </g>
      </g>
    </svg>
  ),
  en: (
    <svg width="20" height="14" viewBox="0 0 20 14" style={{ display: "block" }}>
      <rect width="20" height="14" fill="#012169" />
      <path d="M0 0 L20 14 M20 0 L0 14" stroke="#fff" strokeWidth="2.8" />
      <path d="M0 0 L20 14 M20 0 L0 14" stroke="#C8102E" strokeWidth="1.4" />
      <path d="M10 0 V14 M0 7 H20" stroke="#fff" strokeWidth="4" />
      <path d="M10 0 V14 M0 7 H20" stroke="#C8102E" strokeWidth="2.2" />
    </svg>
  ),
  de: (
    <svg width="20" height="14" viewBox="0 0 20 14" style={{ display: "block" }}>
      <rect width="20" height="14" fill="#000" />
      <rect y="4.667" width="20" height="4.667" fill="#DD0000" />
      <rect y="9.334" width="20" height="4.666" fill="#FFCE00" />
    </svg>
  ),
  pl: (
    <svg width="20" height="14" viewBox="0 0 20 14" style={{ display: "block" }}>
      <rect width="20" height="7" fill="#fff" />
      <rect y="7" width="20" height="7" fill="#DC143C" />
    </svg>
  ),
};

const Flag = ({ locale }: { locale: Locale }) => (
  <span
    aria-hidden="true"
    style={{
      display: "inline-flex",
      width: "20px",
      height: "14px",
      flexShrink: 0,
      borderRadius: "2px",
      overflow: "hidden",
      boxShadow: "0 0 0 0.5px rgba(255,255,255,0.18)",
    }}
  >
    {FLAG_SVG[locale]}
  </span>
);

// ─── Prepínač jazykov (elegantný dropdown) ──────────────────────────────────────

export const LanguageSwitcher = ({ size = "sm" }: { size?: "sm" | "lg" }) => {
  const { locale, setLocale } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const big = size === "lg";

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} style={{ position: "relative" }}>
      {/* Trigger — len aktuálny jazyk + šípka */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`${LOCALE_NAMES[locale]} — zmeniť jazyk / change language`}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: big ? "9px" : "7px",
          background: "none",
          border: "none",
          padding: 0,
          cursor: "pointer",
          fontFamily: "var(--font-ui)",
          fontSize: big ? "15px" : "12px",
          letterSpacing: "0.2em",
          color: open ? "#C9A96E" : "rgba(255,255,255,0.8)",
          transition: "color 250ms ease",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.color = "#C9A96E";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.color = open ? "#C9A96E" : "rgba(255,255,255,0.8)";
        }}
      >
        {LOCALE_LABELS[locale]}
        <svg
          width="9"
          height="9"
          viewBox="0 0 10 10"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          aria-hidden="true"
          style={{
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 300ms cubic-bezier(0.25,0.46,0.45,0.94)",
          }}
        >
          <polyline points="1,3.5 5,7 9,3.5" />
        </svg>
      </button>

      {/* Panel s vlajkami */}
      <div
        role="listbox"
        aria-label="Výber jazyka / Language"
        style={{
          position: "absolute",
          top: "calc(100% + 14px)",
          ...(big ? { left: 0 } : { right: 0 }),
          minWidth: "190px",
          background: "rgba(8,15,30,0.97)",
          backdropFilter: "blur(14px)",
          border: "0.5px solid rgba(181,148,90,0.25)",
          boxShadow: "0 24px 60px rgba(0,0,0,0.5)",
          padding: "6px",
          display: "flex",
          flexDirection: "column",
          opacity: open ? 1 : 0,
          transform: open ? "translateY(0)" : "translateY(-8px)",
          pointerEvents: open ? "auto" : "none",
          transition: "opacity 240ms ease, transform 240ms cubic-bezier(0.25,0.46,0.45,0.94)",
          zIndex: 70,
        }}
      >
        {LOCALES.map((l) => {
          const isActive = l === locale;
          return (
            <button
              key={l}
              type="button"
              role="option"
              aria-selected={isActive}
              onClick={() => {
                setLocale(l);
                setOpen(false);
              }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                width: "100%",
                textAlign: "left",
                background: isActive ? "rgba(181,148,90,0.12)" : "transparent",
                border: "none",
                cursor: "pointer",
                padding: "10px 12px",
                fontFamily: "var(--font-ui)",
                fontSize: "13px",
                letterSpacing: "0.06em",
                color: isActive ? "#C9A96E" : "rgba(255,255,255,0.72)",
                transition: "background 200ms ease, color 200ms ease",
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.05)";
                  (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.95)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                  (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.72)";
                }
              }}
            >
              <Flag locale={l} />
              <span style={{ flex: 1 }}>{LOCALE_NAMES[l]}</span>
              <span style={{ fontSize: "10px", letterSpacing: "0.18em", opacity: 0.55 }}>
                {LOCALE_LABELS[l]}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
