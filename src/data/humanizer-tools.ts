export type HumanizerTool = {
  slug: string;
  name: string;
  domain: string;
  website: string;
  strength: string;
  description: string;
  bestFor: string;
  note: string;
  tags: string[];
  accent: string;
  accentAlt: string;
  recommendation?: { rank: number; reason: string };
};

export const humanizerTools: HumanizerTool[] = [
  {
    slug: "quillbot",
    name: "QuillBot",
    domain: "quillbot.com",
    website: "https://quillbot.com/",
    strength: "Parafrase dan memperbaiki alur tulisan.",
    description:
      "Menyusun ulang kalimat dengan beberapa mode parafrase, pemeriksa tata bahasa, dan peringkas. Berguna untuk merapikan paragraf yang bertele-tele tanpa mengubah inti.",
    bestFor: "Merapikan susunan kalimat pada draf esai dan paragraf.",
    note: "Periksa kembali istilah khusus setelah diparafrase agar maknanya tetap tepat.",
    tags: ["Parafrase", "Tata bahasa", "Ringkasan"],
    accent: "#34d399",
    accentAlt: "#22d3ee",
    recommendation: { rank: 1, reason: "Untuk memperbaiki susunan kalimat." },
  },
  {
    slug: "grammarly",
    name: "Grammarly",
    domain: "grammarly.com",
    website: "https://www.grammarly.com/",
    strength: "Memperbaiki gaya bahasa dan tata bahasa.",
    description:
      "Pemeriksa tata bahasa, ejaan, tanda baca, dan kejelasan gaya dengan saran yang muncul langsung saat menulis. Cocok sebagai tahap penyuntingan terakhir.",
    bestFor: "Meninjau tata bahasa dan konsistensi gaya sebelum dikumpulkan.",
    note: "Saran gaya bisa mengubah nada tulisan; pilih yang sesuai konteks akademikmu.",
    tags: ["Tata bahasa", "Gaya bahasa", "Penyuntingan"],
    accent: "#22c55e",
    accentAlt: "#14b8a6",
    recommendation: { rank: 2, reason: "Untuk memperbaiki tata bahasa." },
  },
  {
    slug: "phrasly-ai",
    name: "Phrasly AI",
    domain: "phrasly.ai",
    website: "https://phrasly.ai/",
    strength: "Menyusun ulang kalimat.",
    description:
      "Berfokus pada penulisan ulang dan penyederhanaan kalimat agar terasa lebih alami. Hasilnya perlu dibaca ulang, terutama pada kalimat yang memuat data atau istilah teknis.",
    bestFor: "Mengubah struktur kalimat yang kaku menjadi lebih mengalir.",
    note: "Penyederhanaan bisa menghilangkan nuansa; pastikan argumen utama tetap utuh.",
    tags: ["Parafrase", "Penyederhanaan", "Gaya"],
    accent: "#a78bfa",
    accentAlt: "#6366f1",
  },
  {
    slug: "undetectable-ai",
    name: "Undetectable AI",
    domain: "undetectable.ai",
    website: "https://undetectable.ai/",
    strength: "Penulisan ulang teks.",
    description:
      "Menawarkan penulisan ulang teks dengan beberapa pilihan gaya, serta alat pemeriksaan. Gunakan untuk memperbaiki keterbacaan, bukan untuk menggantikan proses belajar.",
    bestFor: "Membandingkan variasi gaya penulisan dari teks yang sama.",
    note: "Klaim deteksi bukan jaminan; tidak ada alat yang bisa menjamin lolos AI detector.",
    tags: ["Penulisan ulang", "Gaya", "Pemeriksaan"],
    accent: "#38bdf8",
    accentAlt: "#6366f1",
  },
  {
    slug: "hix-ai",
    name: "HIX AI",
    domain: "hix.ai",
    website: "https://hix.ai/",
    strength: "Membantu penulisan dan parafrase.",
    description:
      "Rangkaian alat tulis dengan parafrase, perluasan ide, dan penyuntingan. Berguna untuk mengubah catatan kasar menjadi draf awal yang lebih runtut.",
    bestFor: "Menyusun draf awal dari poin-poin atau catatan singkat.",
    note: "Tetap sunting manual sebelum final; draf awal bukan tulisan jadi.",
    tags: ["Parafrase", "Draf", "Penyuntingan"],
    accent: "#f472b6",
    accentAlt: "#a855f7",
  },
  {
    slug: "writehuman",
    name: "WriteHuman",
    domain: "writehuman.ai",
    website: "https://writehuman.ai/",
    strength: "Mengubah gaya penulisan.",
    description:
      "Menulis ulang teks agar gaya bahasanya terasa lebih natural dan tidak seragam. Cocok untuk membandingkan beberapa versi kalimat sebelum memilih yang paling jelas.",
    bestFor: "Mengubah gaya tulisan yang terasa kaku atau monoton.",
    note: "Bandingkan versi asli dan hasilnya agar informasi tidak bergeser.",
    tags: ["Gaya", "Penulisan ulang", "Kejelasan"],
    accent: "#fb7185",
    accentAlt: "#f59e0b",
  },
  {
    slug: "stealthwriter",
    name: "StealthWriter",
    domain: "stealthwriter.ai",
    website: "https://stealthwriter.ai/",
    strength: "Alternatif penulisan ulang.",
    description:
      "Alternatif penulisan ulang dengan fokus pada gaya dan struktur kalimat. Gunakan sebagai pembanding saat kamu ingin melihat pendekatan lain dalam menyusun paragraf.",
    bestFor: "Membandingkan struktur paragraf dari sudut pandang lain.",
    note: "Hasil penulisan ulang tetap harus kamu pahami dan pertanggungjawabkan.",
    tags: ["Penulisan ulang", "Struktur", "Alternatif"],
    accent: "#94a3b8",
    accentAlt: "#64748b",
  },
  {
    slug: "smodin",
    name: "Smodin",
    domain: "smodin.io",
    website: "https://smodin.io/",
    strength: "Parafrase berbagai jenis teks.",
    description:
      "Menyediakan parafrase untuk berbagai jenis teks dan kebutuhan penulisan, dari paragraf pendek sampai dokumen tugas yang lebih panjang.",
    bestFor: "Memparafrase teks yang panjang dan beragam.",
    note: "Periksa sitasi dan daftar pustaka secara terpisah; parafrase tidak menggantikannya.",
    tags: ["Parafrase", "Dokumen", "Teks panjang"],
    accent: "#22d3ee",
    accentAlt: "#38bdf8",
  },
  {
    slug: "wordtune",
    name: "Wordtune",
    domain: "wordtune.com",
    website: "https://www.wordtune.com/",
    strength: "Membuat kalimat lebih mengalir.",
    description:
      "Menawarkan alternatif kalimat dan penulisan ulang singkat untuk memperbaiki ritme serta kejelasan. Cocok untuk kalimat yang terasa janggal saat dibaca.",
    bestFor: "Memperbaiki kalimat yang kaku agar lebih enak dibaca.",
    note: "Pilih alternatif yang paling dekat dengan maksud aslimu, bukan yang paling panjang.",
    tags: ["Kalimat", "Kelancaran", "Kejelasan"],
    accent: "#f59e0b",
    accentAlt: "#fb7185",
    recommendation: { rank: 3, reason: "Untuk membuat tulisan lebih mengalir." },
  },
  {
    slug: "ryne-ai",
    name: "Ryne AI",
    domain: "ryne.ai",
    website: "https://ryne.ai/",
    strength: "Membantu proses penulisan akademik.",
    description:
      "Berfokus pada alur penulisan akademik, dari menyusun draf hingga merapikan gaya. Tetap ikuti aturan sitasi dan integritas akademik yang berlaku di kampusmu.",
    bestFor: "Merapikan alur draf tugas dan karya tulis.",
    note: "Tidak menggantikan bimbingan dosen, riset sumber, atau kejujuran akademik.",
    tags: ["Akademik", "Draf", "Alur tulisan"],
    accent: "#c084fc",
    accentAlt: "#6366f1",
  },
];

export const recommendedHumanizers = humanizerTools
  .filter((tool): tool is HumanizerTool & { recommendation: { rank: number; reason: string } } =>
    Boolean(tool.recommendation),
  )
  .sort((a, b) => a.recommendation.rank - b.recommendation.rank);

export const humanizerStats = {
  tools: humanizerTools.length,
  official: humanizerTools.length,
  recommendations: recommendedHumanizers.length,
};
