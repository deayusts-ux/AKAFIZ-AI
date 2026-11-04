import type { Chapter } from "../types";

export const chapterSupportResistance: Chapter = {
  slug: "support-resistance",
  order: 6,
  title: "Support & Resistance",
  shortTitle: "Support & Resistance",
  subtitle: "Di mana pembeli dan penjual cenderung bereaksi",
  description:
    "Membaca zona demand dan supply, role reversal, trendline, angka bulat, likuiditas, breakout palsu, dan cara menggabungkan beberapa level menjadi satu keputusan.",
  level: "Menengah",
  minutes: 44,
  icon: "Layers2",
  accent: "#f472b6",
  objectives: [
    "Menggambar support dan resistance sebagai zona, bukan garis tipis.",
    "Memahami role reversal setelah breakout.",
    "Membedakan breakout valid dan fakeout.",
    "Menggabungkan level dengan candle dan volume.",
  ],
  sections: [
    {
      id: "zona",
      heading: "Support dan resistance adalah zona",
      paragraphs: [
        "Support adalah area di bawah harga yang cenderung memunculkan permintaan. Resistance adalah area di atas harga yang cenderung memunculkan penjualan. Keduanya lahir dari memory pasar: banyak peserta menempatkan order di area yang pernah penting.",
        "Menggambar satu garis tipis terlalu rapuh. Harga jarang berbalik tepat di satu angka. Gunakan zona yang mencakup beberapa wick, body, dan level penutupan di sekitar area tersebut.",
        "Semakin sering sebuah zona diuji, semakin jelas keberadaannya, tetapi setiap uji juga menghabiskan likuiditas. Zona yang diuji berkali-kali bisa pecah karena order di sana sudah banyak terpakai.",
      ],
      visual: {
        kind: "support-resistance",
        caption:
          "Support dan resistance lebih akurat digambar sebagai zona. Harga sering menusuk zona lalu kembali, bukan berbalik tepat di satu garis.",
      },
    },
    {
      id: "role-reversal",
      heading: "Role reversal: resistance menjadi support",
      paragraphs: [
        "Ketika resistance ditembus dengan close yang kuat, area tersebut sering berubah peran menjadi support. Trader yang sebelumnya menjual di resistance mungkin menyesal, sementara pembeli baru melihat area itu sebagai titik masuk.",
        "Role reversal tidak selalu langsung terjadi. Harga bisa kembali menguji area breakout, lalu melanjutkan kenaikan jika support baru bertahan. Retest yang sehat biasanya disertai volume lebih rendah dibanding breakout, lalu diikuti volume naik saat harga kembali bergerak.",
        "Jika harga kembali masuk ke dalam zona dan menutup di bawahnya, breakout mungkin gagal. Rencana harus mencakup skenario ini, bukan hanya skenario keberhasilan.",
      ],
    },
    {
      id: "trendline",
      heading: "Trendline dan support dinamis",
      paragraphs: [
        "Trendline menghubungkan dua atau lebih titik pivot untuk menunjukkan arah dan kemiringan tren. Garis ini bersifat dinamis karena bergerak seiring waktu, berbeda dari support horizontal yang tetap di level harga.",
        "Trendline naik menghubungkan higher low, sedangkan trendline turun menghubungkan lower high. Semakin banyak titik yang disentuh tanpa ditembus, semakin relevan garis tersebut, meski tetap bukan tembok yang mustahil ditembus.",
        "Moving average juga sering dipakai sebagai support dinamis. Namun, semua indikator turunan harga tetap mengikuti harga, bukan mendahuluinya. Gunakan sebagai konteks, bukan alasan tunggal.",
      ],
      bullets: [
        "Gambar trendline dari pivot yang jelas, bukan sembarang titik.",
        "Garis yang terlalu sering disentuh bisa kehilangan makna.",
        "Break trendline butuh close, bukan hanya wick.",
      ],
    },
    {
      id: "breakout",
      heading: "Breakout, retest, dan fakeout",
      paragraphs: [
        "Breakout adalah penembusan zona penting. Breakout yang lebih meyakinkan biasanya disertai close di luar zona, peningkatan volume, dan kelanjutan momentum. Penembusan hanya melalui wick lebih rentan kembali ke dalam rentang.",
        "Retest terjadi ketika harga kembali ke zona yang baru ditembus. Retest memberi kesempatan masuk dengan risiko lebih jelas, tetapi tidak selalu datang. Mengejar breakout tanpa rencana bisa berakhir di puncak sementara.",
        "Fakeout atau liquidity sweep terjadi ketika harga menembus level untuk memicu stop loss dan order breakout, lalu berbalik cepat. Ini sering terlihat sebagai wick panjang di luar level dengan close kembali di dalam rentang.",
      ],
      callout: {
        tone: "warning",
        title: "Jangan menganggap breakout selalu benar",
        body: "Semakin jelas sebuah level, semakin banyak order berkumpul di sana. Area seperti ini juga menarik perhatian pihak yang ingin mengambil likuiditas.",
      },
    },
    {
      id: "angka-bulat",
      heading: "Angka bulat dan konfluensi",
      paragraphs: [
        "Level seperti 50.000, 60.000, atau 100.000 sering menjadi perhatian karena mudah diingat. Banyak order ditempatkan di sekitar angka bulat, sehingga harga kadang melambat atau berbalik di area tersebut.",
        "Konfluensi berarti beberapa faktor menunjuk ke area yang sama: support horizontal, trendline, Fibonacci retracement, moving average, dan angka bulat. Semakin banyak faktor independen yang bertemu, semakin layak area itu diperhatikan.",
        "Tetapi konfluensi bukan jaminan. Terlalu banyak garis di chart bisa membuat kamu melihat pola yang tidak ada. Pilih dua atau tiga faktor yang paling jelas dan konsisten.",
      ],
    },
    {
      id: "stop",
      heading: "Menempatkan stop di balik zona",
      paragraphs: [
        "Stop loss sebaiknya ditempatkan di tempat yang membuktikan ide trading salah, bukan di tempat yang paling nyaman. Jika kamu membeli di support, ide itu gugur ketika harga menutup di bawah zona dengan jelas.",
        "Menempatkan stop tepat di garis support membuat stop mudah tersentuh oleh wick. Beri ruang di luar zona, lalu sesuaikan ukuran posisi agar risiko tetap sesuai aturan.",
        "Jangan memindahkan stop menjauh ketika harga melawan. Itu mengubah risiko yang sudah direncanakan menjadi harapan. Stop hanya boleh bergerak ke arah yang mengurangi risiko, misalnya ke titik impas setelah harga bergerak sesuai rencana.",
      ],
      callout: {
        tone: "tip",
        title: "Urutan yang benar",
        body: "Tentukan level invalidasi dulu, baru hitung ukuran posisi. Jangan menentukan ukuran posisi dulu lalu mencari stop yang muat.",
      },
    },
  ],
  takeaways: [
    "Support dan resistance adalah zona, bukan garis tunggal.",
    "Resistance yang ditembus sering berubah menjadi support.",
    "Breakout valid biasanya didukung close dan volume.",
    "Fakeout memancing stop sebelum harga berbalik.",
    "Stop loss harus mengikuti struktur, bukan kenyamanan.",
  ],
  quiz: [
    {
      id: "q6-1",
      chapter: "support-resistance",
      question: "Support adalah area...",
      options: [
        "Di atas harga yang cenderung memunculkan penjualan",
        "Di bawah harga yang cenderung memunculkan permintaan",
        "Yang tidak pernah ditembus",
        "Yang hanya terlihat di timeframe M1",
      ],
      answer: 1,
      explanation:
        "Support berada di bawah harga dan cenderung memunculkan pembeli. Resistance berada di atas dan cenderung memunculkan penjual.",
    },
    {
      id: "q6-2",
      chapter: "support-resistance",
      question: "Mengapa support dan resistance sebaiknya digambar sebagai zona?",
      options: [
        "Karena harga jarang berbalik tepat di satu angka",
        "Karena garis tipis tidak bisa dibuat di chart",
        "Karena zona selalu benar",
        "Karena broker mewajibkannya",
      ],
      answer: 0,
      explanation:
        "Harga sering menusuk atau melambat di sekitar area, bukan tepat di satu level. Zona menangkap variasi tersebut.",
    },
    {
      id: "q6-3",
      chapter: "support-resistance",
      question: "Role reversal berarti...",
      options: [
        "Support berubah menjadi resistance setelah ditembus ke bawah",
        "Resistance berubah menjadi support setelah ditembus ke atas, dan sebaliknya",
        "Semua level hilang",
        "Harga berhenti bergerak",
      ],
      answer: 1,
      explanation:
        "Level yang ditembus sering berganti peran. Resistance yang ditembus dapat menjadi support, dan support yang ditembus dapat menjadi resistance.",
    },
    {
      id: "q6-4",
      chapter: "support-resistance",
      question: "Breakout yang lebih meyakinkan biasanya...",
      options: [
        "Hanya berupa wick di luar level",
        "Disertai close di luar zona dan volume meningkat",
        "Tidak memiliki volume",
        "Terjadi saat pasar tutup",
      ],
      answer: 1,
      explanation:
        "Close di luar zona menunjukkan harga bertahan, dan volume meningkat menunjukkan partisipasi yang lebih kuat.",
    },
    {
      id: "q6-5",
      chapter: "support-resistance",
      question: "Apa itu fakeout?",
      options: [
        "Breakout yang langsung diikuti tren kuat",
        "Penembusan level yang memicu order lalu harga berbalik kembali",
        "Level yang tidak pernah diuji",
        "Candle dengan volume rendah",
      ],
      answer: 1,
      explanation:
        "Fakeout atau sweep menembus level untuk mengambil likuiditas, lalu harga kembali ke dalam rentang.",
    },
    {
      id: "q6-6",
      chapter: "support-resistance",
      question: "Semakin sering zona diuji...",
      options: [
        "Semakin pasti zona akan bertahan selamanya",
        "Zona semakin jelas, tetapi likuiditas di sana juga semakin terkuras",
        "Zona menghilang dari chart",
        "Volume otomatis menjadi nol",
      ],
      answer: 1,
      explanation:
        "Uji berulang menegaskan keberadaan zona, tetapi juga menghabiskan order. Zona yang terlalu sering diuji bisa pecah.",
    },
    {
      id: "q6-7",
      chapter: "support-resistance",
      question: "Angka bulat seperti 100.000 penting karena...",
      options: [
        "Banyak peserta menempatkan order di sekitar level yang mudah diingat",
        "Blockchain menolak harga lain",
        "Angka bulat selalu menjadi support",
        "Volume di angka bulat selalu nol",
      ],
      answer: 0,
      explanation:
        "Angka bulat menarik perhatian dan order, sehingga sering menjadi area reaksi meskipun tidak dijamin bertahan.",
    },
    {
      id: "q6-8",
      chapter: "support-resistance",
      question: "Konfluensi berarti...",
      options: [
        "Beberapa faktor independen menunjuk ke area yang sama",
        "Semua indikator harus berwarna sama",
        "Hanya menggunakan satu garis",
        "Harga pasti berbalik",
      ],
      answer: 0,
      explanation:
        "Konfluensi terjadi ketika beberapa alat atau level bertemu di area yang sama, meningkatkan perhatian tanpa menjamin hasil.",
    },
    {
      id: "q6-9",
      chapter: "support-resistance",
      question: "Penempatan stop loss yang lebih masuk akal adalah...",
      options: [
        "Tepat di garis support agar mudah tersentuh",
        "Di luar zona dengan ruang cukup, berdasarkan titik invalidasi",
        "Tanpa stop loss",
        "Di harga entry agar tidak rugi",
      ],
      answer: 1,
      explanation:
        "Stop harus berada di tempat ide trading terbukti salah, dengan ruang agar tidak mudah terkena wick.",
    },
    {
      id: "q6-10",
      chapter: "support-resistance",
      question: "Mengapa memindahkan stop menjauh saat harga melawan berbahaya?",
      options: [
        "Karena mengubah risiko terencana menjadi harapan dan bisa memperbesar kerugian",
        "Karena bursa melarangnya",
        "Karena stop tidak berfungsi",
        "Karena harga pasti kembali",
      ],
      answer: 0,
      explanation:
        "Memindahkan stop menjauh menambah kerugian melebihi rencana dan menghilangkan disiplin risiko.",
    },
  ],
};
