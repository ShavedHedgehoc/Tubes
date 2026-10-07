export const SEALANT_PARAMETER_NAMES = {
  counter_value: "Показания счетчика",
  cap_machine_speed: "Скорость колпачковой машины", //шт./мин.
  total_air_pressure: "Давление воздуха управления форсунок", //Бар.	//float
  holders_forward: "Захваты вперед", //ед.
  holders_opening_left: "Открытие захваты (лев)", //ед.
  holders_opening_right: "Открытие захваты (прав)", //ед.
  holders_closing: "Закрытие захвата", //ед.
  injection_a_start: "Начало впрыска А",
  injection_b_start: "Начало впрыска B",
  injection_a_end: "Конец впрыска А",
  injection_b_end: "Конец впрыска B",
  injection_tube_orientation_start: "Положение тубы для впрыска (начало)",
  injection_tube_orientation_end: "Положение тубы для впрыска (конец)",
  is_cap_surface_smooth: "Поверхность колпачка гладкая, без царапин", //boolean
  latex_ring_padding: "Отступ латексного кольца от края тубы", //мм.
  latex_ring_width: "Ширина латексного кольца", //мм.
  tube_rigidity: "Жесткость готовой тубы", // мм
  cap_unscrewing_torque: "Измерение крутящего момента откручивания колпачка", // Н.см.
} as const;

export enum SealantInputParams {
  COUNTER_VALUE = "counter_value",
  CAP_MACHINE_SPEED = "cap_machine_speed",
  TOTAL_AIR_PRESSURE = "total_air_pressure",
  HOLDERS_FORWARD = "holders_forward",
  HOLDERS_OPENING_LEFT = "holders_opening_left",
  HOLDERS_OPENING_RIGHT = "holders_opening_right",
  HOLDERS_CLOSING = "holders_closing",
  INJECTION_A_START = "injection_a_start",
  INJECTION_B_START = "injection_b_start",
  INJECTION_A_END = "injection_a_end",
  INJECTION_B_END = "injection_b_end",
  INJECTION_TUBE_ORIENTATION_START = "injection_tube_orientation_start",
  INJECTION_TUBE_ORIENTATION_END = "injection_tube_orientation_end",
  IS_CAP_SURFACE_SMOOTH = "is_cap_surface_smooth",
  LATEX_RING_PADDING = "latex_ring_padding",
  LATEX_RING_WIDTH = "latex_ring_width",
  TUBE_RIGIDITY = "tube_rigidity",
  CAP_UNSCREWING_TORQUE = "cap_unscrewing_torque",
}

export const SEALANT_BOOLEAN_PARAMS = [
  SealantInputParams.IS_CAP_SURFACE_SMOOTH,
] as const;

export const SEALANT_TRESHOLDS_MAP: Record<
  SealantInputParams,
  { min?: string; max?: string; default?: string }
> = {
  [SealantInputParams.COUNTER_VALUE]: {
    min: undefined,
    max: undefined,
    default: undefined,
  },
  [SealantInputParams.CAP_MACHINE_SPEED]: {
    min: "sealant_cap_machine_speed_min",
    max: "sealant_cap_machine_speed_max",
    default: undefined,
  },
  [SealantInputParams.TOTAL_AIR_PRESSURE]: {
    min: "sealant_total_air_pressure_min",
    max: "sealant_total_air_pressure_max",
    default: undefined,
  },
  [SealantInputParams.HOLDERS_FORWARD]: {
    min: "sealant_holders_forward_min",
    max: "sealant_holders_forward_max",
    default: undefined,
  },
  [SealantInputParams.HOLDERS_OPENING_LEFT]: {
    min: "sealant_holders_opening_left_min",
    max: "sealant_holders_opening_left_max",
    default: undefined,
  },
  [SealantInputParams.HOLDERS_OPENING_RIGHT]: {
    min: "sealant_holders_opening_right_min",
    max: "sealant_holders_opening_right_max",
    default: undefined,
  },
  [SealantInputParams.HOLDERS_CLOSING]: {
    min: "sealant_holders_closing_min",
    max: "sealant_holders_closing_max",
    default: undefined,
  },
  [SealantInputParams.INJECTION_A_START]: {
    min: "sealant_injection_a_start_min",
    max: "sealant_injection_a_start_max",
    default: undefined,
  },
  [SealantInputParams.INJECTION_B_START]: {
    min: "sealant_injection_b_start_min",
    max: "sealant_injection_b_start_max",
    default: undefined,
  },
  [SealantInputParams.INJECTION_A_END]: {
    min: "sealant_injection_a_end_min",
    max: "sealant_injection_a_end_max",
    default: undefined,
  },
  [SealantInputParams.INJECTION_B_END]: {
    min: "sealant_injection_b_end_min",
    max: "sealant_injection_b_end_max",
    default: undefined,
  },
  [SealantInputParams.INJECTION_TUBE_ORIENTATION_START]: {
    min: "sealant_injection_tube_orientation_start_min",
    max: "sealant_injection_tube_orientation_start_max",
    default: undefined,
  },
  [SealantInputParams.INJECTION_TUBE_ORIENTATION_END]: {
    min: "sealant_injection_tube_orientation_end_min",
    max: "sealant_injection_tube_orientation_end_max",
    default: undefined,
  },
  [SealantInputParams.IS_CAP_SURFACE_SMOOTH]: {
    min: undefined,
    max: undefined,
    default: undefined,
  },
  [SealantInputParams.LATEX_RING_PADDING]: {
    min: "sealant_latex_ring_padding_min",
    max: "sealant_latex_ring_padding_max",
    default: undefined,
  },
  [SealantInputParams.LATEX_RING_WIDTH]: {
    min: "sealant_latex_ring_width_min",
    max: "sealant_latex_ring_width_max",
    default: undefined,
  },
  [SealantInputParams.TUBE_RIGIDITY]: {
    min: "sealant_tube_rigidity_min",
    max: "sealant_tube_rigidity_max",
    default: undefined,
  },
  [SealantInputParams.CAP_UNSCREWING_TORQUE]: {
    min: "sealant_cap_unscrewing_torque_min",
    max: "sealant_cap_unscrewing_torque_max",
    default: undefined,
  },
};
