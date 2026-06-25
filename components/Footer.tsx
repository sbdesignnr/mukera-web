"use client";

import { useI18n } from "./i18n";

const FOOTER_LINKS = [
  { key: "gdpr", href: "/gdpr/" },
  { key: "webdesign", href: "https://sbdesign.sk" },
] as const;

export const Footer = () => {
  const { t } = useI18n();
  return (
  <footer
    style={{
      background: "#050B14",
      borderTop: "0.5px solid rgba(255,255,255,0.05)",
      padding: "clamp(1.5rem, 3vw, 2rem) clamp(1.5rem, 6vw, 6rem)",
    }}
  >
    <div
      className="footer-inner"
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      {/* Copyright */}
      <p
        style={{
          fontFamily: "var(--font-ui)",
          fontSize: "11px",
          color: "rgba(255,255,255,0.2)",
          letterSpacing: "0.05em",
        }}
      >
        © 2026 JUDr. Peter Múkera. {t.footer.rights}
      </p>

      {/* Right links */}
      <div className="footer-links" style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
        {FOOTER_LINKS.map((link) => (
          <a
            key={link.key}
            href={link.href}
            target={link.href.startsWith("http") ? "_blank" : undefined}
            rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: "10px",
              color: "rgba(255,255,255,0.2)",
              textDecoration: "none",
              letterSpacing: "0.08em",
              transition: "color 250ms ease",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(181,148,90,0.7)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.2)"; }}
          >
            {t.footer[link.key]}
          </a>
        ))}
      </div>
    </div>
  </footer>
  );
};
