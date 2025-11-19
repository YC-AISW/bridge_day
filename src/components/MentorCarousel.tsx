import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  PointerEvent as ReactPointerEvent,
} from "react";
import type { Mentor } from "../data";

type Props = {
  mentors: Mentor[];
};

export const MentorCarousel = ({ mentors }: Props) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const pointerIdRef = useRef<number | null>(null);
  const startXRef = useRef(0);
  const prevTranslateRef = useRef(0);
  const currentTranslateRef = useRef(0);
  const [isDragging, setIsDragging] = useState(false);

  const clampIndex = useCallback(
    (value: number) => Math.min(Math.max(value, 0), mentors.length - 1),
    [mentors.length]
  );

  const applyTranslate = useCallback((value: number, smooth = false) => {
    if (!trackRef.current) return;
    trackRef.current.style.transition = smooth
      ? "transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)"
      : "none";
    trackRef.current.style.transform = `translateX(${value}px)`;
  }, []);

  const snapToIndex = useCallback(
    (index: number) => {
      const width = wrapperRef.current?.offsetWidth ?? 0;
      const value = -index * width;
      prevTranslateRef.current = value;
      currentTranslateRef.current = value;
      applyTranslate(value, true);
    },
    [applyTranslate]
  );

  useEffect(() => {
    snapToIndex(currentIndex);
  }, [currentIndex, snapToIndex]);

  useEffect(() => {
    const handleResize = () => snapToIndex(currentIndex);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [currentIndex, snapToIndex]);

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    pointerIdRef.current = event.pointerId;
    startXRef.current = event.clientX;
    setIsDragging(true);
    trackRef.current?.setPointerCapture(event.pointerId);
    if (trackRef.current) {
      trackRef.current.style.transition = "none";
    }
  };

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      if (!isDragging || event.pointerId !== pointerIdRef.current) return;
      const diff = event.clientX - startXRef.current;
      currentTranslateRef.current = prevTranslateRef.current + diff;
      applyTranslate(currentTranslateRef.current);
    };

    const handlePointerUp = (event: PointerEvent) => {
      if (!isDragging || event.pointerId !== pointerIdRef.current) return;
      setIsDragging(false);
      trackRef.current?.releasePointerCapture(event.pointerId);

      const width = wrapperRef.current?.offsetWidth ?? 0;
      const movedBy = currentTranslateRef.current - prevTranslateRef.current;

      if (movedBy < -width * 0.2 && currentIndex < mentors.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      } else if (movedBy > width * 0.2 && currentIndex > 0) {
        setCurrentIndex((prev) => prev - 1);
      } else {
        snapToIndex(currentIndex);
      }

      pointerIdRef.current = null;
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("pointercancel", handlePointerUp);
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointercancel", handlePointerUp);
    };
  }, [
    applyTranslate,
    currentIndex,
    isDragging,
    mentors.length,
    snapToIndex,
  ]);

  const dots = useMemo(() => mentors.map((_, index) => index), [mentors]);
  const canPrev = currentIndex > 0;
  const canNext = currentIndex < mentors.length - 1;

  return (
    <div className="mentor-slider">
      <button
        className="slider-nav prev"
        aria-label="이전 멘토 보기"
        onClick={() => setCurrentIndex((prev) => clampIndex(prev - 1))}
        disabled={!canPrev}
      >
        &#10094;
      </button>
      <div className="mentor-track-wrapper" ref={wrapperRef}>
        <div
          className={`mentor-track ${isDragging ? "grabbing" : ""}`}
          ref={trackRef}
          onPointerDown={handlePointerDown}
        >
          {mentors.map((mentor) => (
            <article className="mentor-card" key={mentor.name}>
              <div className="mentor-card-left">
                <span className="mentor-grade">{mentor.grade}</span>
                <p className="mentor-name">{mentor.name}</p>
              </div>
              <div className="mentor-card-right">
                <div className="mentor-meta">
                  <span className="meta-label">관심분야</span>
                  <p className="meta-value">{mentor.interest}</p>
                </div>
                <div className="mentor-meta">
                  <span className="meta-label">가능스택</span>
                  <div className="stack-grid">
                    {mentor.stacks.map((stack) => (
                      <img
                        key={stack.label}
                        src={stack.badge}
                        alt={stack.label}
                        className="stack-badge"
                        loading="lazy"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
      <button
        className="slider-nav next"
        aria-label="다음 멘토 보기"
        onClick={() => setCurrentIndex((prev) => clampIndex(prev + 1))}
        disabled={!canNext}
      >
        &#10095;
      </button>
      <div className="slider-dots" aria-label="멘토 슬라이더 인디케이터">
        {dots.map((dot) => (
          <button
            key={dot}
            className={`slider-dot ${dot === currentIndex ? "active" : ""}`}
            onClick={() => setCurrentIndex(dot)}
            aria-label={`${dot + 1}번째 멘토 카드로 이동`}
          />
        ))}
      </div>
    </div>
  );
};

