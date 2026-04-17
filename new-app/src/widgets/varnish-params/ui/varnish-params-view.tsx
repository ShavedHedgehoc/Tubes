import { ParameterDetails } from "@/entities/parameter";
import { VarnishData } from "@/entities/parameter/model/types";
import { cn } from "@/shared/lib";

export function VarnishParamsView({ id }: { id: string | null }) {
    const mockData: VarnishData = {
        id: Number(id) || 1,
        summary_id: 1,
        counter_value: 5400,
        varnish_machine_speed: 60,
        total_air_pressure: 6.5,
        feed_can_air_pressure: 4.2,
        nozzle_regulator_air_pressure: 2.1,
        cells_speed: 15,
        injection_a_start_position: 100,
        injection_b_start_position: 105,
        injection_c_start_position: 110,
        injection_d_start_position: 115,
        injection_a_end_position: 200,
        injection_b_end_position: 205,
        injection_c_end_position: 210,
        injection_d_end_position: 215,
        tube_molding_start_position: 50,
        tube_molding_end_position: 150,
        polimerization_furnace_temp: 180,
        internal_varnish_porosity: 0.05,
        internal_sectional_view: true,
        aluminium_clearance_lack: false,
        unpainting_lack: false,
        employee_id: 2,
        createdAt: new Date().toISOString(),
        employee: { id: 2, name: "Петр Петров" }
    };

    return (
        <div className={cn("container mx-auto py-10")}>
            <ParameterDetails params={{ type: "varnish", data: mockData }} />
        </div>
    );
}
