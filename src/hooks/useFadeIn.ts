// 각 섹션이 처음 화면에 등장할 때 Fade-In 애니메이션을 실행하는 Hook
import { useEffect } from "react";

export const useFadeIn = () => {
  useEffect(() => {
    // 화면에 요소가 최초로 보이면 visible 클래스를 추가하고 감시를 종료하는 Observer
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("visible");
          obs.unobserve(entry.target); // 1번만 실행되도록 감시 해제
        });
      },
      { threshold: 0.12 } // 요소가 12% 이상 보일 때 트리거
    );

    // fade-in 요소들을 감시 대상으로 등록.
    const elements = document.querySelectorAll(".fade-in");
    elements.forEach((el) => observer.observe(el));

    // 언마운트 시 감시 종료(메모리 누수 방지)
    return () => observer.disconnect();
  }, []);
};
