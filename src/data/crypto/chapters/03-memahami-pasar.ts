import type { Chapter } from "../types";

export const chapterPasar: Chapter = {
  slug: "memahami-pasar",
  order: 3,
  title: "Memahami Pasar",
  shortTitle: "Pasar",
  subtitle: "Struktur tren, likuiditas, spread, dan psikologi di balik pergerakan harga",
  description:
    "Melihat pasar sebagai lelang berkelanjutan: siapa yang membeli, siapa yang menjual, bagaimana likuiditas terbentuk, dan mengapa harga bergerak dalam gelombang.",
  level: "Pemula",
  minutes: 40,
  icon: "Activity",
  accent: "#22d3ee",
  objectives: [
    "Mengenali struktur tren naik, turun, dan sideways.",
    "Memahami bid, ask, spread, dan slippage.",
    "Membedakan pasar spot dan futures beserta risikonya.",
    "Membaca psikologi pasar: greed, fear, dan likuidasi.",
  ],
  sections: [
    {
      id: "lelang",
      heading: "Pasar adalah lelang yang tidak pernah tutup",
      paragraphs: [
        "Harga terbentuk ketika pembeli dan penjual bertemu. Setiap transaksi adalah kesepakatan bahwa satu pihak lebih memilih memegang aset, sementara pihak lain lebih memilih memegang uang. Perubahan harga adalah jejak ketidakseimbangan antara keduanya.",
        "Di pasar crypto, lelang berjalan 24 jam sehari, tujuh hari seminggu. Tidak ada bel pembukaan atau penutupan resmi seperti saham. Karena itu, candle harian biasanya mengikuti zona waktu bursa tertentu dan bisa berbeda antarplatform.",
        "Harga tidak bergerak karena chart, tetapi karena order. Chart hanyalah visualisasi dari pertemuan order tersebut. Memahami siapa yang dipaksa keluar dan di mana order menumpuk membantu membaca pergerakan yang tampak tidak logis.",
      ],
    },
    {
      id: "struktur-tren",
      heading: "Struktur tren: higher high dan higher low",
      paragraphs: [
        "Tren naik ditandai oleh rangkaian higher high (puncak lebih tinggi) dan higher low (dasar lebih tinggi). Pembeli bersedia membayar lebih mahal, dan penjual tidak mampu menekan harga kembali ke titik sebelumnya.",
        "Tren turun adalah kebalikannya: lower high dan lower low. Setiap pantulan gagal mencapai puncak sebelumnya. Sideways terjadi ketika harga bergerak dalam rentang dan tidak membentuk rangkaian puncak atau dasar yang jelas.",
        "Struktur ini lebih penting daripada warna candle tunggal. Satu candle hijau besar di tengah tren turun belum mengubah struktur. Perubahan struktur biasanya butuh penembusan dan penutupan di luar titik kunci, lalu diikuti retest.",
      ],
      visual: {
        kind: "trend",
        caption:
          "Tren naik membentuk higher high dan higher low; tren turun membentuk lower high dan lower low. Garis pada gambar adalah ilustrasi struktur, bukan prediksi.",
      },
    },
    {
      id: "orderbook",
      heading: "Bid, ask, spread, dan slippage",
      paragraphs: [
        "Bid adalah harga tertinggi yang bersedia dibayar pembeli, sedangkan ask adalah harga terendah yang bersedia diterima penjual. Selisih keduanya disebut spread. Spread sempit menandakan likuiditas lebih baik.",
        "Slippage terjadi ketika harga eksekusi berbeda dari harga yang dilihat saat order dibuat. Semakin besar order dibanding likuiditas yang tersedia, semakin besar slippage. Di pasar tipis, order berukuran sedang pun bisa menembus beberapa level harga.",
        "Kedalaman order book menunjukkan berapa banyak volume yang siap ditransaksikan di setiap level harga. Dinding order besar bisa bertahan atau menghilang; jangan menganggapnya janji, karena peserta pasar dapat menarik order kapan saja.",
      ],
      bullets: [
        "Market order: eksekusi cepat, harga tidak dijamin.",
        "Limit order: harga dijamin jika tersedia, eksekusi tidak dijamin.",
        "Spread lebar: biaya transaksi tersembunyi yang perlu dihitung.",
        "Likuiditas tipis: risiko slippage dan manipulasi lebih tinggi.",
      ],
    },
    {
      id: "spot-futures",
      heading: "Spot, futures, leverage, dan likuidasi",
      paragraphs: [
        "Spot berarti membeli aset secara langsung. Keuntungan atau kerugian mengikuti perubahan harga, tanpa bunga pinjaman. Kepemilikan aset nyata dan risiko maksimum umumnya sebatas dana yang dipakai.",
        "Futures adalah kontrak untuk bertaruh pada harga tanpa harus memiliki aset, sering dengan leverage. Leverage memperbesar nominal posisi dengan modal kecil. Jika harga bergerak melawan posisi, margin bisa habis dan posisi dilikuidasi.",
        "Likuidasi memaksa penutupan posisi ketika margin tidak cukup. Proses ini bisa mempercepat pergerakan harga karena menciptakan order pasar tambahan. Inilah salah satu alasan harga kadang melesat melewati level support atau resistance yang tampak kuat.",
      ],
      callout: {
        tone: "warning",
        title: "Leverage bukan alat gratis",
        body: "Leverage 10x membuat pergerakan 10 persen melawan posisi menghapus seluruh margin. Bagi pemula, memahami spot jauh lebih penting daripada mengejar leverage tinggi.",
      },
    },
    {
      id: "funding",
      heading: "Funding rate dan posisi crowd",
      paragraphs: [
        "Di perpetual futures, tidak ada tanggal jatuh tempo. Untuk menjaga harga futures dekat harga spot, bursa memakai funding rate yang dibayar antarposisi long dan short secara berkala.",
        "Jika funding positif, long membayar short. Ini biasanya menandakan lebih banyak posisi long atau permintaan leverage bullish. Funding negatif berarti sebaliknya. Angka ekstrem sering menandakan posisi yang terlalu ramai di satu sisi.",
        "Posisi yang terlalu ramai rentan terhadap squeeze. Ketika harga bergerak melawan mayoritas, likuidasi berantai bisa mendorong harga lebih jauh. Ini bukan sinyal otomatis untuk melawan, tetapi konteks penting saat membaca candle dan volume.",
      ],
    },
    {
      id: "psikologi",
      heading: "Psikologi pasar: rasa takut dan keserakahan",
      paragraphs: [
        "Saat harga naik cepat, rasa takut ketinggalan (FOMO) mendorong pembelian di puncak. Saat harga turun tajam, panik mendorong penjualan di dasar. Kedua emosi ini menciptakan pola harga yang berulang karena manusia cenderung bereaksi serupa terhadap ketidakpastian.",
        "Pasar dirancang untuk memindahkan aset dari tangan yang tidak sabar ke tangan yang sabar, tetapi kesabaran saja tidak cukup. Kamu tetap perlu aturan entry, stop, ukuran posisi, dan batas kerugian harian.",
        "Catat keputusan dan alasannya. Jurnal membuat kamu melihat apakah hasil buruk berasal dari proses yang salah atau dari ketidakpastian yang memang tidak bisa dihindari. Tanpa catatan, kamu hanya akan mengulang kesalahan yang sama.",
      ],
      callout: {
        tone: "tip",
        title: "Latihan observasi",
        body: "Selama satu minggu, tandai setiap kali kamu merasa ingin membeli karena takut ketinggalan. Jangan eksekusi. Catat apa yang terjadi pada harga setelahnya. Latihan ini melatih kesadaran emosi.",
      },
    },
  ],
  takeaways: [
    "Harga adalah hasil pertemuan order, bukan penyebab tunggal.",
    "Struktur higher high dan higher low lebih penting daripada satu candle.",
    "Spread dan slippage adalah biaya nyata di pasar tipis.",
    "Leverage memperbesar keuntungan sekaligus mempercepat likuidasi.",
    "Funding rate dan crowding membantu membaca risiko squeeze.",
  ],
  quiz: [
    {
      id: "q3-1",
      chapter: "memahami-pasar",
      question: "Ciri struktur tren naik adalah...",
      options: [
        "Lower high dan lower low",
        "Higher high dan higher low",
        "Harga selalu sama setiap hari",
        "Candle selalu berwarna hijau",
      ],
      answer: 1,
      explanation:
        "Tren naik membentuk puncak dan dasar yang semakin tinggi. Warna candle individual tidak menentukan struktur.",
    },
    {
      id: "q3-2",
      chapter: "memahami-pasar",
      question: "Apa itu bid?",
      options: [
        "Harga terendah yang bersedia diterima penjual",
        "Harga tertinggi yang bersedia dibayar pembeli",
        "Jumlah volume harian",
        "Biaya funding",
      ],
      answer: 1,
      explanation:
        "Bid adalah harga tertinggi yang bersedia dibayar pembeli. Ask adalah harga terendah yang bersedia diterima penjual.",
    },
    {
      id: "q3-3",
      chapter: "memahami-pasar",
      question: "Spread adalah...",
      options: [
        "Selisih harga bid dan ask",
        "Selisih harga tertinggi dan terendah harian",
        "Jumlah leverage yang tersedia",
        "Bunga pinjaman bank",
      ],
      answer: 0,
      explanation:
        "Spread adalah selisih antara bid dan ask. Spread sempit umumnya menandakan likuiditas lebih baik.",
    },
    {
      id: "q3-4",
      chapter: "memahami-pasar",
      question: "Likuiditas tinggi berarti...",
      options: [
        "Harga pasti naik",
        "Order dapat dieksekusi dengan slippage lebih kecil",
        "Tidak ada spread",
        "Tidak ada risiko",
      ],
      answer: 1,
      explanation:
        "Likuiditas tinggi membuat pasar lebih dalam, sehingga order lebih mudah diserap dan slippage cenderung lebih kecil.",
    },
    {
      id: "q3-5",
      chapter: "memahami-pasar",
      question: "Apa perbedaan utama spot dan futures?",
      options: [
        "Spot hanya untuk Bitcoin",
        "Futures adalah kontrak dengan kemungkinan leverage, spot membeli aset langsung",
        "Spot selalu memakai leverage 100x",
        "Futures tidak memiliki risiko likuidasi",
      ],
      answer: 1,
      explanation:
        "Spot membeli aset secara langsung. Futures adalah kontrak turunan yang dapat memakai leverage dan berisiko likuidasi.",
    },
    {
      id: "q3-6",
      chapter: "memahami-pasar",
      question: "Funding rate positif umumnya berarti...",
      options: [
        "Long membayar short",
        "Short membayar long",
        "Tidak ada pembayaran",
        "Bursa membayar semua posisi",
      ],
      answer: 0,
      explanation:
        "Saat funding positif, posisi long membayar posisi short. Ini sering menandakan permintaan long yang lebih tinggi.",
    },
    {
      id: "q3-7",
      chapter: "memahami-pasar",
      question: "Apa yang terjadi saat likuidasi?",
      options: [
        "Posisi ditutup paksa karena margin tidak cukup",
        "Bursa memberikan bonus",
        "Harga berhenti bergerak",
        "Token dibakar",
      ],
      answer: 0,
      explanation:
        "Likuidasi menutup paksa posisi ketika margin tidak lagi memenuhi syarat, sering menciptakan order pasar tambahan.",
    },
    {
      id: "q3-8",
      chapter: "memahami-pasar",
      question: "Mengapa pasar crypto tidak memiliki satu harga penutupan resmi?",
      options: [
        "Karena perdagangan berjalan 24/7 di banyak bursa",
        "Karena harga tidak pernah dicatat",
        "Karena hanya ada satu bursa",
        "Karena semua bursa memakai jam yang sama dengan saham",
      ],
      answer: 0,
      explanation:
        "Crypto diperdagangkan terus-menerus di banyak bursa. Tidak ada sesi penutupan tunggal seperti pasar saham.",
    },
    {
      id: "q3-9",
      chapter: "memahami-pasar",
      question: "Apa peran market maker?",
      options: [
        "Menjamin harga selalu naik",
        "Menyediakan likuiditas dengan memasang order beli dan jual",
        "Menentukan harga secara acak",
        "Membatasi jumlah token",
      ],
      answer: 1,
      explanation:
        "Market maker menyediakan likuiditas di kedua sisi order book dan membantu mengurangi spread, meski tetap mencari keuntungan.",
    },
    {
      id: "q3-10",
      chapter: "memahami-pasar",
      question: "Posisi yang terlalu ramai di satu sisi rentan terhadap...",
      options: [
        "Airdrop",
        "Squeeze dan likuidasi berantai",
        "Penurunan biaya transaksi",
        "Peningkatan supply otomatis",
      ],
      answer: 1,
      explanation:
        "Ketika mayoritas posisi berada di satu sisi, pergerakan harga yang melawan dapat memicu likuidasi berantai dan squeeze.",
    },
  ],
};
