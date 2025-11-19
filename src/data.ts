export type Feature = {
  title: string;
  description: string;
};

export type TimelineItem = {
  time: string;
  title: string;
  description: string;
  type?: "break" | "highlight";
};

export type MentorStack = {
  label: string;
  badge: string;
};

export type Mentor = {
  grade: string;
  name: string;
  interest: string;
  stacks: MentorStack[];
};

export const features: Feature[] = [
  {
    title: "Deep Networking",
    description: "학년을 뛰어넘어 미리 친해질 수 있는 조 편성 & 네트워킹.",
  },
  {
    title: "Lunch & Gift",
    description: "점심 케이터링과 굿즈를 함께 즐기며 편안한 분위기를 만들어요.",
  },
  {
    title: "Premium Mentoring",
    description: "선배들의 실무 이야기와 실전 팁을 가까이에서 듣는 시간.",
  },
];

export const timeline: TimelineItem[] = [
  {
    time: "12:00 ~ 13:00",
    title: "출석체크 & 네트워킹 런치",
    description: "조별 배정을 확인하고 점심을 함께 하며 어색함을 녹여요.",
  },
  {
    time: "13:00 ~ 13:10",
    title: "아이스브레이킹",
    description: "조별 색다른 자기소개와 간단 미션으로 분위기를 띄웁니다.",
  },
  {
    time: "13:10 ~ 13:20",
    title: "환영 인사",
    description: "학교 관계자와 선배 대표가 오늘의 프로그램을 소개합니다.",
  },
  {
    time: "13:20 ~ 13:50",
    title: "학교 생활 소개",
    description: "교육과정, 동아리, 진로 준비 스토리를 Q&A와 함께 공유해요.",
  },
  {
    time: "13:50 ~ 14:00",
    title: "브레이크 타임",
    description: "오픈채팅방을 만들고 자유롭게 이야기 나누는 시간.",
    type: "break",
  },
  {
    time: "14:00 ~ 14:50",
    title: "선배 스토리 & 조언 1",
    description: "전공 선택과 커리어 경험을 심도있게 들을 수 있는 세션.",
    type: "highlight",
  },
  {
    time: "14:50 ~ 15:00",
    title: "브레이크 타임",
    description: "궁금한 질문을 정리하고 서로 아이디어를 나눠요.",
    type: "break",
  },
  {
    time: "15:00 ~ 15:30",
    title: "선배 스토리 & 조언 2",
    description: "현업 경험과 성장 팁을 보다 깊게 들을 수 있는 시간.",
    type: "highlight",
  },
  {
    time: "15:30 ~ 15:50",
    title: "조별 친목 활동",
    description: "미션 게임과 협업 미니 프로젝트로 친밀도를 높입니다.",
  },
  {
    time: "15:50 ~ 16:00",
    title: "마무리 & 기념품",
    description: "마지막 소감과 기념품 전달, 단체 사진 촬영으로 종료.",
  },
];

export const mentors: Mentor[] = [
  {
    grade: "4학년",
    name: "김호진",
    interest: "웹 프론트엔드",
    stacks: [
      {
        label: "React",
        badge:
          "https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=000000",
      },
      {
        label: "React Native",
        badge:
          "https://img.shields.io/badge/React_Native-20232A?style=flat&logo=react&logoColor=61DAFB",
      },
      {
        label: "TailwindCSS",
        badge:
          "https://img.shields.io/badge/TailwindCSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white",
      },
      {
        label: "MUI",
        badge:
          "https://img.shields.io/badge/MUI-007FFF?style=flat&logo=mui&logoColor=ffffff",
      },
      {
        label: "Node.js",
        badge:
          "https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=ffffff",
      },
      {
        label: "TypeScript",
        badge:
          "https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=ffffff",
      },
    ],
  },
  {
    grade: "3학년",
    name: "조소영",
    interest: "서버 · 백엔드",
    stacks: [
      {
        label: "Java",
        badge:
          "https://img.shields.io/badge/Java-007396?style=flat&logo=openjdk&logoColor=ffffff",
      },
      {
        label: "Spring",
        badge:
          "https://img.shields.io/badge/Spring-6DB33F?style=flat&logo=spring&logoColor=ffffff",
      },
      {
        label: "Spring Boot",
        badge:
          "https://img.shields.io/badge/Spring%20Boot-6DB33F?style=flat&logo=springboot&logoColor=ffffff",
      },
      {
        label: "C",
        badge:
          "https://img.shields.io/badge/C-A8B400?style=flat&logo=c&logoColor=ffffff",
      },
    ],
  },
  {
    grade: "3학년",
    name: "옥준서",
    interest: "SAP · 엔터프라이즈",
    stacks: [
      {
        label: "Java",
        badge:
          "https://img.shields.io/badge/Java-007396?style=flat&logo=openjdk&logoColor=ffffff",
      },
      {
        label: "ABAP",
        badge:
          "https://img.shields.io/badge/ABAP-0B3C68?style=flat&logo=sap&logoColor=ffffff",
      },
      {
        label: "SAP Fiori",
        badge:
          "https://img.shields.io/badge/SAP%20Fiori-0FAAFF?style=flat&logo=sap&logoColor=ffffff",
      },
      {
        label: "SAP",
        badge:
          "https://img.shields.io/badge/SAP-0FAAFF?style=flat&logo=sap&logoColor=ffffff",
      },
    ],
  },
  {
    grade: "3학년",
    name: "신경준",
    interest: "데이터 엔지니어링",
    stacks: [
      {
        label: "Java",
        badge:
          "https://img.shields.io/badge/Java-007396?style=flat&logo=openjdk&logoColor=ffffff",
      },
      {
        label: "Kotlin",
        badge:
          "https://img.shields.io/badge/Kotlin-7F52FF?style=flat&logo=kotlin&logoColor=ffffff",
      },
      {
        label: "Spring",
        badge:
          "https://img.shields.io/badge/Spring-6DB33F?style=flat&logo=spring&logoColor=ffffff",
      },
    ],
  },
  {
    grade: "2학년",
    name: "양희승",
    interest: "웹 프론트엔드",
    stacks: [
      {
        label: "React",
        badge:
          "https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=000000",
      },
      {
        label: "TypeScript",
        badge:
          "https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=ffffff",
      },
      {
        label: "Vite",
        badge:
          "https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=ffffff",
      },
    ],
  },
  {
    grade: "2학년",
    name: "김준성",
    interest: "웹 서비스 엔지니어링",
    stacks: [
      {
        label: "React",
        badge:
          "https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=000000",
      },
      {
        label: "Svelte",
        badge:
          "https://img.shields.io/badge/Svelte-FF3E00?style=flat&logo=svelte&logoColor=ffffff",
      },
      {
        label: "Docker",
        badge:
          "https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=ffffff",
      },
      {
        label: "Flask",
        badge:
          "https://img.shields.io/badge/Flask-000000?style=flat&logo=flask&logoColor=ffffff",
      },
      {
        label: "MySQL",
        badge:
          "https://img.shields.io/badge/MySQL-4479A1?style=flat&logo=mysql&logoColor=ffffff",
      },
      {
        label: "MariaDB",
        badge:
          "https://img.shields.io/badge/MariaDB-003545?style=flat&logo=mariadb&logoColor=ffffff",
      },
    ],
  },
  {
    grade: "1학년",
    name: "이효준",
    interest: "백엔드 · 데이터",
    stacks: [
      {
        label: "Spring Boot 3",
        badge:
          "https://img.shields.io/badge/Spring%20Boot%203-6DB33F?style=flat&logo=springboot&logoColor=ffffff",
      },
      {
        label: "NestJS",
        badge:
          "https://img.shields.io/badge/NestJS-E0234E?style=flat&logo=nestjs&logoColor=ffffff",
      },
      {
        label: "FastAPI",
        badge:
          "https://img.shields.io/badge/FastAPI-009688?style=flat&logo=fastapi&logoColor=ffffff",
      },
      {
        label: "Java",
        badge:
          "https://img.shields.io/badge/Java-007396?style=flat&logo=openjdk&logoColor=ffffff",
      },
      {
        label: "TypeScript",
        badge:
          "https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=ffffff",
      },
      {
        label: "Python",
        badge:
          "https://img.shields.io/badge/Python-3776AB?style=flat&logo=python&logoColor=ffffff",
      },
      {
        label: "Docker",
        badge:
          "https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=ffffff",
      },
    ],
  },
  {
    grade: "1학년",
    name: "장영민",
    interest: "게임 클라이언트",
    stacks: [
      {
        label: "Unity",
        badge:
          "https://img.shields.io/badge/Unity-000000?style=flat&logo=unity&logoColor=ffffff",
      },
      {
        label: "C#",
        badge:
          "https://img.shields.io/badge/C%23-512BD4?style=flat&logo=csharp&logoColor=ffffff",
      },
      {
        label: "Photon",
        badge:
          "https://img.shields.io/badge/Photon-5A29E4?style=flat&logo=photon&logoColor=ffffff",
      },
    ],
  },
];
