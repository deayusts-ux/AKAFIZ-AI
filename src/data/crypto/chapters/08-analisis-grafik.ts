import type { Chapter } from "../types";

export const chapterAnalisis: Chapter = {
  slug: "analisis-grafik",
  order: 8,
  title: "Dasar Analisis Grafik",
  shortTitle: "Analisis Grafik",
  subtitle: "Menyusun timeframe, struktur, pola, dan konfirmasi menjadi satu rencana",
  description:
    "Dari top-down analysis hingga pola chart seperti triangle, flag, dan double top. Ditutup dengan cara menyusun entry, invalidasi, dan target secara logis.",
  level: "Menengah",
  minutes: 46,
  icon: "LineChart",
  accent: "#60a5fa",
  objectives: [
    "Menyusun analisis dari timeframe besar ke kecil.",
    "Mengenali pola chart lanjutan dan pembalikan.",
    "Menggabungkan struktur, level, candle, dan volume.",
    "Menyusun rencana entry dan invalidasi sebelum eksekusi.",
  ],
  sections: [
    {
      id: "top-down",
      heading: "Analisis dari besar ke kecil",
      paragraphs: [
        "Mulai dari timeframe besar seperti D1 atau H4 untuk memahami tren dan area utama. Setelah itu, turun ke H1 atau M15 untuk mencari lokasi entry yang lebih presisi. Arah besar memberi konteks, timeframe kecil memberi timing.",
        "Jika D1 sedang tren turun kuat, setup beli di M5 adalah trading melawan arus. Itu bukan mustahil, tetapi peluangnya lebih kecil dan butuh target lebih pendek serta disiplin lebih tinggi.",
        "Tandai hanya level yang paling jelas. Chart yang penuh garis justru menyulitkan keputusan. Dua atau tiga zona utama biasanya cukup untuk membangun skenario.",
      ],
      visual: {
        kind: "trend",
        caption:
          "Struktur tren pada timeframe besar menjadi kompas. Timeframe kecil dipakai untuk mencari titik masuk, bukan untuk melawan arah utama.",
      },
    },
    {
      id: "struktur",
      heading: "Membaca perubahan struktur",
      paragraphs: [
        "Selama harga membentuk higher high dan higher low, struktur naik masih utuh. Perubahan struktur terjadi ketika harga menembus dan menutup di bawah higher low terakhir, lalu gagal membentuk higher high baru.",
        "Break of structure bukan sinyal langsung untuk melawan. Sering kali setelah break, harga melakukan retest ke area yang ditembus sebelum melanjutkan. Retest yang gagal memberi konfirmasi tambahan.",
        "Tandai swing high dan swing low yang jelas, bukan setiap candle kecil. Gunakan timeframe yang konsisten agar struktur tidak berubah hanya karena noise.",
      ],
    },
    {
      id: "pola-chart",
      heading: "Pola chart: triangle, flag, dan double top",
      paragraphs: [
        "Triangle adalah kompresi harga yang membentuk rentang mengecil. Semakin lama kompresi, semakin besar energi yang biasanya dilepas saat breakout, meskipun arah breakout tidak dijamin.",
        "Flag adalah konsolidasi singkat setelah pergerakan kuat, sering dianggap pola lanjutan. Jika harga keluar searah tiang bendera dengan volume, pola ini mendapat konfirmasi tambahan.",
        "Double top menyerupai huruf M: harga gagal menembus resistance dua kali. Double bottom menyerupai W. Pola ini lebih kuat ketika muncul setelah tren panjang dan disertai penurunan momentum.",
      ],
      bullets: [
        "Triangle: kompresi, breakout bisa dua arah.",
        "Flag: konsolidasi setelah momentum, cenderung lanjut.",
        "Double top/bottom: pembalikan, butuh konfirmasi neckline.",
        "Head and shoulders: pola pembalikan dengan tiga puncak.",
      ],
    },
    {
      id: "konfluensi",
      heading: "Konfluensi: menggabungkan bukti",
      paragraphs: [
        "Setup yang baik biasanya memiliki beberapa bukti yang saling mendukung: tren searah, harga di zona support atau resistance, pola candle yang jelas, dan volume yang mendukung. Ini bukan rumus pasti, tetapi membantu menyaring setup lemah.",
        "Terlalu banyak faktor bisa membuat analisis paralysis. Pilih kerangka yang konsisten: struktur, level, candle, volume. Tambahkan satu atau dua alat lain jika benar-benar membantu.",
        "Tuliskan skenario utama dan skenario alternatif. Jika harga bergerak melawan skenario utama, kamu sudah tahu di mana ide itu gugur dan apa yang harus dilakukan.",
      ],
      callout: {
        tone: "tip",
        title: "Checklist sederhana",
        body: "Arah tren? Level penting? Pola candle? Volume? Jika empat pertanyaan ini tidak bisa dijawab dengan jelas, lebih baik menunggu.",
      },
    },
    {
      id: "entry",
      heading: "Entry, invalidasi, dan target",
      paragraphs: [
        "Entry adalah titik eksekusi, invalidasi adalah level yang membuktikan ide salah, dan target adalah area pengambilan sebagian atau seluruh keuntungan. Ketiganya harus ditentukan sebelum masuk, bukan setelah harga bergerak.",
        "Rasio risk-reward membandingkan jarak ke stop dan jarak ke target. Setup dengan potensi 3R dan peluang menang 40 persen masih bisa menguntungkan jika dijalankan konsisten dalam banyak transaksi.",
        "Target sebaiknya berada di area yang logis, seperti resistance berikutnya, bukan angka yang dibuat agar rasio terlihat bagus. Jika target terlalu jauh tanpa alasan struktural, realisasinya rendah.",
      ],
    },
    {
      id: "indikator",
      heading: "Indikator bukan ramalan",
      paragraphs: [
        "Indikator seperti RSI, MACD, dan moving average dihitung dari harga masa lalu. Mereka membantu merangkum momentum dan tren, tetapi tidak mengetahui berita atau likuiditas yang akan datang.",
        "Menggunakan banyak indikator yang serupa hanya menciptakan ilusi konfirmasi. RSI, stochastic, dan MACD sama-sama mengolah harga; tiga sinyal dari sumber serupa bukan tiga bukti independen.",
        "Gunakan indikator sebagai pelengkap, bukan pengganti struktur harga dan manajemen risiko. Chart bersih dengan level jelas sering lebih berguna daripada chart penuh garis.",
      ],
      callout: {
        tone: "warning",
        title: "Jangan cari holy grail",
        body: "Tidak ada indikator yang selalu benar. Keuntungan jangka panjang berasal dari proses, ukuran posisi, dan konsistensi, bukan satu alat ajaib.",
      },
    },
  ],
  takeaways: [
    "Analisis dimulai dari timeframe besar ke kecil.",
    "Perubahan struktur butuh penembusan dan konfirmasi.",
    "Triangle, flag, dan double top punya konteks berbeda.",
    "Konfluensi menyaring setup, bukan menjamin hasil.",
    "Entry, stop, dan target ditentukan sebelum eksekusi.",
  ],
  quiz: [
    {
      id: "q8-1",
      chapter: "analisis-grafik",
      question: "Urutan analisis top-down yang benar adalah...",
      options: [
        "Timeframe besar untuk tren, lalu timeframe kecil untuk timing",
        "Timeframe kecil untuk tren, lalu timeframe besar untuk timing",
        "Hanya menggunakan M1",
        "Hanya melihat volume",
      ],
      answer: 0,
      explanation:
        "Timeframe besar memberi konteks arah dan level utama, sedangkan timeframe kecil membantu menentukan timing entry.",
    },
    {
      id: "q8-2",
      chapter: "analisis-grafik",
      question: "Tren naik masih utuh selama...",
      options: [
        "Harga membentuk higher high dan higher low",
        "Setiap candle berwarna hijau",
        "Volume selalu naik",
        "RSI di atas 50",
      ],
      answer: 0,
      explanation:
        "Struktur higher high dan higher low menunjukkan pembeli masih mengendalikan pasar.",
    },
    {
      id: "q8-3",
      chapter: "analisis-grafik",
      question: "Triangle biasanya menunjukkan...",
      options: [
        "Kompresi harga yang dapat memicu breakout",
        "Kepastian arah naik",
        "Volume nol",
        "Pasar yang tutup",
      ],
      answer: 0,
      explanation:
        "Triangle adalah kompresi rentang. Breakout bisa terjadi ke atas atau ke bawah, sehingga butuh konfirmasi.",
    },
    {
      id: "q8-4",
      chapter: "analisis-grafik",
      question: "Flag umumnya dianggap pola...",
      options: [
        "Lanjutan setelah momentum kuat",
        "Pembalikan tanpa konfirmasi",
        "Yang hanya muncul di D1",
        "Yang tidak memerlukan volume",
      ],
      answer: 0,
      explanation:
        "Flag adalah konsolidasi singkat setelah pergerakan kuat dan sering dianggap pola lanjutan jika breakout terkonfirmasi.",
    },
    {
      id: "q8-5",
      chapter: "analisis-grafik",
      question: "Double top adalah pola...",
      options: [
        "Pembalikan bearish setelah dua kali gagal menembus resistance",
        "Lanjutan bullish",
        "Netral tanpa arti",
        "Volume rendah",
      ],
      answer: 0,
      explanation:
        "Dua puncak yang gagal menembus level serupa menunjukkan tekanan jual. Konfirmasi biasanya lewat penembusan neckline.",
    },
    {
      id: "q8-6",
      chapter: "analisis-grafik",
      question: "Apa itu retest?",
      options: [
        "Harga kembali ke level yang baru ditembus untuk menguji dukungan",
        "Harga berhenti selamanya",
        "Volume menjadi nol",
        "Indikator berubah warna",
      ],
      answer: 0,
      explanation:
        "Retest terjadi ketika harga kembali ke zona breakout. Jika zona bertahan, breakout mendapat konfirmasi tambahan.",
    },
    {
      id: "q8-7",
      chapter: "analisis-grafik",
      question: "Konfluensi dalam analisis berarti...",
      options: [
        "Beberapa bukti independen mendukung area atau setup yang sama",
        "Semua indikator pasti benar",
        "Menggunakan sebanyak mungkin garis",
        "Tidak memakai stop loss",
      ],
      answer: 0,
      explanation:
        "Konfluensi membantu menyaring setup dengan menggabungkan faktor yang saling mendukung, bukan menjamin hasil.",
    },
    {
      id: "q8-8",
      chapter: "analisis-grafik",
      question: "Kapan ide trading dianggap gugur?",
      options: [
        "Saat harga mencapai level invalidasi yang sudah ditentukan",
        "Saat harga bergerak sedikit melawan",
        "Saat volume turun",
        "Saat chart berubah warna",
      ],
      answer: 0,
      explanation:
        "Level invalidasi ditentukan sebelum entry dan menjadi dasar stop loss. Jika tersentuh, ide dianggap salah.",
    },
    {
      id: "q8-9",
      chapter: "analisis-grafik",
      question: "Mengapa banyak indikator belum tentu lebih baik?",
      options: [
        "Karena indikator serupa mengolah data yang sama dan bisa menciptakan ilusi konfirmasi",
        "Karena indikator selalu salah",
        "Karena indikator tidak bisa ditampilkan",
        "Karena semua indikator dilarang",
      ],
      answer: 0,
      explanation:
        "Indikator yang berasal dari harga yang sama tidak sepenuhnya independen. Terlalu banyak alat bisa mengaburkan struktur utama.",
    },
    {
      id: "q8-10",
      chapter: "analisis-grafik",
      question: "Target yang logis sebaiknya...",
      options: [
        "Berada di area struktural seperti resistance berikutnya",
        "Dibuat agar rasio terlihat bagus tanpa alasan",
        "Selalu 100 persen dari harga entry",
        "Tidak pernah ditentukan",
      ],
      answer: 0,
      explanation:
        "Target sebaiknya berdasarkan level atau struktur yang masuk akal, bukan angka yang dipaksakan agar risk-reward terlihat menarik.",
    },
  ],
};
