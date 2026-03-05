import type { DataFormField } from "@/shared/helpers/data-form-field";
import { formatKeyboardInput } from "@/shared/helpers/format-keyboard-input";
import { create } from "zustand";
import { devtools } from "zustand/middleware";



interface ISealantParameterData {
  counter_value: string;
  cap_machine_speed: string;
  total_air_pressure: string;
  holders_forward: string;
  holders_opening_left: string;
  holders_opening_right: string;
  holders_closing: string;
  injection_a_start: string;
  injection_b_start: string;
  injection_a_end: string;
  injection_b_end: string;
  injection_tube_orientation_start: string;
  injection_tube_orientation_end: string;
  is_cap_surface_smooth: boolean;
  latex_ring_padding: string;
  latex_ring_width: string;
  tube_rigidity: string;
  cap_unscrewing_torque: string;
}

interface SealantInputStore {
  data: ISealantParameterData;
  initData: () => void;
  changeData: (value: DataFormField<keyof ISealantParameterData>) => void;
  clearData: (value: Pick<DataFormField<keyof ISealantParameterData>, 'key'>) => void;
  sliceData: (value: Pick<DataFormField<keyof ISealantParameterData>, 'key'>) => void;
  roundData: (value: Pick<DataFormField<keyof ISealantParameterData>, 'key'>) => void;
  setData: (value: DataFormField<keyof ISealantParameterData>) => void;
}

export const initDataValue: ISealantParameterData = {
  counter_value: "0",
  cap_machine_speed: "0",
  total_air_pressure: "0",
  holders_forward: "0",
  holders_opening_left: "0",
  holders_opening_right: "0",
  holders_closing: "0",
  injection_a_start: "0",
  injection_b_start: "0",
  injection_a_end: "0",
  injection_b_end: "0",
  injection_tube_orientation_start: "0",
  injection_tube_orientation_end: "0",
  is_cap_surface_smooth: false,
  latex_ring_padding: "0",
  latex_ring_width: "0",
  tube_rigidity: "0",
  cap_unscrewing_torque: "0",
};

export enum SealantInputParams {
  COUNTER_VALUE = "counter_value",
  CAP_MACHINE_SPEED = "cap_machine_speed",
  TOTAL_AIR_PRESSURE = "total_air_pressure",
  HOLDERS_FORWARD = "holders_forward",
  HOLDERS_OPENING_LEFT = "holders_opening_left",
  HOLDERS_OPENING_RIGHT = "holders_opening_right",
  HOLDERS_CLOSING = "holders_closing",
  INJECTION_A_START = "injection_a_start",
  INJECTION_B_START = "injection_b_start",
  INJECTION_A_END = "injection_a_end",
  INJECTION_B_END = "injection_b_end",
  INJECTION_TUBE_ORIENTATION_START = "injection_tube_orientation_start",
  INJECTION_TUBE_ORIENTATION_END = "injection_tube_orientation_end",
  IS_CAP_SURFACE_SMOOTH = "is_cap_surface_smooth",
  LATEX_RING_PADDING = "latex_ring_padding",
  LATEX_RING_WIDTH = "latex_ring_width",
  TUBE_RIGIDITY = "tube_rigidity",
  CAP_UNSCREWING_TORQUE = "cap_unscrewing_torque",
}

export const useSealantInputStore = create<SealantInputStore>()(
  devtools((set) => ({
    data: initDataValue,
    initData: () => set(() => ({ data: initDataValue, selectedRondelType: undefined })),
    clearData: ({ key }) => {
      if (!key) return;
      const fieldKey = key as keyof ISealantParameterData;
      set((state) => ({
        data: {
          ...state.data,
          [fieldKey]: typeof initDataValue[fieldKey] === "boolean" ? false : "0",
        },
      }));
    },
    sliceData: ({ key }) => {
      if (!key) return;
      const fieldKey = key as keyof ISealantParameterData;
      set((state) => {
        const currentVal = state.data[fieldKey];
        if (typeof currentVal !== "string") return state;

        return {
          data: {
            ...state.data,
            [fieldKey]: currentVal.length < 2 ? "0" : currentVal.slice(0, -1),
          },
        };
      });
    },
    changeData: ({ key, value }) => {
      set((state) => {
        const fieldKey = key as keyof ISealantParameterData;
        const currentValue = state.data[fieldKey];
        if (typeof currentValue === "string") {
          return {
            data: {
              ...state.data,
              [fieldKey]: formatKeyboardInput(currentValue, value),
            },
          };
        }
        return {
          data: {
            ...state.data,
            [fieldKey]: typeof value === "boolean" ? value : !currentValue,
          },
        };
      });
    },
    roundData: ({ key }) => {
      if (!key) return;
      const fieldKey = key as keyof ISealantParameterData;
      set((state) => {
        const currentVal = state.data[fieldKey];
        if (typeof currentVal !== "string") return state;

        return {
          data: {
            ...state.data,
            [fieldKey]: Number(currentVal).toString(),
          },
        };
      });
    },
    setData: ({ key, value }) => {
      const fieldKey = key as keyof ISealantParameterData;
      set((state) => {
        const targetValue = state.data[fieldKey];
        if (typeof targetValue === "string") {
          return {
            data: { ...state.data, [fieldKey]: value },
          };
        }
        if (typeof targetValue === "boolean") {
          return {
            data: {
              ...state.data,
              [fieldKey]: value === "true" ? true : false,
            },
          };
        }
        return state;
      });
    },

  }))
);
