import { SummaryReportEntity } from "@/entities/summary";
import { format } from "date-fns";
import { Workbook } from "exceljs";

export default function makeOffsetPage({
  workbook,
  data,
}: {
  workbook: Workbook;
  data: SummaryReportEntity;
}) {
  const sheet = workbook.addWorksheet("ТК Пост 3", {
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
  sheet.mergeCells("A1:V1");
  const docCodeCell = sheet.getCell("A1");
  docCodeCell.value = "ЮК.ПР.Ф.ХХХХ";
  docCodeCell.font = { bold: true, size: 8 };
  docCodeCell.alignment = {
    horizontal: "right",
    vertical: "middle",
  };

  sheet.mergeCells("A2:V2");
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

  sheet.getCell("V4").value = `План: ${data.summary.plan}`;
  sheet.getCell("V6").value = `Конвейер: ${data.summary.conveyorName}`;

  (["B4", "F4", "V4", "V6"] as string[]).forEach((cellName: string) => {
    const cell = sheet.getCell(cellName as string);
    cell.alignment = {
      horizontal: "right",
      vertical: "middle",
    };
    cell.font = { bold: true };
  });

  sheet.getCell("I4").font = { bold: true, size: 10 };

  sheet.mergeCells("A6:N6");
  sheet.getCell("A6").value = "Пост №3. Грунтование и печать (Пост 3)";
  sheet.getCell("A6").font = { bold: true, size: 10 };

  sheet.mergeCells("A8:B8");
  sheet.mergeCells("C8:P8");
  sheet.getCell("C8").value = "1. Характеристики работы оборудования.";

  sheet.mergeCells("Q8:U8");
  sheet.getCell("Q8").value = "2. Операционный контроль.";
  sheet.getCell("V8").value = "Сотрудник";

  const tr = data.extrusionParams[0]?.treshold;
  sheet.getRow(10).values = [
    "",
    "",
    tr
      ? `${tr.offset_printing_machine_speed_min}-${tr.offset_printing_machine_speed_max}`
      : "-",
    tr
      ? `${tr.offset_total_air_pressure_min}-${tr.offset_total_air_pressure_max}`
      : "-",
    tr
      ? `${tr.offset_padding_furnace_temp_min}-${tr.offset_padding_furnace_temp_max}`
      : "-",
    tr
      ? `${tr.offset_offset_furnace_temp_min}-${tr.offset_offset_furnace_temp_max}`
      : "-",
    tr ? `${tr.offset_printer_motor_min}-${tr.offset_printer_motor_max}` : "-",
    tr
      ? `${tr.offset_base_covers_holders_motor_min}-${tr.offset_base_covers_holders_motor_max}`
      : "-",
    tr
      ? `${tr.offset_base_covers_station_motor_min}-${tr.offset_base_covers_station_motor_max}`
      : "-",
    tr?.offset_imprint_quantity_printed_box_1_min != null
      ? `${tr.offset_imprint_quantity_printed_box_1_min}-${tr.offset_imprint_quantity_printed_box_1_max}`
      : "-",
    tr?.offset_imprint_quantity_printed_box_2_min != null
      ? `${tr.offset_imprint_quantity_printed_box_2_min}-${tr.offset_imprint_quantity_printed_box_2_max}`
      : "-",
    tr?.offset_imprint_quantity_printed_box_3_min != null
      ? `${tr.offset_imprint_quantity_printed_box_3_min}-${tr.offset_imprint_quantity_printed_box_3_max}`
      : "-",
    tr?.offset_imprint_quantity_printed_box_4_min != null
      ? `${tr.offset_imprint_quantity_printed_box_4_min}-${tr.offset_imprint_quantity_printed_box_4_max}`
      : "-",
    tr?.offset_imprint_quantity_printed_box_5_min != null
      ? `${tr.offset_imprint_quantity_printed_box_5_min}-${tr.offset_imprint_quantity_printed_box_5_max}`
      : "-",
    tr?.offset_imprint_quantity_printed_box_6_min != null
      ? `${tr.offset_imprint_quantity_printed_box_6_min}-${tr.offset_imprint_quantity_printed_box_6_max}`
      : "-",
    tr
      ? `${tr.offset_ink_supply_time_min}-${tr.offset_ink_supply_time_max}`
      : "-",
    "Ok/nOk",
    "Ok/nOk",
    "Ok/nOk",
    "Ok/nOk",
    "Ok/nOk",
  ];

  sheet.getRow(11).values = [
    null,
    null,
    "шт/мин",
    "Бар",
    "°C",
    "°C",
    "RPM",
    "RPM",
    "RPM",
    "шт",
    "шт",
    "шт",
    "шт",
    "шт",
    "шт",
    "сек",
    null,
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
    { key: "printingMachineSpeed", width: 14 },
    { key: "totalAirPressure", width: 10 },
    { key: "paddingFurnaceTemp", width: 12 },
    { key: "offsetFurnaceTemp", width: 12 },

    { key: "printerMotor", width: 12 },
    { key: "baseCoversHoldersMotor", width: 16 },
    { key: "baseCoversStationMotor", width: 12 },

    { key: "printedBox1", width: 12 },
    { key: "printedBox2", width: 12 },
    { key: "printedBox3", width: 12 },
    { key: "printedBox4", width: 12 },
    { key: "printedBox5", width: 12 },
    { key: "printedBox6", width: 12 },

    { key: "inkSupplyTime", width: 12 },

    { key: "designMatch", width: 12 },

    { key: "tubeAppearance", width: 14 },

    { key: "deformationLack", width: 12 },
    { key: "aluminiumClearanceLack", width: 12 },
    { key: "dripsLack", width: 12 },

    { key: "employee", width: 18 },
  ];

  sheet.getRow(9).values = [
    "время",
    "показания счетчика",
    "скорость принтовальной машины",
    "давление воздуха общее",
    "температура печи (грунтование)",
    "температура печи (печать)",
    "мотор принтера",
    "мотор держателей баз. покрытий",
    "мотор станции баз. покрытий",
    "1-й печатный ящик (отпечатков)",
    "2-й печатный ящик (отпечатков)",
    "3-й печатный ящик (отпечатков)",
    "4-й печатный ящик (отпечатков)",
    "5-й печатный ящик (отпечатков)",
    "6-й печатный ящик (отпечатков)",
    "время подачи чернил",
    "соответствие дизайну",
    "внешний вид тубы",
    "отсутствие деформации края",
    "отсутствие просветов алюминия",
    "отсутствие марашек",
  ];
  sheet.mergeCells("A9:A11");
  sheet.mergeCells("B9:B11");
  sheet.mergeCells("V8:V11");

  sheet.mergeCells("Q10:Q11");
  sheet.mergeCells("R10:R11");
  sheet.mergeCells("S10:S11");
  sheet.mergeCells("T10:T11");
  sheet.mergeCells("U10:U11");

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

  data.offsetParams.forEach((row) => {
    const newRow = sheet.addRow({
      time: format(row.createdAt, "HH:mm:ss"),
      counterValue: row.counter_value,

      printingMachineSpeed: row.printing_machine_speed,
      totalAirPressure: row.total_air_pressure,
      paddingFurnaceTemp: row.padding_furnace_temp,
      offsetFurnaceTemp: row.offset_furnace_temp,
      printerMotor: row.printer_motor,
      baseCoversHoldersMotor: row.base_covers_holders_motor,
      baseCoversStationMotor: row.base_covers_station_motor,
      printedBox1: row.imprint_quantity_printed_box_1 ?? "-",
      printedBox2: row.imprint_quantity_printed_box_2 ?? "-",
      printedBox3: row.imprint_quantity_printed_box_3 ?? "-",
      printedBox4: row.imprint_quantity_printed_box_4 ?? "-",
      printedBox5: row.imprint_quantity_printed_box_5 ?? "-",
      printedBox6: row.imprint_quantity_printed_box_6 ?? "-",
      inkSupplyTime: row.ink_supply_time,
      designMatch: row.design_match ? "Ok" : "nOk",
      tubeAppearance: row.tube_appearance ? "Ok" : "nOk",
      deformationLack: row.tube_edge_deformation_lack ? "Ok" : "nOk",
      aluminiumClearanceLack: row.aluminium_clearance_lack ? "Ok" : "nOk",
      dripsLack: row.drips_lack ? "Ok" : "nOk",
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

  const offsetDefect =
    data.defects.find((x) => x.postValue === 3)?.value ?? "-";
  const footerRow = sheet.addRow({
    time: `Брак: ${offsetDefect} кг`,
  });

  sheet.mergeCells(`A${footerRow.number}:V${footerRow.number}`);

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
    printedBox3: "Гл. технолог  __________________",
  });

  sheet.mergeCells(`A${signRow.number}:K${signRow.number}`);
  sheet.mergeCells(`L${signRow.number}:V${signRow.number}`);
  signRow.eachCell((cell) => {
    cell.font = { size: 12, bold: true };
    cell.alignment = { horizontal: "left", vertical: "bottom" };
  });

  signRow.height = 30;
}
