# 더멤버스(TheMembers) — Claude 지침

## 프로젝트 개요
더멤버스 웹사이트. 한국어 서비스 랜딩 페이지 및 서브 페이지로 구성된 정적 HTML 사이트.

## 디렉토리 구조

```
TheMembers/
├── index.html            # 메인 홈 (서비스 소개)
├── join.html             # 가입 절차
├── reviews.html          # 회원 리뷰
├── support.html          # 고객 지원
├── assets/
│   ├── Logo.svg
│   ├── applogo.png
│   ├── themembers_onelink_qr.svg
│   ├── images/
│   │   ├── mockups/
│   │   │   ├── Image_two-mockup.png      # app-cta 섹션 2개 목업
│   │   │   ├── Mockup_custom.png         # 나만의 맞춤카드 조합 화면
│   │   │   ├── Mockup_documents.png      # 서류 인증 화면
│   │   │   └── Mockup_theblack.png       # 더블랙 매칭 화면
│   │   ├── reviews/
│   │   │   ├── man.jpg                   # 남성 회원 프로필 사진
│   │   │   └── woman.jpg                 # 여성 회원 프로필 사진
│   │   ├── partners/
│   │   │   └── partnership1~5.png        # 파트너 로고 (ISMS-P·Noblesse·HYPHEN·NICE·KSBA)
│   │   └── image_ISMSP.png               # ISMS-P 인증 배지 (푸터)
│   └── profiles/
│       ├── img_profile01~04.png
│       └── img_badge01~04.png
├── _archive/             # 미사용·드래프트
│   ├── themembers-B.html
│   ├── card-stack-animation.html
│   ├── review.pdf
│   └── 스크린샷/
├── docs/
│   └── design_handoff_member_reviews/  # 캐러셀 핸드오프 참고 문서
├── AGENT.md
└── CLAUDE.md
```

## 페이지 목록

| 파일 | 역할 | nav active |
|---|---|---|
| index.html | 메인 홈 (서비스 소개) | — |
| join.html | 가입 절차 | 가입 절차 |
| reviews.html | 회원 리뷰 | 회원 리뷰 |
| support.html | 고객 지원 | 고객 지원 |

## 공통 컴포넌트

### 네비게이션 (4개 페이지 공통)
- 로고 → `index.html`
- 가입 절차 → `join.html`
- 회원 리뷰 → `reviews.html`
- 고객 지원 → `support.html`
- 무료 가입 신청 버튼 → QR 모달 팝업

### 공통 하단
- **App CTA 섹션** (`#app-cta`): "검증된 3040을 위한 더멤버스" + 앱 다운로드하기 버튼
- **푸터**: 회사 정보, ISMS-P 인증, 사업자 정보

### QR 모달
- 트리거: `.nav__cta`, `.btn-red`
- 이미지: `assets/themembers_onelink_qr.svg`
- 닫기: × 버튼 / 오버레이 클릭 / ESC

## 디자인 시스템

### 색상 변수
```css
--white:       #FFFFFF
--bg:          #F7F7F7
--bg2:         #F0F0F0
--border:      #E8E8E8
--border2:     #D4D4D4
--headline:    #111111
--body:        #555555
--para:        #6F6F6F
--muted:       #999999
--light:       #C4C4C4
--dark:        #111111
--dark2:       #1C1C1C
--accent:      #C12838
--accent-dark: #9E1F2D
--accent-pale: #FDF2F3
--max:         1200px
```

### 타이포그래피
- 폰트: Pretendard (`jsdelivr/orioncactus`)
- 폴백: `-apple-system, 'Apple SD Gothic Neo', sans-serif`

## 코딩 규칙

- 스타일은 인라인 `<style>` 태그 안에 작성 (외부 파일 없음)
- CSS 변수(`var(--xxx)`) 최대한 활용
- 반응형: `@media(max-width:799px)` 모바일 / `@media(max-width:1279px)` 태블릿
- 클래스 네이밍: BEM (`block__element--modifier`)
- 레이아웃: Flexbox / CSS Grid 우선
- 텍스트: **한국어**, 존댓말(~합니다, ~하세요)
- 브랜드명: **더멤버스** (TheMembers)

## 작업 방식
- 변경 전 반드시 기존 파일을 읽고 파악한 후 수정
- 기존 CSS 변수와 디자인 언어 유지하며 확장
- 새 컴포넌트는 기존 패턴 참고해 일관성 유지
