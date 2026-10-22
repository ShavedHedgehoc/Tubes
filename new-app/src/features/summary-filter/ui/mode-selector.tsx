"use client";

import { MODE_LIST_ITEMS, useSummarySearchParams } from "@/entities/summary";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui";
import { useMemo } from "react";

export default function ModeSelector() {
  const { params, setParams } = useSummarySearchParams();
  const currentValue = params.modes?.[0] ?? "All";

  const currentDescription = useMemo(() => {
    return (
      MODE_LIST_ITEMS.find((x) => x.value === currentValue)?.description ||
      "Все"
    );
  }, [currentValue]);

  const onValueChange = (value: string) => {
    setParams({ modes: value === "All" ? null : [value], page: 1 });
  };

  return (
    <Select value={currentValue} onValueChange={onValueChange}>
      <SelectTrigger
        size="sm"
        className=" w-37.5 shadow-none text-xs rounded-none border-r-0  focus:ring-0 focus:ring-offset-0"
      >
        <SelectValue>{currentDescription}</SelectValue>
      </SelectTrigger>
      <SelectContent className="bg-background shadow-none">
        <SelectGroup>
          {MODE_LIST_ITEMS.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.description}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
