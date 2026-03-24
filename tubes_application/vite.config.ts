import { defineConfig, type PluginOption } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react() as PluginOption, tsconfigPaths() as PluginOption],

  optimizeDeps: {
    include: [
      "es-toolkit",
      "react",
      "react-dom",
      "react-router-dom",
      "react-dom/client",
      "cookie",
      "@chakra-ui/react",
      "@emotion/react",
      "@emotion/styled",
      "framer-motion",
      "axios",
      "zustand",
    ],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          "chakra-ui": [
            "@chakra-ui/react",
            "@emotion/react",
            "@emotion/styled",
            "framer-motion",
          ],
        },
      },
    },
  },
  // server: {
  //   host: true,
  //   port: 3001,
  //   proxy: {
  //     "/api_tubes": {
  //       target: "http://localhost:8000",
  //     },
  //     "/images": {
  //       target: "http://localhost:8000/uploads",
  //       rewrite: (path) => path.replace(/^\/images/, ""),
  //     },
  //   },
  // },
});
