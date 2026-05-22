"use client";

import { useEffect, useRef } from "react";

export const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Trigger immediately if already in view on mount
    if (sectionRef.current) {
      const rect = sectionRef.current.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        sectionRef.current.querySelectorAll<HTMLElement>(".reveal").forEach((el, i) => {
          setTimeout(() => el.classList.add("revealed"), i * 120);
        });
      }
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll<HTMLElement>(".reveal").forEach((el, i) => {
              setTimeout(() => el.classList.add("revealed"), i * 120);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="o-nas"
      style={{
        background: "#F8F7F4",
        borderTop: "0.5px solid rgba(181,148,90,0.2)",
        position: "relative",
        overflow: "hidden",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* Background watermark */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          right: "-2rem",
          bottom: "-4rem",
          fontFamily: "var(--font-heading)",
          fontSize: "22vw",
          fontWeight: 300,
          color: "rgba(27,42,74,0.04)",
          lineHeight: 1,
          pointerEvents: "none",
          userSelect: "none",
          whiteSpace: "nowrap",
        }}
      >
        LEX
      </div>

      {/* Gold vertical accent */}
      <div
        style={{
          position: "absolute",
          left: 32,
          top: "50%",
          transform: "translateY(-50%)",
          width: 1,
          height: 140,
          background:
            "linear-gradient(to bottom, transparent, rgba(181,148,90,0.3), transparent)",
        }}
      />

      <div className="flex flex-col lg:flex-row w-full min-h-screen">
        {/* LEFT — Justitia image */}
        <div className="relative overflow-hidden w-full h-[65vh] min-h-[400px] lg:h-auto lg:min-h-screen lg:w-1/2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/justitia.webp"
            alt="Justitia"
            className="object-cover object-top lg:object-right"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              filter: "grayscale(20%) contrast(1.1)",
            }}
          />
          {/* Mobile gradient overlay */}
          <div
            className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#FAFAFA] lg:bg-gradient-to-r lg:from-transparent lg:via-[#FAFAFA]/50 lg:to-[#FAFAFA]"
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to top, rgba(248,247,244,0.95) 0%, transparent 50%)",
            }}
          />

          {/* Bottom left caption */}
          <div className="hidden lg:flex" style={{ position: "absolute", bottom: "2.5rem", left: "2.5rem" }}>
            <div
              className="reveal"
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: "9px",
                color: "rgba(181,148,90,0.8)",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                marginBottom: "8px",
              }}
            >
              Justitia — Symbol spravodlivosti
            </div>
            <div style={{ width: "40px", height: "1px", background: "rgba(181,148,90,0.4)" }} />
          </div>
        </div>

        {/* RIGHT — Content */}
        <div
          className="w-full lg:w-1/2 flex flex-col justify-center px-8 md:px-16 lg:px-20 py-12 lg:py-24 pt-20 lg:pt-0 mt-12 lg:mt-0"
          style={{ borderLeft: "0.5px solid rgba(27,42,74,0.08)" }}
        >
          {/* Badge */}
          <div
            className="reveal"
            style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "2rem" }}
          >
            <div style={{ width: 28, height: 1, background: "#B5945A", flexShrink: 0 }} />
            <span
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: "9px",
                color: "#B5945A",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
              }}
            >
              O kancelárií
            </span>
          </div>

          {/* H2 */}
          <h2
            className="reveal text-4xl lg:text-5xl leading-tight"
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 300,
              color: "#1B2A4A",
              marginBottom: "1.5rem",
            }}
          >
            Právna ochrana,<br className="block md:hidden" />
            ktorej môžete
            <br />
            <em style={{ fontStyle: "italic", color: "#B5945A" }}>dôverovať.</em>
          </h2>

          {/* Divider */}
          <div
            className="reveal"
            style={{
              width: 44,
              height: 1,
              background: "rgba(181,148,90,0.5)",
              marginBottom: "1.75rem",
            }}
          />

          {/* Paragraphs */}
          <p
            className="reveal"
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: "13px",
              color: "rgba(27,42,74,0.55)",
              lineHeight: 1.95,
              marginBottom: "1rem",
            }}
          >
            Advokátska kancelária JUDr. Peter Múkera poskytuje komplexné právne
            služby fyzickým osobám aj obchodným spoločnostiam s dôrazom na
            osobný prístup a odbornosť overenú praxou.
          </p>

          <p
            className="reveal"
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: "13px",
              color: "rgba(27,42,74,0.55)",
              lineHeight: 1.95,
              marginBottom: "2.5rem",
            }}
          >
            Každý klient je pre nás jedinečný. Vždy hľadáme riešenie šité na
            mieru — efektívne, diskrétne a v súlade s Vašimi záujmami.
          </p>

          {/* Three values */}
          <div
            className="reveal flex flex-col mb-10"
            style={{ borderTop: "0.5px solid rgba(27,42,74,0.08)" }}
          >
            {[
              {
                num: "01",
                title: "Osobný prístup",
                desc: "Každý prípad riešime individuálne, s plným nasadením.",
              },
              {
                num: "02",
                title: "Odbornosť & prax",
                desc: "Viac ako 15 rokov skúseností v oblasti slovenského práva.",
              },
              {
                num: "03",
                title: "Komplexné riešenia",
                desc: "Od poradenstva až po zastupovanie — pod jednou strechou.",
              },
            ].map((item) => (
              <div
                key={item.num}
                className="flex items-start gap-5 py-6 md:py-5"
                style={{ borderBottom: "0.5px solid rgba(27,42,74,0.08)" }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "1.1rem",
                    color: "rgba(181,148,90,0.4)",
                    fontWeight: 300,
                    lineHeight: 1,
                    minWidth: "28px",
                    paddingTop: "2px",
                  }}
                >
                  {item.num}
                </span>
                <div>
                  <div
                    style={{
                      fontFamily: "var(--font-ui)",
                      fontSize: "10px",
                      color: "#1B2A4A",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      marginBottom: "5px",
                    }}
                  >
                    {item.title}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-ui)",
                      fontSize: "12px",
                      color: "rgba(27,42,74,0.4)",
                      lineHeight: 1.6,
                    }}
                  >
                    {item.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Stats row */}
          <div
            className="reveal"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              borderTop: "0.5px solid rgba(27,42,74,0.08)",
            }}
          >
            {[
              { num: "15+", label: "Rokov praxe" },
              { num: "500+", label: "Klientov" },
              { num: "6", label: "Oblastí práva" },
            ].map((stat, i) => (
              <div
                key={stat.label}
                style={{
                  padding: "20px 0",
                  textAlign: "center",
                  borderRight: i < 2 ? "0.5px solid rgba(27,42,74,0.08)" : "none",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "2rem",
                    color: "#1B2A4A",
                    fontWeight: 300,
                    lineHeight: 1,
                  }}
                >
                  {stat.num}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-ui)",
                    fontSize: "8px",
                    color: "rgba(181,148,90,0.7)",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    marginTop: "6px",
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
