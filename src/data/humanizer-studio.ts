import type { StepId } from "@/lib/writing/analyze";

export type StudioPreset = {
  focus: string;
  steps: StepId[];
  summary: string;
  guidance: string;
};

export const defaultStudioPreset: StudioPreset = {
  focus: "Parafrase kalimat",
  steps: ["rapikan", "padatkan", "formalkan", "pecah"],
  summary:
    "Rapikan mekanik, padatkan frasa bertele-tele, bakukan kata percakapan, lalu pecah kalimat yang terlalu panjang.",
  guidance:
    "Hasilnya berupa draf yang lebih rapi. Baca ulang dan sesuaikan istilah khusus sebelum dipakai.",
};

const studioPresets: Record<string, StudioPreset> = {
  quillbot: {
    focus: "Parafrase kalimat",
    steps: ["rapikan", "padatkan", "formalkan", "pecah"],
    summary:
      "Susunan kalimat: rapikan mekanik, padatkan frasa, bakukan kata, lalu pecah kalimat panjang.",
    guidance:
      "Bandingkan hasil dengan draf awal agar inti paragraf tetap sama, terutama pada kalimat yang memuat data.",
  },
  grammarly: {
    focus: "Tata bahasa & ejaan",
    steps: ["rapikan", "formalkan"],
    summary: "Pemeriksaan dasar: spasi, tanda baca, huruf awal kalimat, dan kata tidak baku.",
    guidance:
      "Fokus pada kerapian mekanik. Pilihan gaya dan nada tetap perlu kamu tinjau sendiri.",
  },
  "phrasly-ai": {
    focus: "Penyederhanaan kalimat",
    steps: ["padatkan", "formalkan", "pecah"],
    summary: "Ringkas frasa bertele-tele, bakukan kata, lalu pecah kalimat agar mudah diikuti.",
    guidance:
      "Penyederhanaan bisa menghilangkan nuansa. Pastikan argumen utama dan istilah teknis tetap utuh.",
  },
  "undetectable-ai": {
    focus: "Penulisan ulang & gaya",
    steps: ["rapikan", "padatkan", "formalkan"],
    summary: "Rapikan teks, padatkan frasa, dan bakukan kata agar gaya tulisan lebih konsisten.",
    guidance:
      "Gunakan sebagai pembanding gaya, bukan untuk mengaburkan asal-usul tulisan atau menghindari aturan kampus.",
  },
  "hix-ai": {
    focus: "Draf & parafrase",
    steps: ["rapikan", "padatkan", "formalkan", "pecah"],
    summary: "Ubah catatan kasar menjadi draf yang lebih runtut dan mudah dibaca.",
    guidance:
      "Draf awal bukan tulisan jadi. Tambahkan sumber, contoh, dan penjelasan dengan bahasamu sendiri.",
  },
  writehuman: {
    focus: "Gaya alami",
    steps: ["padatkan", "pecah"],
    summary: "Kurangi frasa kaku dan pecah kalimat agar ritme tulisan lebih alami.",
    guidance:
      "Bandingkan versi asli dan hasilnya supaya informasi tidak bergeser.",
  },
  stealthwriter: {
    focus: "Struktur kalimat",
    steps: ["rapikan", "pecah"],
    summary: "Perbaiki kerapian dasar dan struktur kalimat yang terlalu panjang.",
    guidance:
      "Periksa ulang setiap kalimat hasil pemecahan agar hubungan antaride tetap jelas.",
  },
  smodin: {
    focus: "Parafrase teks panjang",
    steps: ["rapikan", "padatkan", "formalkan", "pecah"],
    summary: "Alur parafrase untuk paragraf atau dokumen yang lebih panjang.",
    guidance:
      "Sitasi dan daftar pustaka diperiksa terpisah; parafrase tidak menggantikan keduanya.",
  },
  wordtune: {
    focus: "Kelancaran kalimat",
    steps: ["pecah", "padatkan"],
    summary: "Pecah kalimat panjang lalu padatkan frasa agar lebih enak dibaca.",
    guidance:
      "Pilih hasil yang paling dekat dengan maksud aslimu, bukan yang paling panjang.",
  },
  "ryne-ai": {
    focus: "Alur akademik",
    steps: ["rapikan", "formalkan", "padatkan"],
    summary: "Rapikan mekanik, bakukan kata percakapan, lalu padatkan frasa.",
    guidance:
      "Tetap ikuti aturan sitasi dan integritas akademik kampusmu. Alat ini tidak menggantikan bimbingan dosen.",
  },
};

export function getStudioPreset(slug?: string | null): StudioPreset {
  if (slug && studioPresets[slug]) return studioPresets[slug];
  return defaultStudioPreset;
}

export function hasStudioMode(slug: string): boolean {
  return Boolean(studioPresets[slug]);
}
