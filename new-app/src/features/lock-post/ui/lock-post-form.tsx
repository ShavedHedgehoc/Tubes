"use client";

import React from "react";
import { FormProvider } from "react-hook-form";
import { FieldGroup, FormLayout } from "@/shared/ui";
import { useChangeLabLockForm } from "../model/use-form";
import { FormFooter } from "./form-footer";
import { LockReasonField } from "./lock-reason-field";
import { AddReasonDialog } from "./add-reason-dialog";
import { AddReasonButton } from "./add-reason-button";

export function LockPostForm() {
  const {
    form,
    onSubmit,
    handleClose,
    handleReset,
    searchQuery,
    setSearchQuery,
    changeLockPending,
    postVal,
    state,
    conveyorName,
  } = useChangeLabLockForm();

  const [isAddReasonOpen, setIsAddReasonOpen] = React.useState(false);

  return (
    <FormProvider {...form}>
      <FormLayout
        title={` ${state ? "Блокировка" : "Допуск к работе"} `}
        description={`Конвейер ${conveyorName} Пост ${postVal}`}
        onClose={handleClose}
        footer={
          <FormFooter
            createPending={changeLockPending}
            state={state}
            onClear={handleReset}
            actionButton={
              state && (
                <AddReasonButton onClick={() => setIsAddReasonOpen(true)} />
              )
            }
          />
        }
      >
        <form id="lock-post-form" onSubmit={onSubmit}>
          {state && (
            <FieldGroup>
              <div className="flex flex-col gap-4">
                <LockReasonField
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                />
              </div>
            </FieldGroup>
          )}
        </form>
      </FormLayout>
      <AddReasonDialog
        open={isAddReasonOpen}
        onOpenChange={setIsAddReasonOpen}
        setSearchQuery={setSearchQuery}
      />
    </FormProvider>
  );
}
