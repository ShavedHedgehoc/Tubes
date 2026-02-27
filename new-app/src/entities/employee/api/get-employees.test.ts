import { vi, describe, it, expect, beforeEach } from "vitest";
import { getEmployees, GetEmployeesArgs } from "./get-employees";
import { apiClient, proxyApiClient } from "@/shared/api/base";

vi.mock("@/shared/api/base", () => ({
  apiClient: { get: vi.fn() },
  proxyApiClient: { get: vi.fn() },
}));

const mockedProxy = vi.mocked(proxyApiClient);
const mockedApi = vi.mocked(apiClient);

describe("getEmployees API", () => {
  const mockResponse = {
    employees: [{ id: "1", name: "Ivan" }],
    total: 25,
  };

  const mockParams = {
    limit: 10,
    page: 1,
  } as GetEmployeesArgs;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("должен использовать apiClient при options.isServer: true", async () => {
    mockedApi.get.mockResolvedValue(mockResponse);
    await getEmployees({ ...mockParams, options: { isServer: true } });
    expect(mockedApi.get).toHaveBeenCalledWith("employees/list", mockParams);
    expect(mockedProxy.get).not.toHaveBeenCalled();
  });

  it("должен использовать mockedProxy по умолчанию (на клиенте)", async () => {
    mockedProxy.get.mockResolvedValue(mockResponse);
    await getEmployees(mockParams);
    expect(mockedProxy.get).toHaveBeenCalledWith("employees/list", mockParams);
  });

  it("должен корректно рассчитывать totalPages", async () => {
    mockedProxy.get.mockResolvedValue({
      employees: [],
      total: 25,
    });

    const result = await getEmployees({
      limit: 10,
      page: 1,
    } as GetEmployeesArgs);
    expect(result.totalPages).toBe(3);
    expect(result.total).toBe(25);
  });

  it("должен возвращать пустой массив, если API вернул null в employees", async () => {
    mockedProxy.get.mockResolvedValue({
      employees: null,
      total: 0,
    });

    const result = await getEmployees({ limit: 10 } as GetEmployeesArgs);
    expect(result.employees).toEqual([]);
    expect(result.totalPages).toBe(0);
  });
});
