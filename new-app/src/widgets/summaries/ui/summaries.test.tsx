import { format } from "date-fns";
import { render } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { vi, describe, it, expect, beforeEach } from "vitest";
import { getQueryClient } from "@/shared/api/query-client";
import { getMonthBounds } from "@/shared/lib";
import { SummaryParams } from "@/entities/summary";
import { summaryQueries } from "@/entities/summary/api";
import { Summaries } from "./summaries";

// 1. Мокаем зависимости
vi.mock("@/shared/api/query-client", () => ({
  getQueryClient: vi.fn(),
}));

// Мокаем View, чтобы не рендерить всю тяжелую логику списка
vi.mock("@/features/summaries/_ui/summaries-view", () => ({
  default: vi.fn(() => <div data-testid="summaries-view" />),
}));
const mockedGetQueryClient = vi.mocked(getQueryClient);
describe("Server Component: Summaries", () => {
  let mockQueryClient: QueryClient;

  beforeEach(() => {
    vi.clearAllMocks();

    // Создаем мок для QueryClient
    mockQueryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });
    vi.spyOn(mockQueryClient, "prefetchQuery");

    mockedGetQueryClient.mockReturnValue(mockQueryClient);
  });

  it("должен выполнять предзагрузку данных с правильными параметрами", async () => {
    const testProps = {
      start_date: format(getMonthBounds().firstDay, "yyyy-MM-dd"),
      end_date: format(getMonthBounds().lastDay, "yyyy-MM-dd"),
      page: 1,
      limit: 10,
    } as SummaryParams;
    const expectedOptions = summaryQueries.list(testProps, { isServer: true });

    const JSX = await Summaries({ props: testProps });
    render(
      <QueryClientProvider client={mockQueryClient}>{JSX}</QueryClientProvider>,
    );
    expect(mockQueryClient.prefetchQuery).toHaveBeenCalledWith(
      expect.objectContaining({
        queryKey: expectedOptions.queryKey,
      }),
    );
  });
});
