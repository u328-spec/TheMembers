/* global React */
const { useRef: useRefV3, useEffect: useEffectV3, useState: useStateV3 } = React;

// ============================================================
// V3 — Kakao Bank-style: tall photo card + offset overlay card
// ============================================================

// 카테고리별 배경 톤 — 사진 + 컬러 매핑
const TONE_FOR_TAG = {
  "대화 만족":     { sky: "#A8C8E8", warm: "#F5E6D3", text: "#1A1A1A" },
  "매너/배려":     { sky: "#E8D8C8", warm: "#F0E4D6", text: "#1A1A1A" },
  "재만남/설렘":   { sky: "#F5C8D2", warm: "#FBE5EA", text: "#1A1A1A" },
  "서비스 신뢰감": { sky: "#C8D0E0", warm: "#E8E8F0", text: "#1A1A1A" },
  "전반 만족":     { sky: "#D4E0C8", warm: "#E8EAD8", text: "#1A1A1A" },
};

// ============================================================
// PhotoArt — 큰 세로 카드 안의 일러스트레이션
// 실제 사진 대신 추상 컴포지션으로 표현 (브랜드 톤에 맞춰)
// ============================================================
// 실제 회원 사진 — 인물 6장 + 음식점/카페 씬 2장
const PHOTO_URLS = [
  "assets/photo_woman_cafe.png",      // 0 — 여성 단독
  "assets/photo4.png",                // 1 — 여성 단독 (다이닝)
  "assets/photo_man_beige.png",       // 2 — 남성 단독
  "assets/photo3.png",                // 3 — 남성 단독 (카페)
  "assets/photo_man_white.png",       // 4 — 남성 단독
  "assets/scene_wine.png",            // 5 — 음식점 와인 건배 (분위기)
  "assets/scene_steak.png",           // 6 — 스테이크 + 와인 (다이닝)
  "assets/photo_man_brown.png",       // 7 — 남성 브라운 자켓 (스튜디오)
];

// 성별별 사진 분배 — 같은 성별에서 순서대로 뽑되 중복 없음
// 여성 후기 슬롯: 다이닝 → 카페 → 와인 씬 (woman 단독 두 장 순서 교체)
const FEMALE_SEQUENCE = [1, 0, 5];
// 남성 후기 슬롯: 카페 → 베이지 니트 → 화이트 니트 → 스테이크 → 브라운 (2번째·4번째 교체)
const MALE_SEQUENCE   = [3, 2, 4, 6, 7];

function PhotoArt({ photoIdx }) {
  const src = PHOTO_URLS[photoIdx];
  return (
    <img
      src={src}
      alt=""
      className="kb-art"
      loading="lazy"
    />
  );
}

// ============================================================
// HighlightCard — 사진 카드 위에 떠 있는 작은 흰 카드
// 카드 종류: stat / chat / member-pill / quote
// ============================================================
function HighlightCard({ review, kind, position = "bottom" }) {
  const handle = review.gender === "m" ? "남성 회원" : "여성 회원";
  const dateStr = window.formatDate(review.date);
  const subInfo = `${review.age} · ${review.verify}`;

  // Base card — full height, full text content
  if (kind === "stat") {
    return (
      <div className={"kb-hl kb-hl--" + position}>
        <div className="kb-hl__top">
          <div className="kb-hl__label">매너 점수 · 외모 점수</div>
          <div className="kb-hl__big">
            {review.manner}.0 <span>·</span> {review.appearance}.0
          </div>
        </div>
        <div className="kb-hl__body">
          {review.text}
        </div>
        <div className="kb-hl__foot">
          <div className="kb-hl__avatar">
            {window.AvatarSilhouette({ gender: review.gender, size: 36 })}
          </div>
          <div className="kb-hl__who">
            <div className="kb-hl__handle">{handle}</div>
            <div className="kb-hl__meta">{subInfo}</div>
          </div>
          <div className="kb-hl__date">{dateStr}</div>
        </div>
      </div>
    );
  }

  if (kind === "chat") {
    // 본문을 문장 단위로 쪼개서 말풍선 여러 개로 표시
    const sentences = review.text
      .split(/(?<=[.!?~)])\s+/)
      .map((s) => s.trim())
      .filter(Boolean);

    // 시간 (가짜 — 만남 후 보낸 시각으로)
    const baseHour = 21;
    const times = sentences.map((_, i) => {
      const m = String(15 + i * 2).padStart(2, "0");
      return `오후 ${baseHour}:${m}`;
    });

    return (
      <div className={"kb-hl kb-hl--" + position + " kb-hl--chat"}>
        <div className="kb-hl__chat-head">
          <div className="kb-hl__chat-avatar">
            {window.AvatarSilhouette({ gender: "f", size: 32 })}
          </div>
          <div>
            <div className="kb-hl__chat-name">더블랙 컨시어지</div>
            <div className="kb-hl__chat-status"><span className="kb-online"></span>온라인</div>
          </div>
        </div>

        <div className="kb-hl__chat-thread">
          {/* 컨시어지 인삿말 */}
          <div className="kb-hl__chat-row kb-hl__chat-row--in">
            <div className="kb-hl__chat-bubble kb-hl__chat-bubble--in">
              {handle} 님, 오늘 만남 어떠셨나요? 후기 부탁드려요 :)
            </div>
            <div className="kb-hl__chat-time">오후 9:12</div>
          </div>

          {/* 회원 후기 — 문장별로 말풍선 */}
          {sentences.map((s, i) => (
            <div key={i} className="kb-hl__chat-row kb-hl__chat-row--out">
              <div className="kb-hl__chat-time">{times[i]}</div>
              <div className="kb-hl__chat-bubble kb-hl__chat-bubble--out">
                {s}
              </div>
            </div>
          ))}

          {/* 컨시어지 응답 */}
          <div className="kb-hl__chat-row kb-hl__chat-row--in">
            <div className="kb-hl__chat-bubble kb-hl__chat-bubble--in kb-hl__chat-bubble--reaction">
              소중한 후기 감사합니다 💛
            </div>
          </div>
        </div>

        <div className="kb-hl__chat-input">
          <span>{handle} · {subInfo}</span>
        </div>
      </div>
    );
  }

  if (kind === "members") {
    return (
      <div className={"kb-hl kb-hl--" + position}>
        <div className="kb-hl__top">
          <div className="kb-hl__label">{dateStr} · 첫 만남</div>
          <div className="kb-hl__pills">
            <div className="kb-hl__pill" style={{ background: "#E7D9C2" }}>
              {window.AvatarSilhouette({ gender: review.gender, size: 28 })}
            </div>
            <div className="kb-hl__pill" style={{ background: "#D6CDB9", marginLeft: -10 }}>
              {window.AvatarSilhouette({ gender: review.gender === "m" ? "f" : "m", size: 28 })}
            </div>
            <span className="kb-hl__handle">{handle}</span>
          </div>
          <div className="kb-hl__title" style={{fontSize: 13, fontWeight: 600, color: 'var(--para)', marginTop: 4}}>
            {subInfo}
          </div>
        </div>
        <div className="kb-hl__body">
          {review.text}
        </div>
        <div className="kb-hl__foot kb-hl__foot--rating">
          <span>매너 {review.manner}.0</span>
          <span className="kb-dot"></span>
          <span>외모 {review.appearance}.0</span>
        </div>
      </div>
    );
  }

  // quote
  return (
    <div className={"kb-hl kb-hl--" + position + " kb-hl--quote"}>
      <div className="kb-hl__top">
        <div className="kb-hl__quote-mark">“</div>
      </div>
      <div className="kb-hl__quote-text">
        {review.text}
      </div>
      <div className="kb-hl__quote-meta">
        <div className="kb-hl__quote-handle">{handle}</div>
        <div className="kb-hl__quote-info">{subInfo} · {dateStr}</div>
      </div>
    </div>
  );
}

function firstShort(text) {
  const m = text.match(/^[^.!?~]*[.!?~]/);
  let s = (m ? m[0] : text).trim().replace(/[.!?~]+$/, "").replace(/\s+/g, " ");
  if (s.length > 36) s = s.slice(0, 34) + "…";
  return s;
}

// ============================================================
// KbScene — 큰 사진 카드 + 살짝 오프셋된 하이라이트 카드
// ============================================================
function KbScene({ review, index, photoIdx }) {
  // index에 따라 하이라이트 카드 종류 순환
  const kinds = ["stat", "members", "chat", "quote"];
  const offsets = ["right", "left", "right", "left"];
  const kind = kinds[index % kinds.length];
  const offset = offsets[index % offsets.length];

  return (
    <div className={"kb-scene kb-scene--" + offset}>
      <div className="kb-photo">
        <PhotoArt photoIdx={photoIdx} />
      </div>
      <HighlightCard review={review} kind={kind} position={offset === "right" ? "right" : "left"} />
    </div>
  );
}

// ============================================================
// V3 Carousel
// ============================================================
function KbCarousel({ reviews }) {
  const trackRef = useRefV3(null);
  const [canPrev, setCanPrev] = useStateV3(false);
  const [canNext, setCanNext] = useStateV3(true);

  const update = () => {
    const t = trackRef.current;
    if (!t) return;
    setCanPrev(t.scrollLeft > 8);
    setCanNext(t.scrollLeft + t.clientWidth < t.scrollWidth - 8);
  };

  useEffectV3(() => {
    update();
    const t = trackRef.current;
    if (!t) return;
    t.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      t.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [reviews]);

  const scrollBy = (dir) => {
    const t = trackRef.current;
    if (!t) return;
    t.scrollBy({ left: dir * 540, behavior: "smooth" });
  };

  return (
    <section className="kb-section">
      <div className="kb-section__head">
        <div className="kb-section__title">
          더블랙 회원들이 남긴<br />
          <em>진심 어린 만남</em> 이야기
        </div>
        <div className="kb-section__nav">
          <button onClick={() => scrollBy(-1)} disabled={!canPrev} aria-label="이전">
            <svg width="18" height="18" viewBox="0 0 18 18"><path d="M11 3l-6 6 6 6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <button onClick={() => scrollBy(1)} disabled={!canNext} aria-label="다음">
            <svg width="18" height="18" viewBox="0 0 18 18"><path d="M7 3l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        </div>
      </div>

      <div className="kb-track" ref={trackRef}>
        {(() => {
          // 후기에 사진 인덱스 할당 — 성별별로 시퀀스에서 순서대로 뽑음 (중복 없음)
          let fCount = 0, mCount = 0;
          const usedCouples = new Set();
          return reviews.map((r, i) => {
            let photoIdx;
            const seq = r.gender === "m" ? MALE_SEQUENCE : FEMALE_SEQUENCE;
            const localCount = r.gender === "m" ? mCount++ : fCount++;
            photoIdx = seq[localCount % seq.length];
            // 커플 사진(5,6,7)이 이미 다른 성별에서 사용됐다면 시퀀스 내 다음 가용 인덱스로 이동
            while (photoIdx >= 5 && usedCouples.has(photoIdx)) {
              const ci = seq.indexOf(photoIdx);
              if (ci + 1 < seq.length) photoIdx = seq[ci + 1];
              else break;
            }
            if (photoIdx >= 5) usedCouples.add(photoIdx);
            return <KbScene key={r.rank} review={r} index={i} photoIdx={photoIdx} />;
          });
        })()}
      </div>
    </section>
  );
}

Object.assign(window, {
  KbCarousel, KbScene, PhotoArt, HighlightCard,
});
