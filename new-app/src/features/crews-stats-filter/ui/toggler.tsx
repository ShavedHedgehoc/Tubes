import { useSummaryCrewsStatsUiParams } from "@/entities/summary";

import { ToggleGroup, ToggleGroupItem } from "@/shared/ui";

export function Toggler() {
  const { params: uiParams, setParams: setUiParams } =
    useSummaryCrewsStatsUiParams();
  const currentValue = uiParams.isDefect ? "defect" : "plan";

  const handleValueChange = (value: string) => {
    if (value) {
      setUiParams({ isDefect: value === "defect" });
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
    </ToggleGroup>
  );
}
