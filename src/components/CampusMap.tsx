import { MAP_HEIGHT, MAP_WIDTH, buildings, destinationCenter, greens, labels, roads, route, stops } from "../campusMap";
import "./CampusMap.css";

const PAD = 10;

/**
 * 정문 → AI·DX 센터 지도 (위쪽 = 학교 안쪽/서쪽, 오른쪽 = 북쪽).
 * 정문에서 이어지는 길과 목적지만 표시해요.
 */
export const CampusMap = () => {
  const [destX, destY] = destinationCenter;
  const [gateX, gateY] = stops[0].point;

  return (
    <svg
      className="campus-map"
      viewBox={`${-PAD} ${-PAD} ${MAP_WIDTH + PAD * 2} ${MAP_HEIGHT + PAD * 2}`}
      role="img"
      aria-labelledby="campus-map-title campus-map-desc"
    >
      <title id="campus-map-title">정문에서 AI·DX 센터까지 가는 길 지도</title>
      <desc id="campus-map-desc">
        정문으로 들어와 오르막길을 따라 직진하다가 연암미래관 앞 갈림길에서 오른쪽으로 갑니다. 체육관(인화관) 앞에서
        왼쪽으로 꺾어 산학협동관을 지나면 바로 다음 건물이 AI·DX 센터입니다.
      </desc>

      <defs>
        <pattern id="map-grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M20 0H0V20" fill="none" stroke="rgba(255,255,255,0.035)" strokeWidth="0.6" />
        </pattern>
      </defs>

      <rect x={-PAD} y={-PAD} width={MAP_WIDTH + PAD * 2} height={MAP_HEIGHT + PAD * 2} fill="url(#map-grid)" />

      <g>
        {greens.map((green, i) => (
          <path key={i} className={`map-green map-green--${green.kind}`} d={green.d} />
        ))}
      </g>

      <g className="campus-map__roads">
        {roads.map((road, i) => (
          <path key={i} d={road.d} strokeWidth={road.w} />
        ))}
      </g>

      <g>
        {buildings.map((building) => (
          <path key={building.name} className={`map-building map-building--${building.kind}`} d={building.d} />
        ))}
      </g>

      {/* 정문에서 목적지까지 가는 길 */}
      <path className="map-route-glow" d={route.d} />
      <path className="map-route" d={route.d} />

      {/* 정문 */}
      <circle className="map-start" cx={gateX} cy={gateY} r="5" />

      <g>
        {labels.map((label) =>
          label.kind === "gate" ? (
            <g key={label.text} className="map-gate-label" transform={`translate(${label.x} ${label.y})`}>
              <rect x="-19" y="-9.5" width="38" height="19" rx="9.5" />
              <text dominantBaseline="central" textAnchor="middle">
                {label.text}
              </text>
            </g>
          ) : (
            <text
              key={label.text}
              className={`map-label map-label--${label.kind}`}
              x={label.x}
              y={label.y}
              textAnchor="middle"
              dominantBaseline="central"
            >
              {label.text}
            </text>
          )
        )}
      </g>

      {/* 목적지 표시 */}
      <g className="map-dest" transform={`translate(${destX} ${destY})`}>
        <circle className="map-dest__ring" r="24" />
        <g transform="translate(0 -34)">
          <path className="map-dest__pin" d="M-46 -12h92a6 6 0 0 1 6 6v12a6 6 0 0 1-6 6H6l-6 7-6-7h-40a6 6 0 0 1-6-6v-12a6 6 0 0 1 6-6z" />
          <text dominantBaseline="central" textAnchor="middle">
            AI·DX 센터 1층
          </text>
        </g>
      </g>

      {/* 방위 · 축척 */}
      <g className="map-compass" transform={`translate(${MAP_WIDTH - 16} 16)`}>
        <circle r="14" />
        <path d="M-7 0H7M2.5-4.5 7 0 2.5 4.5" />
        <text x="0" y="25" textAnchor="middle">
          북쪽
        </text>
      </g>
      <g className="map-scale" transform={`translate(4 ${MAP_HEIGHT - 4})`}>
        <path d="M0-4V0H50V-4" />
        <text x="25" y="-9" textAnchor="middle">
          50m
        </text>
      </g>
    </svg>
  );
};
