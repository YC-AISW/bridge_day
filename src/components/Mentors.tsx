import { mentors } from "../data";
import { givenName } from "../lib/format";
import { SectionHead } from "./SectionHead";
import "./Mentors.css";

/** 포트폴리오 발표 멘토 */
export const Mentors = () => (
  <section className="section" id="mentors" aria-labelledby="mentors-title">
    <div className="container">
      <SectionHead id="mentors-title" title="멘토 소개">
        <p>포트폴리오 발표를 맡은 선배들이에요. 궁금한 건 편하게 물어보세요.</p>
      </SectionHead>

      <ul className="mentors">
        {mentors.map((mentor) => {
          const meta = [mentor.grade, mentor.interest].filter(Boolean).join(" · ");
          return (
            <li className="mentor" key={mentor.name}>
              <div className="mentor__head">
                <span className="mentor__avatar" aria-hidden="true">
                  {givenName(mentor.name)}
                </span>
                <div>
                  <h3 className="mentor__name">{mentor.name}</h3>
                  <p className={`mentor__meta${meta ? "" : " is-empty"}`}>{meta || "소개 준비 중"}</p>
                </div>
              </div>
              {mentor.stacks.length > 0 && (
                <ul className="mentor__stack" aria-label={`${mentor.name} 기술 스택`}>
                  {mentor.stacks.map((stack) => (
                    <li key={stack}>{stack}</li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  </section>
);
