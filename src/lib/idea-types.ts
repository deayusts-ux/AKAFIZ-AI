export type IdeaKind = "reference" | "learning" | "tool" | "portfolio" | "news" | "database";

export const IDEA_KIND_LABEL: Record<IdeaKind, string> = {
  reference: "Referensi",
  learning: "Belajar",
  tool: "Alat bantu",
  portfolio: "Portofolio",
  news: "Berita",
  database: "Database",
};

export const IDEA_KIND_DESCRIPTION: Record<IdeaKind, string> = {
  reference: "Ensiklopedia, dokumentasi, dan penjelasan yang bisa dirujuk kapan saja.",
  learning: "Materi belajar bertahap, latihan, dan kursus.",
  tool: "Alat yang langsung dipakai untuk mengerjakan sesuatu.",
  portfolio: "Galeri karya dan portofolio untuk mencari inspirasi.",
  news: "Berita, majalah, dan liputan industri terbaru.",
  database: "Pangkalan data untuk mencari dokumen, jurnal, atau peraturan.",
};

export type IdeaIconKey =
  | "building"
  | "calculator"
  | "code"
  | "hardhat"
  | "scale"
  | "health"
  | "briefcase"
  | "palette"
  | "psychology"
  | "sprout"
  | "bolt"
  | "education"
  | "radio"
  | "sigma";

export interface IdeaCategory {
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  icon: IdeaIconKey;
  accent: string;
  accentAlt: string;
}

export type IdeaLanguage = "id" | "en" | "multi";

export const IDEA_LANGUAGE_LABEL: Record<IdeaLanguage, string> = {
  id: "Indonesia",
  en: "Inggris",
  multi: "Multibahasa",
};

export interface IdeaSource {
  slug: string;
  name: string;
  domain: string;
  website: string;
  whatFor: string;
  description: string;
  categories: string[];
  kind: IdeaKind;
  tags: string[];
  highlights: string[];
  bestFor: string;
  language: IdeaLanguage;
  featured?: boolean;
}

export type IdeaSortKey = "relevance" | "name" | "category";
