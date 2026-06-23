"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useI18n } from "./i18n";
import type { Translation } from "./translations";

// ─── Validation schema ────────────────────────────────────────────────────────

type FormData = {
  name: string;
  email: string;
  phone?: string;
  message: string;
  company?: string; // honeypot
};

// Schéma sa stavia z prekladov, aby chybové hlášky boli v aktuálnom jazyku.
const makeSchema = (t: Translation) =>
  z.object({
    name: z.string().min(2, t.contact.errName),
    email: z.string().email(t.contact.errEmail),
    phone: z.string().optional(),
    message: z.string().min(10, t.contact.errMessage),
    // Honeypot — neviditeľné pole, vypĺňajú ho iba boty (antispam).
    company: z.string().optional(),
  });

// ─── Doručovanie e-mailov ──────────────────────────────────────────────────────
// Web3Forms doručí správu na office@mukera.sk bez potreby vlastného backendu
// (web je statický export). Bezplatný access key získaš na https://web3forms.com
// — zadáš office@mukera.sk a kľúč príde do tej schránky. Kľúč je bezpečné mať v kóde.
const WEB3FORMS_ACCESS_KEY = "REPLACE_WITH_WEB3FORMS_ACCESS_KEY";

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
        fontSize: "11px",
        color: error ? "#e07070" : "rgba(181,148,90,0.85)",
        letterSpacing: "0.2em",
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
  const { t } = useI18n();
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const schema = useMemo(() => makeSchema(t), [t]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    // Honeypot — skryté pole vypĺňajú iba boty. Predstierame úspech a nič neodošleme.
    if (data.company) {
      setSubmitState("success");
      reset();
      return;
    }
    setSubmitState("loading");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: "Nový dopyt z webu mukera.sk",
          from_name: "Web mukera.sk",
          name: data.name,
          email: data.email,
          phone: data.phone || "neuvedené",
          message: data.message,
          replyto: data.email,
        }),
      });
      const json = await res.json().catch(() => ({ success: false }));
      if (res.ok && json.success) {
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
      {/* Honeypot — skryté pole, vypĺňajú ho iba boty (antispam) */}
      <input
        {...register("company")}
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
      />

      {/* Name + Email row — na úzkych displejoch sa zalomí pod seba */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 200px), 1fr))",
          gap: "1.5rem",
        }}
      >
        <Field label={t.contact.fName} error={errors.name?.message}>
          <input
            {...register("name")}
            placeholder={t.contact.phName}
            style={getFieldStyle("name")}
            onFocus={() => setFocusedField("name")}
            onBlur={() => setFocusedField(null)}
          />
        </Field>
        <Field label={t.contact.fEmail} error={errors.email?.message}>
          <input
            {...register("email")}
            type="email"
            placeholder={t.contact.phEmail}
            style={getFieldStyle("email")}
            onFocus={() => setFocusedField("email")}
            onBlur={() => setFocusedField(null)}
          />
        </Field>
      </div>

      {/* Phone */}
      <Field label={t.contact.fPhone} error={errors.phone?.message}>
        <input
          {...register("phone")}
          type="tel"
          placeholder={t.contact.phPhone}
          style={getFieldStyle("phone")}
          onFocus={() => setFocusedField("phone")}
          onBlur={() => setFocusedField(null)}
        />
      </Field>

      {/* Message */}
      <Field label={t.contact.fMessage} error={errors.message?.message}>
        <textarea
          {...register("message")}
          rows={5}
          placeholder={t.contact.phMessage}
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
            ? t.contact.sendLoading
            : submitState === "success"
            ? t.contact.sendSuccess
            : t.contact.sendIdle}
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
            {t.contact.sendError}
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
          fontSize: "11px",
          color: "rgba(181,148,90,0.85)",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          marginBottom: "5px",
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

// Placeholder fallback — ak by niektorý údaj ešte chýbal, zobrazí sa ako neklikateľný text.
const PLACEHOLDER = "[doplniť]";

const TEAM = [
  { name: "JUDr. Peter Múkera ml.",      phone: "0904 808 234", email: "peter.mukera.ml@mukera.sk" },
  { name: "JUDr. Peter Múkera st.",      phone: "0903 440 799", email: "peter.mukera@mukera.sk" },
  { name: "JUDr. Kornelia Múkerová",     phone: "0904 385 972", email: "kornelia.mukerova@mukera.sk" },
  { name: "JUDr. Sára Tarnociová, PhD.", phone: "0905 892 658", email: "tarnociova.sara@gmail.com" },
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
  role,
  phone,
  email,
}: {
  name: string;
  role: string;
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
    {/* Name — celé meno na jeden riadok (široké 2-stĺpcové karty) */}
    <h3
      style={{
        fontFamily: "var(--font-heading)",
        fontWeight: 300,
        fontSize: "clamp(1.2rem, 2.2vw, 1.45rem)",
        color: "rgba(255,255,255,0.95)",
        lineHeight: 1.2,
      }}
    >
      {name}
    </h3>

    {/* Role — advokát */}
    <span
      style={{
        fontFamily: "var(--font-ui)",
        fontSize: "11px",
        color: "rgba(181,148,90,0.85)",
        letterSpacing: "0.22em",
        textTransform: "uppercase",
      }}
    >
      {role}
    </span>

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
  const { t } = useI18n();
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
                fontSize: "13px",
                color: "#B5945A",
                letterSpacing: "0.35em",
                textTransform: "uppercase",
              }}
            >
              {t.contact.teamKicker}
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
            {t.contact.teamTitle}{" "}
            <em style={{ fontStyle: "italic", color: "#C9A96E" }}>{t.contact.teamTitleAccent}</em>
          </h2>

          {/* Cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 420px), 1fr))",
              gap: "1.25rem",
            }}
          >
            {TEAM.map((member) => (
              <TeamMember key={member.name} {...member} role={t.contact.teamRole} />
            ))}
          </div>
        </div>

        <div
          id="spojte-sa"
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 480px), 1fr))",
            gap: "clamp(3rem, 6vw, 6rem)",
            alignItems: "start",
            position: "relative",
            scrollMarginTop: "90px",
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
                    fontSize: "13px",
                    color: "#B5945A",
                    letterSpacing: "0.35em",
                    textTransform: "uppercase",
                  }}
                >
                  {t.contact.kicker}
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
                {t.contact.title1}
                <br />
                {t.contact.title2}{" "}
                <em style={{ fontStyle: "italic", color: "#C9A96E" }}>{t.contact.titleAccent}</em>
              </h2>

              {/* Contact details */}
              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", marginBottom: "2.5rem" }}>
                <ContactItem
                  icon={<IconPin />}
                  label={t.contact.labelAddress}
                  value="Československej armády 1007/25, 974 01 Banská Bystrica"
                />
                <ContactItem
                  icon={<IconMail />}
                  label={t.contact.labelEmail}
                  value="office@mukera.sk"
                  href="mailto:office@mukera.sk"
                />
                <ContactItem
                  icon={<IconPhone />}
                  label={t.contact.labelPhone}
                  value="+421 904 808 234"
                  href="tel:+421904808234"
                />
              </div>

              {/* Thin gold divider before form */}
              <div style={{ width: "100%", height: "0.5px", background: "rgba(181,148,90,0.12)", marginBottom: "2rem" }} />
            </div>

            {/* Kicker — kontaktný formulár */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "1.5rem" }}>
              <div style={{ width: 28, height: "0.5px", background: "rgba(181,148,90,0.5)" }} />
              <span
                style={{
                  fontFamily: "var(--font-ui)",
                  fontSize: "13px",
                  color: "#B5945A",
                  letterSpacing: "0.35em",
                  textTransform: "uppercase",
                }}
              >
                {t.contact.formKicker}
              </span>
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
                  fontSize: "13px",
                  color: "#B5945A",
                  letterSpacing: "0.35em",
                  textTransform: "uppercase",
                }}
              >
                {t.contact.mapKicker}
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
                title={t.contact.mapTitle}
                src="https://maps.google.com/maps?q=48.7383325,19.1548837(Advok%C3%A1tska%20kancel%C3%A1ria%20JUDr.%20Peter%20M%C3%BAkera)&z=17&hl=sk&output=embed"
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

            {/* Trasa — otvorí navigáciu v Google Mapách */}
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=48.7383325,19.1548837"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                marginTop: "0.75rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                padding: "14px 20px",
                border: "0.5px solid rgba(181,148,90,0.35)",
                background: "rgba(181,148,90,0.06)",
                fontFamily: "var(--font-ui)",
                fontSize: "11px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#C9A96E",
                textDecoration: "none",
                transition: "background 250ms ease, border-color 250ms ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = "rgba(181,148,90,0.14)";
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(181,148,90,0.6)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = "rgba(181,148,90,0.06)";
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(181,148,90,0.35)";
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                <polygon points="3 11 22 2 13 21 11 13 3 11" />
              </svg>
              {t.contact.directions}
            </a>

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
                { day: t.contact.hoursDay, time: "9:00 – 17:00" },
              ].map((row) => (
                <div key={row.day} style={{ gridColumn: "span 2 / span 2", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontFamily: "var(--font-ui)", fontSize: "15px", color: "rgba(255,255,255,0.6)" }}>{row.day}</span>
                  <span style={{ fontFamily: "var(--font-ui)", fontSize: "15px", color: "rgba(181,148,90,0.75)" }}>{row.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </section>
    </>
  );
};
