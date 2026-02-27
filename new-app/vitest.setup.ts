import "@testing-library/jest-dom/vitest";
import { vi, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

// Автоматическая очистка DOM после каждого теста
afterEach(() => {
  cleanup();
});

// Глобальный мок для nuqs (чтобы тесты не падали без контекста URL)
vi.mock("nuqs", () => ({
  useQueryStates: vi.fn(() => [{}, vi.fn()]),
  parseAsBoolean: { withDefault: vi.fn(() => ({})) },
  parseAsString: { withDefault: vi.fn(() => ({})) },
  parseAsInteger: { withDefault: vi.fn(() => ({})) },
}));

// Мокаем scrollIntoView, так как в JSDOM его нет
window.HTMLElement.prototype.scrollIntoView = vi.fn();

// Также часто нужны эти заглушки для Radix UI:
window.HTMLElement.prototype.releasePointerCapture = vi.fn();
window.HTMLElement.prototype.hasPointerCapture = vi.fn();
