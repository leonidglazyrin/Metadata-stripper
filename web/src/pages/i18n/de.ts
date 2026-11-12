import type { PagesTranslation } from './types';
import type { Section } from '../guides';

const LEGAL_DL: Section = {
  h: 'Ist das legal?',
  blocks: [
    {
      p: 'Lade nur Videos herunter, die du selbst gemacht hast, die zur Weiterverwendung lizenziert sind (zum Beispiel Creative Commons) oder für die dir der Urheber die Erlaubnis gegeben hat. Die Nutzungsbedingungen der meisten Plattformen schränken das Herunterladen ein, und das Urheberrecht ist von Land zu Land verschieden. Ein Video zu speichern gibt dir nicht das Recht, es erneut hochzuladen, und {site} ist mit keiner dieser Plattformen verbunden.',
    },
  ],
};

export const de: PagesTranslation = {
  ui: {
    locale: 'de-DE',
    kind: { synthid: 'SynthID-Anleitung', privacy: 'Datenschutz-Anleitung', download: 'Download-Anleitung' },
    stepsTitle: 'Schritt für Schritt mit {site}',
    questions: 'Häufige Fragen',
    related: 'Ähnliche Anleitungen',
    contents: 'Auf dieser Seite',
    updated: 'Aktualisiert am',
    home: 'Start',
    guides: 'Anleitungen',
    pricing: 'Preise',
    openTools: 'Tools öffnen',
    navLabel: 'Hauptmenü',
    breadcrumb: 'Brotkrümelnavigation',
    language: 'Sprache',
    footer: {
      tagline: 'Metadaten-, C2PA- und SynthID-Entferner sowie Downloader für YouTube, TikTok, X und Instagram.',
      open: 'Tools öffnen',
      synthidGuides: 'SynthID-Anleitungen',
      privacyGuides: 'Datenschutz-Anleitungen',
      downloadGuides: 'Download-Anleitungen',
      allGuides: 'Alle Anleitungen',
      privacyPolicy: 'Datenschutzerklärung (Englisch)',
      terms: 'Nutzungsbedingungen (Englisch)',
      disclaimer:
        'Bearbeite und lade nur Inhalte herunter, die dir gehören oder für die du eine Erlaubnis hast, und kennzeichne KI-generierte Inhalte, wo es die Regeln verlangen. {site} ist nicht mit Google, YouTube, TikTok, X, Instagram oder Meta verbunden.',
    },
    index: {
      metaTitle: 'Anleitungen: SynthID, Metadaten und Video-Downloads',
      description:
        'Anleitungen zu SynthID und KI-Wasserzeichen, zum Entfernen von GPS-, EXIF- und C2PA-Daten aus Fotos und Videos und zum Herunterladen von YouTube-, TikTok-, X- und Instagram-Videos.',
      title: ['Anleitungen', 'von {site}.'],
      lede: 'Schritt-für-Schritt-Anleitungen, um Metadaten aus deinen Dateien zu entfernen und Videos herunterzuladen, mit den eingebauten Optionen deines Handys oder Computers und mit den {site}-Tools.',
      groups: {
        synthid: {
          title: 'SynthID und KI-Wasserzeichen',
          text: 'Was Googles unsichtbares SynthID-Wasserzeichen ist und wie du es abschwächst und die Metadaten von Bildern und Videos aus Veo, Gemini und Imagen entfernst, damit Plattformen sie nicht mehr als KI markieren.',
        },
        privacy: {
          title: 'Datenschutz und Metadaten',
          text: 'Entferne die versteckten Daten in Fotos und Videos: Standort, Geräteangaben, Datum, Bearbeitungsverlauf und C2PA Content Credentials.',
        },
        download: {
          title: 'Video-Downloads',
          text: 'Speichere öffentliche Videos von YouTube, TikTok, X und Instagram als MP4 oder nur den Ton als M4A.',
        },
      },
    },
    promo: {
      eyebrow: 'Tarife',
      title: ['Jede Datei bereinigen.', 'Ab 2 $.'],
      text: 'Deine ersten Bereinigungen und Downloads sind kostenlos. Danach teste 10 SynthID-Bereinigungen für 2 $ oder nutze alles unbegrenzt mit Basic oder Pro.',
      orYearly: 'oder {price} / Jahr',
      seePlans: 'Alle Tarife vergleichen',
    },
  },
  guides: {
    'what-is-synthid': {
      title: 'Was ist SynthID? Googles unsichtbares KI-Wasserzeichen erklärt',
      metaTitle: 'Was ist SynthID? Googles KI-Wasserzeichen erklärt',
      description:
        'SynthID ist das unsichtbare Wasserzeichen von Google DeepMind für KI-Bilder, -Videos, -Audio und -Texte. Wie es funktioniert, wie man es prüft, der Unterschied zu C2PA und ob man es entfernen kann.',
      short: 'Was ist SynthID?',
      cta: 'SynthID aus einer Datei entfernen',
      stepsTitle: 'So entfernst du SynthID mit {site}',
      intro: [
        '**SynthID ist ein unsichtbares Wasserzeichen, das Google DeepMind in Inhalte einbettet, die mit Googles KI-Modellen erstellt wurden.** Es ist in die Pixel von Bildern und Videoframes, in die Wellenform von Audio und in die Wortwahl von Texten eingewoben. Man kann es weder sehen noch hören, und es bleibt in der Datei, auch wenn die Metadaten gelöscht werden. Ein passender Detektor kann es später auslesen und sagen, ob eine Datei mit Google-KI erstellt wurde.',
        'Bilder aus Gemini (einschließlich der Nano-Banana-Modelle) und Imagen, Videos aus Veo, Musik aus Lyria und Texte aus Gemini können SynthID enthalten. Diese Anleitung erklärt, wie das Wasserzeichen funktioniert, wie du eine Datei darauf prüfst, wie es sich von C2PA Content Credentials unterscheidet, was es für Creator bedeutet, die KI-Inhalte posten, und was du tun kannst und was nicht, um [SynthID zu entfernen](/app/#strip).',
      ],
      steps: [
        { name: 'Öffne den SynthID-Entferner', text: 'Gehe zum [Strip-Tab](/app/#strip) von {site} und melde dich mit Google an.' },
        { name: 'Füge dein Bild oder Video hinzu', text: 'Zieh Dateien aus Gemini, Imagen, Veo oder einem anderen Generator hinein. JPEG, PNG, WebP, HEIC, MP4, MOV und mehr werden unterstützt.' },
        { name: 'Wähle Server oder Dieses Gerät', text: 'Server kodiert große Videos etwa 4-mal schneller neu und löscht sie direkt danach. Dieses Gerät lädt die Datei nie hoch.' },
        { name: 'Lade die bereinigte Kopie herunter', text: 'Die Metadaten, C2PA eingeschlossen, werden entfernt und das SynthID-Wasserzeichen wird abgeschwächt. Jede Datei zeigt, was entfernt wurde.' },
      ],
      sections: [
        {
          h: 'SynthID im Überblick',
          blocks: [
            {
              ul: [
                '**Entwickelt von:** Google DeepMind. Im August 2023 für Bilder aus Imagen veröffentlicht, danach auf Video, Audio und Text ausgeweitet.',
                '**Was es markiert:** Inhalte, die Googles KI-Modelle erzeugen, etwa Gemini, Nano Banana, Imagen, Veo und Lyria. Laut Google wurden über 10 Milliarden Inhalte markiert.',
                '**Wo es steckt:** im Inhalt selbst (Pixel, Frames, Ton oder Wortwahl), nicht in den Metadaten.',
                '**Sichtbar?** Nein. Die Änderungen sind zu klein, um sie zu sehen oder zu hören.',
                '**Wer es lesen kann:** Googles SynthID Detector und die Prüffunktionen in Google-Produkten wie der Gemini-App.',
                '**Lässt es sich entfernen?** Es ist darauf ausgelegt, gängige Bearbeitungen zu überstehen, und lässt sich daher nicht wie ein Metadaten-Tag löschen. Neu kodieren kann es abschwächen, ohne Garantie.',
              ],
            },
          ],
        },
        {
          h: 'So funktioniert SynthID',
          blocks: [
            { p: 'SynthID ist kein Stempel, der auf eine fertige Datei gesetzt wird. Es wird angewendet, während der Inhalt erzeugt wird, mit zwei gemeinsam trainierten neuronalen Netzen: Das eine macht winzige Änderungen, die ein Muster codieren, das andere lernt, dieses Muster wiederzufinden, auch nachdem die Datei verändert wurde.' },
            {
              ul: [
                '**Bilder:** Die Werte vieler Pixel werden leicht verschoben, sodass ein Muster über das ganze Bild verteilt entsteht. Kein Bereich enthält es allein, deshalb entfernt ein Zuschnitt es nicht.',
                '**Video:** Jeder Frame wird wie ein Bild markiert. Deshalb übersteht das Wasserzeichen das Kürzen eines Clips oder eine geänderte Bildrate. Veo-Videos tragen es in jedem Frame.',
                '**Audio:** Das Muster wird so in den Ton eingefügt, dass das Ohr es nicht bemerkt, und soll MP3-Kompression, zusätzliches Rauschen und Tempoänderungen überstehen.',
                '**Text:** Während Gemini schreibt, verschiebt SynthID leicht die Wahrscheinlichkeit des nächsten Worts. Über einen längeren Text ergeben diese Entscheidungen ein statistisches Signal. Google hat die Textversion als Open Source veröffentlicht, damit andere Entwickler sie nutzen können.',
              ],
            },
            { p: 'Weil das Wasserzeichen Teil des Inhalts ist, hängt es nicht vom Dateiformat ab. Ein PNG als JPEG speichern, ein Video auf eine Plattform hochladen, die es neu komprimiert, oder einen Screenshot machen lässt es meist lesbar.' },
          ],
        },
        {
          h: 'SynthID vs. C2PA Content Credentials vs. Metadaten',
          blocks: [
            { p: 'KI-Dateien tragen oft mehrere Kennzeichnungen gleichzeitig, und jede wird anders entfernt:' },
            {
              ul: [
                '**SynthID** ist ein unsichtbares Wasserzeichen in den Pixeln oder im Ton. Metadaten löschen berührt es nicht. Es lässt sich nur abschwächen, indem man den Inhalt selbst verändert.',
                '**C2PA Content Credentials** sind ein signierter Eintrag in den Metadaten der Datei, der angibt, welches Tool sie erstellt hat und wie sie bearbeitet wurde. Plattformen wie TikTok lesen ihn, um automatisch ein „KI-generiert“-Label einzuschalten. Eine Metadaten-Bereinigung entfernt ihn vollständig. Siehe [was C2PA ist und wie man es entfernt](/guides/remove-c2pa-content-credentials/).',
                '**IPTC- und XMP-Tags** wie das Feld „Digital Source Type“ sind normale Metadaten, mit denen manche Generatoren ein Bild als KI-erzeugt kennzeichnen. Siehe [EXIF und Metadaten entfernen](/guides/remove-exif-data-from-photos/).',
                '**Sichtbare Wasserzeichen** wie das Funkel-Logo in einer Ecke sind ins Bild gezeichnet und wieder etwas anderes.',
              ],
            },
            { p: 'Google setzt SynthID und C2PA bei manchen Produkten gemeinsam ein: Die Metadaten lassen sich schnell prüfen, gehen aber leicht verloren; das Wasserzeichen ist schwerer zu entfernen, braucht aber einen Detektor zum Auslesen.' },
          ],
        },
        {
          h: 'So prüfst du, ob ein Bild oder Video SynthID enthält',
          blocks: [
            {
              ul: [
                '**SynthID Detector:** Googles Prüfportal. Lade ein Bild, Video oder eine Audiodatei hoch, und es meldet, ob ein SynthID-Wasserzeichen gefunden wurde; bei Bildern kann es die Bereiche markieren, in denen es am wahrscheinlichsten ist.',
                '**Die Gemini-App:** Lade ein Bild oder Video hoch und frage, ob es mit Google-KI erstellt wurde. Gemini sucht nach SynthID und antwortet im Chat.',
                '**Content Credentials Verify:** [contentcredentials.org/verify](https://contentcredentials.org/verify) zeigt C2PA-Metadaten, nicht SynthID. Eine Datei kann die eine Prüfung bestehen und die andere nicht.',
              ],
            },
            { note: 'Ein Ergebnis „nicht gefunden“ beweist nicht, dass ein Mensch die Datei erstellt hat. SynthID markiert nur Inhalte von Modellen, die es nutzen, und eine stark bearbeitete Datei kann ein lesbares Signal verlieren. Ebenso kann ein Detektor nur sagen, dass ein Wasserzeichen wahrscheinlich vorhanden ist; das beweist nicht, wer die Datei erstellt hat.' },
          ],
        },
        {
          h: 'Was SynthID übersteht und was es schwächt',
          blocks: [
            { p: 'Google hat SynthID so entworfen, dass es die alltäglichen Bearbeitungen beim Teilen übersteht: Kompression, Größenänderung, leichtes Zuschneiden, Farb- und Helligkeitsänderungen, Filter, Formatwechsel und bei Video eine andere Bildrate. Das unterscheidet es von Metadaten, die verschwinden, sobald viele Apps die Datei neu speichern.' },
            { p: 'Unzerstörbar ist es nicht. Google selbst sagt, dass starke Änderungen an einem Bild oder viele Bearbeitungen eines Texts das Signal so schwächen können, dass der Detektor nicht mehr sicher ist. Forschende haben auch Angriffe auf ähnliche Wasserzeichen-Verfahren veröffentlicht. Je stärker die Pixel verändert werden, desto schwächer wird das Wasserzeichen, aber desto mehr kann auch das Bild leiden. Ein guter SynthID-Entferner soll daher jedes Pixel verändern und das Bild trotzdem gleich aussehen lassen.' },
          ],
        },
        {
          h: 'Warum SynthID für Creator wichtig ist',
          blocks: [
            { p: 'Wenn du KI-Bilder oder -Videos postest, erfahren Plattformen und Zuschauer über SynthID und C2PA davon. TikTok, Instagram, YouTube und andere durchsuchen Uploads nach Content Credentials und Wasserzeichen und können bei einem Fund ein KI-Label hinzufügen, das du nicht abschalten kannst. Auch die Regeln werden strenger: In der EU verpflichten die Transparenzpflichten des AI Act (Artikel 50), die seit August 2026 gelten, KI-Anbieter, erzeugte Inhalte maschinenlesbar zu kennzeichnen, und SynthID ist eine Möglichkeit, wie Google das tut.' },
            { p: 'Das Entfernen dieser Signale hebt deine eigene Pflicht nicht auf, KI-Inhalte offenzulegen, wo eine Plattform oder das Gesetz es verlangt. Es gibt dir aber die Entscheidung zurück, wann und wie du deine Arbeit kennzeichnest, statt eines automatischen Labels auf jedem Post.' },
          ],
        },
        {
          h: 'Kann man SynthID entfernen?',
          blocks: [
            { p: 'SynthID lässt sich nicht wie ein Metadaten-Tag löschen, weil es keinen separaten Block zum Herausschneiden gibt. Man kann aber jedes Pixel oder Sample gerade so weit verändern, dass das Muster nicht mehr passt, während das Bild für das Auge gleich bleibt. Genau das macht der [SynthID-Entferner von {site}](/app/#strip):' },
            {
              ul: [
                '**Bilder:** Ein nahezu verlustfreies Resampling, eine Spur Rauschen und eine sanfte Schärfung verschieben jedes Pixel, danach wird das Bild in hoher Qualität neu gespeichert.',
                '**Videos:** Eine hochwertige Neukodierung (CRF 18) mit leichter Unschärfe, passender Schärfung und etwas Rauschen, das sich zwischen den Frames ändert; der Ton wird leicht neu gesampelt.',
                '**Metadaten:** EXIF, GPS, XMP, IPTC und C2PA Content Credentials werden bei jeder Datei vollständig entfernt.',
              ],
            },
            { note: 'SynthID ist darauf ausgelegt, Bearbeitungen zu überstehen, daher kann kein Tool versprechen, dass ein Detektor es übersieht. {site} schwächt das Wasserzeichen so stark wie möglich, ohne die Datei sichtbar zu verändern. Die Metadaten, C2PA eingeschlossen, werden immer vollständig entfernt.' },
            { p: 'Schritt-für-Schritt-Anleitungen für jeden Generator: [Google-Veo-Videos](/guides/remove-synthid-from-google-veo/), [Gemini- und Nano-Banana-Bilder](/guides/remove-synthid-from-gemini-images/), [Imagen-Bilder](/guides/remove-synthid-from-imagen-images/) und [Higgsfield-Dateien](/guides/remove-synthid-from-higgsfield/).' },
          ],
        },
      ],
      faq: [
        { q: 'Was ist SynthID, einfach erklärt?', a: 'SynthID ist ein verstecktes Wasserzeichen, das Google in die Bilder, Videos, Audios und Texte seiner KI einbaut. Du siehst es nicht, aber Googles Detektor kann es lesen und so erkennen, dass der Inhalt von Google-KI stammt.' },
        { q: 'Ist SynthID sichtbar?', a: 'Nein. Die Änderungen an Pixeln oder Ton sind zu klein, um sie zu sehen oder zu hören. Das Funkel-Logo auf manchen Gemini-Bildern ist ein separates, sichtbares Wasserzeichen.' },
        { q: 'Welche KI-Tools nutzen SynthID?', a: 'Googles eigene Modelle: Gemini und die Nano-Banana-Bildmodelle, Imagen, Veo, Lyria und Gemini-Text. Google bietet SynthID auch Partnern an, daher können auch Inhalte anderer Firmen es tragen. Die meisten anderen Generatoren wie Midjourney oder Sora nutzen stattdessen C2PA-Metadaten oder eigene Kennzeichnungen.' },
        { q: 'Entfernt das Löschen der Metadaten SynthID?', a: 'Nein. SynthID steckt in den Pixeln, nicht in den Metadaten, daher bleibt es beim Löschen von EXIF oder C2PA erhalten. Um es abzuschwächen, müssen die Pixel verändert werden, und genau das macht die SynthID-Bereinigung in {site}.' },
        { q: 'Entfernt ein Screenshot oder erneutes Speichern SynthID?', a: 'Meist nicht. Screenshots, Formatwechsel und Kompression lassen das Pixelmuster weitgehend intakt; SynthID wurde dafür gebaut, sie zu überstehen. Die meisten Metadaten entfernen sie aber.' },
        { q: 'Wie erkenne ich, ob ein Bild SynthID hat?', a: 'Lade es in Googles SynthID Detector hoch oder frage die Gemini-App, ob das Bild mit Google-KI erstellt wurde. Keines von beiden kann beweisen, dass eine Datei nicht mit KI gemacht wurde.' },
        { q: 'Ist SynthID dasselbe wie C2PA?', a: 'Nein. C2PA Content Credentials sind signierte Metadaten, die sich aus der Datei entfernen lassen. SynthID ist ein Wasserzeichen im Inhalt selbst. Viele Google-Dateien tragen beides. [{site}](/app/#strip) entfernt C2PA vollständig und schwächt SynthID ab.' },
        { q: 'Lässt sich SynthID komplett entfernen?', a: 'Nicht mit Sicherheit. Es ist darauf ausgelegt, Bearbeitungen zu überstehen, und Detektoren werden ständig besser. Neu kodieren mit kleinen Pixeländerungen, wie {site} es tut, schwächt es ab und erhält das Aussehen der Datei, aber kein Tool kann garantieren, dass ein Detektor es übersieht.' },
        { q: 'Ist es legal, SynthID zu entfernen?', a: 'Das hängt davon ab, wo du lebst und wie du die Datei nutzt. Bearbeite nur Inhalte, die dir gehören oder für die du eine Erlaubnis hast, und kennzeichne KI-generierte Inhalte, wo Gesetz oder Plattform es verlangen.' },
      ],
    },
    'remove-synthid-from-google-veo': {
      title: 'So entfernst du SynthID aus Google-Veo-Videos',
      metaTitle: 'SynthID aus Google-Veo-Videos entfernen',
      description:
        'Jedes Google-Veo-Video trägt ein unsichtbares SynthID-Wasserzeichen und C2PA Content Credentials. So schwächst du SynthID ab und entfernst die Metadaten, damit Plattformen es nicht mehr markieren.',
      short: 'SynthID aus Veo-Videos entfernen',
      cta: 'Jetzt ein Veo-Video bereinigen',
      intro: [
        'Google Veo schreibt ein unsichtbares [SynthID-Wasserzeichen](/guides/what-is-synthid/) in die Pixel jedes Videos, das es erzeugt, und fügt den Metadaten der Datei C2PA Content Credentials hinzu. Die Content Credentials liest zum Beispiel TikTok, um automatisch ein „KI-generiert“-Label einzuschalten; nach dem SynthID-Wasserzeichen sucht Googles eigener Detektor.',
        '{site} entfernt die Metadaten einschließlich des C2PA-Manifests und kodiert das Video neu, um das SynthID-Wasserzeichen zu stören, während Bild und Ton gleich bleiben. Kein Tool kann versprechen, dass ein Detektor ein Wasserzeichen übersieht, das Bearbeitungen überstehen soll, daher ist das Ergebnis nicht garantiert.',
      ],
      steps: [
        { name: 'Öffne den SynthID-Entferner', text: 'Gehe zum Strip-Tab von {site}.' },
        { name: 'Füge dein Veo-Video hinzu', text: 'Zieh die MP4 hinein. Metadaten und SynthID werden immer entfernt, du musst nichts einschalten.' },
        { name: 'Wähle Server für mehr Tempo', text: 'Server kodiert große Videos etwa 4-mal schneller neu und löscht sie direkt danach. Dieses Gerät behält die Datei im Browser, ist aber langsamer.' },
        { name: 'Lade die bereinigte Kopie herunter', text: 'Jede Datei zeigt, was entfernt wurde. Teile die bereinigte Kopie statt des Originals.' },
      ],
      sections: [
        {
          h: 'Was Veo in die Datei schreibt',
          blocks: [
            {
              ul: [
                'SynthID: ein unsichtbares Wasserzeichen auf Pixelebene im ganzen Video, das Größenänderung, Zuschnitt und Neukomprimierung überstehen soll.',
                'C2PA Content Credentials: ein signiertes Manifest in den Metadaten, das festhält, dass die Datei mit Googles KI erstellt wurde.',
                'Container- und Encoder-Tags, Erstellungszeit und weitere Standard-Metadaten.',
              ],
            },
            { p: 'Mehr zum Manifest unter [was C2PA Content Credentials sind](/guides/remove-c2pa-content-credentials/), zum Rest unter [Metadaten aus Videos entfernen](/guides/remove-metadata-from-videos/).' },
          ],
        },
        {
          h: 'So schwächt {site} das Wasserzeichen',
          blocks: [
            { p: 'Das Video wird in visuell transparenter Qualität (CRF 18) mit minimaler Unschärfe, passender Schärfung und einer Spur Rauschen neu kodiert, das sich zwischen den Frames ändert. Dadurch wird jedes Pixel neu berechnet und das Raster des Wasserzeichens verschoben, während die Metadaten, C2PA eingeschlossen, komplett verworfen werden. Der Ton wird leicht neu gesampelt, um ein mögliches Audio-Wasserzeichen zu stören.' },
          ],
        },
        {
          h: 'Was es kann und was nicht',
          blocks: [
            { note: 'SynthID ist darauf ausgelegt, Bearbeitungen zu überstehen. {site} schwächt es ab, kann aber nicht garantieren, dass Googles Detektor oder der Klassifikator einer Plattform es übersieht. Die C2PA-Metadaten werden dagegen vollständig entfernt.' },
            { p: 'Das Entfernen dieser Signale hebt keine gesetzliche oder Plattform-Pflicht zur Kennzeichnung von KI-Inhalten auf. Halte dich an die Offenlegungsregeln jeder Plattform.' },
          ],
        },
      ],
      faq: [
        { q: 'Fügt Veo immer SynthID hinzu?', a: 'Ja. Google versieht die Bilder und Videos seiner Modelle, auch Veo, mit SynthID. Das Wasserzeichen ist unsichtbar und erscheint nicht im Bild.' },
        { q: 'Verliert das Veo-Video an Qualität?', a: 'Die SynthID-Bereinigung kodiert das Video neu, es ist also nicht Byte für Byte identisch, wird aber in hoher Qualität gespeichert und sieht beim normalen Anschauen gleich aus.' },
        { q: 'Markiert TikTok mein Veo-Video trotzdem als KI?', a: 'Möglicherweise. {site} entfernt die C2PA Content Credentials, die Plattformen lesen, aber Plattformen nutzen auch eigene Klassifikatoren und Wasserzeichen-Detektoren. Wir garantieren nicht, dass eine Datei ohne Label bleibt.' },
      ],
    },
    'remove-synthid-from-gemini-images': {
      title: 'So entfernst du SynthID aus Gemini-Bildern (Nano Banana)',
      metaTitle: 'SynthID aus Gemini-KI-Bildern entfernen',
      description:
        'Bilder aus Gemini und dem Nano-Banana-Modell tragen ein unsichtbares SynthID-Wasserzeichen und Metadaten. So störst du SynthID und entfernst die Metadaten in einem Schritt.',
      short: 'SynthID aus Gemini-Bildern entfernen',
      cta: 'Jetzt ein Gemini-Bild bereinigen',
      intro: [
        'Bilder, die mit Gemini erstellt wurden, auch mit dem Bildmodell Nano Banana, tragen Googles unsichtbares [SynthID-Wasserzeichen](/guides/what-is-synthid/) in den Pixeln und meist ein IPTC-Tag „Digital Source Type“ und weitere Metadaten, die sie als KI-generiert kennzeichnen.',
        '{site} rechnet das Bild neu und kodiert es erneut, um das SynthID-Wasserzeichen zu stören, und entfernt die kennzeichnenden Metadaten. Das Bild sieht gleich aus. Da SynthID für Bilder Größenänderungen und erneutes Speichern überstehen soll, kann ein Detektor es trotzdem finden; das Ergebnis ist nicht garantiert.',
      ],
      steps: [
        { name: 'Öffne den SynthID-Entferner', text: 'Gehe zum Strip-Tab von {site}.' },
        { name: 'Füge dein Gemini-Bild hinzu', text: 'Zieh das JPEG, PNG oder WebP hinein. Metadaten und SynthID werden immer entfernt.' },
        { name: 'Wähle Dieses Gerät oder Server', text: 'Dieses Gerät bereinigt das Bild im Browser, ohne es hochzuladen. Server ist bei großen Mengen schneller.' },
        { name: 'Lade die bereinigte Kopie herunter', text: 'Die Datei kommt ohne EXIF, XMP, IPTC und C2PA zurück, mit abgeschwächtem Wasserzeichen.' },
      ],
      sections: [
        {
          h: 'Was ein Gemini-Bild enthält',
          blocks: [
            {
              ul: [
                'SynthID: ein unsichtbares Wasserzeichen, über die Pixel verteilt.',
                'IPTC-Tags „Digital Source Type“ und XMP-Tags, die das Bild als KI-generiert kennzeichnen.',
                'Manchmal C2PA Content Credentials sowie die üblichen EXIF- und ICC-Daten.',
              ],
            },
          ],
        },
        {
          h: 'So stört {site} es',
          blocks: [
            { p: 'Das Bild wird mit einer nahezu verlustfreien Verkleinerung und Vergrößerung, einer sanften Schärfung und einer Spur additivem Rauschen neu berechnet und dann in hoher Qualität gespeichert. Das verschiebt jedes Pixel und bringt das Raster des Wasserzeichens durcheinander, während jeder Metadatenblock (EXIF, XMP, IPTC und C2PA) entfernt wird.' },
          ],
        },
        {
          h: 'Warum es trotzdem erkannt werden kann',
          blocks: [
            { note: 'SynthID für Bilder soll Größenänderungen und Neukomprimierung überstehen, daher kann ein schwieriger Fall Googles Detektor auch nach der Bereinigung noch auslösen. {site} schwächt das Wasserzeichen so weit wie möglich, ohne das Bild sichtbar zu verändern; die Metadaten werden in jedem Fall entfernt.' },
          ],
        },
      ],
      faq: [
        { q: 'Ist Nano Banana hier dasselbe wie Gemini?', a: 'Ja. Nano Banana ist ein Gemini-Bildmodell, und seine Ausgaben tragen SynthID genauso. Es gelten dieselben Schritte.' },
        { q: 'Verändert das Entfernen von SynthID das Aussehen?', a: 'Nicht sichtbar. Resampling, Rauschen und Neukodierung sind nahezu verlustfrei, und das Bild sieht beim normalen Ansehen gleich aus.' },
        { q: 'Was, wenn das Bild immer noch als KI markiert wird?', a: 'Dann ist das Pixel-Wasserzeichen hartnäckig, nicht die Metadaten. EXIF-, XMP-, IPTC- und C2PA-Tags sind vollständig entfernt; das Wasserzeichen wird nur abgeschwächt, ohne Garantie.' },
      ],
    },
    'remove-synthid-from-imagen-images': {
      title: 'So entfernst du SynthID aus Google-Imagen-Bildern',
      metaTitle: 'SynthID aus Google-Imagen-Bildern entfernen',
      description:
        'Google Imagen versieht jedes Bild mit einem unsichtbaren SynthID-Wasserzeichen und KI-Metadaten. So schwächst du das Wasserzeichen ab und entfernst die Metadaten, damit dein Bild nicht markiert wird.',
      short: 'SynthID aus Imagen-Bildern entfernen',
      cta: 'Jetzt ein Imagen-Bild bereinigen',
      intro: [
        'Imagen ist Googles Text-zu-Bild-Modell, das in Gemini, ImageFX und anderen Google-Apps steckt. Jedes Bild, das es erzeugt, trägt ein unsichtbares [SynthID-Wasserzeichen](/guides/what-is-synthid/) in den Pixeln, dazu Metadaten (oft ein IPTC-Tag „Digital Source Type“ und C2PA Content Credentials), die es als KI-generiert kennzeichnen.',
        '{site} rechnet das Bild neu und kodiert es erneut, um SynthID zu stören, und entfernt alle Metadaten. Das Ergebnis sieht gleich aus. SynthID soll Bearbeitungen überstehen, daher kann ein Detektor es noch finden; die Metadaten werden aber sicher entfernt.',
      ],
      steps: [
        { name: 'Öffne den SynthID-Entferner', text: 'Gehe zum Strip-Tab von {site}.' },
        { name: 'Füge dein Imagen-Bild hinzu', text: 'Zieh die Datei hinein. Metadaten und SynthID werden immer entfernt.' },
        { name: 'Wähle Dieses Gerät oder Server', text: 'Dieses Gerät lädt die Datei nie hoch; Server ist bei Stapeln schneller und löscht die Dateien direkt danach.' },
        { name: 'Lade die bereinigte Kopie herunter', text: 'Teile die bereinigte Kopie, die zeigt, was entfernt wurde, statt des Originals.' },
      ],
      sections: [
        {
          h: 'Was Imagen einbettet',
          blocks: [
            {
              ul: [
                'SynthID: ein unsichtbares Wasserzeichen auf Pixelebene in jedem erzeugten Bild.',
                'IPTC-/XMP-Tags, darunter ein Feld „Digital Source Type“, das es als KI-generiert ausweist.',
                'C2PA Content Credentials bei manchen Diensten sowie Standard-EXIF- und ICC-Daten.',
              ],
            },
            { p: 'Was Foto-Metadaten alles verraten können, steht unter [EXIF und Metadaten entfernen](/guides/remove-exif-data-from-photos/).' },
          ],
        },
        {
          h: 'So funktioniert die Bereinigung',
          blocks: [
            { p: 'Ein nahezu verlustfreies Resampling verschiebt jedes Pixel, eine sanfte Schärfung stellt die Schärfe wieder her, und eine Spur Rauschen bringt das Raster des Wasserzeichens durcheinander. Anschließend wird das Bild in hoher Qualität ganz ohne Metadaten neu kodiert: EXIF, XMP, IPTC und C2PA sind weg.' },
          ],
        },
        {
          h: 'Grenzen',
          blocks: [
            { note: 'Kein Tool kann garantieren, dass ein SynthID-Detektor ein Wasserzeichen übersieht, das Bearbeitungen überstehen soll. {site} schwächt es ab; die Metadaten werden sicher entfernt. Offenlegungsregeln für KI-Inhalte gelten weiterhin.' },
          ],
        },
      ],
      faq: [
        { q: 'Wo wird Imagen eingesetzt?', a: 'Imagen erzeugt Bilder in Gemini, ImageFX und anderen Google-Tools. Bilder aus allen davon tragen SynthID und lassen sich gleich bereinigen.' },
        { q: 'Entfernt das ein sichtbares Wasserzeichen?', a: 'Nein. {site} stört das unsichtbare SynthID-Wasserzeichen und entfernt Metadaten. Sichtbare Logos oder ins Bild gezeichnete Wasserzeichen entfernt es nicht.' },
        { q: 'Ändern sich die Farben?', a: 'Nein. Imagen gibt sRGB aus, daher verschiebt das Entfernen des Farbprofils die Farben nicht.' },
      ],
    },
    'remove-synthid-from-higgsfield': {
      title: 'So entfernst du SynthID und C2PA aus Higgsfield-Videos und -Bildern',
      metaTitle: 'SynthID und C2PA aus Higgsfield-Dateien entfernen',
      description:
        'Higgsfield nutzt mehrere KI-Modelle, daher können seine Dateien ein SynthID-Wasserzeichen, C2PA Content Credentials oder beides tragen. So bereinigst du sie, damit Plattformen sie nicht mehr markieren.',
      short: 'SynthID aus Higgsfield entfernen',
      cta: 'Jetzt eine Higgsfield-Datei bereinigen',
      intro: [
        'Higgsfield ist eine Plattform, die mehrere KI-Modelle unter einem Dach vereint, darunter Google Veo. Was in deiner Datei landet, hängt vom Modell ab: Ein mit Veo erstelltes Video trägt Googles unsichtbares [SynthID-Wasserzeichen](/guides/what-is-synthid/), und die meisten Generatoren fügen außerdem C2PA Content Credentials zu den Metadaten hinzu, die die Datei als KI-generiert kennzeichnen.',
        '{site} entfernt die Metadaten, C2PA eingeschlossen, und kodiert die Datei neu, um ein vorhandenes SynthID-Wasserzeichen zu stören, während Bild und Ton gleich bleiben. SynthID soll Bearbeitungen überstehen, daher kann kein Tool versprechen, dass ein Detektor es übersieht; das Ergebnis ist nicht garantiert.',
      ],
      steps: [
        { name: 'Öffne den SynthID-Entferner', text: 'Gehe zum Strip-Tab von {site}.' },
        { name: 'Füge deine Higgsfield-Datei hinzu', text: 'Zieh das Video oder Bild hinein. Lass die SynthID-Bereinigung eingeschaltet (sie ist standardmäßig an), damit auch eine Veo-Datei neu kodiert wird.' },
        { name: 'Wähle Server für mehr Tempo', text: 'Server kodiert große Videos etwa 4-mal schneller neu und löscht sie direkt danach. Dieses Gerät behält die Datei im Browser, ist aber langsamer.' },
        { name: 'Lade die bereinigte Kopie herunter', text: 'Jede Datei zeigt, was entfernt wurde. Teile die bereinigte Kopie statt des Originals.' },
      ],
      sections: [
        {
          h: 'Was eine Higgsfield-Datei enthalten kann',
          blocks: [
            {
              ul: [
                'SynthID: vorhanden, wenn die Datei mit einem Google-Modell wie Veo erstellt wurde. Es ist ein unsichtbares Wasserzeichen auf Pixelebene.',
                'C2PA Content Credentials: ein signiertes Manifest in den Metadaten, das festhält, dass die Datei KI-generiert ist. Siehe [C2PA entfernen](/guides/remove-c2pa-content-credentials/).',
                'Die üblichen Container-, Encoder-, EXIF- und Zeit-Metadaten.',
              ],
            },
            { p: 'Da Higgsfield Modelle mischt, weißt du vielleicht nicht, welches Wasserzeichen eine Datei hat. Mit eingeschalteter SynthID-Bereinigung sind beide Fälle abgedeckt: Die Metadaten werden immer entfernt, und die Neukodierung läuft für den Fall, dass SynthID vorhanden ist.' },
          ],
        },
        {
          h: 'So bereinigt {site} sie',
          blocks: [
            { p: 'Videos werden in visuell transparenter Qualität (CRF 18) mit minimaler Unschärfe, passender Schärfung und einer Spur Rauschen zwischen den Frames neu kodiert; Bilder werden neu berechnet, leicht verrauscht und geschärft und dann in hoher Qualität gespeichert. In beiden Fällen wird jeder Metadatenblock, C2PA eingeschlossen, verworfen. Das Ergebnis sieht gleich aus und spielt gleich ab.' },
          ],
        },
        {
          h: 'Was es kann und was nicht',
          blocks: [
            { note: 'SynthID ist darauf ausgelegt, Bearbeitungen zu überstehen. {site} schwächt es ab, kann aber nicht garantieren, dass ein Detektor oder der Klassifikator einer Plattform es übersieht. Die C2PA-Metadaten werden dagegen vollständig entfernt.' },
            { p: 'Das Entfernen dieser Signale hebt keine gesetzliche oder Plattform-Pflicht zur Kennzeichnung von KI-Inhalten auf. Halte dich an die Offenlegungsregeln jeder Plattform.' },
          ],
        },
      ],
      faq: [
        { q: 'Hat jede Higgsfield-Datei SynthID?', a: 'Nein. Nur Dateien, die mit einem Google-Modell wie Veo erstellt wurden, tragen SynthID. Dateien anderer Modelle auf Higgsfield tragen meist C2PA Content Credentials. {site} deckt beides ab: Metadaten werden immer entfernt, und die Neukodierung läuft, wenn die SynthID-Bereinigung an ist.' },
        { q: 'Verliert mein Higgsfield-Video an Qualität?', a: 'Die SynthID-Bereinigung kodiert das Video neu, es ist also nicht Byte für Byte identisch, wird aber in hoher Qualität gespeichert und sieht beim normalen Anschauen gleich aus.' },
        { q: 'Markiert TikTok mein Higgsfield-Video trotzdem als KI?', a: 'Möglicherweise. {site} entfernt die C2PA Content Credentials, die Plattformen lesen, aber Plattformen nutzen auch eigene Klassifikatoren und Wasserzeichen-Detektoren. Wir garantieren nicht, dass eine Datei ohne Label bleibt.' },
      ],
    },
    'download-youtube-videos': {
      title: 'So lädst du YouTube-Videos und Shorts als MP4 herunter',
      metaTitle: 'YouTube-Videos und Shorts herunterladen (MP4, 1080p)',
      description:
        'Speichere ein YouTube-Video oder einen Short als MP4 bis 1080p oder als M4A-Audio, indem du den Link einfügst. Funktioniert mit youtube.com-, youtu.be- und Shorts-Links. Ohne Installation.',
      short: 'YouTube-Videos und Shorts herunterladen',
      cta: 'YouTube-Downloader öffnen',
      intro: [
        'Am schnellsten speicherst du ein YouTube-Video, indem du den Link kopierst und in einen Downloader einfügst, der die Arbeit auf einem Server erledigt. {site} holt die beste Version bis 1080p, fügt Bild und Ton zu einer MP4 zusammen, die auf jedem Handy und Computer läuft, und schickt sie dir. Du kannst auch nur den Ton als M4A-Datei behalten.',
      ],
      steps: [
        { name: 'Kopiere den Link', text: 'Am Computer kopierst du die Adresse aus der Browserleiste. In der YouTube-App tippst du unter dem Video (oder auf einem Short) auf Teilen und wählst Link kopieren.' },
        { name: 'Öffne den YouTube-Downloader', text: 'Gehe zum YouTube-Tab von {site} und melde dich mit Google an.' },
        { name: 'Einfügen und Format wählen', text: 'Füge einen oder mehrere Links ein, einen pro Zeile. Lass den Schalter auf Video für eine MP4 oder wähle Nur Audio für eine M4A.' },
        { name: 'Herunterladen', text: 'Tippe auf Herunterladen. Jeder Link zeigt Titel und Fortschritt und dann einen Speichern-Button, sobald die Datei fertig ist.' },
      ],
      sections: [
        {
          h: 'Welche Links funktionieren',
          blocks: [
            {
              ul: [
                'Normale Videos: `youtube.com/watch?v=…`',
                'Kurzlinks: `youtu.be/…`',
                'Shorts: `youtube.com/shorts/…`',
                'Eingebettete Player: `youtube-nocookie.com/embed/…`',
                'Mobile Links: `m.youtube.com/…`',
              ],
            },
            { p: 'Links mit zusätzlichen Parametern wie einem Zeitstempel (`&t=42`) oder einer Playlist (`&list=…`) funktionieren: Du bekommst das Video aus dem Link. Ganze Playlists werden nicht auf einmal geladen; füge stattdessen die einzelnen Videolinks ein.' },
          ],
        },
        {
          h: 'Qualität und Format',
          blocks: [
            { p: 'YouTube speichert Bild und Ton bei den meisten Videos über 360p getrennt. Der Downloader wählt das beste H.264-Bild bis 1080p und den AAC-Ton und fügt beides zu einer MP4 zusammen. H.264 und AAC laufen überall: iPhone, Android, Windows, Mac, Schnitt-Apps und soziale Netzwerke.' },
            { p: 'Hat ein Video keine H.264-Version in 1080p, bekommst du die beste Version, die YouTube bis 1080p anbietet. Videos, die in niedrigerer Auflösung hochgeladen wurden, kommen in dieser Auflösung; ein Downloader kann keine Details hinzufügen, die nie hochgeladen wurden.' },
          ],
        },
        {
          h: 'Wenn ein Download fehlschlägt',
          blocks: [
            {
              ul: [
                'Private Videos und Videos nur für Kanalmitglieder lassen sich nicht herunterladen.',
                'Altersbeschränkte Videos und manche regional gesperrte Videos brauchen ein angemeldetes YouTube-Konto und können daher fehlschlagen.',
                'Livestreams lassen sich erst speichern, wenn sie beendet sind und YouTube sie verarbeitet hat.',
                'Premieren, die noch nicht begonnen haben, haben nichts zum Herunterladen.',
              ],
            },
          ],
        },
        LEGAL_DL,
      ],
      faq: [
        { q: 'Kann ich YouTube Shorts herunterladen?', a: 'Ja. Füge einen youtube.com/shorts/-Link wie ein normales Video ein, und du bekommst eine vertikale MP4.' },
        { q: 'Kann ich nur den Ton herunterladen?', a: 'Ja. Stell den Schalter auf Nur Audio, und du bekommst den Ton als M4A-Datei. Wenn die Plattform AAC-Audio speichert, wird es ohne Neukodierung kopiert.' },
        { q: 'Warum ist das Video 1080p und nicht 4K?', a: 'Der Downloader begrenzt Videos auf 1080p, damit die Dateien klein bleiben und überall laufen. Die meisten Handys und sozialen Netzwerke zeigen Videos in 1080p oder weniger.' },
        { q: 'Muss ich etwas installieren?', a: 'Nein. Alles läuft im Browser und auf dem {site}-Server, auf jedem Handy oder Computer.' },
      ],
    },
    'download-tiktok-videos': {
      title: 'So lädst du TikTok-Videos als MP4 herunter',
      metaTitle: 'TikTok-Videos herunterladen (MP4 oder Ton als M4A)',
      description:
        'Speichere ein öffentliches TikTok-Video als MP4 oder seinen Ton als M4A über einen tiktok.com-, vm.tiktok.com- oder vt.tiktok.com-Link. Schritt für Schritt, am Handy oder Computer.',
      short: 'TikTok-Videos herunterladen',
      cta: 'TikTok-Downloader öffnen',
      intro: [
        'TikTok bietet den Button Video speichern nur an, wenn der Creator es erlaubt, und die gespeicherte Kopie trägt ein wanderndes Wasserzeichen. Fügst du den Link stattdessen in {site} ein, bekommst du von jedem öffentlichen Video eine MP4-Datei oder nur den Ton als M4A.',
      ],
      steps: [
        { name: 'Kopiere den Link', text: 'Tippe in der TikTok-App auf Teilen (der Pfeil rechts) und wähle Link kopieren. Am Computer kopierst du die Adresse der Videoseite.' },
        { name: 'Öffne den TikTok-Downloader', text: 'Gehe zum TikTok-Tab von {site} und melde dich mit Google an.' },
        { name: 'Füge den Link ein', text: 'Füge einen Link oder mehrere in getrennten Zeilen ein. Wähle Video für MP4 oder Nur Audio für den Ton als M4A.' },
        { name: 'Speichere die Datei', text: 'Tippe auf Herunterladen und speichere jede Datei, sobald sie fertig ist. Am iPhone öffnest du die Datei und nutzt Teilen und dann Video sichern, um sie in Fotos abzulegen.' },
      ],
      sections: [
        {
          h: 'Welche Links funktionieren',
          blocks: [
            {
              ul: [
                'Vollständige Links: `tiktok.com/@konto/video/…`',
                'Teilen-Links aus der App: `vm.tiktok.com/…` und `vt.tiktok.com/…`',
                'Links der mobilen Website: `m.tiktok.com/…`',
              ],
            },
            { p: 'Kurzlinks werden bis zum Video verfolgt, auf das sie zeigen, du kannst also genau das einfügen, was die App kopiert.' },
          ],
        },
        {
          h: 'Was du bekommst',
          blocks: [
            { p: 'Das Video kommt als MP4 in der Qualität, die TikTok ausliefert, bevorzugt in H.264, damit es überall läuft.' },
            { p: 'Nur Audio speichert den Soundtrack des Videos als M4A-Datei. Bei einem Trend-Sound, der in vielen Videos verwendet wird, funktioniert jedes Video, das ihn nutzt.' },
          ],
        },
        {
          h: 'Was nicht funktioniert',
          blocks: [
            {
              ul: [
                'Videos von privaten Konten und Videos, die nur mit Freunden geteilt sind.',
                'Gelöschte Videos oder Videos, die in der Region des Servers nicht verfügbar sind.',
                'Livestreams und Foto-Slideshows (Karussells aus Standbildern).',
              ],
            },
          ],
        },
        LEGAL_DL,
      ],
      faq: [
        { q: 'Funktionieren vm.tiktok.com-Kurzlinks?', a: 'Ja. Füge vm.tiktok.com- oder vt.tiktok.com-Links direkt aus dem Link-kopieren-Button der App ein.' },
        { q: 'Kann ich nur den Ton herunterladen?', a: 'Ja. Stell den Schalter auf Nur Audio, um den Soundtrack als M4A zu bekommen.' },
        { q: 'Kann ich private TikTok-Videos herunterladen?', a: 'Nein. Nur öffentliche Videos werden unterstützt.' },
        { q: 'Wird der Creator benachrichtigt?', a: 'Nein. {site} liest die öffentliche Videoseite so, wie ein Browser es tut; auf TikTok wird nichts gepostet.' },
      ],
    },
    'download-twitter-x-videos': {
      title: 'So lädst du Videos von X (Twitter) herunter',
      metaTitle: 'Videos von X (Twitter) als MP4 herunterladen',
      description:
        'Speichere das Video aus einem X-Post (Twitter) als MP4, indem du den Link zum Post einfügst. Funktioniert mit x.com- und twitter.com-Links, am Handy oder Computer.',
      short: 'Videos von X (Twitter) herunterladen',
      cta: 'X-Downloader öffnen',
      intro: [
        'X hat keinen Download-Button für Videos. Um eines zu behalten, kopiere den Link zum Post und füge ihn in {site} ein: Du bekommst das Video aus diesem Post als MP4, in der besten Qualität, die X ausliefert.',
      ],
      steps: [
        { name: 'Kopiere den Link zum Post', text: 'Tippe auf das Teilen-Symbol unter dem Post und wähle Link kopieren. Am Computer kannst du auch die Adresse der Post-Seite kopieren.' },
        { name: 'Öffne den X-Downloader', text: 'Gehe zum X-Tab von {site} und melde dich mit Google an.' },
        { name: 'Füge den Link ein', text: 'Füge einen oder mehrere Post-Links ein. Wähle Video für MP4 oder Nur Audio für M4A.' },
        { name: 'Speichere die Datei', text: 'Tippe auf Herunterladen und speichere die Datei, sobald sie fertig ist.' },
      ],
      sections: [
        {
          h: 'Welche Links funktionieren',
          blocks: [
            {
              ul: [
                'Post-Links auf beiden Domains: `x.com/konto/status/…` oder `twitter.com/konto/status/…`',
                'Links von Embed-Fix-Diensten: `fxtwitter.com`, `vxtwitter.com`, `fixupx.com`',
              ],
            },
            { p: 'Füge den Link des Posts ein, der das Video enthält. Wenn du eine Antwort oder ein Zitat siehst, öffne zuerst den Original-Post und kopiere dessen Link. Animierte GIFs speichert X als kurze Videos, daher werden sie ebenfalls als MP4 heruntergeladen.' },
          ],
        },
        {
          h: 'Wenn ein Download fehlschlägt',
          blocks: [
            {
              ul: [
                'Posts von geschützten (privaten) Konten lassen sich nicht herunterladen.',
                'Als sensibel markierte, altersbeschränkte und manche Posts, die X nur angemeldeten Nutzern zeigt, können fehlschlagen.',
                'Gelöschte Posts und gesperrte Konten haben nichts mehr zum Herunterladen.',
                'Ein Post, der nur auf ein YouTube-Video verlinkt, enthält kein X-Video; nutze stattdessen den [YouTube-Downloader](/guides/download-youtube-videos/).',
              ],
            },
          ],
        },
        LEGAL_DL,
      ],
      faq: [
        { q: 'Funktionieren twitter.com-Links noch?', a: 'Ja. x.com- und twitter.com-Links funktionieren beide.' },
        { q: 'Welche Qualität bekomme ich?', a: 'Die höchste Qualität, die X für dieses Video bereitstellt, als MP4 mit H.264-Bild, wo möglich.' },
        { q: 'Kann ich Videos von privaten Konten herunterladen?', a: 'Nein. Nur öffentliche Posts werden unterstützt.' },
      ],
    },
    'download-instagram-reels': {
      title: 'So lädst du Instagram-Reels und -Videos herunter',
      metaTitle: 'Instagram-Reels und -Videos herunterladen (MP4)',
      description:
        'Speichere ein öffentliches Instagram-Reel oder einen Video-Post als MP4, indem du den Link einfügst. Schritt für Schritt für iPhone, Android und Computer. Private Konten werden nicht unterstützt.',
      short: 'Instagram-Reels herunterladen',
      cta: 'Instagram-Downloader öffnen',
      intro: [
        'Instagram lässt dich Beiträge in der App speichern, aber nicht als Dateien, die du behalten oder schneiden kannst. Um ein Reel oder einen Video-Post als MP4 zu bekommen, kopiere den Link und füge ihn in {site} ein. Das funktioniert nur bei öffentlichen Beiträgen.',
      ],
      steps: [
        { name: 'Kopiere den Link', text: 'Tippe in der Instagram-App beim Reel oder Beitrag auf das Papierflieger-Symbol und dann auf Link kopieren. Am Computer kopierst du die Adresse der Beitragsseite.' },
        { name: 'Öffne den Instagram-Downloader', text: 'Gehe zum Instagram-Tab von {site} und melde dich mit Google an.' },
        { name: 'Füge den Link ein', text: 'Füge einen oder mehrere Links ein. Wähle Video für MP4 oder Nur Audio für M4A.' },
        { name: 'Speichere die Datei', text: 'Tippe auf Herunterladen und speichere die Datei. Am iPhone öffnest du sie und nutzt Teilen und dann Video sichern, um sie zu Fotos hinzuzufügen.' },
      ],
      sections: [
        {
          h: 'Welche Links funktionieren',
          blocks: [
            {
              ul: [
                'Reels: `instagram.com/reel/…`',
                'Video-Posts: `instagram.com/p/…`',
                'Kurzlinks: `instagr.am/…`',
              ],
            },
          ],
        },
        {
          h: 'Private Videos sind nicht verfügbar',
          blocks: [
            { p: 'Der Downloader liest nur, was Instagram nicht angemeldeten Besuchern zeigt. Das schließt aus:' },
            {
              ul: [
                'Beiträge und Reels von privaten Konten.',
                'Stories, Highlights und Inhalte für Enge Freunde.',
                'Manche öffentliche Beiträge, die Instagram erst nach der Anmeldung zeigt, etwa altersbeschränkte Beiträge.',
              ],
            },
            { p: 'Schlägt ein Link mit einer Meldung über einen privaten Beitrag oder eine Anmeldung fehl, ist das Video für den Downloader nicht verfügbar.' },
          ],
        },
        {
          h: 'Karussells mit mehreren Videos',
          blocks: [{ p: 'Bei einem Beitrag mit mehreren Folien speichert der Downloader das Video, das er im Beitrag findet. Reine Foto-Beiträge haben kein Video zum Herunterladen.' }],
        },
        LEGAL_DL,
      ],
      faq: [
        { q: 'Kann ich Instagram-Stories herunterladen?', a: 'Nein. Stories brauchen eine angemeldete Instagram-Sitzung, die der Downloader nicht nutzt.' },
        { q: 'Kann ich von einem privaten Konto herunterladen?', a: 'Nein. Nur öffentliche Reels und Video-Posts werden unterstützt.' },
        { q: 'Kann ich nur die Musik eines Reels behalten?', a: 'Ja. Stell den Schalter auf Nur Audio, um den Soundtrack als M4A zu bekommen.' },
      ],
    },
    'download-audio-from-videos': {
      title: 'So lädst du Audio von YouTube, TikTok, X und Instagram herunter',
      metaTitle: 'Audio von YouTube, TikTok und Instagram laden (M4A)',
      description:
        'Behalte nur den Ton eines YouTube-, TikTok-, X- oder Instagram-Videos als M4A-Datei. Link einfügen, auf Nur Audio stellen und herunterladen. Keine App nötig.',
      short: 'Nur Audio herunterladen (M4A)',
      cta: 'Downloader öffnen',
      intro: [
        'Jeder {site}-Downloader hat einen Schalter Video / Nur Audio. Mit Nur Audio bekommst du den Original-Soundtrack des Videos als M4A-Datei: meist das AAC-Audio, das die Plattform schon speichert, ohne Neukodierung kopiert, also ohne Qualitätsverlust. Liefert eine Plattform einen anderen Codec, wird er in hoher Qualität in AAC umgewandelt.',
      ],
      steps: [
        { name: 'Kopiere den Videolink', text: 'Nutze Teilen und dann Link kopieren in der YouTube-, TikTok-, X- oder Instagram-App, oder kopiere am Computer die Seitenadresse.' },
        { name: 'Öffne den passenden Downloader', text: 'Wähle in {site} den Tab dieser Plattform.' },
        { name: 'Stell auf Nur Audio', text: 'Stell den Schalter über dem Linkfeld auf Nur Audio und füge den Link ein.' },
        { name: 'Lade die M4A herunter', text: 'Tippe auf Herunterladen und speichere die Datei. M4A läuft in Apple Music, VLC, dem Windows Media Player und den meisten Schnitt-Apps.' },
      ],
      sections: [
        {
          h: 'Warum M4A und nicht MP3',
          blocks: [
            { p: 'Diese Plattformen speichern Ton fast immer als AAC. M4A ist einfach AAC in einer MP4-artigen Datei, es kann also unverändert gespeichert werden. Eine Umwandlung in MP3 würde erneutes Dekodieren und Komprimieren bedeuten, was etwas Qualität kostet und nichts bringt: Jedes aktuelle Handy, jeder Computer und jede Schnitt-App spielt M4A ab.' },
            { p: 'Brauchst du eine MP3 für ein altes Gerät, wandle die M4A mit einem kostenlosen Tool wie VLC (Medien → Konvertieren / Speichern) oder ffmpeg um:' },
            { code: 'ffmpeg -i sound.m4a -c:a libmp3lame -q:a 2 sound.mp3' },
          ],
        },
        {
          h: 'Du hast das Video schon?',
          blocks: [{ p: 'Jeder fertige Video-Download in {site} hat außerdem einen Button Audio holen, der den Soundtrack aus der gerade geladenen MP4 zieht.' }],
        },
        LEGAL_DL,
      ],
      faq: [
        { q: 'Wird das Audio neu kodiert?', a: 'Nicht, wenn die Plattform AAC liefert, was der Normalfall ist: Die Spur wird unverändert in eine M4A-Datei kopiert. Andere Codecs werden in AAC umgewandelt.' },
        { q: 'Kann ich eine ganze Playlist als Audio laden?', a: 'Nicht auf einmal. Füge die einzelnen Videolinks ein, einen pro Zeile.' },
      ],
    },
    'remove-gps-location-from-photos': {
      title: 'So entfernst du den GPS-Standort aus Fotos',
      metaTitle: 'GPS-Standort aus Fotos entfernen (iPhone, Android, PC)',
      description:
        'Fotos können den genauen Aufnahmeort speichern. So prüfst du, ob GPS-Daten enthalten sind, und entfernst sie auf iPhone, Android, Windows und Mac oder in einem Schritt für jedes Foto.',
      short: 'GPS-Standort aus Fotos entfernen',
      cta: 'Standortdaten jetzt entfernen',
      intro: [
        'Die meisten Handys speichern in jedem Foto den genauen Breiten- und Längengrad, oft auf wenige Meter genau. Wer die Originaldatei bekommt, kann ihn auslesen und eine Stecknadel auf der Karte setzen: dein Zuhause, deine Schule, deinen Arbeitsplatz. Manche Apps entfernen ihn beim Posten, aber E-Mail, Messenger mit „Originalqualität“, Cloud-Links und Kleinanzeigen-Seiten behalten ihn oft.',
        'Diese Anleitung zeigt, wie du ein Foto auf Standortdaten prüfst und sie entfernst, entweder mit den Einstellungen deines Handys oder Computers oder in einem Schritt mit dem Metadaten-Entferner von {site}.',
      ],
      steps: [
        { name: 'Öffne den Metadaten-Entferner', text: 'Gehe zum Strip-Tab von {site}.' },
        { name: 'Füge deine Fotos hinzu', text: 'Zieh ein oder viele Fotos hinein: JPEG, PNG, WebP, HEIC, AVIF, TIFF oder GIF.' },
        { name: 'Wähle, wo es läuft', text: 'Wähle Dieses Gerät, um die Dateien im Browser zu bereinigen, ohne sie hochzuladen, oder Server, um sie auf {site} zu verarbeiten und direkt danach löschen zu lassen.' },
        { name: 'Lade die bereinigten Kopien herunter', text: 'Alle Metadaten, auch der GPS-Block, werden aus jeder Datei entfernt. Lade die bereinigte Kopie herunter und teile sie statt des Originals.' },
      ],
      sections: [
        {
          h: 'Wo der Standort gespeichert ist',
          blocks: [
            { p: 'In JPEG-, HEIC- und TIFF-Fotos steckt der Standort im EXIF-GPS-Block: Breite, Länge, Höhe, Blickrichtung der Kamera und ein GPS-Zeitstempel. Bearbeitungs-Apps können ihn auch in XMP-Metadaten kopieren, und manche Handys schreiben ihn zusätzlich in die Metadaten des eingebetteten Vorschaubilds. Wer nur eine dieser Stellen löscht, lässt die anderen stehen; deshalb ist eine vollständige Bereinigung sicherer als das Löschen eines einzelnen Felds.' },
          ],
        },
        {
          h: 'So prüfst du, ob ein Foto einen Standort hat',
          blocks: [
            {
              ul: [
                'iPhone: Öffne das Foto in Fotos und wische nach oben. Erscheint eine Karte, hat das Foto einen Standort.',
                'Android (Google Fotos): Öffne das Foto, wische nach oben und achte auf eine Karte oder einen Ortsnamen.',
                'Windows: Rechtsklick auf die Datei, Eigenschaften, Tab Details, und unter GPS nachsehen.',
                'Mac: Öffne es in Vorschau, Werkzeuge und dann Informationen einblenden, und suche nach einem GPS-Tab.',
              ],
            },
          ],
        },
        {
          h: 'Mit den Einstellungen deines Handys oder Computers entfernen',
          blocks: [
            {
              ul: [
                'iPhone, beim Teilen: Fotos auswählen, Teilen tippen, oben auf Optionen tippen und Ort deaktivieren. Das gilt nur für dieses Teilen.',
                'iPhone, für künftige Fotos: Einstellungen, Datenschutz & Sicherheit, Ortungsdienste, Kamera, auf Nie stellen.',
                'Android: Öffne die Einstellungen der Kamera-App und schalte die Standort- oder Geotag-Option aus (der Name variiert je nach Handy). In Google Fotos gibt es unter Einstellungen und dann Teilen eine Option, den Standort aus per Link geteilten Elementen zu entfernen.',
                'Windows: Rechtsklick auf die Datei, Eigenschaften, Details, dann Eigenschaften und persönliche Informationen entfernen. Wähle, eine Kopie ohne alle möglichen Eigenschaften zu erstellen.',
                'Mac: In Vorschau Werkzeuge, Informationen einblenden, GPS-Tab, dann Ortsinformationen entfernen.',
              ],
            },
            { note: 'Diese eingebauten Optionen entfernen meist nur die GPS-Felder. Kameramodell, Seriennummer, Datum und Bearbeitungsverlauf bleiben in der Regel in der Datei.' },
          ],
        },
        {
          h: 'Mit exiftool entfernen (Kommandozeile)',
          blocks: [
            { p: 'Wenn du mit dem Terminal vertraut bist, entfernt das kostenlose exiftool den GPS-Block oder alles direkt in der Datei. Es legt eine Sicherung mit der Endung `_original` an.' },
            { code: 'exiftool -gps:all= -xmp:geotag= photo.jpg   # nur der Standort\nexiftool -all= photo.jpg                     # alle Metadaten' },
          ],
        },
        {
          h: 'Was ein Foto sonst noch verrät',
          blocks: [
            { p: 'Der Standort ist das heikelste Feld, aber dieselbe Datei kann auch das Handy- oder Kameramodell und seine Seriennummer, das genaue Datum und die Uhrzeit, die Bearbeitungssoftware, deinen Namen oder einen Copyright-Vermerk, Gesichtsmarkierungen aus Foto-Apps und eine kleine Vorschau des unbeschnittenen Originals enthalten. Die vollständige Liste findest du unter [EXIF-Daten entfernen](/guides/remove-exif-data-from-photos/).' },
          ],
        },
      ],
      faq: [
        { q: 'Entfernen Instagram und Facebook den Standort aus Fotos?', a: 'Große soziale Netzwerke entfernen EXIF-Daten einschließlich GPS meist aus der Kopie, die andere sehen. Per E-Mail, Cloud-Link, manchen Chat-Apps in Originalqualität und vielen Foren und Kleinanzeigen-Seiten verschickte Dateien können sie behalten, daher ist es sicherer, die Datei vor dem Senden zu bereinigen.' },
        { q: 'Hat ein Screenshot Standortdaten?', a: 'Meist nicht, weil ein Screenshot ein neues Bild ist. Er kann aber einen Ort im Bild selbst zeigen, etwa ein Straßenschild oder eine Karte.' },
        { q: 'Sieht das Foto danach anders aus?', a: 'Nein. Die bereinigte Kopie wird in hoher Qualität gespeichert und sieht beim normalen Ansehen gleich aus; nur die versteckten Daten sind weg.' },
      ],
    },
    'remove-exif-data-from-photos': {
      title: 'So entfernst du EXIF-Daten und andere Metadaten aus Fotos',
      metaTitle: 'EXIF-Daten und Metadaten aus Fotos entfernen',
      description:
        'Was EXIF-, XMP-, IPTC- und ICC-Metadaten über dich verraten, wie du sie ansiehst und wie du alles aus JPEG-, PNG-, HEIC-, WebP- und anderen Fotos entfernst.',
      short: 'EXIF-Daten aus Fotos entfernen',
      cta: 'Foto-Metadaten jetzt entfernen',
      intro: [
        'EXIF ist der Informationsblock, den eine Kamera oder ein Handy in jedes Foto schreibt: das Gerät, die Einstellungen, das Datum und oft den Ort. Bearbeitungs-Apps fügen eigene Schichten hinzu (XMP und IPTC), und manche Dateien tragen C2PA Content Credentials mit einem Bearbeitungsverlauf. Nichts davon ist im Bild zu sehen, aber jeder mit der Datei kann es lesen.',
      ],
      steps: [
        { name: 'Öffne den Metadaten-Entferner', text: 'Gehe zum Strip-Tab von {site}.' },
        { name: 'Füge die Fotos hinzu', text: 'Zieh deine Dateien hinein. Stapel sind kein Problem.' },
        { name: 'Wähle Dieses Gerät oder Server', text: 'Dieses Gerät bereinigt die Fotos im Browser und lädt sie nie hoch. Server verarbeitet sie auf {site} und löscht sie direkt danach.' },
        { name: 'Lade die bereinigte Kopie herunter', text: 'Jede Datei kommt ohne EXIF, GPS, XMP, IPTC, ICC, C2PA, Herstellernotizen, Vorschaubilder und Kommentare zurück.' },
      ],
      sections: [
        {
          h: 'Was Foto-Metadaten enthalten',
          blocks: [
            {
              ul: [
                'EXIF: Marke und Modell von Kamera oder Handy, Objektiv, Seriennummern, Belichtungseinstellungen, Datum und Uhrzeit von Aufnahme und Bearbeitung sowie GPS-Standort.',
                'Herstellernotizen: ein herstellerspezifischer EXIF-Bereich mit zusätzlichen Kennungen wie einer internen Seriennummer oder dem Auslösezähler.',
                'XMP: von Bearbeitungs-Apps wie Lightroom und Photoshop geschrieben. Kann deinen Namen, den Bearbeitungsverlauf, Bewertungen, Stichwörter und eine Kopie der GPS-Daten enthalten.',
                'IPTC: Bildunterschriften, Credits, Copyright, Name und Kontaktdaten des Fotografen sowie das Feld Digital Source Type, mit dem manche Tools KI-Bilder kennzeichnen.',
                'ICC-Profil: beschreibt die Farben. Meist harmlos, aber manche Profile nennen das Gerät oder die Software, die sie erstellt hat.',
                'Eingebettetes Vorschaubild: eine kleine Vorschau in der Datei. Sie kann das Foto vor dem Zuschneiden oder Bearbeiten zeigen.',
                'C2PA Content Credentials: ein signierter Nachweis, woher das Bild stammt und wie es bearbeitet wurde. Siehe [C2PA entfernen](/guides/remove-c2pa-content-credentials/).',
                'Kommentare und Textblöcke: Besonders PNG-Dateien können freien Text enthalten, etwa den Prompt und die Einstellungen eines KI-Bildgenerators.',
              ],
            },
          ],
        },
        {
          h: 'Formate, die {site} bereinigt',
          blocks: [{ p: 'JPEG, PNG, WebP, HEIC/HEIF, AVIF, TIFF und GIF. HEIC-Fotos kommen als JPEG zurück, damit sie sich überall öffnen lassen.' }],
        },
        {
          h: 'Andere Wege, EXIF zu entfernen',
          blocks: [
            {
              ul: [
                'Windows: Eigenschaften, Details, Eigenschaften und persönliche Informationen entfernen, dann eine bereinigte Kopie erstellen. Es entfernt nicht jedes Feld in jedem Format.',
                'Mac: Vorschau kann den Standort entfernen (Werkzeuge, Informationen einblenden, GPS, Ortsinformationen entfernen), aber nicht den Rest. Export aus Fotos ohne Häkchen bei Ort entfernt ebenfalls GPS.',
                'exiftool: `exiftool -all= photo.jpg` entfernt alles, was es schreiben kann; mit `-r folder/` für einen ganzen Ordner.',
                'Neu speichern oder Screenshot: entfernt die meisten Metadaten, senkt aber die Qualität und kann je nach App manche Felder behalten.',
              ],
            },
          ],
        },
      ],
      faq: [
        { q: 'Verschlechtert das Entfernen von EXIF die Qualität?', a: 'Nicht sichtbar. {site} speichert die bereinigte Kopie in hoher Qualität, sie sieht beim normalen Ansehen also gleich aus.' },
        { q: 'Ändern sich die Farben, wenn das ICC-Profil entfernt wird?', a: 'Fotos von Handys und den meisten Kameras nutzen Standardfarben wie sRGB oder Display P3 und sehen gleich aus. Dateien in einem ungewöhnlichen Farbraum können leicht anders wirken.' },
        { q: 'Lassen sich entfernte Metadaten wiederherstellen?', a: 'Nicht aus der bereinigten Kopie. Sie sind aus dieser Datei verschwunden; dein Original hat sie noch, teile also die bereinigte Kopie.' },
      ],
    },
    'remove-metadata-from-iphone-photos': {
      title: 'So entfernst du Metadaten aus iPhone-Fotos (HEIC und JPEG)',
      metaTitle: 'Metadaten aus iPhone-Fotos entfernen (HEIC)',
      description:
        'iPhone-Fotos speichern Standort, Gerät, Datum und Bearbeitungsdaten. So schaltest du es am iPhone ab, entfernst es beim Teilen und löschst alles aus HEIC- und JPEG-Dateien.',
      short: 'Metadaten aus iPhone-Fotos entfernen',
      cta: 'iPhone-Fotos jetzt bereinigen',
      intro: [
        'Ein iPhone-Foto ist meist eine HEIC-Datei mit vollständigen Metadaten: iPhone-Modell, Objektiv, genaue Uhrzeit, Standort, wenn die Ortungsdienste für die Kamera an sind, und nach der Bearbeitung die verwendeten Apps. iOS kann den Standort beim Teilen weglassen, aber nicht den Rest. So gehst du mit beidem um.',
      ],
      steps: [
        { name: 'Sichere die Fotos in Dateien', text: 'Wähle in Fotos die Bilder aus, tippe auf Teilen und dann In Dateien sichern. (Oder per AirDrop senden oder auf einen Computer kopieren.)' },
        { name: 'Öffne {site} in Safari', text: 'Gehe zum Strip-Tab und tippe, um Dateien aus Dateien oder deiner Mediathek hinzuzufügen.' },
        { name: 'Bereinige sie', text: 'Wähle Dieses Gerät, damit sie auf deinem iPhone bleiben, oder Server für mehr Tempo. HEIC-Fotos kommen als JPEG zurück.' },
        { name: 'Speichere die bereinigten Kopien', text: 'Lade sie herunter, öffne jede und tippe auf Teilen, Bild sichern, um die bereinigte Kopie wieder in Fotos abzulegen.' },
      ],
      sections: [
        {
          h: 'Standort beim Teilen entfernen',
          blocks: [
            { p: 'Wähle die Fotos aus, tippe auf Teilen, dann oben im Teilen-Menü auf Optionen und deaktiviere Ort. iOS sendet nur bei diesem Teilen Kopien ohne GPS-Daten. Alle Fotodaten einschalten bewirkt das Gegenteil und schließt alles ein.' },
            { note: 'Wenn du auf einer Website Fotos aus der Mediathek auswählst, kann trotzdem die Originaldatei mit Metadaten gesendet werden. Nutze den Schalter unter Optionen oder bereinige die Datei vorher.' },
          ],
        },
        {
          h: 'Keinen Standort mehr speichern',
          blocks: [{ p: 'Einstellungen, Datenschutz & Sicherheit, Ortungsdienste, Kamera, dann Nie. Neue Fotos haben keine GPS-Daten mehr. Bereits aufgenommene Fotos behalten ihre.' }],
        },
        {
          h: 'Warum aus HEIC JPEG wird',
          blocks: [
            { p: 'HEIC ist Apples Standardformat. Viele Websites, Windows-Apps und ältere Android-Handys können es nicht öffnen, daher speichert {site} bereinigte HEIC-Fotos als hochwertiges JPEG. Wenn dein iPhone von vornherein JPEG aufnehmen soll, wähle Einstellungen, Kamera, Formate, Maximale Kompatibilität.' },
          ],
        },
        {
          h: 'Live Photos, Porträt und Bearbeitungen',
          blocks: [
            { p: 'Ein Live Photo ist ein Standbild plus ein kurzes MOV-Video, und beide haben eigene Metadaten. Das Bereinigen des Standbilds bereinigt nicht das Video; teile es als Standbild oder bereinige das Video separat mit dem [Video-Metadaten-Entferner](/guides/remove-metadata-from-videos/). Tiefendaten aus dem Porträtmodus und der Bearbeitungsverlauf fallen in der bereinigten Kopie weg.' },
          ],
        },
      ],
      faq: [
        { q: 'Behält AirDrop die Metadaten?', a: 'Ja. AirDrop sendet das vollständige Original mit Standort, es sei denn, du deaktivierst vorher Ort unter Optionen.' },
        { q: 'Entfernt iMessage den Standort?', a: 'Nicht zuverlässig. Deaktiviere Ort unter Optionen beim Teilen oder bereinige das Foto vor dem Senden.' },
      ],
    },
    'remove-metadata-from-videos': {
      title: 'So entfernst du Metadaten aus Videos (MP4, MOV und mehr)',
      metaTitle: 'Metadaten aus Videos entfernen (MP4, MOV, MKV)',
      description:
        'Videos speichern GPS, Gerät, Datum, Timecode und Encoder-Tags. So siehst du sie und entfernst alles aus MP4-, MOV-, MKV-, WebM- und anderen Videos.',
      short: 'Metadaten aus Videos entfernen',
      cta: 'Video-Metadaten jetzt entfernen',
      intro: [
        'Videos von Handys und Kameras tragen genauso viele Metadaten wie Fotos, manchmal mehr: einen Standort, das Gerätemodell, Erstellungsdaten, Timecode, den verwendeten Encoder und bei Drohnen und Actioncams eine komplette GPS- oder Telemetriespur, die neben dem Bild aufgezeichnet wird. Schnitt-Apps fügen Projekt- und Software-Tags hinzu.',
      ],
      steps: [
        { name: 'Öffne den Metadaten-Entferner', text: 'Gehe zum Strip-Tab von {site}.' },
        { name: 'Füge die Videos hinzu', text: 'MP4, MOV, M4V, MKV, WebM, AVI, MTS/M2TS, TS, 3GP, WMV oder FLV.' },
        { name: 'Wähle Dieses Gerät oder Server', text: 'Dieses Gerät arbeitet im Browser ohne Upload. Server ist bei großen Dateien schneller, die direkt danach gelöscht werden.' },
        { name: 'Lade die bereinigte Kopie herunter', text: 'Alle Tags, Datenspuren und C2PA-Boxen werden entfernt; Bild und Ton bleiben erhalten.' },
      ],
      sections: [
        {
          h: 'Was Video-Metadaten enthalten',
          blocks: [
            {
              ul: [
                'Globale Tags: Titel, Erstellungszeit, Marke und Modell des Geräts, Software und Standort (zum Beispiel das Tag `©xyz` und `com.apple.quicktime.location.ISO6709` in iPhone-Videos).',
                'Stream-Tags: Namen, Sprachen, Handler-Namen und Encoder-Angaben pro Spur.',
                'Datenspuren: GPS- und Sensor-Telemetrie von Drohnen, Dashcams und Actioncams, als eigene Spuren neben Video und Audio gespeichert.',
                'Timecode-Spuren und Kapiteltitel.',
                'Cover und Vorschaubilder, die an die Datei angehängt sind.',
                'C2PA-Boxen: signierte Content Credentials, die immer öfter von Kameras, Schnitt-Apps und KI-Video-Tools hinzugefügt werden.',
              ],
            },
          ],
        },
        {
          h: 'Sieht das Video anders aus?',
          blocks: [
            { p: 'Nein. Metadaten liegen im Container um Video und Audio, nicht im Bild. {site} speichert die bereinigte Kopie in hoher Qualität, sie sieht und klingt beim normalen Abspielen also gleich. Die Datei ist nicht Byte für Byte mit dem Original identisch, das ist normal.' },
          ],
        },
        {
          h: 'Selbst machen mit ffmpeg',
          blocks: [
            { p: 'Mit dem kostenlosen ffmpeg kopiert dieser Befehl nur Video und Audio und verwirft globale Tags, Kapitel und Datenspuren:' },
            { code: 'ffmpeg -i in.mov -map 0:v -map 0:a? -map_metadata -1 -map_chapters -1 \\\n  -fflags +bitexact -c copy out.mp4' },
            { p: 'Prüfe das Ergebnis mit `ffprobe -hide_banner out.mp4` oder `exiftool out.mp4`. Manche Stream-Tags wie Handler-Namen können bleiben; {site} entfernt auch diese.' },
          ],
        },
      ],
      faq: [
        { q: 'Entfernen YouTube oder TikTok Video-Metadaten?', a: 'Sie kodieren Uploads neu, wodurch das meiste aus dem entfernt wird, was Zuschauer herunterladen. Die Originaldatei, die du per E-Mail, Cloud-Link oder Chat versendest, hat sie noch.' },
        { q: 'Verliert das Video an Qualität?', a: 'Nicht sichtbar. Die bereinigte Kopie wird in hoher Qualität gespeichert.' },
      ],
    },
    'remove-c2pa-content-credentials': {
      title: 'Was C2PA Content Credentials sind und wie du sie entfernst',
      metaTitle: 'C2PA Content Credentials: Was sie sind, wie man sie entfernt',
      description:
        'C2PA Content Credentials halten fest, wer ein Foto oder Video mit welchen Tools und Bearbeitungen erstellt hat. So prüfst du eine Datei, was sie verraten und wie du sie entfernst.',
      short: 'C2PA Content Credentials entfernen',
      cta: 'Eine Datei prüfen und bereinigen',
      intro: [
        'C2PA (von der Coalition for Content Provenance and Authenticity) ist ein Standard, um einem Foto, Video oder einer Audiodatei einen signierten Nachweis anzuhängen, ein sogenanntes Manifest oder Content Credentials. Er wird von manchen Kameras und Handys, von Bearbeitungs-Apps wie Photoshop und Lightroom und von KI-Tools wie Adobe Firefly, den Bild- und Video-Tools von OpenAI und den Bildgeneratoren von Microsoft hinzugefügt.',
        'Das Manifest ist nützlich, um zu zeigen, woher eine Datei stammt, kann aber auch persönliche Angaben enthalten, die du vielleicht nicht veröffentlichen willst. Diese Anleitung erklärt, was darin steht, wie du eine Datei prüfst und wie du das eingebettete Manifest entfernst.',
      ],
      steps: [
        { name: 'Prüfe die Datei', text: 'Lade sie auf der Seite Content Credentials Verify (contentcredentials.org/verify) hoch, um zu sehen, ob sie ein Manifest hat und was darin steht.' },
        { name: 'Öffne den Metadaten-Entferner von {site}', text: 'Gehe zum Strip-Tab und füge die Datei hinzu.' },
        { name: 'Bereinige sie', text: 'Wähle Dieses Gerät oder Server. Das C2PA-Manifest wird zusammen mit EXIF, XMP und den anderen Metadaten entfernt.' },
        { name: 'Prüfe erneut', text: 'Lade die bereinigte Kopie auf der Verify-Seite hoch. Sie sollte keine eingebetteten Content Credentials mehr finden.' },
      ],
      sections: [
        {
          h: 'Was ein C2PA-Manifest enthalten kann',
          blocks: [
            {
              ul: [
                'Den Namen oder das Konto der Person oder Organisation, die es signiert hat, falls sie das angeben wollte.',
                'Das Gerät, die App oder den KI-Dienst, der die Datei erstellt hat, und die Software, mit der sie bearbeitet wurde.',
                'Eine Liste von Bearbeitungen (Aktionen), etwa Zuschnitt, Farbänderungen oder „mit einem generativen KI-Tool erstellt“.',
                'Datum und Uhrzeit und manchmal einen Standort.',
                'Vorschaubilder früherer Versionen und „Zutaten“: Verweise auf die zusammengeführten Quelldateien.',
                'Eine kryptografische Signatur, die zeigt, ob die Datei seit der Signatur verändert wurde.',
              ],
            },
          ],
        },
        {
          h: 'Wo es in der Datei liegt',
          blocks: [
            { p: 'In JPEG-Dateien steckt das Manifest in APP11-Segmenten (JUMBF-Boxen). In PNG ist es ein `caBX`-Chunk, in MP4 und MOV eine `uuid`-Box und in HEIC, WebP und AVIF eine eigene Metadaten-Box. Weil es ein separater Block ist, berührt das Entfernen das Bild nicht.' },
          ],
        },
        {
          h: 'Was das Entfernen bewirkt und was nicht',
          blocks: [
            { p: 'Die Bereinigung entfernt das in die Datei eingebettete Manifest. Sie entfernt nicht:' },
            {
              ul: [
                'Sichtbare Wasserzeichen oder Logos, die ins Bild gezeichnet sind.',
                'Kopien des Manifests, die das erstellende Tool online speichert. Manche Dienste speichern Content Credentials in der Cloud und können sie anhand des Bildes selbst wiederfinden.',
                'Unsichtbare Wasserzeichen in den Pixeln wie Googles [SynthID](/guides/what-is-synthid/). {site} stört SynthID separat, aber kein Tool kann garantieren, dass ein Wasserzeichen-Detektor es übersieht.',
                'Eine Offenlegungspflicht. Gesetze und Plattformregeln zur Kennzeichnung KI-generierter oder bearbeiteter Inhalte gelten für die Datei weiterhin.',
              ],
            },
            { note: 'Das Entfernen von Content Credentials hindert eine Plattform nicht daran, eine Datei als KI-generiert zu kennzeichnen. Plattformen nutzen auch eigene Klassifikatoren, Wasserzeichen-Detektoren und Fragen beim Upload.' },
          ],
        },
        {
          h: 'Andere Wege, C2PA zu entfernen',
          blocks: [
            {
              ul: [
                'exiftool: `exiftool -jumbf:all= -c2pa:all= photo.jpg` (neuere Versionen) entfernt C2PA aus JPEG; für andere Formate ist `exiftool -all= file` einfacher.',
                'Neu speichern in einer App ohne C2PA-Unterstützung entfernt es meist, aber manche Apps, darunter Photoshop, fügen stattdessen ein neues Manifest hinzu.',
                'Screenshots erzeugen eine neue Datei ohne das ursprüngliche Manifest, in geringerer Qualität.',
              ],
            },
          ],
        },
      ],
      faq: [
        { q: 'Ist es legal, C2PA-Daten zu entfernen?', a: 'Metadaten aus deinen eigenen Dateien zu entfernen ist in der Regel erlaubt, aber manche Gesetze und Plattformregeln verlangen, dass KI-generierte Inhalte gekennzeichnet werden. Das Entfernen von Content Credentials ändert diese Pflichten nicht.' },
        { q: 'Verändert das Entfernen von C2PA das Aussehen des Bildes?', a: 'Nein. Das Manifest ist ein separater Block in der Datei; das Bild bleibt gleich.' },
        { q: 'Warum findet die Verify-Seite trotzdem Content Credentials?', a: 'Sie kann manche Bilder mit Nachweisen abgleichen, die der erstellende Dienst online gespeichert hat. Diesen Eintrag hält der Dienst, nicht deine Datei.' },
      ],
    },
  },
};
