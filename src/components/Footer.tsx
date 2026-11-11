import { event } from "../data";
import { Icon } from "./Icon";
import "./Footer.css";

/** 문의처 · 주소 */
export const Footer = () => (
  <footer className="footer">
    <div className="container footer__inner">
      <div>
        <p className="footer__title">
          {event.year} BRIDGE DAY
        </p>
        <p className="footer__text">문의사항이 있으시면 학과 사무실로 연락 주세요.</p>
      </div>

      <ul className="footer__contacts">
        {event.contacts.map((phone) => (
          <li key={phone}>
            <a href={`tel:${phone.replace(/-/g, "")}`}>
              <Icon name="phone" size={16} />
              {phone}
            </a>
          </li>
        ))}
      </ul>

      <div className="footer__bottom">
        <span>
          ({event.postalCode}) {event.address} {event.school}
        </span>
        <a href="#top">
          맨 위로
          <Icon name="arrowUp" size={14} />
        </a>
      </div>
    </div>
  </footer>
);
