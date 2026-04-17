// move to product entity
type Product = {
  id: number;
  code: string;
  marking: string;
  name: string;
};
// move to batch entity
type Batch = {
  id: number;
  name: string;
};
//move to conveyor entity
type Conveyor = {
  id: number;
  name: string;
};

type Employee = {
  id: number;
  name: string;
  barcode: string;
  rank_id: number;
  banned: boolean;
};

export type SummaryBase = {
  id: number;
  product_id: number;
  batch_id: number;
  conveyor_id: number;
  plan: number;
  isActive: boolean;
  isFinished: boolean;
  date: Date;
  shift: number;
};

type PostStatusCount = {
  statuses: number;
};

type AvailableSummaryRow = {
  id: number;
  product_id: number;
  batch_id: number;
  conveyor_id: number;
  plan: number;
  isActive: boolean;
  isFinished: boolean;
  date: Date;
  shift: number;
  product: Product;
  batch: Batch;
};

export type SummaryAvailable = SummaryBase & {
  product: Product;
  batch: Batch;
};

// Полная сущность с отношениями
export type SummaryEntity = SummaryAvailable & {
  conveyor: Conveyor;
  _count: PostStatusCount;
};

//тип для фронтенда
export type SummaryResponse = {
  summaries: SummaryEntity[];
  total: number;
  totalPages: number;
};

export type SummuryAvailableResponse = {
  summaries: AvailableSummaryRow[];
};

export type SummaryUploadDataRow = {
  code1C: string;
  product_marking: string;
  product_name: string;
  batch: string;
  plan: string;
  conveyor: string;
  specification: string;
  shift: string;
};

export type ValError = {
  row: number;
  field: string;
  error: string;
};

type SummaryWithStatusesBase = SummaryBase & {
  conveyorName: string;
  batchName: string;
  productName: string;
  productCode: string;
  productMarking: string;
};

type StatusRow = {
  id: number;
  summary_id: number;
  post_id: number;
  post_val: number;
  counter_value: number;
  operation_id: number | null;
  operation_value: string | null;
  operation_description: string | null;
  maintenance_session_id: number | null;
  maintenance_value: string | null;
  maintenance_description: string | null;
  idle: false;
  employee_id: number | null;
  employee_name: string | null;
  idle_time: number | null;
  finished: boolean;
  createdAt: Date;
  extrusion_param_id: number | null
  varnish_param_id: number | null
  offset_param_id: number | null
  sealant_param_id: number | null
};

export type SummaryStatusesResponse = SummaryWithStatusesBase & {
  statuses: StatusRow[];
};
type SummaryReportBase = SummaryBase & {
  conveyorName: string;
  productCode: string;
  productName: string;
  productMarking: string;
  batchName: string;
};

type Defect = {
  postId: number;
  postValue: number;
  value: number;
};

type ConsumedMaterial = {
  employee_id: number;
  createdAt: Date;
  materialCode: string;
  materialName: string;
  postNumber: number;
  lotName: string;
};

export type Treshold = {
  id: number;
  product_id: number;
  conveyor_id: number;
  extrusion_press_speed_min: number;
  extrusion_press_speed_max: number;
  extrusion_blow_time_min: number;
  extrusion_blow_time_max: number;
  extrusion_turning_machine_speed_min: number;
  extrusion_turning_machine_speed_max: number;
  extrusion_annealing_furnace_temp_min: number;
  extrusion_annealing_furnace_temp_max: number;
  extrusion_tube_cylindrical_section_length_min: number;
  extrusion_tube_cylindrical_section_length_max: number;
  extrusion_membrane_thickness_min: number;
  extrusion_membrane_thickness_max: number;
  extrusion_tube_diameter_min: number;
  extrusion_tube_diameter_max: number;
  extrusion_tube_cylindrical_section_thickness_min: number;
  extrusion_tube_cylindrical_section_thickness_max: number;
  extrusion_tube_rigidity_min: number;
  extrusion_tube_rigidity_max: number;
  extrusion_external_thread_value: string;
  varnish_varnish_machine_speed_min: number;
  varnish_varnish_machine_speed_max: number;
  varnish_total_air_pressure_min: number;
  varnish_total_air_pressure_max: number;
  varnish_feed_can_air_pressure_min: number;
  varnish_feed_can_air_pressure_max: number;
  varnish_nozzle_regulator_air_pressure_min: number;
  varnish_nozzle_regulator_air_pressure_max: number;
  varnish_cells_speed_min: number;
  varnish_cells_speed_max: number;
  varnish_injection_a_start_position_min: number;
  varnish_injection_a_start_position_max: number;
  varnish_injection_b_start_position_min: number;
  varnish_injection_b_start_position_max: number;
  varnish_injection_c_start_position_min: number;
  varnish_injection_c_start_position_max: number;
  varnish_injection_d_start_position_min: number;
  varnish_injection_d_start_position_max: number;
  varnish_injection_a_end_position_min: number;
  varnish_injection_a_end_position_max: number;
  varnish_injection_b_end_position_min: number;
  varnish_injection_b_end_position_max: number;
  varnish_injection_c_end_position_min: number;
  varnish_injection_c_end_position_max: number;
  varnish_injection_d_end_position_min: number;
  varnish_injection_d_end_position_max: number;
  varnish_tube_molding_start_position_min: number;
  varnish_tube_molding_start_position_max: number;
  varnish_tube_molding_end_position_min: number;
  varnish_tube_molding_end_position_max: number;
  varnish_polimerization_furnace_temp_min: number;
  varnish_polimerization_furnace_temp_max: number;
  varnish_internal_varnish_porosity_min: number;
  varnish_internal_varnish_porosity_max: number;
  offset_printing_machine_speed_min: number;
  offset_printing_machine_speed_max: number;
  offset_total_air_pressure_min: number;
  offset_total_air_pressure_max: number;
  offset_padding_furnace_temp_min: number;
  offset_padding_furnace_temp_max: number;
  offset_offset_furnace_temp_min: number;
  offset_offset_furnace_temp_max: number;
  offset_printer_motor_min: number;
  offset_printer_motor_max: number;
  offset_base_covers_holders_motor_min: number;
  offset_base_covers_holders_motor_max: number;
  offset_base_covers_station_motor_min: number;
  offset_base_covers_station_motor_max: number;
  offset_imprint_quantity_printed_box_1_min: number | null;
  offset_imprint_quantity_printed_box_1_max: number | null;
  offset_imprint_quantity_printed_box_2_min: number | null;
  offset_imprint_quantity_printed_box_2_max: number | null;
  offset_imprint_quantity_printed_box_3_min: number | null;
  offset_imprint_quantity_printed_box_3_max: number | null;
  offset_imprint_quantity_printed_box_4_min: number | null;
  offset_imprint_quantity_printed_box_4_max: number | null;
  offset_imprint_quantity_printed_box_5_min: number | null;
  offset_imprint_quantity_printed_box_5_max: number | null;
  offset_imprint_quantity_printed_box_6_min: number | null;
  offset_imprint_quantity_printed_box_6_max: number | null;
  offset_ink_supply_time_min: number;
  offset_ink_supply_time_max: number;
  sealant_cap_machine_speed_min: number;
  sealant_cap_machine_speed_max: number;
  sealant_total_air_pressure_min: number;
  sealant_total_air_pressure_max: number;
  sealant_holders_forward_min: number;
  sealant_holders_forward_max: number;
  sealant_holders_opening_left_min: number;
  sealant_holders_opening_left_max: number;
  sealant_holders_opening_right_min: number;
  sealant_holders_opening_right_max: number;
  sealant_holders_closing_min: number;
  sealant_holders_closing_max: number;
  sealant_injection_a_start_min: number;
  sealant_injection_a_start_max: number;
  sealant_injection_b_start_min: number;
  sealant_injection_b_start_max: number;
  sealant_injection_a_end_min: number;
  sealant_injection_a_end_max: number;
  sealant_injection_b_end_min: number;
  sealant_injection_b_end_max: number;
  sealant_injection_tube_orientation_start_min: number;
  sealant_injection_tube_orientation_start_max: number;
  sealant_injection_tube_orientation_end_min: number;
  sealant_injection_tube_orientation_end_max: number;
  sealant_latex_ring_padding_min: number;
  sealant_latex_ring_padding_max: number;
  sealant_latex_ring_width_min: number;
  sealant_latex_ring_width_max: number;
  sealant_tube_rigidity_min: number;
  sealant_tube_rigidity_max: number;
  sealant_cap_unscrewing_torque_min: number;
  sealant_cap_unscrewing_torque_max: number;
  createdAt: Date;
};

type ExtrusionParams = {
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
  external_thread_quality: boolean;
  tube_marking: boolean;
  employee_id: number;
  createdAt: Date;
};

type VarnishParams = {
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
};

type OffsetParams = {
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
};

type SealantParams = {
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
};

type ParamsAddition = {
  employee: Employee;
  treshold: Treshold;
};

type ExtrusionParamsRow = ExtrusionParams & ParamsAddition;
type VarnishParamsRow = VarnishParams & ParamsAddition;
type OffsetParamsRow = OffsetParams & ParamsAddition;
type SealantParamsRow = SealantParams & ParamsAddition;

export type SummaryReportEntity = {
  summary: SummaryReportBase;
  statuses: StatusRow[];
  defects: Defect[];
  tresholds: Treshold | null;
  consumedMaterials: ConsumedMaterial[];
  extrusionParams: ExtrusionParamsRow[];
  varnishParams: VarnishParamsRow[];
  offsetParams: OffsetParamsRow[];
  sealantParams: SealantParamsRow[];
};
