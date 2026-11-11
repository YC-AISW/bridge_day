import { features, type Feature } from "../data";
import { Icon, type IconName } from "./Icon";
import { SectionHead } from "./SectionHead";
import "./About.css";

const FEATURE_ICON: Record<Feature["key"], IconName> = {
  network: "users",
  lunch: "gift",
  mentor: "mic",
  experience: "sparkles",
};

/** 행사 소개 */
export const About = () => (
  <section className="section" id="about" aria-labelledby="about-title">
    <div className="container">
      <SectionHead id="about-title" title="행사 소개">
        <p>
          <strong>소프트웨어에 관심이 많은 학생</strong>들을 선별하여 초청합니다. 동기 및 선배들과의 만남을 통해 학교
          생활과 진로에 대한 생생한 이야기를 나눠보세요.
        </p>
      </SectionHead>

      <ul className="features">
        {features.map((feature) => (
          <li className="feature" key={feature.key}>
            <span className="feature__icon">
              <Icon name={FEATURE_ICON[feature.key]} size={22} />
            </span>
            <div>
              <h3 className="feature__title">{feature.title}</h3>
              <p className="feature__text">{feature.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </section>
);
