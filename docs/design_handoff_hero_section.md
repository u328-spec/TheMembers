# Hero 섹션 디자인 핸드오프

`index.html` — `.hero` 섹션 (① HERO)

---

## 섹션 구조

```
.hero
└── .hero__inner
    ├── div.reveal
    │   └── h1.hero__title
    └── div.hero__media.reveal
        └── img
```

---

## 레이아웃 스펙

| 클래스 | 속성 | 값 |
|---|---|---|
| `.hero` | background | `var(--white)` |
| `.hero` | padding | `0 48px` |
| `.hero` | overflow | `hidden` |
| `.hero__inner` | display | `flex; flex-direction: column; align-items: center` |
| `.hero__inner` | text-align | `center` |
| `.hero__inner` | padding-top | `24px` |

---

## 타이포그래피

### `.hero__title`
| 속성 | 값 |
|---|---|
| font-size | `46px` |
| font-weight | `800` |
| letter-spacing | `-0.04em` |
| line-height | `1.16` |
| color | `var(--headline)` |
| margin-bottom | `32px` ← 이미지와의 간격 |

- `em` 태그: `font-style: normal; color: var(--muted)` (흐린 회색 강조)

---

## 미디어 영역

### `.hero__media`
| 속성 | 값 |
|---|---|
| width | `100%` |
| max-width | `960px` |
| aspect-ratio | `16/9` |
| overflow | `hidden` |
| border-radius | `20px` |
| margin | `0 auto` |

- 내부 `img`: `width: 100%; height: 100%; object-fit: cover`

---

## 반응형

| 브레이크포인트 | 변경 내용 |
|---|---|
| `max-width: 1279px` (태블릿) | `.hero` padding `0 32px` |
| `max-width: 799px` (모바일) | `.hero` padding `0`, `.hero__inner` padding `36px 20px 0`, `.hero__title` font-size `28px` |

---

## 변경 이력

| 항목 | 변경 전 | 변경 후 | 비고 |
|---|---|---|---|
| `.hero__inner` padding-top | `96px` | `24px` | 타이틀 위치 상단으로 이동 |
| `.hero__title` margin-bottom | `16px` | `32px` | 텍스트↔이미지 간격 확보 |
| `.hero__desc` CSS | 존재 (dead code) | 제거 | HTML에 요소 없음 |
| 모바일 `.hero__inner` padding-top | `64px` | `36px` | 타이틀 위치 상단으로 이동 |
