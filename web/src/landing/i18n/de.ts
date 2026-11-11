import type { Translation } from './en';

export const de: Translation = {
  meta: {
    title: 'SynthID und Metadaten aus Fotos und Videos entfernen · {site}',
    description:
      '{site} entfernt Metadaten und stört das SynthID-Wasserzeichen in Fotos und Videos. Löschen Sie EXIF-, GPS- und C2PA-Daten auf unserem Server oder auf Ihrem Gerät. Dazu Downloader für YouTube, X, TikTok und Instagram.',
    ogDescription:
      'Entfernen Sie SynthID-Wasserzeichen und versteckte Metadaten aus Fotos und Videos, auf unserem Server oder auf Ihrem Gerät. Dazu Downloader für YouTube, X, TikTok und Instagram.',
    twitterDescription:
      'Entfernen Sie SynthID-Wasserzeichen und versteckte Metadaten aus Fotos und Videos. Dazu Downloader für YouTube, X, TikTok und Instagram.',
    ogImageAlt: '{site}: SynthID- und Metadaten-Entferner',
  },
  nav: {
    label: 'Hauptmenü',
    home: '{site} Startseite',
    synthid: 'SynthID',
    metadata: 'Metadaten',
    downloaders: 'Downloader',
    pricing: 'Preis',
    faq: 'FAQ',
    openTools: 'Tools öffnen',
    language: 'Sprache',
    menu: 'Menü',
    mobileLabel: 'Hauptmenü (mobil)',
  },
  hero: {
    eyebrow: 'SynthID entfernen · Metadaten löschen · Videos herunterladen',
    title: ['SynthID entfernen', '& Metadaten löschen.'],
    lede:
      'Foto oder Video hineinziehen und eine Kopie ohne EXIF-, GPS- und C2PA-Daten und mit gestörtem SynthID-Wasserzeichen herunterladen. Läuft auf unserem Server oder in Ihrem Browser.',
    ctaStrip: 'Datei bereinigen',
    ctaDownload: 'Video herunterladen',
    toolsLabel: 'Tools',
    chipStrip: 'SynthID & Metadaten',
  },
  synthid: {
    title: ['SynthID entfernen,', 'ohne dass man es sieht.'],
    lede:
      'SynthID ist ein unsichtbares Wasserzeichen, das Google in die Pixel von KI-Bildern und -Videos einfügt. {site} verändert diese Pixel minimal, um das Muster aufzubrechen. Die Datei sieht genauso aus und läuft genauso ab.',
    sourcesTitle: 'Bereinigt Dateien aus',
    sourcesLabel: 'KI-Generatoren',
    photos: { title: 'Fotos', text: 'Leichtes Neuberechnen und Nachschärfen verändert jedes Pixel, danach wird das Bild in hoher Qualität neu gespeichert.' },
    videos: { title: 'Videos', text: 'Eine hochwertige Neukodierung (CRF 18) mit leichter Unschärfe, passendem Nachschärfen und etwas Rauschen zwischen den Frames.' },
    caveat: {
      title: 'Keine Garantie',
      text: 'SynthID ist darauf ausgelegt, Bearbeitungen zu überstehen. Kein Tool kann versprechen, dass ein Detektor es nicht mehr findet. {site} stört das Wasserzeichen, kann aber nicht garantieren, dass es weg ist.',
    },
    cta: 'SynthID-Entferner öffnen',
  },
  metadata: {
    title: ['Metadaten entfernen', 'aus Fotos und Videos.'],
    lede:
      'Fotos und Videos speichern, wo sie aufgenommen wurden, das Gerät, seine Seriennummer und den Bearbeitungsverlauf. Der Metadaten-Entferner löscht all das und zeigt an, was entfernt wurde.',
    synthidTag: 'SynthID-Wasserzeichen',
    photosTitle: 'Aus Fotos entfernt',
    photoTags: ['EXIF', 'GPS-Standort', 'XMP', 'IPTC', 'ICC-Profile', 'C2PA / Content Credentials', 'Herstellerdaten', 'Vorschaubilder', 'Textkommentare'],
    photoFormats: 'JPEG, PNG, WebP, HEIC/HEIF, AVIF, TIFF, GIF. HEIC wird als JPEG zurückgegeben.',
    videosTitle: 'Aus Videos entfernt',
    videoTags: ['Globale und Spur-Tags', 'Kapitel-Tags', 'GPS- und Telemetriespuren', 'Timecode', 'Cover', 'C2PA-Boxen', 'Encoder-Angaben'],
    videoFormats: 'MP4, MOV, M4V, MKV, WebM, AVI, MTS/M2TS, TS, 3GP, WMV, FLV. Die Spuren werden ohne Neukodierung kopiert.',
  },
  downloaders: {
    label: 'Video-Downloader',
    youtube: {
      title: ['YouTube', 'Downloader'],
      text: 'YouTube-Video- oder Shorts-Links einfügen. Sie erhalten ein MP4 bis 1080p oder den Ton als M4A.',
      cta: 'YouTube Downloader öffnen',
    },
    x: {
      title: ['X', 'Downloader'],
      text: 'Den Link eines x.com- oder twitter.com-Posts einfügen und das Video aus dem Post als MP4 erhalten.',
      cta: 'X Downloader öffnen',
    },
    tiktok: {
      title: ['TikTok', 'Downloader'],
      text: 'tiktok.com-Links einfügen, auch vm.- und vt.-Kurzlinks. Sie erhalten das Video als MP4 oder den Sound als M4A.',
      cta: 'TikTok Downloader öffnen',
    },
    instagram: {
      title: ['Instagram', 'Downloader'],
      text: 'Den Link eines Reels oder Video-Posts einfügen. Öffentliche Posts funktionieren; private brauchen eine angemeldete Sitzung.',
      cta: 'Instagram Downloader öffnen',
    },
  },
  how: {
    title: ['So entfernen Sie SynthID', 'und Metadaten.'],
    steps: [
      ['Datei hochladen.', 'KI-Videos oder -Fotos, so viele du willst. Auf dem Server oder auf diesem Gerät.'],
      ['{site} bereinigt sie.', 'EXIF-, GPS- und C2PA-Tags werden entfernt und das SynthID-Wasserzeichen wird geschwächt.'],
      ['Saubere Kopie herunterladen.', 'Zu jeder Datei siehst du, was entfernt wurde.'],
    ],
    flow: {
      uploading: 'Wird hochgeladen…',
      stripping: 'Metadaten werden entfernt · SynthID wird geschwächt…',
      clean: 'Sauber · 4 Einträge entfernt',
      download: 'Herunterladen',
    },
    cta: 'SynthID-Entferner öffnen',
  },
  pricing: {
    title: ['Ein Tarif.', '{price} im Monat.'],
    perMonth: '/ Monat',
    features: ['SynthID- und Metadaten-Entferner', 'Downloader für YouTube, X, TikTok und Instagram', 'Fotos und Videos in allen gängigen Formaten'],
    billing: 'Monatliche Abrechnung über Stripe. Jederzeit kündbar.',
    stripeLabel: 'Zahlungen über Stripe',
    cta: 'Tools öffnen',
  },
  faq: {
    title: ['SynthID entfernen:', 'FAQ.'],
    items: [
      {
        q: 'Was ist ein SynthID-Entferner?',
        a: 'SynthID ist ein unsichtbares Wasserzeichen, das Google in Bilder und Videos einfügt, die mit seinen KI-Modellen erstellt wurden. Ein SynthID-Entferner verändert die Pixel minimal, um dieses Muster aufzubrechen. {site} berechnet Fotos neu und schärft sie nach und kodiert Videos in hoher Qualität neu, sodass die Datei gleich aussieht.',
      },
      {
        q: 'Wie entferne ich SynthID aus KI-Videos?',
        a: 'Öffne den SynthID-Entferner, füge dein Video hinzu, lass SynthID-Entfernung an und wähle Server. {site} entfernt die Metadaten, kodiert das Video in hoher Qualität neu – mit kleinen Pixeländerungen, die das Wasserzeichen schwächen – und gibt dir ein sauberes MP4 zum Herunterladen. Videos aus Google Veo und Gemini tragen SynthID; dieselben Schritte bereinigen auch die Metadaten anderer Generatoren.',
      },
      {
        q: 'Mit welchen KI-Generatoren funktioniert es?',
        a: 'Mit allen. Videos und Fotos aus Google Veo, Gemini und Imagen tragen ein SynthID-Wasserzeichen. Dateien aus Sora, ChatGPT und vielen anderen Tools tragen C2PA Content Credentials in den Metadaten. Higgsfield nutzt mehrere Modelle, darunter Veo, daher können seine Dateien beides tragen. {site} entfernt bei allen die Metadaten und stört SynthID, wo es vorhanden ist. Sichtbare Wasserzeichen oder Logos entfernt es nicht.',
      },
      {
        q: 'Kennzeichnen TikTok oder andere Plattformen mein Video trotzdem als KI?',
        a: 'Möglicherweise. Einige Plattformen, darunter TikTok, lesen C2PA Content Credentials, um KI-Inhalte zu kennzeichnen, und {site} entfernt diese. Plattformen können aber auch Wasserzeichen-Detektoren, eigene Klassifikatoren und Offenlegungsregeln nutzen, und wir haben nicht getestet, wie eine Plattform das Ergebnis kennzeichnet. {site} garantiert nicht, dass eine Datei unerkannt oder ungekennzeichnet bleibt. Halte dich an die Regeln jeder Plattform zur Offenlegung von KI-generierten Inhalten.',
      },
      {
        q: 'Funktioniert die SynthID-Entfernung immer?',
        a: 'Nein. SynthID ist darauf ausgelegt, Bearbeitungen zu überstehen, und Detektoren ändern sich ständig. {site} stört das Wasserzeichen, aber ein Detektor kann es trotzdem noch finden.',
      },
      {
        q: 'Was entfernt der Metadaten-Entferner?',
        a: 'Aus Fotos: EXIF (Kamera, Seriennummer, Uhrzeit, GPS), XMP, IPTC, ICC-Profile, C2PA Content Credentials, Herstellerdaten, eingebettete Vorschaubilder und Kommentare. Aus Videos: globale, Spur- und Kapitel-Tags, GPS- und Telemetriespuren, Timecode, Cover, C2PA-Boxen und Encoder-Angaben. Zu jeder Datei wird angezeigt, was entfernt wurde.',
      },
      {
        q: 'Werden meine Dateien hochgeladen?',
        a: 'Nur wenn Sie Server wählen. Im Server-Modus wird die Datei hochgeladen, bereinigt und sofort gelöscht. Im Modus Dieses Gerät bleibt sie in Ihrem Browser. Auf dem Gerät werden Fotos verlustfrei bereinigt und Videos neu gemuxt; SynthID-Entfernung auf dem Gerät funktioniert nur bei Fotos.',
      },
      {
        q: 'Welche Formate werden unterstützt?',
        a: 'Fotos: JPEG, PNG, WebP, HEIC/HEIF, AVIF, TIFF und GIF (HEIC wird als JPEG gespeichert). Videos: MP4, MOV, M4V, MKV, WebM, AVI, MTS/M2TS, TS, 3GP, WMV und FLV.',
      },
      {
        q: 'Verschlechtert das Bereinigen die Qualität?',
        a: 'Beim Entfernen der Metadaten werden die Videospuren ohne Neukodierung kopiert und Fotos in hoher Qualität gespeichert. Die SynthID-Entfernung muss Pixel verändern, daher ist die Datei nicht bytegleich, aber beim normalen Ansehen sehen Sie keinen Unterschied.',
      },
      {
        q: 'Ist es legal, ein SynthID-Wasserzeichen zu entfernen?',
        a: 'Das hängt davon ab, wo Sie leben und wie Sie die Datei nutzen. Bearbeiten Sie nur Inhalte, die Ihnen gehören oder die Sie nutzen dürfen, und kennzeichnen Sie KI-generierte Inhalte, wo Gesetz oder Plattform es verlangen.',
      },
    ],
  },
  downloaderFaq: {
    title: ['Downloader:', 'FAQ.'],
    items: [
      {
        q: 'Wie lade ich ein YouTube-Video herunter?',
        a: 'Öffnen Sie den YouTube Downloader, fügen Sie einen Video- oder Shorts-Link ein und tippen Sie auf Herunterladen. Sie erhalten ein MP4 bis 1080p, oder wählen Sie Nur Audio für eine M4A-Datei. Sie können mehrere Links auf einmal einfügen.',
      },
      {
        q: 'Wie lade ich ein Video von X (Twitter) herunter?',
        a: 'Kopieren Sie den Link des Posts (x.com oder twitter.com) und fügen Sie ihn in den X Downloader ein. Sie erhalten das Video aus diesem Post als MP4.',
      },
      {
        q: 'Funktioniert der TikTok Downloader mit Kurzlinks?',
        a: 'Ja. Fügen Sie einen tiktok.com-Link oder einen Kurzlink vm.tiktok.com / vt.tiktok.com ein und Sie erhalten das Video als MP4 oder den Sound als M4A.',
      },
      {
        q: 'Warum schlägt ein Instagram- oder X-Link fehl?',
        a: 'Private Posts und manche öffentlichen brauchen eine angemeldete Sitzung. Ist ein Post privat oder verlangt die Plattform eine Anmeldung, schlägt der Download mit einer entsprechenden Meldung fehl.',
      },
      {
        q: 'Kann ich nur den Ton herunterladen?',
        a: 'Ja. Jeder Downloader hat einen Schalter Video / Nur Audio. Nur Audio liefert eine M4A-Datei.',
      },
      {
        q: 'Speichern Sie die Videos, die ich herunterlade?',
        a: 'Nein. Jedes Video wird auf unserem Server abgerufen, an Sie gesendet und direkt danach gelöscht.',
      },
      {
        q: 'Ist es legal, Videos herunterzuladen?',
        a: 'Laden Sie nur Videos herunter, die Ihnen gehören oder die Sie nutzen dürfen. Das Herunterladen kann gegen die Nutzungsbedingungen einer Plattform verstoßen, und das Urheberrecht hängt davon ab, wo Sie leben.',
      },
    ],
  },
  footer: {
    tagline: 'SynthID- und Metadaten-Entferner sowie Downloader für YouTube, X, TikTok und Instagram.',
    open: 'Tools öffnen',
    disclaimer:
      'Bearbeiten und laden Sie nur Inhalte herunter, die Ihnen gehören oder die Sie nutzen dürfen, und kennzeichnen Sie KI-generierte Inhalte, wo die Regeln es verlangen. {site} steht in keiner Verbindung zu Google, YouTube, TikTok, X oder Instagram.',
    badges: 'Vorgestellt auf',
  },
  jsonLd: {
    name: '{site}: SynthID- und Metadaten-Entferner',
    alternateName: ['SynthID entfernen', 'Metadaten entfernen', 'YouTube Downloader', 'X Video Downloader', 'TikTok Downloader', 'Instagram Downloader'],
    browserRequirements: 'Erfordert einen modernen Browser mit JavaScript.',
    operatingSystem: 'Alle (Webbrowser)',
    description:
      'Entfernen Sie EXIF-, GPS-, XMP-, IPTC- und C2PA-Metadaten aus Fotos und Videos und stören Sie SynthID-Wasserzeichen, auf einem Server oder auf Ihrem Gerät. Mit Downloadern für YouTube, TikTok, X und Instagram.',
    featureList: [
      'SynthID-Entfernung für Fotos und Videos',
      'Metadaten-Entferner für EXIF, GPS, XMP, IPTC, ICC und C2PA',
      'Verarbeitung auf dem Gerät möglich',
      'YouTube Downloader (MP4 bis 1080p oder M4A-Audio)',
      'TikTok Downloader',
      'Video-Downloader für X und Instagram',
    ],
  },
};
