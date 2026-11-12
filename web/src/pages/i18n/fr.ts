import type { PagesTranslation } from './types';
import type { Section } from '../guides';

const LEGAL_DL: Section = {
  h: 'Est-ce légal ?',
  blocks: [
    {
      p: 'Ne téléchargez que des vidéos que vous avez faites vous-même, qui sont sous licence de réutilisation (par exemple Creative Commons) ou que leur auteur vous a autorisé à utiliser. Les conditions d’utilisation de la plupart des plateformes limitent le téléchargement, et le droit d’auteur varie d’un pays à l’autre. Enregistrer une vidéo ne vous donne pas le droit de la republier, et {site} n’est affilié à aucune de ces plateformes.',
    },
  ],
};

export const fr: PagesTranslation = {
  ui: {
    locale: 'fr-FR',
    kind: { synthid: 'Guide SynthID', privacy: 'Guide confidentialité', download: 'Guide téléchargement' },
    stepsTitle: 'Étape par étape avec {site}',
    questions: 'Questions fréquentes',
    related: 'Guides associés',
    contents: 'Sur cette page',
    updated: 'Mis à jour le',
    home: 'Accueil',
    guides: 'Guides',
    pricing: 'Tarifs',
    openTools: 'Ouvrir les outils',
    navLabel: 'Principal',
    breadcrumb: 'Fil d’Ariane',
    language: 'Langue',
    footer: {
      tagline: 'Suppresseur de métadonnées, C2PA et SynthID, et téléchargeurs YouTube, TikTok, X et Instagram.',
      open: 'Ouvrir les outils',
      synthidGuides: 'Guides SynthID',
      privacyGuides: 'Guides confidentialité',
      downloadGuides: 'Guides téléchargement',
      allGuides: 'Tous les guides',
      privacyPolicy: 'Politique de confidentialité (anglais)',
      terms: 'Conditions d’utilisation (anglais)',
      disclaimer:
        'Ne traitez et ne téléchargez que des contenus qui vous appartiennent ou que vous êtes autorisé à utiliser, et signalez les contenus générés par IA lorsque les règles l’exigent. {site} n’est affilié ni à Google, ni à YouTube, TikTok, X, Instagram ou Meta.',
    },
    index: {
      metaTitle: 'Guides : SynthID, métadonnées et téléchargement de vidéos',
      description:
        'Guides sur SynthID et les filigranes IA, pour supprimer le GPS, l’EXIF et le C2PA des photos et vidéos, et télécharger des vidéos YouTube, TikTok, X et Instagram.',
      title: ['Les guides', '{site}.'],
      lede: 'Des guides étape par étape pour nettoyer les métadonnées de vos fichiers et télécharger des vidéos, avec les options déjà présentes sur votre téléphone ou ordinateur et avec les outils {site}.',
      groups: {
        synthid: {
          title: 'SynthID et filigranes IA',
          text: 'Ce qu’est le filigrane invisible SynthID de Google, et comment l’affaiblir et effacer les métadonnées des images et vidéos de Veo, Gemini et Imagen pour que les plateformes cessent de les signaler comme IA.',
        },
        privacy: {
          title: 'Confidentialité et métadonnées',
          text: 'Supprimez les données cachées des photos et vidéos : position, informations sur l’appareil, dates, historique de retouche et C2PA Content Credentials.',
        },
        download: {
          title: 'Téléchargement de vidéos',
          text: 'Enregistrez des vidéos publiques de YouTube, TikTok, X et Instagram en MP4, ou gardez seulement le son en M4A.',
        },
      },
    },
    promo: {
      eyebrow: 'Offres',
      title: ['Nettoyez chaque fichier.', 'Dès 2 $.'],
      text: 'Vos premiers nettoyages et téléchargements sont gratuits. Ensuite, essayez 10 nettoyages SynthID pour 2 $, ou passez en illimité avec Basic ou Pro.',
      orYearly: 'ou {price} / an',
      seePlans: 'Comparer toutes les offres',
      download: {
        badge: 'Téléchargements illimités',
        title: ['Téléchargez sans limite.', 'Passez à Pro.'],
        text: 'Votre premier téléchargement vidéo est gratuit. Les téléchargements passent par notre serveur, donc ensuite il faut Pro : téléchargements illimités depuis YouTube, X, TikTok et Instagram, et nettoyage plus rapide.',
        cardText: 'Téléchargements vidéo illimités depuis YouTube, X, TikTok et Instagram, plus le nettoyage sur serveur environ 4x plus rapide. Résiliable à tout moment.',
        billing: 'Facturé au mois ou à l’année. Résiliez ou changez d’offre à tout moment.',
        cta: 'Télécharger sans limite',
      },
    },
  },
  guides: {
    'what-is-synthid': {
      title: 'Qu’est-ce que SynthID ? Le filigrane IA invisible de Google expliqué',
      metaTitle: 'Qu’est-ce que SynthID ? Le filigrane IA de Google',
      description:
        'SynthID est le filigrane invisible de Google DeepMind pour les images, vidéos, sons et textes générés par IA. Fonctionnement, détection, différence avec C2PA et suppression possible.',
      short: 'Qu’est-ce que SynthID ?',
      cta: 'Supprimer SynthID d’un fichier',
      stepsTitle: 'Comment supprimer SynthID avec {site}',
      intro: [
        '**SynthID est un filigrane invisible que Google DeepMind intègre aux contenus créés par les modèles d’IA de Google.** Il est tissé dans les pixels des images et des images vidéo, dans la forme d’onde du son et dans le choix des mots d’un texte : on ne peut ni le voir ni l’entendre, et il reste dans le fichier même quand les métadonnées sont effacées. Un détecteur peut ensuite le lire et dire si un fichier a été créé avec l’IA de Google.',
        'Les images de Gemini (y compris les modèles Nano Banana) et d’Imagen, les vidéos de Veo, la musique de Lyria et les textes de Gemini peuvent porter SynthID. Ce guide explique comment fonctionne le filigrane, comment vérifier un fichier, en quoi il diffère des C2PA Content Credentials, ce qu’il change pour les créateurs qui publient du contenu IA, et ce que vous pouvez faire ou non pour [supprimer SynthID](/app/#strip).',
      ],
      steps: [
        { name: 'Ouvrez le suppresseur SynthID', text: 'Allez dans l’[onglet Strip](/app/#strip) de {site} et connectez-vous avec Google.' },
        { name: 'Ajoutez votre image ou vidéo', text: 'Déposez des fichiers de Gemini, Imagen, Veo ou de tout autre générateur. JPEG, PNG, WebP, HEIC, MP4, MOV et d’autres formats sont pris en charge.' },
        { name: 'Choisissez Serveur ou Cet appareil', text: 'Serveur réencode les grosses vidéos environ 4 fois plus vite et les supprime aussitôt après. Cet appareil n’envoie jamais le fichier.' },
        { name: 'Téléchargez la copie propre', text: 'Les métadonnées, C2PA compris, sont supprimées et le filigrane SynthID est affaibli. Chaque fichier indique ce qui a été retiré.' },
      ],
      sections: [
        {
          h: 'SynthID en bref',
          blocks: [
            {
              ul: [
                '**Créé par :** Google DeepMind. Lancé en août 2023 pour les images d’Imagen, puis étendu à la vidéo, au son et au texte.',
                '**Ce qu’il marque :** les contenus générés par les modèles d’IA de Google, comme Gemini, Nano Banana, Imagen, Veo et Lyria. Google affirme avoir marqué plus de 10 milliards de contenus.',
                '**Où il se trouve :** dans le contenu lui-même (pixels, images vidéo, son ou choix des mots), pas dans les métadonnées.',
                '**Visible ?** Non. Les modifications sont trop faibles pour être vues ou entendues.',
                '**Qui peut le lire :** SynthID Detector de Google et les fonctions de vérification des produits Google comme l’application Gemini.',
                '**Peut-on le supprimer ?** Il est conçu pour résister aux retouches courantes, donc il ne s’efface pas comme une balise de métadonnées. Un réencodage peut l’affaiblir, sans garantie.',
              ],
            },
          ],
        },
        {
          h: 'Comment fonctionne SynthID',
          blocks: [
            { p: 'SynthID n’est pas un tampon ajouté sur un fichier fini. Il est appliqué pendant la génération du contenu, grâce à deux réseaux de neurones entraînés ensemble : l’un apporte de minuscules changements qui encodent un motif, l’autre apprend à retrouver ce motif, même après modification du fichier.' },
            {
              ul: [
                '**Images :** les valeurs de nombreux pixels sont légèrement ajustées pour former un motif réparti sur toute l’image. Aucune zone ne le contient seule, donc recadrer une partie de l’image ne le supprime pas.',
                '**Vidéo :** chaque image est marquée comme une photo, c’est pourquoi le filigrane survit à la coupe d’un clip ou au changement de cadence. Les vidéos Veo le portent sur chaque image.',
                '**Son :** le motif est ajouté au son d’une façon que l’oreille ne remarque pas, et il est conçu pour résister à la compression MP3, au bruit ajouté et aux changements de vitesse.',
                '**Texte :** pendant que Gemini écrit, SynthID modifie légèrement la probabilité du mot suivant. Sur un long passage, ces choix forment un signal statistique. Google a publié la version texte en open source pour que d’autres développeurs l’utilisent.',
              ],
            },
            { p: 'Comme le filigrane fait partie du contenu, il ne dépend pas du format du fichier. Enregistrer un PNG en JPEG, envoyer une vidéo sur une plateforme qui la recompresse ou faire une capture d’écran le laisse généralement lisible.' },
          ],
        },
        {
          h: 'SynthID, C2PA Content Credentials et métadonnées',
          blocks: [
            { p: 'Les fichiers IA portent souvent plusieurs marqueurs à la fois, et chacun se supprime différemment :' },
            {
              ul: [
                '**SynthID** est un filigrane invisible dans les pixels ou le son. Effacer les métadonnées n’y touche pas. On ne peut l’affaiblir qu’en modifiant le contenu lui-même.',
                '**Les C2PA Content Credentials** sont un enregistrement signé dans les métadonnées du fichier qui indique quel outil l’a créé et comment il a été retouché. Des plateformes comme TikTok les lisent pour activer automatiquement une étiquette « généré par IA ». Un nettoyage des métadonnées les supprime entièrement. Voir [ce qu’est le C2PA et comment le supprimer](/guides/remove-c2pa-content-credentials/).',
                '**Les balises IPTC et XMP**, comme le champ « Digital Source Type », sont des métadonnées ordinaires que certains générateurs ajoutent pour indiquer qu’une image est issue de l’IA. Voir [supprimer l’EXIF et les métadonnées](/guides/remove-exif-data-from-photos/).',
                '**Les filigranes visibles**, comme le logo étincelle dans un coin, sont dessinés dans l’image et sont encore autre chose.',
              ],
            },
            { p: 'Google utilise SynthID et C2PA ensemble sur certains produits : les métadonnées se vérifient vite mais se perdent facilement, alors que le filigrane est plus difficile à supprimer mais nécessite un détecteur pour être lu.' },
          ],
        },
        {
          h: 'Comment savoir si une image ou une vidéo contient SynthID',
          blocks: [
            {
              ul: [
                '**SynthID Detector :** le portail de vérification de Google. Envoyez une image, une vidéo ou un son et il indique s’il a trouvé un filigrane SynthID ; pour les images, il peut surligner les zones où il est le plus probable.',
                '**L’application Gemini :** envoyez une image ou une vidéo et demandez si elle a été faite avec l’IA de Google. Gemini cherche SynthID et répond dans la conversation.',
                '**Content Credentials Verify :** [contentcredentials.org/verify](https://contentcredentials.org/verify) affiche les métadonnées C2PA, pas SynthID. Un fichier peut réussir une vérification et échouer à l’autre.',
              ],
            },
            { note: 'Un résultat « non trouvé » ne prouve pas qu’un fichier a été fait par un humain. SynthID ne marque que les contenus des modèles qui l’utilisent, et un fichier très retouché peut perdre un signal lisible. De même, un détecteur peut seulement dire qu’un filigrane est probablement présent ; ce n’est pas une preuve de l’auteur du fichier.' },
          ],
        },
        {
          h: 'Ce à quoi SynthID résiste, et ce qui l’affaiblit',
          blocks: [
            { p: 'Google a conçu SynthID pour résister aux retouches ordinaires d’un fichier partagé : compression, redimensionnement, léger recadrage, changements de couleur et de luminosité, filtres, changement de format et, pour la vidéo, changement de cadence. C’est ce qui le distingue des métadonnées, qui disparaissent dès que de nombreuses applis réenregistrent le fichier.' },
            { p: 'Il n’est pas indestructible. Google reconnaît lui-même que de fortes modifications d’une image, ou de nombreuses retouches d’un texte, peuvent affaiblir le signal au point que le détecteur n’est plus sûr de lui. Des chercheurs ont aussi publié des attaques contre des systèmes de filigrane similaires. Plus on modifie les pixels, plus le filigrane s’affaiblit, mais plus l’image peut en souffrir : le but d’un bon suppresseur de SynthID est donc de changer chaque pixel tout en gardant l’image identique à l’œil.' },
          ],
        },
        {
          h: 'Pourquoi SynthID compte pour les créateurs',
          blocks: [
            { p: 'Si vous publiez des images ou des vidéos IA, c’est grâce à SynthID et au C2PA que les plateformes et le public le découvrent. TikTok, Instagram, YouTube et d’autres analysent chaque envoi à la recherche de Content Credentials et de filigranes, et quand elles en trouvent, elles peuvent ajouter une étiquette IA que vous ne pouvez pas désactiver. Les règles se durcissent aussi : dans l’UE, les obligations de transparence de l’AI Act (article 50), applicables depuis août 2026, imposent aux fournisseurs d’IA de marquer les contenus générés de façon lisible par machine, et SynthID est l’un des moyens utilisés par Google.' },
            { p: 'Supprimer ces signaux ne supprime pas votre propre obligation de signaler un contenu IA quand une plateforme ou la loi l’exige. Cela vous rend en revanche le choix du moment et de la manière d’étiqueter votre travail, au lieu d’une étiquette automatique sur chaque publication.' },
          ],
        },
        {
          h: 'Peut-on supprimer SynthID ?',
          blocks: [
            { p: 'On ne peut pas effacer SynthID comme une balise de métadonnées, car il n’y a pas de bloc séparé à couper. Ce qu’on peut faire, c’est modifier chaque pixel ou échantillon juste assez pour que le motif ne s’aligne plus, tout en gardant l’image identique à l’œil. C’est ce que fait le [suppresseur SynthID de {site}](/app/#strip) :' },
            {
              ul: [
                '**Images :** un rééchantillonnage quasi unitaire, une trace de bruit et une légère accentuation déplacent chaque pixel, puis l’image est réenregistrée en haute qualité.',
                '**Vidéos :** un réencodage haute qualité (CRF 18) avec un léger flou, une accentuation équivalente et un peu de bruit qui change d’une image à l’autre ; le son est légèrement rééchantillonné.',
                '**Métadonnées :** EXIF, GPS, XMP, IPTC et C2PA Content Credentials sont entièrement supprimés, sur chaque fichier.',
              ],
            },
            { note: 'SynthID est conçu pour résister aux retouches, donc aucun outil ne peut promettre qu’un détecteur le manquera. {site} affaiblit le filigrane autant que possible sans changer visiblement le fichier. Les métadonnées, C2PA compris, sont toujours entièrement supprimées.' },
            { p: 'Guides étape par étape pour chaque générateur : [vidéos Google Veo](/guides/remove-synthid-from-google-veo/), [images Gemini et Nano Banana](/guides/remove-synthid-from-gemini-images/), [images Imagen](/guides/remove-synthid-from-imagen-images/) et [fichiers Higgsfield](/guides/remove-synthid-from-higgsfield/).' },
          ],
        },
      ],
      faq: [
        { q: 'Qu’est-ce que SynthID, en termes simples ?', a: 'SynthID est un filigrane caché que Google place dans les images, vidéos, sons et textes créés par son IA. Vous ne le voyez pas, mais le détecteur de Google peut le lire pour savoir que le contenu vient de l’IA de Google.' },
        { q: 'SynthID est-il visible ?', a: 'Non. Les modifications des pixels ou du son sont trop faibles pour être vues ou entendues. Le logo étincelle que portent certaines images Gemini est un autre filigrane, visible celui-là.' },
        { q: 'Quels outils d’IA utilisent SynthID ?', a: 'Les modèles de Google : Gemini et les modèles d’image Nano Banana, Imagen, Veo, Lyria et le texte de Gemini. Google propose aussi SynthID à des partenaires, donc des contenus d’autres entreprises peuvent le porter. La plupart des autres générateurs, comme Midjourney ou Sora, utilisent plutôt des métadonnées C2PA ou leurs propres marques.' },
        { q: 'Supprimer les métadonnées supprime-t-il SynthID ?', a: 'Non. SynthID se trouve dans les pixels, pas dans les métadonnées, donc effacer l’EXIF ou le C2PA le laisse en place. Il faut modifier les pixels pour l’affaiblir, ce que fait le nettoyage SynthID de {site}.' },
        { q: 'Une capture d’écran ou un réenregistrement supprime-t-il SynthID ?', a: 'Généralement non. Les captures, les changements de format et la compression laissent le motif des pixels presque intact ; SynthID a été conçu pour y résister. Ils suppriment en revanche la plupart des métadonnées.' },
        { q: 'Comment savoir si une image contient SynthID ?', a: 'Envoyez-la sur SynthID Detector de Google, ou demandez à l’application Gemini si l’image a été faite avec l’IA de Google. Aucun des deux ne peut prouver qu’un fichier n’a pas été fait avec une IA.' },
        { q: 'SynthID et C2PA, c’est la même chose ?', a: 'Non. Les C2PA Content Credentials sont des métadonnées signées que l’on peut retirer du fichier. SynthID est un filigrane dans le contenu lui-même. Beaucoup de fichiers Google portent les deux. [{site}](/app/#strip) supprime entièrement le C2PA et affaiblit SynthID.' },
        { q: 'Peut-on supprimer SynthID complètement ?', a: 'Pas avec certitude. Il est conçu pour résister aux retouches, et les détecteurs progressent sans cesse. Un réencodage avec de petites modifications de pixels, comme le fait {site}, l’affaiblit en gardant l’apparence du fichier, mais aucun outil ne peut garantir qu’un détecteur le manquera.' },
        { q: 'Est-il légal de supprimer SynthID ?', a: 'Cela dépend de votre pays et de l’usage du fichier. Ne traitez que des contenus qui vous appartiennent ou que vous êtes autorisé à utiliser, et signalez les contenus générés par IA quand la loi ou une plateforme l’exige.' },
      ],
    },
    'remove-synthid-from-google-veo': {
      title: 'Comment supprimer SynthID des vidéos Google Veo',
      metaTitle: 'Supprimer SynthID des vidéos Google Veo',
      description:
        'Chaque vidéo Google Veo porte un filigrane SynthID invisible et des C2PA Content Credentials. Comment affaiblir SynthID et effacer les métadonnées pour que les plateformes cessent de la signaler.',
      short: 'Supprimer SynthID des vidéos Veo',
      cta: 'Nettoyer une vidéo Veo maintenant',
      intro: [
        'Google Veo inscrit un [filigrane SynthID](/guides/what-is-synthid/) invisible dans les pixels de chaque vidéo qu’il crée et ajoute des C2PA Content Credentials aux métadonnées du fichier. Les Content Credentials sont ce que lisent des plateformes comme TikTok pour activer automatiquement une étiquette « généré par IA » ; le filigrane SynthID est ce que cherche le détecteur de Google.',
        '{site} supprime les métadonnées, manifeste C2PA compris, et réencode la vidéo pour perturber le filigrane SynthID, tout en gardant l’image et le son identiques. Aucun outil ne peut promettre qu’un détecteur manquera un filigrane conçu pour résister aux retouches : le résultat n’est donc pas garanti.',
      ],
      steps: [
        { name: 'Ouvrez le suppresseur SynthID', text: 'Allez dans l’onglet Strip de {site}.' },
        { name: 'Ajoutez votre vidéo Veo', text: 'Déposez le MP4. Les métadonnées et SynthID sont toujours supprimés, il n’y a rien à activer.' },
        { name: 'Choisissez Serveur pour aller vite', text: 'Serveur réencode les grosses vidéos environ 4 fois plus vite et les supprime aussitôt après. Cet appareil garde le fichier dans votre navigateur, mais c’est plus lent.' },
        { name: 'Téléchargez la copie propre', text: 'Chaque fichier indique ce qui a été retiré. Partagez la copie propre plutôt que l’original.' },
      ],
      sections: [
        {
          h: 'Ce que Veo met dans le fichier',
          blocks: [
            {
              ul: [
                'SynthID : un filigrane invisible au niveau des pixels sur toute la vidéo, conçu pour résister au redimensionnement, au recadrage et à la recompression.',
                'C2PA Content Credentials : un manifeste signé dans les métadonnées qui indique que la vidéo a été faite avec l’IA de Google.',
                'Des balises de conteneur et d’encodeur, la date de création et d’autres métadonnées standard.',
              ],
            },
            { p: 'Voir [ce que sont les C2PA Content Credentials](/guides/remove-c2pa-content-credentials/) pour le manifeste, et [supprimer les métadonnées d’une vidéo](/guides/remove-metadata-from-videos/) pour le reste.' },
          ],
        },
        {
          h: 'Comment {site} affaiblit le filigrane',
          blocks: [
            { p: 'La vidéo est réencodée à une qualité visuellement transparente (CRF 18) avec un flou infime, une accentuation équivalente et une trace de bruit qui change d’une image à l’autre. Cela rééchantillonne chaque pixel et décale la grille du filigrane, tandis que les métadonnées, C2PA compris, sont entièrement supprimées. Le son est légèrement rééchantillonné pour perturber un éventuel filigrane audio.' },
          ],
        },
        {
          h: 'Ce qu’il peut faire, et ce qu’il ne peut pas faire',
          blocks: [
            { note: 'SynthID est conçu pour résister aux retouches. {site} l’affaiblit, mais ne peut garantir que le détecteur de Google ou le classificateur d’une plateforme le manquera. Les métadonnées C2PA, elles, sont entièrement supprimées.' },
            { p: 'Supprimer ces signaux ne supprime aucune obligation légale ou de plateforme d’étiqueter un contenu IA. Suivez les règles de transparence de chaque plateforme.' },
          ],
        },
      ],
      faq: [
        { q: 'Veo ajoute-t-il toujours SynthID ?', a: 'Oui. Google applique SynthID aux images et vidéos que génèrent ses modèles, dont Veo. Le filigrane est invisible et n’apparaît pas dans l’image.' },
        { q: 'La vidéo Veo perd-elle en qualité ?', a: 'Le nettoyage SynthID réencode la vidéo, donc elle n’est pas identique octet par octet, mais elle est enregistrée en haute qualité et paraît identique en visionnage normal.' },
        { q: 'TikTok signalera-t-il encore ma vidéo Veo comme IA ?', a: 'C’est possible. {site} supprime les C2PA Content Credentials que lisent les plateformes, mais celles-ci utilisent aussi leurs propres classificateurs et détecteurs de filigrane. Nous ne garantissons pas qu’un fichier ne sera pas étiqueté.' },
      ],
    },
    'remove-synthid-from-gemini-images': {
      title: 'Comment supprimer SynthID des images Gemini (Nano Banana)',
      metaTitle: 'Supprimer SynthID des images IA Gemini',
      description:
        'Les images de Gemini et du modèle Nano Banana portent un filigrane SynthID invisible et des métadonnées. Comment perturber SynthID et retirer les métadonnées en une seule étape.',
      short: 'Supprimer SynthID des images Gemini',
      cta: 'Nettoyer une image Gemini maintenant',
      intro: [
        'Les images créées avec Gemini, y compris le modèle d’image Nano Banana, portent dans leurs pixels le [filigrane SynthID](/guides/what-is-synthid/) invisible de Google, et généralement une balise IPTC « Digital Source Type » et d’autres métadonnées qui les signalent comme générées par IA.',
        '{site} rééchantillonne et réencode l’image pour perturber le filigrane SynthID et retire les métadonnées qui l’étiquettent. L’image reste identique. Comme SynthID pour les images est conçu pour résister au redimensionnement et au réenregistrement, un détecteur peut encore le trouver : le résultat n’est pas garanti.',
      ],
      steps: [
        { name: 'Ouvrez le suppresseur SynthID', text: 'Allez dans l’onglet Strip de {site}.' },
        { name: 'Ajoutez votre image Gemini', text: 'Déposez le JPEG, PNG ou WebP. Les métadonnées et SynthID sont toujours supprimés.' },
        { name: 'Choisissez Cet appareil ou Serveur', text: 'Cet appareil nettoie l’image dans votre navigateur sans l’envoyer. Serveur est plus rapide pour les gros lots.' },
        { name: 'Téléchargez la copie propre', text: 'Le fichier revient sans EXIF, XMP, IPTC ni C2PA, et avec un filigrane affaibli.' },
      ],
      sections: [
        {
          h: 'Ce que contient une image Gemini',
          blocks: [
            {
              ul: [
                'SynthID : un filigrane invisible réparti dans les pixels.',
                'Des balises IPTC « Digital Source Type » et XMP qui indiquent que l’image est générée par IA.',
                'Parfois des C2PA Content Credentials, en plus des données EXIF et ICC habituelles.',
              ],
            },
          ],
        },
        {
          h: 'Comment {site} le perturbe',
          blocks: [
            { p: 'L’image est rééchantillonnée par une réduction puis un agrandissement quasi unitaires, une légère accentuation et une trace de bruit additif, puis réenregistrée en haute qualité. Cela déplace chaque pixel et brouille la grille du filigrane, tandis que chaque bloc de métadonnées (EXIF, XMP, IPTC et C2PA) est supprimé.' },
          ],
        },
        {
          h: 'Pourquoi elle peut encore être détectée',
          blocks: [
            { note: 'SynthID pour les images est conçu pour résister au redimensionnement et à la recompression, donc un cas difficile peut encore déclencher le détecteur de Google après nettoyage. {site} affaiblit le filigrane autant que possible sans changer visiblement l’image ; les métadonnées sont supprimées dans tous les cas.' },
          ],
        },
      ],
      faq: [
        { q: 'Nano Banana, c’est pareil que Gemini ici ?', a: 'Oui. Nano Banana est un modèle d’image Gemini, et ses images portent SynthID de la même façon. Les étapes sont les mêmes.' },
        { q: 'Supprimer SynthID change-t-il l’aspect de l’image ?', a: 'Pas de façon visible. Le rééchantillonnage, le bruit et le réencodage sont quasi sans perte et l’image paraît identique en visionnage normal.' },
        { q: 'Et si l’image est encore signalée comme IA ?', a: 'C’est le filigrane des pixels qui résiste, pas les métadonnées. Les balises EXIF, XMP, IPTC et C2PA sont entièrement supprimées ; le filigrane est seulement affaibli, sans garantie.' },
      ],
    },
    'remove-synthid-from-imagen-images': {
      title: 'Comment supprimer SynthID des images Google Imagen',
      metaTitle: 'Supprimer SynthID des images Google Imagen',
      description:
        'Google Imagen marque chaque image d’un filigrane SynthID invisible et de métadonnées IA. Comment affaiblir le filigrane et retirer les métadonnées pour que votre image ne soit pas signalée.',
      short: 'Supprimer SynthID des images Imagen',
      cta: 'Nettoyer une image Imagen maintenant',
      intro: [
        'Imagen est le modèle texte-vers-image de Google, utilisé dans Gemini, ImageFX et d’autres applis Google. Chaque image qu’il crée porte dans ses pixels un [filigrane SynthID](/guides/what-is-synthid/) invisible, ainsi que des métadonnées (souvent une balise IPTC « Digital Source Type » et des C2PA Content Credentials) qui la signalent comme générée par IA.',
        '{site} rééchantillonne et réencode l’image pour perturber SynthID et supprime toutes les métadonnées. Le résultat reste identique. SynthID est conçu pour résister aux retouches, donc un détecteur peut encore le trouver ; les métadonnées, elles, sont supprimées à coup sûr.',
      ],
      steps: [
        { name: 'Ouvrez le suppresseur SynthID', text: 'Allez dans l’onglet Strip de {site}.' },
        { name: 'Ajoutez votre image Imagen', text: 'Déposez le fichier. Les métadonnées et SynthID sont toujours supprimés.' },
        { name: 'Choisissez Cet appareil ou Serveur', text: 'Cet appareil n’envoie jamais le fichier ; Serveur est plus rapide pour les lots et supprime les fichiers aussitôt après.' },
        { name: 'Téléchargez la copie propre', text: 'Partagez la copie propre, qui indique ce qui a été retiré, plutôt que l’original.' },
      ],
      sections: [
        {
          h: 'Ce qu’Imagen intègre',
          blocks: [
            {
              ul: [
                'SynthID : un filigrane invisible au niveau des pixels sur chaque image générée.',
                'Des balises IPTC / XMP, dont un champ « Digital Source Type » qui la désigne comme générée par IA.',
                'Des C2PA Content Credentials sur certains services, en plus des données EXIF et ICC standard.',
              ],
            },
            { p: 'Pour la liste complète de ce que peuvent révéler les métadonnées d’une photo, voir [supprimer l’EXIF et les métadonnées](/guides/remove-exif-data-from-photos/).' },
          ],
        },
        {
          h: 'Comment fonctionne le nettoyage',
          blocks: [
            { p: 'Un rééchantillonnage quasi unitaire déplace chaque pixel, une légère accentuation rend la netteté et une trace de bruit brouille la grille du filigrane. L’image est ensuite réencodée en haute qualité sans aucune métadonnée : EXIF, XMP, IPTC et C2PA disparaissent.' },
          ],
        },
        {
          h: 'Limites',
          blocks: [
            { note: 'Aucun outil ne peut garantir qu’un détecteur SynthID manquera un filigrane conçu pour résister aux retouches. {site} l’affaiblit ; les métadonnées sont supprimées avec certitude. Les règles de transparence sur les contenus IA s’appliquent toujours.' },
          ],
        },
      ],
      faq: [
        { q: 'Où Imagen est-il utilisé ?', a: 'Imagen génère les images de Gemini, d’ImageFX et d’autres outils Google. Les images de chacun d’eux portent SynthID et se nettoient de la même façon.' },
        { q: 'Est-ce que cela supprime un filigrane visible ?', a: 'Non. {site} perturbe le filigrane invisible SynthID et supprime les métadonnées. Il ne retire pas les logos ou filigranes visibles dessinés dans l’image.' },
        { q: 'Les couleurs vont-elles changer ?', a: 'Non. Imagen produit du sRGB, donc retirer le profil couleur ne modifie pas les couleurs.' },
      ],
    },
    'remove-synthid-from-higgsfield': {
      title: 'Comment supprimer SynthID et C2PA des vidéos et images Higgsfield',
      metaTitle: 'Supprimer SynthID et C2PA des fichiers Higgsfield',
      description:
        'Higgsfield fait tourner plusieurs modèles d’IA, donc ses fichiers peuvent porter un filigrane SynthID, des C2PA Content Credentials ou les deux. Comment les nettoyer pour éviter le signalement.',
      short: 'Supprimer SynthID de Higgsfield',
      cta: 'Nettoyer un fichier Higgsfield maintenant',
      intro: [
        'Higgsfield est une plateforme qui réunit plusieurs modèles d’IA, dont Google Veo. Ce qui se retrouve dans votre fichier dépend du modèle utilisé : une vidéo faite avec Veo porte le [filigrane SynthID](/guides/what-is-synthid/) invisible de Google, et la plupart des générateurs ajoutent aussi des C2PA Content Credentials aux métadonnées pour marquer le fichier comme généré par IA.',
        '{site} supprime les métadonnées, C2PA compris, et réencode le fichier pour perturber un éventuel filigrane SynthID, tout en gardant l’image et le son identiques. SynthID est conçu pour résister aux retouches, donc aucun outil ne peut promettre qu’un détecteur le manquera ; le résultat n’est pas garanti.',
      ],
      steps: [
        { name: 'Ouvrez le suppresseur SynthID', text: 'Allez dans l’onglet Strip de {site}.' },
        { name: 'Ajoutez votre fichier Higgsfield', text: 'Déposez la vidéo ou l’image. Laissez le nettoyage SynthID activé (il l’est par défaut) pour qu’un fichier fait avec Veo soit aussi réencodé.' },
        { name: 'Choisissez Serveur pour aller vite', text: 'Serveur réencode les grosses vidéos environ 4 fois plus vite et les supprime aussitôt après. Cet appareil garde le fichier dans votre navigateur, mais c’est plus lent.' },
        { name: 'Téléchargez la copie propre', text: 'Chaque fichier indique ce qui a été retiré. Partagez la copie propre plutôt que l’original.' },
      ],
      sections: [
        {
          h: 'Ce que peut contenir un fichier Higgsfield',
          blocks: [
            {
              ul: [
                'SynthID : présent quand le fichier a été fait avec un modèle Google comme Veo. C’est un filigrane invisible au niveau des pixels.',
                'C2PA Content Credentials : un manifeste signé dans les métadonnées qui indique que le fichier a été généré par IA. Voir [supprimer le C2PA](/guides/remove-c2pa-content-credentials/).',
                'Les métadonnées habituelles de conteneur, d’encodeur, EXIF et de minutage.',
              ],
            },
            { p: 'Comme Higgsfield mélange les modèles, vous ne savez pas toujours quel filigrane porte un fichier. Laisser le nettoyage SynthID activé couvre les deux cas : les métadonnées sont toujours supprimées, et le réencodage s’applique au cas où SynthID serait présent.' },
          ],
        },
        {
          h: 'Comment {site} le nettoie',
          blocks: [
            { p: 'Les vidéos sont réencodées à une qualité visuellement transparente (CRF 18) avec un flou infime, une accentuation équivalente et une trace de bruit entre les images ; les images sont rééchantillonnées, bruitées et accentuées, puis réenregistrées en haute qualité. Dans les deux cas, chaque bloc de métadonnées, C2PA compris, est supprimé. Le résultat s’affiche et se lit de la même façon.' },
          ],
        },
        {
          h: 'Ce qu’il peut faire, et ce qu’il ne peut pas faire',
          blocks: [
            { note: 'SynthID est conçu pour résister aux retouches. {site} l’affaiblit, mais ne peut garantir qu’un détecteur ou le classificateur d’une plateforme le manquera. Les métadonnées C2PA, elles, sont entièrement supprimées.' },
            { p: 'Supprimer ces signaux ne supprime aucune obligation légale ou de plateforme d’étiqueter un contenu IA. Suivez les règles de transparence de chaque plateforme.' },
          ],
        },
      ],
      faq: [
        { q: 'Tous les fichiers Higgsfield ont-ils SynthID ?', a: 'Non. Seuls les fichiers faits avec un modèle Google comme Veo portent SynthID. Ceux des autres modèles de Higgsfield portent généralement des C2PA Content Credentials. {site} gère les deux : les métadonnées sont toujours supprimées, et le réencodage s’applique quand le nettoyage SynthID est activé.' },
        { q: 'Ma vidéo Higgsfield va-t-elle perdre en qualité ?', a: 'Le nettoyage SynthID réencode la vidéo, donc elle n’est pas identique octet par octet, mais elle est enregistrée en haute qualité et paraît identique en visionnage normal.' },
        { q: 'TikTok signalera-t-il encore ma vidéo Higgsfield comme IA ?', a: 'C’est possible. {site} supprime les C2PA Content Credentials que lisent les plateformes, mais celles-ci utilisent aussi leurs propres classificateurs et détecteurs de filigrane. Nous ne garantissons pas qu’un fichier ne sera pas étiqueté.' },
      ],
    },
    'download-youtube-videos': {
      title: 'Comment télécharger des vidéos et Shorts YouTube en MP4',
      metaTitle: 'Télécharger des vidéos et Shorts YouTube (MP4, 1080p)',
      description:
        'Enregistrez une vidéo ou un Short YouTube en MP4 jusqu’à 1080p, ou en audio M4A, en collant son lien. Fonctionne avec les liens youtube.com, youtu.be et Shorts. Rien à installer.',
      short: 'Télécharger des vidéos et Shorts YouTube',
      cta: 'Ouvrir le téléchargeur YouTube',
      intro: [
        'Le moyen le plus rapide d’enregistrer une vidéo YouTube est de copier son lien et de le coller dans un téléchargeur qui fait le travail sur un serveur. {site} récupère la meilleure version jusqu’à 1080p, réunit l’image et le son dans un MP4 lisible sur tout téléphone ou ordinateur, et vous l’envoie. Vous pouvez aussi garder seulement l’audio en fichier M4A.',
      ],
      steps: [
        { name: 'Copiez le lien', text: 'Sur ordinateur, copiez l’adresse dans la barre du navigateur. Dans l’appli YouTube, touchez Partager sous la vidéo (ou sur un Short) et choisissez Copier le lien.' },
        { name: 'Ouvrez le téléchargeur YouTube', text: 'Allez dans l’onglet YouTube de {site} et connectez-vous avec Google.' },
        { name: 'Collez et choisissez un format', text: 'Collez un ou plusieurs liens, un par ligne. Laissez l’interrupteur sur Vidéo pour un MP4, ou choisissez Audio seul pour un M4A.' },
        { name: 'Téléchargez', text: 'Appuyez sur Télécharger. Chaque lien affiche son titre et sa progression, puis un bouton Enregistrer quand le fichier est prêt.' },
      ],
      sections: [
        {
          h: 'Quels liens fonctionnent',
          blocks: [
            {
              ul: [
                'Vidéos classiques : `youtube.com/watch?v=…`',
                'Liens courts : `youtu.be/…`',
                'Shorts : `youtube.com/shorts/…`',
                'Lecteurs intégrés : `youtube-nocookie.com/embed/…`',
                'Liens mobiles : `m.youtube.com/…`',
              ],
            },
            { p: 'Les liens avec des paramètres en plus, comme un horodatage (`&t=42`) ou une playlist (`&list=…`), fonctionnent : vous obtenez la vidéo du lien. Les playlists entières ne se téléchargent pas d’un coup ; collez plutôt les liens de chaque vidéo.' },
          ],
        },
        {
          h: 'Qualité et format',
          blocks: [
            { p: 'YouTube stocke l’image et le son séparément pour la plupart des vidéos au-dessus de 360p. Le téléchargeur choisit la meilleure image H.264 jusqu’à 1080p et le son AAC, puis les réunit dans un MP4. H.264 et AAC se lisent partout : iPhone, Android, Windows, Mac, applis de montage et réseaux sociaux.' },
            { p: 'Si une vidéo n’a pas de version H.264 en 1080p, vous obtenez la meilleure version proposée par YouTube jusqu’à 1080p. Les vidéos mises en ligne dans une résolution plus basse sont téléchargées dans cette résolution ; un téléchargeur ne peut pas ajouter des détails qui n’ont jamais été envoyés.' },
          ],
        },
        {
          h: 'Quand un téléchargement échoue',
          blocks: [
            {
              ul: [
                'Les vidéos privées et réservées aux membres ne peuvent pas être téléchargées.',
                'Les vidéos soumises à une limite d’âge et certaines vidéos bloquées par région nécessitent un compte YouTube connecté, elles peuvent donc échouer.',
                'Les directs ne peuvent être enregistrés qu’une fois terminés et traités par YouTube.',
                'Les premières qui n’ont pas encore commencé n’ont rien à télécharger.',
              ],
            },
          ],
        },
        LEGAL_DL,
      ],
      faq: [
        { q: 'Puis-je télécharger des Shorts YouTube ?', a: 'Oui. Collez un lien youtube.com/shorts/ comme pour une vidéo normale et vous obtenez un MP4 vertical.' },
        { q: 'Puis-je télécharger seulement l’audio ?', a: 'Oui. Mettez l’interrupteur sur Audio seul et vous obtenez le son en fichier M4A. Quand la plateforme stocke de l’audio AAC, il est copié sans réencodage.' },
        { q: 'Pourquoi la vidéo est-elle en 1080p et pas en 4K ?', a: 'Le téléchargeur limite les vidéos à 1080p pour que les fichiers restent légers et se lisent partout. La plupart des téléphones et réseaux sociaux affichent la vidéo en 1080p ou moins.' },
        { q: 'Dois-je installer quelque chose ?', a: 'Non. Tout fonctionne dans le navigateur et sur le serveur {site}, sur n’importe quel téléphone ou ordinateur.' },
      ],
    },
    'download-tiktok-videos': {
      title: 'Comment télécharger des vidéos TikTok en MP4',
      metaTitle: 'Télécharger des vidéos TikTok (MP4 ou son M4A)',
      description:
        'Enregistrez une vidéo TikTok publique en MP4, ou son son en M4A, depuis un lien tiktok.com, vm.tiktok.com ou vt.tiktok.com. Étape par étape, sur téléphone ou ordinateur.',
      short: 'Télécharger des vidéos TikTok',
      cta: 'Ouvrir le téléchargeur TikTok',
      intro: [
        'TikTok ne propose son bouton Enregistrer la vidéo que si le créateur l’autorise, et la copie enregistrée porte un filigrane qui se déplace. En collant le lien dans {site}, vous obtenez la vidéo en fichier MP4, ou seulement le son en M4A, pour n’importe quelle vidéo publique.',
      ],
      steps: [
        { name: 'Copiez le lien', text: 'Dans l’appli TikTok, touchez Partager (la flèche à droite) et choisissez Copier le lien. Sur ordinateur, copiez l’adresse de la page de la vidéo.' },
        { name: 'Ouvrez le téléchargeur TikTok', text: 'Allez dans l’onglet TikTok de {site} et connectez-vous avec Google.' },
        { name: 'Collez le lien', text: 'Collez un lien, ou plusieurs sur des lignes séparées. Choisissez Vidéo pour du MP4 ou Audio seul pour le son en M4A.' },
        { name: 'Enregistrez le fichier', text: 'Appuyez sur Télécharger et enregistrez chaque fichier quand il est prêt. Sur iPhone, ouvrez le fichier puis Partager et Enregistrer la vidéo pour l’ajouter à Photos.' },
      ],
      sections: [
        {
          h: 'Quels liens fonctionnent',
          blocks: [
            {
              ul: [
                'Liens complets : `tiktok.com/@compte/video/…`',
                'Liens de partage de l’appli : `vm.tiktok.com/…` et `vt.tiktok.com/…`',
                'Liens du site mobile : `m.tiktok.com/…`',
              ],
            },
            { p: 'Les liens courts sont suivis jusqu’à la vidéo vers laquelle ils pointent, vous pouvez donc coller exactement ce que copie l’appli.' },
          ],
        },
        {
          h: 'Ce que vous obtenez',
          blocks: [
            { p: 'La vidéo arrive en MP4 dans la qualité servie par TikTok, en privilégiant le H.264 pour qu’elle se lise partout.' },
            { p: 'Audio seul garde la bande-son de la vidéo dans un fichier M4A. Pour un son tendance utilisé dans beaucoup de vidéos, n’importe quelle vidéo qui l’utilise fait l’affaire.' },
          ],
        },
        {
          h: 'Ce qui ne fonctionne pas',
          blocks: [
            {
              ul: [
                'Les vidéos de comptes privés et les vidéos partagées seulement avec des amis.',
                'Les vidéos supprimées ou indisponibles dans la région du serveur.',
                'Les directs et les diaporamas photo (carrousels d’images fixes).',
              ],
            },
          ],
        },
        LEGAL_DL,
      ],
      faq: [
        { q: 'Les liens courts vm.tiktok.com fonctionnent-ils ?', a: 'Oui. Collez les liens vm.tiktok.com ou vt.tiktok.com directement depuis le bouton Copier le lien de l’appli.' },
        { q: 'Puis-je télécharger seulement le son ?', a: 'Oui. Mettez l’interrupteur sur Audio seul pour obtenir la bande-son en M4A.' },
        { q: 'Puis-je télécharger des vidéos TikTok privées ?', a: 'Non. Seules les vidéos publiques sont prises en charge.' },
        { q: 'Le créateur est-il prévenu ?', a: 'Non. {site} lit la page publique de la vidéo comme le ferait un navigateur ; rien n’est publié sur TikTok.' },
      ],
    },
    'download-twitter-x-videos': {
      title: 'Comment télécharger des vidéos de X (Twitter)',
      metaTitle: 'Télécharger des vidéos de X (Twitter) en MP4',
      description:
        'Enregistrez la vidéo d’un post X (Twitter) en MP4 en collant le lien du post. Fonctionne avec les liens x.com et twitter.com, sur téléphone ou ordinateur.',
      short: 'Télécharger des vidéos de X (Twitter)',
      cta: 'Ouvrir le téléchargeur X',
      intro: [
        'X n’a pas de bouton de téléchargement pour les vidéos. Pour en garder une, copiez le lien du post et collez-le dans {site} : vous obtenez la vidéo de ce post en MP4, dans la meilleure qualité proposée par X.',
      ],
      steps: [
        { name: 'Copiez le lien du post', text: 'Touchez l’icône de partage sous le post et choisissez Copier le lien. Sur ordinateur, vous pouvez aussi copier l’adresse de la page du post.' },
        { name: 'Ouvrez le téléchargeur X', text: 'Allez dans l’onglet X de {site} et connectez-vous avec Google.' },
        { name: 'Collez le lien', text: 'Collez un ou plusieurs liens de posts. Choisissez Vidéo pour du MP4 ou Audio seul pour du M4A.' },
        { name: 'Enregistrez le fichier', text: 'Appuyez sur Télécharger et enregistrez le fichier quand il est prêt.' },
      ],
      sections: [
        {
          h: 'Quels liens fonctionnent',
          blocks: [
            {
              ul: [
                'Liens de posts sur l’un ou l’autre domaine : `x.com/compte/status/…` ou `twitter.com/compte/status/…`',
                'Liens des services qui corrigent l’intégration : `fxtwitter.com`, `vxtwitter.com`, `fixupx.com`',
              ],
            },
            { p: 'Collez le lien du post qui contient la vidéo. Si vous regardez une réponse ou une citation, ouvrez d’abord le post d’origine et copiez son lien. Les GIF animés de X sont stockés comme de courtes vidéos, ils se téléchargent donc aussi en MP4.' },
          ],
        },
        {
          h: 'Quand un téléchargement échoue',
          blocks: [
            {
              ul: [
                'Les posts de comptes protégés (privés) ne peuvent pas être téléchargés.',
                'Les posts marqués comme sensibles, soumis à une limite d’âge, et certains posts que X ne montre qu’aux utilisateurs connectés peuvent échouer.',
                'Les posts supprimés et les comptes suspendus n’ont plus rien à télécharger.',
                'Un post qui renvoie seulement vers une vidéo YouTube n’a pas de vidéo X ; utilisez le [téléchargeur YouTube](/guides/download-youtube-videos/).',
              ],
            },
          ],
        },
        LEGAL_DL,
      ],
      faq: [
        { q: 'Les liens twitter.com fonctionnent-ils encore ?', a: 'Oui. Les liens x.com et twitter.com fonctionnent tous les deux.' },
        { q: 'Quelle qualité vais-je obtenir ?', a: 'La meilleure qualité que X propose pour cette vidéo, en MP4 avec une image H.264 quand c’est possible.' },
        { q: 'Puis-je télécharger les vidéos de comptes privés ?', a: 'Non. Seuls les posts publics sont pris en charge.' },
      ],
    },
    'download-instagram-reels': {
      title: 'Comment télécharger des Reels et vidéos Instagram',
      metaTitle: 'Télécharger des Reels et vidéos Instagram (MP4)',
      description:
        'Enregistrez un Reel ou une vidéo Instagram publique en MP4 en collant son lien. Étape par étape pour iPhone, Android et ordinateur. Les comptes privés ne sont pas pris en charge.',
      short: 'Télécharger des Reels Instagram',
      cta: 'Ouvrir le téléchargeur Instagram',
      intro: [
        'Instagram vous laisse enregistrer des publications dans l’appli, mais pas sous forme de fichiers à garder ou à monter. Pour obtenir un Reel ou une vidéo en MP4, copiez son lien et collez-le dans {site}. Cela fonctionne uniquement avec les publications publiques.',
      ],
      steps: [
        { name: 'Copiez le lien', text: 'Dans l’appli Instagram, touchez l’icône avion en papier du Reel ou de la publication, puis Copier le lien. Sur ordinateur, copiez l’adresse de la page.' },
        { name: 'Ouvrez le téléchargeur Instagram', text: 'Allez dans l’onglet Instagram de {site} et connectez-vous avec Google.' },
        { name: 'Collez le lien', text: 'Collez un ou plusieurs liens. Choisissez Vidéo pour du MP4 ou Audio seul pour du M4A.' },
        { name: 'Enregistrez le fichier', text: 'Appuyez sur Télécharger et enregistrez le fichier. Sur iPhone, ouvrez-le puis Partager et Enregistrer la vidéo pour l’ajouter à Photos.' },
      ],
      sections: [
        {
          h: 'Quels liens fonctionnent',
          blocks: [
            {
              ul: [
                'Reels : `instagram.com/reel/…`',
                'Publications vidéo : `instagram.com/p/…`',
                'Liens courts : `instagr.am/…`',
              ],
            },
          ],
        },
        {
          h: 'Les vidéos privées ne sont pas disponibles',
          blocks: [
            { p: 'Le téléchargeur lit uniquement ce qu’Instagram montre aux visiteurs non connectés. Cela exclut :' },
            {
              ul: [
                'Les publications et Reels de comptes privés.',
                'Les Stories, les Stories à la une et le contenu Amis proches.',
                'Certaines publications publiques qu’Instagram ne montre qu’après connexion, comme celles soumises à une limite d’âge.',
              ],
            },
            { p: 'Si un lien échoue avec un message à propos d’une publication privée ou d’une connexion, la vidéo n’est pas accessible au téléchargeur.' },
          ],
        },
        {
          h: 'Carrousels avec plusieurs vidéos',
          blocks: [{ p: 'Pour une publication à plusieurs diapositives, le téléchargeur enregistre la vidéo qu’il trouve dans la publication. Les publications uniquement photo n’ont pas de vidéo à télécharger.' }],
        },
        LEGAL_DL,
      ],
      faq: [
        { q: 'Puis-je télécharger des Stories Instagram ?', a: 'Non. Les Stories nécessitent une session Instagram connectée, que le téléchargeur n’utilise pas.' },
        { q: 'Puis-je télécharger depuis un compte privé ?', a: 'Non. Seuls les Reels et les vidéos publics sont pris en charge.' },
        { q: 'Puis-je garder seulement la musique d’un Reel ?', a: 'Oui. Mettez l’interrupteur sur Audio seul pour obtenir la bande-son en M4A.' },
      ],
    },
    'download-audio-from-videos': {
      title: 'Comment télécharger l’audio de YouTube, TikTok, X et Instagram',
      metaTitle: 'Télécharger l’audio de YouTube, TikTok et Instagram (M4A)',
      description:
        'Gardez seulement le son d’une vidéo YouTube, TikTok, X ou Instagram dans un fichier M4A. Collez le lien, passez en Audio seul et téléchargez. Aucune appli nécessaire.',
      short: 'Télécharger l’audio seul (M4A)',
      cta: 'Ouvrir les téléchargeurs',
      intro: [
        'Chaque téléchargeur de {site} a un interrupteur Vidéo / Audio seul. Avec Audio seul, vous obtenez la bande-son d’origine de la vidéo en fichier M4A : généralement l’audio AAC que la plateforme stocke déjà, copié sans réencodage, donc sans perte de qualité. Si une plateforme sert un autre codec, il est converti en AAC haute qualité.',
      ],
      steps: [
        { name: 'Copiez le lien de la vidéo', text: 'Utilisez Partager puis Copier le lien dans l’appli YouTube, TikTok, X ou Instagram, ou copiez l’adresse de la page sur ordinateur.' },
        { name: 'Ouvrez le téléchargeur correspondant', text: 'Choisissez l’onglet de cette plateforme dans {site}.' },
        { name: 'Passez en Audio seul', text: 'Mettez l’interrupteur au-dessus du champ de lien sur Audio seul et collez le lien.' },
        { name: 'Téléchargez le M4A', text: 'Appuyez sur Télécharger et enregistrez le fichier. Le M4A se lit dans Apple Music, VLC, le Lecteur Windows Media et la plupart des applis de montage.' },
      ],
      sections: [
        {
          h: 'Pourquoi M4A et pas MP3',
          blocks: [
            { p: 'Ces plateformes stockent presque toujours le son en AAC. Le M4A est simplement de l’AAC dans un fichier de type MP4, il peut donc être enregistré tel quel. Le convertir en MP3 voudrait dire le décoder puis le compresser à nouveau, ce qui fait perdre un peu de qualité pour rien : tous les téléphones, ordinateurs et applis de montage actuels lisent le M4A.' },
            { p: 'Si vous avez besoin d’un MP3 pour un vieil appareil, convertissez le M4A avec un outil gratuit comme VLC (Média → Convertir / Enregistrer) ou ffmpeg :' },
            { code: 'ffmpeg -i sound.m4a -c:a libmp3lame -q:a 2 sound.mp3' },
          ],
        },
        {
          h: 'Vous avez déjà la vidéo ?',
          blocks: [{ p: 'Chaque vidéo téléchargée dans {site} a aussi un bouton Obtenir l’audio, qui extrait la bande-son du MP4 que vous venez de télécharger.' }],
        },
        LEGAL_DL,
      ],
      faq: [
        { q: 'L’audio est-il réencodé ?', a: 'Pas quand la plateforme sert de l’AAC, ce qui est le cas habituel : le flux est copié tel quel dans un fichier M4A. Les autres codecs sont convertis en AAC.' },
        { q: 'Puis-je télécharger une playlist entière en audio ?', a: 'Pas d’un coup. Collez les liens de chaque vidéo, un par ligne.' },
      ],
    },
    'remove-gps-location-from-photos': {
      title: 'Comment supprimer la position GPS des photos',
      metaTitle: 'Supprimer la position GPS des photos (iPhone, Android, PC)',
      description:
        'Les photos peuvent enregistrer le lieu exact de la prise de vue. Comment vérifier la présence de données GPS et les supprimer sur iPhone, Android, Windows et Mac, ou en une étape.',
      short: 'Supprimer la position GPS des photos',
      cta: 'Supprimer les données de position',
      intro: [
        'La plupart des téléphones enregistrent la latitude et la longitude exactes dans chaque photo, souvent à quelques mètres près. Quiconque reçoit le fichier d’origine peut les lire et placer une épingle sur une carte : votre domicile, votre école, votre travail. Certaines applis les retirent à la publication, mais l’e-mail, les messageries qui envoient en « qualité d’origine », les liens cloud et les sites de petites annonces les conservent souvent.',
        'Ce guide montre comment vérifier si une photo contient des données de position et comment les supprimer, avec les réglages déjà présents sur votre téléphone ou ordinateur, ou en une étape avec le suppresseur de métadonnées de {site}.',
      ],
      steps: [
        { name: 'Ouvrez le suppresseur de métadonnées', text: 'Allez dans l’onglet Strip de {site}.' },
        { name: 'Ajoutez vos photos', text: 'Déposez une ou plusieurs photos : JPEG, PNG, WebP, HEIC, AVIF, TIFF ou GIF.' },
        { name: 'Choisissez où les traiter', text: 'Choisissez Cet appareil pour nettoyer les fichiers dans votre navigateur sans les envoyer, ou Serveur pour les traiter sur {site} et les faire supprimer aussitôt après.' },
        { name: 'Téléchargez les copies propres', text: 'Toutes les métadonnées, y compris le bloc GPS, sont retirées de chaque fichier. Téléchargez et partagez la copie propre plutôt que l’original.' },
      ],
      sections: [
        {
          h: 'Où la position est enregistrée',
          blocks: [
            { p: 'Dans les photos JPEG, HEIC et TIFF, la position se trouve dans le bloc GPS de l’EXIF : latitude, longitude, altitude, direction de l’appareil et horodatage GPS. Les applis de retouche peuvent aussi la copier dans les métadonnées XMP, et certains téléphones l’écrivent dans les métadonnées de la miniature intégrée. En supprimer un seul peut laisser les autres, c’est pourquoi un nettoyage complet est plus sûr que d’effacer un champ.' },
          ],
        },
        {
          h: 'Comment savoir si une photo contient une position',
          blocks: [
            {
              ul: [
                'iPhone : ouvrez la photo dans Photos et faites glisser vers le haut. Si une carte apparaît, la photo contient une position.',
                'Android (Google Photos) : ouvrez la photo, faites glisser vers le haut et cherchez une carte ou un nom de lieu.',
                'Windows : clic droit sur le fichier, Propriétés, onglet Détails, et regardez sous GPS.',
                'Mac : ouvrez-la dans Aperçu, Outils puis Afficher l’inspecteur, et cherchez un onglet GPS.',
              ],
            },
          ],
        },
        {
          h: 'Supprimez-la avec les réglages de votre téléphone ou ordinateur',
          blocks: [
            {
              ul: [
                'iPhone, au partage : sélectionnez les photos, touchez Partager, touchez Options en haut et désactivez Position. Cela ne concerne que ce partage.',
                'iPhone, pour les prochaines photos : Réglages, Confidentialité et sécurité, Service de localisation, Appareil photo, puis Jamais.',
                'Android : ouvrez les réglages de l’appli Appareil photo et désactivez l’option de position ou de géolocalisation (le nom varie selon le téléphone). Dans Google Photos, Paramètres puis Partage propose de retirer la position des éléments partagés par lien.',
                'Windows : clic droit sur le fichier, Propriétés, Détails, puis Supprimer les propriétés et les informations personnelles. Choisissez de créer une copie sans toutes les propriétés possibles.',
                'Mac : dans Aperçu, Outils, Afficher l’inspecteur, onglet GPS, puis Supprimer les informations de localisation.',
              ],
            },
            { note: 'Ces options intégrées retirent surtout les champs GPS. Le modèle d’appareil, le numéro de série, les dates et l’historique de retouche restent généralement dans le fichier.' },
          ],
        },
        {
          h: 'Supprimez-la avec exiftool (ligne de commande)',
          blocks: [
            { p: 'Si vous êtes à l’aise avec un terminal, l’outil gratuit exiftool supprime le bloc GPS, ou tout, directement dans le fichier. Il garde une sauvegarde se terminant par `_original`.' },
            { code: 'exiftool -gps:all= -xmp:geotag= photo.jpg   # position seulement\nexiftool -all= photo.jpg                     # toutes les métadonnées' },
          ],
        },
        {
          h: 'Ce qu’une photo peut encore révéler',
          blocks: [
            { p: 'La position est le champ le plus sensible, mais le même fichier peut aussi contenir le modèle du téléphone ou de l’appareil photo et son numéro de série, la date et l’heure exactes, le logiciel de retouche, votre nom ou une mention de copyright, des zones de reconnaissance de visages et un petit aperçu de l’original non recadré. Voir [comment supprimer les données EXIF](/guides/remove-exif-data-from-photos/) pour la liste complète.' },
          ],
        },
      ],
      faq: [
        { q: 'Instagram et Facebook suppriment-ils la position des photos ?', a: 'Les grands réseaux sociaux retirent généralement les données EXIF, GPS compris, de la copie montrée aux autres. Les fichiers envoyés par e-mail, liens cloud, certaines messageries en qualité d’origine et beaucoup de forums et sites d’annonces peuvent les conserver : il est donc plus sûr de nettoyer le fichier avant de l’envoyer.' },
        { q: 'Une capture d’écran contient-elle une position ?', a: 'Généralement non, car la capture est une nouvelle image. Mais elle peut montrer un lieu dans l’image elle-même, comme un panneau de rue ou une carte.' },
        { q: 'La photo sera-t-elle différente ensuite ?', a: 'Non. La copie propre est enregistrée en haute qualité et paraît identique en visionnage normal ; seules les données cachées disparaissent.' },
      ],
    },
    'remove-exif-data-from-photos': {
      title: 'Comment supprimer les données EXIF et autres métadonnées des photos',
      metaTitle: 'Supprimer les données EXIF et métadonnées des photos',
      description:
        'Ce que les métadonnées EXIF, XMP, IPTC et ICC révèlent sur vous, comment les voir et comment toutes les supprimer des photos JPEG, PNG, HEIC, WebP et autres.',
      short: 'Supprimer les données EXIF des photos',
      cta: 'Supprimer les métadonnées d’une photo',
      intro: [
        'L’EXIF est le bloc d’informations qu’un appareil photo ou un téléphone écrit dans chaque photo : l’appareil, les réglages, la date et souvent le lieu. Les applis de retouche ajoutent leurs propres couches (XMP et IPTC), et certains fichiers portent des C2PA Content Credentials avec un historique de retouche. Rien de tout cela n’est visible dans l’image, mais quiconque a le fichier peut le lire.',
      ],
      steps: [
        { name: 'Ouvrez le suppresseur de métadonnées', text: 'Allez dans l’onglet Strip de {site}.' },
        { name: 'Ajoutez les photos', text: 'Déposez vos fichiers. Les lots sont acceptés.' },
        { name: 'Choisissez Cet appareil ou Serveur', text: 'Cet appareil nettoie les photos dans votre navigateur et ne les envoie jamais. Serveur les traite sur {site} et les supprime aussitôt après.' },
        { name: 'Téléchargez la copie propre', text: 'Chaque fichier revient sans EXIF, GPS, XMP, IPTC, ICC, C2PA, notes du fabricant, miniatures ni commentaires.' },
      ],
      sections: [
        {
          h: 'Ce que contiennent les métadonnées d’une photo',
          blocks: [
            {
              ul: [
                'EXIF : marque et modèle de l’appareil ou du téléphone, objectif, numéros de série, réglages d’exposition, date et heure de prise de vue et de retouche, et position GPS.',
                'Notes du fabricant : une zone EXIF propre à chaque marque qui peut contenir des identifiants supplémentaires, comme un numéro de série interne ou un nombre de déclenchements.',
                'XMP : écrit par les applis de retouche comme Lightroom et Photoshop. Peut inclure votre nom, l’historique de retouche, des notes, des mots-clés et une copie des données GPS.',
                'IPTC : légendes, crédits, copyright, nom et coordonnées du photographe, et le champ Digital Source Type que certains outils utilisent pour marquer les images générées par IA.',
                'Profil ICC : décrit les couleurs. Le plus souvent inoffensif, mais certains profils nomment l’appareil ou le logiciel qui les a créés.',
                'Miniature intégrée : un petit aperçu stocké dans le fichier. Elle peut montrer la photo avant recadrage ou retouche.',
                'C2PA Content Credentials : un enregistrement signé de l’origine de l’image et de ses retouches. Voir [supprimer le C2PA](/guides/remove-c2pa-content-credentials/).',
                'Commentaires et blocs de texte : les PNG en particulier peuvent contenir du texte libre, comme le prompt et les réglages d’un générateur d’images IA.',
              ],
            },
          ],
        },
        {
          h: 'Formats nettoyés par {site}',
          blocks: [{ p: 'JPEG, PNG, WebP, HEIC/HEIF, AVIF, TIFF et GIF. Les photos HEIC reviennent en JPEG pour s’ouvrir partout.' }],
        },
        {
          h: 'Autres façons de supprimer l’EXIF',
          blocks: [
            {
              ul: [
                'Windows : Propriétés, Détails, Supprimer les propriétés et les informations personnelles, puis créer une copie propre. Tous les champs ne sont pas supprimés dans tous les formats.',
                'Mac : Aperçu peut retirer la position (Outils, Afficher l’inspecteur, GPS, Supprimer les informations de localisation) mais pas le reste. Exporter depuis Photos en décochant Position retire aussi le GPS.',
                'exiftool : `exiftool -all= photo.jpg` supprime tout ce qu’il peut écrire ; ajoutez `-r folder/` pour un dossier entier.',
                'Réenregistrer ou faire une capture : retire la plupart des métadonnées, mais réduit la qualité et peut garder certains champs selon l’appli.',
              ],
            },
          ],
        },
      ],
      faq: [
        { q: 'Supprimer l’EXIF réduit-il la qualité ?', a: 'Pas de façon visible. {site} enregistre la copie propre en haute qualité, elle paraît donc identique en visionnage normal.' },
        { q: 'Les couleurs changent-elles si le profil ICC est supprimé ?', a: 'Les photos de téléphones et de la plupart des appareils utilisent des couleurs sRGB ou Display P3 standard et restent identiques. Les fichiers dans un espace colorimétrique inhabituel peuvent paraître légèrement différents.' },
        { q: 'Peut-on récupérer les métadonnées supprimées ?', a: 'Pas depuis la copie propre. Elles ont disparu de ce fichier ; votre original les contient toujours, partagez donc la copie propre.' },
      ],
    },
    'remove-metadata-from-iphone-photos': {
      title: 'Comment supprimer les métadonnées des photos iPhone (HEIC et JPEG)',
      metaTitle: 'Supprimer les métadonnées des photos iPhone (HEIC)',
      description:
        'Les photos iPhone enregistrent la position, l’appareil, la date et les retouches. Comment désactiver cela sur iPhone, le retirer au partage et tout supprimer des fichiers HEIC et JPEG.',
      short: 'Supprimer les métadonnées des photos iPhone',
      cta: 'Nettoyer des photos iPhone maintenant',
      intro: [
        'Une photo iPhone est généralement un fichier HEIC avec un jeu complet de métadonnées : le modèle d’iPhone, l’objectif, l’heure exacte, la position si le Service de localisation est activé pour l’Appareil photo et, après retouche, les applis utilisées. iOS peut retirer la position au partage, mais pas le reste. Voici comment gérer les deux.',
      ],
      steps: [
        { name: 'Enregistrez les photos dans Fichiers', text: 'Dans Photos, sélectionnez les photos, touchez Partager, puis Enregistrer dans Fichiers. (Ou envoyez-les par AirDrop ou copiez-les sur un ordinateur.)' },
        { name: 'Ouvrez {site} dans Safari', text: 'Allez dans l’onglet Strip et touchez pour ajouter des fichiers depuis Fichiers ou votre photothèque.' },
        { name: 'Nettoyez-les', text: 'Choisissez Cet appareil pour qu’elles restent sur votre iPhone, ou Serveur pour aller plus vite. Les photos HEIC reviennent en JPEG.' },
        { name: 'Enregistrez les copies propres', text: 'Téléchargez-les, puis ouvrez chacune et touchez Partager, Enregistrer l’image pour remettre la copie propre dans Photos.' },
      ],
      sections: [
        {
          h: 'Retirer la position au partage',
          blocks: [
            { p: 'Sélectionnez les photos, touchez Partager, puis Options en haut de la feuille de partage et désactivez Position. iOS envoie des copies sans données GPS pour ce partage uniquement. Activer Toutes les données des photos fait l’inverse et inclut tout.' },
            { note: 'Choisir des photos de la photothèque depuis un site web peut quand même envoyer le fichier d’origine avec ses métadonnées. Utilisez l’interrupteur Options ou nettoyez d’abord le fichier.' },
          ],
        },
        {
          h: 'Ne plus enregistrer la position',
          blocks: [{ p: 'Réglages, Confidentialité et sécurité, Service de localisation, Appareil photo, puis Jamais. Les nouvelles photos n’auront pas de données GPS. Celles déjà prises gardent les leurs.' }],
        },
        {
          h: 'Pourquoi le HEIC devient JPEG',
          blocks: [
            { p: 'Le HEIC est le format par défaut d’Apple. Beaucoup de sites, d’applis Windows et d’anciens téléphones Android ne savent pas l’ouvrir, donc {site} enregistre les photos HEIC nettoyées en JPEG haute qualité. Si vous voulez que votre iPhone prenne directement des photos en JPEG, choisissez Réglages, Appareil photo, Formats, Le plus compatible.' },
          ],
        },
        {
          h: 'Live Photos, Portrait et retouches',
          blocks: [
            { p: 'Une Live Photo est une image fixe plus une courte vidéo MOV, chacune avec ses propres métadonnées. Nettoyer l’image fixe ne nettoie pas la vidéo ; partagez-la en photo fixe, ou nettoyez la vidéo séparément avec le [suppresseur de métadonnées vidéo](/guides/remove-metadata-from-videos/). Les données de profondeur du mode Portrait et l’historique de retouche sont retirés de la copie propre.' },
          ],
        },
      ],
      faq: [
        { q: 'AirDrop conserve-t-il les métadonnées ?', a: 'Oui. AirDrop envoie l’original complet, position comprise, sauf si vous désactivez d’abord Position dans Options.' },
        { q: 'iMessage retire-t-il la position ?', a: 'Pas de façon fiable. Désactivez Position dans Options au partage, ou nettoyez la photo avant de l’envoyer.' },
      ],
    },
    'remove-metadata-from-videos': {
      title: 'Comment supprimer les métadonnées des vidéos (MP4, MOV et plus)',
      metaTitle: 'Supprimer les métadonnées des vidéos (MP4, MOV, MKV)',
      description:
        'Les vidéos enregistrent le GPS, l’appareil, les dates, le timecode et des balises d’encodeur. Comment les voir et tout supprimer des vidéos MP4, MOV, MKV, WebM et autres.',
      short: 'Supprimer les métadonnées des vidéos',
      cta: 'Supprimer les métadonnées d’une vidéo',
      intro: [
        'Les vidéos de téléphones et d’appareils photo contiennent autant de métadonnées que les photos, parfois plus : une position, le modèle de l’appareil, les dates de création, le timecode, l’encodeur utilisé et, sur les drones et caméras d’action, une piste complète de GPS ou de télémétrie enregistrée avec l’image. Les applis de montage ajoutent par-dessus des balises de projet et de logiciel.',
      ],
      steps: [
        { name: 'Ouvrez le suppresseur de métadonnées', text: 'Allez dans l’onglet Strip de {site}.' },
        { name: 'Ajoutez les vidéos', text: 'MP4, MOV, M4V, MKV, WebM, AVI, MTS/M2TS, TS, 3GP, WMV ou FLV.' },
        { name: 'Choisissez Cet appareil ou Serveur', text: 'Cet appareil fonctionne dans votre navigateur sans rien envoyer. Serveur est plus rapide pour les gros fichiers, supprimés aussitôt après.' },
        { name: 'Téléchargez la copie propre', text: 'Toutes les balises, pistes de données et boîtes C2PA sont supprimées ; la vidéo et le son sont conservés.' },
      ],
      sections: [
        {
          h: 'Ce que contiennent les métadonnées d’une vidéo',
          blocks: [
            {
              ul: [
                'Balises globales : titre, date de création, marque et modèle de l’appareil, logiciel et position (par exemple la balise `©xyz` et `com.apple.quicktime.location.ISO6709` dans les vidéos iPhone).',
                'Balises de flux : noms, langues, noms de gestionnaire et chaînes d’encodeur de chaque piste.',
                'Pistes de données : télémétrie GPS et capteurs des drones, dashcams et caméras d’action, stockée en pistes séparées à côté de la vidéo et du son.',
                'Pistes de timecode et titres de chapitres.',
                'Pochettes et miniatures jointes au fichier.',
                'Boîtes C2PA : des Content Credentials signées, de plus en plus ajoutées par les appareils, les applis de montage et les outils vidéo IA.',
              ],
            },
          ],
        },
        {
          h: 'La vidéo a-t-elle l’air différente ?',
          blocks: [
            { p: 'Non. Les métadonnées se trouvent dans le conteneur autour de la vidéo et du son, pas dans l’image. {site} enregistre la copie propre en haute qualité, elle s’affiche et sonne donc pareil en lecture normale. Le fichier n’est pas identique octet par octet à l’original, ce qui est normal.' },
          ],
        },
        {
          h: 'Le faire soi-même avec ffmpeg',
          blocks: [
            { p: 'Avec l’outil gratuit ffmpeg, cette commande copie seulement la vidéo et le son, et retire les balises globales, les chapitres et les pistes de données :' },
            { code: 'ffmpeg -i in.mov -map 0:v -map 0:a? -map_metadata -1 -map_chapters -1 \\\n  -fflags +bitexact -c copy out.mp4' },
            { p: 'Vérifiez le résultat avec `ffprobe -hide_banner out.mp4` ou `exiftool out.mp4`. Certaines balises de flux comme les noms de gestionnaire peuvent rester ; {site} les efface aussi.' },
          ],
        },
      ],
      faq: [
        { q: 'YouTube ou TikTok suppriment-ils les métadonnées des vidéos ?', a: 'Ils réencodent les envois, ce qui retire la plupart des métadonnées de ce que téléchargent les spectateurs. Le fichier d’origine que vous envoyez par e-mail, lien cloud ou messagerie les contient toujours.' },
        { q: 'La vidéo va-t-elle perdre en qualité ?', a: 'Pas de façon visible. La copie propre est enregistrée en haute qualité.' },
      ],
    },
    'remove-c2pa-content-credentials': {
      title: 'Ce que sont les C2PA Content Credentials, et comment les supprimer',
      metaTitle: 'C2PA Content Credentials : définition et suppression',
      description:
        'Les C2PA Content Credentials indiquent qui a créé une photo ou une vidéo, avec quels outils et quelles retouches. Comment vérifier un fichier, ce qu’elles révèlent et comment les supprimer.',
      short: 'Supprimer les C2PA Content Credentials',
      cta: 'Vérifier et nettoyer un fichier',
      intro: [
        'Le C2PA (de la Coalition for Content Provenance and Authenticity) est une norme qui permet d’attacher un enregistrement signé, appelé manifeste ou Content Credentials, à une photo, une vidéo ou un son. Il est ajouté par certains appareils photo et téléphones, par des applis de retouche comme Photoshop et Lightroom, et par des outils IA comme Adobe Firefly, les outils d’image et de vidéo d’OpenAI et les générateurs d’images de Microsoft.',
        'Le manifeste est utile pour montrer d’où vient un fichier, mais il peut aussi contenir des informations personnelles que vous ne souhaitez peut-être pas publier. Ce guide explique ce qu’il contient, comment vérifier un fichier et comment supprimer le manifeste intégré.',
      ],
      steps: [
        { name: 'Vérifiez le fichier', text: 'Envoyez-le sur le site Content Credentials Verify (contentcredentials.org/verify) pour voir s’il a un manifeste et ce qu’il indique.' },
        { name: 'Ouvrez le suppresseur de métadonnées de {site}', text: 'Allez dans l’onglet Strip et ajoutez le fichier.' },
        { name: 'Nettoyez-le', text: 'Choisissez Cet appareil ou Serveur. Le manifeste C2PA est supprimé avec l’EXIF, le XMP et les autres métadonnées.' },
        { name: 'Vérifiez à nouveau', text: 'Envoyez la copie propre sur le site Verify. Il ne devrait plus trouver de Content Credentials intégrées.' },
      ],
      sections: [
        {
          h: 'Ce que peut contenir un manifeste C2PA',
          blocks: [
            {
              ul: [
                'Le nom ou le compte de la personne ou de l’organisation qui l’a signé, si elle a choisi de l’inclure.',
                'L’appareil, l’appli ou le service IA qui a créé le fichier, et le logiciel utilisé pour le retoucher.',
                'Une liste de retouches (actions), comme un recadrage, des changements de couleur ou « créé avec un outil d’IA générative ».',
                'Des dates et heures, et parfois une position.',
                'Des miniatures des versions précédentes et des « ingrédients » : des références aux fichiers source combinés.',
                'Une signature cryptographique qui montre si le fichier a changé depuis sa signature.',
              ],
            },
          ],
        },
        {
          h: 'Où il est stocké dans le fichier',
          blocks: [
            { p: 'Dans les JPEG, le manifeste se trouve dans des segments APP11 (boîtes JUMBF). En PNG, c’est un bloc `caBX`, en MP4 et MOV une boîte `uuid`, et en HEIC, WebP et AVIF sa propre boîte de métadonnées. Comme c’est un bloc séparé, le supprimer ne touche pas l’image.' },
          ],
        },
        {
          h: 'Ce que sa suppression fait, et ne fait pas',
          blocks: [
            { p: 'Le nettoyage supprime le manifeste intégré au fichier. Il ne supprime pas :' },
            {
              ul: [
                'Les filigranes ou logos visibles dessinés dans l’image.',
                'Les copies du manifeste conservées en ligne par l’outil qui a créé le fichier. Certains services stockent les Content Credentials dans le cloud et peuvent les retrouver à partir de l’image elle-même.',
                'Les filigranes invisibles dans les pixels, comme [SynthID](/guides/what-is-synthid/) de Google. {site} perturbe SynthID séparément, mais aucun outil ne peut garantir qu’un détecteur le manquera.',
                'L’obligation de transparence. Les lois et les règles des plateformes sur l’étiquetage des contenus générés ou retouchés par IA s’appliquent toujours au fichier.',
              ],
            },
            { note: 'Supprimer les Content Credentials n’empêche pas une plateforme d’étiqueter un fichier comme généré par IA. Les plateformes utilisent aussi leurs propres classificateurs, détecteurs de filigrane et questions à l’envoi.' },
          ],
        },
        {
          h: 'Autres façons de supprimer le C2PA',
          blocks: [
            {
              ul: [
                'exiftool : `exiftool -jumbf:all= -c2pa:all= photo.jpg` (versions récentes) supprime le C2PA des JPEG ; pour les autres formats, `exiftool -all= file` est plus simple.',
                'Réenregistrer dans une appli qui ne gère pas le C2PA le retire généralement, mais certaines applis, dont Photoshop, ajoutent un nouveau manifeste.',
                'Les captures d’écran créent un nouveau fichier sans le manifeste d’origine, en qualité moindre.',
              ],
            },
          ],
        },
      ],
      faq: [
        { q: 'Est-il légal de supprimer les données C2PA ?', a: 'Supprimer les métadonnées de vos propres fichiers est généralement autorisé, mais certaines lois et règles de plateformes exigent que les contenus générés par IA soient étiquetés. Supprimer les Content Credentials ne change pas ces obligations.' },
        { q: 'Supprimer le C2PA change-t-il l’aspect de l’image ?', a: 'Non. Le manifeste est un bloc séparé dans le fichier ; l’image reste la même.' },
        { q: 'Pourquoi le site Verify trouve-t-il encore des Content Credentials ?', a: 'Il peut comparer certaines images avec des identifiants stockés en ligne par le service qui les a créées. Cet enregistrement est conservé par le service, pas dans votre fichier.' },
      ],
    },
  },
};
