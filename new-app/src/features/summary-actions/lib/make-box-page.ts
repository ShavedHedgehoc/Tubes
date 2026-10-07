import { SummaryReportEntity } from "@/entities/summary";
import { format } from "date-fns";
import { Workbook } from "exceljs";

export default function makeBoxPage({
  workbook,
  data,
}: {
  workbook: Workbook;
  data: SummaryReportEntity;
}) {
  const sheet = workbook.addWorksheet("Продукция", {
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
  sheet.mergeCells("A1:E1");
  const docCodeCell = sheet.getCell("A1");
  docCodeCell.value = "ЮК.ПР.Ф.ХХХХ";
  docCodeCell.font = { bold: true, size: 8 };
  docCodeCell.alignment = {
    horizontal: "right",
    vertical: "middle",
  };

  sheet.mergeCells("A2:E2");
  const titleCell = sheet.getCell("A2");
  titleCell.value = "ПРОИЗВЕДЕННАЯ ПРОДУКЦИЯ";
  titleCell.font = { bold: true, size: 14 };

  sheet.getCell("A4").value =
    `${data.summary.productMarking} ${data.summary.productName}`;
  sheet.mergeCells("A4:E4");
  sheet.getCell("E5").value =
    `Дата:  ${format(data.summary.date, "dd.MM.yyyy")} (Смена: ${data.summary.shift})`;

  sheet.getCell("E6").value = `Партия: ${data.summary.batchName}`;

  sheet.getCell("E7").value = `План: ${data.summary.plan}`;
  sheet.getCell("E8").value = `Конвейер: ${data.summary.conveyorName}`;

  (["A4", "E4", "E5", "E6", "E7", "E8"] as string[]).forEach(
    (cellName: string) => {
      const cell = sheet.getCell(cellName as string);
      cell.alignment = {
        horizontal: "right",
        vertical: "middle",
      };
      cell.font = { bold: true, size: 10 };
    },
  );

  [10].forEach((rowNum) => {
    const row = sheet.getRow(rowNum);
    row.eachCell((cell) => {
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFD1FAE5" },
      };
      cell.border = {
        top: { style: "thin" },
        bottom: { style: "thin" },
        left: { style: "thin" },
        right: { style: "thin" },
      };
      cell.alignment = {
        horizontal: "center",
        vertical: "middle",
        wrapText: true,
      };
      cell.font = { size: 9, bold: rowNum === 8 };
    });
  });

  sheet.views = [{ state: "frozen", xSplit: 0, ySplit: 10 }];

  sheet.columns = [
    { key: "number", width: 10 },
    { key: "uuid", width: 40 },
    { key: "time", width: 15 },
    { key: "employee", width: 20 },
    { key: "quantity", width: 15 },
  ];

  sheet.getRow(10).values = [
    "№ КОРОБА",
    "UUID",
    "ВРЕМЯ",
    "СОТРУДНИК",
    "КОЛИЧЕСТВО",
  ];

  sheet.getRow(10).eachCell((cell) => {
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
  sheet.getRow(9).height = 30;

  data.boxes.forEach((row) => {
    const newRow = sheet.addRow({
      number: row.number,
      uuid: row.uuid,
      time: format(row.createdAt, "HH:mm:ss"),
      employee: row.employee,
      quantity: row.quantity,
    });
    newRow.height = 20;
    newRow.eachCell((cell) => {
      cell.border = {
        top: { style: "thin" },
        bottom: { style: "thin" },
        left: { style: "thin" },
        right: { style: "thin" },
      };
      cell.alignment = {
        horizontal: "center",
        vertical: "middle",
        wrapText: true,
      };
      cell.font = { size: 9 };
    });
  });

  const overallProduction = data.boxes.reduce(
    (sum, item) => sum + (item.quantity || 0),
    0,
  );
  const footerRow = sheet.addRow({
    number: `Всего: ${overallProduction} шт`,
  });

  sheet.mergeCells(`A${footerRow.number}:E${footerRow.number}`);

  footerRow.eachCell((cell) => {
    cell.font = { size: 12, bold: true };
    cell.border = {
      top: { style: "thin" },
      bottom: { style: "thin" },
      left: { style: "thin" },
      right: { style: "thin" },
    };

    cell.alignment = { horizontal: "right", vertical: "middle" };
  });
  footerRow.height = 25;
}
