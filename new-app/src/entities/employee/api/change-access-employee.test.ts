import { vi, describe, it, expect, beforeEach } from "vitest";
import { proxyApiClient } from "@/shared/api/base";
import { changeAccessEmployee } from "./change-access-employee";

// 1. Мокаем proxyApiClient
vi.mock("@/shared/api/base", () => ({
  proxyApiClient: {
    patch: vi.fn(),
  },
}));

const mockedProxy = vi.mocked(proxyApiClient);

describe("changeAccessEmployee API", () => {
  const mockDto = 15;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("должен вызывать patch с правильным URL и данными (DTO)", async () => {
    // Настраиваем успешный ответ
    mockedProxy.patch.mockResolvedValue({ success: true });

    await changeAccessEmployee(mockDto);

    // Проверяем, что вызвана именно функция patch
    expect(mockedProxy.patch).toHaveBeenCalledWith(
      `/employees/change_banned/${mockDto}`,
    );
    expect(mockedProxy.patch).toHaveBeenCalledTimes(1);
  });

  it("должен пробрасывать ошибку (throw), если запрос не удался", async () => {
    // Имитируем ошибку сервера (например, 400 Bad Request)
    const errorResponse = { error: "Validation error" };
    mockedProxy.patch.mockRejectedValue(errorResponse);

    // Проверяем, что функция не "глотает" ошибку, а выбрасывает её дальше
    await expect(changeAccessEmployee(mockDto)).rejects.toEqual(errorResponse);
  });
});
