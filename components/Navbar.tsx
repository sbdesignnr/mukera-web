"use client";

import { useEffect, useRef, useState } from "react";

const NAV_LINKS = [
  { label: "Domov",      href: "#" },
  { label: "O nás",      href: "#o-nas" },
  { label: "Služby",     href: "#sluzby" },
  { label: "Referencie", href: "#referencie" },
  { label: "Kontakt",    href: "#kontakt" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navUnderlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      {/* ── Main bar ── */}
      <header
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0,
          zIndex: 50,
          borderBottom: "0.5px solid rgba(181,148,90,0.15)",
          backgroundColor: scrolled ? "rgba(8,15,30,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          transition: "background 500ms ease, backdrop-filter 500ms ease",
          animation: "navSlideIn 0.7s cubic-bezier(0.25,0.46,0.45,0.94) both",
          willChange: "background-color, backdrop-filter",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto 1fr",
            alignItems: "center",
            padding: "20px 48px",
          }}
        >
          {/* LEFT — identity */}
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            {/* Monogram box */}
            <div
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "22px",
                fontWeight: 300,
                color: "#B5945A",
                border: "0.5px solid rgba(181,148,90,0.4)",
                width: "42px",
                height: "42px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                letterSpacing: "-0.01em",
                flexShrink: 0,
              }}
            >
              PM
            </div>

            {/* Text stack */}
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <span
                style={{
                  fontFamily: "var(--font-ui)",
                  fontSize: "11px",
                  color: "rgba(255,255,255,0.85)",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                }}
              >
                JUDr. Peter Múkera
              </span>
              <span
                style={{
                  fontFamily: "var(--font-ui)",
                  fontSize: "8px",
                  color: "rgba(181,148,90,0.65)",
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                }}
              >
                Advokátska kancelária
              </span>
            </div>
          </div>

          {/* CENTER — nav links (desktop) */}
          <nav
            className="hidden md:flex"
            style={{ alignItems: "center", gap: 32 }}
            aria-label="Hlavná navigácia"
          >
            {NAV_LINKS.map((link, i) => (
              <span key={link.href} style={{ display: "flex", alignItems: "center", gap: 32 }}>
                <a
                  href={link.href}
                  style={{
                    fontFamily: "var(--font-ui)",
                    fontSize: "10px",
                    color: "rgba(255,255,255,0.4)",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    textDecoration: "none",
                    transition: "color 300ms",
                    whiteSpace: "nowrap",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.85)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.4)"; }}
                >
                  {link.label}
                </a>
                {i < NAV_LINKS.length - 1 && (
                  <div
                    aria-hidden
                    style={{
                      width: 3, height: 3,
                      borderRadius: "50%",
                      background: "rgba(181,148,90,0.25)",
                      flexShrink: 0,
                    }}
                  />
                )}
              </span>
            ))}
          </nav>

          {/* RIGHT — CTA + hamburger */}
          <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 20 }}>
            <button
              className="hidden md:block"
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: "9px",
                color: "#B5945A",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                padding: "0 0 8px 0",
                border: "none",
                background: "none",
                cursor: "pointer",
                position: "relative",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={() => {
                if (navUnderlineRef.current) navUnderlineRef.current.style.width = "100%";
              }}
              onMouseLeave={() => {
                if (navUnderlineRef.current) navUnderlineRef.current.style.width = "0%";
              }}
            >
              Konzultácia
              <div
                ref={navUnderlineRef}
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

            {/* Hamburger */}
            <button
              className="md:hidden"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Zavrieť menu" : "Otvoriť menu"}
              aria-expanded={menuOpen}
              style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}
            >
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  style={{
                    display: "block",
                    width: 20,
                    height: 1,
                    backgroundColor: "rgba(255,255,255,0.7)",
                    marginBottom: i < 2 ? 5 : 0,
                    borderRadius: 2,
                    transition: "transform 0.22s, opacity 0.22s",
                    transform:
                      menuOpen
                        ? i === 0 ? "rotate(45deg) translateY(6px)"
                        : i === 2 ? "rotate(-45deg) translateY(-6px)"
                        : "none"
                        : "none",
                    opacity: menuOpen && i === 1 ? 0 : 1,
                  }}
                />
              ))}
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile full-screen menu ── */}
      <div
        className="md:hidden"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 40,
          backgroundColor: "rgba(8,15,30,0.97)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 32,
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "auto" : "none",
          transition: "opacity 0.3s ease",
        }}
        aria-hidden={!menuOpen}
      >
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={() => setMenuOpen(false)}
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: "13px",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.55)",
              textDecoration: "none",
              transition: "color 300ms",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.9)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.55)"; }}
          >
            {link.label}
          </a>
        ))}
        <a
          href="#kontakt"
          onClick={() => setMenuOpen(false)}
          style={{
            fontFamily: "var(--font-ui)",
            fontSize: "13px",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "#B5945A",
            textDecoration: "none",
            marginTop: 8,
          }}
        >
          Konzultácia
        </a>
      </div>
    </>
  );
};
