"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import {
  ArrowUp,
  File,
  FileText,
  Flame,
  FolderPlus,
  GraduationCap,
  LayoutGrid,
  List,
  Loader2,
  Mic,
  MonitorPlay,
  Play,
  Presentation,
  Search,
  Settings2,
  Sparkles,
  Trash2,
  Trophy,
  Upload,
  Volume2,
  X,
} from "lucide-react";
import { useToast } from "@/components/providers/toast-provider";
import { generateLesson, type AiKeys } from "@/lib/belajar/ai";
import { deleteNote, listNotes, loadBlob, saveNote } from "@/lib/belajar/db";
import {
  createId,
  formatDuration,
  NOTE_KIND_LABEL,
  youtubeIdFromUrl,
  type BelajarNote,
  type NoteKind,
} from "@/lib/belajar/types";
import { cn } from "@/lib/utils";

const KEY_GEMINI = "legacy-belajar-gemini-key";
const KEY_OPENROUTER = "legacy-belajar-openrouter-key";
const KEY_FOLDERS = "legacy-belajar-folders";
const KEY_VIEW = "legacy-belajar-view";
const TEXT_EXTENSIONS = /\.(txt|md|markdown|csv|json|srt|vtt)$/i;

type KindFilter = "semua" | NoteKind;
type ViewMode = "galeri" | "daftar";

type SpeechRecognitionLike = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  onresult: ((event: { results: ArrayLike<ArrayLike<{ transcript: string }> & { isFinal: boolean }> }) => void) | null;
  onerror: (() => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
};

function getSpeechRecognition(): (new () => SpeechRecognitionLike) | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as {
    SpeechRecognition?: new () => SpeechRecognitionLike;
    webkitSpeechRecognition?: new () => SpeechRecognitionLike;
  };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

function loadKeys(): AiKeys {
  if (typeof window === "undefined") return { gemini: "", openrouter: "" };
  return {
    gemini: window.localStorage.getItem(KEY_GEMINI) ?? "",
    openrouter: window.localStorage.getItem(KEY_OPENROUTER) ?? "",
  };
}

function formatDate(ts: number): string {
  return new Date(ts).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
}

function excerpt(text: string): string {
  const clean = text
    .replace(/^#+\s*/gm, "")
    .replace(/\n{2,}/g, " ")
    .trim();
  return clean.length > 150 ? `${clean.slice(0, 150)}…` : clean;
}

function splitSlides(text: string): Array<{ title: string; body: string }> {
  const slides: Array<{ title: string; body: string }> = [];
  const parts = text.split(/^##\s+/m).filter((p) => p.trim());
  const firstLines = parts[0].trim().split("\n").filter((l) => l.trim());
  if (parts.length > 1 && firstLines.length <= 1) {
    parts[1] = `${parts[0].trim()}\n\n${parts[1]}`;
    parts.shift();
  }
  for (const part of parts) {
    const nl = part.indexOf("\n");
    if (nl === -1) {
      slides.push({ title: part.trim(), body: "" });
    } else {
      slides.push({ title: part.slice(0, nl).trim(), body: part.slice(nl + 1).trim() });
    }
  }
  return slides.length > 0 ? slides : [{ title: "Materi", body: text }];
}

function MarkdownBlocks({ text }: { text: string }) {
  const lines = text.split("\n");
  const blocks: ReactNode[] = [];
  let list: string[] = [];
  let ordered = false;
  let key = 0;

  const flush = () => {
    if (list.length === 0) return;
    const items = list.map((item) => <li key={key++}>{item}</li>);
    blocks.push(
      ordered ? (
        <ol key={key++} className="list-decimal space-y-1.5 pl-5 text-sm leading-relaxed text-muted">{items}</ol>
      ) : (
        <ul key={key++} className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-muted">{items}</ul>
      ),
    );
    list = [];
  };

  for (const raw of lines) {
    const line = raw.trimEnd();
    if (/^##\s+/.test(line)) {
      flush();
      blocks.push(
        <h3 key={key++} className="pt-2 font-display text-base font-bold tracking-[-0.01em] text-ink first:pt-0">
          {line.replace(/^##\s+/, "")}
        </h3>,
      );
    } else if (/^###\s+/.test(line)) {
      flush();
      blocks.push(
        <h4 key={key++} className="pt-1 text-sm font-bold text-ink">
          {line.replace(/^###\s+/, "")}
        </h4>,
      );
    } else if (/^-\s+/.test(line)) {
      if (ordered) {
        flush();
        ordered = false;
      }
      list.push(line.replace(/^-\s+/, ""));
    } else if (/^\d+\.\s+/.test(line)) {
      if (!ordered && list.length > 0) flush();
      ordered = true;
      list.push(line.replace(/^\d+\.\s+/, ""));
    } else if (line.trim() === "") {
      flush();
    } else {
      flush();
      blocks.push(
        <p key={key++} className="text-sm leading-relaxed text-muted">
          {line}
        </p>,
      );
    }
  }
  flush();
  return <div className="space-y-3">{blocks}</div>;
}

function StreakChips({ notes }: { notes: BelajarNote[] }) {
  const { streak, level } = useMemo(() => {
    const days = new Set(notes.map((n) => new Date(n.createdAt).toDateString()));
    let streak = 0;
    const cursor = new Date();
    if (!days.has(cursor.toDateString())) cursor.setDate(cursor.getDate() - 1);
    while (days.has(cursor.toDateString())) {
      streak += 1;
      cursor.setDate(cursor.getDate() - 1);
    }
    return { streak, level: Math.floor(notes.length / 3) + 1 };
  }, [notes]);

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="chip gap-1.5 border-amber-400/20 bg-amber-400/10 text-amber-300">
        <Flame className="h-3.5 w-3.5" aria-hidden="true" />
        Streak {streak} hari
      </span>
      <span className="chip gap-1.5 border-cyan-400/20 bg-cyan-400/10 text-cyan-300">
        <Trophy className="h-3.5 w-3.5" aria-hidden="true" />
        Level {level}
      </span>
    </div>
  );
}

export function BelajarStudio() {
  const { toast } = useToast();
  const [notes, setNotes] = useState<BelajarNote[]>([]);
  const [folders, setFolders] = useState<string[]>([]);
  const [ready, setReady] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [keys, setKeys] = useState<AiKeys>({ gemini: "", openrouter: "" });

  const [folderFilter, setFolderFilter] = useState("semua");
  const [kindFilter, setKindFilter] = useState<KindFilter>("semua");
  const [viewMode, setViewMode] = useState<ViewMode>("galeri");
  const [query, setQuery] = useState("");
  const [folderDraft, setFolderDraft] = useState("");
  const [addingFolder, setAddingFolder] = useState(false);

  const [youtubeOpen, setYoutubeOpen] = useState(false);
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [keyDraft, setKeyDraft] = useState<AiKeys>({ gemini: "", openrouter: "" });

  const [recording, setRecording] = useState(false);
  const [recordSeconds, setRecordSeconds] = useState(0);
  const secondsRef = useRef(0);
  const recordRef = useRef<{ recorder: MediaRecorder; stream: MediaStream; recognition: SpeechRecognitionLike | null } | null>(null);
  const transcriptRef = useRef("");

  const [openNote, setOpenNote] = useState<BelajarNote | null>(null);
  const [mediaUrl, setMediaUrl] = useState<string | null>(null);
  const [slideMode, setSlideMode] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  const refresh = useCallback(async () => {
    const list = await listNotes();
    setNotes(list);
    try {
      const saved = window.localStorage.getItem(KEY_FOLDERS);
      setFolders(saved ? (JSON.parse(saved) as string[]) : []);
    } catch {
      setFolders([]);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    setKeys(loadKeys());
    const savedView = window.localStorage.getItem(KEY_VIEW);
    if (savedView === "galeri" || savedView === "daftar") setViewMode(savedView);
    refresh()
      .catch(() => toast("Gagal memuat catatan.", "error"))
      .finally(() => {
        if (!cancelled) setReady(true);
      });
    return () => {
      cancelled = true;
    };
  }, [refresh, toast]);

  useEffect(() => {
    if (!recording) return;
    const timer = window.setInterval(() => {
      secondsRef.current += 1;
      setRecordSeconds(secondsRef.current);
    }, 1000);
    return () => window.clearInterval(timer);
  }, [recording]);

  const persistNote = useCallback(
    async (note: BelajarNote, blob?: Blob | null) => {
      await saveNote(note, blob);
      await refresh();
    },
    [refresh],
  );

  const handleGenerate = async () => {
    const topic = prompt.trim();
    if (!topic) {
      toast("Tulis dulu topik yang mau dipelajari.", "error");
      return;
    }
    setBusy(true);
    setStatus("Menyiapkan permintaan…");
    abortRef.current = new AbortController();
    try {
      const result = await generateLesson(topic, keys, setStatus, abortRef.current.signal);
      const note: BelajarNote = {
        id: createId(),
        kind: "teks",
        title: topic.length > 80 ? `${topic.slice(0, 80)}…` : topic,
        text: result.text,
        folder: folderFilter !== "semua" ? folderFilter : "Umum",
        createdAt: Date.now(),
        mediaType: null,
        mediaName: null,
        youtubeId: null,
        durationSec: null,
        source: "ai",
        provider: result.provider,
      };
      await persistNote(note);
      setPrompt("");
      toast(`Pelajaran dibuat dengan ${result.provider}.`, "success");
    } catch (error) {
      toast(error instanceof Error ? error.message : "Gagal membuat pelajaran.", "error");
    } finally {
      setBusy(false);
      setStatus(null);
      abortRef.current = null;
    }
  };

  const startRecording = async () => {
    if (recording) return;
    transcriptRef.current = "";
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mime = MediaRecorder.isTypeSupported("audio/webm;codecs=opus") ? "audio/webm;codecs=opus" : "";
      const recorder = new MediaRecorder(stream, mime ? { mimeType: mime } : undefined);
      const chunks: Blob[] = [];
      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) chunks.push(event.data);
      };

      let recognition: SpeechRecognitionLike | null = null;
      const Ctor = getSpeechRecognition();
      if (Ctor) {
        try {
          recognition = new Ctor();
          recognition.lang = "id-ID";
          recognition.continuous = true;
          recognition.interimResults = false;
          recognition.onresult = (event) => {
            for (let i = 0; i < event.results.length; i += 1) {
              const result = event.results[i];
              if (result.isFinal) transcriptRef.current += `${result[0].transcript} `;
            }
          };
          recognition.start();
        } catch {
          recognition = null;
        }
      }

      recordRef.current = { recorder, stream, recognition };
      recorder.onstop = () => {
        stream.getTracks().forEach((t) => t.stop());
        recognition?.stop();
        const blob = new Blob(chunks, { type: recorder.mimeType || "audio/webm" });
        const transcript = transcriptRef.current.trim();
        const note: BelajarNote = {
          id: createId(),
          kind: "audio",
          title: `Rekaman ${new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })}`,
          text: transcript,
          folder: folderFilter !== "semua" ? folderFilter : "Umum",
          createdAt: Date.now(),
          mediaType: blob.type,
          mediaName: "rekaman.webm",
          youtubeId: null,
          durationSec: secondsRef.current,
          source: "rekam",
          provider: null,
        };
        persistNote(note, blob)
          .then(() => toast(transcript ? "Rekaman & transkrip tersimpan." : "Rekaman tersimpan.", "success"))
          .catch(() => toast("Gagal menyimpan rekaman.", "error"));
        setRecording(false);
        setRecordSeconds(0);
      };
      recorder.start();
      secondsRef.current = 0;
      setRecordSeconds(0);
      setRecording(true);
    } catch {
      toast("Mikrofon tidak tersedia atau izin ditolak.", "error");
      setRecording(false);
    }
  };

  const stopRecording = () => {
    const active = recordRef.current;
    if (!active) return;
    active.recognition?.stop();
    if (active.recorder.state !== "inactive") active.recorder.stop();
    recordRef.current = null;
  };

  const handleUpload = async (file: File | undefined) => {
    if (!file) return;
    if (TEXT_EXTENSIONS.test(file.name)) {
      const text = await file.text();
      const note: BelajarNote = {
        id: createId(),
        kind: "teks",
        title: file.name.replace(TEXT_EXTENSIONS, ""),
        text,
        folder: folderFilter !== "semua" ? folderFilter : "Umum",
        createdAt: Date.now(),
        mediaType: null,
        mediaName: file.name,
        youtubeId: null,
        durationSec: null,
        source: "unggah",
        provider: null,
      };
      await persistNote(note);
      toast("Dokumen teks tersimpan.", "success");
      return;
    }
    const isAudio = file.type.startsWith("audio/");
    const isVideo = file.type.startsWith("video/");
    const isImage = file.type.startsWith("image/");
    const note: BelajarNote = {
      id: createId(),
      kind: isAudio || isVideo ? "audio" : "dokumen",
      title: file.name,
      text: "",
      folder: folderFilter !== "semua" ? folderFilter : "Umum",
      createdAt: Date.now(),
      mediaType: file.type || "application/octet-stream",
      mediaName: file.name,
      youtubeId: null,
      durationSec: null,
      source: "unggah",
      provider: null,
    };
    await persistNote(note, file);
    toast(isAudio || isVideo ? "Media audio tersimpan." : isImage ? "Gambar tersimpan." : "Berkas tersimpan.", "success");
  };

  const handleYoutube = async () => {
    const id = youtubeIdFromUrl(youtubeUrl);
    if (!id) {
      toast("Tautan YouTube tidak valid.", "error");
      return;
    }
    let title = `Video YouTube ${id}`;
    try {
      const res = await fetch(`https://noembed.com/embed?url=${encodeURIComponent(`https://www.youtube.com/watch?v=${id}`)}`);
      if (res.ok) {
        const data = (await res.json()) as { title?: string };
        if (data.title) title = data.title;
      }
    } catch {
      /* judul manual tetap dipakai */
    }
    const note: BelajarNote = {
      id: createId(),
      kind: "youtube",
      title,
      text: "",
      folder: folderFilter !== "semua" ? folderFilter : "Umum",
      createdAt: Date.now(),
      mediaType: null,
      mediaName: null,
      youtubeId: id,
      durationSec: null,
      source: "youtube",
      provider: null,
    };
    await persistNote(note);
    setYoutubeUrl("");
    setYoutubeOpen(false);
    toast("Video YouTube ditambahkan ke catatan.", "success");
  };

  const addFolder = () => {
    const name = folderDraft.trim();
    if (!name) return;
    if (folders.includes(name) || name.toLowerCase() === "semua") {
      toast("Nama folder sudah ada.", "error");
      return;
    }
    const next = [...folders, name];
    setFolders(next);
    window.localStorage.setItem(KEY_FOLDERS, JSON.stringify(next));
    setFolderDraft("");
    setAddingFolder(false);
    toast(`Folder "${name}" dibuat.`, "success");
  };

  const handleDelete = async (note: BelajarNote) => {
    await deleteNote(note.id);
    if (openNote?.id === note.id) closeModal();
    await refresh();
    toast("Catatan dihapus.", "success");
  };

  const openModal = async (note: BelajarNote) => {
    setOpenNote(note);
    setSlideMode(note.kind === "slide");
    setSlideIndex(0);
    setMediaUrl(null);
    if (note.mediaType) {
      const blob = await loadBlob(note.id);
      if (blob) setMediaUrl(URL.createObjectURL(blob));
    }
  };

  const closeModal = () => {
    if (mediaUrl) URL.revokeObjectURL(mediaUrl);
    setOpenNote(null);
    setMediaUrl(null);
  };

  const turnIntoLesson = async (note: BelajarNote) => {
    const topicSource = note.text.trim() || note.title;
    setBusy(true);
    setStatus("Menyusun pelajaran dari catatan…");
    try {
      const result = await generateLesson(topicSource.slice(0, 600), keys, setStatus);
      const lesson: BelajarNote = {
        ...note,
        id: createId(),
        kind: "teks",
        title: `Pelajaran: ${note.title}`.slice(0, 90),
        text: result.text,
        createdAt: Date.now(),
        source: "ai",
        provider: result.provider,
      };
      await persistNote(lesson);
      toast(`Pelajaran dibuat dengan ${result.provider}.`, "success");
    } catch (error) {
      toast(error instanceof Error ? error.message : "Gagal membuat pelajaran.", "error");
    } finally {
      setBusy(false);
      setStatus(null);
    }
  };

  const changeFolder = async (note: BelajarNote, folder: string) => {
    const updated = { ...note, folder };
    await persistNote(updated);
    setOpenNote(updated);
  };

  const saveKeys = () => {
    window.localStorage.setItem(KEY_GEMINI, keyDraft.gemini.trim());
    window.localStorage.setItem(KEY_OPENROUTER, keyDraft.openrouter.trim());
    setKeys(loadKeys());
    setSettingsOpen(false);
    toast("Pengaturan AI disimpan di perangkat ini.", "success");
  };

  const toggleView = (mode: ViewMode) => {
    setViewMode(mode);
    window.localStorage.setItem(KEY_VIEW, mode);
  };

  const allFolders = useMemo(() => [...folders], [folders]);
  const filtered = useMemo(() => {
    return notes.filter((note) => {
      if (folderFilter !== "semua" && note.folder !== folderFilter) return false;
      if (kindFilter !== "semua" && note.kind !== kindFilter) return false;
      if (query.trim()) {
        const q = query.toLowerCase();
        return note.title.toLowerCase().includes(q) || note.text.toLowerCase().includes(q);
      }
      return true;
    });
  }, [notes, folderFilter, kindFilter, query]);

  const kindChips: Array<{ id: KindFilter; label: string }> = [
    { id: "semua", label: "Semua" },
    { id: "teks", label: "Teks" },
    { id: "slide", label: "Slide" },
    { id: "dokumen", label: "Dokumen" },
    { id: "audio", label: "Audio" },
    { id: "youtube", label: "YouTube" },
  ];

  return (
    <div className="space-y-10">
      <section className="flex flex-col items-center gap-6 pt-6 text-center sm:pt-10" aria-labelledby="belajar-hero">
        <div className="flex w-full flex-wrap items-center justify-between gap-3">
          <StreakChips notes={notes} />
          <button
            type="button"
            onClick={() => {
              setKeyDraft(loadKeys());
              setSettingsOpen((o) => !o);
            }}
            className="btn-ghost h-9 px-3.5 text-xs"
            aria-expanded={settingsOpen}
          >
            <Settings2 className="h-3.5 w-3.5" aria-hidden="true" />
            AI &amp; akun
          </button>
        </div>
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
          <Image
            src="/images/belajar-mascot.png"
            alt="Maskot MalBelajarYuk"
            width={104}
            height={104}
            className="h-24 w-24 rounded-3xl object-cover shadow-[0_20px_60px_-20px_rgba(139,92,246,0.6)] sm:h-28 sm:w-28"
            priority
          />
          <h1 id="belajar-hero" className="font-display text-3xl font-extrabold tracking-[-0.03em] text-ink sm:text-4xl">
            Mau belajar apa hari ini?
          </h1>
        </div>

        {settingsOpen ? (
          <div className="card-surface w-full max-w-3xl space-y-4 p-5 text-left">
            <div>
              <h2 className="font-display text-base font-bold text-ink">AI &amp; akun sendiri</h2>
              <p className="mt-1 text-xs leading-relaxed text-muted">
                Tanpa kunci, MalBelajarYuk memakai mesin lokal LEGACY. Tambahkan kunci API milikmu agar materi
                disusun oleh AI eksternal — jika kuota AI pertama habis, otomatis dicoba AI cadangan, lalu mesin
                lokal. Kunci hanya disimpan di perangkat ini dan tidak dikirim ke server LEGACY.
              </p>
            </div>
            <label className="block">
              <span className="mb-1.5 flex items-center justify-between text-[11px] font-bold uppercase tracking-[0.12em] text-muted">
                Kunci API Gemini (akun Google / AI Studio)
                <a
                  href="https://aistudio.google.com/apikey"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline font-medium normal-case tracking-normal text-aqua"
                >
                  Dapatkan kunci gratis
                </a>
              </span>
              <input
                type="password"
                value={keyDraft.gemini}
                onChange={(e) => setKeyDraft((k) => ({ ...k, gemini: e.target.value }))}
                placeholder="AIza…"
                className="filter-select w-full pl-3"
                autoComplete="off"
              />
            </label>
            <label className="block">
              <span className="mb-1.5 flex items-center justify-between text-[11px] font-bold uppercase tracking-[0.12em] text-muted">
                Kunci API OpenRouter (cadangan)
                <a
                  href="https://openrouter.ai/keys"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline font-medium normal-case tracking-normal text-aqua"
                >
                  Buat kunci OpenRouter
                </a>
              </span>
              <input
                type="password"
                value={keyDraft.openrouter}
                onChange={(e) => setKeyDraft((k) => ({ ...k, openrouter: e.target.value }))}
                placeholder="sk-or-…"
                className="filter-select w-full pl-3"
                autoComplete="off"
              />
            </label>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-xs text-muted">
                Status:{" "}
                {keys.gemini || keys.openrouter
                  ? `AI eksternal aktif (${[keys.gemini && "Gemini", keys.openrouter && "OpenRouter"].filter(Boolean).join(" → ")})`
                  : "Mesin lokal LEGACY"}
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setKeyDraft({ gemini: "", openrouter: "" });
                    window.localStorage.removeItem(KEY_GEMINI);
                    window.localStorage.removeItem(KEY_OPENROUTER);
                    setKeys({ gemini: "", openrouter: "" });
                  }}
                  className="btn-ghost h-9 px-3.5 text-xs"
                >
                  Hapus kunci
                </button>
                <button type="button" onClick={saveKeys} className="btn-primary h-9 px-4 text-xs">
                  Simpan pengaturan
                </button>
              </div>
            </div>
          </div>
        ) : null}

        <div className="card-surface w-full max-w-3xl p-4 sm:p-5">
          <label htmlFor="belajar-prompt" className="sr-only">
            Topik yang mau dipelajari
          </label>
          <textarea
            id="belajar-prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => {
              if ((e.ctrlKey || e.metaKey) && e.key === "Enter") void handleGenerate();
            }}
            rows={3}
            maxLength={500}
            placeholder="Buat pelajaran dari materi kalkulus…"
            className="w-full resize-none rounded-xl bg-transparent text-[15px] leading-relaxed text-ink outline-none placeholder:text-muted/60"
          />
          {recording ? (
            <div className="mt-3 flex items-center justify-between rounded-xl border border-rose-400/20 bg-rose-400/10 px-4 py-3">
              <span className="flex items-center gap-2 text-sm font-medium text-rose-300">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400 opacity-60" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-rose-500" />
                </span>
                Merekam… {formatDuration(recordSeconds)}
              </span>
              <button type="button" onClick={stopRecording} className="btn-primary h-8 px-3 text-xs">
                Berhenti &amp; simpan
              </button>
            </div>
          ) : null}
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => void startRecording()}
              disabled={busy}
              className="chip gap-1.5 border-line/15 text-muted transition-colors hover:border-rose-400/40 hover:text-ink"
            >
              <Mic className="h-3.5 w-3.5" aria-hidden="true" />
              Rekam
            </button>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={busy}
              className="chip gap-1.5 border-line/15 text-muted transition-colors hover:border-aqua/40 hover:text-ink"
            >
              <Upload className="h-3.5 w-3.5" aria-hidden="true" />
              Unggah
            </button>
            <button
              type="button"
              onClick={() => setYoutubeOpen((o) => !o)}
              aria-expanded={youtubeOpen}
              className="chip gap-1.5 border-line/15 text-muted transition-colors hover:border-rose-500/40 hover:text-ink"
            >
              <MonitorPlay className="h-3.5 w-3.5" aria-hidden="true" />
              YouTube
            </button>
            {busy ? (
              <span className="flex items-center gap-2 text-xs text-muted">
                <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
                {status ?? "Memproses…"}
              </span>
            ) : null}
            <button
              type="button"
              onClick={() => void handleGenerate()}
              disabled={busy || !prompt.trim()}
              aria-label="Buat pelajaran"
              className="ml-auto flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-iris to-aqua text-white shadow-[0_10px_30px_-10px_rgba(139,92,246,0.7)] transition-transform hover:scale-105 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100"
            >
              {busy ? <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" /> : <ArrowUp className="h-5 w-5" aria-hidden="true" />}
            </button>
          </div>
          {youtubeOpen ? (
            <div className="mt-3 flex flex-col gap-2 rounded-xl border border-line/10 bg-line/[0.03] p-3 sm:flex-row">
              <input
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
                placeholder="Tempel tautan YouTube, mis. https://youtu.be/…"
                className="filter-select min-w-0 flex-1 pl-3"
              />
              <button type="button" onClick={() => void handleYoutube()} className="btn-primary h-10 px-4 text-xs">
                Tambahkan
              </button>
            </div>
          ) : null}
          <input
            ref={fileInputRef}
            type="file"
            accept="audio/*,video/*,image/*,.pdf,.txt,.md,.markdown,.csv,.json,.srt,.vtt"
            className="hidden"
            onChange={(e) => {
              void handleUpload(e.target.files?.[0]);
              e.target.value = "";
            }}
          />
        </div>
      </section>

      <section aria-labelledby="catatan-title">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 id="catatan-title" className="font-display text-xl font-bold tracking-[-0.02em] text-ink">
            Catatan
          </h2>
          <div className="flex flex-wrap items-center gap-2">
            <select
              value={folderFilter}
              onChange={(e) => setFolderFilter(e.target.value)}
              aria-label="Filter folder"
              className="filter-select h-9 w-auto pl-3 pr-8 text-xs"
            >
              <option value="semua">Semua folder</option>
              {allFolders.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>
            {addingFolder ? (
              <span className="flex items-center gap-1.5">
                <input
                  value={folderDraft}
                  onChange={(e) => setFolderDraft(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addFolder()}
                  placeholder="Nama folder"
                  autoFocus
                  className="filter-select h-9 w-36 pl-3 text-xs"
                />
                <button type="button" onClick={addFolder} className="btn-primary h-9 px-3 text-xs">
                  Buat
                </button>
                <button
                  type="button"
                  aria-label="Batal tambah folder"
                  onClick={() => {
                    setAddingFolder(false);
                    setFolderDraft("");
                  }}
                  className="icon-btn h-9 w-9"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              </span>
            ) : (
              <button type="button" onClick={() => setAddingFolder(true)} className="btn-ghost h-9 px-3 text-xs">
                <FolderPlus className="h-3.5 w-3.5" aria-hidden="true" />
                Folder baru
              </button>
            )}
            <div className="flex overflow-hidden rounded-full border border-line/10" role="group" aria-label="Mode tampilan">
              <button
                type="button"
                onClick={() => toggleView("galeri")}
                aria-pressed={viewMode === "galeri"}
                className={cn(
                  "flex h-9 items-center gap-1.5 px-3 text-xs font-medium transition-colors",
                  viewMode === "galeri" ? "bg-iris/15 text-ink" : "text-muted hover:text-ink",
                )}
              >
                <LayoutGrid className="h-3.5 w-3.5" aria-hidden="true" />
                Galeri
              </button>
              <button
                type="button"
                onClick={() => toggleView("daftar")}
                aria-pressed={viewMode === "daftar"}
                className={cn(
                  "flex h-9 items-center gap-1.5 px-3 text-xs font-medium transition-colors",
                  viewMode === "daftar" ? "bg-iris/15 text-ink" : "text-muted hover:text-ink",
                )}
              >
                <List className="h-3.5 w-3.5" aria-hidden="true" />
                Daftar
              </button>
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          {kindChips.map((chip) => (
            <button
              key={chip.id}
              type="button"
              onClick={() => setKindFilter(chip.id)}
              aria-pressed={kindFilter === chip.id}
              className={cn(
                "chip transition-colors",
                kindFilter === chip.id
                  ? "border-iris/40 bg-iris/15 text-ink"
                  : "border-line/15 text-muted hover:text-ink",
              )}
            >
              {chip.label}
            </button>
          ))}
          <span className="relative ml-auto">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted" aria-hidden="true" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari catatan…"
              aria-label="Cari catatan"
              className="filter-select h-9 w-44 pl-9 pr-3 text-xs"
            />
          </span>
        </div>

        {!ready ? (
          <div className="mt-8 flex items-center justify-center gap-2 text-sm text-muted">
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Memuat catatan…
          </div>
        ) : filtered.length === 0 ? (
          <div className="card-surface mt-6 flex flex-col items-center gap-3 p-10 text-center">
            <GraduationCap className="h-8 w-8 text-muted" aria-hidden="true" />
            <p className="text-sm text-muted">
              {notes.length === 0
                ? "Belum ada catatan. Tulis topik di atas, rekam, unggah materi, atau tambahkan video YouTube."
                : "Tidak ada catatan yang cocok dengan filter ini."}
            </p>
          </div>
        ) : viewMode === "galeri" ? (
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((note) => (
              <NoteCard key={note.id} note={note} onOpen={() => void openModal(note)} onDelete={() => void handleDelete(note)} />
            ))}
          </div>
        ) : (
          <div className="mt-6 space-y-2.5">
            {filtered.map((note) => (
              <NoteRow key={note.id} note={note} onOpen={() => void openModal(note)} onDelete={() => void handleDelete(note)} />
            ))}
          </div>
        )}
      </section>

      {openNote ? (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label={openNote.title}>
          <button type="button" aria-label="Tutup detail" onClick={closeModal} className="absolute inset-0 bg-canvas/80 backdrop-blur-sm" />
          <div className="card-surface relative max-h-[85vh] w-full max-w-2xl overflow-y-auto p-5 sm:p-6">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <span className="chip">{NOTE_KIND_LABEL[openNote.kind]}</span>
                <h3 className="mt-2 font-display text-lg font-bold tracking-[-0.02em] text-ink">{openNote.title}</h3>
                <p className="mt-1 text-xs text-muted">
                  {formatDate(openNote.createdAt)} · Folder {openNote.folder}
                  {openNote.provider ? ` · ${openNote.provider}` : ""}
                </p>
              </div>
              <button type="button" onClick={closeModal} aria-label="Tutup" className="icon-btn shrink-0">
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            <div className="mt-4">
              {openNote.kind === "youtube" && openNote.youtubeId ? (
                <div className="aspect-video w-full overflow-hidden rounded-xl border border-line/10">
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${openNote.youtubeId}`}
                    title={openNote.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="h-full w-full"
                  />
                </div>
              ) : null}
              {mediaUrl && openNote.kind === "audio" ? (
                <div className="rounded-xl border border-line/10 bg-line/[0.03] p-4">
                  {openNote.mediaType?.startsWith("video/") ? (
                    <video src={mediaUrl} controls className="w-full rounded-lg" />
                  ) : (
                    <audio src={mediaUrl} controls className="w-full" />
                  )}
                  {openNote.durationSec ? (
                    <p className="mt-2 text-xs text-muted">Durasi {formatDuration(openNote.durationSec)}</p>
                  ) : null}
                </div>
              ) : null}
              {mediaUrl && openNote.kind === "dokumen" && openNote.mediaType?.startsWith("image/") ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={mediaUrl} alt={openNote.title} className="max-h-72 w-auto rounded-xl border border-line/10" />
              ) : null}
              {mediaUrl && openNote.kind === "dokumen" && openNote.mediaType === "application/pdf" ? (
                <iframe src={mediaUrl} title={openNote.title} className="h-96 w-full rounded-xl border border-line/10" />
              ) : null}
              {mediaUrl && openNote.kind === "dokumen" && !openNote.mediaType?.startsWith("image/") && openNote.mediaType !== "application/pdf" ? (
                <a href={mediaUrl} download={openNote.mediaName ?? "berkas"} className="btn-ghost h-10 px-4 text-xs">
                  <File className="h-4 w-4" aria-hidden="true" />
                  Unduh {openNote.mediaName ?? "berkas"}
                </a>
              ) : null}
            </div>

            {openNote.text ? (
              <div className="mt-4">
                {slideMode && openNote.kind !== "audio" ? (
                  <SlideView text={openNote.text} index={slideIndex} onIndex={setSlideIndex} />
                ) : (
                  <div className="rounded-xl border border-line/[0.08] bg-line/[0.02] p-4">
                    <MarkdownBlocks text={openNote.text} />
                  </div>
                )}
              </div>
            ) : null}

            <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-line/[0.07] pt-4">
              {openNote.text && openNote.kind !== "audio" ? (
                <button
                  type="button"
                  onClick={() => {
                    setSlideMode((s) => !s);
                    setSlideIndex(0);
                  }}
                  aria-pressed={slideMode}
                  className="btn-ghost h-9 px-3.5 text-xs"
                >
                  <Presentation className="h-3.5 w-3.5" aria-hidden="true" />
                  {slideMode ? "Mode baca" : "Mode slide"}
                </button>
              ) : null}
              {(openNote.kind === "audio" || openNote.kind === "teks") && openNote.text.trim().length > 20 ? (
                <button
                  type="button"
                  onClick={() => void turnIntoLesson(openNote)}
                  disabled={busy}
                  className="btn-ghost h-9 px-3.5 text-xs"
                >
                  <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                  Ubah jadi pelajaran
                </button>
              ) : null}
              <select
                value={openNote.folder}
                onChange={(e) => void changeFolder(openNote, e.target.value)}
                aria-label="Pindah folder"
                className="filter-select h-9 w-auto pl-3 pr-8 text-xs"
              >
                <option value="Umum">Umum</option>
                {allFolders.map((f) => (
                  <option key={f} value={f}>
                    {f}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => void handleDelete(openNote)}
                className="btn-ghost ml-auto h-9 px-3.5 text-xs text-rose-300 hover:border-rose-400/30"
              >
                <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                Hapus
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function KindIcon({ kind }: { kind: NoteKind }) {
  const cls = "h-5 w-5";
  switch (kind) {
    case "audio":
      return <Volume2 className={cls} aria-hidden="true" />;
    case "youtube":
      return <MonitorPlay className={cls} aria-hidden="true" />;
    case "dokumen":
      return <File className={cls} aria-hidden="true" />;
    case "slide":
      return <Presentation className={cls} aria-hidden="true" />;
    default:
      return <FileText className={cls} aria-hidden="true" />;
  }
}

function NoteCard({ note, onOpen, onDelete }: { note: BelajarNote; onOpen: () => void; onDelete: () => void }) {
  return (
    <article className="card-surface group flex flex-col p-4">
      <div className="flex items-start justify-between gap-2">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-iris/10 text-aqua">
          <KindIcon kind={note.kind} />
        </span>
        <span className="chip">{NOTE_KIND_LABEL[note.kind]}</span>
      </div>
      <h3 className="mt-3 line-clamp-2 text-sm font-bold leading-snug text-ink">{note.title}</h3>
      {note.text ? <p className="mt-1.5 line-clamp-3 text-xs leading-relaxed text-muted">{excerpt(note.text)}</p> : null}
      {note.kind === "youtube" && note.youtubeId ? (
        <div className="relative mt-3 overflow-hidden rounded-lg border border-line/10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`https://i.ytimg.com/vi/${note.youtubeId}/hqdefault.jpg`} alt="" loading="lazy" className="aspect-video w-full object-cover" />
          <span className="absolute inset-0 flex items-center justify-center bg-canvas/30">
            <Play className="h-8 w-8 fill-white text-white drop-shadow" aria-hidden="true" />
          </span>
        </div>
      ) : null}
      <div className="mt-3 flex items-center justify-between gap-2 border-t border-line/[0.06] pt-3 text-[11px] text-muted">
        <span>
          {formatDate(note.createdAt)} · {note.folder}
          {note.durationSec ? ` · ${formatDuration(note.durationSec)}` : ""}
        </span>
        <span className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
          <button type="button" onClick={onOpen} className="btn-ghost h-7 px-2.5 text-[11px]">
            Buka
          </button>
          <button type="button" onClick={onDelete} aria-label={`Hapus ${note.title}`} className="icon-btn h-7 w-7 text-rose-300">
            <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </span>
      </div>
    </article>
  );
}

function NoteRow({ note, onOpen, onDelete }: { note: BelajarNote; onOpen: () => void; onDelete: () => void }) {
  return (
    <article className="card-surface flex items-center gap-3 p-3">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-iris/10 text-aqua">
        <KindIcon kind={note.kind} />
      </span>
      <div className="min-w-0 flex-1">
        <h3 className="truncate text-sm font-bold text-ink">{note.title}</h3>
        <p className="mt-0.5 truncate text-xs text-muted">
          {NOTE_KIND_LABEL[note.kind]} · {formatDate(note.createdAt)} · {note.folder}
          {note.durationSec ? ` · ${formatDuration(note.durationSec)}` : ""}
        </p>
      </div>
      <button type="button" onClick={onOpen} className="btn-ghost h-8 shrink-0 px-3 text-xs">
        Buka
      </button>
      <button type="button" onClick={onDelete} aria-label={`Hapus ${note.title}`} className="icon-btn h-8 w-8 shrink-0 text-rose-300">
        <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
      </button>
    </article>
  );
}

function SlideView({ text, index, onIndex }: { text: string; index: number; onIndex: (i: number) => void }) {
  const slides = useMemo(() => splitSlides(text), [text]);
  const safe = Math.min(index, slides.length - 1);
  const slide = slides[safe];
  return (
    <div className="rounded-xl border border-line/[0.08] bg-line/[0.02] p-5">
      <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-aqua">
        Slide {safe + 1} dari {slides.length}
      </p>
      <h4 className="mt-2 font-display text-lg font-bold text-ink">{slide.title}</h4>
      <div className="mt-3">
        <MarkdownBlocks text={slide.body || "_Bagian pembuka._"} />
      </div>
      <div className="mt-5 flex items-center justify-between">
        <button
          type="button"
          onClick={() => onIndex(Math.max(0, safe - 1))}
          disabled={safe === 0}
          className="btn-ghost h-9 px-3.5 text-xs disabled:opacity-40"
        >
          Sebelumnya
        </button>
        <div className="flex gap-1.5">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => onIndex(i)}
              aria-label={`Ke slide ${i + 1}`}
              className={cn("h-1.5 rounded-full transition-all", i === safe ? "w-5 bg-aqua" : "w-1.5 bg-line/30 hover:bg-line/50")}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => onIndex(Math.min(slides.length - 1, safe + 1))}
          disabled={safe === slides.length - 1}
          className="btn-ghost h-9 px-3.5 text-xs disabled:opacity-40"
        >
          Berikutnya
        </button>
      </div>
    </div>
  );
}
