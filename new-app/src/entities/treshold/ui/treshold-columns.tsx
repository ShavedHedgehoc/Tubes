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
        "whitespace-normal break-words px-1",
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
      className="text-center mx-auto leading-tight whitespace-normal break-words py-1"
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
  varnish: [],
  offset: [
    // колонки офсета
  ],
  sealant: [
    // колонки герметика
  ],
};

export const baseTresholdColumns: Record<string, ColumnDef<TresholdEntity>[]> =
  Object.fromEntries(
    Object.entries(uniqueColumns).map(([key, cols]) => [
      key,
      [...commonColumns, ...cols],
    ]),
  );
