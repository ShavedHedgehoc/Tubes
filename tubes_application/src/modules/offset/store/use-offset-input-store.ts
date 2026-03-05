import type { DataFormField } from "@/shared/helpers/data-form-field";
import { formatKeyboardInput } from "@/shared/helpers/format-keyboard-input";
import { create } from "zustand";
import { devtools } from "zustand/middleware";


interface IOffsetParameterData {
  counter_value: string;
  printing_machine_speed: string;
  total_air_pressure: string;
  padding_furnace_temp: string;
  offset_furnace_temp: string;
  printer_motor: string;
  base_covers_holders_motor: string;
  base_covers_station_motor: string;
  imprint_quantity_printed_box_1: string | null;
  imprint_quantity_printed_box_2: string | null;
  imprint_quantity_printed_box_3: string | null;
  imprint_quantity_printed_box_4: string | null;
  imprint_quantity_printed_box_5: string | null;
  imprint_quantity_printed_box_6: string | null;
  ink_supply_time: string;
  design_match: boolean;
  tube_appearance: boolean;
  tube_edge_deformation_lack: boolean;
  aluminium_clearance_lack: boolean;
  drips_lack: boolean;
}

interface OffsetInputStore {
  data: IOffsetParameterData;

  initData: () => void;
  changeData: (value: DataFormField<keyof IOffsetParameterData>) => void;
  clearData: (value: Pick<DataFormField<keyof IOffsetParameterData>, 'key'>) => void;
  sliceData: (value: Pick<DataFormField<keyof IOffsetParameterData>, 'key'>) => void;
  roundData: (value: Pick<DataFormField<keyof IOffsetParameterData>, 'key'>) => void;
  setData: (value: DataFormField<keyof IOffsetParameterData>) => void;
}

export const initDataValue: IOffsetParameterData = {
  counter_value: "0",
  printing_machine_speed: "0",
  total_air_pressure: "0",
  padding_furnace_temp: "0",
  offset_furnace_temp: "0",
  printer_motor: "0",
  base_covers_holders_motor: "0",
  base_covers_station_motor: "0",
  imprint_quantity_printed_box_1: null,
  imprint_quantity_printed_box_2: null,
  imprint_quantity_printed_box_3: null,
  imprint_quantity_printed_box_4: null,
  imprint_quantity_printed_box_5: null,
  imprint_quantity_printed_box_6: null,
  ink_supply_time: "0",
  design_match: false,
  tube_appearance: false,
  tube_edge_deformation_lack: false,
  aluminium_clearance_lack: false,
  drips_lack: false,
};

export enum OffsetInputParams {
  COUNTER_VALUE = "counter_value",
  PRINTING_MACHINE_SPEED = "printing_machine_speed",
  TOTAL_AIR_PRESSURE = "total_air_pressure",
  PADDING_FURNACE_TEMP = "padding_furnace_temp",
  OFFSET_FURNACE_TEMP = "offset_furnace_temp",
  PRINTER_MOTOR = "printer_motor",
  BASE_COVERS_HOLDERS_MOTOR = "base_covers_holders_motor",
  BASE_COVERS_STATION_MOTOR = "base_covers_station_motor",
  IMPRINT_QUANTITY_PRINTED_BOX_1 = "imprint_quantity_printed_box_1",
  IMPRINT_QUANTITY_PRINTED_BOX_2 = "imprint_quantity_printed_box_2",
  IMPRINT_QUANTITY_PRINTED_BOX_3 = "imprint_quantity_printed_box_3",
  IMPRINT_QUANTITY_PRINTED_BOX_4 = "imprint_quantity_printed_box_4",
  IMPRINT_QUANTITY_PRINTED_BOX_5 = "imprint_quantity_printed_box_5",
  IMPRINT_QUANTITY_PRINTED_BOX_6 = "imprint_quantity_printed_box_6",
  INK_SUPPLY_TIME = "ink_supply_time",
  DESIGN_MATCH = "design_match",
  TUBE_APPEARANCE = "tube_appearance",
  TUBE_EDGE_DEFORMATION_LACK = "tube_edge_deformation_lack",
  ALUMINIUM_CLEARANCE_LACK = "aluminium_clearance_lack",
  DRIPS_LACK = "drips_lack",
}

//offsetParamsStore
export const useOffsetInputStore = create<OffsetInputStore>()(
  devtools((set) => ({
    data: initDataValue,
    initData: () => set(() => ({ data: initDataValue })),
    clearData: ({ key }) => {
      if (!key) return;
      const fieldKey = key as keyof IOffsetParameterData;
      set((state) => ({
        data: {
          ...state.data,
          [fieldKey]: typeof initDataValue[fieldKey] === "boolean" ? false : "0",
        },
      }));
    },
    sliceData: ({ key }) => {
      if (!key) return;
      const fieldKey = key as keyof IOffsetParameterData;
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
        const fieldKey = key as keyof IOffsetParameterData;
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
      const fieldKey = key as keyof IOffsetParameterData;
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
      const fieldKey = key as keyof IOffsetParameterData;
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
