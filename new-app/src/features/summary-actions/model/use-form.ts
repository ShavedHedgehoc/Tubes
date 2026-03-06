import { useForm } from "react-hook-form";
import { useSummaryUiParams } from "@/entities/summary";

export const useEditSummaryForm = () => {
  const { setParams } = useSummaryUiParams();
  const form = useForm();

  async function onSubmit() {
    form.reset();
    setParams({ "edit-summary": null });
  }

  const handleClose = () => {
    form.reset();
    setParams({ "edit-summary": null });
  };
  return { form, onSubmit, handleClose };
};
