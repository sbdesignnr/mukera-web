"use client";

import { useEffect, useRef, useState } from "react";

// ─── Data ────────────────────────────────────────────────────────────────────

const REVIEWS = [
  {
    text: "Prístup pána doktora Múkeru bol od prvej chvíle vysoko profesionálny. Prípad vyriešil k našej maximálnej spokojnosti a ušetril nám nemalé finančné prostriedky i čas.",
    author: "Konateľ stavebnej spoločnosti",
    area: "Obchodné právo",
  },
  {
    text: "Oceňujem najmä absolútnu diskrétnosť a rýchlosť, s akou bola naša zmluvná dokumentácia pripravená. Advokátsku kanceláriu určite odporúčam každému podnikateľovi.",
    author: "Zahraničný investor",
    area: "Nehnuteľnosti a zmluvy",
  },
  {
    text: "Konečne advokát, ktorý hovorí ľudskou rečou a neskrýva sa len za zložité paragrafy. Veľmi mi pomohli pri riešení náročného a citlivého dedičského konania.",
    author: "M. S., Banská Bystrica",
    area: "Občianske právo",
  },
];

// ─── Gold quote mark SVG ─────────────────────────────────────────────────────

const QuoteMark = () => (
  <svg
    width="32"
    height="24"
    viewBox="0 0 32 24"
    fill="#B5945A"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path d="M0 24V14.4C0 10.08 1.04 6.6 3.12 3.96 5.28 1.32 8.44 0 12.6 0v4.08c-2.24.24-3.92 1.12-5.04 2.64C6.44 8.24 5.88 10 5.88 12h4.44V24H0zm18.96 0V14.4c0-4.32 1.04-7.8 3.12-10.44C24.24 1.32 27.4 0 31.56 0v4.08c-2.24.24-3.92 1.12-5.04 2.64-1.12 1.52-1.68 3.28-1.68 5.28h4.44V24H18.96z" />
  </svg>
);

// ─── Single card ─────────────────────────────────────────────────────────────

const ReviewCard = ({
  review,
  index,
}: {
  review: (typeof REVIEWS)[number];
  index: number;
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
        background: "#F8F7F4",
        border: "0.5px solid rgba(27,42,74,0.07)",
        padding: "clamp(2rem, 4vw, 2.5rem)",
        display: "flex",
        flexDirection: "column",
        /* Snap scroll on mobile */
        scrollSnapAlign: "center",
        flexShrink: 0,
        /* Reveal */
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.75s ease ${index * 120}ms, transform 0.75s ease ${index * 120}ms`,
      }}
    >
      {/* Quote mark */}
      <div style={{ marginBottom: "1.5rem" }}>
        <QuoteMark />
      </div>

      {/* Review text */}
      <p
        style={{
          fontFamily: "var(--font-heading)",
          fontStyle: "italic",
          fontWeight: 300,
          fontSize: "clamp(1rem, 1.5vw, 1.15rem)",
          color: "#2C3E50",
          lineHeight: 1.8,
          flexGrow: 1,
        }}
      >
        {review.text}
      </p>

      {/* Gold divider */}
      <div
        style={{
          width: "44px",
          height: "0.5px",
          background: "#B5945A",
          margin: "1.75rem 0",
        }}
      />

      {/* Author */}
      <div>
        <p
          style={{
            fontFamily: "var(--font-ui)",
            fontSize: "9px",
            color: "#1B2A4A",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            marginBottom: "5px",
          }}
        >
          {review.author}
        </p>
        <p
          style={{
            fontFamily: "var(--font-ui)",
            fontSize: "10px",
            color: "rgba(181,148,90,0.75)",
            letterSpacing: "0.1em",
          }}
        >
          {review.area}
        </p>
      </div>
    </div>
  );
};

// ─── Section ─────────────────────────────────────────────────────────────────

export const Reviews = () => {
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

  return (
    <section
      id="referencie"
      style={{
        background: "#FFFFFF",
        borderTop: "0.5px solid rgba(27,42,74,0.06)",
        padding: "clamp(4rem, 8vw, 7rem) clamp(1.5rem, 6vw, 6rem)",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
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
            <div style={{ width: 28, height: "0.5px", background: "rgba(181,148,90,0.5)" }} />
            <span
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: "9px",
                color: "#B5945A",
                letterSpacing: "0.35em",
                textTransform: "uppercase",
              }}
            >
              Referencie
            </span>
            <div style={{ width: 28, height: "0.5px", background: "rgba(181,148,90,0.5)" }} />
          </div>

          {/* H2 */}
          <h2
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 300,
              fontSize: "clamp(1.9rem, 3.5vw, 3.2rem)",
              color: "#1B2A4A",
              lineHeight: 1.15,
              marginBottom: "1rem",
            }}
          >
            Dôvera, ktorá{" "}
            <em style={{ fontStyle: "italic", color: "#B5945A" }}>hovorí za všetko.</em>
          </h2>

          {/* Subtitle */}
          <p
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: "13px",
              color: "rgba(27,42,74,0.45)",
              lineHeight: 1.7,
              maxWidth: "460px",
              margin: "0 auto",
            }}
          >
            Diskrétnosť je pre nás kľúčová. Tu sú ohlasy klientov,
            ktorých sme úspešne zastupovali.
          </p>
        </div>

        {/*
          Cards container:
          - Mobile: horizontal snap-scroll (overflow-x: auto, snap)
          - Desktop (>= 768px): plain 3-column grid via CSS media query class
          The inline style handles the mobile default; the className adds
          the desktop grid override via a global CSS rule added to globals.css.
        */}
        <div
          className="reviews-grid"
          style={{
            display: "flex",
            overflowX: "auto",
            gap: "1.5rem",
            scrollSnapType: "x mandatory",
            paddingBottom: "0.5rem",
            /* Hide scrollbar — covered by .reviews-grid CSS in globals.css */
            msOverflowStyle: "none" as React.CSSProperties["msOverflowStyle"],
            scrollbarWidth: "none" as React.CSSProperties["scrollbarWidth"],
          }}
        >
          {REVIEWS.map((review, i) => (
            <div
              key={i}
              style={{
                /* Mobile: card takes 85vw so the next peeks */
                minWidth: "min(85vw, 320px)",
                flex: "1 0 min(85vw, 320px)",
              }}
              className="review-card-wrapper"
            >
              <ReviewCard review={review} index={i} />
            </div>
          ))}
        </div>

        {/* Bottom signature line */}
        <div
          style={{
            marginTop: "3.5rem",
            paddingTop: "2rem",
            borderTop: "0.5px solid rgba(27,42,74,0.06)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "16px",
          }}
        >
          <div style={{ width: 24, height: "0.5px", background: "rgba(181,148,90,0.3)" }} />
          <span
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: "9px",
              color: "rgba(27,42,74,0.3)",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
            }}
          >
            Všetky recenzie sú anonymizované z dôvodu ochrany súkromia
          </span>
          <div style={{ width: 24, height: "0.5px", background: "rgba(181,148,90,0.3)" }} />
        </div>
      </div>
    </section>
  );
};
