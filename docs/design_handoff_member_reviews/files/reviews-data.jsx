// 더블랙 — 추천 만남후기 (PDF: 더블랙_웹사이트_홍보추천후기.pdf 원본 데이터)
// 24개 추천 후기, 남성 15 / 여성 9

const REVIEW_DATA = [
  { rank: 1,  gender: "f", age: "30대", verify: "매력 인증", appearance: 4, manner: 4, date: "2026-02-01", text: "매너도 좋고 즐거웠어요! 만나기전 대화가 없어서 걱정했는데 좋은 분 매칭해주셔서 좋아요 :)", tag: "대화 만족" },
  { rank: 2,  gender: "f", age: "20대", verify: "매력 인증", appearance: 4, manner: 4, date: "2026-01-01", text: "선하시고, 매너 좋은 분이셨어요. 진실되고 성실하게 살아가시는, 뭐랄까 요즘은 보기 드문 분이셨던 것 같아요 ㅎㅎ 감사합니다.", tag: "매너/배려" },
  { rank: 3,  gender: "m", age: "30대", verify: "직업 인증", appearance: 4, manner: 4, date: "2025-12-20", text: "좋은 분 매칭해주셔서 좋았습니다. 매너도 좋았고, 즐거운 시간이었습니다.", tag: "매너/배려" },
  { rank: 4,  gender: "m", age: "40대", verify: "소득 인증", appearance: 4, manner: 4, date: "2025-12-08", text: "매너 엄청 좋으셨고 배려심 있는 대화 나눴습니다. 선입견 없이 대화가 이어져서 좋았습니다.", tag: "대화 만족" },
  { rank: 5,  gender: "m", age: "30대", verify: "학력 인증", appearance: 4, manner: 4, date: "2025-11-18", text: "잘 웃으시고 유쾌한 성격의 소유자이셔서 대화가 편하고 자연스럽게 이어져서 좋았어요.", tag: "대화 만족" },
  { rank: 6,  gender: "m", age: "30대", verify: "직업 인증", appearance: 4, manner: 4, date: "2025-10-22", text: "처음 이런 기회를 통해 지적이고 매력 넘치는 분 소개해주셔서 감사합니다. 인연은 어쩌면 가까운 곳에 있을지도 모른다는 말이 실감이 났고, 더 많이 알아가고픈 분이셨어요. 좋은 기회였습니다!", tag: "재만남/설렘" },
  { rank: 7,  gender: "f", age: "30대", verify: "매력 인증", appearance: 4, manner: 4, date: "2025-10-08", text: "더블랙을 통해 첫 만남이라 긴장 반 설렘 반으로 나갔는데 매너도 좋으시고 대화도 편하게 잘 나누고 온 거 같아 기분 좋은 만남이었어요!", tag: "재만남/설렘" },
  { rank: 8,  gender: "f", age: "20대", verify: "학력 인증", appearance: 4, manner: 4, date: "2025-11-10", text: "처음이라.. 번호 교환없이 헤어졌는데 상대 연락처가 안 보이더라구요... 망연자실 했으나! 후기작성을 통해 번호 교환이 가능하네요 다행히! 매너도 너무 좋으셨고 외모도 저 스타일이라 저는 직진 하려구요 ㅎ", tag: "재만남/설렘" },
  { rank: 9,  gender: "m", age: "40대", verify: "소득 인증", appearance: 4, manner: 4, date: "2025-09-13", text: "사진보다 실물이 훨씬 훌륭하신 분이셨고, 매너나 모든 면에서 좋았습니다. 진솔하게 대화했습니다.", tag: "대화 만족" },
  { rank: 10, gender: "m", age: "30대", verify: "직업 인증", appearance: 4, manner: 4, date: "2025-08-16", text: "좋은 분 소개시켜주셔서 감사드립니다. 매너 좋으셨고 상당히 유쾌한 만남이었어요. 제가 종사하는 분야와 달랐기에 이런 자리 아니었으면 대화할 기회도 없었지 싶어요. 미모와 지적 매력 모두 갖추신 분이세요. 웃음도 많으시고요. 즐거운 자리여서 좋았습니다. 감사합니다.", tag: "재만남/설렘" },
  { rank: 11, gender: "f", age: "30대", verify: "학력 인증", appearance: 4, manner: 4, date: "2025-08-03", text: "만남 장소 예약도 해놓으시고 매너도 좋으시고 대화도 즐거웠고 집에 데려다 주셨고 더 대화하며 알아가 보고 싶어요 ^^", tag: "대화 만족" },
  { rank: 12, gender: "m", age: "30대", verify: "소득 인증", appearance: 4, manner: 4, date: "2025-08-05", text: "만나서 얘기를 나눠보니 배경도 너무 비슷하고 그래서인지 되게 즐거운 시간을 보낸 거 같습니다.", tag: "대화 만족" },
  { rank: 13, gender: "f", age: "30대", verify: "매력 인증", appearance: 4, manner: 4, date: "2026-01-03", text: "매너있게 대화를 이끌어주셨고 맛있는 저녁 식사도 대접해 주셔서 감사했어요! 서로를 알아가는 대화도 많이 한 것 같아서 좋았습니다 :)", tag: "대화 만족" },
  { rank: 14, gender: "f", age: "20대", verify: "매력 인증", appearance: 4, manner: 4, date: "2025-07-12", text: "호감형 외모에 인상과 매너까지 전부 좋은 분을 소개시켜주셔서 고맙습니다!", tag: "매너/배려" },
  { rank: 15, gender: "m", age: "30대", verify: "직업 인증", appearance: 4, manner: 4, date: "2025-06-28", text: "예쁘시고 패션센스도 좋았어요. 대화가 너무 즐거워서 시간 가는 줄 몰랐습니다. 잘 웃고 상대방 칭찬도 잘해주셔서 대화 내내 기분이 좋았네요.", tag: "대화 만족" },
  { rank: 16, gender: "m", age: "40대", verify: "소득 인증", appearance: 4, manner: 4, date: "2025-09-21", text: "더블랙의 1:1 매칭 시스템이 믿음직스러워 좋은 만남을 가질 수 있었습니다. 깔끔하고 신뢰 가는 진행 덕분에 만족스러운 경험이었어요. :)", tag: "서비스 신뢰감" },
  { rank: 17, gender: "m", age: "30대", verify: "학력 인증", appearance: 4, manner: 4, date: "2025-07-23", text: "대화도 너무 잘 되었던 거 같고 첫 만남이었지만 느낌이 좋았던 거 같습니다.", tag: "대화 만족" },
  { rank: 18, gender: "m", age: "30대", verify: "직업 인증", appearance: 4, manner: 4, date: "2025-07-04", text: "사진보다 실물이 더 좋으셨고 약속시간 보다 5분 더 일찍 오시고 대화시 밝은 표정으로 대화해주시고 밥 잘 먹었다고 커피도 한잔 사주시고 헤어졌습니다. 연락처를 헤어질때 여쭤봤을때 비록 거절하셨지만 예쓰 오어 노를 바로 정확히 해주셔서 맘 졸이며 기다리지 않아도 되서 잘 처신 하신 좋으신 분인것 같습니다.", tag: "매너/배려" },
  { rank: 19, gender: "m", age: "40대", verify: "직업 인증", appearance: 3, manner: 4, date: "2025-08-15", text: "좋은 매너를 갖추셨고, 배려심이 깊었습니다. 편안한 분위기에서 진솔한 대화를 나눠볼 수 있어서, 뜻깊은 시간이었습니다.", tag: "대화 만족" },
  { rank: 20, gender: "m", age: "30대", verify: "소득 인증", appearance: 3, manner: 4, date: "2026-02-22", text: "매너도 좋으시고 같이 대화할 때 편하게 대해주셔서 좋은 시간이었습니다.", tag: "대화 만족" },
  { rank: 21, gender: "m", age: "30대", verify: "학력 인증", appearance: 3, manner: 4, date: "2026-02-21", text: "예쁘고 매너 좋으시고 성격 쿨한 분 같았어요. 또 뵙고 싶네요. 좋은 인연 만들어주셔서 감사합니다.", tag: "재만남/설렘" },
  { rank: 22, gender: "f", age: "30대", verify: "매력 인증", appearance: 3, manner: 4, date: "2026-02-22", text: "매너 좋으셨어요! 얼굴을 모르고 갔지만 만나서 좋은 시간 보내고 왔습니다!", tag: "매너/배려" },
  { rank: 23, gender: "m", age: "30대", verify: "직업 인증", appearance: 3, manner: 4, date: "2025-11-05", text: "진짜 성사가 되는 건가 했는데 생각보다 즐거운 자리였어요.", tag: "전반 만족" },
  { rank: 24, gender: "f", age: "20대", verify: "학력 인증", appearance: 3, manner: 4, date: "2025-10-03", text: "매너 좋고 즐거운 만남이었습니다~ 만나기 전까지 설렘이 있더라구요.", tag: "매너/배려" },
];

// 회원 ID (마스킹) — 후기 순위 기반 익명 식별자
function memberHandle(r) {
  const prefix = r.gender === "m" ? "M" : "F";
  return `${prefix}${String(r.rank).padStart(3, "0")}`;
}

// 회원 정보 라인: "여성회원 · 30대 · 매력 인증"
function memberInfo(r) {
  const g = r.gender === "m" ? "남성회원" : "여성회원";
  return `${g} · ${r.age} · ${r.verify}`;
}

// 날짜 포맷
function formatDate(iso) {
  const [y, m, d] = iso.split("-");
  return `${y}.${m}.${d}`;
}

const SUMMARY = {
  total: 24,
  male: 15,
  female: 9,
  recent: "2026.02.22",
  oldest: "2025.06.28",
  tagCounts: [
    { tag: "대화 만족", count: 10 },
    { tag: "매너/배려", count: 7 },
    { tag: "재만남/설렘", count: 5 },
    { tag: "서비스 신뢰감", count: 1 },
    { tag: "전반 만족", count: 1 },
  ],
};

const HIGHLIGHT_IDS = [6, 11, 15, 16, 10];

Object.assign(window, { REVIEW_DATA, SUMMARY, HIGHLIGHT_IDS, memberHandle, memberInfo, formatDate });
