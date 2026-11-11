import { event } from "../data";
import { cssVars } from "../lib/cssVars";
import { ddayLabel, formatDate } from "../lib/format";
import { BridgeArt } from "./BridgeArt";
import { Icon } from "./Icon";
import "./Hero.css";

// 글자를 한 자씩 나눠 순서대로 떠오르게 해요.
const SplitWord = ({ text, offset }: { text: string; offset: number }) => (
  <span className="hero__word" aria-hidden="true">
    {[...text].map((char, i) => (
      <span className="hero__char" style={cssVars({ "--i": offset + i })} key={i}>
        {char}
      </span>
    ))}
  </span>
);

/** 첫 화면: 행사명 · 날짜 · 장소 */
export const Hero = () => {
  const date = formatDate(event.date);
  const dday = ddayLabel(event.date);

  return (
    <header className="hero" id="top">
      <div className="hero__bg" aria-hidden="true">
        <span className="hero__aurora hero__aurora--1" />
        <span className="hero__aurora hero__aurora--2" />
        <span className="hero__aurora hero__aurora--3" />
        <span className="hero__stars" />
        <span className="hero__stars hero__stars--far" />
      </div>

      <div className="hero__inner container">
        <p className="hero__badge">
          <span className="hero__badge-dot" aria-hidden="true" />
          Special Invitation
        </p>

        <h1 className="hero__title">
          <span className="sr-only">{event.year} BRIDGE DAY</span>
          <span className="hero__year" aria-hidden="true">
            {event.year}
          </span>
          <SplitWord text="BRIDGE" offset={0} />
          <SplitWord text="DAY" offset={6} />
        </h1>

        <p className="hero__subtitle">
          소프트웨어 인재를 위한 <strong>특별한 만남의 장</strong>
        </p>

        <ul className="hero__meta">
          <li>
            <Icon name="calendar" />
            {date ?? "날짜 추후 공지"}
            {dday && <span className="hero__dday">{dday}</span>}
          </li>
          <li>
            <Icon name="clock" />
            {event.startTime} – {event.endTime}
          </li>
          <li>
            <Icon name="pin" />
            {event.venue}
          </li>
        </ul>

        <div className="hero__cta">
          <a className="btn btn--primary" href="#directions">
            오시는 길 보기
            <Icon name="arrowRight" size={18} />
          </a>
          <a className="btn btn--ghost" href="#schedule">
            일정 보기
          </a>
        </div>
      </div>

      <BridgeArt />

      <a className="hero__scroll" href="#about" aria-label="아래로 스크롤해서 행사 소개 보기">
        <span>SCROLL</span>
        <i aria-hidden="true" />
      </a>
    </header>
  );
};
