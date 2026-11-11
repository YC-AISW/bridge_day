// ===== 오시는 길: 정문 → AI·DX 센터 경로 좌표 (위도, 경도) =====
// 경로는 OpenStreetMap 캠퍼스 도로 데이터를 따라 그렸고, 위성사진과 정문 사진으로 위치를 확인했어요.
// AI·DX 센터 윤곽은 국토교통부 도로명주소 건물 데이터(VWorld)에서 가져왔어요.

export type LatLng = [number, number];

/** 정문에서 AI·DX 센터 앞까지 걷는 길 */
export const route: LatLng[] = [
  [35.1641023, 128.1027], // 정문
  [35.164135, 128.1012491],
  [35.1641578, 128.1002374], // 연암미래관 앞 갈림길 (오른쪽)
  [35.1642339, 128.0999783],
  [35.1644952, 128.0995618],
  [35.1647961, 128.0994158],
  [35.1651206, 128.099436], // 인화관(체육관) 앞 (왼쪽)
  [35.1651452, 128.0989959],
  [35.1651497, 128.098695],
  [35.1651566, 128.0982392],
  [35.1651585, 128.0981], // AI·DX 센터 앞
];

/** AI·DX 센터 건물 윤곽 */
export const destinationOutline: LatLng[] = [
  [35.1654283, 128.0979118],
  [35.1651981, 128.0979118],
  [35.1651962, 128.0982206],
  [35.1651937, 128.0982238],
  [35.1651962, 128.0982267],
  [35.1651959, 128.0982739],
  [35.1654217, 128.0982792],
  [35.1654271, 128.0979777],
  [35.1654437, 128.0979564],
  [35.1654278, 128.097938],
];

export const gate: LatLng = route[0];
export const destination: LatLng = [35.1653099, 128.0980942];

// 두 지점 사이 거리 (m)
const metersBetween = ([lat1, lng1]: LatLng, [lat2, lng2]: LatLng) => {
  const rad = Math.PI / 180;
  const dLat = (lat2 - lat1) * rad;
  const dLng = (lng2 - lng1) * rad;
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * rad) * Math.cos(lat2 * rad) * Math.sin(dLng / 2) ** 2;
  return 6371000 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

/** 정문에서 AI·DX 센터 앞까지 거리 (m) */
export const routeLength = route.slice(1).reduce((sum, point, i) => sum + metersBetween(route[i], point), 0);
