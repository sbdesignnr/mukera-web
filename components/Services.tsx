"use client";

import { useEffect, useRef, useState } from "react";

// ─── Data ────────────────────────────────────────────────────────────────────

const SERVICES = [
  {
    id: "trestne",
    title: "Trestné právo",
    intro:
      "Obhajoba v trestnom konaní, zastupovanie poškodených a právne poradenstvo vo všetkých štádiách trestného procesu.",
    detail: [
      "Obhajoba obvineného a obžalovaného v trestnom konaní pred všetkými stupňami súdov.",
      "Zastupovanie poškodeného a uplatnenie nároku na náhradu škody v adhéznom konaní.",
      "Právne poradenstvo pri výsluchoch a vyšetrovacích úkonoch.",
      "Podávanie sťažností, odvolaní a mimoriadnych opravných prostriedkov.",
      "Zastupovanie v konaní o podmienečné prepustenie a upustenie od výkonu trestu.",
    ],
  },
  {
    id: "obchodne",
    title: "Obchodné právo",
    intro:
      "Zakladanie obchodných spoločností, zmluvná agenda, vymáhanie pohľadávok a riešenie obchodných sporov.",
    detail: [
      "Zakladanie a zmeny obchodných spoločností, zápisy do obchodného registra.",
      "Príprava a revízia obchodných zmlúv, NDA, distribučných a licenčných dohôd.",
      "Vymáhanie pohľadávok — mimosúdne aj súdne, vrátane exekučného konania.",
      "Právne poradenstvo pri fúziách, akvizíciách a prevode obchodných podielov.",
      "Zastupovanie v obchodných sporoch pred súdmi a rozhodcovskými tribunálmi.",
    ],
  },
  {
    id: "obcianske",
    title: "Občianske právo",
    intro:
      "Dedičské konania, susedské spory a komplexná ochrana osobnostných práv.",
    detail: [
      "Zastupovanie v dedičských konaniach, správa dedičstva a spory medzi dedičmi.",
      "Ochrana osobnosti, náhrada nemajetkovej ujmy a ochrana pred neoprávneným zásahom.",
      "Susedské spory, ochrana držby a vlastníckeho práva.",
      "Príprava a revízia občianskoprávnych zmlúv (kúpa, darovanie, pôžička).",
    ],
  },
  {
    id: "rodinne",
    title: "Rodinné právo",
    intro:
      "Rozvod manželstva, úprava rodičovských práv, výživné a majetkové vyrovnanie manželov.",
    detail: [
      "Zastupovanie v konaní o rozvod manželstva a o úpravu pomerov k maloletým deťom.",
      "Určenie a vymáhanie výživného na deti, manžela aj rozvedeného manžela.",
      "Úprava styku rodiča s maloletým dieťaťom a riešenie sporov o starostlivosť.",
      "Vyporiadanie bezpodielového spoluvlastníctva manželov po rozvode.",
      "Určenie a zapretie otcovstva, osvojenie a poručníctvo.",
    ],
  },
  {
    id: "pracovne",
    title: "Pracovné právo",
    intro:
      "Pracovné zmluvy, neplatné výpovede, diskriminácia na pracovisku a kolektívne pracovné vzťahy.",
    detail: [
      "Príprava a revízia pracovných zmlúv, dohôd o pracovnej činnosti a konkurenčných doložiek.",
      "Zastupovanie pri neplatnom skončení pracovného pomeru a náhrade mzdy.",
      "Riešenie pracovných sporov — mediácia aj súdne konanie.",
      "Poradenstvo zamestnávateľom pri organizačných zmenách, prepúšťaní a reštrukturalizácii.",
      "Ochrana pred diskrimináciou a obťažovaním na pracovisku.",
    ],
  },
  {
    id: "nehnutelnosti",
    title: "Nehnuteľnosti a zmluvy",
    intro:
      "Kúpne zmluvy, záložné právo, kataster nehnuteľností a komplexné právne due diligence.",
    detail: [
      "Príprava a revízia kúpnych zmlúv, zmlúv o prevode nehnuteľností a nájomných zmlúv.",
      "Právne due diligence nehnuteľností pred kúpou.",
      "Záložné právo, vecné bremená a iné práva k cudzej veci.",
      "Zastupovanie v katastrálnych konaniach a pri sporoch o vlastníctvo.",
      "Poradenstvo pri developerských projektoch a správe bytových domov.",
    ],
  },
];

// ─── Icons ───────────────────────────────────────────────────────────────────

const ICONS: Record<string, React.ReactNode> = {
  trestne: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.25} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  obchodne: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.25} strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
      <line x1="2" y1="13" x2="22" y2="13" />
    </svg>
  ),
  obcianske: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.25} strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  pracovne: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.25} strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  ),
  rodinne: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.25} strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  ),
  nehnutelnosti: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.25} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
};

// ─── Types ───────────────────────────────────────────────────────────────────

interface Service {
  id: string;
  title: string;
  intro: string;
  detail: string[];
}

// ─── Drawer ──────────────────────────────────────────────────────────────────

const Drawer = ({
  service,
  onClose,
}: {
  service: Service | null;
  onClose: () => void;
}) => {
  const open = service !== null;

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Close on Escape key
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(15,23,42,0.55)",
          backdropFilter: "blur(4px)",
          zIndex: 40,
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "opacity 400ms ease",
        }}
      />

      {/* Panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={service?.title}
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          height: "100%",
          width: "100%",
          maxWidth: "480px",
          background: "#FFFFFF",
          zIndex: 50,
          boxShadow: "-8px 0 60px rgba(0,0,0,0.12)",
          transform: open ? "translateX(0)" : "translateX(100%)",
          transition: "transform 500ms cubic-bezier(0.25,0.46,0.45,0.94)",
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "2rem 2rem 1.5rem",
            borderBottom: "0.5px solid rgba(27,42,74,0.08)",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: "1rem",
            position: "sticky",
            top: 0,
            background: "#FFFFFF",
            zIndex: 1,
          }}
        >
          <div>
            <p
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: "8px",
                color: "#B5945A",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                marginBottom: "8px",
              }}
            >
              Oblasť praxe
            </p>
            <h2
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 300,
                fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
                color: "#1B2A4A",
                lineHeight: 1.1,
              }}
            >
              {service?.title}
            </h2>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Zavrieť"
            style={{
              flexShrink: 0,
              marginTop: "4px",
              width: "36px",
              height: "36px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "none",
              border: "0.5px solid rgba(27,42,74,0.15)",
              cursor: "pointer",
              color: "#1B2A4A",
              transition: "border-color 300ms, color 300ms",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = "#B5945A";
              (e.currentTarget as HTMLButtonElement).style.color = "#B5945A";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(27,42,74,0.15)";
              (e.currentTarget as HTMLButtonElement).style.color = "#1B2A4A";
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth={1.5}>
              <line x1="1" y1="1" x2="13" y2="13" />
              <line x1="13" y1="1" x2="1" y2="13" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: "2rem", flexGrow: 1 }}>
          {/* Gold divider */}
          <div style={{ width: 36, height: 1, background: "rgba(181,148,90,0.5)", marginBottom: "1.5rem" }} />

          {/* Intro */}
          <p
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: "16px",
              color: "rgba(27,42,74,0.65)",
              lineHeight: 1.9,
              marginBottom: "2rem",
            }}
          >
            {service?.intro}
          </p>

          {/* Detail list */}
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0" }}>
            {service?.detail.map((item, i) => (
              <li
                key={i}
                style={{
                  display: "flex",
                  gap: "14px",
                  padding: "14px 0",
                  borderBottom: "0.5px solid rgba(27,42,74,0.06)",
                  alignItems: "flex-start",
                }}
              >
                <span
                  style={{
                    flexShrink: 0,
                    marginTop: "2px",
                    width: "16px",
                    height: "16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#B5945A",
                  }}
                >
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth={1.5}>
                    <polyline points="1,5 4,8 9,2" />
                  </svg>
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-ui)",
                    fontSize: "16px",
                    color: "rgba(27,42,74,0.7)",
                    lineHeight: 1.75,
                  }}
                >
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA Footer */}
        <div
          style={{
            padding: "1.5rem 2rem 2rem",
            borderTop: "0.5px solid rgba(27,42,74,0.08)",
            background: "#F8F7F4",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: "11px",
              color: "rgba(27,42,74,0.4)",
              letterSpacing: "0.05em",
              marginBottom: "1rem",
              lineHeight: 1.6,
            }}
          >
            Máte otázku k tejto oblasti? Radi vám poskytneme nezáväznú konzultáciu.
          </p>
          <a
            href="#spojte-sa"
            onClick={onClose}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              fontFamily: "var(--font-ui)",
              fontSize: "10px",
              color: "white",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              textDecoration: "none",
              background: "#1B2A4A",
              padding: "14px 24px",
              transition: "background 300ms ease",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "#B5945A"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "#1B2A4A"; }}
          >
            Dohodnúť konzultáciu
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={1.5}>
              <line x1="2" y1="6" x2="10" y2="6" />
              <polyline points="7,3 10,6 7,9" />
            </svg>
          </a>
        </div>
      </div>
    </>
  );
};

// ─── Card ─────────────────────────────────────────────────────────────────────

const ServiceCard = ({
  service,
  onOpen,
  index,
}: {
  service: Service;
  onOpen: (s: Service) => void;
  index: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      onClick={() => onOpen(service)}
      style={{
        background: "white",
        border: "0.5px solid rgba(27,42,74,0.08)",
        borderBottom: hover ? "2px solid #B5945A" : "2px solid transparent",
        padding: "2rem",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        boxShadow: hover
          ? "0 20px 60px rgba(0,0,0,0.1)"
          : "0 2px 16px rgba(0,0,0,0.04)",
        transform: hover ? "translateY(-6px)" : "translateY(0)",
        transition:
          "transform 350ms cubic-bezier(0.25,0.46,0.45,0.94), box-shadow 350ms ease, border-color 350ms ease, opacity 600ms ease, translate 600ms ease",
        opacity: visible ? 1 : 0,
        translate: visible ? "0 0" : "0 24px",
        transitionDelay: `${index * 80}ms`,
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* Icon */}
      <div
        style={{
          width: "40px",
          height: "40px",
          color: hover ? "#B5945A" : "rgba(27,42,74,0.35)",
          transition: "color 350ms ease",
        }}
      >
        {ICONS[service.id]}
      </div>

      {/* Title */}
      <h3
        style={{
          fontFamily: "var(--font-heading)",
          fontWeight: 300,
          fontSize: "1.6rem",
          color: "#1B2A4A",
          lineHeight: 1.2,
        }}
      >
        {service.title}
      </h3>

      {/* Gold rule */}
      <div
        style={{
          width: hover ? "36px" : "24px",
          height: "1px",
          background: "#B5945A",
          opacity: hover ? 0.7 : 0.35,
          transition: "width 350ms ease, opacity 350ms ease",
        }}
      />

      {/* Intro text */}
      <p
        style={{
          fontFamily: "var(--font-ui)",
          fontSize: "16px",
          color: "rgba(27,42,74,0.6)",
          lineHeight: 1.85,
          flexGrow: 1,
        }}
      >
        {service.intro}
      </p>

      {/* Link */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          fontFamily: "var(--font-ui)",
          fontSize: "10px",
          color: hover ? "#B5945A" : "rgba(181,148,90,0.6)",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          transition: "color 350ms ease",
        }}
      >
        Zistiť viac
        <span
          style={{
            display: "inline-block",
            transform: hover ? "translateX(4px)" : "translateX(0)",
            transition: "transform 350ms ease",
          }}
        >
          →
        </span>
      </div>
    </div>
  );
};

// ─── Section ─────────────────────────────────────────────────────────────────

export const Services = () => {
  const [activeService, setActiveService] = useState<Service | null>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerVisible, setHeaderVisible] = useState(false);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setHeaderVisible(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section
        id="sluzby"
        style={{
          background: "#F8F7F4",
          borderTop: "0.5px solid rgba(27,42,74,0.06)",
          padding: "clamp(4rem, 8vw, 7rem) clamp(1.5rem, 6vw, 6rem)",
        }}
      >
        {/* Section header */}
        <div
          ref={headerRef}
          style={{
            textAlign: "center",
            marginBottom: "4rem",
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
          }}
        >
          {/* Kicker */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "14px",
              marginBottom: "1.25rem",
            }}
          >
            <div style={{ width: 32, height: "0.5px", background: "rgba(181,148,90,0.5)" }} />
            <span
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: "13px",
                color: "#B5945A",
                letterSpacing: "0.35em",
                textTransform: "uppercase",
              }}
            >
              Oblasti praxe
            </span>
            <div style={{ width: 32, height: "0.5px", background: "rgba(181,148,90,0.5)" }} />
          </div>

          {/* H2 */}
          <h2
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 300,
              fontSize: "clamp(2rem, 3.5vw, 3.2rem)",
              color: "#1B2A4A",
              lineHeight: 1.15,
              maxWidth: "640px",
              margin: "0 auto",
            }}
          >
            Komplexné právne riešenia
            <br />
            <em style={{ fontStyle: "italic", color: "#B5945A" }}>
              pre vaše potreby.
            </em>
          </h2>
        </div>

        {/* Cards grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
            gap: "1.5rem",
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          {SERVICES.map((service, i) => (
            <ServiceCard
              key={service.id}
              service={service}
              onOpen={setActiveService}
              index={i}
            />
          ))}
        </div>
      </section>

      {/* Drawer (rendered outside section for correct stacking) */}
      <Drawer
        service={activeService}
        onClose={() => setActiveService(null)}
      />
    </>
  );
};
