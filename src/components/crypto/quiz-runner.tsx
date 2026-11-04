"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, CheckCircle2, RotateCcw, Trophy, X, XCircle } from "lucide-react";
import { useCryptoProgress } from "@/components/crypto/progress-provider";
import type { Chapter } from "@/data/crypto/types";
import { cn } from "@/lib/utils";

const letters = ["A", "B", "C", "D"];

export function QuizRunner({ chapter }: { chapter: Chapter }) {
  const { recordQuiz, quiz } = useCryptoProgress();
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [answers, setAnswers] = useState<number[]>([]);
  const [finished, setFinished] = useState(false);

  const question = chapter.quiz[index];
  const total = chapter.quiz.length;
  const score = answers.reduce(
    (sum, answer, answerIndex) => sum + (answer === chapter.quiz[answerIndex]?.answer ? 1 : 0),
    0,
  );
  const percent = Math.round((score / Math.max(total, 1)) * 100);
  const best = quiz[chapter.slug];
  const grade =
    percent >= 90
      ? { label: "Luar biasa", tone: "text-emerald-300", note: "Pemahamanmu sangat kuat. Lanjut ke bab berikutnya." }
      : percent >= 75
        ? { label: "Baik", tone: "text-aqua", note: "Fondasi sudah bagus. Tinjau soal yang salah sekali lagi." }
        : percent >= 60
          ? { label: "Cukup", tone: "text-amber-300", note: "Sudah cukup, tetapi beberapa konsep perlu diulang." }
          : { label: "Perlu diulang", tone: "text-rose-300", note: "Baca ulang bab ini, lalu coba kuis lagi." };

  const check = () => {
    if (selected === null || checked) return;
    setAnswers((current) => {
      const next = [...current];
      next[index] = selected;
      return next;
    });
    setChecked(true);
  };

  const next = () => {
    if (index < total - 1) {
      setIndex((value) => value + 1);
      setSelected(null);
      setChecked(false);
      return;
    }
    const finalAnswers = [...answers];
    finalAnswers[index] = selected ?? -1;
    const finalScore = finalAnswers.reduce(
      (sum, answer, answerIndex) => sum + (answer === chapter.quiz[answerIndex]?.answer ? 1 : 0),
      0,
    );
    setAnswers(finalAnswers);
    recordQuiz(chapter.slug, finalScore, total);
    setFinished(true);
  };

  const retry = () => {
    setIndex(0);
    setSelected(null);
    setChecked(false);
    setAnswers([]);
    setFinished(false);
  };

  if (finished) {
    return (
      <div className="rounded-2xl border border-line/10 bg-canvas/50 p-5 sm:p-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-iris via-plasma to-aqua text-white shadow-glow">
            <Trophy className="h-6 w-6" aria-hidden="true" />
          </span>
          <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.18em] text-muted">Hasil kuis</p>
          <h2 className="mt-1 font-display text-2xl font-bold text-ink sm:text-3xl">{chapter.title}</h2>
          <p className="mt-3 font-display text-5xl font-bold text-gradient">
            {score}/{total}
          </p>
          <p className="mt-1 text-sm text-muted">{percent}% benar</p>
          <p className={cn("mt-2 text-sm font-bold", grade.tone)}>{grade.label}</p>
          <p className="mx-auto mt-2 max-w-lg text-xs leading-relaxed text-muted">{grade.note}</p>
          {best ? (
            <p className="mt-2 text-[10px] text-muted">
              Skor terbaikmu untuk bab ini: {best.best}/{best.total}
            </p>
          ) : null}

          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            <button type="button" onClick={retry} className="btn-ghost h-10 px-4 text-xs">
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
              Coba lagi
            </button>
            <Link href="/crypto/quiz" className="btn-primary h-10 px-4 text-xs">
              Semua kuis
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
            <Link
              href={`/crypto/ebook/${chapter.slug}`}
              className="btn-ghost h-10 px-4 text-xs"
            >
              Baca bab
            </Link>
          </div>
        </div>

        <div className="mx-auto mt-8 max-w-3xl space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-muted">Pembahasan</h3>
          {chapter.quiz.map((item, questionIndex) => {
            const answer = answers[questionIndex];
            const correct = answer === item.answer;
            return (
              <div
                key={item.id}
                className={cn(
                  "rounded-xl border p-3.5",
                  correct ? "border-emerald-400/15 bg-emerald-400/[0.03]" : "border-rose-400/15 bg-rose-400/[0.03]",
                )}
              >
                <div className="flex items-start gap-2">
                  {correct ? (
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" aria-hidden="true" />
                  ) : (
                    <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-400" aria-hidden="true" />
                  )}
                  <div className="min-w-0">
                    <p className="text-xs font-semibold leading-relaxed text-ink">
                      {questionIndex + 1}. {item.question}
                    </p>
                    <p className="mt-1 text-[11px] text-muted">
                      Jawabanmu:{" "}
                      <span className={correct ? "text-emerald-300" : "text-rose-300"}>
                        {answer !== undefined && answer >= 0 ? item.options[answer] : "Tidak dijawab"}
                      </span>
                    </p>
                    {!correct ? (
                      <p className="mt-0.5 text-[11px] text-muted">
                        Jawaban benar: <span className="text-emerald-300">{item.options[item.answer]}</span>
                      </p>
                    ) : null}
                    <p className="mt-1.5 text-[11px] leading-relaxed text-muted">{item.explanation}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-line/10 bg-canvas/50 p-4 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <Link
          href="/crypto/quiz"
          className="inline-flex items-center gap-1.5 text-[11px] font-medium text-muted transition-colors hover:text-ink"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
          Semua kuis
        </Link>
        <span className="text-[11px] text-muted">
          Soal {index + 1} / {total}
        </span>
      </div>

      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-line/[0.08]">
        <div
          className="h-full rounded-full bg-gradient-to-r from-iris to-aqua transition-[width] duration-500"
          style={{ width: `${((index + (checked ? 1 : 0)) / total) * 100}%` }}
        />
      </div>

      <h2 className="mt-5 text-sm font-semibold leading-relaxed text-ink sm:text-base">{question.question}</h2>

      <div className="mt-4 space-y-2">
        {question.options.map((option, optionIndex) => {
          const isSelected = selected === optionIndex;
          const isCorrect = question.answer === optionIndex;
          const showCorrect = checked && isCorrect;
          const showWrong = checked && isSelected && !isCorrect;
          return (
            <button
              key={option}
              type="button"
              onClick={() => {
                if (!checked) setSelected(optionIndex);
              }}
              disabled={checked}
              aria-pressed={isSelected}
              className={cn(
                "flex w-full items-start gap-3 rounded-xl border p-3 text-left text-xs transition-all",
                showCorrect
                  ? "border-emerald-400/40 bg-emerald-400/[0.08]"
                  : showWrong
                    ? "border-rose-400/40 bg-rose-400/[0.08]"
                    : isSelected
                      ? "border-iris/50 bg-iris/[0.08]"
                      : "border-line/10 bg-line/[0.02] hover:border-line/20",
                checked ? "cursor-default" : "",
              )}
            >
              <span
                className={cn(
                  "flex h-5 w-5 shrink-0 items-center justify-center rounded-md border text-[10px] font-bold",
                  showCorrect
                    ? "border-emerald-400/40 bg-emerald-400/15 text-emerald-300"
                    : showWrong
                      ? "border-rose-400/40 bg-rose-400/15 text-rose-300"
                      : isSelected
                        ? "border-iris/40 bg-iris/15 text-iris"
                        : "border-line/15 text-muted",
                )}
              >
                {showCorrect ? <Check className="h-3 w-3" /> : showWrong ? <X className="h-3 w-3" /> : letters[optionIndex]}
              </span>
              <span className="leading-relaxed text-ink">{option}</span>
            </button>
          );
        })}
      </div>

      {checked ? (
        <div
          className={cn(
            "mt-4 rounded-xl border p-3.5",
            selected === question.answer
              ? "border-emerald-400/20 bg-emerald-400/[0.05]"
              : "border-rose-400/20 bg-rose-400/[0.05]",
          )}
        >
          <p
            className={cn(
              "flex items-center gap-1.5 text-xs font-bold",
              selected === question.answer ? "text-emerald-300" : "text-rose-300",
            )}
          >
            {selected === question.answer ? (
              <>
                <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                Tepat
              </>
            ) : (
              <>
                <XCircle className="h-4 w-4" aria-hidden="true" />
                Belum tepat
              </>
            )}
          </p>
          <p className="mt-1 text-[11px] leading-relaxed text-muted">{question.explanation}</p>
        </div>
      ) : null}

      <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
        <p className="text-[10px] text-muted">
          {quiz[chapter.slug]
            ? `Skor terbaik: ${quiz[chapter.slug].best}/${quiz[chapter.slug].total}`
            : "Skor terbaik belum ada"}
        </p>
        {checked ? (
          <button type="button" onClick={next} className="btn-primary h-10 px-5 text-xs">
            {index < total - 1 ? "Soal berikutnya" : "Lihat hasil"}
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        ) : (
          <button
            type="button"
            onClick={check}
            disabled={selected === null}
            className="btn-primary h-10 px-5 text-xs"
          >
            Periksa jawaban
          </button>
        )}
      </div>
    </div>
  );
}
