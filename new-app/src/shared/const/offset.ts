export const OFFSET_PARAMETER_NAMES = {
  counter_value: "Показания счетчика",
  printing_machine_speed: "Скорость принтовальной машины",
  total_air_pressure: "Давление воздуха общее",
  padding_furnace_temp: "Температура печи (грунтование)",
  offset_furnace_temp: "Температура печи (печать)",
  printer_motor: "Мотор принтера",
  base_covers_holders_motor: "Мотор держателей баз. покрытий",
  base_covers_station_motor: "Мотор станции баз. покрытия",
  imprint_quantity_printed_box_1: "1 печатный ящик (отпечатков)", //-количество отпечатков ", //not required
  imprint_quantity_printed_box_2: "2 печатный ящик (отпечатков)", //-количество отпечатков ", //not required
  imprint_quantity_printed_box_3: "3 печатный ящик (отпечатков)", //-количество отпечатков ", //not required
  imprint_quantity_printed_box_4: "4 печатный ящик (отпечатков)", //-количество отпечатков ", //not required
  imprint_quantity_printed_box_5: "5 печатный ящик (отпечатков)", //-количество отпечатков ", //not required
  imprint_quantity_printed_box_6: "6 печатный ящик (отпечатков)", //-количество отпечатков ", //not required
  ink_supply_time: "Время подачи чернил", // decimal
  design_match: "Соответствие дизайну и контрольному образцу", //boolean
  tube_appearance:
    "Внешний вид тубы (разнотон, нечеткий текст, двоение печати)", //boolean
  tube_edge_deformation_lack: "Отсутствие деформации края тубы", //boolean
  aluminium_clearance_lack: "Отсутствие просветов алюминия", //boolean
  drips_lack: "Отсутствие марашек", //boolean
} as const;

export enum OffsetInputParams {
  COUNTER_VALUE = "counter_value",
  PRINTING_MACHINE_SPEED = "printing_machine_speed",
  TOTAL_AIR_PRESSURE = "total_air_pressure",
  PADDING_FURNACE_TEMP = "padding_furnace_temp",
  OFFSET_FURNACE_TEMP = "offset_furnace_temp",
  PRINTER_MOTOR = "printer_motor",
  BASE_COVERS_HOLDERS_MOTOR = "base_covers_holders_motor",
  BASE_COVERS_STATION_MOTOR = "base_covers_station_motor",
  IMPRINT_QUANTITY_PRINTED_BOX_1 = "imprint_quantity_printed_box_1",
  IMPRINT_QUANTITY_PRINTED_BOX_2 = "imprint_quantity_printed_box_2",
  IMPRINT_QUANTITY_PRINTED_BOX_3 = "imprint_quantity_printed_box_3",
  IMPRINT_QUANTITY_PRINTED_BOX_4 = "imprint_quantity_printed_box_4",
  IMPRINT_QUANTITY_PRINTED_BOX_5 = "imprint_quantity_printed_box_5",
  IMPRINT_QUANTITY_PRINTED_BOX_6 = "imprint_quantity_printed_box_6",
  INK_SUPPLY_TIME = "ink_supply_time",
  DESIGN_MATCH = "design_match",
  TUBE_APPEARANCE = "tube_appearance",
  TUBE_EDGE_DEFORMATION_LACK = "tube_edge_deformation_lack",
  ALUMINIUM_CLEARANCE_LACK = "aluminium_clearance_lack",
  DRIPS_LACK = "drips_lack",
}
export const OFFSET_BOOLEAN_PARAMS = [
  OffsetInputParams.DESIGN_MATCH,
  OffsetInputParams.TUBE_APPEARANCE,
  OffsetInputParams.TUBE_EDGE_DEFORMATION_LACK,
  OffsetInputParams.ALUMINIUM_CLEARANCE_LACK,
  OffsetInputParams.DRIPS_LACK,
] as const;

export const OFFSET_TRESHOLDS_MAP: Record<
  OffsetInputParams,
  { min?: string; max?: string; default?: string }
> = {
  [OffsetInputParams.COUNTER_VALUE]: {
    min: undefined,
    max: undefined,
    default: undefined,
  },
  [OffsetInputParams.PRINTING_MACHINE_SPEED]: {
    min: "offset_printing_machine_speed_min",
    max: "offset_printing_machine_speed_max",
    default: undefined,
  },
  [OffsetInputParams.TOTAL_AIR_PRESSURE]: {
    min: "offset_total_air_pressure_min",
    max: "offset_total_air_pressure_max",
    default: undefined,
  },
  [OffsetInputParams.PADDING_FURNACE_TEMP]: {
    min: "offset_padding_furnace_temp_min",
    max: "offset_padding_furnace_temp_max",
    default: undefined,
  },
  [OffsetInputParams.OFFSET_FURNACE_TEMP]: {
    min: "offset_offset_furnace_temp_min",
    max: "offset_offset_furnace_temp_max",
    default: undefined,
  },
  [OffsetInputParams.PRINTER_MOTOR]: {
    min: "offset_printer_motor_min",
    max: "offset_printer_motor_max",
    default: undefined,
  },
  [OffsetInputParams.BASE_COVERS_HOLDERS_MOTOR]: {
    min: "offset_base_covers_holders_motor_min",
    max: "offset_base_covers_holders_motor_max",
    default: undefined,
  },
  [OffsetInputParams.BASE_COVERS_STATION_MOTOR]: {
    min: "offset_base_covers_station_motor_min",
    max: "offset_base_covers_station_motor_max",
    default: undefined,
  },
  [OffsetInputParams.IMPRINT_QUANTITY_PRINTED_BOX_1]: {
    min: "offset_imprint_quantity_printed_box_1_min",
    max: "offset_imprint_quantity_printed_box_1_max",
    default: undefined,
  },
  [OffsetInputParams.IMPRINT_QUANTITY_PRINTED_BOX_2]: {
    min: "offset_imprint_quantity_printed_box_2_min",
    max: "offset_imprint_quantity_printed_box_2_max",
    default: undefined,
  },
  [OffsetInputParams.IMPRINT_QUANTITY_PRINTED_BOX_3]: {
    min: "offset_imprint_quantity_printed_box_3_min",
    max: "offset_imprint_quantity_printed_box_3_max",
    default: undefined,
  },
  [OffsetInputParams.IMPRINT_QUANTITY_PRINTED_BOX_4]: {
    min: "offset_imprint_quantity_printed_box_4_min",
    max: "offset_imprint_quantity_printed_box_4_max",
    default: undefined,
  },
  [OffsetInputParams.IMPRINT_QUANTITY_PRINTED_BOX_5]: {
    min: "offset_imprint_quantity_printed_box_5_min",
    max: "offset_imprint_quantity_printed_box_5_max",
    default: undefined,
  },
  [OffsetInputParams.IMPRINT_QUANTITY_PRINTED_BOX_6]: {
    min: "offset_imprint_quantity_printed_box_6_min",
    max: "offset_imprint_quantity_printed_box_6_max",
    default: undefined,
  },
  [OffsetInputParams.INK_SUPPLY_TIME]: {
    min: "offset_ink_supply_time_min",
    max: "offset_ink_supply_time_max",
    default: undefined,
  },
  [OffsetInputParams.DESIGN_MATCH]: {
    min: undefined,
    max: undefined,
    default: undefined,
  },
  [OffsetInputParams.TUBE_APPEARANCE]: {
    min: undefined,
    max: undefined,
    default: undefined,
  },
  [OffsetInputParams.TUBE_EDGE_DEFORMATION_LACK]: {
    min: undefined,
    max: undefined,
    default: undefined,
  },
  [OffsetInputParams.ALUMINIUM_CLEARANCE_LACK]: {
    min: undefined,
    max: undefined,
    default: undefined,
  },
  [OffsetInputParams.DRIPS_LACK]: {
    min: undefined,
    max: undefined,
    default: undefined,
  },
};
