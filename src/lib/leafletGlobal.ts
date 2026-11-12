// leaflet-rotate(지도 회전 플러그인)는 전역 L 을 고쳐 쓰는 방식이라,
// 이 파일을 leaflet-rotate 보다 먼저 import 해서 L 을 window 에 올려 둬요.
import L from "leaflet";

(window as unknown as { L: typeof L }).L = L;
