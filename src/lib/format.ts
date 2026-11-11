// 날짜 · 거리 표시용 도우미

const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];

/** "2026-12-05" → "12월 5일 (토)" (형식이 틀리거나 비어 있으면 null) */
export function formatDate(iso: string): string | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso.trim());
  if (!match) return null;
  const date = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
  if (Number.isNaN(date.getTime())) return null;
  return `${date.getMonth() + 1}월 ${date.getDate()}일 (${WEEKDAYS[date.getDay()]})`;
}

/** 10m 단위로 반올림한 거리: "약 490m" */
export const aboutMeters = (meters: number) => `약 ${Math.round(meters / 10) * 10}m`;

/** 걷는 시간(분). 오르막을 고려해 분당 70m로 계산해요. */
export const walkMinutes = (meters: number) => Math.max(1, Math.round(meters / 70));
