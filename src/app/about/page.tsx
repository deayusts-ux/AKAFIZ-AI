import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Check,
  Compass,
  Gauge,
  Heart,
  Link2,
  RefreshCw,
  SearchCheck,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Faq } from "@/components/faq";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { categories } from "@/data/categories";
import { stats } from "@/data/tools";
import { site } from "@/lib/site";
import { formatNumber } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Tentang LEGACY AI — metodologi & kurasi",
  description:
    "LEGACY AI adalah direktori AI independen: 150 tool, 20 kategori, tautan resmi terverifikasi, harga transparan, dan favorit lokal tanpa akun. Pelajari metodologi kurasi kami.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "Tentang LEGACY AI — metodologi & kurasi",
    description:
      "Bagaimana kami memilih tool AI, memverifikasi tautan resmi, dan menyusun peringkat editorial.",
    url: "/about",
  },
};

const curationSteps = [
  {
    icon: SearchCheck,
    title: "Pemetaan kategori",
    description:
      "Kami memetakan lanskap tool AI berdasarkan fungsi kerja nyata — bukan sekadar daftar panjang tanpa konteks.",
  },
  {
    icon: Link2,
    title: "Verifikasi tautan resmi",
    description:
      "Setiap tool dicek langsung ke domain resminya. Tidak ada link perantara, halaman unduhan palsu, atau tautan mati.",
  },
  {
    icon: Gauge,
    title: "Penilaian kegunaan",
    description:
      "Kualitas output, kestabilan, kecepatan, dan kemudahan onboarding menjadi dasar rating editorial 1–5.",
  },
  {
    icon: RefreshCw,
    title: "Pembaruan berkala",
    description:
      "Harga, fitur, dan status tool berubah cepat. Direktori ditinjau ulang secara berkala agar tetap relevan.",
  },
];

const criteria = [
  "Masih aktif dikembangkan dan dapat digunakan publik.",
  "Memiliki halaman resmi dengan informasi produk yang jelas.",
  "Memberi nilai nyata untuk minimal satu alur kerja profesional.",
  "Model harga transparan — gratis, freemium, atau berbayar.",
  "Bukan sekadar demo tanpa produk yang bisa dicoba.",
];

const faqs = [
  {
    question: "Apakah semua tool di LEGACY AI gratis?",
    answer:
      "Tidak. Setiap tool diberi label Gratis, Freemium, atau Berbayar. Saat ini sekitar " +
      stats.free +
      " dari " +
      stats.tools +
      " tool memiliki versi gratis atau freemium yang bisa dicoba sebelum berlangganan.",
  },
  {
    question: "Apakah LEGACY AI memakai link afiliasi?",
    answer:
      "Tidak. Semua tombol kunjungan mengarah langsung ke situs resmi tool. Kami tidak menempatkan link afiliasi tersembunyi dan tidak menerima bayaran untuk peringkat.",
  },
  {
    question: "Bagaimana rating tool dihitung?",
    answer:
      "Rating adalah penilaian editorial berdasarkan kualitas output, keandalan layanan, kecepatan, dan kegunaan untuk pemula maupun profesional. Ini bukan rating ulasan pengguna, jadi tidak menampilkan jumlah ulasan palsu.",
  },
  {
    question: "Apakah favorit saya tersimpan di server?",
    answer:
      "Tidak. Favorit disimpan di localStorage browser perangkatmu. Tidak ada akun, tidak ada pelacakan lintas perangkat, dan data tidak dikirim ke server kami.",
  },
  {
    question: "Seberapa sering direktori diperbarui?",
    answer:
      "Kami meninjau tool baru dan perubahan harga secara berkala. Halaman Trending dan spotlight diperbarui mengikuti momentum adopsi. Seluruh data direktori dikelola dari satu katalog terpusat agar pembaruan tetap konsisten.",
  },
  {
    question: "Apakah saya bisa menambahkan tool baru?",
    answer:
      "Direktori dirancang agar mudah diperbarui dari satu sumber data. Tool baru ditambahkan melalui katalog internal setelah lolos kriteria kurasi yang sama.",
  },
];

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "Tentang LEGACY AI",
    url: `${site.url}/about`,
    description: site.description,
    isPartOf: { "@type": "WebSite", name: site.name, url: site.url },
    about: {
      "@type": "Organization",
      name: site.name,
      url: site.url,
      description: site.description,
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="container-page pb-16 pt-8">
        <Breadcrumbs items={[{ label: "Tentang" }]} />

        <div className="relative mt-7 overflow-hidden rounded-3xl border border-line/[0.08] bg-cell/40 px-6 py-12 sm:px-10 sm:py-16">
          <div
            className="ambient-orb -right-24 -top-32 h-80 w-80 bg-plasma/25"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-grid bg-[size:48px_48px] opacity-40 [mask-image:radial-gradient(ellipse_60%_70%_at_50%_20%,black,transparent)]"
            aria-hidden="true"
          />
          <div className="relative max-w-3xl">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-aqua/20 bg-aqua/[0.06] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-aqua">
              <Sparkles className="h-3 w-3" aria-hidden="true" />
              Kurasi independen
            </span>
            <h1 className="mt-5 font-display text-3xl font-extrabold leading-[1.08] tracking-[-0.04em] text-ink sm:text-5xl">
              Direktori AI untuk <span className="text-gradient">keputusan cepat</span>, bukan
              daftar tanpa akhir.
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
              LEGACY AI membantu kreator, developer, dan tim bisnis menemukan tool yang tepat
              tanpa membuka puluhan tab. Setiap tool dikurasi berdasarkan kegunaan nyata, dengan
              tautan resmi dan harga yang transparan.
            </p>
            <div className="mt-7 flex flex-wrap gap-2">
              <span className="chip">
                <Compass className="h-3.5 w-3.5 text-plasma" aria-hidden="true" />
                {formatNumber(stats.tools)} tool
              </span>
              <span className="chip">
                <BadgeCheck className="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" />
                {stats.categories} kategori
              </span>
              <span className="chip">
                <ShieldCheck className="h-3.5 w-3.5 text-aqua" aria-hidden="true" />
                {stats.officialLinks} tautan resmi
              </span>
            </div>
            <div className="mt-8 flex flex-wrap gap-2.5">
              <Link href="/explore" className="btn-primary h-11 px-5 text-sm">
                Jelajahi direktori
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link href="/categories" className="btn-ghost h-11 px-5 text-sm">
                Lihat kategori
              </Link>
            </div>
          </div>
        </div>

        <Reveal as="section" className="mt-16">
          <SectionHeading
            label="Prinsip"
            title="Kenapa direktori ini ada"
            description="Internet penuh dengan daftar AI yang panjang, usang, dan penuh tautan perantara. Kami ingin membuat satu sumber yang bisa dipercaya."
          />
          <div className="mt-7 grid gap-4 md:grid-cols-3">
            {[
              {
                icon: ShieldCheck,
                title: "Independen",
                text: "Tidak ada slot berbayar, tidak ada peringkat yang bisa dibeli. Posisi ditentukan oleh kegunaan dan adopsi nyata.",
              },
              {
                icon: Link2,
                title: "Langsung ke sumber",
                text: "Setiap tombol kunjungan menuju domain resmi produk. Kamu tidak perlu melewati halaman perantara.",
              },
              {
                icon: Gauge,
                title: "Transparan",
                text: "Model harga dan catatan harga ditampilkan apa adanya. Rating dijelaskan sebagai penilaian editorial, bukan ulasan pengguna.",
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="card-surface p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-iris/20 bg-iris/10 text-aqua">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 font-display text-base font-bold text-ink">{item.title}</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-muted">{item.text}</p>
                </div>
              );
            })}
          </div>
        </Reveal>

        <Reveal as="section" className="mt-16">
          <SectionHeading
            label="Metodologi"
            title="Cara kami mengurasi"
            description="Empat langkah yang dilalui setiap tool sebelum tampil di direktori."
          />
          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            {curationSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.title} className="card-surface flex gap-4 p-5 sm:p-6">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-line/10 bg-line/[0.04] text-aqua">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-display text-[11px] font-bold text-muted/60">
                        LANGKAH 0{index + 1}
                      </span>
                    </div>
                    <h3 className="mt-1 font-display text-[15px] font-bold text-ink">{step.title}</h3>
                    <p className="mt-1.5 text-[13px] leading-relaxed text-muted">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>

        <Reveal as="section" className="mt-16">
          <div className="grid gap-4 lg:grid-cols-[1fr_1.1fr]">
            <div className="card-surface p-6 sm:p-8">
              <p className="section-label">
                <span className="h-px w-5 bg-gradient-to-r from-emerald-400 to-aqua" aria-hidden="true" />
                Kriteria
              </p>
              <h2 className="mt-3 font-display text-2xl font-bold tracking-[-0.03em] text-ink">
                Apa yang lolos kurasi?
              </h2>
              <p className="mt-2.5 text-sm leading-relaxed text-muted">
                Tidak semua tool AI masuk direktori. Setidaknya satu alur kerja nyata harus
                terbantu, dan produknya harus bisa diakses publik.
              </p>
              <ul className="mt-6 space-y-3">
                {criteria.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-[13px] leading-relaxed text-muted">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-400/12 text-emerald-400">
                      <Check className="h-3 w-3" aria-hidden="true" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-line/[0.08] bg-gradient-to-br from-iris/15 via-cell/60 to-plasma/10 p-6 sm:p-8">
              <div
                className="pointer-events-none absolute -bottom-20 -right-10 h-52 w-52 rounded-full bg-aqua/20 blur-3xl"
                aria-hidden="true"
              />
              <div className="relative">
                <Heart className="h-6 w-6 text-rose-400" aria-hidden="true" />
                <h2 className="mt-4 font-display text-2xl font-bold tracking-[-0.03em] text-ink">
                  Favorit tanpa akun
                </h2>
                <p className="mt-2.5 text-sm leading-relaxed text-muted">
                  Simpan tool ke koleksi pribadi langsung dari kartu mana pun. Favorit tersimpan
                  di browser perangkatmu, tersinkron antar tab, dan tidak dikirim ke server.
                </p>
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-line/[0.08] bg-canvas/30 p-4">
                    <p className="font-display text-2xl font-extrabold text-ink">{stats.tools}</p>
                    <p className="mt-0.5 text-[11px] text-muted">Tool terkurasi</p>
                  </div>
                  <div className="rounded-xl border border-line/[0.08] bg-canvas/30 p-4">
                    <p className="font-display text-2xl font-extrabold text-ink">
                      {categories.length}
                    </p>
                    <p className="mt-0.5 text-[11px] text-muted">Kategori</p>
                  </div>
                  <div className="rounded-xl border border-line/[0.08] bg-canvas/30 p-4">
                    <p className="font-display text-2xl font-extrabold text-ink">{stats.free}</p>
                    <p className="mt-0.5 text-[11px] text-muted">Gratis / freemium</p>
                  </div>
                  <div className="rounded-xl border border-line/[0.08] bg-canvas/30 p-4">
                    <p className="font-display text-2xl font-extrabold text-ink">0</p>
                    <p className="mt-0.5 text-[11px] text-muted">Link afiliasi</p>
                  </div>
                </div>
                <Link href="/favorites" className="btn-ghost mt-5 h-10 w-full text-xs">
                  <Heart className="h-3.5 w-3.5" aria-hidden="true" />
                  Lihat favoritku
                </Link>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal as="section" className="mt-16">
          <SectionHeading
            label="FAQ"
            title="Pertanyaan yang sering diajukan"
            description="Hal-hal penting tentang data, tautan, dan cara kerja direktori."
            align="center"
          />
          <Faq items={faqs} className="mx-auto mt-8 max-w-3xl" />
        </Reveal>

        <Reveal as="section" className="mt-14">
          <div className="card-surface flex flex-col items-start gap-5 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div>
              <h2 className="font-display text-lg font-bold text-ink">Siap menemukan tool yang tepat?</h2>
              <p className="mt-1.5 max-w-lg text-sm leading-relaxed text-muted">
                Mulai dari {stats.tools} tool terkurasi, atau telusuri kategori sesuai kebutuhanmu.
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-2">
              <Link href="/explore" className="btn-primary h-10 px-4 text-xs">
                Buka Explore
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
              <Link href="/trending" className="btn-ghost h-10 px-4 text-xs">
                Lihat Trending
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </>
  );
}
