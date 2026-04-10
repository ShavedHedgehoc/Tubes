"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import {
    Button,
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
    Input,
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/shared/ui";

import { Loader2, X } from "lucide-react";


import { cn } from "@/shared/lib";
import { editUserFormSchema, EditUserFormValues, UserEntity } from "@/entities/user";
import { useUserUiParams } from "@/entities/user/lib";
import { useUpdateUser } from "../model";

export function EditUserForm({ data }: { data: UserEntity; }) {
    const { params, setParams } = useUserUiParams();
    const { updateUser, updatePending } = useUpdateUser();


    const form = useForm<EditUserFormValues>({
        resolver: zodResolver(editUserFormSchema),
        values: data,
    });

    const updateId = params["edit-user"];
    async function onSubmit(data: EditUserFormValues) {
        if (updateId) {
            updateUser(
                { id: updateId, ...data },
                {
                    onSuccess: () => {
                        form.reset();
                        setParams({ "edit-user": null });
                    },
                },
            );
        }
    }

    const handleClose = () => {
        form.reset();
        setParams({ "edit-user": null });
    };

    return (
        <div className="container mx-auto flex  items-center justify-center  flex-col  p-8 flex-1 ">
            <Card className="w-full  max px-3 sm:max-w-md border-0 shadow-none sm:border relative">
                <div className="absolute right-3 top-3">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-full hover:bg-muted transition-colors"
                        onClick={handleClose}
                    >
                        <X className="h-4 w-4 text-muted-foreground" />
                        <span className="sr-only">Закрыть</span>
                    </Button>
                </div>
                <div className="flex flex-col gap-4 ">
                    <CardHeader>
                        <CardTitle>
                            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                                Изменение данных пользователя
                            </h3>
                        </CardTitle>
                        <CardDescription>
                            Измените данные и сохраните запись
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form id="edit-user-form-demo" onSubmit={form.handleSubmit(onSubmit)}>
                            <FieldGroup>
                                <div className="flex flex-col gap-4">
                                    <Controller
                                        name="name"
                                        control={form.control}
                                        render={({ field, fieldState }) => (
                                            <Field data-invalid={fieldState.invalid}>
                                                <FieldLabel htmlFor="edit-user-form-name">
                                                    ФИО
                                                </FieldLabel>
                                                <Input
                                                    {...field}
                                                    id="edit-user-form-name"
                                                    aria-invalid={fieldState.invalid}
                                                    placeholder="Пожалуйста, введите ФИО"
                                                    autoComplete="off"
                                                    className={cn(
                                                        "ring-0! ring-offset-0! shadow-none!",
                                                        "outline-none! focus-visible:outline-none!",
                                                        "focus:border-input focus-visible:border-input",
                                                    )}
                                                />
                                                {fieldState.invalid && (
                                                    <FieldError errors={[fieldState.error]} />
                                                )}
                                            </Field>
                                        )}
                                    />
                                    <Controller
                                        name="email"
                                        control={form.control}
                                        render={({ field, fieldState }) => (
                                            <Field data-invalid={fieldState.invalid}>
                                                <FieldLabel htmlFor="edit-user-form-email">
                                                    Электропочта
                                                </FieldLabel>
                                                <Input
                                                    {...field}
                                                    id="edit-user-form-email"
                                                    aria-invalid={fieldState.invalid}
                                                    placeholder="Пожалуйста, введите штрихкод"
                                                    autoComplete="on"
                                                    className={cn(
                                                        "ring-0! ring-offset-0! shadow-none!",
                                                        "outline-none! focus-visible:outline-none!",
                                                        "focus:border-input focus-visible:border-input",
                                                    )}
                                                />
                                                {fieldState.invalid && (
                                                    <FieldError errors={[fieldState.error]} />
                                                )}
                                            </Field>
                                        )}
                                    />

                                </div>
                            </FieldGroup>
                        </form>
                    </CardContent>
                    <CardFooter className="mt-2">
                        <Field
                            orientation="horizontal"
                            className="justify-end flex flex-row"
                        >
                            <Button
                                type="button"
                                variant="ghost"
                                onClick={() => form.reset()}
                            >
                                Вернуть
                            </Button>
                            <Button
                                type="submit"
                                form="edit-user-form-demo"
                                disabled={updatePending}
                            >
                                {updatePending && (
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                )}
                                {updatePending ? "Изменение..." : "Изменить"}
                            </Button>
                        </Field>
                    </CardFooter>
                </div>
            </Card>
        </div>
    );
}
