import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode}) => {
  const env = loadEnv(mode, '../server/','');;
  const PORT = parseInt(env.PORT) || 5000;
  return {
    plugins: [react()],
    server: {
      proxy: {
        "/api": {
          target: `http://localhost:${PORT}`,
          changeOrigin: true,
        },
      },
    },
  }
});
