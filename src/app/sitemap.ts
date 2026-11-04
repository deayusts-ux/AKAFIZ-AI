import type { MetadataRoute } from "next";
import { categories } from "@/data/categories";
import { tools } from "@/data/tools";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url.replace(/\/$/, "");
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified, changeFrequency: "daily", priority: 1 },
    { url: `${base}/explore`, lastModified, changeFrequency: "daily", priority: 0.9 },
    { url: `${base}/categories`, lastModified, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/trending`, lastModified, changeFrequency: "daily", priority: 0.8 },
    { url: `${base}/favorites`, lastModified, changeFrequency: "monthly", priority: 0.4 },
    { url: `${base}/about`, lastModified, changeFrequency: "monthly", priority: 0.5 },
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

  return [...staticRoutes, ...categoryRoutes, ...toolRoutes];
}
