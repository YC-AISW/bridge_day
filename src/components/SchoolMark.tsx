import symbol from "../assets/brand/yonam-symbol.png";

// 연암공과대학교 심벌 (186 × 179). 학교 규정대로 비율과 색을 바꾸지 않고 그대로 써요.
// 장식용이라 대체 텍스트는 비우고, 옆에 항상 "연암공과대학교"를 글자로 함께 적어요.
export const SchoolMark = ({ size = 24, className }: { size?: number; className?: string }) => (
  <img className={className} src={symbol} alt="" width={size} height={Math.round((size * 179) / 186)} />
);
