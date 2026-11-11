import { useEffect, useState } from "react";

// 오른쪽 세로 점 내비게이션 (섹션 바로가기)
const SECTIONS = [
  { id: "top", label: "홈" },
  { id: "about", label: "소개" },
  { id: "schedule", label: "일정" },
  { id: "mentors", label: "멘토" },
  { id: "clubs", label: "동아리" },
  { id: "directions", label: "오시는 길" },
];

const Arrow = ({ up }: { up?: boolean }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={up ? "M12 19V5M6 11l6-6 6 6" : "M12 5v14M6 13l6 6 6-6"} />
  </svg>
);

export const SideNav = () => {
  const [active, setActive] = useState(0);

  // 화면 가운데를 지나는 섹션을 현재 섹션으로
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const index = SECTIONS.findIndex((section) => section.id === entry.target.id);
          if (index >= 0) setActive(index);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const go = (index: number) => {
    const target = SECTIONS[index];
    if (target) document.getElementById(target.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav className="side-nav" aria-label="섹션 바로가기">
      <button type="button" className="side-nav__arrow" onClick={() => go(active - 1)} disabled={active === 0} aria-label="이전 섹션">
        <Arrow up />
      </button>
      <ol className="side-nav__dots">
        {SECTIONS.map((section, i) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              className={`side-nav__link${i === active ? " is-active" : ""}`}
              aria-current={i === active ? "location" : undefined}
            >
              <span className="side-nav__label">{section.label}</span>
              <span className="side-nav__dot" aria-hidden="true" />
            </a>
          </li>
        ))}
      </ol>
      <button
        type="button"
        className="side-nav__arrow"
        onClick={() => go(active + 1)}
        disabled={active === SECTIONS.length - 1}
        aria-label="다음 섹션"
      >
        <Arrow />
      </button>
    </nav>
  );
};
