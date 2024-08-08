import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import react from "@vitejs/plugin-react-swc";
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'

// https://vitejs.dev/config/
export default defineConfig(({ mode: _ }) => {
  return  {
    base: './',
    plugins: [
      TanStackRouterVite({
        quoteStyle: "double",
      }),
      react(),
      tsconfigPaths()
    ],
    define: {
      // Define any custom environment variables here
      'process.env.VITE_API_URL': JSON.stringify(process.env.VITE_API_URL),
      'process.env.VITE_APP_HOMEPAGE': process.env.VITE_APP_HOMEPAGE
    },
    server: {
      host: true,
      strictPort: true,
    },
    test: {
      environment: "jsdom",
      setupFiles: ["./vitest.setup.ts"],
      css: true,
    },
    build: {
      target: 'esnext',
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
    }
  }
});