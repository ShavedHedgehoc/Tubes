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

export const useVarnishAuthModalStore = createModalStore("Auth");
export const useVarnishLogoutModalStore = createModalStore("Logout");
export const useVarnishCloseConfirmModalStore =
  createModalStore("CloseConfirm");
export const useVarnishMaterialScanModalStore =
  createModalStore("MaterialScan");
export const useVarnishCloseSummaryModalStore =
  createModalStore("CloseSummary");
export const useVarnishDefectInputModalStore = createModalStore("DefectInput");
