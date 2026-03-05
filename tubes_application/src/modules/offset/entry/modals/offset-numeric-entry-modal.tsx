import { useShallow } from "zustand/shallow";
import NumericEntryModal from "@/shared/components/modals/numeric-entry-modal";
import { useOffsetNumericEntryModalStore } from "../../store/use-offset-numeric-entry-modal-store";
import { OffsetInputParams, useOffsetInputStore } from "../../store/use-offset-input-store";

export default function OffsetNumericEntryModal() {
  const { key, title, open, setOpen, minValue, maxValue, unit } = useOffsetNumericEntryModalStore(
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

  const clearData = useOffsetInputStore(useShallow((state) => state.clearData));
  const changeData = useOffsetInputStore(useShallow((state) => state.changeData));
  const sliceData = useOffsetInputStore(useShallow((state) => state.sliceData));
  const roundData = useOffsetInputStore(useShallow((state) => state.roundData));

  const data = useOffsetInputStore(
    useShallow((state) => {
      if (!key) return "0";
      return state.data[key as keyof typeof state.data] as string;
    })
  );


  if (!key) return null
  return <NumericEntryModal<OffsetInputParams>
    id={key as OffsetInputParams}
    dataKey={key as OffsetInputParams}
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
