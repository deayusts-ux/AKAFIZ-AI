export type PricingTier = "free" | "freemium" | "paid";

export const PRICING_LABEL: Record<PricingTier, string> = {
  free: "Gratis",
  freemium: "Freemium",
  paid: "Berbayar",
};

export const PRICING_DESCRIPTION: Record<PricingTier, string> = {
  free: "Sepenuhnya gratis, tanpa langganan wajib",
  freemium: "Gratis untuk mulai, fitur lanjutan berbayar",
  paid: "Memerlukan langganan atau pembelian",
};

export type CategoryIconKey =
  | "brain"
  | "code"
  | "image"
  | "video"
  | "voice"
  | "writing"
  | "research"
  | "presentation"
  | "automation"
  | "business"
  | "translation"
  | "data"
  | "finance"
  | "education"
  | "architecture"
  | "gaming"
  | "website"
  | "mobile"
  | "seo"
  | "support";

export interface Category {
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  icon: CategoryIconKey;
  accent: string;
  accentAlt: string;
  popular: boolean;
}

export interface Tool {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: string;
  website: string;
  company: string;
  pricing: PricingTier;
  priceNote: string;
  tags: string[];
  features: string[];
  bestFor: string;
  rating: number;
  popularity: number;
  featured?: boolean;
  spotlight?: number;
  isNew?: boolean;
}

export interface LogoAsset {
  src: string;
  kind: "icon" | "favicon";
  invertOnLight?: boolean;
  invertOnDark?: boolean;
}

export type SortKey = "trending" | "rating" | "name" | "newest";
