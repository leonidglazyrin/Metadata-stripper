import type { Translation } from './en';

export const ko: Translation = {
  meta: {
    title: 'AI 이미지·동영상에서 SynthID와 C2PA 제거 · {site}',
    description:
      'Google Veo, Gemini, Sora, ChatGPT, Higgsfield로 만든 AI 이미지와 동영상에서 C2PA Content Credentials와 메타데이터를 제거하고 SynthID 워터마크를 흐트러뜨립니다. EXIF, GPS, XMP도 삭제합니다. YouTube, X, TikTok, Instagram 다운로더도 제공합니다.',
    ogDescription:
      'Veo, Gemini, Sora, ChatGPT, Higgsfield의 AI 동영상과 사진에서 SynthID와 숨은 메타데이터를 제거하세요. 서버에서도, 기기에서도 처리할 수 있습니다.',
    twitterDescription:
      'Veo, Gemini, Sora, ChatGPT, Higgsfield의 AI 동영상과 사진에서 SynthID와 숨은 메타데이터를 제거하세요.',
    ogImageAlt: '{site}: SynthID 및 메타데이터 제거 도구',
  },
  nav: {
    label: '메인',
    home: '{site} 홈',
    synthid: 'SynthID',
    detection: 'AI 라벨',
    metadata: '메타데이터',
    downloaders: '다운로더',
    pricing: '요금',
    faq: 'FAQ',
    openTools: '도구 열기',
    language: '언어',
    menu: '메뉴',
    mobileLabel: '주 메뉴(모바일)',
  },
  hero: {
    eyebrow: 'SynthID, C2PA, 메타데이터 제거 도구',
    title: ['플랫폼이 내 이미지와 동영상을', 'AI로 표시하지 않게.'],
    lede:
      'TikTok, Instagram 등은 AI 파일에 숨은 C2PA Content Credentials와 SynthID 워터마크를 읽고 게시물에 "AI 생성" 라벨을 붙입니다. Google Veo, Gemini, Sora, ChatGPT, Higgsfield의 사진이나 동영상을 올리면 C2PA와 모든 메타데이터 태그(EXIF, GPS, XMP)를 지우고 SynthID 워터마크를 흐트러뜨린 깨끗한 사본을 내려받을 수 있습니다. 서버에서도, 브라우저에서도 실행됩니다.',
    ctaStrip: '파일 정리하기',
    ctaDownload: '동영상 다운로드',
    toolsLabel: '도구',
    chipStrip: 'SynthID 및 메타데이터',
  },
  detection: {
    title: ['자동으로 붙는', '"AI 생성" 라벨을 막으세요.'],
    lede:
      '플랫폼은 업로드할 때마다 C2PA Content Credentials와 워터마크를 검사합니다. 발견하면 끌 수 없는 AI 라벨을 켭니다. 먼저 지워 두면 표시할지는 직접 정할 수 있습니다.',
    beforeTitle: '메타데이터가 남아 있을 때',
    beforeText:
      'TikTok이 Content Credentials를 읽고 AI 라벨을 대신 켰습니다. 회색으로 비활성화되어 끌 방법이 없습니다.',
    afterTitle: '{site}로 정리한 뒤',
    afterText:
      '플랫폼이 찾을 것이 없으니 라벨은 다시 선택 사항이 됩니다. 표시할지는 직접 정하세요.',
    detectedTag: '자동 라벨',
    cleanTag: '직접 선택',
    note:
      '플랫폼은 자체 분류기도 사용하므로 여전히 라벨을 붙일 수 있습니다. {site}는 지울 수 있는 신호를 지우지만, 플랫폼이 게시물에 라벨을 붙이지 않는다고 약속할 수는 없습니다. 각 플랫폼의 AI 공개 규칙을 따르세요.',
    shotDetectedAlt:
      'TikTok의 "AI 생성 콘텐츠" 스위치가 켜진 채 잠겨 있고, "TikTok이 게시물의 콘텐츠를 편집하거나 생성하는 데 AI가 사용된 것을 감지하여 이 라벨을 추가했습니다."라는 문구가 보이는 화면',
    shotOptionalAlt:
      'TikTok의 "AI 생성 콘텐츠" 스위치가 꺼져 있고 선택 사항이며, "콘텐츠가 AI로 생성되거나 편집되었음을 시청자에게 알리려면 이 라벨을 추가하세요."라는 문구가 보이는 화면',
  },
  synthid: {
    title: ['보이는 그대로,', 'AI 동영상에서 SynthID 제거.'],
    lede:
      'SynthID는 Google이 Veo, Gemini, Imagen으로 만든 이미지와 동영상의 픽셀에 넣는 보이지 않는 워터마크입니다. {site}는 픽셀을 아주 조금 바꿔 그 패턴을 약화합니다. 파일은 보기에도, 재생에도 똑같습니다.',
    sourcesTitle: '지원하는 생성 도구',
    sourcesLabel: 'AI 생성 도구',
    reencode: {
      caption: '거의 손실 없는 리샘플링, 미세한 노이즈, 새 재인코딩이 모든 픽셀을 움직입니다. 그림은 똑같아 보이지만, 보이지 않는 워터마크 격자는 살아남지 못합니다.',
      before: 'AI 프레임 · 워터마크 내장',
      after: '재인코딩 · 워터마크 깨짐',
    },
    photos: { title: '사진', text: '약간의 리샘플링, 미세한 노이즈, 선명화로 모든 픽셀을 바꾼 뒤 고화질로 다시 저장합니다.' },
    videos: { title: '동영상', text: '고화질 재인코딩(CRF 18)에 가벼운 블러, 이를 보정하는 선명화, 프레임 간의 약간의 노이즈를 더합니다.' },
    caveat: {
      title: '보장하지 않습니다',
      text: 'SynthID는 편집을 견디도록 만들어졌기 때문에, 어떤 도구도 탐지기를 피한다고 약속할 수 없습니다. {site}는 워터마크를 약화하지만, 완전히 사라졌다거나 플랫폼이 파일을 AI로 표시하지 않는다고 보장하지는 않습니다.',
    },
    cta: 'SynthID 제거 도구 열기',
    learnMore: 'SynthID란?',
  },
  metadata: {
    title: ['사진과 동영상용', '메타데이터 제거 도구.'],
    lede:
      '사진과 동영상에는 촬영 장소, 기기, 일련번호, 편집 기록이 저장됩니다. 메타데이터 제거 도구는 이를 모두 지우고 SynthID 워터마크도 제거하며, 무엇을 지웠는지 보여 줍니다.',
    synthidTag: 'SynthID 워터마크',
    photosTitle: '사진에서 제거',
    photoTags: ['EXIF', 'GPS 위치', 'XMP', 'IPTC', 'ICC 프로필', 'C2PA / Content Credentials', '제조사 노트', '썸네일', '텍스트 주석'],
    photoFormats: 'JPEG, PNG, WebP, HEIC/HEIF, AVIF, TIFF, GIF. HEIC는 JPEG로 돌려드립니다.',
    videosTitle: '동영상에서 제거',
    videoTags: ['전역 및 스트림 태그', '챕터 태그', 'GPS 및 텔레메트리 트랙', '타임코드', '커버 이미지', 'C2PA 박스', '인코더 정보'],
    videoFormats: 'MP4, MOV, M4V, MKV, WebM, AVI, MTS/M2TS, TS, 3GP, WMV, FLV. 스트림은 재인코딩 없이 복사합니다.',
  },
  downloaders: {
    label: '동영상 다운로더',
    youtube: {
      title: ['YouTube', '다운로더'],
      text: 'YouTube 동영상이나 Shorts 링크를 붙여 넣으세요. 최대 1080p MP4 또는 오디오를 M4A로 받을 수 있습니다.',
      cta: 'YouTube 다운로더 열기',
    },
    x: {
      title: ['X', '다운로더'],
      text: 'x.com 또는 twitter.com 게시물 링크를 붙여 넣으면 그 게시물의 동영상을 MP4로 받을 수 있습니다.',
      cta: 'X 다운로더 열기',
    },
    tiktok: {
      title: ['TikTok', '다운로더'],
      text: 'vm., vt. 짧은 링크를 포함한 tiktok.com 링크를 붙여 넣으세요. 동영상은 MP4, 사운드는 M4A로 받을 수 있습니다.',
      cta: 'TikTok 다운로더 열기',
    },
    instagram: {
      title: ['Instagram', '다운로더'],
      text: '공개된 릴스나 동영상 게시물 링크를 붙여 넣으세요. 비공개 동영상은 받을 수 없습니다.',
      cta: 'Instagram 다운로더 열기',
    },
  },
  how: {
    title: ['SynthID와 메타데이터를', '제거하는 방법.'],
    steps: [
      ['파일을 업로드하세요.', 'AI 동영상이나 사진을 원하는 만큼. 서버나 이 기기에서.'],
      ['{site}가 정리합니다.', 'EXIF, GPS, C2PA 태그를 지우고 SynthID 워터마크를 약화합니다.'],
      ['깨끗한 사본을 내려받으세요.', '파일마다 무엇이 제거됐는지 표시됩니다.'],
    ],
    flow: {
      uploading: '업로드 중…',
      stripping: '메타데이터 제거 중 · SynthID 약화 중…',
      clean: '완료 · 4개 항목 제거',
      download: '다운로드',
    },
    cta: 'SynthID 제거 도구 열기',
  },
  pricing: {
    title: ['두 가지 요금제.', '무료로 시작하세요.'],
    perMonth: '/ 월',
    perYear: '/ 년',
    monthly: '월간',
    yearly: '연간',
    yearlySave: '2개월 무료',
    free: '모든 계정에 기기 정리 1회, 서버 정리 1회, 동영상 다운로드 1회가 무료로 제공됩니다. 무료 서버 정리와 다운로드는 모든 사용자에게 하루 한도가 있습니다.',
    basic: {
      name: 'Basic',
      features: [
        '기기에서 무제한 정리',
        '파일이 기기 밖으로 나가지 않음',
        '메타데이터와 C2PA 제거',
        'SynthID 제거 이용 가능(브라우저 성능에 좌우되어 느립니다. 저희가 느리게 만드는 것은 아닙니다)',
      ],
    },
    pro: {
      name: 'Pro',
      badge: '가장 빠름',
      features: [
        'Basic의 모든 기능',
        '서버에서 무제한 정리, 약 4배 빠름',
        'YouTube, X, TikTok, Instagram 동영상 무제한 다운로드',
      ],
    },
    pack: {
      name: '정리 팩',
      badge: '$2로 체험하기',
      once: '1회 결제',
      text: 'SynthID 정리 10회를 $2에. 기기에서 처리하며 메타데이터도 지웁니다. 구독 없음: 한 번 결제하고 언제든 다시 구매할 수 있으며 횟수는 누적됩니다.',
      cta: '$2로 체험하기',
    },
    billing: '요금제는 월간 또는 연간으로 결제됩니다. 언제든 해지하거나 요금제를 바꿀 수 있습니다. 정리 팩은 1회 결제입니다.',
    stripeLabel: 'Stripe 보안 결제',
    cta: '도구 열기',
  },
  faq: {
    title: ['SynthID 제거', '자주 묻는 질문.'],
    items: [
      {
        q: 'SynthID 제거 도구란?',
        a: 'SynthID는 Google이 AI 모델로 만든 이미지와 동영상에 넣는 보이지 않는 워터마크입니다. SynthID 제거 도구는 픽셀을 아주 조금 바꿔 그 패턴을 깨뜨립니다. {site}는 사진을 리샘플링하고 선명화하며 동영상을 고화질로 재인코딩하므로, 파일은 똑같아 보입니다.',
      },
      {
        q: 'AI 동영상에서 SynthID를 제거하려면?',
        a: 'SynthID 제거 도구를 열고 동영상을 추가한 뒤, SynthID 제거를 켠 상태(기본으로 켜져 있음)로 두고 서버를 선택하세요. {site}는 메타데이터를 지우고, 워터마크를 약화하는 작은 픽셀 변경과 함께 동영상을 고화질로 재인코딩해 깨끗한 MP4를 돌려드립니다. Google Veo와 Gemini 동영상에는 SynthID가 있으며, 같은 방법으로 다른 생성기의 메타데이터도 지울 수 있습니다.',
      },
      {
        q: '어떤 AI 생성 도구와 호환되나요?',
        a: '모두 호환됩니다. Google Veo, Gemini, Imagen의 동영상과 사진에는 SynthID 워터마크가 있습니다. Sora, ChatGPT 등 많은 도구의 파일에는 메타데이터에 C2PA Content Credentials가 있습니다. Higgsfield는 Veo를 포함한 여러 모델을 쓰므로 파일에 둘 중 하나가 있을 수 있습니다. {site}는 모든 파일의 메타데이터를 지우고, SynthID가 있으면 흐트러뜨립니다. 눈에 보이는 워터마크나 로고는 지우지 않습니다.',
      },
      {
        q: 'TikTok 등 플랫폼이 여전히 제 동영상에 AI 라벨을 붙이나요?',
        a: '그럴 수 있습니다. TikTok 등 일부 플랫폼은 C2PA Content Credentials를 읽어 AI 콘텐츠에 라벨을 붙이며, {site}는 이를 제거합니다. 하지만 플랫폼은 워터마크 감지기, 자체 분류기, 공개 규칙도 사용할 수 있고, 저희는 어떤 플랫폼이 결과물에 어떻게 라벨을 붙이는지 테스트하지 않았습니다. {site}는 파일이 감지되지 않거나 라벨이 붙지 않는다고 보장하지 않습니다. AI 생성 콘텐츠 공개에 관한 각 플랫폼의 규칙을 따르세요.',
      },
      {
        q: 'SynthID 제거가 항상 성공하나요?',
        a: '아니요. SynthID는 편집을 견디도록 만들어졌고 탐지기도 계속 바뀝니다. {site}는 워터마크를 흐트러뜨리지만, 탐지기가 여전히 찾아낼 수 있습니다.',
      },
      {
        q: '정리한 뒤에도 이미지가 AI로 감지되는 이유는?',
        a: '이미지용 SynthID는 크기 조정과 다시 저장을 견디도록 설계된 픽셀 단위 워터마크라서, 어려운 경우에는 탐지기가 여전히 반응할 수 있습니다. {site}는 이미지를 리샘플링하고 미세한 노이즈를 더해 재인코딩하여, 눈에 띄는 변화 없이 패턴을 최대한 약화합니다. 그래도 감지된다면 메타데이터가 아니라 워터마크가 버티고 있는 것입니다. EXIF, XMP, C2PA Content Credentials는 어쨌든 완전히 제거됩니다. 어떤 탐지기든 통과한다고 보장하지 않습니다.',
      },
      {
        q: '메타데이터 제거 도구는 무엇을 지우나요?',
        a: '사진에서는 EXIF(카메라, 일련번호, 시간, GPS), XMP, IPTC, ICC 프로필, C2PA Content Credentials, 제조사 노트, 내장 썸네일, 주석을 지웁니다. 동영상에서는 전역·스트림·챕터 태그, GPS 및 텔레메트리 트랙, 타임코드, 커버 이미지, C2PA 박스, 인코더 정보를 지웁니다. 파일마다 제거된 항목 목록이 표시됩니다.',
      },
      {
        q: '파일이 업로드되나요?',
        a: '서버를 선택한 경우에만 업로드됩니다. 서버 모드에서는 파일을 업로드해 정리한 뒤 바로 삭제합니다. 이 기기 모드에서는 파일이 브라우저에 남고 저희에게 아무것도 전송되지 않습니다. 메타데이터는 항상 제거되며, SynthID 제거는 기본으로 켜진 스위치입니다. 기기에서는 재인코딩이 브라우저에서 실행되므로 동영상은 서버보다 오래 걸립니다.',
      },
      {
        q: '어떤 형식을 지원하나요?',
        a: '사진: JPEG, PNG, WebP, HEIC/HEIF, AVIF, TIFF, GIF(HEIC는 JPEG로 저장). 동영상: MP4, MOV, M4V, MKV, WebM, AVI, MTS/M2TS, TS, 3GP, WMV, FLV.',
      },
      {
        q: '정리하면 화질이 떨어지나요?',
        a: '메타데이터를 지울 때는 동영상 스트림을 재인코딩 없이 복사하고 사진은 고화질로 저장합니다. SynthID 제거는 픽셀을 바꿔야 하므로 파일이 바이트 단위로 같지는 않지만, 평소처럼 볼 때는 차이가 없습니다.',
      },
      {
        q: 'SynthID 워터마크를 제거하는 것은 합법인가요?',
        a: '사는 곳과 파일을 쓰는 방식에 따라 다릅니다. 본인 소유이거나 사용 허락을 받은 콘텐츠만 처리하고, 법이나 플랫폼이 요구하면 AI 생성 콘텐츠임을 표시하세요.',
      },
    ],
  },
  downloaderFaq: {
    title: ['다운로더', '자주 묻는 질문.'],
    items: [
      {
        q: 'YouTube 동영상은 어떻게 다운로드하나요?',
        a: 'YouTube 다운로더를 열고 동영상이나 Shorts 링크를 붙여 넣은 뒤 다운로드를 누르세요. 최대 1080p MP4를 받거나, 오디오만을 선택해 M4A 파일을 받을 수 있습니다. 여러 링크를 한 번에 붙여 넣을 수도 있습니다.',
      },
      {
        q: 'X(트위터) 동영상은 어떻게 다운로드하나요?',
        a: '게시물 링크(x.com 또는 twitter.com)를 복사해 X 다운로더에 붙여 넣으세요. 그 게시물의 동영상을 MP4로 받습니다.',
      },
      {
        q: 'TikTok 다운로더는 짧은 링크도 되나요?',
        a: '네. tiktok.com 링크나 vm.tiktok.com / vt.tiktok.com 짧은 링크를 붙여 넣으면 동영상은 MP4, 사운드는 M4A로 받을 수 있습니다.',
      },
      {
        q: 'Instagram이나 X 링크가 실패하는 이유는?',
        a: '공개 동영상만 다운로드할 수 있습니다. 비공개 동영상은 다운로드 도구에서 받을 수 없으며, 플랫폼이 로그인을 요구하면 그 내용을 알리는 메시지와 함께 다운로드가 실패합니다.',
      },
      {
        q: '오디오만 다운로드할 수 있나요?',
        a: '네. 모든 다운로더에 동영상 / 오디오만 스위치가 있습니다. 오디오만을 선택하면 M4A 파일을 받습니다.',
      },
      {
        q: '제가 다운로드한 동영상을 보관하나요?',
        a: '아니요. 각 동영상은 서버에서 가져와 보내 드린 뒤 바로 삭제합니다.',
      },
      {
        q: '동영상을 다운로드하는 것은 합법인가요?',
        a: '본인 소유이거나 사용 허락을 받은 동영상만 다운로드하세요. 다운로드는 플랫폼 이용약관에 어긋날 수 있으며, 저작권 규정은 사는 곳에 따라 다릅니다.',
      },
    ],
  },
  footer: {
    tagline: 'SynthID 제거, 메타데이터 제거, YouTube·X·TikTok·Instagram 다운로더.',
    open: '도구 열기',
    disclaimer:
      '본인 소유이거나 사용 허락을 받은 콘텐츠만 처리하고 다운로드하세요. 규정상 필요한 경우 AI 생성 콘텐츠임을 표시하세요. {site}는 Google, YouTube, TikTok, X, Instagram과 제휴 관계가 없습니다.',
    badges: '소개된 곳',
  },
  jsonLd: {
    name: '{site}: SynthID 및 메타데이터 제거 도구',
    alternateName: ['SynthID 제거', 'AI 동영상 SynthID 제거', '메타데이터 제거', 'YouTube 다운로더', 'X 동영상 다운로더', 'TikTok 다운로더', 'Instagram 다운로더'],
    browserRequirements: 'JavaScript를 지원하는 최신 브라우저가 필요합니다.',
    operatingSystem: '모든 운영체제(웹 브라우저)',
    description:
      'AI 동영상과 사진(Google Veo, Gemini, Sora, ChatGPT, Higgsfield 등)에서 EXIF, GPS, XMP, IPTC, C2PA 메타데이터를 제거하고 SynthID 워터마크를 흐트러뜨립니다. 서버에서도, 기기에서도 처리할 수 있습니다. 결과는 보장되지 않습니다. YouTube, TikTok, X, Instagram 다운로더 포함.',
    keywords:
      'SynthID 제거, SynthID 지우기, AI 동영상 SynthID 제거, AI 워터마크 제거, C2PA 제거, 메타데이터 제거, Veo, Gemini, Sora, ChatGPT, Higgsfield',
    featureList: [
      '사진과 동영상의 SynthID 제거',
      'EXIF, GPS, XMP, IPTC, ICC, C2PA 메타데이터 제거',
      '기기에서 처리하는 옵션',
      'YouTube 다운로더(최대 1080p MP4 또는 M4A 오디오)',
      'TikTok 다운로더',
      'X 및 Instagram 동영상 다운로더',
    ],
  },
};
