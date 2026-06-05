"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// ─── Validation schema ────────────────────────────────────────────────────────

const schema = z.object({
  name: z.string().min(2, "Zadajte meno (min. 2 znaky)"),
  email: z.string().email("Zadajte platnú e-mailovú adresu"),
  phone: z.string().optional(),
  message: z.string().min(10, "Správa musí mať aspoň 10 znakov"),
});

type FormData = z.infer<typeof schema>;

// ─── Icons ───────────────────────────────────────────────────────────────────

const IconPin = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const IconMail = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const IconPhone = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.28h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.92a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.28 16.92z" />
  </svg>
);

// ─── Field component ─────────────────────────────────────────────────────────

const Field = ({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) => (
  <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
    <label
      style={{
        fontFamily: "var(--font-ui)",
        fontSize: "8px",
        color: error ? "#e07070" : "rgba(181,148,90,0.7)",
        letterSpacing: "0.25em",
        textTransform: "uppercase",
        marginBottom: "8px",
      }}
    >
      {error ?? label}
    </label>
    {children}
  </div>
);

// ─── Input style helpers ─────────────────────────────────────────────────────

const inputStyle: React.CSSProperties = {
  background: "transparent",
  border: "none",
  borderBottom: "0.5px solid rgba(255,255,255,0.12)",
  padding: "10px 0",
  fontFamily: "var(--font-ui)",
  fontSize: "16px",
  color: "rgba(255,255,255,0.75)",
  outline: "none",
  width: "100%",
  transition: "border-color 300ms ease",
};

const focusStyle: React.CSSProperties = {
  borderBottom: "0.5px solid #B5945A",
};

// ─── Contact form ─────────────────────────────────────────────────────────────

type SubmitState = "idle" | "loading" | "success" | "error";

const ContactForm = () => {
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setSubmitState("loading");
    try {
      const res = await fetch("/api/contact.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setSubmitState("success");
        reset();
      } else {
        setSubmitState("error");
      }
    } catch {
      setSubmitState("error");
    }
  };

  const getFieldStyle = (name: string): React.CSSProperties => ({
    ...inputStyle,
    ...(focusedField === name ? focusStyle : {}),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
      {/* Name + Email row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1.5rem",
        }}
      >
        <Field label="Meno a priezvisko" error={errors.name?.message}>
          <input
            {...register("name")}
            placeholder="Ján Novák"
            style={getFieldStyle("name")}
            onFocus={() => setFocusedField("name")}
            onBlur={() => setFocusedField(null)}
          />
        </Field>
        <Field label="E-mailová adresa" error={errors.email?.message}>
          <input
            {...register("email")}
            type="email"
            placeholder="jan@novak.sk"
            style={getFieldStyle("email")}
            onFocus={() => setFocusedField("email")}
            onBlur={() => setFocusedField(null)}
          />
        </Field>
      </div>

      {/* Phone */}
      <Field label="Telefón (voliteľné)" error={errors.phone?.message}>
        <input
          {...register("phone")}
          type="tel"
          placeholder="+421 9XX XXX XXX"
          style={getFieldStyle("phone")}
          onFocus={() => setFocusedField("phone")}
          onBlur={() => setFocusedField(null)}
        />
      </Field>

      {/* Message */}
      <Field label="Správa" error={errors.message?.message}>
        <textarea
          {...register("message")}
          rows={5}
          placeholder="Popíšte stručne svoju situáciu..."
          style={{
            ...getFieldStyle("message"),
            resize: "none",
            lineHeight: 1.75,
          }}
          onFocus={() => setFocusedField("message")}
          onBlur={() => setFocusedField(null)}
        />
      </Field>

      {/* Submit */}
      <div>
        <button
          type="submit"
          disabled={submitState === "loading" || submitState === "success"}
          style={{
            fontFamily: "var(--font-ui)",
            fontSize: "9px",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "white",
            background:
              submitState === "success"
                ? "rgba(181,148,90,0.4)"
                : submitState === "loading"
                ? "rgba(181,148,90,0.6)"
                : "#B5945A",
            border: "none",
            padding: "16px 32px",
            cursor: submitState === "loading" || submitState === "success" ? "default" : "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            transition: "background 300ms ease",
          }}
          onMouseEnter={(e) => {
            if (submitState === "idle")
              (e.currentTarget as HTMLButtonElement).style.background = "#1B2A4A";
          }}
          onMouseLeave={(e) => {
            if (submitState === "idle")
              (e.currentTarget as HTMLButtonElement).style.background = "#B5945A";
          }}
        >
          {submitState === "loading"
            ? "Odosielam..."
            : submitState === "success"
            ? "Správa odoslaná ✓"
            : "Odoslať správu"}
          {submitState === "idle" && (
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={1.5}>
              <line x1="2" y1="6" x2="10" y2="6" />
              <polyline points="7,3 10,6 7,9" />
            </svg>
          )}
        </button>

        {submitState === "error" && (
          <p
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: "11px",
              color: "#e07070",
              marginTop: "10px",
              letterSpacing: "0.05em",
            }}
          >
            Správu sa nepodarilo odoslať. Skúste neskôr alebo napíšte priamo na e-mail.
          </p>
        )}
      </div>
    </form>
  );
};

// ─── Contact info item ────────────────────────────────────────────────────────

const ContactItem = ({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) => (
  <div style={{ display: "flex", alignItems: "flex-start", gap: "14px" }}>
    <span
      style={{
        color: "#B5945A",
        marginTop: "2px",
        flexShrink: 0,
      }}
    >
      {icon}
    </span>
    <div>
      <p
        style={{
          fontFamily: "var(--font-ui)",
          fontSize: "8px",
          color: "rgba(181,148,90,0.6)",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          marginBottom: "4px",
        }}
      >
        {label}
      </p>
      {href ? (
        <a
          href={href}
          style={{
            fontFamily: "var(--font-ui)",
            fontSize: "16px",
            color: "rgba(255,255,255,0.65)",
            textDecoration: "none",
            transition: "color 250ms ease",
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#C9A96E"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.65)"; }}
        >
          {value}
        </a>
      ) : (
        <p
          style={{
            fontFamily: "var(--font-ui)",
            fontSize: "16px",
            color: "rgba(255,255,255,0.65)",
          }}
        >
          {value}
        </p>
      )}
    </div>
  </div>
);

// ─── Team ────────────────────────────────────────────────────────────────────

// Pozn.: tel. čísla a e-maily doplní klient neskôr — zatiaľ placeholder "[doplniť]".
const PLACEHOLDER = "[doplniť]";

const TEAM = [
  { name: "JUDr. Peter Múkera ml.",      phone: PLACEHOLDER, email: PLACEHOLDER },
  { name: "JUDr. Peter Múkera st.",      phone: PLACEHOLDER, email: PLACEHOLDER },
  { name: "JUDr. Kornelia Múkerová",     phone: PLACEHOLDER, email: PLACEHOLDER },
  { name: "JUDr. Sára Tarnociová, PhD.", phone: PLACEHOLDER, email: PLACEHOLDER },
];

const TeamContact = ({
  icon,
  value,
  href,
}: {
  icon: React.ReactNode;
  value: string;
  href: string;
}) => {
  const rowStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontFamily: "var(--font-ui)",
    fontSize: "16px",
    color: "rgba(255,255,255,0.6)",
    textDecoration: "none",
    transition: "color 250ms ease",
  };
  const iconSpan = <span style={{ color: "#B5945A", flexShrink: 0, display: "inline-flex" }}>{icon}</span>;

  // Placeholder -> neklikateľný text (aby mailto:/tel: neboli rozbité)
  if (value === PLACEHOLDER) {
    return (
      <span style={{ ...rowStyle, color: "rgba(255,255,255,0.4)" }}>
        {iconSpan}
        {value}
      </span>
    );
  }

  return (
    <a
      href={href}
      style={rowStyle}
      onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#C9A96E"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.6)"; }}
    >
      {iconSpan}
      {value}
    </a>
  );
};

const TeamMember = ({
  name,
  phone,
  email,
}: {
  name: string;
  phone: string;
  email: string;
}) => (
  <div
    style={{
      background: "rgba(255,255,255,0.03)",
      border: "0.5px solid rgba(181,148,90,0.1)",
      padding: "1.75rem",
      display: "flex",
      flexDirection: "column",
      gap: "0.6rem",
      transition: "border-color 350ms ease, background 350ms ease",
    }}
    onMouseEnter={(e) => {
      (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(181,148,90,0.35)";
      (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.05)";
    }}
    onMouseLeave={(e) => {
      (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(181,148,90,0.1)";
      (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.03)";
    }}
  >
    {/* Name */}
    <h3
      style={{
        fontFamily: "var(--font-heading)",
        fontWeight: 300,
        fontSize: "1.5rem",
        color: "rgba(255,255,255,0.95)",
        lineHeight: 1.2,
      }}
    >
      {name}
    </h3>

    {/* Gold rule */}
    <div style={{ width: 28, height: "1px", background: "rgba(181,148,90,0.4)", margin: "0.25rem 0 0.6rem" }} />

    {/* Telefón — najprv */}
    <TeamContact icon={<IconPhone />} value={phone} href={`tel:${phone.replace(/\s/g, "")}`} />

    {/* E-mail — potom */}
    <TeamContact icon={<IconMail />} value={email} href={`mailto:${email}`} />
  </div>
);

// ─── Section ─────────────────────────────────────────────────────────────────

export const Contact = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerVisible, setHeaderVisible] = useState(false);
  const teamRef = useRef<HTMLDivElement>(null);
  const [teamVisible, setTeamVisible] = useState(false);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeaderVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = teamRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTeamVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* ── Contact section ── */}
      <section
        id="kontakt"
        style={{
          background: "#080F1E",
          borderTop: "0.5px solid rgba(181,148,90,0.12)",
          padding: "clamp(4rem, 8vw, 7rem) clamp(1.5rem, 6vw, 6rem)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Watermark */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            right: "-1rem",
            top: "50%",
            transform: "translateY(-50%)",
            fontFamily: "var(--font-heading)",
            fontSize: "18vw",
            fontWeight: 300,
            color: "rgba(181,148,90,0.025)",
            lineHeight: 1,
            pointerEvents: "none",
            userSelect: "none",
            whiteSpace: "nowrap",
          }}
        >
          IUS
        </div>

        {/* ── Advokátsky tím ── */}
        <div
          ref={teamRef}
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            marginBottom: "clamp(3.5rem, 7vw, 6rem)",
            position: "relative",
            opacity: teamVisible ? 1 : 0,
            transform: teamVisible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
          }}
        >
          {/* Kicker */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "1rem" }}>
            <div style={{ width: 28, height: "0.5px", background: "rgba(181,148,90,0.5)" }} />
            <span
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: "9px",
                color: "#B5945A",
                letterSpacing: "0.35em",
                textTransform: "uppercase",
              }}
            >
              Advokátsky tím
            </span>
          </div>

          {/* Heading */}
          <h2
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 300,
              fontSize: "clamp(1.9rem, 3.5vw, 3.2rem)",
              color: "rgba(255,255,255,0.95)",
              lineHeight: 1.1,
              marginBottom: "2.25rem",
            }}
          >
            Náš skúsený{" "}
            <em style={{ fontStyle: "italic", color: "#C9A96E" }}>advokátsky tím</em>
          </h2>

          {/* Cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))",
              gap: "1.25rem",
            }}
          >
            {TEAM.map((member) => (
              <TeamMember key={member.name} {...member} />
            ))}
          </div>
        </div>

        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 480px), 1fr))",
            gap: "clamp(3rem, 6vw, 6rem)",
            alignItems: "start",
            position: "relative",
          }}
        >
          {/* LEFT — info + form */}
          <div>
            {/* Header */}
            <div
              ref={headerRef}
              style={{
                marginBottom: "2.5rem",
                opacity: headerVisible ? 1 : 0,
                transform: headerVisible ? "translateY(0)" : "translateY(24px)",
                transition: "opacity 0.8s ease, transform 0.8s ease",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "1.25rem" }}>
                <div style={{ width: 28, height: "0.5px", background: "rgba(181,148,90,0.5)" }} />
                <span
                  style={{
                    fontFamily: "var(--font-ui)",
                    fontSize: "9px",
                    color: "#B5945A",
                    letterSpacing: "0.35em",
                    textTransform: "uppercase",
                  }}
                >
                  Spojte sa s nami
                </span>
              </div>

              <h2
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 300,
                  fontSize: "clamp(1.9rem, 3.5vw, 3.2rem)",
                  color: "white",
                  lineHeight: 1.1,
                  marginBottom: "1.75rem",
                }}
              >
                Sme tu, aby sme
                <br />
                chránili{" "}
                <em style={{ fontStyle: "italic", color: "#C9A96E" }}>vaše záujmy.</em>
              </h2>

              {/* Contact details */}
              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", marginBottom: "2.5rem" }}>
                <ContactItem
                  icon={<IconPin />}
                  label="Adresa"
                  value="Československej armády 25, Banská Bystrica"
                />
                <ContactItem
                  icon={<IconMail />}
                  label="E-mail"
                  value="kancelaria@mukera.sk"
                  href="mailto:kancelaria@mukera.sk"
                />
                <ContactItem
                  icon={<IconPhone />}
                  label="Telefón"
                  value="+421 900 000 000"
                  href="tel:+421900000000"
                />
              </div>

              {/* Thin gold divider before form */}
              <div style={{ width: "100%", height: "0.5px", background: "rgba(181,148,90,0.12)", marginBottom: "2rem" }} />
            </div>

            <ContactForm />
          </div>

          {/* RIGHT — dark-styled map */}
          <div
            style={{
              position: "sticky",
              top: "100px",
              opacity: headerVisible ? 1 : 0,
              transform: headerVisible ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.9s ease 0.15s, transform 0.9s ease 0.15s",
            }}
          >
            {/* Map label */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "1rem",
              }}
            >
              <div style={{ width: 20, height: "0.5px", background: "rgba(181,148,90,0.4)" }} />
              <span
                style={{
                  fontFamily: "var(--font-ui)",
                  fontSize: "8px",
                  color: "rgba(181,148,90,0.55)",
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                }}
              >
                Kde nás nájdete
              </span>
            </div>

            {/* Map iframe — štandardné farebné Google Maps */}
            <div
              style={{
                width: "100%",
                aspectRatio: "4 / 3",
                position: "relative",
                overflow: "hidden",
                border: "0.5px solid rgba(181,148,90,0.1)",
              }}
            >
              <iframe
                title="Poloha kancelárie"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2635.8!2d19.1462!3d48.7363!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47153b88e5f4f3b5%3A0x1!2s%C4%8Ceskoslovenskej%20arm%C3%A1dy%2025%2C%20Bansk%C3%A1%20Bystrica!5e0!3m2!1ssk!2ssk!4v1700000000000"
                width="100%"
                height="100%"
                style={{
                  border: "none",
                  position: "absolute",
                  inset: 0,
                }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>

            {/* Opening hours */}
            <div
              style={{
                marginTop: "1.25rem",
                padding: "1.25rem 1.5rem",
                background: "rgba(255,255,255,0.03)",
                border: "0.5px solid rgba(181,148,90,0.1)",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "0.75rem 2rem",
              }}
            >
              {[
                { day: "Pondelok — Piatok", time: "8:00 – 17:00" },
                { day: "Sobota", time: "na dohovore" },
              ].map((row) => (
                <div key={row.day} style={{ gridColumn: "span 2 / span 2", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontFamily: "var(--font-ui)", fontSize: "11px", color: "rgba(255,255,255,0.35)" }}>{row.day}</span>
                  <span style={{ fontFamily: "var(--font-ui)", fontSize: "11px", color: "rgba(181,148,90,0.6)" }}>{row.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </section>

      {/* ── Footer ── */}
      <footer
        style={{
          background: "#050B14",
          borderTop: "0.5px solid rgba(255,255,255,0.05)",
          padding: "clamp(1.5rem, 3vw, 2rem) clamp(1.5rem, 6vw, 6rem)",
        }}
      >
        <div
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
          <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
            {[
              { label: "Ochrana osobných údajov", href: "/gdpr" },
              { label: "Webdesign by SB Design", href: "https://sbdesign.sk" },
            ].map((link) => (
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
    </>
  );
};
