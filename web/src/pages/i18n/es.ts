import type { PagesTranslation } from './types';
import type { Section } from '../guides';

const LEGAL_DL: Section = {
  h: '¿Es legal?',
  blocks: [
    {
      p: 'Descarga solo videos que hayas hecho tú, que tengan licencia de reutilización (por ejemplo Creative Commons) o que su autor te haya dado permiso para usar. Los términos de servicio de la mayoría de las plataformas limitan las descargas, y las leyes de derechos de autor cambian de un país a otro. Guardar un video no te da derecho a volver a subirlo, y {site} no está afiliado a ninguna de estas plataformas.',
    },
  ],
};

export const es: PagesTranslation = {
  ui: {
    locale: 'es-ES',
    kind: { synthid: 'Guía de SynthID', privacy: 'Guía de privacidad', download: 'Guía de descargas' },
    stepsTitle: 'Paso a paso con {site}',
    questions: 'Preguntas frecuentes',
    related: 'Guías relacionadas',
    contents: 'En esta página',
    updated: 'Actualizado el',
    home: 'Inicio',
    guides: 'Guías',
    pricing: 'Precios',
    openTools: 'Abrir herramientas',
    navLabel: 'Principal',
    breadcrumb: 'Ruta de navegación',
    language: 'Idioma',
    footer: {
      tagline: 'Eliminador de metadatos, C2PA y SynthID, y descargadores de YouTube, TikTok, X e Instagram.',
      open: 'Abrir las herramientas',
      synthidGuides: 'Guías de SynthID',
      privacyGuides: 'Guías de privacidad',
      downloadGuides: 'Guías de descargas',
      allGuides: 'Todas las guías',
      privacyPolicy: 'Política de privacidad (inglés)',
      terms: 'Términos del servicio (inglés)',
      disclaimer:
        'Procesa y descarga solo contenido que sea tuyo o que tengas permiso para usar, y etiqueta el contenido generado con IA cuando las normas lo exijan. {site} no está afiliado a Google, YouTube, TikTok, X, Instagram ni Meta.',
    },
    index: {
      metaTitle: 'Guías: SynthID, metadatos y descarga de videos',
      description:
        'Guías sobre SynthID y las marcas de agua de IA, cómo quitar GPS, EXIF y C2PA de fotos y videos, y cómo descargar videos de YouTube, TikTok, X e Instagram.',
      title: ['Guías de', '{site}.'],
      lede: 'Guías paso a paso para limpiar los metadatos de tus archivos y descargar videos, con las opciones que ya trae tu teléfono u ordenador y con las herramientas de {site}.',
      groups: {
        synthid: {
          title: 'SynthID y marcas de agua de IA',
          text: 'Qué es la marca de agua invisible SynthID de Google y cómo debilitarla y borrar los metadatos de imágenes y videos de Veo, Gemini e Imagen, para que las plataformas dejen de marcarlos como IA.',
        },
        privacy: {
          title: 'Privacidad y metadatos',
          text: 'Quita los datos ocultos de fotos y videos: ubicación, datos del dispositivo, fechas, historial de edición y C2PA Content Credentials.',
        },
        download: {
          title: 'Descarga de videos',
          text: 'Guarda videos públicos de YouTube, TikTok, X e Instagram en MP4, o quédate solo con el sonido en M4A.',
        },
      },
    },
    promo: {
      eyebrow: 'Planes',
      title: ['Limpia todos tus archivos.', 'Empieza por $2.'],
      text: 'Tus primeras limpiezas y descargas son gratis. Después, prueba 10 limpiezas de SynthID por $2 o pásate a ilimitado con Basic o Pro.',
      orYearly: 'o {price} / año',
      seePlans: 'Comparar todos los planes',
      download: {
        badge: 'Descargas ilimitadas',
        title: ['Descarga sin límites.', 'Pásate a Pro.'],
        text: 'Tu primera descarga de vídeo es gratis. Las descargas se hacen en nuestro servidor, así que después necesitas Pro: descargas ilimitadas de YouTube, X, TikTok e Instagram, y limpieza más rápida.',
        cardText: 'Descargas de vídeo ilimitadas de YouTube, X, TikTok e Instagram, y limpieza en el servidor unas 4 veces más rápida. Cancela cuando quieras.',
        cta: 'Descargas ilimitadas',
      },
    },
  },
  guides: {
    'what-is-synthid': {
      title: '¿Qué es SynthID? La marca de agua invisible de Google para la IA, explicada',
      metaTitle: '¿Qué es SynthID? La marca de agua IA de Google',
      description:
        'SynthID es la marca de agua invisible de Google DeepMind para imágenes, videos, audio y texto de IA. Cómo funciona, cómo detectarla, en qué se diferencia de C2PA y si se puede quitar.',
      short: '¿Qué es SynthID?',
      cta: 'Quitar SynthID de un archivo',
      stepsTitle: 'Cómo quitar SynthID con {site}',
      intro: [
        '**SynthID es una marca de agua invisible que Google DeepMind incrusta en el contenido creado por los modelos de IA de Google.** Va tejida en los píxeles de las imágenes y de los fotogramas de video, en la onda del audio y en la elección de palabras del texto, así que no se ve ni se oye, y sigue en el archivo aunque se borren los metadatos. Un detector puede leerla después y decir si un archivo se hizo con IA de Google.',
        'Las imágenes de Gemini (incluidos los modelos Nano Banana) e Imagen, los videos de Veo, la música de Lyria y el texto de Gemini pueden llevar SynthID. Esta guía explica cómo funciona la marca de agua, cómo comprobar si un archivo la tiene, en qué se diferencia de C2PA Content Credentials, qué significa para quienes publican contenido de IA y qué puedes hacer y qué no para [quitar SynthID](/app/#strip).',
      ],
      steps: [
        { name: 'Abre el eliminador de SynthID', text: 'Ve a la [pestaña Strip](/app/#strip) de {site} e inicia sesión con Google.' },
        { name: 'Añade tu imagen o video', text: 'Suelta archivos de Gemini, Imagen, Veo o de cualquier otro generador. Admite JPEG, PNG, WebP, HEIC, MP4, MOV y más.' },
        { name: 'Elige Servidor o Este dispositivo', text: 'Servidor recodifica videos grandes unas 4 veces más rápido y los borra justo después. Este dispositivo nunca sube el archivo.' },
        { name: 'Descarga la copia limpia', text: 'Se eliminan los metadatos, C2PA incluido, y se debilita la marca de agua SynthID. Cada archivo muestra qué se quitó.' },
      ],
      sections: [
        {
          h: 'SynthID en resumen',
          blocks: [
            {
              ul: [
                '**Creado por:** Google DeepMind. Se lanzó en agosto de 2023 para las imágenes de Imagen y después se amplió a video, audio y texto.',
                '**Qué marca:** el contenido generado por los modelos de IA de Google, como Gemini, Nano Banana, Imagen, Veo y Lyria. Google afirma haber marcado más de 10 000 millones de contenidos.',
                '**Dónde está:** dentro del propio contenido (píxeles, fotogramas, sonido o elección de palabras), no en los metadatos.',
                '**¿Es visible?** No. Los cambios son demasiado pequeños para verlos u oírlos.',
                '**Quién puede leerla:** SynthID Detector de Google y las funciones de verificación de productos de Google como la app de Gemini.',
                '**¿Se puede quitar?** Está hecha para resistir las ediciones habituales, así que no se borra como una etiqueta de metadatos. Recodificar puede debilitarla, sin garantías.',
              ],
            },
          ],
        },
        {
          h: 'Cómo funciona SynthID',
          blocks: [
            {
              p: 'SynthID no es un sello que se añade encima de un archivo terminado. Se aplica mientras se genera el contenido, con dos redes neuronales entrenadas juntas: una hace cambios mínimos que codifican un patrón y la otra aprende a encontrarlo de nuevo, incluso después de modificar el archivo.',
            },
            {
              ul: [
                '**Imágenes:** se ajustan ligeramente los valores de muchos píxeles para formar un patrón repartido por toda la imagen. Ninguna zona lo contiene entera, así que recortar una parte no lo elimina.',
                '**Video:** cada fotograma se marca como una imagen, por eso la marca sobrevive a recortar un clip o cambiar su velocidad de fotogramas. Los videos de Veo la llevan en todos los fotogramas.',
                '**Audio:** el patrón se añade al sonido de forma que el oído no lo nota, y está pensado para resistir la compresión MP3, el ruido añadido y los cambios de velocidad.',
                '**Texto:** mientras Gemini escribe, SynthID cambia un poco la probabilidad de la siguiente palabra. En un texto largo, esas elecciones forman una señal estadística. Google publicó la versión de texto como código abierto para que otros desarrolladores la usen.',
              ],
            },
            {
              p: 'Como la marca de agua forma parte del contenido, no depende del formato del archivo. Guardar un PNG como JPEG, subir un video a una plataforma que lo vuelve a comprimir o hacer una captura de pantalla suele dejarla legible.',
            },
          ],
        },
        {
          h: 'SynthID frente a C2PA Content Credentials y los metadatos',
          blocks: [
            { p: 'Los archivos de IA suelen llevar varias etiquetas a la vez, y cada una se quita de forma distinta:' },
            {
              ul: [
                '**SynthID** es una marca de agua invisible dentro de los píxeles o del sonido. Borrar los metadatos no la toca. Solo se puede debilitar cambiando el propio contenido.',
                '**C2PA Content Credentials** es un registro firmado en los metadatos del archivo que dice qué herramienta lo creó y cómo se editó. Plataformas como TikTok lo leen para activar automáticamente una etiqueta de «generado con IA». Una limpieza de metadatos lo elimina por completo. Mira [qué es C2PA y cómo quitarlo](/guides/remove-c2pa-content-credentials/).',
                '**Las etiquetas IPTC y XMP**, como el campo «Digital Source Type», son metadatos normales que algunos generadores añaden para indicar que una imagen es de IA. Mira [cómo quitar EXIF y metadatos](/guides/remove-exif-data-from-photos/).',
                '**Las marcas de agua visibles**, como el logotipo de destello en una esquina, están dibujadas en la imagen y son otra cosa.',
              ],
            },
            { p: 'Google usa SynthID y C2PA juntos en algunos productos: los metadatos se comprueban rápido pero se pierden con facilidad, y la marca de agua es más difícil de quitar pero necesita un detector para leerla.' },
          ],
        },
        {
          h: 'Cómo saber si una imagen o un video tiene SynthID',
          blocks: [
            {
              ul: [
                '**SynthID Detector:** el portal de verificación de Google. Sube una imagen, un video o un audio y te dice si encontró una marca SynthID; en imágenes puede resaltar las zonas donde es más probable.',
                '**La app de Gemini:** sube una imagen o un video y pregunta si se hizo con IA de Google. Gemini busca SynthID y te responde en el chat.',
                '**Content Credentials Verify:** [contentcredentials.org/verify](https://contentcredentials.org/verify) muestra los metadatos C2PA, no SynthID. Un archivo puede pasar una prueba y no la otra.',
              ],
            },
            {
              note: 'Un resultado de «no encontrado» no demuestra que un archivo lo haya hecho una persona. SynthID solo marca el contenido de los modelos que lo usan, y un archivo muy editado puede perder una señal legible. Del mismo modo, un detector solo puede decir que es probable que haya una marca; no prueba quién creó el archivo.',
            },
          ],
        },
        {
          h: 'Qué resiste SynthID y qué la debilita',
          blocks: [
            { p: 'Google diseñó SynthID para resistir las ediciones normales que sufre un archivo al compartirse: compresión, cambio de tamaño, recortes ligeros, cambios de color y brillo, filtros, cambios de formato y, en video, de velocidad de fotogramas. Eso la diferencia de los metadatos, que desaparecen en cuanto muchas apps vuelven a guardar el archivo.' },
            { p: 'No es indestructible. La propia Google reconoce que los cambios fuertes en una imagen, o muchas ediciones en un texto, pueden debilitar la señal hasta que el detector deja de estar seguro. Los investigadores también han publicado ataques contra sistemas de marcas de agua similares. Cuanto más se cambian los píxeles, más débil queda la marca, pero también más puede sufrir la imagen, así que el objetivo de un buen eliminador de SynthID es cambiar cada píxel sin que la imagen se vea distinta.' },
          ],
        },
        {
          h: 'Por qué SynthID importa a los creadores',
          blocks: [
            { p: 'Si publicas imágenes o videos de IA, SynthID y C2PA son la forma en que las plataformas y el público lo descubren. TikTok, Instagram, YouTube y otras analizan cada subida en busca de Content Credentials y marcas de agua, y si las encuentran pueden añadir una etiqueta de IA que no puedes desactivar. Las normas también se endurecen: en la UE, las obligaciones de transparencia de la Ley de IA (artículo 50), aplicables desde agosto de 2026, exigen a los proveedores de IA marcar el contenido generado de forma legible por máquinas, y SynthID es una de las maneras en que Google lo hace.' },
            { p: 'Quitar estas señales no elimina tu propia obligación de declarar el contenido de IA cuando una plataforma o la ley lo exijan. Lo que sí te devuelve es la decisión de cuándo y cómo etiquetar tu trabajo, en lugar de una etiqueta automática en cada publicación.' },
          ],
        },
        {
          h: '¿Se puede quitar SynthID?',
          blocks: [
            { p: 'SynthID no se puede borrar como una etiqueta de metadatos, porque no hay un bloque aparte que cortar. Lo que sí se puede hacer es cambiar cada píxel o muestra lo justo para que el patrón deje de cuadrar, manteniendo la imagen igual a la vista. Eso es lo que hace el [eliminador de SynthID de {site}](/app/#strip):' },
            {
              ul: [
                '**Imágenes:** un remuestreo casi unitario, un rastro de ruido y un enfoque suave mueven cada píxel, y la imagen se vuelve a guardar en alta calidad.',
                '**Videos:** una recodificación de alta calidad (CRF 18) con un leve desenfoque, un enfoque equivalente y un poco de ruido que cambia entre fotogramas; el audio se remuestrea ligeramente.',
                '**Metadatos:** EXIF, GPS, XMP, IPTC y C2PA Content Credentials se eliminan por completo en todos los archivos.',
              ],
            },
            { note: 'SynthID está hecha para resistir ediciones, así que ninguna herramienta puede prometer que un detector no la encuentre. {site} debilita la marca de agua todo lo posible sin cambiar visiblemente el archivo. Los metadatos, C2PA incluido, siempre se eliminan por completo.' },
            { p: 'Guías paso a paso para cada generador: [videos de Google Veo](/guides/remove-synthid-from-google-veo/), [imágenes de Gemini y Nano Banana](/guides/remove-synthid-from-gemini-images/), [imágenes de Imagen](/guides/remove-synthid-from-imagen-images/) y [archivos de Higgsfield](/guides/remove-synthid-from-higgsfield/).' },
          ],
        },
      ],
      faq: [
        { q: '¿Qué es SynthID en pocas palabras?', a: 'SynthID es una marca de agua oculta que Google pone dentro de las imágenes, videos, audios y textos que crea su IA. No se ve, pero el detector de Google puede leerla para saber que el contenido salió de la IA de Google.' },
        { q: '¿SynthID es visible?', a: 'No. Los cambios en los píxeles o en el sonido son demasiado pequeños para verlos u oírlos. El logotipo de destello que llevan algunas imágenes de Gemini es otra marca de agua, visible.' },
        { q: '¿Qué herramientas de IA usan SynthID?', a: 'Los modelos de Google: Gemini y los modelos de imagen Nano Banana, Imagen, Veo, Lyria y el texto de Gemini. Google también ofrece SynthID a socios, así que contenido de otras empresas puede llevarlo. La mayoría de los demás generadores, como Midjourney o Sora, usan metadatos C2PA o sus propias marcas.' },
        { q: '¿Quitar los metadatos quita SynthID?', a: 'No. SynthID está en los píxeles, no en los metadatos, así que borrar EXIF o C2PA la deja intacta. Hay que cambiar los píxeles para debilitarla, que es lo que hace la limpieza de SynthID de {site}.' },
        { q: '¿Una captura de pantalla o volver a guardar quita SynthID?', a: 'Normalmente no. Las capturas, los cambios de formato y la compresión mantienen casi intacto el patrón de píxeles; SynthID se diseñó para resistirlos. Lo que sí quitan es la mayoría de los metadatos.' },
        { q: '¿Cómo sé si una imagen tiene SynthID?', a: 'Súbela a SynthID Detector de Google o pregunta a la app de Gemini si la imagen se hizo con IA de Google. Ninguno de los dos puede demostrar que un archivo no se hizo con IA.' },
        { q: '¿SynthID es lo mismo que C2PA?', a: 'No. C2PA Content Credentials son metadatos firmados que se pueden quitar del archivo. SynthID es una marca de agua en el propio contenido. Muchos archivos de Google llevan las dos. [{site}](/app/#strip) quita C2PA por completo y debilita SynthID.' },
        { q: '¿Se puede quitar SynthID por completo?', a: 'No con certeza. Está hecha para resistir ediciones, y los detectores mejoran sin parar. Recodificar con pequeños cambios de píxeles, como hace {site}, la debilita sin cambiar el aspecto del archivo, pero ninguna herramienta puede garantizar que un detector no la encuentre.' },
        { q: '¿Es legal quitar SynthID?', a: 'Depende de dónde vivas y de cómo uses el archivo. Procesa solo contenido que sea tuyo o que tengas permiso para usar, y etiqueta el contenido generado con IA cuando la ley o una plataforma lo exijan.' },
      ],
    },
    'remove-synthid-from-google-veo': {
      title: 'Cómo quitar SynthID de los videos de Google Veo',
      metaTitle: 'Quitar SynthID de videos de Google Veo',
      description:
        'Todo video de Google Veo lleva una marca de agua SynthID invisible y C2PA Content Credentials. Cómo debilitar SynthID y borrar los metadatos para que las plataformas dejen de marcarlo.',
      short: 'Quitar SynthID de videos de Veo',
      cta: 'Limpiar un video de Veo ahora',
      intro: [
        'Google Veo escribe una [marca de agua SynthID](/guides/what-is-synthid/) invisible en los píxeles de cada video que genera y añade C2PA Content Credentials a los metadatos del archivo. Las Content Credentials son lo que leen plataformas como TikTok para activar automáticamente una etiqueta de «generado con IA»; la marca SynthID es lo que busca el detector de Google.',
        '{site} elimina los metadatos, incluido el manifiesto C2PA, y recodifica el video para alterar la marca SynthID, manteniendo la imagen y el sonido iguales. Ninguna herramienta puede prometer que un detector no encuentre una marca hecha para resistir ediciones, así que el resultado no está garantizado.',
      ],
      steps: [
        { name: 'Abre el eliminador de SynthID', text: 'Ve a la pestaña Strip de {site}.' },
        { name: 'Añade tu video de Veo', text: 'Suelta el MP4. Los metadatos y SynthID siempre se quitan, así que no hay nada que activar.' },
        { name: 'Elige Servidor para ir más rápido', text: 'Servidor recodifica videos grandes unas 4 veces más rápido y los borra justo después. Este dispositivo mantiene el archivo en tu navegador, pero es más lento.' },
        { name: 'Descarga la copia limpia', text: 'Cada archivo muestra qué se quitó. Comparte la copia limpia en lugar del original.' },
      ],
      sections: [
        {
          h: 'Qué pone Veo en el archivo',
          blocks: [
            {
              ul: [
                'SynthID: una marca de agua invisible a nivel de píxel en todo el video, diseñada para resistir cambios de tamaño, recortes y recompresión.',
                'C2PA Content Credentials: un manifiesto firmado en los metadatos que registra que se hizo con la IA de Google.',
                'Etiquetas del contenedor y del codificador, fecha de creación y otros metadatos estándar.',
              ],
            },
            { p: 'Lee [qué son las C2PA Content Credentials](/guides/remove-c2pa-content-credentials/) para saber más del manifiesto, y [cómo quitar los metadatos de un video](/guides/remove-metadata-from-videos/) para el resto.' },
          ],
        },
        {
          h: 'Cómo debilita {site} la marca de agua',
          blocks: [
            { p: 'El video se recodifica con una calidad visualmente transparente (CRF 18), con un desenfoque mínimo, un enfoque equivalente y un rastro de ruido que cambia entre fotogramas. Eso remuestrea cada píxel y desplaza la red de la marca de agua, mientras que los metadatos, C2PA incluido, se descartan por completo. El audio se remuestrea ligeramente para alterar cualquier marca de agua de audio.' },
          ],
        },
        {
          h: 'Qué puede hacer y qué no',
          blocks: [
            { note: 'SynthID está hecha para resistir ediciones. {site} la debilita, pero no puede garantizar que el detector de Google o el clasificador de una plataforma no la encuentren. Los metadatos C2PA, en cambio, se eliminan por completo.' },
            { p: 'Quitar estas señales no elimina ninguna obligación legal o de la plataforma de etiquetar el contenido de IA. Sigue las normas de declaración de cada plataforma.' },
          ],
        },
      ],
      faq: [
        { q: '¿Veo siempre añade SynthID?', a: 'Sí. Google aplica SynthID a las imágenes y videos que generan sus modelos, incluido Veo. La marca es invisible y no aparece en la imagen.' },
        { q: '¿El video de Veo pierde calidad?', a: 'Quitar SynthID recodifica el video, así que no es idéntico byte a byte, pero se guarda en alta calidad y se ve igual al verlo normalmente.' },
        { q: '¿TikTok seguirá etiquetando mi video de Veo como IA?', a: 'Puede que sí. {site} quita las C2PA Content Credentials que leen las plataformas, pero estas también usan sus propios clasificadores y detectores de marcas de agua. No garantizamos que un archivo quede sin etiqueta.' },
      ],
    },
    'remove-synthid-from-gemini-images': {
      title: 'Cómo quitar SynthID de las imágenes de Gemini (Nano Banana)',
      metaTitle: 'Quitar SynthID de imágenes IA de Gemini',
      description:
        'Las imágenes de Gemini y del modelo Nano Banana llevan una marca de agua SynthID invisible y metadatos. Cómo alterar SynthID y quitar los metadatos en un solo paso.',
      short: 'Quitar SynthID de imágenes de Gemini',
      cta: 'Limpiar una imagen de Gemini ahora',
      intro: [
        'Las imágenes creadas con Gemini, incluido el modelo de imagen Nano Banana, llevan en los píxeles la [marca de agua SynthID](/guides/what-is-synthid/) invisible de Google y, normalmente, una etiqueta IPTC «Digital Source Type» y otros metadatos que las marcan como generadas con IA.',
        '{site} remuestrea y recodifica la imagen para alterar la marca SynthID y quita los metadatos que la etiquetan. La imagen se ve igual. Como SynthID para imágenes está hecha para resistir cambios de tamaño y nuevos guardados, un detector aún podría encontrarla, así que el resultado no está garantizado.',
      ],
      steps: [
        { name: 'Abre el eliminador de SynthID', text: 'Ve a la pestaña Strip de {site}.' },
        { name: 'Añade tu imagen de Gemini', text: 'Suelta el JPEG, PNG o WebP. Los metadatos y SynthID siempre se quitan.' },
        { name: 'Elige Este dispositivo o Servidor', text: 'Este dispositivo limpia la imagen en tu navegador sin subirla. Servidor es más rápido con lotes grandes.' },
        { name: 'Descarga la copia limpia', text: 'El archivo vuelve sin EXIF, XMP, IPTC ni C2PA, y con la marca de agua debilitada.' },
      ],
      sections: [
        {
          h: 'Qué lleva una imagen de Gemini',
          blocks: [
            {
              ul: [
                'SynthID: una marca de agua invisible repartida por los píxeles.',
                'Etiquetas IPTC «Digital Source Type» y XMP que marcan la imagen como generada con IA.',
                'A veces C2PA Content Credentials, además de los datos EXIF e ICC habituales.',
              ],
            },
          ],
        },
        {
          h: 'Cómo la altera {site}',
          blocks: [
            { p: 'La imagen se remuestrea con una reducción y ampliación casi unitarias, un enfoque suave y un rastro de ruido aditivo, y se vuelve a guardar en alta calidad. Eso mueve cada píxel y desordena la red de la marca de agua, mientras se elimina todo bloque de metadatos: EXIF, XMP, IPTC y C2PA.' },
          ],
        },
        {
          h: 'Por qué aún podría detectarse',
          blocks: [
            { note: 'SynthID para imágenes está diseñada para resistir cambios de tamaño y recompresión, así que un caso difícil todavía puede activar el detector de Google tras la limpieza. {site} debilita la marca todo lo posible sin cambiar visiblemente la imagen; los metadatos se quitan en cualquier caso.' },
          ],
        },
      ],
      faq: [
        { q: '¿Nano Banana es lo mismo que Gemini para esto?', a: 'Sí. Nano Banana es un modelo de imagen de Gemini, y sus imágenes llevan SynthID igual. Los pasos son los mismos.' },
        { q: '¿Quitar SynthID cambia cómo se ve la imagen?', a: 'No de forma visible. El remuestreo, el ruido y la recodificación son casi sin pérdida y la imagen se ve igual al verla normalmente.' },
        { q: '¿Y si la imagen sigue marcada como IA?', a: 'Es la marca de agua de los píxeles resistiéndose, no los metadatos. Las etiquetas EXIF, XMP, IPTC y C2PA se eliminan por completo; la marca de agua solo se debilita, sin garantía.' },
      ],
    },
    'remove-synthid-from-imagen-images': {
      title: 'Cómo quitar SynthID de las imágenes de Google Imagen',
      metaTitle: 'Quitar SynthID de imágenes de Google Imagen',
      description:
        'Google Imagen marca cada imagen con una marca de agua SynthID invisible y metadatos de IA. Cómo debilitar la marca y quitar los metadatos para que tu imagen no se marque.',
      short: 'Quitar SynthID de imágenes de Imagen',
      cta: 'Limpiar una imagen de Imagen ahora',
      intro: [
        'Imagen es el modelo de texto a imagen de Google, usado en Gemini, ImageFX y otras apps de Google. Cada imagen que crea lleva en los píxeles una [marca de agua SynthID](/guides/what-is-synthid/) invisible, junto con metadatos (a menudo una etiqueta IPTC «Digital Source Type» y C2PA Content Credentials) que la marcan como generada con IA.',
        '{site} remuestrea y recodifica la imagen para alterar SynthID y quita todos los metadatos. El resultado se ve igual. SynthID está hecha para resistir ediciones, así que un detector aún podría encontrarla; los metadatos se quitan con seguridad.',
      ],
      steps: [
        { name: 'Abre el eliminador de SynthID', text: 'Ve a la pestaña Strip de {site}.' },
        { name: 'Añade tu imagen de Imagen', text: 'Suelta el archivo. Los metadatos y SynthID siempre se quitan.' },
        { name: 'Elige Este dispositivo o Servidor', text: 'Este dispositivo nunca sube el archivo; Servidor es más rápido con lotes y borra los archivos justo después.' },
        { name: 'Descarga la copia limpia', text: 'Comparte la copia limpia, que muestra qué se quitó, en lugar del original.' },
      ],
      sections: [
        {
          h: 'Qué incrusta Imagen',
          blocks: [
            {
              ul: [
                'SynthID: una marca de agua invisible a nivel de píxel en cada imagen generada.',
                'Etiquetas IPTC / XMP, incluido un campo «Digital Source Type» que la identifica como generada con IA.',
                'C2PA Content Credentials en algunos servicios, además de los datos EXIF e ICC estándar.',
              ],
            },
            { p: 'Para ver todo lo que pueden revelar los metadatos de una foto, lee [cómo quitar EXIF y metadatos](/guides/remove-exif-data-from-photos/).' },
          ],
        },
        {
          h: 'Cómo funciona la limpieza',
          blocks: [
            { p: 'Un remuestreo casi unitario mueve cada píxel, un enfoque suave recupera la nitidez y un rastro de ruido desordena la red de la marca de agua. Después la imagen se recodifica en alta calidad sin ningún metadato: EXIF, XMP, IPTC y C2PA desaparecen.' },
          ],
        },
        {
          h: 'Límites',
          blocks: [
            { note: 'Ninguna herramienta puede garantizar que un detector de SynthID no encuentre una marca diseñada para resistir ediciones. {site} la debilita; los metadatos se quitan con certeza. Las normas de declaración de contenido de IA siguen aplicándose.' },
          ],
        },
      ],
      faq: [
        { q: '¿Dónde se usa Imagen?', a: 'Imagen genera las imágenes de Gemini, ImageFX y otras herramientas de Google. Las imágenes de cualquiera de ellas llevan SynthID y se limpian igual.' },
        { q: '¿Esto quita una marca de agua visible?', a: 'No. {site} altera la marca de agua invisible SynthID y quita los metadatos. No quita logotipos ni marcas visibles dibujadas en la imagen.' },
        { q: '¿Cambiarán los colores?', a: 'No. Imagen genera en sRGB, así que quitar el perfil de color no altera los colores.' },
      ],
    },
    'remove-synthid-from-higgsfield': {
      title: 'Cómo quitar SynthID y C2PA de los videos e imágenes de Higgsfield',
      metaTitle: 'Quitar SynthID y C2PA de archivos de Higgsfield',
      description:
        'Higgsfield usa varios modelos de IA, así que sus archivos pueden llevar una marca SynthID, C2PA Content Credentials o ambas. Cómo limpiarlos para que las plataformas dejen de marcarlos.',
      short: 'Quitar SynthID de Higgsfield',
      cta: 'Limpiar un archivo de Higgsfield ahora',
      intro: [
        'Higgsfield es una plataforma que reúne varios modelos de IA, entre ellos Google Veo. Lo que acaba en tu archivo depende del modelo que lo creó: un video hecho con Veo lleva la [marca de agua SynthID](/guides/what-is-synthid/) invisible de Google, y la mayoría de los generadores añaden además C2PA Content Credentials a los metadatos que marcan el archivo como generado con IA.',
        '{site} quita los metadatos, C2PA incluido, y recodifica el archivo para alterar la marca SynthID si la hay, manteniendo la imagen y el sonido iguales. SynthID está hecha para resistir ediciones, así que ninguna herramienta puede prometer que un detector no la encuentre; el resultado no está garantizado.',
      ],
      steps: [
        { name: 'Abre el eliminador de SynthID', text: 'Ve a la pestaña Strip de {site}.' },
        { name: 'Añade tu archivo de Higgsfield', text: 'Suelta el video o la imagen. Deja activada la limpieza de SynthID (viene activada) para que un archivo hecho con Veo también se recodifique.' },
        { name: 'Elige Servidor para ir más rápido', text: 'Servidor recodifica videos grandes unas 4 veces más rápido y los borra justo después. Este dispositivo mantiene el archivo en tu navegador, pero es más lento.' },
        { name: 'Descarga la copia limpia', text: 'Cada archivo muestra qué se quitó. Comparte la copia limpia en lugar del original.' },
      ],
      sections: [
        {
          h: 'Qué puede llevar un archivo de Higgsfield',
          blocks: [
            {
              ul: [
                'SynthID: aparece cuando el archivo se hizo con un modelo de Google como Veo. Es una marca de agua invisible a nivel de píxel.',
                'C2PA Content Credentials: un manifiesto firmado en los metadatos que registra que el archivo se generó con IA. Mira [cómo quitar C2PA](/guides/remove-c2pa-content-credentials/).',
                'Los metadatos habituales del contenedor, del codificador, EXIF y de tiempos.',
              ],
            },
            { p: 'Como Higgsfield mezcla modelos, puede que no sepas qué marca lleva un archivo. Dejar activada la limpieza de SynthID cubre los dos casos: los metadatos siempre se quitan y la recodificación se aplica por si hay SynthID.' },
          ],
        },
        {
          h: 'Cómo lo limpia {site}',
          blocks: [
            { p: 'Los videos se recodifican con una calidad visualmente transparente (CRF 18), con un desenfoque mínimo, un enfoque equivalente y un rastro de ruido entre fotogramas; las imágenes se remuestrean, se les añade ruido y se enfocan, y se vuelven a guardar en alta calidad. En ambos casos se descarta todo bloque de metadatos, C2PA incluido. El resultado se ve y se reproduce igual.' },
          ],
        },
        {
          h: 'Qué puede hacer y qué no',
          blocks: [
            { note: 'SynthID está hecha para resistir ediciones. {site} la debilita, pero no puede garantizar que un detector o el clasificador de una plataforma no la encuentren. Los metadatos C2PA, en cambio, se eliminan por completo.' },
            { p: 'Quitar estas señales no elimina ninguna obligación legal o de la plataforma de etiquetar el contenido de IA. Sigue las normas de declaración de cada plataforma.' },
          ],
        },
      ],
      faq: [
        { q: '¿Todos los archivos de Higgsfield tienen SynthID?', a: 'No. Solo los archivos hechos con un modelo de Google como Veo llevan SynthID. Los de otros modelos de Higgsfield suelen llevar C2PA Content Credentials. {site} cubre ambos: los metadatos siempre se quitan y la recodificación se aplica con la limpieza de SynthID activada.' },
        { q: '¿Mi video de Higgsfield perderá calidad?', a: 'Quitar SynthID recodifica el video, así que no es idéntico byte a byte, pero se guarda en alta calidad y se ve igual al verlo normalmente.' },
        { q: '¿TikTok seguirá etiquetando mi video de Higgsfield como IA?', a: 'Puede que sí. {site} quita las C2PA Content Credentials que leen las plataformas, pero estas también usan sus propios clasificadores y detectores de marcas de agua. No garantizamos que un archivo quede sin etiqueta.' },
      ],
    },
    'download-youtube-videos': {
      title: 'Cómo descargar videos y Shorts de YouTube en MP4',
      metaTitle: 'Descargar videos y Shorts de YouTube (MP4, 1080p)',
      description:
        'Guarda un video o un Short de YouTube en MP4 de hasta 1080p, o el audio en M4A, pegando su enlace. Funciona con enlaces de youtube.com, youtu.be y Shorts. Sin instalar nada.',
      short: 'Descargar videos y Shorts de YouTube',
      cta: 'Abrir el descargador de YouTube',
      intro: [
        'La forma más rápida de guardar un video de YouTube es copiar su enlace y pegarlo en un descargador que haga el trabajo en un servidor. {site} obtiene la mejor versión hasta 1080p, une la imagen y el sonido en un MP4 que se reproduce en cualquier teléfono u ordenador y te lo envía. También puedes quedarte solo con el audio en un archivo M4A.',
      ],
      steps: [
        { name: 'Copia el enlace', text: 'En un ordenador, copia la dirección de la barra del navegador. En la app de YouTube, toca Compartir debajo del video (o en un Short) y elige Copiar enlace.' },
        { name: 'Abre el descargador de YouTube', text: 'Ve a la pestaña YouTube de {site} e inicia sesión con Google.' },
        { name: 'Pega y elige un formato', text: 'Pega uno o varios enlaces, uno por línea. Deja el interruptor en Video para un MP4 o elige Solo audio para un M4A.' },
        { name: 'Descarga', text: 'Pulsa Descargar. Cada enlace muestra su título y su progreso, y luego un botón Guardar cuando el archivo está listo.' },
      ],
      sections: [
        {
          h: 'Qué enlaces funcionan',
          blocks: [
            {
              ul: [
                'Videos normales: `youtube.com/watch?v=…`',
                'Enlaces cortos: `youtu.be/…`',
                'Shorts: `youtube.com/shorts/…`',
                'Reproductores insertados: `youtube-nocookie.com/embed/…`',
                'Enlaces móviles: `m.youtube.com/…`',
              ],
            },
            { p: 'Los enlaces con parámetros extra, como una marca de tiempo (`&t=42`) o una lista (`&list=…`), funcionan: obtienes el video del enlace. Las listas completas no se descargan de una vez; pega los enlaces de cada video.' },
          ],
        },
        {
          h: 'Calidad y formato',
          blocks: [
            { p: 'YouTube guarda la imagen y el sonido por separado en la mayoría de los videos de más de 360p. El descargador elige la mejor imagen H.264 hasta 1080p y el sonido AAC, y los une en un MP4. H.264 y AAC se reproducen en todas partes: iPhone, Android, Windows, Mac, apps de edición y redes sociales.' },
            { p: 'Si un video no tiene versión H.264 a 1080p, obtienes la mejor que ofrece YouTube hasta 1080p. Los videos subidos a menor resolución se descargan en esa resolución; un descargador no puede añadir detalle que nunca se subió.' },
          ],
        },
        {
          h: 'Cuando una descarga falla',
          blocks: [
            {
              ul: [
                'Los videos privados y solo para miembros no se pueden descargar.',
                'Los videos con restricción de edad y algunos bloqueados por región necesitan una cuenta de YouTube con sesión iniciada, así que pueden fallar.',
                'Los directos solo se pueden guardar cuando terminan y YouTube los ha procesado.',
                'Los estrenos que aún no han empezado no tienen nada que descargar.',
              ],
            },
          ],
        },
        LEGAL_DL,
      ],
      faq: [
        { q: '¿Puedo descargar Shorts de YouTube?', a: 'Sí. Pega un enlace youtube.com/shorts/ igual que un video normal y obtienes un MP4 vertical.' },
        { q: '¿Puedo descargar solo el audio?', a: 'Sí. Pon el interruptor en Solo audio y obtienes el sonido en un archivo M4A. Cuando la plataforma guarda audio AAC, se copia sin recodificar.' },
        { q: '¿Por qué el video es 1080p y no 4K?', a: 'El descargador limita los videos a 1080p para que los archivos sean ligeros y se reproduzcan en todas partes. La mayoría de los teléfonos y redes sociales muestran el video a 1080p o menos.' },
        { q: '¿Tengo que instalar algo?', a: 'No. Todo funciona en el navegador y en el servidor de {site}, en cualquier teléfono u ordenador.' },
      ],
    },
    'download-tiktok-videos': {
      title: 'Cómo descargar videos de TikTok en MP4',
      metaTitle: 'Descargar videos de TikTok (MP4 o sonido M4A)',
      description:
        'Guarda un video público de TikTok en MP4, o su sonido en M4A, desde un enlace de tiktok.com, vm.tiktok.com o vt.tiktok.com. Paso a paso, en el móvil o el ordenador.',
      short: 'Descargar videos de TikTok',
      cta: 'Abrir el descargador de TikTok',
      intro: [
        'TikTok solo ofrece su botón Guardar video cuando el creador lo permite, y la copia guardada lleva una marca de agua que se mueve. Si pegas el enlace en {site}, obtienes el video en un archivo MP4, o solo el sonido en M4A, de cualquier video público.',
      ],
      steps: [
        { name: 'Copia el enlace', text: 'En la app de TikTok, toca Compartir (la flecha de la derecha) y elige Copiar enlace. En un ordenador, copia la dirección de la página del video.' },
        { name: 'Abre el descargador de TikTok', text: 'Ve a la pestaña TikTok de {site} e inicia sesión con Google.' },
        { name: 'Pega el enlace', text: 'Pega un enlace, o varios en líneas distintas. Elige Video para MP4 o Solo audio para el sonido en M4A.' },
        { name: 'Guarda el archivo', text: 'Pulsa Descargar y guarda cada archivo cuando esté listo. En iPhone, abre el archivo y usa Compartir y luego Guardar video para llevarlo a Fotos.' },
      ],
      sections: [
        {
          h: 'Qué enlaces funcionan',
          blocks: [
            {
              ul: [
                'Enlaces completos: `tiktok.com/@cuenta/video/…`',
                'Enlaces para compartir de la app: `vm.tiktok.com/…` y `vt.tiktok.com/…`',
                'Enlaces de la web móvil: `m.tiktok.com/…`',
              ],
            },
            { p: 'Los enlaces cortos se siguen hasta el video al que apuntan, así que puedes pegar exactamente lo que copia la app.' },
          ],
        },
        {
          h: 'Qué obtienes',
          blocks: [
            { p: 'El video llega en MP4 con la calidad que sirve TikTok, con preferencia por H.264 para que se reproduzca en todas partes.' },
            { p: 'Solo audio guarda la banda sonora del video en un archivo M4A. Para un sonido de moda usado en muchos videos, sirve cualquier video que lo use.' },
          ],
        },
        {
          h: 'Qué no funciona',
          blocks: [
            {
              ul: [
                'Videos de cuentas privadas y videos compartidos solo con amigos.',
                'Videos borrados o no disponibles en la región del servidor.',
                'Directos y presentaciones de fotos (carruseles de imágenes fijas).',
              ],
            },
          ],
        },
        LEGAL_DL,
      ],
      faq: [
        { q: '¿Funcionan los enlaces cortos vm.tiktok.com?', a: 'Sí. Pega enlaces vm.tiktok.com o vt.tiktok.com tal como salen del botón Copiar enlace de la app.' },
        { q: '¿Puedo descargar solo el sonido?', a: 'Sí. Pon el interruptor en Solo audio para obtener la banda sonora en M4A.' },
        { q: '¿Puedo descargar videos privados de TikTok?', a: 'No. Solo se admiten videos públicos.' },
        { q: '¿El creador recibe una notificación?', a: 'No. {site} lee la página pública del video como lo hace un navegador; no se publica nada en TikTok.' },
      ],
    },
    'download-twitter-x-videos': {
      title: 'Cómo descargar videos de X (Twitter)',
      metaTitle: 'Descargar videos de X (Twitter) en MP4',
      description:
        'Guarda el video de una publicación de X (Twitter) en MP4 pegando el enlace de la publicación. Funciona con enlaces de x.com y twitter.com, en el móvil o el ordenador.',
      short: 'Descargar videos de X (Twitter)',
      cta: 'Abrir el descargador de X',
      intro: [
        'X no tiene botón de descarga para los videos. Para guardar uno, copia el enlace de la publicación y pégalo en {site}: obtienes el video de esa publicación en MP4, con la mejor calidad que ofrece X.',
      ],
      steps: [
        { name: 'Copia el enlace de la publicación', text: 'Toca el icono de compartir debajo de la publicación y elige Copiar enlace. En un ordenador también puedes copiar la dirección de la página.' },
        { name: 'Abre el descargador de X', text: 'Ve a la pestaña X de {site} e inicia sesión con Google.' },
        { name: 'Pega el enlace', text: 'Pega uno o varios enlaces. Elige Video para MP4 o Solo audio para M4A.' },
        { name: 'Guarda el archivo', text: 'Pulsa Descargar y guarda el archivo cuando esté listo.' },
      ],
      sections: [
        {
          h: 'Qué enlaces funcionan',
          blocks: [
            {
              ul: [
                'Enlaces de publicaciones en cualquiera de los dos dominios: `x.com/cuenta/status/…` o `twitter.com/cuenta/status/…`',
                'Enlaces de servicios que arreglan la inserción: `fxtwitter.com`, `vxtwitter.com`, `fixupx.com`',
              ],
            },
            { p: 'Pega el enlace de la publicación que contiene el video. Si estás viendo una respuesta o una cita, abre primero la publicación original y copia su enlace. Los GIF animados de X se guardan como videos cortos, así que también se descargan en MP4.' },
          ],
        },
        {
          h: 'Cuando una descarga falla',
          blocks: [
            {
              ul: [
                'Las publicaciones de cuentas protegidas (privadas) no se pueden descargar.',
                'Las publicaciones marcadas como sensibles, con restricción de edad o que X solo muestra a usuarios con sesión iniciada pueden fallar.',
                'Las publicaciones borradas y las cuentas suspendidas no tienen nada que descargar.',
                'Una publicación que solo enlaza a un video de YouTube no tiene video de X; usa el [descargador de YouTube](/guides/download-youtube-videos/).',
              ],
            },
          ],
        },
        LEGAL_DL,
      ],
      faq: [
        { q: '¿Siguen funcionando los enlaces de twitter.com?', a: 'Sí. Funcionan tanto los enlaces de x.com como los de twitter.com.' },
        { q: '¿Qué calidad obtengo?', a: 'La máxima calidad que X ofrece para ese video, en MP4 con imagen H.264 siempre que sea posible.' },
        { q: '¿Puedo descargar videos de cuentas privadas?', a: 'No. Solo se admiten publicaciones públicas.' },
      ],
    },
    'download-instagram-reels': {
      title: 'Cómo descargar Reels y videos de Instagram',
      metaTitle: 'Descargar Reels y videos de Instagram (MP4)',
      description:
        'Guarda un Reel o una publicación de video pública de Instagram en MP4 pegando su enlace. Paso a paso para iPhone, Android y ordenador. Las cuentas privadas no se admiten.',
      short: 'Descargar Reels de Instagram',
      cta: 'Abrir el descargador de Instagram',
      intro: [
        'Instagram te deja guardar publicaciones dentro de la app, pero no como archivos que puedas conservar o editar. Para obtener un Reel o una publicación de video en MP4, copia su enlace y pégalo en {site}. Funciona solo con publicaciones públicas.',
      ],
      steps: [
        { name: 'Copia el enlace', text: 'En la app de Instagram, toca el icono de avión de papel del Reel o la publicación y luego Copiar enlace. En un ordenador, copia la dirección de la página.' },
        { name: 'Abre el descargador de Instagram', text: 'Ve a la pestaña Instagram de {site} e inicia sesión con Google.' },
        { name: 'Pega el enlace', text: 'Pega uno o varios enlaces. Elige Video para MP4 o Solo audio para M4A.' },
        { name: 'Guarda el archivo', text: 'Pulsa Descargar y guarda el archivo. En iPhone, ábrelo y usa Compartir y luego Guardar video para añadirlo a Fotos.' },
      ],
      sections: [
        {
          h: 'Qué enlaces funcionan',
          blocks: [
            {
              ul: [
                'Reels: `instagram.com/reel/…`',
                'Publicaciones de video: `instagram.com/p/…`',
                'Enlaces cortos: `instagr.am/…`',
              ],
            },
          ],
        },
        {
          h: 'Los videos privados no están disponibles',
          blocks: [
            { p: 'El descargador solo lee lo que Instagram muestra a quien no ha iniciado sesión. Eso deja fuera:' },
            {
              ul: [
                'Publicaciones y Reels de cuentas privadas.',
                'Historias, Destacadas y contenido de Mejores amigos.',
                'Algunas publicaciones públicas que Instagram solo muestra tras iniciar sesión, como las que tienen restricción de edad.',
              ],
            },
            { p: 'Si un enlace falla con un mensaje sobre una publicación privada o un inicio de sesión, el video no está disponible para el descargador.' },
          ],
        },
        {
          h: 'Carruseles con varios videos',
          blocks: [{ p: 'En una publicación con varias diapositivas, el descargador guarda el video que encuentra en ella. Las publicaciones solo de fotos no tienen video que descargar.' }],
        },
        LEGAL_DL,
      ],
      faq: [
        { q: '¿Puedo descargar Historias de Instagram?', a: 'No. Las Historias necesitan una sesión de Instagram iniciada, y el descargador no usa ninguna.' },
        { q: '¿Puedo descargar de una cuenta privada?', a: 'No. Solo se admiten Reels y publicaciones de video públicas.' },
        { q: '¿Puedo quedarme solo con la música de un Reel?', a: 'Sí. Pon el interruptor en Solo audio para obtener la banda sonora en M4A.' },
      ],
    },
    'download-audio-from-videos': {
      title: 'Cómo descargar el audio de YouTube, TikTok, X e Instagram',
      metaTitle: 'Descargar audio de YouTube, TikTok e Instagram (M4A)',
      description:
        'Quédate solo con el sonido de un video de YouTube, TikTok, X o Instagram en un archivo M4A. Pega el enlace, cambia a Solo audio y descarga. Sin apps.',
      short: 'Descargar solo el audio (M4A)',
      cta: 'Abrir los descargadores',
      intro: [
        'Cada descargador de {site} tiene un interruptor Video / Solo audio. Con Solo audio obtienes la banda sonora original del video en un archivo M4A: normalmente el audio AAC que la plataforma ya guarda, copiado sin recodificar, así que no se pierde calidad. Si una plataforma sirve otro códec, se convierte a AAC en alta calidad.',
      ],
      steps: [
        { name: 'Copia el enlace del video', text: 'Usa Compartir y luego Copiar enlace en la app de YouTube, TikTok, X o Instagram, o copia la dirección de la página en un ordenador.' },
        { name: 'Abre el descargador correspondiente', text: 'Elige la pestaña de esa plataforma en {site}.' },
        { name: 'Cambia a Solo audio', text: 'Pon el interruptor que hay sobre el cuadro del enlace en Solo audio y pega el enlace.' },
        { name: 'Descarga el M4A', text: 'Pulsa Descargar y guarda el archivo. M4A se reproduce en Apple Music, VLC, el Reproductor de Windows Media y la mayoría de las apps de edición.' },
      ],
      sections: [
        {
          h: 'Por qué M4A y no MP3',
          blocks: [
            { p: 'Estas plataformas casi siempre guardan el sonido en AAC. M4A es simplemente AAC dentro de un archivo tipo MP4, así que se puede guardar tal cual. Pasarlo a MP3 obligaría a decodificarlo y comprimirlo otra vez, lo que pierde algo de calidad sin ganar nada: todos los teléfonos, ordenadores y apps de edición actuales reproducen M4A.' },
            { p: 'Si necesitas un MP3 para un dispositivo antiguo, convierte el M4A con una herramienta gratuita como VLC (Medio → Convertir / Guardar) o ffmpeg:' },
            { code: 'ffmpeg -i sound.m4a -c:a libmp3lame -q:a 2 sound.mp3' },
          ],
        },
        {
          h: '¿Ya tienes el video?',
          blocks: [
            { p: 'Cada descarga de video terminada en {site} tiene también un botón Obtener audio, que extrae la banda sonora del MP4 que acabas de descargar.' },
          ],
        },
        LEGAL_DL,
      ],
      faq: [
        { q: '¿El audio se recodifica?', a: 'No cuando la plataforma sirve AAC, que es lo habitual: la pista se copia tal cual en un archivo M4A. Otros códecs se convierten a AAC.' },
        { q: '¿Puedo descargar una lista entera como audio?', a: 'No de una vez. Pega los enlaces de cada video, uno por línea.' },
      ],
    },
    'remove-gps-location-from-photos': {
      title: 'Cómo quitar la ubicación GPS de las fotos',
      metaTitle: 'Quitar la ubicación GPS de fotos (iPhone, Android, PC)',
      description:
        'Las fotos pueden guardar el lugar exacto donde se tomaron. Aprende a comprobar si tienen datos GPS y a quitarlos en iPhone, Android, Windows y Mac, o en un paso para cualquier foto.',
      short: 'Quitar la ubicación GPS de fotos',
      cta: 'Quitar los datos de ubicación ahora',
      intro: [
        'La mayoría de los teléfonos guardan la latitud y longitud exactas en cada foto, a menudo con un margen de pocos metros. Cualquiera que reciba el archivo original puede leerlas y poner un pin en un mapa: tu casa, tu escuela, tu trabajo. Algunas apps las quitan al publicar, pero el correo, las apps de mensajería que envían en «calidad original», los enlaces de la nube y las webs de compraventa suelen conservarlas.',
        'Esta guía explica cómo comprobar si una foto tiene datos de ubicación y cómo quitarlos, con los ajustes que ya trae tu teléfono u ordenador o en un solo paso con el eliminador de metadatos de {site}.',
      ],
      steps: [
        { name: 'Abre el eliminador de metadatos', text: 'Ve a la pestaña Strip de {site}.' },
        { name: 'Añade tus fotos', text: 'Suelta una o muchas fotos: JPEG, PNG, WebP, HEIC, AVIF, TIFF o GIF.' },
        { name: 'Elige dónde se procesan', text: 'Elige Este dispositivo para limpiar los archivos en tu navegador sin subirlos, o Servidor para procesarlos en {site} y que se borren justo después.' },
        { name: 'Descarga las copias limpias', text: 'Se quitan todos los metadatos, incluido el bloque GPS, de cada archivo. Descarga y comparte la copia limpia en lugar del original.' },
      ],
      sections: [
        {
          h: 'Dónde se guarda la ubicación',
          blocks: [
            { p: 'En las fotos JPEG, HEIC y TIFF, la ubicación está en el bloque GPS de EXIF: latitud, longitud, altitud, dirección a la que apuntaba la cámara y una marca de tiempo GPS. Las apps de edición también pueden copiarla en los metadatos XMP, y algunos teléfonos la escriben en los metadatos de la miniatura incrustada. Quitar solo uno de ellos puede dejar los demás, por eso una limpieza completa es más segura que borrar un campo.' },
          ],
        },
        {
          h: 'Cómo saber si una foto tiene ubicación',
          blocks: [
            {
              ul: [
                'iPhone: abre la foto en Fotos y desliza hacia arriba. Si aparece un mapa, la foto tiene ubicación.',
                'Android (Google Fotos): abre la foto, desliza hacia arriba y busca un mapa o un nombre de lugar.',
                'Windows: clic derecho en el archivo, Propiedades, pestaña Detalles, y mira en GPS.',
                'Mac: ábrela en Vista Previa, Herramientas y luego Mostrar inspector, y busca una pestaña GPS.',
              ],
            },
          ],
        },
        {
          h: 'Quítala con los ajustes de tu teléfono u ordenador',
          blocks: [
            {
              ul: [
                'iPhone, al compartir: selecciona las fotos, toca Compartir, toca Opciones arriba y desactiva Ubicación. Solo afecta a ese envío.',
                'iPhone, para fotos futuras: Ajustes, Privacidad y seguridad, Localización, Cámara, y elige Nunca.',
                'Android: abre los ajustes de la app Cámara y desactiva la opción de ubicación o geoetiquetado (el nombre cambia según el teléfono). En Google Fotos, Ajustes y luego Compartir tiene una opción para quitar la ubicación de lo que compartes por enlace.',
                'Windows: clic derecho en el archivo, Propiedades, Detalles y luego Quitar propiedades e información personal. Elige crear una copia sin todas las propiedades posibles.',
                'Mac: en Vista Previa, Herramientas, Mostrar inspector, pestaña GPS y luego Eliminar información de ubicación.',
              ],
            },
            { note: 'Estas opciones integradas suelen quitar solo los campos GPS. El modelo de cámara, el número de serie, las fechas y el historial de edición normalmente siguen en el archivo.' },
          ],
        },
        {
          h: 'Quítala con exiftool (línea de comandos)',
          blocks: [
            { p: 'Si te manejas con la terminal, el programa gratuito exiftool quita el bloque GPS, o todo, directamente en el archivo. Guarda una copia de seguridad terminada en `_original`.' },
            { code: 'exiftool -gps:all= -xmp:geotag= photo.jpg   # solo la ubicación\nexiftool -all= photo.jpg                     # todos los metadatos' },
          ],
        },
        {
          h: 'Qué más puede revelar una foto',
          blocks: [
            { p: 'La ubicación es el dato más sensible, pero el mismo archivo puede llevar el modelo del teléfono o la cámara y su número de serie, la fecha y hora exactas, el programa con que se editó, tu nombre o tu línea de copyright, las regiones de etiquetado de caras de las apps de fotos y una pequeña vista previa del original sin recortar. Mira [cómo quitar los datos EXIF](/guides/remove-exif-data-from-photos/) para la lista completa.' },
          ],
        },
      ],
      faq: [
        { q: '¿Instagram y Facebook quitan la ubicación de las fotos?', a: 'Las grandes redes sociales suelen quitar los datos EXIF, GPS incluido, de la copia que ven los demás. Los archivos enviados por correo, enlaces de la nube, algunas apps de chat en calidad original y muchos foros y webs de compraventa pueden conservarlos, así que es más seguro limpiar el archivo antes de enviarlo.' },
        { q: '¿Una captura de pantalla tiene datos de ubicación?', a: 'Normalmente no, porque la captura es una imagen nueva. Pero puede mostrar una ubicación dentro de la propia imagen, como un cartel de calle o un mapa.' },
        { q: '¿La foto se verá distinta después?', a: 'No. La copia limpia se guarda en alta calidad y se ve igual al verla normalmente; solo desaparecen los datos ocultos.' },
      ],
    },
    'remove-exif-data-from-photos': {
      title: 'Cómo quitar los datos EXIF y otros metadatos de las fotos',
      metaTitle: 'Quitar datos EXIF y metadatos de fotos',
      description:
        'Qué revelan de ti los metadatos EXIF, XMP, IPTC e ICC, cómo verlos y cómo quitarlos todos de fotos JPEG, PNG, HEIC, WebP y otras.',
      short: 'Quitar datos EXIF de fotos',
      cta: 'Quitar los metadatos de una foto ahora',
      intro: [
        'EXIF es el bloque de información que una cámara o un teléfono escribe en cada foto: el dispositivo, los ajustes, la fecha y, a menudo, el lugar. Las apps de edición añaden sus propias capas (XMP e IPTC), y algunos archivos llevan C2PA Content Credentials con un historial de edición. Nada de eso se ve en la imagen, pero cualquiera que tenga el archivo puede leerlo.',
      ],
      steps: [
        { name: 'Abre el eliminador de metadatos', text: 'Ve a la pestaña Strip de {site}.' },
        { name: 'Añade las fotos', text: 'Suelta tus archivos. Puedes añadir lotes.' },
        { name: 'Elige Este dispositivo o Servidor', text: 'Este dispositivo limpia las fotos en tu navegador y nunca las sube. Servidor las procesa en {site} y las borra justo después.' },
        { name: 'Descarga la copia limpia', text: 'Cada archivo vuelve sin EXIF, GPS, XMP, IPTC, ICC, C2PA, notas del fabricante, miniaturas ni comentarios.' },
      ],
      sections: [
        {
          h: 'Qué contienen los metadatos de una foto',
          blocks: [
            {
              ul: [
                'EXIF: marca y modelo de la cámara o el teléfono, objetivo, números de serie, ajustes de exposición, fecha y hora de la toma y de la edición, y ubicación GPS.',
                'Notas del fabricante: una zona EXIF propia de cada marca que puede guardar identificadores extra, como un número de serie interno o el número de disparos.',
                'XMP: lo escriben apps de edición como Lightroom y Photoshop. Puede incluir tu nombre, el historial de edición, valoraciones, palabras clave y una copia de los datos GPS.',
                'IPTC: pies de foto, créditos, copyright, el nombre y los datos de contacto del fotógrafo, y el campo Digital Source Type que algunas herramientas usan para marcar imágenes generadas con IA.',
                'Perfil ICC: describe los colores. Casi siempre inofensivo, pero algunos perfiles nombran el dispositivo o el programa que los creó.',
                'Miniatura incrustada: una pequeña vista previa guardada dentro del archivo. Puede mostrar la foto antes de recortarla o editarla.',
                'C2PA Content Credentials: un registro firmado de dónde viene la imagen y cómo se editó. Mira [cómo quitar C2PA](/guides/remove-c2pa-content-credentials/).',
                'Comentarios y bloques de texto: sobre todo los PNG pueden llevar texto libre, como el prompt y los ajustes de un generador de imágenes de IA.',
              ],
            },
          ],
        },
        {
          h: 'Formatos que limpia {site}',
          blocks: [{ p: 'JPEG, PNG, WebP, HEIC/HEIF, AVIF, TIFF y GIF. Las fotos HEIC vuelven en JPEG para que se abran en todas partes.' }],
        },
        {
          h: 'Otras formas de quitar EXIF',
          blocks: [
            {
              ul: [
                'Windows: Propiedades, Detalles, Quitar propiedades e información personal, y crear una copia limpia. No quita todos los campos en todos los formatos.',
                'Mac: Vista Previa puede quitar la ubicación (Herramientas, Mostrar inspector, GPS, Eliminar información de ubicación), pero no el resto. Exportar desde Fotos con Ubicación desmarcada también elimina el GPS.',
                'exiftool: `exiftool -all= photo.jpg` quita todo lo que puede escribir; añade `-r folder/` para una carpeta entera.',
                'Volver a guardar o hacer una captura: quita la mayoría de los metadatos, pero baja la calidad y según la app puede conservar algunos campos.',
              ],
            },
          ],
        },
      ],
      faq: [
        { q: '¿Quitar EXIF reduce la calidad?', a: 'No de forma visible. {site} guarda la copia limpia en alta calidad, así que se ve igual al verla normalmente.' },
        { q: '¿Cambiarán los colores si se quita el perfil ICC?', a: 'Las fotos de teléfonos y de la mayoría de las cámaras usan colores sRGB o Display P3 estándar y se ven igual. Los archivos en un espacio de color poco común pueden verse algo distintos.' },
        { q: '¿Se pueden recuperar los metadatos quitados?', a: 'No desde la copia limpia. Han desaparecido de ese archivo; tu original todavía los tiene, así que comparte la copia limpia.' },
      ],
    },
    'remove-metadata-from-iphone-photos': {
      title: 'Cómo quitar los metadatos de las fotos del iPhone (HEIC y JPEG)',
      metaTitle: 'Quitar metadatos de fotos del iPhone (HEIC)',
      description:
        'Las fotos del iPhone guardan ubicación, dispositivo, fecha y datos de edición. Cómo desactivarlo en el iPhone, quitarlo al compartir y borrarlo todo de archivos HEIC y JPEG.',
      short: 'Quitar metadatos de fotos del iPhone',
      cta: 'Limpiar fotos del iPhone ahora',
      intro: [
        'Una foto del iPhone suele ser un archivo HEIC con todos sus metadatos: el modelo de iPhone, el objetivo, la hora exacta, la ubicación si la Localización está activada para la Cámara y, tras editarla, las apps usadas. iOS puede quitar la ubicación al compartir, pero no el resto. Así se resuelven las dos cosas.',
      ],
      steps: [
        { name: 'Guarda las fotos en Archivos', text: 'En Fotos, selecciona las fotos, toca Compartir y luego Guardar en Archivos. (O pásalas por AirDrop o cópialas a un ordenador.)' },
        { name: 'Abre {site} en Safari', text: 'Ve a la pestaña Strip y toca para añadir archivos desde Archivos o tu fototeca.' },
        { name: 'Límpialas', text: 'Elige Este dispositivo para que se queden en tu iPhone, o Servidor para ir más rápido. Las fotos HEIC vuelven en JPEG.' },
        { name: 'Guarda las copias limpias', text: 'Descárgalas, abre cada una y toca Compartir, Guardar imagen para llevar la copia limpia a Fotos.' },
      ],
      sections: [
        {
          h: 'Quita la ubicación al compartir',
          blocks: [
            { p: 'Selecciona las fotos, toca Compartir, toca Opciones arriba de la hoja y desactiva Ubicación. iOS envía copias sin datos GPS solo en ese envío. Activar Todos los datos de la foto hace lo contrario y lo incluye todo.' },
            { note: 'Elegir fotos de la fototeca dentro de una web puede seguir enviando el archivo original con sus metadatos. Usa el interruptor de Opciones o limpia antes el archivo.' },
          ],
        },
        {
          h: 'Deja de guardar la ubicación',
          blocks: [{ p: 'Ajustes, Privacidad y seguridad, Localización, Cámara y luego Nunca. Las fotos nuevas no tendrán datos GPS. Las que ya hiciste conservan los suyos.' }],
        },
        {
          h: 'Por qué HEIC pasa a JPEG',
          blocks: [
            { p: 'HEIC es el formato por defecto de Apple. Muchas webs, apps de Windows y teléfonos Android antiguos no lo abren, así que {site} guarda las fotos HEIC limpias como JPEG de alta calidad. Si quieres que tu iPhone haga fotos en JPEG desde el principio, elige Ajustes, Cámara, Formatos, Más compatible.' },
          ],
        },
        {
          h: 'Live Photos, modo Retrato y ediciones',
          blocks: [
            { p: 'Una Live Photo es una imagen fija más un video MOV corto, y cada uno tiene sus metadatos. Limpiar la imagen no limpia el video; compártela como foto fija o limpia el video aparte con el [eliminador de metadatos de video](/guides/remove-metadata-from-videos/). Los datos de profundidad del modo Retrato y el historial de edición desaparecen de la copia limpia.' },
          ],
        },
      ],
      faq: [
        { q: '¿AirDrop conserva los metadatos?', a: 'Sí. AirDrop envía el original completo, ubicación incluida, salvo que antes desactives Ubicación en Opciones.' },
        { q: '¿iMessage quita la ubicación?', a: 'No de forma fiable. Desactiva Ubicación en Opciones al compartir o limpia la foto antes de enviarla.' },
      ],
    },
    'remove-metadata-from-videos': {
      title: 'Cómo quitar los metadatos de los videos (MP4, MOV y más)',
      metaTitle: 'Quitar metadatos de videos (MP4, MOV, MKV)',
      description:
        'Los videos guardan GPS, dispositivo, fechas, código de tiempo y etiquetas del codificador. Cómo verlos y quitarlos todos de videos MP4, MOV, MKV, WebM y otros.',
      short: 'Quitar metadatos de videos',
      cta: 'Quitar los metadatos de un video ahora',
      intro: [
        'Los videos de teléfonos y cámaras llevan tantos metadatos como las fotos, y a veces más: una ubicación, el modelo del dispositivo, fechas de creación, código de tiempo, el codificador usado y, en drones y cámaras de acción, una pista completa de GPS o telemetría grabada junto a la imagen. Las apps de edición añaden encima etiquetas de proyecto y de programa.',
      ],
      steps: [
        { name: 'Abre el eliminador de metadatos', text: 'Ve a la pestaña Strip de {site}.' },
        { name: 'Añade los videos', text: 'MP4, MOV, M4V, MKV, WebM, AVI, MTS/M2TS, TS, 3GP, WMV o FLV.' },
        { name: 'Elige Este dispositivo o Servidor', text: 'Este dispositivo funciona en tu navegador sin subir nada. Servidor es más rápido con archivos grandes, que se borran justo después.' },
        { name: 'Descarga la copia limpia', text: 'Se quitan todas las etiquetas, pistas de datos y cajas C2PA; el video y el sonido se mantienen.' },
      ],
      sections: [
        {
          h: 'Qué contienen los metadatos de un video',
          blocks: [
            {
              ul: [
                'Etiquetas globales: título, fecha de creación, marca y modelo del dispositivo, programa y ubicación (por ejemplo la etiqueta `©xyz` y `com.apple.quicktime.location.ISO6709` en los videos del iPhone).',
                'Etiquetas de pista: nombres, idiomas, nombres de manejador y datos del codificador de cada pista.',
                'Pistas de datos: telemetría GPS y de sensores de drones, cámaras de coche y cámaras de acción, guardada como pistas aparte junto al video y el audio.',
                'Pistas de código de tiempo y títulos de capítulos.',
                'Portadas y miniaturas adjuntas al archivo.',
                'Cajas C2PA: Content Credentials firmadas, cada vez más añadidas por cámaras, apps de edición y herramientas de video con IA.',
              ],
            },
          ],
        },
        {
          h: '¿El video se ve distinto?',
          blocks: [
            { p: 'No. Los metadatos están en el contenedor que rodea al video y al audio, no en la imagen. {site} guarda la copia limpia en alta calidad, así que se ve y se oye igual al reproducirla normalmente. El archivo no es idéntico byte a byte al original, lo cual es normal.' },
          ],
        },
        {
          h: 'Hazlo tú con ffmpeg',
          blocks: [
            { p: 'Con el programa gratuito ffmpeg, esto copia solo el video y el audio y descarta las etiquetas globales, los capítulos y las pistas de datos:' },
            { code: 'ffmpeg -i in.mov -map 0:v -map 0:a? -map_metadata -1 -map_chapters -1 \\\n  -fflags +bitexact -c copy out.mp4' },
            { p: 'Comprueba el resultado con `ffprobe -hide_banner out.mp4` o `exiftool out.mp4`. Algunas etiquetas de pista, como los nombres de manejador, pueden quedar; {site} también las borra.' },
          ],
        },
      ],
      faq: [
        { q: '¿YouTube o TikTok quitan los metadatos del video?', a: 'Recodifican lo que subes, lo que elimina la mayoría de lo que descargan los espectadores. El archivo original que envías por correo, enlace de la nube o chat sigue teniéndolos.' },
        { q: '¿El video perderá calidad?', a: 'No de forma visible. La copia limpia se guarda en alta calidad.' },
      ],
    },
    'remove-c2pa-content-credentials': {
      title: 'Qué son las C2PA Content Credentials y cómo quitarlas',
      metaTitle: 'Qué son las C2PA Content Credentials y cómo quitarlas',
      description:
        'Las C2PA Content Credentials registran quién hizo una foto o un video, con qué herramientas y ediciones. Cómo comprobar si un archivo las tiene, qué revelan y cómo quitarlas.',
      short: 'Quitar C2PA Content Credentials',
      cta: 'Comprobar y limpiar un archivo',
      intro: [
        'C2PA (de la Coalition for Content Provenance and Authenticity) es un estándar para añadir un registro firmado, llamado manifiesto o Content Credentials, a una foto, un video o un audio. Lo añaden algunas cámaras y teléfonos, apps de edición como Photoshop y Lightroom, y herramientas de IA como Adobe Firefly, las herramientas de imagen y video de OpenAI y los generadores de imágenes de Microsoft.',
        'El manifiesto sirve para mostrar de dónde viene un archivo, pero también puede llevar datos personales que quizá no quieras publicar. Esta guía explica qué contiene, cómo comprobar un archivo y cómo quitar el manifiesto incrustado.',
      ],
      steps: [
        { name: 'Comprueba el archivo', text: 'Súbelo a la web Content Credentials Verify (contentcredentials.org/verify) para ver si tiene manifiesto y qué dice.' },
        { name: 'Abre el eliminador de metadatos de {site}', text: 'Ve a la pestaña Strip y añade el archivo.' },
        { name: 'Límpialo', text: 'Elige Este dispositivo o Servidor. El manifiesto C2PA se quita junto con EXIF, XMP y el resto de metadatos.' },
        { name: 'Comprueba otra vez', text: 'Sube la copia limpia a la web Verify. No debería encontrar Content Credentials incrustadas.' },
      ],
      sections: [
        {
          h: 'Qué puede contener un manifiesto C2PA',
          blocks: [
            {
              ul: [
                'El nombre o la cuenta de la persona u organización que lo firmó, si decidió incluirlo.',
                'El dispositivo, la app o el servicio de IA que creó el archivo y el programa usado para editarlo.',
                'Una lista de ediciones (acciones), como recortes, cambios de color o «creado con una herramienta de IA generativa».',
                'Fechas y horas, y a veces una ubicación.',
                'Miniaturas de versiones anteriores e «ingredientes»: referencias a los archivos de origen que se combinaron.',
                'Una firma criptográfica que muestra si el archivo ha cambiado desde que se firmó.',
              ],
            },
          ],
        },
        {
          h: 'Dónde se guarda en el archivo',
          blocks: [
            { p: 'En los JPEG, el manifiesto va en segmentos APP11 (cajas JUMBF). En PNG es un bloque `caBX`, en MP4 y MOV una caja `uuid`, y en HEIC, WebP y AVIF su propia caja de metadatos. Como es un bloque aparte, quitarlo no toca la imagen.' },
          ],
        },
        {
          h: 'Qué hace quitarlo y qué no',
          blocks: [
            { p: 'La limpieza quita el manifiesto incrustado en el archivo. No quita:' },
            {
              ul: [
                'Las marcas de agua o logotipos visibles dibujados en la imagen.',
                'Las copias del manifiesto que guarda en línea la herramienta que creó el archivo. Algunos servicios guardan las Content Credentials en la nube y pueden volver a encontrarlas a partir de la propia imagen.',
                'Las marcas de agua invisibles en los píxeles, como [SynthID](/guides/what-is-synthid/) de Google. {site} altera SynthID por separado, pero ninguna herramienta puede garantizar que un detector no la encuentre.',
                'Ninguna obligación de declarar. Las leyes y las normas de las plataformas sobre etiquetar contenido generado o editado con IA siguen aplicándose al archivo.',
              ],
            },
            { note: 'Quitar las Content Credentials no impide que una plataforma etiquete un archivo como generado con IA. Las plataformas también usan sus propios clasificadores, detectores de marcas de agua y preguntas al subir.' },
          ],
        },
        {
          h: 'Otras formas de quitar C2PA',
          blocks: [
            {
              ul: [
                'exiftool: `exiftool -jumbf:all= -c2pa:all= photo.jpg` (versiones recientes) quita C2PA de los JPEG; para otros formatos es más sencillo `exiftool -all= file`.',
                'Volver a guardar en una app que no admite C2PA suele quitarlo, pero algunas apps, como Photoshop, añaden un manifiesto nuevo.',
                'Las capturas de pantalla crean un archivo nuevo sin el manifiesto original, con menos calidad.',
              ],
            },
          ],
        },
      ],
      faq: [
        { q: '¿Es legal quitar los datos C2PA?', a: 'Quitar metadatos de tus propios archivos suele estar permitido, pero algunas leyes y normas de plataformas exigen etiquetar el contenido generado con IA. Quitar las Content Credentials no cambia esas obligaciones.' },
        { q: '¿Quitar C2PA cambia cómo se ve la imagen?', a: 'No. El manifiesto es un bloque aparte del archivo; la imagen queda igual.' },
        { q: '¿Por qué la web Verify sigue encontrando Content Credentials?', a: 'Puede comparar algunas imágenes con credenciales guardadas en línea por el servicio que las creó. Ese registro lo guarda el servicio, no tu archivo.' },
      ],
    },
  },
};
