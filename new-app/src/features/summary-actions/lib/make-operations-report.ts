import { SummaryReportEntity } from "@/entities/summary";
import { formatDuration } from "@/shared/lib";
import { addMilliseconds, format } from "date-fns";
import { Workbook } from "exceljs";

export default function makeOperationReportPage({
  workbook,
  data,
  pageName,
  postVal,
  postName,
}: {
  workbook: Workbook;
  data: SummaryReportEntity;
  pageName: string;
  postVal: number;
  postName: string;
}) {
  const sheet = workbook.addWorksheet(pageName, {
    pageSetup: {
      orientation: "landscape",
      paperSize: 9,
      fitToPage: true,
      fitToWidth: 1,
      fitToHeight: 0,
      margins: {
        left: 0.25,
        right: 0.25,
        top: 0.25,
        bottom: 0.25,
        header: 0.3,
        footer: 0.3,
      },
    },
    views: [{ state: "normal" }],
  });

  // document code
  sheet.mergeCells("A1:N1");
  const docCodeCell = sheet.getCell("A1");
  docCodeCell.value = "ЮК.ПР.Ф.ХХХХ";
  docCodeCell.font = { bold: true, size: 8 };
  docCodeCell.alignment = {
    horizontal: "right",
    vertical: "middle",
  };

  sheet.mergeCells("A2:I2");
  const titleCell = sheet.getCell("A2");
  titleCell.value = "ОТЧЕТ ОПЕРАТОРА";
  titleCell.font = { bold: true, size: 14 };

  sheet.getCell("A5").value = `Дата: `;
  sheet.getCell("B5").value =
    `${format(data.summary.date, "dd.MM.yyyy")} (Смена: ${data.summary.shift})`;
  sheet.getCell("D5").value = `Партия: `;
  sheet.getCell("E5").value = `${data.summary.batchName}`;
  sheet.getCell("A7").value = `Артикул: `;
  sheet.mergeCells("B7:K7");
  sheet.getCell("B7").value =
    `${data.summary.productMarking} ${data.summary.productName}`;

  sheet.getCell("L5").value = `План: `;
  sheet.getCell("L7").value = `Конвейер: `;

  sheet.mergeCells("L5:M5");
  sheet.mergeCells("L7:M7");

  sheet.getCell("N5").value = `${data.summary.plan}`;
  sheet.getCell("N7").value = `${data.summary.conveyorName}`;

  (["B5", "E5", "N5", "N7"] as string[]).forEach((cellName: string) => {
    const cell = sheet.getCell(cellName as string);
    cell.alignment = {
      horizontal: "right",
      vertical: "middle",
    };
    cell.font = { bold: true };
  });

  sheet.getCell("B7").font = { bold: true, size: 10 };

  sheet.mergeCells("A3:N3");
  sheet.getCell("A3").value = postName;
  sheet.getCell("A3").font = { bold: true, size: 10 };

  sheet.columns = [
    { key: "code", width: 10 },
    { key: "description", width: 30 },
    { key: "start", width: 14 },
    { key: "end", width: 14 },
    { key: "length", width: 14 },
    { key: "employee", width: 18 },
    { key: "comment", width: 18 },
  ];

  sheet.getRow(9).values = [
    "Код операции",
    "Операция",
    "Начало",
    "Окончание",
    "Длительность",
    "Сотрудник",
    "Примечание",
  ];

  sheet.mergeCells("G9:N9");

  sheet.getRow(9).eachCell((cell) => {
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFD1FAE5" },
    };
    cell.font = { bold: true, size: 10 };
    cell.alignment = {
      horizontal: "center",
      vertical: "middle",
      wrapText: true,
    };
    cell.border = {
      top: { style: "thin" },
      bottom: { style: "thin" },
      left: { style: "thin" },
      right: { style: "thin" },
    };
  });
  sheet.getRow(9).height = 40;

  const operationRows = data.statuses
    .filter((x) => x.idle_time && x.post_val === postVal)
    .map((row) => {
      const startDate = new Date(row.createdAt);
      const endDate = addMilliseconds(startDate, row.idle_time!);
      return {
        code: row.operation_value ?? "-",
        description: row.operation_description ?? "-",
        start: format(startDate, "HH:mm:ss"),
        end: format(endDate, "HH:mm:ss"),
        length: formatDuration(row.idle_time!),
        employee: row.employee_name ?? "-",
        comment: "",
      };
    });

  const addedRows = sheet.addRows(operationRows);

  addedRows.forEach((newRow) => {
    newRow.height = 28;
    const rowNumber = newRow.number;
    sheet.mergeCells(`G${rowNumber}:N${rowNumber}`);
    newRow.eachCell({ includeEmpty: true }, (cell, colNumber) => {
      cell.border = {
        top: { style: "thin" },
        bottom: { style: "thin" },
        left: { style: "thin" },
        right: { style: "thin" },
      };
      cell.alignment = {
        horizontal: colNumber === 2 || colNumber === 6 ? "left" : "center",
        vertical: "middle",
        wrapText: true,
        indent: colNumber === 2 || colNumber === 6 ? 1 : 0,
      };
    });
  });
}
