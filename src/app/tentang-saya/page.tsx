import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  BookOpen,
  Clock,
  Code2,
  Compass,
  GitBranch,
  Layers,
  Link2,
  Mail,
  MapPin,
  PenTool,
  Quote,
  SearchCheck,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { ShareButton } from "@/components/share-button";
import { stats } from "@/data/tools";
import { formatNumber } from "@/lib/utils";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Tentang Saya — Akmal Faiz",
  description:
    "Profil Akmal Faiz, AI Engineer & Product Designer di balik LEGACY AI. Cerita, prinsip kurasi, dan proyek open source yang sedang dibangun.",
  alternates: { canonical: "/tentang-saya" },
  openGraph: {
    type: "profile",
    title: "Tentang Saya — Akmal Faiz",
    description:
      "AI Engineer & Product Designer di balik LEGACY AI. Kurasi independen, tautan resmi, dan antarmuka yang mudah dipakai.",
    url: "/tentang-saya",
    images: [
      {
        url: "/profile/akmal-avatar.jpg",
        width: 640,
        height: 640,
        alt: "Akmal Faiz",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Tentang Saya — Akmal Faiz",
    description:
      "AI Engineer & Product Designer di balik LEGACY AI. Kurasi independen, tautan resmi, dan antarmuka yang mudah dipakai.",
    images: ["/profile/akmal-avatar.jpg"],
  },
};

const chapters = [
  {
    number: "01",
    icon: BookOpen,
    title: "Dari catatan pribadi ke direktori",
    paragraphs: [
      "Awalnya saya menyimpan tool AI di catatan pribadi untuk kebutuhan desain dan coding. Ketika daftarnya melewati ratusan entri, masalahnya bukan lagi kekurangan tool — melainkan kejelasan untuk memilih.",
      "LEGACY AI lahir dari kerangka itu: 20 kategori, filter harga, pencarian cepat, dan halaman detail yang menjelaskan untuk siapa sebuah tool benar-benar berguna.",
    ],
  },
  {
    number: "02",
    icon: ShieldCheck,
    title: "Kurasi independen, tanpa link afiliasi",
    paragraphs: [
      "Tidak ada slot berbayar atau link afiliasi tersembunyi. Setiap tombol kunjungan menuju situs resmi produk, dan rating yang tampil adalah penilaian editorial — bukan ulasan pengguna yang dibuat-buat.",
      "Favorit disimpan di browser masing-masing pengunjung, bukan di server. Direktori ini tidak meminta akun, dan tidak melacak koleksi pribadi siapa pun.",
    ],
  },
  {
    number: "03",
    icon: Sparkles,
    title: "Apa yang sedang dibangun",
    paragraphs: [
      "Fokus berikutnya sederhana: memperluas katalog, menjaga tautan dan harga tetap akurat, serta menyempurnakan pengalaman pencarian di layar kecil.",
      "Portal akses ini juga menjadi cara pemilik direktori memantau setiap sesi yang dibuka — tanpa menyimpan kode akses di mana pun.",
    ],
  },
];

const focusAreas = [
  "Menjaga 150 tool tetap relevan dan tautannya hidup.",
  "Merancang alur pencarian yang lebih cepat di mobile.",
  "Menulis catatan tentang tool AI yang benar-benar dipakai.",
];

const skills = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Product Design",
  "AI Workflow",
  "Technical SEO",
];

const projects = [
  {
    icon: Compass,
    name: "LEGACY AI",
    kicker: "Direktori AI terkurasi",
    description:
      "150 tool AI dalam 20 kategori, dilengkapi pencarian, filter harga, favorit lokal, dan halaman detail yang menghubungkan langsung ke situs resmi.",
    stack: "Next.js · TypeScript · Tailwind CSS",
    status: "Open source",
    href: "https://github.com/deayusts-ux/AKAFIZ-AI",
  },
  {
    icon: PenTool,
    name: "WebAkmal",
    kicker: "Website personal pertama",
    description:
      "Titik awal eksplorasi frontend: latihan menyusun layout, komponen, dan publikasi web pribadi sebelum membangun LEGACY AI.",
    stack: "TypeScript",
    status: "Repositori",
    href: "https://github.com/deayusts-ux/webakmal",
  },
  {
    icon: GitBranch,
    name: "GitHub Archive",
    kicker: "Eksperimen & proyek publik",
    description:
      "Kumpulan repositori publik lain — eksperimen web, utilitas kecil, dan latihan produk yang terus bertambah.",
    stack: "deayusts-ux",
    status: "6 repo publik",
    href: "https://github.com/deayusts-ux?tab=repositories",
  },
];

const socialLinks = [
  {
    icon: GitBranch,
    label: "GitHub",
    value: "@deayusts-ux",
    href: "https://github.com/deayusts-ux",
  },
  {
    icon: Mail,
    label: "Email langsung",
    value: "deayusts@gmail.com",
    href: "mailto:deayusts@gmail.com?subject=Halo%20Akmal%20%E2%80%94%20LEGACY%20AI",
  },
  {
    icon: Code2,
    label: "Kode LEGACY AI",
    value: "AKAFIZ-AI",
    href: "https://github.com/deayusts-ux/AKAFIZ-AI",
  },
];

export default function TentangSayaPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    name: "Tentang Saya — Akmal Faiz",
    url: `${site.url}/tentang-saya`,
    description:
      "Profil Akmal Faiz, AI Engineer & Product Designer di balik direktori LEGACY AI.",
    dateModified: "2026-11-04",
    mainEntity: {
      "@type": "Person",
      name: "Akmal Faiz",
      alternateName: "deayusts-ux",
      jobTitle: "AI Engineer & Product Designer",
      email: "mailto:deayusts@gmail.com",
      url: `${site.url}/tentang-saya`,
      image: `${site.url}/profile/akmal-avatar.jpg`,
      sameAs: ["https://github.com/deayusts-ux"],
      knowsAbout: ["Artificial Intelligence", "Product Design", "Next.js", "TypeScript"],
    },
    isPartOf: { "@type": "WebSite", name: site.name, url: site.url },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="container-page pb-16 pt-8">
        <Breadcrumbs items={[{ label: "Tentang Saya" }]} />

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-plasma/25 bg-plasma/[0.08] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-[#d8b4fe]">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-aqua opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-aqua" />
            </span>
            Creator spotlight · Biografi resmi
          </span>
          <div className="flex items-center gap-3 text-[11px] font-medium text-muted">
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-aqua" aria-hidden="true" />
              4 menit baca
            </span>
            <span aria-hidden="true" className="h-1 w-1 rounded-full bg-muted/40" />
            <span>Diperbarui November 2026</span>
          </div>
        </div>

        <header className="mt-5 max-w-4xl">
          <h1 className="font-display text-3xl font-extrabold leading-[1.06] tracking-[-0.045em] text-ink sm:text-5xl lg:text-[3.6rem]">
            Membangun direktori AI yang{" "}
            <span className="text-gradient">jujur, cepat, dan bisa dipakai.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
            Di balik LEGACY AI: cara saya mengurasi {formatNumber(stats.tools)} tool, menjaga
            tautan tetap resmi, dan merancang antarmuka yang tidak membuat orang tersesat.
          </p>
        </header>

        <Reveal as="section" className="relative mt-8 overflow-hidden rounded-3xl border border-line/[0.08] bg-cell/45 p-5 sm:p-7">
          <div className="ambient-orb -right-20 -top-24 h-64 w-64 bg-iris/25" aria-hidden="true" />
          <div className="ambient-orb -bottom-24 -left-16 h-56 w-56 bg-aqua/15" aria-hidden="true" />
          <div className="relative grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-5">
              <div className="relative shrink-0 self-start sm:self-auto">
                <div
                  className="absolute -inset-1 rounded-[1.35rem] bg-gradient-to-br from-iris via-plasma to-aqua opacity-45 blur-md"
                  aria-hidden="true"
                />
                <Image
                  src="/profile/akmal-avatar.jpg"
                  alt="Foto profil Akmal Faiz"
                  width={640}
                  height={640}
                  priority
                  className="relative h-24 w-24 rounded-2xl border border-white/15 bg-white object-cover shadow-xl"
                />
                <span className="absolute -bottom-1.5 -right-1.5 flex h-7 w-7 items-center justify-center rounded-full border border-canvas bg-canvas text-aqua">
                  <BadgeCheck className="h-4 w-4" aria-hidden="true" />
                </span>
              </div>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="font-display text-2xl font-extrabold tracking-[-0.03em] text-ink">
                    Akmal Faiz
                  </h2>
                  <span className="rounded-full border border-aqua/20 bg-aqua/[0.08] px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.12em] text-aqua">
                    Kreator utama
                  </span>
                </div>
                <p className="mt-1 text-sm font-semibold text-[#c4b5fd]">
                  AI Engineer &amp; Product Designer
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px] text-muted">
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="h-3 w-3" aria-hidden="true" />
                    Indonesia
                  </span>
                  <span aria-hidden="true" className="h-1 w-1 rounded-full bg-muted/40" />
                  <span className="inline-flex items-center gap-1">
                    <GitBranch className="h-3 w-3" aria-hidden="true" />
                    deayusts-ux
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 rounded-2xl border border-line/[0.08] bg-canvas/35 p-2">
              {[
                { value: formatNumber(stats.tools), label: "Tool terkurasi" },
                { value: String(stats.categories), label: "Kategori" },
                { value: stats.officialLinks, label: "Tautan resmi" },
              ].map((item) => (
                <div key={item.label} className="flex flex-col items-center justify-center px-1 py-2 text-center">
                  <span className="font-display text-xl font-extrabold text-ink sm:text-2xl">
                    {item.value}
                  </span>
                  <span className="mt-1 text-[9px] font-semibold uppercase tracking-[0.1em] text-muted">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mt-5 flex flex-wrap gap-2 border-t border-line/[0.07] pt-5">
            <ShareButton
              title="Tentang Akmal Faiz — LEGACY AI"
              text="Profil dan cerita di balik direktori AI LEGACY."
              path="/tentang-saya"
              className="h-10 px-4 text-xs"
            />
            <a
              href="mailto:deayusts@gmail.com?subject=Halo%20Akmal%20%E2%80%94%20LEGACY%20AI"
              className="btn-primary h-10 px-4 text-xs"
            >
              <Mail className="h-3.5 w-3.5" aria-hidden="true" />
              Kirim email
            </a>
            <a
              href="https://github.com/deayusts-ux"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost h-10 px-4 text-xs"
            >
              <GitBranch className="h-3.5 w-3.5" aria-hidden="true" />
              GitHub
            </a>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.55fr_0.85fr] lg:gap-12">
          <div>
            <Reveal as="section" className="card-surface p-6 sm:p-8">
              <p className="section-label">
                <span className="h-px w-5 bg-gradient-to-r from-iris to-aqua" aria-hidden="true" />
                Cerita
              </p>
              <h2 className="mt-3 font-display text-2xl font-bold tracking-[-0.03em] text-ink sm:text-3xl">
                Kenapa direktori ini ada
              </h2>
              <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted">
                <p>
                  LEGACY AI dimulai dari satu masalah sederhana: terlalu banyak daftar tool AI yang
                  panjang, usang, dan penuh tautan perantara. Saya ingin satu tempat yang bisa
                  dijawab dengan cepat — tool apa yang tepat untuk pekerjaan ini, berapa harganya,
                  dan di mana situs resminya.
                </p>
                <p>
                  Saya Akmal Faiz, AI engineer dan product designer asal Indonesia. Saya membangun
                  antarmuka dan produk digital, lalu merapikan riset AI harian menjadi katalog yang
                  bisa dipakai orang lain. Bukan agregator otomatis: setiap tool dipilih berdasarkan
                  kegunaan, dicek ke domain resminya, dan diberi label harga yang bisa dibaca dalam
                  sekali lihat.
                </p>
              </div>

              <figure className="relative mt-6 overflow-hidden rounded-2xl border border-line/[0.08] bg-canvas/40 p-5 sm:p-6">
                <span
                  className="absolute inset-y-0 left-0 w-1.5 bg-gradient-to-b from-aqua via-iris to-plasma"
                  aria-hidden="true"
                />
                <Quote className="h-7 w-7 text-aqua/50" aria-hidden="true" />
                <blockquote className="mt-2 font-display text-lg font-semibold leading-snug text-ink sm:text-xl">
                  “Kecerdasan buatan bukan pengganti manusia, melainkan pengungkit potensi terbaik
                  yang kita miliki.”
                </blockquote>
                <figcaption className="mt-4 flex flex-wrap items-center justify-between gap-2 text-[11px]">
                  <span className="font-semibold text-aqua">— Akmal Faiz</span>
                  <span className="font-mono uppercase tracking-[0.12em] text-muted/70">
                    Legacy manifesto // 01
                  </span>
                </figcaption>
              </figure>
            </Reveal>

            <section className="mt-10">
              <SectionHeading
                label="Perjalanan"
                title="Tiga bab yang membentuk cara kerja saya"
                description="Dari catatan pribadi sampai portal yang bisa diakses tim dan komunitas."
              />
              <div className="mt-6 space-y-4">
                {chapters.map((chapter, index) => {
                  const Icon = chapter.icon;
                  return (
                    <Reveal
                      key={chapter.number}
                      as="article"
                      delay={index * 60}
                      className="card-surface p-5 sm:p-6"
                    >
                      <div className="flex items-start gap-4">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-iris/25 bg-iris/10 font-display text-xs font-extrabold text-[#c4b5fd]">
                          {chapter.number}
                        </span>
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="font-display text-base font-bold text-ink">
                              {chapter.title}
                            </h3>
                            <Icon className="h-3.5 w-3.5 text-aqua" aria-hidden="true" />
                          </div>
                          {chapter.paragraphs.map((paragraph) => (
                            <p
                              key={paragraph}
                              className="mt-2 text-[13px] leading-relaxed text-muted"
                            >
                              {paragraph}
                            </p>
                          ))}
                        </div>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </section>
          </div>

          <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
            <div className="card-surface p-5">
              <p className="section-label">
                <span className="h-px w-5 bg-gradient-to-r from-aqua to-iris" aria-hidden="true" />
                Fokus saat ini
              </p>
              <ul className="mt-4 space-y-3">
                {focusAreas.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-[12px] leading-relaxed text-muted">
                    <SearchCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-aqua" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="card-surface p-5">
              <p className="section-label">
                <span className="h-px w-5 bg-gradient-to-r from-iris to-plasma" aria-hidden="true" />
                Keahlian
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {skills.map((skill) => (
                  <span key={skill} className="chip px-2.5 py-1 text-[11px]">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="card-surface p-5">
              <p className="section-label">
                <span className="h-px w-5 bg-gradient-to-r from-plasma to-aqua" aria-hidden="true" />
                Terhubung
              </p>
              <ul className="mt-3 space-y-1">
                {socialLinks.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        {...(item.href.startsWith("http")
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                        className="group flex items-center gap-3 rounded-xl px-2 py-2.5 transition-colors hover:bg-line/[0.04]"
                      >
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-line/10 bg-line/[0.04] text-muted transition-colors group-hover:text-aqua">
                          <Icon className="h-4 w-4" aria-hidden="true" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-[12px] font-semibold text-ink">
                            {item.label}
                          </span>
                          <span className="block truncate text-[11px] text-muted">{item.value}</span>
                        </span>
                        <ArrowUpRight
                          className="h-3.5 w-3.5 shrink-0 text-muted/60 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-aqua"
                          aria-hidden="true"
                        />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-line/[0.08] bg-gradient-to-br from-iris/15 via-cell/50 to-aqua/10 p-5">
              <Layers className="h-5 w-5 text-aqua" aria-hidden="true" />
              <p className="mt-3 font-display text-sm font-bold text-ink">Lihat cara kerjanya</p>
              <p className="mt-1.5 text-[12px] leading-relaxed text-muted">
                Metodologi kurasi, kriteria tool, dan kebijakan tautan dijelaskan terbuka.
              </p>
              <Link
                href="/about"
                className="mt-3 inline-flex items-center gap-1 text-[11px] font-semibold text-aqua transition-colors hover:text-ink"
              >
                Baca metodologi
                <ArrowRight className="h-3 w-3" aria-hidden="true" />
              </Link>
            </div>
          </aside>
        </div>

        <Reveal as="section" className="mt-14">
          <SectionHeading
            label="Proyek"
            title="Sorotan proyek nyata"
            description="Repositori dan produk yang bisa kamu buka, bukan mockup di balik layar."
            href="https://github.com/deayusts-ux"
            linkLabel="Semua repo"
          />
          <div className="mt-7 grid gap-4 md:grid-cols-3">
            {projects.map((project) => {
              const Icon = project.icon;
              return (
                <a
                  key={project.name}
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-surface group flex flex-col p-5 transition-colors hover:border-iris/30"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-iris/20 bg-iris/10 text-aqua">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="rounded-full border border-line/10 bg-line/[0.04] px-2 py-1 text-[9px] font-bold uppercase tracking-[0.1em] text-muted">
                      {project.status}
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-base font-bold text-ink">{project.name}</h3>
                  <p className="mt-0.5 text-[11px] font-semibold text-[#c4b5fd]">{project.kicker}</p>
                  <p className="mt-2 flex-1 text-[12px] leading-relaxed text-muted">
                    {project.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between gap-2 border-t border-line/[0.07] pt-3">
                    <span className="truncate text-[10px] font-medium uppercase tracking-[0.08em] text-muted/70">
                      {project.stack}
                    </span>
                    <ArrowUpRight
                      className="h-3.5 w-3.5 shrink-0 text-muted transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-aqua"
                      aria-hidden="true"
                    />
                  </div>
                </a>
              );
            })}
          </div>
        </Reveal>

        <Reveal as="section" className="mt-14">
          <div className="relative overflow-hidden rounded-3xl border border-line/[0.08] bg-gradient-to-br from-iris/15 via-cell/50 to-plasma/10 p-6 text-center sm:p-10">
            <div className="ambient-orb -right-16 -top-20 h-52 w-52 bg-aqua/20" aria-hidden="true" />
            <div className="relative mx-auto max-w-xl">
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-iris/25 bg-iris/10 text-aqua">
                <Link2 className="h-5 w-5" aria-hidden="true" />
              </span>
              <h2 className="mt-4 font-display text-2xl font-bold tracking-[-0.03em] text-ink">
                Suka dengan direktori ini?
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Bagikan halaman ini, kirim masukan tool, atau hubungi saya langsung lewat email.
                Setiap masukan membantu direktori tetap akurat.
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
                <ShareButton
                  title="Tentang Akmal Faiz — LEGACY AI"
                  text="Profil dan cerita di balik direktori AI LEGACY."
                  path="/tentang-saya"
                  className="h-11 px-5 text-sm"
                />
                <a
                  href="mailto:deayusts@gmail.com?subject=Masukan%20untuk%20LEGACY%20AI"
                  className="btn-primary h-11 px-5 text-sm"
                >
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  Kirim masukan
                </a>
                <Link href="/explore" className="btn-ghost h-11 px-5 text-sm">
                  Jelajahi direktori
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal as="section" className="mt-8">
          <div className="flex flex-col items-center rounded-2xl border border-line/[0.07] bg-canvas/40 px-6 py-7 text-center">
            <span className="h-2 w-2 rounded-full bg-aqua" aria-hidden="true" />
            <p className="mt-3 max-w-md text-[12px] italic leading-relaxed text-muted">
              “Teknologi terbaik adalah yang terasa sederhana — membantu kita berpikir lebih jernih
              dan berkarya lebih cepat.”
            </p>
            <span className="mt-3 text-[9px] font-bold uppercase tracking-[0.18em] text-muted/70">
              LEGACY AI Portal · Editorial edition
            </span>
          </div>
        </Reveal>
      </div>
    </>
  );
}
