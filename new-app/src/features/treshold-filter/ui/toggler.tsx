import { useTresholdUiParams } from "@/entities/treshold";
import { ToggleGroup, ToggleGroupItem } from "@/shared/ui";

type TresholdPost = "extrusion" | "varnish" | "offset" | "sealant";

export default function Toggler() {
  const { params, setParams } = useTresholdUiParams();
  const currentValue = params["treshold-columns"] || "extrusion";

  const handleValueChange = (value: string) => {
    if (value) {
      setParams({ "treshold-columns": value as TresholdPost });
    }
  };

  return (
    <ToggleGroup
      variant="outline"
      size={"sm"}
      type="single"
      value={currentValue} // Управляемое значение
      onValueChange={handleValueChange}
    >
      <ToggleGroupItem value="extrusion" aria-label="extrusion">
        Пост 1
      </ToggleGroupItem>
      <ToggleGroupItem value="varnish" aria-label="varnish">
        Пост 2
      </ToggleGroupItem>
      <ToggleGroupItem value="offset" aria-label="offset">
        Пост 3
      </ToggleGroupItem>
      <ToggleGroupItem value="sealant" aria-label="sealant">
        Пост 4
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
