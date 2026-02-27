import { vi, describe, it, expect, beforeEach } from "vitest";
import { apiClient, proxyApiClient } from "@/shared/api/base";
import { EmployeeEntity } from "../model/types";
import { getEmployee } from "./get-employee";

// 1. Мокаем API клиенты
vi.mock("@/shared/api/base", () => ({
  apiClient: { get: vi.fn() },
  proxyApiClient: { get: vi.fn() },
}));

const mockedProxy = vi.mocked(proxyApiClient);
const mockedApi = vi.mocked(apiClient);

describe("getEmployee API", () => {
  const mockResponse: EmployeeEntity = {
    id: 1,
    name: "Name",
    barcode: "1234567890123",
    rank_id: 1,
    banned: false,
    rank: {
      id: 1,
      val: 1,
      description: "Первый разряд",
    },
  };

  const mockId = "1";

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("должен использовать apiClient при options.isServer: true", async () => {
    // Используем mockedApi.get напрямую, так как мы сделали vi.mocked выше
    mockedApi.get.mockResolvedValue(mockResponse);

    await getEmployee({ id: mockId, options: { isServer: true } });

    // ВАЖНО: передаем только ОДИН аргумент в expect,
    // так как в коде: client.get(`/employees/by_id/${id}`)
    expect(mockedApi.get).toHaveBeenCalledWith(`/employees/by_id/${mockId}`);
    expect(mockedProxy.get).not.toHaveBeenCalled();
  });

  it("должен использовать mockedProxy по умолчанию (на клиенте)", async () => {
    mockedProxy.get.mockResolvedValue(mockResponse);

    await getEmployee({ id: mockId });

    // Проверяем точное соответствие строки URL
    expect(mockedProxy.get).toHaveBeenCalledWith(`/employees/by_id/${mockId}`);
  });
});
