import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Heart,
  ListChecks,
  ScanSearch,
  Sparkles,
  TrendingUp,
  Zap,
} from "lucide-react";
import { CategoryCard } from "@/components/category-card";
import { Hero } from "@/components/hero";
import { LogoMarquee } from "@/components/logo-marquee";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { SpotlightCard } from "@/components/spotlight-card";
import { ToolCard } from "@/components/tool-card";
import { ToolRow } from "@/components/tool-row";
import { categories, getCategory } from "@/data/categories";
import {
  featuredTools,
  getToolsByCategory,
  spotlightTools,
  stats,
  tools,
  trendingTools,
} from "@/data/tools";
import { site } from "@/lib/site";
import { formatNumber } from "@/lib/utils";

export const metadata: Metadata = {
  title: { absolute: `${site.name} — ${site.tagline}` },
  alternates: { canonical: "/" },
};

const steps = [
  {
    icon: ScanSearch,
    title: "Ditemukan & dikurasi",
    description:
      "Tim kami memetakan tool AI dari seluruh dunia, lalu memilih yang benar-benar berguna berdasarkan kategori dan kebutuhan nyata.",
  },
  {
    icon: BadgeCheck,
    title: "Tautan diverifikasi",
    description:
      "Setiap tombol menuju situs resmi tool — bukan halaman perantara, bukan link afiliasi tersembunyi. Harga juga kami catat transparan.",
  },
  {
    icon: Heart,
    title: "Disimpan olehmu",
    description:
      "Simpan tool favorit ke koleksi pribadi tanpa akun. Favorit tersimpan aman di browser dan siap diakses kapan saja.",
  },
];

export default function HomePage() {
  const popularCategories = categories.filter((category) => category.popular);
  const topCategories = popularCategories.slice(0, 10);
  const trendingPreview = trendingTools.slice(0, 8);
  const featuredPreview = featuredTools.slice(0, 6);
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.url,
    description: site.description,
    inLanguage: "id-ID",
    potentialAction: {
      "@type": "SearchAction",
      target: `${site.url}/explore?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />

      <Hero />

      <section className="border-y border-line/[0.06] bg-cell/20 py-5" aria-label="Tool populer">
        <div className="container-page mb-3 flex items-center justify-between gap-4">
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted/70">
            {formatNumber(stats.tools)} tool · {stats.categories} kategori · {stats.officialLinks} tautan resmi
          </p>
          <Link
            href="/explore"
            className="inline-flex items-center gap-1 text-[11px] font-semibold text-aqua transition-colors hover:text-ink"
          >
            Semua tool
            <ArrowRight className="h-3 w-3" aria-hidden="true" />
          </Link>
        </div>
        <LogoMarquee />
      </section>

      <div className="container-page space-y-20 py-16 sm:space-y-24 sm:py-20">
        <Reveal as="section">
          <SectionHeading
            label="Jelajahi"
            title="20 kategori, satu direktori"
            description="Temukan AI berdasarkan fungsi kerja — dari asisten chat hingga pembuat aplikasi."
            href="/categories"
            linkLabel="Lihat semua kategori"
          />
          <div className="mt-7 grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-5">
            {topCategories.map((category) => (
              <CategoryCard
                key={category.slug}
                category={category}
                count={getToolsByCategory(category.slug).length}
              />
            ))}
          </div>
          <div className="mt-4 flex justify-center">
            <Link
              href="/categories"
              className="inline-flex items-center gap-2 rounded-full border border-line/10 bg-line/[0.03] px-4 py-2 text-xs font-semibold text-muted transition-colors hover:border-line/20 hover:text-ink"
            >
              <ListChecks className="h-3.5 w-3.5" aria-hidden="true" />
              10 kategori lainnya
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
        </Reveal>

        <Reveal as="section">
          <SectionHeading
            label="Pilihan editor"
            title="Top 3 minggu ini"
            description="Tiga tool yang kami anggap paling kuat saat ini — dipilih editorial, bukan iklan."
            href="/trending"
            linkLabel="Lihat peringkat lengkap"
          />
          <div className="mt-7 grid gap-4 lg:grid-cols-3">
            {spotlightTools.map((tool) => {
              const category = getCategory(tool.category);
              if (!category) return null;
              return (
                <SpotlightCard
                  key={tool.slug}
                  tool={tool}
                  category={category}
                  rank={tool.spotlight ?? 1}
                />
              );
            })}
          </div>
        </Reveal>

        <Reveal as="section">
          <SectionHeading
            label="Trending"
            title="Yang sedang dipakai orang"
            description="Peringkat editorial berdasarkan adopsi dan popularitas lintas komunitas."
            href="/trending"
            linkLabel="Buka halaman Trending"
          />
          <div className="mt-7 grid gap-4 lg:grid-cols-[1fr_20rem]">
            <div className="card-surface p-2 sm:p-3">
              {trendingPreview.map((tool, index) => {
                const category = getCategory(tool.category);
                if (!category) return null;
                return (
                  <ToolRow
                    key={tool.slug}
                    tool={tool}
                    category={category}
                    rank={index + 1}
                  />
                );
              })}
              <Link
                href="/trending"
                className="mt-2 flex items-center justify-center gap-1.5 rounded-xl border border-line/[0.08] py-2.5 text-xs font-semibold text-muted transition-colors hover:border-line/20 hover:text-ink"
              >
                Lihat 20 tool trending
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </div>

            <aside className="card-surface relative flex flex-col justify-between overflow-hidden p-6">
              <div
                className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-plasma/25 blur-3xl"
                aria-hidden="true"
              />
              <div className="relative">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-aqua/20 bg-aqua/[0.07] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-aqua">
                  <TrendingUp className="h-3 w-3" aria-hidden="true" />
                  Momentum
                </span>
                <h3 className="mt-4 font-display text-xl font-bold leading-tight text-ink">
                  Kategori dengan pertumbuhan tercepat
                </h3>
                <div className="mt-5 space-y-2.5">
                  {[
                    { label: "AI Coding", slug: "ai-coding-programming" },
                    { label: "AI Video", slug: "ai-video-generator" },
                    { label: "Otomasi", slug: "ai-productivity-automation" },
                    { label: "Voice & Audio", slug: "ai-voice-audio" },
                  ].map((item, index) => {
                    const category = getCategory(item.slug);
                    if (!category) return null;
                    return (
                      <Link
                        key={item.slug}
                        href={`/categories/${item.slug}`}
                        className="group flex items-center justify-between gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-line/[0.04]"
                      >
                        <span className="flex items-center gap-2.5 text-xs font-medium text-muted group-hover:text-ink">
                          <span className="font-display text-[10px] font-bold text-muted/50">
                            0{index + 1}
                          </span>
                          {item.label}
                        </span>
                        <span className="text-[10px] font-semibold" style={{ color: category.accent }}>
                          {getToolsByCategory(item.slug).length} tool
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
              <Link
                href="/explore?sort=rating"
                className="btn-ghost relative mt-6 h-10 w-full text-xs"
              >
                <Zap className="h-3.5 w-3.5" aria-hidden="true" />
                Jelajahi rating tertinggi
              </Link>
            </aside>
          </div>
        </Reveal>

        <Reveal as="section">
          <SectionHeading
            label="Rekomendasi"
            title="Tool unggulan untuk dimulai"
            description="Pilihan editor yang terbukti stabil, aktif dikembangkan, dan punya versi gratis atau freemium."
            href="/explore?sort=rating"
            linkLabel="Buka semua tool"
          />
          <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {featuredPreview.map((tool) => {
              const category = getCategory(tool.category);
              if (!category) return null;
              return <ToolCard key={tool.slug} tool={tool} category={category} />;
            })}
          </div>
        </Reveal>

        <Reveal as="section">
          <SectionHeading
            label="Kenapa LEGACY AI"
            title="Kurasi yang bisa kamu percaya"
            description="Kami tidak menampilkan semua tool yang ada — hanya yang layak masuk ke alur kerjamu."
            align="center"
          />
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.title} className="card-surface p-6">
                  <div className="flex items-center justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-iris/20 bg-iris/10 text-aqua">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="font-display text-3xl font-extrabold text-line/[0.08]">
                      0{index + 1}
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-base font-bold text-ink">{step.title}</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-muted">{step.description}</p>
                </div>
              );
            })}
          </div>
        </Reveal>

        <Reveal as="section">
          <div className="relative overflow-hidden rounded-3xl border border-line/[0.08] bg-gradient-to-br from-iris/15 via-cell/60 to-aqua/10 px-6 py-12 text-center sm:px-12">
            <div
              className="pointer-events-none absolute inset-0 bg-grid bg-[size:44px_44px] opacity-40 [mask-image:radial-gradient(ellipse_60%_70%_at_50%_50%,black,transparent)]"
              aria-hidden="true"
            />
            <div className="relative mx-auto max-w-2xl">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-line/10 bg-canvas/40 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-muted">
                <Sparkles className="h-3 w-3 text-aqua" aria-hidden="true" />
                {formatNumber(tools.length)} tool siap dijelajahi
              </span>
              <h2 className="mt-5 font-display text-3xl font-extrabold tracking-[-0.03em] text-ink sm:text-4xl">
                Temukan AI berikutnya lebih cepat.
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
                Gunakan pencarian, filter harga, dan kategori untuk sampai ke tool yang tepat
                tanpa membuka puluhan tab.
              </p>
              <div className="mt-7 flex flex-wrap justify-center gap-2.5">
                <Link href="/explore" className="btn-primary h-11 px-5 text-sm">
                  Mulai jelajahi
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link href="/favorites" className="btn-ghost h-11 px-5 text-sm">
                  <Heart className="h-4 w-4" aria-hidden="true" />
                  Buka favorit
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </>
  );
}
