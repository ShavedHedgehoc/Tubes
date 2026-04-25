import { cleanup, render, screen } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach } from "vitest";
import { format } from "date-fns";
import { SummaryEntity } from "@/entities/summary/model/types";
import { CellContext, ColumnDef, Row } from "@tanstack/react-table";
import { getSummariesColumns } from "./columns";

// 1. Мокаем RowDropdown, так как это отдельный сложный компонент
vi.mock("@/features/summaries/_ui/row-dropdown", () => ({
  default: ({ id }: { id: string }) => <div data-testid={`actions-${id}`} />,
}));

describe("Summary Columns", () => {
  const mockSummary: SummaryEntity = {
    id: 1,
    product_id: 1,
    batch_id: 1,
    conveyor_id: 1,
    plan: 10000,
    isActive: false,
    isFinished: false,
    production: null,
    execution: null,
    defectPercent: null,
    unitWeight: null,
    crewName: null,
    product: {
      id: 1,
      code: "057814",
      marking: "D35хL160 PC BASE",
      name: "Туба PRINCE BASE 100 мл D 35 мм металлическая 2023",
    },
    batch: {
      id: 1,
      name: "123L6",
    },
    conveyor: {
      id: 1,
      name: "201",
    },
    date: new Date("2026-01-01"),
    shift: 2,
    _count: {
      statuses: 1,
    },
  };

  const columns = getSummariesColumns();
  const renderCell = (accessor: string, summary: SummaryEntity) => {
    // Ищем колонку с проверкой типа
    const column = columns.find(
      (c) =>
        ("accessorKey" in c && c.accessorKey === accessor) || c.id === accessor,
    ) as ColumnDef<SummaryEntity> | undefined;

    if (!column || !column.cell)
      throw new Error(`Column ${accessor} not found`);

    // Создаем типизированный контекст
    const context = {
      row: {
        original: summary,
        getValue: (key: string) => summary[key as keyof SummaryEntity],
      } as Row<SummaryEntity>,
      column: column as unknown,
      table: {} as unknown,
      renderValue: () => null,
    } as CellContext<SummaryEntity, unknown>;

    const Cell = column.cell;

    // Рендерим в зависимости от типа ячейки (функция или значение)
    if (typeof Cell === "function") {
      return render(<>{Cell(context)}</>);
    }
    return render(<>{Cell}</>);
  };

  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it("должен корректно отображать дату", () => {
    renderCell("date", mockSummary);
    expect(
      screen.getByText(format(mockSummary.date, "yyyy-MM-dd")),
    ).toBeInTheDocument();
  });

  it("должен корректно форматировать и отображать дату", () => {
    // 1. Создаем тестовую дату
    const testDate = new Date("2026-02-24T12:00:00Z");
    const summaryWithDate = { ...mockSummary, date: testDate };

    // 2. Рендерим ячейку колонки 'date'
    renderCell("date", summaryWithDate);

    // 3. Проверяем результат форматирования yyyy-MM-dd
    // Ожидаем "2026-02-24"
    expect(screen.getByText("2026-02-24")).toBeInTheDocument();
  });

  it("должен корректно отображать конвейер", () => {
    renderCell("conveyor", mockSummary);
    expect(screen.getByText(mockSummary.conveyor.name)).toBeInTheDocument();
  });

  it("должен корректно отображать смену", () => {
    renderCell("shift", mockSummary);
    expect(screen.getByText(mockSummary.shift)).toBeInTheDocument();
  });

  it("должен корректно отображать партию", () => {
    renderCell("batch", mockSummary);
    expect(screen.getByText(mockSummary.batch.name)).toBeInTheDocument();
  });

  it("должен корректно отображать код", () => {
    renderCell("code", mockSummary);
    expect(screen.getByText(mockSummary.product.code)).toBeInTheDocument();
  });

  it("должен корректно отображать артикул", () => {
    renderCell("marking", mockSummary);
    expect(screen.getByText(mockSummary.product.marking)).toBeInTheDocument();
  });
  it("должен корректно отображать наименование", () => {
    renderCell("name", mockSummary);
    expect(screen.getByText(mockSummary.product.name)).toBeInTheDocument();
  });
  it("должен корректно отображать план", () => {
    renderCell("plan", mockSummary);
    expect(screen.getByText(mockSummary.plan)).toBeInTheDocument();
  });

  it("должен корректно отображать пустой статус", () => {
    renderCell("state", mockSummary);
    expect(screen.getByText("-")).toBeInTheDocument();
  });

  it("должен корректно отображать завершенный статус", () => {
    const finishMockSummary = {
      ...mockSummary,
      isFinished: true,
    } as SummaryEntity;
    renderCell("state", finishMockSummary);
    expect(screen.getByText("Завершено")).toBeInTheDocument();
  });

  it("должен корректно отображать рабочий статус", () => {
    const activeMockSummary = {
      ...mockSummary,
      isActive: true,
    } as SummaryEntity;
    renderCell("state", activeMockSummary);
    expect(screen.getByText("В работе")).toBeInTheDocument();
  });

  // it("должен рендерить RowDropdown с правильным ID", () => {
  //     renderCell("actions", mockSummary);
  //     expect(screen.getByTestId("actions-1")).toBeInTheDocument();
  // });
});
