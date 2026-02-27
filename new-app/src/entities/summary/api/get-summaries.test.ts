import { vi, describe, it, expect, beforeEach } from "vitest";
import { getSummaries, GetSummariesArgs } from "./get-summaries";
import { apiClient, proxyApiClient } from "@/shared/api/base";
import { SUMMARY_ENDPOINTS } from "./endpoint";

vi.mock("@/shared/api/base", () => ({
  apiClient: { get: vi.fn() },
  proxyApiClient: { get: vi.fn() },
}));

const mockedProxy = vi.mocked(proxyApiClient);
const mockedApi = vi.mocked(apiClient);

describe("getSummaries API", () => {
  const mockResponse = {
    summaries: [{ id: "1", name: "Ivan" }],
    total: 25,
  };

  const mockParams = {
    limit: 10,
    page: 1,
  } as GetSummariesArgs;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("должен использовать apiClient при options.isServer: true", async () => {
    mockedApi.get.mockResolvedValue(mockResponse);
    await getSummaries({ ...mockParams, options: { isServer: true } });
    expect(mockedApi.get).toHaveBeenCalledWith(
      SUMMARY_ENDPOINTS.LIST,
      mockParams,
    );
    expect(mockedProxy.get).not.toHaveBeenCalled();
  });

  it("должен использовать mockedProxy по умолчанию (на клиенте)", async () => {
    mockedProxy.get.mockResolvedValue(mockResponse);
    await getSummaries(mockParams);
    expect(mockedProxy.get).toHaveBeenCalledWith(
      SUMMARY_ENDPOINTS.LIST,
      mockParams,
    );
  });

  it("должен корректно рассчитывать totalPages", async () => {
    mockedProxy.get.mockResolvedValue({
      summaries: [],
      total: 25,
    });

    const result = await getSummaries({
      limit: 10,
      page: 1,
    } as GetSummariesArgs);
    expect(result.totalPages).toBe(3);
    expect(result.total).toBe(25);
  });

  it("должен возвращать пустой массив, если API вернул null в summaries", async () => {
    mockedProxy.get.mockResolvedValue({
      summaries: null,
      total: 0,
    });
    const result = await getSummaries({ limit: 10 } as GetSummariesArgs);
    expect(result.summaries).toEqual([]);
    expect(result.totalPages).toBe(0);
  });
});
