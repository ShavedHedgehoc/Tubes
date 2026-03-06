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

export const useExtrusionAuthModalStore = createModalStore("Auth");
export const useExtrusionLogoutModalStore = createModalStore("Logout");
export const useExtrusionCloseConfirmModalStore =
  createModalStore("CloseConfirm");
export const useExtrusionMaterialScanModalStore =
  createModalStore("MaterialScan");
export const useExtrusionCloseSummaryModalStore =
  createModalStore("CloseSummary");
export const useExtrusionDefectInputModalStore =
  createModalStore("DefectInput");
