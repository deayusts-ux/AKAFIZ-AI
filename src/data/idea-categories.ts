import type { IdeaCategory } from "@/lib/idea-types";

export const ideaCategories: IdeaCategory[] = [
  {
    slug: "arsitektur-desain-bangunan",
    name: "Arsitektur & Desain Bangunan",
    shortName: "Arsitektur",
    tagline: "Referensi proyek, material, dan ide ruang.",
    description:
      "Dari rumah tinggal sampai kawasan kota: sumber proyek nyata, detail material, dan tren desain untuk memperkaya proses merancang.",
    icon: "building",
    accent: "#fb923c",
    accentAlt: "#f43f5e",
  },
  {
    slug: "akuntansi-keuangan",
    name: "Akuntansi & Keuangan",
    shortName: "Akuntansi",
    tagline: "Pahami angka, laporan, dan pasar.",
    description:
      "Materi siklus akuntansi, standar pelaporan, analisis keuangan, dan istilah ekonomi yang dipakai di dunia kerja.",
    icon: "calculator",
    accent: "#4ade80",
    accentAlt: "#2dd4bf",
  },
  {
    slug: "teknik-informatika-komputer",
    name: "Teknik Informatika & Komputer",
    shortName: "Informatika",
    tagline: "Belajar coding sampai dokumentasi teknis.",
    description:
      "Kurikulum pemrograman, dokumentasi web, repositori kode, dan forum tempat masalah teknis dibahas bersama.",
    icon: "code",
    accent: "#22d3ee",
    accentAlt: "#3b82f6",
  },
  {
    slug: "teknik-sipil",
    name: "Teknik Sipil",
    shortName: "Sipil",
    tagline: "Struktur, konstruksi, dan standar proyek.",
    description:
      "Referensi tentang beton, baja, pondasi, metode konstruksi, dan organisasi profesi teknik sipil.",
    icon: "hardhat",
    accent: "#f59e0b",
    accentAlt: "#f97316",
  },
  {
    slug: "hukum",
    name: "Hukum",
    shortName: "Hukum",
    tagline: "Peraturan, putusan, dan analisis hukum.",
    description:
      "Database peraturan Indonesia, artikel hukum, dan mesin pencari literatur untuk riset legal.",
    icon: "scale",
    accent: "#a78bfa",
    accentAlt: "#6366f1",
  },
  {
    slug: "kedokteran-kesehatan",
    name: "Kedokteran & Kesehatan",
    shortName: "Kesehatan",
    tagline: "Riset medis dan informasi kesehatan.",
    description:
      "Database literatur biomedis, ringkasan kesehatan untuk publik, dan informasi resmi organisasi kesehatan dunia.",
    icon: "health",
    accent: "#34d399",
    accentAlt: "#22d3ee",
  },
  {
    slug: "manajemen-bisnis",
    name: "Manajemen & Bisnis",
    shortName: "Bisnis",
    tagline: "Strategi, model bisnis, dan pertumbuhan.",
    description:
      "Riset manajemen, kerangka strategi, pemasaran, dan wawasan industri dari sumber bisnis terkemuka.",
    icon: "briefcase",
    accent: "#f97316",
    accentAlt: "#ef4444",
  },
  {
    slug: "desain-grafis-dkv",
    name: "Desain Grafis & DKV",
    shortName: "Desain",
    tagline: "Portofolio, inspirasi, dan aset visual.",
    description:
      "Galeri karya desainer, referensi UI/UX, aset grafis, dan tipografi untuk proyek visual.",
    icon: "palette",
    accent: "#f472b6",
    accentAlt: "#a855f7",
  },
  {
    slug: "psikologi",
    name: "Psikologi",
    shortName: "Psikologi",
    tagline: "Perilaku manusia, riset, dan praktik.",
    description:
      "Jurnal, artikel, dan materi pengantar psikologi untuk mahasiswa maupun praktisi.",
    icon: "psychology",
    accent: "#c084fc",
    accentAlt: "#8b5cf6",
  },
  {
    slug: "pertanian-peternakan",
    name: "Pertanian & Peternakan",
    shortName: "Pertanian",
    tagline: "Pangan, ternak, dan data sektor.",
    description:
      "Informasi kebijakan, praktik budidaya, data pertanian, dan penelitian ilmiah bidang pangan.",
    icon: "sprout",
    accent: "#a3e635",
    accentAlt: "#22c55e",
  },
  {
    slug: "teknik-elektro-mesin",
    name: "Teknik Elektro & Mesin",
    shortName: "Elektro",
    tagline: "Rangkaian, rumus, dan model teknik.",
    description:
      "Referensi rangkaian listrik, standar profesi, rumus teknik, dan model CAD untuk perancangan.",
    icon: "bolt",
    accent: "#facc15",
    accentAlt: "#f97316",
  },
  {
    slug: "pendidikan-keguruan",
    name: "Pendidikan & Keguruan",
    shortName: "Pendidikan",
    tagline: "Metode mengajar dan bahan ajar.",
    description:
      "Strategi pembelajaran, kursus daring, dan alat bantu membuat bahan ajar untuk guru dan dosen.",
    icon: "education",
    accent: "#38bdf8",
    accentAlt: "#6366f1",
  },
  {
    slug: "komunikasi-jurnalistik",
    name: "Ilmu Komunikasi & Jurnalistik",
    shortName: "Komunikasi",
    tagline: "Menulis, memverifikasi, dan menyampaikan.",
    description:
      "Panduan jurnalistik, referensi pemberitaan, standar penulisan, dan alat konten visual.",
    icon: "radio",
    accent: "#fb7185",
    accentAlt: "#f97316",
  },
  {
    slug: "matematika-sains",
    name: "Matematika & Sains",
    shortName: "Sains",
    tagline: "Hitung, visualkan, dan teliti.",
    description:
      "Alat komputasi, grafik matematika, geometri interaktif, dan jurnal penelitian ilmiah.",
    icon: "sigma",
    accent: "#60a5fa",
    accentAlt: "#22d3ee",
  },
];

export const ideaCategoryBySlug = new Map(
  ideaCategories.map((category) => [category.slug, category]),
);

export function getIdeaCategory(slug: string): IdeaCategory | undefined {
  return ideaCategoryBySlug.get(slug);
}
