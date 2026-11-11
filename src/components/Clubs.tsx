import { clubs } from "../data";
import { SectionHead } from "./SectionHead";
import "./Clubs.css";

// 로고가 없는 동아리용 기본 엠블럼 (보석 모양)
const GemEmblem = () => (
  <svg viewBox="0 0 64 64" aria-hidden="true" focusable="false">
    <path d="M20 10h24l12 14-24 30L8 24z" fill="#6a5cff" />
    <path d="M8 24h48M20 10l6 14 6 30 6-30 6-14M26 24 32 10l6 14" fill="none" stroke="#fff" strokeOpacity=".55" strokeWidth="1.6" strokeLinejoin="round" />
  </svg>
);

/** 전공 동아리: 소개 · 주요 활동 · 지도교수를 표처럼 */
export const Clubs = () => (
  <section className="section section--alt" id="clubs" aria-labelledby="clubs-title">
    <div className="container">
      <SectionHead id="clubs-title" title="전공 동아리">
        <p>우리 학과 전공 동아리를 소개합니다.</p>
      </SectionHead>

      <div className="clubs">
        {clubs.map((club, i) => (
          <article className="club" key={club.name} aria-labelledby={`club-${i}`}>
            <header className="club__head">
              <div className="club__logo">
                {club.logo ? <img src={club.logo} alt="" width={64} height={64} loading="lazy" /> : <GemEmblem />}
              </div>
              <div>
                <h3 className="club__name" id={`club-${i}`}>
                  {club.name}
                </h3>
                <p className="club__subtitle">{club.subtitle}</p>
              </div>
            </header>

            <dl className="club__info">
              <div>
                <dt>소개</dt>
                <dd>{club.purpose}</dd>
              </div>
              <div>
                <dt>주요 활동</dt>
                <dd>
                  <ul className="club__activities">
                    {club.activities.map((activity) => (
                      <li key={activity}>{activity}</li>
                    ))}
                  </ul>
                </dd>
              </div>
              <div>
                <dt>지도교수</dt>
                <dd>{club.advisors.map((name) => `${name} 교수님`).join(", ")}</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
    </div>
  </section>
);
