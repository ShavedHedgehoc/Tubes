import type { IMaintenance } from "@/shared/api/services/summary-service";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface SealantMaintenanceStore {
  selectedMaintenance: IMaintenance | null;
  setSelectedMaintenance: (val: IMaintenance | null) => void;
}
export const useSealantMaintenanceStore = create<SealantMaintenanceStore>()(
  devtools((set) => ({
    selectedMaintenance: null,
    setSelectedMaintenance: (value) =>
      set(() => ({ selectedMaintenance: value })),
  })),
);
