import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { ExtrusionInputParams } from "./use-extrusion-input-store";

interface BooleanEntryModalStore<T = string> {
  key: string;
  title: string;
  open: boolean;
  setKey: (val: T) => void;
  setTitle: (val: string) => void;
  setOpen: (val: boolean) => void;
}
export const useExtrusionBooleanEntryModalStore = create<
  BooleanEntryModalStore<ExtrusionInputParams>
>()(
  devtools((set) => ({
    key: null,
    title: "",
    open: false,
    setKey: (value) => set(() => ({ key: value })),
    setTitle: (value) => set(() => ({ title: value })),
    setOpen: (value) => set(() => ({ open: value })),
  })),
);
