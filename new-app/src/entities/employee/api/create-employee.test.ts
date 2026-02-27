import { vi, describe, it, expect, beforeEach } from "vitest";
import { proxyApiClient } from "@/shared/api/base";
import { createEmployee } from "./create-employee";

// 1. Мокаем proxyApiClient
vi.mock("@/shared/api/base", () => ({
  proxyApiClient: {
    post: vi.fn(),
  },
}));

const mockedProxy = vi.mocked(proxyApiClient);

describe("createEmployee API", () => {
  const mockDto = {
    name: "Иван ",
    barcode: "9876543210987",
    rank_id: 2,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("должен вызывать patch с правильным URL и данными (DTO)", async () => {
    // Настраиваем успешный ответ
    mockedProxy.post.mockResolvedValue({ success: true });

    await createEmployee(mockDto);

    // Проверяем, что вызвана именно функция patch
    expect(mockedProxy.post).toHaveBeenCalledWith("/employees", mockDto);
    expect(mockedProxy.post).toHaveBeenCalledTimes(1);
  });

  it("должен пробрасывать ошибку (throw), если запрос не удался", async () => {
    // Имитируем ошибку сервера (например, 400 Bad Request)
    const errorResponse = { error: "Validation error" };
    mockedProxy.post.mockRejectedValue(errorResponse);

    // Проверяем, что функция не "глотает" ошибку, а выбрасывает её дальше
    await expect(createEmployee(mockDto)).rejects.toEqual(errorResponse);
  });
});
