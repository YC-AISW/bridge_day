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

// 드래그 & 버튼으로 멘토 카드를 넘길 수 있는 슬라이더 컴포넌트
export const MentorCarousel = ({ mentors }: Props) => {
  // 실제 카드들이 들어있는 트랙 요소
  const trackRef = useRef<HTMLDivElement>(null);
  // 한 장의 카드(뷰포트) 너비를 계산하기 위한 래퍼 요소
  const wrapperRef = useRef<HTMLDivElement>(null);

  // 현재 보여주는 카드 인덱스
  const [currentIndex, setCurrentIndex] = useState(0);

  // 현재 드래그를 일으킨 포인터 id
  const pointerIdRef = useRef<number | null>(null);
  // 드래그 시작 시점의 X 좌표
  const startXRef = useRef(0);
  // 드래그 시작 전에 적용돼 있던 translateX 값
  const prevTranslateRef = useRef(0);
  // 드래그 중 실시간으로 변하는 translateX 값
  const currentTranslateRef = useRef(0);

  // 드래그 중 여부 상태
  const [isDragging, setIsDragging] = useState(false);

  // 인덱스가 범위를 벗어나지 않도록 0 ~ mentors.length - 1 사이로 제한
  const clampIndex = useCallback(
    (value: number) => Math.min(Math.max(value, 0), mentors.length - 1),
    [mentors.length]
  );

  // 실제 DOM 트랙에 translateX 적용 (smooth 옵션으로 애니메이션 여부 제어)
  const applyTranslate = useCallback((value: number, smooth = false) => {
    if (!trackRef.current) return;
    trackRef.current.style.transition = smooth
      ? "transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)"
      : "none";
    trackRef.current.style.transform = `translateX(${value}px)`;
  }, []);

  // 주어진 인덱스에 맞게 카드가 딱 맞게 스냅되도록 위치 이동
  const snapToIndex = useCallback(
    (index: number) => {
      const width = wrapperRef.current?.offsetWidth ?? 0;
      const value = -index * width; // 왼쪽으로 index * width 만큼 이동
      prevTranslateRef.current = value;
      currentTranslateRef.current = value;
      applyTranslate(value, true);
    },
    [applyTranslate]
  );

  // 현재 인덱스가 바뀔 때마다 해당 인덱스로 스냅
  useEffect(() => {
    snapToIndex(currentIndex);
  }, [currentIndex, snapToIndex]);

  // 화면 크기가 바뀌면 카드 너비도 바뀌므로 현재 인덱스 기준으로 다시 정렬
  useEffect(() => {
    const handleResize = () => snapToIndex(currentIndex);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [currentIndex, snapToIndex]);

  // 드래그 시작 처리
  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    pointerIdRef.current = event.pointerId;
    startXRef.current = event.clientX;
    setIsDragging(true);

    // 현재 트랙이 해당 포인터 이벤트를 독점하도록 설정
    trackRef.current?.setPointerCapture(event.pointerId);

    // 드래그 중에는 부드러운 애니메이션 제거 (즉각적인 이동 느낌)
    if (trackRef.current) {
      trackRef.current.style.transition = "none";
    }
  };

  // 전역 포인터 이벤트를 window에 등록 (트랙 밖으로 포인터가 나가도 계속 추적)
  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      if (!isDragging || event.pointerId !== pointerIdRef.current) return;

      const diff = event.clientX - startXRef.current;
      // 이전 위치 + 드래그 변화량으로 현재 위치 계산
      currentTranslateRef.current = prevTranslateRef.current + diff;
      applyTranslate(currentTranslateRef.current);
    };

    const handlePointerUp = (event: PointerEvent) => {
      if (!isDragging || event.pointerId !== pointerIdRef.current) return;

      setIsDragging(false);
      trackRef.current?.releasePointerCapture(event.pointerId);

      const width = wrapperRef.current?.offsetWidth ?? 0;
      const movedBy = currentTranslateRef.current - prevTranslateRef.current;

      // 20% 이상 왼쪽으로 드래그 → 다음 카드로 이동
      if (movedBy < -width * 0.2 && currentIndex < mentors.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      }
      // 20% 이상 오른쪽으로 드래그 → 이전 카드로 이동
      else if (movedBy > width * 0.2 && currentIndex > 0) {
        setCurrentIndex((prev) => prev - 1);
      }
      // 기준치보다 적게 움직였으면 원래 카드로 스냅백
      else {
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
  }, [applyTranslate, currentIndex, isDragging, mentors.length, snapToIndex]);

  // 점(인디케이터) 개수용 배열
  const dots = useMemo(() => mentors.map((_, index) => index), [mentors]);

  // 좌/우 버튼 활성화 여부
  const canPrev = currentIndex > 0;
  const canNext = currentIndex < mentors.length - 1;

  return (
    <div className="mentor-slider">
      {/* 이전 카드 버튼 */}
      <button
        className="slider-nav prev"
        aria-label="이전 멘토 보기"
        onClick={() => setCurrentIndex((prev) => clampIndex(prev - 1))}
        disabled={!canPrev}
      >
        &#10094;
      </button>

      {/* 뷰포트 역할을 하는 래퍼 */}
      <div className="mentor-track-wrapper" ref={wrapperRef}>
        {/* 실제로 좌우로 이동하는 카드 트랙 */}
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

      {/* 다음 카드 버튼 */}
      <button
        className="slider-nav next"
        aria-label="다음 멘토 보기"
        onClick={() => setCurrentIndex((prev) => clampIndex(prev + 1))}
        disabled={!canNext}
      >
        &#10095;
      </button>

      {/* 하단 인디케이터(점) */}
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
