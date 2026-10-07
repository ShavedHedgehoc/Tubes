import { TresholdEntity } from "@/entities/treshold";
import { cn } from "@/shared/lib";

import { ColumnDef } from "@tanstack/react-table";

const tresholdCol = (
  key: keyof TresholdEntity,
  label: string,
  width: number = 100,
  alignHeader: "left" | "center" | "right" = "center",
  align: "left" | "center" | "right" = "center",
): ColumnDef<TresholdEntity> => ({
  accessorKey: key,
  header: () => (
    <div
      className={cn(
        "text-center mx-auto leading-tight",
        "whitespace-normal wrap-break-words px-1",
        alignHeader === "left"
          ? "text-left pl-2"
          : alignHeader === "right"
            ? "text-right pr-2"
            : "text-center",
      )}
      style={{ width: `${width}px` }}
    >
      {label}
    </div>
  ),
  cell: ({ row }) => (
    <div
      className={cn(
        align === "left"
          ? "text-left pl-2"
          : align === "right"
            ? "text-right pr-2"
            : "text-center",
      )}
    >
      {row.getValue(key) ?? "—"}
    </div>
  ),
});

const tresholdGroup = (
  header: string,
  minKey: keyof TresholdEntity,
  maxKey: keyof TresholdEntity,
  width: number = 100,
): ColumnDef<TresholdEntity> => ({
  id: `${minKey}_group`,
  header: () => (
    <div
      className="text-center mx-auto leading-tight whitespace-normal wrap-break-words py-1"
      style={{ width: `${width}px` }}
    >
      {header}
    </div>
  ),
  columns: [
    tresholdCol(minKey, "мин", width / 2),
    tresholdCol(maxKey, "макс", width / 2),
  ],
});

const commonColumns: ColumnDef<TresholdEntity>[] = [
  tresholdCol("product_code", "Код 1С"),
  tresholdCol("product_marking", "Артикул", 100, "center", "left"),
  tresholdCol("product_name", "Наименование", 150, "center", "left"),
  tresholdCol("conveyor_name", "Конвейер"),
];

const uniqueColumns: Record<string, ColumnDef<TresholdEntity>[]> = {
  extrusion: [
    tresholdGroup(
      "Скорость пресса, шт/мин",
      "extrusion_press_speed_min",
      "extrusion_press_speed_max",
      120,
    ),
    tresholdGroup(
      "Время выдува, мс",
      "extrusion_blow_time_min",
      "extrusion_blow_time_max",
    ),
    tresholdGroup(
      "Скорость токарного автомата, шт/мин",
      "extrusion_turning_machine_speed_min",
      "extrusion_turning_machine_speed_max",
      140,
    ),
    tresholdGroup(
      "Температура печи отжига,°С",
      "extrusion_annealing_furnace_temp_min",
      "extrusion_annealing_furnace_temp_max",
    ),
    tresholdGroup(
      "Длина цилиндрической части тубы, мм",
      "extrusion_tube_cylindrical_section_length_min",
      "extrusion_tube_cylindrical_section_length_max",
      160,
    ),
    tresholdGroup(
      "Толщина мембраны, мм",
      "extrusion_membrane_thickness_min",
      "extrusion_membrane_thickness_max",
    ),
    tresholdGroup(
      "Диаметр тубы, мм",
      "extrusion_tube_diameter_min",
      "extrusion_tube_diameter_max",
    ),
    tresholdGroup(
      "Толщина цилиндрической части тубы, мм",
      "extrusion_tube_cylindrical_section_thickness_min",
      "extrusion_tube_cylindrical_section_thickness_max",
      180,
    ),
    tresholdGroup(
      "Жесткость тубы, мм",
      "extrusion_tube_rigidity_min",
      "extrusion_tube_rigidity_max",
    ),
    tresholdCol("extrusion_external_thread_value", "Внешняя резьба, мм"),
  ],
  varnish: [
    tresholdGroup(
      "Скорость лаковой машины, шт/мин",
      "varnish_varnish_machine_speed_min",
      "varnish_varnish_machine_speed_max",
      120,
    ),
    tresholdGroup(
      "Давление воздуха общее, Бар",
      "varnish_total_air_pressure_min",
      "varnish_total_air_pressure_max",
      140,
    ),
    tresholdGroup(
      "Давление воздуха в загрузочной емкости, Бар",
      "varnish_feed_can_air_pressure_min",
      "varnish_feed_can_air_pressure_max",
      180,
    ),
    tresholdGroup(
      "Давление воздуха на регуляторах форсунок, Бар",
      "varnish_nozzle_regulator_air_pressure_min",
      "varnish_nozzle_regulator_air_pressure_max",
      190,
    ),
    tresholdGroup(
      "Скорость ячеек, RPM",
      "varnish_cells_speed_min",
      "varnish_cells_speed_max",
    ),
    tresholdGroup(
      "Впрыск А начальное положение, ед.",
      "varnish_injection_a_start_position_min",
      "varnish_injection_a_start_position_max",
      140,
    ),
    tresholdGroup(
      "Впрыск B начальное положение, ед.",
      "varnish_injection_b_start_position_min",
      "varnish_injection_b_start_position_max",
      140,
    ),
    tresholdGroup(
      "Впрыск C начальное положение, ед.",
      "varnish_injection_c_start_position_min",
      "varnish_injection_c_start_position_max",
      140,
    ),
    tresholdGroup(
      "Впрыск D начальное положение, ед.",
      "varnish_injection_d_start_position_min",
      "varnish_injection_d_start_position_max",
      140,
    ),
    tresholdGroup(
      "Впрыск А конечное положение, ед.",
      "varnish_injection_a_end_position_min",
      "varnish_injection_a_end_position_max",
      140,
    ),
    tresholdGroup(
      "Впрыск B конечное положение, ед.",
      "varnish_injection_b_end_position_min",
      "varnish_injection_b_end_position_max",
      140,
    ),
    tresholdGroup(
      "Впрыск C конечное положение, ед.",
      "varnish_injection_c_end_position_min",
      "varnish_injection_c_end_position_max",
      140,
    ),
    tresholdGroup(
      "Впрыск D конечное положение, ед.",
      "varnish_injection_d_end_position_min",
      "varnish_injection_d_end_position_max",
      140,
    ),
    tresholdGroup(
      "Вдув тубы начальное положение, ед.",
      "varnish_tube_molding_start_position_min",
      "varnish_tube_molding_start_position_max",
      160,
    ),
    tresholdGroup(
      "Вдув тубы конечное положение, ед.",
      "varnish_tube_molding_end_position_min",
      "varnish_tube_molding_end_position_max",
      140,
    ),
    tresholdGroup(
      "Температура печи полимеризации, °С",
      "varnish_polimerization_furnace_temp_min",
      "varnish_polimerization_furnace_temp_max",
      140,
    ),
    tresholdGroup(
      "Пористость внутреннего лакового покрытия, mA",
      "varnish_internal_varnish_porosity_min",
      "varnish_internal_varnish_porosity_max",
      140,
    ),
  ],
  offset: [
    tresholdGroup(
      "Скорость принтовальной машины, шт/мин.",
      "offset_printing_machine_speed_min",
      "offset_printing_machine_speed_max",
      180,
    ),
    tresholdGroup(
      "Давление воздуха общее, Бар.",
      "offset_total_air_pressure_min",
      "offset_total_air_pressure_max",
      140,
    ),
    tresholdGroup(
      "Температура печи (грунтование), С",
      "offset_padding_furnace_temp_min",
      "offset_padding_furnace_temp_max",
      140,
    ),
    tresholdGroup(
      "Температура печи (печать), С",
      "offset_offset_furnace_temp_min",
      "offset_offset_furnace_temp_max",
      140,
    ),
    tresholdGroup(
      "Мотор принтера, RPM",
      "offset_printer_motor_min",
      "offset_printer_motor_max",
    ),
    tresholdGroup(
      "Мотор держателей баз. покрытия, RPM",
      "offset_base_covers_holders_motor_min",
      "offset_base_covers_holders_motor_max",
      140,
    ),
    tresholdGroup(
      "Мотор станции баз.покрытия, RPM",
      "offset_base_covers_station_motor_min",
      "offset_base_covers_station_motor_max",
      140,
    ),
    tresholdGroup(
      "1 печатный ящик - количество отпечатков",
      "offset_imprint_quantity_printed_box_1_min",
      "offset_imprint_quantity_printed_box_1_max",
      160,
    ),
    tresholdGroup(
      "2 печатный ящик - количество отпечатков",
      "offset_imprint_quantity_printed_box_2_min",
      "offset_imprint_quantity_printed_box_2_max",
      160,
    ),
    tresholdGroup(
      "3 печатный ящик - количество отпечатков",
      "offset_imprint_quantity_printed_box_3_min",
      "offset_imprint_quantity_printed_box_3_max",
      160,
    ),
    tresholdGroup(
      "4 печатный ящик - количество отпечатков",
      "offset_imprint_quantity_printed_box_4_min",
      "offset_imprint_quantity_printed_box_4_max",
      160,
    ),
    tresholdGroup(
      "5 печатный ящик - количество отпечатков",
      "offset_imprint_quantity_printed_box_5_min",
      "offset_imprint_quantity_printed_box_5_max",
      160,
    ),
    tresholdGroup(
      "6 печатный ящик - количество отпечатков",
      "offset_imprint_quantity_printed_box_6_min",
      "offset_imprint_quantity_printed_box_6_max",
      160,
    ),
    tresholdGroup(
      "Время подачи чернил, сек",
      "offset_ink_supply_time_min",
      "offset_ink_supply_time_max",
      160,
    ),
  ],
  sealant: [
    tresholdGroup(
      "Скорость колпачковой машины, шт/мин.",
      "sealant_cap_machine_speed_min",
      "sealant_cap_machine_speed_max",
      160,
    ),
    tresholdGroup(
      "Давление воздуха управления форсунок, Бар.",
      "sealant_total_air_pressure_min",
      "sealant_total_air_pressure_max",
      200,
    ),
    tresholdGroup(
      "Захваты вперед, ед.",
      "sealant_holders_forward_min",
      "sealant_holders_forward_max",
    ),
    tresholdGroup(
      "Открытие захваты (лев), ед.",
      "sealant_holders_opening_left_min",
      "sealant_holders_opening_left_max",
      120,
    ),
    tresholdGroup(
      "Открытие захваты (прав), ед.",
      "sealant_holders_opening_right_min",
      "sealant_holders_opening_right_max",
      140,
    ),
    tresholdGroup(
      "Закрытие захвата, ед.",
      "sealant_holders_closing_min",
      "sealant_holders_closing_max",
      160,
    ),
    tresholdGroup(
      "Начало впрыска А",
      "sealant_injection_a_start_min",
      "sealant_injection_a_start_max",
    ),
    tresholdGroup(
      "Начало впрыска B",
      "sealant_injection_b_start_min",
      "sealant_injection_b_start_max",
    ),
    tresholdGroup(
      "Конец впрыска А",
      "sealant_injection_a_end_min",
      "sealant_injection_a_end_max",
    ),
    tresholdGroup(
      "Конец впрыска B",
      "sealant_injection_b_end_min",
      "sealant_injection_b_end_max",
    ),
    tresholdGroup(
      "Положение тубы для впрыска (начальное положение)",
      "sealant_injection_tube_orientation_start_min",
      "sealant_injection_tube_orientation_start_max",
      220,
    ),
    tresholdGroup(
      "Положение тубы для впрыска (конечное положение)",
      "sealant_injection_tube_orientation_end_min",
      "sealant_injection_tube_orientation_end_max",
      220,
    ),
    tresholdGroup(
      "Отступ латексного кольца от края тубы, мм.",
      "sealant_latex_ring_padding_min",
      "sealant_latex_ring_padding_max",
      180,
    ),
    tresholdGroup(
      "Ширина латексного кольца, мм.",
      "sealant_latex_ring_width_min",
      "sealant_latex_ring_width_max",
      160,
    ),
    tresholdGroup(
      "Жесткость готовой тубы, мм",
      "sealant_tube_rigidity_min",
      "sealant_tube_rigidity_max",
      140,
    ),
    tresholdGroup(
      "Измерение крутящего момента откручивания  колпачка, Н. см.",
      "sealant_cap_unscrewing_torque_min",
      "sealant_cap_unscrewing_torque_max",
      220,
    ),
  ],
};

export const baseTresholdColumns: Record<string, ColumnDef<TresholdEntity>[]> =
  Object.fromEntries(
    Object.entries(uniqueColumns).map(([key, cols]) => [
      key,
      [...commonColumns, ...cols],
    ]),
  );
