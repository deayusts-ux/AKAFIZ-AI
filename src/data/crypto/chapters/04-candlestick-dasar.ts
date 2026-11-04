import type { Chapter } from "../types";

export const chapterCandlestickDasar: Chapter = {
  slug: "candlestick-dasar",
  order: 4,
  title: "Memahami Candlestick",
  shortTitle: "Candlestick",
  subtitle: "Membaca cerita pembeli dan penjual dalam satu batang",
  description:
    "Anatomi candle, body, wick, open, high, low, close, arti warna, pengaruh timeframe, dan cara membaca penutupan candle tanpa menebak.",
  level: "Pemula",
  minutes: 38,
  icon: "ChartCandlestick",
  accent: "#34d399",
  objectives: [
    "Mengidentifikasi open, high, low, close pada candle.",
    "Menafsirkan body dan wick sebagai jejak tekanan beli dan jual.",
    "Memahami mengapa timeframe mengubah arti sebuah candle.",
    "Membedakan candle yang signifikan dari noise.",
  ],
  sections: [
    {
      id: "anatomi",
      heading: "Anatomi satu candle",
      paragraphs: [
        "Setiap candle merangkum empat harga dalam satu periode: open (harga pembukaan), high (harga tertinggi), low (harga terendah), dan close (harga penutupan). Empat angka ini sering disebut OHLC.",
        "Bagian tebal disebut body, menghubungkan open dan close. Garis tipis di atas dan di bawah disebut wick atau shadow, menunjukkan harga ekstrem yang sempat disentuh tetapi tidak dipertahankan sampai penutupan.",
        "Candle hijau atau bullish berarti close lebih tinggi daripada open. Candle merah atau bearish berarti close lebih rendah daripada open. Warna bukan penilaian baik atau buruk; warna hanya menunjukkan arah periode tersebut.",
      ],
      visual: {
        kind: "candle-anatomy",
        caption:
          "Body menunjukkan jarak open ke close, wick menunjukkan harga ekstrem. Candle dengan body besar menandakan pergerakan yang tegas pada periode itu.",
      },
    },
    {
      id: "body-wick",
      heading: "Body besar, body kecil, dan panjang wick",
      paragraphs: [
        "Body besar menunjukkan bahwa harga bergerak tegas dari open ke close. Pembeli atau penjual mendominasi hampir sepanjang periode. Body kecil menunjukkan keraguan atau pertarungan yang berakhir hampir seimbang.",
        "Wick panjang di atas berarti harga sempat naik tinggi tetapi ditolak dan kembali turun. Wick panjang di bawah berarti harga sempat turun dalam tetapi berhasil dipulihkan. Semakin panjang wick dibanding body, semakin besar penolakan di level tersebut.",
        "Namun, wick tidak selalu berarti pembalikan. Di pasar yang volatil, wick panjang bisa hanya noise. Konteks berupa tren, area support atau resistance, dan volume menentukan apakah wick itu bermakna.",
      ],
      bullets: [
        "Body tebal + wick pendek: momentum kuat searah body.",
        "Body tipis + wick dua sisi: keraguan, sering muncul sebagai doji.",
        "Lower wick panjang: pembeli menyerap tekanan jual.",
        "Upper wick panjang: penjual menekan kenaikan harga.",
      ],
    },
    {
      id: "close",
      heading: "Close adalah harga yang paling penting",
      paragraphs: [
        "High dan low menunjukkan jangkauan, tetapi close adalah harga kesepakatan terakhir pada periode tersebut. Close yang bertahan di atas resistance lebih meyakinkan daripada high yang sempat menembus lalu jatuh kembali.",
        "Banyak trader menunggu candle ditutup sebelum menganggap breakout valid. Ini mengurangi sinyal palsu, meskipun mengorbankan sebagian pergerakan awal. Tidak ada aturan yang sempurna; yang penting adalah konsistensi.",
        "Pada timeframe kecil, close bisa berubah cepat karena periode pendek. Pada timeframe besar, close merangkum lebih banyak transaksi dan biasanya lebih bermakna untuk menentukan struktur.",
      ],
      callout: {
        tone: "tip",
        title: "Kebiasaan baik",
        body: "Saat melihat pola, tanyakan: di mana candle ditutup? Apakah close berada di luar area penting, atau hanya wick yang menembus?",
      },
    },
    {
      id: "timeframe",
      heading: "Timeframe mengubah cerita",
      paragraphs: [
        "Satu candle M1 merangkum satu menit, sedangkan satu candle D1 merangkum 24 jam. Pola doji di M1 bisa muncul puluhan kali sehari dan sering tidak berarti, sementara doji di D1 di area penting memiliki bobot berbeda.",
        "Candle H4 dan D1 biasanya dipakai untuk melihat tren utama, sedangkan M5 sampai M15 dipakai untuk mencari timing entry. Menggabungkan timeframe membantu menghindari keputusan yang hanya didasarkan pada noise.",
        "Jika timeframe besar dan kecil bertentangan, timeframe besar umumnya memiliki pengaruh lebih kuat. Entry melawan tren besar bisa berhasil, tetapi membutuhkan alasan dan manajemen risiko yang lebih ketat.",
      ],
      visual: {
        kind: "timeframe",
        caption:
          "Periode yang sama dapat terlihat sebagai satu candle D1 atau 24 candle H1. Data pada gambar adalah simulasi edukasi, bukan harga pasar nyata.",
      },
    },
    {
      id: "noise",
      heading: "Membedakan sinyal dan noise",
      paragraphs: [
        "Tidak semua candle perlu ditafsirkan. Sebagian besar candle hanyalah fluktuasi normal di dalam rentang. Fokus pada candle yang berada di level penting, didukung volume, atau mengubah struktur pasar.",
        "Candle besar yang muncul tiba-tiba tanpa berita bisa menjadi likuidasi atau order besar. Candle besar setelah berita penting bisa menjadi reaksi fundamental. Konteks membantu memahami penyebab, tetapi tidak menjamin kelanjutan.",
        "Latihan terbaik adalah melihat chart historis dan menandai candle yang benar-benar mengubah arah. Kamu akan menemukan bahwa sebagian besar waktu pasar bergerak tanpa sinyal jelas, dan itu normal.",
      ],
      callout: {
        tone: "info",
        title: "Aturan sederhana",
        body: "Jika kamu harus memaksakan alasan untuk sebuah candle, kemungkinan candle itu bukan sinyal. Lebih baik menunggu setup yang jelas.",
      },
    },
  ],
  takeaways: [
    "Setiap candle berisi OHLC yang membentuk body dan wick.",
    "Body menunjukkan dominasi, wick menunjukkan penolakan harga.",
    "Close lebih penting daripada high atau low sesaat.",
    "Timeframe menentukan bobot dan makna sebuah candle.",
    "Sebagian besar candle adalah noise; fokus pada konteks penting.",
  ],
  quiz: [
    {
      id: "q4-1",
      chapter: "candlestick-dasar",
      question: "Body candle dibentuk oleh...",
      options: [
        "High dan low",
        "Open dan close",
        "Volume dan market cap",
        "Bid dan ask",
      ],
      answer: 1,
      explanation:
        "Body menghubungkan harga open dan close. Wick menunjukkan high dan low di luar body.",
    },
    {
      id: "q4-2",
      chapter: "candlestick-dasar",
      question: "Upper wick panjang menunjukkan...",
      options: [
        "Harga sempat naik tinggi tetapi ditolak sebelum close",
        "Harga pasti akan naik",
        "Volume pasti rendah",
        "Tidak ada penjual",
      ],
      answer: 0,
      explanation:
        "Upper wick panjang berarti harga mencapai level tinggi tetapi tidak bertahan, menunjukkan tekanan jual di area tersebut.",
    },
    {
      id: "q4-3",
      chapter: "candlestick-dasar",
      question: "Candle bullish adalah candle dengan...",
      options: [
        "Close lebih tinggi daripada open",
        "Close lebih rendah daripada open",
        "Open sama dengan high",
        "Volume nol",
      ],
      answer: 0,
      explanation:
        "Candle bullish memiliki close di atas open. Candle bearish memiliki close di bawah open.",
    },
    {
      id: "q4-4",
      chapter: "candlestick-dasar",
      question: "Doji terbentuk ketika...",
      options: [
        "Open dan close hampir sama",
        "High dan low hampir sama",
        "Volume sangat tinggi",
        "Harga naik 100 persen",
      ],
      answer: 0,
      explanation:
        "Doji memiliki body sangat kecil karena open dan close hampir bertemu, menandakan keseimbangan atau keraguan.",
    },
    {
      id: "q4-5",
      chapter: "candlestick-dasar",
      question: "Lower wick panjang setelah penurunan sering menunjukkan...",
      options: [
        "Pembeli menyerap tekanan jual di area bawah",
        "Penjual sepenuhnya menguasai pasar",
        "Tidak ada likuiditas",
        "Harga akan berhenti selamanya",
      ],
      answer: 0,
      explanation:
        "Lower wick panjang menunjukkan harga sempat turun dalam tetapi berhasil dipulihkan, tanda adanya permintaan di area bawah.",
    },
    {
      id: "q4-6",
      chapter: "candlestick-dasar",
      question: "OHLC adalah singkatan dari...",
      options: [
        "Open, High, Low, Close",
        "Order, Hedge, Limit, Cancel",
        "Open, Hold, Liquidate, Close",
        "Over, High, Low, Cost",
      ],
      answer: 0,
      explanation:
        "OHLC merangkum empat harga utama dalam satu periode candle.",
    },
    {
      id: "q4-7",
      chapter: "candlestick-dasar",
      question: "Satu candle H4 mewakili...",
      options: [
        "4 menit",
        "4 jam",
        "4 hari",
        "4 minggu",
      ],
      answer: 1,
      explanation:
        "H4 berarti setiap candle merangkum pergerakan selama empat jam.",
    },
    {
      id: "q4-8",
      chapter: "candlestick-dasar",
      question: "Mengapa close dianggap lebih penting daripada high sesaat?",
      options: [
        "Karena close adalah harga kesepakatan terakhir yang bertahan sampai akhir periode",
        "Karena high tidak pernah dicatat",
        "Karena close selalu sama dengan open",
        "Karena high hanya muncul di D1",
      ],
      answer: 0,
      explanation:
        "High bisa hanya sentuhan sesaat. Close menunjukkan harga yang disepakati di akhir periode dan lebih sering dipakai untuk konfirmasi.",
    },
    {
      id: "q4-9",
      chapter: "candlestick-dasar",
      question: "Marubozu adalah candle dengan...",
      options: [
        "Body panjang dan wick sangat pendek atau hampir tidak ada",
        "Body sangat kecil dan dua wick panjang",
        "Tidak memiliki body",
        "Volume nol",
      ],
      answer: 0,
      explanation:
        "Marubozu menunjukkan dominasi kuat satu pihak karena harga bergerak tegas dari open ke close dengan wick minimal.",
    },
    {
      id: "q4-10",
      chapter: "candlestick-dasar",
      question: "Candle dengan body kecil dan upper wick panjang setelah tren naik menunjukkan...",
      options: [
        "Tekanan jual mulai muncul di area atas",
        "Kepastian harga akan naik lagi",
        "Volume pasti nol",
        "Tidak ada pihak yang bertransaksi",
      ],
      answer: 0,
      explanation:
        "Upper wick panjang menandakan kenaikan ditolak. Setelah tren naik, ini bisa menjadi tanda pelemahan, tetapi tetap perlu konfirmasi.",
    },
  ],
};
