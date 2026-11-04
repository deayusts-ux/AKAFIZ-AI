import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ArrowRight, BadgeCheck, Layers, Star } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CategoryCard } from "@/components/category-card";
import { ExploreClient } from "@/components/explore-client";
import { SectionHeading } from "@/components/section-heading";
import { categories, getCategory } from "@/data/categories";
import { getToolsByCategory } from "@/data/tools";
import { categoryIcons } from "@/lib/icons";
import { site } from "@/lib/site";
import { formatNumber } from "@/lib/utils";

export const dynamicParams = false;

export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) return {};
  const count = getToolsByCategory(slug).length;
  const title = `${category.name} — ${count} tool terbaik`;
  const description = `${category.description} Bandingkan ${count} tool ${category.name} terkurasi: harga, fitur, rating, dan tautan resmi.`;

  return {
    title,
    description,
    alternates: { canonical: `/categories/${category.slug}` },
    openGraph: {
      title,
      description,
      url: `/categories/${category.slug}`,
    },
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  const categoryTools = getToolsByCategory(category.slug);
  const Icon = categoryIcons[category.icon];
  const freeCount = categoryTools.filter((tool) => tool.pricing !== "paid").length;
  const avgRating = categoryTools.length
    ? (categoryTools.reduce((sum, tool) => sum + tool.rating, 0) / categoryTools.length).toFixed(1)
    : "—";
  const related = categories
    .filter((item) => item.slug !== category.slug)
    .sort((a, b) => Number(b.popular) - Number(a.popular))
    .slice(0, 4);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${category.name} — AI FINDER`,
    description: category.description,
    url: `${site.url}/categories/${category.slug}`,
    isPartOf: { "@type": "WebSite", name: site.name, url: site.url },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: categoryTools.length,
      itemListElement: categoryTools.map((tool, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: tool.name,
        url: `${site.url}/tools/${tool.slug}`,
      })),
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Beranda", item: site.url },
      { "@type": "ListItem", position: 2, name: "Kategori", item: `${site.url}/categories` },
      {
        "@type": "ListItem",
        position: 3,
        name: category.name,
        item: `${site.url}/categories/${category.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="container-page pb-16 pt-8">
        <Breadcrumbs
          items={[
            { label: "Kategori", href: "/categories" },
            { label: category.name },
          ]}
        />

        <div className="relative mt-7 overflow-hidden rounded-3xl border border-line/[0.08] bg-cell/50 p-6 backdrop-blur-xl sm:p-8">
          <div
            className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full opacity-20 blur-3xl"
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
            <span
              className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border"
              style={{
                backgroundColor: `${category.accent}18`,
                borderColor: `${category.accent}35`,
                color: category.accent,
              }}
            >
              <Icon className="h-7 w-7" aria-hidden="true" />
            </span>

            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted">
                Kategori · {formatNumber(categoryTools.length)} tool
              </p>
              <h1 className="mt-2 font-display text-3xl font-extrabold tracking-[-0.04em] text-ink sm:text-[2.4rem]">
                {category.name}
              </h1>
              <p className="mt-1.5 text-sm font-medium" style={{ color: category.accent }}>
                {category.tagline}
              </p>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">
                {category.description}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                <span className="chip">
                  <Layers className="h-3.5 w-3.5 text-plasma" aria-hidden="true" />
                  {categoryTools.length} tool
                </span>
                <span className="chip">
                  <BadgeCheck className="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" />
                  {freeCount} gratis / freemium
                </span>
                <span className="chip">
                  <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" aria-hidden="true" />
                  Rating rata-rata {avgRating}
                </span>
              </div>
            </div>

            <Link
              href={`/explore?category=${category.slug}`}
              className="btn-ghost h-10 shrink-0 px-4 text-xs"
            >
              Buka di Explore
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className="mt-10">
          <Suspense
            fallback={
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3" aria-hidden="true">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div
                    key={index}
                    className="h-[19rem] animate-pulse rounded-2xl border border-line/[0.06] bg-cell/40"
                  />
                ))}
              </div>
            }
          >
            <ExploreClient fixedCategory={category} />
          </Suspense>
        </div>

        <section className="mt-16">
          <SectionHeading
            label="Lanjutkan"
            title="Kategori terkait"
            description="Fungsi yang sering dipakai bersama kategori ini."
            href="/categories"
            linkLabel="Semua kategori"
          />
          <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
            {related.map((item) => (
              <CategoryCard
                key={item.slug}
                category={item}
                count={getToolsByCategory(item.slug).length}
              />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
