// 정문 → AI·DX센터 길 안내 지도 데이터를 만드는 스크립트입니다.
//
// Frontend 저장소(OT 앱)의 캠퍼스 지도 데이터(src/prototype)에서 길 안내에 필요한 부분만 잘라
// src/campusMap.ts 로 저장합니다. 주차장·나무·산책로 같은 정보는 버리고 건물, 도로, 잔디/운동장만 남깁니다.
//
// 사용법 (Frontend 저장소가 bridge_day 옆 폴더에 있을 때):
//   node scripts/extract-campus-map.mjs ../Frontend
//
// 지도는 "정문에서 학교 안쪽을 바라본 방향"이 위쪽입니다. 즉 위 = 서쪽, 오른쪽 = 북쪽입니다.
// 정문에 서서 휴대폰을 들면 화면의 방향과 실제 방향이 같아집니다.

import fs from 'node:fs';
import path from 'node:path';

const frontend = path.resolve(process.argv[2] ?? '../Frontend');
const prototype = path.join(frontend, 'src/prototype');
const out = path.resolve('src/campusMap.ts');

// 생성된 TS 파일 안의 JSON 리터럴(`export const 이름 = {...}`)을 그대로 읽어 옵니다.
function grab(file, name) {
  const src = fs.readFileSync(path.join(prototype, file), 'utf8');
  const head = src.match(new RegExp(`export const ${name}[^=]*=\\s*`));
  if (!head) throw new Error(`${file}: ${name} not found`);
  const start = head.index + head[0].length;
  let depth = 0, inString = false, escaped = false, i = start;
  for (; i < src.length; i++) {
    const c = src[i];
    if (inString) {
      if (escaped) escaped = false;
      else if (c === '\\') escaped = true;
      else if (c === '"') inString = false;
    } else if (c === '"') inString = true;
    else if (c === '[' || c === '{') depth++;
    else if ((c === ']' || c === '}') && --depth === 0) break;
  }
  return JSON.parse(src.slice(start, i + 1));
}

const buildings = grab('campusBuildings3d.ts', 'campusBuildings3d');
const roads = grab('campusGround.ts', 'campusRoads');
const areas = grab('campusGround.ts', 'campusAreas');

// ── 좌표 변환: 정문을 원점으로 한 미터 단위 좌표 ──────────────────────────────
const GATE = [128.1027, 35.1641023]; // 정문 (위성사진·정문 사진으로 확인한 주 도로 입구)
const LAT0 = (GATE[1] * Math.PI) / 180;
const M_PER_LNG = 111412.84 * Math.cos(LAT0) - 93.5 * Math.cos(3 * LAT0);
const M_PER_LAT = 111132.92 - 559.82 * Math.cos(2 * LAT0) + 1.175 * Math.cos(4 * LAT0);

// 보여 줄 범위 (미터): 북쪽(오른쪽) -105 ~ 235, 동쪽(아래) -470 ~ 40
const VIEW = { north: [-105, 235], east: [-470, 40] };
const WIDTH = VIEW.north[1] - VIEW.north[0];
const HEIGHT = VIEW.east[1] - VIEW.east[0];

const project = ([lng, lat]) => {
  const east = (lng - GATE[0]) * M_PER_LNG;
  const north = (lat - GATE[1]) * M_PER_LAT;
  return [north - VIEW.north[0], east - VIEW.east[0]];
};
const r1 = (v) => Math.round(v * 10) / 10;
const toPath = (points, close) =>
  points.map((p, i) => `${i ? 'L' : 'M'}${r1(p[0])} ${r1(p[1])}`).join('') + (close ? 'Z' : '');
const inView = (points, pad = 0) =>
  points.some(([x, y]) => x >= -pad && x <= WIDTH + pad && y >= -pad && y <= HEIGHT + pad);

// ── 건물 ──────────────────────────────────────────────────────────────────
const LANDMARKS = {
  '연암미래관': '연암미래관',
  '인화관': '인화관 (체육관)',
  '산학협동관': '산학협동관',
  '대학본관': '대학본관',
  'AI∙DX센터': 'AI·DX센터',
};
const mapBuildings = buildings
  .filter((b) => b.name)
  .map((b) => ({ name: b.name, rings: b.outline.map((ring) => ring.map(project)) }))
  .filter((b) => b.rings.some((ring) => inView(ring, 10)))
  .map((b) => ({
    name: LANDMARKS[b.name] ?? b.name,
    kind: b.name === 'AI∙DX센터' ? 'destination' : LANDMARKS[b.name] ? 'landmark' : 'context',
    d: b.rings.map((ring) => toPath(ring, true)).join(''),
  }));

// ── 도로 (주 도로 폭을 실제와 비슷하게) ──────────────────────────────────────
const ROAD_WIDTH = { tertiary: 9, residential: 7, service: 6 };
const mapRoads = roads.features
  .map((f) => ({ w: ROAD_WIDTH[f.properties.class] ?? 6, points: f.geometry.coordinates.map(project) }))
  .filter((r) => inView(r.points, 20))
  .map((r) => ({ w: r.w, d: toPath(r.points, false) }));

// ── 잔디 / 운동장 ────────────────────────────────────────────────────────────
const mapGreens = areas.features
  .filter((f) => f.properties.kind === 'grass' || f.properties.kind.startsWith('pitch'))
  .map((f) => ({ kind: f.properties.kind.startsWith('pitch') ? 'pitch' : 'grass', points: f.geometry.coordinates[0].map(project) }))
  .filter((a) => inView(a.points, 10))
  .map((a) => ({ kind: a.kind, d: toPath(a.points, true) }));

// ── 안내 경로: 정문 → 주 도로 → 연암미래관 앞 갈림길 → 인화관 앞 → AI·DX센터 ─────────────
const ROUTE = [
  GATE,
  [128.1012491, 35.164135],
  [128.1002374, 35.1641578], // 연암미래관 앞 갈림길
  [128.0999783, 35.1642339],
  [128.0995618, 35.1644952],
  [128.0994158, 35.1647961],
  [128.099436, 35.1651206], // 인화관(체육관) 앞
  [128.0989959, 35.1651452],
  [128.098695, 35.1651497],
  [128.0982392, 35.1651566],
  [128.0981, 35.1651585], // AI·DX센터 앞
].map(project);

const segLength = (a, b) => Math.hypot(b[0] - a[0], b[1] - a[1]);
const along = [0];
for (let i = 1; i < ROUTE.length; i++) along.push(along[i - 1] + segLength(ROUTE[i - 1], ROUTE[i]));
const routeLength = along.at(-1);

// 경로 위 거리(m)에 해당하는 점
const pointAt = (distance) => {
  const i = Math.max(1, along.findIndex((d) => d >= distance));
  const t = (distance - along[i - 1]) / (along[i] - along[i - 1] || 1);
  return [ROUTE[i - 1][0] + (ROUTE[i][0] - ROUTE[i - 1][0]) * t, ROUTE[i - 1][1] + (ROUTE[i][1] - ROUTE[i - 1][1]) * t];
};

// 산학협동관 앞: 경로에서 산학협동관 중심과 가장 가까운 지점
const industryCenter = project([128.0988371, 35.1654578]);
let industryAt = 0;
for (let d = along[6]; d <= routeLength; d += 0.5) {
  const p = pointAt(d), best = pointAt(industryAt);
  if (segLength(p, industryCenter) < segLength(best, industryCenter)) industryAt = d;
}

const STOPS = [
  { id: 'gate', at: 0 },
  { id: 'mirae', at: along[2] },
  { id: 'gym', at: along[6] },
  { id: 'industry', at: industryAt },
  { id: 'arrive', at: routeLength },
].map((s) => ({ ...s, at: r1(s.at), point: pointAt(s.at).map(r1) }));

// ── 지명 라벨 위치 (겹치지 않게 손으로 맞춘 값) ────────────────────────────────
const label = (text, lngLat, dx, dy, kind = 'landmark') => {
  const [x, y] = project(lngLat);
  return { text, x: r1(x + dx), y: r1(y + dy), kind };
};
const LABELS = [
  label('정문', GATE, 0, 22, 'gate'),
  label('연암미래관', [128.1003419, 35.1649402], 0, 4),
  label('인화관 (체육관)', [128.0992891, 35.1653943], 36, 4),
  label('산학협동관', [128.0988371, 35.1654578], 14, 0),
  label('대학본관', [128.0988, 35.1639296], 0, 4),
  label('생활관', [128.098, 35.16575], 0, 0, 'context'),
  label('농구장', [128.099791, 35.164858], 0, 3, 'context'),
];

const destination = mapBuildings.find((b) => b.kind === 'destination');
const destinationCenter = project([128.0980955, 35.165319]).map(r1);

const ts = `// 자동 생성 파일입니다. 직접 고치지 말고 scripts/extract-campus-map.mjs 를 다시 실행하세요.
// 원본: Frontend 저장소(OT 앱) src/prototype 캠퍼스 지도 데이터
//   - 건물 윤곽: 국토교통부 도로명주소 건물 데이터(VWorld)
//   - 도로·잔디·운동장: © OpenStreetMap contributors (ODbL)
// 좌표 단위는 미터이고, 위쪽이 서쪽(정문에서 학교 안쪽을 바라본 방향)입니다.

export type MapBuilding = { name: string; kind: "destination" | "landmark" | "context"; d: string };
export type MapLabel = { text: string; x: number; y: number; kind: "gate" | "landmark" | "context" };
export type RouteStop = { id: string; at: number; point: [number, number] };

export const MAP_WIDTH = ${WIDTH};
export const MAP_HEIGHT = ${HEIGHT};

export const buildings: MapBuilding[] = ${JSON.stringify(mapBuildings)};

export const roads: { w: number; d: string }[] = ${JSON.stringify(mapRoads)};

export const greens: { kind: "grass" | "pitch"; d: string }[] = ${JSON.stringify(mapGreens)};

export const labels: MapLabel[] = ${JSON.stringify(LABELS)};

/** 정문에서 AI·DX센터 앞까지의 안내 경로 */
export const route = { d: ${JSON.stringify(toPath(ROUTE, false))}, length: ${r1(routeLength)} };

/** 경로 위의 안내 지점 (at: 정문에서부터의 거리, m) */
export const stops: RouteStop[] = ${JSON.stringify(STOPS)};

export const destinationCenter: [number, number] = ${JSON.stringify(destinationCenter)};
`;

fs.writeFileSync(out, ts);
console.log(`wrote ${path.relative(process.cwd(), out)}: ${mapBuildings.length} buildings, ${mapRoads.length} roads, ${mapGreens.length} greens, route ${r1(routeLength)} m`);
console.log('stops', STOPS.map((s) => `${s.id}@${s.at}`).join(' '), 'destination', destination?.name);
