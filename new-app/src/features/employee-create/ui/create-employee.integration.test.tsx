import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { proxyApiClient } from "@/shared/api/base";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { CreateEmployeeForm } from "./create-employee-form";

// 1. Мокаем базовый API-клиент (самый нижний уровень)
vi.mock("@/shared/api/base", () => ({
  proxyApiClient: {
    post: vi.fn(),
  },
  apiClient: { get: vi.fn() },
}));
const mockedProxy = vi.mocked(proxyApiClient);

describe("Интеграция: Создание сотрудника (Form -> Hook -> API)", () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    vi.clearAllMocks();
    // Создаем свежий QueryClient для каждого теста
    queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
        mutations: { retry: false },
      },
    });
  });

  const renderComponent = () =>
    render(
      <QueryClientProvider client={queryClient}>
        <NuqsAdapter>
          <CreateEmployeeForm
            ranks={[{ id: 1, val: 1, description: "Разряд 1" }]}
          />
        </NuqsAdapter>
      </QueryClientProvider>,
    );

  it("должен пройти путь от заполнения формы до POST запроса в API", async () => {
    // Настраиваем успешный ответ от сервера
    mockedProxy.post.mockResolvedValue({ success: true, message: "OK" });

    renderComponent();

    // 1. Имитируем ввод пользователя
    fireEvent.change(screen.getByPlaceholderText(/введите ФИО/i), {
      target: { value: "Иванов Иван Иванович" },
    });
    fireEvent.change(screen.getByPlaceholderText(/введите штрихкод/i), {
      target: { value: "1234567890123" },
    });

    // 2. Нажимаем кнопку "Создать"
    const submitButton = screen.getByRole("button", {
      name: (name) => name.includes("Создать"),
    });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockedProxy.post).toHaveBeenCalledWith(
        "/employees", // Первый аргумент: URL
        {
          // Второй аргумент: Тело запроса (Body)
          name: "Иванов Иван Иванович",
          barcode: "1234567890123",
          rank_id: 1,
        },
      );
    });

    // 4. ПРОВЕРКА: Очистилась ли форма после успеха?
    expect(screen.getByPlaceholderText(/введите ФИО/i)).toHaveValue("");
  });
});
