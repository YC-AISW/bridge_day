import { event } from "../data";
import { ddayLabel, formatDate } from "../lib/format";
import { BridgeArt } from "./BridgeArt";
import { Icon } from "./Icon";
import "./Hero.css";

/** 첫 화면: 행사명 · 일시 · 장소 */
export const Hero = () => {
  const date = formatDate(event.date);
  const dday = ddayLabel(event.date);

  return (
    <header className="hero" id="top">
      <div className="container hero__inner">
        <p className="hero__badge">Special Invitation</p>
        <h1 className="hero__title">
          <span className="hero__year">{event.year}</span> BRIDGE <em>DAY</em>
        </h1>
        <p className="hero__subtitle">소프트웨어 인재를 위한 특별한 만남의 장</p>

        <dl className="hero__facts">
          <div>
            <dt>
              <Icon name="calendar" size={18} />
              일시
            </dt>
            <dd>
              {date ?? "날짜 추후 공지"} · {event.startTime} – {event.endTime}
              {dday && <span className="hero__dday">{dday}</span>}
            </dd>
          </div>
          <div>
            <dt>
              <Icon name="pin" size={18} />
              장소
            </dt>
            <dd>
              {event.venue}
              <span className="hero__school">{event.school}</span>
            </dd>
          </div>
        </dl>

        <div className="hero__cta">
          <a className="btn btn--primary" href="#directions">
            오시는 길
            <Icon name="arrowRight" size={18} />
          </a>
          <a className="btn" href="#schedule">
            일정 보기
          </a>
        </div>
      </div>

      <BridgeArt />
    </header>
  );
};
