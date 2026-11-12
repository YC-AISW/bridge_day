import { useEffect, useState } from "react";
import { event } from "../data";
import { formatDate } from "../lib/format";

// 신청서 아이콘 (선 아이콘)
export const ApplyIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M9 3.5h6a1 1 0 0 1 1 1V6H8V4.5a1 1 0 0 1 1-1z" />
    <path d="M8 5H6.5A1.5 1.5 0 0 0 5 6.5v13A1.5 1.5 0 0 0 6.5 21h11a1.5 1.5 0 0 0 1.5-1.5v-13A1.5 1.5 0 0 0 17.5 5H16" />
    <path d="M9 12.5l2 2 4-4.5" />
  </svg>
);

const Arrow = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

/**
 * 화면 아래에 떠 있는 참여 신청 버튼
 * - 첫 화면의 신청 버튼이나 맨 아래 푸터의 신청 버튼이 보이는 동안에는 숨겨요 (같은 버튼이 이미 보이니까).
 */
export const ApplyBar = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const heroCta = document.querySelector(".hero-cta");
    const footer = document.querySelector(".footer-apply");
    if (!heroCta || !footer) return;
    const visible = new Map<Element, boolean>([
      [heroCta, true],
      [footer, false],
    ]);
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) visible.set(entry.target, entry.isIntersecting);
      setShow(!visible.get(heroCta) && !visible.get(footer));
    });
    observer.observe(heroCta);
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  const date = formatDate(event.date);

  return (
    <a
      className={`apply-bar${show ? " is-visible" : ""}`}
      href={event.registrationUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-hidden={!show}
      tabIndex={show ? 0 : -1}
    >
      <span className="apply-bar__icon">
        <ApplyIcon />
      </span>
      <span className="apply-bar__text">
        <strong>BRIDGE DAY 참여 신청하기</strong>
        <small>
          {date ? `${date} ${event.startTime}` : event.startTime} · {event.venue}
        </small>
      </span>
      <span className="apply-bar__arrow">
        <Arrow />
      </span>
    </a>
  );
};
