import { useEffect, useRef } from "react";
import { mentors, timeline, type TimelineItem } from "../data";
import { cssVars } from "../lib/cssVars";
import { durationLabel, givenName } from "../lib/format";
import { Icon } from "./Icon";
import { SectionHead } from "./SectionHead";
import "./Schedule.css";

const Slot = ({ item, index }: { item: TimelineItem; index: number }) => (
  <li className={`slot${item.type ? ` slot--${item.type}` : ""}`}>
    <div className="slot__time">
      <time>{item.start}</time>
      <span>~ {item.end}</span>
    </div>
    <span className="slot__dot" aria-hidden="true">
      {item.type === "highlight" && <Icon name="star" size={12} />}
    </span>
    <article className="slot__card reveal" style={cssVars({ "--i": index % 2 })}>
      <header className="slot__head">
        {item.type === "break" && <Icon name="coffee" size={18} className="slot__break-icon" />}
        <h3 className="slot__title">{item.title}</h3>
        <span className="slot__duration">{durationLabel(item.start, item.end)}</span>
      </header>
      <p className="slot__text">{item.description}</p>

      {item.mentors && (
        <ul className="slot__mentors" aria-label="발표하는 선배">
          {mentors.map((mentor) => (
            <li key={mentor.name}>
              <span className="slot__avatar" aria-hidden="true">
                {givenName(mentor.name)}
              </span>
              {mentor.name}
            </li>
          ))}
        </ul>
      )}

      {item.details && (
        <ul className="slot__details">
          {item.details.map((detail, i) => (
            <li key={detail}>
              <Icon name={i === 0 ? "building" : "code"} size={20} />
              {detail}
            </li>
          ))}
        </ul>
      )}
    </article>
  </li>
);

export const Schedule = () => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);
  const first = timeline[0];
  const last = timeline[timeline.length - 1];

  // 스크롤 위치에 맞춰 세로선을 채우고, 지나간 일정의 점을 켜요.
  // 위치는 한꺼번에 읽고 나서 바꿔요 (읽기·쓰기를 섞으면 매번 레이아웃을 다시 계산해서 버벅여요).
  useEffect(() => {
    const wrap = wrapRef.current;
    const fill = fillRef.current;
    if (!wrap || !fill) return;
    const slots = [...wrap.querySelectorAll<HTMLElement>(".slot")];
    const dots = slots.map((slot) => slot.querySelector<HTMLElement>(".slot__dot") ?? slot);
    let frame = 0;
    let shown = -1;

    const update = () => {
      frame = 0;
      const rect = wrap.getBoundingClientRect();
      if (rect.bottom < -300 || rect.top > window.innerHeight + 300) return;
      const anchor = window.innerHeight * 0.62;
      const tops = dots.map((dot) => dot.getBoundingClientRect().top);

      const value = Math.min(1, Math.max(0, (anchor - rect.top) / rect.height));
      if (Math.abs(value - shown) > 0.002) {
        fill.style.transform = `scaleY(${value.toFixed(4)})`;
        shown = value;
      }
      slots.forEach((slot, i) => slot.classList.toggle("is-past", tops[i] < anchor));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section className="section schedule" id="schedule" aria-labelledby="schedule-title">
      <div className="container">
        <SectionHead
          id="schedule-title"
          eyebrow="Time table"
          title={
            <>
              <em>
                {first.start} – {last.end}
              </em>
              <br />
              알차게 채운 하루
            </>
          }
        >
          <p>점심식사부터 선배들의 이야기, 체험까지. 하루 일정을 한눈에 확인하세요.</p>
        </SectionHead>

        <div className="timeline" ref={wrapRef}>
          <span className="timeline__rail" aria-hidden="true" />
          <span className="timeline__fill" ref={fillRef} aria-hidden="true" />
          <ol className="timeline__list">
            {timeline.map((item, i) => (
              <Slot key={item.start} item={item} index={i} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};
