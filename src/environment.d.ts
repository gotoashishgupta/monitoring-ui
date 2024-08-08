// TypeScript IntelliSense for VITE_ .env variables.
// VITE_ prefixed variables are exposed to the client while non-VITE_ variables aren't
// https://vitejs.dev/guide/env-and-mode.html

/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_APP_TITLE: string;
  readonly VITE_GLOB_APP_TITLE: string;
  readonly VITE_APP_BASE_API: string;
  readonly VITE_APP_HOMEPAGE: string;
  readonly VITE_APP_ENV: 'development' | 'production';
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
