"use client";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  Field,
} from "@/shared/ui";
import { Controller, useFormContext } from "react-hook-form";
import { labLockReasonApi } from "@/entities/lab-lock-reason";
import { cn } from "@/shared/lib";
import React from "react";
import { Check } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

interface LockReasonFieldProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
}

export function LockReasonField({
  searchQuery,
  setSearchQuery,
}: LockReasonFieldProps) {
  const { control } = useFormContext();

  const { data: reasonsData } = useQuery({
    ...labLockReasonApi.labLockReasonQueries.list({ isServer: false }),
    staleTime: 5 * 60 * 1000,
  });

  const labLockReasons = reasonsData?.labLockReasons;

  const options = React.useMemo(() => {
    return (labLockReasons || []).map((item) => ({
      value: String(item.id),
      label: item.value || "Без названия",
    }));
  }, [labLockReasons]);

  const filteredOptions = React.useMemo(() => {
    if (!searchQuery.trim()) return options;
    return options.filter((option) =>
      option.label.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [options, searchQuery]);

  return (
    <Field>
      <Command
        shouldFilter={false}
        className="rounded-lg border bg-popover text-popover-foreground shadow-none max-w-sm w-full"
      >
        <CommandInput
          placeholder="Поиск причины блокировки..."
          value={searchQuery}
          onValueChange={setSearchQuery}
        />

        <CommandList className="h-75 overflow-y-auto scrollbar-thin">
          {filteredOptions.length === 0 && (
            <CommandEmpty>Ничего не найдено.</CommandEmpty>
          )}

          <Controller
            name="lockReasonId"
            control={control}
            render={({ field: idField }) => {
              const currentStringValue =
                idField.value !== undefined && idField.value !== null
                  ? String(idField.value)
                  : "";

              return (
                <CommandGroup>
                  {filteredOptions.map((option) => (
                    <CommandItem
                      key={option.value}
                      value={option.label}
                      onSelect={() => {
                        const nextValue =
                          option.value === currentStringValue
                            ? null
                            : Number(option.value);

                        idField.onChange(nextValue);
                        setSearchQuery("");
                      }}
                      className={cn(
                        "flex items-center justify-between cursor-pointer",
                        currentStringValue === option.value &&
                          "bg-muted-foreground/10",
                      )}
                    >
                      <span>{option.label}</span>
                      <Check
                        className={cn(
                          "h-4 w-4 transition-opacity",
                          currentStringValue === option.value
                            ? "opacity-100"
                            : "opacity-0",
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              );
            }}
          />
        </CommandList>
      </Command>
    </Field>
  );
}
