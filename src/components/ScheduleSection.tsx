import { timeline } from "../data";

export const ScheduleSection = () => (
  <section id="schedule" className="fade-in">
    <div className="container">
      <h2>Time Table</h2>
      <div className="timeline">
        {timeline.map((item) => (
          <div
            key={item.time}
            className={[
              "timeline-item",
              item.type === "highlight" ? "highlight" : "",
              item.type === "break" ? "break" : "",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            <span className="time">{item.time}</span>
            <div className="content">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

