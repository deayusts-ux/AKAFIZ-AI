import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Layers, Sparkles, Wand2 } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CategoryCard } from "@/components/category-card";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { categories } from "@/data/categories";
import { getToolsByCategory, stats } from "@/data/tools";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Kategori AI — 20 kategori terkurasi",
  description:
    "Telusuri 20 kategori tool AI: chatbot, coding, image, video, voice, writing, riset, presentasi, otomasi, bisnis, dan banyak lagi.",
  alternates: { canonical: "/categories" },
  openGraph: {
    title: "Kategori AI — 20 kategori terkurasi",
    description:
      "Temukan tool AI berdasarkan fungsi kerja: dari asisten chat hingga pembuat aplikasi mobile.",
    url: "/categories",
  },
};

export default function CategoriesPage() {
  const popular = categories.filter((category) => category.popular);
  const others = categories.filter((category) => !category.popular);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Kategori AI — AI FINDER",
    description: "20 kategori tool AI terkurasi.",
    url: `${site.url}/categories`,
    hasPart: categories.map((category) => ({
      "@type": "WebPage",
      name: category.name,
      url: `${site.url}/categories/${category.slug}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="container-page pb-16 pt-8">
        <Breadcrumbs items={[{ label: "Kategori" }]} />

        <div className="mt-7 max-w-3xl">
          <p className="section-label">
            <span className="h-px w-5 bg-gradient-to-r from-iris to-aqua" aria-hidden="true" />
            Peta direktori
          </p>
          <h1 className="mt-3 font-display text-3xl font-extrabold tracking-[-0.04em] text-ink sm:text-[2.6rem]">
            Semua <span className="text-gradient">kategori AI</span>
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-muted sm:text-[15px]">
            {stats.tools} tool tersusun dalam {stats.categories} kategori berdasarkan fungsi kerja.
            Pilih kategori untuk melihat tool terbaik, harga, dan tautan resminya.
          </p>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          <span className="chip">
            <Layers className="h-3.5 w-3.5 text-plasma" aria-hidden="true" />
            {stats.categories} kategori
          </span>
          <span className="chip">
            <Sparkles className="h-3.5 w-3.5 text-aqua" aria-hidden="true" />
            {stats.tools} tool
          </span>
          <Link href="/explore" className="chip hover:text-ink">
            <Wand2 className="h-3.5 w-3.5 text-iris" aria-hidden="true" />
            Cari dengan filter
            <ArrowRight className="h-3 w-3" aria-hidden="true" />
          </Link>
        </div>

        <Reveal as="section" className="mt-12">
          <SectionHeading
            label="Paling dicari"
            title="Kategori populer"
            description="Tempat paling sering dikunjungi untuk memulai."
          />
          <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-5">
            {popular.map((category) => (
              <CategoryCard
                key={category.slug}
                category={category}
                count={getToolsByCategory(category.slug).length}
              />
            ))}
          </div>
        </Reveal>

        <Reveal as="section" className="mt-14">
          <SectionHeading
            label="Spesialis"
            title="Kategori lainnya"
            description="Untuk kebutuhan yang lebih spesifik — dari 3D hingga layanan pelanggan."
          />
          <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-5">
            {others.map((category) => (
              <CategoryCard
                key={category.slug}
                category={category}
                count={getToolsByCategory(category.slug).length}
              />
            ))}
          </div>
        </Reveal>

        <Reveal as="section" className="mt-14">
          <div className="card-surface flex flex-col items-start gap-5 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div>
              <h2 className="font-display text-lg font-bold text-ink">Belum yakin mulai dari mana?</h2>
              <p className="mt-1.5 max-w-lg text-sm leading-relaxed text-muted">
                Gunakan pencarian bebas di Explore, atau mulai dari rekomendasi editor yang sudah
                kami kurasi berdasarkan kualitas dan adopsi.
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
