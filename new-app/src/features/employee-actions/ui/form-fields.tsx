import { CreateEmployeeFormValues } from "@/entities/employee";
import { PostEntity } from "@/entities/post";
import { RankEntity } from "@/entities/rank";
import { cn } from "@/shared/lib";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  Field,
  FieldError,
  FieldLabel,
  Input,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui";
import { ChevronDown } from "lucide-react";
import React from "react";

import { Controller, useFormContext } from "react-hook-form";

export function NameField() {
  const { control } = useFormContext<CreateEmployeeFormValues>();
  return (
    <Controller
      name="name"
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor="edit-employee-name-input">ФИО</FieldLabel>
          <Input
            {...field}
            id="edit-employee-name-input"
            aria-invalid={fieldState.invalid}
            placeholder="Пожалуйста, введите ФИО"
            autoComplete="off"
            className={cn(
              "ring-0! ring-offset-0! shadow-none!",
              "outline-none! focus-visible:outline-none!",
              "focus:border-input focus-visible:border-input",
            )}
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}

export function BarcodeField() {
  const { control } = useFormContext<CreateEmployeeFormValues>();
  return (
    <Controller
      name="barcode"
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor="edit-employee-barcode-input">
            Штрихкод
          </FieldLabel>
          <Input
            {...field}
            id="edit-employee-barcode-input"
            aria-invalid={fieldState.invalid}
            placeholder="Пожалуйста, введите штрихкод"
            autoComplete="on"
            className={cn(
              "ring-0! ring-offset-0! shadow-none!",
              "outline-none! focus-visible:outline-none!",
              "focus:border-input focus-visible:border-input",
            )}
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}

export function RankSelector({
  ranks,
  expectedValues,
}: {
  ranks: RankEntity[];
  expectedValues: number[];
}) {
  const { control } = useFormContext<CreateEmployeeFormValues>();
  const selectId = "edit-employee-rank-selector";

  return (
    <Controller
      name="rank_id"
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={selectId}>Разряд</FieldLabel>
          <Select
            defaultValue={expectedValues[0].toString()}
            value={field.value.toString()}
            onValueChange={(val) => field.onChange(Number(val))}
          >
            <SelectTrigger id={selectId} name={field.name}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-background shadow-none">
              <SelectGroup>
                {ranks.map((item) => (
                  <SelectItem key={item.id} value={item.id.toString()}>
                    {item.description}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}

export function AllowedPostsSelector({ posts }: { posts: PostEntity[] }) {
  const { control } = useFormContext<CreateEmployeeFormValues>();
  const selectId = "edit-employee-allowed-posts-selector";

  const idToNameMap = React.useMemo(() => {
    return Object.fromEntries(posts.map((post) => [post.id, post.name]));
  }, [posts]);

  return (
    <Controller
      name="allowed_post_ids"
      control={control}
      render={({ field, fieldState }) => {
        const currentSelectedIds: number[] = field.value || [];

        const handleSelect = (id: number) => {
          const updatedIds = currentSelectedIds.includes(id)
            ? currentSelectedIds.filter((item) => item !== id)
            : [...currentSelectedIds, id];
          console.log(updatedIds);
          field.onChange(updatedIds);
        };
        const displayText =
          currentSelectedIds.length > 0
            ? currentSelectedIds
                .map((id) => idToNameMap[id])
                .filter(Boolean)
                .join(", ")
            : "Выберите доступные посты...";

        return (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={selectId}>Доступные посты</FieldLabel>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div
                  id={selectId}
                  className={cn(
                    "flex min-h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm cursor-pointer select-none",
                    "ring-0! ring-offset-0! shadow-none!",
                    "outline-none! focus:border-input focus-visible:border-input",
                    currentSelectedIds.length === 0 && "text-muted-foreground",
                    fieldState.invalid && "border-destructive",
                  )}
                >
                  <span className="truncate pr-4">{displayText}</span>
                  <span className="text-muted-foreground text-xs opacity-50">
                    <ChevronDown className="h-4 w-4" />
                  </span>
                </div>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                className="w-(--radix-dropdown-menu-trigger-width) bg-background shadow-md max-h-64 overflow-y-auto"
                align="start"
              >
                {(posts || []).map((post) => {
                  const isChecked = currentSelectedIds.includes(post.id);

                  return (
                    <DropdownMenuCheckboxItem
                      key={post.id}
                      checked={isChecked}
                      onSelect={(e) => e.preventDefault()}
                      onCheckedChange={() => handleSelect(post.id)}
                      className="cursor-pointer"
                    >
                      {post.name}
                    </DropdownMenuCheckboxItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        );
      }}
    />
  );
}
