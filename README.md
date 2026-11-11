# 🌉 2026 BRIDGE DAY – 행사 안내 웹사이트

> **소프트웨어 인재를 위한 특별한 만남의 장**  
> 스마트소프트웨어학과 BRIDGE DAY 초청 행사를 소개하는 랜딩 페이지입니다.  
> **참가 대상 학생들에게 공유할 공식 안내 URL**에 해당합니다.

<p align="center">
  <img src="./docs/screenshots/desktop-hero.jpg" width="760" alt="2026 BRIDGE DAY 첫 화면" />
</p>

---

## 🔗 배포 URL

> 📎 **참가자 안내용 URL:** https://yc-aisw.github.io/bridge_day/

GitHub Pages에서 제공하는 프론트엔드 전용 사이트입니다. 별도 백엔드 서버는 필요하지 않습니다.

### 자동 배포

- `main` 브랜치에 푸시하면 GitHub Actions가 의존성 설치, 빌드, GitHub Pages 배포를 실행합니다.
- 워크플로: [`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml)
- 배포 상태: [GitHub Actions](https://github.com/YC-AISW/bridge_day/actions/workflows/deploy.yml)
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

## 📅 행사 개요 (2026)

- **행사명:** 2026 BRIDGE DAY
- **일시:** 날짜 추후 공지 · 12:00 – 16:00
- **장소:** AI·DX 센터 1층 (정문에서 도보 약 7분)
- **대상:** 소프트웨어에 관심이 많은 초청 학생
- **주요 내용:** 네트워킹 · 점심 · 선배 포트폴리오 발표 · AI·DX 센터와 선배 프로젝트 체험 · 전공 동아리 소개

---

## ✏️ 내용 수정하기

문구와 일정은 모두 [`src/data.ts`](./src/data.ts) 한 파일에 있습니다. 화면 코드는 고치지 않아도 됩니다.

| 바꿀 내용 | 위치 |
| --- | --- |
| 날짜 · 시간 · 장소 · 문의 전화 | `event` — 날짜를 `"2026-12-05"`처럼 넣으면 요일과 D-day가 자동으로 붙습니다. |
| 행사 특징 카드 | `features` |
| 타임테이블 | `timeline` — 진행 시간(분)은 시작·끝 시각으로 자동 계산됩니다. |
| 멘토 | `mentors` — 비워 둔 항목은 "소개 준비 중"으로 표시됩니다. |
| 전공 동아리 | `clubs` — [학과 홈페이지 전공동아리](https://www.yc.ac.kr/smartsw/major-clubs.do) 기준 |
| 길 안내 문구 · 사진 | `routeSteps` |
| 버스 · 택시 안내 | `transit` — [학교위치/교통](https://www.yc.ac.kr/www/campus-info.do) 기준 |

---

## 🗺️ 찾아오는 길 지도

- 정문 → AI·DX 센터 지도는 OT 앱(Frontend 저장소)의 캠퍼스 지도 데이터에서 길 안내에 필요한 부분만 잘라 만든 SVG입니다. 주차장·나무·산책로 같은 정보는 빼고 건물·도로·잔디만 남겼습니다.
- 정문 위치와 경로는 위성사진·정문 사진과 맞춰 확인했고, 경사는 지형 고도 데이터로 확인했습니다. 정문에서 연암미래관 앞 갈림길까지가 오르막입니다.
- 지도는 **위쪽이 정문에서 학교 안쪽을 바라본 방향(서쪽)** 입니다. 정문에 서서 휴대폰을 들면 화면과 실제 방향이 같습니다.
- 지도 데이터를 다시 만들려면 Frontend 저장소를 이 저장소 옆 폴더에 두고 아래 명령을 실행합니다. 결과는 `src/campusMap.ts`에 저장됩니다.

  ```bash
  npm run map:extract
  ```

- 출처: 건물 윤곽 국토교통부 도로명주소 건물(VWorld), 도로·잔디·운동장 © OpenStreetMap contributors (ODbL), 캠퍼스 사진 연암공과대학교 캠퍼스 안내

---

## 🖥 화면 구성

| 첫 화면 (모바일) | 일정 (모바일) | 찾아오는 길 (모바일) |
| :---: | :---: | :---: |
| <img src="./docs/screenshots/mobile-hero.jpg" width="240" alt="모바일 첫 화면" /> | <img src="./docs/screenshots/mobile-schedule.jpg" width="240" alt="모바일 타임테이블" /> | <img src="./docs/screenshots/mobile-directions.jpg" width="240" alt="모바일 찾아오는 길 지도" /> |

### 행사 소개

<p align="center"><img src="./docs/screenshots/desktop-about.jpg" width="760" alt="행사 소개" /></p>

### 일정

<p align="center"><img src="./docs/screenshots/desktop-schedule.jpg" width="760" alt="타임테이블" /></p>

### 멘토 소개

<p align="center"><img src="./docs/screenshots/desktop-mentors.jpg" width="760" alt="멘토 소개" /></p>

### 전공 동아리

<p align="center"><img src="./docs/screenshots/desktop-clubs.jpg" width="760" alt="동아리 소개" /></p>

### 오시는 길

<p align="center"><img src="./docs/screenshots/desktop-directions.jpg" width="760" alt="정문에서 AI·DX 센터까지 길 안내" /></p>

---

## 🛠 기술 스택

- React 18 · TypeScript · Vite 5
- 순수 CSS (CSS 프레임워크 · 애니메이션 라이브러리 없음)
- 글꼴: Pretendard(본문), Unbounded(`BRIDGE DAY` 제목) — npm 패키지로 함께 배포

### 디자인 원칙

- **정보 전달이 먼저:** 일시 · 장소는 첫 화면에 표로, 일정은 시간 | 내용 목록으로 보여 줍니다. 강조색은 하나만 씁니다.
- **움직임은 길 안내에만:** 찾아오는 길 지도에서 경로가 그려지고 걷는 점이 단계별로 이동합니다. 넓은 화면에서는 지도가 고정되고, 스크롤하면 해당 단계가 지도에 표시됩니다.
- **휴대폰 성능:** 계속 도는 애니메이션 · 블러 · 블렌드 효과를 쓰지 않습니다. 지도 안의 반복 애니메이션은 마우스를 쓰는 화면에서만 켜고, 화면 밖에서는 멈춥니다(`data-anim` + `usePauseOffscreen`).
- **접근성:** 본문 바로가기, 키보드 포커스 표시, 지도 대체 텍스트, `prefers-reduced-motion`(동작 줄이기) 대응
