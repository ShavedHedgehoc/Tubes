import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createEmployeeFormSchema,
  CreateEmployeeFormValues,
  EmployeeEntity,
  useEmployeeUiParams,
} from "@/entities/employee";
import { RankEntity } from "@/entities/rank";
import { useUpdateEmployee } from "./use-update-employee";

export const useEditEmployeeForm = ({
  data,
  ranks,
}: {
  data: EmployeeEntity;
  ranks: RankEntity[];
}) => {
  const { params, setParams } = useEmployeeUiParams();
  const { updateEmployee, updatePending } = useUpdateEmployee();
  const expectedValues = ranks.map((item) => item.id);

  const form = useForm<CreateEmployeeFormValues>({
    resolver: zodResolver(createEmployeeFormSchema),
    values: {
      ...data,
      allowed_post_ids: data?.allowed_posts?.map((ap) => ap.id),
    },
  });

  const updateId = params["edit-employee"];
  async function onSubmit(data: CreateEmployeeFormValues) {
    if (updateId) {
      console.log(data);
      updateEmployee(
        { id: updateId, ...data },
        {
          onSuccess: () => {
            form.reset();
            setParams({ "edit-employee": null });
          },
        },
      );
    }
  }

  const handleClose = () => {
    form.reset();
    setParams({ "edit-employee": null });
  };
  return { form, onSubmit, handleClose, updatePending, expectedValues };
};
