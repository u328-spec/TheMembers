# Quality 섹션 디자인 핸드오프

`index.html` — `#quality` 섹션 (③ QUALITY)

---

## 섹션 구조

```
#quality
└── .quality-inner
    ├── .quality-copy          ← 섹션 헤드라인 + 서브텍스트
    └── .quality-cards-wrap    ← 카드스택 컨테이너
        ├── article.quality-card.qc-front   ← 최상단 카드
        ├── article.quality-card.qc-mid
        ├── article.quality-card.qc-back
        └── article.quality-card.qc-back2   ← 최하단 카드
```

---

## 카드스택 컨테이너

| 클래스 | 속성 | 값 |
|---|---|---|
| `.quality-cards-wrap` | max-width | `310px` |
| `.quality-cards-wrap` | aspect-ratio | `3/4` |
| `.quality-cards-wrap` | min-height | `460px` |
| `.quality-cards-wrap` | position | `relative` |

---

## 프로필 카드 공통 구조

```
article.quality-card
├── p.qc-title         ← 인증 내용 설명
├── div.qc-img-wrap
│   └── img            ← 프로필 사진 (img_profile01~04.png)
├── div.qc-badge
│   ├── img            ← 배지 아이콘 (img_badge01~04.png)
│   └── p.qc-badge-label  ← 배지 타이틀
└── p.qc-desc          ← 인증 상세 설명
```

---

## 각 요소 스펙

### `.qc-title`
| 속성 | 값 |
|---|---|
| font-size | `1.05rem` |
| font-weight | `700` |
| color | `#111` |
| padding | `1.5rem 1.25rem 0.6rem` |
| line-height | `1.4` |
| text-align | `center` |

### `.qc-img-wrap img`
| 속성 | 값 |
|---|---|
| width | `100%` |
| aspect-ratio | `3/4` |
| object-fit | `cover` |
| object-position | `top` |
| border-radius | `1rem` |
| max-height | `200px` |

### `.qc-badge`
| 속성 | 값 |
|---|---|
| padding | `0.2rem 1.25rem 0.4rem` |
| text-align | `center` |

### `.qc-badge img`
| 속성 | 값 |
|---|---|
| height | `56px` |
| width | `auto` |
| object-fit | `contain` |
| margin | `0 auto 0.2rem` |

### `.qc-badge-label`
| 속성 | 값 |
|---|---|
| font-size | `15px` |
| font-weight | `700` |
| color | `var(--accent)` = `#C12838` |

### `.qc-desc`
| 속성 | 값 |
|---|---|
| font-size | `13px` |
| line-height | `1.5` |
| color | `#666` |
| padding | `0 1.25rem 1.75rem` |
| text-align | `center` |

---

## 카드스택 애니메이션

- JS 자동 순환: `setInterval` 1700ms 간격
- 카드가 앞에서 뒤로 회전하며 루프
- 클래스: `qc-front`, `qc-mid`, `qc-back`, `qc-back2`
- 전환 애니메이션: `qc-dropping` (앞→뒤), `qc-rising` (뒤→앞)

---

## 프로필·배지 파일 매핑

| 카드 | 프로필 이미지 | 배지 이미지 | 배지 라벨 |
|---|---|---|---|
| 카드 1 | `img_profile01.png` | `img_badge04.png` | 100억+ 이고 총자산 |
| 카드 2 | `img_profile02.png` | `img_badge03.png` | 엘리트 직장 |
| 카드 3 | `img_profile03.png` | `img_badge02.png` | 전문직 |
| 카드 4 | `img_profile04.png` | `img_badge01.png` | 인플루언서 |

---

## 반응형

| 브레이크포인트 | `.quality-cards-wrap` | `.qc-img-wrap img` max-height | `.qc-badge img` height |
|---|---|---|---|
| 데스크톱 | max-width `310px` / min-height `460px` | `200px` | `56px` |
| 태블릿 (≤1279px) | max-width `270px` / min-height `400px` | `170px` | `44px` |
| 모바일 (≤799px) | max-width `260px` / min-height `410px` | `160px` | `40px` |

> 태블릿/모바일에서 사진·배지 크기를 줄여 `.qc-desc` 텍스트가 카드 안에 온전히 표시되도록 함.

---

## 변경 이력

| 항목 | 변경 전 | 변경 후 |
|---|---|---|
| `.qc-badge img` height | `36px` | `56px` (데스크톱) |
| `.qc-badge-label` font-size | `0.85rem` | `15px` |
| `.qc-desc` font-size | `0.72rem` | `13px` |
| 태블릿 `qc-img-wrap img` max-height | `200px` | `170px` |
| 태블릿 `qc-badge img` height | `56px` | `44px` |
| 모바일 `qc-img-wrap img` max-height | `200px` | `160px` |
| 모바일 `qc-badge img` height | `56px` | `40px` |
