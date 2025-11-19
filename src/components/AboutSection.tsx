import { features } from "../data";

export const AboutSection = () => (
  <section id="about" className="fade-in">
    <div className="container">
      <h2>About The Event</h2>
      <p className="description">
        <strong>프로그래밍을 사랑하는 예비 후배</strong>들을 위해 준비한,
        단 하나의 사전 멘토링 프로그램입니다.
        <br />
        선배들이 직접 들려주는 학교 생활과 진로 이야기를 통해 더 현실적인
        조언과 인사이트를 얻어가세요.
      </p>
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

