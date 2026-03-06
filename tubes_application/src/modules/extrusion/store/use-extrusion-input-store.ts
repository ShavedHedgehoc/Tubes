import type { DataFormField } from "@/shared/helpers/data-form-field";
import { formatKeyboardInput } from "@/shared/helpers/format-keyboard-input";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface IExtrusionParameterData {
  counter_value: string;
  press_speed: string;
  blow_time: string;
  turning_machine_speed: string;
  annealing_furnace_temp: string;
  tube_cylindrical_section_length: string;
  membrane_thickness: string;
  tube_diameter: string;
  tube_cylindrical_thickness: string;
  tube_rigidity: string;
  tube_cutting_quality: boolean;
  tightness: boolean;
  external_thread_quality: boolean;
  tube_marking: boolean;
}

interface ExtrusionInputStore {
  data: IExtrusionParameterData;
  initData: () => void;
  changeData: (value: DataFormField<keyof IExtrusionParameterData>) => void;
  clearData: (
    value: Pick<DataFormField<keyof IExtrusionParameterData>, "key">,
  ) => void;
  sliceData: (
    value: Pick<DataFormField<keyof IExtrusionParameterData>, "key">,
  ) => void;
  roundData: (
    value: Pick<DataFormField<keyof IExtrusionParameterData>, "key">,
  ) => void;
  setData: (value: DataFormField<keyof IExtrusionParameterData>) => void;
}

export const initDataValue: IExtrusionParameterData = {
  counter_value: "0",
  press_speed: "0",
  blow_time: "0",
  turning_machine_speed: "0",
  annealing_furnace_temp: "0",
  tube_cylindrical_section_length: "0",
  membrane_thickness: "0",
  tube_diameter: "0",
  tube_cylindrical_thickness: "0",
  tube_rigidity: "0",
  tube_cutting_quality: false,
  tightness: false,
  external_thread_quality: false,
  tube_marking: false,
};

export enum ExtrusionInputParams {
  COUNTER_VALUE = "counter_value",
  PRESS_SPEED = "press_speed",
  BLOW_TIME = "blow_time",
  TURNING_MACHINE_SPEED = "turning_machine_speed",
  ANNEALING_FURNACE_TEMP = "annealing_furnace_temp",
  TUBE_CYLINDRICAL_SECTION_LENGTH = "tube_cylindrical_section_length",
  MEMBRANE_THICKNESS = "membrane_thickness",
  TUBE_DIAMETER = "tube_diameter",
  TUBE_CYLINDRICAL_THICKNESS = "tube_cylindrical_thickness",
  TUBE_RIGIDITY = "tube_rigidity",
  TUBE_CUTTING_QUALITY = "tube_cutting_quality",
  TIGHTNESS = "tightness",
  EXTERNAL_THREAD_QUALITY = "external_thread_quality",
  TUBE_MARKING = "tube_marking",
}

export const useExtrusionInputStore = create<ExtrusionInputStore>()(
  devtools((set) => ({
    data: initDataValue,
    initData: () => set(() => ({ data: initDataValue })),
    clearData: ({ key }) => {
      if (!key) return;
      const fieldKey = key as keyof IExtrusionParameterData;
      set((state) => ({
        data: {
          ...state.data,
          [fieldKey]:
            typeof initDataValue[fieldKey] === "boolean" ? false : "0",
        },
      }));
    },
    sliceData: ({ key }) => {
      if (!key) return;
      const fieldKey = key as keyof IExtrusionParameterData;
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
        const fieldKey = key as keyof IExtrusionParameterData;
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
      const fieldKey = key as keyof IExtrusionParameterData;
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
      const fieldKey = key as keyof IExtrusionParameterData;
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
  })),
);
