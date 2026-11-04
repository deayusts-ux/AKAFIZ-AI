import type { Chapter } from "../types";

export const chapterBerita: Chapter = {
  slug: "berita-fundamental",
  order: 10,
  title: "Membaca Berita Fundamental",
  shortTitle: "Berita Fundamental",
  subtitle: "CPI, PPI, NFP, FOMC, dan cara pasar crypto bereaksi terhadap makro",
  description:
    "Panduan membaca data ekonomi Amerika Serikat yang paling memengaruhi likuiditas global, memahami ekspektasi versus kenyataan, dan menghindari reaksi impulsif terhadap berita.",
  level: "Lanjutan",
  minutes: 45,
  icon: "Newspaper",
  accent: "#fb7185",
  objectives: [
    "Menjelaskan CPI, PPI, NFP, dan FOMC.",
    "Memahami hubungan inflasi, suku bunga, dolar, dan crypto.",
    "Membedakan ekspektasi pasar dan angka aktual.",
    "Menyusun kebiasaan membaca kalender ekonomi.",
  ],
  sections: [
    {
      id: "mengapa-makro",
      heading: "Mengapa data makro AS memengaruhi crypto",
      paragraphs: [
        "Crypto diperdagangkan dalam dolar dan terhubung dengan likuiditas keuangan global. Ketika biaya dolar berubah, aliran modal ke aset berisiko juga berubah. Karena itu, data ekonomi Amerika Serikat menjadi perhatian besar.",
        "The Federal Reserve mengatur suku bunga dan likuiditas dolar. Ketika suku bunga naik, imbal hasil aset aman seperti obligasi menjadi lebih menarik, sehingga sebagian dana bisa keluar dari aset berisiko termasuk crypto.",
        "Namun, hubungan ini tidak selalu sempurna. Crypto juga punya faktor internal seperti ETF, adopsi, regulasi, dan likuiditas pasar sendiri. Makro adalah angin besar, bukan satu-satunya penentu.",
      ],
      visual: {
        kind: "macro",
        caption:
          "Rantai pengaruh makro: inflasi dan data tenaga kerja memengaruhi ekspektasi suku bunga, lalu dolar dan likuiditas, akhirnya aset berisiko.",
      },
    },
    {
      id: "cpi",
      heading: "CPI: indeks harga konsumen",
      paragraphs: [
        "Consumer Price Index mengukur perubahan harga barang dan jasa yang dibeli rumah tangga. CPI adalah salah satu data inflasi paling diperhatikan karena memengaruhi keputusan suku bunga The Fed.",
        "Pasar bereaksi terhadap selisih antara angka aktual dan ekspektasi. Jika CPI lebih tinggi dari perkiraan, pasar bisa menganggap The Fed akan lebih hawkish, sehingga dolar menguat dan aset berisiko tertekan. Jika lebih rendah, reaksi bisa sebaliknya.",
        "Perhatikan juga core CPI yang mengeluarkan makanan dan energi karena lebih stabil. Angka headline bisa berubah karena harga minyak, sementara core lebih menggambarkan tekanan inflasi yang mendasar.",
      ],
      callout: {
        tone: "info",
        title: "Yang penting adalah surprise",
        body: "Angka 3 persen bisa bullish atau bearish tergantung ekspektasi. Selalu bandingkan actual dengan forecast dan revisi data sebelumnya.",
      },
    },
    {
      id: "ppi",
      heading: "PPI: indeks harga produsen",
      paragraphs: [
        "Producer Price Index mengukur perubahan harga di tingkat produsen. PPI sering dianggap sebagai petunjuk awal tekanan inflasi yang bisa diteruskan ke konsumen.",
        "PPI yang lebih tinggi dari perkiraan dapat menaikkan kekhawatiran inflasi, terutama jika disertai CPI yang juga panas. Namun, kenaikan PPI tidak selalu diteruskan penuh ke harga konsumen karena margin perusahaan bisa menyerap sebagian.",
        "Gunakan PPI bersama CPI, bukan sendirian. Data ini lebih berguna untuk melihat arah tekanan harga daripada menentukan satu keputusan trading.",
      ],
    },
    {
      id: "nfp",
      heading: "NFP dan data tenaga kerja",
      paragraphs: [
        "Nonfarm Payrolls mengukur perubahan jumlah pekerja di luar sektor pertanian. NFP yang kuat menunjukkan pasar tenaga kerja sehat, yang bisa membuat The Fed lebih nyaman menahan suku bunga tinggi.",
        "Pasangan NFP adalah tingkat pengangguran dan pertumbuhan upah. Upah yang tumbuh cepat dapat mempertahankan inflasi jasa, sehingga pasar mungkin membaca data sebagai alasan bagi kebijakan yang lebih ketat.",
        "Data tenaga kerja sering direvisi. Reaksi awal bisa berubah setelah pasar mencerna detail, revisi, dan komponen upah. Hindari mengeksekusi hanya dari angka headline dalam hitungan detik.",
      ],
      bullets: [
        "NFP kuat: ekonomi sehat, tetapi bisa berarti suku bunga lebih lama tinggi.",
        "NFP lemah: ekonomi melambat, bisa mendorong harapan pemotongan suku bunga.",
        "Pengangguran naik: tanda pelemahan, tetapi reaksi pasar tergantung konteks.",
        "Upah naik cepat: risiko inflasi jasa tetap tinggi.",
      ],
    },
    {
      id: "fomc",
      heading: "FOMC, suku bunga, dan hawkish-dovish",
      paragraphs: [
        "FOMC adalah komite The Fed yang menentukan arah kebijakan moneter. Keputusan suku bunga, pernyataan resmi, dan konferensi pers Ketua The Fed dapat menggerakkan pasar lebih besar daripada data tunggal.",
        "Hawkish berarti kecenderungan menaikkan suku bunga atau menjaga kebijakan ketat untuk melawan inflasi. Dovish berarti kecenderungan melonggarkan kebijakan. Pasar sering bereaksi pada nuansa bahasa, bukan hanya angka suku bunga.",
        "Dot plot, proyeksi pertumbuhan, dan komentar tentang inflasi juga penting. Kadang suku bunga tidak berubah, tetapi nada pernyataan berubah dan itu cukup untuk menggerakkan dolar serta crypto.",
      ],
      callout: {
        tone: "warning",
        title: "Volatilitas saat rilis",
        body: "Beberapa menit pertama setelah FOMC sering penuh likuiditas tipis dan spread melebar. Jika tidak yakin, menunggu lebih baik daripada mengejar harga.",
      },
    },
    {
      id: "dolar",
      heading: "Dolar, obligasi, dan likuiditas global",
      paragraphs: [
        "Indeks dolar atau DXY mengukur kekuatan dolar terhadap sekeranjang mata uang. Dolar yang menguat umumnya menjadi hambatan bagi aset berisiko, termasuk crypto, karena biaya likuiditas global meningkat.",
        "Imbal hasil obligasi pemerintah AS, terutama tenor 10 tahun, mencerminkan ekspektasi pertumbuhan dan inflasi. Kenaikan imbal hasil riil dapat menarik dana keluar dari aset tanpa imbal hasil.",
        "ETF dan aliran institusi menambah lapisan baru. Inflow ETF spot dapat menjadi permintaan nyata, sedangkan outflow dapat menekan harga. Selalu bedakan aliran dana jangka panjang dari spekulasi jangka pendek.",
      ],
    },
    {
      id: "kebiasaan",
      heading: "Kebiasaan membaca berita dengan tenang",
      paragraphs: [
        "Gunakan kalender ekonomi resmi atau sumber terpercaya untuk mengetahui jadwal rilis. Catat konsensus, angka sebelumnya, dan revisi. Jangan mengandalkan tangkapan layar atau komentar media sosial tanpa verifikasi.",
        "Siapkan skenario sebelum rilis: jika data panas, apa yang dilakukan; jika data dingin, apa yang dilakukan; jika sesuai ekspektasi, apakah tetap trading? Skenario mengurangi keputusan panik.",
        "Jangan mengubah ukuran posisi menjadi sangat besar hanya karena yakin pada arah berita. Ketidakpastian tetap ada, dan reaksi pasar terhadap berita bisa berlawanan dengan logika awal.",
      ],
      callout: {
        tone: "tip",
        title: "Disiplin saat berita",
        body: "Kurangi ukuran posisi atau tunggu candle pertama selesai. Kehilangan sebagian peluang lebih baik daripada kehilangan modal karena eksekusi impulsif.",
      },
    },
  ],
  takeaways: [
    "Makro memengaruhi crypto melalui likuiditas dan ekspektasi suku bunga.",
    "CPI dan PPI mengukur inflasi dari sisi konsumen dan produsen.",
    "NFP dan upah memberi gambaran kesehatan pasar tenaga kerja.",
    "FOMC bergerak lewat keputusan dan nuansa pernyataan.",
    "Reaksi pasar ditentukan oleh surprise, bukan angka mentah.",
  ],
  quiz: [
    {
      id: "q10-1",
      chapter: "berita-fundamental",
      question: "CPI mengukur...",
      options: [
        "Perubahan harga barang dan jasa yang dibeli konsumen",
        "Jumlah pekerja di sektor pertanian",
        "Harga produsen saja",
        "Suku bunga The Fed",
      ],
      answer: 0,
      explanation:
        "Consumer Price Index mengukur inflasi dari sisi konsumen dan menjadi salah satu data paling diperhatikan pasar.",
    },
    {
      id: "q10-2",
      chapter: "berita-fundamental",
      question: "CPI yang jauh lebih tinggi dari ekspektasi umumnya...",
      options: [
        "Mendorong ekspektasi kebijakan lebih ketat dan menekan aset berisiko",
        "Pasti membuat crypto naik",
        "Tidak memengaruhi pasar",
        "Menurunkan suku bunga",
      ],
      answer: 0,
      explanation:
        "Inflasi panas dapat membuat The Fed lebih hawkish, sehingga dolar menguat dan aset berisiko seperti crypto tertekan.",
    },
    {
      id: "q10-3",
      chapter: "berita-fundamental",
      question: "NFP adalah data tentang...",
      options: [
        "Perubahan pekerjaan di luar sektor pertanian",
        "Harga konsumen",
        "Neraca bank sentral",
        "Volume crypto",
      ],
      answer: 0,
      explanation:
        "Nonfarm Payrolls mengukur perubahan jumlah pekerja di luar sektor pertanian dan menjadi indikator penting pasar tenaga kerja AS.",
    },
    {
      id: "q10-4",
      chapter: "berita-fundamental",
      question: "FOMC bertugas...",
      options: [
        "Menentukan kebijakan moneter dan suku bunga AS",
        "Mengatur harga Bitcoin",
        "Menerbitkan stablecoin",
        "Mengaudit bursa crypto",
      ],
      answer: 0,
      explanation:
        "FOMC adalah komite The Fed yang menentukan arah kebijakan moneter, termasuk suku bunga.",
    },
    {
      id: "q10-5",
      chapter: "berita-fundamental",
      question: "Kenaikan suku bunga cenderung...",
      options: [
        "Memperkuat dolar dan menekan aset berisiko",
        "Melemahkan dolar dan pasti menaikkan crypto",
        "Tidak berpengaruh pada dolar",
        "Menghapus inflasi seketika",
      ],
      answer: 0,
      explanation:
        "Suku bunga lebih tinggi menarik dana ke aset aman, memperkuat dolar, dan sering menjadi hambatan bagi aset berisiko.",
    },
    {
      id: "q10-6",
      chapter: "berita-fundamental",
      question: "PPI mengukur...",
      options: [
        "Harga di tingkat produsen",
        "Harga konsumen akhir",
        "Jumlah pengangguran",
        "Cadangan emas",
      ],
      answer: 0,
      explanation:
        "Producer Price Index mengukur perubahan harga di tingkat produsen dan bisa menjadi petunjuk awal tekanan inflasi.",
    },
    {
      id: "q10-7",
      chapter: "berita-fundamental",
      question: "Apa arti 'priced in'?",
      options: [
        "Ekspektasi sudah tercermin dalam harga sebelum rilis",
        "Harga sudah ditetapkan pemerintah",
        "Semua order dibatalkan",
        "Volume sudah nol",
      ],
      answer: 0,
      explanation:
        "Jika pasar sudah memperkirakan suatu hasil, reaksi terhadap angka yang sesuai ekspektasi bisa kecil. Kejutan di luar ekspektasi lebih menggerakkan harga.",
    },
    {
      id: "q10-8",
      chapter: "berita-fundamental",
      question: "DXY yang menguat umumnya...",
      options: [
        "Menjadi hambatan bagi aset berisiko",
        "Selalu membuat crypto naik",
        "Tidak berhubungan dengan likuiditas",
        "Menurunkan imbal hasil obligasi",
      ],
      answer: 0,
      explanation:
        "Dolar yang lebih kuat meningkatkan biaya likuiditas global dan sering menekan aset berisiko, termasuk crypto.",
    },
    {
      id: "q10-9",
      chapter: "berita-fundamental",
      question: "Inflow ETF spot crypto dapat...",
      options: [
        "Menambah permintaan nyata terhadap aset dasar",
        "Menghapus supply otomatis",
        "Membuat harga pasti naik selamanya",
        "Menggantikan semua bursa",
      ],
      answer: 0,
      explanation:
        "ETF spot dapat menciptakan permintaan melalui pembelian aset dasar, meskipun arah harga tetap dipengaruhi banyak faktor.",
    },
    {
      id: "q10-10",
      chapter: "berita-fundamental",
      question: "Cara paling sehat menyikapi rilis berita adalah...",
      options: [
        "Menyiapkan skenario, mengurangi risiko, dan menunggu konfirmasi",
        "Mengeksekusi secepat mungkin dengan leverage maksimum",
        "Mengabaikan semua data",
        "Mengikuti komentar media sosial tanpa verifikasi",
      ],
      answer: 0,
      explanation:
        "Skenario dan pengelolaan risiko membantu menghadapi volatilitas. Mengejar harga saat rilis sering berakhir dengan eksekusi buruk.",
    },
  ],
};
