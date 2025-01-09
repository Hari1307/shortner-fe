/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_BACKEND_URL: string;
  // Add other environment variables if needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}