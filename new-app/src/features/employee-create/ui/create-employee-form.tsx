"use client";

import { FormProvider } from "react-hook-form";
import { FieldGroup, FormLayout } from "@/shared/ui";
import { RankEntity } from "@/entities/rank/model/types";
import { useCreateEmployeeForm } from "../model";
import {
  AllowedPostsSelector,
  BarcodeField,
  NameField,
  RankComboboxField,
} from "./form-fields";
import { FormFooter } from "./form-footer";
import { PostEntity } from "@/entities/post";

interface Props {
  ranks: RankEntity[];
  posts: PostEntity[];
}

export function CreateEmployeeForm({ ranks, posts }: Props) {
  const { form, onSubmit, handleClose, ...state } = useCreateEmployeeForm({
    ranks,
  });
  return (
    <FormProvider {...form}>
      <FormLayout
        title="Создание нового сотрудника"
        description="Внесите данные и сохраните нового сотрудника"
        onClose={handleClose}
        footer={<FormFooter createPending={state.createPending} />}
      >
        <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <div className="flex flex-col gap-4">
              <NameField />
              <BarcodeField />
              <RankComboboxField
                ranks={ranks}
                expectedValues={state.expectedValues}
              />
              <AllowedPostsSelector posts={posts} />
            </div>
          </FieldGroup>
        </form>
      </FormLayout>
    </FormProvider>
  );
}
