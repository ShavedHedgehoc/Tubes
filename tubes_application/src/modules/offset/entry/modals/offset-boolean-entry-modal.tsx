import BooleanEntryModal from "@/shared/components/modals/boolean-entry-modal";

import { useShallow } from "zustand/shallow";
import { useOffsetBooleanEntryModalStore } from "../../store/use-offset-boolean-entry-modal-store";
import { OffsetInputParams, useOffsetInputStore } from "../../store/use-offset-input-store";

export default function OffsetBooleanEntryModal() {
  const { key, title, open, setOpen } = useOffsetBooleanEntryModalStore(
    useShallow((state) => ({
      key: state.key,
      title: state.title,
      open: state.open,
      setOpen: state.setOpen,
    }))
  );

  const changeData = useOffsetInputStore(useShallow((state) => state.changeData));

  const data = useOffsetInputStore(
    useShallow((state) => {
      if (!key) return false;
      return state.data[key as keyof typeof state.data] as boolean;
    })
  );

  if (!key) return null
  return <BooleanEntryModal<OffsetInputParams>
    id={key as OffsetInputParams}
    dataKey={key as OffsetInputParams}
    title={title}
    open={open}
    data={data}
    setOpen={setOpen}
    changeData={changeData} />;
}
