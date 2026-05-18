"use client";

import { useEffect, useState } from "react";

const NAV_LINKS = [
  { label: "Domov", href: "#" },
  { label: "O nás", href: "#o-nas" },
  { label: "Služby", href: "#sluzby" },
  { label: "Referencie", href: "#referencie" },
  { label: "Kontakt", href: "#kontakt" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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
      <nav
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          animation: "navSlideIn 0.7s cubic-bezier(0.25,0.46,0.45,0.94) both",
          backgroundColor: scrolled ? "rgba(6,14,30,0.90)" : "rgba(0,0,0,0)",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled
            ? "1px solid rgba(181,148,90,0.15)"
            : "1px solid transparent",
          transition:
            "background-color 500ms ease, backdrop-filter 500ms ease, border-color 500ms ease",
          willChange: "background-color, backdrop-filter",
        }}
      >
        <div className="mx-auto max-w-7xl px-8 lg:px-16">
          <div className="grid grid-cols-3 items-center h-20">

            {/* Logo */}
            <a href="#" aria-label="Domov – JUDr. Peter Múkera" className="flex-shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo-dark.png"
                alt="JUDr. Peter Múkera"
                style={{ height: "48px", width: "auto", display: "block" }}
              />
            </a>

            {/* Center nav — desktop */}
            <nav
              className="hidden md:flex flex-nowrap items-center justify-center gap-6"
              aria-label="Hlavná navigácia"
            >
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="whitespace-nowrap text-[11px] tracking-[0.2em] uppercase font-light text-white/50 hover:text-white/90 transition-colors duration-300"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Right — CTA + hamburger */}
            <div className="flex items-center justify-end gap-6">
              {/* Konzultácia */}
              <div className="hidden md:block relative group cursor-pointer">
                <a
                  href="#kontakt"
                  className="text-[11px] tracking-[0.2em] uppercase"
                  style={{ color: "#B5945A", fontFamily: "var(--font-body)" }}
                >
                  Konzultácia
                </a>
                <div
                  className="absolute bottom-0 left-0 h-px bg-[#B5945A] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                  style={{ width: "100%" }}
                />
              </div>

              {/* Mobile hamburger */}
              <button
                className="md:hidden flex flex-col gap-[5px] p-1 cursor-pointer"
                onClick={() => setMenuOpen((v) => !v)}
                aria-label={menuOpen ? "Zavrieť menu" : "Otvoriť menu"}
                aria-expanded={menuOpen}
              >
                <span
                  className="block h-px w-5 bg-white/70 rounded-full"
                  style={{
                    transition: "transform 0.22s, opacity 0.22s",
                    transform: menuOpen ? "rotate(45deg) translateY(6px)" : "none",
                  }}
                />
                <span
                  className="block h-px w-5 bg-white/70 rounded-full"
                  style={{
                    transition: "opacity 0.22s",
                    opacity: menuOpen ? 0 : 1,
                  }}
                />
                <span
                  className="block h-px w-5 bg-white/70 rounded-full"
                  style={{
                    transition: "transform 0.22s, opacity 0.22s",
                    transform: menuOpen ? "rotate(-45deg) translateY(-6px)" : "none",
                  }}
                />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Full-screen mobile menu */}
      <div
        className="fixed inset-0 z-40 flex flex-col md:hidden"
        style={{
          backgroundColor: "rgba(4,9,20,0.98)",
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "auto" : "none",
          transition: "opacity 0.3s ease",
        }}
        aria-hidden={!menuOpen}
      >
        <nav
          className="flex flex-col items-center justify-center flex-1 gap-8"
          aria-label="Mobilná navigácia"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-[13px] tracking-[0.25em] uppercase text-white/60 hover:text-white transition-colors duration-300"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#kontakt"
            onClick={() => setMenuOpen(false)}
            className="text-[13px] tracking-[0.25em] uppercase mt-4"
            style={{ color: "#B5945A", fontFamily: "var(--font-body)" }}
          >
            Konzultácia
          </a>
        </nav>
      </div>
    </>
  );
};
