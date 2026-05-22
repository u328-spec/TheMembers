# Handoff: 회원 후기 캐러셀 섹션 (Member Reviews Carousel)

## Overview

데이팅 컨시어지 서비스 "더블랙"의 웹사이트에 들어갈 **회원 후기 가로 스크롤 섹션**입니다. 세로로 긴 인물/씬 사진 카드와 후기 텍스트 카드가 살짝 겹쳐 배치되는, 카카오뱅크 스타일의 프리미엄 캐러셀입니다.

핵심 인터랙션:
- 가로 스크롤 (← → 버튼 + 마우스/터치 드래그)
- 카드 4종 변형 (stat / members / chat / quote)이 순환
- 카드 위치 좌·우 교차 (`scene--left` / `scene--right`)
- 사진 8장이 8개 후기에 1:1 중복 없이 매칭

---

## About the Design Files

이 폴더의 파일들은 **HTML로 제작된 디자인 레퍼런스**입니다 — 의도된 룩앤필과 동작을 보여주는 프로토타입이지, 그대로 복사해 운영에 투입할 코드는 아닙니다.

작업 목표는 **이 디자인을 타겟 코드베이스의 기존 환경**(예: Next.js, Nuxt, Vue, Astro 등)에서 그 코드베이스의 패턴·디자인 시스템을 사용해 **재구현**하는 것입니다.

기존 사이트가 없을 경우, 프로젝트에 가장 적합한 프레임워크를 선택해서 구현해주세요. 단, 이 섹션은 페이지 일부로 들어갈 컴포넌트이므로 **독립적으로 import 가능한 컴포넌트 형태**로 만들어야 합니다 (e.g. `<MemberReviewsCarousel reviews={...} />`).

---

## Fidelity

**High-fidelity (hifi)** — 모든 색상, 타이포그래피, 스페이싱, 인터랙션이 최종 디자인입니다. 픽셀 단위로 동일하게 재현해주세요.

---

## 디자인 시스템 (Tokens)

### Colors
| Token | Hex | 용도 |
|---|---|---|
| `--white` | `#FFFFFF` | 카드 배경 |
| `--bg` | `#F7F7F7` | 페이지 배경 |
| `--bg2` | `#FAFAFA` | 보조 배경 |
| `--accent` | `#C12838` | 메인 포인트 (레드) |
| `--accent-dark` | `#9E1F2D` | 포인트 hover |
| `--accent-pale` | `#FDF2F3` | 포인트 옅은 배경 |
| `--headline` | `#111111` | 본문/타이틀 |
| `--para` | `#6F6F6F` | 보조 텍스트 |
| `--muted` | `#929292` | 메타/플레이스홀더 |
| `--border` | `#EDEDED` | 옅은 구분선 |
| `--border2` | `#E0E0E0` | 진한 구분선 |
| `--dark` | `#111111` | 다크 배경 |
| `--max` | `1280px` | 최대 폭 |

### Typography
- **폰트**: `Pretendard` (`https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css`)
- **폴백**: `-apple-system, 'Apple SD Gothic Neo', sans-serif`
- 모든 타이틀은 `letter-spacing: -0.02em` ~ `-0.03em` (한글 특성상 다소 좁게)
- `text-wrap: pretty` (본문) / `text-wrap: balance` (타이틀)

---

## Components

이 섹션의 컴포넌트 계층:

```
<KbCarousel reviews={[...]} >          // 외부에서 후기 배열을 받는 메인 컴포넌트
├── <header>                           // 좌측 타이틀 + 우측 prev/next 버튼
└── <track>                            // 가로 스크롤 컨테이너
    └── <KbScene index={i} photoIdx={n} review={r}>  // 카드 한 쌍(사진 + 텍스트)
        ├── <PhotoArt photoIdx>        // 세로 사진 카드 (290×480, img+object-fit:cover)
        └── <HighlightCard review kind position>     // 텍스트 카드 (320×440)
            ├── kind="stat"            // 점수 + 본문 + 회원정보 + 날짜
            ├── kind="members"         // 날짜 + 첫 만남 + 아바타 + 본문 + 매너·외모점수
            ├── kind="chat"            // 카카오톡 스타일 채팅 스레드
            └── kind="quote"           // 검정 카드, 빨간 따옴표 + 인용
```

### `<KbCarousel>` — 메인 컴포넌트

**Props (실 구현시):**
```ts
type Review = {
  rank: number;
  gender: "m" | "f";
  age: string;        // "30대"
  verify: string;     // "매력 인증" / "직업 인증" / "소득 인증" / "학력 인증"
  appearance: number; // 0-4
  manner: number;     // 0-4
  date: string;       // "2025-08-16" (ISO)
  text: string;       // 후기 본문 (긴 텍스트)
};

interface Props {
  reviews: Review[];   // 권장 8개. 8장 사진 풀과 1:1 매칭됨
  photos?: string[];   // 사진 URL 배열 (기본 8장 — 아래 참조)
}
```

### `<KbScene>` 레이아웃

- **height**: `540px`
- **flex-basis**: `540px` (가로 스크롤시 카드 너비 결정)
- 사진(290×480) + 텍스트카드(320×440)가 `margin: -70px`로 겹침
- `scene--right`: 사진 ↑20px / 텍스트 ↓30px
- `scene--left`: 위 반대 + flex-direction 역방향
- 인덱스에 따라 right/left/right/left… 교차

### `<PhotoArt>` — 사진 카드

- 크기: `290 × 480px`
- `border-radius: 14px`
- `box-shadow: 0 24px 60px -20px rgba(0,0,0,0.22)`
- `img { width:100%; height:100%; object-fit:cover; object-position:center; }`

### `<HighlightCard>` — 텍스트 카드

공통:
- `width: 320px` / `height: 440px`
- `border-radius: 20px`
- `padding: 28px 26px`
- `box-shadow: 0 20px 52px -16px rgba(0,0,0,0.20)`
- 내부 layout은 flex column with gap `16px`

**4가지 kind 변형 (carousel index 기준 순환: 0,4,8…=stat / 1,5,9…=members / 2,6…=chat / 3,7…=quote)**

#### 1. `kind="stat"` — 점수 카드
- 라벨 `매너 점수 · 외모 점수` (small chip)
- 큰 점수 `4.0 · 4.0` (`font-size: 32px / 800`)
- 본문 (`14px / 1.75 line-height`)
- footer: 아바타 + 핸들("남성 회원" / "여성 회원") + 정보("30대 · 직업 인증") + 날짜

#### 2. `kind="members"` — 멤버 카드
- 라벨 `2025.08.16 · 첫 만남`
- 두 아바타 pill 겹치기 (-10px margin) + 회원 핸들
- 회원 정보 라인 (`13px / 600`)
- 본문
- footer: `매너 4.0 · 외모 4.0`

#### 3. `kind="chat"` — 카카오톡 스타일
- **배경**: `#ABC1D1` (카톡 채팅방 색)
- 헤더: 컨시어지 아바타 + "더블랙 컨시어지" + 온라인 인디케이터(녹색 점)
- 컨시어지 인삿말 (흰 말풍선, 좌측 정렬)
- **회원 후기는 문장 단위로 분리해서 여러 노란 말풍선**(`#FEE500`, 우측 정렬)
- 각 말풍선에 시각 표시 (`오후 9:15` 등)
- 컨시어지 응답 ("소중한 후기 감사합니다 💛")
- 하단 input: `남성 회원 · 30대 · 직업 인증`
- 스크롤 가능 (`overflow-y: auto`)

#### 4. `kind="quote"` — 다크 카드
- 배경: `#111111`
- 큰 빨간 따옴표 `“` (`font-size: 60px, Georgia, color: var(--accent)`)
- 본문 (`17px / 600 / 1.7` line-height, 흰색)
- footer: 핸들 + 정보 + 날짜 (구분선 위)

---

## Photo Assignment Logic

총 **8장** 사진 풀:
| Idx | 파일 | 분류 |
|---|---|---|
| 0 | `photo_woman_cafe.png` | 여성 단독 |
| 1 | `photo4.png` | 여성 단독 (다이닝) |
| 2 | `photo_man_beige.png` | 남성 단독 (베이지 니트) |
| 3 | `photo3.png` | 남성 단독 (카페) |
| 4 | `photo_man_white.png` | 남성 단독 (화이트 니트) |
| 5 | `scene_wine.png` | 음식점 씬 (와인 건배) |
| 6 | `scene_steak.png` | 음식점 씬 (스테이크) |
| 7 | `photo_man_brown.png` | 남성 단독 (브라운 자켓) |

**할당 규칙** (중복 없이 매칭):
- `FEMALE_SEQUENCE = [1, 0, 5]` — 여성 후기 순서대로
- `MALE_SEQUENCE = [3, 2, 4, 6, 7]` — 남성 후기 순서대로
- 여성 후기에는 남성 단독 사진을 사용하지 않음 (그 반대도)
- 음식점 씬은 양쪽 성별이 공유

8개 후기 = 여성 3 + 남성 5의 경우, 위 시퀀스로 8장이 정확히 한 번씩 사용됩니다.

> 실제 운영에서는 후기마다 ID 기반 photo URL을 attached하는 방식이 더 안정적입니다. 현재 디자인은 사진이 부족할 때를 가정한 시퀀스 매칭입니다.

---

## Interactions & Behavior

### 가로 스크롤
- 부드러운 스크롤 (`scroll-behavior: smooth`)
- prev/next 버튼: 클릭시 `scrollBy(540px)`
- 양 끝에 도달하면 버튼 `disabled` (스크롤 이벤트로 감지)
- 모바일: 손가락 드래그 / scroll-snap

### 카드 hover
- 사진 카드: shadow 그대로 (특별한 hover 없음, 정적인 느낌 유지)
- prev/next 버튼: `background: var(--border2)` on hover

### Responsive
- `@media (max-width: 720px)`:
  - 사진 220×400, 텍스트 카드 260×380
  - 겹침 -50px
  - 헤더가 세로로 변경

---

## Sample Data (8개 후기 — 실제 데이터)

```js
const reviews = [
  // (rank, gender, age, verify, appearance, manner, date, text, tag)
  // 자세한 내용은 files/reviews-data.jsx 참조
  { rank: 2,  gender: "f", age: "20대", verify: "매력 인증", appearance: 4, manner: 4,
    date: "2026-01-01", text: "선하시고, 매너 좋은 분이셨어요...", tag: "매너/배려" },
  { rank: 18, gender: "m", age: "30대", verify: "직업 인증", appearance: 4, manner: 4,
    date: "2025-07-04", text: "사진보다 실물이 더 좋으셨고...", tag: "매너/배려" },
  // ... 총 8개
];
```

전체 데이터는 **`files/reviews-data.jsx`**에 있습니다.

---

## Files

`files/` 폴더에 있는 디자인 레퍼런스:
- **`Member Reviews v3.html`** — 단독 실행 가능한 프로토타입 (브라우저에서 열어 동작 확인)
- **`reviews-v3.jsx`** — 캐러셀 컴포넌트 (메인) ★
- **`reviews-v3.css`** — 캐러셀 스타일 ★
- **`reviews-components.jsx`** — 공용 atoms (Stars, AvatarSilhouette, ReviewCard 등 — 다른 시안용도)
- **`reviews.css`** — 디자인 시스템 변수 + 공용 스타일
- **`reviews-data.jsx`** — 24개 후기 원본 데이터 (이 캐러셀에서는 8개만 사용)

★ 표시된 파일이 이 섹션의 핵심입니다.

`assets/` 폴더에는 사용된 모든 이미지(인물 6장 + 음식점 씬 2장)가 있습니다.

---

## 통합 가이드 (Integration Notes)

이 섹션을 기존 웹사이트의 일부로 통합할 때:

1. **컴포넌트 분리**: `<MemberReviewsCarousel reviews={...} />` 같은 단일 export로 패키징
2. **데이터 소스**: 후기 데이터는 외부 prop / fetch / CMS 어디서든 받을 수 있게
3. **이미지**: `assets/` 폴더의 이미지들을 프로젝트의 `public/` 또는 CDN에 옮기고 URL 매핑
4. **스타일 스코프**: CSS 클래스명에 `kb-` 접두사가 있으므로 충돌 가능성 낮음. CSS Module이나 styled-components로 한 번 더 감싸도 좋음
5. **React 버전**: 18.3.1로 작성됨. 17 이상에서는 무리없이 동작
6. **Pretendard**: 이미 사이트에 로드되어 있다면 중복 import 제거
7. **접근성**: 좌우 화살표에 `aria-label`이 있음, 카드 자체는 `<article>` 시맨틱

---

## Notes / TODO

- [ ] 후기 데이터의 실제 운영 출처(DB / Sheet / 어드민)와 연결 방식 결정
- [ ] 사진 자산을 CDN으로 옮기고 후기-사진 매핑 룰 확정 (현재는 인덱스 기반 시퀀스 매칭)
- [ ] 채팅 카드의 컨시어지 인삿말/응답 문구 카피 라이팅 확정
- [ ] 모바일에서 텍스트 카드 내부 스크롤 UX 확인 (현재 4px scrollbar)
