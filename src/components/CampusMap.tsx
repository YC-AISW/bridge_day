import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useRef } from "react";
import { destination, destinationOutline, gate, route } from "../campusRoute";

// 지도 타일: 국토교통부 브이월드 (VITE_VWORLD_KEY, 배포 때 GitHub Actions 시크릿으로 넣어요).
// 키가 없으면 Esri 위성사진 · OpenStreetMap 으로 대신 보여 줘요.
// 위성지도에는 브이월드 라벨 층(Hybrid)을 겹치지 않아요: 학교 옛 이름(연암공업전문대학)이 떠서 헷갈려요.
const KEY = import.meta.env.VITE_VWORLD_KEY;
const vworld = (layer: string, ext: string) => `https://api.vworld.kr/req/wmts/1.0.0/${KEY}/${layer}/{z}/{y}/{x}.${ext}`;
const VWORLD_CREDIT = '© <a href="https://www.vworld.kr" target="_blank" rel="noopener noreferrer">국토교통부 브이월드</a>';
const TILE = { maxZoom: 19, maxNativeZoom: 19 };

const satelliteLayer = () =>
  KEY
    ? L.tileLayer(vworld("Satellite", "jpeg"), { ...TILE, attribution: VWORLD_CREDIT })
    : L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
        ...TILE,
        attribution: "Imagery © Esri",
      });

const baseLayer = () =>
  KEY
    ? L.tileLayer(vworld("Base", "png"), { ...TILE, attribution: VWORLD_CREDIT })
    : L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: "© OpenStreetMap contributors",
      });

// 지도 위 글자 표시 (정문 · 목적지)
const tag = (text: string, kind: "gate" | "dest") =>
  L.divIcon({ className: `map-tag map-tag--${kind}`, html: `<span>${text}</span>`, iconSize: [0, 0], iconAnchor: [0, 0] });

/** 정문에서 AI·DX 센터까지 실제 지도 (2D) */
const CampusMap = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    // 휴대폰에서는 한 손가락으로 페이지를 스크롤할 수 있게 지도 끌기는 끄고, 두 손가락 확대만 남겨요.
    const touch = window.matchMedia("(pointer: coarse)").matches;
    const map = L.map(ref.current, {
      scrollWheelZoom: false,
      dragging: !touch,
      minZoom: 15,
      maxZoom: 19,
    });

    const satellite = satelliteLayer().addTo(map);
    L.control
      .layers({ 위성지도: satellite, 일반지도: baseLayer() }, undefined, { position: "topright", collapsed: false })
      .addTo(map);

    // 타일 사이 미세한 틈으로 배경이 비쳐도 눈에 띄지 않게, 지도 종류에 맞는 배경색을 깔아요.
    const container = map.getContainer();
    container.style.background = "#22302a";
    map.on("baselayerchange", (e: L.LayersControlEvent) => {
      container.style.background = e.name === "위성지도" ? "#22302a" : "#f2efe9";
    });

    L.polyline(route, { color: "#fff", weight: 9, opacity: 0.85, lineCap: "round", lineJoin: "round", interactive: false }).addTo(map);
    L.polyline(route, { color: "#0ea5e9", weight: 5, lineCap: "round", lineJoin: "round", interactive: false }).addTo(map);
    L.polygon(destinationOutline, { color: "#fff", weight: 2, fillColor: "#e11d48", fillOpacity: 0.6, interactive: false }).addTo(map);
    L.circleMarker(gate, { radius: 6, color: "#0ea5e9", weight: 3, fillColor: "#fff", fillOpacity: 1, interactive: false }).addTo(map);
    L.marker(destination, { icon: tag("AI·DX 센터 1층", "dest"), interactive: false, keyboard: false }).addTo(map);
    L.marker(gate, { icon: tag("정문", "gate"), interactive: false, keyboard: false }).addTo(map);

    // 경로 전체가 보이게 맞추되, 위쪽은 이름표가 잘리지 않게 여백을 더 둬요.
    // (확대는 정수 단계만 써요: 반 단계 확대는 타일 경계에 가는 선이 보여요)
    map.fitBounds(L.latLngBounds([...route, ...destinationOutline]), {
      paddingTopLeft: [20, 56],
      paddingBottomRight: [30, 24],
    });
    return () => {
      map.remove();
    };
  }, []);

  return <div ref={ref} className="campus-map-live" role="region" aria-label="정문에서 AI·DX 센터까지 가는 길 지도" />;
};

export default CampusMap;
