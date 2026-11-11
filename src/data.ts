// ===== 2026 BRIDGE DAY 페이지 내용 =====
// 행사 정보가 바뀌면 이 파일만 고치면 됩니다. (화면 코드는 건드리지 않아도 돼요)

import gatePhoto from "./assets/campus/gate.webp";
import gateThumb from "./assets/campus/gate-thumb.webp";
import gymPhoto from "./assets/campus/gym.webp";
import gymThumb from "./assets/campus/gym-thumb.webp";
import industryPhoto from "./assets/campus/industry.webp";
import industryThumb from "./assets/campus/industry-thumb.webp";
import miraePhoto from "./assets/campus/mirae.webp";
import miraeThumb from "./assets/campus/mirae-thumb.webp";
import techusLogo from "./assets/clubs/techus.jpg";

// ===== 행사 기본 정보 =====
export const event = {
  year: 2026,
  /**
   * 행사 날짜 (YYYY-MM-DD 형식, 예: "2026-12-05").
   * 비워 두면 "날짜 추후 공지"로 표시되고, 넣으면 요일과 D-day가 자동으로 붙습니다.
   */
  date: "",
  startTime: "12:00",
  endTime: "16:00",
  venue: "AI·DX 센터 1층",
  school: "연암공과대학교",
  postalCode: "52821",
  address: "경상남도 진주시 진주대로 629번길 35",
  /** 문의 전화 (학과 사무실) */
  contacts: ["055-751-2190", "055-751-2199"],
};

// ===== About 섹션: 행사 특징 =====
export type Feature = {
  key: "network" | "lunch" | "mentor" | "experience";
  title: string;
  description: string;
};

export const features: Feature[] = [
  {
    key: "network",
    title: "네트워킹",
    description: "합격자 동기들, 그리고 선배들과 미리 친해질 수 있는 기회",
  },
  {
    key: "lunch",
    title: "점심 & 기념품",
    description: "맛있는 점심식사와 기념품 제공",
  },
  {
    key: "mentor",
    title: "멘토링",
    description: "우수 선배들의 포트폴리오 발표와 현실적인 조언",
  },
  {
    key: "experience",
    title: "체험",
    description: "AI·DX 센터와 선배들이 직접 만든 프로젝트 체험",
  },
];

// ===== Time Table =====
// - start / end : "HH:MM" 형식. 진행 시간(분)은 자동으로 계산돼요.
// - type        : "break" = 휴식, "highlight" = 주요 프로그램 (강조 표시)
// - mentors     : true 이면 아래 멘토 목록의 이름이 발표자로 함께 표시돼요.
// - details     : 세부 프로그램 (선택)
export type TimelineItem = {
  start: string;
  end: string;
  title: string;
  description: string;
  type?: "break" | "highlight";
  mentors?: boolean;
  details?: string[];
};

export const timeline: TimelineItem[] = [
  {
    start: "12:00",
    end: "13:00",
    title: "출석체크 및 점심식사",
    description: "조 배정 확인 후 조별로 함께하는 점심",
  },
  {
    start: "13:00",
    end: "13:10",
    title: "아이스브레이킹",
    description: "조별로 어색함 없애기",
  },
  {
    start: "13:10",
    end: "13:20",
    title: "환영 인사",
    description: "학회장, 부학회장 및 선배 참가자 소개",
  },
  {
    start: "13:20",
    end: "13:50",
    title: "학교 생활 소개",
    description: "교육과정, 동아리, 취업처 등 학교 생활 가이드",
  },
  {
    start: "13:50",
    end: "14:00",
    title: "휴식",
    description: "조별로 오픈 채팅방을 만들어 친해져보는 건 어떨까요?",
    type: "break",
  },
  {
    start: "14:00",
    end: "15:00",
    title: "선배 포트폴리오 & 조언",
    description: "선배 한 명당 10~15분씩, 포트폴리오와 성공적인 대학생활을 위한 노하우를 들려줘요.",
    type: "highlight",
    mentors: true,
  },
  {
    start: "15:00",
    end: "16:00",
    title: "AI·DX 센터 & 선배 프로젝트 체험",
    description: "직접 보고 만져 보는 시간! 체험이 끝나면 기념품을 받고 마무리해요.",
    type: "highlight",
    details: ["AI·DX 센터 체험", "선배들이 만든 프로젝트 체험"],
  },
];

// ===== 멘토 (포트폴리오 발표 선배) =====
// - grade    : 학년 (예: "3학년")
// - interest : 관심 분야. 비워 두면 "소개 준비 중"으로 표시돼요.
// - stacks   : 기술 스택 이름 (비워 두면 표시하지 않아요)
export type Mentor = {
  name: string;
  grade: string;
  interest: string;
  stacks: string[];
};

export const mentors: Mentor[] = [
  {
    name: "양희승",
    grade: "3학년",
    interest: "웹 프론트엔드",
    stacks: ["React", "React Native", "TypeScript", "TailwindCSS", "MUI", "Node.js"],
  },
  {
    name: "김준성",
    grade: "2학년",
    interest: "풀 스택",
    stacks: ["Python", "FastAPI", "Next.js", "React Native", "Flutter", "Dart", "C", "MySQL", "Docker"],
  },
  {
    // TODO: 학년 · 관심 분야 · 기술 스택 입력
    name: "최국진",
    grade: "",
    interest: "",
    stacks: [],
  },
];

// ===== 전공 동아리 =====
// 학과 홈페이지 전공동아리 게시판(https://www.yc.ac.kr/smartsw/major-clubs.do) 내용을 옮겨 왔어요.
export type Club = {
  name: string;
  /** 이름 읽는 법 / 부제 */
  subtitle: string;
  purpose: string;
  activities: string[];
  advisors: string[];
  /** 로고 이미지 (없으면 기본 엠블럼) */
  logo?: string;
};

export const clubs: Club[] = [
  {
    name: "TechUs",
    subtitle: "테크어스 · 기술로 더 나은 세상을",
    purpose: "TechUs는 훌륭한 개발자가 되기 위해 학생들이 함께 성장하는 SW 전공 동아리입니다.",
    activities: [
      "주로 팀 프로젝트를 진행하며, 취업에 실질적으로 도움이 되는 활동을 합니다.",
      "각종 경진대회와 해커톤에 참여하고, 선후배가 다 같이 어울리며 활동합니다.",
    ],
    advisors: ["김범준", "이승익", "김영수", "이재범"],
    logo: techusLogo,
  },
  {
    name: "Sapphire",
    subtitle: "사파이어 · SAP 전공 동아리",
    purpose: "Sapphire는 SAP에 대한 심화 지식을 공부하며 실무 역량을 키우고, 궁극적으로 취업을 목표로 하는 동아리입니다.",
    activities: [
      "ERPSIM, SAP 스터디, ABAP 프로젝트, 자격증 스터디를 주로 진행합니다.",
      "학기 말에는 프로젝트로 전공동아리 공모전이나 경진대회에 참여합니다.",
    ],
    advisors: ["이덕기", "변유찬"],
  },
];

// ===== 찾아오는 길: 정문 → AI·DX 센터 =====
// stop 은 src/campusMap.ts 의 안내 지점 id 와 같아야 해요 (지도의 번호와 연결됩니다).
export type RouteStep = {
  stop: "gate" | "mirae" | "gym" | "industry" | "arrive";
  title: string;
  text: string;
  photo?: { src: string; thumb: string; alt: string };
};

export const routeSteps: RouteStep[] = [
  {
    stop: "gate",
    title: "정문으로 들어와요",
    text: "정문을 지나 학교 안쪽으로 쭉 뻗은 오르막길을 따라 직진해요.",
    photo: { src: gatePhoto, thumb: gateThumb, alt: "연암공과대학교 정문과 학교 안쪽으로 이어지는 오르막길" },
  },
  {
    stop: "mirae",
    title: "연암미래관 앞에서 오른쪽",
    text: "오른쪽 잔디밭 너머로 유리 외벽의 연암미래관이 보이면, 바로 앞 갈림길에서 오른쪽 길로 들어가요.",
    photo: { src: miraePhoto, thumb: miraeThumb, alt: "흰 패널과 유리 외벽의 연암미래관" },
  },
  {
    stop: "gym",
    title: "체육관(인화관) 앞에서 왼쪽",
    text: "농구장을 오른쪽에 두고 길을 따라가면 붉은 벽돌의 체육관(인화관)이 나와요. 체육관 앞에서 왼쪽으로 꺾어요.",
    photo: { src: gymPhoto, thumb: gymThumb, alt: "붉은 벽돌 건물인 인화관(체육관) 정면" },
  },
  {
    stop: "industry",
    title: "산학협동관을 지나 직진",
    text: "오른쪽에 산학협동관이 보이면 그대로 조금만 더 걸어요.",
    photo: { src: industryPhoto, thumb: industryThumb, alt: "산학협동관 현판이 걸린 붉은 벽돌 건물" },
  },
  {
    stop: "arrive",
    title: "AI·DX 센터 도착!",
    text: "산학협동관 바로 다음 건물이 AI·DX 센터예요. 행사장은 1층입니다.",
  },
];

// ===== 학교까지 오는 법 =====
// 연암공과대학교 홈페이지 학교위치/교통(https://www.yc.ac.kr/www/campus-info.do) 안내를 옮겨 왔어요.
export const transit = [
  {
    from: "진주역",
    taxi: "약 7분",
    bus: "진주역 앞에서 131번 → 가좌주공아파트(연암공과대학교) 하차 후 도보 10분",
  },
  {
    from: "진주 고속버스터미널",
    taxi: "약 8분",
    bus: "터미널 서쪽 제일병원 앞에서 132 · 121 · 21 · 27번 → 연암공과대학교 하차 후 도보 10분",
  },
  {
    from: "진주 시외버스터미널",
    taxi: "약 11분",
    bus: "농협중앙지점 정류장에서 130 · 131 · 132 · 133 · 140 · 141 · 142 · 143 · 144 · 145 · 171 · 380 · 381 · 382 · 383 · 390번 → 연암공과대학교 하차 후 도보 10분",
  },
];

/** 정문 좌표 (카카오맵 길찾기 도착지) */
export const gateLocation = { name: "연암공과대학교 정문", lat: 35.1641, lng: 128.1027 };
