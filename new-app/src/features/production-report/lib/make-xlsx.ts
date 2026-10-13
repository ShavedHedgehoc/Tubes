import ExcelJS from "exceljs";
import { SummaryProductionReportResponse } from "@/entities/summary";
import { format } from "date-fns";
import makeProductionReportPage from "./make-production-report";

export async function makeXLSX(data: SummaryProductionReportResponse) {
  const workbook = new ExcelJS.Workbook();
  makeProductionReportPage({ workbook, data });
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  const url = window.URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `Отчет_по_выпуску_туб_${format(data.startDate, "dd_MM_yyyy")}_${data.endDate}.xlsx`;
  anchor.click();
  window.URL.revokeObjectURL(url);
}
