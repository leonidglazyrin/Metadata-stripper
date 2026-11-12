import type { PagesTranslation } from './types';
import type { Section } from '../guides';

const LEGAL_DL: Section = {
  h: 'Apakah ini legal?',
  blocks: [
    {
      p: 'Unduh hanya video yang kamu buat sendiri, yang berlisensi untuk dipakai ulang (misalnya Creative Commons), atau yang pemiliknya sudah mengizinkanmu memakainya. Ketentuan layanan sebagian besar platform membatasi pengunduhan, dan hukum hak cipta berbeda di tiap negara. Menyimpan video tidak memberimu hak untuk mengunggahnya ulang, dan {site} tidak berafiliasi dengan platform mana pun di sini.',
    },
  ],
};

export const id: PagesTranslation = {
  ui: {
    locale: 'id-ID',
    kind: { synthid: 'Panduan SynthID', privacy: 'Panduan privasi', download: 'Panduan unduhan' },
    stepsTitle: 'Langkah demi langkah dengan {site}',
    questions: 'Pertanyaan umum',
    related: 'Panduan terkait',
    contents: 'Di halaman ini',
    updated: 'Diperbarui',
    home: 'Beranda',
    guides: 'Panduan',
    pricing: 'Harga',
    openTools: 'Buka alat',
    navLabel: 'Utama',
    breadcrumb: 'Jejak navigasi',
    language: 'Bahasa',
    footer: {
      tagline: 'Penghapus metadata, C2PA, dan SynthID, plus pengunduh YouTube, TikTok, X, dan Instagram.',
      open: 'Buka alat',
      synthidGuides: 'Panduan SynthID',
      privacyGuides: 'Panduan privasi',
      downloadGuides: 'Panduan unduhan',
      allGuides: 'Semua panduan',
      privacyPolicy: 'Kebijakan Privasi (Inggris)',
      terms: 'Ketentuan Layanan (Inggris)',
      disclaimer:
        'Proses dan unduh hanya konten milikmu atau yang kamu punya izin untuk memakainya, dan beri label pada konten buatan AI jika aturan mewajibkannya. {site} tidak berafiliasi dengan Google, YouTube, TikTok, X, Instagram, atau Meta.',
    },
    index: {
      metaTitle: 'Panduan: SynthID, metadata, dan unduh video',
      description:
        'Panduan tentang SynthID dan watermark AI, cara menghapus data GPS, EXIF, dan C2PA dari foto dan video, serta cara mengunduh video YouTube, TikTok, X, dan Instagram.',
      title: ['Panduan', '{site}.'],
      lede: 'Panduan langkah demi langkah untuk membersihkan metadata dari file dan mengunduh video, dengan fitur bawaan ponsel atau komputermu dan alat {site}.',
      groups: {
        synthid: {
          title: 'SynthID dan watermark AI',
          text: 'Apa itu watermark tak terlihat SynthID dari Google, dan cara melemahkannya serta menghapus metadata pada gambar dan video dari Veo, Gemini, dan Imagen agar platform berhenti menandainya sebagai AI.',
        },
        privacy: {
          title: 'Privasi dan metadata',
          text: 'Hapus data tersembunyi di foto dan video: lokasi, detail perangkat, tanggal, riwayat edit, dan C2PA Content Credentials.',
        },
        download: {
          title: 'Unduh video',
          text: 'Simpan video publik dari YouTube, TikTok, X, dan Instagram sebagai MP4, atau ambil suaranya saja sebagai M4A.',
        },
      },
    },
    promo: {
      eyebrow: 'Paket',
      title: ['Bersihkan setiap file.', 'Mulai dari $2.'],
      text: 'Pembersihan dan unduhan pertamamu gratis. Setelah itu, coba 10 pembersihan SynthID seharga $2, atau pakai tanpa batas dengan Basic atau Pro.',
      orYearly: 'atau {price} / tahun',
      seePlans: 'Bandingkan semua paket',
    },
  },
  guides: {
    'what-is-synthid': {
      title: 'Apa itu SynthID? Penjelasan watermark AI tak terlihat dari Google',
      metaTitle: 'Apa itu SynthID? Watermark AI Google dijelaskan',
      description:
        'SynthID adalah watermark tak terlihat dari Google DeepMind untuk gambar, video, audio, dan teks AI. Cara kerjanya, cara mendeteksinya, bedanya dengan C2PA, dan apakah bisa dihapus.',
      short: 'Apa itu SynthID?',
      cta: 'Hapus SynthID dari file',
      stepsTitle: 'Cara menghapus SynthID dengan {site}',
      intro: [
        '**SynthID adalah watermark tak terlihat yang disematkan Google DeepMind ke konten buatan model AI Google.** Watermark ini dianyam ke dalam piksel gambar dan frame video, gelombang audio, dan pilihan kata dalam teks, sehingga tidak bisa dilihat atau didengar dan tetap ada di file meski metadatanya dihapus. Nanti, detektor bisa membacanya dan memberi tahu apakah file dibuat dengan AI Google.',
        'Gambar dari Gemini (termasuk model Nano Banana) dan Imagen, video dari Veo, musik dari Lyria, dan teks dari Gemini bisa membawa SynthID. Panduan ini menjelaskan cara kerja watermark, cara mengecek apakah file memilikinya, bedanya dengan C2PA Content Credentials, artinya bagi orang yang memposting konten AI, dan apa yang bisa dan tidak bisa kamu lakukan untuk [menghapus SynthID](/app/#strip).',
      ],
      steps: [
        { name: 'Buka penghapus SynthID', text: 'Buka [tab Strip](/app/#strip) di {site} dan masuk dengan Google.' },
        { name: 'Tambahkan gambar atau videomu', text: 'Letakkan file dari Gemini, Imagen, Veo, atau generator lain. Mendukung JPEG, PNG, WebP, HEIC, MP4, MOV, dan lainnya.' },
        { name: 'Pilih Server atau Perangkat ini', text: 'Server meng-encode ulang video besar sekitar 4 kali lebih cepat dan langsung menghapusnya. Perangkat ini tidak pernah mengunggah file.' },
        { name: 'Unduh salinan bersih', text: 'Metadata, termasuk C2PA, dihapus dan watermark SynthID dilemahkan. Setiap file menunjukkan apa saja yang dihapus.' },
      ],
      sections: [
        {
          h: 'SynthID secara singkat',
          blocks: [
            {
              ul: [
                '**Dibuat oleh:** Google DeepMind. Diluncurkan pada Agustus 2023 untuk gambar Imagen, lalu diperluas ke video, audio, dan teks.',
                '**Yang ditandai:** konten buatan model AI Google seperti Gemini, Nano Banana, Imagen, Veo, dan Lyria. Google menyebut sudah memberi watermark pada lebih dari 10 miliar konten.',
                '**Letaknya:** di dalam konten itu sendiri (piksel, frame, suara, atau pilihan kata), bukan di metadata.',
                '**Terlihat?** Tidak. Perubahannya terlalu kecil untuk dilihat atau didengar.',
                '**Siapa yang bisa membacanya:** SynthID Detector milik Google dan fitur pengecekan di produk Google seperti aplikasi Gemini.',
                '**Bisa dihapus?** Dibuat agar tahan terhadap edit umum, jadi tidak bisa dihapus seperti tag metadata. Encode ulang bisa melemahkannya, tanpa jaminan.',
              ],
            },
          ],
        },
        {
          h: 'Cara kerja SynthID',
          blocks: [
            {
              p: 'SynthID bukan stempel yang ditambahkan di atas file jadi. Watermark ini diterapkan saat konten dibuat, menggunakan dua jaringan saraf yang dilatih bersama: satu membuat perubahan sangat kecil yang menyandikan sebuah pola, dan yang lain belajar menemukan pola itu lagi, bahkan setelah file diubah.',
            },
            {
              ul: [
                '**Gambar:** nilai banyak piksel disesuaikan sedikit untuk membentuk pola yang tersebar di seluruh gambar. Tidak ada satu area pun yang memuat seluruh polanya, jadi memotong sebagian tidak menghapusnya.',
                '**Video:** setiap frame diberi watermark seperti gambar, sehingga watermark tetap ada saat klip dipotong atau frame rate-nya diubah. Video Veo membawa watermark di setiap frame.',
                '**Audio:** pola ditambahkan ke suara dengan cara yang tidak disadari telinga, dan dirancang agar tahan terhadap kompresi MP3, tambahan noise, dan perubahan kecepatan.',
                '**Teks:** saat Gemini menulis, SynthID sedikit menggeser peluang kata berikutnya. Dalam teks yang panjang, pilihan-pilihan itu membentuk sinyal statistik. Google merilis versi teksnya sebagai open source agar pengembang lain bisa memakainya.',
              ],
            },
            {
              p: 'Karena watermark adalah bagian dari konten, ia tidak bergantung pada format file. Menyimpan PNG sebagai JPEG, mengunggah video ke platform yang mengompresnya ulang, atau mengambil tangkapan layar biasanya tetap membuatnya bisa dibaca.',
            },
          ],
        },
        {
          h: 'SynthID vs C2PA Content Credentials vs metadata',
          blocks: [
            { p: 'File AI sering membawa beberapa label sekaligus, dan masing-masing dihapus dengan cara berbeda:' },
            {
              ul: [
                '**SynthID** adalah watermark tak terlihat di dalam piksel atau suara. Menghapus metadata tidak menyentuhnya. Ia hanya bisa dilemahkan dengan mengubah kontennya sendiri.',
                '**C2PA Content Credentials** adalah catatan bertanda tangan di metadata file yang menyebut alat apa yang membuatnya dan bagaimana file itu diedit. Platform seperti TikTok membacanya untuk memicu label “dibuat dengan AI” secara otomatis. Pembersihan metadata menghapusnya sepenuhnya. Lihat [apa itu C2PA dan cara menghapusnya](/guides/remove-c2pa-content-credentials/).',
                '**Tag IPTC dan XMP**, seperti kolom “Digital Source Type”, adalah metadata biasa yang ditambahkan beberapa generator untuk menyatakan bahwa gambar dibuat AI. Lihat [cara menghapus EXIF dan metadata](/guides/remove-exif-data-from-photos/).',
                '**Watermark yang terlihat**, seperti logo kilau di sudut, digambar di atas gambar dan merupakan hal yang berbeda.',
              ],
            },
            { p: 'Google memakai SynthID dan C2PA bersamaan di beberapa produk: metadata cepat dicek tetapi mudah hilang, sedangkan watermark lebih sulit dihapus tetapi butuh detektor untuk membacanya.' },
          ],
        },
        {
          h: 'Cara mengecek apakah gambar atau video punya SynthID',
          blocks: [
            {
              ul: [
                '**SynthID Detector:** portal verifikasi Google. Unggah gambar, video, atau audio dan ia akan memberi tahu apakah watermark SynthID ditemukan; untuk gambar, ia bisa menyorot area yang paling mungkin mengandung watermark.',
                '**Aplikasi Gemini:** unggah gambar atau video dan tanyakan apakah dibuat dengan AI Google. Gemini mengecek SynthID dan menjawab di chat.',
                '**Content Credentials Verify:** [contentcredentials.org/verify](https://contentcredentials.org/verify) menampilkan metadata C2PA, bukan SynthID. Sebuah file bisa lolos satu pengecekan dan gagal di pengecekan lain.',
              ],
            },
            {
              note: 'Hasil “tidak ditemukan” tidak membuktikan bahwa file dibuat manusia. SynthID hanya menandai konten dari model yang memakainya, dan file yang banyak diedit bisa kehilangan sinyal yang bisa dibaca. Begitu pula, detektor hanya bisa mengatakan bahwa watermark kemungkinan ada; ia tidak membuktikan siapa yang membuat file.',
            },
          ],
        },
        {
          h: 'Apa yang bisa ditahan SynthID, dan apa yang melemahkannya',
          blocks: [
            { p: 'Google merancang SynthID agar tahan terhadap edit biasa yang dialami file saat dibagikan: kompresi, perubahan ukuran, pemotongan ringan, perubahan warna dan kecerahan, filter, konversi format, dan untuk video, perubahan frame rate. Itulah bedanya dengan metadata, yang hilang begitu banyak aplikasi menyimpan ulang file.' },
            { p: 'Watermark ini tidak kebal. Google sendiri mengakui bahwa perubahan besar pada gambar, atau banyak edit pada teks, bisa melemahkan sinyal sampai detektor tidak lagi yakin. Para peneliti juga telah menerbitkan serangan terhadap sistem watermark serupa. Makin banyak piksel diubah, makin lemah watermark-nya, tetapi gambar juga makin mungkin rusak, jadi tujuan penghapus SynthID yang baik adalah mengubah setiap piksel tanpa membuat gambar terlihat berbeda.' },
          ],
        },
        {
          h: 'Mengapa SynthID penting bagi kreator',
          blocks: [
            { p: 'Jika kamu memposting gambar atau video AI, SynthID dan C2PA adalah cara platform dan penonton mengetahuinya. TikTok, Instagram, YouTube, dan lainnya memindai setiap unggahan untuk mencari Content Credentials dan watermark, dan jika menemukannya, mereka bisa menambahkan label AI yang tidak bisa kamu matikan. Aturannya juga makin ketat: di UE, kewajiban transparansi dalam AI Act (Pasal 50), yang berlaku sejak Agustus 2026, mewajibkan penyedia AI menandai konten buatan AI dalam format yang bisa dibaca mesin, dan SynthID adalah salah satu cara Google melakukannya.' },
            { p: 'Menghapus sinyal ini tidak menghapus kewajibanmu sendiri untuk mengungkapkan konten AI ketika platform atau hukum mewajibkannya. Yang kamu dapatkan kembali adalah pilihan kapan dan bagaimana memberi label pada karyamu, alih-alih label otomatis di setiap postingan.' },
          ],
        },
        {
          h: 'Bisakah SynthID dihapus?',
          blocks: [
            { p: 'SynthID tidak bisa dihapus seperti tag metadata, karena tidak ada blok terpisah untuk dipotong. Yang bisa dilakukan adalah mengubah setiap piksel atau sampel sedikit saja sampai polanya tidak lagi cocok, sambil menjaga gambar tetap terlihat sama. Itulah yang dilakukan [penghapus SynthID {site}](/app/#strip):' },
            {
              ul: [
                '**Gambar:** resampling hampir 1:1, noise yang sangat tipis, dan penajaman lembut menggeser setiap piksel, lalu gambar disimpan ulang dengan kualitas tinggi.',
                '**Video:** encode ulang berkualitas tinggi (CRF 18) dengan blur sangat halus, penajaman penyeimbang, dan sedikit noise yang berubah tiap frame; audionya juga di-resample ringan.',
                '**Metadata:** EXIF, GPS, XMP, IPTC, dan C2PA Content Credentials dihapus sepenuhnya dari setiap file.',
              ],
            },
            { note: 'SynthID dibuat agar tahan terhadap edit, jadi tidak ada alat yang bisa menjanjikan detektor tidak akan menemukannya. {site} melemahkan watermark sejauh mungkin tanpa mengubah tampilan file. Metadata, termasuk C2PA, selalu dihapus sepenuhnya.' },
            { p: 'Panduan langkah demi langkah untuk tiap generator: [video Google Veo](/guides/remove-synthid-from-google-veo/), [gambar Gemini dan Nano Banana](/guides/remove-synthid-from-gemini-images/), [gambar Imagen](/guides/remove-synthid-from-imagen-images/), dan [file Higgsfield](/guides/remove-synthid-from-higgsfield/).' },
          ],
        },
      ],
      faq: [
        { q: 'Apa itu SynthID dalam bahasa sederhana?', a: 'SynthID adalah watermark tersembunyi yang dimasukkan Google ke dalam gambar, video, audio, dan teks buatan AI-nya. Kamu tidak bisa melihatnya, tetapi detektor Google bisa membacanya untuk mengetahui bahwa konten berasal dari AI Google.' },
        { q: 'Apakah SynthID terlihat?', a: 'Tidak. Perubahan pada piksel atau suara terlalu kecil untuk dilihat atau didengar. Logo kilau pada beberapa gambar Gemini adalah watermark terpisah yang terlihat.' },
        { q: 'Alat AI apa saja yang memakai SynthID?', a: 'Model-model Google: Gemini dan model gambar Nano Banana, Imagen, Veo, Lyria, dan teks Gemini. Google juga menawarkan SynthID kepada mitra, jadi konten dari perusahaan lain bisa saja membawanya. Sebagian besar generator lain, seperti Midjourney atau Sora, memakai metadata C2PA atau watermark mereka sendiri.' },
        { q: 'Apakah menghapus metadata juga menghapus SynthID?', a: 'Tidak. SynthID ada di piksel, bukan di metadata, jadi menghapus EXIF atau C2PA membiarkannya utuh. Piksel harus diubah untuk melemahkannya, dan itulah yang dilakukan pembersihan SynthID di {site}.' },
        { q: 'Apakah tangkapan layar atau simpan ulang menghapus SynthID?', a: 'Biasanya tidak. Tangkapan layar, konversi format, dan kompresi hampir tidak mengubah pola pikselnya; SynthID dirancang untuk bertahan dari semua itu. Yang hilang adalah sebagian besar metadata.' },
        { q: 'Bagaimana cara tahu apakah gambar punya SynthID?', a: 'Unggah ke SynthID Detector milik Google atau tanyakan ke aplikasi Gemini apakah gambar itu dibuat dengan AI Google. Keduanya tidak bisa membuktikan bahwa file tidak dibuat dengan AI.' },
        { q: 'Apakah SynthID sama dengan C2PA?', a: 'Tidak. C2PA Content Credentials adalah metadata bertanda tangan yang bisa dihapus dari file. SynthID adalah watermark di dalam konten itu sendiri. Banyak file Google membawa keduanya. [{site}](/app/#strip) menghapus C2PA sepenuhnya dan melemahkan SynthID.' },
        { q: 'Bisakah SynthID dihapus sepenuhnya?', a: 'Tidak dengan pasti. Ia dibuat agar tahan terhadap edit, dan detektor terus berkembang. Encode ulang dengan perubahan piksel kecil, seperti yang dilakukan {site}, melemahkannya tanpa mengubah tampilan file, tetapi tidak ada alat yang bisa menjamin detektor tidak akan menemukannya.' },
        { q: 'Apakah menghapus SynthID legal?', a: 'Tergantung di mana kamu tinggal dan bagaimana kamu memakai file itu. Proses hanya konten milikmu atau yang kamu punya izin untuk memakainya, dan beri label pada konten buatan AI jika hukum atau platform mewajibkannya.' },
      ],
    },
    'remove-synthid-from-google-veo': {
      title: 'Cara menghapus SynthID dari video Google Veo',
      metaTitle: 'Hapus SynthID dari video Google Veo',
      description:
        'Setiap video Google Veo membawa watermark SynthID tak terlihat dan C2PA Content Credentials. Cara melemahkan SynthID dan menghapus metadata agar platform berhenti menandainya.',
      short: 'Hapus SynthID dari video Veo',
      cta: 'Bersihkan video Veo sekarang',
      intro: [
        'Google Veo menulis [watermark SynthID](/guides/what-is-synthid/) tak terlihat ke dalam piksel setiap video yang dibuatnya dan menambahkan C2PA Content Credentials ke metadata file. Content Credentials-lah yang dibaca platform seperti TikTok untuk memicu label “dibuat dengan AI” otomatis; watermark SynthID adalah yang dicari detektor Google.',
        '{site} menghapus metadata, termasuk manifest C2PA, dan meng-encode ulang video untuk mengacak watermark SynthID, sambil menjaga gambar dan suaranya tetap sama. Tidak ada alat yang bisa menjanjikan detektor tidak akan menemukan watermark yang dibuat tahan edit, jadi hasilnya tidak dijamin.',
      ],
      steps: [
        { name: 'Buka penghapus SynthID', text: 'Buka tab Strip di {site}.' },
        { name: 'Tambahkan video Veo-mu', text: 'Letakkan file MP4. Metadata dan SynthID selalu dihapus, jadi tidak ada yang perlu diaktifkan.' },
        { name: 'Pilih Server agar lebih cepat', text: 'Server meng-encode ulang video besar sekitar 4 kali lebih cepat dan langsung menghapusnya. Perangkat ini menyimpan file di browsermu, tetapi lebih lambat.' },
        { name: 'Unduh salinan bersih', text: 'Setiap file menunjukkan apa saja yang dihapus. Bagikan salinan bersihnya, bukan file asli.' },
      ],
      sections: [
        {
          h: 'Yang dimasukkan Veo ke dalam file',
          blocks: [
            {
              ul: [
                'SynthID: watermark tak terlihat di tingkat piksel di seluruh video, dirancang agar tahan terhadap perubahan ukuran, pemotongan, dan kompresi ulang.',
                'C2PA Content Credentials: manifest bertanda tangan di metadata yang mencatat bahwa file dibuat dengan AI Google.',
                'Tag container dan encoder, tanggal pembuatan, dan metadata standar lainnya.',
              ],
            },
            { p: 'Baca [apa itu C2PA Content Credentials](/guides/remove-c2pa-content-credentials/) untuk tahu lebih banyak tentang manifest, dan [cara menghapus metadata dari video](/guides/remove-metadata-from-videos/) untuk sisanya.' },
          ],
        },
        {
          h: 'Cara {site} melemahkan watermark',
          blocks: [
            { p: 'Video di-encode ulang dengan kualitas yang secara visual tidak berbeda (CRF 18), dengan blur sangat halus, penajaman penyeimbang, dan noise tipis yang berubah tiap frame. Ini me-resample setiap piksel dan menggeser grid watermark, sementara metadata, termasuk C2PA, dibuang sepenuhnya. Audio juga di-resample ringan untuk mengacak watermark audio.' },
          ],
        },
        {
          h: 'Apa yang bisa dan tidak bisa dilakukan',
          blocks: [
            { note: 'SynthID dibuat agar tahan terhadap edit. {site} melemahkannya, tetapi tidak bisa menjamin detektor Google atau pengklasifikasi platform tidak akan menemukannya. Sebaliknya, metadata C2PA dihapus sepenuhnya.' },
            { p: 'Menghapus sinyal ini tidak menghapus kewajiban hukum atau kewajiban platform untuk memberi label pada konten AI. Ikuti aturan pengungkapan setiap platform.' },
          ],
        },
      ],
      faq: [
        { q: 'Apakah Veo selalu menambahkan SynthID?', a: 'Ya. Google menerapkan SynthID pada gambar dan video yang dibuat modelnya, termasuk Veo. Watermark ini tidak terlihat dan tidak muncul di gambar.' },
        { q: 'Apakah kualitas video Veo turun?', a: 'Menghapus SynthID meng-encode ulang video, jadi tidak identik byte demi byte, tetapi disimpan dengan kualitas tinggi dan terlihat sama saat ditonton biasa.' },
        { q: 'Apakah TikTok tetap akan memberi label AI pada video Veo-ku?', a: 'Mungkin. {site} menghapus C2PA Content Credentials yang dibaca platform, tetapi platform juga memakai pengklasifikasi dan detektor watermark mereka sendiri. Kami tidak menjamin file akan bebas label.' },
      ],
    },
    'remove-synthid-from-gemini-images': {
      title: 'Cara menghapus SynthID dari gambar Gemini (Nano Banana)',
      metaTitle: 'Hapus SynthID dari gambar AI Gemini',
      description:
        'Gambar dari Gemini dan model Nano Banana membawa watermark SynthID tak terlihat dan metadata. Cara mengacak SynthID dan menghapus metadata dalam satu langkah.',
      short: 'Hapus SynthID dari gambar Gemini',
      cta: 'Bersihkan gambar Gemini sekarang',
      intro: [
        'Gambar yang dibuat dengan Gemini, termasuk model gambar Nano Banana, membawa [watermark SynthID](/guides/what-is-synthid/) tak terlihat dari Google di pikselnya, dan biasanya juga tag IPTC “Digital Source Type” serta metadata lain yang menandainya sebagai buatan AI.',
        '{site} me-resample dan meng-encode ulang gambar untuk mengacak watermark SynthID dan menghapus metadata yang menandainya. Gambar tetap terlihat sama. Karena SynthID untuk gambar dibuat agar tahan terhadap perubahan ukuran dan simpan ulang, detektor masih mungkin menemukannya, jadi hasilnya tidak dijamin.',
      ],
      steps: [
        { name: 'Buka penghapus SynthID', text: 'Buka tab Strip di {site}.' },
        { name: 'Tambahkan gambar Gemini-mu', text: 'Letakkan file JPEG, PNG, atau WebP. Metadata dan SynthID selalu dihapus.' },
        { name: 'Pilih Perangkat ini atau Server', text: 'Perangkat ini membersihkan gambar di browsermu tanpa mengunggahnya. Server lebih cepat untuk banyak file sekaligus.' },
        { name: 'Unduh salinan bersih', text: 'File kembali tanpa EXIF, XMP, IPTC, dan C2PA, dengan watermark yang sudah dilemahkan.' },
      ],
      sections: [
        {
          h: 'Isi sebuah gambar Gemini',
          blocks: [
            {
              ul: [
                'SynthID: watermark tak terlihat yang tersebar di seluruh piksel.',
                'Tag IPTC “Digital Source Type” dan XMP yang menandai gambar sebagai buatan AI.',
                'Terkadang C2PA Content Credentials, plus data EXIF dan ICC yang biasa.',
              ],
            },
          ],
        },
        {
          h: 'Cara {site} mengacaknya',
          blocks: [
            { p: 'Gambar di-resample dengan pengecilan dan pembesaran hampir 1:1, penajaman lembut, dan sedikit noise tambahan, lalu disimpan ulang dengan kualitas tinggi. Ini menggeser setiap piksel dan mengacak grid watermark, sementara setiap blok metadata (EXIF, XMP, IPTC, C2PA) dihapus.' },
          ],
        },
        {
          h: 'Mengapa masih bisa terdeteksi',
          blocks: [
            { note: 'SynthID untuk gambar dirancang agar tahan terhadap perubahan ukuran dan kompresi ulang, jadi kasus yang sulit masih bisa memicu detektor Google setelah dibersihkan. {site} melemahkan watermark sejauh mungkin tanpa mengubah tampilan gambar; metadata tetap dihapus apa pun hasilnya.' },
          ],
        },
      ],
      faq: [
        { q: 'Apakah Nano Banana sama dengan Gemini untuk hal ini?', a: 'Ya. Nano Banana adalah model gambar Gemini, dan gambarnya membawa SynthID dengan cara yang sama. Langkahnya juga sama.' },
        { q: 'Apakah menghapus SynthID mengubah tampilan gambar?', a: 'Tidak secara kasat mata. Resampling, noise, dan encode ulang hampir tanpa kehilangan kualitas, dan gambar terlihat sama saat dilihat biasa.' },
        { q: 'Bagaimana jika gambar masih ditandai sebagai AI?', a: 'Itu berarti watermark di piksel masih bertahan, bukan metadatanya. Tag EXIF, XMP, IPTC, dan C2PA dihapus sepenuhnya; watermark hanya dilemahkan, tanpa jaminan.' },
      ],
    },
    'remove-synthid-from-imagen-images': {
      title: 'Cara menghapus SynthID dari gambar Google Imagen',
      metaTitle: 'Hapus SynthID dari gambar Google Imagen',
      description:
        'Google Imagen menandai setiap gambar dengan watermark SynthID tak terlihat dan metadata AI. Cara melemahkan watermark dan menghapus metadata agar gambarmu tidak ditandai.',
      short: 'Hapus SynthID dari gambar Imagen',
      cta: 'Bersihkan gambar Imagen sekarang',
      intro: [
        'Imagen adalah model teks-ke-gambar Google yang dipakai di Gemini, ImageFX, dan aplikasi Google lainnya. Setiap gambar yang dibuatnya membawa [watermark SynthID](/guides/what-is-synthid/) tak terlihat di pikselnya, bersama metadata (sering kali tag IPTC “Digital Source Type” dan C2PA Content Credentials) yang menandainya sebagai buatan AI.',
        '{site} me-resample dan meng-encode ulang gambar untuk mengacak SynthID dan menghapus semua metadata. Hasilnya terlihat sama. SynthID dibuat agar tahan terhadap edit, jadi detektor masih mungkin menemukannya; metadata dihapus dengan pasti.',
      ],
      steps: [
        { name: 'Buka penghapus SynthID', text: 'Buka tab Strip di {site}.' },
        { name: 'Tambahkan gambar Imagen-mu', text: 'Letakkan file-nya. Metadata dan SynthID selalu dihapus.' },
        { name: 'Pilih Perangkat ini atau Server', text: 'Perangkat ini tidak pernah mengunggah file; Server lebih cepat untuk banyak file dan langsung menghapusnya.' },
        { name: 'Unduh salinan bersih', text: 'Bagikan salinan bersih, yang menunjukkan apa saja yang dihapus, alih-alih file asli.' },
      ],
      sections: [
        {
          h: 'Yang disematkan Imagen',
          blocks: [
            {
              ul: [
                'SynthID: watermark tak terlihat di tingkat piksel pada setiap gambar yang dibuat.',
                'Tag IPTC / XMP, termasuk kolom “Digital Source Type” yang mengidentifikasinya sebagai buatan AI.',
                'C2PA Content Credentials di beberapa layanan, plus data EXIF dan ICC standar.',
              ],
            },
            { p: 'Untuk semua hal yang bisa diungkap metadata foto, baca [cara menghapus EXIF dan metadata](/guides/remove-exif-data-from-photos/).' },
          ],
        },
        {
          h: 'Cara kerja pembersihan',
          blocks: [
            { p: 'Resampling hampir 1:1 menggeser setiap piksel, penajaman lembut mengembalikan ketajaman, dan noise tipis mengacak grid watermark. Gambar lalu di-encode ulang dengan kualitas tinggi tanpa metadata apa pun, sehingga EXIF, XMP, IPTC, dan C2PA hilang.' },
          ],
        },
        {
          h: 'Batasan',
          blocks: [
            { note: 'Tidak ada alat yang bisa menjamin detektor SynthID tidak akan menemukan watermark yang dirancang tahan edit. {site} melemahkannya; metadata dihapus dengan pasti. Aturan pengungkapan konten AI tetap berlaku.' },
          ],
        },
      ],
      faq: [
        { q: 'Di mana Imagen dipakai?', a: 'Imagen membuat gambar di Gemini, ImageFX, dan alat Google lainnya. Gambar dari mana pun di antaranya membawa SynthID dan dibersihkan dengan cara yang sama.' },
        { q: 'Apakah ini menghapus watermark yang terlihat?', a: 'Tidak. {site} mengacak watermark SynthID yang tak terlihat dan menghapus metadata. Ia tidak menghapus logo atau tanda terlihat yang digambar di atas gambar.' },
        { q: 'Apakah warnanya akan berubah?', a: 'Tidak. Imagen menghasilkan gambar dalam sRGB, jadi menghapus profil warna tidak mengubah warnanya.' },
      ],
    },
    'remove-synthid-from-higgsfield': {
      title: 'Cara menghapus SynthID dan C2PA dari video dan gambar Higgsfield',
      metaTitle: 'Hapus SynthID dan C2PA dari file Higgsfield',
      description:
        'Higgsfield memakai beberapa model AI, jadi file-nya bisa membawa watermark SynthID, C2PA Content Credentials, atau keduanya. Cara membersihkannya agar platform berhenti menandainya.',
      short: 'Hapus SynthID dari Higgsfield',
      cta: 'Bersihkan file Higgsfield sekarang',
      intro: [
        'Higgsfield adalah platform yang menggabungkan beberapa model AI, termasuk Google Veo. Apa yang ada di file-mu tergantung model yang membuatnya: video yang dibuat dengan Veo membawa [watermark SynthID](/guides/what-is-synthid/) tak terlihat dari Google, dan sebagian besar generator juga menambahkan C2PA Content Credentials ke metadata yang menandai file sebagai buatan AI.',
        '{site} menghapus metadata, termasuk C2PA, dan meng-encode ulang file untuk mengacak watermark SynthID jika ada, sambil menjaga gambar dan suaranya tetap sama. SynthID dibuat agar tahan terhadap edit, jadi tidak ada alat yang bisa menjanjikan detektor tidak akan menemukannya; hasilnya tidak dijamin.',
      ],
      steps: [
        { name: 'Buka penghapus SynthID', text: 'Buka tab Strip di {site}.' },
        { name: 'Tambahkan file Higgsfield-mu', text: 'Letakkan video atau gambarnya. Biarkan pembersihan SynthID tetap aktif (aktif secara default) agar file buatan Veo juga di-encode ulang.' },
        { name: 'Pilih Server agar lebih cepat', text: 'Server meng-encode ulang video besar sekitar 4 kali lebih cepat dan langsung menghapusnya. Perangkat ini menyimpan file di browsermu, tetapi lebih lambat.' },
        { name: 'Unduh salinan bersih', text: 'Setiap file menunjukkan apa saja yang dihapus. Bagikan salinan bersihnya, bukan file asli.' },
      ],
      sections: [
        {
          h: 'Yang bisa dibawa file Higgsfield',
          blocks: [
            {
              ul: [
                'SynthID: ada jika file dibuat dengan model Google seperti Veo. Ini watermark tak terlihat di tingkat piksel.',
                'C2PA Content Credentials: manifest bertanda tangan di metadata yang mencatat bahwa file dibuat dengan AI. Lihat [cara menghapus C2PA](/guides/remove-c2pa-content-credentials/).',
                'Metadata container, encoder, EXIF, dan waktu yang biasa.',
              ],
            },
            { p: 'Karena Higgsfield mencampur model, kamu mungkin tidak tahu tanda mana yang dibawa sebuah file. Membiarkan pembersihan SynthID aktif menangani kedua kasus: metadata selalu dihapus, dan encode ulang diterapkan untuk berjaga-jaga jika ada SynthID.' },
          ],
        },
        {
          h: 'Cara {site} membersihkannya',
          blocks: [
            { p: 'Video di-encode ulang dengan kualitas yang secara visual tidak berbeda (CRF 18), dengan blur sangat halus, penajaman penyeimbang, dan noise tipis antar-frame; gambar di-resample, diberi noise, dipertajam, dan disimpan ulang dengan kualitas tinggi. Dalam kedua kasus, setiap blok metadata, termasuk C2PA, dibuang. Hasilnya terlihat dan diputar sama.' },
          ],
        },
        {
          h: 'Apa yang bisa dan tidak bisa dilakukan',
          blocks: [
            { note: 'SynthID dibuat agar tahan terhadap edit. {site} melemahkannya, tetapi tidak bisa menjamin detektor atau pengklasifikasi platform tidak akan menemukannya. Sebaliknya, metadata C2PA dihapus sepenuhnya.' },
            { p: 'Menghapus sinyal ini tidak menghapus kewajiban hukum atau kewajiban platform untuk memberi label pada konten AI. Ikuti aturan pengungkapan setiap platform.' },
          ],
        },
      ],
      faq: [
        { q: 'Apakah setiap file Higgsfield punya SynthID?', a: 'Tidak. Hanya file yang dibuat dengan model Google seperti Veo yang membawa SynthID. File dari model Higgsfield lainnya biasanya membawa C2PA Content Credentials. {site} menangani keduanya: metadata selalu dihapus, dan encode ulang diterapkan saat pembersihan SynthID aktif.' },
        { q: 'Apakah kualitas video Higgsfield-ku turun?', a: 'Menghapus SynthID meng-encode ulang video, jadi tidak identik byte demi byte, tetapi disimpan dengan kualitas tinggi dan terlihat sama saat ditonton biasa.' },
        { q: 'Apakah TikTok tetap akan memberi label AI pada video Higgsfield-ku?', a: 'Mungkin. {site} menghapus C2PA Content Credentials yang dibaca platform, tetapi platform juga memakai pengklasifikasi dan detektor watermark mereka sendiri. Kami tidak menjamin file akan bebas label.' },
      ],
    },
    'download-youtube-videos': {
      title: 'Cara mengunduh video dan Shorts YouTube sebagai MP4',
      metaTitle: 'Unduh video dan Shorts YouTube (MP4, 1080p)',
      description:
        'Simpan video atau Short YouTube sebagai MP4 hingga 1080p, atau audionya sebagai M4A, dengan menempelkan tautannya. Bisa untuk tautan youtube.com, youtu.be, dan Shorts. Tanpa instalasi.',
      short: 'Unduh video dan Shorts YouTube',
      cta: 'Buka pengunduh YouTube',
      intro: [
        'Cara tercepat menyimpan video YouTube adalah menyalin tautannya dan menempelkannya ke pengunduh yang bekerja di server. {site} mengambil versi terbaik hingga 1080p, menggabungkan gambar dan suara ke dalam satu MP4 yang bisa diputar di ponsel atau komputer mana pun, lalu mengirimkannya kepadamu. Kamu juga bisa mengambil audionya saja sebagai file M4A.',
      ],
      steps: [
        { name: 'Salin tautannya', text: 'Di komputer, salin alamat dari bilah alamat browser. Di aplikasi YouTube, ketuk Bagikan di bawah video (atau di Short) dan pilih Salin link.' },
        { name: 'Buka pengunduh YouTube', text: 'Buka tab YouTube di {site} dan masuk dengan Google.' },
        { name: 'Tempel dan pilih format', text: 'Tempel satu atau beberapa tautan, satu per baris. Biarkan sakelar di Video untuk MP4, atau pilih Hanya audio untuk M4A.' },
        { name: 'Unduh', text: 'Tekan Unduh. Setiap tautan menampilkan judul dan progresnya, lalu tombol Simpan saat file siap.' },
      ],
      sections: [
        {
          h: 'Tautan yang didukung',
          blocks: [
            {
              ul: [
                'Video biasa: `youtube.com/watch?v=…`',
                'Tautan pendek: `youtu.be/…`',
                'Shorts: `youtube.com/shorts/…`',
                'Pemutar sematan: `youtube-nocookie.com/embed/…`',
                'Tautan seluler: `m.youtube.com/…`',
              ],
            },
            { p: 'Tautan dengan parameter tambahan, seperti stempel waktu (`&t=42`) atau playlist (`&list=…`), tetap bisa dipakai; kamu mendapatkan video dari tautan itu. Playlist utuh tidak diunduh sekaligus; tempel tautan tiap video.' },
          ],
        },
        {
          h: 'Kualitas dan format',
          blocks: [
            { p: 'YouTube menyimpan gambar dan suara secara terpisah untuk sebagian besar video di atas 360p. Pengunduh memilih gambar H.264 terbaik hingga 1080p dan suara AAC, lalu menggabungkannya menjadi satu MP4. H.264 dan AAC bisa diputar di mana saja: iPhone, Android, Windows, Mac, aplikasi edit, dan media sosial.' },
            { p: 'Jika sebuah video tidak punya versi H.264 1080p, kamu mendapatkan versi terbaik yang ditawarkan YouTube hingga 1080p. Video yang diunggah dengan resolusi lebih rendah akan diunduh dengan resolusi itu; pengunduh tidak bisa menambahkan detail yang tidak pernah diunggah.' },
          ],
        },
        {
          h: 'Saat unduhan gagal',
          blocks: [
            {
              ul: [
                'Video pribadi dan khusus anggota tidak bisa diunduh.',
                'Video dengan batasan usia dan beberapa video yang diblokir di wilayah tertentu butuh akun YouTube yang sudah masuk, jadi bisa gagal.',
                'Siaran langsung hanya bisa disimpan setelah selesai dan diproses YouTube.',
                'Premiere yang belum dimulai belum punya apa pun untuk diunduh.',
              ],
            },
          ],
        },
        LEGAL_DL,
      ],
      faq: [
        { q: 'Bisakah aku mengunduh YouTube Shorts?', a: 'Bisa. Tempel tautan youtube.com/shorts/ seperti video biasa dan kamu mendapatkan MP4 vertikal.' },
        { q: 'Bisakah aku mengunduh audionya saja?', a: 'Bisa. Ubah sakelar ke Hanya audio dan kamu mendapatkan suaranya sebagai file M4A. Jika platform menyimpan audio AAC, audionya disalin tanpa di-encode ulang.' },
        { q: 'Kenapa videonya 1080p, bukan 4K?', a: 'Pengunduh membatasi video di 1080p agar file tetap kecil dan bisa diputar di mana saja. Sebagian besar ponsel dan media sosial menampilkan video di 1080p atau lebih rendah.' },
        { q: 'Apakah aku perlu menginstal sesuatu?', a: 'Tidak. Semuanya berjalan di browser dan di server {site}, di ponsel atau komputer mana pun.' },
      ],
    },
    'download-tiktok-videos': {
      title: 'Cara mengunduh video TikTok sebagai MP4',
      metaTitle: 'Unduh video TikTok (MP4 atau suara M4A)',
      description:
        'Simpan video TikTok publik sebagai MP4, atau suaranya sebagai M4A, dari tautan tiktok.com, vm.tiktok.com, atau vt.tiktok.com. Langkah demi langkah di ponsel atau komputer.',
      short: 'Unduh video TikTok',
      cta: 'Buka pengunduh TikTok',
      intro: [
        'TikTok hanya menampilkan tombol Simpan video jika kreatornya mengizinkan, dan salinan yang tersimpan membawa watermark yang bergerak. Menempelkan tautan ke {site} memberimu video sebagai file MP4, atau suaranya saja sebagai M4A, dari video publik mana pun.',
      ],
      steps: [
        { name: 'Salin tautannya', text: 'Di aplikasi TikTok, ketuk Bagikan (panah di sebelah kanan) dan pilih Salin tautan. Di komputer, salin alamat halaman video.' },
        { name: 'Buka pengunduh TikTok', text: 'Buka tab TikTok di {site} dan masuk dengan Google.' },
        { name: 'Tempel tautannya', text: 'Tempel satu tautan, atau beberapa di baris terpisah. Pilih Video untuk MP4 atau Hanya audio untuk suara M4A.' },
        { name: 'Simpan file-nya', text: 'Tekan Unduh dan simpan setiap file saat siap. Di iPhone, buka file lalu pakai Bagikan, Simpan Video untuk memasukkannya ke Foto.' },
      ],
      sections: [
        {
          h: 'Tautan yang didukung',
          blocks: [
            {
              ul: [
                'Tautan lengkap: `tiktok.com/@akun/video/…`',
                'Tautan berbagi dari aplikasi: `vm.tiktok.com/…` dan `vt.tiktok.com/…`',
                'Tautan web seluler: `m.tiktok.com/…`',
              ],
            },
            { p: 'Tautan pendek diikuti sampai ke video yang dituju, jadi kamu bisa menempelkan persis apa yang disalin aplikasi.' },
          ],
        },
        {
          h: 'Yang kamu dapatkan',
          blocks: [
            { p: 'Video datang sebagai MP4 dengan kualitas yang disajikan TikTok, dengan prioritas H.264 agar bisa diputar di mana saja.' },
            { p: 'Hanya audio menyimpan soundtrack video sebagai file M4A. Untuk suara yang sedang tren dan dipakai di banyak video, video mana pun yang memakainya bisa dipakai.' },
          ],
        },
        {
          h: 'Yang tidak bisa',
          blocks: [
            {
              ul: [
                'Video dari akun pribadi dan video yang hanya dibagikan ke teman.',
                'Video yang dihapus atau tidak tersedia di wilayah server.',
                'Siaran LIVE dan slideshow foto (carousel gambar diam).',
              ],
            },
          ],
        },
        LEGAL_DL,
      ],
      faq: [
        { q: 'Apakah tautan pendek vm.tiktok.com bisa dipakai?', a: 'Bisa. Tempel tautan vm.tiktok.com atau vt.tiktok.com persis seperti yang keluar dari tombol Salin tautan di aplikasi.' },
        { q: 'Bisakah aku mengunduh suaranya saja?', a: 'Bisa. Ubah sakelar ke Hanya audio untuk mendapatkan soundtrack sebagai M4A.' },
        { q: 'Bisakah aku mengunduh video TikTok pribadi?', a: 'Tidak. Hanya video publik yang didukung.' },
        { q: 'Apakah kreator mendapat notifikasi?', a: 'Tidak. {site} membaca halaman video publik seperti browser; tidak ada yang diposting ke TikTok.' },
      ],
    },
    'download-twitter-x-videos': {
      title: 'Cara mengunduh video X (Twitter)',
      metaTitle: 'Unduh video X (Twitter) sebagai MP4',
      description:
        'Simpan video dari postingan X (Twitter) sebagai MP4 dengan menempelkan tautan postingannya. Bisa untuk tautan x.com dan twitter.com, di ponsel atau komputer.',
      short: 'Unduh video X (Twitter)',
      cta: 'Buka pengunduh X',
      intro: [
        'X tidak punya tombol unduh untuk video. Untuk menyimpannya, salin tautan postingan dan tempelkan ke {site}: kamu mendapatkan video dari postingan itu sebagai MP4, dengan kualitas terbaik yang ditawarkan X.',
      ],
      steps: [
        { name: 'Salin tautan postingan', text: 'Ketuk ikon bagikan di bawah postingan dan pilih Salin tautan. Di komputer, kamu juga bisa menyalin alamat halaman.' },
        { name: 'Buka pengunduh X', text: 'Buka tab X di {site} dan masuk dengan Google.' },
        { name: 'Tempel tautannya', text: 'Tempel satu atau beberapa tautan. Pilih Video untuk MP4 atau Hanya audio untuk M4A.' },
        { name: 'Simpan file-nya', text: 'Tekan Unduh dan simpan file saat sudah siap.' },
      ],
      sections: [
        {
          h: 'Tautan yang didukung',
          blocks: [
            {
              ul: [
                'Tautan postingan di kedua domain: `x.com/akun/status/…` atau `twitter.com/akun/status/…`',
                'Tautan dari layanan perbaikan sematan: `fxtwitter.com`, `vxtwitter.com`, `fixupx.com`',
              ],
            },
            { p: 'Tempel tautan postingan yang berisi video. Jika kamu sedang melihat balasan atau kutipan, buka dulu postingan aslinya dan salin tautannya. GIF animasi di X disimpan sebagai video pendek, jadi juga diunduh sebagai MP4.' },
          ],
        },
        {
          h: 'Saat unduhan gagal',
          blocks: [
            {
              ul: [
                'Postingan dari akun yang dilindungi (pribadi) tidak bisa diunduh.',
                'Postingan yang ditandai sensitif, dibatasi usia, atau hanya ditampilkan X kepada pengguna yang masuk bisa gagal.',
                'Postingan yang dihapus dan akun yang ditangguhkan tidak punya apa pun untuk diunduh.',
                'Postingan yang hanya menautkan ke video YouTube tidak punya video X; pakai [pengunduh YouTube](/guides/download-youtube-videos/).',
              ],
            },
          ],
        },
        LEGAL_DL,
      ],
      faq: [
        { q: 'Apakah tautan twitter.com masih bisa dipakai?', a: 'Bisa. Tautan x.com maupun twitter.com sama-sama bisa dipakai.' },
        { q: 'Kualitas apa yang aku dapatkan?', a: 'Kualitas tertinggi yang ditawarkan X untuk video itu, sebagai MP4 dengan gambar H.264 jika memungkinkan.' },
        { q: 'Bisakah aku mengunduh video dari akun pribadi?', a: 'Tidak. Hanya postingan publik yang didukung.' },
      ],
    },
    'download-instagram-reels': {
      title: 'Cara mengunduh Reels dan video Instagram',
      metaTitle: 'Unduh Reels dan video Instagram (MP4)',
      description:
        'Simpan Reel atau postingan video Instagram publik sebagai MP4 dengan menempelkan tautannya. Langkah demi langkah untuk iPhone, Android, dan komputer. Akun pribadi tidak didukung.',
      short: 'Unduh Reels Instagram',
      cta: 'Buka pengunduh Instagram',
      intro: [
        'Instagram membiarkanmu menyimpan postingan di dalam aplikasi, tetapi bukan sebagai file yang bisa kamu simpan atau edit. Untuk mendapatkan Reel atau postingan video sebagai MP4, salin tautannya dan tempelkan ke {site}. Ini hanya berfungsi untuk postingan publik.',
      ],
      steps: [
        { name: 'Salin tautannya', text: 'Di aplikasi Instagram, ketuk ikon pesawat kertas pada Reel atau postingan, lalu Salin tautan. Di komputer, salin alamat halaman.' },
        { name: 'Buka pengunduh Instagram', text: 'Buka tab Instagram di {site} dan masuk dengan Google.' },
        { name: 'Tempel tautannya', text: 'Tempel satu atau beberapa tautan. Pilih Video untuk MP4 atau Hanya audio untuk M4A.' },
        { name: 'Simpan file-nya', text: 'Tekan Unduh dan simpan file. Di iPhone, buka file lalu pakai Bagikan, Simpan Video untuk menambahkannya ke Foto.' },
      ],
      sections: [
        {
          h: 'Tautan yang didukung',
          blocks: [
            {
              ul: [
                'Reels: `instagram.com/reel/…`',
                'Postingan video: `instagram.com/p/…`',
                'Tautan pendek: `instagr.am/…`',
              ],
            },
          ],
        },
        {
          h: 'Video pribadi tidak tersedia',
          blocks: [
            { p: 'Pengunduh hanya membaca apa yang ditampilkan Instagram kepada orang yang belum masuk. Itu tidak mencakup:' },
            {
              ul: [
                'Postingan dan Reels dari akun pribadi.',
                'Stories, Sorotan, dan konten Teman Dekat.',
                'Beberapa postingan publik yang hanya ditampilkan Instagram setelah masuk, seperti yang dibatasi usia.',
              ],
            },
            { p: 'Jika tautan gagal dengan pesan tentang postingan pribadi atau login, video itu tidak tersedia untuk pengunduh.' },
          ],
        },
        {
          h: 'Carousel dengan beberapa video',
          blocks: [{ p: 'Untuk postingan dengan beberapa slide, pengunduh menyimpan video yang ditemukannya di postingan itu. Postingan yang hanya berisi foto tidak punya video untuk diunduh.' }],
        },
        LEGAL_DL,
      ],
      faq: [
        { q: 'Bisakah aku mengunduh Instagram Stories?', a: 'Tidak. Stories butuh login Instagram, dan pengunduh tidak memakai login apa pun.' },
        { q: 'Bisakah aku mengunduh dari akun pribadi?', a: 'Tidak. Hanya Reels dan postingan video publik yang didukung.' },
        { q: 'Bisakah aku mengambil musik dari Reel saja?', a: 'Bisa. Ubah sakelar ke Hanya audio untuk mendapatkan soundtrack sebagai M4A.' },
      ],
    },
    'download-audio-from-videos': {
      title: 'Cara mengunduh audio dari YouTube, TikTok, X, dan Instagram',
      metaTitle: 'Unduh audio dari YouTube, TikTok, dan Instagram (M4A)',
      description:
        'Ambil suara saja dari video YouTube, TikTok, X, atau Instagram sebagai file M4A. Tempel tautannya, ubah ke Hanya audio, dan unduh. Tanpa aplikasi.',
      short: 'Unduh audionya saja (M4A)',
      cta: 'Buka pengunduh',
      intro: [
        'Setiap pengunduh di {site} punya sakelar Video / Hanya audio. Hanya audio memberimu soundtrack asli video sebagai file M4A: biasanya audio AAC yang sudah disimpan platform, disalin tanpa di-encode ulang, jadi tidak ada kualitas yang hilang. Jika platform menyajikan codec lain, audio dikonversi ke AAC berkualitas tinggi.',
      ],
      steps: [
        { name: 'Salin tautan video', text: 'Pakai Bagikan lalu Salin tautan di aplikasi YouTube, TikTok, X, atau Instagram, atau salin alamat halaman di komputer.' },
        { name: 'Buka pengunduh yang sesuai', text: 'Pilih tab platform tersebut di {site}.' },
        { name: 'Ubah ke Hanya audio', text: 'Ubah sakelar di atas kotak tautan ke Hanya audio dan tempel tautannya.' },
        { name: 'Unduh M4A-nya', text: 'Tekan Unduh dan simpan file. M4A bisa diputar di Apple Music, VLC, Windows Media Player, dan sebagian besar aplikasi edit.' },
      ],
      sections: [
        {
          h: 'Kenapa M4A, bukan MP3',
          blocks: [
            { p: 'Platform-platform ini hampir selalu menyimpan suara sebagai AAC. M4A hanyalah AAC di dalam file bergaya MP4, jadi bisa disimpan apa adanya. Mengubahnya ke MP3 berarti mendekode dan mengompresnya lagi, yang menurunkan sedikit kualitas tanpa keuntungan apa pun: semua ponsel, komputer, dan aplikasi edit masa kini memutar M4A.' },
            { p: 'Jika kamu butuh MP3 untuk perangkat lama, konversi M4A dengan alat gratis seperti VLC (Media → Konversi / Simpan) atau ffmpeg:' },
            { code: 'ffmpeg -i sound.m4a -c:a libmp3lame -q:a 2 sound.mp3' },
          ],
        },
        {
          h: 'Sudah punya videonya?',
          blocks: [
            { p: 'Setiap unduhan video yang selesai di {site} juga punya tombol Ambil audio, yang mengekstrak soundtrack dari MP4 yang baru saja kamu unduh.' },
          ],
        },
        LEGAL_DL,
      ],
      faq: [
        { q: 'Apakah audionya di-encode ulang?', a: 'Tidak jika platform menyajikan AAC, yang biasanya terjadi: trek disalin apa adanya ke file M4A. Codec lain dikonversi ke AAC.' },
        { q: 'Bisakah aku mengunduh satu playlist penuh sebagai audio?', a: 'Tidak sekaligus. Tempel tautan tiap video, satu per baris.' },
      ],
    },
    'remove-gps-location-from-photos': {
      title: 'Cara menghapus lokasi GPS dari foto',
      metaTitle: 'Hapus lokasi GPS dari foto (iPhone, Android, PC)',
      description:
        'Foto bisa menyimpan tempat persis di mana foto itu diambil. Pelajari cara mengecek apakah foto punya data GPS dan cara menghapusnya di iPhone, Android, Windows, dan Mac, atau dalam satu langkah untuk foto apa pun.',
      short: 'Hapus lokasi GPS dari foto',
      cta: 'Hapus data lokasi sekarang',
      intro: [
        'Sebagian besar ponsel menyimpan garis lintang dan bujur yang tepat di setiap foto, sering kali dengan akurasi beberapa meter. Siapa pun yang menerima file aslinya bisa membacanya dan menaruh pin di peta: rumahmu, sekolahmu, kantormu. Beberapa aplikasi menghapusnya saat kamu memposting, tetapi email, aplikasi pesan yang mengirim dalam “kualitas asli”, tautan berbagi cloud, dan situs jual beli sering kali menyimpannya.',
        'Panduan ini menjelaskan cara mengecek apakah foto punya data lokasi dan cara menghapusnya, dengan pengaturan bawaan ponsel atau komputermu atau dalam satu langkah dengan penghapus metadata {site}.',
      ],
      steps: [
        { name: 'Buka penghapus metadata', text: 'Buka tab Strip di {site}.' },
        { name: 'Tambahkan fotomu', text: 'Letakkan satu atau banyak foto: JPEG, PNG, WebP, HEIC, AVIF, TIFF, atau GIF.' },
        { name: 'Pilih tempat pemrosesan', text: 'Pilih Perangkat ini untuk membersihkan file di browsermu tanpa mengunggahnya, atau Server untuk memprosesnya di {site} lalu langsung dihapus.' },
        { name: 'Unduh salinan bersih', text: 'Semua metadata, termasuk blok GPS, dihapus dari setiap file. Unduh dan bagikan salinan bersihnya, bukan file asli.' },
      ],
      sections: [
        {
          h: 'Di mana lokasi disimpan',
          blocks: [
            { p: 'Pada foto JPEG, HEIC, dan TIFF, lokasi ada di blok GPS EXIF: lintang, bujur, ketinggian, arah kamera menghadap, dan stempel waktu GPS. Aplikasi edit juga bisa menyalinnya ke metadata XMP, dan beberapa ponsel menuliskannya di metadata thumbnail yang tersemat. Menghapus hanya salah satunya bisa menyisakan yang lain, jadi pembersihan penuh lebih aman daripada menghapus satu kolom.' },
          ],
        },
        {
          h: 'Cara mengecek apakah foto punya lokasi',
          blocks: [
            {
              ul: [
                'iPhone: buka foto di Foto dan geser ke atas. Jika muncul peta, foto itu punya lokasi.',
                'Android (Google Foto): buka foto, geser ke atas, dan cari peta atau nama tempat.',
                'Windows: klik kanan file, Properties, tab Details, dan lihat di bagian GPS.',
                'Mac: buka di Preview, pilih Tools lalu Show Inspector, dan cari tab GPS.',
              ],
            },
          ],
        },
        {
          h: 'Hapus dengan pengaturan ponsel atau komputer',
          blocks: [
            {
              ul: [
                'iPhone, saat berbagi: pilih foto, ketuk Bagikan, ketuk Pilihan di bagian atas, dan matikan Lokasi. Ini hanya berlaku untuk pengiriman itu.',
                'iPhone, untuk foto berikutnya: Pengaturan, Privasi & Keamanan, Layanan Lokasi, Kamera, lalu pilih Tidak Pernah.',
                'Android: buka pengaturan aplikasi Kamera dan matikan opsi lokasi atau geotag (namanya berbeda di tiap ponsel). Di Google Foto, Setelan lalu Berbagi punya opsi untuk menghapus lokasi dari yang kamu bagikan lewat tautan.',
                'Windows: klik kanan file, Properties, Details, lalu Remove Properties and Personal Information. Pilih untuk membuat salinan dengan semua properti yang mungkin dihapus.',
                'Mac: di Preview, Tools, Show Inspector, tab GPS, lalu Remove Location Info.',
              ],
            },
            { note: 'Opsi bawaan ini biasanya hanya menghapus kolom GPS. Model kamera, nomor seri, tanggal, dan riwayat edit biasanya tetap ada di file.' },
          ],
        },
        {
          h: 'Hapus dengan exiftool (baris perintah)',
          blocks: [
            { p: 'Jika kamu terbiasa dengan terminal, program gratis exiftool menghapus blok GPS, atau semuanya, langsung di file. Ia menyimpan cadangan berakhiran `_original`.' },
            { code: 'exiftool -gps:all= -xmp:geotag= photo.jpg   # lokasi saja\nexiftool -all= photo.jpg                     # semua metadata' },
          ],
        },
        {
          h: 'Hal lain yang bisa diungkap foto',
          blocks: [
            { p: 'Lokasi adalah data paling sensitif, tetapi file yang sama bisa membawa model ponsel atau kamera dan nomor serinya, tanggal dan waktu yang tepat, software yang dipakai untuk mengedit, nama atau baris hak ciptamu, area penandaan wajah dari aplikasi foto, dan pratinjau kecil dari foto asli sebelum dipotong. Lihat [cara menghapus data EXIF](/guides/remove-exif-data-from-photos/) untuk daftar lengkapnya.' },
          ],
        },
      ],
      faq: [
        { q: 'Apakah Instagram dan Facebook menghapus lokasi dari foto?', a: 'Media sosial besar biasanya menghapus data EXIF, termasuk GPS, dari salinan yang dilihat orang lain. File yang dikirim lewat email, tautan cloud, beberapa aplikasi chat dalam kualitas asli, dan banyak forum serta situs jual beli bisa menyimpannya, jadi lebih aman membersihkan file sebelum mengirimnya.' },
        { q: 'Apakah tangkapan layar punya data lokasi?', a: 'Biasanya tidak, karena tangkapan layar adalah gambar baru. Tetapi lokasi bisa saja terlihat di dalam gambarnya, seperti papan nama jalan atau peta.' },
        { q: 'Apakah foto akan terlihat berbeda setelahnya?', a: 'Tidak. Salinan bersih disimpan dengan kualitas tinggi dan terlihat sama saat dilihat biasa; hanya data tersembunyinya yang hilang.' },
      ],
    },
    'remove-exif-data-from-photos': {
      title: 'Cara menghapus data EXIF dan metadata lain dari foto',
      metaTitle: 'Hapus data EXIF dan metadata dari foto',
      description:
        'Apa yang diungkap metadata EXIF, XMP, IPTC, dan ICC tentang dirimu, cara melihatnya, dan cara menghapus semuanya dari foto JPEG, PNG, HEIC, WebP, dan lainnya.',
      short: 'Hapus data EXIF dari foto',
      cta: 'Hapus metadata foto sekarang',
      intro: [
        'EXIF adalah blok informasi yang ditulis kamera atau ponsel ke setiap foto: perangkat, pengaturan, tanggal, dan sering kali tempat. Aplikasi edit menambahkan lapisan sendiri (XMP dan IPTC), dan beberapa file membawa C2PA Content Credentials dengan riwayat edit. Semua itu tidak terlihat di gambar, tetapi siapa pun yang punya file-nya bisa membacanya.',
      ],
      steps: [
        { name: 'Buka penghapus metadata', text: 'Buka tab Strip di {site}.' },
        { name: 'Tambahkan foto', text: 'Letakkan file-mu. Kamu bisa menambahkan banyak sekaligus.' },
        { name: 'Pilih Perangkat ini atau Server', text: 'Perangkat ini membersihkan foto di browsermu dan tidak pernah mengunggahnya. Server memprosesnya di {site} lalu langsung menghapusnya.' },
        { name: 'Unduh salinan bersih', text: 'Setiap file kembali tanpa EXIF, GPS, XMP, IPTC, ICC, C2PA, catatan pabrikan, thumbnail, dan komentar.' },
      ],
      sections: [
        {
          h: 'Isi metadata foto',
          blocks: [
            {
              ul: [
                'EXIF: merek dan model kamera atau ponsel, lensa, nomor seri, pengaturan eksposur, tanggal dan waktu pengambilan dan pengeditan, serta lokasi GPS.',
                'Catatan pabrikan: area EXIF khusus tiap merek yang bisa menyimpan pengenal tambahan, seperti nomor seri internal atau jumlah jepretan.',
                'XMP: ditulis aplikasi edit seperti Lightroom dan Photoshop. Bisa berisi namamu, riwayat edit, rating, kata kunci, dan salinan data GPS.',
                'IPTC: keterangan, kredit, hak cipta, nama dan kontak fotografer, dan kolom Digital Source Type yang dipakai beberapa alat untuk menandai gambar buatan AI.',
                'Profil ICC: menjelaskan warna. Hampir selalu tidak berbahaya, tetapi beberapa profil menyebut nama perangkat atau software yang membuatnya.',
                'Thumbnail tersemat: pratinjau kecil yang disimpan di dalam file. Bisa menampilkan foto sebelum dipotong atau diedit.',
                'C2PA Content Credentials: catatan bertanda tangan tentang asal gambar dan cara gambar diedit. Lihat [cara menghapus C2PA](/guides/remove-c2pa-content-credentials/).',
                'Komentar dan blok teks: terutama PNG bisa membawa teks bebas, seperti prompt dan pengaturan dari generator gambar AI.',
              ],
            },
          ],
        },
        {
          h: 'Format yang dibersihkan {site}',
          blocks: [{ p: 'JPEG, PNG, WebP, HEIC/HEIF, AVIF, TIFF, dan GIF. Foto HEIC dikembalikan sebagai JPEG agar bisa dibuka di mana saja.' }],
        },
        {
          h: 'Cara lain menghapus EXIF',
          blocks: [
            {
              ul: [
                'Windows: Properties, Details, Remove Properties and Personal Information, lalu buat salinan bersih. Tidak semua kolom terhapus di setiap format.',
                'Mac: Preview bisa menghapus lokasi (Tools, Show Inspector, GPS, Remove Location Info), tetapi tidak yang lain. Mengekspor dari Foto dengan Lokasi tidak dicentang juga menghapus GPS.',
                'exiftool: `exiftool -all= photo.jpg` menghapus semua yang bisa ditulisnya; tambahkan `-r folder/` untuk satu folder penuh.',
                'Menyimpan ulang atau mengambil tangkapan layar: menghapus sebagian besar metadata, tetapi menurunkan kualitas dan, tergantung aplikasinya, bisa menyisakan beberapa kolom.',
              ],
            },
          ],
        },
      ],
      faq: [
        { q: 'Apakah menghapus EXIF menurunkan kualitas?', a: 'Tidak secara kasat mata. {site} menyimpan salinan bersih dengan kualitas tinggi, jadi terlihat sama saat dilihat biasa.' },
        { q: 'Apakah warnanya berubah jika profil ICC dihapus?', a: 'Foto dari ponsel dan sebagian besar kamera memakai warna sRGB atau Display P3 standar dan terlihat sama. File dengan ruang warna yang tidak umum bisa terlihat sedikit berbeda.' },
        { q: 'Bisakah metadata yang dihapus dikembalikan?', a: 'Tidak dari salinan bersih. Metadata itu sudah hilang dari file tersebut; file aslimu masih menyimpannya, jadi bagikan salinan bersihnya.' },
      ],
    },
    'remove-metadata-from-iphone-photos': {
      title: 'Cara menghapus metadata dari foto iPhone (HEIC dan JPEG)',
      metaTitle: 'Hapus metadata dari foto iPhone (HEIC)',
      description:
        'Foto iPhone menyimpan data lokasi, perangkat, tanggal, dan edit. Cara mematikannya di iPhone, menghapusnya saat berbagi, dan menghapus semuanya dari file HEIC dan JPEG.',
      short: 'Hapus metadata dari foto iPhone',
      cta: 'Bersihkan foto iPhone sekarang',
      intro: [
        'Foto iPhone biasanya berupa file HEIC dengan metadata lengkap: model iPhone, lensa, waktu yang tepat, lokasi jika Layanan Lokasi aktif untuk Kamera, dan setelah diedit, aplikasi yang dipakai. iOS bisa menghapus lokasi saat berbagi, tetapi tidak yang lain. Begini cara mengatasi keduanya.',
      ],
      steps: [
        { name: 'Simpan foto ke File', text: 'Di Foto, pilih fotonya, ketuk Bagikan, lalu Simpan ke File. (Atau kirim lewat AirDrop atau salin ke komputer.)' },
        { name: 'Buka {site} di Safari', text: 'Buka tab Strip dan ketuk untuk menambahkan file dari File atau perpustakaan fotomu.' },
        { name: 'Bersihkan', text: 'Pilih Perangkat ini agar foto tetap di iPhone-mu, atau Server agar lebih cepat. Foto HEIC kembali sebagai JPEG.' },
        { name: 'Simpan salinan bersih', text: 'Unduh, buka masing-masing, lalu ketuk Bagikan, Simpan Gambar untuk memasukkan salinan bersih ke Foto.' },
      ],
      sections: [
        {
          h: 'Hapus lokasi saat berbagi',
          blocks: [
            { p: 'Pilih fotonya, ketuk Bagikan, ketuk Pilihan di bagian atas lembar, dan matikan Lokasi. iOS mengirim salinan tanpa data GPS untuk pengiriman itu saja. Menyalakan Semua Data Foto melakukan kebalikannya dan menyertakan semuanya.' },
            { note: 'Memilih foto dari perpustakaan di dalam sebuah situs web masih bisa mengirim file asli beserta metadatanya. Pakai sakelar di Pilihan, atau bersihkan file-nya dulu.' },
          ],
        },
        {
          h: 'Berhenti menyimpan lokasi',
          blocks: [{ p: 'Pengaturan, Privasi & Keamanan, Layanan Lokasi, Kamera, lalu Tidak Pernah. Foto baru tidak akan punya data GPS. Foto yang sudah kamu ambil tetap menyimpannya.' }],
        },
        {
          h: 'Kenapa HEIC menjadi JPEG',
          blocks: [
            { p: 'HEIC adalah format default Apple. Banyak situs web, aplikasi Windows, dan ponsel Android lama tidak bisa membukanya, jadi {site} menyimpan foto HEIC yang sudah dibersihkan sebagai JPEG berkualitas tinggi. Jika kamu ingin iPhone memotret dalam JPEG sejak awal, pilih Pengaturan, Kamera, Format, Paling Kompatibel.' },
          ],
        },
        {
          h: 'Live Photos, mode Potret, dan editan',
          blocks: [
            { p: 'Live Photo adalah gambar diam ditambah video MOV pendek, dan masing-masing punya metadata sendiri. Membersihkan gambarnya tidak membersihkan videonya; bagikan sebagai foto diam, atau bersihkan videonya terpisah dengan [penghapus metadata video](/guides/remove-metadata-from-videos/). Data kedalaman mode Potret dan riwayat edit dihapus dari salinan bersih.' },
          ],
        },
      ],
      faq: [
        { q: 'Apakah AirDrop menyimpan metadata?', a: 'Ya. AirDrop mengirim file asli lengkap, termasuk lokasi, kecuali kamu mematikan Lokasi di Pilihan terlebih dahulu.' },
        { q: 'Apakah iMessage menghapus lokasi?', a: 'Tidak bisa diandalkan. Matikan Lokasi di Pilihan saat berbagi, atau bersihkan fotonya sebelum dikirim.' },
      ],
    },
    'remove-metadata-from-videos': {
      title: 'Cara menghapus metadata dari video (MP4, MOV, dan lainnya)',
      metaTitle: 'Hapus metadata dari video (MP4, MOV, MKV)',
      description:
        'Video menyimpan GPS, perangkat, tanggal, timecode, dan tag encoder. Cara melihatnya dan menghapus semuanya dari video MP4, MOV, MKV, WebM, dan lainnya.',
      short: 'Hapus metadata dari video',
      cta: 'Hapus metadata video sekarang',
      intro: [
        'Video dari ponsel dan kamera membawa metadata sebanyak foto, kadang lebih: lokasi, model perangkat, tanggal pembuatan, timecode, encoder yang dipakai, dan pada drone serta kamera aksi, jejak GPS atau telemetri lengkap yang direkam bersama gambar. Aplikasi edit menambahkan tag proyek dan software di atasnya.',
      ],
      steps: [
        { name: 'Buka penghapus metadata', text: 'Buka tab Strip di {site}.' },
        { name: 'Tambahkan video', text: 'MP4, MOV, M4V, MKV, WebM, AVI, MTS/M2TS, TS, 3GP, WMV, atau FLV.' },
        { name: 'Pilih Perangkat ini atau Server', text: 'Perangkat ini bekerja di browsermu tanpa mengunggah apa pun. Server lebih cepat untuk file besar, yang langsung dihapus setelahnya.' },
        { name: 'Unduh salinan bersih', text: 'Semua tag, trek data, dan box C2PA dihapus; gambar dan suaranya tetap.' },
      ],
      sections: [
        {
          h: 'Isi metadata video',
          blocks: [
            {
              ul: [
                'Tag global: judul, tanggal pembuatan, merek dan model perangkat, software, dan lokasi (misalnya tag `©xyz` dan `com.apple.quicktime.location.ISO6709` di video iPhone).',
                'Tag trek: nama, bahasa, nama handler, dan info encoder untuk setiap trek.',
                'Trek data: telemetri GPS dan sensor dari drone, kamera dasbor, dan kamera aksi, disimpan sebagai trek terpisah di samping video dan audio.',
                'Trek timecode dan judul bab.',
                'Gambar sampul dan thumbnail yang dilampirkan ke file.',
                'Box C2PA: Content Credentials bertanda tangan, yang makin sering ditambahkan kamera, aplikasi edit, dan alat video AI.',
              ],
            },
          ],
        },
        {
          h: 'Apakah video akan terlihat berbeda?',
          blocks: [
            { p: 'Tidak. Metadata ada di container yang membungkus video dan audio, bukan di gambar. {site} menyimpan salinan bersih dengan kualitas tinggi, jadi terlihat dan terdengar sama saat diputar biasa. File-nya tidak identik byte demi byte dengan aslinya, dan itu normal.' },
          ],
        },
        {
          h: 'Lakukan sendiri dengan ffmpeg',
          blocks: [
            { p: 'Dengan program gratis ffmpeg, perintah ini hanya menyalin video dan audio serta membuang tag global, bab, dan trek data:' },
            { code: 'ffmpeg -i in.mov -map 0:v -map 0:a? -map_metadata -1 -map_chapters -1 \\\n  -fflags +bitexact -c copy out.mp4' },
            { p: 'Cek hasilnya dengan `ffprobe -hide_banner out.mp4` atau `exiftool out.mp4`. Beberapa tag trek, seperti nama handler, bisa tersisa; {site} juga menghapusnya.' },
          ],
        },
      ],
      faq: [
        { q: 'Apakah YouTube atau TikTok menghapus metadata video?', a: 'Mereka meng-encode ulang unggahanmu, yang menghapus sebagian besar dari apa yang diunduh penonton. File asli yang kamu kirim lewat email, tautan cloud, atau chat masih menyimpannya.' },
        { q: 'Apakah video akan kehilangan kualitas?', a: 'Tidak secara kasat mata. Salinan bersih disimpan dengan kualitas tinggi.' },
      ],
    },
    'remove-c2pa-content-credentials': {
      title: 'Apa itu C2PA Content Credentials dan cara menghapusnya',
      metaTitle: 'Apa itu C2PA Content Credentials dan cara menghapusnya',
      description:
        'C2PA Content Credentials mencatat siapa yang membuat foto atau video, dengan alat dan editan apa. Cara mengecek apakah file memilikinya, apa yang diungkapnya, dan cara menghapusnya.',
      short: 'Hapus C2PA Content Credentials',
      cta: 'Cek dan bersihkan file',
      intro: [
        'C2PA (dari Coalition for Content Provenance and Authenticity) adalah standar untuk melampirkan catatan bertanda tangan, yang disebut manifest atau Content Credentials, ke foto, video, atau audio. Catatan ini ditambahkan oleh beberapa kamera dan ponsel, aplikasi edit seperti Photoshop dan Lightroom, dan alat AI seperti Adobe Firefly, alat gambar dan video OpenAI, serta generator gambar Microsoft.',
        'Manifest dimaksudkan untuk menunjukkan asal sebuah file, tetapi juga bisa membawa detail pribadi yang mungkin tidak ingin kamu publikasikan. Panduan ini menjelaskan isinya, cara mengecek file, dan cara menghapus manifest yang tersemat.',
      ],
      steps: [
        { name: 'Cek file-nya', text: 'Unggah ke situs Content Credentials Verify (contentcredentials.org/verify) untuk melihat apakah ada manifest dan apa isinya.' },
        { name: 'Buka penghapus metadata {site}', text: 'Buka tab Strip dan tambahkan file-nya.' },
        { name: 'Bersihkan', text: 'Pilih Perangkat ini atau Server. Manifest C2PA dihapus bersama EXIF, XMP, dan metadata lainnya.' },
        { name: 'Cek lagi', text: 'Unggah salinan bersih ke situs Verify. Seharusnya tidak ditemukan Content Credentials yang tersemat.' },
      ],
      sections: [
        {
          h: 'Isi yang mungkin ada di manifest C2PA',
          blocks: [
            {
              ul: [
                'Nama atau akun orang atau organisasi yang menandatanganinya, jika mereka memilih untuk mencantumkannya.',
                'Perangkat, aplikasi, atau layanan AI yang membuat file, dan software yang dipakai untuk mengeditnya.',
                'Daftar editan (aksi), seperti pemotongan, perubahan warna, atau “dibuat dengan alat AI generatif”.',
                'Tanggal dan waktu, dan kadang lokasi.',
                'Thumbnail versi sebelumnya dan “bahan”: rujukan ke file sumber yang digabungkan.',
                'Tanda tangan kriptografis yang menunjukkan apakah file sudah berubah sejak ditandatangani.',
              ],
            },
          ],
        },
        {
          h: 'Di mana disimpan dalam file',
          blocks: [
            { p: 'Pada JPEG, manifest ada di segmen APP11 (box JUMBF). Pada PNG berupa chunk `caBX`, pada MP4 dan MOV berupa box `uuid`, dan pada HEIC, WebP, dan AVIF berupa box metadata tersendiri. Karena blok terpisah, menghapusnya tidak menyentuh gambar.' },
          ],
        },
        {
          h: 'Apa yang dihapus dan apa yang tidak',
          blocks: [
            { p: 'Pembersihan menghapus manifest yang tersemat di file. Yang tidak dihapus:' },
            {
              ul: [
                'Watermark atau logo terlihat yang digambar di atas gambar.',
                'Salinan manifest yang disimpan online oleh alat yang membuat file. Beberapa layanan menyimpan Content Credentials di cloud dan bisa menemukannya lagi dari gambar itu sendiri.',
                'Watermark tak terlihat di piksel, seperti [SynthID](/guides/what-is-synthid/) dari Google. {site} mengacak SynthID secara terpisah, tetapi tidak ada alat yang bisa menjamin detektor tidak akan menemukannya.',
                'Kewajiban pengungkapan apa pun. Hukum dan aturan platform tentang pelabelan konten yang dibuat atau diedit dengan AI tetap berlaku untuk file itu.',
              ],
            },
            { note: 'Menghapus Content Credentials tidak mencegah platform memberi label AI pada file. Platform juga memakai pengklasifikasi sendiri, detektor watermark, dan pertanyaan saat unggah.' },
          ],
        },
        {
          h: 'Cara lain menghapus C2PA',
          blocks: [
            {
              ul: [
                'exiftool: `exiftool -jumbf:all= -c2pa:all= photo.jpg` (versi terbaru) menghapus C2PA dari JPEG; untuk format lain, `exiftool -all= file` lebih sederhana.',
                'Menyimpan ulang di aplikasi yang tidak mendukung C2PA biasanya menghapusnya, tetapi beberapa aplikasi, seperti Photoshop, menambahkan manifest baru.',
                'Tangkapan layar membuat file baru tanpa manifest asli, dengan kualitas lebih rendah.',
              ],
            },
          ],
        },
      ],
      faq: [
        { q: 'Apakah menghapus data C2PA legal?', a: 'Menghapus metadata dari file milikmu sendiri umumnya diperbolehkan, tetapi beberapa hukum dan aturan platform mewajibkan label pada konten buatan AI. Menghapus Content Credentials tidak mengubah kewajiban itu.' },
        { q: 'Apakah menghapus C2PA mengubah tampilan gambar?', a: 'Tidak. Manifest adalah blok terpisah di dalam file; gambarnya tetap sama.' },
        { q: 'Kenapa situs Verify masih menemukan Content Credentials?', a: 'Situs itu bisa mencocokkan beberapa gambar dengan kredensial yang disimpan online oleh layanan yang membuatnya. Catatan itu disimpan oleh layanan, bukan oleh file-mu.' },
      ],
    },
  },
};
