import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Icon, type IconName } from "./Icon";
import "./SiteNav.css";

const LINKS: { id: string; label: string; icon: IconName }[] = [
  { id: "about", label: "소개", icon: "sparkles" },
  { id: "schedule", label: "일정", icon: "clock" },
  { id: "mentors", label: "멘토", icon: "users" },
  { id: "clubs", label: "동아리", icon: "code" },
  { id: "directions", label: "오시는 길", icon: "pin" },
];

/**
 * 섹션 바로가기 메뉴
 * - Hero 가 화면에서 거의 사라지면 나타나요 (키보드로 포커스해도 나타남).
 * - 지금 보고 있는 섹션을 표시하는 알약 모양이 따라 움직여요.
 */
export const SiteNav = () => {
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState("");
  const listRef = useRef<HTMLUListElement>(null);

  // Hero 가 65% 이상 지나가면 메뉴 표시
  useEffect(() => {
    const hero = document.getElementById("top");
    if (!hero) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.intersectionRatio < 0.35), {
      threshold: [0, 0.35, 1],
    });
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  // 화면 가운데를 지나는 섹션을 현재 섹션으로
  useEffect(() => {
    const sections = LINKS.map((link) => document.getElementById(link.id)).filter(
      (el): el is HTMLElement => el !== null
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // 알약 위치 계산
  useLayoutEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const place = () => {
      const link = list.querySelector<HTMLElement>(`[data-id="${active}"]`);
      list.classList.toggle("has-active", Boolean(link));
      if (!link) return;
      list.style.setProperty("--x", `${link.offsetLeft}px`);
      list.style.setProperty("--w", `${link.offsetWidth}px`);
    };
    place();
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, [active]);

  return (
    <nav className={`site-nav${visible ? " is-visible" : ""}`} aria-label="섹션 바로가기">
      <a className="site-nav__logo" href="#top">
        <span className="site-nav__mark" aria-hidden="true" />
        BRIDGE DAY
      </a>
      <ul className="site-nav__list" ref={listRef}>
        {LINKS.map((link) => (
          <li key={link.id}>
            <a
              href={`#${link.id}`}
              data-id={link.id}
              className={active === link.id ? "is-active" : undefined}
              aria-current={active === link.id ? "location" : undefined}
            >
              <Icon name={link.icon} size={18} />
              <span>{link.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
