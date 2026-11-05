const STOP_WORDS = new Set([
  "yang", "untuk", "dengan", "dari", "pada", "dalam", "ini", "itu", "dan", "atau",
  "adalah", "akan", "bisa", "bagaimana", "apa", "mengapa", "kenapa", "cara", "belajar",
  "tentang", "saya", "kamu", "agar", "supaya", "ketika", "saat", "jika", "bila",
]);

function keywords(topic: string): string[] {
  const words = topic
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 3 && !STOP_WORDS.has(w));
  const unique = [...new Set(words)];
  return unique.slice(0, 3);
}

function titleCase(topic: string): string {
  return topic
    .trim()
    .replace(/\s+/g, " ")
    .split(" ")
    .map((w) => (w.length > 2 ? w.charAt(0).toUpperCase() + w.slice(1) : w))
    .join(" ");
}

export const LESSON_PROMPT_INSTRUCTION = `Buatkan materi pelajaran dalam Bahasa Indonesia tentang topik yang diberikan.
Format keluaran wajib markdown dengan heading persis seperti ini:
## Ringkasan
## Konsep Kunci
## Penjelasan Langkah demi Langkah
## Contoh
## Latihan
## Kunci Jawaban
## Glosarium
Isi setiap bagian secara runtut dan mudah dipahami pelajar Indonesia.`;

export function buildLessonPrompt(topic: string): string {
  return `${LESSON_PROMPT_INSTRUCTION}\n\nTopik: ${topic}`;
}

export function generateLocalLesson(topicRaw: string): string {
  const topic = titleCase(topicRaw.trim() || "Topik Baru");
  const keys = keywords(topicRaw);
  const focus = keys.length > 0 ? keys.join(", ") : topic.toLowerCase();
  const today = new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });

  return `Materi ini disusun oleh mesin lokal LEGACY AI pada ${today}. Mesin lokal menata struktur belajar dari topik yang kamu berikan; isinya kerangka konseptual, bukan hasil model AI eksternal.

## Ringkasan
${topic} adalah topik yang paling mudah dikuasai ketika dibagi menjadi tiga hal: apa definisinya, mengapa ia penting, dan bagaimana mempraktikkannya. Fokus pembahasan: ${focus}. Baca ringkasan ini sekali untuk peta besar, lalu kerjakan bagian lain perlahan.

## Konsep Kunci
- Definisi: pahami dulu arti ${topic} dengan kata-katamu sendiri sebelum menghafal istilah.
- Konteks: kenali kapan ${topic} dipakai dan masalah apa yang ia selesaikan.
- Komponen: bedakan bagian inti dari bagian pendukung agar tidak tersesat di detail.
- Keterkaitan: hubungkan ${topic} dengan materi yang sudah kamu kuasai.
- Batasan: pahami juga apa yang tidak bisa diselesaikan oleh ${topic}.

## Penjelasan Langkah demi Langkah
1. Mulai dari definisi. Tulis ulang definisi ${topic} dalam satu kalimat sederhana tanpa membuka sumber.
2. Cari contoh nyata. Satu contoh dari kehidupan sehari-hari lebih berharga daripada lima definisi.
3. Ulangi dengan variasi. Kerjakan contoh serupa dengan angka atau kondisi berbeda.
4. Jelaskan ke orang lain. Jika bisa mengajarkannya, berarti kamu benar-benar paham.
5. Catat kesulitanmu. Bagian yang membuatmu berhenti adalah bagian yang perlu latihan ekstra.
6. Tutup dengan rangkuman. Setelah selesai, tulis tiga poin yang paling kamu ingat.

## Contoh
Misalkan kamu sedang mempelajari "${topic}" untuk pertama kali. Contoh penerapan sederhananya: tentukan satu masalah kecil yang berkaitan dengan ${focus || topic.toLowerCase()}, selesaikan dengan langkah demi langkah, lalu bandingkan hasilmu dengan penjelasan di buku atau sumber tepercaya. Variasikan kondisi awalnya dan amati bagaimana hasil ikut berubah.

## Latihan
1. Jelaskan dengan bahasamu sendiri: apa itu ${topic}?
2. Sebutkan tiga situasi di mana ${topic} menjadi penting.
3. Apa perbedaan antara memahami ${topic} secara teori dan mempraktikkannya?
4. Buat satu contoh penerapan ${topic} di kehidupan sehari-hari.
5. Bagian mana yang menurutmu paling sulit, dan mengapa?

## Kunci Jawaban
1. Definisi bebas; yang dinilai adalah ketepatan inti, bukan hafalan kata per kata.
2. Jawaban bebas; yang penting situasinya realistis dan berkaitan dengan topik.
3. Teori menjawab "apa dan mengapa", praktik menjawab "bagaimana melakukannya".
4. Contoh bebas; nilai plus bila ada langkah penyelesaian yang jelas.
5. Jawaban reflektif; lanjutkan dengan latihan ekstra di bagian tersebut.

## Glosarium
- Topik: fokus utama materi ini, yaitu ${topic}.
- Konsep: ide utama yang harus dipahami sebelum masuk ke detail.
- Praktik: pengulangan terarah untuk mengubah pemahaman menjadi keahlian.
- Refleksi: meninjau kembali apa yang sudah dan belum dikuasai.

Catatan integritas: materi kerangka ini membantumu belajar mandiri, bukan pengganti sumber resmi. Selalu verifikasi fakta pada buku, dokumentasi, atau sumber tepercaya.`;
}
