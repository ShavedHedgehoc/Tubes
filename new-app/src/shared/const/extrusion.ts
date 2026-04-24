export const EXTRUSION_PARAMETER_NAMES = {
  counter_value: "Показания счетчика",
  press_speed: "Скорость пресса",
  blow_time: "Время выдува",
  turning_machine_speed: "Скорость токарного автомата",
  annealing_furnace_temp: "Температура печи отжига",
  tube_cylindrical_section_length: "Длина цилиндрической части тубы",
  membrane_thickness: "Толщина мембраны",
  tube_diameter: "Диаметр тубы",
  tube_cylindrical_section_thickness: "Толщина цилиндрической части тубы",
  tube_rigidity: "Жесткость тубы",
  tube_cutting_quality: "Качество обрезки тубы",
  tightness: "Герметичность",
  rondel_type: "Тип рондоли",
  external_thread_quality: "Внешняя резьба",
  tube_marking: "Маркировка тубы",
} as const;

export enum ExtrusionInputParams {
  COUNTER_VALUE = "counter_value",
  PRESS_SPEED = "press_speed",
  BLOW_TIME = "blow_time",
  TURNING_MACHINE_SPEED = "turning_machine_speed",
  ANNEALING_FURNACE_TEMP = "annealing_furnace_temp",
  TUBE_CYLINDRICAL_SECTION_LENGTH = "tube_cylindrical_section_length",
  MEMBRANE_THICKNESS = "membrane_thickness",
  TUBE_DIAMETER = "tube_diameter",
  TUBE_CYLINDRICAL_SECTION_THICKNESS = "tube_cylindrical_section_thickness",
  TUBE_RIGIDITY = "tube_rigidity",
  TUBE_CUTTING_QUALITY = "tube_cutting_quality",
  TIGHTNESS = "tightness",
  EXTERNAL_THREAD_QUALITY = "external_thread_quality",
  TUBE_MARKING = "tube_marking",
}

export const EXTRUSION_BOOLEAN_PARAMS = [
  ExtrusionInputParams.TIGHTNESS,
  ExtrusionInputParams.TUBE_MARKING,
  ExtrusionInputParams.TUBE_CUTTING_QUALITY,
  ExtrusionInputParams.EXTERNAL_THREAD_QUALITY,
] as const;

export const EXTRUSION_TRESHOLDS_MAP: Record<
  ExtrusionInputParams,
  { min?: string; max?: string; default?: string }
> = {
  [ExtrusionInputParams.PRESS_SPEED]: {
    min: "extrusion_press_speed_min",
    max: "extrusion_press_speed_max",
  },
  [ExtrusionInputParams.ANNEALING_FURNACE_TEMP]: {
    min: "extrusion_annealing_furnace_temp_min",
    max: "extrusion_annealing_furnace_temp_max",
  },
  [ExtrusionInputParams.COUNTER_VALUE]: {
    min: "",
    max: "",
  },
  [ExtrusionInputParams.BLOW_TIME]: {
    min: "extrusion_blow_time_min",
    max: "extrusion_blow_time_max",
  },
  [ExtrusionInputParams.TURNING_MACHINE_SPEED]: {
    min: "extrusion_turning_machine_speed_min",
    max: "extrusion_turning_machine_speed_max",
  },
  [ExtrusionInputParams.TUBE_CYLINDRICAL_SECTION_LENGTH]: {
    min: "extrusion_tube_cylindrical_section_length_min",
    max: "extrusion_tube_cylindrical_section_length_max",
  },
  [ExtrusionInputParams.MEMBRANE_THICKNESS]: {
    min: "extrusion_membrane_thickness_min",
    max: "extrusion_membrane_thickness_max",
  },
  [ExtrusionInputParams.TUBE_DIAMETER]: {
    min: "extrusion_tube_diameter_min",
    max: "extrusion_tube_diameter_max",
  },
  [ExtrusionInputParams.TUBE_CYLINDRICAL_SECTION_THICKNESS]: {
    min: "extrusion_tube_cylindrical_section_thickness_min",
    max: "extrusion_tube_cylindrical_section_thickness_max",
  },
  [ExtrusionInputParams.TUBE_RIGIDITY]: {
    min: "extrusion_tube_rigidity_min",
    max: "extrusion_tube_rigidity_max",
  },
  [ExtrusionInputParams.TUBE_CUTTING_QUALITY]: {
    min: "",
    max: "",
  },
  [ExtrusionInputParams.TIGHTNESS]: {
    min: "",
    max: "",
  },
  [ExtrusionInputParams.EXTERNAL_THREAD_QUALITY]: {
    min: "",
    max: "",
    default: "extrusion_external_thread_value",
  },
  [ExtrusionInputParams.TUBE_MARKING]: {
    min: "",
    max: "",
  },
};
