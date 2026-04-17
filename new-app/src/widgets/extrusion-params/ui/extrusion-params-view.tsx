import { ExtrusionData, ParameterDetails } from "@/entities/parameter";
import { cn } from "@/shared/lib";

export function ExtrusionParamsView({ id }: { id: string | null }) {
    const mockData: ExtrusionData = {
        id: Number(id) || 1,
        summary_id: 1,
        counter_value: 100,
        press_speed: 50,
        blow_time: 10,
        turning_machine_speed: 1200,
        annealing_furnace_temp: 450,
        tube_cylindrical_section_length: 150.5,
        membrane_thickness: 0.12,
        tube_diameter: 25.0,
        tube_cylindrical_section_thickness: 0.4,
        tube_rigidity: 5,
        tube_cutting_quality: true,
        tightness: true,
        external_thread_quality: true,
        tube_marking: true,
        employee_id: 1,
        createdAt: new Date(),
        employee: { id: 1, name: "Иван Иванов" }
    };
    return (
        <div
            className={cn(
                "container mx-auto py-10 transition-all duration-500 relative",
            )}
        >
            <ParameterDetails params={{ type: "extrusion", data: mockData }} />
        </div>
    )
}