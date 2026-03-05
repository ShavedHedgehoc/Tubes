import { ITreshold } from "src/tresholds/dto/get-tresholds.response";

export class BaseStatus {
  id: number;
  createdAt: Date;
  summary_id: number;
  counter_value: number;
  employee_id: number | null;
  operation_id: number | null;
  idle: boolean;
  idle_time: number | null;
  finished: boolean;
  operation?: {
    value: string;
    id: number;
    min_rank: number;
    description: string;
  } | null;
}

// move to dto
type state = "idle" | "working" | "finished";

class IMaterial {
  code: string;
  name: string;
  scanned: boolean;
}

class IStatusCounter {
  counter_value: number;
  idle: boolean;
  createdAt: Date;
}

class IOperation {
  id: number;
  value: string;
  description: string;
  min_rank: number;
}
class IStatus {
  idle: boolean;
  finished: boolean;
  state: state;
  operation_description: string;
  createdAt: Date | null;
  operation_id: number | null;
}
class ISummaryData {
  id: number;
  batch_name: string;
  product_id: number;
  product_name: string;
  product_code: string;
  marking: string;
  batch_id: number;
  conveyor_id: number;
  plan: number;
  isActive: boolean;
  isFinished: boolean;
  shift: number;
}

class IExtrusionParams {
  id: number;
  summary_id: number;
  counter_value: number;
  press_speed: number;
  blow_time: number;
  turning_machine_speed: number;
  annealing_furnace_temp: number;

  // rondel_id: number;
  tube_cilindrical_section_length: number;
  membrane_thickness: number;
  tube_diameter: number;
  tube_cilindrical_section_thickness: number;
  tube_rigidity: number;
  tube_cutting_quality: boolean;
  tube_marking: boolean;
  tightness: boolean;
  external_thread_quality: boolean;
  employee_id: number;
  createdAt: Date;
  // rondel: string;
}

class IVarnishParams {
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

class IOffsetParams {
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
class ISealantParams {
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

export class ActiveSummaryResponse {
  data: ISummaryData;
  extrusionParams: IExtrusionParams | null;
  varnishParams: IVarnishParams | null;
  offsetParams: IOffsetParams | null;
  sealantParams: ISealantParams | null;
  tresholds: ITreshold | null;
  extrusion_note: string | null;
  varnish_note: string | null;
  offset_note: string | null;
  sealant_note: string | null;
  extrusion_materials: IMaterial[] | [];
  varnish_materials: IMaterial[] | [];
  offset_materials: IMaterial[] | [];
  sealant_materials: IMaterial[] | [];
  extrusionStatus: IStatus
  extrusionOperations: IOperation[] | [];
  varnishStatus: IStatus;
  varnishOperations: IOperation[] | [];
  offsetStatus: IStatus;
  offsetOperations: IOperation[] | [];
  sealantStatus: IStatus;
  sealantOperations: IOperation[] | [];
  extrusionIdleTime: number;
  varnishIdleTime: number;
  offsetIdleTime: number;
  sealantIdleTime: number;
  extrusionStatusCounters: IStatusCounter[];
  varnishStatusCounters: IStatusCounter[];
  offsetStatusCounters: IStatusCounter[];
  sealantStatusCounters: IStatusCounter[];
}
