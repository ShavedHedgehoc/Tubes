"use client";

import { useEmployeeSearchParams } from "@/entities/employee";
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
  { value: "All", description: "Все доступы" },
  { value: "1", description: "Разрешен" },
  { value: "2", description: "Запрещен" },
];

export default function BannedSelector() {
  const { params, setParams } = useEmployeeSearchParams();
  const currentValue = params.banned?.[0] ?? "All";

  const currentDescription = useMemo(() => {
    return (
      LIST_ITEMS.find((x) => x.value === currentValue)?.description || "Все"
    );
  }, [currentValue]);

  const onValueChange = (value: string) => {
    setParams(
      { banned: value === "All" ? null : [value], page: 1 },
      { shallow: false },
    );
  };

  return (
    <Select value={currentValue} onValueChange={onValueChange}>
      <SelectTrigger
        size="sm"
        className=" w-[120px]  text-xs rounded-l-none rounded-r-none border-r-0 focus:ring-0 focus:ring-offset-0"
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
