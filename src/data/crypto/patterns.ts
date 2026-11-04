export interface PatternBar {
  open: number;
  high: number;
  low: number;
  close: number;
}

export interface CandlePattern {
  id: string;
  name: string;
  english: string;
  bias: "Bullish" | "Bearish" | "Netral";
  summary: string;
  shape: string;
  psychology: string;
  battle: string;
  context: string;
  limitation: string;
  bars: PatternBar[];
}

export const candlePatterns: CandlePattern[] = [
  {
    id: "doji",
    name: "Doji",
    english: "Doji",
    bias: "Netral",
    summary: "Open dan close hampir sama, sehingga body terlihat seperti garis tipis.",
    shape:
      "Body sangat kecil (kurang dari 10% rentang high-low), dengan upper wick dan lower wick yang bisa panjang. Doji tidak selalu berbentuk salib sempurna; yang penting adalah open dan close yang hampir bertemu.",
    psychology:
      "Pembeli sempat mendorong harga naik, penjual sempat menekan harga turun, tetapi tidak ada pihak yang berhasil menutup candle dengan kemenangan jelas. Ini menandakan keraguan dan perlambatan momentum.",
    battle:
      "Kekuatan beli dan jual hampir seimbang. Pertarungan berakhir tanpa pemenang, sehingga arah berikutnya bergantung pada candle konfirmasi setelahnya.",
    context:
      "Sering muncul setelah tren naik atau turun yang mulai kehilangan tenaga, atau saat harga mendekati area support/resistance penting. Contohnya doji di dekat resistance setelah lima candle hijau berturut-turut.",
    limitation:
      "Doji sangat umum dan mudah muncul di data acak. Tanpa konfirmasi candle berikutnya, doji bukan sinyal arah. Jangan menganggap setiap doji sebagai tanda pembalikan.",
    bars: [
      { open: 104, high: 104.6, low: 103.2, close: 103.4 },
      { open: 103.4, high: 103.8, low: 102.2, close: 102.5 },
      { open: 102.5, high: 102.9, low: 101.5, close: 101.8 },
      { open: 101.8, high: 102.2, low: 100.9, close: 101.1 },
      { open: 101.1, high: 102.8, low: 99.5, close: 101.15 },
      { open: 101.15, high: 101.7, low: 100.3, close: 101.5 },
    ],
  },
  {
    id: "hammer",
    name: "Hammer",
    english: "Hammer",
    bias: "Bullish",
    summary: "Body kecil di bagian atas dengan lower wick panjang, muncul setelah penurunan.",
    shape:
      "Lower wick minimal dua kali panjang body, sedangkan upper wick pendek atau hampir tidak ada. Body berada di sepertiga atas rentang candle, seperti palu yang menancap ke bawah.",
    psychology:
      "Penjual sempat menekan harga jauh ke bawah, tetapi pembeli datang dan mendorong harga kembali ke dekat open. Tekanan jual melemah dan permintaan mulai menyerap panik.",
    battle:
      "Penjual menang di awal sesi, lalu kehilangan kendali. Pembeli mengembalikan sebagian besar penurunan, meninggalkan jejak berupa lower wick panjang.",
    context:
      "Lebih bermakna ketika muncul di area support yang sudah diuji, setelah tren turun yang memanjang, atau di ujung lower wick yang disertai volume tinggi.",
    limitation:
      "Hammer di tengah tren turun yang kuat bisa menjadi jebakan. Tanpa candle konfirmasi bullish dan tanpa area support yang jelas, pola ini mudah gagal.",
    bars: [
      { open: 106, high: 106.4, low: 105.1, close: 105.3 },
      { open: 105.3, high: 105.7, low: 104.2, close: 104.5 },
      { open: 104.5, high: 104.9, low: 103.3, close: 103.6 },
      { open: 103.6, high: 103.9, low: 102.1, close: 102.4 },
      { open: 102.4, high: 102.7, low: 101.2, close: 101.5 },
      { open: 101.5, high: 102.2, low: 97.2, close: 101.3 },
    ],
  },
  {
    id: "inverted-hammer",
    name: "Inverted Hammer",
    english: "Inverted Hammer",
    bias: "Bullish",
    summary: "Body kecil di bawah dengan upper wick panjang, muncul setelah penurunan.",
    shape:
      "Upper wick minimal dua kali body, lower wick pendek. Bentuknya seperti palu terbalik: pembeli sempat mencoba naik, tetapi harga ditutup kembali dekat area open.",
    psychology:
      "Pembeli mulai mencoba mengambil alih, meski belum sepenuhnya berhasil. Kehadiran mereka di ujung bawah menunjukkan minat beli mulai muncul setelah tekanan jual panjang.",
    battle:
      "Penjual masih mampu menahan harga di akhir candle, tetapi usaha pembeli mendorong harga ke atas meninggalkan upper wick yang panjang. Perlu konfirmasi untuk melihat siapa yang benar-benar menang.",
    context:
      "Relevan di area support setelah tren turun, terutama jika candle berikutnya ditutup di atas high candle ini.",
    limitation:
      "Upper wick panjang juga bisa berarti penjual masih kuat dan menolak kenaikan. Pola ini paling lemah di antara pola pembalikan bullish dan sering butuh dua candle konfirmasi.",
    bars: [
      { open: 105.8, high: 106.1, low: 104.9, close: 105.1 },
      { open: 105.1, high: 105.4, low: 104.1, close: 104.4 },
      { open: 104.4, high: 104.7, low: 103.2, close: 103.5 },
      { open: 103.5, high: 103.8, low: 102.4, close: 102.7 },
      { open: 102.7, high: 106.9, low: 102.3, close: 102.9 },
      { open: 102.9, high: 103.6, low: 102.5, close: 103.4 },
    ],
  },
  {
    id: "shooting-star",
    name: "Shooting Star",
    english: "Shooting Star",
    bias: "Bearish",
    summary: "Upper wick panjang dengan body kecil di bawah, muncul setelah kenaikan.",
    shape:
      "Upper wick minimal dua kali body, lower wick pendek, dan body berada di sepertiga bawah rentang candle. Bentuknya seperti bintang jatuh di puncak harga.",
    psychology:
      "Pembeli sempat mendorong harga tinggi, tetapi penjual menolak dan menekan harga kembali ke dekat open. Antusiasme beli gagal dipertahankan.",
    battle:
      "Pembeli menang di awal, lalu penjual mengambil alih dan menutup candle jauh di bawah high. Upper wick menjadi bukti penolakan di harga tinggi.",
    context:
      "Muncul di dekat resistance, setelah tren naik yang melelahkan, atau pada level psikologis bulat. Semakin tinggi volume pada candle ini, semakin kuat penolakannya.",
    limitation:
      "Shooting star di tren naik yang sangat kuat bisa hanya berupa jeda. Butuh candle konfirmasi bearish; tanpa itu, harga bisa lanjut naik dan meninggalkan upper wick sebagai bagian dari breakout.",
    bars: [
      { open: 100.4, high: 101, low: 99.8, close: 100.8 },
      { open: 100.8, high: 101.6, low: 100.4, close: 101.4 },
      { open: 101.4, high: 102.3, low: 101.1, close: 102.1 },
      { open: 102.1, high: 103.2, low: 101.9, close: 103 },
      { open: 103, high: 107.4, low: 102.7, close: 103.3 },
      { open: 103.3, high: 103.8, low: 102.4, close: 102.6 },
    ],
  },
  {
    id: "hanging-man",
    name: "Hanging Man",
    english: "Hanging Man",
    bias: "Bearish",
    summary: "Bentuk mirip hammer, tetapi muncul setelah kenaikan sehingga maknanya berbalik.",
    shape:
      "Body kecil di bagian atas candle dengan lower wick panjang. Secara bentuk identik dengan hammer; yang membedakan adalah lokasinya di akhir tren naik.",
    psychology:
      "Penjual sempat menekan harga dalam-dalam. Meskipun pembeli berhasil menutup dekat open, kejadian itu menunjukkan bahwa tekanan jual mulai berani masuk di harga tinggi.",
    battle:
      "Pembeli masih mempertahankan posisi, tetapi penjual menunjukkan kekuatan dengan serangan mendadak ke bawah. Jika tekanan berlanjut, pembeli bisa kehabisan tenaga.",
    context:
      "Muncul setelah kenaikan panjang di dekat resistance. Konfirmasi bearish pada candle berikutnya membuat pola ini lebih layak diperhatikan.",
    limitation:
      "Hanging man sering muncul sebagai bagian dari konsolidasi dan bisa gagal. Bentuknya sama dengan hammer, sehingga konteks tren wajib diperiksa; jangan menilai pola hanya dari bentuk.",
    bars: [
      { open: 100.2, high: 100.8, low: 99.6, close: 100.6 },
      { open: 100.6, high: 101.5, low: 100.3, close: 101.3 },
      { open: 101.3, high: 102.4, low: 101, close: 102.2 },
      { open: 102.2, high: 103.4, low: 102, close: 103.2 },
      { open: 103.2, high: 104, low: 102.9, close: 103.9 },
      { open: 103.9, high: 104.5, low: 99.4, close: 104.1 },
      { open: 104.1, high: 104.4, low: 103.2, close: 103.5 },
    ],
  },
  {
    id: "bullish-engulfing",
    name: "Bullish Engulfing",
    english: "Bullish Engulfing",
    bias: "Bullish",
    summary: "Candle bullish menelan seluruh body candle bearish sebelumnya.",
    shape:
      "Dua candle: pertama bearish, kedua bullish. Body candle kedua dibuka di bawah close candle pertama dan ditutup di atas open candle pertama, sehingga menutupi seluruh body sebelumnya.",
    psychology:
      "Penjual menguasai candle pertama, tetapi pembeli masuk dengan kekuatan besar pada candle kedua. Perubahan kendali terjadi dalam waktu singkat dan terlihat jelas dari body yang lebih besar.",
    battle:
      "Penjual kehilangan semua keunggulan yang sempat dimiliki. Pembeli tidak hanya menahan penurunan, tetapi membalikkan harga melewati titik awal penurunan.",
    context:
      "Lebih kuat di area support, setelah beberapa candle bearish, dan jika candle engulfing disertai volume di atas rata-rata.",
    limitation:
      "Engulfing bisa terbentuk di pasar sideways dan tidak menghasilkan tren. Pastikan ukuran body benar-benar menutupi body sebelumnya serta ada ruang menuju resistance berikutnya.",
    bars: [
      { open: 104.2, high: 104.5, low: 103.4, close: 103.6 },
      { open: 103.6, high: 103.9, low: 102.7, close: 102.9 },
      { open: 102.9, high: 103.2, low: 101.9, close: 102.1 },
      { open: 102.1, high: 102.4, low: 100.6, close: 100.9 },
      { open: 100.8, high: 102.9, low: 100.5, close: 102.6 },
      { open: 102.6, high: 103.4, low: 102.2, close: 103.1 },
    ],
  },
  {
    id: "bearish-engulfing",
    name: "Bearish Engulfing",
    english: "Bearish Engulfing",
    bias: "Bearish",
    summary: "Candle bearish menelan seluruh body candle bullish sebelumnya.",
    shape:
      "Candle pertama bullish, candle kedua bearish dengan open di atas close sebelumnya dan close di bawah open sebelumnya. Body kedua lebih besar dan menutupi body pertama.",
    psychology:
      "Pembeli sempat menguasai sesi, tetapi penjual masuk dengan tekanan besar dan membalikkan seluruh kenaikan. Kepercayaan pembeli runtuh dengan cepat.",
    battle:
      "Penjual merebut kembali kendali dan menutup candle di bawah titik awal kenaikan. Pembeli yang masuk di candle pertama terjebak dan bisa memperkuat tekanan jual.",
    context:
      "Sering muncul di resistance atau setelah kenaikan tajam. Volume tinggi pada candle kedua meningkatkan arti pola.",
    limitation:
      "Di tren naik yang kuat, bearish engulfing bisa hanya menjadi pullback. Jangan mengabaikan struktur pasar dan candle konfirmasi berikutnya.",
    bars: [
      { open: 99.8, high: 100.3, low: 99.5, close: 100.2 },
      { open: 100.2, high: 100.8, low: 100, close: 100.7 },
      { open: 100.7, high: 101.6, low: 100.5, close: 101.4 },
      { open: 101.4, high: 102.5, low: 101.2, close: 102.3 },
      { open: 102.5, high: 102.8, low: 99.7, close: 99.9 },
      { open: 99.9, high: 100.3, low: 99.2, close: 99.6 },
    ],
  },
  {
    id: "morning-star",
    name: "Morning Star",
    english: "Morning Star",
    bias: "Bullish",
    summary: "Tiga candle: bearish besar, candle kecil, lalu bullish besar.",
    shape:
      "Candle pertama bearish panjang, candle kedua berbody kecil (bisa bullish atau bearish) yang menunjukkan jeda, lalu candle ketiga bullish panjang yang menutup jauh ke dalam body candle pertama.",
    psychology:
      "Tekanan jual tinggi pada candle pertama, melemah pada candle kedua, lalu berbalik menjadi serangan beli pada candle ketiga. Peralihan terjadi bertahap, bukan mendadak.",
    battle:
      "Penjual kehilangan momentum pada candle kedua. Pembeli mengambil inisiatif pada candle ketiga dan menutup sebagian besar penurunan sebelumnya.",
    context:
      "Pola pembalikan yang lebih kuat ketika muncul di support, setelah tren turun, dan candle ketiga disertai volume besar.",
    limitation:
      "Butuh tiga candle, sehingga konfirmasi datang terlambat dan harga sudah bergerak. Pola ini juga sering dimanipulasi di timeframe sangat kecil; timeframe terlalu rendah menambah noise.",
    bars: [
      { open: 105.4, high: 105.6, low: 104.2, close: 104.4 },
      { open: 104.4, high: 104.7, low: 103, close: 103.2 },
      { open: 103.2, high: 103.5, low: 100.4, close: 100.6 },
      { open: 100.5, high: 100.9, low: 99.8, close: 100.1 },
      { open: 100.4, high: 103.7, low: 100.2, close: 103.5 },
      { open: 103.5, high: 104.1, low: 103.1, close: 103.9 },
    ],
  },
  {
    id: "evening-star",
    name: "Evening Star",
    english: "Evening Star",
    bias: "Bearish",
    summary: "Tiga candle: bullish besar, candle kecil, lalu bearish besar.",
    shape:
      "Candle pertama bullish panjang, candle kedua berbody kecil sebagai jeda di area tinggi, lalu candle ketiga bearish panjang yang menutup jauh ke dalam body candle pertama.",
    psychology:
      "Pembeli mendorong harga tinggi, lalu kehabisan tenaga. Keraguan muncul pada candle kedua, dan penjual mengambil alih pada candle ketiga.",
    battle:
      "Kendali berpindah dari pembeli ke penjual dalam tiga tahap. Candle ketiga yang besar menunjukkan penjual tidak sekadar bertahan, tetapi menekan harga dengan agresif.",
    context:
      "Berada di resistance atau setelah kenaikan panjang. Volume tinggi pada candle ketiga memperkuat arti pembalikan.",
    limitation:
      "Sama seperti morning star, konfirmasi baru muncul setelah sebagian pergerakan terjadi. Di pasar sideways, pola ini sering menjadi noise.",
    bars: [
      { open: 99.6, high: 99.9, low: 98.9, close: 99.7 },
      { open: 99.7, high: 100.6, low: 99.5, close: 100.4 },
      { open: 100.4, high: 102.2, low: 100.2, close: 102 },
      { open: 102.1, high: 102.5, low: 102, close: 102.3 },
      { open: 102.2, high: 102.6, low: 99.1, close: 99.4 },
      { open: 99.4, high: 99.8, low: 98.8, close: 99 },
    ],
  },
  {
    id: "pin-bar",
    name: "Pin Bar",
    english: "Pin Bar",
    bias: "Bullish",
    summary: "Candle dengan satu wick sangat panjang sebagai tanda penolakan harga.",
    shape:
      "Satu wick mendominasi, minimal dua pertiga dari total rentang candle, sementara body kecil. Pin bar bullish memiliki lower wick panjang; pin bar bearish memiliki upper wick panjang.",
    psychology:
      "Harga sempat bergerak jauh ke satu arah, lalu ditolak keras dan kembali ke dekat open. Wick panjang merekam jejak penolakan tersebut.",
    battle:
      "Satu pihak mencoba mendorong harga, pihak lain menyerap semua tekanan dan mengembalikan harga. Penolakan yang tajam menunjukkan likuiditas di level tersebut.",
    context:
      "Paling relevan di area support/resistance yang jelas atau setelah sweep level sebelumnya. Konfirmasi berupa candle berikutnya yang bergerak menjauh dari wick.",
    limitation:
      "Pin bar bisa muncul di area acak dan tidak selalu berarti pembalikan. Di timeframe rendah, wick panjang dapat berasal dari spread, berita, atau lonjakan likuiditas sesaat.",
    bars: [
      { open: 104.8, high: 105.1, low: 104, close: 104.2 },
      { open: 104.2, high: 104.5, low: 103.4, close: 103.6 },
      { open: 103.6, high: 103.9, low: 102.8, close: 103 },
      { open: 103, high: 103.3, low: 102.1, close: 102.3 },
      { open: 102.3, high: 102.9, low: 97.4, close: 102.6 },
      { open: 102.6, high: 103.3, low: 102.2, close: 103.1 },
    ],
  },
  {
    id: "marubozu",
    name: "Marubozu",
    english: "Marubozu",
    bias: "Bullish",
    summary: "Candle dengan body penuh tanpa wick, menunjukkan kendali satu pihak sepanjang sesi.",
    shape:
      "Open berada di low dan close berada di high untuk marubozu bullish; sebaliknya untuk marubozu bearish. Hampir tidak ada wick di kedua ujung.",
    psychology:
      "Satu pihak mendominasi dari pembukaan hingga penutupan tanpa memberi kesempatan lawan untuk membalikkan harga.",
    battle:
      "Pembeli (atau penjual pada versi bearish) menang sepanjang candle. Tidak ada perlawanan berarti yang terlihat dari wick.",
    context:
      "Sering muncul saat breakout, setelah berita penting, atau ketika likuiditas menipis. Marubozu yang diikuti volume tinggi menunjukkan partisipasi pasar yang kuat.",
    limitation:
      "Body besar tidak menjamin kelanjutan tren; bisa terjadi exhaustion setelah pergerakan terlalu cepat. Candle berikutnya tetap harus dikonfirmasi, terutama jika harga langsung memasuki resistance.",
    bars: [
      { open: 100.2, high: 100.6, low: 99.8, close: 100.4 },
      { open: 100.4, high: 100.9, low: 99.9, close: 100.6 },
      { open: 100.6, high: 101.2, low: 100.3, close: 101 },
      { open: 101, high: 101.4, low: 100.7, close: 101.2 },
      { open: 101.2, high: 105.6, low: 101.2, close: 105.6 },
      { open: 105.6, high: 106.2, low: 105.1, close: 105.8 },
    ],
  },
];

export function getPattern(id: string): CandlePattern | undefined {
  return candlePatterns.find((pattern) => pattern.id === id);
}
