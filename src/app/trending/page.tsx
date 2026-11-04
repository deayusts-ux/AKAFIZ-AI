import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Clock,
  Flame,
  ShieldCheck,
  Sparkles,
  Star,
  TrendingUp,
  Trophy,
} from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { FavoriteButton } from "@/components/favorite-button";
import { PricingBadge } from "@/components/pricing-badge";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { ToolLogo } from "@/components/tool-logo";
import { ToolRow } from "@/components/tool-row";
import { getCategory } from "@/data/categories";
import { trendingTools } from "@/data/tools";
import { categoryIcons } from "@/lib/icons";
import { site } from "@/lib/site";
import { contrastInk } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Trending AI — 20 tool paling populer",
  description:
    "Peringkat tool AI paling populer minggu ini berdasarkan adopsi dan momentum. Lihat top 20, bandingkan harga, dan kunjungi situs resminya.",
  alternates: { canonical: "/trending" },
  openGraph: {
    title: "Trending AI — 20 tool paling populer",
    description:
      "Tool AI yang sedang paling banyak dipakai minggu ini, dikurasi editorial oleh LEGACY AI.",
    url: "/trending",
  },
};

const criteria = [
  "Adopsi nyata dari komunitas kreator, developer, dan tim bisnis.",
  "Keaktifan pengembangan produk dan keandalan layanan.",
  "Kualitas output serta kemudahan penggunaan untuk pemula.",
  "Ketersediaan versi gratis atau freemium yang bisa dicoba.",
];

export default function TrendingPage() {
  const podium = trendingTools.slice(0, 3);
  const rest = trendingTools.slice(3, 20);
  const updated = new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Trending AI — LEGACY AI",
    description: "20 tool AI paling populer minggu ini.",
    url: `${site.url}/trending`,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: trendingTools.slice(0, 20).length,
      itemListElement: trendingTools.slice(0, 20).map((tool, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: tool.name,
        url: `${site.url}/tools/${tool.slug}`,
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="container-page pb-16 pt-8">
        <Breadcrumbs items={[{ label: "Trending" }]} />

        <div className="mt-7 max-w-3xl">
          <p className="section-label">
            <span className="h-px w-5 bg-gradient-to-r from-rose-400 to-amber-300" aria-hidden="true" />
            Peringkat editorial
          </p>
          <h1 className="mt-3 font-display text-3xl font-extrabold tracking-[-0.04em] text-ink sm:text-[2.6rem]">
            Sedang <span className="text-gradient-warm">trending</span>
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-muted sm:text-[15px]">
            Tool AI yang paling banyak dipakai dan diperbincangkan minggu ini. Peringkat disusun
            dari adopsi komunitas, momentum rilis, dan relevansi nyata — bukan iklan berbayar.
          </p>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          <span className="chip">
            <Flame className="h-3.5 w-3.5 text-rose-400" aria-hidden="true" />
            Top 20 minggu ini
          </span>
          <span className="chip">
            <Clock className="h-3.5 w-3.5 text-aqua" aria-hidden="true" />
            Diperbarui {updated}
          </span>
          <Link href="/explore?sort=rating" className="chip hover:text-ink">
            <Star className="h-3.5 w-3.5 text-amber-400" aria-hidden="true" />
            Rating tertinggi
          </Link>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {podium.map((tool, index) => {
            const category = getCategory(tool.category);
            if (!category) return null;
            const Icon = categoryIcons[category.icon];
            return (
              <article
                key={tool.slug}
                className="card-surface group relative flex flex-col overflow-hidden p-5"
                style={{ "--accent": category.accent } as CSSProperties}
              >
                <div
                  className="pointer-events-none absolute -right-10 -top-12 h-36 w-36 rounded-full opacity-20 blur-3xl"
                  style={{ backgroundColor: category.accent }}
                  aria-hidden="true"
                />
                <div className="relative flex items-center justify-between gap-2">
                  <span
                    className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em]"
                    style={{ backgroundColor: `${category.accent}1f`, color: category.accent }}
                  >
                    {index === 0 ? (
                      <Trophy className="h-3 w-3" aria-hidden="true" />
                    ) : (
                      <TrendingUp className="h-3 w-3" aria-hidden="true" />
                    )}
                    Peringkat #{index + 1}
                  </span>
                  <FavoriteButton slug={tool.slug} name={tool.name} />
                </div>

                <div className="relative mt-5 flex items-center gap-3">
                  <ToolLogo
                    slug={tool.slug}
                    name={tool.name}
                    accent={category.accent}
                    size="lg"
                  />
                  <div className="min-w-0">
                    <h2 className="truncate font-display text-lg font-bold tracking-[-0.02em] text-ink">
                      <Link href={`/tools/${tool.slug}`} className="link-underline outline-offset-4">
                        {tool.name}
                      </Link>
                    </h2>
                    <p className="mt-0.5 truncate text-xs text-muted">{tool.company}</p>
                  </div>
                </div>

                <p className="relative mt-4 line-clamp-2 text-[13px] leading-relaxed text-muted">
                  {tool.tagline}
                </p>

                <div className="relative mt-4 flex items-center gap-2 text-[11px] text-muted">
                  <Link
                    href={`/categories/${category.slug}`}
                    className="inline-flex items-center gap-1 transition-colors hover:text-ink"
                  >
                    <Icon className="h-3.5 w-3.5" style={{ color: category.accent }} aria-hidden="true" />
                    {category.shortName}
                  </Link>
                  <span className="h-1 w-1 rounded-full bg-line/20" aria-hidden="true" />
                  <span className="inline-flex items-center gap-1 font-semibold text-ink/80">
                    <Star className="h-3 w-3 fill-amber-400 text-amber-400" aria-hidden="true" />
                    {tool.rating.toFixed(1)}
                  </span>
                </div>

                <div className="relative mt-5">
                  <div className="flex items-center justify-between text-[10px] font-medium text-muted">
                    <span>Skor popularitas</span>
                    <span className="font-semibold text-ink">{tool.popularity}/100</span>
                  </div>
                  <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-line/[0.07]">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${tool.popularity}%`,
                        backgroundImage: `linear-gradient(90deg, ${category.accent}, ${category.accentAlt})`,
                      }}
                    />
                  </div>
                </div>

                <div className="relative mt-auto flex items-center justify-between gap-2 pt-5">
                  <PricingBadge tier={tool.pricing} />
                  <div className="flex gap-2">
                    <a
                      href={tool.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-9 items-center gap-1 rounded-lg px-3 text-xs font-semibold transition-all hover:brightness-110"
                      style={{
                        color: contrastInk(category.accent),
                        backgroundImage: `linear-gradient(115deg, ${category.accent}, ${category.accentAlt})`,
                      }}
                    >
                      Kunjungi
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                    <Link
                      href={`/tools/${tool.slug}`}
                      className="inline-flex h-9 items-center rounded-lg border border-line/10 px-3 text-xs font-semibold text-ink transition-colors hover:bg-line/[0.06]"
                    >
                      Detail
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <Reveal as="section" className="mt-12">
          <SectionHeading
            label="Peringkat 4–20"
            title="Lanjutan daftar trending"
            description="Semua tool tetap dapat dibuka profilnya, disimpan, dan dikunjungi langsung."
            href="/explore"
            linkLabel="Buka Explore"
          />
          <div className="card-surface mt-6 p-2 sm:p-3">
            {rest.map((tool, index) => {
              const category = getCategory(tool.category);
              if (!category) return null;
              return (
                <ToolRow
                  key={tool.slug}
                  tool={tool}
                  category={category}
                  rank={index + 4}
                />
              );
            })}
          </div>
        </Reveal>

        <Reveal as="section" className="mt-14">
          <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
            <div className="card-surface p-6 sm:p-8">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-line/10 bg-line/[0.04] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-muted">
                <ShieldCheck className="h-3 w-3 text-emerald-400" aria-hidden="true" />
                Transparansi
              </span>
              <h2 className="mt-4 font-display text-xl font-bold text-ink">
                Bagaimana peringkat ini disusun?
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Trending bukan daftar berbayar. Kami menggabungkan sinyal adopsi publik dengan
                penilaian editorial, lalu memperbaruinya secara berkala.
              </p>
              <ul className="mt-5 space-y-3">
                {criteria.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-[13px] leading-relaxed text-muted">
                    <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-aqua/15 text-aqua">
                      <span className="h-1 w-1 rounded-full bg-current" aria-hidden="true" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-line/[0.08] bg-gradient-to-br from-plasma/20 via-cell/60 to-iris/15 p-6 sm:p-8">
              <div
                className="pointer-events-none absolute -bottom-16 -right-10 h-40 w-40 rounded-full bg-aqua/25 blur-3xl"
                aria-hidden="true"
              />
              <div className="relative">
                <Sparkles className="h-6 w-6 text-aqua" aria-hidden="true" />
                <h2 className="mt-4 font-display text-xl font-bold text-ink">
                  Mau cari berdasarkan kebutuhan?
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  Filter berdasarkan kategori dan harga untuk menemukan tool yang paling sesuai
                  dengan alur kerjamu.
                </p>
                <Link href="/explore" className="btn-primary mt-6 h-11 w-full text-sm">
                  Buka Explore
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/categories"
                  className="mt-2 flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-line/10 bg-canvas/30 text-sm font-semibold text-ink transition-colors hover:bg-canvas/50"
                >
                  Lihat 20 kategori
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </>
  );
}
