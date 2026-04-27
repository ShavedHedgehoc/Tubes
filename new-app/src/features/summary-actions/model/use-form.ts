import { useForm } from "react-hook-form";
import {
  SummaryDetailEntity,
  updateSummaryFormSchema,
  UpdateSummaryFormValues,
  useSummaryUiParams,
} from "@/entities/summary";
import { useUpdateSummary } from "./use-update-summary";
import { zodResolver } from "@hookform/resolvers/zod";
import { CrewEntity } from "@/entities/crew";

export const useEditSummaryForm = ({
  data,
}: {
  data: SummaryDetailEntity;
  crews: CrewEntity[];
}) => {
  const { params, setParams } = useSummaryUiParams();

  const form = useForm<UpdateSummaryFormValues>({
    resolver: zodResolver(updateSummaryFormSchema),
    values: data,
  });
  const { updateSummary, updatePending } = useUpdateSummary();

  const updateId = params["edit-summary"];
  async function onSubmit(data: UpdateSummaryFormValues) {
    if (updateId) {
      updateSummary(
        { id: updateId, ...data },
        {
          onSuccess: () => {
            form.reset();
            setParams({ "edit-summary": null });
          },
        },
      );
    }
  }

  const handleClose = () => {
    form.reset();
    setParams({ "edit-summary": null });
  };
  return { form, onSubmit, handleClose, updatePending };
};
