import {
  render,
  screen,
  fireEvent,
  waitFor,
  within,
} from "@testing-library/react";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { vi, describe, it, expect, beforeEach } from "vitest";
import { CreateEmployeeForm } from "../create-employee-form";
import { RankEntity } from "@/entities/rank/model/types";

const mockRanks: RankEntity[] = [
  { id: 1, val: 1, description: "Разряд 1" },
  { id: 2, val: 1, description: "Разряд 2" },
];
const mockMutationState = {
  createEmployee: vi.fn(),
  createPending: false,
};

const mockSetParams = vi.fn();

vi.mock("../../_api/use-create-employee", () => ({
  useCreateEmployee: () => ({
    createEmployee: mockMutationState.createEmployee,
    createPending: mockMutationState.createPending,
  }),
}));

vi.mock("nuqs", async () => {
  const actual = await vi.importActual("nuqs");
  return {
    ...actual,
    useQueryStates: () => [{}, mockSetParams],
  };
});

describe("CreateEmployeeForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockMutationState.createPending = false;
    mockMutationState.createEmployee = vi.fn();
  });

  // Обертка для тестов, чтобы nuqs работал корректно
  const renderForm = (searchParams = {}) => {
    return render(
      <NuqsAdapter {...searchParams}>
        <CreateEmployeeForm ranks={mockRanks} />
      </NuqsAdapter>,
    );
  };

  it("должен корректно отображать заголовок, поля и кнопки", () => {
    renderForm();
    const submitButton = screen.getByRole("button", {
      name: (name) => name.includes("Создать"),
    });
    const clearButton = screen.getByRole("button", {
      name: (name) => name.includes("Очистить"),
    });
    const closeButton = screen.getByRole("button", {
      name: (name) => name.includes("Закрыть"),
    });
    expect(screen.getByText(/Создание нового сотрудника/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/ФИО/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Штрихкод/i)).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toBeInTheDocument();

    expect(submitButton).toHaveTextContent(/создать/i);
    expect(clearButton).toHaveTextContent(/очистить/i);
    expect(closeButton).toHaveTextContent(/закрыть/i);
  });

  it("должен показывать ошибки валидации при пустой отправке", async () => {
    renderForm();
    const submitButton = screen.getByRole("button", {
      name: (name) => name.includes("Создать"),
    });
    fireEvent.click(submitButton);
    expect(await screen.findByText(/минимум 5 символов/i)).toBeInTheDocument();
    expect(mockMutationState.createEmployee).not.toHaveBeenCalled();
  });

  it("должен показывать ошибку, если в штрихкоде есть буквы", async () => {
    renderForm();
    const barcodeInput = screen.getByPlaceholderText(/введите штрихкод/i);

    fireEvent.change(barcodeInput, { target: { value: "abc1234567890" } });
    fireEvent.click(screen.getByRole("button", { name: /создать/i }));

    expect(
      await screen.findByText(/может содержать только цифры/i),
    ).toBeInTheDocument();
  });
  it("должен менять значение в селекторе", async () => {
    renderForm();
    const selectTrigger = screen.getByRole("combobox");
    fireEvent.click(selectTrigger);

    const listbox = await screen.findByRole("listbox");
    const option = within(listbox).getByText("Разряд 2");
    fireEvent.click(option);
    expect(selectTrigger).toHaveTextContent("Разряд 2");
  });

  it("должен успешно отправлять данные при заполнении всех полей", async () => {
    mockMutationState.createEmployee.mockImplementation((data, options) => {
      options.onSuccess?.(); // Эмулируем успешный ответ сервера
    });

    renderForm();
    const submitButton = screen.getByRole("button", {
      name: (name) => name.includes("Создать"),
    });
    fireEvent.change(screen.getByPlaceholderText(/введите ФИО/i), {
      target: { value: "Иванов Иван Иванович" },
    });
    fireEvent.change(screen.getByPlaceholderText(/введите штрихкод/i), {
      target: { value: "1234567890123" },
    });
    const selectTrigger = screen.getByRole("combobox");
    fireEvent.click(selectTrigger);

    const listbox = await screen.findByRole("listbox");
    const option = within(listbox).getByText("Разряд 1");
    fireEvent.click(option);
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockMutationState.createEmployee).toHaveBeenCalledWith(
        expect.objectContaining({
          name: "Иванов Иван Иванович",
          barcode: "1234567890123",
          rank_id: 1, // Проверяем, что число, а не строка
        }),
        expect.any(Object), // Объект с onSuccess
      );
      expect(mockSetParams).toHaveBeenCalledWith(
        expect.objectContaining({ "create-employee": false }),
      );
    });
  });

  it("должен блокировать кнопку при состоянии загрузки", async () => {
    mockMutationState.createPending = true;
    renderForm();
    const submitButton = screen.getByRole("button", {
      name: (name) => name.includes("Создание"),
    });
    const clearButton = screen.getByRole("button", {
      name: (name) => name.includes("Очистить"),
    });
    expect(submitButton).toBeDisabled();
    expect(clearButton).toBeDisabled();
    expect(submitButton.querySelector(".animate-spin")).toBeInTheDocument();
  });

  it("должен очищать поля при нажатии на кнопку 'Очистить'", async () => {
    renderForm();
    const nameInput = screen.getByPlaceholderText(/введите ФИО/i);

    fireEvent.change(nameInput, { target: { value: "Тестовое Имя" } });
    expect(nameInput).toHaveValue("Тестовое Имя");

    const clearButton = screen.getByRole("button", { name: /очистить/i });
    fireEvent.click(clearButton);

    // Проверяем, что значение вернулось к дефолтному (пустоте)
    expect(nameInput).toHaveValue("");
  });

  it("должен вызывать закрытие формы при нажатии на кнопку 'Закрыть'", async () => {
    renderForm();
    const closeButton = screen.getByRole("button", {
      name: (name) => name.includes("Закрыть"),
    });
    fireEvent.click(closeButton);
    expect(mockSetParams).toHaveBeenCalledWith(
      expect.objectContaining({ "create-employee": false }),
    );
  });
});
