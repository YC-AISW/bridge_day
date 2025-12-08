import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

// 네비게이션 메뉴 목록
const navLinks = [
  { label: "프로그램 소개", href: "#about" },
  { label: "일정 소개", href: "#schedule" },
  { label: "멘토 소개", href: "#mentors" },
  { label: "동아리 소개", href: "#clubs" },
];

type MainNavProps = {
  // Hero 영역이 화면 밖으로 나가면 true → 네비게이션 표시
  visible: boolean;
};

export const MainNav = ({ visible }: MainNavProps) => {
  // 모바일 메뉴 열림 상태
  const [open, setOpen] = useState(false);
  // 뷰포트가 모바일 사이즈인지 여부
  const [isMobile, setIsMobile] = useState(false);

  // 화면 크기 변화 감지 → 모바일 여부 업데이트
  useEffect(() => {
    if (typeof window === "undefined") return;

    const media = window.matchMedia("(max-width: 640px)");
    const update = () => setIsMobile(media.matches);

    update(); // 초기값 설정
    media.addEventListener("change", update);

    return () => media.removeEventListener("change", update);
  }, []);

  // 네비게이션이 보이지 않는 상태라면 메뉴 자동으로 닫기
  useEffect(() => {
    if (!visible) setOpen(false);
  }, [visible]);

  // 데스크톱으로 전환되면 메뉴 강제 닫기
  useEffect(() => {
    if (!isMobile) setOpen(false);
  }, [isMobile]);

  return (
    <nav className={`main-nav ${visible ? "visible" : ""}`}>
      <div className="nav-inner">
        <span className="nav-logo">BRIDGE DAY</span>

        {/* 모바일 버튼 or 데스크탑 링크 표시 */}
        {isMobile ? (
          // 햄버거 버튼 (Framer Motion으로 tap 애니메이션)
          <motion.button
            className={`nav-toggle ${open ? "active" : ""}`}
            aria-label="메뉴 열기"
            aria-expanded={open}
            onClick={() => setOpen((prev) => !prev)}
            whileTap={{ scale: 0.95 }}
          >
            <span />
            <span />
            <span />
          </motion.button>
        ) : (
          // 데스크탑 네비게이션 링크들
          <div className="nav-links desktop">
            {navLinks.map((link) => (
              <a key={link.label} href={link.href}>
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>

      {/* 모바일 메뉴 (애니메이션 등장/사라짐) */}
      <AnimatePresence>
        {isMobile && open && (
          <motion.div
            className="nav-links mobile"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
