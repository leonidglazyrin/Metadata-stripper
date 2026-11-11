import type { Translation } from './en';

export const es: Translation = {
  meta: {
    title: 'Eliminar SynthID y metadatos de fotos y videos · {site}',
    description:
      '{site} elimina metadatos y altera la marca de agua SynthID en fotos y videos. Quita EXIF, GPS y etiquetas C2PA en nuestro servidor o en tu dispositivo. Además, descargadores de YouTube, X, TikTok e Instagram.',
    ogDescription:
      'Quita la marca de agua SynthID y los metadatos ocultos de fotos y videos, en nuestro servidor o en tu dispositivo. Además, descargadores de YouTube, X, TikTok e Instagram.',
    twitterDescription:
      'Quita la marca de agua SynthID y los metadatos ocultos de fotos y videos. Además, descargadores de YouTube, X, TikTok e Instagram.',
    ogImageAlt: '{site}: eliminador de SynthID y metadatos',
  },
  nav: {
    label: 'Principal',
    home: 'Inicio de {site}',
    synthid: 'SynthID',
    metadata: 'Metadatos',
    downloaders: 'Descargadores',
    pricing: 'Precio',
    faq: 'Preguntas',
    openTools: 'Abrir herramientas',
    language: 'Idioma',
    menu: 'Menú',
    mobileLabel: 'Principal (móvil)',
  },
  hero: {
    eyebrow: 'Quitar SynthID · borrar metadatos · descargar videos',
    title: ['Eliminador de SynthID', 'y metadatos.'],
    lede:
      'Sube una foto o un video y descarga una copia sin etiquetas EXIF, GPS ni C2PA y con la marca de agua SynthID alterada. Funciona en nuestro servidor o en tu navegador.',
    ctaStrip: 'Limpiar un archivo',
    ctaDownload: 'Descargar un video',
    toolsLabel: 'Herramientas',
    chipStrip: 'SynthID y metadatos',
  },
  synthid: {
    title: ['Quita SynthID', 'sin cambiar el aspecto.'],
    lede:
      'SynthID es una marca de agua invisible que Google añade a los píxeles de las imágenes y videos creados con IA. {site} cambia esos píxeles ligeramente para romper el patrón. El archivo se ve y se reproduce igual.',
    sourcesTitle: 'Limpia archivos de',
    sourcesLabel: 'Generadores de IA',
    photos: { title: 'Fotos', text: 'Un leve remuestreo y enfoque cambia cada píxel, y la imagen se vuelve a guardar en alta calidad.' },
    videos: { title: 'Videos', text: 'Una recodificación de alta calidad (CRF 18) con un ligero desenfoque, un enfoque equivalente y un poco de ruido entre fotogramas.' },
    caveat: {
      title: 'Sin garantías',
      text: 'SynthID está diseñado para resistir ediciones, así que ninguna herramienta puede prometer que un detector no lo encuentre. {site} altera la marca de agua; no puede garantizar que desaparezca.',
    },
    cta: 'Abrir el eliminador de SynthID',
  },
  metadata: {
    title: ['Eliminador de metadatos', 'para fotos y videos.'],
    lede:
      'Las fotos y los videos guardan dónde se tomaron, el dispositivo, su número de serie y el historial de edición. El eliminador de metadatos lo borra todo y te muestra qué quitó.',
    synthidTag: 'Marca de agua SynthID',
    photosTitle: 'Se quita de las fotos',
    photoTags: ['EXIF', 'Ubicación GPS', 'XMP', 'IPTC', 'Perfiles ICC', 'C2PA / Content Credentials', 'Notas del fabricante', 'Miniaturas', 'Comentarios de texto'],
    photoFormats: 'JPEG, PNG, WebP, HEIC/HEIF, AVIF, TIFF, GIF. HEIC se devuelve como JPEG.',
    videosTitle: 'Se quita de los videos',
    videoTags: ['Etiquetas globales y de pista', 'Etiquetas de capítulos', 'Pistas GPS y de telemetría', 'Código de tiempo', 'Portada', 'Cajas C2PA', 'Datos del codificador'],
    videoFormats: 'MP4, MOV, M4V, MKV, WebM, AVI, MTS/M2TS, TS, 3GP, WMV, FLV. Las pistas se copian sin recodificar.',
  },
  downloaders: {
    label: 'Descargadores de videos',
    youtube: {
      title: ['Descargador', 'de YouTube'],
      text: 'Pega enlaces de videos o Shorts de YouTube. Obtén un MP4 de hasta 1080p o el audio en M4A.',
      cta: 'Abrir el descargador de YouTube',
    },
    x: {
      title: ['Descargador', 'de X'],
      text: 'Pega el enlace de una publicación de x.com o twitter.com y obtén su video en MP4.',
      cta: 'Abrir el descargador de X',
    },
    tiktok: {
      title: ['Descargador', 'de TikTok'],
      text: 'Pega enlaces de tiktok.com, incluidos los cortos vm. y vt. Obtén el video en MP4 o el sonido en M4A.',
      cta: 'Abrir el descargador de TikTok',
    },
    instagram: {
      title: ['Descargador', 'de Instagram'],
      text: 'Pega el enlace de un Reel o de una publicación con video. Las públicas funcionan; las privadas necesitan una sesión iniciada.',
      cta: 'Abrir el descargador de Instagram',
    },
  },
  how: {
    title: ['Cómo quitar SynthID', 'y los metadatos.'],
    steps: [
      ['Sube tu archivo.', 'Videos o fotos de IA, tantos como quieras. En el servidor o en este dispositivo.'],
      ['{site} lo limpia.', 'Se quitan las etiquetas EXIF, GPS y C2PA y se debilita la marca de agua SynthID.'],
      ['Descarga la copia limpia.', 'Cada archivo muestra qué se quitó.'],
    ],
    flow: {
      uploading: 'Subiendo…',
      stripping: 'Quitando metadatos · debilitando SynthID…',
      clean: 'Limpio · 4 elementos quitados',
      download: 'Descargar',
    },
    cta: 'Abrir el eliminador de SynthID',
  },
  pricing: {
    perMonth: '/ mes',
    billing: 'Cobro mensual con Stripe. Cancela cuando quieras.',
    stripeLabel: 'Pagos con Stripe',
    cta: 'Abrir las herramientas',
  },
  faq: {
    title: ['Quitar SynthID:', 'preguntas frecuentes.'],
    items: [
      {
        q: '¿Qué es un eliminador de SynthID?',
        a: 'SynthID es una marca de agua invisible que Google añade a las imágenes y videos creados con sus modelos de IA. Un eliminador de SynthID cambia ligeramente los píxeles para romper ese patrón. {site} remuestrea y enfoca las fotos, y recodifica los videos en alta calidad, así que el archivo se ve igual.',
      },
      {
        q: '¿Cómo quito SynthID de videos de IA?',
        a: 'Abre el eliminador de SynthID, añade tu video, deja activada la opción de SynthID y elige Servidor. {site} quita los metadatos, recodifica el video en alta calidad con pequeños cambios de píxeles que debilitan la marca de agua y te da un MP4 limpio para descargar. Los videos de Google Veo y Gemini llevan SynthID; los mismos pasos también borran los metadatos de otros generadores.',
      },
      {
        q: '¿Con qué generadores de IA funciona?',
        a: 'Con todos. Los videos y fotos de Google Veo, Gemini e Imagen llevan la marca de agua SynthID. Los archivos de Sora, ChatGPT y muchas otras herramientas llevan C2PA Content Credentials en los metadatos. Higgsfield usa varios modelos, incluido Veo, así que sus archivos pueden llevar cualquiera de las dos. {site} quita los metadatos de todos y altera SynthID cuando está presente. No quita marcas de agua visibles ni logotipos.',
      },
      {
        q: '¿TikTok u otras plataformas seguirán etiquetando mi video como IA?',
        a: 'Puede que sí. Algunas plataformas, como TikTok, leen las C2PA Content Credentials para etiquetar contenido de IA, y {site} las quita. Pero las plataformas también pueden usar detectores de marcas de agua, sus propios clasificadores y reglas de divulgación, y no hemos probado cómo etiqueta el resultado ninguna plataforma. {site} no garantiza que un archivo pase sin ser detectado ni etiquetado. Sigue las reglas de cada plataforma sobre cómo declarar contenido generado con IA.',
      },
      {
        q: '¿El eliminador de SynthID siempre funciona?',
        a: 'No. SynthID está diseñado para resistir ediciones, y los detectores cambian constantemente. {site} altera la marca de agua, pero un detector aún podría encontrarla.',
      },
      {
        q: '¿Qué quita el eliminador de metadatos?',
        a: 'De las fotos: EXIF (cámara, número de serie, hora, GPS), XMP, IPTC, perfiles ICC, C2PA Content Credentials, notas del fabricante, miniaturas incrustadas y comentarios. De los videos: etiquetas globales, de pista y de capítulos, pistas GPS y de telemetría, código de tiempo, portada, cajas C2PA y datos del codificador. Cada archivo muestra una lista de lo que se quitó.',
      },
      {
        q: '¿Se suben mis archivos?',
        a: 'Solo si eliges Servidor. En el modo Servidor el archivo se sube, se limpia y se borra al momento. En el modo Este dispositivo se queda en tu navegador. En tu dispositivo, las fotos se limpian sin pérdida y los videos se remultiplexan; quitar SynthID en tu dispositivo solo funciona con fotos.',
      },
      {
        q: '¿Qué formatos se admiten?',
        a: 'Fotos: JPEG, PNG, WebP, HEIC/HEIF, AVIF, TIFF y GIF (HEIC se guarda como JPEG). Videos: MP4, MOV, M4V, MKV, WebM, AVI, MTS/M2TS, TS, 3GP, WMV y FLV.',
      },
      {
        q: '¿Limpiar el archivo reduce la calidad?',
        a: 'Quitar los metadatos copia las pistas de video sin recodificar y guarda las fotos en alta calidad. Quitar SynthID tiene que cambiar píxeles, así que el archivo no es idéntico byte a byte, pero no notarás la diferencia al verlo normalmente.',
      },
      {
        q: '¿Es legal quitar una marca de agua SynthID?',
        a: 'Depende de dónde vivas y de cómo uses el archivo. Procesa solo contenido que sea tuyo o que tengas permiso para usar, y etiqueta el contenido generado con IA cuando la ley o una plataforma lo exijan.',
      },
    ],
  },
  downloaderFaq: {
    title: ['Descargadores:', 'preguntas frecuentes.'],
    items: [
      {
        q: '¿Cómo descargo un video de YouTube?',
        a: 'Abre el descargador de YouTube, pega el enlace de un video o de un Short y pulsa Descargar. Obtienes un MP4 de hasta 1080p, o elige Solo audio para un archivo M4A. Puedes pegar varios enlaces a la vez.',
      },
      {
        q: '¿Cómo descargo un video de X (Twitter)?',
        a: 'Copia el enlace de la publicación (x.com o twitter.com) y pégalo en el descargador de X. Obtienes el video de esa publicación en MP4.',
      },
      {
        q: '¿El descargador de TikTok funciona con enlaces cortos?',
        a: 'Sí. Pega un enlace de tiktok.com o un enlace corto vm.tiktok.com / vt.tiktok.com y obtienes el video en MP4 o el sonido en M4A.',
      },
      {
        q: '¿Por qué falla un enlace de Instagram o X?',
        a: 'Las publicaciones privadas y algunas públicas necesitan una sesión iniciada. Si una publicación es privada o la plataforma pide iniciar sesión, la descarga falla con un mensaje que lo indica.',
      },
      {
        q: '¿Puedo descargar solo el audio?',
        a: 'Sí. Cada descargador tiene un interruptor Video / Solo audio. Solo audio te da un archivo M4A.',
      },
      {
        q: '¿Guardan los videos que descargo?',
        a: 'No. Cada video se obtiene en nuestro servidor, se te envía y se borra justo después.',
      },
      {
        q: '¿Es legal descargar videos?',
        a: 'Descarga solo videos que sean tuyos o que tengas permiso para usar. Descargar puede infringir los términos de servicio de una plataforma, y las normas de derechos de autor dependen de dónde vivas.',
      },
    ],
  },
  footer: {
    tagline: 'eliminador de SynthID y de metadatos, y descargadores de YouTube, X, TikTok e Instagram.',
    open: 'Abrir las herramientas',
    disclaimer:
      'Procesa y descarga solo contenido que sea tuyo o que tengas permiso para usar, y etiqueta el contenido generado con IA cuando las normas lo exijan. {site} no está afiliado a Google, YouTube, TikTok, X ni Instagram.',
    badges: 'Destacado en',
  },
  jsonLd: {
    name: '{site}: eliminador de SynthID y metadatos',
    alternateName: ['Eliminar SynthID', 'Eliminador de metadatos', 'Descargador de YouTube', 'Descargador de videos de X', 'Descargador de TikTok', 'Descargador de Instagram'],
    browserRequirements: 'Requiere un navegador moderno con JavaScript.',
    operatingSystem: 'Cualquiera (navegador web)',
    description:
      'Quita metadatos EXIF, GPS, XMP, IPTC y C2PA de fotos y videos y altera las marcas de agua SynthID, en un servidor o en tu dispositivo. Incluye descargadores de YouTube, TikTok, X e Instagram.',
    featureList: [
      'Eliminación de SynthID en fotos y videos',
      'Eliminador de metadatos EXIF, GPS, XMP, IPTC, ICC y C2PA',
      'Opción de procesamiento en el dispositivo',
      'Descargador de YouTube (MP4 hasta 1080p o audio M4A)',
      'Descargador de TikTok',
      'Descargadores de videos de X e Instagram',
    ],
  },
};
