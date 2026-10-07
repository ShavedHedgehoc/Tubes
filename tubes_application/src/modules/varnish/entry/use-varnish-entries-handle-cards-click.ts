import { useShallow } from "zustand/shallow";
import { useVarnishNumericEntryModalStore } from "../store/use-varnish-numeric-entry-modal-store";
import { useVarnishBooleanEntryModalStore } from "../store/use-varnish-boolean-entry-modal-store";
import { useVarnishIntegerEntryModalStore } from "../store/use-varnish-integer-entry-modal-store";

export default function useVarnishEntriesHandleCardsClick() {
  const { setKey, setTitle, setMinValue, setMaxValue, setUnit, setOpen } =
    useVarnishNumericEntryModalStore(
      useShallow((state) => ({
        setKey: state.setKey,
        setTitle: state.setTitle,
        setMinValue: state.setMinValue,
        setMaxValue: state.setMaxValue,
        setUnit: state.setUnit,
        setOpen: state.setOpen,
      })),
    );

  const {
    setKey: setKeyInteger,
    setTitle: setTitleInteger,
    setMinValue: setMinValueInteger,
    setMaxValue: setMaxValueInteger,
    setUnit: setUnitInteger,
    setOpen: setOpenInteger,
  } = useVarnishIntegerEntryModalStore(
    useShallow((state) => ({
      setKey: state.setKey,
      setTitle: state.setTitle,
      setMinValue: state.setMinValue,
      setMaxValue: state.setMaxValue,
      setUnit: state.setUnit,
      setOpen: state.setOpen,
    })),
  );

  const {
    setKey: setBooleanKey,
    setTitle: setBooleanTitle,
    setOpen: setBooleanOpen,
  } = useVarnishBooleanEntryModalStore(
    useShallow((state) => ({
      setKey: state.setKey,
      setTitle: state.setTitle,
      setOpen: state.setOpen,
    })),
  );

  const handleCardClick = ({
    id,
    title,
    minValue,
    maxValue,
    unit,
  }: {
    id: string;
    title: string;
    minValue: number | null | undefined;
    maxValue: number | null | undefined;
    unit: string | null | undefined;
  }) => {
    setMinValue(minValue);
    setMaxValue(maxValue);
    setUnit(unit);
    setKey(id);
    setTitle(title);
    setOpen(true);
  };

  const handleIntegerCardClick = ({
    id,
    title,
    minValue,
    maxValue,
    unit,
  }: {
    id: string;
    title: string;
    minValue: number | null | undefined;
    maxValue: number | null | undefined;
    unit: string | null | undefined;
  }) => {
    setMinValueInteger(minValue);
    setMaxValueInteger(maxValue);
    setUnitInteger(unit);
    setKeyInteger(id);
    setTitleInteger(title);
    setOpenInteger(true);
  };

  const handleBooleanCardClick = ({
    id,
    title,
  }: {
    id: string;
    title: string;
  }) => {
    setBooleanKey(id);
    setBooleanTitle(title);
    setBooleanOpen(true);
  };

  return { handleCardClick, handleIntegerCardClick, handleBooleanCardClick };
}
