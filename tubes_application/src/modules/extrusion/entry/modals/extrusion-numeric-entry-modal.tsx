import { useShallow } from "zustand/shallow";
import NumericEntryModal from "@/shared/components/modals/numeric-entry-modal";
import { useExtrusionInputStore, ExtrusionInputParams } from "../../store/use-extrusion-input-store";
import { useExtrusionNumericEntryModalStore } from "../../store/use-extrusion-numeric-entry-modal-store";

export default function ExtrusionNumericEntryModal() {

  const { key, title, open, setOpen, minValue, maxValue, unit } = useExtrusionNumericEntryModalStore(
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
  return <NumericEntryModal<ExtrusionInputParams>
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
