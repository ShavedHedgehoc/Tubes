import { SummaryProductionReportResponse } from "@/entities/summary";
import { format } from "date-fns";
import { Workbook } from "exceljs";

export default function makeProductionReportPage({
  workbook,
  data,
}: {
  workbook: Workbook;
  data: SummaryProductionReportResponse;
}) {
  const sheet = workbook.addWorksheet("Отчет по продукции", {
    pageSetup: {
      orientation: "portrait",
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
  sheet.mergeCells("A1:G1");
  const docCodeCell = sheet.getCell("A1");
  docCodeCell.value = "ЮК.ПР.Ф.ХХХХ";
  docCodeCell.font = { bold: true, size: 8 };
  docCodeCell.alignment = {
    horizontal: "right",
    vertical: "middle",
  };

  sheet.mergeCells("A2:G2");
  const titleCell = sheet.getCell("A2");
  titleCell.value = `ОТЧЕТ ПО ВЫПУСКУ ТУБ С ${format(data.startDate, "dd-MM-yyyy")} ПО ${format(data.endDate, "dd-MM-yyyy")}`;
  titleCell.font = { bold: true, size: 14 };

  sheet.columns = [
    { key: "date", width: 15 },
    { key: "shift", width: 15 },
    { key: "batch", width: 15 },
    { key: "code", width: 15 },
    { key: "marking", width: 30 },
    { key: "productionPerBoxes", width: 18 },
    { key: "production", width: 18 },
  ];

  sheet.getRow(4).values = [
    "Дата",
    "Смена",
    "Партия",
    "Код",
    "Артикул",
    "Промаркировано",
    "Внесено",
  ];

  sheet.getRow(4).eachCell((cell) => {
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
  sheet.getRow(4).height = 40;

  const productionReportRows = data.summaries.map((row) => {
    return {
      date: format(row.date, "dd-MM-yyyy"),
      shift: row.shift === 1 ? "День" : "Ночь",
      batch: row.batch?.name ?? "-",
      code: row.product?.code ?? "-",
      marking: row.product?.marking ?? "-",
      productionPerBoxes: row.productionPerBoxes,
      production: row.production,
    };
  });

  const addedRows = sheet.addRows(productionReportRows);

  addedRows.forEach((newRow) => {
    newRow.height = 20;
    newRow.eachCell({ includeEmpty: true }, (cell, colNumber) => {
      cell.border = {
        top: { style: "thin" },
        bottom: { style: "thin" },
        left: { style: "thin" },
        right: { style: "thin" },
      };
      cell.alignment = {
        horizontal: colNumber === 2 || colNumber === 5 ? "left" : "center",
        vertical: "middle",
        wrapText: true,
        indent: colNumber === 2 || colNumber === 5 ? 1 : 0,
      };
    });
  });
}
