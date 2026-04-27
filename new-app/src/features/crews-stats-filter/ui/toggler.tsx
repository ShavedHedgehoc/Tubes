import { useSummaryCrewsStatsUiParams } from "@/entities/summary";

import { ToggleGroup, ToggleGroupItem } from "@/shared/ui";

export function Toggler() {
  const { params: uiParams, setParams: setUiParams } =
    useSummaryCrewsStatsUiParams();
  const currentValue = uiParams.mode;

  const handleValueChange = (value: "idle" | "plan" | "defect") => {
    if (value) {
      setUiParams({ mode: value });
    }
  };
  return (
    <ToggleGroup
      variant="outline"
      size={"sm"}
      type="single"
      value={currentValue}
      onValueChange={handleValueChange}
    >
      <ToggleGroupItem
        className="px-4 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
        value="plan"
        aria-label="plan"
      >
        План
      </ToggleGroupItem>
      <ToggleGroupItem
        className="px-4 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
        value="defect"
        aria-label="defect"
      >
        Брак
      </ToggleGroupItem>
      <ToggleGroupItem
        className="px-4 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
        value="idle"
        aria-label="idle"
      >
        Простои
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
