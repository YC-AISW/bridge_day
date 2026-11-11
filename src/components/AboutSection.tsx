import type { ReactNode } from "react";
import { event, features, type Feature } from "../data";

// 카드 위 아이콘 (선 아이콘, 색은 CSS 의 color 를 따라가요)
const ICONS: Record<Feature["icon"], ReactNode> = {
  network: (
    <>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2.5 20.5a6.5 6.5 0 0 1 13 0M16 4.7a3.5 3.5 0 0 1 0 6.6M18 14.3a6.5 6.5 0 0 1 3.5 6.2" />
    </>
  ),
  lunch: (
    <>
      <rect x="3" y="8" width="18" height="5" rx="1.5" />
      <path d="M5 13v6.5A1.5 1.5 0 0 0 6.5 21h11a1.5 1.5 0 0 0 1.5-1.5V13M12 8v13" />
      <path d="M12 8S10.6 3.5 8.1 3.5a2.25 2.25 0 0 0 0 4.5zM12 8s1.4-4.5 3.9-4.5a2.25 2.25 0 0 1 0 4.5z" />
    </>
  ),
  mentor: (
    <>
      <rect x="9" y="2.5" width="6" height="11.5" rx="3" />
      <path d="M5 11a7 7 0 0 0 14 0M12 18v3.5M8.5 21.5h7" />
    </>
  ),
};

// * 행사 소개 섹션
// - Fade-In 애니메이션 적용 대상(`fade-in` 클래스)
// - 특징(장점) 목록을 동적 렌더링하여 표시하는 UI
export const AboutSection = () => (
  <section id="about" className="fade-in">
    <div className="container">
      {/* 섹션 제목 */}
      <h2>About The Event</h2>

      {/* 간단한 행사 소개 문구 */}
      <p className="description">
        {event.department}에서 <strong>소프트웨어에 관심이 많은 학생</strong>들을 선별하여 초청합니다.
        <br />
        동기 및 선배들과의 만남을 통해 학교 생활과 진로에 대한 생생한 이야기를
        나눠보세요
      </p>

      {/* 주요 특징을 카드 형태로 렌더링 */}
      <div className="features">
        {features.map((feature) => (
          <div className="feature-card" key={feature.title}>
            <span className="feature-icon" aria-hidden="true">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                {ICONS[feature.icon]}
              </svg>
            </span>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
