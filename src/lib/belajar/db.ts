import type { BelajarNote } from "./types";

const DB_NAME = "legacy-belajar";
const DB_VERSION = 1;
const NOTES_STORE = "notes";
const BLOBS_STORE = "blobs";

let dbPromise: Promise<IDBDatabase> | null = null;

function openDb(): Promise<IDBDatabase> {
  if (dbPromise) return dbPromise;
  dbPromise = new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(NOTES_STORE)) {
        const store = db.createObjectStore(NOTES_STORE, { keyPath: "id" });
        store.createIndex("createdAt", "createdAt");
      }
      if (!db.objectStoreNames.contains(BLOBS_STORE)) {
        db.createObjectStore(BLOBS_STORE);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error ?? new Error("IndexedDB gagal dibuka"));
  });
  return dbPromise;
}

function tx<T>(db: IDBDatabase, store: string, mode: IDBTransactionMode, run: (s: IDBObjectStore) => IDBRequest<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(store, mode);
    const request = run(transaction.objectStore(store));
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error ?? new Error("IndexedDB error"));
  });
}

export async function listNotes(): Promise<BelajarNote[]> {
  const db = await openDb();
  const notes = await tx<BelajarNote[]>(db, NOTES_STORE, "readonly", (s) => s.getAll() as IDBRequest<BelajarNote[]>);
  return notes.sort((a, b) => b.createdAt - a.createdAt);
}

export async function saveNote(note: BelajarNote, blob?: Blob | null): Promise<void> {
  const db = await openDb();
  await tx(db, NOTES_STORE, "readwrite", (s) => s.put(note));
  if (blob) await tx(db, BLOBS_STORE, "readwrite", (s) => s.put(blob, note.id));
}

export async function loadBlob(noteId: string): Promise<Blob | null> {
  const db = await openDb();
  const blob = await tx<Blob | undefined>(db, BLOBS_STORE, "readonly", (s) => s.get(noteId) as IDBRequest<Blob | undefined>);
  return blob ?? null;
}

export async function deleteNote(noteId: string): Promise<void> {
  const db = await openDb();
  await tx(db, NOTES_STORE, "readwrite", (s) => s.delete(noteId));
  await tx(db, BLOBS_STORE, "readwrite", (s) => s.delete(noteId));
}
