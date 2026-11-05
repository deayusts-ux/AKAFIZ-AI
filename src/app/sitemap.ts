import type { MetadataRoute } from "next";
import { categories } from "@/data/categories";
import { cryptoChapters } from "@/data/crypto/chapters";
import { ideaCategories } from "@/data/idea-categories";
import { ideas } from "@/data/ideas";
import { tools } from "@/data/tools";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url.replace(/\/$/, "");
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified, changeFrequency: "daily", priority: 1 },
    { url: `${base}/explore`, lastModified, changeFrequency: "daily", priority: 0.9 },
    { url: `${base}/explore-idea`, lastModified, changeFrequency: "weekly", priority: 0.85 },
    { url: `${base}/explore-idea/kategori`, lastModified, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/ai-humanizer`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/categories`, lastModified, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/trending`, lastModified, changeFrequency: "daily", priority: 0.8 },
    { url: `${base}/favorites`, lastModified, changeFrequency: "monthly", priority: 0.4 },
    { url: `${base}/tentang-saya`, lastModified, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/about`, lastModified, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/crypto`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/crypto/ebook`, lastModified, changeFrequency: "weekly", priority: 0.85 },
    { url: `${base}/crypto/candlestick-lab`, lastModified, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/crypto/simulation`, lastModified, changeFrequency: "weekly", priority: 0.75 },
    { url: `${base}/crypto/quiz`, lastModified, changeFrequency: "weekly", priority: 0.75 },
    { url: `${base}/crypto/glossary`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/crypto/progress`, lastModified, changeFrequency: "monthly", priority: 0.4 },
    { url: `${base}/crypto/game`, lastModified, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/crypto/about`, lastModified, changeFrequency: "monthly", priority: 0.5 },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${base}/categories/${category.slug}`,
    lastModified,
    changeFrequency: "weekly",
    priority: 0.75,
  }));

  const toolRoutes: MetadataRoute.Sitemap = tools.map((tool) => ({
    url: `${base}/tools/${tool.slug}`,
    lastModified,
    changeFrequency: "weekly",
    priority: 0.65,
  }));

  const cryptoChapterRoutes: MetadataRoute.Sitemap = cryptoChapters.flatMap((chapter) => [
    {
      url: `${base}/crypto/ebook/${chapter.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${base}/crypto/quiz/${chapter.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
  ]);

  const ideaCategoryRoutes: MetadataRoute.Sitemap = ideaCategories.map((category) => ({
    url: `${base}/explore-idea/kategori/${category.slug}`,
    lastModified,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const ideaSourceRoutes: MetadataRoute.Sitemap = ideas.map((idea) => ({
    url: `${base}/explore-idea/${idea.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.55,
  }));

  return [
    ...staticRoutes,
    ...categoryRoutes,
    ...toolRoutes,
    ...cryptoChapterRoutes,
    ...ideaCategoryRoutes,
    ...ideaSourceRoutes,
  ];
}
