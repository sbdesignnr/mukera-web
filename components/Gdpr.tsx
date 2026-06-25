"use client";

import Link from "next/link";
import { useI18n, LanguageSwitcher } from "./i18n";
import { Footer } from "./Footer";
import { GDPR_CONTENT } from "./gdprContent";

export const Gdpr = () => {
  const { locale } = useI18n();
  const doc = GDPR_CONTENT[locale];

  return (
    <>
      {/* Jednoduchá hlavička — logo + prepínač jazykov */}
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
          padding: "0 clamp(1.25rem, 5vw, 3rem)",
          height: "76px",
          background: "#080F1E",
          borderBottom: "0.5px solid rgba(181,148,90,0.12)",
        }}
      >
        <Link href="/" aria-label="JUDr. Peter Múkera — Advokátska kancelária" style={{ display: "flex", alignItems: "center" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo_peter_mukera_nove.png"
            alt="JUDr. Peter Múkera — Advokátska kancelária"
            width={640}
            height={136}
            decoding="async"
            style={{ height: "46px", width: "auto", display: "block" }}
          />
        </Link>
        <LanguageSwitcher />
      </header>

      {/* Obsah */}
      <main style={{ background: "#F8F7F4", padding: "clamp(3rem, 7vw, 6rem) clamp(1.5rem, 6vw, 6rem)" }}>
        <article style={{ maxWidth: "780px", margin: "0 auto" }}>
          <div style={{ width: 44, height: 1, background: "rgba(181,148,90,0.6)", marginBottom: "1.75rem" }} />

          <h1
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 300,
              fontSize: "clamp(2rem, 4vw, 3rem)",
              color: "#1B2A4A",
              lineHeight: 1.15,
              marginBottom: "0.75rem",
            }}
          >
            {doc.title}
          </h1>

          <p
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: "12px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "rgba(181,148,90,0.9)",
              marginBottom: "2rem",
            }}
          >
            {doc.updated}
          </p>

          <p
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: "16px",
              color: "rgba(27,42,74,0.7)",
              lineHeight: 1.9,
              marginBottom: "2.5rem",
            }}
          >
            {doc.intro}
          </p>

          {doc.sections.map((s, i) => (
            <section key={i} style={{ marginBottom: "2.5rem" }}>
              <h2
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 400,
                  fontSize: "clamp(1.3rem, 2.5vw, 1.7rem)",
                  color: "#1B2A4A",
                  lineHeight: 1.25,
                  marginBottom: "1rem",
                }}
              >
                {`${i + 1}. ${s.heading}`}
              </h2>

              {s.paragraphs?.map((p, j) => (
                <p
                  key={j}
                  style={{
                    fontFamily: "var(--font-ui)",
                    fontSize: "16px",
                    color: "rgba(27,42,74,0.7)",
                    lineHeight: 1.9,
                    marginBottom: "0.85rem",
                  }}
                >
                  {p}
                </p>
              ))}

              {s.items && (
                <ul style={{ listStyle: "none", padding: 0, margin: "0.25rem 0 0.85rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  {s.items.map((it, j) => (
                    <li
                      key={j}
                      style={{
                        position: "relative",
                        paddingLeft: "1.25rem",
                        fontFamily: "var(--font-ui)",
                        fontSize: "16px",
                        color: "rgba(27,42,74,0.7)",
                        lineHeight: 1.8,
                      }}
                    >
                      <span aria-hidden="true" style={{ position: "absolute", left: 0, color: "#B5945A" }}>
                        —
                      </span>
                      {it}
                    </li>
                  ))}
                </ul>
              )}

              {s.note && (
                <p
                  style={{
                    fontFamily: "var(--font-ui)",
                    fontSize: "14px",
                    fontStyle: "italic",
                    color: "rgba(27,42,74,0.5)",
                    lineHeight: 1.8,
                  }}
                >
                  {s.note}
                </p>
              )}
            </section>
          ))}

          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              fontFamily: "var(--font-ui)",
              fontSize: "11px",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#1B2A4A",
              textDecoration: "none",
              borderBottom: "1px solid rgba(181,148,90,0.5)",
              paddingBottom: "6px",
            }}
          >
            ← {doc.backHome}
          </Link>
        </article>
      </main>

      <Footer />
    </>
  );
};
