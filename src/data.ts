// ===== BRIDGE DAY 메인 페이지에서 사용하는 데이터 모음 =====
// 행사 정보가 바뀌면 이 파일만 고치면 됩니다.

// ===== 행사 기본 정보 =====
// Hero(첫 화면) · About · Footer · 오시는 길에서 사용합니다.
// - date : 행사 날짜 (YYYY-MM-DD). 비워 두면 "날짜 추후 공지"로 표시되고,
//          넣으면 "12월 5일 (토)"처럼 요일이 자동으로 붙습니다.
export const event = {
  year: 2026,
  date: "2026-12-05",
  startTime: "11:30",
  endTime: "15:30",
  venue: "AI·DX 센터 1층",
  school: "연암공과대학교",
  department: "AI소프트웨어학과",
  /** 참여 신청 페이지 (Notion) */
  registrationUrl: "https://prairie-lint-d34.notion.site/43223e729dac4c9d9928bcd7e087a0dc",
};

// 페이지 상단의 About 섹션에서
// BRIDGE DAY 행사를 한눈에 소개하기 위한 특징 데이터입니다.
// - icon: 카드 위 아이콘 (components/AboutSection.tsx 의 아이콘 이름)
// - title: 특징 이름
// - description: 특징에 대한 간단한 설명
export type Feature = {
  icon: "network" | "lunch" | "mentor";
  title: string;
  description: string;
};

export const features: Feature[] = [
  {
    icon: "network",
    title: "Networking",
    description: "합격자 동기들, 그리고 선배들과 미리 친해질 수 있는 기회",
  },
  {
    icon: "lunch",
    title: "Lunch & Gift",
    description: "맛있는 점심식사와 기념품 제공",
  },
  {
    icon: "mentor",
    title: "Mentoring",
    description: "우수 선배들의 포트폴리오 발표와 현실적인 조언",
  },
];

// ===== 행사 일정(Time Table) 데이터 =====
// Time Table 섹션에서 사용하는 일정 데이터입니다.
// - time: 행사 시간 (예: "12:00 ~ 13:00")
// - title: 일정 제목 (예: "출석체크 및 점심식사")
// - description: 해당 시간에 진행되는 내용 설명
// - type: (선택) 일정 강조를 위한 타입으로, "break" 또는 "highlight" 를 가질 수 있습니다.
//          "break"   → 휴식/브레이크 구간 강조
//          "highlight" → 주요 세션 강조
export type TimelineItem = {
  time: string;
  title: string;
  description: string;
  type?: "break" | "highlight";
};

export const timeline: TimelineItem[] = [
  {
    time: "11:30 ~ 12:00",
    title: "출석체크 (30분)",
    description: "AI·DX 센터 1층에서 출석 확인 및 조 배정 확인",
  },
  {
    time: "12:00 ~ 13:00",
    title: "점심식사 & 아이스브레이킹 (1시간)",
    description: "조별로 함께 점심을 먹으며 어색함 없애기",
  },
  {
    time: "13:00 ~ 13:10",
    title: "환영 인사 (10분)",
    description: "학회장, 부학회장 및 선배 참가자 소개",
  },
  {
    time: "13:10 ~ 13:40",
    title: "학교 생활 소개 (30분)",
    description: "교육과정, 동아리, 취업처 등 학교 생활 가이드",
  },
  {
    time: "13:40 ~ 14:10",
    title: "선배 포트폴리오 & 조언 (30분)",
    description: "선배 3명(양희승 · 김준성 · 최국진)의 포트폴리오와 대학생활 노하우",
    type: "highlight",
  },
  {
    time: "14:10 ~ 14:50",
    title: "AI·DX 센터 체험 (40분)",
    description: "AI·DX 센터를 둘러보고 직접 체험하는 시간",
    type: "highlight",
  },
  {
    time: "14:50 ~ 15:30",
    title: "선배 프로젝트 체험 (40분)",
    description: "선배들이 만든 프로젝트를 직접 체험하고, 기념품 증정과 함께 마무리",
    type: "highlight",
  },
];

// ===== 멘토 스택 배지 데이터 =====
// 멘토들이 사용할 수 있는 기술 스택을 뱃지 형태로 출력하기 위한 데이터입니다.
// 배지 이미지는 shields.io 에서 URL 형태로 가져옵니다.
// 예시:
//   https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=000000
// 주요 파라미터:
//   - 첫 번째 텍스트 (React): 표시할 텍스트
//   - 뒤의 색상 값 (61DAFB): 오른쪽 배경 색상
//   - style=flat          : 뱃지 스타일 (자세한 옵션은 https://shields.io/badges 참고)
//   - logo=react          : 로고 아이콘 종류
//   - logoColor=000000    : 로고 아이콘 색상
export type MentorStack = {
  label: string; // 뱃지에 해당하는 기술 이름
  badge: string; // shields.io 뱃지 URL
};

// MentorStack 생성을 간단하게 하기 위한 헬퍼 함수
const badge = (label: string, url: string): MentorStack => ({
  label,
  badge: url,
});

// ===== 멘토 소개 데이터 =====
// MentorCarousel / MentorsSection 에서 사용하는 멘토 정보입니다.
// - grade   : 현재 학년 (예: "4학년")
// - name    : 이름
// - interest: 관심 분야 (예: "웹 프론트엔드"). 비워 두면 "소개 준비 중"으로 표시됩니다.
// - stacks  : 사용 가능한 기술 스택 목록 (MentorStack[])
export type Mentor = {
  grade: string;
  name: string;
  interest: string;
  stacks: MentorStack[];
};

export const mentors: Mentor[] = [
  {
    grade: "3학년",
    name: "양희승",
    interest: "웹 프론트엔드",
    stacks: [
      badge(
        "React",
        "https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=000000"
      ),
      badge(
        "React Native",
        "https://img.shields.io/badge/React%20Native-20232A?style=flat&logo=react&logoColor=61DAFB"
      ),
      badge(
        "TailwindCSS",
        "https://img.shields.io/badge/TailwindCSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white"
      ),
      badge(
        "MUI",
        "https://img.shields.io/badge/MUI-007FFF?style=flat&logo=mui&logoColor=ffffff"
      ),
      badge(
        "Node.js",
        "https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=ffffff"
      ),
      badge(
        "TypeScript",
        "https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=ffffff"
      ),
    ],
  },
  {
    grade: "2학년",
    name: "김준성",
    interest: "풀 스택",
    stacks: [
      badge(
        "Python",
        "https://img.shields.io/badge/Python-3776AB?style=flat&logo=python&logoColor=ffffff"
      ),
      badge(
        "FastAPI",
        "https://img.shields.io/badge/FastAPI-009688?style=flat&logo=fastapi&logoColor=ffffff"
      ),
      badge(
        "Next.js",
        "https://img.shields.io/badge/Next.js-000000?style=flat&logo=nextdotjs&logoColor=ffffff"
      ),
      badge(
        "React Native",
        "https://img.shields.io/badge/React%20Native-20232A?style=flat&logo=react&logoColor=61DAFB"
      ),
      badge(
        "Dart",
        "https://img.shields.io/badge/Dart-0175C2?style=flat&logo=dart&logoColor=ffffff"
      ),
      badge(
        "Flutter",
        "https://img.shields.io/badge/Flutter-02569B?style=flat&logo=flutter&logoColor=ffffff"
      ),
      badge(
        "C",
        "https://img.shields.io/badge/C-A8B400?style=flat&logo=c&logoColor=ffffff"
      ),
      badge(
        "MySQL",
        "https://img.shields.io/badge/MySQL-4479A1?style=flat&logo=mysql&logoColor=ffffff"
      ),
      badge(
        "Docker",
        "https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=ffffff"
      ),
    ],
  },
  {
    grade: "3학년",
    name: "최국진",
    interest: "SAP · ABAP",
    stacks: [
      badge(
        "SAP",
        "https://img.shields.io/badge/SAP-0FAAFF?style=flat&logo=sap&logoColor=ffffff"
      ),
      badge(
        "ABAP",
        "https://img.shields.io/badge/ABAP-0B3C68?style=flat&logo=sap&logoColor=ffffff"
      ),
      badge(
        "SAP Fiori",
        "https://img.shields.io/badge/SAP%20Fiori-0FAAFF?style=flat&logo=sap&logoColor=ffffff"
      ),
      badge(
        "SAPUI5",
        "https://img.shields.io/badge/SAPUI5-0A6ED1?style=flat&logo=sap&logoColor=ffffff"
      ),
    ],
  },
];

// ===== 동아리 소개 데이터 =====
// 동아리 소개 섹션에서 사용하는 전공 동아리 정보입니다.
// 학과 홈페이지 전공동아리 게시판(https://www.yc.ac.kr/smartsw/major-clubs.do) 내용을 옮겨 왔어요.
// - name     : 동아리 이름
// - leader   : 동아리장 이름 (비워 두면 표시하지 않아요)
// - advisor  : 지도 교수님 성함
// - intro    : 동아리에 대한 간단한 소개
// - activity : 동아리에서 주로 진행하는 활동 소개
export type Club = {
  name: string;
  leader: string;
  advisor: string;
  intro: string;
  activity: string;
};

export const clubs: Club[] = [
  {
    name: "TechUs",
    leader: "",
    advisor: "김범준 · 이승익 · 김영수 · 이재범 교수님",
    intro:
      "TechUs는 훌륭한 개발자가 되기 위해 학생들이 함께 성장하는 SW 전공 동아리로, 팀 프로젝트를 중심으로 실무 역량을 키웁니다.",
    activity:
      "취업에 실질적으로 도움이 되는 팀 프로젝트를 진행하고, 각종 경진대회와 해커톤에 참여하며 선후배가 다 같이 어울려 활동합니다.",
  },
  {
    name: "Sapphire",
    leader: "",
    advisor: "이덕기 · 변유찬 교수님",
    intro:
      "Sapphire는 SAP에 대한 심화 지식을 공부하며 실무 역량을 키우고, 궁극적으로 취업을 목표로 하는 전공 동아리입니다.",
    activity:
      "ERPSIM, SAP 스터디, ABAP 프로젝트, 자격증 스터디를 주로 진행하고, 학기 말에는 프로젝트로 전공동아리 공모전이나 경진대회에 참여합니다.",
  },
];
