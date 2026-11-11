// 날짜 · 시간 · 거리 표시용 도우미

const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];

/** "YYYY-MM-DD" → Date (형식이 틀리거나 비어 있으면 null) */
export function parseDate(iso: string): Date | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso.trim());
  if (!match) return null;
  const date = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
  return Number.isNaN(date.getTime()) ? null : date;
}

/** "2026-12-05" → "12월 5일 (토)" */
export function formatDate(iso: string): string | null {
  const date = parseDate(iso);
  if (!date) return null;
  return `${date.getMonth() + 1}월 ${date.getDate()}일 (${WEEKDAYS[date.getDay()]})`;
}

/** 행사까지 남은 날짜 수 (0 = 당일, 음수 = 이미 지남) */
export function daysUntil(iso: string, now = new Date()): number | null {
  const date = parseDate(iso);
  if (!date) return null;
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return Math.round((date.getTime() - today.getTime()) / 86_400_000);
}

/** "D-24", "D-DAY" (행사가 지났거나 날짜가 없으면 null) */
export function ddayLabel(iso: string, now?: Date): string | null {
  const days = daysUntil(iso, now);
  if (days === null || days < 0) return null;
  return days === 0 ? "D-DAY" : `D-${days}`;
}

export const toMinutes = (hhmm: string) => {
  const [hours, minutes] = hhmm.split(":").map(Number);
  return hours * 60 + minutes;
};

/** 진행 시간: "10분", "1시간", "1시간 30분" */
export function durationLabel(start: string, end: string) {
  const total = toMinutes(end) - toMinutes(start);
  const hours = Math.floor(total / 60);
  const minutes = total % 60;
  if (!hours) return `${minutes}분`;
  return minutes ? `${hours}시간 ${minutes}분` : `${hours}시간`;
}

/** 10m 단위로 반올림한 거리: "약 220m" */
export const aboutMeters = (meters: number) => `약 ${Math.round(meters / 10) * 10}m`;

/** 걷는 시간(분). 오르막을 고려해 분당 70m로 계산해요. */
export const walkMinutes = (meters: number) => Math.max(1, Math.round(meters / 70));

/** 아바타에 쓸 이름 (성 빼고 두 글자) */
export const givenName = (name: string) => (name.length >= 3 ? name.slice(-2) : name);
