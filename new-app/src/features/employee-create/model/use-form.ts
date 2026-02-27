import { createEmployeeFormSchema, CreateEmployeeFormValues, useEmployeeUiParams } from "@/entities/employee";
import { RankEntity } from "@/entities/rank";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useCreateEmployee } from "./use-create-employee";

export const useCreateEmployeeForm = ({ ranks }: { ranks: RankEntity[] }) => {
    const { setParams } = useEmployeeUiParams();
    const { createEmployee, createPending } = useCreateEmployee();
    const expectedValues = ranks.map((item) => item.id);

    const form = useForm<CreateEmployeeFormValues>({
        resolver: zodResolver(createEmployeeFormSchema),
        defaultValues: {
            name: "",
            barcode: "",
            rank_id: expectedValues[0],
        },
    });

    async function onSubmit(data: CreateEmployeeFormValues) {
        createEmployee(data, {
            onSuccess: () => {
                form.reset();
                setParams({ "create-employee": false });
            },
        });
    }

    const handleClose = () => {
        form.reset();
        setParams({ "create-employee": false });
    };
    return { form, onSubmit, handleClose, createPending, expectedValues }
}