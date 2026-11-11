import { route } from "../campusMap";
import { event } from "../data";
import { aboutMeters, walkMinutes } from "../lib/format";
import { CampusMap } from "./CampusMap";

// 오시는 길 섹션: 정문에서 행사장(AI·DX 센터)까지 지도
// - Fade-In 애니메이션 적용 대상(`fade-in` 클래스)
export const DirectionsSection = () => (
  <section id="directions" className="fade-in">
    <div className="container">
      <h2>오시는 길</h2>
      <p className="section-desc">
        정문에서 {event.venue}까지 {aboutMeters(route.length)}, 걸어서 {walkMinutes(route.length)}분 정도 걸려요.
      </p>

      <figure className="directions-map">
        <CampusMap />
        <figcaption>↑ 지도 위쪽이 정문에서 학교 안쪽을 바라본 방향이에요.</figcaption>
      </figure>
      <p className="directions-credit">지도 데이터: 국토교통부 건물 정보, © OpenStreetMap 기여자</p>
    </div>
  </section>
);
