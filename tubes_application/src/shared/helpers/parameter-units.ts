export const UNITS = {
  PCS: "шт",
  PCS_MIN: "шт/мин",
  MS: "мс",
  TEMP: "°С",
  MM: "мм",
  BAR: "Бар",
  RPM: "RPM",
  ED: "ед.",
  MA: "mA",
  SEC: "c",
  NCM: "Н.см",
  IMPRINTS: "отпечатков",
} as const;

export const PARAMETER_UNITS = {
  // --- COMMON ---
  counter_value: UNITS.PCS,
  total_air_pressure: UNITS.BAR,
  tube_rigidity: UNITS.MM,
  // --- EXTRUSION (EXT_) ---
  press_speed: UNITS.PCS_MIN,
  blow_time: UNITS.MS,
  turning_machine_speed: UNITS.PCS_MIN,
  annealing_furnace_temp: UNITS.TEMP,
  tube_cylindrical_section_length: UNITS.MM,
  membrane_thickness: UNITS.MM,
  tube_diameter: UNITS.MM,
  tube_cylindrical_thickness: UNITS.MM,

  // --- VARNISH (VAR_) ---
  varnish_machine_speed: UNITS.PCS_MIN,
  feed_can_air_pressure: UNITS.BAR,
  nozzle_regulator_air_pressure: UNITS.BAR,
  cells_speed: UNITS.RPM,
  injection_a_start_position: UNITS.ED,
  injection_b_start_position: UNITS.ED,
  injection_c_start_position: UNITS.ED,
  injection_d_start_position: UNITS.ED,
  injection_a_end_position: UNITS.ED,
  injection_b_end_position: UNITS.ED,
  injection_c_end_position: UNITS.ED,
  injection_d_end_position: UNITS.ED,
  tube_molding_start_position: UNITS.ED,
  tube_molding_end_position: UNITS.ED,
  polimerization_furnace_temp: UNITS.TEMP,
  internal_varnish_porosity: UNITS.MA,

  // --- OFFSET (OFF_) ---
  printing_machine_speed: UNITS.PCS_MIN,
  padding_furnace_temp: UNITS.TEMP,
  offset_furnace_temp: UNITS.TEMP,
  printer_motor: UNITS.RPM,
  base_covers_holders_motor: UNITS.RPM,
  base_covers_station_motor: UNITS.RPM,
  imprint_box_1: UNITS.IMPRINTS,
  imprint_box_2: UNITS.IMPRINTS,
  imprint_box_3: UNITS.IMPRINTS,
  imprint_box_4: UNITS.IMPRINTS,
  imprint_box_5: UNITS.IMPRINTS,
  imprint_box_6: UNITS.IMPRINTS,
  ink_supply_time: UNITS.SEC,

  // --- SEALANT (SEA_) ---
  cap_machine_speed: UNITS.PCS_MIN,
  holders_forward: UNITS.ED,
  holders_opening_left: UNITS.ED,
  holders_opening_right: UNITS.ED,
  holders_closing: UNITS.ED,
  latex_ring_padding: UNITS.MM,
  latex_ring_width: UNITS.MM,
  cap_unscrewing_torque: UNITS.NCM,
} as const;

// export type ParameterKey = keyof typeof PARAMETER_UNITS;
// export type UnitValue = (typeof UNITS)[keyof typeof UNITS];
