"use client";
import { useEffect, useRef, useState } from "react";

const NAV_LINKS = [
  { label: "O nás",      href: "#o-nas" },
  { label: "Právne služby", href: "#sluzby" },
  { label: "Kontakt",    href: "#kontakt" },
  { label: "Referencie", href: "#referencie" },
];

export const Navbar = () => {
  const [scrolled, setScrolled]   = useState(false);
  const [open, setOpen]           = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const ctaLineRef                = useRef<HTMLDivElement>(null);

  // Scroll listener
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Responsive breakpoint
  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Lock scroll when menu open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Escape key closes menu
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open]);

  const close = () => setOpen(false);

  const headerStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 50,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 clamp(1.25rem, 5vw, 3rem)",
    height: "64px",
    backgroundColor: scrolled ? "rgba(8,15,30,0.94)" : "transparent",
    backdropFilter: scrolled ? "blur(14px)" : "none",
    borderBottom: scrolled
      ? "0.5px solid rgba(181,148,90,0.1)"
      : "0.5px solid transparent",
    transition:
      "background 500ms ease, border-color 500ms ease, backdrop-filter 500ms ease",
    animation: "navSlideIn 0.7s cubic-bezier(0.25,0.46,0.45,0.94) both",
  };

  const monogramStyle: React.CSSProperties = {
    fontFamily: "var(--font-heading)",
    fontSize: "19px",
    fontWeight: 300,
    color: "#B5945A",
    border: "0.5px solid rgba(181,148,90,0.4)",
    width: "38px",
    height: "38px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    letterSpacing: "-0.01em",
  };

  return (
    <>
      {/* ── Header ── */}
      <header style={headerStyle}>

        {/* Logo */}
        <a
          href="#"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            textDecoration: "none",
            zIndex: 60,
          }}
        >
          <div style={monogramStyle}>PM</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            <span
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: "17px",
                color: "rgba(255,255,255,0.95)",
                letterSpacing: "0.02em",
                whiteSpace: "nowrap",
              }}
            >
              JUDr. Peter Múkera
            </span>
            <span
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: "8px",
                color: "rgba(181,148,90,0.7)",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
              }}
            >
              Advokátska kancelária
            </span>
          </div>
        </a>

        {/* Desktop nav — len >= 768px */}
        {isDesktop && (
          <nav
            aria-label="Hlavná navigácia"
            style={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              alignItems: "center",
              gap: "28px",
            }}
          >
            {NAV_LINKS.map((link, i) => (
              <span
                key={link.href}
                style={{ display: "flex", alignItems: "center", gap: "28px" }}
              >
                <a
                  href={link.href}
                  style={{
                    fontFamily: "var(--font-ui)",
                    fontSize: "13px",
                    color: "rgba(255,255,255,0.95)",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    textDecoration: "none",
                    transition: "color 300ms",
                    whiteSpace: "nowrap",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#B5945A";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "rgba(255,255,255,0.95)";
                  }}
                >
                  {link.label}
                </a>
                {i < NAV_LINKS.length - 1 && (
                  <div
                    aria-hidden="true"
                    style={{
                      width: "3px",
                      height: "3px",
                      borderRadius: "50%",
                      background: "rgba(181,148,90,0.2)",
                      flexShrink: 0,
                    }}
                  />
                )}
              </span>
            ))}
          </nav>
        )}

        {/* Right side */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>

          {/* CTA button — len desktop */}
          {isDesktop && (
            <button
              type="button"
              onClick={() =>
                document.getElementById("kontakt")?.scrollIntoView({ behavior: "smooth" })
              }
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: "12px",
                color: "#B5945A",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                padding: "0 0 8px",
                border: "none",
                background: "none",
                cursor: "pointer",
                position: "relative",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={() => {
                if (ctaLineRef.current) ctaLineRef.current.style.width = "100%";
              }}
              onMouseLeave={() => {
                if (ctaLineRef.current) ctaLineRef.current.style.width = "0%";
              }}
            >
              Konzultácia
              <div
                ref={ctaLineRef}
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
          )}

          {/* Hamburger — len mobile/tablet */}
          {!isDesktop && (
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Zavrieť menu" : "Otvoriť menu"}
              aria-expanded={open}
              style={{
                position: "relative",
                zIndex: 60,
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "6px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "flex-end",
                gap: "5px",
                width: "40px",
                height: "40px",
              }}
            >
              <span className="bar bar-top" />
              <span
                className={open ? "bar bar-mid is-open" : "bar bar-mid"}
                style={{ width: "18px" }}
              />
              <span className="bar bar-bot" />
            </button>
          )}
        </div>
      </header>

      {/* ── Mobile fullscreen menu — len mobile/tablet ── */}
      {!isDesktop && (
        <div
          className={open ? "menu-overlay menu-open" : "menu-overlay"}
          role="dialog"
          aria-modal={true}
          aria-hidden={!open}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 45,
            background: "#050D1A",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
          }}
        >
          {/* PM watermark */}
          <div
            aria-hidden="true"
            style={{
              fontFamily: "var(--font-heading)",
              position: "absolute",
              bottom: 0,
              right: 0,
              fontSize: "15rem",
              lineHeight: 1,
              color: "white",
              opacity: 0.03,
              pointerEvents: "none",
              userSelect: "none",
            }}
          >
            PM
          </div>

          {/* Nav links */}
          <nav
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "24px",
              position: "relative",
              zIndex: 10,
              width: "100%",
              padding: "128px 32px 0",
            }}
          >
            {NAV_LINKS.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                onClick={close}
                style={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  textDecoration: "none",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-ui)",
                    fontSize: "10px",
                    letterSpacing: "0.25em",
                    color: "#BF953F",
                    opacity: 0.5,
                    marginRight: "24px",
                  }}
                >
                  0{i + 1}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "clamp(2.2rem, 8vw, 3.2rem)",
                    color: "rgba(255,255,255,0.95)",
                  }}
                >
                  {link.label}
                </span>
              </a>
            ))}
          </nav>

          {/* Footer */}
          <div
            style={{
              marginTop: "auto",
              width: "100%",
              padding: "0 32px 32px",
              position: "relative",
              zIndex: 10,
            }}
          >
            <div
              style={{
                borderTop: "1px solid #1e293b",
                paddingTop: "24px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                <span
                  style={{
                    fontFamily: "var(--font-ui)",
                    fontSize: "10px",
                    letterSpacing: "0.25em",
                    textTransform: "uppercase",
                    color: "#64748b",
                  }}
                >
                  KANCELÁRIA
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-ui)",
                    fontSize: "10px",
                    letterSpacing: "0.25em",
                    textTransform: "uppercase",
                    color: "#64748b",
                  }}
                >
                  Banská Bystrica, SR
                </span>
              </div>
              <a
                href="mailto:kancelaria@mukera.sk"
                style={{
                  fontFamily: "var(--font-ui)",
                  fontSize: "10px",
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  color: "#BF953F",
                  textDecoration: "none",
                }}
              >
                KANCELARIA@MUKERA.SK
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};