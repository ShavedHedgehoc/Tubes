import BooleanEntryModal from "@/shared/components/modals/boolean-entry-modal";
import { useShallow } from "zustand/shallow";
import { useVarnishBooleanEntryModalStore } from "../../store/use-varnish-boolean-entry-modal-store";
import {
  useVarnishInputStore,
  VarnishInputParams,
} from "../../store/use-varnish-input-store";

export default function VarnishBooleanEntryModal() {
  const { key, title, open, setOpen } = useVarnishBooleanEntryModalStore(
    useShallow((state) => ({
      key: state.key,
      title: state.title,
      open: state.open,
      setOpen: state.setOpen,
    })),
  );

  const changeData = useVarnishInputStore(
    useShallow((state) => state.changeData),
  );

  const data = useVarnishInputStore(
    useShallow((state) => {
      if (!key) return false;
      return state.data[key as keyof typeof state.data] as boolean;
    }),
  );

  if (!key) return null;
  return (
    <BooleanEntryModal<VarnishInputParams>
      id={key as VarnishInputParams}
      dataKey={key as VarnishInputParams}
      title={title}
      open={open}
      data={data}
      setOpen={setOpen}
      changeData={changeData}
    />
  );
}
