import { useEffect, useRef } from "react";

const canHover = () =>
  window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * 카드 기울이기(3D tilt) + 빛 반사 효과.
 * 마우스 위치를 CSS 변수(--rx, --ry, --mx, --my)로 넘기고, 모양은 CSS가 그립니다.
 */
export function useTilt<T extends HTMLElement>(maxDeg = 7) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !canHover()) return;
    let frame = 0;
    let x = 0.5;
    let y = 0.5;

    const apply = () => {
      frame = 0;
      el.style.setProperty("--rx", `${((0.5 - y) * maxDeg * 2).toFixed(2)}deg`);
      el.style.setProperty("--ry", `${((x - 0.5) * maxDeg * 2).toFixed(2)}deg`);
      el.style.setProperty("--mx", `${(x * 100).toFixed(1)}%`);
      el.style.setProperty("--my", `${(y * 100).toFixed(1)}%`);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(apply);
    };
    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      x = (e.clientX - rect.left) / rect.width;
      y = (e.clientY - rect.top) / rect.height;
      el.classList.add("is-tilting");
      schedule();
    };
    const onLeave = () => {
      el.classList.remove("is-tilting");
      x = 0.5;
      y = 0.5;
      schedule();
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(frame);
    };
  }, [maxDeg]);

  return ref;
}

/**
 * 스포트라이트 효과: 목록 위에서 마우스를 움직이면 각 카드에 마우스 위치(--mx, --my, px)를 넘겨요.
 * 카드 테두리와 배경에 빛이 따라오는 효과는 CSS가 그립니다.
 */
export function useSpotlight<T extends HTMLElement>(itemSelector: string) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root || !canHover()) return;
    let frame = 0;
    let px = 0;
    let py = 0;

    const apply = () => {
      frame = 0;
      root.querySelectorAll<HTMLElement>(itemSelector).forEach((item) => {
        const rect = item.getBoundingClientRect();
        item.style.setProperty("--mx", `${(px - rect.left).toFixed(0)}px`);
        item.style.setProperty("--my", `${(py - rect.top).toFixed(0)}px`);
      });
    };
    const onMove = (e: PointerEvent) => {
      px = e.clientX;
      py = e.clientY;
      if (!frame) frame = requestAnimationFrame(apply);
    };

    root.addEventListener("pointermove", onMove);
    return () => {
      root.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, [itemSelector]);

  return ref;
}
