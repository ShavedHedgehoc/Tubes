import BooleanEntryModal from "@/shared/components/modals/boolean-entry-modal";
import { useShallow } from "zustand/shallow";
import { useExtrusionInputStore, ExtrusionInputParams } from "../../store/use-extrusion-input-store";
import { useExtrusionBooleanEntryModalStore } from "../../store/use-extrusion-boolean-entry-modal-store";

export default function ExtrusionBooleanEntryModal() {

  const { key, title, open, setOpen } = useExtrusionBooleanEntryModalStore(
    useShallow((state) => ({
      key: state.key,
      title: state.title,
      open: state.open,
      setOpen: state.setOpen,
    }))
  );

  const changeData = useExtrusionInputStore(useShallow((state) => state.changeData));

  const data = useExtrusionInputStore(
    useShallow((state) => {
      if (!key) return false;
      return state.data[key as keyof typeof state.data] as boolean;
    })
  );

  if (!key) return null
  return <BooleanEntryModal<ExtrusionInputParams>
    id={key as ExtrusionInputParams}
    dataKey={key as ExtrusionInputParams}
    title={title}
    open={open}
    data={data}
    setOpen={setOpen}
    changeData={changeData} />;
}
