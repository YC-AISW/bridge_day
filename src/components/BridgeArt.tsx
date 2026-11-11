// 현수교 라인아트 (viewBox 1440 × 300, 움직임 없는 장식). 선 색은 CSS 의 color 를 따라가요.
// 케이블 모양은 2차 베지어 곡선으로 계산해요.
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

const hangers = [MAIN, LEFT, RIGHT]
  .flatMap((curve) => {
    const xs: number[] = [];
    for (let x = Math.ceil(curve.x0 / 30) * 30; x <= curve.x1; x += 30) xs.push(x);
    return xs.map((x) => ({ x, y: yOnCurve(curve, x) }));
  })
  .filter(({ x, y }) => x > 0 && x < 1440 && DECK_Y - y > 6 && !TOWERS.some((t) => Math.abs(t - x) < 16));

const hangerPath = hangers.map(({ x, y }) => `M${x} ${y.toFixed(1)}V${DECK_Y}`).join("");
const towerPath = TOWERS.map(
  (x) =>
    `M${x - 14} 300L${x - 9} ${TOP_Y - 14}M${x + 14} 300L${x + 9} ${TOP_Y - 14}` +
    `M${x - 12} 128H${x + 12}M${x - 13} 196H${x + 13}M${x - 11} ${TOP_Y - 14}H${x + 11}`
).join("");

/** 다리 그림 (장식) */
export const BridgeArt = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 1440 300"
    preserveAspectRatio="xMidYMax slice"
    aria-hidden="true"
    focusable="false"
  >
    <g fill="none" stroke="currentColor" strokeLinecap="round">
      <path d={hangerPath} strokeWidth="1" opacity="0.5" />
      <path d={[LEFT, MAIN, RIGHT].map(curvePath).join("")} strokeWidth="2.2" />
      <path d={towerPath} strokeWidth="3" />
      <path d={`M0 ${DECK_Y}H1440`} strokeWidth="3.2" />
    </g>
  </svg>
);
