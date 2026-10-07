import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useLabLockUIParams } from "./use-ui-params";
import { useChangeLock } from "./use-change-lock";
import {
  changeLabLockFormSchema,
  ChangeLabLockFormValues,
} from "./form-schema";
import { ChangeLockDto } from "@/entities/lab-lock/api/dto/change-lock.dto";
import { useAppSession } from "@/entities/user";

import React from "react";

export const useChangeLabLockForm = () => {
  const { params, setParams } = useLabLockUIParams();
  const { changeLock, changeLockPending } = useChangeLock();
  const session = useAppSession();
  const user = session?.data?.user;

  const {
    post_title: title,
    summary_id: summaryId,
    post_val: postVal,
    state: state,
    conveyor_name: conveyorName,
  } = params;

  const form = useForm<ChangeLabLockFormValues>({
    resolver: zodResolver(changeLabLockFormSchema),
    mode: "onChange",
    defaultValues: {
      lockReasonId: null,
    },
  });

  async function onSubmit(data: ChangeLabLockFormValues) {
    if (postVal === null || summaryId === null || !user) return;

    if (state && !data.lockReasonId) {
      console.warn("Попытка блокировки без указания причины");
      return;
    }
    const dto: ChangeLockDto = {
      post_val: postVal,
      summary_id: summaryId,
      lock_reason_id: state ? data.lockReasonId : null,
      user_id: user.id,
      state: state,
    };

    changeLock(dto, {
      onSuccess: () => {
        handleClose();
      },
    });
  }

  const handleClose = () => {
    form.reset();
    setParams(
      {
        "change-lock": null,
        summary_id: null,
        post_val: null,
        post_title: null,
        conveyor_name: null,
        state: null,
      },
      { shallow: true },
    );
  };

  const handleReset = () => {
    form.reset({ lockReasonId: null });
    setSearchQuery("");
  };

  const [searchQuery, setSearchQuery] = React.useState("");
  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    handleClose,
    handleReset,
    changeLockPending,
    title,
    state,
    postVal,
    conveyorName,
    searchQuery,
    setSearchQuery,
  };
};
