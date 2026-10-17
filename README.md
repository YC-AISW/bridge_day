# 🌉 2025 BRIDGE DAY – 행사 안내 웹사이트

> **소프트웨어 인재를 위한 특별한 만남의 장**  
> 스마트소프트웨어학과 2025 BRIDGE DAY 초청 행사를 소개하는 랜딩 페이지입니다.  
> **참가 대상 학생들에게 공유할 공식 안내 URL**에 해당합니다.

---

## 🔗 배포 URL

> 📎 **참가자 안내용 URL:** https://ycsmartsw.github.io/bridge_day/

GitHub Pages에서 제공하는 프론트엔드 전용 사이트입니다. 별도 백엔드 서버는 필요하지 않습니다.

### 자동 배포

- `main` 브랜치에 푸시하면 GitHub Actions가 의존성 설치, 빌드, GitHub Pages 배포를 실행합니다.
- 워크플로: [`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml)
- 배포 상태: [GitHub Actions](https://github.com/YCsmartsw/bridge_day/actions/workflows/deploy.yml)
- 수동 재배포: Actions → Deploy to GitHub Pages → Run workflow → `main`
- 저장소 설정: Settings → Pages → Build and deployment → Source: **GitHub Actions**

`vite.config.ts`의 `base`는 GitHub Pages 경로에 맞춰 `/bridge_day/`로 설정되어 있습니다.

### 로컬 실행 및 빌드

```bash
npm ci
npm run dev
```

```bash
npm run build
npm run preview
```

빌드 결과는 `dist/`에 생성됩니다. 미리보기에서는 `/bridge_day/` 경로로 접속합니다.

---

## 📅 행사 개요

- **행사명:** 2025 BRIDGE DAY  
- **일시:** 12월 6일 (토) 12:00  
- **장소:** AI-DX 센터 2층  
- **대상:** 소프트웨어에 관심이 많은 초청 학생  
- **주요 내용:** 네트워킹 · 점심 · 멘토링 · 동아리 소개

---

## 화면 구성 (UI Screens)  


## 🎉 Special Invitation  

> **소프트웨어 인재를 위한 특별한 만남의 장**

<p align="center">
  <img src="./Bridge_day/HeroSection.png" width="700" alt="메인 페이지" />
  <img src="./Bridge_day/Main_mobile.png" width="400" alt="메인 페이지" />
</p>

---

## 📘 About The Event

<p align="center">
  <img src="./Bridge_day/AboutSection.png" width="700" alt="About_Section" />
  <p align="center">
    <img src="./Bridge_day/About_mobile.png" width="400" alt="About_Section" />
    <img src="./Bridge_day/HeaderNav_mobile.png" width="345" alt="About_Section" />
  </p>
</p>

---

## 🕒 Time Table

<p align="center">
  <img src="./Bridge_day/AboutSection.png" width="700" alt="About_Section" />
  <img src="./Bridge_day/About_mobile.png" width="400" alt="About_Section" />
</p>

---

## 👨‍🏫 Meet Your Mentors

<p align="center">
  <img src="./Bridge_day/MentorsSection.png" width="700" alt="About_Section" />
  <img src="./Bridge_day/Mentor_mobile.png" width="400" alt="About_Section" />
</p>

---

## 🏫 동아리 소개

<p align="center">
  <img src="./Bridge_day/ClubSection.png" width="700" alt="About_Section" />
  <img src="./Bridge_day/Club_mobile.png" width="400" alt="About_Section" />
</p>

---

## 🛠 기술 스택 (웹 구현)
- React  
- Vite  
- TypeScript  
- Tailwind CSS  
- Framer Motion 등

---

