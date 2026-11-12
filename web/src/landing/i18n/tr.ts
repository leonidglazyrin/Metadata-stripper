import type { Translation } from './en';

export const tr: Translation = {
  meta: {
    title: 'Yapay zekâ görsellerinden SynthID ve C2PA’yı kaldır · {site}',
    description:
      'Google Veo, Gemini, Sora, ChatGPT veya Higgsfield ile yapılan yapay zekâ görsel ve videolarından C2PA Content Credentials ve meta verileri kaldır, SynthID filigranını boz. EXIF, GPS ve XMP de silinir. Ayrıca YouTube, X, TikTok ve Instagram indiricileri.',
    ogDescription:
      'Veo, Gemini, Sora, ChatGPT ve Higgsfield’dan gelen yapay zekâ video ve fotoğraflarındaki SynthID’yi ve gizli meta verileri sunucumuzda ya da cihazında kaldır.',
    twitterDescription:
      'Veo, Gemini, Sora, ChatGPT ve Higgsfield’dan gelen yapay zekâ video ve fotoğraflarındaki SynthID’yi ve gizli meta verileri kaldır.',
    ogImageAlt: '{site}: SynthID ve meta veri temizleyici',
  },
  nav: {
    label: 'Ana menü',
    home: '{site} ana sayfa',
    synthid: 'SynthID',
    detection: 'YZ etiketi',
    metadata: 'Meta veri',
    downloaders: 'İndiriciler',
    pricing: 'Fiyatlar',
    faq: 'SSS',
    openTools: 'Araçları aç',
    language: 'Dil',
    menu: 'Menü',
    mobileLabel: 'Ana menü (mobil)',
  },
  hero: {
    eyebrow: 'SynthID, C2PA ve meta veri temizleyici',
    title: ['Platformlar görsel ve videolarını', 'yapay zekâ olarak işaretlemesin.'],
    lede:
      'TikTok, Instagram ve diğerleri yapay zekâ dosyalarındaki gizli C2PA Content Credentials’ı ve SynthID filigranını okuyup gönderine “yapay zekâ ile üretildi” etiketi ekler. Google Veo, Gemini, Sora, ChatGPT veya Higgsfield’dan bir fotoğraf ya da video bırak ve temiz bir kopya indir: C2PA ve tüm meta veri etiketleri (EXIF, GPS, XMP) silinir, SynthID filigranı bozulur. Sunucumuzda ya da tarayıcında çalışır.',
    ctaStrip: 'Dosya temizle',
    ctaDownload: 'Video indir',
    toolsLabel: 'Araçlar',
    chipStrip: 'SynthID ve meta veri',
  },
  detection: {
    title: ['Otomatik “yapay zekâ ile üretildi”', 'etiketine son.'],
    lede:
      'Platformlar her yüklemeyi C2PA Content Credentials ve filigranlar için tarar. Bulurlarsa kapatamayacağın bir yapay zekâ etiketi açarlar. Önce bunları kaldır, açıklama yapıp yapmamak senin seçimin olarak kalsın.',
    beforeTitle: 'Meta veriler duruyor',
    beforeText:
      'TikTok Content Credentials’ı okudu ve yapay zekâ etiketini senin yerine açtı: gri, kapatmanın yolu yok.',
    afterTitle: '{site} ile temizlendi',
    afterText:
      'Platformun bulacağı bir şey kalmadı, etiket yeniden isteğe bağlı. Açıklayıp açıklamamaya sen karar verirsin.',
    detectedTag: 'Otomatik etiket',
    cleanTag: 'Senin seçimin',
    note:
      'Platformlar kendi sınıflandırıcılarını da kullanır ve bir dosyayı yine de etiketleyebilir. {site} kaldırabildiği sinyalleri kaldırır; bir platformun gönderini etiketlemeyeceğine söz veremez. Her platformun yapay zekâ açıklama kurallarına uy.',
    shotDetectedAlt:
      'TikTok’un “Yapay zekâ ile üretilmiş içerik” anahtarı açık ve kilitli, metinde “TikTok gönderinde içeriği düzenlemek veya üretmek için yapay zekâ kullanıldığını tespit ettiği için bu etiketi ekledik.” yazıyor',
    shotOptionalAlt:
      'TikTok’un “Yapay zekâ ile üretilmiş içerik” anahtarı kapalı ve isteğe bağlı, metinde “İzleyicilere içeriğinin yapay zekâyla üretildiğini veya düzenlendiğini bildirmek için bu etiketi ekle.” yazıyor',
  },
  synthid: {
    title: ['Yapay zekâ videolarından SynthID’yi kaldır,', 'görünüş aynı kalsın.'],
    lede:
      'SynthID, Google’ın Veo, Gemini ve Imagen ile yapılan görsel ve videoların piksellerine eklediği görünmez bir filigrandır. {site} bu pikselleri hafifçe değiştirerek deseni zayıflatır; dosya aynı görünür ve aynı oynatılır.',
    sourcesTitle: 'Şunlardan gelen dosyaları temizler',
    sourcesLabel: 'Yapay zekâ üreticileri',
    reencode: {
      caption: 'Neredeyse kayıpsız bir yeniden örnekleme, çok hafif bir gürültü ve yeni bir kodlama her pikseli kaydırır. Görüntü aynı kalır; görünmez filigran ızgarası ayakta kalmaz.',
      before: 'Yapay zekâ karesi · filigran gömülü',
      after: 'Yeniden kodlandı · filigran kırıldı',
    },
    photos: { title: 'Fotoğraflar', text: 'Hafif bir yeniden örnekleme, çok az gürültü ve keskinleştirme her pikseli değiştirir, ardından görsel yüksek kalitede yeniden kaydedilir.' },
    videos: { title: 'Videolar', text: 'Hafif bir bulanıklık, onu dengeleyen bir keskinleştirme ve kareler arasında biraz gürültüyle yüksek kaliteli yeniden kodlama (CRF 18).' },
    caveat: {
      title: 'Garanti yok',
      text: 'SynthID düzenlemelere dayanacak şekilde yapıldığı için hiçbir araç bir dedektörün onu kaçıracağına söz veremez. {site} filigranı zayıflatır; gittiğini ya da bir platformun dosyayı yapay zekâ olarak etiketlemeyeceğini garanti edemez.',
    },
    cta: 'SynthID temizleyiciyi aç',
    learnMore: 'SynthID nedir?',
  },
  metadata: {
    title: ['Fotoğraf ve videolar için', 'meta veri temizleyici.'],
    lede:
      'Fotoğraflar ve videolar nerede çekildiklerini, cihazı, seri numarasını ve düzenleme geçmişini saklar. Meta veri temizleyici hepsini siler, SynthID filigranını kaldırır ve neleri kaldırdığını listeler.',
    synthidTag: 'SynthID filigranı',
    photosTitle: 'Fotoğraflardan kaldırılanlar',
    photoTags: ['EXIF', 'GPS konumu', 'XMP', 'IPTC', 'ICC profilleri', 'C2PA / Content Credentials', 'Üretici notları', 'Küçük resimler', 'Metin yorumları'],
    photoFormats: 'JPEG, PNG, WebP, HEIC/HEIF, AVIF, TIFF, GIF. HEIC, JPEG olarak geri gelir.',
    videosTitle: 'Videolardan kaldırılanlar',
    videoTags: ['Genel ve akış etiketleri', 'Bölüm etiketleri', 'GPS ve telemetri izleri', 'Zaman kodu', 'Kapak görseli', 'C2PA kutuları', 'Kodlayıcı bilgileri'],
    videoFormats: 'MP4, MOV, M4V, MKV, WebM, AVI, MTS/M2TS, TS, 3GP, WMV, FLV. Akışlar yeniden kodlanmadan kopyalanır.',
  },
  downloaders: {
    label: 'Video indiriciler',
    youtube: {
      title: ['YouTube', 'İndirici'],
      text: 'YouTube video veya Shorts bağlantılarını yapıştır. 1080p’ye kadar MP4 ya da sesi M4A olarak al.',
      cta: 'YouTube indiricisini aç',
    },
    x: {
      title: ['X', 'İndirici'],
      text: 'Bir x.com veya twitter.com gönderi bağlantısı yapıştır ve o gönderideki videoyu MP4 olarak al.',
      cta: 'X indiricisini aç',
    },
    tiktok: {
      title: ['TikTok', 'İndirici'],
      text: 'vm. ve vt. kısa bağlantıları dahil tiktok.com bağlantılarını yapıştır. Videoyu MP4, sesi M4A olarak al.',
      cta: 'TikTok indiricisini aç',
    },
    instagram: {
      title: ['Instagram', 'İndirici'],
      text: 'Herkese açık bir Reel ya da video gönderisi bağlantısı yapıştır. Gizli videolar kullanılamaz.',
      cta: 'Instagram indiricisini aç',
    },
  },
  how: {
    title: ['SynthID ve meta veriler', 'nasıl kaldırılır.'],
    steps: [
      ['Dosyanı yükle.', 'Yapay zekâ videoları ya da fotoğrafları, istediğin kadar. Sunucuda ya da bu cihazda.'],
      ['{site} temizler.', 'EXIF, GPS ve C2PA etiketleri kaldırılır, SynthID filigranı zayıflatılır.'],
      ['Temiz kopyayı indir.', 'Her dosya neyin kaldırıldığını gösterir.'],
    ],
    flow: {
      uploading: 'Yükleniyor…',
      stripping: 'Meta veriler kaldırılıyor · SynthID zayıflatılıyor…',
      clean: 'Temiz · 4 öğe kaldırıldı',
      download: 'İndir',
    },
    cta: 'SynthID temizleyiciyi aç',
  },
  pricing: {
    title: ['İki plan.', 'Ücretsiz başla.'],
    perMonth: '/ ay',
    perYear: '/ yıl',
    monthly: 'Aylık',
    yearly: 'Yıllık',
    yearlySave: '2 ay ücretsiz',
    free: 'Her hesaba 1 ücretsiz cihazda temizleme, 1 ücretsiz sunucuda temizleme ve 1 ücretsiz video indirme verilir. Ücretsiz sunucu temizlemeleri ve indirmeler herkes için günlük olarak sınırlıdır.',
    basic: {
      name: 'Basic',
      /** Shown with a yellow minus: Basic has no downloads. */
      missing: 'YouTube, X, TikTok veya Instagram’dan video indirme yok (yalnızca Pro)',
      features: [
        'Cihazda sınırsız temizleme',
        'Dosyaların cihazından hiç çıkmaz',
        'Meta veriler ve C2PA kaldırılır',
        'SynthID temizlemeye erişim (tarayıcıların yetenekleriyle sınırlı olduğu için yavaştır; biz yavaşlatmıyoruz)',
      ],
    },
    pro: {
      name: 'Pro',
      badge: 'En hızlı',
      features: [
        'Basic’teki her şey',
        'Sunucuda sınırsız temizleme, yaklaşık 4 kat daha hızlı',
        'YouTube, X, TikTok ve Instagram’dan sınırsız video indirme',
      ],
    },
    pack: {
      name: 'Temizleme paketi',
      badge: '$2’ye dene',
      once: 'tek seferlik',
      text: '$2’ye 10 SynthID temizleme, cihazında, meta veriler de silinerek. Abonelik yok: bir kez öde, istediğin zaman yeniden al; temizlemeler birikir.',
      cta: '$2’ye dene',
    },
    billing: 'Planlar aylık veya yıllık faturalandırılır. İstediğin zaman iptal et ya da planını değiştir. Temizleme paketleri tek seferlik ödemedir.',
    stripeLabel: 'Stripe ile güvenli ödeme',
    cta: 'Araçları aç',
  },
  faq: {
    title: ['SynthID kaldırma', 'SSS.'],
    items: [
      {
        q: 'SynthID kaldırıcı nedir?',
        a: 'SynthID, Google’ın yapay zekâ modelleriyle yapılan görsel ve videolara eklediği görünmez bir filigrandır. Bir SynthID kaldırıcı, o deseni bozmak için pikselleri hafifçe değiştirir. {site} fotoğrafları yeniden örnekleyip keskinleştirir ve videoları yüksek kalitede yeniden kodlar, böylece dosya aynı görünür.',
      },
      {
        q: 'Yapay zekâ videolarından SynthID nasıl kaldırılır?',
        a: 'SynthID temizleyiciyi aç, videonu ekle, SynthID temizlemeyi açık bırak (varsayılan olarak açık) ve Sunucu’yu seç. {site} meta verileri kaldırır, filigranı zayıflatan küçük piksel değişiklikleriyle videoyu yüksek kalitede yeniden kodlar ve indirmen için temiz bir MP4 verir. Google Veo ve Gemini videoları SynthID taşır; aynı adımlar diğer üreticilerin meta verilerini de temizler.',
      },
      {
        q: 'Hangi yapay zekâ üreticileriyle çalışır?',
        a: 'Hepsiyle. Google Veo, Gemini ve Imagen video ve fotoğrafları SynthID filigranı taşır. Sora, ChatGPT ve birçok başka aracın dosyaları meta verilerde C2PA Content Credentials taşır. Higgsfield, Veo dahil birkaç model kullandığı için dosyaları ikisinden birini taşıyabilir. {site} hepsinin meta verilerini kaldırır ve SynthID varsa onu bozar. Görünür filigranları veya logoları kaldırmaz.',
      },
      {
        q: 'TikTok veya diğer platformlar videomu yine de yapay zekâ olarak etiketler mi?',
        a: 'Etiketleyebilir. TikTok dahil bazı platformlar yapay zekâ içeriğini etiketlemek için C2PA Content Credentials’ı okur ve {site} bunları kaldırır. Ama platformlar filigran dedektörleri, kendi sınıflandırıcıları ve açıklama kuralları da kullanabilir ve hiçbir platformun çıktıyı nasıl etiketlediğini test etmedik. {site} bir dosyanın tespit edilmeden veya etiketlenmeden geçeceğini garanti etmez. Yapay zekâ ile üretilmiş içeriği açıklamayla ilgili her platformun kurallarına uy.',
      },
      {
        q: 'SynthID kaldırıcı her zaman işe yarar mı?',
        a: 'Hayır. SynthID düzenlemelere dayanacak şekilde yapıldı ve dedektörler sürekli değişiyor. {site} filigranı bozar, ama bir dedektör onu yine de bulabilir.',
      },
      {
        q: 'Görselim temizlendikten sonra neden hâlâ yapay zekâ olarak algılanıyor?',
        a: 'Görseller için SynthID, yeniden boyutlandırmaya ve yeniden kaydetmeye dayanacak şekilde tasarlanmış piksel düzeyinde bir filigrandır; bu yüzden zor bir örnek yine de bir dedektörü tetikleyebilir. {site} görseli yeniden örnekler, çok hafif bir gürültü ekler ve yeniden kodlayarak deseni görseli gözle görülür şekilde değiştirmeden olabildiğince zayıflatır. Bir dosya hâlâ işaretleniyorsa bu meta veriler değil, filigranın direnmesidir: EXIF, XMP ve C2PA Content Credentials yine de tamamen kaldırılır. Herhangi bir dedektörden geçeceğini garanti etmiyoruz.',
      },
      {
        q: 'Meta veri temizleyici neleri kaldırır?',
        a: 'Fotoğraflardan: EXIF (kamera, seri numarası, saat, GPS), XMP, IPTC, ICC profilleri, C2PA Content Credentials, üretici notları, gömülü küçük resimler ve yorumlar. Videolardan: genel, akış ve bölüm etiketleri, GPS ve telemetri izleri, zaman kodu, kapak görseli, C2PA kutuları ve kodlayıcı bilgileri. Her dosya kaldırılanların bir listesini gösterir.',
      },
      {
        q: 'Dosyalarım yükleniyor mu?',
        a: 'Yalnızca Sunucu’yu seçersen. Sunucu modunda dosya yüklenir, temizlenir ve hemen silinir. Bu cihaz modunda tarayıcında kalır ve bize hiçbir şey gönderilmez. Meta veriler her zaman kaldırılır; SynthID temizleme varsayılan olarak açık bir anahtardır ve cihazında yeniden kodlama tarayıcıda çalıştığı için videolar sunucuya göre daha uzun sürer.',
      },
      {
        q: 'Hangi biçimler destekleniyor?',
        a: 'Fotoğraflar: JPEG, PNG, WebP, HEIC/HEIF, AVIF, TIFF ve GIF (HEIC, JPEG olarak kaydedilir). Videolar: MP4, MOV, M4V, MKV, WebM, AVI, MTS/M2TS, TS, 3GP, WMV ve FLV.',
      },
      {
        q: 'Temizlemek kaliteyi düşürür mü?',
        a: 'Meta verileri kaldırmak video akışlarını yeniden kodlamadan kopyalar ve fotoğrafları yüksek kalitede kaydeder. SynthID temizleme pikselleri değiştirmek zorunda olduğu için dosya bayt bayt aynı olmaz, ama normal izlerken fark görmezsin.',
      },
      {
        q: 'SynthID filigranını kaldırmak yasal mı?',
        a: 'Nerede yaşadığına ve dosyayı nasıl kullandığına bağlıdır. Yalnızca sana ait ya da kullanma iznin olan içerikleri işle ve yasa veya bir platform gerektirdiğinde yapay zekâyla üretilmiş içeriği etiketle.',
      },
    ],
  },
  downloaderFaq: {
    title: ['İndiriciler', 'SSS.'],
    items: [
      {
        q: 'YouTube videosu nasıl indirilir?',
        a: 'YouTube indiricisini aç, bir video veya Shorts bağlantısı yapıştır ve İndir’e bas. 1080p’ye kadar bir MP4 alırsın ya da M4A dosyası için Yalnızca ses’i seçebilirsin. Aynı anda birkaç bağlantı yapıştırabilirsin.',
      },
      {
        q: 'X (Twitter) videosu nasıl indirilir?',
        a: 'Gönderinin bağlantısını (x.com veya twitter.com) kopyala ve X indiricisine yapıştır. O gönderideki videoyu MP4 olarak alırsın.',
      },
      {
        q: 'TikTok indiricisi kısa bağlantılarla çalışır mı?',
        a: 'Evet. Bir tiktok.com bağlantısı ya da vm.tiktok.com / vt.tiktok.com kısa bağlantısı yapıştır; videoyu MP4, sesi M4A olarak alırsın.',
      },
      {
        q: 'Instagram veya X bağlantısı neden başarısız oluyor?',
        a: 'Yalnızca herkese açık videolar indirilebilir. Gizli videolar indirme aracında kullanılamaz ve bir platform giriş isterse indirme bunu belirten bir mesajla başarısız olur.',
      },
      {
        q: 'Yalnızca sesi indirebilir miyim?',
        a: 'Evet. Her indiricide bir Video / Yalnızca ses anahtarı vardır. Yalnızca ses sana bir M4A dosyası verir.',
      },
      {
        q: 'İndirdiğim videoları saklıyor musunuz?',
        a: 'Hayır. Her video sunucumuza alınır, sana gönderilir ve hemen ardından silinir.',
      },
      {
        q: 'Video indirmek yasal mı?',
        a: 'Yalnızca sana ait ya da kullanma iznin olan videoları indir. İndirmek bir platformun hizmet şartlarını ihlal edebilir ve telif kuralları yaşadığın yere göre değişir.',
      },
    ],
  },
  footer: {
    tagline: 'SynthID kaldırıcı, meta veri temizleyici ve YouTube, X, TikTok ve Instagram indiricileri.',
    open: 'Araçları aç',
    disclaimer:
      'Yalnızca sana ait ya da kullanma iznin olan içerikleri işle ve indir; kurallar gerektirdiğinde yapay zekâyla üretilmiş içeriği etiketle. {site}; Google, YouTube, TikTok, X veya Instagram ile bağlantılı değildir.',
    badges: 'Yer aldığımız yerler',
  },
  jsonLd: {
    name: '{site}: SynthID kaldırıcı ve meta veri temizleyici',
    alternateName: ['SynthID kaldırma', 'Yapay zekâ videolarından SynthID kaldırma', 'Meta veri temizleyici', 'YouTube indirici', 'X video indirici', 'TikTok indirici', 'Instagram indirici'],
    browserRequirements: 'JavaScript destekli modern bir tarayıcı gerekir.',
    operatingSystem: 'Herhangi biri (web tarayıcısı)',
    description:
      'Yapay zekâ video ve fotoğraflarından (Google Veo, Gemini, Sora, ChatGPT, Higgsfield ve daha fazlası) EXIF, GPS, XMP, IPTC ve C2PA meta verilerini kaldır ve SynthID filigranlarını boz; sunucuda ya da cihazında. Sonuçlar garanti edilmez. YouTube, TikTok, X ve Instagram indiricileri dahil.',
    keywords:
      'SynthID kaldırma, SynthID silme, SynthID kaldırıcı, yapay zekâ videosundan SynthID kaldırma, yapay zekâ filigranı kaldırma, C2PA kaldırma, meta veri silme, Veo, Gemini, Sora, ChatGPT, Higgsfield',
    featureList: [
      'Fotoğraf ve videolar için SynthID temizleme',
      'EXIF, GPS, XMP, IPTC, ICC ve C2PA meta veri temizleyici',
      'Cihazda işleme seçeneği',
      'YouTube indirici (1080p’ye kadar MP4 veya M4A ses)',
      'TikTok indirici',
      'X ve Instagram video indiricileri',
    ],
  },
};
