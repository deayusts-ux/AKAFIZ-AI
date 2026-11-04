export type VisualKind =
  | "candle-anatomy"
  | "candle-pattern"
  | "support-resistance"
  | "trend"
  | "volume"
  | "timeframe"
  | "risk"
  | "macro"
  | "tokenomics"
  | "market-structure";

export interface ChapterVisual {
  kind: VisualKind;
  patternId?: string;
  caption: string;
}

export interface ChapterCallout {
  tone?: "info" | "warning" | "tip";
  title: string;
  body: string;
}

export interface ChapterSection {
  id: string;
  heading: string;
  paragraphs: string[];
  bullets?: string[];
  callout?: ChapterCallout;
  visual?: ChapterVisual;
}

export interface QuizQuestion {
  id: string;
  chapter: string;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}

export type ChapterLevel = "Pemula" | "Menengah" | "Lanjutan";

export interface Chapter {
  slug: string;
  order: number;
  title: string;
  shortTitle: string;
  subtitle: string;
  description: string;
  level: ChapterLevel;
  minutes: number;
  icon: string;
  accent: string;
  objectives: string[];
  sections: ChapterSection[];
  takeaways: string[];
  quiz: QuizQuestion[];
}

export interface GlossaryTerm {
  term: string;
  category: "Dasar" | "Market" | "Candlestick" | "Analisis" | "Risiko" | "Fundamental";
  definition: string;
  example: string;
}

export interface SimulationOption {
  label: string;
  correct: boolean;
}

export interface SimulationExercise {
  id: string;
  title: string;
  level: "Mudah" | "Sedang" | "Sulit";
  context: string;
  question: string;
  options: SimulationOption[];
  explanation: string;
  bars: { open: number; high: number; low: number; close: number }[];
  highlight: number;
  takeaway: string;
}
