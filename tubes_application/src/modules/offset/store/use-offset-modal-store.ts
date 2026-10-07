import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface SimplyModalStore {
  open: boolean;
  setOpen: (val: boolean) => void;
}

const createModalStore = (name: string) =>
  create<SimplyModalStore>()(
    devtools(
      (set) => ({
        open: false,
        setOpen: (value) => set({ open: value }),
      }),
      { name: `ModalStore/${name}` },
    ),
  );

export const useOffsetAuthModalStore = createModalStore("Auth");
export const useOffsetLogoutModalStore = createModalStore("Logout");
export const useOffsetCloseConfirmModalStore = createModalStore("CloseConfirm");
export const useOffsetMaterialScanModalStore = createModalStore("MaterialScan");
export const useOffsetCloseSummaryModalStore = createModalStore("CloseSummary");
export const useOffsetDefectInputModalStore = createModalStore("DefectInput");
export const useOffsetMaintenanceModalStore = createModalStore("Maintenance");
