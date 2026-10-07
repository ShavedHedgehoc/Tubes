import {
  CreatePostStatusData,
  postCloseFormSchema,
  PostCloseFormValues,
  useConveyorUiParams,
} from "@/entities/conveyor";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { usePostClose } from "./use-close-post";

export const usePostCloseForm = () => {
  const { params, setParams } = useConveyorUiParams();
  const { postClose, closePending } = usePostClose();

  const {
    "post-title": title,
    "summary-id": summaryId,
    "post-val": postVal,
  } = params;

  const form = useForm<PostCloseFormValues>({
    resolver: zodResolver(postCloseFormSchema),
    defaultValues: {
      defectValue: 0,
    },
  });

  async function onSubmit(data: PostCloseFormValues) {
    if (postVal !== null && summaryId !== null) {
      const dto: CreatePostStatusData = {
        post_val: postVal,
        summary_id: summaryId,
        operation_id: null,
        idle: false,
        finished: true,
        employee_id: null,
        defect_value: String(data.defectValue),
      };

      postClose(dto, {
        onSuccess: () => {
          handleClose();
        },
      });
    }
  }

  const handleClose = () => {
    form.reset();
    setParams(
      {
        "close-post": null,
        "summary-id": null,
        "post-val": null,
        "post-title": null,
      },
      { shallow: true },
    );
  };
  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    handleClose,
    closePending,
    title,
  };
};
