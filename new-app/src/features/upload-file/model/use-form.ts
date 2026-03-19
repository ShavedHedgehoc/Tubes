import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { useFileUiParams } from "@/entities/file";
import {
  ACCEPTED_FILE_TYPES,
  uploadFileFormSchema,
  UploadFileFormValues,
} from "@/entities/file";
import { useRef } from "react";
import { useUploadFile } from "./use-upload-file";

export const useFileUploadForm = () => {
  const { setParams } = useFileUiParams();
  const { uploadFile, uploadPending } = useUploadFile();

  const form = useForm<UploadFileFormValues>({
    resolver: zodResolver(uploadFileFormSchema),
    defaultValues: { file: undefined },
  });
  const {
    control,
    formState: { isSubmitting },
  } = form;
  const fileValue = useWatch({ control, name: "file" });
  const resetDisable = !fileValue;
  const submitDisable = !fileValue || uploadPending || isSubmitting;

  const fileInputRef = useRef<HTMLInputElement>(null);
  const acceptedFiles = ACCEPTED_FILE_TYPES.join(",");

  async function onSubmit(data: UploadFileFormValues) {
    const formData = new FormData();
    formData.append("file", data.file);
    uploadFile(formData, {
      onSuccess: () => {
        form.reset();
        setParams({ "upload-file": false });
      },
    });
  }

  const handleClose = () => {
    form.reset();
    setParams({ "upload-file": false });
  };
  return {
    form,
    onSubmit,
    handleClose,
    uploadPending,
    resetDisable,
    submitDisable,
    acceptedFiles,
    fileInputRef,
  };
};
