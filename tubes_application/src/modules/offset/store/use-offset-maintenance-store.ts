import type { IMaintenance } from "@/shared/api/services/summary-service";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface OffsetMaintenanceStore {
  selectedMaintenance: IMaintenance | null;
  setSelectedMaintenance: (val: IMaintenance | null) => void;
}
export const useOffsetMaintenanceStore = create<OffsetMaintenanceStore>()(
  devtools((set) => ({
    selectedMaintenance: null,
    setSelectedMaintenance: (value) =>
      set(() => ({ selectedMaintenance: value })),
  })),
);
