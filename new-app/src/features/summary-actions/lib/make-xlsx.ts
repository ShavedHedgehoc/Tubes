import ExcelJS from "exceljs";
import { SummaryReportEntity } from "@/entities/summary";
import { format } from "date-fns";
import makeExtrusionPage from "./make-extrusion-page";
import makeVarnishPage from "./make-varnish-page";
import makeOffsetPage from "./make-offset-page";
import makeSealantPage from "./make-sealant-page";

import { POST_NAMES } from "@/entities/conveyor";
import makeOperationReportPage from "./make-operations-report";

export async function makeXLSX(data: SummaryReportEntity) {
  const workbook = new ExcelJS.Workbook();

  makeExtrusionPage({ workbook, data });
  makeOperationReportPage({
    workbook,
    data,
    pageName: "ОО Пост 1",
    postVal: 1,
    postName: POST_NAMES["extrusion"],
  });
  makeVarnishPage({ workbook, data });
  makeOperationReportPage({
    workbook,
    data,
    pageName: "ОО Пост 2",
    postVal: 2,
    postName: POST_NAMES["varnish"],
  });
  makeOffsetPage({ workbook, data });
  makeOperationReportPage({
    workbook,
    data,
    pageName: "ОО Пост 3",
    postVal: 3,
    postName: POST_NAMES["offset"],
  });
  makeSealantPage({ workbook, data });
  makeOperationReportPage({
    workbook,
    data,
    pageName: "ОО Пост 4",
    postVal: 4,
    postName: POST_NAMES["sealant"],
  });

  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  const url = window.URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `${data.summary.batchName}_${format(data.summary.date, "dd_MM_yyyy")}_${data.summary.shift}.xlsx`;
  anchor.click();
  window.URL.revokeObjectURL(url);
}
