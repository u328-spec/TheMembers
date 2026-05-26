# Problem 섹션 디자인 핸드오프

`index.html` — `#problem` 섹션 (② PROBLEM)

---

## 섹션 구조

```
#problem
└── .problem-inner
    ├── .problem__copy          ← 섹션 헤드라인 + 서브텍스트
    └── .fc-grid                ← 3열 카드 그리드
        ├── .fc-card.fc-card--doc   ← 카드 1: 서류 제출 필수
        ├── .fc-card                ← 카드 2: 합리적인 비용
        └── .fc-card                ← 카드 3: 매일 4명 소개
```

---

## 공통 카드 스펙

| 속성 | 값 |
|---|---|
| 배경색 | `var(--bg2)` = `#F0F0F0` |
| border-radius | `24px` |
| padding | `40px 36px 0` (하단 없음) |
| min-height | `374px` |
| overflow | `hidden` (이미지 클리핑 처리) |

**eyebrow** (`.fc-eyebrow`): 13px / weight 500 / `var(--muted)` / 중앙정렬  
**title** (`.fc-title`): 26px / weight 800 / `var(--headline)` / 중앙정렬 / letter-spacing -0.04em

---

## 카드 1 — 서류 제출 필수

### 구조
```
.fc-card.fc-card--doc
├── .fc-doc-content (z-index:1, 중앙정렬)
│   ├── .fc-eyebrow  "가입시"
│   ├── .fc-title    "서류 제출 필수"
│   └── .fc-checklist
│       ├── ✓ 신원 인증
│       ├── ✓ 직업 인증
│       ├── ✓ 매력 인증
│       └── ✓ 자산 인증
└── .fc-doc-bg (absolute, bottom)
    ├── img  document.jpg
    └── ::after  그라데이션 오버레이
```

### 이미지 처리
- `document.jpg` 경로: `assets/images/mockups/document.jpg`
- `.fc-doc-bg`: `position: absolute; bottom: 0; left: 0; right: 0; height: 58%`
- `::after` 그라데이션: `#F0F0F0 10%` → `transparent 100%` (높이 70%), 이미지와 배경 자연스럽게 블렌드

### 체크리스트
- 체크 마크 색상: `var(--accent)` = `#C12838`
- 항목 폰트: 16px / weight 600

### 체크리스트 등장 애니메이션
스크롤로 `.fc-checklist`가 30% 뷰포트 진입 시 항목이 위→아래 순서로 순차 페이드인.

| 항목 | transition-delay |
|---|---|
| 신원 인증 | 0.3s |
| 직업 인증 | 0.5s |
| 매력 인증 | 0.7s |
| 자산 인증 | 0.9s |

- 초기: `opacity: 0; transform: translateY(6px)`
- 완료: `opacity: 1; transform: none`
- transition: `0.4s ease`
- 트리거: `.fc-checklist.is-visible` (IntersectionObserver, 1회 실행 후 disconnect)

---

## 카드 2 — 합리적인 비용

### 구조
```
.fc-card
├── .fc-eyebrow  "1회 만남 기준"
├── .fc-title    "합리적인 비용"
└── .fc-chart (flex:1, align-items:flex-end)
    ├── .fc-bar-col  결정사
    ├── .fc-bar-col  더멤버스
    └── .fc-bar-col  소개팅앱
```

### 막대 차트 스펙

| 항목 | 높이 | 색상 | 가격 라벨 |
|---|---|---|---|
| 결정사 | `160px` | `#C4C4C4` | 40만원 |
| 더멤버스 | `90px` | `var(--accent)` | 5천~8만원 (빨간색) |
| 소개팅앱 | `28px` | `#C4C4C4` | 무료~1만원 |

- 막대 공통: `width: 44px`, `border-radius: 8px 8px 0 0`
- 컬럼 구조 (위→아래): 가격 라벨 → 막대 → 브랜드명
- 바닥 정렬(`align-items: flex-end`)로 막대 높이 차이 시각화

### 막대 성장 애니메이션
스크롤로 `.fc-chart`가 30% 뷰포트 진입 시 막대가 좌→우 순서로 아래에서 위로 솟아오름.

| 막대 | transition-delay | easing |
|---|---|---|
| 결정사 | 0s | `cubic-bezier(0.34, 1.56, 0.64, 1)` |
| 더멤버스 | 0.15s | 동일 |
| 소개팅앱 | 0.3s | 동일 |

- 초기: `transform: scaleY(0); transform-origin: bottom center`
- 완료: `transform: scaleY(1)`
- duration: `0.65s` / 스프링 바운스 이징
- 트리거: `.fc-chart.is-visible` (IntersectionObserver, threshold 0.3, 1회 실행)

---

## 카드 3 — 매일 4명 소개

### 구조
```
.fc-card
├── .fc-eyebrow  "빠른 이상형 매칭"
├── .fc-title    "매일 4명 소개"
└── .fc-slider
    └── .fc-slider-track  (무한 좌측 스크롤 애니메이션)
        ├── 이미지 6장 (원본)
        └── 이미지 6장 (복제, 무한 루프용)
```

### 슬라이더 스펙

| 속성 | 값 |
|---|---|
| 애니메이션 | `slide-profiles` 22s linear infinite |
| 이동 거리 | `translateX(-50%)` (원본 6장 너비) |
| 이미지 크기 | `150 × 150px` |
| border-radius | `14px` |
| gap | `10px` |
| 세로 정렬 | `align-items: center` + `padding-bottom: 60px` |
| 좌우 블리드 | `margin: 16px -36px 0` (카드 패딩 상쇄, 가득 채움) |

### 이미지 순서 (원본 6장)

| 순서 | 파일 |
|---|---|
| 1 | `assets/images/reviews/woman.jpg` |
| 2 | `assets/images/reviews/man.jpg` |
| 3 | `assets/profiles/img_profile01.png` |
| 4 | `assets/profiles/img_profile02.png` |
| 5 | `assets/profiles/img_profile03.png` |
| 6 | `assets/profiles/img_profile04.png` |

> 복제본 6장을 동일 순서로 뒤에 추가 → 총 12장. 애니메이션이 절반(6장)을 이동하면 처음으로 리셋되어 무한 루프 구현.

---

## 반응형

| 브레이크포인트 | 변경 내용 |
|---|---|
| `max-width: 1279px` (태블릿) | `.problem-inner` padding `0 32px` |
| `max-width: 799px` (모바일) | `.fc-grid` 1열, `.fc-card` min-height `323px` / padding `32px 28px 0`, 슬라이더 이미지 `130×130px`, margin `-28px`, 막대 높이 agency `130px` / members `72px` |

---

## CSS 클래스 인덱스

| 클래스 | 역할 |
|---|---|
| `.fc-grid` | 3열 카드 그리드 컨테이너 |
| `.fc-card` | 카드 공통 스타일 |
| `.fc-card--doc` | 카드 1 전용 (배경 이미지 레이아웃) |
| `.fc-eyebrow` | 카드 상단 소제목 |
| `.fc-title` | 카드 메인 타이틀 |
| `.fc-checklist` | 카드 1 체크리스트 |
| `.fc-checklist.is-visible` | 체크리스트 애니메이션 트리거 클래스 |
| `.fc-check` | 체크마크 아이콘 |
| `.fc-doc-content` | 카드 1 텍스트 레이어 |
| `.fc-doc-bg` | 카드 1 배경 이미지 레이어 |
| `.fc-chart` | 카드 2 막대차트 컨테이너 |
| `.fc-chart.is-visible` | 막대 애니메이션 트리거 클래스 |
| `.fc-bar-col` | 막대차트 열 (가격+막대+이름) |
| `.fc-bar` | 막대 공통 |
| `.fc-bar--agency` | 결정사 막대 |
| `.fc-bar--members` | 더멤버스 막대 |
| `.fc-bar--app` | 소개팅앱 막대 |
| `.fc-slider` | 카드 3 슬라이더 래퍼 |
| `.fc-slider-track` | 슬라이더 트랙 (애니메이션 대상) |
| `.fc-slider-img` | 슬라이더 개별 이미지 |
