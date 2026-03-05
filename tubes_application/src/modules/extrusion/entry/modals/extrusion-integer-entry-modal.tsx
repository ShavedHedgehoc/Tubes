import { useShallow } from "zustand/shallow";
import { useExtrusionInputStore, ExtrusionInputParams } from "../../store/use-extrusion-input-store";
import IntegerEntryModal from "@/shared/components/modals/integer-entry-modal";
import { useExtrusionIntegerEntryModalStore } from "../../store/use-extrusion-integer-entry-modal-store";

export default function ExtrusionIntegerEntryModal() {
  const { key, title, open, setOpen, minValue, maxValue, unit } = useExtrusionIntegerEntryModalStore(
    useShallow((state) => ({
      key: state.key,
      title: state.title,
      open: state.open,
      setOpen: state.setOpen,
      minValue: state.minValue,
      maxValue: state.maxValue,
      unit: state.unit
    }))
  );
  const clearData = useExtrusionInputStore(useShallow((state) => state.clearData));
  const changeData = useExtrusionInputStore(useShallow((state) => state.changeData));
  const sliceData = useExtrusionInputStore(useShallow((state) => state.sliceData));
  const roundData = useExtrusionInputStore(useShallow((state) => state.roundData));

  const data = useExtrusionInputStore(
    useShallow((state) => {
      if (!key) return "0";
      return state.data[key as keyof typeof state.data] as string;
    })
  );

  if (!key) return null
  return <IntegerEntryModal<ExtrusionInputParams>
    id={key as ExtrusionInputParams}
    dataKey={key as ExtrusionInputParams}
    title={title}
    open={open}
    data={data}
    minValue={minValue}
    maxValue={maxValue}
    unit={unit}
    setOpen={setOpen}
    clearData={clearData}
    changeData={changeData}
    sliceData={sliceData}
    roundData={roundData}
  />;
}
