import type { ReactNode, SVGProps } from "react";

// 페이지에서 쓰는 선 아이콘 모음 (24 × 24, currentColor)
const ICONS = {
  calendar: (
    <>
      <rect x="3" y="4.5" width="18" height="16" rx="3" />
      <path d="M3 9.5h18M8 2.5v4M16 2.5v4" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.2 2" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21.5s-7-6.1-7-11.6a7 7 0 0 1 14 0c0 5.5-7 11.6-7 11.6z" />
      <circle cx="12" cy="9.8" r="2.6" />
    </>
  ),
  arrowRight: <path d="M5 12h14M13 6l6 6-6 6" />,
  arrowUp: <path d="M12 19V5M6 11l6-6 6 6" />,
  chevronLeft: <path d="M15 5l-7 7 7 7" />,
  chevronRight: <path d="M9 5l7 7-7 7" />,
  users: (
    <>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2.5 20.5a6.5 6.5 0 0 1 13 0M16 4.7a3.5 3.5 0 0 1 0 6.6M18 14.3a6.5 6.5 0 0 1 3.5 6.2" />
    </>
  ),
  gift: (
    <>
      <rect x="3" y="8" width="18" height="5" rx="1.5" />
      <path d="M5 13v6.5A1.5 1.5 0 0 0 6.5 21h11a1.5 1.5 0 0 0 1.5-1.5V13M12 8v13" />
      <path d="M12 8S10.6 3.5 8.1 3.5a2.25 2.25 0 0 0 0 4.5zM12 8s1.4-4.5 3.9-4.5a2.25 2.25 0 0 1 0 4.5z" />
    </>
  ),
  mic: (
    <>
      <rect x="9" y="2.5" width="6" height="11.5" rx="3" />
      <path d="M5 11a7 7 0 0 0 14 0M12 18v3.5M8.5 21.5h7" />
    </>
  ),
  sparkles: (
    <>
      <path d="M11 3l1.9 5.1L18 10l-5.1 1.9L11 17l-1.9-5.1L4 10l5.1-1.9z" />
      <path d="M19 14.5l.9 2.1 2.1.9-2.1.9-.9 2.1-.9-2.1-2.1-.9 2.1-.9z" />
    </>
  ),
  coffee: (
    <>
      <path d="M4 8.5h13v5.5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5zM17 10.5h1.5a2.5 2.5 0 0 1 0 5H17" />
      <path d="M8 2.5v3M12 2.5v3" />
    </>
  ),
  check: <path d="M4.5 12.5l5 5 10-11" />,
  copy: (
    <>
      <rect x="8.5" y="8.5" width="12" height="12" rx="2.5" />
      <path d="M15.5 8.5V5A1.5 1.5 0 0 0 14 3.5H5A1.5 1.5 0 0 0 3.5 5v9A1.5 1.5 0 0 0 5 15.5h3.5" />
    </>
  ),
  external: <path d="M14 4h6v6M20 4l-9 9M18 14v4.5a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 4 18.5v-11A1.5 1.5 0 0 1 5.5 6H10" />,
  bus: (
    <>
      <rect x="4" y="3" width="16" height="15" rx="3" />
      <path d="M4 11h16M8 21v-3M16 21v-3" />
      <circle cx="8" cy="14.5" r=".8" fill="currentColor" />
      <circle cx="16" cy="14.5" r=".8" fill="currentColor" />
    </>
  ),
  taxi: (
    <>
      <path d="M5 17.5V12l2-5h10l2 5v5.5M3.5 17.5h17M7 17.5V20M17 17.5V20M5 12h14M10 4h4" />
      <circle cx="8" cy="14.7" r=".8" fill="currentColor" />
      <circle cx="16" cy="14.7" r=".8" fill="currentColor" />
    </>
  ),
  walk: (
    <>
      <circle cx="13.5" cy="4" r="2" />
      <path d="M9.5 21l2.2-6.2 2.8 2.7V21M11.7 14.8l1.2-5.6-3.3 1.6L8 14M12.9 9.2l2.4 2.6 3.2.7" />
    </>
  ),
  route: (
    <>
      <circle cx="6" cy="18" r="2.5" />
      <circle cx="18" cy="6" r="2.5" />
      <path d="M8.5 18H15a3 3 0 0 0 0-6H9a3 3 0 0 1 0-6h6.5" />
    </>
  ),
  map: <path d="M9 4.5 3.5 6.8v13l5.5-2.3 6 2.5 5.5-2.3v-13L15 7 9 4.5zM9 4.5v13M15 7v13" />,
  phone: (
    <path d="M5.2 3.5h3.3l1.6 4.4-2.1 1.4a12 12 0 0 0 6.7 6.7l1.4-2.1 4.4 1.6v3.3a2 2 0 0 1-2.2 2A17 17 0 0 1 3.2 5.7a2 2 0 0 1 2-2.2z" />
  ),
  play: <path d="M7.5 4.8v14.4a1 1 0 0 0 1.5.9l11.4-7.2a1 1 0 0 0 0-1.8L9 3.9a1 1 0 0 0-1.5.9z" fill="currentColor" stroke="none" />,
  star: <path d="M12 1.5c.7 5.6 3.6 8.6 9.2 9.3-5.6.7-8.5 3.7-9.2 9.3-.7-5.6-3.6-8.6-9.2-9.3C8.4 10.1 11.3 7.1 12 1.5z" fill="currentColor" stroke="none" />,
  code: <path d="M8 7l-5 5 5 5M16 7l5 5-5 5M13.5 4l-3 16" />,
  flag: <path d="M5.5 21V4M5.5 4.5h11.5l-2.3 4.2 2.3 4.3H5.5" />,
  building: (
    <>
      <rect x="4.5" y="3" width="15" height="18" rx="2" />
      <path d="M9 7.5h1.5M13.5 7.5H15M9 11.5h1.5M13.5 11.5H15M10.5 21v-4h3v4" />
    </>
  ),
  graduation: (
    <>
      <path d="M2.5 9.5 12 5l9.5 4.5L12 14z" />
      <path d="M6.5 11.5v4.3c0 1.2 2.5 2.7 5.5 2.7s5.5-1.5 5.5-2.7v-4.3M21.5 9.5V15" />
    </>
  ),
} satisfies Record<string, ReactNode>;

export type IconName = keyof typeof ICONS;

type Props = Omit<SVGProps<SVGSVGElement>, "name"> & { name: IconName; size?: number };

export function Icon({ name, size = 20, ...rest }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {ICONS[name]}
    </svg>
  );
}
