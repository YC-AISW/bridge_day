import { clubs, type Club } from "../data";
import { cssVars } from "../lib/cssVars";
import { Icon } from "./Icon";
import { SectionHead } from "./SectionHead";
import "./Clubs.css";

// 로고가 없는 동아리용 기본 엠블럼 (보석 모양)
const GemEmblem = () => (
  <svg viewBox="0 0 64 64" aria-hidden="true" focusable="false">
    <defs>
      <linearGradient id="gem-fill" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#8fb2ff" />
        <stop offset="0.55" stopColor="#6a5cff" />
        <stop offset="1" stopColor="#ff7ac6" />
      </linearGradient>
    </defs>
    <path d="M20 10h24l12 14-24 30L8 24z" fill="url(#gem-fill)" />
    <path d="M8 24h48M20 10l6 14 6 30 6-30 6-14M26 24 32 10l6 14" fill="none" stroke="#fff" strokeOpacity=".55" strokeWidth="1.4" strokeLinejoin="round" />
  </svg>
);

const ClubCard = ({ club, index }: { club: Club; index: number }) => (
  <article className={`club club--${club.theme} reveal`} style={cssVars({ "--i": index })} aria-labelledby={`club-${club.theme}`}>
    <span className="club__watermark" aria-hidden="true">
      {club.name}
    </span>

    <header className="club__head">
      <div className="club__emblem">
        {club.logo ? <img src={club.logo} alt={`${club.name} 로고`} width={88} height={88} loading="lazy" /> : <GemEmblem />}
      </div>
      <div>
        <h3 className="club__name" id={`club-${club.theme}`}>
          {club.name}
        </h3>
        <p className="club__subtitle">{club.subtitle}</p>
      </div>
    </header>

    <p className="club__purpose">{club.purpose}</p>

    <div className="club__block">
      <h4 className="club__label">주요 활동</h4>
      <ul className="club__activities">
        {club.activities.map((activity) => (
          <li key={activity}>
            <Icon name="check" size={18} />
            {activity}
          </li>
        ))}
      </ul>
    </div>

    <ul className="club__tags" aria-label="키워드">
      {club.tags.map((tag) => (
        <li key={tag}>#{tag}</li>
      ))}
    </ul>

    <footer className="club__advisors">
      <span className="club__label">
        <Icon name="graduation" size={16} />
        지도교수
      </span>
      <ul>
        {club.advisors.map((name) => (
          <li key={name}>{name} 교수님</li>
        ))}
      </ul>
    </footer>
  </article>
);

export const Clubs = () => (
  <section className="section clubs" id="clubs" aria-labelledby="clubs-title">
    <div className="container">
      <SectionHead
        id="clubs-title"
        eyebrow="Major clubs"
        title={
          <>
            함께 성장하는
            <br />
            <em>전공 동아리</em>
          </>
        }
      >
        <p>우리 학과 전공 동아리에 대해 소개합니다! 입학 후 관심 있는 분야를 함께 공부하고 만들어 보세요.</p>
      </SectionHead>

      <div className="clubs__grid">
        {clubs.map((club, i) => (
          <ClubCard key={club.name} club={club} index={i} />
        ))}
      </div>
    </div>
  </section>
);
