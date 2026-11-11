import { event } from "../data";
import { ddayLabel, formatDate } from "../lib/format";
import { BridgeArt } from "./BridgeArt";
import { Icon } from "./Icon";
import { SchoolMark } from "./SchoolMark";
import "./Hero.css";

/** 첫 화면: 연암공과대학교에서 보내는 초대장 */
export const Hero = () => {
  const date = formatDate(event.date);
  const dday = ddayLabel(event.date);

  return (
    <header className="hero" id="top">
      <div className="container">
        <article className="invite" aria-labelledby="invite-title">
          <p className="invite__from">
            <SchoolMark size={30} />
            {event.school}
          </p>

          <p className="invite__eyebrow">Invitation</p>
          <h1 className="invite__title" id="invite-title">
            <span className="invite__year">{event.year}</span> BRIDGE <em>DAY</em>
          </h1>
          <p className="invite__lead">
            소프트웨어 인재를 위한 특별한 만남의 장에
            <br />
            여러분을 초대합니다.
          </p>

          <dl className="invite__facts">
            <div>
              <dt>
                <Icon name="calendar" size={18} />
                일시
              </dt>
              <dd>
                {date ?? "날짜 추후 공지"} · {event.startTime} – {event.endTime}
                {dday && <span className="invite__dday">{dday}</span>}
              </dd>
            </div>
            <div>
              <dt>
                <Icon name="pin" size={18} />
                장소
              </dt>
              <dd>
                {event.venue}
                <span className="invite__sub">{event.school}</span>
              </dd>
            </div>
          </dl>

          <div className="invite__cta">
            <a className="invite__btn invite__btn--primary" href="#directions">
              오시는 길
              <Icon name="arrowRight" size={18} />
            </a>
            <a className="invite__btn" href="#schedule">
              일정 보기
            </a>
          </div>

          <BridgeArt className="invite__bridge" />
        </article>
      </div>
    </header>
  );
};
