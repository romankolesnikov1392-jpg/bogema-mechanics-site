/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_FORMSPREE_ID?: string
  readonly VITE_LEAD_ENDPOINT?: string
}

/** Дата сборки (ISO) — подставляется Vite, нужна для одинакового рендера на сервере и в браузере. */
declare const __BUILD_DATE__: string
