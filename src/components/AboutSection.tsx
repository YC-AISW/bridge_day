import { features } from "../data";

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
        <strong>소프트웨어에 관심이 많은 학생</strong>들을 선별하여 초청합니다.
        <br />
        동기 및 선배들과의 만남을 통해 학교 생활과 진로에 대한 생생한 이야기를
        나눠보세요
      </p>

      {/* 주요 특징을 카드 형태로 렌더링 */}
      <div className="features">
        {features.map((feature) => (
          <div className="feature-card" key={feature.title}>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
