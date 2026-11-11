import { event, mentors, timeline } from "../data";
import { durationLabel } from "../lib/format";
import { SectionHead } from "./SectionHead";
import "./Schedule.css";

/** 타임테이블: 시간 | 내용 */
export const Schedule = () => {
  const first = timeline[0];
  const last = timeline[timeline.length - 1];

  return (
    <section className="section section--alt" id="schedule" aria-labelledby="schedule-title">
      <div className="container">
        <SectionHead id="schedule-title" title="일정">
          <p>
            {first.start} – {last.end} · {event.venue}
          </p>
        </SectionHead>

        <ol className="schedule">
          {timeline.map((item) => (
            <li key={item.start} className={`schedule__item${item.type ? ` schedule__item--${item.type}` : ""}`}>
              <p className="schedule__time">
                <time>{item.start}</time> – <time>{item.end}</time>
              </p>
              <div className="schedule__body">
                <h3 className="schedule__title">
                  {item.title}
                  <span className="schedule__duration">{durationLabel(item.start, item.end)}</span>
                </h3>
                <p className="schedule__text">{item.description}</p>
                {item.mentors && (
                  <p className="schedule__extra">
                    <span>발표</span>
                    {mentors.map((mentor) => mentor.name).join(" · ")}
                  </p>
                )}
                {item.details && (
                  <ul className="schedule__details">
                    {item.details.map((detail) => (
                      <li key={detail}>{detail}</li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};
