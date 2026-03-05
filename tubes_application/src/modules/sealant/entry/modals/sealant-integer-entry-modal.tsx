import { useShallow } from "zustand/shallow";
import IntegerEntryModal from "@/shared/components/modals/integer-entry-modal";
import { useSealantInputStore, SealantInputParams } from "../../store/use-sealant-input-store";
import { useSealantIntegerEntryModalStore } from "../../store/use-sealant-integer-entry-modal-store";

export default function SealantIntegerEntryModal() {
  const { key, title, open, setOpen, minValue, maxValue, unit } = useSealantIntegerEntryModalStore(
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
  return <IntegerEntryModal<SealantInputParams>
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
