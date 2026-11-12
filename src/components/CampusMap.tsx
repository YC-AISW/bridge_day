import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "../lib/leafletGlobal"; // leaflet-rotate 보다 먼저
import "leaflet-rotate";
import { useEffect, useRef } from "react";
import { destination, destinationOutline, gate, route } from "../campusRoute";

// 지도 타일: 국토교통부 브이월드 (VITE_VWORLD_KEY, 배포 때 GitHub Actions 시크릿으로 넣어요).
// 키가 없으면 Esri 위성사진 · OpenStreetMap 으로 대신 보여 줘요.
// 위성지도에는 브이월드 라벨 층(Hybrid)을 겹치지 않아요: 학교 옛 이름(연암공업전문대학)이 떠서 헷갈려요.
const KEY = import.meta.env.VITE_VWORLD_KEY;
const vworld = (layer: string, ext: string) => `https://api.vworld.kr/req/wmts/1.0.0/${KEY}/${layer}/{z}/{y}/{x}.${ext}`;
const TILE = { maxZoom: 19, maxNativeZoom: 19 };

// 지도 출처: 지도 위 상자 대신 지도 아래에 글자로 적어요 (브이월드는 출처 표시가 필요해요).
const CREDIT = KEY ? "지도 © 국토교통부 브이월드" : "지도 © Esri, © OpenStreetMap contributors";

const satelliteLayer = () =>
  KEY
    ? L.tileLayer(vworld("Satellite", "jpeg"), TILE)
    : L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", TILE);

const baseLayer = () =>
  KEY ? L.tileLayer(vworld("Base", "png"), TILE) : L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", TILE);

// 지도 회전 각도: 정문(동쪽)이 아래로 오게 시계 방향 90°
const BEARING = 90;

// 지도 위 글자 표시 (정문 · 목적지)
const tag = (text: string, kind: "gate" | "dest") =>
  L.divIcon({ className: `map-tag map-tag--${kind}`, html: `<span>${text}</span>`, iconSize: [0, 0], iconAnchor: [0, 0] });

/** 정문에서 AI·DX 센터까지 실제 지도 (2D) */
const CampusMap = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const map = L.map(ref.current, {
      attributionControl: false, // 지도 위 "Leaflet | © ..." 상자는 숨기고 출처는 지도 아래에
      scrollWheelZoom: false, // 마우스 휠은 페이지 스크롤에 쓰고, 확대는 +/- 버튼 · 두 손가락으로
      dragging: true, // 한 손가락(마우스)으로 지도 이동
      minZoom: 15,
      maxZoom: 19,
      // 정문이 아래, AI·DX 센터가 위로 오게 지도를 돌려요 (정문에서 걸어 들어가는 방향이 위쪽).
      rotate: true,
      touchRotate: false,
      shiftKeyRotate: false,
      rotateControl: false,
    });

    const satellite = satelliteLayer().addTo(map);
    L.control
      .layers({ 위성지도: satellite, 일반지도: baseLayer() }, undefined, { position: "bottomright", collapsed: false })
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

    // 위치를 먼저 정한 뒤 돌려요 (위치가 없을 때 돌리면 회전 플러그인이 오류를 내요).
    const bounds = L.latLngBounds([...route, ...destinationOutline]);
    map.setView(bounds.getCenter(), 16, { animate: false });
    map.setBearing(BEARING);

    // 경로 전체가 보이게 맞추되, 위쪽은 이름표가 잘리지 않게 여백을 더 둬요.
    // (확대는 정수 단계만 써요: 반 단계 확대는 타일 경계에 가는 선이 보여요)
    map.fitBounds(bounds, {
      paddingTopLeft: [20, 48],
      paddingBottomRight: [20, 20],
    });
    return () => {
      map.remove();
    };
  }, []);

  return (
    <>
      <div ref={ref} className="campus-map-live" role="region" aria-label="정문에서 AI·DX 센터까지 가는 길 지도" />
      <p className="map-credit">{CREDIT}</p>
    </>
  );
};

export default CampusMap;
