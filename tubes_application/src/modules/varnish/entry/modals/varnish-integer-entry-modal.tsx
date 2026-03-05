import { useShallow } from "zustand/shallow";
import IntegerEntryModal from "@/shared/components/modals/integer-entry-modal";
import { useVarnishInputStore, VarnishInputParams } from "../../store/use-varnish-input-store";
import { useVarnishIntegerEntryModalStore } from "../../store/use-varnish-integer-entry-modal-store";

export default function VarnishIntegerEntryModal() {
  const { key, title, open, setOpen, minValue, maxValue, unit } = useVarnishIntegerEntryModalStore(
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
  const clearData = useVarnishInputStore(useShallow((state) => state.clearData));
  const changeData = useVarnishInputStore(useShallow((state) => state.changeData));
  const sliceData = useVarnishInputStore(useShallow((state) => state.sliceData));
  const roundData = useVarnishInputStore(useShallow((state) => state.roundData));

  const data = useVarnishInputStore(
    useShallow((state) => {
      if (!key) return "0";
      return state.data[key as keyof typeof state.data] as string;
    })
  );

  if (!key) return null
  return <IntegerEntryModal<VarnishInputParams>
    id={key as VarnishInputParams}
    dataKey={key as VarnishInputParams}
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
