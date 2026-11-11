import { route } from "../campusMap";
import { event } from "../data";
import { aboutMeters, walkMinutes } from "../lib/format";
import { CampusMap } from "./CampusMap";
import { Icon } from "./Icon";
import { SectionHead } from "./SectionHead";
import "./Directions.css";

/** 오시는 길: 정문에서 목적지까지 지도 한 장 */
export const Directions = () => (
  <section className="section" id="directions" aria-labelledby="directions-title">
    <div className="container">
      <SectionHead id="directions-title" title="오시는 길">
        <p>
          정문에서 <strong>{event.venue}</strong>까지 {aboutMeters(route.length)}, 걸어서 {walkMinutes(route.length)}분 정도
          걸려요.
        </p>
      </SectionHead>

      <figure className="map-card">
        <CampusMap />
        <figcaption className="map-card__note">
          <Icon name="arrowUp" size={14} />
          지도 위쪽이 정문에서 학교 안쪽을 바라본 방향이에요.
        </figcaption>
      </figure>
      <p className="map-card__credit">지도 데이터: 국토교통부 건물 정보, © OpenStreetMap 기여자</p>
    </div>
  </section>
);
