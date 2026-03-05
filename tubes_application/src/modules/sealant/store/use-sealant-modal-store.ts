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
      { name: `ModalStore/${name}` }
    )
  );

export const useSealantAuthModalStore = createModalStore("Auth");
export const useSealantLogoutModalStore = createModalStore("Logout");
export const useSealantCloseConfirmModalStore = createModalStore("CloseConfirm");
export const useSealantMaterialScanModalStore = createModalStore("MaterialScan");
export const useSealantCloseSummaryModalStore = createModalStore("CloseSummary");
export const useSealantDefectInputModalStore = createModalStore("DefectInput");
export const useSealantBoxConfirmModalStore = createModalStore("BoxConfirm");
