import { Transform, Type } from "class-transformer";
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";
import { ToNumber } from "src/shared/lib/to-number.decorator";

export class CreateTresholdsBulkItem {
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => {
    const strValue = String(value).trim();
    return strValue;
  })
  conveyor_name: string;

  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => {
    const strValue = String(value).trim();
    return strValue.padStart(6, "0");
  })
  code1C: string;

  @IsNotEmpty()
  @IsString()
  product_marking: string;

  @IsNotEmpty()
  @IsString()
  product_name: string;

  // @IsNotEmpty()
  // @IsString()
  // design: string;

  @ToNumber()
  @IsNumber({}, { message: "Поле должно быть числом" })
  extrusion_press_speed_min: number;

  @ToNumber()
  @IsNumber({}, { message: "Поле должно быть числом" })
  extrusion_press_speed_max: number;

  @ToNumber()
  @IsNumber({}, { message: "Поле должно быть числом" })
  extrusion_blow_time_min: number;

  @ToNumber()
  @IsNumber({}, { message: "Поле должно быть числом" })
  extrusion_blow_time_max: number;

  @ToNumber()
  @IsNumber({}, { message: "Поле должно быть числом" })
  extrusion_turning_machine_speed_min: number;

  @ToNumber()
  @IsNumber({}, { message: "Поле должно быть числом" })
  extrusion_turning_machine_speed_max: number;

  @ToNumber()
  @IsNumber({}, { message: "Поле должно быть числом" })
  extrusion_annealing_furnace_temp_min: number;

  @ToNumber()
  @IsNumber({}, { message: "Поле должно быть числом" })
  extrusion_annealing_furnace_temp_max: number;

  @ToNumber()
  @IsNumber({}, { message: "Поле должно быть числом" })
  extrusion_tube_cylindrical_section_length_min: number;

  @ToNumber()
  @IsNumber({}, { message: "Поле должно быть числом" })
  extrusion_tube_cylindrical_section_length_max: number;

  @ToNumber()
  @IsNumber({}, { message: "Поле должно быть числом" })
  extrusion_membrane_thickness_min: number;

  @ToNumber()
  @IsNumber({}, { message: "Поле должно быть числом" })
  extrusion_membrane_thickness_max: number;

  @ToNumber()
  @IsNumber({}, { message: "Поле должно быть числом" })
  extrusion_tube_diameter_min: number;

  @ToNumber()
  @IsNumber({}, { message: "Поле должно быть числом" })
  extrusion_tube_diameter_max: number;

  @ToNumber()
  @IsNumber({}, { message: "Поле должно быть числом" })
  extrusion_tube_cylindrical_section_thickness_min: number;

  @ToNumber()
  @IsNumber({}, { message: "Поле должно быть числом" })
  extrusion_tube_cylindrical_section_thickness_max: number;

  @ToNumber()
  @IsNumber({}, { message: "Поле должно быть числом" })
  extrusion_tube_rigidity_min: number;

  @ToNumber()
  @IsNumber({}, { message: "Поле должно быть числом" })
  extrusion_tube_rigidity_max: number;

  @IsString()
  @IsNotEmpty()
  extrusion_external_thread_value: string;

  @ToNumber()
  @IsNumber({}, { message: "Поле должно быть числом" })
  varnish_varnish_machine_speed_min: number;

  @ToNumber()
  @IsNumber({}, { message: "Поле должно быть числом" })
  varnish_varnish_machine_speed_max: number;

  @ToNumber()
  @IsNumber({}, { message: "Поле должно быть числом" })
  varnish_total_air_pressure_min: number;

  @ToNumber()
  @IsNumber({}, { message: "Поле должно быть числом" })
  varnish_total_air_pressure_max: number;

  @ToNumber()
  @IsNumber({}, { message: "Поле должно быть числом" })
  varnish_feed_can_air_pressure_min: number;

  @ToNumber()
  @IsNumber({}, { message: "Поле должно быть числом" })
  varnish_feed_can_air_pressure_max: number;

  @ToNumber()
  @IsNumber({}, { message: "Поле должно быть числом" })
  varnish_nozzle_regulator_air_pressure_min: number;

  @ToNumber()
  @IsNumber({}, { message: "Поле должно быть числом" })
  varnish_nozzle_regulator_air_pressure_max: number;

  @ToNumber()
  @IsNumber({}, { message: "Поле должно быть числом" })
  varnish_cells_speed_min: number;

  @ToNumber()
  @IsNumber({}, { message: "Поле должно быть числом" })
  varnish_cells_speed_max: number;

  @ToNumber()
  @IsNumber({}, { message: "Поле должно быть числом" })
  varnish_injection_a_start_position_min: number;

  @ToNumber()
  @IsNumber({}, { message: "Поле должно быть числом" })
  varnish_injection_a_start_position_max: number;

  @ToNumber()
  @IsNumber({}, { message: "Поле должно быть числом" })
  varnish_injection_b_start_position_min: number;

  @ToNumber()
  @IsNumber({}, { message: "Поле должно быть числом" })
  varnish_injection_b_start_position_max: number;

  @ToNumber()
  @IsNumber({}, { message: "Поле должно быть числом" })
  varnish_injection_c_start_position_min: number;

  @ToNumber()
  @IsNumber({}, { message: "Поле должно быть числом" })
  varnish_injection_c_start_position_max: number;

  @ToNumber()
  @IsNumber({}, { message: "Поле должно быть числом" })
  varnish_injection_d_start_position_min: number;

  @ToNumber()
  @IsNumber({}, { message: "Поле должно быть числом" })
  varnish_injection_d_start_position_max: number;

  @ToNumber()
  @IsNumber({}, { message: "Поле должно быть числом" })
  varnish_injection_a_end_position_min: number;

  @ToNumber()
  @IsNumber({}, { message: "Поле должно быть числом" })
  varnish_injection_a_end_position_max: number;

  @ToNumber()
  @IsNumber({}, { message: "Поле должно быть числом" })
  varnish_injection_b_end_position_min: number;

  @ToNumber()
  @IsNumber({}, { message: "Поле должно быть числом" })
  varnish_injection_b_end_position_max: number;

  @ToNumber()
  @IsNumber({}, { message: "Поле должно быть числом" })
  varnish_injection_c_end_position_min: number;

  @ToNumber()
  @IsNumber({}, { message: "Поле должно быть числом" })
  varnish_injection_c_end_position_max: number;

  @ToNumber()
  @IsNumber({}, { message: "Поле должно быть числом" })
  varnish_injection_d_end_position_min: number;

  @ToNumber()
  @IsNumber({}, { message: "Поле должно быть числом" })
  varnish_injection_d_end_position_max: number;

  @ToNumber()
  @IsNumber({}, { message: "Поле должно быть числом" })
  varnish_tube_molding_start_position_min: number;

  @ToNumber()
  @IsNumber({}, { message: "Поле должно быть числом" })
  varnish_tube_molding_start_position_max: number;

  @ToNumber()
  @IsNumber({}, { message: "Поле должно быть числом" })
  varnish_tube_molding_end_position_min: number;

  @ToNumber()
  @IsNumber({}, { message: "Поле должно быть числом" })
  varnish_tube_molding_end_position_max: number;

  @ToNumber()
  @IsNumber({}, { message: "Поле должно быть числом" })
  varnish_polimerization_furnace_temp_min: number;

  @ToNumber()
  @IsNumber({}, { message: "Поле должно быть числом" })
  varnish_polimerization_furnace_temp_max: number;

  @ToNumber()
  @IsNumber({}, { message: "Поле должно быть числом" })
  varnish_internal_varnish_porosity_min: number;

  @ToNumber()
  @IsNumber({}, { message: "Поле должно быть числом" })
  varnish_internal_varnish_porosity_max: number;

  @ToNumber()
  @IsNumber({}, { message: "Поле должно быть числом" })
  offset_printing_machine_speed_min: number;

  @ToNumber()
  @IsNumber({}, { message: "Поле должно быть числом" })
  offset_printing_machine_speed_max: number;

  @ToNumber()
  @IsNumber({}, { message: "Поле должно быть числом" })
  offset_total_air_pressure_min: number;

  @ToNumber()
  @IsNumber({}, { message: "Поле должно быть числом" })
  offset_total_air_pressure_max: number;

  @ToNumber()
  @IsNumber({}, { message: "Поле должно быть числом" })
  offset_padding_furnace_temp_min: number;

  @ToNumber()
  @IsNumber({}, { message: "Поле должно быть числом" })
  offset_padding_furnace_temp_max: number;

  @ToNumber()
  @IsNumber({}, { message: "Поле должно быть числом" })
  offset_offset_furnace_temp_min: number;

  @ToNumber()
  @IsNumber({}, { message: "Поле должно быть числом" })
  offset_offset_furnace_temp_max: number;

  @ToNumber()
  @IsNumber({}, { message: "Поле должно быть числом" })
  offset_printer_motor_min: number;

  @ToNumber()
  @IsNumber({}, { message: "Поле должно быть числом" })
  offset_printer_motor_max: number;

  @ToNumber()
  @IsNumber({}, { message: "Поле должно быть числом" })
  offset_base_covers_holders_motor_min: number;

  @ToNumber()
  @IsNumber({}, { message: "Поле должно быть числом" })
  offset_base_covers_holders_motor_max: number;

  @ToNumber()
  @IsNumber({}, { message: "Поле должно быть числом" })
  offset_base_covers_station_motor_min: number;

  @ToNumber()
  @IsNumber({}, { message: "Поле должно быть числом" })
  offset_base_covers_station_motor_max: number;

  @ToNumber()
  @IsOptional()
  @IsNumber({}, { message: "Поле должно быть числом или прочерком" })
  offset_imprint_quantity_printed_box_1_min: number | null;

  @ToNumber()
  @IsOptional()
  @IsNumber({}, { message: "Поле должно быть числом или прочерком" })
  offset_imprint_quantity_printed_box_1_max: number | null;

  @ToNumber()
  @IsOptional()
  @IsNumber({}, { message: "Поле должно быть числом или прочерком" })
  offset_imprint_quantity_printed_box_2_min: number | null;

  @ToNumber()
  @IsOptional()
  @IsNumber({}, { message: "Поле должно быть числом или прочерком" })
  offset_imprint_quantity_printed_box_2_max: number | null;

  @ToNumber()
  @IsOptional()
  @IsNumber({}, { message: "Поле должно быть числом или прочерком" })
  offset_imprint_quantity_printed_box_3_min: number | null;

  @ToNumber()
  @IsOptional()
  @IsNumber({}, { message: "Поле должно быть числом или прочерком" })
  offset_imprint_quantity_printed_box_3_max: number | null;

  @ToNumber()
  @IsOptional()
  @IsNumber({}, { message: "Поле должно быть числом или прочерком" })
  offset_imprint_quantity_printed_box_4_min: number | null;

  @ToNumber()
  @IsOptional()
  @IsNumber({}, { message: "Поле должно быть числом или прочерком" })
  offset_imprint_quantity_printed_box_4_max: number | null;

  @ToNumber()
  @IsOptional()
  @IsNumber({}, { message: "Поле должно быть числом или прочерком" })
  offset_imprint_quantity_printed_box_5_min: number | null;

  @ToNumber()
  @IsOptional()
  @IsNumber({}, { message: "Поле должно быть числом или прочерком" })
  offset_imprint_quantity_printed_box_5_max: number | null;

  @ToNumber()
  @IsOptional()
  @IsNumber({}, { message: "Поле должно быть числом или прочерком" })
  offset_imprint_quantity_printed_box_6_min: number | null;

  @ToNumber()
  @IsOptional()
  @IsNumber({}, { message: "Поле должно быть числом или прочерком" })
  offset_imprint_quantity_printed_box_6_max: number | null;

  @ToNumber()
  @IsNumber({}, { message: "Поле должно быть числом" })
  offset_ink_supply_time_min: number;

  @ToNumber()
  @IsNumber({}, { message: "Поле должно быть числом" })
  offset_ink_supply_time_max: number;

  @ToNumber()
  @IsNumber({}, { message: "Поле должно быть числом" })
  sealant_cap_machine_speed_min: number;

  @ToNumber()
  @IsNumber({}, { message: "Поле должно быть числом" })
  sealant_cap_machine_speed_max: number;

  @ToNumber()
  @IsNumber({}, { message: "Поле должно быть числом" })
  sealant_total_air_pressure_min: number;

  @ToNumber()
  @IsNumber({}, { message: "Поле должно быть числом" })
  sealant_total_air_pressure_max: number;

  @ToNumber()
  @IsNumber({}, { message: "Поле должно быть числом" })
  sealant_holders_forward_min: number;

  @ToNumber()
  @IsNumber({}, { message: "Поле должно быть числом" })
  sealant_holders_forward_max: number;

  @ToNumber()
  @IsNumber({}, { message: "Поле должно быть числом" })
  sealant_holders_opening_left_min: number;

  @ToNumber()
  @IsNumber({}, { message: "Поле должно быть числом" })
  sealant_holders_opening_left_max: number;

  @ToNumber()
  @IsNumber({}, { message: "Поле должно быть числом" })
  sealant_holders_opening_right_min: number;

  @ToNumber()
  @IsNumber({}, { message: "Поле должно быть числом" })
  sealant_holders_opening_right_max: number;

  @ToNumber()
  @IsNumber({}, { message: "Поле должно быть числом" })
  sealant_holders_closing_min: number;

  @ToNumber()
  @IsNumber({}, { message: "Поле должно быть числом" })
  sealant_holders_closing_max: number;

  @ToNumber()
  @IsNumber({}, { message: "Поле должно быть числом" })
  sealant_injection_a_start_min: number;

  @ToNumber()
  @IsNumber({}, { message: "Поле должно быть числом" })
  sealant_injection_a_start_max: number;

  @ToNumber()
  @IsNumber({}, { message: "Поле должно быть числом" })
  sealant_injection_b_start_min: number;

  @ToNumber()
  @IsNumber({}, { message: "Поле должно быть числом" })
  sealant_injection_b_start_max: number;

  @ToNumber()
  @IsNumber({}, { message: "Поле должно быть числом" })
  sealant_injection_a_end_min: number;

  @ToNumber()
  @IsNumber({}, { message: "Поле должно быть числом" })
  sealant_injection_a_end_max: number;

  @ToNumber()
  @IsNumber({}, { message: "Поле должно быть числом" })
  sealant_injection_b_end_min: number;

  @ToNumber()
  @IsNumber({}, { message: "Поле должно быть числом" })
  sealant_injection_b_end_max: number;

  @ToNumber()
  @IsNumber({}, { message: "Поле должно быть числом" })
  sealant_injection_tube_orientation_start_min: number;

  @ToNumber()
  @IsNumber({}, { message: "Поле должно быть числом" })
  sealant_injection_tube_orientation_start_max: number;

  @ToNumber()
  @IsNumber({}, { message: "Поле должно быть числом" })
  sealant_injection_tube_orientation_end_min: number;

  @ToNumber()
  @IsNumber({}, { message: "Поле должно быть числом" })
  sealant_injection_tube_orientation_end_max: number;

  @ToNumber()
  @IsNumber({}, { message: "Поле должно быть числом" })
  sealant_latex_ring_padding_min: number;

  @ToNumber()
  @IsNumber({}, { message: "Поле должно быть числом" })
  sealant_latex_ring_padding_max: number;

  @ToNumber()
  @IsNumber({}, { message: "Поле должно быть числом" })
  sealant_latex_ring_width_min: number;

  @ToNumber()
  @IsNumber({}, { message: "Поле должно быть числом" })
  sealant_latex_ring_width_max: number;

  @ToNumber()
  @IsNumber({}, { message: "Поле должно быть числом" })
  sealant_tube_rigidity_min: number;

  @ToNumber()
  @IsNumber({}, { message: "Поле должно быть числом" })
  sealant_tube_rigidity_max: number;

  @ToNumber()
  @IsNumber({}, { message: "Поле должно быть числом" })
  sealant_cap_unscrewing_torque_min: number;

  @ToNumber()
  @IsNumber({}, { message: "Поле должно быть числом" })
  sealant_cap_unscrewing_torque_max: number;
}

export class CreateTresholdsBulkDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateTresholdsBulkItem)
  rows: CreateTresholdsBulkItem[];
}
