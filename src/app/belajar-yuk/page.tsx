import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpenCheck, GraduationCap, KeyRound, Mic, MonitorPlay, RefreshCcw, ShieldCheck, Upload } from "lucide-react";
import { BelajarStudio } from "@/components/belajar/belajar-studio";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { SectionHeading } from "@/components/section-heading";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "MalBelajarYuk — Ruang Belajar Interaktif LEGACY AI",
  description:
    "Buat pelajaran dari topik, rekaman suara, dokumen, atau video YouTube dalam satu halaman. Catatan tersimpan di perangkatmu; AI eksternal opsional dengan kunci milikmu sendiri.",
  alternates: { canonical: "/belajar-yuk" },
  openGraph: {
    title: "MalBelajarYuk — Ruang Belajar Interaktif LEGACY AI",
    description:
      "Ketik topik, rekam, unggah materi, atau tambahkan video YouTube — semua jadi catatan belajar yang rapi di LEGACY AI.",
    url: "/belajar-yuk",
  },
};

const appJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "MalBelajarYuk",
  description:
    "Ruang belajar interaktif: susun pelajaran dari topik, rekaman, dokumen, dan video YouTube dengan penyimpanan lokal.",
  url: `${site.url}/belajar-yuk`,
  applicationCategory: "EducationalApplication",
  operatingSystem: "Web",
  inLanguage: "id",
  offers: { "@type": "Offer", price: "0", priceCurrency: "IDR" },
  isPartOf: { "@type": "WebSite", name: site.name, url: site.url },
};

const FEATURES = [
  {
    icon: GraduationCap,
    title: "Pelajaran dari topik",
    text: "Ketik topik apa saja; materi disusun bertahap dari ringkasan sampai latihan dan kunci jawaban.",
  },
  {
    icon: Mic,
    title: "Rekam & transkrip",
    text: "Rekam penjelasanmu sendiri; di browser yang mendukung, suara langsung diubah menjadi teks.",
  },
  {
    icon: Upload,
    title: "Unggah materi",
    text: "Dokumen teks dibaca isinya, PDF dan gambar bisa dipratinjau, audio dan video langsung bisa diputar.",
  },
  {
    icon: MonitorPlay,
    title: "Video YouTube",
    text: "Tempel tautan video; judul diambil otomatis bila tersedia dan video ditonton tanpa keluar LEGACY.",
  },
  {
    icon: KeyRound,
    title: "Akun AI sendiri",
    text: "Tambahkan kunci API Gemini atau OpenRouter milikmu; kunci disimpan hanya di perangkat ini.",
  },
  {
    icon: RefreshCcw,
    title: "AI saling mencadangkan",
    text: "Jika kuota AI pertama habis, AI cadangan dicoba otomatis; bila semua gagal, mesin lokal LEGACY mengambil alih.",
  },
];

export default function BelajarYukPage() {
  return (
    <div className="container-page pb-16 pt-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appJsonLd) }} />

      <Breadcrumbs items={[{ label: "MalBelajarYuk" }]} />

      <div className="mt-6">
        <BelajarStudio />
      </div>

      <section className="mt-16">
        <SectionHeading
          label="Fitur ruang belajar"
          title="Satu halaman untuk semua cara belajarmu"
          description="Semua catatan tersimpan di perangkatmu (IndexedDB), bukan di server. Bersihkan data situs akan menghapus catatan."
        />
        <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => (
            <div key={feature.title} className="card-surface p-5">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-iris/20 bg-iris/10 text-aqua">
                <feature.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="mt-4 font-display text-sm font-bold text-ink">{feature.title}</h3>
              <p className="mt-1.5 text-[12px] leading-relaxed text-muted">{feature.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-line/10 bg-cell/40 p-5">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-300" aria-hidden="true" />
            <h3 className="font-display text-sm font-bold text-ink">Privasi & batasan</h3>
          </div>
          <ul className="mt-3 space-y-2 text-[12px] leading-relaxed text-muted">
            <li>Kunci API milikmu hanya tersimpan di localStorage perangkat ini dan dipakai langsung dari browser.</li>
            <li>Materi dari mesin lokal adalah kerangka belajar, bukan hasil model AI — selalu verifikasi fakta di sumber tepercaya.</li>
            <li>Transkrip suara memakai fitur pengenalan suara browser dan hasilnya bergantung kualitas audio serta dukungan browser.</li>
          </ul>
        </div>
        <div className="rounded-2xl border border-line/10 bg-cell/40 p-5">
          <div className="flex items-center gap-2">
            <BookOpenCheck className="h-4 w-4 text-aqua" aria-hidden="true" />
            <h3 className="font-display text-sm font-bold text-ink">Lanjutkan perjalanan belajarmu</h3>
          </div>
          <p className="mt-3 text-[12px] leading-relaxed text-muted">
            Butuh referensi resmi untuk tugas? Jelajahi direktori ide dan sumber tepercaya, atau rapikan tulisan
            akhirmu di Ruang Tulis sebelum dikumpulkan.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link href="/explore-idea" className="btn-ghost h-10 px-4 text-xs">
              Explore Idea
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
            <Link href="/ai-humanizer/studio" className="btn-ghost h-10 px-4 text-xs">
              Ruang Tulis
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
