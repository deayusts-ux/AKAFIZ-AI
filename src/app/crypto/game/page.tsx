import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Gamepad2, Timer, TrendingDown, TrendingUp, Wallet } from "lucide-react";
import { BtcGame } from "@/components/crypto/btc-game";
import { CryptoDisclaimer } from "@/components/crypto/crypto-disclaimer";

export const metadata: Metadata = {
  title: "Bitcoin demo game",
  description:
    "Game edukasi: tebak arah harga Bitcoin naik atau turun dalam 5 detik memakai akun demo dan uang virtual. Bukan trading nyata dan bukan sinyal.",
  alternates: { canonical: "/crypto/game" },
};

const steps = [
  { icon: Wallet, title: "Saldo virtual $10.000", body: "Setiap ronde memakai taruhan demo $100. Tidak ada deposit atau uang nyata." },
  { icon: TrendingUp, title: "Pilih NAIK atau TURUN", body: "Prediksi arah harga dalam 5 detik. Bisa ganti arah sebelum waktu habis." },
  { icon: Timer, title: "Hasil 5 detik", body: "Harga awal dan akhir dibandingkan. Tepat dapat +$100, meleset -$100, seri tidak berubah." },
  { icon: TrendingDown, title: "Belajar dari hasil", body: "Lihat riwayat ronde, streak, dan persentase tebakan tepat. Fokus ke proses, bukan mengejar menang." },
];

export default function GamePage() {
  return (
    <div className="space-y-6">
      <section>
        <p className="inline-flex items-center gap-2 rounded-full border border-rose-400/20 bg-rose-400/[0.06] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-rose-300">
          <Gamepad2 className="h-3.5 w-3.5" aria-hidden="true" />
          Demo game
        </p>
        <h1 className="mt-4 font-display text-3xl font-bold tracking-[-0.035em] text-ink sm:text-4xl">
          Naik atau turun dalam 5 detik?
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
          Game ringan untuk melatih kecepatan membaca pergerakan harga Bitcoin. Semua memakai saldo demo.
          Harga diambil dari API publik bursa saat tersedia; jika tidak, game memakai harga simulasi dan
          menandainya secara jelas.
        </p>
        <div className="mt-4 flex flex-wrap gap-2 text-[10px]">
          <span className="rounded-full border border-line/10 bg-line/[0.03] px-2.5 py-1 font-semibold text-muted">
            Saldo demo $10.000
          </span>
          <span className="rounded-full border border-line/10 bg-line/[0.03] px-2.5 py-1 font-semibold text-muted">
            Ronde 5 detik
          </span>
          <Link
            href="/crypto/ebook/memahami-pasar"
            className="inline-flex items-center gap-1 rounded-full border border-line/10 bg-line/[0.03] px-2.5 py-1 font-semibold text-muted transition-colors hover:text-ink"
          >
            Baca teori pasar
            <ArrowRight className="h-3 w-3" aria-hidden="true" />
          </Link>
        </div>
      </section>

      <BtcGame />

      <section>
        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted">Cara main</p>
        <div className="mt-2.5 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.title} className="rounded-xl border border-line/10 bg-canvas/45 p-3.5">
                <Icon className="h-4 w-4 text-aqua" aria-hidden="true" />
                <p className="mt-2 text-[11px] font-bold text-ink">{step.title}</p>
                <p className="mt-0.5 text-[10px] leading-relaxed text-muted">{step.body}</p>
              </div>
            );
          })}
        </div>
        <p className="mt-3 rounded-xl border border-line/10 bg-line/[0.02] p-3 text-[11px] leading-relaxed text-muted">
          Game ini tidak mengajarkan strategi trading dan tidak merekomendasikan arah harga. Pergerakan 5 detik
          sangat acak, sehingga hasilnya tidak bisa dipakai untuk memprediksi pasar nyata.
        </p>
      </section>

      <CryptoDisclaimer />
    </div>
  );
}
