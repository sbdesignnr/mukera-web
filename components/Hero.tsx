"use client";

import React from "react";

const STATS = [
  { num: "15+", label: "Rokov skúseností" },
  { num: "500+", label: "Vyriešených prípadov" },
  { num: "6", label: "Právnych oblastí" },
];

export const Hero = () => {
  return (
    <section className="relative h-screen overflow-hidden">

      {/* 1 — Photo background */}
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/hero-bg.webp"
          alt=""
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* 2 — Directional gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(110deg, rgba(4,9,20,0.97) 0%, rgba(4,9,20,0.95) 35%, rgba(4,9,20,0.82) 60%, rgba(4,9,20,0.55) 100%)",
        }}
      />

      {/* 3 — Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.5) 100%)",
        }}
      />

      {/* 4 — Left vertical accent line */}
      <div
        className="absolute left-[8%] top-1/2 -translate-y-1/2 w-px hidden lg:block"
        style={{
          height: "140px",
          background:
            "linear-gradient(to bottom, transparent, rgba(181,148,90,0.5), transparent)",
          transformOrigin: "top",
          animation: "lineGrow 0.7s ease-out 0.6s both",
          willChange: "transform",
        }}
      />

      {/* Content — 2-column grid */}
      <div
        className="absolute inset-0"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          alignItems: "center",
          paddingLeft: "clamp(3rem, 10vw, 12rem)",
          paddingRight: "clamp(3rem, 8vw, 10rem)",
          paddingTop: "80px",
        }}
      >
        {/* LEFT COLUMN */}
        <div>

          {/* Badge */}
          <div className="fade-in flex items-center gap-3" style={{ animationDelay: "0s", willChange: "opacity, transform" }}>
            <div className="h-px w-7 bg-[#B5945A] flex-shrink-0" />
            <span
              className="text-[10px] tracking-[0.28em] uppercase font-medium"
              style={{ color: "#B5945A", fontFamily: "var(--font-body)" }}
            >
              Advokátska kancelária
            </span>
          </div>

          {/* H1 */}
          <h1
            className="fade-in"
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(3.2rem, 5.5vw, 5.5rem)",
              fontWeight: 300,
              lineHeight: 1.05,
              color: "white",
              marginTop: "1.25rem",
              animationDelay: "0.2s",
              willChange: "opacity, transform",
            }}
          >
            Vaše práva.
            <br />
            Naša{" "}
            <em style={{ fontStyle: "italic", color: "#C9A96E" }}>priorita.</em>
          </h1>

          {/* Divider */}
          <div
            className="fade-in w-12 h-px bg-[#B5945A]/40 mt-6"
            style={{ animationDelay: "0.4s", willChange: "opacity, transform" }}
          />

          {/* Paragraph */}
          <p
            className="fade-in"
            style={{
              marginTop: "1.25rem",
              color: "rgba(255,255,255,0.38)",
              fontSize: "14px",
              lineHeight: 1.9,
              fontFamily: "var(--font-body)",
              fontWeight: 300,
              maxWidth: "360px",
              animationDelay: "0.5s",
              willChange: "opacity, transform",
            }}
          >
            Komplexné právne služby s&nbsp;osobným prístupom
            a&nbsp;odbornosťou, ktorej môžete dôverovať.
          </p>

          {/* CTAs */}
          <div
            className="fade-in flex items-center gap-10 mt-10"
            style={{ animationDelay: "0.65s", willChange: "opacity, transform" }}
          >
            <button
              style={{
                border: "1px solid rgba(181,148,90,0.5)",
                color: "white",
                fontSize: "11px",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                padding: "14px 32px",
                fontWeight: 300,
                fontFamily: "var(--font-body)",
                whiteSpace: "nowrap",
                background: "rgba(181,148,90,0)",
                cursor: "pointer",
                transition:
                  "border-color 400ms cubic-bezier(0.25,0.46,0.45,0.94), background 400ms cubic-bezier(0.25,0.46,0.45,0.94), color 400ms cubic-bezier(0.25,0.46,0.45,0.94)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#B5945A";
                e.currentTarget.style.background = "rgba(181,148,90,0.08)";
                e.currentTarget.style.color = "#B5945A";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(181,148,90,0.5)";
                e.currentTarget.style.background = "rgba(181,148,90,0)";
                e.currentTarget.style.color = "white";
              }}
            >
              Dohodnúť konzultáciu
            </button>

            <button
              style={{
                background: "none",
                border: "none",
                color: "rgba(255,255,255,0.30)",
                fontSize: "11px",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                fontWeight: 300,
                fontFamily: "var(--font-body)",
                cursor: "pointer",
                transition: "color 300ms",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: 0,
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "rgba(255,255,255,0.65)";
                const arrow = e.currentTarget.querySelector<HTMLSpanElement>("[data-arrow]");
                if (arrow) arrow.style.transform = "translateX(5px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "rgba(255,255,255,0.30)";
                const arrow = e.currentTarget.querySelector<HTMLSpanElement>("[data-arrow]");
                if (arrow) arrow.style.transform = "translateX(0)";
              }}
            >
              Naše služby
              <span
                data-arrow=""
                style={{ display: "inline-block", transition: "transform 300ms" }}
              >
                →
              </span>
            </button>
          </div>

          {/* Stats */}
          <div
            className="fade-in flex items-center gap-8 mt-14"
            style={{ animationDelay: "0.8s", willChange: "opacity, transform" }}
          >
            {STATS.map((stat, i) => (
              <React.Fragment key={i}>
                {i > 0 && <div className="w-px h-8 bg-white/10 flex-shrink-0" />}
                <div>
                  <div
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "2rem",
                      color: "rgba(255,255,255,0.75)",
                      fontWeight: 300,
                      lineHeight: 1,
                    }}
                  >
                    {stat.num}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "9px",
                      color: "rgba(255,255,255,0.25)",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      marginTop: "6px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN — decorative quote */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "2rem",
            animation: "fadeInRight 0.7s ease 0.6s both",
            willChange: "opacity, transform",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(1rem, 1.5vw, 1.3rem)",
              fontWeight: 300,
              fontStyle: "italic",
              color: "rgba(255,255,255,0.18)",
              lineHeight: 1.8,
              textAlign: "center",
              maxWidth: "320px",
              borderLeft: "1px solid rgba(181,148,90,0.25)",
              paddingLeft: "2rem",
            }}
          >
            „Spravodlivosť nie je len cieľ —<br />
            je to záväzok, ktorý si vyžaduje<br />
            odbornosť, skúsenosť a odvahu."
          </div>

          <div
            style={{
              width: "1px",
              height: "60px",
              background: "linear-gradient(to bottom, rgba(181,148,90,0.3), transparent)",
              marginTop: "1rem",
            }}
          />
        </div>
      </div>

      {/* Scroll indicator — static */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span
          style={{
            fontSize: "9px",
            letterSpacing: "0.25em",
            color: "rgba(255,255,255,0.18)",
            textTransform: "uppercase",
            fontFamily: "var(--font-body)",
          }}
        >
          Scroll
        </span>
        <div
          className="w-px"
          style={{
            height: "48px",
            background: "linear-gradient(to bottom, rgba(181,148,90,0.4), transparent)",
          }}
        />
      </div>
    </section>
  );
};
