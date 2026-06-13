"use client";

const FOOTER_LINKS = [
  { label: "Ochrana osobných údajov", href: "/gdpr" },
  { label: "Webdesign by SB Design", href: "https://sbdesign.sk" },
];

export const Footer = () => (
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
        justifyContent: "space-between",
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
        © 2026 JUDr. Peter Múkera. Všetky práva vyhradené.
      </p>

      {/* Right links */}
      <div className="footer-links" style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
        {FOOTER_LINKS.map((link) => (
          <a
            key={link.label}
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
            {link.label}
          </a>
        ))}
      </div>
    </div>
  </footer>
);
