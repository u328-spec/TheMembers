/* global React */
const { useState, useMemo, useRef, useEffect } = React;

// ============================================================
// Atoms
// ============================================================

function Stars({ value = 5, size = 16, color = "var(--gold)", empty = "rgba(0,0,0,.12)" }) {
  return (
    <span style={{ display: "inline-flex", gap: 3, alignItems: "center" }}>
      {[1, 2, 3, 4, 5].map((n) => (
        <svg key={n} width={size} height={size} viewBox="0 0 16 16" aria-hidden="true">
          <path
            d="M8 1.2l2.06 4.18 4.61.67-3.34 3.25.79 4.59L8 11.73 3.88 13.89l.79-4.59L1.33 6.05l4.61-.67L8 1.2z"
            fill={n <= value ? color : empty}
          />
        </svg>
      ))}
    </span>
  );
}

// 차분한 실루엣 아이콘
function AvatarSilhouette({ gender = "m", size = 40 }) {
  const isF = gender === "f";
  return (
    <span
      className="rv-avatar"
      style={{ width: size, height: size, background: isF ? "#E7D9C2" : "#D6CDB9" }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 40 40" width={size} height={size}>
        <defs>
          <clipPath id={`clip-${gender}-${size}`}>
            <circle cx="20" cy="20" r="20" />
          </clipPath>
        </defs>
        <g clipPath={`url(#clip-${gender}-${size})`}>
          {/* shoulders */}
          <ellipse cx="20" cy="42" rx={isF ? 16 : 17} ry={isF ? 13 : 12} fill={isF ? "#7A6552" : "#3A322A"} />
          {/* head */}
          <circle cx="20" cy="17" r={isF ? 8 : 7.5} fill={isF ? "#E0CDB0" : "#C9B79A"} />
          {/* hair */}
          {isF ? (
            <path d="M11 16c0-5 4-9 9-9s9 4 9 9c0 0-2-2-6-2s-7 2-7 2-3 0-5 0z" fill="#6B5642" />
          ) : (
            <path d="M12 13c1-4 4-6 8-6s7 2 8 6c0 1-2 2-4 2s-5-1-7-1-4 1-5-1z" fill="#2A2520" />
          )}
        </g>
      </svg>
    </span>
  );
}

// ============================================================
// Review Card (메인 카드 — 레퍼런스 형식)
// ============================================================
function ReviewCard({ review, expanded, onToggle, clampable = true }) {
  const handle = window.memberHandle(review);
  const dateStr = window.formatDate(review.date);
  const genderLabel = review.gender === "m" ? "남성회원" : "여성회원";

  return (
    <article className={"rv-card" + (expanded ? " is-open" : "")}>
      <div className="rv-card__stars">
        <Stars value={5} size={15} />
      </div>

      <h3 className="rv-card__title">{firstSentence(review.text)}</h3>

      <div className={"rv-card__body" + (clampable ? " is-clamp" : "")}>
        {paragraphize(review.text).map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      <div className="rv-card__divider" />

      <footer className="rv-card__foot">
        <AvatarSilhouette gender={review.gender} size={40} />
        <div className="rv-card__who">
          <div className="rv-card__handle">{handle}</div>
          <div className="rv-card__meta">
            <span>{genderLabel}</span>
            <span className="rv-dot" />
            <span>{dateStr}</span>
            <span className="rv-dot" />
            <span>{review.tag}</span>
          </div>
        </div>
        {clampable && (
          <button className="rv-card__more" onClick={onToggle} aria-expanded={expanded}>
            {expanded ? "접기" : "더보기"}
          </button>
        )}
      </footer>
    </article>
  );
}

// 첫 문장 (마침표/물음표/느낌표/이모티콘 기준)
function firstSentence(text) {
  // 첫 마침표/느낌표/물음표까지
  const m = text.match(/^[^.!?~]*[.!?~]/);
  return (m ? m[0] : text).trim().replace(/\s+/g, " ");
}

// 본문을 짧은 문단으로 쪼개기
function paragraphize(text) {
  // 마침표 후 공백 + 문장으로 자르고, 2-3 문장씩 묶음
  const sentences = text
    .split(/(?<=[.!?~])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);
  if (sentences.length <= 2) return [text];
  const result = [];
  for (let i = 0; i < sentences.length; i += 2) {
    result.push(sentences.slice(i, i + 2).join(" "));
  }
  return result;
}

// ============================================================
// Carousel — 추천 만남후기
// ============================================================
function Carousel({ reviews }) {
  const trackRef = useRef(null);
  const [index, setIndex] = useState(0);

  const scrollTo = (i) => {
    const t = trackRef.current;
    if (!t) return;
    const card = t.children[i];
    if (!card) return;
    const left = card.offsetLeft - (t.clientWidth - card.clientWidth) / 2;
    t.scrollTo({ left: Math.max(0, left), behavior: "smooth" });
    setIndex(i);
  };

  const next = () => scrollTo(Math.min(reviews.length - 1, index + 1));
  const prev = () => scrollTo(Math.max(0, index - 1));

  return (
    <section className="rv-carousel">
      <div className="rv-carousel__head">
        <button className="rv-carousel__nav" onClick={prev} aria-label="이전" disabled={index === 0}>
          <svg width="16" height="16" viewBox="0 0 16 16"><path d="M10 3l-5 5 5 5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
        </button>
        <h2>추천 만남후기</h2>
        <button className="rv-carousel__nav" onClick={next} aria-label="다음" disabled={index === reviews.length - 1}>
          <svg width="16" height="16" viewBox="0 0 16 16"><path d="M6 3l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
        </button>
      </div>

      <div className="rv-carousel__viewport">
        <div className="rv-carousel__track" ref={trackRef}>
          {reviews.map((r) => (
            <div className="rv-carousel__slide" key={r.rank}>
              <ReviewCard review={r} clampable={false} />
            </div>
          ))}
        </div>
      </div>

      <div className="rv-carousel__dots">
        {reviews.map((_, i) => (
          <button
            key={i}
            className={"rv-carousel__dot" + (i === index ? " is-active" : "")}
            aria-label={`${i + 1}번째 후기`}
            onClick={() => scrollTo(i)}
          />
        ))}
      </div>
    </section>
  );
}

// ============================================================
// Summary Hero
// ============================================================
function SummaryHero({ summary }) {
  return (
    <section className="rv-hero">
      <div className="rv-hero__eyebrow">REAL MEMBER REVIEWS</div>
      <h1 className="rv-hero__title">
        진심으로 추천받은<br />
        <em>{summary.total}</em>개의 만남
      </h1>
      <p className="rv-hero__sub">
        검증된 더블랙 회원이 직접 작성한 추천 후기입니다.<br />
        매너·외모 평가에서 모두 높은 점수를 받은 만남만 모았습니다.
      </p>
      <div className="rv-hero__stats">
        <div className="rv-hero__stat">
          <div className="rv-hero__val">{summary.total}</div>
          <div className="rv-hero__lbl">추천 후기</div>
        </div>
        <div className="rv-hero__divider" />
        <div className="rv-hero__stat">
          <div className="rv-hero__val">{summary.male}<span>·{summary.female}</span></div>
          <div className="rv-hero__lbl">남성·여성</div>
        </div>
        <div className="rv-hero__divider" />
        <div className="rv-hero__stat">
          <div className="rv-hero__val">{summary.recent}</div>
          <div className="rv-hero__lbl">최근 만남일</div>
        </div>
        <div className="rv-hero__divider" />
        <div className="rv-hero__stat">
          <div className="rv-hero__val">100<span>%</span></div>
          <div className="rv-hero__lbl">매너 만점 비율</div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// Filter
// ============================================================
function FilterBar({ gender, setGender, tag, setTag, total, tagCounts }) {
  const genderTabs = [
    { id: "all", label: "전체", count: 24 },
    { id: "m", label: "남성", count: 15 },
    { id: "f", label: "여성", count: 9 },
  ];
  return (
    <div className="rv-filter">
      <div className="rv-filter__row">
        <div className="rv-filter__label">성별</div>
        <div className="rv-filter__chips">
          {genderTabs.map((t) => (
            <button
              key={t.id}
              className={"rv-chip" + (gender === t.id ? " is-active" : "")}
              onClick={() => setGender(t.id)}
            >
              {t.label}
              <em>{t.count}</em>
            </button>
          ))}
        </div>
      </div>
      <div className="rv-filter__row">
        <div className="rv-filter__label">활용 포인트</div>
        <div className="rv-filter__chips">
          <button className={"rv-chip" + (tag === "all" ? " is-active" : "")} onClick={() => setTag("all")}>
            전체
          </button>
          {tagCounts.map((t) => (
            <button
              key={t.tag}
              className={"rv-chip" + (tag === t.tag ? " is-active" : "")}
              onClick={() => setTag(t.tag)}
            >
              {t.tag}
              <em>{t.count}</em>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// CTA
// ============================================================
function CTA() {
  return (
    <section className="rv-cta">
      <h3>당신의 인연도 더블랙에서.</h3>
      <p>철저한 회원 인증과 1:1 매칭 컨시어지가 진심 어린 만남을 책임집니다.</p>
      <button className="rv-cta__btn">가입 상담 신청 →</button>
    </section>
  );
}

Object.assign(window, {
  Stars, AvatarSilhouette,
  ReviewCard, Carousel, SummaryHero, FilterBar, CTA,
});
