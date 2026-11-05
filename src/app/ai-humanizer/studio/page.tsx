import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import {
  ArrowRight,
  ArrowRightLeft,
  ArrowUpRight,
  Eraser,
  Layers,
  LockKeyhole,
  PenLine,
  ShieldAlert,
  Sparkles,
  Type,
} from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { WritingStudio } from "@/components/humanizer/writing-studio";
import { SectionHeading } from "@/components/section-heading";
import { humanizerTools } from "@/data/humanizer-tools";
import { STUDIO_STEPS } from "@/lib/writing/analyze";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Ruang Tulis LEGACY — Pakai Alat Humanizer Tanpa Keluar",
  description:
    "Editor LEGACY untuk merapikan tulisan langsung di dalam situs: rapikan spasi dan tanda baca, padatkan frasa, formalkan kata, pecah kalimat panjang, dan periksa keterbacaan. Teks diproses di browser.",
  alternates: { canonical: "/ai-humanizer/studio" },
  openGraph: {
    title: "Ruang Tulis LEGACY — Pakai Alat Humanizer Tanpa Keluar",
    description:
      "Sepuluh mode alat Humanizer dengan mesin penyuntingan lokal. Tidak perlu berpindah situs untuk merapikan draf.",
    url: "/ai-humanizer/studio",
  },
};

const STEP_ICONS = {
  rapikan: Eraser,
  padatkan: Layers,
  formalkan: Type,
  pecah: ArrowRightLeft,
} as const;

const appJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Ruang Tulis LEGACY",
  description:
    "Editor penyuntingan teks lokal untuk merapikan, memadatkan, memformalkan, dan memecah kalimat panjang.",
  url: `${site.url}/ai-humanizer/studio`,
  applicationCategory: "WritingApplication",
  operatingSystem: "Web",
  inLanguage: "id",
  offers: { "@type": "Offer", price: "0", priceCurrency: "IDR" },
  isPartOf: { "@type": "WebSite", name: site.name, url: site.url },
};

export default function WritingStudioPage() {
  return (
    <div className="container-page pb-16 pt-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appJsonLd) }}
      />

      <Breadcrumbs
        items={[
          { label: "AI Humanizer", href: "/ai-humanizer" },
          { label: "Ruang Tulis" },
        ]}
      />

      <section className="relative mt-6 overflow-hidden rounded-3xl border border-line/[0.08] bg-gradient-to-br from-aqua/12 via-cell/50 to-plasma/10 p-6 sm:p-8">
        <div
          className="pointer-events-none absolute inset-0 bg-grid bg-[size:44px_44px] opacity-25 [mask-image:radial-gradient(ellipse_60%_70%_at_20%_0%,black,transparent)]"
          aria-hidden="true"
        />
        <div className="ambient-orb -right-24 -top-28 h-64 w-64 bg-aqua/15" aria-hidden="true" />

        <div className="relative grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-iris/25 bg-iris/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-aqua">
              <PenLine className="h-3.5 w-3.5" aria-hidden="true" />
              Ruang Tulis
            </span>
            <h1 className="mt-4 font-display text-[2.1rem] font-extrabold leading-[1.06] tracking-[-0.04em] text-ink sm:text-[2.75rem]">
              Rapikan tulisan <span className="text-gradient">di dalam LEGACY</span>
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted sm:text-[15px]">
              Tombol Kunjungi pada daftar Humanizer sekarang membuka mode kerja di sini. Pilih
              alat, tempel draf, lalu jalankan mesin penyuntingan LEGACY tanpa berpindah situs.
              Setiap alat tetap punya tautan resmi sebagai pembanding.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              <span className="chip">
                <Sparkles className="h-3.5 w-3.5 text-aqua" aria-hidden="true" />
                {humanizerTools.length} mode alat
              </span>
              <span className="chip">
                <Layers className="h-3.5 w-3.5 text-plasma" aria-hidden="true" />
                {STUDIO_STEPS.length} langkah lokal
              </span>
              <span className="chip">
                <LockKeyhole className="h-3.5 w-3.5 text-emerald-300" aria-hidden="true" />
                Tanpa unggah teks
              </span>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              <a href="#studio" className="btn-primary h-11 px-5 text-xs">
                <PenLine className="h-4 w-4" aria-hidden="true" />
                Mulai menulis
              </a>
              <Link href="/ai-humanizer" className="btn-ghost h-11 px-4 text-xs">
                Daftar 10 alat
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-line/10 bg-canvas/60 p-4 shadow-card">
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted">
              Cara kerjanya
            </p>
            <ul className="mt-3 space-y-2.5">
              <li className="flex items-start gap-2.5">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-aqua/12 text-[10px] font-bold text-aqua">
                  1
                </span>
                <p className="text-[12px] leading-relaxed text-muted">
                  Pilih alat untuk memuat mode kerja yang sesuai.
                </p>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-aqua/12 text-[10px] font-bold text-aqua">
                  2
                </span>
                <p className="text-[12px] leading-relaxed text-muted">
                  Tempel draf; teks diproses di browser, tidak dikirim ke server.
                </p>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-aqua/12 text-[10px] font-bold text-aqua">
                  3
                </span>
                <p className="text-[12px] leading-relaxed text-muted">
                  Bandingkan, salin, atau pakai hasilnya sebagai draf baru.
                </p>
              </li>
            </ul>
            <a
              href="#cara-kerja"
              className="mt-4 inline-flex items-center gap-1 text-[11px] font-semibold text-aqua hover:text-ink"
            >
              Lihat langkah mesin
              <ArrowRight className="h-3 w-3" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      <section id="studio" className="mt-8 scroll-mt-24">
        <Suspense
          fallback={
            <div className="card-surface min-h-[520px] animate-pulse p-5">
              <div className="h-4 w-32 rounded bg-line/10" />
              <div className="mt-4 h-[300px] rounded-xl bg-line/[0.04]" />
              <p className="mt-3 text-xs text-muted">Menyiapkan ruang tulis…</p>
            </div>
          }
        >
          <WritingStudio />
        </Suspense>
      </section>

      <section id="cara-kerja" className="mt-14 scroll-mt-24">
        <SectionHeading
          label="Mesin lokal"
          title="Empat langkah yang berjalan di browser"
          description="Semuanya deterministik dan bisa kamu periksa hasilnya. Tidak ada teks yang dikirim ke server untuk diproses."
        />
        <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STUDIO_STEPS.map((step, index) => {
            const Icon = STEP_ICONS[step.id];
            return (
              <div key={step.id} className="card-surface p-5">
                <div className="flex items-center justify-between">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-iris/20 bg-iris/10 text-aqua">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="font-display text-2xl font-extrabold text-line/[0.09]">
                    0{index + 1}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-sm font-bold text-ink">{step.label}</h3>
                <p className="mt-1.5 text-[12px] leading-relaxed text-muted">{step.description}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <div className="rounded-2xl border border-amber-400/20 bg-amber-400/[0.04] p-5">
            <div className="flex items-center gap-2">
              <ShieldAlert className="h-4 w-4 text-amber-300" aria-hidden="true" />
              <h3 className="font-display text-sm font-bold text-ink">Yang tidak dilakukan</h3>
            </div>
            <ul className="mt-3 space-y-2 text-[12px] leading-relaxed text-muted">
              <li>
                Tidak memberi skor AI detector dan tidak menjamin tulisan lolos Turnitin atau
                pemeriksaan sejenis.
              </li>
              <li>
                Tidak memeriksa fakta, sitasi, atau daftar pustaka. Semua sumber tetap harus kamu
                verifikasi sendiri.
              </li>
              <li>
                Tidak menggantikan proses belajar. Hasil parafrase tetap harus kamu pahami dan
                pertanggungjawabkan.
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-line/10 bg-cell/40 p-5">
            <div className="flex items-center gap-2">
              <ArrowUpRight className="h-4 w-4 text-aqua" aria-hidden="true" />
              <h3 className="font-display text-sm font-bold text-ink">Butuh fitur lengkap?</h3>
            </div>
            <p className="mt-3 text-[12px] leading-relaxed text-muted">
              Ruang Tulis adalah pendamping lokal, bukan salinan layanan pihak ketiga. Untuk
              parafrase berbasis model, tata bahasa lanjutan, atau pemeriksaan tertentu, buka situs
              resmi alat yang kamu pilih dari daftar.
            </p>
            <Link
              href="/ai-humanizer"
              className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-aqua hover:text-ink"
            >
              Kembali ke daftar AI Humanizer
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
