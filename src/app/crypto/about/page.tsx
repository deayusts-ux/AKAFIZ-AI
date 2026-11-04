import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  ChartCandlestick,
  Database,
  ExternalLink,
  GraduationCap,
  ShieldCheck,
  Sparkles,
  UserRound,
} from "lucide-react";
import { CryptoDisclaimer } from "@/components/crypto/crypto-disclaimer";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = {
  title: "Tentang Crypto Academy",
  description:
    "Tentang Crypto Academy: tujuan, cara penyusunan materi, penggunaan data simulasi, privasi LocalStorage, batasan, dan sumber belajar resmi.",
  alternates: { canonical: "/crypto/about" },
};

const principles = [
  {
    icon: BookOpen,
    title: "Bertahap dan berbahasa Indonesia",
    body: "Setiap istilah dijelaskan saat pertama muncul. Tidak ada loncatan dari pemula langsung ke strategi kompleks.",
  },
  {
    icon: ChartCandlestick,
    title: "Visual sebelum hafalan",
    body: "Anatomi candle, pola, support-resistance, dan volume diperkenalkan lewat gambar dan chart yang bisa dieksplorasi.",
  },
  {
    icon: ShieldCheck,
    title: "Risiko diperkenalkan lebih awal",
    body: "Manajemen risiko bukan bab tambahan di akhir, tetapi kebiasaan yang harus dibawa sejak membaca candle pertama.",
  },
  {
    icon: Database,
    title: "Jujur soal data",
    body: "Semua chart di e-book, Candle Lab, dan simulasi memakai data simulasi. Tidak ada klaim harga real-time.",
  },
];

const resources = [
  { href: "https://bitcoin.org/bitcoin.pdf", label: "Bitcoin whitepaper", note: "bitcoin.org" },
  { href: "https://ethereum.org/learn/", label: "Ethereum learning", note: "ethereum.org" },
  { href: "https://academy.binance.com/", label: "Binance Academy", note: "academy.binance.com" },
  { href: "https://www.tradingview.com/", label: "TradingView", note: "tradingview.com" },
  { href: "https://www.bls.gov/cpi/", label: "Data CPI (BLS)", note: "bls.gov" },
  {
    href: "https://www.federalreserve.gov/monetarypolicy/fomccalendars.htm",
    label: "Kalender FOMC (The Fed)",
    note: "federalreserve.gov",
  },
  { href: "https://www.sec.gov/", label: "SEC", note: "sec.gov" },
  { href: "https://coinmarketcap.com/", label: "CoinMarketCap", note: "coinmarketcap.com" },
];

export default function CryptoAboutPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <section>
        <p className="inline-flex items-center gap-2 rounded-full border border-line/10 bg-line/[0.03] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-muted">
          <Sparkles className="h-3.5 w-3.5 text-aqua" aria-hidden="true" />
          Tentang Crypto Academy
        </p>
        <h1 className="mt-4 font-display text-3xl font-bold tracking-[-0.035em] text-ink sm:text-4xl">
          Belajar untuk memahami, bukan untuk mengejar sinyal.
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Crypto Academy adalah bagian edukasi dari LEGACY AI. Tujuannya sederhana: membantu pemula memahami
          cara kerja crypto dan cara membaca chart candlestick tanpa janji keuntungan. Semua materi bisa
          diakses gratis setelah kamu masuk ke situs.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          <Link href="/crypto/ebook" className="btn-primary h-10 px-4 text-xs">
            <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
            Mulai dari e-book
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
          <Link href="/crypto/candlestick-lab" className="btn-ghost h-10 px-4 text-xs">
            <ChartCandlestick className="h-3.5 w-3.5" aria-hidden="true" />
            Coba Candle Lab
          </Link>
          <Link href="/tentang-saya" className="btn-ghost h-10 px-4 text-xs">
            <UserRound className="h-3.5 w-3.5" aria-hidden="true" />
            Tentang kreator
          </Link>
        </div>
      </section>

      <section>
        <SectionHeading label="Prinsip" title="Cara materi disusun" />
        <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
          {principles.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="rounded-xl border border-line/10 bg-canvas/45 p-4">
                <Icon className="h-4 w-4 text-aqua" aria-hidden="true" />
                <h3 className="mt-2 text-xs font-bold text-ink">{item.title}</h3>
                <p className="mt-1 text-[11px] leading-relaxed text-muted">{item.body}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border border-line/10 bg-canvas/45 p-4">
          <p className="flex items-center gap-1.5 text-[11px] font-bold text-ink">
            <Database className="h-3.5 w-3.5 text-aqua" aria-hidden="true" />
            Soal data dan harga
          </p>
          <p className="mt-1.5 text-[11px] leading-relaxed text-muted">
            Chart di e-book, Candle Lab, dan simulasi memakai generator data deterministik untuk latihan. Game
            Bitcoin mencoba mengambil harga dari API publik bursa; bila gagal, game memakai harga simulasi dan
            menampilkannya sebagai simulasi. Tidak ada klaim data real-time di halaman edukasi.
          </p>
        </div>
        <div className="rounded-2xl border border-line/10 bg-canvas/45 p-4">
          <p className="flex items-center gap-1.5 text-[11px] font-bold text-ink">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" />
            Privasi dan progres
          </p>
          <p className="mt-1.5 text-[11px] leading-relaxed text-muted">
            Progres belajar, bookmark, skor kuis, dan hasil simulasi disimpan di LocalStorage browser ini.
            Tidak ada akun tambahan, tidak ada pengiriman data progres ke server, dan tidak ada pelacakan
            iklan di dalam Crypto Academy.
          </p>
        </div>
        <div className="rounded-2xl border border-line/10 bg-canvas/45 p-4">
          <p className="flex items-center gap-1.5 text-[11px] font-bold text-ink">
            <GraduationCap className="h-3.5 w-3.5 text-amber-300" aria-hidden="true" />
            Batasan materi
          </p>
          <p className="mt-1.5 text-[11px] leading-relaxed text-muted">
            Materi mencakup dasar-dasar, bukan strategi personal. Pajak, regulasi lokal, keamanan wallet, dan
            aspek hukum berbeda di setiap negara sehingga perlu kamu cek ke sumber resmi.
          </p>
        </div>
        <div className="rounded-2xl border border-rose-400/15 bg-rose-400/[0.04] p-4">
          <p className="flex items-center gap-1.5 text-[11px] font-bold text-rose-200">
            <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
            Bukan nasihat investasi
          </p>
          <p className="mt-1.5 text-[11px] leading-relaxed text-muted">
            Tidak ada rekomendasi beli, jual, atau tahan aset apa pun. Crypto sangat volatil dan bisa
            kehilangan nilai. Keputusan finansial sepenuhnya tanggung jawab masing-masing.
          </p>
        </div>
      </section>

      <section>
        <SectionHeading
          label="Sumber resmi"
          title="Lanjut belajar dari sumber primer"
          description="Tautan berikut mengarah ke situs resmi. Gunakan untuk memverifikasi konsep dan data, bukan sebagai ajakan bertransaksi."
        />
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {resources.map((resource) => (
            <a
              key={resource.href}
              href={resource.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 rounded-xl border border-line/10 bg-canvas/45 p-3 transition-colors hover:border-line/20"
            >
              <ExternalLink className="h-3.5 w-3.5 shrink-0 text-muted" aria-hidden="true" />
              <span className="min-w-0">
                <span className="block text-[11px] font-semibold text-ink">{resource.label}</span>
                <span className="block text-[10px] text-muted">{resource.note}</span>
              </span>
              <ArrowUpRight className="ml-auto h-3.5 w-3.5 shrink-0 text-muted transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </a>
          ))}
        </div>
      </section>

      <CryptoDisclaimer />
    </div>
  );
}
