import type { PagesTranslation } from './types';
import type { Section } from '../guides';

const LEGAL_DL: Section = {
  h: 'É legal?',
  blocks: [
    {
      p: 'Baixe apenas vídeos que você mesmo fez, que tenham licença de reutilização (por exemplo Creative Commons) ou que o dono tenha autorizado você a usar. Os termos de uso da maioria das plataformas restringem downloads, e as leis de direitos autorais mudam de país para país. Salvar um vídeo não dá a você o direito de publicá-lo de novo, e o {site} não tem vínculo com nenhuma dessas plataformas.',
    },
  ],
};

export const pt: PagesTranslation = {
  ui: {
    locale: 'pt-BR',
    kind: { synthid: 'Guia de SynthID', privacy: 'Guia de privacidade', download: 'Guia de downloads' },
    stepsTitle: 'Passo a passo com o {site}',
    questions: 'Perguntas frequentes',
    related: 'Guias relacionados',
    contents: 'Nesta página',
    updated: 'Atualizado em',
    home: 'Início',
    guides: 'Guias',
    pricing: 'Preços',
    openTools: 'Abrir ferramentas',
    navLabel: 'Principal',
    breadcrumb: 'Trilha de navegação',
    language: 'Idioma',
    footer: {
      tagline: 'Removedor de metadados, C2PA e SynthID, além de downloaders de YouTube, TikTok, X e Instagram.',
      open: 'Abrir as ferramentas',
      synthidGuides: 'Guias de SynthID',
      privacyGuides: 'Guias de privacidade',
      downloadGuides: 'Guias de downloads',
      allGuides: 'Todos os guias',
      privacyPolicy: 'Política de Privacidade (inglês)',
      terms: 'Termos de Serviço (inglês)',
      disclaimer:
        'Processe e baixe apenas conteúdo seu ou que você tenha permissão para usar, e identifique conteúdo gerado por IA quando as regras exigirem. O {site} não tem vínculo com Google, YouTube, TikTok, X, Instagram ou Meta.',
    },
    index: {
      metaTitle: 'Guias: SynthID, metadados e download de vídeos',
      description:
        'Guias sobre o SynthID e marcas d’água de IA, como remover GPS, EXIF e C2PA de fotos e vídeos e como baixar vídeos do YouTube, TikTok, X e Instagram.',
      title: ['Guias do', '{site}.'],
      lede: 'Guias passo a passo para limpar os metadados dos seus arquivos e baixar vídeos, com as opções que já vêm no seu celular ou computador e com as ferramentas do {site}.',
      groups: {
        synthid: {
          title: 'SynthID e marcas d’água de IA',
          text: 'O que é a marca d’água invisível SynthID do Google e como enfraquecê-la e limpar os metadados de imagens e vídeos do Veo, Gemini e Imagen, para as plataformas pararem de marcá-los como IA.',
        },
        privacy: {
          title: 'Privacidade e metadados',
          text: 'Remova os dados ocultos de fotos e vídeos: localização, dados do aparelho, datas, histórico de edição e C2PA Content Credentials.',
        },
        download: {
          title: 'Download de vídeos',
          text: 'Salve vídeos públicos do YouTube, TikTok, X e Instagram em MP4, ou fique só com o som em M4A.',
        },
      },
    },
    promo: {
      eyebrow: 'Planos',
      title: ['Limpe todos os arquivos.', 'Comece com $2.'],
      text: 'Suas primeiras limpezas e downloads são grátis. Depois, teste 10 limpezas de SynthID por $2 ou vá para o ilimitado com o Basic ou o Pro.',
      orYearly: 'ou {price} / ano',
      seePlans: 'Comparar todos os planos',
      download: {
        badge: 'Downloads ilimitados',
        title: ['Baixe sem limites.', 'Vá de Pro.'],
        text: 'Seu primeiro download de vídeo é grátis. Os downloads rodam no nosso servidor, então depois disso você precisa do Pro: downloads ilimitados do YouTube, X, TikTok e Instagram, e limpeza mais rápida.',
        cardText: 'Downloads de vídeo ilimitados do YouTube, X, TikTok e Instagram, mais limpeza no servidor cerca de 4x mais rápida. Cancele quando quiser.',
        cta: 'Baixar sem limites',
      },
    },
  },
  guides: {
    'what-is-synthid': {
      title: 'O que é o SynthID? A marca d’água invisível de IA do Google, explicada',
      metaTitle: 'O que é o SynthID? A marca d’água de IA do Google',
      description:
        'O SynthID é a marca d’água invisível do Google DeepMind para imagens, vídeos, áudio e texto de IA. Como funciona, como verificar, como difere do C2PA e se dá para remover.',
      short: 'O que é o SynthID?',
      cta: 'Remover o SynthID de um arquivo',
      stepsTitle: 'Como remover o SynthID com o {site}',
      intro: [
        '**O SynthID é uma marca d’água invisível que o Google DeepMind insere no conteúdo criado pelos modelos de IA do Google.** Ela fica entrelaçada nos pixels das imagens e dos quadros de vídeo, na onda sonora do áudio e na escolha de palavras do texto, então não dá para ver nem ouvir, e continua no arquivo mesmo quando os metadados são apagados. Depois, um detector consegue lê-la e dizer se um arquivo foi feito com a IA do Google.',
        'Imagens do Gemini (incluindo os modelos Nano Banana) e do Imagen, vídeos do Veo, músicas do Lyria e textos do Gemini podem ter SynthID. Este guia explica como a marca d’água funciona, como verificar se um arquivo a tem, como ela difere das C2PA Content Credentials, o que significa para quem publica conteúdo de IA e o que dá e o que não dá para fazer para [remover o SynthID](/app/#strip).',
      ],
      steps: [
        { name: 'Abra o removedor de SynthID', text: 'Vá até a [aba Strip](/app/#strip) do {site} e entre com o Google.' },
        { name: 'Adicione sua imagem ou vídeo', text: 'Solte arquivos do Gemini, Imagen, Veo ou de qualquer outro gerador. JPEG, PNG, WebP, HEIC, MP4, MOV e outros são aceitos.' },
        { name: 'Escolha Servidor ou Este dispositivo', text: 'O Servidor recodifica vídeos grandes cerca de 4x mais rápido e os apaga logo em seguida. Este dispositivo nunca envia o arquivo.' },
        { name: 'Baixe a cópia limpa', text: 'Os metadados, C2PA incluído, são removidos e a marca d’água SynthID é enfraquecida. Cada arquivo mostra o que foi removido.' },
      ],
      sections: [
        {
          h: 'O SynthID em resumo',
          blocks: [
            {
              ul: [
                '**Criado por:** Google DeepMind. Lançado em agosto de 2023 para as imagens do Imagen e depois ampliado para vídeo, áudio e texto.',
                '**O que ele marca:** conteúdo gerado pelos modelos de IA do Google, como Gemini, Nano Banana, Imagen, Veo e Lyria. O Google diz já ter marcado mais de 10 bilhões de conteúdos.',
                '**Onde fica:** dentro do próprio conteúdo (pixels, quadros, som ou escolha de palavras), não nos metadados.',
                '**É visível?** Não. As mudanças são pequenas demais para ver ou ouvir.',
                '**Quem consegue ler:** o SynthID Detector do Google e os recursos de verificação de produtos do Google, como o app Gemini.',
                '**Dá para remover?** Ele foi feito para resistir a edições comuns, então não pode ser apagado como uma tag de metadados. Recodificar pode enfraquecê-lo, sem garantia.',
              ],
            },
          ],
        },
        {
          h: 'Como o SynthID funciona',
          blocks: [
            { p: 'O SynthID não é um carimbo colocado por cima de um arquivo pronto. Ele é aplicado enquanto o conteúdo é gerado, com duas redes neurais treinadas juntas: uma faz mudanças minúsculas que codificam um padrão, e a outra aprende a encontrar esse padrão de novo, mesmo depois que o arquivo é alterado.' },
            {
              ul: [
                '**Imagens:** os valores de muitos pixels são levemente ajustados para formar um padrão espalhado pela imagem inteira. Nenhuma área o contém sozinha, então cortar uma parte da imagem não o remove.',
                '**Vídeo:** cada quadro é marcado como uma imagem, por isso a marca sobrevive a cortes no clipe e a mudanças na taxa de quadros. Os vídeos do Veo a têm em todos os quadros.',
                '**Áudio:** o padrão é adicionado ao som de um jeito que o ouvido não percebe, e foi pensado para resistir à compressão MP3, a ruído adicionado e a mudanças de velocidade.',
                '**Texto:** enquanto o Gemini escreve, o SynthID muda um pouco a probabilidade da próxima palavra. Num texto longo, essas escolhas formam um sinal estatístico. O Google liberou a versão para texto em código aberto para outros desenvolvedores usarem.',
              ],
            },
            { p: 'Como a marca d’água faz parte do conteúdo, ela não depende do formato do arquivo. Salvar um PNG como JPEG, enviar um vídeo para uma plataforma que o recomprime ou tirar um print da tela geralmente a deixa legível.' },
          ],
        },
        {
          h: 'SynthID x C2PA Content Credentials x metadados',
          blocks: [
            { p: 'Arquivos de IA costumam ter vários rótulos ao mesmo tempo, e cada um é removido de um jeito:' },
            {
              ul: [
                '**SynthID** é uma marca d’água invisível dentro dos pixels ou do som. Apagar os metadados não a afeta. Ela só pode ser enfraquecida mudando o próprio conteúdo.',
                '**C2PA Content Credentials** são um registro assinado nos metadados do arquivo que diz qual ferramenta o criou e como foi editado. Plataformas como o TikTok leem esse registro para ativar automaticamente um rótulo de “gerado por IA”. Uma limpeza de metadados o remove por completo. Veja [o que é C2PA e como remover](/guides/remove-c2pa-content-credentials/).',
                '**Tags IPTC e XMP**, como o campo “Digital Source Type”, são metadados comuns que alguns geradores adicionam para dizer que a imagem é de IA. Veja [como remover EXIF e metadados](/guides/remove-exif-data-from-photos/).',
                '**Marcas d’água visíveis**, como o logotipo de brilho no canto, são desenhadas na imagem e são outra coisa.',
              ],
            },
            { p: 'O Google usa SynthID e C2PA juntos em alguns produtos: os metadados são rápidos de checar, mas se perdem fácil, e a marca d’água é mais difícil de remover, mas precisa de um detector para ser lida.' },
          ],
        },
        {
          h: 'Como saber se uma imagem ou vídeo tem SynthID',
          blocks: [
            {
              ul: [
                '**SynthID Detector:** o portal de verificação do Google. Envie uma imagem, vídeo ou áudio e ele informa se encontrou uma marca SynthID; em imagens, pode destacar as áreas onde ela é mais provável.',
                '**O app Gemini:** envie uma imagem ou vídeo e pergunte se foi feito com a IA do Google. O Gemini procura o SynthID e responde no chat.',
                '**Content Credentials Verify:** [contentcredentials.org/verify](https://contentcredentials.org/verify) mostra os metadados C2PA, não o SynthID. Um arquivo pode passar em um teste e falhar no outro.',
              ],
            },
            { note: 'Um resultado de “não encontrado” não prova que um arquivo foi feito por uma pessoa. O SynthID só marca conteúdo de modelos que o usam, e um arquivo muito editado pode perder um sinal legível. Da mesma forma, um detector só pode dizer que uma marca provavelmente está presente; isso não prova quem fez o arquivo.' },
          ],
        },
        {
          h: 'O que o SynthID aguenta e o que o enfraquece',
          blocks: [
            { p: 'O Google projetou o SynthID para resistir às edições do dia a dia de um arquivo compartilhado: compressão, redimensionamento, cortes leves, mudanças de cor e brilho, filtros, troca de formato e, em vídeo, mudança na taxa de quadros. É isso que o diferencia dos metadados, que somem assim que muitos apps salvam o arquivo de novo.' },
            { p: 'Ele não é indestrutível. O próprio Google diz que mudanças fortes numa imagem, ou muitas edições num texto, podem enfraquecer o sinal até o detector perder a confiança. Pesquisadores também já publicaram ataques a sistemas de marca d’água parecidos. Quanto mais os pixels mudam, mais fraca fica a marca, mas também mais a imagem pode sofrer; por isso o objetivo de um bom removedor de SynthID é mudar cada pixel mantendo a imagem com a mesma aparência.' },
          ],
        },
        {
          h: 'Por que o SynthID importa para criadores',
          blocks: [
            { p: 'Se você publica imagens ou vídeos de IA, é pelo SynthID e pelo C2PA que as plataformas e o público ficam sabendo. TikTok, Instagram, YouTube e outras analisam cada envio em busca de Content Credentials e marcas d’água e, quando encontram, podem adicionar um rótulo de IA que você não consegue desligar. As regras também estão ficando mais rígidas: na UE, as obrigações de transparência da Lei de IA (artigo 50), que valem desde agosto de 2026, exigem que os fornecedores de IA marquem o conteúdo gerado de forma legível por máquina, e o SynthID é uma das formas como o Google faz isso.' },
            { p: 'Remover esses sinais não elimina a sua própria obrigação de informar conteúdo de IA quando uma plataforma ou a lei exigir. O que isso devolve é a escolha de quando e como identificar o seu trabalho, em vez de um rótulo automático em cada post.' },
          ],
        },
        {
          h: 'Dá para remover o SynthID?',
          blocks: [
            { p: 'Não dá para apagar o SynthID como uma tag de metadados, porque não existe um bloco separado para cortar. O que dá para fazer é mudar cada pixel ou amostra só o suficiente para o padrão deixar de se alinhar, mantendo a imagem igual aos olhos. É isso que o [removedor de SynthID do {site}](/app/#strip) faz:' },
            {
              ul: [
                '**Imagens:** uma reamostragem quase unitária, um traço de ruído e uma nitidez suave movem cada pixel, e a imagem é salva de novo em alta qualidade.',
                '**Vídeos:** uma recodificação de alta qualidade (CRF 18) com um leve desfoque, uma nitidez equivalente e um pouco de ruído que muda entre os quadros; o áudio é levemente reamostrado.',
                '**Metadados:** EXIF, GPS, XMP, IPTC e C2PA Content Credentials são removidos por completo em todos os arquivos.',
              ],
            },
            { note: 'O SynthID foi feito para resistir a edições, então nenhuma ferramenta pode prometer que um detector não vai encontrá-lo. O {site} enfraquece a marca d’água o máximo possível sem mudar visivelmente o arquivo. Os metadados, C2PA incluído, são sempre removidos por completo.' },
            { p: 'Guias passo a passo para cada gerador: [vídeos do Google Veo](/guides/remove-synthid-from-google-veo/), [imagens do Gemini e Nano Banana](/guides/remove-synthid-from-gemini-images/), [imagens do Imagen](/guides/remove-synthid-from-imagen-images/) e [arquivos do Higgsfield](/guides/remove-synthid-from-higgsfield/).' },
          ],
        },
      ],
      faq: [
        { q: 'O que é o SynthID, em palavras simples?', a: 'O SynthID é uma marca d’água escondida que o Google coloca dentro das imagens, vídeos, áudios e textos que sua IA cria. Você não a vê, mas o detector do Google consegue lê-la para saber que o conteúdo veio da IA do Google.' },
        { q: 'O SynthID é visível?', a: 'Não. As mudanças nos pixels ou no som são pequenas demais para ver ou ouvir. O logotipo de brilho que algumas imagens do Gemini têm é outra marca d’água, visível.' },
        { q: 'Quais ferramentas de IA usam o SynthID?', a: 'Os modelos do próprio Google: Gemini e os modelos de imagem Nano Banana, Imagen, Veo, Lyria e o texto do Gemini. O Google também oferece o SynthID a parceiros, então conteúdo de outras empresas pode tê-lo. A maioria dos outros geradores, como Midjourney ou Sora, usa metadados C2PA ou marcas próprias.' },
        { q: 'Remover os metadados remove o SynthID?', a: 'Não. O SynthID fica nos pixels, não nos metadados, então apagar EXIF ou C2PA não o afeta. É preciso mudar os pixels para enfraquecê-lo, e é isso que a limpeza de SynthID do {site} faz.' },
        { q: 'Um print ou salvar de novo remove o SynthID?', a: 'Normalmente não. Prints, troca de formato e compressão mantêm o padrão de pixels quase intacto; o SynthID foi projetado para resistir a isso. Eles removem a maior parte dos metadados.' },
        { q: 'Como saber se uma imagem tem SynthID?', a: 'Envie-a para o SynthID Detector do Google ou pergunte ao app Gemini se a imagem foi feita com a IA do Google. Nenhum dos dois consegue provar que um arquivo não foi feito com IA.' },
        { q: 'O SynthID é a mesma coisa que o C2PA?', a: 'Não. As C2PA Content Credentials são metadados assinados que podem ser removidos do arquivo. O SynthID é uma marca d’água no próprio conteúdo. Muitos arquivos do Google têm os dois. O [{site}](/app/#strip) remove o C2PA por completo e enfraquece o SynthID.' },
        { q: 'Dá para remover o SynthID por completo?', a: 'Não com certeza. Ele foi feito para resistir a edições, e os detectores não param de melhorar. Recodificar com pequenas mudanças de pixels, como o {site} faz, o enfraquece mantendo a aparência do arquivo, mas nenhuma ferramenta pode garantir que um detector não o encontre.' },
        { q: 'É legal remover o SynthID?', a: 'Depende de onde você mora e de como usa o arquivo. Processe apenas conteúdo seu ou que você tenha permissão para usar, e identifique conteúdo gerado por IA quando a lei ou uma plataforma exigir.' },
      ],
    },
    'remove-synthid-from-google-veo': {
      title: 'Como remover o SynthID dos vídeos do Google Veo',
      metaTitle: 'Remover o SynthID de vídeos do Google Veo',
      description:
        'Todo vídeo do Google Veo tem uma marca d’água SynthID invisível e C2PA Content Credentials. Como enfraquecer o SynthID e limpar os metadados para as plataformas pararem de marcá-lo.',
      short: 'Remover o SynthID de vídeos do Veo',
      cta: 'Limpar um vídeo do Veo agora',
      intro: [
        'O Google Veo grava uma [marca d’água SynthID](/guides/what-is-synthid/) invisível nos pixels de cada vídeo que cria e adiciona C2PA Content Credentials aos metadados do arquivo. As Content Credentials são o que plataformas como o TikTok leem para ativar automaticamente um rótulo de “gerado por IA”; a marca SynthID é o que o detector do próprio Google procura.',
        'O {site} remove os metadados, incluindo o manifesto C2PA, e recodifica o vídeo para perturbar a marca SynthID, mantendo a imagem e o som com a mesma aparência. Nenhuma ferramenta pode prometer que um detector não vai achar uma marca feita para resistir a edições, então o resultado não é garantido.',
      ],
      steps: [
        { name: 'Abra o removedor de SynthID', text: 'Vá até a aba Strip do {site}.' },
        { name: 'Adicione seu vídeo do Veo', text: 'Solte o MP4. Os metadados e o SynthID são sempre removidos, então não há nada para ativar.' },
        { name: 'Escolha Servidor para ir mais rápido', text: 'O Servidor recodifica vídeos grandes cerca de 4x mais rápido e os apaga logo depois. Este dispositivo mantém o arquivo no seu navegador, mas é mais lento.' },
        { name: 'Baixe a cópia limpa', text: 'Cada arquivo mostra o que foi removido. Compartilhe a cópia limpa em vez do original.' },
      ],
      sections: [
        {
          h: 'O que o Veo coloca no arquivo',
          blocks: [
            {
              ul: [
                'SynthID: uma marca d’água invisível, em nível de pixel, no vídeo inteiro, feita para resistir a redimensionamento, cortes e recompressão.',
                'C2PA Content Credentials: um manifesto assinado nos metadados que registra que o arquivo foi feito com a IA do Google.',
                'Tags do contêiner e do codificador, data de criação e outros metadados padrão.',
              ],
            },
            { p: 'Veja [o que são as C2PA Content Credentials](/guides/remove-c2pa-content-credentials/) para saber mais sobre o manifesto, e [como remover os metadados de vídeos](/guides/remove-metadata-from-videos/) para o resto.' },
          ],
        },
        {
          h: 'Como o {site} enfraquece a marca d’água',
          blocks: [
            { p: 'O vídeo é recodificado numa qualidade visualmente transparente (CRF 18), com um desfoque mínimo, uma nitidez equivalente e um traço de ruído que muda entre os quadros. Isso reamostra cada pixel e desloca a grade da marca d’água, enquanto os metadados, C2PA incluído, são descartados por completo. O áudio é levemente reamostrado para perturbar qualquer marca d’água de áudio.' },
          ],
        },
        {
          h: 'O que dá e o que não dá para fazer',
          blocks: [
            { note: 'O SynthID foi feito para resistir a edições. O {site} o enfraquece, mas não pode garantir que o detector do Google ou o classificador de uma plataforma não o encontre. Já os metadados C2PA são removidos por completo.' },
            { p: 'Remover esses sinais não elimina nenhuma obrigação legal ou da plataforma de identificar conteúdo de IA. Siga as regras de divulgação de cada plataforma.' },
          ],
        },
      ],
      faq: [
        { q: 'O Veo sempre adiciona o SynthID?', a: 'Sim. O Google aplica o SynthID às imagens e vídeos que seus modelos geram, incluindo o Veo. A marca é invisível e não aparece na imagem.' },
        { q: 'O vídeo do Veo perde qualidade?', a: 'A remoção do SynthID recodifica o vídeo, então ele não fica idêntico byte a byte, mas é salvo em alta qualidade e parece igual numa visualização normal.' },
        { q: 'O TikTok ainda vai marcar meu vídeo do Veo como IA?', a: 'Pode ser. O {site} remove as C2PA Content Credentials que as plataformas leem, mas elas também usam classificadores próprios e detectores de marca d’água. Não garantimos que um arquivo fique sem rótulo.' },
      ],
    },
    'remove-synthid-from-gemini-images': {
      title: 'Como remover o SynthID das imagens do Gemini (Nano Banana)',
      metaTitle: 'Remover o SynthID de imagens de IA do Gemini',
      description:
        'Imagens do Gemini e do modelo Nano Banana têm uma marca d’água SynthID invisível e metadados. Como perturbar o SynthID e limpar os metadados de uma só vez.',
      short: 'Remover o SynthID de imagens do Gemini',
      cta: 'Limpar uma imagem do Gemini agora',
      intro: [
        'Imagens feitas com o Gemini, incluindo o modelo de imagem Nano Banana, têm nos pixels a [marca d’água SynthID](/guides/what-is-synthid/) invisível do Google e, normalmente, uma tag IPTC “Digital Source Type” e outros metadados que as marcam como geradas por IA.',
        'O {site} reamostra e recodifica a imagem para perturbar a marca SynthID e remove os metadados que a identificam. A imagem continua com a mesma aparência. Como o SynthID para imagens foi feito para resistir a redimensionamento e a novos salvamentos, um detector ainda pode encontrá-lo, então o resultado não é garantido.',
      ],
      steps: [
        { name: 'Abra o removedor de SynthID', text: 'Vá até a aba Strip do {site}.' },
        { name: 'Adicione sua imagem do Gemini', text: 'Solte o JPEG, PNG ou WebP. Os metadados e o SynthID são sempre removidos.' },
        { name: 'Escolha Este dispositivo ou Servidor', text: 'Este dispositivo limpa a imagem no seu navegador sem enviá-la. O Servidor é mais rápido para lotes grandes.' },
        { name: 'Baixe a cópia limpa', text: 'O arquivo volta sem EXIF, XMP, IPTC nem C2PA, e com a marca d’água enfraquecida.' },
      ],
      sections: [
        {
          h: 'O que uma imagem do Gemini carrega',
          blocks: [
            {
              ul: [
                'SynthID: uma marca d’água invisível espalhada pelos pixels.',
                'Tags IPTC “Digital Source Type” e XMP que marcam a imagem como gerada por IA.',
                'Às vezes C2PA Content Credentials, além dos dados EXIF e ICC de sempre.',
              ],
            },
          ],
        },
        {
          h: 'Como o {site} a perturba',
          blocks: [
            { p: 'A imagem é reamostrada com uma redução e ampliação quase unitárias, uma nitidez suave e um traço de ruído aditivo, e depois salva de novo em alta qualidade. Isso move cada pixel e embaralha a grade da marca d’água, enquanto todo bloco de metadados (EXIF, XMP, IPTC e C2PA) é removido.' },
          ],
        },
        {
          h: 'Por que ainda pode ser detectada',
          blocks: [
            { note: 'O SynthID para imagens foi feito para resistir a redimensionamento e recompressão, então um caso difícil ainda pode acionar o detector do Google mesmo após a limpeza. O {site} enfraquece a marca d’água o máximo possível sem mudar visivelmente a imagem; os metadados são removidos de qualquer forma.' },
          ],
        },
      ],
      faq: [
        { q: 'Nano Banana é o mesmo que Gemini, neste caso?', a: 'Sim. Nano Banana é um modelo de imagem do Gemini, e o que ele gera tem SynthID do mesmo jeito. Os passos são os mesmos.' },
        { q: 'Remover o SynthID muda a aparência da imagem?', a: 'Não de forma visível. A reamostragem, o ruído e a recodificação são quase sem perdas, e a imagem parece igual numa visualização normal.' },
        { q: 'E se a imagem ainda for marcada como IA?', a: 'É a marca d’água nos pixels resistindo, não os metadados. As tags EXIF, XMP, IPTC e C2PA são totalmente removidas; a marca d’água só é enfraquecida, sem garantia.' },
      ],
    },
    'remove-synthid-from-imagen-images': {
      title: 'Como remover o SynthID das imagens do Google Imagen',
      metaTitle: 'Remover o SynthID de imagens do Google Imagen',
      description:
        'O Google Imagen marca cada imagem com uma marca d’água SynthID invisível e metadados de IA. Como enfraquecer a marca e remover os metadados para sua imagem não ser marcada.',
      short: 'Remover o SynthID de imagens do Imagen',
      cta: 'Limpar uma imagem do Imagen agora',
      intro: [
        'O Imagen é o modelo de texto para imagem do Google, usado no Gemini, no ImageFX e em outros apps do Google. Cada imagem que ele cria tem nos pixels uma [marca d’água SynthID](/guides/what-is-synthid/) invisível, além de metadados (muitas vezes uma tag IPTC “Digital Source Type” e C2PA Content Credentials) que a marcam como gerada por IA.',
        'O {site} reamostra e recodifica a imagem para perturbar o SynthID e remove todos os metadados. O resultado tem a mesma aparência. O SynthID foi feito para resistir a edições, então um detector ainda pode encontrá-lo; os metadados, esses são removidos com certeza.',
      ],
      steps: [
        { name: 'Abra o removedor de SynthID', text: 'Vá até a aba Strip do {site}.' },
        { name: 'Adicione sua imagem do Imagen', text: 'Solte o arquivo. Os metadados e o SynthID são sempre removidos.' },
        { name: 'Escolha Este dispositivo ou Servidor', text: 'Este dispositivo nunca envia o arquivo; o Servidor é mais rápido para lotes e apaga os arquivos logo depois.' },
        { name: 'Baixe a cópia limpa', text: 'Compartilhe a cópia limpa, que mostra o que foi removido, em vez do original.' },
      ],
      sections: [
        {
          h: 'O que o Imagen insere',
          blocks: [
            {
              ul: [
                'SynthID: uma marca d’água invisível em nível de pixel em toda imagem gerada.',
                'Tags IPTC / XMP, incluindo um campo “Digital Source Type” que a identifica como gerada por IA.',
                'C2PA Content Credentials em alguns serviços, além dos dados EXIF e ICC padrão.',
              ],
            },
            { p: 'Para ver tudo o que os metadados de uma foto podem revelar, veja [como remover EXIF e metadados](/guides/remove-exif-data-from-photos/).' },
          ],
        },
        {
          h: 'Como a limpeza funciona',
          blocks: [
            { p: 'Uma reamostragem quase unitária move cada pixel, uma nitidez suave devolve a definição e um traço de ruído embaralha a grade da marca d’água. Depois a imagem é recodificada em alta qualidade sem nenhum metadado: EXIF, XMP, IPTC e C2PA somem.' },
          ],
        },
        {
          h: 'Limites',
          blocks: [
            { note: 'Nenhuma ferramenta pode garantir que um detector de SynthID não encontre uma marca feita para resistir a edições. O {site} a enfraquece; os metadados são removidos com certeza. As regras de divulgação de conteúdo de IA continuam valendo.' },
          ],
        },
      ],
      faq: [
        { q: 'Onde o Imagen é usado?', a: 'O Imagen gera imagens no Gemini, no ImageFX e em outras ferramentas do Google. Imagens de qualquer um deles têm SynthID e podem ser limpas do mesmo jeito.' },
        { q: 'Isso remove uma marca d’água visível?', a: 'Não. O {site} perturba a marca d’água invisível SynthID e remove os metadados. Ele não remove logotipos nem marcas visíveis desenhadas na imagem.' },
        { q: 'As cores vão mudar?', a: 'Não. O Imagen gera em sRGB, então tirar o perfil de cor não altera as cores.' },
      ],
    },
    'remove-synthid-from-higgsfield': {
      title: 'Como remover o SynthID e o C2PA de vídeos e imagens do Higgsfield',
      metaTitle: 'Remover SynthID e C2PA de arquivos do Higgsfield',
      description:
        'O Higgsfield usa vários modelos de IA, então seus arquivos podem ter uma marca SynthID, C2PA Content Credentials ou ambos. Como limpá-los para as plataformas pararem de marcá-los.',
      short: 'Remover o SynthID do Higgsfield',
      cta: 'Limpar um arquivo do Higgsfield agora',
      intro: [
        'O Higgsfield é uma plataforma que reúne vários modelos de IA, incluindo o Google Veo. O que vai parar no seu arquivo depende do modelo que o criou: um vídeo feito com o Veo tem a [marca d’água SynthID](/guides/what-is-synthid/) invisível do Google, e a maioria dos geradores também adiciona C2PA Content Credentials aos metadados, marcando o arquivo como gerado por IA.',
        'O {site} remove os metadados, C2PA incluído, e recodifica o arquivo para perturbar uma marca SynthID se houver uma, mantendo a imagem e o som com a mesma aparência. O SynthID foi feito para resistir a edições, então nenhuma ferramenta pode prometer que um detector não vai achá-lo; o resultado não é garantido.',
      ],
      steps: [
        { name: 'Abra o removedor de SynthID', text: 'Vá até a aba Strip do {site}.' },
        { name: 'Adicione seu arquivo do Higgsfield', text: 'Solte o vídeo ou a imagem. Deixe a remoção de SynthID ligada (ela vem ligada) para que um arquivo feito com o Veo também seja recodificado.' },
        { name: 'Escolha Servidor para ir mais rápido', text: 'O Servidor recodifica vídeos grandes cerca de 4x mais rápido e os apaga logo depois. Este dispositivo mantém o arquivo no seu navegador, mas é mais lento.' },
        { name: 'Baixe a cópia limpa', text: 'Cada arquivo mostra o que foi removido. Compartilhe a cópia limpa em vez do original.' },
      ],
      sections: [
        {
          h: 'O que um arquivo do Higgsfield pode ter',
          blocks: [
            {
              ul: [
                'SynthID: presente quando o arquivo foi feito com um modelo do Google, como o Veo. É uma marca d’água invisível em nível de pixel.',
                'C2PA Content Credentials: um manifesto assinado nos metadados que registra que o arquivo foi gerado por IA. Veja [como remover o C2PA](/guides/remove-c2pa-content-credentials/).',
                'Os metadados de sempre do contêiner, do codificador, EXIF e de tempo.',
              ],
            },
            { p: 'Como o Higgsfield mistura modelos, talvez você não saiba qual marca um arquivo tem. Deixar a remoção de SynthID ligada cobre os dois casos: os metadados são sempre removidos e a recodificação é feita caso haja SynthID.' },
          ],
        },
        {
          h: 'Como o {site} limpa o arquivo',
          blocks: [
            { p: 'Os vídeos são recodificados numa qualidade visualmente transparente (CRF 18), com um desfoque mínimo, uma nitidez equivalente e um traço de ruído entre os quadros; as imagens são reamostradas, recebem ruído e nitidez e são salvas de novo em alta qualidade. Em ambos os casos, todo bloco de metadados, C2PA incluído, é descartado. O resultado tem a mesma aparência e reprodução.' },
          ],
        },
        {
          h: 'O que dá e o que não dá para fazer',
          blocks: [
            { note: 'O SynthID foi feito para resistir a edições. O {site} o enfraquece, mas não pode garantir que um detector ou o classificador de uma plataforma não o encontre. Já os metadados C2PA são removidos por completo.' },
            { p: 'Remover esses sinais não elimina nenhuma obrigação legal ou da plataforma de identificar conteúdo de IA. Siga as regras de divulgação de cada plataforma.' },
          ],
        },
      ],
      faq: [
        { q: 'Todo arquivo do Higgsfield tem SynthID?', a: 'Não. Só arquivos feitos com um modelo do Google, como o Veo, têm SynthID. Arquivos de outros modelos do Higgsfield costumam ter C2PA Content Credentials. O {site} cobre os dois: os metadados são sempre removidos e a recodificação roda com a remoção de SynthID ligada.' },
        { q: 'Meu vídeo do Higgsfield vai perder qualidade?', a: 'A remoção do SynthID recodifica o vídeo, então ele não fica idêntico byte a byte, mas é salvo em alta qualidade e parece igual numa visualização normal.' },
        { q: 'O TikTok ainda vai marcar meu vídeo do Higgsfield como IA?', a: 'Pode ser. O {site} remove as C2PA Content Credentials que as plataformas leem, mas elas também usam classificadores próprios e detectores de marca d’água. Não garantimos que um arquivo fique sem rótulo.' },
      ],
    },
    'download-youtube-videos': {
      title: 'Como baixar vídeos e Shorts do YouTube em MP4',
      metaTitle: 'Baixar vídeos e Shorts do YouTube (MP4, 1080p)',
      description:
        'Salve um vídeo ou Short do YouTube em MP4 de até 1080p, ou em áudio M4A, colando o link. Funciona com links youtube.com, youtu.be e de Shorts. Sem instalar nada.',
      short: 'Baixar vídeos e Shorts do YouTube',
      cta: 'Abrir o downloader do YouTube',
      intro: [
        'O jeito mais rápido de salvar um vídeo do YouTube é copiar o link e colar num downloader que faz o trabalho num servidor. O {site} busca a melhor versão até 1080p, junta imagem e som num MP4 que roda em qualquer celular ou computador e envia para você. Você também pode ficar só com o áudio, num arquivo M4A.',
      ],
      steps: [
        { name: 'Copie o link', text: 'No computador, copie o endereço da barra do navegador. No app do YouTube, toque em Compartilhar abaixo do vídeo (ou num Short) e escolha Copiar link.' },
        { name: 'Abra o downloader do YouTube', text: 'Vá até a aba YouTube do {site} e entre com o Google.' },
        { name: 'Cole e escolha um formato', text: 'Cole um ou vários links, um por linha. Deixe a chave em Vídeo para um MP4 ou escolha Só áudio para um M4A.' },
        { name: 'Baixe', text: 'Toque em Baixar. Cada link mostra o título e o progresso, e depois um botão Salvar quando o arquivo estiver pronto.' },
      ],
      sections: [
        {
          h: 'Quais links funcionam',
          blocks: [
            {
              ul: [
                'Vídeos normais: `youtube.com/watch?v=…`',
                'Links curtos: `youtu.be/…`',
                'Shorts: `youtube.com/shorts/…`',
                'Players incorporados: `youtube-nocookie.com/embed/…`',
                'Links móveis: `m.youtube.com/…`',
              ],
            },
            { p: 'Links com parâmetros extras, como um tempo (`&t=42`) ou uma playlist (`&list=…`), funcionam: você recebe o vídeo do link. Playlists inteiras não são baixadas de uma vez; cole os links de cada vídeo.' },
          ],
        },
        {
          h: 'Qualidade e formato',
          blocks: [
            { p: 'O YouTube guarda imagem e som separados na maioria dos vídeos acima de 360p. O downloader escolhe a melhor imagem H.264 até 1080p e o som AAC e os junta num MP4. H.264 e AAC rodam em todo lugar: iPhone, Android, Windows, Mac, apps de edição e redes sociais.' },
            { p: 'Se um vídeo não tiver versão H.264 em 1080p, você recebe a melhor versão que o YouTube oferece até 1080p. Vídeos enviados em resolução menor vêm nessa resolução; um downloader não consegue criar detalhes que nunca foram enviados.' },
          ],
        },
        {
          h: 'Quando um download falha',
          blocks: [
            {
              ul: [
                'Vídeos privados e exclusivos para membros não podem ser baixados.',
                'Vídeos com restrição de idade e alguns bloqueados por região precisam de uma conta do YouTube logada, então podem falhar.',
                'Lives só podem ser salvas depois que terminam e o YouTube as processa.',
                'Estreias que ainda não começaram não têm nada para baixar.',
              ],
            },
          ],
        },
        LEGAL_DL,
      ],
      faq: [
        { q: 'Dá para baixar Shorts do YouTube?', a: 'Sim. Cole um link youtube.com/shorts/ como se fosse um vídeo normal e você recebe um MP4 vertical.' },
        { q: 'Dá para baixar só o áudio?', a: 'Sim. Coloque a chave em Só áudio e você recebe o som num arquivo M4A. Quando a plataforma guarda áudio AAC, ele é copiado sem recodificar.' },
        { q: 'Por que o vídeo vem em 1080p e não em 4K?', a: 'O downloader limita os vídeos a 1080p para os arquivos ficarem leves e rodarem em todo lugar. A maioria dos celulares e redes sociais mostra vídeo em 1080p ou menos.' },
        { q: 'Preciso instalar alguma coisa?', a: 'Não. Tudo roda no navegador e no servidor do {site}, em qualquer celular ou computador.' },
      ],
    },
    'download-tiktok-videos': {
      title: 'Como baixar vídeos do TikTok em MP4',
      metaTitle: 'Baixar vídeos do TikTok (MP4 ou som em M4A)',
      description:
        'Salve um vídeo público do TikTok em MP4, ou o som em M4A, a partir de um link tiktok.com, vm.tiktok.com ou vt.tiktok.com. Passo a passo, no celular ou no computador.',
      short: 'Baixar vídeos do TikTok',
      cta: 'Abrir o downloader do TikTok',
      intro: [
        'O TikTok só oferece o botão Salvar vídeo quando o criador permite, e a cópia salva tem uma marca d’água que se move. Colando o link no {site}, você recebe o vídeo num arquivo MP4, ou só o som em M4A, de qualquer vídeo público.',
      ],
      steps: [
        { name: 'Copie o link', text: 'No app do TikTok, toque em Compartilhar (a seta à direita) e escolha Copiar link. No computador, copie o endereço da página do vídeo.' },
        { name: 'Abra o downloader do TikTok', text: 'Vá até a aba TikTok do {site} e entre com o Google.' },
        { name: 'Cole o link', text: 'Cole um link, ou vários em linhas separadas. Escolha Vídeo para MP4 ou Só áudio para o som em M4A.' },
        { name: 'Salve o arquivo', text: 'Toque em Baixar e salve cada arquivo quando estiver pronto. No iPhone, abra o arquivo e use Compartilhar e depois Salvar vídeo para colocá-lo no Fotos.' },
      ],
      sections: [
        {
          h: 'Quais links funcionam',
          blocks: [
            {
              ul: [
                'Links completos: `tiktok.com/@conta/video/…`',
                'Links de compartilhamento do app: `vm.tiktok.com/…` e `vt.tiktok.com/…`',
                'Links da web móvel: `m.tiktok.com/…`',
              ],
            },
            { p: 'Links curtos são seguidos até o vídeo a que apontam, então você pode colar exatamente o que o app copia.' },
          ],
        },
        {
          h: 'O que você recebe',
          blocks: [
            { p: 'O vídeo vem em MP4 na qualidade que o TikTok entrega, preferindo H.264 para rodar em todo lugar.' },
            { p: 'Só áudio guarda a trilha sonora do vídeo num arquivo M4A. Para um som em alta usado em muitos vídeos, qualquer vídeo que o use serve.' },
          ],
        },
        {
          h: 'O que não funciona',
          blocks: [
            {
              ul: [
                'Vídeos de contas privadas e vídeos compartilhados só com amigos.',
                'Vídeos apagados ou indisponíveis na região do servidor.',
                'Lives e apresentações de fotos (carrosséis de imagens estáticas).',
              ],
            },
          ],
        },
        LEGAL_DL,
      ],
      faq: [
        { q: 'Links curtos vm.tiktok.com funcionam?', a: 'Sim. Cole links vm.tiktok.com ou vt.tiktok.com direto do botão Copiar link do app.' },
        { q: 'Dá para baixar só o som?', a: 'Sim. Coloque a chave em Só áudio para receber a trilha sonora em M4A.' },
        { q: 'Dá para baixar vídeos privados do TikTok?', a: 'Não. Só vídeos públicos são aceitos.' },
        { q: 'O criador recebe uma notificação?', a: 'Não. O {site} lê a página pública do vídeo como um navegador faz; nada é publicado no TikTok.' },
      ],
    },
    'download-twitter-x-videos': {
      title: 'Como baixar vídeos do X (Twitter)',
      metaTitle: 'Baixar vídeos do X (Twitter) em MP4',
      description:
        'Salve o vídeo de um post do X (Twitter) em MP4 colando o link do post. Funciona com links x.com e twitter.com, no celular ou no computador.',
      short: 'Baixar vídeos do X (Twitter)',
      cta: 'Abrir o downloader do X',
      intro: [
        'O X não tem botão de download para vídeos. Para guardar um, copie o link do post e cole no {site}: você recebe o vídeo daquele post em MP4, na melhor qualidade que o X oferece.',
      ],
      steps: [
        { name: 'Copie o link do post', text: 'Toque no ícone de compartilhar abaixo do post e escolha Copiar link. No computador, você também pode copiar o endereço da página do post.' },
        { name: 'Abra o downloader do X', text: 'Vá até a aba X do {site} e entre com o Google.' },
        { name: 'Cole o link', text: 'Cole um ou vários links de posts. Escolha Vídeo para MP4 ou Só áudio para M4A.' },
        { name: 'Salve o arquivo', text: 'Toque em Baixar e salve o arquivo quando estiver pronto.' },
      ],
      sections: [
        {
          h: 'Quais links funcionam',
          blocks: [
            {
              ul: [
                'Links de posts em qualquer um dos domínios: `x.com/conta/status/…` ou `twitter.com/conta/status/…`',
                'Links de serviços que corrigem a incorporação: `fxtwitter.com`, `vxtwitter.com`, `fixupx.com`',
              ],
            },
            { p: 'Cole o link do post que contém o vídeo. Se você estiver vendo uma resposta ou um post com citação, abra primeiro o post original e copie o link dele. GIFs animados no X são guardados como vídeos curtos, então também são baixados em MP4.' },
          ],
        },
        {
          h: 'Quando um download falha',
          blocks: [
            {
              ul: [
                'Posts de contas protegidas (privadas) não podem ser baixados.',
                'Posts marcados como sensíveis, com restrição de idade e alguns que o X só mostra a usuários logados podem falhar.',
                'Posts apagados e contas suspensas não têm mais nada para baixar.',
                'Um post que só tem um link para um vídeo do YouTube não tem vídeo do X; use o [downloader do YouTube](/guides/download-youtube-videos/).',
              ],
            },
          ],
        },
        LEGAL_DL,
      ],
      faq: [
        { q: 'Links do twitter.com ainda funcionam?', a: 'Sim. Links x.com e twitter.com funcionam.' },
        { q: 'Qual qualidade eu recebo?', a: 'A maior qualidade que o X disponibiliza para aquele vídeo, em MP4 com imagem H.264 sempre que possível.' },
        { q: 'Dá para baixar vídeos de contas privadas?', a: 'Não. Só posts públicos são aceitos.' },
      ],
    },
    'download-instagram-reels': {
      title: 'Como baixar Reels e vídeos do Instagram',
      metaTitle: 'Baixar Reels e vídeos do Instagram (MP4)',
      description:
        'Salve um Reel ou post de vídeo público do Instagram em MP4 colando o link. Passo a passo para iPhone, Android e computador. Contas privadas não são aceitas.',
      short: 'Baixar Reels do Instagram',
      cta: 'Abrir o downloader do Instagram',
      intro: [
        'O Instagram deixa você salvar posts dentro do app, mas não como arquivos para guardar ou editar. Para ter um Reel ou post de vídeo em MP4, copie o link e cole no {site}. Isso funciona só com posts públicos.',
      ],
      steps: [
        { name: 'Copie o link', text: 'No app do Instagram, toque no ícone de avião de papel do Reel ou post e depois em Copiar link. No computador, copie o endereço da página do post.' },
        { name: 'Abra o downloader do Instagram', text: 'Vá até a aba Instagram do {site} e entre com o Google.' },
        { name: 'Cole o link', text: 'Cole um ou vários links. Escolha Vídeo para MP4 ou Só áudio para M4A.' },
        { name: 'Salve o arquivo', text: 'Toque em Baixar e salve o arquivo. No iPhone, abra-o e use Compartilhar e depois Salvar vídeo para colocá-lo no Fotos.' },
      ],
      sections: [
        {
          h: 'Quais links funcionam',
          blocks: [
            {
              ul: [
                'Reels: `instagram.com/reel/…`',
                'Posts de vídeo: `instagram.com/p/…`',
                'Links curtos: `instagr.am/…`',
              ],
            },
          ],
        },
        {
          h: 'Vídeos privados não estão disponíveis',
          blocks: [
            { p: 'O downloader só lê o que o Instagram mostra para quem não está logado. Isso deixa de fora:' },
            {
              ul: [
                'Posts e Reels de contas privadas.',
                'Stories, Destaques e conteúdo de Melhores Amigos.',
                'Alguns posts públicos que o Instagram só mostra depois do login, como os com restrição de idade.',
              ],
            },
            { p: 'Se um link falhar com uma mensagem sobre post privado ou login, o vídeo não está disponível para o downloader.' },
          ],
        },
        {
          h: 'Carrosséis com vários vídeos',
          blocks: [{ p: 'Num post com vários slides, o downloader salva o vídeo que encontra no post. Posts só de fotos não têm vídeo para baixar.' }],
        },
        LEGAL_DL,
      ],
      faq: [
        { q: 'Dá para baixar Stories do Instagram?', a: 'Não. Os Stories exigem uma sessão do Instagram logada, e o downloader não usa nenhuma.' },
        { q: 'Dá para baixar de uma conta privada?', a: 'Não. Só Reels e posts de vídeo públicos são aceitos.' },
        { q: 'Dá para ficar só com a música de um Reel?', a: 'Sim. Coloque a chave em Só áudio para receber a trilha sonora em M4A.' },
      ],
    },
    'download-audio-from-videos': {
      title: 'Como baixar o áudio do YouTube, TikTok, X e Instagram',
      metaTitle: 'Baixar áudio do YouTube, TikTok e Instagram (M4A)',
      description:
        'Fique só com o som de um vídeo do YouTube, TikTok, X ou Instagram num arquivo M4A. Cole o link, mude para Só áudio e baixe. Sem app.',
      short: 'Baixar só o áudio (M4A)',
      cta: 'Abrir os downloaders',
      intro: [
        'Todo downloader do {site} tem uma chave Vídeo / Só áudio. Com Só áudio, você recebe a trilha sonora original do vídeo num arquivo M4A: normalmente o áudio AAC que a plataforma já guarda, copiado sem recodificar, então não há perda de qualidade. Se uma plataforma entregar outro codec, ele é convertido para AAC em alta qualidade.',
      ],
      steps: [
        { name: 'Copie o link do vídeo', text: 'Use Compartilhar e depois Copiar link no app do YouTube, TikTok, X ou Instagram, ou copie o endereço da página no computador.' },
        { name: 'Abra o downloader certo', text: 'Escolha a aba dessa plataforma no {site}.' },
        { name: 'Mude para Só áudio', text: 'Coloque a chave acima da caixa do link em Só áudio e cole o link.' },
        { name: 'Baixe o M4A', text: 'Toque em Baixar e salve o arquivo. M4A toca no Apple Music, no VLC, no Windows Media Player e na maioria dos apps de edição.' },
      ],
      sections: [
        {
          h: 'Por que M4A e não MP3',
          blocks: [
            { p: 'Essas plataformas quase sempre guardam o som em AAC. M4A é simplesmente AAC num arquivo no estilo MP4, então pode ser salvo como está. Converter para MP3 significaria decodificar e comprimir de novo, o que perde um pouco de qualidade e não ganha nada: todo celular, computador e app de edição atual toca M4A.' },
            { p: 'Se você precisar de um MP3 para um aparelho antigo, converta o M4A com uma ferramenta gratuita como o VLC (Mídia → Converter / Salvar) ou o ffmpeg:' },
            { code: 'ffmpeg -i sound.m4a -c:a libmp3lame -q:a 2 sound.mp3' },
          ],
        },
        {
          h: 'Já tem o vídeo?',
          blocks: [{ p: 'Cada download de vídeo concluído no {site} também tem um botão Pegar áudio, que extrai a trilha sonora do MP4 que você acabou de baixar.' }],
        },
        LEGAL_DL,
      ],
      faq: [
        { q: 'O áudio é recodificado?', a: 'Não quando a plataforma entrega AAC, que é o caso comum: a faixa é copiada como está para um arquivo M4A. Outros codecs são convertidos para AAC.' },
        { q: 'Dá para baixar uma playlist inteira como áudio?', a: 'Não de uma vez. Cole os links de cada vídeo, um por linha.' },
      ],
    },
    'remove-gps-location-from-photos': {
      title: 'Como remover a localização GPS das fotos',
      metaTitle: 'Remover a localização GPS de fotos (iPhone, Android, PC)',
      description:
        'Fotos podem guardar o lugar exato onde foram tiradas. Veja como checar se há dados de GPS e removê-los no iPhone, Android, Windows e Mac, ou numa só etapa para qualquer foto.',
      short: 'Remover a localização GPS de fotos',
      cta: 'Remover os dados de localização agora',
      intro: [
        'A maioria dos celulares grava a latitude e a longitude exatas em cada foto, muitas vezes com precisão de poucos metros. Qualquer pessoa que receba o arquivo original pode ler esses dados e marcar um ponto no mapa: sua casa, sua escola, seu trabalho. Alguns apps os removem ao publicar, mas e-mail, apps de mensagem que enviam em “qualidade original”, links da nuvem e sites de compra e venda costumam mantê-los.',
        'Este guia mostra como checar se uma foto tem dados de localização e como removê-los, com as configurações que já existem no seu celular ou computador ou numa só etapa com o removedor de metadados do {site}.',
      ],
      steps: [
        { name: 'Abra o removedor de metadados', text: 'Vá até a aba Strip do {site}.' },
        { name: 'Adicione suas fotos', text: 'Solte uma ou várias fotos: JPEG, PNG, WebP, HEIC, AVIF, TIFF ou GIF.' },
        { name: 'Escolha onde processar', text: 'Escolha Este dispositivo para limpar os arquivos no seu navegador sem enviá-los, ou Servidor para processá-los no {site} e apagá-los logo depois.' },
        { name: 'Baixe as cópias limpas', text: 'Todos os metadados, incluindo o bloco GPS, são removidos de cada arquivo. Baixe e compartilhe a cópia limpa em vez do original.' },
      ],
      sections: [
        {
          h: 'Onde a localização fica guardada',
          blocks: [
            { p: 'Nas fotos JPEG, HEIC e TIFF, a localização fica no bloco GPS do EXIF: latitude, longitude, altitude, direção para a qual a câmera apontava e um horário de GPS. Apps de edição também podem copiá-la para os metadados XMP, e alguns celulares a gravam nos metadados da miniatura incorporada. Remover só um deles pode deixar os outros, por isso uma limpeza completa é mais segura do que apagar um campo.' },
          ],
        },
        {
          h: 'Como checar se uma foto tem localização',
          blocks: [
            {
              ul: [
                'iPhone: abra a foto no app Fotos e deslize para cima. Se aparecer um mapa, a foto tem localização.',
                'Android (Google Fotos): abra a foto, deslize para cima e procure um mapa ou nome de lugar.',
                'Windows: clique com o botão direito no arquivo, Propriedades, aba Detalhes, e veja em GPS.',
                'Mac: abra no Pré-Visualização, Ferramentas e depois Mostrar Inspetor, e procure uma aba GPS.',
              ],
            },
          ],
        },
        {
          h: 'Remova com as configurações do seu celular ou computador',
          blocks: [
            {
              ul: [
                'iPhone, ao compartilhar: selecione as fotos, toque em Compartilhar, toque em Opções no topo e desative Localização. Isso vale só para esse envio.',
                'iPhone, para fotos futuras: Ajustes, Privacidade e Segurança, Serviços de Localização, Câmera, e escolha Nunca.',
                'Android: abra as configurações do app Câmera e desative a opção de localização ou geotag (o nome muda conforme o celular). No Google Fotos, Configurações e depois Compartilhamento tem uma opção para remover a localização do que você compartilha por link.',
                'Windows: clique com o botão direito no arquivo, Propriedades, Detalhes e depois Remover Propriedades e Informações Pessoais. Escolha criar uma cópia com todas as propriedades possíveis removidas.',
                'Mac: no Pré-Visualização, Ferramentas, Mostrar Inspetor, aba GPS e depois Remover Informações de Localização.',
              ],
            },
            { note: 'Essas opções nativas geralmente removem só os campos de GPS. O modelo da câmera, o número de série, as datas e o histórico de edição normalmente continuam no arquivo.' },
          ],
        },
        {
          h: 'Remova com o exiftool (linha de comando)',
          blocks: [
            { p: 'Se você se sente à vontade com o terminal, o exiftool gratuito remove o bloco GPS, ou tudo, no próprio arquivo. Ele guarda um backup terminado em `_original`.' },
            { code: 'exiftool -gps:all= -xmp:geotag= photo.jpg   # só a localização\nexiftool -all= photo.jpg                     # todos os metadados' },
          ],
        },
        {
          h: 'O que mais uma foto pode revelar',
          blocks: [
            { p: 'A localização é o campo mais sensível, mas o mesmo arquivo pode ter o modelo do celular ou da câmera e o número de série, a data e a hora exatas, o programa usado na edição, seu nome ou linha de copyright, regiões de marcação de rostos de apps de fotos e uma pequena prévia do original sem corte. Veja [como remover os dados EXIF](/guides/remove-exif-data-from-photos/) para a lista completa.' },
          ],
        },
      ],
      faq: [
        { q: 'O Instagram e o Facebook removem a localização das fotos?', a: 'As grandes redes sociais geralmente removem os dados EXIF, GPS incluído, da cópia que os outros veem. Arquivos enviados por e-mail, links da nuvem, alguns apps de chat em qualidade original e muitos fóruns e sites de compra e venda podem mantê-los, então é mais seguro limpar o arquivo antes de enviar.' },
        { q: 'Um print da tela tem dados de localização?', a: 'Normalmente não, porque o print é uma imagem nova. Mas ele ainda pode mostrar um lugar dentro da própria imagem, como uma placa de rua ou um mapa.' },
        { q: 'A foto vai ficar diferente depois?', a: 'Não. A cópia limpa é salva em alta qualidade e parece igual numa visualização normal; só os dados ocultos somem.' },
      ],
    },
    'remove-exif-data-from-photos': {
      title: 'Como remover os dados EXIF e outros metadados das fotos',
      metaTitle: 'Remover dados EXIF e metadados de fotos',
      description:
        'O que os metadados EXIF, XMP, IPTC e ICC revelam sobre você, como vê-los e como remover tudo de fotos JPEG, PNG, HEIC, WebP e outras.',
      short: 'Remover dados EXIF de fotos',
      cta: 'Remover os metadados de fotos agora',
      intro: [
        'EXIF é o bloco de informações que uma câmera ou celular grava em cada foto: o aparelho, as configurações, a data e, muitas vezes, o lugar. Apps de edição adicionam suas próprias camadas por cima (XMP e IPTC), e alguns arquivos têm C2PA Content Credentials com um histórico de edição. Nada disso aparece na imagem, mas qualquer pessoa com o arquivo consegue ler.',
      ],
      steps: [
        { name: 'Abra o removedor de metadados', text: 'Vá até a aba Strip do {site}.' },
        { name: 'Adicione as fotos', text: 'Solte seus arquivos. Lotes são aceitos.' },
        { name: 'Escolha Este dispositivo ou Servidor', text: 'Este dispositivo limpa as fotos no seu navegador e nunca as envia. O Servidor as processa no {site} e as apaga logo depois.' },
        { name: 'Baixe a cópia limpa', text: 'Cada arquivo volta sem EXIF, GPS, XMP, IPTC, ICC, C2PA, notas do fabricante, miniaturas ou comentários.' },
      ],
      sections: [
        {
          h: 'O que os metadados de uma foto contêm',
          blocks: [
            {
              ul: [
                'EXIF: marca e modelo da câmera ou do celular, lente, números de série, configurações de exposição, data e hora em que a foto foi tirada e editada, e localização GPS.',
                'Notas do fabricante: uma área EXIF específica de cada marca que pode guardar identificadores extras, como um número de série interno ou a contagem de cliques.',
                'XMP: gravado por apps de edição como Lightroom e Photoshop. Pode incluir seu nome, o histórico de edição, classificações, palavras-chave e uma cópia dos dados de GPS.',
                'IPTC: legendas, créditos, copyright, o nome e o contato do fotógrafo, e o campo Digital Source Type que algumas ferramentas usam para marcar imagens geradas por IA.',
                'Perfil ICC: descreve as cores. Quase sempre inofensivo, mas alguns perfis nomeiam o aparelho ou o programa que os criou.',
                'Miniatura incorporada: uma pequena prévia guardada dentro do arquivo. Pode mostrar a foto antes de ser cortada ou editada.',
                'C2PA Content Credentials: um registro assinado de onde a imagem veio e como foi editada. Veja [como remover o C2PA](/guides/remove-c2pa-content-credentials/).',
                'Comentários e blocos de texto: arquivos PNG, em especial, podem ter texto livre, como o prompt e as configurações usadas por um gerador de imagens de IA.',
              ],
            },
          ],
        },
        {
          h: 'Formatos que o {site} limpa',
          blocks: [{ p: 'JPEG, PNG, WebP, HEIC/HEIF, AVIF, TIFF e GIF. Fotos HEIC voltam em JPEG para abrirem em qualquer lugar.' }],
        },
        {
          h: 'Outras formas de remover o EXIF',
          blocks: [
            {
              ul: [
                'Windows: Propriedades, Detalhes, Remover Propriedades e Informações Pessoais, e criar uma cópia limpa. Não remove todos os campos em todos os formatos.',
                'Mac: o Pré-Visualização remove a localização (Ferramentas, Mostrar Inspetor, GPS, Remover Informações de Localização), mas não o resto. Exportar do Fotos com Localização desmarcada também tira o GPS.',
                'exiftool: `exiftool -all= photo.jpg` remove tudo o que ele consegue gravar; adicione `-r folder/` para uma pasta inteira.',
                'Salvar de novo ou tirar print: remove a maior parte dos metadados, mas reduz a qualidade e, dependendo do app, pode manter alguns campos.',
              ],
            },
          ],
        },
      ],
      faq: [
        { q: 'Remover o EXIF reduz a qualidade?', a: 'Não de forma visível. O {site} salva a cópia limpa em alta qualidade, então ela parece igual numa visualização normal.' },
        { q: 'As cores mudam se o perfil ICC for removido?', a: 'Fotos de celulares e da maioria das câmeras usam cores sRGB ou Display P3 padrão e continuam iguais. Arquivos num espaço de cor incomum podem ficar um pouco diferentes.' },
        { q: 'Dá para recuperar os metadados removidos?', a: 'Não a partir da cópia limpa. Eles sumiram desse arquivo; o seu original ainda os tem, então compartilhe a cópia limpa.' },
      ],
    },
    'remove-metadata-from-iphone-photos': {
      title: 'Como remover os metadados das fotos do iPhone (HEIC e JPEG)',
      metaTitle: 'Remover metadados de fotos do iPhone (HEIC)',
      description:
        'Fotos do iPhone guardam localização, aparelho, data e dados de edição. Como desativar no iPhone, remover ao compartilhar e apagar tudo de arquivos HEIC e JPEG.',
      short: 'Remover metadados de fotos do iPhone',
      cta: 'Limpar fotos do iPhone agora',
      intro: [
        'Uma foto do iPhone costuma ser um arquivo HEIC com um conjunto completo de metadados: o modelo do iPhone, a lente, a hora exata, a localização se os Serviços de Localização estiverem ativos para a Câmera e, depois da edição, os apps usados. O iOS consegue tirar a localização ao compartilhar, mas não o resto. Veja como resolver as duas coisas.',
      ],
      steps: [
        { name: 'Salve as fotos no Arquivos', text: 'No Fotos, selecione as fotos, toque em Compartilhar e depois em Salvar em Arquivos. (Ou envie por AirDrop ou copie para um computador.)' },
        { name: 'Abra o {site} no Safari', text: 'Vá até a aba Strip e toque para adicionar arquivos do Arquivos ou da sua fototeca.' },
        { name: 'Limpe as fotos', text: 'Escolha Este dispositivo para mantê-las no seu iPhone, ou Servidor para ir mais rápido. Fotos HEIC voltam em JPEG.' },
        { name: 'Salve as cópias limpas', text: 'Baixe-as, abra cada uma e toque em Compartilhar, Salvar Imagem para colocar a cópia limpa de volta no Fotos.' },
      ],
      sections: [
        {
          h: 'Remova a localização ao compartilhar',
          blocks: [
            { p: 'Selecione as fotos, toque em Compartilhar, toque em Opções no topo da tela de compartilhamento e desative Localização. O iOS envia cópias sem dados de GPS só nesse envio. Ativar Todos os Dados da Foto faz o contrário e inclui tudo.' },
            { note: 'Escolher fotos da fototeca dentro de um site ainda pode enviar o arquivo original, com os metadados. Use a chave em Opções ou limpe o arquivo antes.' },
          ],
        },
        {
          h: 'Pare de salvar a localização',
          blocks: [{ p: 'Ajustes, Privacidade e Segurança, Serviços de Localização, Câmera e depois Nunca. Fotos novas não terão dados de GPS. As que você já tirou mantêm os delas.' }],
        },
        {
          h: 'Por que HEIC vira JPEG',
          blocks: [
            { p: 'HEIC é o formato padrão da Apple. Muitos sites, apps do Windows e celulares Android antigos não o abrem, então o {site} salva as fotos HEIC limpas como JPEG de alta qualidade. Se você quiser que o iPhone tire fotos em JPEG desde o início, escolha Ajustes, Câmera, Formatos, Mais Compatível.' },
          ],
        },
        {
          h: 'Live Photos, Retrato e edições',
          blocks: [
            { p: 'Uma Live Photo é uma imagem estática mais um vídeo MOV curto, e cada um tem seus próprios metadados. Limpar a imagem estática não limpa o vídeo; compartilhe como foto estática ou limpe o vídeo à parte com o [removedor de metadados de vídeo](/guides/remove-metadata-from-videos/). Os dados de profundidade do modo Retrato e o histórico de edição saem da cópia limpa.' },
          ],
        },
      ],
      faq: [
        { q: 'O AirDrop mantém os metadados?', a: 'Sim. O AirDrop envia o original completo, incluindo a localização, a menos que você desative Localização em Opções antes.' },
        { q: 'O iMessage remove a localização?', a: 'Não de forma confiável. Desative Localização em Opções ao compartilhar ou limpe a foto antes de enviar.' },
      ],
    },
    'remove-metadata-from-videos': {
      title: 'Como remover os metadados de vídeos (MP4, MOV e outros)',
      metaTitle: 'Remover metadados de vídeos (MP4, MOV, MKV)',
      description:
        'Vídeos guardam GPS, aparelho, datas, timecode e tags do codificador. Como vê-los e remover tudo de vídeos MP4, MOV, MKV, WebM e outros.',
      short: 'Remover metadados de vídeos',
      cta: 'Remover os metadados de um vídeo agora',
      intro: [
        'Vídeos de celulares e câmeras têm tantos metadados quanto fotos, às vezes mais: uma localização, o modelo do aparelho, datas de criação, timecode, o codificador usado e, em drones e câmeras de ação, uma trilha completa de GPS ou telemetria gravada junto com a imagem. Apps de edição ainda adicionam tags de projeto e de software por cima.',
      ],
      steps: [
        { name: 'Abra o removedor de metadados', text: 'Vá até a aba Strip do {site}.' },
        { name: 'Adicione os vídeos', text: 'MP4, MOV, M4V, MKV, WebM, AVI, MTS/M2TS, TS, 3GP, WMV ou FLV.' },
        { name: 'Escolha Este dispositivo ou Servidor', text: 'Este dispositivo funciona no seu navegador sem enviar nada. O Servidor é mais rápido com arquivos grandes, que são apagados logo depois.' },
        { name: 'Baixe a cópia limpa', text: 'Todas as tags, trilhas de dados e caixas C2PA são removidas; o vídeo e o som são mantidos.' },
      ],
      sections: [
        {
          h: 'O que os metadados de um vídeo contêm',
          blocks: [
            {
              ul: [
                'Tags globais: título, data de criação, marca e modelo do aparelho, software e localização (por exemplo a tag `©xyz` e `com.apple.quicktime.location.ISO6709` em vídeos do iPhone).',
                'Tags de faixa: nomes, idiomas, nomes de handler e dados do codificador de cada faixa.',
                'Trilhas de dados: telemetria de GPS e sensores de drones, câmeras veiculares e câmeras de ação, guardada como trilhas separadas ao lado do vídeo e do áudio.',
                'Trilhas de timecode e títulos de capítulos.',
                'Capas e miniaturas anexadas ao arquivo.',
                'Caixas C2PA: Content Credentials assinadas, cada vez mais adicionadas por câmeras, apps de edição e ferramentas de vídeo com IA.',
              ],
            },
          ],
        },
        {
          h: 'O vídeo fica diferente?',
          blocks: [
            { p: 'Não. Os metadados ficam no contêiner em volta do vídeo e do áudio, não na imagem. O {site} salva a cópia limpa em alta qualidade, então ela parece e soa igual numa reprodução normal. O arquivo não fica idêntico byte a byte ao original, o que é esperado.' },
          ],
        },
        {
          h: 'Faça você mesmo com o ffmpeg',
          blocks: [
            { p: 'Com o ffmpeg gratuito, este comando copia só o vídeo e o áudio e descarta tags globais, capítulos e trilhas de dados:' },
            { code: 'ffmpeg -i in.mov -map 0:v -map 0:a? -map_metadata -1 -map_chapters -1 \\\n  -fflags +bitexact -c copy out.mp4' },
            { p: 'Confira o resultado com `ffprobe -hide_banner out.mp4` ou `exiftool out.mp4`. Algumas tags de faixa, como nomes de handler, podem ficar; o {site} apaga essas também.' },
          ],
        },
      ],
      faq: [
        { q: 'O YouTube ou o TikTok removem os metadados do vídeo?', a: 'Eles recodificam os envios, o que remove a maior parte do que os espectadores baixam. O arquivo original que você envia por e-mail, link da nuvem ou chat ainda os tem.' },
        { q: 'O vídeo vai perder qualidade?', a: 'Não de forma visível. A cópia limpa é salva em alta qualidade.' },
      ],
    },
    'remove-c2pa-content-credentials': {
      title: 'O que são as C2PA Content Credentials e como removê-las',
      metaTitle: 'O que são as C2PA Content Credentials e como removê-las',
      description:
        'As C2PA Content Credentials registram quem fez uma foto ou vídeo, com quais ferramentas e edições. Como checar se um arquivo as tem, o que revelam e como removê-las.',
      short: 'Remover as C2PA Content Credentials',
      cta: 'Checar e limpar um arquivo',
      intro: [
        'C2PA (da Coalition for Content Provenance and Authenticity) é um padrão para anexar um registro assinado, chamado manifesto ou Content Credentials, a uma foto, vídeo ou áudio. Ele é adicionado por algumas câmeras e celulares, por apps de edição como Photoshop e Lightroom e por ferramentas de IA como o Adobe Firefly, as ferramentas de imagem e vídeo da OpenAI e os geradores de imagens da Microsoft.',
        'O manifesto é útil para mostrar de onde um arquivo veio, mas também pode ter dados pessoais que você talvez não queira publicar. Este guia explica o que há dentro, como checar um arquivo e como remover o manifesto incorporado.',
      ],
      steps: [
        { name: 'Cheque o arquivo', text: 'Envie-o ao site Content Credentials Verify (contentcredentials.org/verify) para ver se ele tem um manifesto e o que diz.' },
        { name: 'Abra o removedor de metadados do {site}', text: 'Vá até a aba Strip e adicione o arquivo.' },
        { name: 'Limpe o arquivo', text: 'Escolha Este dispositivo ou Servidor. O manifesto C2PA é removido junto com o EXIF, o XMP e os outros metadados.' },
        { name: 'Cheque de novo', text: 'Envie a cópia limpa ao site Verify. Ele não deve encontrar Content Credentials incorporadas.' },
      ],
      sections: [
        {
          h: 'O que um manifesto C2PA pode conter',
          blocks: [
            {
              ul: [
                'O nome ou a conta da pessoa ou organização que o assinou, se ela decidiu incluir.',
                'O aparelho, app ou serviço de IA que criou o arquivo e o software usado para editá-lo.',
                'Uma lista de edições (ações), como corte, mudanças de cor ou “criado com uma ferramenta de IA generativa”.',
                'Datas e horários e, às vezes, uma localização.',
                'Miniaturas de versões anteriores e “ingredientes”: referências aos arquivos de origem que foram combinados.',
                'Uma assinatura criptográfica que mostra se o arquivo mudou desde que foi assinado.',
              ],
            },
          ],
        },
        {
          h: 'Onde ele fica no arquivo',
          blocks: [
            { p: 'Em arquivos JPEG, o manifesto fica em segmentos APP11 (caixas JUMBF). No PNG é um bloco `caBX`, no MP4 e no MOV uma caixa `uuid`, e no HEIC, WebP e AVIF uma caixa de metadados própria. Como é um bloco separado, removê-lo não mexe na imagem.' },
          ],
        },
        {
          h: 'O que removê-lo faz e o que não faz',
          blocks: [
            { p: 'A limpeza remove o manifesto incorporado ao arquivo. Ela não remove:' },
            {
              ul: [
                'Marcas d’água ou logotipos visíveis desenhados na imagem.',
                'Cópias do manifesto guardadas online pela ferramenta que criou o arquivo. Alguns serviços guardam as Content Credentials na nuvem e conseguem encontrá-las de novo a partir da própria imagem.',
                'Marcas d’água invisíveis nos pixels, como o [SynthID](/guides/what-is-synthid/) do Google. O {site} perturba o SynthID à parte, mas nenhuma ferramenta pode garantir que um detector não o encontre.',
                'Nenhuma obrigação de divulgar. Leis e regras de plataformas sobre identificar conteúdo gerado ou editado por IA continuam valendo para o arquivo.',
              ],
            },
            { note: 'Remover as Content Credentials não impede uma plataforma de marcar um arquivo como gerado por IA. As plataformas também usam classificadores próprios, detectores de marca d’água e perguntas no envio.' },
          ],
        },
        {
          h: 'Outras formas de remover o C2PA',
          blocks: [
            {
              ul: [
                'exiftool: `exiftool -jumbf:all= -c2pa:all= photo.jpg` (versões recentes) remove o C2PA de JPEG; para outros formatos, `exiftool -all= file` é mais simples.',
                'Salvar de novo num app sem suporte a C2PA costuma removê-lo, mas alguns apps, incluindo o Photoshop, adicionam um manifesto novo.',
                'Prints de tela criam um arquivo novo sem o manifesto original, com qualidade menor.',
              ],
            },
          ],
        },
      ],
      faq: [
        { q: 'É legal remover os dados C2PA?', a: 'Remover metadados dos seus próprios arquivos geralmente é permitido, mas algumas leis e regras de plataformas exigem que conteúdo gerado por IA seja identificado. Remover as Content Credentials não muda essas obrigações.' },
        { q: 'Remover o C2PA muda a aparência da imagem?', a: 'Não. O manifesto é um bloco separado no arquivo; a imagem continua a mesma.' },
        { q: 'Por que o site Verify ainda encontra Content Credentials?', a: 'Ele consegue comparar algumas imagens com credenciais guardadas online pelo serviço que as criou. Esse registro fica com o serviço, não no seu arquivo.' },
      ],
    },
  },
};
