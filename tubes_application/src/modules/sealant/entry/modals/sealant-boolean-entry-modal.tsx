import BooleanEntryModal from "@/shared/components/modals/boolean-entry-modal";
import { useShallow } from "zustand/shallow";
import { useSealantBooleanEntryModalStore } from "../../store/use-sealant-boolean-entry-modal-store";
import { useSealantInputStore, SealantInputParams } from "../../store/use-sealant-input-store";

export default function SealantBooleanEntryModal() {
  const { key, title, open, setOpen } = useSealantBooleanEntryModalStore(
    useShallow((state) => ({
      key: state.key,
      title: state.title,
      open: state.open,
      setOpen: state.setOpen,
    }))
  );

  const changeData = useSealantInputStore(useShallow((state) => state.changeData));

  const data = useSealantInputStore(
    useShallow((state) => {
      if (!key) return false;
      return state.data[key as keyof typeof state.data] as boolean;
    })
  );

  if (!key) return null
  return <BooleanEntryModal<SealantInputParams>
    id={key as SealantInputParams}
    dataKey={key as SealantInputParams}
    title={title}
    open={open}
    data={data}
    setOpen={setOpen}
    changeData={changeData} />;
}
