import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true, // Позволяет не импортировать describe, it, expect
    setupFiles: ["./vitest.setup.ts"],
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    // Важно для nuqs и других ESM библиотек
    deps: {
      optimizer: {
        web: {
          include: ["nuqs", "@tanstack/react-query"],
        },
      },
    },
    coverage: {
      provider: "v8",
      include: ["src/features/**", "src/entities/**"],
      exclude: ["src/**/*.test.tsx", "src/**/*.d.ts"],
      reporter: ["text", "json"], // 'html' создаст папку с красивым отчетом
      // include: ['src/features/**', 'src/entities/**'], // Что проверяем
      //   exclude: ['src/**/*.test.tsx', 'src/**/*.d.ts'], // Что исключаем
    },
  },
});
