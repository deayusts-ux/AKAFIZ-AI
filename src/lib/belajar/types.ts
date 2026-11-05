export type NoteKind = "teks" | "slide" | "dokumen" | "audio" | "youtube";

export type NoteSource = "ketik" | "rekam" | "unggah" | "youtube" | "ai";

export interface BelajarNote {
  id: string;
  kind: NoteKind;
  title: string;
  text: string;
  folder: string;
  createdAt: number;
  mediaType: string | null;
  mediaName: string | null;
  youtubeId: string | null;
  durationSec: number | null;
  source: NoteSource;
  provider: string | null;
  parentId?: string;
}

export const NOTE_KIND_LABEL: Record<NoteKind, string> = {
  teks: "Teks",
  slide: "Slide",
  dokumen: "Dokumen",
  audio: "Audio",
  youtube: "YouTube",
};

export const DEFAULT_FOLDER = "Umum";

export function createId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `note-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

export function formatDuration(totalSec: number | null): string {
  if (!totalSec || totalSec <= 0) return "0:00";
  const m = Math.floor(totalSec / 60);
  const s = Math.floor(totalSec % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

export function youtubeIdFromUrl(raw: string): string | null {
  const url = raw.trim();
  if (!url) return null;
  const patterns = [
    /(?:youtube\.com\/watch\?[^#]*v=)([\w-]{6,})/,
    /(?:youtube\.com\/shorts\/)([\w-]{6,})/,
    /(?:youtube\.com\/embed\/)([\w-]{6,})/,
    /(?:youtu\.be\/)([\w-]{6,})/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  if (/^[\w-]{11}$/.test(url)) return url;
  return null;
}
