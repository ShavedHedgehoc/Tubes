import { vi, describe, it, expect, beforeEach } from "vitest";
import { updateEmployee } from "./update-employee";
import { proxyApiClient } from "@/shared/api/base";

// 1. Мокаем proxyApiClient
vi.mock("@/shared/api/base", () => ({
  proxyApiClient: {
    patch: vi.fn(),
  },
}));

const mockedProxy = vi.mocked(proxyApiClient);

describe("updateEmployee API", () => {
  const mockDto = {
    id: "emp-123",
    name: "Иван Обновленный",
    barcode: "9876543210987",
    rank_id: 2,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("должен вызывать patch с правильным URL и данными (DTO)", async () => {
    // Настраиваем успешный ответ
    mockedProxy.patch.mockResolvedValue({ success: true });

    await updateEmployee(mockDto);

    // Проверяем, что вызвана именно функция patch
    expect(mockedProxy.patch).toHaveBeenCalledWith("/employees", mockDto);
    expect(mockedProxy.patch).toHaveBeenCalledTimes(1);
  });

  it("должен пробрасывать ошибку (throw), если запрос не удался", async () => {
    // Имитируем ошибку сервера (например, 400 Bad Request)
    const errorResponse = { error: "Validation error" };
    mockedProxy.patch.mockRejectedValue(errorResponse);

    // Проверяем, что функция не "глотает" ошибку, а выбрасывает её дальше
    await expect(updateEmployee(mockDto)).rejects.toEqual(errorResponse);
  });
});
