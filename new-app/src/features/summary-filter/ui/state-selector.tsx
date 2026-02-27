"use client";

import { useSummarySearchParams } from "@/entities/summary";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui";
import { useMemo } from "react";

const LIST_ITEMS = [
  { value: "All", description: "Все статусы" },
  { value: "1", description: "Активные" },
  { value: "2", description: "Завершенные" },
];

export default function StateSelector() {
  const { params, setParams } = useSummarySearchParams();
  const currentValue = params.states?.[0] ?? "All";

  const currentDescription = useMemo(() => {
    return (
      LIST_ITEMS.find((x) => x.value === currentValue)?.description || "Все"
    );
  }, [currentValue]);

  const onValueChange = (value: string) => {
    setParams(
      { states: value === "All" ? null : [value], page: 1 },
      { shallow: false },
    );
  };

  return (
    <Select value={currentValue} onValueChange={onValueChange}>
      <SelectTrigger
        size="sm"
        className=" w-[150px]  text-xs rounded-l-none  focus:ring-0 focus:ring-offset-0"
      >
        <SelectValue>{currentDescription}</SelectValue>
      </SelectTrigger>
      <SelectContent className="bg-background shadow-none">
        <SelectGroup>
          {LIST_ITEMS.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.description}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
