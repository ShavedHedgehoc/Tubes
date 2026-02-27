"use client";

import { useEmployeeUiParams } from "@/entities/employee";
import { Button } from "@/shared/ui";

export function AddButton() {
  const { setParams } = useEmployeeUiParams();
  const handleAddClick = () => {
    setParams({ "create-employee": true });
  };

  return (
    <div>
      <Button
        size="sm"
        variant="default"
        className=" px-3 h-8 min-h-0 "
        onClick={handleAddClick}
      >
        Создать
      </Button>
    </div>
  );
}
