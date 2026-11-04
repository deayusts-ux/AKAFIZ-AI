import type { SimulationExercise } from "./types";

export const simulationExercises: SimulationExercise[] = [
  {
    id: "sim-doji",
    title: "Keraguan setelah reli",
    level: "Mudah",
    context:
      "Harga naik empat candle berturut-turut menuju area yang sebelumnya menjadi resistance. Candle terakhir memiliki body sangat tipis dengan wick di kedua sisi.",
    question: "Interpretasi paling sehat untuk candle yang disorot adalah...",
    options: [
      { label: "Pembeli masih sepenuhnya menguasai pasar dan harga pasti lanjut naik", correct: false },
      { label: "Terjadi keseimbangan setelah reli, sehingga arah berikutnya menunggu konfirmasi", correct: true },
      { label: "Penjual pasti sudah menang dan harga akan langsung turun", correct: false },
      { label: "Candle tidak memiliki arti karena volumenya tidak terlihat", correct: false },
    ],
    explanation:
      "Candle dengan open dan close hampir sama adalah doji. Setelah reli, doji menunjukkan keraguan, bukan kepastian pembalikan. Arah baru terlihat dari candle konfirmasi dan reaksi di resistance.",
    bars: [
      { open: 100, high: 101.2, low: 99.8, close: 100.9 },
      { open: 100.9, high: 102.4, low: 100.6, close: 102.1 },
      { open: 102.1, high: 103.6, low: 101.8, close: 103.2 },
      { open: 103.2, high: 104.8, low: 102.9, close: 104.4 },
      { open: 104.4, high: 105.1, low: 103.9, close: 104.45 },
    ],
    highlight: 4,
    takeaway: "Doji adalah tanda keseimbangan. Tanpa konfirmasi, ia belum menjadi sinyal arah.",
  },
  {
    id: "sim-hammer",
    title: "Pembeli bertahan di support",
    level: "Mudah",
    context:
      "Setelah lima candle turun, harga menyentuh area support yang sudah beberapa kali diuji. Candle terakhir turun dalam, lalu ditutup kembali di dekat open.",
    question: "Apa yang paling mungkin ditunjukkan candle yang disorot?",
    options: [
      { label: "Penjual menolak semua pembelian sehingga tekanan jual makin kuat", correct: false },
      { label: "Pembeli menyerap tekanan jual di area bawah, potensi pembalikan naik perlu konfirmasi", correct: true },
      { label: "Volume pasti nol karena candle memiliki wick", correct: false },
      { label: "Harga tidak mungkin bergerak lagi setelah candle ini", correct: false },
    ],
    explanation:
      "Bentuk ini adalah hammer: body kecil di atas dengan lower wick panjang. Harga turun dalam tetapi pembeli mendorongnya kembali. Di area support, ini menunjukkan penolakan terhadap harga rendah, tetapi tetap butuh candle konfirmasi.",
    bars: [
      { open: 105, high: 105.6, low: 103.8, close: 104.2 },
      { open: 104.2, high: 104.8, low: 102.9, close: 103.3 },
      { open: 103.3, high: 103.9, low: 102.4, close: 102.7 },
      { open: 102.7, high: 103.2, low: 101.9, close: 102.1 },
      { open: 102.0, high: 102.9, low: 98.6, close: 102.4 },
    ],
    highlight: 4,
    takeaway: "Lower wick panjang di support menunjukkan pembeli aktif, bukan jaminan pembalikan.",
  },
  {
    id: "sim-engulfing",
    title: "Peralihan kendali",
    level: "Sedang",
    context:
      "Harga berada di zona support setelah beberapa hari turun. Candle merah kecil diikuti candle hijau besar yang body-nya menutupi seluruh body candle merah sebelumnya.",
    question: "Pola yang disorot paling tepat disebut...",
    options: [
      { label: "Shooting star", correct: false },
      { label: "Bullish engulfing", correct: true },
      { label: "Evening star", correct: false },
      { label: "Hanging man", correct: false },
    ],
    explanation:
      "Candle hijau menutupi body candle merah sebelumnya sehingga membentuk bullish engulfing. Di area support, pola ini menunjukkan pembeli mengambil alih, meskipun konfirmasi tetap diperlukan.",
    bars: [
      { open: 108, high: 108.4, low: 106.8, close: 107.1 },
      { open: 107.1, high: 107.5, low: 105.9, close: 106.2 },
      { open: 106.2, high: 106.4, low: 104.8, close: 105.1 },
      { open: 104.9, high: 107.4, low: 104.6, close: 107.2 },
      { open: 107.2, high: 108.1, low: 106.9, close: 107.8 },
    ],
    highlight: 3,
    takeaway: "Engulfing menunjukkan peralihan kendali, terutama jika muncul di area penting.",
  },
  {
    id: "sim-shooting-star",
    title: "Kenaikan yang ditolak",
    level: "Sedang",
    context:
      "Empat candle hijau membawa harga ke resistance. Candle kelima sempat melesat jauh ke atas, tetapi ditutup kembali di dekat open.",
    question: "Pola pada candle yang disorot adalah...",
    options: [
      { label: "Hammer", correct: false },
      { label: "Bullish marubozu", correct: false },
      { label: "Shooting star", correct: true },
      { label: "Morning star", correct: false },
    ],
    explanation:
      "Body kecil di bawah dengan upper wick panjang setelah kenaikan adalah shooting star. Pola ini menunjukkan penjual menolak harga tinggi. Konfirmasi berupa candle bearish berikutnya meningkatkan validitas.",
    bars: [
      { open: 100, high: 101.1, low: 99.7, close: 100.8 },
      { open: 100.8, high: 102.2, low: 100.5, close: 101.9 },
      { open: 101.9, high: 103.4, low: 101.6, close: 103.1 },
      { open: 103.1, high: 104.6, low: 102.8, close: 104.3 },
      { open: 104.3, high: 107.8, low: 104.1, close: 104.5 },
    ],
    highlight: 4,
    takeaway: "Upper wick panjang di resistance menandakan kenaikan ditolak, bukan kepastian pembalikan.",
  },
  {
    id: "sim-bearish-engulfing",
    title: "Penjual mengambil alih puncak",
    level: "Sedang",
    context:
      "Harga naik dalam beberapa sesi dan mendekati area resistance. Candle hijau kecil diikuti candle merah besar yang menutupi seluruh body hijau sebelumnya.",
    question: "Sinyal apa yang paling tepat dibaca dari pola tersebut?",
    options: [
      { label: "Bearish engulfing, penjual mengambil alih setelah kenaikan", correct: true },
      { label: "Bullish continuation tanpa risiko", correct: false },
      { label: "Doji netral tanpa petunjuk", correct: false },
      { label: "Morning star yang bullish", correct: false },
    ],
    explanation:
      "Candle merah besar yang menutupi body hijau sebelumnya adalah bearish engulfing. Di resistance setelah kenaikan, pola ini menunjukkan penjual mulai mengendalikan harga.",
    bars: [
      { open: 95, high: 96.2, low: 94.7, close: 95.9 },
      { open: 95.9, high: 97.1, low: 95.5, close: 96.8 },
      { open: 96.8, high: 98.1, low: 96.4, close: 97.9 },
      { open: 98.1, high: 98.5, low: 96.2, close: 96.5 },
      { open: 96.5, high: 97.2, low: 95.8, close: 96.1 },
    ],
    highlight: 3,
    takeaway: "Engulfing bearish di resistance menunjukkan tekanan jual yang lebih agresif.",
  },
  {
    id: "sim-morning-star",
    title: "Tiga langkah pembalikan",
    level: "Sulit",
    context:
      "Setelah penurunan tajam, harga membentuk candle merah panjang, candle kecil yang hampir tidak bergerak, lalu candle hijau panjang yang menutup jauh di dalam body candle pertama.",
    question: "Pola tiga candle tersebut adalah...",
    options: [
      { label: "Evening star", correct: false },
      { label: "Morning star", correct: true },
      { label: "Bearish engulfing", correct: false },
      { label: "Three black crows", correct: false },
    ],
    explanation:
      "Urutan bearish panjang, candle kecil, lalu bullish panjang yang menutup jauh di dalam body pertama adalah morning star. Pola ini menunjukkan peralihan bertahap dari penjual ke pembeli.",
    bars: [
      { open: 110, high: 110.6, low: 107.9, close: 108.2 },
      { open: 108.2, high: 108.6, low: 106.4, close: 106.8 },
      { open: 106.8, high: 107.1, low: 105.9, close: 106.3 },
      { open: 106.2, high: 109.3, low: 105.8, close: 109.0 },
      { open: 109.0, high: 109.8, low: 108.6, close: 109.5 },
    ],
    highlight: 3,
    takeaway: "Morning star menggambarkan perubahan tekanan secara bertahap, bukan satu candle ajaib.",
  },
  {
    id: "sim-fakeout",
    title: "Tembus lalu kembali",
    level: "Sulit",
    context:
      "Resistance di sekitar 106 sudah beberapa kali menahan harga. Candle yang disorot menembus ke atas, tetapi ditutup kembali di bawah resistance.",
    question: "Apa yang paling mungkin terjadi pada candle tersebut?",
    options: [
      { label: "Breakout valid karena harga sempat menembus resistance", correct: false },
      { label: "Fakeout atau liquidity sweep karena close kembali di bawah level", correct: true },
      { label: "Pola morning star", correct: false },
      { label: "Tidak ada informasi yang bisa dibaca", correct: false },
    ],
    explanation:
      "Penembusan hanya melalui wick, lalu close kembali di bawah resistance, lebih menunjukkan fakeout. Order breakout dan stop loss sempat terpicu sebelum harga kembali ke rentang.",
    bars: [
      { open: 104, high: 105.2, low: 103.7, close: 104.9 },
      { open: 104.9, high: 105.8, low: 104.6, close: 105.5 },
      { open: 105.5, high: 106.1, low: 104.9, close: 105.2 },
      { open: 105.2, high: 106.3, low: 105.0, close: 105.8 },
      { open: 105.8, high: 107.9, low: 105.6, close: 105.4 },
      { open: 105.4, high: 105.9, low: 104.7, close: 104.9 },
    ],
    highlight: 4,
    takeaway: "Close di luar level lebih penting daripada sentuhan wick sesaat.",
  },
  {
    id: "sim-structure",
    title: "Membaca struktur, bukan satu candle",
    level: "Sulit",
    context:
      "Chart menunjukkan rangkaian puncak dan dasar yang terus naik. Candle terakhir berwarna merah dan berhenti di atas higher low sebelumnya.",
    question: "Kesimpulan paling tepat tentang struktur saat ini adalah...",
    options: [
      { label: "Tren naik masih utuh karena higher low belum ditembus", correct: true },
      { label: "Tren turun sudah pasti dimulai karena ada candle merah", correct: false },
      { label: "Struktur tidak bisa dibaca dari data ini", correct: false },
      { label: "Terjadi double top karena ada dua candle merah", correct: false },
    ],
    explanation:
      "Struktur naik ditandai higher high dan higher low. Selama higher low terakhir tidak ditembus dengan close, struktur belum rusak. Satu candle merah tidak mengubah struktur.",
    bars: [
      { open: 100, high: 101.5, low: 99.5, close: 101.0 },
      { open: 101.0, high: 102.8, low: 100.7, close: 102.4 },
      { open: 102.4, high: 103.1, low: 101.2, close: 101.6 },
      { open: 101.6, high: 103.9, low: 101.4, close: 103.5 },
      { open: 103.5, high: 104.2, low: 102.6, close: 103.0 },
      { open: 103.0, high: 105.1, low: 102.8, close: 104.8 },
      { open: 104.8, high: 105.4, low: 103.2, close: 103.6 },
    ],
    highlight: 6,
    takeaway: "Struktur dibangun oleh rangkaian swing, bukan oleh warna satu candle.",
  },
];
