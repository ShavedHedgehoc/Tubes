"use client";

import { cn } from "@/shared/lib";
import { Button, ButtonGroup, Input } from "@/shared/ui";
import { X } from "lucide-react";
import { useTransition } from "react";

interface IFilterInputProps {
  value: string;
  onChange: (value: string) => void;
  onReset: () => void;
  placeholder?: string;
  id?: string;
  className?: string;
  isLoading?: boolean;
  isRightEdge?: boolean;
  isLeftEdge?: boolean;
}

export function FilterInput({
  value,
  onChange,
  onReset,
  placeholder = "Поиск...",
  id = "filter-search-input",
  className,
  isLoading,
  isRightEdge = false,
  isLeftEdge = false,
}: IFilterInputProps) {
  const [isPending, startTransition] = useTransition();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    startTransition(() => {
      onChange(newValue);
    });
  };

  return (
    <ButtonGroup className="h-8 ">
      <Input
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        className={cn(
          className,
          "h-8 border-r-0",
          isLeftEdge ? "rounded-r-none" : "rounded-none",
          "ring-0! ring-offset-0! shadow-none!",
          "outline-none! focus-visible:outline-none!",
          "focus:border-input focus-visible:border-input",
          "relative focus:z-10",
          (isLoading || isPending) && "opacity-70",
        )}
      />
      <Button
        variant="outline"
        size="sm"
        onClick={onReset}
        className={cn(
          isRightEdge ? "rounded-l-none" : "rounded-r-none border-r-0",
          "border-l-0  h-8",
          "focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none",
          "shadow-none",
        )}
      >
        <X />
      </Button>
    </ButtonGroup>
  );
}
