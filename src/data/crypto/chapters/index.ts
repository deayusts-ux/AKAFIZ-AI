import type { Chapter, QuizQuestion } from "../types";
import { chapterPengenalan } from "./01-pengenalan";
import { chapterFundamental } from "./02-fundamental";
import { chapterPasar } from "./03-memahami-pasar";
import { chapterCandlestickDasar } from "./04-candlestick-dasar";
import { chapterPola } from "./05-pola-candlestick";
import { chapterSupportResistance } from "./06-support-resistance";
import { chapterVolume } from "./07-volume";
import { chapterAnalisis } from "./08-analisis-grafik";
import { chapterRisiko } from "./09-manajemen-risiko";
import { chapterBerita } from "./10-berita-fundamental";

export const cryptoChapters: Chapter[] = [
  chapterPengenalan,
  chapterFundamental,
  chapterPasar,
  chapterCandlestickDasar,
  chapterPola,
  chapterSupportResistance,
  chapterVolume,
  chapterAnalisis,
  chapterRisiko,
  chapterBerita,
];

export function getChapter(slug: string): Chapter | undefined {
  return cryptoChapters.find((chapter) => chapter.slug === slug);
}

export function getChapterByOrder(order: number): Chapter | undefined {
  return cryptoChapters.find((chapter) => chapter.order === order);
}

export const allQuizQuestions: QuizQuestion[] = cryptoChapters.flatMap((chapter) => chapter.quiz);

export const totalQuizCount = allQuizQuestions.length;

export const totalLearningMinutes = cryptoChapters.reduce((total, chapter) => total + chapter.minutes, 0);
