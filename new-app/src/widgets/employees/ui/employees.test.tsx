import { render, waitFor } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach, Mock } from "vitest";
import { getQueryClient } from "@/shared/api/query-client";
import { employeeQueries } from "@/entities/employee/api/employee.queries";
import { ranksQueries } from "@/entities/rank/api";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import EmployeesView from "@/widgets/employees/ui/employees-view";
import { EmployeeParams } from "@/entities/employee/model/search-params";
import { Employees } from "./employees";

// 1. Мокаем зависимости
vi.mock("@/shared/api/query-client", () => ({
  getQueryClient: vi.fn(),
}));

// Мокаем View, чтобы не рендерить всю тяжелую логику списка
vi.mock("@/features/employees/_ui/employees-view", () => ({
  default: vi.fn(() => <div data-testid="employees-view" />),
}));
const mockedGetQueryClient = vi.mocked(getQueryClient);
describe("Server Component: Employees", () => {
  let mockQueryClient: QueryClient;

  beforeEach(() => {
    vi.clearAllMocks();

    // Создаем мок для QueryClient
    mockQueryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });
    vi.spyOn(mockQueryClient, "prefetchQuery").mockResolvedValue(undefined);
    vi.spyOn(mockQueryClient, "fetchQuery").mockResolvedValue({
      ranks: [{ id: 1, description: "Разряд 1" }],
    });
    mockedGetQueryClient.mockReturnValue(mockQueryClient);
  });

  it("должен выполнять предзагрузку данных с правильными параметрами", async () => {
    const testProps = { page: 1, limit: 10, name: "Иван" } as EmployeeParams;
    const expectedEmployeeOptions = employeeQueries.list(testProps, {
      isServer: true,
    });
    const expectedRanksOptions = ranksQueries.list({ isServer: true });
    const JSX = await Employees({ props: testProps });
    render(
      <QueryClientProvider client={mockQueryClient}>{JSX}</QueryClientProvider>,
    );
    expect(mockQueryClient.prefetchQuery).toHaveBeenCalledWith(
      expect.objectContaining({
        queryKey: expectedEmployeeOptions.queryKey,
      }),
    );
    expect(mockQueryClient.fetchQuery).toHaveBeenCalledWith(
      expect.objectContaining({
        queryKey: expectedRanksOptions.queryKey,
      }),
    );
  });

  it("должен передавать пустой массив в EmployeesView, если разряды не пришли", async () => {
    // 1. Очищаем мок конкретно этого компонента перед тестом
    vi.mocked(EmployeesView).mockClear();
    // 2. Настраиваем возврат null
    (mockQueryClient.fetchQuery as Mock).mockResolvedValue({ ranks: null });
    // 3. Получаем JSX и рендерим
    const testProps: EmployeeParams = {
      page: 1,
      limit: 10,
      name: null,
      ranks: [],
      banned: null,
      name_asc: "true",
    };
    const JSX = await Employees({ props: testProps });
    render(
      <QueryClientProvider client={mockQueryClient}>{JSX}</QueryClientProvider>,
    );
    // 4. Проверяем вызовы через проверку всех вызовов (calls)
    // Это обходит проблему порядка рендеров
    await waitFor(() => {
      const calls = vi.mocked(EmployeesView).mock.calls;
      const hasEmptyArrayCall = calls.some(
        (args) => args[0].rankListItems && args[0].rankListItems.length === 0,
      );
      expect(hasEmptyArrayCall).toBe(true);
    });
  });

  it("должен корректно обрабатывать ошибку при загрузке разрядов", async () => {
    // Имитируем критическую ошибку API
    const testProps: EmployeeParams = {
      page: 1,
      limit: 10,
      name: null,
      ranks: [],
      banned: null,
      name_asc: "true",
    };
    (mockQueryClient.fetchQuery as Mock).mockRejectedValue(
      new Error("API Error"),
    );

    // Проверяем, что компонент выбрасывает ошибку (её поймает ErrorBoundary в Next.js)
    await expect(Employees({ props: testProps })).rejects.toThrow("API Error");
  });
});
