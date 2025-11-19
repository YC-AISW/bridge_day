import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";
import { clubs } from "../data";

export const ClubsSection = () => {
  const tabs = useMemo(() => clubs.map((club) => club.name), []);
  const [active, setActive] = useState(tabs[0]);
  const activeClub = clubs.find((club) => club.name === active) ?? clubs[0];

  return (
    <section id="clubs" className="fade-in">
      <div className="container">
        <h2>동아리 소개</h2>
        <p className="section-desc">우리학과 전공 동아리에대해 소개합니다!</p>
        <div className="club-tabs">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={tab === active ? "active" : ""}
              onClick={() => setActive(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="club-panel">
          <AnimatePresence mode="wait">
            <motion.article
              key={activeClub.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35 }}
              className="club-panel-card"
            >
              <header>
                <div className="club-heading">
                  <div>
                    <h3>{activeClub.name}</h3>
                    <span className="club-advisor">
                      지도교수 {activeClub.advisor}
                    </span>
                  </div>
                  <p className="club-leader">동아리장 {activeClub.leader}</p>
                </div>
              </header>
              <div className="club-info">
                <div>
                  <h4>동아리 소개</h4>
                  <p>{activeClub.intro}</p>
                </div>
                <div>
                  <h4>활동 소개</h4>
                  <p>{activeClub.activity}</p>
                </div>
              </div>
            </motion.article>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
