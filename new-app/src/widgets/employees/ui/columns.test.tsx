import { render, screen } from "@testing-library/react";
import { vi, describe, it, expect } from "vitest";

import { CellContext, ColumnDef, Row } from "@tanstack/react-table";
import { EmployeeEntity } from "@/entities/employee";
import { getEmployeesColumns } from "./columns";

// 1. Мокаем RowDropdown, так как это отдельный сложный компонент
vi.mock("@/features/employees/_ui/row-dropdown", () => ({
  default: ({ id }: { id: string }) => <div data-testid={`actions-${id}`} />,
}));

describe("Employee Columns", () => {
  const mockEmployee: EmployeeEntity = {
    id: 1,
    name: "Иванов Иван",
    barcode: "1234567890",
    banned: false,
    rank_id: 1,
    rank: { id: 1, description: "Разряд 1", val: 1 },
  };

  const columns = getEmployeesColumns();
  const renderCell = (accessor: string, summary: EmployeeEntity) => {
    // Ищем колонку с проверкой типа
    const column = columns.find(
      (c) =>
        ("accessorKey" in c && c.accessorKey === accessor) || c.id === accessor,
    ) as ColumnDef<EmployeeEntity> | undefined;

    if (!column || !column.cell)
      throw new Error(`Column ${accessor} not found`);

    // Создаем типизированный контекст
    const context = {
      row: {
        original: summary,
        getValue: (key: string) => summary[key as keyof EmployeeEntity],
      } as Row<EmployeeEntity>,
      column: column as unknown,
      table: {} as unknown,
      renderValue: () => null,
    } as CellContext<EmployeeEntity, unknown>;

    const Cell = column.cell;

    // Рендерим в зависимости от типа ячейки (функция или значение)
    if (typeof Cell === "function") {
      return render(<>{Cell(context)}</>);
    }
    return render(<>{Cell}</>);
  };

  it("должен корректно отображать ФИО", () => {
    renderCell("name", mockEmployee);
    expect(screen.getByText("Иванов Иван")).toBeInTheDocument();
  });

  it("должен отображать описание разряда из вложенного объекта", () => {
    renderCell("rank_id", mockEmployee);
    expect(screen.getByText("Разряд 1")).toBeInTheDocument();
  });

  it("должен отображать статус 'Разрешен', если banned: false", () => {
    renderCell("banned", mockEmployee);
    expect(screen.getByText(/Разрешен/i)).toBeInTheDocument();
  });

  it("должен отображать статус 'Запрещен', если banned: true", () => {
    renderCell("banned", { ...mockEmployee, banned: true });
    expect(screen.getByText(/Запрещен/i)).toBeInTheDocument();
  });

  it("должен рендерить RowDropdown с правильным ID", () => {
    renderCell("actions", mockEmployee);
    expect(screen.getByTestId("actions-1")).toBeInTheDocument();
  });
});
