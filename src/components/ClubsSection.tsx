import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";
import { clubs } from "../data";

export const ClubsSection = () => {
  // 동아리 이름들을 탭 목록으로 메모이제이션
  // → clubs 데이터 변경 없으므로 렌더링마다 새 배열 생성 방지
  const tabs = useMemo(() => clubs.map((club) => club.name), []);

  // 현재 선택된 탭(동아리) 상태
  const [active, setActive] = useState(tabs[0]);

  // 선택된 탭과 동일한 동아리 데이터 조회
  // 찾지 못하면 첫 항목을 기본값으로 사용
  const activeClub = clubs.find((club) => club.name === active) ?? clubs[0];

  return (
    <section id="clubs" className="fade-in">
      <div className="container">
        {/* 섹션 제목 및 설명 */}
        <h2>동아리 소개</h2>
        <p className="section-desc">우리학과 전공 동아리에대해 소개합니다!</p>

        {/* 탭 버튼 렌더링 */}
        <div className="club-tabs">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={tab === active ? "active" : ""}
              onClick={() => setActive(tab)} // 탭 선택 변경
            >
              {tab}
            </button>
          ))}
        </div>

        {/* 탭에 따라 변경되는 콘텐츠 영역 */}
        <div className="club-panel">
          <AnimatePresence mode="wait">
            {/* 탭 변경 시 Fade 애니메이션 적용 */}
            <motion.article
              key={activeClub.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35 }}
              className="club-panel-card"
            >
              {/* 동아리 기본 정보 */}
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

              {/* 동아리 소개 및 활동 영역 */}
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
