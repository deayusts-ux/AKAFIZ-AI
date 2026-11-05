import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  ClipboardCheck,
  GraduationCap,
  Link2,
  ListChecks,
  PenLine,
  ScanText,
  ShieldAlert,
  Sparkles,
  Target,
} from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Monogram } from "@/components/monogram";
import { SectionHeading } from "@/components/section-heading";
import {
  humanizerStats,
  humanizerTools,
  recommendedHumanizers,
} from "@/data/humanizer-tools";
import { accentStyle, contrastInk } from "@/lib/utils";

export const metadata: Metadata = {
  title: "AI Humanizer — 10 Alat untuk Merapikan Tulisan",
  description:
    "Panduan AI Humanizer dengan 10 alat resmi: QuillBot, Grammarly, Phrasly AI, Undetectable AI, HIX AI, WriteHuman, StealthWriter, Smodin, Wordtune, dan Ryne AI. Lengkap dengan rekomendasi tugas kuliah dan catatan etika akademik.",
  alternates: { canonical: "/ai-humanizer" },
  openGraph: {
    title: "AI Humanizer — 10 Alat untuk Merapikan Tulisan",
    description:
      "Bandingkan 10 alat penulisan ulang dan penyuntingan, plus tiga rekomendasi untuk tugas kuliah. Tidak ada jaminan lolos AI detector.",
    url: "/ai-humanizer",
  },
};

const steps = [
  {
    icon: PenLine,
    title: "Tulis dulu dengan kata-katamu",
    description:
      "Mulai dari poin, argumen, dan sumbermu sendiri. Alat ini membantu merapikan, bukan menggantikan ide atau proses membaca.",
  },
  {
    icon: ScanText,
    title: "Parafrase untuk kejelasan",
    description:
      "Gunakan penulisan ulang untuk menghilangkan kalimat berulang dan memperbaiki alur — bukan untuk mengaburkan asal-usul tulisan.",
  },
  {
    icon: ClipboardCheck,
    title: "Periksa makna dan sumber",
    description:
      "Bandingkan hasil dengan draf awal, cek istilah dan sitasi, lalu pastikan kamu bisa menjelaskan setiap bagian tulisannya.",
  },
];

const itemListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "AI Humanizer — 10 alat untuk merapikan tulisan",
  description:
    "Daftar alat penulisan ulang dan penyuntingan dengan tautan resmi, disusun berdasarkan fitur dan perbandingan alat.",
  numberOfItems: humanizerTools.length,
  itemListElement: humanizerTools.map((tool, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: tool.name,
    url: tool.website,
  })),
};

export default function AiHumanizerPage() {
  return (
    <div className="container-page pb-16 pt-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />

      <Breadcrumbs items={[{ label: "AI Humanizer" }]} />

      <section className="relative mt-6 overflow-hidden rounded-3xl border border-line/[0.08] bg-gradient-to-br from-iris/15 via-cell/50 to-aqua/10 p-6 sm:p-8 lg:p-10">
        <div
          className="pointer-events-none absolute inset-0 bg-grid bg-[size:44px_44px] opacity-30 [mask-image:radial-gradient(ellipse_60%_70%_at_25%_0%,black,transparent)]"
          aria-hidden="true"
        />
        <div
          className="ambient-orb -right-24 -top-28 h-72 w-72 bg-plasma/20"
          aria-hidden="true"
        />

        <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-iris/25 bg-iris/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-aqua">
              <PenLine className="h-3.5 w-3.5" aria-hidden="true" />
              Panduan tulisan
            </span>
            <h1 className="mt-4 font-display text-[2.4rem] font-extrabold leading-[1.05] tracking-[-0.04em] text-ink sm:text-5xl">
              AI <span className="text-gradient">Humanizer</span>
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted sm:text-[15px]">
              Sepuluh alat untuk menulis ulang, merapikan, dan menyunting tulisan agar lebih jelas
              dan mengalir. Setiap alat bisa langsung dicoba di Ruang Tulis LEGACY, dan tautan
              resminya tetap tersedia sebagai pembanding.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              <span className="chip">
                <PenLine className="h-3.5 w-3.5 text-aqua" aria-hidden="true" />
                {humanizerStats.tools} alat
              </span>
              <span className="chip">
                <Link2 className="h-3.5 w-3.5 text-emerald-300" aria-hidden="true" />
                {humanizerStats.official} tautan resmi
              </span>
              <span className="chip">
                <GraduationCap className="h-3.5 w-3.5 text-plasma" aria-hidden="true" />
                {humanizerStats.recommendations} rekomendasi tugas kuliah
              </span>
              <span className="chip">
                <Sparkles className="h-3.5 w-3.5 text-aqua" aria-hidden="true" />
                Bisa dipakai di LEGACY
              </span>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              <Link href="/ai-humanizer/studio" className="btn-primary h-11 px-5 text-xs">
                <PenLine className="h-4 w-4" aria-hidden="true" />
                Buka Ruang Tulis
              </Link>
              <a href="#rekomendasi" className="btn-ghost h-11 px-4 text-xs">
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                Lihat rekomendasi
              </a>
              <a href="#daftar" className="btn-ghost h-11 px-4 text-xs">
                <ListChecks className="h-4 w-4" aria-hidden="true" />
                Daftar lengkap
              </a>
            </div>
          </div>

          <aside className="rounded-2xl border border-amber-400/20 bg-canvas/60 p-5 shadow-card">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-amber-400/12 text-amber-300">
              <ShieldAlert className="h-5 w-5" aria-hidden="true" />
            </span>
            <h2 className="mt-3 font-display text-base font-bold text-ink">Baca dulu</h2>
            <p className="mt-2 text-[13px] font-medium leading-relaxed text-ink/85">
              Tidak ada AI Humanizer yang bisa menjamin tulisan lolos AI Detector atau Turnitin.
            </p>
            <p className="mt-2 text-[13px] leading-relaxed text-muted">
              Sebaiknya gunakan alat tersebut untuk memperbaiki keterbacaan, mempertahankan makna,
              dan memastikan tulisan sesuai pemahamanmu sendiri. Aturan integritas akademik di
              kampusmu tetap berlaku.
            </p>
            <p className="mt-3 border-t border-line/[0.07] pt-3 text-[11px] leading-relaxed text-muted/80">
              Daftar ini merupakan pilihan berdasarkan fitur dan perbandingan alat, bukan peringkat
              hasil pengujian independen.
            </p>
          </aside>
        </div>
      </section>

      <section id="rekomendasi" className="mt-14 scroll-mt-24">
        <SectionHeading
          label="Rekomendasi"
          title="Tiga pilihan untuk tugas kuliah"
          description="Menurut kami, mulai dari tiga alat ini: satu untuk susunan kalimat, satu untuk tata bahasa, dan satu untuk kelancaran."
        />
        <div className="mt-7 grid gap-4 md:grid-cols-3">
          {recommendedHumanizers.map((tool) => (
            <article
              key={tool.slug}
              className="card-surface relative flex h-full flex-col overflow-hidden p-5"
              style={accentStyle(tool.accent)}
            >
              <span
                className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)]/70 to-transparent"
                aria-hidden="true"
              />
              <div className="flex items-center justify-between gap-3">
                <span
                  className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.1em]"
                  style={{ color: tool.accent, backgroundColor: `${tool.accent}1f` }}
                >
                  <GraduationCap className="h-3 w-3" aria-hidden="true" />
                  Rekomendasi {tool.recommendation.rank}
                </span>
                <Monogram
                  name={tool.name}
                  accent={tool.accent}
                  accentAlt={tool.accentAlt}
                  size="sm"
                />
              </div>
              <h3 className="mt-4 font-display text-lg font-bold tracking-[-0.02em] text-ink">
                <a
                  href={tool.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline decoration-line/30 outline-offset-4"
                >
                  {tool.name}
                </a>
              </h3>
              <p className="mt-0.5 text-xs text-muted">{tool.domain}</p>
              <p className="mt-3 text-sm font-semibold leading-relaxed text-ink">
                {tool.recommendation.reason}
              </p>
              <p className="mt-1.5 text-[13px] leading-relaxed text-muted">{tool.strength}</p>

              <div className="flex-1" />

              <div className="mt-5 flex items-center gap-2">
                <Link
                  href={`/ai-humanizer/studio?tool=${tool.slug}`}
                  className="inline-flex h-9 flex-1 items-center justify-center gap-1 rounded-lg px-3 text-xs font-semibold transition-all duration-300 hover:brightness-110"
                  style={{
                    color: contrastInk(tool.accent),
                    backgroundImage: `linear-gradient(115deg, ${tool.accent}, ${tool.accentAlt})`,
                    boxShadow: `0 10px 24px -14px ${tool.accent}`,
                  }}
                >
                  Coba di LEGACY
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
                <a
                  href={tool.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Buka situs resmi ${tool.name}`}
                  className="inline-flex h-9 shrink-0 items-center justify-center gap-1 rounded-lg border border-line/12 px-2.5 text-[11px] font-semibold text-muted transition-colors hover:border-line/25 hover:text-ink"
                >
                  Situs resmi
                  <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="daftar" className="mt-14 scroll-mt-24">
        <SectionHeading
          label="Daftar lengkap"
          title="Sepuluh alat, satu tujuan: tulisan lebih rapi"
          description="Setiap alat punya kekuatan berbeda. Pilih berdasarkan masalah yang ingin kamu perbaiki, lalu bandingkan hasilnya sendiri."
        />
        <div className="mt-7 grid gap-4 md:grid-cols-2">
          {humanizerTools.map((tool, index) => (
            <article
              key={tool.slug}
              className="card-surface relative flex h-full flex-col overflow-hidden p-5"
              style={accentStyle(tool.accent)}
            >
              <span
                className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)]/60 to-transparent opacity-70"
                aria-hidden="true"
              />

              <div className="flex items-start gap-3">
                <Monogram
                  name={tool.name}
                  accent={tool.accent}
                  accentAlt={tool.accentAlt}
                />
                <div className="min-w-0 flex-1 pt-0.5">
                  <h3 className="font-display text-[17px] font-bold leading-tight tracking-[-0.02em] text-ink">
                    <a
                      href={tool.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-underline decoration-line/30 outline-offset-4"
                    >
                      {tool.name}
                    </a>
                  </h3>
                  <p className="mt-1 truncate text-xs text-muted">{tool.domain}</p>
                </div>
                <span className="font-display text-[11px] font-bold tabular-nums text-muted/60">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <p className="mt-4 text-[13px] font-semibold leading-relaxed text-ink/90">
                {tool.strength}
              </p>
              <p className="mt-1.5 text-[13px] leading-relaxed text-muted">{tool.description}</p>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {tool.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-line/[0.08] bg-line/[0.03] px-2 py-1 text-[10px] font-medium leading-none text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex-1" />

              <div className="mt-4 space-y-3 border-t border-line/[0.07] pt-4">
                <p className="flex items-start gap-1.5 text-[11px] leading-relaxed text-muted">
                  <Target className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--accent)]" aria-hidden="true" />
                  <span>
                    <span className="font-semibold text-ink/80">Cocok untuk:</span> {tool.bestFor}
                  </span>
                </p>
                <p className="rounded-lg border border-line/[0.07] bg-line/[0.02] px-2.5 py-2 text-[11px] leading-relaxed text-muted">
                  {tool.note}
                </p>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <Link
                    href={`/ai-humanizer/studio?tool=${tool.slug}`}
                    className="inline-flex h-9 flex-1 items-center justify-center gap-1 rounded-lg px-3 text-xs font-semibold transition-all duration-300 hover:brightness-110"
                    style={{
                      color: contrastInk(tool.accent),
                      backgroundImage: `linear-gradient(115deg, ${tool.accent}, ${tool.accentAlt})`,
                      boxShadow: `0 10px 24px -14px ${tool.accent}`,
                    }}
                  >
                    Kunjungi di LEGACY
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                  <a
                    href={tool.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Buka situs resmi ${tool.name}`}
                    className="inline-flex h-9 shrink-0 items-center justify-center gap-1 rounded-lg border border-line/12 px-3 text-[11px] font-semibold text-muted transition-colors hover:border-line/25 hover:text-ink"
                  >
                    Situs resmi
                    <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-14">
        <SectionHeading
          label="Cara memakai"
          title="Tiga langkah sebelum menyerahkan tulisan"
          description="Alat ini membantu di tahap penyuntingan. Keputusan akhir dan tanggung jawab atas isi tetap milikmu."
        />
        <div className="mt-7 grid gap-4 md:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.title} className="card-surface relative p-5">
                <div className="flex items-center justify-between">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-iris/20 bg-iris/10 text-aqua">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="font-display text-2xl font-extrabold text-line/[0.09]">
                    0{index + 1}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-base font-bold text-ink">{step.title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-muted">{step.description}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-4 flex items-start gap-3 rounded-2xl border border-amber-400/20 bg-amber-400/[0.04] p-4">
          <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" aria-hidden="true" />
          <p className="text-[12px] leading-relaxed text-muted">
            Tulis ulang bagian yang masih terasa asing dengan bahasamu sendiri. Tulisan yang baik
            tetap berasal dari pemahamanmu — bukan dari alat yang menyamarkannya.
          </p>
        </div>
      </section>

      <section className="mt-14 grid gap-4 sm:grid-cols-2">
        <Link
          href="/explore-idea"
          className="card-surface group flex items-start justify-between gap-4 p-5 transition-colors hover:border-line/20"
        >
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted">Referensi</p>
            <h2 className="mt-2 font-display text-base font-bold text-ink">
              Butuh sumber untuk tulisanmu?
            </h2>
            <p className="mt-1 text-xs leading-relaxed text-muted">
              Jelajahi 58 sumber referensi resmi di 14 bidang studi.
            </p>
          </div>
          <ArrowRight
            className="mt-1 h-4 w-4 shrink-0 text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-ink"
            aria-hidden="true"
          />
        </Link>
        <Link
          href="/explore"
          className="card-surface group flex items-start justify-between gap-4 p-5 transition-colors hover:border-line/20"
        >
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted">Direktori</p>
            <h2 className="mt-2 font-display text-base font-bold text-ink">
              Butuh tool AI lain?
            </h2>
            <p className="mt-1 text-xs leading-relaxed text-muted">
              Cari dari 150 tool untuk menulis, desain, video, dan data.
            </p>
          </div>
          <ArrowRight
            className="mt-1 h-4 w-4 shrink-0 text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-ink"
            aria-hidden="true"
          />
        </Link>
      </section>
    </div>
  );
}
