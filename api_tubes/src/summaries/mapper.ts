import {
  ExtrusionOperation,
  ExtrusionStatus,
  OffsetOperation,
  OffsetStatus,
  Product,
  SealantOperation,
  SealantStatus,
  Summary,
  VarnishOperation,
  VarnishStatus,
} from "./../../generated/prisma/index.d";
import { Batch } from "./../../generated/prisma/index.d";

export interface IMappedSummary {
  id: number;
  batch_name: string;
  product_id: number;
  product_code: string;
  batch_id: number;
  conveyor_id: number;
  plan: number;
  isActive: boolean;
  isFinished: boolean;
  product_name: string;
  marking: string;
  date: Date;
  shift: number;
}

export interface IMappedExtrusionParams {
  id: number;
  summary_id: number;
  counter_value: number;
  press_speed: number;
  blow_time: number;
  turning_machine_speed: number;
  annealing_furnace_temp: number;
  tube_cylindrical_section_length: number;
  membrane_thickness: number;
  tube_diameter: number;
  tube_cylindrical_section_thickness: number;
  tube_rigidity: number;
  tube_cutting_quality: boolean;
  tightness: boolean;
  tube_marking: boolean;
  external_thread_quality: boolean;
  employee_id: number;
  createdAt: Date;
}

export interface IMappedVarnishParams {
  id: number;
  summary_id: number;
  counter_value: number;
  varnish_machine_speed: number;
  total_air_pressure: number;
  feed_can_air_pressure: number;
  nozzle_regulator_air_pressure: number;
  cells_speed: number;
  injection_a_start_position: number;
  injection_b_start_position: number;
  injection_c_start_position: number;
  injection_d_start_position: number;
  injection_a_end_position: number;
  injection_b_end_position: number;
  injection_c_end_position: number;
  injection_d_end_position: number;
  tube_molding_start_position: number;
  tube_molding_end_position: number;
  polimerization_furnace_temp: number;
  internal_varnish_porosity: number;
  internal_sectional_view: boolean;
  aluminium_clearance_lack: boolean;
  unpainting_lack: boolean;
  employee_id: number;
  createdAt: Date;
}

export interface IMappedOffsetParams {
  id: number;
  summary_id: number;
  counter_value: number;
  printing_machine_speed: number;
  total_air_pressure: number;
  padding_furnace_temp: number;
  offset_furnace_temp: number;
  printer_motor: number;
  base_covers_holders_motor: number;
  base_covers_station_motor: number;
  imprint_quantity_printed_box_1: number | null;
  imprint_quantity_printed_box_2: number | null;
  imprint_quantity_printed_box_3: number | null;
  imprint_quantity_printed_box_4: number | null;
  imprint_quantity_printed_box_5: number | null;
  imprint_quantity_printed_box_6: number | null;
  ink_supply_time: number;
  design_match: boolean;
  tube_appearance: boolean;
  tube_edge_deformation_lack: boolean;
  aluminium_clearance_lack: boolean;
  drips_lack: boolean;
  employee_id: number;
  createdAt: Date;
}

export interface IMappedSealantParams {
  id: number;
  summary_id: number;
  counter_value: number;
  cap_machine_speed: number;
  total_air_pressure: number;
  holders_forward: number;
  holders_opening_left: number;
  holders_opening_right: number;
  holders_closing: number;
  injection_a_start: number;
  injection_b_start: number;
  injection_a_end: number;
  injection_b_end: number;
  injection_tube_orientation_start: number;
  injection_tube_orientation_end: number;
  is_cap_surface_smooth: boolean;
  latex_ring_padding: number;
  latex_ring_width: number;
  tube_rigidity: number;
  cap_unscrewing_torque: number;
  employee_id: number;
  createdAt: Date;
}

type state = "idle" | "working" | "finished";

export interface IMappedOperation {
  idle: boolean;
  finished: boolean;
  state: state;
  operation_description: string;
  createdAt: Date | null;
  operation_id: number | null;
}

export const mappedSummary = ({
  summary,
  batch,
  product,
}: {
  summary: Summary;
  batch: Batch;
  product: Product;
}): IMappedSummary => {
  return {
    id: summary.id,
    date: summary.date,
    batch_name: batch.name,
    product_id: summary.product_id,
    product_code: product.code,
    product_name: product.name,
    marking: product.marking,
    batch_id: summary.batch_id,
    conveyor_id: summary.conveyor_id,
    plan: summary.plan,
    isActive: summary.isActive,
    isFinished: summary.isFinished,
    shift: summary.shift,
  };
};

interface PrismaEntity {
  summary?: unknown;
  employee?: unknown;
  [key: string]: any;
}
export function mapParams<T>(params: T | null): T | null {
  if (!params) return null;
  const { summary: _s, employee: _e, ...data } = params as PrismaEntity;
  return data as T;
}

export const mappedStatus = ({
  status,
  operation,
}: {
  status: ExtrusionStatus | SealantStatus | VarnishStatus | OffsetStatus | null;
  operation:
    | ExtrusionOperation
    | VarnishOperation
    | OffsetOperation
    | SealantOperation
    | null;
}): IMappedOperation => {
  if (!status) {
    return {
      idle: false,
      finished: false,
      state: "working",
      operation_description: "-",
      createdAt: null,
      operation_id: null,
    };
  }

  return {
    idle: status.idle,
    finished: status.finished,
    state:
      status.finished === true
        ? "finished"
        : status.idle === true
          ? "idle"
          : "working",
    createdAt: status.createdAt,
    operation_description: operation ? operation.description : "-",
    operation_id: operation ? operation.id : null,
  };
};
