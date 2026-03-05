import { useShallow } from "zustand/shallow";
import { useExtrusionBooleanEntryModalStore } from "../store/use-extrusion-boolean-entry-modal-store";
import { useExtrusionNumericEntryModalStore } from "../store/use-extrusion-numeric-entry-modal-store";
// import { useExtrusionRadioEntryModalStore } from "../store/use-extrusion-radio-entry-modal-store";
import { useExtrusionIntegerEntryModalStore } from "../store/use-extrusion-integer-entry-modal-store";
import type { ExtrusionInputParams } from "../store/use-extrusion-input-store";

export default function useExtrusionEntriesHandleCardsClick() {
  const setKey = useExtrusionNumericEntryModalStore(useShallow((state) => state.setKey));
  const setTitle = useExtrusionNumericEntryModalStore(useShallow((state) => state.setTitle));
  const setMinValue = useExtrusionNumericEntryModalStore(useShallow((state) => state.setMinValue));
  const setMaxValue = useExtrusionNumericEntryModalStore(useShallow((state) => state.setMaxValue));
  const setUnit = useExtrusionNumericEntryModalStore(useShallow((state) => state.setUnit));
  const setOpen = useExtrusionNumericEntryModalStore(useShallow((state) => state.setOpen));

  const setKeyInteger = useExtrusionIntegerEntryModalStore(useShallow((state) => state.setKey));
  const setTitleInteger = useExtrusionIntegerEntryModalStore(useShallow((state) => state.setTitle));
  const setMinValueInteger = useExtrusionIntegerEntryModalStore(useShallow((state) => state.setMinValue));
  const setMaxValueInteger = useExtrusionIntegerEntryModalStore(useShallow((state) => state.setMaxValue));
  const setUnitInteger = useExtrusionIntegerEntryModalStore(useShallow((state) => state.setUnit));
  const setOpenInteger = useExtrusionIntegerEntryModalStore(useShallow((state) => state.setOpen));

  const setBooleanKey = useExtrusionBooleanEntryModalStore(useShallow((state) => state.setKey));
  const setBooleanTitle = useExtrusionBooleanEntryModalStore(useShallow((state) => state.setTitle));
  const setBooleanOpen = useExtrusionBooleanEntryModalStore(useShallow((state) => state.setOpen));


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
    setKey(id as ExtrusionInputParams);
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

  const handleBooleanCardClick = ({ id, title }: { id: string; title: string }) => {
    setBooleanKey(id as ExtrusionInputParams);
    setBooleanTitle(title);
    setBooleanOpen(true);
  };


  return { handleCardClick, handleBooleanCardClick, handleIntegerCardClick };
}
