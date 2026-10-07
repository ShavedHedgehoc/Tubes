export const VARNISH_PARAMETER_NAMES = {
  counter_value: "Показания счетчика",
  varnish_machine_speed: "Скорость лаковой машины", //шт.мин
  total_air_pressure: "Давление воздуха общее", //Бар //float
  feed_can_air_pressure: "Давление воздуха в загрузочной емкости", //Бар //float
  nozzle_regulator_air_pressure: "Давление воздуха на регуляторах форсунок", //Бар //float
  cells_speed: "Скорость ячеек", //RPM
  injection_a_start_position: "Впрыск А начальное положение", //ед.
  injection_b_start_position: "Впрыск B начальное положение", //ед.
  injection_c_start_position: "Впрыск C начальное положение", //ед.
  injection_d_start_position: "Впрыск D начальное положение", //ед.
  injection_a_end_position: "Впрыск A конечное положение", //ед.
  injection_b_end_position: "Впрыск B конечное положение", //ед.
  injection_c_end_position: "Впрыск C конечное положение", //ед.
  injection_d_end_position: "Впрыск D конечное положение", //ед.
  tube_molding_start_position: "Вдув тубы начальное положение", //ед.
  tube_molding_end_position: "Вдув тубы конечное положение", // ед.
  polimerization_furnace_temp: "Температура печи полимеризации", //°С
  internal_varnish_porosity: "Пористость вн. лакового покрытия", //mA
  internal_sectional_view: "Внутренний вид тубы в разрезе",
  aluminium_clearance_lack: "Отсутствие просветов алюминия",
  unpainting_lack: "Отсутствие непрокрасов и пятен",
} as const;

export enum VarnishInputParams {
  COUNTER_VALUE = "counter_value",
  VARNISH_MACHINE_SPEED = "varnish_machine_speed",
  TOTAL_AIR_PRESSURE = "total_air_pressure",
  FEED_CAN_AIR_PRESSURE = "feed_can_air_pressure",
  NOZZLE_REGULATOR_AIR_PRESSURE = "nozzle_regulator_air_pressure",
  CELLS_SPEED = "cells_speed",
  INJECTION_A_START_POSITION = "injection_a_start_position",
  INJECTION_B_START_POSITION = "injection_b_start_position",
  INJECTION_C_START_POSITION = "injection_c_start_position",
  INJECTION_D_START_POSITION = "injection_d_start_position",
  INJECTION_A_END_POSITION = "injection_a_end_position",
  INJECTION_B_END_POSITION = "injection_b_end_position",
  INJECTION_C_END_POSITION = "injection_c_end_position",
  INJECTION_D_END_POSITION = "injection_d_end_position",
  TUBE_MOLDING_START_POSITION = "tube_molding_start_position",
  TUBE_MOLDING_END_POSITION = "tube_molding_end_position",
  POLIMERIZATION_FURNACE_TEMP = "polimerization_furnace_temp",
  INTERNAL_VARNISH_POROSITY = "internal_varnish_porosity",
  INTERNAL_SECTIONAL_VIEW = "internal_sectional_view",
  ALUMINIUM_CLEARANCE_LACK = "aluminium_clearance_lack",
  UNPAINTING_LACK = "unpainting_lack",
}

export const VARNISH_BOOLEAN_PARAMS = [
  VarnishInputParams.INTERNAL_SECTIONAL_VIEW,
  VarnishInputParams.ALUMINIUM_CLEARANCE_LACK,
  VarnishInputParams.UNPAINTING_LACK,
] as const;

export const VARNISH_TRESHOLDS_MAP: Record<
  VarnishInputParams,
  { min?: string; max?: string; default?: string }
> = {
  [VarnishInputParams.COUNTER_VALUE]: {
    min: undefined,
    max: undefined,
    default: undefined,
  },
  [VarnishInputParams.VARNISH_MACHINE_SPEED]: {
    min: "varnish_varnish_machine_speed_min",
    max: "varnish_varnish_machine_speed_max",
    default: undefined,
  },
  [VarnishInputParams.TOTAL_AIR_PRESSURE]: {
    min: "varnish_total_air_pressure_min",
    max: "varnish_total_air_pressure_max",
    default: undefined,
  },
  [VarnishInputParams.FEED_CAN_AIR_PRESSURE]: {
    min: "varnish_feed_can_air_pressure_min",
    max: "varnish_feed_can_air_pressure_max",
    default: undefined,
  },
  [VarnishInputParams.NOZZLE_REGULATOR_AIR_PRESSURE]: {
    min: "varnish_nozzle_regulator_air_pressure_min",
    max: "varnish_nozzle_regulator_air_pressure_max",
    default: undefined,
  },
  [VarnishInputParams.CELLS_SPEED]: {
    min: "varnish_cells_speed_min",
    max: "varnish_cells_speed_max",
    default: undefined,
  },
  [VarnishInputParams.INJECTION_A_START_POSITION]: {
    min: "varnish_injection_a_start_position_min",
    max: "varnish_injection_a_start_position_max",
    default: undefined,
  },
  [VarnishInputParams.INJECTION_B_START_POSITION]: {
    min: "varnish_injection_b_start_position_min",
    max: "varnish_injection_b_start_position_max",
    default: undefined,
  },
  [VarnishInputParams.INJECTION_C_START_POSITION]: {
    min: "varnish_injection_c_start_position_min",
    max: "varnish_injection_c_start_position_max",
    default: undefined,
  },
  [VarnishInputParams.INJECTION_D_START_POSITION]: {
    min: "varnish_injection_d_start_position_min",
    max: "varnish_injection_d_start_position_max",
    default: undefined,
  },
  [VarnishInputParams.INJECTION_A_END_POSITION]: {
    min: "varnish_injection_a_end_position_min",
    max: "varnish_injection_a_end_position_max",
    default: undefined,
  },
  [VarnishInputParams.INJECTION_B_END_POSITION]: {
    min: "varnish_injection_b_end_position_min",
    max: "varnish_injection_b_end_position_max",
    default: undefined,
  },
  [VarnishInputParams.INJECTION_C_END_POSITION]: {
    min: "varnish_injection_c_end_position_min",
    max: "varnish_injection_c_end_position_max",
    default: undefined,
  },
  [VarnishInputParams.INJECTION_D_END_POSITION]: {
    min: "varnish_injection_d_end_position_min",
    max: "varnish_injection_d_end_position_max",
    default: undefined,
  },
  [VarnishInputParams.TUBE_MOLDING_START_POSITION]: {
    min: "varnish_tube_molding_start_position_min",
    max: "varnish_tube_molding_start_position_max",
    default: undefined,
  },
  [VarnishInputParams.TUBE_MOLDING_END_POSITION]: {
    min: "varnish_tube_molding_end_position_min",
    max: "varnish_tube_molding_end_position_max",
    default: undefined,
  },
  [VarnishInputParams.POLIMERIZATION_FURNACE_TEMP]: {
    min: "varnish_polimerization_furnace_temp_min",
    max: "varnish_polimerization_furnace_temp_max",
    default: undefined,
  },
  [VarnishInputParams.INTERNAL_VARNISH_POROSITY]: {
    min: "varnish_internal_varnish_porosity_min",
    max: "varnish_internal_varnish_porosity_max",
    default: undefined,
  },
  [VarnishInputParams.INTERNAL_SECTIONAL_VIEW]: {
    min: undefined,
    max: undefined,
    default: undefined,
  },
  [VarnishInputParams.ALUMINIUM_CLEARANCE_LACK]: {
    min: undefined,
    max: undefined,
    default: undefined,
  },
  [VarnishInputParams.UNPAINTING_LACK]: {
    min: undefined,
    max: undefined,
    default: undefined,
  },
};
