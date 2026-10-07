import type { DataFormField } from "@/shared/helpers/data-form-field";
import { formatKeyboardInput } from "@/shared/helpers/format-keyboard-input";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface IVarnishParameterData {
  counter_value: string;
  varnish_machine_speed: string;
  total_air_pressure: string;
  feed_can_air_pressure: string;
  nozzle_regulator_air_pressure: string;
  cells_speed: string;
  injection_a_start_position: string;
  injection_b_start_position: string;
  injection_c_start_position: string;
  injection_d_start_position: string;
  injection_a_end_position: string;
  injection_b_end_position: string;
  injection_c_end_position: string;
  injection_d_end_position: string;
  tube_molding_start_position: string;
  tube_molding_end_position: string;
  polimerization_furnace_temp: string;
  internal_varnish_porosity: string;
  internal_sectional_view: boolean;
  aluminium_clearance_lack: boolean;
  unpainting_lack: boolean;
}

interface VarnishInputStore {
  data: IVarnishParameterData;
  initData: () => void;
  changeData: (value: DataFormField<keyof IVarnishParameterData>) => void;
  clearData: (
    value: Pick<DataFormField<keyof IVarnishParameterData>, "key">,
  ) => void;
  sliceData: (
    value: Pick<DataFormField<keyof IVarnishParameterData>, "key">,
  ) => void;
  roundData: (
    value: Pick<DataFormField<keyof IVarnishParameterData>, "key">,
  ) => void;
  setData: (value: DataFormField<keyof IVarnishParameterData>) => void;
}

export const initDataValue: IVarnishParameterData = {
  counter_value: "0",
  varnish_machine_speed: "0",
  total_air_pressure: "0",
  feed_can_air_pressure: "0",
  nozzle_regulator_air_pressure: "0",
  cells_speed: "0",
  injection_a_start_position: "0",
  injection_b_start_position: "0",
  injection_c_start_position: "0",
  injection_d_start_position: "0",
  injection_a_end_position: "0",
  injection_b_end_position: "0",
  injection_c_end_position: "0",
  injection_d_end_position: "0",
  tube_molding_start_position: "0",
  tube_molding_end_position: "0",
  polimerization_furnace_temp: "0",
  internal_varnish_porosity: "0",
  internal_sectional_view: false,
  aluminium_clearance_lack: false,
  unpainting_lack: false,
};

export enum VarnishInputParams {
  COUNTER_VALUE = "counter_value",
  VARNISH_MACHINE_SPEED = "varnish_machine_speed",
  TOTAL_AIR_PRESSURE = "total_air_pressure",
  FEED_CAN_AIR_PRESSURE = "feed_can_air_pressure",
  NOZZLE_REGULATOR_AIR_PRESSURE = "nozzle_regulator_air_pressure",
  CELLS_SPEED = "cells_speed",
  INJECTION_A_START_POSITION = "injection_a_start_position",
  INJECTION_B_START_POSITION = "injection_b_start_position",
  INJECTION_C_START_POSITION = "injection_c_start_position",
  INJECTION_D_START_POSITION = "injection_d_start_position",
  INJECTION_A_END_POSITION = "injection_a_end_position",
  INJECTION_B_END_POSITION = "injection_b_end_position",
  INJECTION_C_END_POSITION = "injection_c_end_position",
  INJECTION_D_END_POSITION = "injection_d_end_position",
  TUBE_MOLDING_START_POSITION = "tube_molding_start_position",
  TUBE_MOLDING_END_POSITION = "tube_molding_end_position",
  POLIMERIZATION_FURNACE_TEMP = "polimerization_furnace_temp",
  INTERNAL_VARNISH_POROSITY = "internal_varnish_porosity",
  INTERNAL_SECTIONAL_VIEW = "internal_sectional_view",
  ALUMINIUM_CLEARANCE_LACK = "aluminium_clearance_lack",
  UNPAINTING_LACK = "unpainting_lack",
}

export const useVarnishInputStore = create<VarnishInputStore>()(
  devtools((set) => ({
    data: initDataValue,
    initData: () => set(() => ({ data: initDataValue })),
    clearData: ({ key }) => {
      if (!key) return;
      const fieldKey = key as keyof IVarnishParameterData;
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
      const fieldKey = key as keyof IVarnishParameterData;
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
        const fieldKey = key as keyof IVarnishParameterData;
        const currentValue = state.data[fieldKey];
        if (currentValue === null || typeof currentValue === "string") {
          const currentString =
            currentValue !== null ? String(currentValue) : "";
          return {
            data: {
              ...state.data,
              [fieldKey]: formatKeyboardInput(currentString, value),
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
      const fieldKey = key as keyof IVarnishParameterData;
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
      const fieldKey = key as keyof IVarnishParameterData;
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
