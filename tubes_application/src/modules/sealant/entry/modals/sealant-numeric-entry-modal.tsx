import { useShallow } from "zustand/shallow";
import NumericEntryModal from "@/shared/components/modals/numeric-entry-modal";
import { useSealantNumericEntryModalStore } from "../../store/use-sealant-numeric-entry-modal-store";
import { useSealantInputStore, SealantInputParams } from "../../store/use-sealant-input-store";

export default function SealantNumericEntryModal() {
  const { key, title, open, setOpen, minValue, maxValue, unit } = useSealantNumericEntryModalStore(
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

  const clearData = useSealantInputStore(useShallow((state) => state.clearData));
  const changeData = useSealantInputStore(useShallow((state) => state.changeData));
  const sliceData = useSealantInputStore(useShallow((state) => state.sliceData));
  const roundData = useSealantInputStore(useShallow((state) => state.roundData));

  const data = useSealantInputStore(
    useShallow((state) => {
      if (!key) return "0";
      return state.data[key as keyof typeof state.data] as string;
    })
  );


  if (!key) return null
  return <NumericEntryModal<SealantInputParams>
    id={key as SealantInputParams}
    dataKey={key as SealantInputParams}
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
