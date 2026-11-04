import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Building2,
  Check,
  ExternalLink,
  Globe2,
  Info,
  Layers,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  Trophy,
} from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { FavoriteButton } from "@/components/favorite-button";
import { PricingBadge } from "@/components/pricing-badge";
import { SectionHeading } from "@/components/section-heading";
import { ShareButton } from "@/components/share-button";
import { ToolCard } from "@/components/tool-card";
import { ToolLogo } from "@/components/tool-logo";
import { VisitButton } from "@/components/visit-button";
import { getCategory } from "@/data/categories";
import { getTool, getToolsByCategory, newTools, tools } from "@/data/tools";
import { PRICING_DESCRIPTION } from "@/lib/types";
import { categoryIcons } from "@/lib/icons";
import { site } from "@/lib/site";
import { contrastInk, formatNumber, hostname } from "@/lib/utils";

export const dynamicParams = false;

export function generateStaticParams() {
  return tools.map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tool = getTool(slug);
  if (!tool) return {};
  const category = getCategory(tool.category);
  const title = `${tool.name} — ${category?.name ?? "AI"} · harga & tautan resmi`;
  const description = `${tool.tagline} ${tool.description}`.slice(0, 300);

  return {
    title,
    description,
    keywords: [tool.name, ...tool.tags, category?.name ?? "AI"],
    alternates: { canonical: `/tools/${tool.slug}` },
    openGraph: {
      title,
      description,
      url: `/tools/${tool.slug}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = getTool(slug);
  if (!tool) notFound();

  const category = getCategory(tool.category);
  if (!category) notFound();

  const Icon = categoryIcons[category.icon];
  const related = getToolsByCategory(tool.category)
    .filter((item) => item.slug !== tool.slug)
    .sort((a, b) => b.popularity - a.popularity);
  const alternatives = related.slice(0, 4);
  const relatedCards = related.slice(0, 3);
  const isNew = Boolean(tool.isNew);
  const siteHost = hostname(tool.website);
  const ink = contrastInk(category.accent);

  const applicationJsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.name,
    description: tool.description,
    applicationCategory: category.name,
    operatingSystem: "Web",
    url: tool.website,
    sameAs: tool.website,
    publisher: { "@type": "Organization", name: tool.company },
    isPartOf: { "@type": "WebSite", name: site.name, url: site.url },
    keywords: tool.tags.join(", "),
  };
  if (tool.pricing !== "paid") {
    applicationJsonLd.offers = {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      description: tool.priceNote,
    };
  }

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Beranda", item: site.url },
      { "@type": "ListItem", position: 2, name: "Explore", item: `${site.url}/explore` },
      {
        "@type": "ListItem",
        position: 3,
        name: category.name,
        item: `${site.url}/categories/${category.slug}`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: tool.name,
        item: `${site.url}/tools/${tool.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(applicationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="container-page pb-16 pt-8">
        <Breadcrumbs
          items={[
            { label: "Explore", href: "/explore" },
            { label: category.name, href: `/categories/${category.slug}` },
            { label: tool.name },
          ]}
        />

        <div className="relative mt-6 overflow-hidden rounded-3xl border border-line/[0.08] bg-cell/45 p-6 backdrop-blur-xl sm:p-8">
          <div
            className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full opacity-20 blur-3xl"
            style={{ backgroundColor: category.accent }}
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-px"
            style={{
              backgroundImage: `linear-gradient(90deg, transparent, ${category.accent}80, transparent)`,
            }}
            aria-hidden="true"
          />

          <div className="relative flex flex-col gap-5 sm:flex-row sm:items-start">
            <ToolLogo
              slug={tool.slug}
              name={tool.name}
              accent={category.accent}
              size="xl"
              className="shadow-lg"
            />

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-1.5">
                <Link
                  href={`/categories/${category.slug}`}
                  className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.1em]"
                  style={{
                    backgroundColor: `${category.accent}16`,
                    borderColor: `${category.accent}30`,
                    color: category.accent,
                  }}
                >
                  <Icon className="h-3 w-3" aria-hidden="true" />
                  {category.shortName}
                </Link>
                {tool.spotlight ? (
                  <span className="inline-flex items-center gap-1 rounded-full border border-amber-400/25 bg-amber-400/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-amber-300">
                    <Trophy className="h-3 w-3" aria-hidden="true" />
                    Top #{tool.spotlight}
                  </span>
                ) : null}
                {tool.featured ? (
                  <span className="inline-flex items-center gap-1 rounded-full border border-iris/25 bg-iris/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-indigo-300">
                    <Sparkles className="h-3 w-3" aria-hidden="true" />
                    Pilihan editor
                  </span>
                ) : null}
                {isNew ? (
                  <span className="rounded-full border border-aqua/25 bg-aqua/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-aqua">
                    Baru
                  </span>
                ) : null}
              </div>

              <h1 className="mt-3 font-display text-3xl font-extrabold tracking-[-0.04em] text-ink sm:text-[2.75rem]">
                {tool.name}
              </h1>

              <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-muted">
                <span className="font-medium text-ink/80">{tool.company}</span>
                <span className="h-1 w-1 rounded-full bg-line/25" aria-hidden="true" />
                <a
                  href={tool.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 transition-colors hover:text-ink"
                >
                  {siteHost}
                  <ExternalLink className="h-3 w-3" aria-hidden="true" />
                </a>
                <span className="h-1 w-1 rounded-full bg-line/25" aria-hidden="true" />
                <span className="inline-flex items-center gap-1">
                  <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" aria-hidden="true" />
                  <span className="font-semibold text-ink">{tool.rating.toFixed(1)}</span>
                  <span className="text-muted/70">/ 5 editorial</span>
                </span>
              </div>

              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted sm:text-[15px]">
                {tool.tagline}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                <VisitButton tool={tool} className="h-11 px-5" />
                <FavoriteButton
                  slug={tool.slug}
                  name={tool.name}
                  variant="pill"
                  showLabel
                  className="h-11 px-4 text-xs"
                />
                <ShareButton
                  title={tool.name}
                  text={`${tool.name} — ${tool.tagline}`}
                  path={`/tools/${tool.slug}`}
                  className="h-11"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_21rem] xl:gap-8">
          <div className="min-w-0 space-y-5">
            <section className="card-surface p-6 sm:p-7" aria-labelledby="about-tool">
              <h2
                id="about-tool"
                className="font-display text-lg font-bold tracking-[-0.02em] text-ink"
              >
                Tentang {tool.name}
              </h2>
              <p className="mt-3 text-[14px] leading-relaxed text-muted">{tool.description}</p>

              <div className="mt-5 rounded-xl border border-line/[0.08] bg-line/[0.025] p-4">
                <div className="flex items-start gap-2.5">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-iris/10 text-aqua">
                    <Target className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-muted">
                      Paling cocok untuk
                    </p>
                    <p className="mt-1 text-[13px] leading-relaxed text-ink/85">{tool.bestFor}</p>
                  </div>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-1.5">
                {tool.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/explore?q=${encodeURIComponent(tag)}`}
                    className="rounded-md border border-line/[0.08] bg-line/[0.03] px-2 py-1 text-[10px] font-medium text-muted transition-colors hover:border-line/20 hover:text-ink"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </section>

            <section className="card-surface p-6 sm:p-7" aria-labelledby="features-tool">
              <div className="flex items-center justify-between gap-3">
                <h2
                  id="features-tool"
                  className="font-display text-lg font-bold tracking-[-0.02em] text-ink"
                >
                  Fitur utama
                </h2>
                <span className="text-[11px] text-muted">{tool.features.length} fitur</span>
              </div>
              <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                {tool.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2.5 rounded-xl border border-line/[0.06] bg-line/[0.02] p-3 text-[13px] leading-relaxed text-muted"
                  >
                    <span
                      className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full"
                      style={{ backgroundColor: `${category.accent}20`, color: category.accent }}
                    >
                      <Check className="h-2.5 w-2.5" aria-hidden="true" />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
            </section>

            <section className="card-surface p-6 sm:p-7" aria-labelledby="pricing-tool">
              <h2
                id="pricing-tool"
                className="font-display text-lg font-bold tracking-[-0.02em] text-ink"
              >
                Harga & akses
              </h2>
              <div className="mt-4 flex flex-col gap-3 rounded-xl border border-line/[0.08] bg-line/[0.025] p-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <PricingBadge tier={tool.pricing} />
                    <span className="text-sm font-semibold text-ink">{tool.priceNote}</span>
                  </div>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted">
                    {PRICING_DESCRIPTION[tool.pricing]}
                  </p>
                </div>
                <a
                  href={tool.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-9 shrink-0 items-center justify-center gap-1.5 rounded-lg px-3.5 text-xs font-semibold transition-all hover:brightness-110"
                  style={{
                    color: ink,
                    backgroundImage: `linear-gradient(115deg, ${category.accent}, ${category.accentAlt})`,
                  }}
                >
                  Cek harga resmi
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </div>
              <p className="mt-3 flex items-start gap-1.5 text-[11px] leading-relaxed text-muted/80">
                <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                Harga dan fitur dapat berubah sewaktu-waktu. Selalu konfirmasi di situs resmi
                sebelum berlangganan.
              </p>
            </section>
          </div>

          <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
            <section className="card-surface p-5" aria-labelledby="quick-info">
              <h2
                id="quick-info"
                className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted"
              >
                Info cepat
              </h2>
              <div className="mt-4 space-y-3.5">
                <div className="flex items-start gap-2.5">
                  <Layers className="mt-0.5 h-4 w-4 shrink-0 text-muted" aria-hidden="true" />
                  <div className="min-w-0">
                    <p className="text-[10px] font-medium uppercase tracking-[0.08em] text-muted/70">
                      Kategori
                    </p>
                    <Link
                      href={`/categories/${category.slug}`}
                      className="text-[13px] font-medium text-ink transition-colors hover:text-aqua"
                    >
                      {category.name}
                    </Link>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <Building2 className="mt-0.5 h-4 w-4 shrink-0 text-muted" aria-hidden="true" />
                  <div className="min-w-0">
                    <p className="text-[10px] font-medium uppercase tracking-[0.08em] text-muted/70">
                      Perusahaan
                    </p>
                    <p className="text-[13px] font-medium text-ink">{tool.company}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <Globe2 className="mt-0.5 h-4 w-4 shrink-0 text-muted" aria-hidden="true" />
                  <div className="min-w-0">
                    <p className="text-[10px] font-medium uppercase tracking-[0.08em] text-muted/70">
                      Situs resmi
                    </p>
                    <a
                      href={tool.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 break-all text-[13px] font-medium text-aqua transition-colors hover:text-ink"
                    >
                      {siteHost}
                      <ExternalLink className="h-3 w-3 shrink-0" aria-hidden="true" />
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" aria-hidden="true" />
                  <div className="min-w-0">
                    <p className="text-[10px] font-medium uppercase tracking-[0.08em] text-muted/70">
                      Status tautan
                    </p>
                    <p className="text-[13px] font-medium text-ink">Terverifikasi resmi</p>
                  </div>
                </div>
              </div>

              <div className="mt-5 border-t border-line/[0.07] pt-4">
                <div className="flex items-center justify-between text-[11px] font-medium text-muted">
                  <span>Rating editorial</span>
                  <span className="font-semibold text-ink">{tool.rating.toFixed(1)} / 5</span>
                </div>
                <div className="mt-2 flex items-center gap-0.5" aria-hidden="true">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      className={
                        index < Math.round(tool.rating)
                          ? "h-4 w-4 fill-amber-400 text-amber-400"
                          : "h-4 w-4 text-line/20"
                      }
                    />
                  ))}
                </div>
                <div className="mt-4 flex items-center justify-between text-[11px] font-medium text-muted">
                  <span>Popularitas</span>
                  <span className="font-semibold text-ink">{tool.popularity}/100</span>
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-line/[0.07]">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${tool.popularity}%`,
                      backgroundImage: `linear-gradient(90deg, ${category.accent}, ${category.accentAlt})`,
                    }}
                  />
                </div>
              </div>

              <div className="mt-5">
                <FavoriteButton slug={tool.slug} name={tool.name} variant="full" />
              </div>
            </section>

            {alternatives.length > 0 ? (
              <section className="card-surface p-5" aria-labelledby="alternatives">
                <div className="flex items-center justify-between gap-2">
                  <h2
                    id="alternatives"
                    className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted"
                  >
                    Alternatif serupa
                  </h2>
                  <Link
                    href={`/categories/${category.slug}`}
                    className="text-[10px] font-semibold text-aqua transition-colors hover:text-ink"
                  >
                    Semua
                  </Link>
                </div>
                <div className="mt-3 space-y-1">
                  {alternatives.map((alt) => {
                    const altCategory = getCategory(alt.category);
                    if (!altCategory) return null;
                    return (
                      <Link
                        key={alt.slug}
                        href={`/tools/${alt.slug}`}
                        className="group flex items-center gap-2.5 rounded-lg px-1.5 py-2 transition-colors hover:bg-line/[0.04]"
                      >
                        <ToolLogo
                          slug={alt.slug}
                          name={alt.name}
                          accent={altCategory.accent}
                          size="xs"
                        />
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-xs font-semibold text-ink">
                            {alt.name}
                          </span>
                          <span className="block truncate text-[10px] text-muted">
                            {alt.company}
                          </span>
                        </span>
                        <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-muted">
                          <Star className="h-2.5 w-2.5 fill-amber-400 text-amber-400" aria-hidden="true" />
                          {alt.rating.toFixed(1)}
                        </span>
                        <ArrowRight
                          className="h-3 w-3 text-muted/40 transition-transform group-hover:translate-x-0.5 group-hover:text-ink"
                          aria-hidden="true"
                        />
                      </Link>
                    );
                  })}
                </div>
              </section>
            ) : null}

            <div className="rounded-2xl border border-line/[0.07] bg-line/[0.02] p-4">
              <p className="flex items-start gap-1.5 text-[11px] leading-relaxed text-muted">
                <BadgeCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" aria-hidden="true" />
                LEGACY AI tidak menerima pembayaran untuk penempatan. Tautan mengarah langsung ke
                situs resmi {tool.name}.
              </p>
            </div>
          </aside>
        </div>

        {relatedCards.length > 0 ? (
          <section className="mt-14">
            <SectionHeading
              label="Lanjutkan"
              title={`Tool lain di ${category.name}`}
              description="Bandingkan alternatif dengan fungsi serupa sebelum memutuskan."
              href={`/categories/${category.slug}`}
              linkLabel="Lihat semua"
            />
            <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {relatedCards.map((item) => {
                const itemCategory = getCategory(item.category);
                if (!itemCategory) return null;
                return <ToolCard key={item.slug} tool={item} category={itemCategory} />;
              })}
            </div>
          </section>
        ) : (
          <section className="mt-14">
            <div className="card-surface p-6">
              <p className="text-sm text-muted">
                Ini satu-satunya tool di kategori {category.name} saat ini.{" "}
                <Link href="/categories" className="font-semibold text-aqua hover:text-ink">
                  Jelajahi kategori lain
                </Link>
                .
              </p>
            </div>
          </section>
        )}

        <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-line/[0.07] pt-6">
          <p className="text-[11px] text-muted">
            {formatNumber(tools.length)} tool terkurasi · {formatNumber(newTools.length)} tool baru
          </p>
          <div className="flex flex-wrap gap-2">
            <Link href="/explore" className="chip">
              <Sparkles className="h-3.5 w-3.5 text-aqua" aria-hidden="true" />
              Explore semua
            </Link>
            <Link href={`/categories/${category.slug}`} className="chip">
              <Layers className="h-3.5 w-3.5 text-plasma" aria-hidden="true" />
              {category.shortName}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
