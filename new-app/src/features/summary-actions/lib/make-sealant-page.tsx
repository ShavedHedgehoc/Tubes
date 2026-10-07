import { SummaryReportEntity } from "@/entities/summary";
import { format } from "date-fns";
import { Workbook } from "exceljs";

export default function makeSealantPage({
  workbook,
  data,
}: {
  workbook: Workbook;
  data: SummaryReportEntity;
}) {
  const sheet = workbook.addWorksheet("ТК Пост 4", {
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
  sheet.mergeCells("A1:R1");
  const docCodeCell = sheet.getCell("A1");
  docCodeCell.value = "ЮК.ПР.Ф.ХХХХ";
  docCodeCell.font = { bold: true, size: 8 };
  docCodeCell.alignment = {
    horizontal: "right",
    vertical: "middle",
  };

  sheet.mergeCells("A2:R2");
  const titleCell = sheet.getCell("A2");
  titleCell.value = "ТЕХНОЛОГИЧЕСКАЯ КАРТА НА ПРОИЗВОДСТВО ТУБЫ";
  titleCell.font = { bold: true, size: 14 };

  sheet.getCell("A4").value = `Дата: `;
  sheet.mergeCells("B4:C4");
  sheet.getCell("B4").value =
    `${format(data.summary.date, "dd.MM.yyyy")} (Смена: ${data.summary.shift})`;
  sheet.getCell("E4").value = `Партия: `;
  sheet.getCell("F4").value = `${data.summary.batchName}`;
  sheet.getCell("H4").value = `Артикул: `;
  sheet.mergeCells("I4:N4");
  sheet.getCell("I4").value =
    `${data.summary.productMarking} ${data.summary.productName}`;

  sheet.getCell("R4").value = `План: ${data.summary.plan}`;
  sheet.getCell("R6").value = `Конвейер: ${data.summary.conveyorName}`;

  (["B4", "F4", "R4", "R6"] as string[]).forEach((cellName: string) => {
    const cell = sheet.getCell(cellName as string);
    cell.alignment = {
      horizontal: "right",
      vertical: "middle",
    };
    cell.font = { bold: true };
  });

  sheet.getCell("I4").font = { bold: true, size: 10 };

  sheet.mergeCells("A6:N6");
  sheet.getCell("A6").value =
    "Пост №4. Навинчивание колпачка, нанесение герметика (Пост 4)";
  sheet.getCell("A6").font = { bold: true, size: 10 };

  sheet.mergeCells("A8:B8");
  sheet.mergeCells("C8:L8");
  sheet.getCell("C8").value = "1. Характеристики работы оборудования.";

  sheet.mergeCells("M8:Q8");
  sheet.getCell("M8").value = "2. Операционный контроль.";
  sheet.getCell("R8").value = "Сотрудник";

  const tr = data.extrusionParams[0]?.treshold;
  sheet.getRow(10).values = [
    "",
    "",
    tr
      ? `${tr.sealant_cap_machine_speed_min}-${tr.sealant_cap_machine_speed_max}`
      : "-",
    tr
      ? `${tr.sealant_total_air_pressure_min}-${tr.sealant_total_air_pressure_max}`
      : "-",
    tr
      ? `${tr.sealant_holders_forward_min}-${tr.sealant_holders_forward_max}`
      : "-",
    tr
      ? `${tr.sealant_holders_opening_left_min}-${tr.sealant_holders_opening_left_max}`
      : "-",
    tr
      ? `${tr.sealant_holders_opening_right_min}-${tr.sealant_holders_opening_right_max}`
      : "-",
    tr
      ? `${tr.sealant_holders_closing_min}-${tr.sealant_holders_closing_max}`
      : "-",
    tr
      ? `${tr.sealant_injection_a_start_min}-${tr.sealant_injection_a_start_max}\n${tr.sealant_injection_b_start_min}-${tr.sealant_injection_b_start_max}`
      : "-",
    tr
      ? `${tr.sealant_injection_a_end_min}-${tr.sealant_injection_a_end_max}\n${tr.sealant_injection_b_end_min}-${tr.sealant_injection_b_end_max}`
      : "-",
    tr
      ? `${tr.sealant_injection_tube_orientation_start_min}-${tr.sealant_injection_tube_orientation_start_max}`
      : "-",
    tr
      ? `${tr.sealant_injection_tube_orientation_end_min}-${tr.sealant_injection_tube_orientation_end_max}`
      : "-",
    "Ok/nOk",
    tr
      ? `${tr.sealant_latex_ring_padding_min}-${tr.sealant_latex_ring_padding_max}`
      : "-",
    tr
      ? `${tr.sealant_latex_ring_width_min}-${tr.sealant_latex_ring_width_max}`
      : "-",
    tr
      ? `${tr.sealant_tube_rigidity_min}-${tr.sealant_tube_rigidity_max}`
      : "-",
    tr
      ? `${tr.sealant_cap_unscrewing_torque_min}-${tr.sealant_cap_unscrewing_torque_max}`
      : "-",
  ];

  sheet.getRow(11).values = [
    null,
    null,
    "шт/мин",
    "Бар",
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    "мм",
    "мм",
    "мм",
    "Н.см",
  ];

  [8, 9, 10, 11].forEach((rowNum) => {
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

  sheet.views = [{ state: "frozen", xSplit: 0, ySplit: 11 }];

  sheet.columns = [
    { key: "time", width: 10 },
    { key: "counterValue", width: 10 },
    { key: "capMachineSpeed", width: 14 },
    { key: "totalAirPressure", width: 10 },
    { key: "holdersForward", width: 12 },
    { key: "holdersOpeningLeft", width: 12 },
    { key: "holdersOpeningRight", width: 12 },
    { key: "holdersClosing", width: 12 },
    { key: "injectionABStart", width: 12 },
    { key: "injectionABEnd", width: 12 },
    { key: "injectionTubeOrientationStart", width: 16 },
    { key: "injectionTubeOrientationEnd", width: 16 },
    { key: "capQuality", width: 12 },
    { key: "latexRingPadding", width: 16 },
    { key: "latexRingWidth", width: 12 },
    { key: "tubeRigidity", width: 12 },
    { key: "capUnscrewingTorque", width: 16 },
    { key: "employee", width: 18 },
  ];

  sheet.getRow(9).values = [
    "время",
    "показания счетчика",
    "скорость колпачковой машины",
    "давление воздуха общее",
    "захваты вперед",
    "открытие захваты (лев)",
    "открытие захваты (прав)",
    "закрытие захвата",
    "начало впрыска А,B",
    "конец впрыска А,B",
    "положение тубы для впрыска (начало)",
    "положение тубы для впрыска (конец)",
    "поверхность колпачка гладкая",
    "отступ латексного кольца от края тубы",
    "ширина латексного кольца",
    "жесткость готовой тубы",
    "крутящий момента откручивания колпачка",
  ];

  sheet.mergeCells("A9:A11");
  sheet.mergeCells("B9:B11");
  sheet.mergeCells("R8:R11");

  sheet.mergeCells("E10:E11");
  sheet.mergeCells("F10:F11");
  sheet.mergeCells("G10:G11");
  sheet.mergeCells("H10:H11");
  sheet.mergeCells("I10:I11");
  sheet.mergeCells("J10:J11");
  sheet.mergeCells("K10:K11");
  sheet.mergeCells("L10:L11");
  sheet.mergeCells("M10:M11");

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

  data.sealantParams.forEach((row) => {
    const newRow = sheet.addRow({
      time: format(row.createdAt, "HH:mm:ss"),
      counterValue: row.counter_value,
      capMachineSpeed: row.cap_machine_speed,
      totalAirPressure: row.total_air_pressure,
      holdersForward: row.holders_forward,
      holdersOpeningLeft: row.holders_opening_left,
      holdersOpeningRight: row.holders_opening_right,
      holdersClosing: row.holders_closing,
      injectionABStart: `${row.injection_a_start}/${row.injection_b_start}`,
      injectionABEnd: `${row.injection_a_end}/${row.injection_b_end}`,
      injectionTubeOrientationStart: row.injection_tube_orientation_start,
      injectionTubeOrientationEnd: row.injection_tube_orientation_end,
      capQuality: row.is_cap_surface_smooth ? "Ok" : "nOk",
      latexRingPadding: row.latex_ring_padding,
      latexRingWidth: row.latex_ring_width,
      tubeRigidity: row.tube_rigidity,
      capUnscrewingTorque: row.cap_unscrewing_torque,
      employee: row.employee?.name ?? "-",
    });
    newRow.height = 28;
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

  const sealantDefect =
    data.defects.find((x) => x.postValue === 4)?.value ?? "-";
  const footerRow = sheet.addRow({
    time: `Брак: ${sealantDefect} кг`,
  });

  sheet.mergeCells(`A${footerRow.number}:R${footerRow.number}`);

  footerRow.eachCell((cell) => {
    cell.font = { size: 12, bold: true };
    cell.border = {
      top: { style: "thin" },
      bottom: { style: "thin" },
      left: { style: "thin" },
      right: { style: "thin" },
    };
    cell.alignment = { horizontal: "left", vertical: "middle" };
  });
  footerRow.height = 25;

  const signRow = sheet.addRow({
    time: "Оператор  __________________",
    injectionABStart: "Гл. технолог  __________________",
  });

  sheet.mergeCells(`A${signRow.number}:H${signRow.number}`);
  sheet.mergeCells(`I${signRow.number}:R${signRow.number}`);
  signRow.eachCell((cell) => {
    cell.font = { size: 12, bold: true };
    cell.alignment = { horizontal: "left", vertical: "bottom" };
  });
  signRow.height = 30;
}
