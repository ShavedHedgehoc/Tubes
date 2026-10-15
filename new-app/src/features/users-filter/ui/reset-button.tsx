"use client";

import { useUserSearchParams } from "@/entities/user";
import { Button } from "@/shared/ui/button";
import { Trash } from "lucide-react";

export default function ResetButton() {
  const { params, setParams } = useUserSearchParams();

  const isDirty =
    params.name !== null ||
    params.email !== null ||
    (params.roles && params.roles.length > 0) ||
    params.banned !== null;

  const handleReset = () => {
    setParams(null);
  };

  return (
    <Button
      size="sm"
      variant="ghost"
      className="py-0 px-3 text-xs "
      onClick={handleReset}
      disabled={!isDirty}
    >
      <Trash /> Сброс
    </Button>
  );
}
