import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter, Tenor_Sans } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Tenor Sans (UI font) self-hosted cez next/font — bez render-blocking Google Fonts @importu
const tenor = Tenor_Sans({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-tenor",
  display: "swap",
});

export const metadata: Metadata = {
  title: "JUDr. Peter Múkera | Advokátska kancelária Banská Bystrica",
  description:
    "Advokátska kancelária JUDr. Peter Múkera v Banskej Bystrici. Trestné, obchodné, občianske, pracovné a rodinné právo.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#080F1E",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sk" className={`${cormorant.variable} ${inter.variable} ${tenor.variable}`}>
      <body>
        {/* Preload LCP obrázka (hero pozadie) — rýchlejšie vykreslenie */}
        <link rel="preload" as="image" href="/hero-bg.webp" type="image/webp" fetchPriority="high" />
        {children}
      </body>
    </html>
  );
}
