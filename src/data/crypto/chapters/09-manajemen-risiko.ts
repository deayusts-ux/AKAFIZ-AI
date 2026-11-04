import type { Chapter } from "../types";

export const chapterRisiko: Chapter = {
  slug: "manajemen-risiko",
  order: 9,
  title: "Manajemen Risiko",
  shortTitle: "Manajemen Risiko",
  subtitle: "Bertahan lebih lama daripada mencoba menang setiap kali",
  description:
    "Ukuran posisi, stop loss, risk-reward, expectancy, leverage, drawdown, diversifikasi, dan jurnal. Bagian yang paling menentukan hasil jangka panjang.",
  level: "Lanjutan",
  minutes: 48,
  icon: "ShieldCheck",
  accent: "#4ade80",
  objectives: [
    "Menghitung ukuran posisi berdasarkan risiko.",
    "Memahami expectancy dan hubungan win rate dengan R:R.",
    "Mengukur bahaya leverage dan drawdown.",
    "Membangun kebiasaan jurnal dan batas kerugian.",
  ],
  sections: [
    {
      id: "risiko-per-trade",
      heading: "Risiko per transaksi harus dibatasi",
      paragraphs: [
        "Aturan umum adalah mempertaruhkan hanya satu sampai dua persen modal per transaksi. Angka ini bukan jaminan, tetapi membatasi kerugian agar satu kesalahan tidak menghapus banyak keuntungan.",
        "Jika modal 1.000 dolar dan risiko 1 persen, kerugian maksimum per transaksi adalah 10 dolar. Ukuran posisi dihitung dari jarak entry ke stop, bukan dari perasaan optimis.",
        "Semakin lebar stop, semakin kecil ukuran posisi agar nominal risiko tetap sama. Ini kebalikan dari kebiasaan banyak pemula yang memperbesar posisi justru ketika stop-nya lebar.",
      ],
      callout: {
        tone: "tip",
        title: "Rumus ukuran posisi",
        body: "Ukuran posisi = (modal × risiko persen) ÷ jarak entry ke stop. Tentukan stop dulu, lalu hitung ukuran, bukan sebaliknya.",
      },
      visual: {
        kind: "risk",
        caption:
          "Risiko 1 persen per transaksi membuat kerugian beruntun tetap terukur. Ilustrasi ini edukasi, bukan simulasi hasil nyata.",
      },
    },
    {
      id: "stop",
      heading: "Stop loss dan invalidasi",
      paragraphs: [
        "Stop loss adalah perintah untuk keluar ketika harga mencapai level yang membuktikan ide trading salah. Stop bukan tanda kegagalan pribadi, melainkan biaya menjalankan rencana.",
        "Stop yang terlalu rapat membuat posisi mudah tersentuh noise. Stop yang terlalu lebar memperbesar kerugian. Keseimbangan dicari dengan menempatkan stop di balik struktur, lalu menyesuaikan ukuran posisi.",
        "Jangan memindahkan stop menjauh saat harga melawan. Jika ingin mengurangi risiko, pindahkan stop ke titik impas hanya setelah harga bergerak cukup jauh dan struktur mendukung.",
      ],
    },
    {
      id: "risk-reward",
      heading: "Risk-reward dan expectancy",
      paragraphs: [
        "Risk-reward 1:3 berarti kamu mempertaruhkan satu unit untuk potensi tiga unit. Dengan rasio ini, kamu tidak perlu menang setiap kali. Menang 40 persen dari transaksi bisa tetap menghasilkan jika rata-rata kemenangan tiga kali lebih besar dari kerugian.",
        "Expectancy mengukur hasil rata-rata per transaksi: (win rate × rata-rata menang) minus (loss rate × rata-rata kalah). Sistem dengan win rate tinggi tetapi kerugian besar bisa tetap merugi.",
        "Jangan mengejar win rate sempurna. Lebih baik memiliki sistem dengan ekspektasi positif yang bisa dijalankan konsisten daripada sistem yang jarang kalah tetapi sekali kalah menghapus semua.",
      ],
      bullets: [
        "Win rate 50% dengan R:R 1:2 memberi ekspektasi positif.",
        "Win rate 80% dengan kerugian 5R bisa tetap negatif.",
        "R:R harus realistis dengan target struktural.",
        "Satu transaksi tidak menentukan kualitas sistem.",
      ],
    },
    {
      id: "leverage",
      heading: "Leverage, margin, dan likuidasi",
      paragraphs: [
        "Leverage memperbesar ukuran posisi tanpa memperbesar modal. Dengan leverage 20x, pergerakan 5 persen melawan posisi bisa menghapus margin. Biaya funding dan spread juga ikut mempercepat kerugian.",
        "Leverage tidak mengubah kualitas ide. Jika setup buruk, leverage hanya membuat kerugian lebih cepat. Jika setup baik, leverage tetap menambah risiko likuidasi akibat noise.",
        "Gunakan leverage hanya jika kamu benar-benar memahami mekanisme margin, liquidation price, dan dampaknya terhadap ukuran posisi. Bagi pemula, spot dan risiko terbatas jauh lebih sehat.",
      ],
      callout: {
        tone: "warning",
        title: "Risiko nyata leverage",
        body: "Leverage 10x bukan berarti keuntungan 10x. Ia berarti kerugian 10x lebih cepat dan likuidasi lebih dekat.",
      },
    },
    {
      id: "drawdown",
      heading: "Drawdown dan matematika pemulihan",
      paragraphs: [
        "Drawdown adalah penurunan dari puncak modal. Jika modal turun 50 persen, kamu perlu kenaikan 100 persen hanya untuk kembali ke titik awal. Semakin dalam drawdown, semakin berat pemulihannya.",
        "Karena itu, melindungi modal lebih penting daripada mengejar keuntungan cepat. Batasi kerugian harian atau mingguan, dan berhenti ketika batas itu tercapai.",
        "Diversifikasi dapat mengurangi risiko spesifik satu aset, tetapi tidak menghilangkan risiko pasar. Saat seluruh pasar turun, banyak aset crypto bergerak searah karena korelasi meningkat.",
      ],
      bullets: [
        "Turun 20% butuh naik 25% untuk pulih.",
        "Turun 50% butuh naik 100% untuk pulih.",
        "Turun 80% butuh naik 400% untuk pulih.",
        "Batas kerugian lebih penting daripada target keuntungan.",
      ],
    },
    {
      id: "jurnal",
      heading: "Jurnal, aturan, dan kesehatan mental",
      paragraphs: [
        "Catat setiap transaksi: alasan masuk, timeframe, level, ukuran, hasil, dan emosi. Tanpa catatan, kamu tidak bisa membedakan keberuntungan dari proses yang benar.",
        "Tetapkan aturan tertulis sebelum pasar bergerak: risiko per transaksi, maksimum transaksi per hari, jam trading, dan kondisi untuk berhenti. Aturan melindungi kamu dari keputusan impulsif.",
        "Tidur cukup, hindari trading saat emosi tidak stabil, dan jangan memakai uang untuk kebutuhan hidup. Kesehatan mental adalah bagian dari manajemen risiko, bukan topik terpisah.",
      ],
      callout: {
        tone: "info",
        title: "Edukasi, bukan nasihat investasi",
        body: "Semua contoh angka di sini bersifat ilustrasi. Tidak ada sistem yang menjamin keuntungan, dan kerugian selalu mungkin terjadi.",
      },
    },
  ],
  takeaways: [
    "Risiko per transaksi harus dibatasi, umumnya 1 sampai 2 persen.",
    "Ukuran posisi dihitung dari jarak stop, bukan dari keyakinan.",
    "Expectancy lebih penting daripada win rate semata.",
    "Leverage mempercepat kerugian dan likuidasi.",
    "Jurnal dan batas kerugian melindungi dari keputusan impulsif.",
  ],
  quiz: [
    {
      id: "q9-1",
      chapter: "manajemen-risiko",
      question: "Jika modal 1.000 dolar dan risiko 1 persen, kerugian maksimum per transaksi adalah...",
      options: ["1 dolar", "10 dolar", "100 dolar", "500 dolar"],
      answer: 1,
      explanation:
        "Satu persen dari 1.000 dolar adalah 10 dolar. Nominal ini menjadi batas kerugian bila stop tersentuh.",
    },
    {
      id: "q9-2",
      chapter: "manajemen-risiko",
      question: "Rumus ukuran posisi yang benar adalah...",
      options: [
        "Modal × risiko persen ÷ jarak entry ke stop",
        "Modal × harga ÷ volume",
        "Harga entry × leverage",
        "Jumlah follower × harga",
      ],
      answer: 0,
      explanation:
        "Ukuran posisi ditentukan dari nominal risiko dibagi jarak stop. Stop ditentukan lebih dulu berdasarkan struktur.",
    },
    {
      id: "q9-3",
      chapter: "manajemen-risiko",
      question: "Risk-reward 1:3 berarti...",
      options: [
        "Risiko satu unit untuk potensi tiga unit",
        "Risiko tiga unit untuk potensi satu unit",
        "Pasti menang tiga kali",
        "Tidak ada risiko",
      ],
      answer: 0,
      explanation:
        "Rasio 1:3 berarti potensi keuntungan tiga kali lebih besar dari risiko yang diambil.",
    },
    {
      id: "q9-4",
      chapter: "manajemen-risiko",
      question: "Stop loss sebaiknya ditentukan berdasarkan...",
      options: [
        "Struktur dan level invalidasi",
        "Kenyamanan emosi semata",
        "Jumlah modal yang ingin dipakai",
        "Jumlah follower",
      ],
      answer: 0,
      explanation:
        "Stop harus berada di tempat ide trading terbukti salah, lalu ukuran posisi menyesuaikan risiko.",
    },
    {
      id: "q9-5",
      chapter: "manajemen-risiko",
      question: "Leverage 10x berarti...",
      options: [
        "Keuntungan pasti 10x",
        "Kerugian dan likuidasi bisa terjadi 10x lebih cepat",
        "Tidak ada risiko",
        "Bunga nol selamanya",
      ],
      answer: 1,
      explanation:
        "Leverage memperbesar eksposur, bukan kepastian untung. Pergerakan kecil melawan posisi bisa menghapus margin.",
    },
    {
      id: "q9-6",
      chapter: "manajemen-risiko",
      question: "Expectancy mengukur...",
      options: [
        "Hasil rata-rata per transaksi berdasarkan peluang dan ukuran menang/kalah",
        "Harga tertinggi harian",
        "Jumlah token beredar",
        "Besar funding rate",
      ],
      answer: 0,
      explanation:
        "Expectancy menggabungkan win rate dengan rata-rata kemenangan dan kerugian untuk melihat apakah sistem memiliki ekspektasi positif.",
    },
    {
      id: "q9-7",
      chapter: "manajemen-risiko",
      question: "Setelah drawdown 50 persen, berapa kenaikan yang dibutuhkan untuk kembali ke titik awal?",
      options: ["25 persen", "50 persen", "100 persen", "200 persen"],
      answer: 2,
      explanation:
        "Dari 50 menjadi 100 dibutuhkan kenaikan 100 persen. Semakin dalam drawdown, semakin berat pemulihannya.",
    },
    {
      id: "q9-8",
      chapter: "manajemen-risiko",
      question: "Mengapa jurnal trading penting?",
      options: [
        "Untuk mengevaluasi proses dan membedakan keberuntungan dari keputusan yang benar",
        "Untuk menjamin semua transaksi menang",
        "Untuk menaikkan harga aset",
        "Untuk menghindari pajak",
      ],
      answer: 0,
      explanation:
        "Jurnal membantu melihat pola kesalahan, mengukur konsistensi, dan memperbaiki proses dari waktu ke waktu.",
    },
    {
      id: "q9-9",
      chapter: "manajemen-risiko",
      question: "Diversifikasi crypto...",
      options: [
        "Menghilangkan semua risiko",
        "Mengurangi risiko spesifik aset, tetapi tidak menghilangkan risiko pasar",
        "Menjamin keuntungan",
        "Membuat leverage aman",
      ],
      answer: 1,
      explanation:
        "Diversifikasi membantu mengurangi risiko satu aset, tetapi saat pasar turun secara luas korelasi bisa meningkat.",
    },
    {
      id: "q9-10",
      chapter: "manajemen-risiko",
      question: "Uang yang digunakan untuk trading sebaiknya...",
      options: [
        "Uang kebutuhan hidup",
        "Uang pinjaman tanpa rencana",
        "Dana yang siap kehilangan sebagian atau seluruhnya",
        "Uang sekolah anak",
      ],
      answer: 2,
      explanation:
        "Hanya gunakan dana yang siap menghadapi risiko. Uang kebutuhan hidup atau pinjaman dapat memperburuk tekanan emosi dan keuangan.",
    },
  ],
};
