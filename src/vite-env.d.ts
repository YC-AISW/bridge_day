/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** 국토교통부 브이월드 지도 API 키 (.env.local / GitHub Actions 시크릿) */
  readonly VITE_VWORLD_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
