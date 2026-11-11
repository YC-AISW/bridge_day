import { event, mentors, timeline } from "../data";
import { durationLabel } from "../lib/format";
import { SectionHead } from "./SectionHead";
import "./Schedule.css";

/** 타임테이블 (2025년과 같은 타임라인 모양) */
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

        <ol className="timeline">
          {timeline.map((item) => (
            <li
              key={item.start}
              className={["timeline-item", item.type === "highlight" && "highlight", item.type === "break" && "break"]
                .filter(Boolean)
                .join(" ")}
            >
              <span className="time">
                {item.start} ~ {item.end}
              </span>
              <div className="content">
                <h3>
                  {item.title} ({durationLabel(item.start, item.end)})
                </h3>
                <p>{item.description}</p>
                {item.mentors && <p className="extra">발표 · {mentors.map((mentor) => mentor.name).join(", ")}</p>}
                {item.details && <p className="extra">{item.details.join(" · ")}</p>}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};
