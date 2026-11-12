import { Component, lazy, Suspense, useEffect, useRef, useState, type ReactNode } from "react";
import { routeLength } from "../campusRoute";
import { event } from "../data";
import { aboutMeters, walkMinutes } from "../lib/format";

// 지도(Leaflet)는 무거워서 이 섹션이 가까워졌을 때 불러와요.
const CampusMap = lazy(() => import("./CampusMap"));

// 지도에서 오류가 나도 페이지 나머지는 그대로 보이게 막아 줘요.
class MapErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    if (this.state.failed) return <p className="section-desc">지도를 불러오지 못했어요. 새로고침해 주세요.</p>;
    return this.props.children;
  }
}

// 오시는 길 섹션: 정문에서 행사장(AI·DX 센터)까지 실제 지도
// - Fade-In 애니메이션 적용 대상(`fade-in` 클래스)
export const DirectionsSection = () => {
  const boxRef = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setNear(true);
        observer.disconnect();
      },
      { rootMargin: "600px 0px" }
    );
    observer.observe(box);
    return () => observer.disconnect();
  }, []);

  const placeholder = <div className="campus-map-live campus-map-live--loading" />;

  return (
    <section id="directions" className="fade-in">
      <div className="container">
        <h2>오시는 길</h2>
        <p className="section-desc">
          정문에서 {event.venue}까지 {aboutMeters(routeLength)}, 걸어서 {walkMinutes(routeLength)}분 정도 걸려요.
        </p>

        <div className="directions-map" ref={boxRef}>
          {near ? (
            <MapErrorBoundary>
              <Suspense fallback={placeholder}>
                <CampusMap />
              </Suspense>
            </MapErrorBoundary>
          ) : (
            placeholder
          )}
        </div>
      </div>
    </section>
  );
};
