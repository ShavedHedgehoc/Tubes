import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { EmployeeEntity } from "./types";

export type EmployeePost = "extrusion" | "packaging" | "warehouse" | "quality";

interface EmployeeState {
    employees: Record<EmployeePost, EmployeeEntity | null>;
    setEmployee: (post: EmployeePost, employee: EmployeeEntity) => void;
    clearEmployee: (post: EmployeePost) => void;
    clearAll: () => void;
}

export const useEmployeeStore = create<EmployeeState>()(
    devtools(
        (set) => ({
            // Начальное состояние
            employees: {
                extrusion: null,
                packaging: null,
                warehouse: null,
                quality: null,
            },

            setEmployee: (post, employee) =>
                set(
                    (state) => ({
                        employees: { ...state.employees, [post]: employee },
                    }),
                    false,
                    `employee/set/${post}` // Красивое имя для Redux DevTools
                ),

            clearEmployee: (post) =>
                set(
                    (state) => ({
                        employees: { ...state.employees, [post]: null },
                    }),
                    false,
                    `employee/clear/${post}`
                ),

            clearAll: () =>
                set(
                    () => ({
                        employees: {
                            extrusion: null,
                            packaging: null,
                            warehouse: null,
                            quality: null,
                        },
                    }),
                    false,
                    "employee/clearAll"
                ),
        }),
        { name: "EmployeeStore" }
    )
);
