import { SummaryReportEntity } from "@/entities/summary";
import { format } from "date-fns";
import { Workbook } from "exceljs";

export default function makeExtrusionPage({
  workbook,
  data,
}: {
  workbook: Workbook;
  data: SummaryReportEntity;
}) {
  const sheet = workbook.addWorksheet("ТК Пост 1", {
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
  sheet.mergeCells("A1:P1");
  const docCodeCell = sheet.getCell("A1");
  docCodeCell.value = "ЮК.ПР.Ф.ХХХХ";
  docCodeCell.font = { bold: true, size: 8 };
  docCodeCell.alignment = {
    horizontal: "right",
    vertical: "middle",
  };

  sheet.mergeCells("A2:P2");
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

  sheet.getCell("P4").value = `План: ${data.summary.plan}`;
  sheet.getCell("P6").value = `Конвейер: ${data.summary.conveyorName}`;

  (["B4", "F4", "P4", "P6"] as string[]).forEach((cellName: string) => {
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
    "Пост №1. Экструзия и токарная обработка (Пост 1)";
  sheet.getCell("A6").font = { bold: true, size: 10 };

  sheet.mergeCells("A8:B8");
  sheet.mergeCells("C8:G8");
  sheet.getCell("C8").value = "1. Характеристики работы оборудования.";

  sheet.mergeCells("H8:O8");
  sheet.getCell("H8").value = "2. Операционный контроль.";
  sheet.getCell("P8").value = "Сотрудник";

  const tr = data.extrusionParams[0]?.treshold;
  sheet.getRow(10).values = [
    "",
    "",
    tr
      ? `${tr.extrusion_press_speed_min}-${tr.extrusion_press_speed_max}`
      : "-",
    tr ? `${tr.extrusion_blow_time_min}-${tr.extrusion_blow_time_max}` : "-",
    tr
      ? `${tr.extrusion_turning_machine_speed_min}-${tr.extrusion_turning_machine_speed_max}`
      : "-",
    tr
      ? `${tr.extrusion_annealing_furnace_temp_min}-${tr.extrusion_annealing_furnace_temp_max}`
      : "-",
    tr
      ? `${tr.extrusion_tube_cylindrical_section_length_min}-${tr.extrusion_tube_cylindrical_section_length_max}`
      : "-",
    tr
      ? `${tr.extrusion_membrane_thickness_min}-${tr.extrusion_membrane_thickness_max}`
      : "-",
    tr
      ? `${tr.extrusion_tube_diameter_min}-${tr.extrusion_tube_diameter_max}`
      : "-",
    tr
      ? `${tr.extrusion_tube_cylindrical_section_thickness_min}-${tr.extrusion_tube_cylindrical_section_thickness_max}`
      : "-",
    tr
      ? `${tr.extrusion_tube_rigidity_min}-${tr.extrusion_tube_rigidity_max}`
      : "-",
    "Ok/nOk",
    "Ok/nOk",
    "Ok/nOk",
    "Ok/nOk",
  ];

  sheet.getRow(11).values = [
    null,
    null,
    "шт/мин",
    "мс",
    "шт/мин",
    "°C",
    "мм",
    "мм",
    "мм",
    "мм",
    "мм",
    null,
    null,
    null,
    null,
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
    { key: "pressSpeed", width: 10 },
    { key: "blowTime", width: 10 },
    { key: "turningMachineSpeed", width: 12 },
    { key: "annealingTemp", width: 12 },
    { key: "tubeHeight", width: 12 },
    { key: "membrane", width: 12 },
    { key: "diameter", width: 10 },
    { key: "cylindricalThickness", width: 10 },
    { key: "rigidity", width: 12 },
    { key: "cutting", width: 10 },
    { key: "tightness", width: 13 },
    { key: "marking", width: 12 },
    { key: "thread", width: 8 },
    { key: "employee", width: 18 },
  ];

  sheet.getRow(9).values = [
    "время",
    "показания счетчика",
    "скорость пресса",
    "время выдува",
    "скорость токарного автомата",
    "температура печи отжига",
    "высота тубы",
    "толщина мембраны",
    "диаметр тубы",
    "толщина цил. части",
    "жесткость тубы",
    "качество обрезки",
    "герметичность",
    "маркировка",
    "резьба",
  ];
  sheet.mergeCells("A9:A11");
  sheet.mergeCells("B9:B11");
  sheet.mergeCells("P8:P11");
  sheet.mergeCells("L10:L11");
  sheet.mergeCells("M10:M11");
  sheet.mergeCells("N10:N11");
  sheet.mergeCells("O10:O11");

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

  data.extrusionParams.forEach((row) => {
    const newRow = sheet.addRow({
      time: format(row.createdAt, "HH:mm:ss"),
      counterValue: row.counter_value,
      pressSpeed: row.press_speed,
      blowTime: row.blow_time,
      turningMachineSpeed: row.turning_machine_speed,
      annealingTemp: row.annealing_furnace_temp,
      tubeHeight: row.tube_cylindrical_section_length,
      membrane: row.membrane_thickness,
      diameter: row.tube_diameter,
      cylindricalThickness: row.tube_cylindrical_section_thickness,
      rigidity: row.tube_rigidity,
      cutting: row.tube_cutting_quality ? "Ok" : "nOk",
      tightness: row.tightness ? "Ok" : "nOk",
      marking: row.tube_marking ? "Ok" : "nOk",
      thread: row.external_thread_quality ? "Ok" : "nOk",
      employee: row.employee?.name ?? "-",
    });
    newRow.height = 15;
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
        wrapText: false,
      };
      cell.font = { size: 9 };
    });
  });

  const extrusionDefect =
    data.defects.find((x) => x.postValue === 1)?.value ?? "-";
  const footerRow = sheet.addRow({
    time: `Брак: ${extrusionDefect} кг`,
  });

  sheet.mergeCells(`A${footerRow.number}:P${footerRow.number}`);

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
    diameter: "Гл. технолог  __________________",
  });

  sheet.mergeCells(`A${signRow.number}:H${signRow.number}`);
  sheet.mergeCells(`I${signRow.number}:P${signRow.number}`);
  signRow.eachCell((cell) => {
    cell.font = { size: 12, bold: true };
    cell.alignment = { horizontal: "left", vertical: "bottom" };
  });

  signRow.height = 30;
}
