import { ParameterDetails } from "@/entities/parameter";
import { SealantData } from "@/entities/parameter/model/types";
import { cn } from "@/shared/lib";

export function SealantParamsView({ id }: { id: string | null }) {
    const mockData: SealantData = {
        id: Number(id) || 1,
        summary_id: 1,
        counter_value: 3200,
        cap_machine_speed: 45,
        total_air_pressure: 5.8,
        holders_forward: 80,
        holders_opening_left: 10,
        holders_opening_right: 10,
        holders_closing: 90,
        injection_a_start: 12,
        injection_b_start: 12,
        injection_a_end: 24,
        injection_b_end: 24,
        injection_tube_orientation_start: 0,
        injection_tube_orientation_end: 180,
        is_cap_surface_smooth: true,
        latex_ring_padding: 2,
        latex_ring_width: 3,
        tube_rigidity: 4,
        cap_unscrewing_torque: 15,
        employee_id: 4,
        createdAt: new Date().toISOString(),
        employee: { id: 4, name: "Алексей Алексеев" }
    };

    return (
        <div className={cn("container mx-auto py-10")}>
            <ParameterDetails params={{ type: "sealant", data: mockData }} />
        </div>
    );
}
