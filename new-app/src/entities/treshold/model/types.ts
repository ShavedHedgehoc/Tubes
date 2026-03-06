export type ValError = {
    row: number;
    field: string;
    error: string;
};


export type TresholdUploadDataRow = TresholdUploadTableRow & {
    conveyor_name: string
}
export type TresholdUploadTableRow = {
    code1C: string;
    product_marking: string;
    product_name: string;
    design: string;
    extrusion_press_speed_min: string;
    extrusion_press_speed_max: string;
    extrusion_blow_time_min: string;
    extrusion_blow_time_max: string;
    extrusion_turning_machine_speed_min: string;
    extrusion_turning_machine_speed_max: string;
    extrusion_annealing_furnace_temp_min: string;
    extrusion_annealing_furnace_temp_max: string;
    extrusion_tube_cylindrical_section_length_min: string;
    extrusion_tube_cylindrical_section_length_max: string;
    extrusion_membrane_thickness_min: string;
    extrusion_membrane_thickness_max: string;
    extrusion_tube_diameter_min: string;
    extrusion_tube_diameter_max: string;
    extrusion_tube_cylindrical_section_thickness_min: string;
    extrusion_tube_cylindrical_section_thickness_max: string;
    extrusion_tube_rigidity_min: string;
    extrusion_tube_rigidity_max: string;
    extrusion_tube_cutting_quality: string;
    extrusion_external_thread_quality: string;
    extrusion_marking_quality: string;
    extrusion_external_thread_value: string;
    first_empty_field: string;
    varnish_varnish_machine_speed_min: string;
    varnish_varnish_machine_speed_max: string;
    varnish_total_air_pressure_min: string;
    varnish_total_air_pressure_max: string;
    varnish_feed_can_air_pressure_min: string;
    varnish_feed_can_air_pressure_max: string;
    varnish_nozzle_regulator_air_pressure_min: string;
    varnish_nozzle_regulator_air_pressure_max: string;
    varnish_cells_speed_min: string;
    varnish_cells_speed_max: string;
    varnish_injection_a_start_position_min: string;
    varnish_injection_a_start_position_max: string;
    varnish_injection_b_start_position_min: string;
    varnish_injection_b_start_position_max: string;
    varnish_injection_c_start_position_min: string;
    varnish_injection_c_start_position_max: string;
    varnish_injection_d_start_position_min: string;
    varnish_injection_d_start_position_max: string;
    varnish_injection_a_end_position_min: string;
    varnish_injection_a_end_position_max: string;
    varnish_injection_b_end_position_min: string;
    varnish_injection_b_end_position_max: string;
    varnish_injection_c_end_position_min: string;
    varnish_injection_c_end_position_max: string;
    varnish_injection_d_end_position_min: string;
    varnish_injection_d_end_position_max: string;
    varnish_tube_molding_start_position_min: string;
    varnish_tube_molding_start_position_max: string;
    varnish_tube_molding_end_position_min: string;
    varnish_tube_molding_end_position_max: string;
    varnish_polimerization_furnace_temp_min: string;
    varnish_polimerization_furnace_temp_max: string;
    varnish_internal_varnish_porosity_min: string;
    varnish_internal_varnish_porosity_max: string;
    varnish_internal_sectional_view: string;
    varnish_aluminium_clearance_lack: string;
    varnish_unpainting_lack: string;
    second_empty_field: string;
    offset_printing_machine_speed_min: string;
    offset_printing_machine_speed_max: string;
    offset_total_air_pressure_min: string;
    offset_total_air_pressure_max: string;
    offset_padding_furnace_temp_min: string;
    offset_padding_furnace_temp_max: string;
    offset_offset_furnace_temp_min: string;
    offset_offset_furnace_temp_max: string;
    offset_printer_motor_min: string;
    offset_printer_motor_max: string;
    offset_base_covers_holders_motor_min: string;
    offset_base_covers_holders_motor_max: string;
    offset_base_covers_station_motor_min: string;
    offset_base_covers_station_motor_max: string;
    offset_imprint_quantity_printed_box_1_min: string;
    offset_imprint_quantity_printed_box_1_max: string;
    offset_imprint_quantity_printed_box_2_min: string;
    offset_imprint_quantity_printed_box_2_max: string;
    offset_imprint_quantity_printed_box_3_min: string;
    offset_imprint_quantity_printed_box_3_max: string;
    offset_imprint_quantity_printed_box_4_min: string;
    offset_imprint_quantity_printed_box_4_max: string;
    offset_imprint_quantity_printed_box_5_min: string;
    offset_imprint_quantity_printed_box_5_max: string;
    offset_imprint_quantity_printed_box_6_min: string;
    offset_imprint_quantity_printed_box_6_max: string;
    offset_ink_supply_time_min: string;
    offset_ink_supply_time_max: string;
    offset_design_match: string;
    offset_tube_appearance: string;
    offset_tube_edge_deformation_lack: string;
    offset_aluminium_clearance_lack: string;
    offset_drips_lack: string;
    third_empty_field: string;
    sealant_cap_machine_speed_min: string
    sealant_cap_machine_speed_max: string
    sealant_total_air_pressure_min: string
    sealant_total_air_pressure_max: string
    sealant_holders_forward_min: string
    sealant_holders_forward_max: string
    sealant_holders_opening_left_min: string
    sealant_holders_opening_left_max: string
    sealant_holders_opening_right_min: string
    sealant_holders_opening_right_max: string
    sealant_holders_closing_min: string
    sealant_holders_closing_max: string
    sealant_injection_a_start_min: string
    sealant_injection_a_start_max: string
    sealant_injection_b_start_min: string
    sealant_injection_b_start_max: string
    sealant_injection_a_end_min: string
    sealant_injection_a_end_max: string
    sealant_injection_b_end_min: string
    sealant_injection_b_end_max: string
    sealant_injection_tube_orientation_start_min: string
    sealant_injection_tube_orientation_start_max: string
    sealant_injection_tube_orientation_end_min: string
    sealant_injection_tube_orientation_end_max: string
    sealant_is_cap_surface_smooth: string
    sealant_latex_ring_padding_min: string
    sealant_latex_ring_padding_max: string
    sealant_latex_ring_width_min: string
    sealant_latex_ring_width_max: string
    sealant_tube_rigidity_min: string
    sealant_tube_rigidity_max: string
    sealant_cap_unscrewing_torque_min: string
    sealant_cap_unscrewing_torque_max: string
    fourth_empty_field: string

}

export type TresholdEntity = {
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
    product_code: string;
    product_name: string;
    product_marking: string;
    conveyor_name: string;
}

//тип для фронтенда
export type TresholdResponse = {
    tresholds: TresholdEntity[];
    total: number;
    totalPages: number;
};