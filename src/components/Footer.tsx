import { event } from "../data";

export const Footer = () => (
  <footer>
    <div className="container">
      <p>{event.year} BRIDGE DAY</p>
      <a className="footer-apply" href={event.registrationUrl} target="_blank" rel="noopener noreferrer">
        참여 신청하기 →
      </a>
      <p className="sub-footer">
        문의사항이 있으시면 {event.department} 사무실 (055-751-2190 | 055-751-2199) 로
        연락주세요.
      </p>
    </div>
  </footer>
);
