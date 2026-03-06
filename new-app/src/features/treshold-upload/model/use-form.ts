import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { useRef } from "react";
import {
  ACCEPTED_FILE_TYPES,
  uploadTresholdsFormSchema,
  UploadTresholdsFormValues,
  useTresholdUiParams,
} from "@/entities/treshold";
import { useXlsxParser } from "../lib";
import { useUploadTresholdData } from "./use-upload-data";
import { TresholdsUploadDto } from "@/entities/treshold/api/dto";

export const useTresholdUploadForm = () => {
  const { setParams } = useTresholdUiParams();
  const {
    validate,
    errors,
    reset,
    isValid,
    isPending,
    data: fileData,
  } = useXlsxParser();
  const { upload, uploadPending } = useUploadTresholdData();

  const form = useForm<UploadTresholdsFormValues>({
    resolver: zodResolver(uploadTresholdsFormSchema),
    defaultValues: {
      file: undefined,
    },
  });
  const {
    control,
    formState: { isSubmitting },
  } = form;
  const fileValue = useWatch({ control, name: "file" });
  const resetDisable = !fileValue;
  const submitDisable = !fileValue || !isValid || uploadPending || isSubmitting;

  const fileInputRef = useRef<HTMLInputElement>(null);
  const acceptedFiles = ACCEPTED_FILE_TYPES.join(",");

  async function onSubmit(_: UploadTresholdsFormValues) {
    if (fileData.length === 0) return;

    const dto: TresholdsUploadDto = {
      rows: fileData,
    };
    upload(dto);
    form.reset();
    reset();
    setParams({ "upload-treshold": false });
  }

  const handleClose = () => {
    form.reset();
    setParams({ "upload-treshold": false });
  };

  return {
    form,
    uploadPending,
    handleClose,
    onSubmit,
    validate,
    reset,
    errors,
    isPending,
    resetDisable,
    submitDisable,
    isValid,
    acceptedFiles,
    fileInputRef,
  };
};
