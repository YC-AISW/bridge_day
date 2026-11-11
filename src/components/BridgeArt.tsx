import { cssVars } from "../lib/cssVars";

// 현수교 라인아트 (viewBox 1440 × 360). 케이블 모양은 2차 베지어 곡선으로 계산해요.
const DECK_Y = 268;
const TOWERS = [420, 1020];
const TOP_Y = 70;

type Curve = { x0: number; y0: number; cx: number; cy: number; x1: number; y1: number };
const MAIN: Curve = { x0: 420, y0: TOP_Y, cx: 720, cy: 434, x1: 1020, y1: TOP_Y };
const LEFT: Curve = { x0: -40, y0: 262, cx: 190, cy: 240, x1: 420, y1: TOP_Y };
const RIGHT: Curve = { x0: 1020, y0: TOP_Y, cx: 1250, cy: 240, x1: 1480, y1: 262 };

const curvePath = (c: Curve) => `M${c.x0} ${c.y0}Q${c.cx} ${c.cy} ${c.x1} ${c.y1}`;

// 제어점이 양 끝의 가운데에 있어서 x 는 t 에 비례해요.
const yOnCurve = (c: Curve, x: number) => {
  const t = (x - c.x0) / (c.x1 - c.x0);
  return (1 - t) ** 2 * c.y0 + 2 * (1 - t) * t * c.cy + t ** 2 * c.y1;
};

const hangers = [MAIN, LEFT, RIGHT].flatMap((curve) => {
  const lines: { x: number; y: number }[] = [];
  for (let x = Math.ceil(curve.x0 / 30) * 30; x <= curve.x1; x += 30) {
    const y = yOnCurve(curve, x);
    if (x > 0 && x < 1440 && DECK_Y - y > 6 && !TOWERS.some((t) => Math.abs(t - x) < 16)) lines.push({ x, y });
  }
  return lines;
});

const deckLights = Array.from({ length: 30 }, (_, i) => 24 + i * 48);

const Bridge = ({ reflection }: { reflection?: boolean }) => (
  <g className={reflection ? "bridge__reflection" : undefined}>
    {hangers.map(({ x, y }, i) => (
      <path
        key={`h${x}`}
        className="bridge__hanger draw"
        d={`M${x} ${y.toFixed(1)}V${DECK_Y}`}
        pathLength={1}
        style={cssVars({ "--d": `${0.9 + (i % 19) * 0.04}s` })}
      />
    ))}
    {[LEFT, MAIN, RIGHT].map((curve, i) => (
      <path
        key={`c${i}`}
        className="bridge__cable draw"
        d={curvePath(curve)}
        pathLength={1}
        style={cssVars({ "--d": `${0.35 + i * 0.2}s` })}
      />
    ))}
    {TOWERS.map((x) => (
      <g key={x} className="bridge__tower">
        <path className="draw" pathLength={1} d={`M${x - 14} 300L${x - 9} ${TOP_Y - 14}`} />
        <path className="draw" pathLength={1} d={`M${x + 14} 300L${x + 9} ${TOP_Y - 14}`} />
        <path className="draw" pathLength={1} d={`M${x - 12} 128H${x + 12}M${x - 13} 196H${x + 13}M${x - 11} ${TOP_Y - 14}H${x + 11}`} />
      </g>
    ))}
    <path className="bridge__deck draw" pathLength={1} d={`M0 ${DECK_Y}H1440`} />
    <path className="bridge__rail draw" pathLength={1} d={`M0 ${DECK_Y + 9}H1440`} style={cssVars({ "--d": "0.5s" })} />
    {deckLights.map((x, i) => (
      <circle key={x} className="bridge__light" cx={x} cy={DECK_Y - 4} r={2.2} style={cssVars({ "--i": i })} />
    ))}
    {TOWERS.map((x) => (
      <circle key={`b${x}`} className="bridge__beacon" cx={x} cy={TOP_Y - 22} r={3.4} />
    ))}
  </g>
);

/** Hero 아래쪽에 깔리는 다리 그림 (장식) */
export const BridgeArt = () => (
  <svg className="bridge" viewBox="0 0 1440 360" preserveAspectRatio="xMidYMax slice" aria-hidden="true" focusable="false">
    <defs>
      <linearGradient id="bridge-stroke" x1="0" x2="1440" y1="0" y2="0" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#5b8cff" />
        <stop offset="0.5" stopColor="#2fd6f2" />
        <stop offset="1" stopColor="#9b7bff" />
      </linearGradient>
      <linearGradient id="bridge-water" x1="0" x2="0" y1="300" y2="360" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#fff" stopOpacity="0.9" />
        <stop offset="1" stopColor="#fff" stopOpacity="0" />
      </linearGradient>
      <mask id="bridge-fade" maskUnits="userSpaceOnUse" x="0" y="300" width="1440" height="60">
        <rect x="0" y="300" width="1440" height="60" fill="url(#bridge-water)" />
      </mask>
    </defs>
    <Bridge />
    {/* 물에 비친 모습: 위아래로 뒤집고 아래로 갈수록 흐려지게 */}
    <g mask="url(#bridge-fade)">
      <g transform="translate(0 600) scale(1 -1)" opacity="0.24">
        <Bridge reflection />
      </g>
    </g>
    <path className="bridge__water" d="M0 300H1440" />
  </svg>
);
