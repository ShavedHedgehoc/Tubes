import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { ExtrusionInputParams } from "./use-extrusion-input-store";

interface EntryModalStore<T = string> {
  key: string;
  title: string;
  open: boolean;
  minValue: number | null | undefined;
  maxValue: number | null | undefined;
  unit: string | null | undefined;
  setMinValue: (val: number | null | undefined) => void;
  setMaxValue: (val: number | null | undefined) => void;
  setUnit: (val: string | null | undefined) => void;
  setKey: (val: T) => void;
  setTitle: (val: string) => void;
  setOpen: (val: boolean) => void;
}
export const useExtrusionNumericEntryModalStore = create<
  EntryModalStore<ExtrusionInputParams>
>()(
  devtools((set) => ({
    key: null,
    title: "",
    open: false,
    minValue: null,
    maxValue: null,
    unit: null,
    setMinValue: (value) => set(() => ({ minValue: value })),
    setMaxValue: (value) => set(() => ({ maxValue: value })),
    setUnit: (value) => set(() => ({ unit: value })),
    setKey: (value) => set(() => ({ key: value })),
    setTitle: (value) => set(() => ({ title: value })),
    setOpen: (value) => set(() => ({ open: value })),
  })),
);
