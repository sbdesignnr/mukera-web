"use client";

import { useEffect, useRef, useState } from "react";

// ─── Data — skutočné Google recenzie (všetky 5★) ──────────────────────────────

const REVIEWS = [
  {
    author: "Monika Sidorová",
    text: "Chcem sa podeliť o skvelú skúsenosť so službami pána právnika Múkeru. Pomohol mi so založením, resp. prevzatím už existujúcej s.r.o, pripravil všetky potrebné dokumenty, vysvetlil celý proces. Všetko išlo hladko, rýchlo a bezproblémovo.",
  },
  {
    author: "Nino Gál",
    text: "Maximálna spokojnosť. Profesionálny, skúsený a veľmi ochotný právnik, ktorý sa naozaj venuje klientovi. Komunikácia bola rýchla a jasná, výsledok nad moje očakávania. Ak hľadáte spoľahlivého právnika, určite odporúčam.",
  },
  {
    author: "Miso Miso",
    text: "Moja skúsenosť bola pozitívna a nebol žiadny problém. So službami som bol nadmieru spokojný a môžem doporučiť pána advokáta.",
  },
  {
    author: "Eva Halajová",
    text: "Veľmi milý a ústretový pán advokát. Po stretnutí s ním som získala úplne iný pohľad na náš problém. Veľmi pekne mu za to ďakujem.",
  },
  {
    author: "Miroslav Švec",
    text: "Chcem sa srdečne poďakovať a zároveň odporučiť právnika JUDr. Petra Múkeru, s ktorým som mal tú česť spolupracovať. Bol som nadmieru spokojný – jeho prístup bol profesionálny, rýchly a mimoriadne ústretový.",
  },
  {
    author: "Peter Pochyba",
    text: "Môžem len odporučiť. Pán JUDr. Peter Múkera ml. mi všetko dopodrobna vysvetlil, ako mám postupovať. Jeho právna pomoc mi veľmi pomohla, oceňujem aj ľudský prístup. Ďakujem.",
  },
  {
    author: "Michal M",
    text: "Vynikajúci pán advokát. Doporučujem využiť jeho profesionálne právne služby.",
  },
  {
    author: "Alina Malčeková",
    text: "Ďakujem za poradu a ochotný prístup v riešení mojej otázky.",
  },
  {
    author: "Peter Havran",
    text: "Môžem len odporučiť. Veľká spokojnosť po všetkých stránkach.",
  },
  {
    author: "Miroslav Vavra",
    text: "Profesionalita, príjemné a ľudské vystupovanie, dobrá komunikácia, rozhodne odporúčam.",
  },
  {
    author: "Sara Tarnociova",
    text: "Oceňujem vysokoprofesionálny prístup pána doktora JUDr. Petra Múkeru ml. a zároveň príjemné prostredie tejto rodinnej advokátskej kancelárie.",
  },
  {
    author: "Alexander Vegso",
    text: "Poradil správne a načas, úplna spokojnosť.",
  },
];

// ─── 5-star rating ─────────────────────────────────────────────────────────────

const Stars = () => (
  <div
    style={{ display: "flex", gap: "3px" }}
    role="img"
    aria-label="Hodnotenie 5 z 5 hviezdičiek"
  >
    {Array.from({ length: 5 }).map((_, i) => (
      <svg key={i} width="15" height="15" viewBox="0 0 24 24" fill="#B5945A" aria-hidden="true">
        <path d="M12 2l2.94 5.96 6.58.96-4.76 4.64 1.12 6.55L12 17.77l-5.88 3.09 1.12-6.55L2.48 8.92l6.58-.96L12 2z" />
      </svg>
    ))}
  </div>
);

// ─── Single card ─────────────────────────────────────────────────────────────

const ReviewCard = ({
  review,
  index,
}: {
  review: (typeof REVIEWS)[number];
  index: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: "#0A1628",
        border: hover
          ? "0.5px solid rgba(181,148,90,0.4)"
          : "0.5px solid rgba(181,148,90,0.16)",
        padding: "clamp(1.75rem, 3vw, 2.25rem)",
        display: "flex",
        flexDirection: "column",
        boxShadow: hover
          ? "0 24px 60px rgba(0,0,0,0.45)"
          : "0 8px 30px rgba(0,0,0,0.25)",
        /* Reveal + hover lift */
        opacity: visible ? 1 : 0,
        transform: visible
          ? hover
            ? "translateY(-4px)"
            : "translateY(0)"
          : "translateY(24px)",
        transition: `opacity 0.7s ease ${Math.min(index * 60, 500)}ms, transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94), box-shadow 0.4s ease, border-color 0.4s ease`,
      }}
    >
      {/* Stars — všetci 5★ */}
      <Stars />

      {/* Review text */}
      <p
        style={{
          fontFamily: "var(--font-heading)",
          fontStyle: "italic",
          fontWeight: 300,
          fontSize: "clamp(1.05rem, 1.2vw, 1.2rem)",
          color: "rgba(255,255,255,0.9)",
          lineHeight: 1.75,
          marginTop: "1.25rem",
        }}
      >
        {review.text}
      </p>

      {/* Gold divider */}
      <div
        style={{
          width: "40px",
          height: "0.5px",
          background: "rgba(181,148,90,0.5)",
          margin: "1.5rem 0 1rem",
        }}
      />

      {/* Author — meno zlatou farbou */}
      <p
        style={{
          fontFamily: "var(--font-ui)",
          fontSize: "14px",
          color: "#C9A96E",
          letterSpacing: "0.06em",
        }}
      >
        {review.author}
      </p>
    </div>
  );
};

// ─── Section ─────────────────────────────────────────────────────────────────

export const Reviews = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerVisible, setHeaderVisible] = useState(false);

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
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="referencie"
      style={{
        background: "#080F1E",
        borderTop: "0.5px solid rgba(181,148,90,0.12)",
        padding: "clamp(4rem, 8vw, 7rem) clamp(1.5rem, 6vw, 6rem)",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Header */}
        <div
          ref={headerRef}
          style={{
            textAlign: "center",
            marginBottom: "3.5rem",
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
          }}
        >
          {/* Kicker */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "14px",
              marginBottom: "1.25rem",
            }}
          >
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
              Referencie
            </span>
            <div style={{ width: 28, height: "0.5px", background: "rgba(181,148,90,0.5)" }} />
          </div>

          {/* H2 */}
          <h2
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 300,
              fontSize: "clamp(1.9rem, 3.5vw, 3.2rem)",
              color: "rgba(255,255,255,0.95)",
              lineHeight: 1.15,
              marginBottom: "1rem",
            }}
          >
            Dôvera, ktorá{" "}
            <em style={{ fontStyle: "italic", color: "#C9A96E" }}>hovorí za všetko.</em>
          </h2>

          {/* Subtitle */}
          <p
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: "16px",
              color: "rgba(255,255,255,0.5)",
              lineHeight: 1.7,
              maxWidth: "480px",
              margin: "0 auto",
            }}
          >
            Skutočné ohlasy klientov, ktorých sme mali tú česť zastupovať.
          </p>
        </div>

        {/*
          Cards — masonry stĺpce (premium „wall of testimonials"):
          1 stĺpec na mobile, 2 na tablete, 3 na desktope.
          Layout riadia .reviews-grid / .review-card-wrapper triedy v globals.css.
        */}
        <div className="reviews-grid">
          {REVIEWS.map((review, i) => (
            <div key={i} className="review-card-wrapper">
              <ReviewCard review={review} index={i} />
            </div>
          ))}
        </div>

        {/* Bottom signature line */}
        <div
          style={{
            marginTop: "3.5rem",
            paddingTop: "2rem",
            borderTop: "0.5px solid rgba(255,255,255,0.06)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "16px",
          }}
        >
          <div style={{ width: 24, height: "0.5px", background: "rgba(181,148,90,0.3)" }} />
          <span
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: "9px",
              color: "rgba(255,255,255,0.4)",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
            }}
          >
            Recenzie našich klientov z Google
          </span>
          <div style={{ width: 24, height: "0.5px", background: "rgba(181,148,90,0.3)" }} />
        </div>
      </div>
    </section>
  );
};
