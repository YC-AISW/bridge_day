import { timeline } from "../data";

// 행사 일정(Time Table) 섹션
// timeline 데이터를 기반으로 일정 리스트를 타임라인 형태로 표시
export const ScheduleSection = () => (
  <section id="schedule" className="fade-in">
    <div className="container">
      {/* 섹션 제목 */}
      <h2>Time Table</h2>

      {/* 타임라인 컨텐츠 영역 */}
      <div className="timeline">
        {timeline.map((item) => (
          <div
            key={item.time}
            // highlight / break 타입에 따라 스타일 클래스 동적으로 설정
            className={[
              "timeline-item",
              item.type === "highlight" ? "highlight" : "",
              item.type === "break" ? "break" : "",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {/* 시간 정보 */}
            <span className="time">{item.time}</span>

            {/* 일정 제목 + 설명 */}
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
