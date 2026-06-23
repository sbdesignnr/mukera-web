"use client";

import { useEffect, useRef, useState } from "react";
import { useI18n } from "./i18n";

// ─── Data — skutočné Google recenzie (všetky 5★) ──────────────────────────────
// Mená autorov zostávajú; texty recenzií sú preložené v translations.ts
// (zachovávajú zmysel pôvodných slovenských recenzií).

const REVIEW_AUTHORS = [
  "Monika Sidorová",
  "Nino Gál",
  "Miso Miso",
  "Eva Halajová",
  "Miroslav Švec",
  "Peter Pochyba",
  "Michal M",
  "Alina Malčeková",
  "Peter Havran",
  "Miroslav Vavra",
  "Sara Tarnociova",
  "Alexander Vegso",
];

const AUTOPLAY_MS = 6000;

// ─── 5-star rating ─────────────────────────────────────────────────────────────

const Stars = ({ label }: { label: string }) => (
  <div
    style={{ display: "flex", gap: "4px" }}
    role="img"
    aria-label={label}
  >
    {Array.from({ length: 5 }).map((_, i) => (
      <svg key={i} width="17" height="17" viewBox="0 0 24 24" fill="#B5945A" aria-hidden="true">
        <path d="M12 2l2.94 5.96 6.58.96-4.76 4.64 1.12 6.55L12 17.77l-5.88 3.09 1.12-6.55L2.48 8.92l6.58-.96L12 2z" />
      </svg>
    ))}
  </div>
);

// ─── Arrow icon ──────────────────────────────────────────────────────────────

const Chevron = ({ dir }: { dir: "left" | "right" }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    {dir === "left" ? <polyline points="15 18 9 12 15 6" /> : <polyline points="9 18 15 12 9 6" />}
  </svg>
);

// ─── Arrow button ──────────────────────────────────────────────────────────────

const ArrowButton = ({
  dir,
  onClick,
  label,
}: {
  dir: "left" | "right";
  onClick: () => void;
  label: string;
}) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={label}
    style={{
      width: "46px",
      height: "46px",
      flexShrink: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "none",
      border: "0.5px solid rgba(181,148,90,0.3)",
      color: "rgba(255,255,255,0.7)",
      cursor: "pointer",
      transition: "border-color 300ms ease, color 300ms ease, background 300ms ease",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.borderColor = "#B5945A";
      e.currentTarget.style.color = "#C9A96E";
      e.currentTarget.style.background = "rgba(181,148,90,0.08)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.borderColor = "rgba(181,148,90,0.3)";
      e.currentTarget.style.color = "rgba(255,255,255,0.7)";
      e.currentTarget.style.background = "none";
    }}
  >
    <Chevron dir={dir} />
  </button>
);

// ─── Section ─────────────────────────────────────────────────────────────────

export const Reviews = () => {
  const { t } = useI18n();
  const reviews = REVIEW_AUTHORS.map((author, i) => ({ author, text: t.reviews.items[i] }));
  const count = reviews.length;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);

  const headerRef = useRef<HTMLDivElement>(null);
  const [headerVisible, setHeaderVisible] = useState(false);

  // Header reveal
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

  // Respect prefers-reduced-motion (no autoplay / no transitions)
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Autoplay — re-arms on every active change; pauses on hover/focus
  useEffect(() => {
    if (paused || reduced || count <= 1) return;
    const id = setTimeout(() => setActive((a) => (a + 1) % count), AUTOPLAY_MS);
    return () => clearTimeout(id);
  }, [active, paused, reduced, count]);

  const go = (dir: number) => setActive((a) => (a + dir + count) % count);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") go(-1);
    else if (e.key === "ArrowRight") go(1);
  };

  return (
    <section
      id="referencie"
      style={{
        background: "#080F1E",
        borderTop: "0.5px solid rgba(181,148,90,0.12)",
        padding: "clamp(4rem, 8vw, 7rem) clamp(1.5rem, 6vw, 6rem)",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: "980px", margin: "0 auto" }}>
        {/* Header */}
        <div
          ref={headerRef}
          style={{
            textAlign: "center",
            marginBottom: "clamp(2.5rem, 5vw, 3.5rem)",
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
                fontSize: "13px",
                color: "#B5945A",
                letterSpacing: "0.35em",
                textTransform: "uppercase",
              }}
            >
              {t.reviews.kicker}
            </span>
            <div style={{ width: 28, height: "0.5px", background: "rgba(181,148,90,0.5)" }} />
          </div>

          {/* H2 */}
          <h2
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 300,
              fontSize: "clamp(1.9rem, 3.5vw, 3.2rem)",
              color: "rgba(255,255,255,0.95)",
              lineHeight: 1.15,
              marginBottom: "1rem",
            }}
          >
            {t.reviews.title}{" "}
            <em style={{ fontStyle: "italic", color: "#C9A96E" }}>{t.reviews.titleAccent}</em>
          </h2>

          {/* Subtitle */}
          <p
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: "16px",
              color: "rgba(255,255,255,0.5)",
              lineHeight: 1.7,
              maxWidth: "480px",
              margin: "0 auto",
            }}
          >
            {t.reviews.subtitle}
          </p>
        </div>

        {/* ── Carousel ── */}
        <div
          className="reviews-carousel"
          role="group"
          aria-roledescription="carousel"
          aria-label={t.reviews.carouselLabel}
          tabIndex={0}
          onKeyDown={onKeyDown}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
          style={{ position: "relative" }}
        >
          {/* Slides — všetky v jednej grid bunke (crossfade, konzistentná výška) */}
          <div style={{ display: "grid" }}>
            {reviews.map((review, i) => {
              const isActive = i === active;
              return (
                <article
                  key={i}
                  aria-hidden={!isActive}
                  aria-roledescription="slide"
                  aria-label={`${i + 1} ${t.reviews.of} ${count}`}
                  style={{
                    gridArea: "1 / 1",
                    background: "#0A1628",
                    border: "0.5px solid rgba(181,148,90,0.18)",
                    boxShadow: "0 30px 80px rgba(0,0,0,0.4)",
                    padding: "clamp(2.5rem, 5vw, 4rem)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    position: "relative",
                    overflow: "hidden",
                    opacity: isActive ? 1 : 0,
                    transform: isActive ? "translateY(0)" : "translateY(14px)",
                    pointerEvents: isActive ? "auto" : "none",
                    transition: reduced
                      ? "none"
                      : "opacity 0.7s ease, transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94)",
                  }}
                >
                  {/* Decorative quote watermark */}
                  <span
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      top: "-0.5rem",
                      left: "1.5rem",
                      fontFamily: "var(--font-heading)",
                      fontSize: "clamp(6rem, 13vw, 9rem)",
                      lineHeight: 1,
                      color: "rgba(181,148,90,0.08)",
                      pointerEvents: "none",
                      userSelect: "none",
                    }}
                  >
                    &ldquo;
                  </span>

                  {/* Stars */}
                  <Stars label={t.reviews.ratingLabel} />

                  {/* Quote */}
                  <p
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontStyle: "italic",
                      fontWeight: 300,
                      fontSize: "clamp(1.25rem, 2.2vw, 1.85rem)",
                      color: "rgba(255,255,255,0.92)",
                      lineHeight: 1.6,
                      maxWidth: "680px",
                      marginTop: "1.75rem",
                      position: "relative",
                    }}
                  >
                    {review.text}
                  </p>

                  {/* Gold divider */}
                  <div
                    style={{
                      width: "44px",
                      height: "0.5px",
                      background: "rgba(181,148,90,0.5)",
                      margin: "clamp(1.5rem, 3vw, 2rem) 0 1.25rem",
                    }}
                  />

                  {/* Author — zlatou farbou */}
                  <p
                    style={{
                      fontFamily: "var(--font-ui)",
                      fontSize: "15px",
                      color: "#C9A96E",
                      letterSpacing: "0.08em",
                    }}
                  >
                    {review.author}
                  </p>
                </article>
              );
            })}
          </div>

          {/* Controls */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "clamp(1rem, 3vw, 1.75rem)",
              marginTop: "clamp(2rem, 4vw, 2.75rem)",
            }}
          >
            <ArrowButton dir="left" onClick={() => go(-1)} label={t.reviews.prev} />

            {/* Dots */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", justifyContent: "center" }}>
              {reviews.map((_, i) => {
                const isActive = i === active;
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActive(i)}
                    aria-label={`${t.reviews.gotoLabel} ${i + 1}`}
                    aria-current={isActive}
                    style={{
                      width: isActive ? "24px" : "7px",
                      height: "7px",
                      padding: 0,
                      border: "none",
                      borderRadius: "4px",
                      background: isActive ? "#B5945A" : "rgba(181,148,90,0.28)",
                      cursor: "pointer",
                      transition: "width 350ms ease, background 350ms ease",
                    }}
                  />
                );
              })}
            </div>

            <ArrowButton dir="right" onClick={() => go(1)} label={t.reviews.next} />
          </div>
        </div>

        {/* Bottom signature line */}
        <div
          style={{
            marginTop: "clamp(2.5rem, 5vw, 3.5rem)",
            paddingTop: "2rem",
            borderTop: "0.5px solid rgba(255,255,255,0.06)",
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
              color: "rgba(255,255,255,0.4)",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              textAlign: "center",
            }}
          >
            {t.reviews.footer}
          </span>
          <div style={{ width: 24, height: "0.5px", background: "rgba(181,148,90,0.3)" }} />
        </div>
      </div>
    </section>
  );
};
