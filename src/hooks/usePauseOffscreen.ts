import { useEffect } from "react";

/**
 * data-anim 이 붙은 영역이 화면 밖에 있으면 data-paused="true" 를 붙여요.
 * global.css 가 그 안의 반복 애니메이션을 멈춰서, 보이지 않는 곳에서 휴대폰이 계속 그림을 다시 그리지 않게 해요.
 */
export function usePauseOffscreen() {
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          (entry.target as HTMLElement).dataset.paused = String(!entry.isIntersecting);
        }
      },
      { rootMargin: "120px 0px" }
    );
    document.querySelectorAll<HTMLElement>("[data-anim]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}
