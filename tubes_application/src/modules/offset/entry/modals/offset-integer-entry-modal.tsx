import { useShallow } from "zustand/shallow";
import IntegerEntryModal from "@/shared/components/modals/integer-entry-modal";
import { useOffsetIntegerEntryModalStore } from "../../store/use-offset-integer-entry-modal-store";
import {
  OffsetInputParams,
  useOffsetInputStore,
} from "../../store/use-offset-input-store";

export default function OffsetIntegerEntryModal() {
  const { key, title, open, setOpen, minValue, maxValue, unit } =
    useOffsetIntegerEntryModalStore(
      useShallow((state) => ({
        key: state.key,
        title: state.title,
        open: state.open,
        setOpen: state.setOpen,
        minValue: state.minValue,
        maxValue: state.maxValue,
        unit: state.unit,
      })),
    );
  const clearData = useOffsetInputStore(useShallow((state) => state.clearData));
  const changeData = useOffsetInputStore(
    useShallow((state) => state.changeData),
  );
  const sliceData = useOffsetInputStore(useShallow((state) => state.sliceData));
  const roundData = useOffsetInputStore(useShallow((state) => state.roundData));

  const data = useOffsetInputStore(
    useShallow((state) => {
      if (!key) return "0";
      return state.data[key as keyof typeof state.data] as string;
    }),
  );

  if (!key) return null;
  return (
    <IntegerEntryModal<OffsetInputParams>
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
    />
  );
}
