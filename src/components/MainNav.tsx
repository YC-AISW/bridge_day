import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "프로그램 소개", href: "#about" },
  { label: "일정 소개", href: "#schedule" },
  { label: "멘토 소개", href: "#mentors" },
  { label: "동아리 소개", href: "#clubs" },
];

type MainNavProps = {
  visible: boolean;
};

export const MainNav = ({ visible }: MainNavProps) => {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const media = window.matchMedia("(max-width: 640px)");
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!visible) {
      setOpen(false);
    }
  }, [visible]);

  useEffect(() => {
    if (!isMobile) {
      setOpen(false);
    }
  }, [isMobile]);

  return (
    <nav className={`main-nav ${visible ? "visible" : ""}`}>
      <div className="nav-inner">
        <span className="nav-logo">BRIDGE DAY</span>
        {isMobile ? (
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
          <div className="nav-links desktop">
            {navLinks.map((link) => (
              <a key={link.label} href={link.href}>
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
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
              <a key={link.label} href={link.href} onClick={() => setOpen(false)}>
                {link.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
