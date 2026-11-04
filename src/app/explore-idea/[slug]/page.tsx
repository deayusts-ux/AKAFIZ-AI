import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowUpRight,
  CheckCircle2,
  Info,
  Languages,
  Layers,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { IdeaCard } from "@/components/idea/idea-card";
import { IdeaMonogram } from "@/components/idea/idea-monogram";
import { getIdeaCategory } from "@/data/idea-categories";
import { getIdea, ideas, primaryIdeaCategory, relatedIdeas } from "@/data/ideas";
import {
  IDEA_KIND_DESCRIPTION,
  IDEA_KIND_LABEL,
  IDEA_LANGUAGE_LABEL,
  type IdeaSource,
} from "@/lib/idea-types";
import { contrastInk } from "@/lib/utils";

export const dynamicParams = false;

export function generateStaticParams() {
  return ideas.map((idea) => ({ slug: idea.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const idea = getIdea(slug);
  if (!idea) return {};
  return {
    title: `${idea.name} — Explore Idea`,
    description: idea.whatFor,
    alternates: { canonical: `/explore-idea/${idea.slug}` },
    openGraph: {
      title: `${idea.name} — Explore Idea`,
      description: idea.description,
      url: `/explore-idea/${idea.slug}`,
    },
  };
}

function InfoRow({
  icon: Icon,
  label,
  children,
}: {
  icon: typeof Info;
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-3 py-2.5">
      <span className="inline-flex items-center gap-1.5 text-xs text-muted">
        <Icon className="h-3.5 w-3.5" aria-hidden="true" />
        {label}
      </span>
      <span className="text-right text-xs font-medium text-ink">{children}</span>
    </div>
  );
}

export default async function IdeaSourcePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const idea: IdeaSource | undefined = getIdea(slug);
  if (!idea) notFound();

  const category = primaryIdeaCategory(idea);
  if (!category) notFound();

  const related = relatedIdeas(idea);
  const sourceCategories = idea.categories
    .map((item) => getIdeaCategory(item))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  return (
    <div className="container-page pb-16 pt-8">
      <Breadcrumbs
        items={[{ label: "Explore Idea", href: "/explore-idea" }, { label: idea.name }]}
      />

      <header className="card-surface mt-6 p-5 sm:p-7">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex items-start gap-4">
            <IdeaMonogram
              name={idea.name}
              accent={category.accent}
              accentAlt={category.accentAlt}
              size="lg"
            />
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-line/10 bg-line/[0.04] px-2.5 py-1 text-[10px] font-semibold text-muted">
                  {IDEA_KIND_LABEL[idea.kind]}
                </span>
                <span className="rounded-full border border-line/10 bg-line/[0.04] px-2.5 py-1 text-[10px] font-semibold text-muted">
                  {IDEA_LANGUAGE_LABEL[idea.language]}
                </span>
                {idea.featured ? (
                  <span className="rounded-full border border-aqua/25 bg-aqua/10 px-2.5 py-1 text-[10px] font-semibold text-aqua">
                    Pilihan editor
                  </span>
                ) : null}
              </div>
              <h1 className="mt-3 font-display text-2xl font-extrabold tracking-[-0.03em] text-ink sm:text-4xl">
                {idea.name}
              </h1>
              <p className="mt-1 text-xs text-muted">{idea.domain}</p>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink/85">{idea.whatFor}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {sourceCategories.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/explore-idea/kategori/${item.slug}`}
                    className="inline-flex items-center gap-1 rounded-full border border-line/[0.08] bg-line/[0.03] px-2.5 py-1 text-[10px] font-medium text-muted transition-colors hover:text-ink"
                  >
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ backgroundColor: item.accent }}
                      aria-hidden="true"
                    />
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <a
            href={idea.website}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary h-11 shrink-0 px-5 text-xs"
            style={{
              color: contrastInk(category.accent),
              backgroundImage: `linear-gradient(115deg, ${category.accent}, ${category.accentAlt})`,
              boxShadow: `0 14px 30px -18px ${category.accent}`,
            }}
          >
            Buka situs resmi
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </header>

      <div className="mt-6 grid gap-5 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <div className="space-y-5">
          <section className="card-surface p-5 sm:p-6">
            <h2 className="font-display text-lg font-bold text-ink">Tentang sumber ini</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">{idea.description}</p>
            <div className="mt-5 rounded-xl border border-line/[0.08] bg-line/[0.02] p-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted">
                Cocok untuk
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-ink/90">{idea.bestFor}</p>
            </div>
          </section>

          <section className="card-surface p-5 sm:p-6">
            <h2 className="font-display text-lg font-bold text-ink">Yang bisa kamu lakukan</h2>
            <ul className="mt-4 space-y-3">
              {idea.highlights.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-muted">
                  <CheckCircle2
                    className="mt-0.5 h-4 w-4 shrink-0"
                    style={{ color: category.accent }}
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section className="flex flex-wrap gap-2">
            {idea.tags.map((tag) => (
              <span key={tag} className="chip">
                {tag}
              </span>
            ))}
          </section>
        </div>

        <aside className="space-y-4">
          <div className="card-surface p-5">
            <h2 className="text-sm font-bold text-ink">Info ringkas</h2>
            <div className="mt-2 divide-y divide-line/[0.06]">
              <InfoRow icon={Layers} label="Jenis">
                {IDEA_KIND_LABEL[idea.kind]}
              </InfoRow>
              <InfoRow icon={Languages} label="Bahasa">
                {IDEA_LANGUAGE_LABEL[idea.language]}
              </InfoRow>
              <div className="py-2.5">
                <span className="inline-flex items-center gap-1.5 text-xs text-muted">
                  <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
                  Situs resmi
                </span>
                <a
                  href={idea.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 flex items-center gap-1 break-all text-xs font-medium text-aqua hover:underline"
                >
                  {idea.domain}
                  <ArrowUpRight className="h-3 w-3 shrink-0" aria-hidden="true" />
                </a>
              </div>
            </div>
            <p className="mt-3 border-t border-line/[0.06] pt-3 text-[11px] leading-relaxed text-muted">
              {IDEA_KIND_DESCRIPTION[idea.kind]}
            </p>
          </div>

          <div className="card-surface p-5">
            <h2 className="text-sm font-bold text-ink">Kategori</h2>
            <ul className="mt-3 space-y-2">
              {sourceCategories.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/explore-idea/kategori/${item.slug}`}
                    className="flex items-center gap-2 text-xs text-muted transition-colors hover:text-ink"
                  >
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ backgroundColor: item.accent }}
                      aria-hidden="true"
                    />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="card-surface p-5">
            <p className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink">
              <Info className="h-3.5 w-3.5 text-aqua" aria-hidden="true" />
              Catatan
            </p>
            <p className="mt-2 text-[11px] leading-relaxed text-muted">
              LEGACY AI tidak berafiliasi dengan sumber ini. Tautan mengarah ke situs resmi;
              periksa ketentuan, lisensi, dan kebijakan masing-masing penyedia sebelum memakai
              materi atau asetnya.
            </p>
          </div>
        </aside>
      </div>

      {related.length > 0 ? (
        <section className="mt-12">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="section-label">
                <Sparkles className="h-3.5 w-3.5 text-aqua" aria-hidden="true" />
                Sumber terkait
              </p>
              <h2 className="mt-2 font-display text-xl font-bold text-ink">
                Masih tentang {category.name.toLowerCase()}
              </h2>
            </div>
            <Link
              href={`/explore-idea/kategori/${category.slug}`}
              className="btn-ghost h-9 px-4 text-xs"
            >
              Lihat semua
            </Link>
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {related.map((item) => {
              const itemCategory = primaryIdeaCategory(item);
              if (!itemCategory) return null;
              return <IdeaCard key={item.slug} idea={item} category={itemCategory} />;
            })}
          </div>
        </section>
      ) : null}
    </div>
  );
}
