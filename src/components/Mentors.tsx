import { mentors, type Mentor } from "../data";
import { useTilt } from "../hooks/usePointerFx";
import { cssVars } from "../lib/cssVars";
import { givenName } from "../lib/format";
import { Icon } from "./Icon";
import { SectionHead } from "./SectionHead";
import "./Mentors.css";

// 기술 스택 점 색상 (공식 브랜드 색을 어두운 배경에서 잘 보이게 조정)
const STACK_COLORS: Record<string, string> = {
  React: "#61dafb",
  "React Native": "#61dafb",
  "Next.js": "#ffffff",
  Vue: "#42b883",
  JavaScript: "#f7df1e",
  TypeScript: "#4a8fe0",
  TailwindCSS: "#38bdf8",
  MUI: "#2a8cff",
  "Node.js": "#6cc24a",
  NestJS: "#e0234e",
  Python: "#ffd43b",
  FastAPI: "#11b5a4",
  Django: "#44b78b",
  Java: "#f89820",
  Spring: "#6db33f",
  "Spring Boot": "#6db33f",
  Kotlin: "#a97bff",
  Swift: "#f05138",
  Flutter: "#54c5f8",
  Dart: "#13b9fd",
  C: "#a8b9cc",
  "C++": "#659ad2",
  "C#": "#b376e0",
  Go: "#00add8",
  MySQL: "#f29111",
  PostgreSQL: "#699eca",
  MongoDB: "#47a248",
  Docker: "#2496ed",
  AWS: "#ff9900",
  Git: "#f05032",
  Figma: "#f24e1e",
  Unity: "#ffffff",
};

const HUES = [214, 268, 166];

const MentorCard = ({ mentor, index }: { mentor: Mentor; index: number }) => {
  const tiltRef = useTilt<HTMLDivElement>();

  return (
    <li className="mentor reveal" style={cssVars({ "--i": index, "--hue": HUES[index % HUES.length] })}>
      <div className="mentor__card" ref={tiltRef}>
        <span className="mentor__holo" aria-hidden="true" />
        <span className="mentor__glare" aria-hidden="true" />

        <div className="mentor__top">
          <span className="mentor__no">{String(index + 1).padStart(2, "0")}</span>
          <span className="mentor__role">
            <Icon name="mic" size={14} />
            포트폴리오 발표
          </span>
        </div>

        <div className="mentor__avatar" aria-hidden="true">
          <span>{givenName(mentor.name)}</span>
        </div>

        <div className="mentor__id">
          {mentor.grade && <span className="mentor__grade">{mentor.grade}</span>}
          <h3 className="mentor__name">{mentor.name}</h3>
          <p className={`mentor__interest${mentor.interest ? "" : " is-empty"}`}>{mentor.interest || "소개 준비 중"}</p>
        </div>

        <div className="mentor__stack">
          <p className="mentor__label">Stack</p>
          {mentor.stacks.length > 0 ? (
            <ul>
              {mentor.stacks.map((stack) => (
                <li key={stack} style={cssVars({ "--c": STACK_COLORS[stack] ?? "#9aa6c4" })}>
                  {stack}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mentor__soon">곧 공개돼요</p>
          )}
        </div>
      </div>
    </li>
  );
};

export const Mentors = () => (
  <section className="section mentors" id="mentors" aria-labelledby="mentors-title">
    <div className="container">
      <SectionHead
        id="mentors-title"
        eyebrow="Meet your mentors"
        title={
          <>
            먼저 걸어간 선배들이
            <br />
            <em>길을 알려줄게요</em>
          </>
        }
      >
        <p>포트폴리오 발표를 맡은 든든한 선배들이에요. 궁금한 건 무엇이든 편하게 물어보세요!</p>
      </SectionHead>

      <ul className="mentors__grid">
        {mentors.map((mentor, i) => (
          <MentorCard key={mentor.name} mentor={mentor} index={i} />
        ))}
      </ul>
    </div>
  </section>
);
