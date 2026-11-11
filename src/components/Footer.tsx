import { event } from "../data";
import { formatDate } from "../lib/format";
import { Icon } from "./Icon";
import "./Footer.css";

export const Footer = () => {
  const date = formatDate(event.date);

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__cta reveal">
          <p className="eyebrow">See you at</p>
          <p className="footer__title">
            BRIDGE DAY <span>{event.year}</span>
          </p>
          <p className="footer__when">
            {date ? `${date} ${event.startTime}` : `${event.startTime} 시작 · 날짜 추후 공지`} · {event.venue}
          </p>
          <a className="btn btn--primary" href="#directions">
            오시는 길 다시 보기
            <Icon name="arrowRight" size={18} />
          </a>
        </div>

        <div className="footer__contact">
          <p>문의사항이 있으시면 학과 사무실로 연락 주세요.</p>
          <ul>
            {event.contacts.map((phone) => (
              <li key={phone}>
                <a href={`tel:${phone.replace(/-/g, "")}`}>
                  <Icon name="phone" size={16} />
                  {phone}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__bottom">
          <span>
            © {event.year} BRIDGE DAY · {event.school}
          </span>
          <a href="#top">
            맨 위로
            <Icon name="arrowUp" size={14} />
          </a>
        </div>
      </div>
    </footer>
  );
};
