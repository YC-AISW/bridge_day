// leaflet-rotate 가 Leaflet 지도에 더하는 옵션 · 메서드
import "leaflet";

declare module "leaflet" {
  interface MapOptions {
    rotate?: boolean;
    bearing?: number;
    touchRotate?: boolean;
    shiftKeyRotate?: boolean;
    rotateControl?: boolean | object;
  }
  interface Map {
    setBearing(theta: number): this;
    getBearing(): number;
  }
}
