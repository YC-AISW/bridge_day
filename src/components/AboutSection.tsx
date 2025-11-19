import { features } from "../data";

export const AboutSection = () => (
  <section id="about" className="fade-in">
    <div className="container">
      <h2>About The Event</h2>
      <p className="description">
        <strong>소프트웨어에 관심이 많은 학생</strong>들을 선별하여 초청합니다.
        <br />
        동기 및 선배들과의 만남을 통해 학교 생활과 진로에 대한 생생한 이야기를
        나눠보세요
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
