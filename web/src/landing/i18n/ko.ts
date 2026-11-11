import type { Translation } from './en';

export const ko: Translation = {
  meta: {
    title: '사진·동영상의 SynthID와 메타데이터 제거 · {site}',
    description:
      '{site}는 사진과 동영상의 메타데이터를 지우고 SynthID 워터마크를 흐트러뜨립니다. EXIF, GPS, C2PA 태그를 서버나 내 기기에서 제거하세요. YouTube, X, TikTok, Instagram 다운로더도 제공합니다.',
    ogDescription:
      '사진과 동영상에서 SynthID 워터마크와 숨은 메타데이터를 제거하세요. 서버나 내 기기에서 처리할 수 있습니다. YouTube, X, TikTok, Instagram 다운로더도 제공합니다.',
    twitterDescription:
      '사진과 동영상에서 SynthID 워터마크와 숨은 메타데이터를 제거하세요. YouTube, X, TikTok, Instagram 다운로더도 제공합니다.',
    ogImageAlt: '{site}: SynthID 및 메타데이터 제거 도구',
  },
  nav: {
    label: '메인',
    home: '{site} 홈',
    synthid: 'SynthID',
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
    eyebrow: 'SynthID 제거 · 메타데이터 삭제 · 동영상 다운로드',
    title: ['SynthID와', '메타데이터 제거.'],
    lede:
      '사진이나 동영상을 올리면 EXIF, GPS, C2PA 태그를 지우고 SynthID 워터마크를 흐트러뜨린 사본을 내려받을 수 있습니다. 서버에서도, 브라우저에서도 실행됩니다.',
    ctaStrip: '파일 정리하기',
    ctaDownload: '동영상 다운로드',
    toolsLabel: '도구',
    chipStrip: 'SynthID 및 메타데이터',
  },
  synthid: {
    title: ['보이는 그대로,', 'SynthID 제거.'],
    lede:
      'SynthID는 Google이 AI 이미지와 동영상의 픽셀에 넣는 보이지 않는 워터마크입니다. {site}는 픽셀을 아주 조금 바꿔 그 패턴을 깨뜨립니다. 파일은 보기에도, 재생에도 똑같습니다.',
    sourcesTitle: '지원하는 생성 도구',
    sourcesLabel: 'AI 생성 도구',
    photos: { title: '사진', text: '약간의 리샘플링과 선명화로 모든 픽셀을 바꾼 뒤 고화질로 다시 저장합니다.' },
    videos: { title: '동영상', text: '고화질 재인코딩(CRF 18)에 가벼운 블러, 이를 보정하는 선명화, 프레임 간의 약간의 노이즈를 더합니다.' },
    caveat: {
      title: '보장하지 않습니다',
      text: 'SynthID는 편집을 견디도록 만들어졌기 때문에, 어떤 도구도 탐지기를 피한다고 약속할 수 없습니다. {site}는 워터마크를 흐트러뜨리지만 완전히 사라졌다고 보장하지는 않습니다.',
    },
    cta: 'SynthID 제거 도구 열기',
  },
  metadata: {
    title: ['사진과 동영상의', '메타데이터 제거.'],
    lede:
      '사진과 동영상에는 촬영 장소, 기기, 일련번호, 편집 기록이 저장됩니다. 메타데이터 제거 도구는 이 모든 것을 지우고 무엇을 지웠는지 보여 줍니다.',
    synthidTag: 'SynthID 워터마크',
    photosTitle: '사진에서 제거',
    photoTags: ['EXIF', 'GPS 위치', 'XMP', 'IPTC', 'ICC 프로필', 'C2PA / 콘텐츠 자격 증명', '제조사 정보', '썸네일', '텍스트 주석'],
    photoFormats: 'JPEG, PNG, WebP, HEIC/HEIF, AVIF, TIFF, GIF. HEIC는 JPEG로 저장됩니다.',
    videosTitle: '동영상에서 제거',
    videoTags: ['전역 및 스트림 태그', '챕터 태그', 'GPS 및 텔레메트리 트랙', '타임코드', '커버 이미지', 'C2PA 박스', '인코더 정보'],
    videoFormats: 'MP4, MOV, M4V, MKV, WebM, AVI, MTS/M2TS, TS, 3GP, WMV, FLV. 스트림은 재인코딩 없이 복사됩니다.',
  },
  downloaders: {
    label: '동영상 다운로더',
    youtube: {
      title: ['YouTube', '다운로더'],
      text: 'YouTube 동영상이나 Shorts 링크를 붙여 넣으세요. 최대 1080p MP4 또는 M4A 오디오로 받을 수 있습니다.',
      cta: 'YouTube 다운로더 열기',
    },
    x: {
      title: ['X', '다운로더'],
      text: 'x.com 또는 twitter.com 게시물 링크를 붙여 넣으면 그 게시물의 동영상을 MP4로 받을 수 있습니다.',
      cta: 'X 다운로더 열기',
    },
    tiktok: {
      title: ['TikTok', '다운로더'],
      text: 'vm., vt. 단축 링크를 포함한 tiktok.com 링크를 붙여 넣으세요. 동영상은 MP4, 사운드는 M4A로 받을 수 있습니다.',
      cta: 'TikTok 다운로더 열기',
    },
    instagram: {
      title: ['Instagram', '다운로더'],
      text: '릴스나 동영상 게시물 링크를 붙여 넣으세요. 공개 게시물은 바로 되고, 비공개 게시물은 로그인된 세션이 필요합니다.',
      cta: 'Instagram 다운로더 열기',
    },
  },
  how: {
    title: ['SynthID와 메타데이터를', '제거하는 방법.'],
    steps: [
      ['파일을 업로드하세요.', 'AI 동영상이나 사진을 원하는 만큼. 서버 또는 이 기기에서.'],
      ['{site}가 제거합니다.', 'EXIF, GPS, C2PA 태그를 지우고 SynthID 워터마크를 약화합니다.'],
      ['깨끗한 사본을 내려받으세요.', '파일마다 제거된 항목이 표시됩니다.'],
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
    perMonth: '/ 월',
    billing: 'Stripe로 매월 결제됩니다. 언제든 해지할 수 있습니다.',
    stripeLabel: 'Stripe 결제',
    cta: '도구 열기',
  },
  faq: {
    title: ['SynthID 제거', '자주 묻는 질문.'],
    items: [
      {
        q: 'SynthID 제거 도구란 무엇인가요?',
        a: 'SynthID는 Google의 AI 모델로 만든 이미지와 동영상에 들어가는 보이지 않는 워터마크입니다. SynthID 제거 도구는 픽셀을 아주 조금 바꿔 그 패턴을 깨뜨립니다. {site}는 사진을 리샘플링하고 선명하게 하며, 동영상은 고화질로 재인코딩하므로 파일은 똑같아 보입니다.',
      },
      {
        q: 'AI 동영상에서 SynthID를 어떻게 제거하나요?',
        a: 'SynthID 제거 도구를 열고 동영상을 추가한 다음, SynthID 제거를 켠 채 서버를 선택하세요. {site}가 메타데이터를 지우고, 워터마크를 약화하는 작은 픽셀 변화를 더해 동영상을 고화질로 다시 인코딩한 뒤 깨끗한 MP4를 내려받을 수 있게 합니다. Google Veo와 Gemini 동영상에는 SynthID가 들어 있으며, 같은 방법으로 다른 생성 도구의 메타데이터도 지울 수 있습니다.',
      },
      {
        q: '어떤 AI 생성 도구에서 작동하나요?',
        a: '모두 작동합니다. Google Veo, Gemini, Imagen의 동영상과 사진에는 SynthID 워터마크가 있습니다. Sora, ChatGPT 등 많은 도구의 파일에는 메타데이터에 C2PA Content Credentials가 들어 있습니다. Higgsfield는 Veo를 포함한 여러 모델을 쓰기 때문에 둘 중 하나가 들어 있을 수 있습니다. {site}는 모든 파일의 메타데이터를 지우고, SynthID가 있으면 교란합니다. 눈에 보이는 워터마크나 로고는 제거하지 않습니다.',
      },
      {
        q: 'TikTok 같은 플랫폼에서 여전히 AI로 표시되나요?',
        a: '그럴 수 있습니다. TikTok 등 일부 플랫폼은 C2PA Content Credentials를 읽어 AI 콘텐츠를 표시하는데, {site}는 이를 제거합니다. 하지만 플랫폼은 워터마크 탐지기, 자체 분류기, 공개 규칙도 사용할 수 있으며, 저희는 어떤 플랫폼이 결과물을 어떻게 표시하는지 테스트하지 않았습니다. {site}는 파일이 탐지되거나 표시되지 않는다고 보장하지 않습니다. AI 생성 콘텐츠 공개에 관한 각 플랫폼의 규칙을 따르세요.',
      },
      {
        q: 'SynthID 제거가 항상 되나요?',
        a: '아니요. SynthID는 편집을 견디도록 만들어졌고 탐지기도 계속 바뀝니다. {site}는 워터마크를 흐트러뜨리지만, 탐지기가 여전히 찾아낼 수 있습니다.',
      },
      {
        q: '메타데이터 제거 도구는 무엇을 지우나요?',
        a: '사진에서는 EXIF(카메라, 일련번호, 시간, GPS), XMP, IPTC, ICC 프로필, C2PA 콘텐츠 자격 증명, 제조사 정보, 내장 썸네일, 주석을 지웁니다. 동영상에서는 전역·스트림·챕터 태그, GPS 및 텔레메트리 트랙, 타임코드, 커버 이미지, C2PA 박스, 인코더 정보를 지웁니다. 파일마다 제거된 항목 목록이 표시됩니다.',
      },
      {
        q: '제 파일이 업로드되나요?',
        a: '서버를 선택한 경우에만 업로드됩니다. 서버 모드에서는 파일을 업로드해 정리한 뒤 바로 삭제합니다. 이 기기 모드에서는 파일이 브라우저에 남습니다. 기기에서는 사진을 무손실로 정리하고 동영상은 리먹싱하며, 기기에서의 SynthID 제거는 사진만 지원합니다.',
      },
      {
        q: '어떤 형식을 지원하나요?',
        a: '사진: JPEG, PNG, WebP, HEIC/HEIF, AVIF, TIFF, GIF (HEIC는 JPEG로 저장). 동영상: MP4, MOV, M4V, MKV, WebM, AVI, MTS/M2TS, TS, 3GP, WMV, FLV.',
      },
      {
        q: '정리하면 화질이 떨어지나요?',
        a: '메타데이터 제거는 동영상 스트림을 재인코딩 없이 복사하고 사진은 고화질로 저장합니다. SynthID 제거는 픽셀을 바꿔야 하므로 파일이 바이트 단위로 같지는 않지만, 일반적으로 볼 때는 차이를 느낄 수 없습니다.',
      },
      {
        q: 'SynthID 워터마크를 제거해도 합법인가요?',
        a: '사는 지역과 파일 사용 방식에 따라 다릅니다. 본인이 소유하거나 사용 허가를 받은 콘텐츠만 처리하고, 법이나 플랫폼이 요구하는 경우 AI 생성 콘텐츠임을 표시하세요.',
      },
    ],
  },
  downloaderFaq: {
    title: ['다운로더', '자주 묻는 질문.'],
    items: [
      {
        q: 'YouTube 동영상은 어떻게 다운로드하나요?',
        a: 'YouTube 다운로더를 열고 동영상이나 Shorts 링크를 붙여 넣은 뒤 다운로드를 누르세요. 최대 1080p MP4로 받거나, 오디오만을 골라 M4A 파일로 받을 수 있습니다. 여러 링크를 한 번에 붙여 넣을 수도 있습니다.',
      },
      {
        q: 'X(Twitter) 동영상은 어떻게 다운로드하나요?',
        a: '게시물 링크(x.com 또는 twitter.com)를 복사해 X 다운로더에 붙여 넣으세요. 그 게시물의 동영상을 MP4로 받을 수 있습니다.',
      },
      {
        q: 'TikTok 다운로더는 단축 링크도 되나요?',
        a: '네. tiktok.com 링크나 vm.tiktok.com / vt.tiktok.com 단축 링크를 붙여 넣으면 동영상은 MP4, 사운드는 M4A로 받을 수 있습니다.',
      },
      {
        q: 'Instagram이나 X 링크가 실패하는 이유는 무엇인가요?',
        a: '비공개 게시물과 일부 공개 게시물은 로그인된 세션이 필요합니다. 게시물이 비공개이거나 플랫폼이 로그인을 요구하면 그 내용을 알리는 메시지와 함께 다운로드가 실패합니다.',
      },
      {
        q: '오디오만 다운로드할 수 있나요?',
        a: '네. 모든 다운로더에 동영상 / 오디오만 스위치가 있습니다. 오디오만을 고르면 M4A 파일을 받습니다.',
      },
      {
        q: '다운로드한 동영상을 보관하나요?',
        a: '아니요. 각 동영상은 서버에서 가져와 보내 드린 뒤 바로 삭제됩니다.',
      },
      {
        q: '동영상을 다운로드해도 합법인가요?',
        a: '본인이 소유하거나 사용 허가를 받은 동영상만 다운로드하세요. 다운로드는 플랫폼 이용약관에 어긋날 수 있으며, 저작권 규정은 사는 지역에 따라 다릅니다.',
      },
    ],
  },
  footer: {
    tagline: 'SynthID 제거, 메타데이터 제거, YouTube·X·TikTok·Instagram 다운로더.',
    open: '도구 열기',
    disclaimer:
      '본인이 소유하거나 사용 허가를 받은 콘텐츠만 처리하고 다운로드하며, 규정이 요구하는 경우 AI 생성 콘텐츠임을 표시하세요. {site}는 Google, YouTube, TikTok, X, Instagram과 제휴 관계가 없습니다.',
    badges: '소개된 곳',
  },
  jsonLd: {
    name: '{site}: SynthID 및 메타데이터 제거 도구',
    alternateName: ['SynthID 제거', '메타데이터 제거', 'YouTube 다운로더', 'X 동영상 다운로더', 'TikTok 다운로더', 'Instagram 다운로더'],
    browserRequirements: 'JavaScript를 지원하는 최신 브라우저가 필요합니다.',
    operatingSystem: '모든 OS (웹 브라우저)',
    description:
      '사진과 동영상에서 EXIF, GPS, XMP, IPTC, C2PA 메타데이터를 제거하고 SynthID 워터마크를 흐트러뜨립니다. 서버나 내 기기에서 처리할 수 있습니다. YouTube, TikTok, X, Instagram 다운로더 포함.',
    featureList: [
      '사진과 동영상의 SynthID 제거',
      'EXIF, GPS, XMP, IPTC, ICC, C2PA 메타데이터 제거',
      '기기 내 처리 옵션',
      'YouTube 다운로더 (최대 1080p MP4 또는 M4A 오디오)',
      'TikTok 다운로더',
      'X 및 Instagram 동영상 다운로더',
    ],
  },
};
