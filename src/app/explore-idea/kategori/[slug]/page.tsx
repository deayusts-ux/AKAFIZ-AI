import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Layers } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { IdeaExploreClient } from "@/components/idea/idea-explore-client";
import { getIdeaCategory, ideaCategories } from "@/data/idea-categories";
import { getIdeasByCategory } from "@/data/ideas";
import { ideaIcons } from "@/lib/idea-icons";
import { contrastInk } from "@/lib/utils";

export const dynamicParams = false;

export function generateStaticParams() {
  return ideaCategories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = getIdeaCategory(slug);
  if (!category) return {};
  return {
    title: `Sumber ${category.name} — Explore Idea`,
    description: category.description,
    alternates: { canonical: `/explore-idea/kategori/${category.slug}` },
    openGraph: {
      title: `Sumber ${category.name} — Explore Idea`,
      description: category.tagline,
      url: `/explore-idea/kategori/${category.slug}`,
    },
  };
}

export default async function IdeaCategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getIdeaCategory(slug);
  if (!category) notFound();

  const Icon = ideaIcons[category.icon];
  const total = getIdeasByCategory(category.slug).length;
  const related = ideaCategories.filter((item) => item.slug !== category.slug).slice(0, 6);

  return (
    <div className="container-page pb-16 pt-8">
      <Breadcrumbs
        items={[
          { label: "Explore Idea", href: "/explore-idea" },
          { label: "Kategori", href: "/explore-idea/kategori" },
          { label: category.name },
        ]}
      />

      <header className="mt-7 flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-4">
          <span
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl"
            style={{
              color: contrastInk(category.accent),
              backgroundImage: `linear-gradient(135deg, ${category.accent}, ${category.accentAlt})`,
              boxShadow: `0 16px 32px -20px ${category.accent}`,
            }}
          >
            <Icon className="h-6 w-6" aria-hidden="true" />
          </span>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">
              Explore Idea · Bidang
            </p>
            <h1 className="mt-1 font-display text-2xl font-extrabold tracking-[-0.03em] text-ink sm:text-4xl">
              {category.name}
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
              {category.description}
            </p>
          </div>
        </div>
        <span className="chip shrink-0">
          <Layers className="h-3.5 w-3.5 text-aqua" aria-hidden="true" />
          {total} sumber
        </span>
      </header>

      <div className="mt-8">
        <IdeaExploreClient fixedCategory={category} />
      </div>

      <section className="mt-12">
        <h2 className="font-display text-lg font-bold text-ink">Bidang lain</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {related.map((item) => (
            <Link
              key={item.slug}
              href={`/explore-idea/kategori/${item.slug}`}
              className="chip transition-colors hover:text-ink"
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: item.accent }}
                aria-hidden="true"
              />
              {item.name}
            </Link>
          ))}
          <Link href="/explore-idea/kategori" className="chip transition-colors hover:text-ink">
            Semua bidang
          </Link>
        </div>
      </section>
    </div>
  );
}
