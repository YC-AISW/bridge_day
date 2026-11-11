import { clubs, features, mentors, timeline, type Feature } from "../data";
import { useSpotlight } from "../hooks/usePointerFx";
import { cssVars } from "../lib/cssVars";
import { toMinutes } from "../lib/format";
import { Icon, type IconName } from "./Icon";
import { SectionHead } from "./SectionHead";
import "./About.css";

const FEATURE_ICON: Record<Feature["key"], IconName> = {
  network: "users",
  lunch: "gift",
  mentor: "mic",
  experience: "sparkles",
};

/** 숫자가 0부터 굴러 올라가는 카운터 (한 자리 수) */
const Roll = ({ value }: { value: number }) =>
  value > 9 ? (
    <span>{value}</span>
  ) : (
    <span className="roll" aria-hidden="true">
      <span className="roll__strip" style={cssVars({ "--n": value })}>
        {Array.from({ length: value + 1 }, (_, i) => (
          <span key={i}>{i}</span>
        ))}
      </span>
    </span>
  );

export const About = () => {
  const spotlightRef = useSpotlight<HTMLUListElement>(".bento__card");
  const hours = Math.round((toMinutes(timeline[timeline.length - 1].end) - toMinutes(timeline[0].start)) / 60);

  const stats = [
    { value: hours, unit: "시간", label: "점심부터 체험까지" },
    { value: mentors.length, unit: "명", label: "포트폴리오 발표 선배" },
    { value: clubs.length, unit: "곳", label: "전공 동아리 소개" },
  ];

  return (
    <section className="section about" id="about" aria-labelledby="about-title">
      <div className="container">
        <SectionHead
          id="about-title"
          eyebrow="About the event"
          title={
            <>
              선배와 동기를
              <br />
              <em>먼저 만나는 하루</em>
            </>
          }
        >
          <p>
            <strong>소프트웨어에 관심이 많은 학생</strong>들을 선별하여 초청합니다. 동기 및 선배들과의 만남을 통해 학교
            생활과 진로에 대한 생생한 이야기를 나눠보세요.
          </p>
        </SectionHead>

        <ul className="about__stats">
          {stats.map((stat, i) => (
            <li className="about__stat reveal" key={stat.unit} style={cssVars({ "--i": i })}>
              <p className="about__stat-value">
                <span className="sr-only">
                  {stat.value}
                  {stat.unit}
                </span>
                <Roll value={stat.value} />
                <span className="about__stat-unit" aria-hidden="true">
                  {stat.unit}
                </span>
              </p>
              <p className="about__stat-label">{stat.label}</p>
            </li>
          ))}
        </ul>

        <ul className="bento" ref={spotlightRef}>
          {features.map((feature, i) => (
            <li
              key={feature.key}
              className={`bento__card bento__card--${feature.key} reveal`}
              style={cssVars({ "--i": i })}
            >
              <span className="bento__icon">
                <Icon name={FEATURE_ICON[feature.key]} size={26} />
              </span>
              <h3 className="bento__title">{feature.title}</h3>
              <p className="bento__text">{feature.description}</p>
              <Icon className="bento__watermark" name={FEATURE_ICON[feature.key]} size={180} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
