import { ParameterDetails } from "@/entities/parameter";
import { OffsetData } from "@/entities/parameter/model/types";
import { cn } from "@/shared/lib";

export function OffsetParamsView({ id }: { id: string | null }) {
    const mockData: OffsetData = {
        id: Number(id) || 1,
        summary_id: 1,
        counter_value: 12000,
        printing_machine_speed: 80,
        total_air_pressure: 7,
        padding_furnace_temp: 60,
        offset_furnace_temp: 75,
        printer_motor: 1450,
        base_covers_holders_motor: 1200,
        base_covers_station_motor: 1100,
        imprint_quantity_printed_box_1: 500,
        imprint_quantity_printed_box_2: 500,
        imprint_quantity_printed_box_3: null,
        imprint_quantity_printed_box_4: null,
        imprint_quantity_printed_box_5: null,
        imprint_quantity_printed_box_6: null,
        ink_supply_time: 2.5,
        design_match: true,
        tube_appearance: true,
        tube_edge_deformation_lack: true,
        aluminium_clearance_lack: true,
        drips_lack: true,
        employee_id: 3,
        createdAt: new Date().toISOString(),
        employee: { id: 3, name: "Сергей Сидоров" }
    };

    return (
        <div className={cn("container mx-auto py-10")}>
            <ParameterDetails params={{ type: "offset", data: mockData }} />
        </div>
    );
}
