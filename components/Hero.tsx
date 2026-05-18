"use client";

import { useEffect, useRef, useState } from "react";
import { ShimmerText } from "./ShimmerText";

const STATS = [
  { end: 15,  suffix: "+", label: "Rokov praxe" },
  { end: 500, suffix: "+", label: "Klientov" },
  { end: 6,   suffix: "",  label: "Právnych oblastí" },
];

const useCounter = (end: number, duration: number, started: boolean) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    let startTime: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, end, duration]);
  return count;
};

const StatRow = ({ stat }: { stat: (typeof STATS)[number] }) => {
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); observer.disconnect(); } },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  const count = useCounter(stat.end, 2000, started);
  return (
    <div ref={ref} style={{ textAlign: "right" }}>
      <div
        style={{
          fontFamily: "var(--font-heading)",
          fontSize: "38px",
          fontWeight: 300,
          color: "rgba(255,255,255,0.7)",
          lineHeight: 1,
        }}
      >
        {count}{stat.suffix}
      </div>
      <div
        style={{
          fontFamily: "var(--font-ui)",
          fontSize: "8px",
          color: "rgba(181,148,90,0.65)",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          marginTop: "4px",
        }}
      >
        {stat.label}
      </div>
    </div>
  );
};

export const Hero = () => {
  const underlineRef = useRef<HTMLDivElement>(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const [btnAHover, setBtnAHover] = useState(false);
  const [shimmerSize, setShimmerSize] = useState(0);

  useEffect(() => {
    const update = () => {
      if (!h1Ref.current) return;
      const size = parseFloat(window.getComputedStyle(h1Ref.current).fontSize);
      setShimmerSize(Math.round(size));
    };
    document.fonts.ready.then(() => setTimeout(update, 200));
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <section
      style={{
        position: "relative",
        height: "100svh",
        overflow: "hidden",
        background: "#080F1E",
      }}
    >
      {/* 1 — Background photo */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/hero-bg.webp"
        alt=""
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center",
          opacity: 0.18,
        }}
      />

      {/* 2 — Gradient overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(105deg, #080F1E 0%, #080F1E 42%, rgba(8,15,30,0.88) 65%, rgba(8,15,30,0.6) 100%)",
        }}
      />

      {/* 3 — Vertical grid lines */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "repeating-linear-gradient(90deg, rgba(181,148,90,0.025) 0px, rgba(181,148,90,0.025) 1px, transparent 1px, transparent 80px)",
        }}
      />

      {/* 4 — Left gold accent line */}
      <div
        style={{
          position: "absolute",
          left: 32,
          top: "50%",
          transform: "translateY(-50%)",
          width: 1,
          height: 130,
          background:
            "linear-gradient(to bottom, transparent, rgba(181,148,90,0.45), transparent)",
        }}
      />

      {/* 5 — Corner accent bottom-right */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          width: 160,
          height: 160,
          borderTop: "0.5px solid rgba(181,148,90,0.08)",
          borderLeft: "0.5px solid rgba(181,148,90,0.08)",
        }}
      />

      {/* ── Main content ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          padding: "0 48px",
          paddingTop: "72px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto",
            gap: 60,
            alignItems: "center",
            width: "100%",
            maxWidth: 1200,
            margin: "0 auto",
          }}
        >
          {/* LEFT COLUMN */}
          <div>
            {/* Eyebrow */}
            <div
              className="anim-1"
              style={{ display: "flex", alignItems: "center", gap: 12 }}
            >
              <div style={{ width: 28, height: 1, background: "#B5945A", flexShrink: 0 }} />
              <span
                style={{
                  fontFamily: "var(--font-ui)",
                  fontSize: "9px",
                  color: "rgba(181,148,90,0.9)",
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                }}
              >
                Advokátska kancelária
              </span>
            </div>

            {/* H1 */}
            <h1
              ref={h1Ref}
              className="anim-2 hero-h1"
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 300,
                fontSize: "clamp(3.2rem, 5.5vw, 5.8rem)",
                color: "white",
                lineHeight: 0.95,
                letterSpacing: "-0.01em",
                marginTop: "1.5rem",
              }}
            >
              Vaše práva.
              <br />
              Naša{" "}
              {shimmerSize > 0 && <ShimmerText text="priorita." fontSize={shimmerSize} color="#C9A96E" />}
            </h1>

            {/* Gold divider */}
            <div
              className="anim-3"
              style={{
                width: 44,
                height: 1,
                background: "rgba(181,148,90,0.4)",
                marginTop: "1.75rem",
              }}
            />

            {/* Paragraph */}
            <p
              className="anim-4"
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: "13px",
                color: "rgba(255,255,255,0.32)",
                lineHeight: 1.95,
                maxWidth: "340px",
                marginTop: "1.25rem",
                fontWeight: 400,
              }}
            >
              Komplexné právne služby s&nbsp;osobným prístupom
              a&nbsp;odbornosťou, ktorej môžete dôverovať.
            </p>

            {/* Buttons */}
            <div
              className="anim-5"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 36,
                marginTop: "2.5rem",
              }}
            >
              <button
                style={{
                  fontFamily: "var(--font-ui)",
                  fontSize: "10px",
                  color: btnAHover ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.65)",
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  padding: "0 0 10px 0",
                  border: "none",
                  borderBottom: "1px solid rgba(181,148,90,0.5)",
                  background: "none",
                  cursor: "pointer",
                  position: "relative",
                  whiteSpace: "nowrap",
                  transition: "color 500ms cubic-bezier(0.25,0.46,0.45,0.94)",
                }}
                onMouseEnter={() => {
                  setBtnAHover(true);
                  if (underlineRef.current) underlineRef.current.style.width = "100%";
                }}
                onMouseLeave={() => {
                  setBtnAHover(false);
                  if (underlineRef.current) underlineRef.current.style.width = "0%";
                }}
              >
                Dohodnúť konzultáciu
                <div
                  ref={underlineRef}
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    height: "1px",
                    width: "0%",
                    background: "#B5945A",
                    transition: "width 500ms cubic-bezier(0.25,0.46,0.45,0.94)",
                  }}
                />
              </button>

              <button
                style={{
                  fontFamily: "var(--font-ui)",
                  fontSize: "10px",
                  color: "rgba(255,255,255,0.22)",
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  transition: "color 400ms ease",
                  whiteSpace: "nowrap",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: 0,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "rgba(255,255,255,0.55)";
                  const arrow = e.currentTarget.querySelector<HTMLSpanElement>("[data-arrow]");
                  if (arrow) {
                    arrow.style.transform = "translateX(6px)";
                    arrow.style.color = "#B5945A";
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "rgba(255,255,255,0.22)";
                  const arrow = e.currentTarget.querySelector<HTMLSpanElement>("[data-arrow]");
                  if (arrow) {
                    arrow.style.transform = "translateX(0)";
                    arrow.style.color = "inherit";
                  }
                }}
              >
                Naše služby
                <span
                  data-arrow=""
                  style={{ display: "inline-block", transition: "transform 400ms ease, color 400ms ease" }}
                >
                  →
                </span>
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: 0,
              paddingBottom: "8px",
              animation: "fadeUp 1s ease 0.9s both",
            }}
          >
            {/* Vertical label */}
            <span
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: "8px",
                color: "rgba(255,255,255,0.22)",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                writingMode: "vertical-rl",
                textOrientation: "mixed",
                transform: "rotate(180deg)",
                marginBottom: "24px",
              }}
            >
              mukera.sk — advokát
            </span>

            {/* Stats */}
            {STATS.map((stat, i) => (
              <div key={stat.end} style={{ marginBottom: i < STATS.length - 1 ? "20px" : 0 }}>
                {i > 0 && (
                  <div
                    style={{
                      width: 44,
                      height: 1,
                      background: "rgba(181,148,90,0.25)",
                      marginBottom: "20px",
                      marginLeft: "auto",
                    }}
                  />
                )}
                <StatRow stat={stat} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div
        style={{
          position: "absolute",
          bottom: 24,
          left: 48,
          right: 48,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 32, height: 1, background: "rgba(181,148,90,0.35)" }} />
          <span
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: "8px",
              color: "rgba(255,255,255,0.35)",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
            }}
          >
            Scroll
          </span>
        </div>

        <span
          style={{
            fontFamily: "var(--font-ui)",
            fontSize: "8px",
            color: "rgba(255,255,255,0.28)",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
          }}
        >
          Banská Bystrica, Slovenská republika
        </span>
      </div>
    </section>
  );
};
