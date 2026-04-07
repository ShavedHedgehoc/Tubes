import { SummaryReportEntity } from "@/entities/summary";
import { format } from "date-fns";
import { Workbook } from "exceljs";

export default function makeVarnishPage({
  workbook,
  data,
}: {
  workbook: Workbook;
  data: SummaryReportEntity;
}) {
  const sheet = workbook.addWorksheet("ТК Пост 2", {
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
  sheet.getCell("A6").value = "Пост №2. Нанесение внутреннего лака (Пост 2)";
  sheet.getCell("A6").font = { bold: true, size: 10 };

  sheet.mergeCells("A8:B8");
  sheet.mergeCells("C8:M8");
  sheet.getCell("C8").value = "1. Характеристики работы оборудования.";

  sheet.mergeCells("N8:Q8");
  sheet.getCell("N8").value = "2. Операционный контроль.";
  sheet.getCell("R8").value = "Сотрудник";

  const tr = data.extrusionParams[0]?.treshold;
  sheet.getRow(10).values = [
    "",
    "",
    tr
      ? `${tr.varnish_varnish_machine_speed_min}-${tr.varnish_varnish_machine_speed_max}`
      : "-",
    tr
      ? `${tr.varnish_total_air_pressure_min}-${tr.varnish_total_air_pressure_max}`
      : "-",
    tr
      ? `${tr.varnish_feed_can_air_pressure_min}-${tr.varnish_feed_can_air_pressure_max}`
      : "-",
    tr
      ? `${tr.varnish_nozzle_regulator_air_pressure_min}-${tr.varnish_nozzle_regulator_air_pressure_max}`
      : "-",
    tr ? `${tr.varnish_cells_speed_min}-${tr.varnish_cells_speed_max}` : "-",
    tr
      ? `${tr.varnish_injection_a_start_position_min}-${tr.varnish_injection_a_start_position_max}\n${tr.varnish_injection_b_start_position_min}-${tr.varnish_injection_b_start_position_max}`
      : "-",
    tr
      ? `${tr.varnish_injection_c_start_position_min}-${tr.varnish_injection_c_start_position_max}\n${tr.varnish_injection_d_start_position_min}-${tr.varnish_injection_d_start_position_max}`
      : "-",
    tr
      ? `${tr.varnish_injection_a_end_position_min}-${tr.varnish_injection_a_end_position_max}\n${tr.varnish_injection_b_end_position_min}-${tr.varnish_injection_b_end_position_max}\n${tr.varnish_injection_c_end_position_min}-${tr.varnish_injection_c_end_position_max}\n${tr.varnish_injection_d_end_position_min}-${tr.varnish_injection_d_end_position_max}`
      : "-",
    tr
      ? `${tr.varnish_tube_molding_start_position_min}-${tr.varnish_tube_molding_start_position_max}`
      : "-",
    tr
      ? `${tr.varnish_tube_molding_end_position_min}-${tr.varnish_tube_molding_end_position_max}`
      : "-",
    tr
      ? `${tr.varnish_polimerization_furnace_temp_min}-${tr.varnish_polimerization_furnace_temp_max}`
      : "-",
    tr
      ? `${tr.varnish_internal_varnish_porosity_min}-${tr.varnish_internal_varnish_porosity_max}`
      : "-",
    "Ok/nOk",
    "Ok/nOk",
    "Ok/nOk",
  ];

  sheet.getRow(11).values = [
    null,
    null,
    "шт/мин",
    "Бар",
    "Бар",
    "Бар",
    "RPM",
    "ед",
    "ед",
    "ед",
    "ед",
    "ед",
    "°C",
    "mA",
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
    { key: "varnishMachineSpeed", width: 10 },
    { key: "totalAirPressure", width: 10 },
    { key: "feedCanAirPressure", width: 16 },
    { key: "nozzleRegulatorAirPressure", width: 16 },
    { key: "cellsSpeed", width: 12 },
    { key: "injectionABStart", width: 12 },
    { key: "injectionCDStart", width: 12 },
    { key: "injectionABCDEnd", width: 16 },
    { key: "tubeMoldingStart", width: 12 },
    { key: "tubeMoldingEnd", width: 12 },
    { key: "polimerizationFurnaceTemp", width: 14 },
    { key: "internalVarnishPorosity", width: 12 },
    { key: "internalSectionalView", width: 12 },
    { key: "aluminiumClearanceLack", width: 12 },
    { key: "unpaintingLack", width: 12 },
    { key: "employee", width: 18 },
  ];

  sheet.getRow(9).values = [
    "время",
    "показания счетчика",
    "скорость лаковой машины",
    "давление воздуха общее",
    "давление воздуха в загрузочной камере",
    "давление воздуха на регуляторах форсунок",
    "скорость ячеек",
    "впрыск А,B начальное положение",
    "впрыск C,D начальное положение",
    "впрыск A,B,C,D конечное положение",
    "вдув тубы начальное положение",
    "вдув тубы конечное положение",
    "температура печи полимеризации",
    "пористость вн. лакового покрытия",
    "внутренний вид тубы в разрезе",
    "отсутствие просветов алюминия",
    "отсутствие непрокрасов и пятен",
  ];
  sheet.mergeCells("A9:A11");
  sheet.mergeCells("B9:B11");
  sheet.mergeCells("R8:R11");
  sheet.mergeCells("O10:O11");
  sheet.mergeCells("P10:P11");
  sheet.mergeCells("Q10:Q11");

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

  data.varnishParams.forEach((row) => {
    const newRow = sheet.addRow({
      time: format(row.createdAt, "HH:mm:ss"),
      counterValue: row.counter_value,
      varnishMachineSpeed: row.varnish_machine_speed,
      totalAirPressure: row.total_air_pressure,
      feedCanAirPressure: row.feed_can_air_pressure,
      nozzleRegulatorAirPressure: row.nozzle_regulator_air_pressure,
      cellsSpeed: row.cells_speed,
      injectionABStart: `${row.injection_a_start_position}/${row.injection_b_start_position}`,
      injectionCDStart: `${row.injection_c_start_position}/${row.injection_d_start_position}`,
      injectionABCDEnd: `${row.injection_a_end_position}/${row.injection_b_end_position}\n${row.injection_c_end_position}/${row.injection_d_end_position}`,
      tubeMoldingStart: row.tube_molding_start_position,
      tubeMoldingEnd: row.tube_molding_end_position,
      polimerizationFurnaceTemp: row.polimerization_furnace_temp,
      internalVarnishPorosity: row.internal_varnish_porosity,
      internalSectionalView: row.internal_sectional_view ? "Ok" : "nOk",
      aluminiumClearanceLack: row.aluminium_clearance_lack ? "Ok" : "nOk",
      unpaintingLack: row.unpainting_lack ? "Ok" : "nOk",
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

  const varnishDefect =
    data.defects.find((x) => x.postValue === 2)?.value ?? "-";
  const footerRow = sheet.addRow({
    time: `Брак: ${varnishDefect} кг`,
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
    tubeMoldingStart: "Гл. технолог  __________________",
  });

  sheet.mergeCells(`A${signRow.number}:J${signRow.number}`);
  sheet.mergeCells(`K${signRow.number}:R${signRow.number}`);
  signRow.eachCell((cell) => {
    cell.font = { size: 12, bold: true };
    cell.alignment = { horizontal: "left", vertical: "bottom" };
  });

  signRow.height = 30;
}
