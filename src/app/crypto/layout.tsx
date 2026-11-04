import type { Metadata } from "next";
import type { ReactNode } from "react";
import { CryptoNav } from "@/components/crypto/crypto-nav";
import { CryptoProgressProvider } from "@/components/crypto/progress-provider";

export const metadata: Metadata = {
  title: {
    default: "Crypto Academy — Belajar Fundamental Crypto & Candlestick",
    template: "%s · Crypto Academy",
  },
  description:
    "Kelas crypto interaktif berbahasa Indonesia: 10 bab fundamental, 11 pola candlestick, Candle Lab, simulasi, 100 soal kuis, dan glosarium. Materi edukasi, bukan nasihat investasi.",
  keywords: [
    "belajar crypto",
    "candlestick",
    "pola candlestick",
    "crypto academy",
    "fundamental crypto",
    "manajemen risiko crypto",
    "kuis crypto",
  ],
  alternates: { canonical: "/crypto" },
  openGraph: {
    title: "Crypto Academy — Belajar Fundamental Crypto & Candlestick",
    description:
      "E-book interaktif dan lab candlestick berbahasa Indonesia. Mulai dari nol, dengan simulasi dan kuis.",
    url: "/crypto",
    type: "website",
  },
};

export default function CryptoLayout({ children }: { children: ReactNode }) {
  return (
    <CryptoProgressProvider>
      <div className="crypto-shell relative isolate overflow-hidden bg-canvas text-ink">
        <div
          className="ambient-orb -left-24 top-0 h-[24rem] w-[24rem] bg-iris/15"
          aria-hidden="true"
        />
        <div
          className="ambient-orb -right-32 top-[24rem] h-[26rem] w-[26rem] bg-aqua/10"
          aria-hidden="true"
        />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[28rem] bg-grid opacity-[0.35] [mask-image:linear-gradient(to_bottom,black,transparent)]" aria-hidden="true" />
        <CryptoNav />
        <div className="container-page relative py-6 sm:py-8">{children}</div>
      </div>
    </CryptoProgressProvider>
  );
}
