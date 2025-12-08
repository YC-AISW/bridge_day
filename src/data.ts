// ===== BRIDGE DAY 메인 페이지에서 사용하는 데이터 모음 =====

// 페이지 상단의 About 섹션에서
// BRIDGE DAY 행사를 한눈에 소개하기 위한 특징 데이터입니다.
// - title: 특징 이름
// - description: 특징에 대한 간단한 설명
export type Feature = {
  title: string;
  description: string;
};

export const features: Feature[] = [
  {
    title: "Networking",
    description: "합격자 동기들, 그리고 선배들과 미리 친해질 수 있는 기회",
  },
  {
    title: "Lunch & Gift",
    description: "맛있는 점심식사와 기념품 제공",
  },
  {
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
    time: "12:00 ~ 13:00",
    title: "출석체크 및 점심식사 (1시간)",
    description: "조 배정 확인 후 조별로 함께하는 점심",
  },
  {
    time: "13:00 ~ 13:10",
    title: "아이스브레이킹 (10분)",
    description: "조별로 어색함 없애기",
  },
  {
    time: "13:10 ~ 13:20",
    title: "환영 인사 (10분)",
    description: "학회장, 부학회장 및 선배 참가자 소개",
  },
  {
    time: "13:20 ~ 13:50",
    title: "학교 생활 소개 (30분)",
    description: "교육과정, 동아리, 취업처 등 학교 생활 가이드",
  },
  {
    time: "13:50 ~ 14:00",
    title: "휴식 (10분)",
    description: "조별로 오픈 채팅방을 만들어 친해져보는건 어떨까요?",
    type: "break",
  },
  {
    time: "14:00 ~ 14:50",
    title: "선배 포트폴리오 & 조언 1",
    description: "성공적인 대학생활을 위한 선배들의 노하우",
    type: "highlight",
  },
  {
    time: "14:50 ~ 15:00",
    title: "휴식 (10분)",
    description: "궁금한 부분이 있으면 자유롭게 질문!",
    type: "break",
  },
  {
    time: "15:00 ~ 15:30",
    title: "선배 포트폴리오 & 조언 2 (30분)",
    description: "더 깊이 있는 성장 스토리 공유",
    type: "highlight",
  },
  {
    time: "15:30 ~ 15:50",
    title: "조별 친목 활동 (20분)",
    description: "선배들과 함께하는 즐거운 시간",
  },
  {
    time: "15:50 ~ 16:00",
    title: "마무리 (10분)",
    description: "기념품 증정 및 행사 종료",
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
// - interest: 관심 분야 (예: "웹 프론트엔드")
// - stacks  : 사용 가능한 기술 스택 목록 (MentorStack[])
export type Mentor = {
  grade: string;
  name: string;
  interest: string;
  stacks: MentorStack[];
};

export const mentors: Mentor[] = [
  {
    grade: "4학년",
    name: "김호진",
    interest: "웹 프론트엔드",
    stacks: [
      badge(
        "React",
        "https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=000000"
      ),
      badge(
        "Next.js",
        "https://img.shields.io/badge/Next.js-000000?style=flat&logo=nextdotjs&logoColor=ffffff"
      ),
      badge(
        "TailwindCSS",
        "https://img.shields.io/badge/TailwindCSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white"
      ),
      badge(
        "TypeScript",
        "https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=ffffff"
      ),
    ],
  },
  {
    grade: "3학년",
    name: "조소영",
    interest: "백엔드 · 임베디드",
    stacks: [
      badge(
        "Java",
        "https://img.shields.io/badge/Java-007396?style=flat&logo=openjdk&logoColor=ffffff"
      ),
      badge(
        "Spring",
        "https://img.shields.io/badge/Spring-6DB33F?style=flat&logo=spring&logoColor=ffffff"
      ),
      badge(
        "Spring Boot",
        "https://img.shields.io/badge/Spring%20Boot-6DB33F?style=flat&logo=springboot&logoColor=ffffff"
      ),
      badge(
        "C",
        "https://img.shields.io/badge/C-A8B400?style=flat&logo=c&logoColor=ffffff"
      ),
    ],
  },
  {
    grade: "3학년",
    name: "옥준서",
    interest: "SAP · 백엔드",
    stacks: [
      badge(
        "Java",
        "https://img.shields.io/badge/Java-007396?style=flat&logo=openjdk&logoColor=ffffff"
      ),
      badge(
        "ABAP",
        "https://img.shields.io/badge/ABAP-0B3C68?style=flat&logo=sap&logoColor=ffffff"
      ),
      badge(
        "SAP Fiori",
        "https://img.shields.io/badge/SAP%20Fiori-0FAAFF?style=flat&logo=sap&logoColor=ffffff"
      ),
    ],
  },
  {
    grade: "3학년",
    name: "신경준",
    interest: "안드로이드 · 백엔드",
    stacks: [
      badge(
        "Java",
        "https://img.shields.io/badge/Java-007396?style=flat&logo=openjdk&logoColor=ffffff"
      ),
      badge(
        "Kotlin",
        "https://img.shields.io/badge/Kotlin-7F52FF?style=flat&logo=kotlin&logoColor=ffffff"
      ),
      badge(
        "Spring",
        "https://img.shields.io/badge/Spring-6DB33F?style=flat&logo=spring&logoColor=ffffff"
      ),
    ],
  },
  {
    grade: "2학년",
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
    grade: "1학년",
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
    grade: "1학년",
    name: "이효준",
    interest: "백엔드 · 데이터사이언스",
    stacks: [
      badge(
        "Spring Boot 3",
        "https://img.shields.io/badge/Spring%20Boot%203-6DB33F?style=flat&logo=springboot&logoColor=ffffff"
      ),
      badge(
        "NestJS",
        "https://img.shields.io/badge/NestJS-E0234E?style=flat&logo=nestjs&logoColor=ffffff"
      ),
      badge(
        "FastAPI",
        "https://img.shields.io/badge/FastAPI-009688?style=flat&logo=fastapi&logoColor=ffffff"
      ),
      badge(
        "Java",
        "https://img.shields.io/badge/Java-007396?style=flat&logo=openjdk&logoColor=ffffff"
      ),
      badge(
        "TypeScript",
        "https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=ffffff"
      ),
      badge(
        "Python",
        "https://img.shields.io/badge/Python-3776AB?style=flat&logo=python&logoColor=ffffff"
      ),
      badge(
        "Docker",
        "https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=ffffff"
      ),
    ],
  },
  {
    grade: "1학년",
    name: "장영민",
    interest: "웹 프론트엔드",
    stacks: [
      badge(
        "React",
        "https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=000000"
      ),
      badge(
        "TailwindCSS",
        "https://img.shields.io/badge/TailwindCSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white"
      ),
      badge(
        "TypeScript",
        "https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=ffffff"
      ),
      badge(
        "NestJS",
        "https://img.shields.io/badge/NestJS-E0234E?style=flat&logo=nestjs&logoColor=ffffff"
      ),
    ],
  },
];

// ===== 동아리 소개 데이터 =====
// 동아리 소개 섹션에서 사용하는 전공 동아리 정보입니다.
// - name     : 동아리 이름
// - leader   : 동아리장 이름
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
    name: "TripleS",
    leader: "조소영",
    advisor: "김범준 교수님",
    intro:
      "TripleS는 훌륭한 개발자가 되기 위해 학생들이 함께 성장하는 동아리로, 팀 프로젝트를 중심으로 실무 역량을 키웁니다.",
    activity:
      "취업에 도움이 되는 서비스를 기획·개발하고, 각종 경진대회와 해커톤에 참가하며 선후배가 함께 네트워킹합니다.",
  },
  {
    name: "ERPro",
    leader: "옥준서",
    advisor: "이덕기 교수님",
    intro:
      "ERPro는 SAP 심화 지식을 공부하며 실무 역량을 쌓고, 관련 분야 취업을 목표로 하는 전공 동아리입니다.",
    activity:
      "ERPSIM, SAP 스터디, ABAP 프로젝트, 자격증 스터디 등을 진행하고 학기 말에는 프로젝트로 공모전·경진대회에 참가합니다.",
  },
  {
    name: "DP",
    leader: "양희승",
    advisor: "변유찬 교수님",
    intro:
      "DP(Digital Playground)는 최신 기술을 바탕으로 다양한 실전 프로젝트를 자유롭고 창의적인 분위기 속에서 직접 기획하고 구현합니다.",
    activity:
      "웹/앱 개발, AI, 프론트엔드 프레임워크 등 실무 주제를 다루며 스터디·멘토링·외부 세미나를 진행하고, 학기 말에는 팀 프로젝트로 대회에 출전합니다.",
  },
  {
    name: "OpenAI",
    leader: "최경석",
    advisor: "이승익 교수님",
    intro:
      "OpenAI 동아리는 오픈 소스를 활용해 AI 분야를 학습하고 AI 기반 애플리케이션 개발을 목표로 합니다.",
    activity:
      "컴퓨터비전 수업과 연계해 AI를 학습하고, 학기 말 프로젝트를 통해 전공 동아리 공모전 또는 경진대회에 참가합니다.",
  },
];
