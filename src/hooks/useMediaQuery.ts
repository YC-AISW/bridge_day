import { useCallback, useSyncExternalStore } from "react";

/** CSS 미디어 쿼리가 맞는지 실시간으로 알려 줍니다. */
export function useMediaQuery(query: string) {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const media = window.matchMedia(query);
      media.addEventListener("change", onChange);
      return () => media.removeEventListener("change", onChange);
    },
    [query]
  );
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false
  );
}

/** 사용자가 "동작 줄이기"를 켰는지 */
export const useReducedMotion = () => useMediaQuery("(prefers-reduced-motion: reduce)");
