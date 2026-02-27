import { vi, describe, it, expect, beforeEach } from "vitest";
import { deleteEmployee } from "./delete-employee";
import { proxyApiClient } from "@/shared/api/base";

// 1. Мокаем proxyApiClient
vi.mock("@/shared/api/base", () => ({
  proxyApiClient: {
    delete: vi.fn(),
  },
}));

const mockedProxy = vi.mocked(proxyApiClient);

describe("deleteEmployee API", () => {
  const mockDto = 15;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("должен вызывать patch с правильным URL и данными (DTO)", async () => {
    // Настраиваем успешный ответ
    mockedProxy.delete.mockResolvedValue({ success: true });

    await deleteEmployee(mockDto);

    // Проверяем, что вызвана именно функция patch
    expect(mockedProxy.delete).toHaveBeenCalledWith(`/employees/${mockDto}`);
    expect(mockedProxy.delete).toHaveBeenCalledTimes(1);
  });

  it("должен пробрасывать ошибку (throw), если запрос не удался", async () => {
    // Имитируем ошибку сервера (например, 400 Bad Request)
    const errorResponse = { error: "Validation error" };
    mockedProxy.delete.mockRejectedValue(errorResponse);

    // Проверяем, что функция не "глотает" ошибку, а выбрасывает её дальше
    await expect(deleteEmployee(mockDto)).rejects.toEqual(errorResponse);
  });
});
