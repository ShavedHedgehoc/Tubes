import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { getMonthBounds } from "./index";

describe("getMonthBounds utility", () => {
  beforeEach(() => {
    // Включаем фейковые таймеры перед каждым тестом
    vi.useFakeTimers();
  });

  afterEach(() => {
    // Возвращаем реальное время после каждого теста
    vi.useRealTimers();
  });

  it("должен возвращать правильные границы для обычного месяца (Май 2026)", () => {
    // Замораживаем время на 15 мая 2026
    const mockDate = new Date(2026, 4, 15);
    vi.setSystemTime(mockDate);

    const { firstDay, lastDay } = getMonthBounds(new Date(2026, 4, 15));

    // Проверка первого числа
    expect(firstDay.getFullYear()).toBe(2026);
    expect(firstDay.getMonth()).toBe(4); // Май (индекс 4)
    expect(firstDay.getDate()).toBe(1);
    expect(firstDay.getHours()).toBe(12);

    // Проверка последнего числа
    expect(lastDay.getDate()).toBe(31);
    expect(lastDay.getHours()).toBe(12);
  });

  it("должен корректно находить 29 февраля в високосный год (2024)", () => {
    // Замораживаем время на любую дату в феврале 2024
    vi.setSystemTime(new Date(2024, 1, 10));

    const { lastDay } = getMonthBounds();

    expect(lastDay.getFullYear()).toBe(2024);
    expect(lastDay.getMonth()).toBe(1); // Февраль
    expect(lastDay.getDate()).toBe(29); // Високосный год
  });

  it("должен корректно работать, если передать дату вручную в аргументы", () => {
    // Проверяем работу функции без системного времени, передавая объект
    const manualDate = new Date(2025, 11, 20); // Декабрь 2025
    const { firstDay, lastDay } = getMonthBounds(manualDate);

    expect(firstDay.getDate()).toBe(1);
    expect(lastDay.getDate()).toBe(31);
    expect(firstDay.getMonth()).toBe(11);
  });
});
