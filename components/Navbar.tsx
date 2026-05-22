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
  const [open, setOpen]         = useState(false);
  const ctaLineRef              = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      {/* ────────────────────────────────────────────────
          Fixed header bar
      ──────────────────────────────────────────────── */}
      <header
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0,
          zIndex: 50,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 clamp(1.25rem, 5vw, 3rem)",
          height: "64px",
          backgroundColor: scrolled ? "rgba(8,15,30,0.94)" : "transparent",
          backdropFilter: scrolled ? "blur(14px)" : "none",
          borderBottom: scrolled ? "0.5px solid rgba(181,148,90,0.1)" : "0.5px solid transparent",
          transition: "background 500ms ease, border-color 500ms ease, backdrop-filter 500ms ease",
          animation: "navSlideIn 0.7s cubic-bezier(0.25,0.46,0.45,0.94) both",
        }}
      >
        {/* Logo / identity */}
        <a
          href="#"
          style={{ display: "flex", alignItems: "center", gap: "12px", textDecoration: "none", zIndex: 60 }}
        >
          <div
            style={{
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
            }}
          >
            PM
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            <span style={{ fontFamily: "var(--font-ui)", fontSize: "10px", color: "rgba(255,255,255,0.85)", letterSpacing: "0.14em", textTransform: "uppercase", whiteSpace: "nowrap" }}>
              JUDr. Peter Múkera
            </span>
            <span style={{ fontFamily: "var(--font-ui)", fontSize: "7px", color: "rgba(181,148,90,0.6)", letterSpacing: "0.25em", textTransform: "uppercase" }}>
              Advokátska kancelária
            </span>
          </div>
        </a>

        {/* Desktop nav (centre) */}
        <nav
          className="hidden md:flex"
          style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", alignItems: "center", gap: "28px" }}
          aria-label="Hlavná navigácia"
        >
          {NAV_LINKS.map((link, i) => (
            <span key={link.href} style={{ display: "flex", alignItems: "center", gap: "28px" }}>
              <a
                href={link.href}
                style={{ fontFamily: "var(--font-ui)", fontSize: "9px", color: "rgba(255,255,255,0.38)", letterSpacing: "0.2em", textTransform: "uppercase", textDecoration: "none", transition: "color 300ms", whiteSpace: "nowrap" }}
                onMouseEnter={e => { e.currentTarget.style.color = "rgba(255,255,255,0.85)"; }}
                onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.38)"; }}
              >
                {link.label}
              </a>
              {i < NAV_LINKS.length - 1 && (
                <div aria-hidden style={{ width: "3px", height: "3px", borderRadius: "50%", background: "rgba(181,148,90,0.2)", flexShrink: 0 }} />
              )}
            </span>
          ))}
        </nav>

        {/* Right side: desktop CTA + hamburger */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <button
            className="hidden md:block"
            style={{ fontFamily: "var(--font-ui)", fontSize: "9px", color: "#B5945A", letterSpacing: "0.25em", textTransform: "uppercase", padding: "0 0 8px", border: "none", background: "none", cursor: "pointer", position: "relative", whiteSpace: "nowrap" }}
            onMouseEnter={() => { if (ctaLineRef.current) ctaLineRef.current.style.width = "100%"; }}
            onMouseLeave={() => { if (ctaLineRef.current) ctaLineRef.current.style.width = "0%"; }}
          >
            Konzultácia
            <div ref={ctaLineRef} style={{ position: "absolute", bottom: 0, left: 0, height: "1px", width: "0%", background: "#B5945A", transition: "width 500ms cubic-bezier(0.25,0.46,0.45,0.94)" }} />
          </button>

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setOpen(v => !v)}
            aria-label={open ? "Zavrieť menu" : "Otvoriť menu"}
            aria-expanded={open}
            className={`md:hidden${open ? " is-open" : ""}`}
            style={{ position: "relative", zIndex: 60, background: "none", border: "none", cursor: "pointer", padding: "6px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-end", gap: "5px", width: "40px", height: "40px" }}
          >
            <span className="bar bar-top" />
            <span className="bar bar-mid" style={{ width: "18px" }} />
            <span className="bar bar-bot" />
          </button>
        </div>
      </header>

      {/* ────────────────────────────────────────────────
          Full-screen clip-path menu
      ──────────────────────────────────────────────── */}
      <div
        className={`menu-overlay md:hidden${open ? " menu-open" : ""}`}
        role="dialog"
        aria-modal="true"
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
        {/* PM Watermark */}
        <div
          aria-hidden
          className="pointer-events-none select-none absolute bottom-0 right-0 leading-none text-white text-[15rem] opacity-[0.03]"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          PM
        </div>

        {/* Nav links */}
        <nav className="flex flex-col space-y-6 relative z-10 w-full px-8 pt-32">
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={close}
              className="group flex items-center cursor-pointer"
            >
              <span
                className="text-xs tracking-widest text-[#BF953F] opacity-50 mr-6 group-hover:opacity-100 transition-opacity"
                style={{ fontFamily: "var(--font-ui)" }}
              >
                0{i + 1}
              </span>
              <span
                className="text-5xl text-slate-500 transition-all duration-[400ms] ease-out group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#BF953F] group-hover:to-[#FCF6BA] group-hover:translate-x-4 inline-block"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {link.label}
              </span>
            </a>
          ))}
        </nav>

        {/* Footer */}
        <div className="mt-auto w-full pb-8 px-8 relative z-10">
          <div className="border-t border-slate-800 pt-6">
            <div className="flex justify-between items-end w-full">
              <div className="flex flex-col gap-0.5">
                <span
                  className="text-[10px] tracking-widest uppercase text-slate-500"
                  style={{ fontFamily: "var(--font-ui)" }}
                >
                  KANCELÁRIA
                </span>
                <span
                  className="text-[10px] tracking-widest uppercase text-slate-500"
                  style={{ fontFamily: "var(--font-ui)" }}
                >
                  Banská Bystrica, SR
                </span>
              </div>
              <a
                href="mailto:kancelaria@mukera.sk"
                className="text-[10px] tracking-widest uppercase text-[#BF953F]"
                style={{ fontFamily: "var(--font-ui)" }}
              >
                KANCELARIA@MUKERA.SK
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
