import { useCallback, useEffect, useRef, useState } from "react";
import { route, stops } from "../campusMap";
import { event, gateLocation, routeSteps, transit } from "../data";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { cssVars } from "../lib/cssVars";
import { aboutMeters, walkMinutes } from "../lib/format";
import { CampusMap, type CampusMapHandle } from "./CampusMap";
import { Icon } from "./Icon";
import { SectionHead } from "./SectionHead";
import "./Directions.css";

const kakaoUrl = `https://map.kakao.com/link/to/${encodeURIComponent(gateLocation.name)},${gateLocation.lat},${gateLocation.lng}`;
const naverUrl = `https://map.naver.com/p/search/${encodeURIComponent(event.school)}`;

// 앞 단계에서 얼마나 걸어오는지
const legLabel = (index: number) => {
  if (index === 0) return "출발";
  const stop = stops.find((s) => s.id === routeSteps[index].stop);
  const previous = stops.find((s) => s.id === routeSteps[index - 1].stop);
  return stop && previous ? `${aboutMeters(stop.at - previous.at)} 이동` : "";
};

/** 학교까지 오는 법: 주소 복사 · 지도 앱 · 버스/택시 */
const GettingHere = () => {
  const [copied, setCopied] = useState(false);

  const copyAddress = async () => {
    const text = `${event.address} ${event.school}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      window.prompt("주소를 복사해 주세요", text);
    }
  };

  return (
    <div className="getting-here reveal">
      <div className="getting-here__intro">
        <p className="getting-here__eyebrow">
          <Icon name="map" size={18} />
          학교까지 오는 법
        </p>
        <p className="getting-here__address">
          {event.address}
          <span>
            ({event.postalCode}) {event.school}
          </span>
        </p>
        <div className="getting-here__actions">
          <button type="button" className="btn btn--small btn--ghost" onClick={copyAddress}>
            <Icon name={copied ? "check" : "copy"} size={16} />
            {copied ? "복사했어요!" : "주소 복사"}
          </button>
          <a className="btn btn--small getting-here__kakao" href={kakaoUrl} target="_blank" rel="noopener noreferrer">
            카카오맵 길찾기
            <Icon name="external" size={15} />
          </a>
          <a className="btn btn--small getting-here__naver" href={naverUrl} target="_blank" rel="noopener noreferrer">
            네이버 지도
            <Icon name="external" size={15} />
          </a>
        </div>
        <p className="getting-here__hint">카카오맵 길찾기는 도착지가 정문으로 설정돼요.</p>
      </div>

      <ul className="getting-here__transit">
        {transit.map((item) => (
          <li key={item.from}>
            <p className="getting-here__from">{item.from}</p>
            <p className="getting-here__way">
              <Icon name="taxi" size={18} />
              <span>
                택시 <strong>{item.taxi}</strong>
              </span>
            </p>
            <p className="getting-here__way">
              <Icon name="bus" size={18} />
              <span>{item.bus}</span>
            </p>
          </li>
        ))}
      </ul>
      <p className="getting-here__source">
        출처:{" "}
        <a href="https://www.yc.ac.kr/www/campus-info.do" target="_blank" rel="noopener noreferrer">
          연암공과대학교 학교위치/교통
        </a>
        · 버스 노선은 바뀔 수 있으니 출발 전에 지도 앱으로 한 번 더 확인해 주세요.
      </p>
    </div>
  );
};

export const Directions = () => {
  const [active, setActive] = useState(0);
  const mapRef = useRef<CampusMapHandle>(null);
  const mapCardRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLOListElement>(null);
  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);
  const isWide = useMediaQuery("(min-width: 960px)");
  const last = routeSteps.length - 1;

  const select = useCallback(
    (index: number, reveal = false) => {
      mapRef.current?.stop();
      setActive(Math.min(last, Math.max(0, index)));
      // 좁은 화면에서는 지도가 위에 있으니, 단계를 누르면 지도로 올려 보여 줘요.
      if (reveal && !isWide) mapCardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    },
    [isWide, last]
  );

  // 넓은 화면: 스크롤하면서 화면 가운데에 온 단계를 지도에 표시 (지도는 고정)
  useEffect(() => {
    if (!isWide) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const list = listRef.current;
      if (!list || mapRef.current?.isPlaying()) return;
      const box = list.getBoundingClientRect();
      if (box.bottom < 0 || box.top > window.innerHeight) return;
      const anchor = window.innerHeight * 0.45;
      let best = 0;
      let bestDistance = Infinity;
      stepRefs.current.forEach((el, i) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const distance = Math.abs(rect.top + rect.height / 2 - anchor);
        if (distance < bestDistance) {
          bestDistance = distance;
          best = i;
        }
      });
      setActive(best);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", schedule, { passive: true });
    return () => {
      window.removeEventListener("scroll", schedule);
      cancelAnimationFrame(frame);
    };
  }, [isWide]);

  return (
    <section className="section directions" id="directions" aria-labelledby="directions-title">
      <div className="container">
        <SectionHead
          id="directions-title"
          eyebrow="Directions"
          title={
            <>
              정문에서
              <br />
              <em>AI·DX 센터</em>까지
            </>
          }
        >
          <p>
            정문부터 행사장까지 {aboutMeters(route.length)}, 걸어서 {walkMinutes(route.length)}분 정도예요. 지도와 사진을
            따라 천천히 오세요!
          </p>
        </SectionHead>

        <ul className="directions__summary reveal">
          <li className="chip">
            <Icon name="pin" size={16} />
            {event.venue}
          </li>
          <li className="chip">
            <Icon name="walk" size={16} />
            도보 약 {walkMinutes(route.length)}분
          </li>
          <li className="chip">
            <Icon name="route" size={16} />
            {aboutMeters(route.length)}
          </li>
        </ul>

        <div className="directions__layout">
          <div className="directions__map-col">
            <div className="map-card reveal" ref={mapCardRef}>
              <p className="map-card__caption" aria-live="polite">
                <span className="map-card__num">{active + 1}</span>
                {routeSteps[active].title}
              </p>
              <CampusMap ref={mapRef} active={active} onActiveChange={setActive} />
              <div className="map-card__controls">
                <button type="button" className="btn btn--small btn--primary" onClick={() => mapRef.current?.play()}>
                  <Icon name="play" size={14} />길 따라가기
                </button>
                <div className="map-card__pager">
                  <button type="button" onClick={() => select(active - 1)} disabled={active === 0} aria-label="이전 단계">
                    <Icon name="chevronLeft" size={18} />
                  </button>
                  <span>
                    {active + 1} / {routeSteps.length}
                  </span>
                  <button type="button" onClick={() => select(active + 1)} disabled={active === last} aria-label="다음 단계">
                    <Icon name="chevronRight" size={18} />
                  </button>
                </div>
              </div>
              <p className="map-card__note">
                <Icon name="arrowUp" size={14} />
                지도 위쪽이 정문에서 학교 안쪽을 바라본 방향이에요.
              </p>
            </div>
            <p className="map-card__credit">지도 데이터: 국토교통부 건물 정보, © OpenStreetMap 기여자</p>
          </div>

          <ol className="route-steps" ref={listRef}>
            {routeSteps.map((step, i) => (
              <li
                key={step.stop}
                ref={(el) => {
                  stepRefs.current[i] = el;
                }}
                // 상태는 data-state 로: className 을 바꾸면 등장 효과(is-in)가 지워져요.
                className={`route-step reveal${step.photo ? "" : " route-step--arrive"}`}
                data-state={i === active ? "active" : i < active ? "past" : "next"}
                style={cssVars({ "--i": i % 2 })}
                onClick={() => select(i, true)}
              >
                <button
                  type="button"
                  className="route-step__num"
                  onClick={(e) => {
                    e.stopPropagation();
                    select(i, true);
                  }}
                  aria-label={`${i + 1}단계 지도에서 보기`}
                  aria-current={i === active ? "step" : undefined}
                >
                  {i === last ? <Icon name="flag" size={16} /> : i + 1}
                </button>
                <div className="route-step__body">
                  <p className="route-step__leg">{legLabel(i)}</p>
                  <h3 className="route-step__title">{step.title}</h3>
                  <p className="route-step__text">{step.text}</p>
                </div>
                {step.photo ? (
                  <img
                    className="route-step__photo"
                    src={step.photo.src}
                    srcSet={`${step.photo.thumb} 320w, ${step.photo.src} 861w`}
                    sizes="(min-width: 960px) 200px, calc(100vw - 100px)"
                    width={861}
                    height={574}
                    alt={step.photo.alt}
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <div className="route-step__goal" aria-hidden="true">
                    <Icon name="sparkles" size={22} />
                    <span>{event.venue}</span>
                  </div>
                )}
              </li>
            ))}
          </ol>
        </div>

        <GettingHere />
      </div>
    </section>
  );
};
