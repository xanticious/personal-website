import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/personal-website/",
  server: {
    port: parseInt("3043", 10) || 5173,
  },
});
