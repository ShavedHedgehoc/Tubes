"use client";

import { useUserSearchParams } from "@/entities/user";
import { FilterInput } from "@/shared/ui";
import { throttle } from "nuqs";

export default function EmailInput() {
  const { params, setParams } = useUserSearchParams();

  const handleReset = () => {
    setParams({ email: null, page: 1 });
  };

  const handleChangeEmail = (newValue: string) => {
    setParams(
      { email: newValue || null, page: 1 },
      { shallow: false, throttleMs: 500, limitUrlUpdates: throttle(500) },
    );
  };

  return (
    <FilterInput
      id="employee-filter-email-input"
      className="w-48"
      placeholder="Поиск по email...  "
      value={params.email || ""}
      onChange={handleChangeEmail}
      onReset={handleReset}
    />
  );
}
