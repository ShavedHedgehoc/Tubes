"use client";
import { useProductSearchParams } from "@/entities/product";
import { cn } from "@/shared/lib";
import { Button, ButtonGroup, Input } from "@/shared/ui";
import { X } from "lucide-react";
import { throttle } from "nuqs";

export default function NameInput() {
  const { params, setParams } = useProductSearchParams();

  const value = params.name || "";

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setParams(
      { name: newValue || null, page: 1 },
      { shallow: false, throttleMs: 500, limitUrlUpdates: throttle(500) },
    );
  };

  const handleReset = () => {
    setParams({ name: null, page: 1 }, { shallow: false });
  };

  return (
    <ButtonGroup className="h-8 ">
      <Input
        placeholder="Поиск по наименованию...  "
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
          " border-l-0  h-8",
          "focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none",
        )}
      >
        <X />
      </Button>
    </ButtonGroup>
  );
}
