"use client";

import { useEmployeeSearchParams } from "@/entities/employee";
import { cn } from "@/shared/lib";
import { Button, ButtonGroup, Input } from "@/shared/ui";
import { ArrowDownWideNarrow, ArrowUpWideNarrow, X } from "lucide-react";
import { throttle } from "nuqs";

export default function NameInput() {
  const { params, setParams } = useEmployeeSearchParams();

  const value = params.name || "";

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setParams(
      { name: newValue || null, page: 1 },
      { shallow: false, throttleMs: 500, limitUrlUpdates: throttle(500) },
    );
  };

  const handleReset = () => {
    setParams({ name: null, page: 1 });
  };

  const handleChangeSort = () => {
    setParams({
      name_asc: params.name_asc === "true" ? "false" : "true",
      page: 1,
    });
  };

  return (
    <ButtonGroup className="h-8 ">
      <Button variant="outline" size="sm" onClick={handleChangeSort}>
        {params.name_asc === "true" ? (
          <ArrowDownWideNarrow />
        ) : (
          <ArrowUpWideNarrow />
        )}
      </Button>
      <Input
        id="employee-filter-name-input"
        placeholder="Поиск по фамилии...  "
        value={value}
        onChange={handleChangeName}
        className={cn(
          "w-48 h-8 border-r-0 rounded-none",
          "ring-0! ring-offset-0! shadow-none!",
          "outline-none! focus-visible:outline-none!",
          "focus:border-input focus-visible:border-input",
          "relative focus:z-10",
        )}
      />
      <Button
        variant="outline"
        size="sm"
        onClick={handleReset}
        className={cn(
          "rounded-r-none border-l-0 border-r-0 h-8",
          "focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none",
        )}
      >
        <X />
      </Button>
    </ButtonGroup>
  );
}
