import type { CSSProperties } from "react";

/** CSS 사용자 변수(--i 등)를 style 속성으로 넘길 때 씁니다. */
export const cssVars = (vars: Record<`--${string}`, string | number>) => vars as CSSProperties;
