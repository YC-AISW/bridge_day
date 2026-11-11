import { forwardRef, useCallback, useEffect, useImperativeHandle, useLayoutEffect, useRef } from "react";
import {
  MAP_HEIGHT,
  MAP_WIDTH,
  buildings,
  destinationCenter,
  greens,
  labels,
  roads,
  route,
  stops,
} from "../campusMap";
import { useReducedMotion } from "../hooks/useMediaQuery";
import "./CampusMap.css";

export type CampusMapHandle = {
  /** 정문에서 도착까지 걷는 모습을 처음부터 재생 */
  play: () => void;
  /** 재생을 멈추고 현재 단계 위치로 */
  stop: () => void;
  isPlaying: () => boolean;
};

type Props = {
  active: number;
  onActiveChange: (index: number) => void;
};

const PAD = 10;
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);
const stopIndexAt = (meters: number) => stops.reduce((index, stop, i) => (meters + 0.5 >= stop.at ? i : index), 0);

/**
 * 정문 → AI·DX 센터 지도 (위쪽 = 학교 안쪽/서쪽, 오른쪽 = 북쪽)
 * 지나온 길은 색이 채워지고, 걷는 점이 현재 단계 위치로 이동해요.
 */
export const CampusMap = forwardRef<CampusMapHandle, Props>(function CampusMap({ active, onActiveChange }, ref) {
  const progressRef = useRef<SVGPathElement>(null);
  const walkerRef = useRef<SVGGElement>(null);
  const current = useRef(0);
  const frame = useRef(0);
  const playing = useRef(false);
  const activeRef = useRef(active);
  activeRef.current = active;
  const reduceMotion = useReducedMotion();

  // 경로를 meters 만큼 칠하고 걷는 점을 그 위치로
  const draw = useCallback((meters: number) => {
    const path = progressRef.current;
    const walker = walkerRef.current;
    if (!path || !walker) return;
    const total = path.getTotalLength();
    const length = Math.min(total, Math.max(0, (meters / route.length) * total));
    path.style.strokeDasharray = `${total} ${total}`;
    path.style.strokeDashoffset = `${total - length}`;
    const point = path.getPointAtLength(length);
    walker.setAttribute("transform", `translate(${point.x.toFixed(2)} ${point.y.toFixed(2)})`);
    current.current = meters;
  }, []);

  const animate = useCallback(
    (to: number, duration: number, onFrame?: (meters: number) => void, onDone?: () => void) => {
      cancelAnimationFrame(frame.current);
      const from = current.current;
      if (reduceMotion || duration <= 0 || from === to) {
        draw(to);
        onFrame?.(to);
        onDone?.();
        return;
      }
      const startedAt = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - startedAt) / duration);
        const meters = from + (to - from) * easeInOut(t);
        draw(meters);
        onFrame?.(meters);
        if (t < 1) frame.current = requestAnimationFrame(tick);
        else onDone?.();
      };
      frame.current = requestAnimationFrame(tick);
    },
    [draw, reduceMotion]
  );

  useLayoutEffect(() => {
    draw(current.current);
  }, [draw]);

  // 단계가 바뀌면 그 지점까지 걸어가요.
  useEffect(() => {
    if (playing.current) return;
    const to = stops[active]?.at ?? 0;
    animate(to, Math.min(1800, 450 + Math.abs(to - current.current) * 5));
  }, [active, animate]);

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  // 지도 위 번호를 누르면 재생을 멈추고 그 단계로
  const jumpTo = (index: number) => {
    playing.current = false;
    if (index === activeRef.current) {
      const to = stops[index].at;
      animate(to, Math.min(900, 300 + Math.abs(to - current.current) * 4));
    }
    onActiveChange(index);
  };

  useImperativeHandle(
    ref,
    () => ({
      isPlaying: () => playing.current,
      stop: () => {
        if (!playing.current) return;
        playing.current = false;
        const to = stops[activeRef.current]?.at ?? 0;
        animate(to, Math.min(900, 300 + Math.abs(to - current.current) * 4));
      },
      play: () => {
        playing.current = true;
        draw(0);
        onActiveChange(0);
        let shown = 0;
        animate(
          route.length,
          route.length * 13,
          (meters) => {
            const index = stopIndexAt(meters);
            if (index !== shown) {
              shown = index;
              onActiveChange(index);
            }
          },
          () => {
            playing.current = false;
            onActiveChange(stops.length - 1);
          }
        );
      },
    }),
    [animate, draw, onActiveChange]
  );

  const [destX, destY] = destinationCenter;

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
        <linearGradient id="map-route" gradientUnits="userSpaceOnUse" x1="0" y1={MAP_HEIGHT} x2="0" y2="0">
          <stop offset="0" stopColor="#2fd6f2" />
          <stop offset="0.55" stopColor="#5b8cff" />
          <stop offset="1" stopColor="#b57bff" />
        </linearGradient>
        <linearGradient id="map-dest" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#9b7bff" />
          <stop offset="1" stopColor="#5b8cff" />
        </linearGradient>
        <filter id="map-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <rect x={-PAD} y={-PAD} width={MAP_WIDTH + PAD * 2} height={MAP_HEIGHT + PAD * 2} fill="url(#map-grid)" />

      <g className="campus-map__greens">
        {greens.map((green, i) => (
          <path key={i} className={`map-green map-green--${green.kind}`} d={green.d} />
        ))}
      </g>

      <g className="campus-map__roads">
        {roads.map((road, i) => (
          <path key={i} d={road.d} strokeWidth={road.w} />
        ))}
      </g>

      <g className="campus-map__buildings">
        {buildings.map((building) => (
          <path key={building.name} className={`map-building map-building--${building.kind}`} d={building.d} />
        ))}
      </g>

      {/* 목적지 빛 번짐 */}
      <g className="campus-map__dest" transform={`translate(${destX} ${destY})`}>
        <circle className="map-dest-ring" r="26" />
        <circle className="map-dest-ring map-dest-ring--late" r="26" />
      </g>

      {/* 경로: 바탕 → 흐르는 점선 → 지나온 길 */}
      <path className="map-route-base" d={route.d} />
      <path className="map-route-flow" d={route.d} />
      <path ref={progressRef} className="map-route-progress" d={route.d} filter="url(#map-glow)" />

      {/* 정문 기둥 */}
      <g className="map-gate" transform={`translate(${stops[0].point[0]} ${stops[0].point[1]})`}>
        <rect x="-11" y="-3" width="5" height="6" rx="1" />
        <rect x="6" y="-3" width="5" height="6" rx="1" />
      </g>

      <g className="campus-map__labels">
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

      {/* 목적지 말풍선 */}
      <g className="map-callout" transform={`translate(${destX} ${destY - 32})`}>
        <path d="M-44 -11h88a5 5 0 0 1 5 5v12a5 5 0 0 1-5 5H6l-6 6-6-6h-38a5 5 0 0 1-5-5v-12a5 5 0 0 1 5-5z" />
        <text dominantBaseline="central" textAnchor="middle" y="0">
          AI·DX 센터 1층
        </text>
      </g>

      {/* 단계 번호 */}
      <g className="campus-map__stops">
        {stops.map((stop, i) => (
          <g
            key={stop.id}
            className={`map-stop${i === active ? " is-active" : ""}${i < active ? " is-past" : ""}`}
            transform={`translate(${stop.point[0]} ${stop.point[1]})`}
            onClick={() => jumpTo(i)}
          >
            <circle className="map-stop__hit" r="16" />
            <g className="map-stop__inner">
              <circle r="8.5" />
              <text dominantBaseline="central" textAnchor="middle">
                {i + 1}
              </text>
            </g>
          </g>
        ))}
      </g>

      {/* 걷는 점 */}
      <g ref={walkerRef} className="map-walker">
        <circle className="map-walker__halo" r="12" />
        <circle className="map-walker__dot" r="5" />
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
});
