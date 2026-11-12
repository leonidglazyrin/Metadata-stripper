import type { Translation } from './en';

export const de: Translation = {
  meta: {
    title: 'SynthID & C2PA aus KI-Bildern und -Videos entfernen · {site}',
    description:
      'Entfernen Sie C2PA Content Credentials und Metadaten aus KI-Bildern und -Videos von Google Veo, Gemini, Sora, ChatGPT oder Higgsfield und stören Sie das SynthID-Wasserzeichen. Löscht auch EXIF, GPS und XMP. Dazu Downloader für YouTube, X, TikTok und Instagram.',
    ogDescription:
      'Entfernen Sie SynthID und versteckte Metadaten aus KI-Videos und -Fotos von Veo, Gemini, Sora, ChatGPT und Higgsfield, auf unserem Server oder auf Ihrem Gerät.',
    twitterDescription:
      'Entfernen Sie SynthID und versteckte Metadaten aus KI-Videos und -Fotos von Veo, Gemini, Sora, ChatGPT und Higgsfield.',
    ogImageAlt: '{site}: SynthID- und Metadaten-Entferner',
  },
  nav: {
    label: 'Hauptmenü',
    home: '{site} Startseite',
    synthid: 'SynthID',
    detection: 'KI-Label',
    metadata: 'Metadaten',
    downloaders: 'Downloader',
    pricing: 'Preise',
    faq: 'FAQ',
    openTools: 'Tools öffnen',
    language: 'Sprache',
    menu: 'Menü',
    mobileLabel: 'Hauptmenü (mobil)',
  },
  hero: {
    eyebrow: 'SynthID-, C2PA- & Metadaten-Entferner',
    title: ['Verhindern Sie, dass Plattformen', 'Ihre Bilder & Videos als KI markieren.'],
    lede:
      'TikTok, Instagram und andere lesen die versteckten C2PA Content Credentials und das SynthID-Wasserzeichen in KI-Dateien und versehen Ihren Beitrag mit einem „KI-generiert“-Label. Ziehen Sie ein Foto oder Video von Google Veo, Gemini, Sora, ChatGPT oder Higgsfield hinein und laden Sie eine saubere Kopie herunter: C2PA und alle Metadaten-Tags (EXIF, GPS, XMP) gelöscht, das SynthID-Wasserzeichen gestört. Läuft auf unserem Server oder in Ihrem Browser.',
    ctaStrip: 'Datei bereinigen',
    ctaDownload: 'Video herunterladen',
    toolsLabel: 'Tools',
    chipStrip: 'SynthID & Metadaten',
  },
  detection: {
    title: ['Schluss mit dem automatischen', '„KI-generiert“-Label.'],
    lede:
      'Plattformen prüfen jeden Upload auf C2PA Content Credentials und Wasserzeichen. Werden sie fündig, schalten sie ein KI-Label ein, das Sie nicht abschalten können. Entfernen Sie sie vorher, und die Kennzeichnung bleibt Ihre Entscheidung.',
    beforeTitle: 'Mit Metadaten',
    beforeText:
      'TikTok hat die Content Credentials gelesen und das KI-Label für Sie eingeschaltet: ausgegraut, ohne Möglichkeit, es abzuschalten.',
    afterTitle: 'Bereinigt mit {site}',
    afterText:
      'Die Plattform findet nichts mehr, also ist das Label wieder freiwillig. Sie entscheiden, ob Sie es angeben.',
    detectedTag: 'Automatisch gelabelt',
    cleanTag: 'Ihre Wahl',
    note:
      'Plattformen nutzen auch eigene Klassifikatoren und können eine Datei trotzdem labeln. {site} entfernt die Signale, die es entfernen kann; es kann nicht versprechen, dass eine Plattform Ihren Beitrag nicht labelt. Halten Sie sich an die KI-Kennzeichnungsregeln jeder Plattform.',
    shotDetectedAlt:
      'TikToks Schalter „KI-generierter Inhalt“ eingeschaltet und gesperrt, mit dem Text „Wir haben dieses Label hinzugefügt, weil TikTok die Nutzung von KI zum Bearbeiten oder Erstellen von Inhalten in deinem Beitrag erkannt hat.“',
    shotOptionalAlt:
      'TikToks Schalter „KI-generierter Inhalt“ ausgeschaltet und optional, mit dem Text „Füge dieses Label hinzu, um Zuschauern mitzuteilen, dass dein Inhalt mit KI erstellt oder bearbeitet wurde.“',
  },
  synthid: {
    title: ['SynthID aus KI-Videos entfernen,', 'ohne dass man es sieht.'],
    lede:
      'SynthID ist ein unsichtbares Wasserzeichen, das Google in die Pixel von Bildern und Videos aus Veo, Gemini und Imagen einfügt. {site} verändert diese Pixel minimal, um das Muster abzuschwächen. Die Datei sieht genauso aus und läuft genauso ab.',
    sourcesTitle: 'Bereinigt Dateien von',
    sourcesLabel: 'KI-Generatoren',
    reencode: {
      caption: 'Ein nahezu verlustfreies Resampling, ein Hauch Rauschen und eine neue Kodierung verschieben jedes Pixel. Das Bild sieht gleich aus; das unsichtbare Wasserzeichen-Raster übersteht es nicht.',
      before: 'KI-Frame · Wasserzeichen eingebettet',
      after: 'Neu kodiert · Wasserzeichen gebrochen',
    },
    photos: { title: 'Fotos', text: 'Ein leichtes Resampling, ein Hauch Rauschen und eine Nachschärfung verändern jedes Pixel, dann wird das Bild in hoher Qualität neu gespeichert.' },
    videos: { title: 'Videos', text: 'Eine hochwertige Neukodierung (CRF 18) mit leichter Unschärfe, passender Nachschärfung und etwas Rauschen zwischen den Frames.' },
    caveat: {
      title: 'Keine Garantie',
      text: 'SynthID ist darauf ausgelegt, Bearbeitungen zu überstehen. Kein Tool kann versprechen, dass ein Detektor es übersieht. {site} schwächt das Wasserzeichen ab; es kann weder garantieren, dass es weg ist, noch dass eine Plattform die Datei nicht als KI labelt.',
    },
    cta: 'SynthID-Entferner öffnen',
    learnMore: 'Was ist SynthID?',
  },
  metadata: {
    title: ['Metadaten-Entferner', 'für Fotos und Videos.'],
    lede:
      'Fotos und Videos speichern, wo sie aufgenommen wurden, das Gerät, seine Seriennummer und den Bearbeitungsverlauf. Der Metadaten-Entferner löscht all das, entfernt das SynthID-Wasserzeichen und listet auf, was entfernt wurde.',
    synthidTag: 'SynthID-Wasserzeichen',
    photosTitle: 'Aus Fotos entfernt',
    photoTags: ['EXIF', 'GPS-Standort', 'XMP', 'IPTC', 'ICC-Profile', 'C2PA / Content Credentials', 'Herstellerdaten', 'Vorschaubilder', 'Textkommentare'],
    photoFormats: 'JPEG, PNG, WebP, HEIC/HEIF, AVIF, TIFF, GIF. HEIC wird als JPEG zurückgegeben.',
    videosTitle: 'Aus Videos entfernt',
    videoTags: ['Globale & Stream-Tags', 'Kapitel-Tags', 'GPS- & Telemetriespuren', 'Timecode', 'Cover', 'C2PA-Boxen', 'Encoder-Angaben'],
    videoFormats: 'MP4, MOV, M4V, MKV, WebM, AVI, MTS/M2TS, TS, 3GP, WMV, FLV. Streams werden ohne Neukodierung kopiert.',
  },
  downloaders: {
    label: 'Video-Downloader',
    youtube: {
      title: ['YouTube', 'Downloader'],
      text: 'Fügen Sie Links zu YouTube-Videos oder Shorts ein. Sie erhalten ein MP4 bis 1080p oder den Ton als M4A.',
      cta: 'YouTube-Downloader öffnen',
    },
    x: {
      title: ['X', 'Downloader'],
      text: 'Fügen Sie den Link eines x.com- oder twitter.com-Beitrags ein und erhalten Sie das Video daraus als MP4.',
      cta: 'X-Downloader öffnen',
    },
    tiktok: {
      title: ['TikTok', 'Downloader'],
      text: 'Fügen Sie tiktok.com-Links ein, auch die Kurzlinks vm. und vt. Sie erhalten das Video als MP4 oder den Sound als M4A.',
      cta: 'TikTok-Downloader öffnen',
    },
    instagram: {
      title: ['Instagram', 'Downloader'],
      text: 'Fügen Sie den Link eines öffentlichen Reels oder Videobeitrags ein. Private Videos sind nicht verfügbar.',
      cta: 'Instagram-Downloader öffnen',
    },
  },
  how: {
    title: ['So entfernen Sie SynthID', 'und Metadaten.'],
    steps: [
      ['Datei hochladen.', 'KI-Videos oder -Fotos, so viele Sie möchten. Auf dem Server oder auf diesem Gerät.'],
      ['{site} bereinigt sie.', 'EXIF-, GPS- und C2PA-Tags werden entfernt und das SynthID-Wasserzeichen wird abgeschwächt.'],
      ['Saubere Kopie herunterladen.', 'Jede Datei zeigt, was entfernt wurde.'],
    ],
    flow: {
      uploading: 'Wird hochgeladen…',
      stripping: 'Metadaten werden entfernt · SynthID wird abgeschwächt…',
      clean: 'Sauber · 4 Elemente entfernt',
      download: 'Herunterladen',
    },
    cta: 'SynthID-Entferner öffnen',
  },
  pricing: {
    title: ['Zwei Tarife.', 'Kostenlos starten.'],
    perMonth: '/ Monat',
    perYear: '/ Jahr',
    monthly: 'Monatlich',
    yearly: 'Jährlich',
    yearlySave: '2 Monate gratis',
    free: 'Jedes Konto erhält 1 kostenlose Bereinigung auf dem Gerät, 1 kostenlose Bereinigung auf dem Server und 1 kostenlosen Video-Download. Kostenlose Server-Bereinigungen und Downloads sind für alle pro Tag begrenzt.',
    basic: {
      name: 'Basic',
      features: [
        'Unbegrenzte Bereinigung auf dem Gerät',
        'Ihre Dateien verlassen nie Ihr Gerät',
        'Metadaten und C2PA werden entfernt',
        'Zugang zur SynthID-Entfernung (langsam, da durch die Möglichkeiten des Browsers begrenzt; wir bremsen nicht)',
      ],
    },
    pro: {
      name: 'Pro',
      badge: 'Am schnellsten',
      features: [
        'Alles aus Basic',
        'Unbegrenzte Bereinigung auf dem Server, etwa 4-mal schneller',
        'Unbegrenzte Video-Downloads von YouTube, X, TikTok und Instagram',
      ],
    },
    pack: {
      name: 'Bereinigungspaket',
      badge: 'Für 2 $ testen',
      once: 'einmalig',
      text: '10 SynthID-Bereinigungen für 2 $, auf Ihrem Gerät, Metadaten werden ebenfalls entfernt. Kein Abo: einmal zahlen, jederzeit nachkaufen, die Bereinigungen summieren sich.',
      cta: 'Für 2 $ testen',
    },
    billing: 'Tarife werden monatlich oder jährlich abgerechnet. Jederzeit kündbar oder wechselbar. Bereinigungspakete sind eine Einmalzahlung.',
    stripeLabel: 'Sichere Zahlung über Stripe',
    cta: 'Tools öffnen',
  },
  faq: {
    title: ['SynthID entfernen:', 'FAQ.'],
    items: [
      {
        q: 'Was ist ein SynthID-Entferner?',
        a: 'SynthID ist ein unsichtbares Wasserzeichen, das Google in Bilder und Videos seiner KI-Modelle einfügt. Ein SynthID-Entferner verändert die Pixel minimal, um dieses Muster aufzubrechen. {site} resampelt und schärft Fotos und kodiert Videos in hoher Qualität neu, sodass die Datei gleich aussieht.',
      },
      {
        q: 'Wie entferne ich SynthID aus KI-Videos?',
        a: 'Öffnen Sie den SynthID-Entferner, fügen Sie Ihr Video hinzu, lassen Sie die SynthID-Entfernung eingeschaltet (sie ist standardmäßig an) und wählen Sie Server. {site} entfernt die Metadaten, kodiert das Video in hoher Qualität mit kleinen Pixeländerungen neu, die das Wasserzeichen abschwächen, und gibt Ihnen ein sauberes MP4 zum Herunterladen. Videos von Google Veo und Gemini tragen SynthID; dieselben Schritte löschen auch die Metadaten anderer Generatoren.',
      },
      {
        q: 'Mit welchen KI-Generatoren funktioniert es?',
        a: 'Mit allen. Videos und Fotos von Google Veo, Gemini und Imagen tragen ein SynthID-Wasserzeichen. Dateien von Sora, ChatGPT und vielen anderen Tools tragen C2PA Content Credentials in den Metadaten. Higgsfield nutzt mehrere Modelle, darunter Veo, daher können seine Dateien das eine oder das andere tragen. {site} entfernt bei allen die Metadaten und stört SynthID, wo es vorhanden ist. Sichtbare Wasserzeichen oder Logos werden nicht entfernt.',
      },
      {
        q: 'Labeln TikTok oder andere Plattformen mein Video trotzdem als KI?',
        a: 'Möglicherweise. Einige Plattformen, darunter TikTok, lesen C2PA Content Credentials, um KI-Inhalte zu labeln, und {site} entfernt diese. Plattformen können aber auch Wasserzeichen-Detektoren, eigene Klassifikatoren und Kennzeichnungsregeln nutzen, und wir haben nicht getestet, wie eine Plattform das Ergebnis labelt. {site} garantiert nicht, dass eine Datei unerkannt oder ungelabelt bleibt. Halten Sie sich an die Regeln jeder Plattform zur Kennzeichnung von KI-Inhalten.',
      },
      {
        q: 'Funktioniert der SynthID-Entferner immer?',
        a: 'Nein. SynthID ist darauf ausgelegt, Bearbeitungen zu überstehen, und Detektoren ändern sich ständig. {site} stört das Wasserzeichen, aber ein Detektor kann es trotzdem finden.',
      },
      {
        q: 'Warum wird mein Bild nach der Bereinigung noch als KI erkannt?',
        a: 'SynthID für Bilder ist ein Wasserzeichen auf Pixelebene, das Größenänderungen und erneutes Speichern übersteht, daher kann ein schwieriger Fall einen Detektor weiterhin auslösen. {site} resampelt das Bild, fügt einen Hauch Rauschen hinzu und kodiert es neu, um das Muster so weit wie möglich abzuschwächen, ohne das Bild sichtbar zu verändern. Wird eine Datei weiterhin erkannt, liegt das am hartnäckigen Wasserzeichen, nicht an den Metadaten: EXIF, XMP und C2PA Content Credentials sind trotzdem vollständig entfernt. Wir garantieren nicht, dass eine Datei einen Detektor besteht.',
      },
      {
        q: 'Was entfernt der Metadaten-Entferner?',
        a: 'Aus Fotos: EXIF (Kamera, Seriennummer, Zeit, GPS), XMP, IPTC, ICC-Profile, C2PA Content Credentials, Herstellerdaten, eingebettete Vorschaubilder und Kommentare. Aus Videos: globale, Stream- und Kapitel-Tags, GPS- und Telemetriespuren, Timecode, Cover, C2PA-Boxen und Encoder-Angaben. Jede Datei zeigt eine Liste dessen, was entfernt wurde.',
      },
      {
        q: 'Werden meine Dateien hochgeladen?',
        a: 'Nur wenn Sie Server wählen. Im Server-Modus wird die Datei hochgeladen, bereinigt und sofort gelöscht. Im Modus Dieses Gerät bleibt sie in Ihrem Browser und nichts wird an uns gesendet. Metadaten werden immer entfernt; die SynthID-Entfernung ist ein Schalter, der standardmäßig an ist, und auf Ihrem Gerät läuft die Neukodierung im Browser, daher dauern Videos länger als auf dem Server.',
      },
      {
        q: 'Welche Formate werden unterstützt?',
        a: 'Fotos: JPEG, PNG, WebP, HEIC/HEIF, AVIF, TIFF und GIF (HEIC wird als JPEG gespeichert). Videos: MP4, MOV, M4V, MKV, WebM, AVI, MTS/M2TS, TS, 3GP, WMV und FLV.',
      },
      {
        q: 'Verschlechtert das Bereinigen die Qualität?',
        a: 'Beim Entfernen der Metadaten werden die Videostreams ohne Neukodierung kopiert und Fotos in hoher Qualität gespeichert. Die SynthID-Entfernung muss Pixel verändern, daher ist die Datei nicht bytegleich, aber beim normalen Ansehen sehen Sie keinen Unterschied.',
      },
      {
        q: 'Ist es legal, ein SynthID-Wasserzeichen zu entfernen?',
        a: 'Das hängt davon ab, wo Sie leben und wie Sie die Datei nutzen. Bearbeiten Sie nur Inhalte, die Ihnen gehören oder die Sie nutzen dürfen, und kennzeichnen Sie KI-generierte Inhalte, wo Gesetze oder Plattformen es verlangen.',
      },
    ],
  },
  downloaderFaq: {
    title: ['Downloader:', 'FAQ.'],
    items: [
      {
        q: 'Wie lade ich ein YouTube-Video herunter?',
        a: 'Öffnen Sie den YouTube-Downloader, fügen Sie einen Video- oder Shorts-Link ein und klicken Sie auf Herunterladen. Sie erhalten ein MP4 bis 1080p, oder wählen Sie Nur Audio für eine M4A-Datei. Sie können mehrere Links auf einmal einfügen.',
      },
      {
        q: 'Wie lade ich ein Video von X (Twitter) herunter?',
        a: 'Kopieren Sie den Link des Beitrags (x.com oder twitter.com) und fügen Sie ihn in den X-Downloader ein. Sie erhalten das Video aus diesem Beitrag als MP4.',
      },
      {
        q: 'Funktioniert der TikTok-Downloader mit Kurzlinks?',
        a: 'Ja. Fügen Sie einen tiktok.com-Link oder einen Kurzlink vm.tiktok.com / vt.tiktok.com ein und erhalten Sie das Video als MP4 oder den Sound als M4A.',
      },
      {
        q: 'Warum schlägt ein Instagram- oder X-Link fehl?',
        a: 'Nur öffentliche Videos können heruntergeladen werden. Private Videos sind im Download-Tool nicht verfügbar, und wenn eine Plattform eine Anmeldung verlangt, schlägt der Download mit einer entsprechenden Meldung fehl.',
      },
      {
        q: 'Kann ich nur den Ton herunterladen?',
        a: 'Ja. Jeder Downloader hat einen Schalter Video / Nur Audio. Nur Audio liefert eine M4A-Datei.',
      },
      {
        q: 'Speichern Sie die Videos, die ich herunterlade?',
        a: 'Nein. Jedes Video wird auf unserem Server abgerufen, an Sie gesendet und gleich danach gelöscht.',
      },
      {
        q: 'Ist das Herunterladen von Videos legal?',
        a: 'Laden Sie nur Videos herunter, die Ihnen gehören oder die Sie nutzen dürfen. Das Herunterladen kann gegen die Nutzungsbedingungen einer Plattform verstoßen, und das Urheberrecht hängt davon ab, wo Sie leben.',
      },
    ],
  },
  footer: {
    tagline: 'SynthID-Entferner, Metadaten-Entferner und Downloader für YouTube, X, TikTok und Instagram.',
    open: 'Tools öffnen',
    disclaimer:
      'Bearbeiten und laden Sie nur Inhalte herunter, die Ihnen gehören oder die Sie nutzen dürfen, und kennzeichnen Sie KI-generierte Inhalte, wo die Regeln es verlangen. {site} ist nicht mit Google, YouTube, TikTok, X oder Instagram verbunden.',
    badges: 'Bekannt aus',
  },
  jsonLd: {
    name: '{site}: SynthID- und Metadaten-Entferner',
    alternateName: ['SynthID entfernen', 'SynthID aus KI-Videos entfernen', 'Metadaten-Entferner', 'YouTube-Downloader', 'X-Video-Downloader', 'TikTok-Downloader', 'Instagram-Downloader'],
    browserRequirements: 'Erfordert einen modernen Browser mit JavaScript.',
    operatingSystem: 'Beliebig (Webbrowser)',
    description:
      'Entfernen Sie EXIF-, GPS-, XMP-, IPTC- und C2PA-Metadaten aus KI-Videos und -Fotos (Google Veo, Gemini, Sora, ChatGPT, Higgsfield und mehr) und stören Sie SynthID-Wasserzeichen, auf einem Server oder auf Ihrem Gerät. Ergebnisse sind nicht garantiert. Mit Downloadern für YouTube, TikTok, X und Instagram.',
    keywords:
      'SynthID entfernen, SynthID Entferner, SynthID aus KI-Videos entfernen, KI-Wasserzeichen entfernen, C2PA entfernen, Metadaten entfernen, Veo, Gemini, Sora, ChatGPT, Higgsfield',
    featureList: [
      'SynthID-Entfernung für Fotos und Videos',
      'Metadaten-Entferner für EXIF, GPS, XMP, IPTC, ICC und C2PA',
      'Verarbeitung auf dem Gerät möglich',
      'YouTube-Downloader (MP4 bis 1080p oder M4A-Audio)',
      'TikTok-Downloader',
      'Video-Downloader für X und Instagram',
    ],
  },
};
