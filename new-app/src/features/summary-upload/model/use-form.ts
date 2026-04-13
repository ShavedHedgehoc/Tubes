import {
  ACCEPTED_FILE_TYPES,
  uploadSummariesFormSchema,
  UploadSummariesFormValues,
  useSummaryUiParams,
} from "@/entities/summary";
import type { SummaryUploadDto } from "@/entities/summary";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { useXlsxParser } from "../lib";
import { useUploadSummaryData } from ".";
import { useRef } from "react";

export const useSummaryUploadForm = () => {
  const { setParams } = useSummaryUiParams();

  const {
    validate,
    errors,
    reset,
    isValid,
    isPending,
    data: fileData,
  } = useXlsxParser();
  const { upload, uploadPending } = useUploadSummaryData();
  const form = useForm<UploadSummariesFormValues>({
    resolver: zodResolver(uploadSummariesFormSchema),
    defaultValues: {
      file: undefined,
    },
  });
  const {
    control,
    formState: { isSubmitting },
  } = form;
  const fileValue = useWatch({ control, name: "file" });
  const dateValue = useWatch({ control, name: "date" });
  const resetDisable = !fileValue && !dateValue;
  const submitDisable =
    !fileValue || !dateValue || !isValid || uploadPending || isSubmitting;

  const fileInputRef = useRef<HTMLInputElement>(null);
  const acceptedFiles = ACCEPTED_FILE_TYPES.join(",");

  async function onSubmit(data: UploadSummariesFormValues) {
    if (fileData.length === 0) return;

    const dto: SummaryUploadDto = {
      summaryDate: data.date.toDateString(),
      update: false,
      rows: fileData,
    };
    upload(dto);
    form.reset();
    setParams({ "upload-summary": false });
  }

  const handleClose = () => {
    form.reset();
    setParams({ "upload-summary": false });
  };

  const handleErrorView = () => {
    setParams({ "view-errors": true });
  };

  return {
    form,
    uploadPending,
    handleClose,
    handleErrorView,
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
