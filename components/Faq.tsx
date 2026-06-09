"use client";

import { useEffect, useRef, useState } from "react";

// ─── Data ────────────────────────────────────────────────────────────────────

const FAQS = [
  {
    q: "Ako prebieha úvodná konzultácia?",
    a: "Na prvom stretnutí si podrobne vypočujeme váš problém, zanalyzujeme dostupné dokumenty a navrhneme reálne právne kroky. Úvodná konzultácia nám slúži na zhodnotenie šancí na úspech.",
  },
  {
    q: "Aké sú náklady na právne zastúpenie?",
    a: "Odmena je vždy stanovená transparentne vopred – buď ako hodinová sadzba, paušálna odmena, alebo podielová odmena v závislosti od povahy prípadu a dohody s klientom.",
  },
  {
    q: "Zastupujete klientov aj mimo Banskej Bystrice?",
    a: "Áno, napriek tomu, že naše sídlo je v Banskej Bystrici, poskytujeme právne služby a zastupujeme klientov pred súdmi a úradmi na celom území Slovenskej republiky.",
  },
  {
    q: "Čo si mám priniesť na prvé stretnutie?",
    a: "Prineste si so sebou všetky relevantné zmluvy, rozhodnutia úradov, korešpondenciu (aj e-mailovú) a akékoľvek iné podklady, ktoré s vaším prípadom priamo súvisia.",
  },
];

// ─── Single accordion item ────────────────────────────────────────────────────

const FaqItem = ({
  item,
  index,
  isOpen,
  onToggle,
}: {
  item: (typeof FAQS)[number];
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        borderBottom: "0.5px solid rgba(255,255,255,0.07)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.7s ease ${index * 100}ms, transform 0.7s ease ${index * 100}ms`,
      }}
    >
      {/* Question / toggle button */}
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1.5rem",
          padding: "1.6rem 0",
          background: "none",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-ui)",
            fontSize: "clamp(0.9rem, 1.5vw, 1.05rem)",
            color: isOpen ? "#C9A96E" : "rgba(255,255,255,0.88)",
            lineHeight: 1.4,
            transition: "color 300ms ease",
          }}
        >
          {item.q}
        </span>

        {/* Chevron icon */}
        <span
          aria-hidden="true"
          style={{
            flexShrink: 0,
            width: "28px",
            height: "28px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: `0.5px solid ${isOpen ? "rgba(181,148,90,0.5)" : "rgba(255,255,255,0.12)"}`,
            color: "#B5945A",
            transition: "transform 400ms cubic-bezier(0.25,0.46,0.45,0.94), border-color 300ms ease",
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
          }}
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round">
            <polyline points="1,3 5,7 9,3" />
          </svg>
        </span>
      </button>

      {/*
        CSS Grid trick for smooth height animation:
        Closed → grid-template-rows: 0fr
        Open   → grid-template-rows: 1fr
        The inner div must have overflow: hidden so content is clipped at 0fr.
      */}
      <div
        style={{
          display: "grid",
          gridTemplateRows: isOpen ? "1fr" : "0fr",
          transition: "grid-template-rows 400ms cubic-bezier(0.25,0.46,0.45,0.94)",
        }}
      >
        <div style={{ overflow: "hidden" }}>
          <p
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: "16px",
              color: "rgba(255,255,255,0.55)",
              lineHeight: 1.95,
              paddingBottom: "1.6rem",
              paddingRight: "2.5rem",
              maxWidth: "580px",
            }}
          >
            {item.a}
          </p>
        </div>
      </div>
    </div>
  );
};

// ─── Section ─────────────────────────────────────────────────────────────────

export const Faq = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerVisible, setHeaderVisible] = useState(false);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeaderVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section
      id="faq"
      style={{
        background: "#080F1E",
        borderTop: "0.5px solid rgba(181,148,90,0.1)",
        padding: "clamp(4rem, 8vw, 7rem) clamp(1.5rem, 6vw, 6rem)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background watermark */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "-1rem",
          bottom: "-3rem",
          fontFamily: "var(--font-heading)",
          fontSize: "20vw",
          fontWeight: 300,
          color: "rgba(181,148,90,0.025)",
          lineHeight: 1,
          pointerEvents: "none",
          userSelect: "none",
          whiteSpace: "nowrap",
        }}
      >
        FAQ
      </div>

      <div style={{ maxWidth: "760px", margin: "0 auto", position: "relative" }}>
        {/* Header */}
        <div
          ref={headerRef}
          style={{
            textAlign: "center",
            marginBottom: "3.5rem",
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
            <div style={{ width: 28, height: "0.5px", background: "rgba(181,148,90,0.45)" }} />
            <span
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: "13px",
                color: "#B5945A",
                letterSpacing: "0.35em",
                textTransform: "uppercase",
              }}
            >
              FAQ
            </span>
            <div style={{ width: 28, height: "0.5px", background: "rgba(181,148,90,0.45)" }} />
          </div>

          {/* H2 */}
          <h2
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 300,
              fontSize: "clamp(1.9rem, 3.5vw, 3.2rem)",
              color: "white",
              lineHeight: 1.15,
            }}
          >
            Otázky, ktoré sa nás
            <br />
            pýtate{" "}
            <em style={{ fontStyle: "italic", color: "#C9A96E" }}>najčastejšie.</em>
          </h2>
        </div>

        {/* Gold top rule */}
        <div style={{ width: "100%", height: "0.5px", background: "rgba(181,148,90,0.15)", marginBottom: 0 }} />

        {/* Accordion items */}
        {FAQS.map((item, i) => (
          <FaqItem
            key={i}
            item={item}
            index={i}
            isOpen={openIndex === i}
            onToggle={() => toggle(i)}
          />
        ))}

        {/* CTA below accordion */}
        <div
          style={{
            marginTop: "3rem",
            paddingTop: "2.5rem",
            borderTop: "0.5px solid rgba(181,148,90,0.15)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1.25rem",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: "12px",
              color: "rgba(255,255,255,0.3)",
              letterSpacing: "0.05em",
              textAlign: "center",
            }}
          >
            Nenašli ste odpoveď na svoju otázku?
          </p>
          <a
            href="#kontakt"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              fontFamily: "var(--font-ui)",
              fontSize: "9px",
              color: "#B5945A",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              textDecoration: "none",
              padding: "12px 0",
              borderBottom: "0.5px solid rgba(181,148,90,0.4)",
              transition: "color 300ms ease, border-color 300ms ease",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.color = "white";
              el.style.borderColor = "rgba(255,255,255,0.4)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.color = "#B5945A";
              el.style.borderColor = "rgba(181,148,90,0.4)";
            }}
          >
            Napíšte nám priamo
            <span style={{ display: "inline-block" }}>→</span>
          </a>
        </div>
      </div>
    </section>
  );
};
