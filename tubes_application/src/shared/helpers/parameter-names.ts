export const EXTRUSION_PARAMETER_NAMES = {
  counter_value: "Показания счетчика",
  press_speed: "Скорость пресса",
  blow_time: "Время выдува",
  turning_machine_speed: "Скорость токарного автомата",
  annealing_furnace_temp: "Температура печи отжига",
  tube_cylindrical_section_length: "Длина цилиндрической части тубы",
  membrane_thickness: "Толщина мембраны",
  tube_diameter: "Диаметр тубы",
  tube_cylindrical_thickness: "Толщина цилиндрической части тубы",
  tube_rigidity: "Жесткость тубы",
  tube_cutting_quality: "Качество обрезки тубы",
  tightness: "Герметичность",
  rondel_type: "Тип рондоли",
  external_thread_quality: "Внешняя резьба",
  tube_marking: "Маркировка тубы",
} as const;

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
  design_match: "Соответсвие дизайну и контрольному образцу", //boolean
  tube_appearance:
    "Внешний вид тубы (разнотон, нечеткий текст, двоение печати)", //boolean
  tube_edge_deformation_lack: "Отсутствие деформации края тубы", //boolean
  aluminium_clearance_lack: "Отсутствие просветов алюминия", //boolean
  drips_lack: "Отсутствие марашек", //boolean
} as const;

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
