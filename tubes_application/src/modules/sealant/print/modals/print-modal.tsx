import {
  Dialog,
  Grid,
  GridItem,
  HStack,
  Heading,
  Stack,
  Text,
  Button,
} from "@chakra-ui/react";
import { type DialogOpenChangeDetails } from "@chakra-ui/react";

import { useQuantityIntegerModalStore } from "../../store/use-quantity-integer-modal-store";
import { useBoxQuantityStore } from "../../store/use-box-quantity-store";
import { useShallow } from "zustand/shallow";
import { usePrintZpl } from "../../use-print-zpl";
import type { ISummary } from "@/shared/api/services/summary-service";
import { usePrinter } from "../../use-printer";
import { useSealantEmployeeStore } from "../../store/use-sealant-employee-store";
import { useSealantConveyorStore } from "../../store/use-sealant-conveyor-store";
import { useProductionBoxes } from "../../use-production-boxes";
import { makeBoxReceipt } from "@/shared/helpers/make-zpl-receipt";
import type { PrintReceiptDto } from "@/shared/api/services/zpl-service";
import { TbPrinter } from "react-icons/tb";

const BUTTON_LAYOUT = [
  { label: "C", action: "clear", col: 4 },
  { label: "<<", action: "slice", col: 8 },
  { label: "7" },
  { label: "8" },
  { label: "9" },
  { label: "4" },
  { label: "5" },
  { label: "6" },
  { label: "1" },
  { label: "2" },
  { label: "3" },
  { label: "." },
  { label: "0", col: 8 },
  {
    label: "Печать",
    col: 12,
    action: "close",
    icon: <TbPrinter />,
    canDisable: true,
  },
];

interface AddEntryModalButtonProps {
  value: string;
  disabled: boolean;
  icon?: React.ReactNode;
  onClick: (val: string) => void;
}

function AddEntryModalButton({
  value,
  disabled,
  icon,
  onClick,
}: AddEntryModalButtonProps) {
  return (
    <Button
      size="2xl"
      width="full"
      variant="outline"
      rounded="md"
      color="fg.subtle"
      disabled={disabled}
      onClick={() => onClick(value)}
    >
      {icon}
      {value}
    </Button>
  );
}

export default function PrintModal({
  summaryData,
}: {
  summaryData: ISummary | null;
}) {
  const open = useQuantityIntegerModalStore(useShallow((state) => state.open));
  const setOpen = useQuantityIntegerModalStore(
    useShallow((state) => state.setOpen),
  );
  const data = useBoxQuantityStore(useShallow((state) => state.quantity));
  const clearData = useBoxQuantityStore(useShallow((state) => state.clearData));
  const changeData = useBoxQuantityStore(
    useShallow((state) => state.changeData),
  );
  const sliceData = useBoxQuantityStore(useShallow((state) => state.sliceData));
  const roundData = useBoxQuantityStore(useShallow((state) => state.roundData));
  const employee = useSealantEmployeeStore(
    useShallow((state) => state.sealantEmployee),
  );
  const sealantConveyor = useSealantConveyorStore(
    useShallow((state) => state.sealantConveyor),
  );
  const { data: printerData } = usePrinter(sealantConveyor?.id ?? null);
  const { data: boxData } = useProductionBoxes(summaryData?.data.id ?? null);

  const { printZPL } = usePrintZpl();
  const handleOpenchange = (e: DialogOpenChangeDetails) => {
    setOpen(e.open);
    roundData();
  };

  const handleClose = () => {
    setOpen(false);
    roundData();
    if (printerData) {
      const zplData: {
        name: string;
        code: string;
        batch: string;
        batchId: number | null;
        boxNumber: number;
        quantity: number;
        employee: string;
        summaryId: number | null;
        employeeId: number | null;
      } = {
        name: summaryData?.data.product_name ?? "",
        code: summaryData?.data.product_code ?? "",
        batch: summaryData?.data.batch_name ?? "",
        batchId: summaryData?.data.batch_id ?? null,
        boxNumber: boxData && boxData.length > 0 ? boxData.length + 1 : 1,
        quantity: Number(data),
        employee: employee?.name ?? "",
        employeeId: employee?.id ?? null,
        summaryId: summaryData?.data.id ?? null,
      };
      const zpl = makeBoxReceipt(zplData);
      const dto: PrintReceiptDto = {
        ip: printerData.ip,
        port: printerData.port,
        zpl: zpl,
      };
      printZPL(dto);
    }
  };
  const disabledCondition = !employee || !printerData || data === "0";
  return (
    <Dialog.Root
      open={open}
      onOpenChange={(e) => handleOpenchange(e)}
      placement="center"
      size="sm"
    >
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content rounded="lg">
          <Dialog.Header>
            <Dialog.Title w="full">
              <Stack gap={4}>
                <HStack justify="space-between">
                  <Heading color="fg.muted">
                    Введите количество в коробе
                  </Heading>
                </HStack>

                <Stack gap={5}>
                  <HStack
                    justify="end"
                    px={4}
                    py={2}
                    rounded="md"
                    borderWidth="1px"
                  >
                    <Text textStyle="3xl" color="fg.a">
                      {data ? data : "0"}
                    </Text>
                  </HStack>
                </Stack>
              </Stack>
            </Dialog.Title>
          </Dialog.Header>

          <Dialog.Body backgroundColor="bg.panel" rounded="lg">
            <Grid w="100%" templateColumns="repeat(12, 1fr)" gap={2}>
              {BUTTON_LAYOUT.map((btn) => (
                <GridItem key={btn.label} colSpan={btn.col ?? 4}>
                  <AddEntryModalButton
                    icon={btn.icon ?? null}
                    value={btn.label}
                    disabled={btn.canDisable ? disabledCondition : false}
                    onClick={(val) => {
                      if (btn.action === "clear") return clearData();
                      if (btn.action === "slice") return sliceData();
                      if (btn.action === "close") return handleClose();
                      changeData(val);
                    }}
                  />
                </GridItem>
              ))}
            </Grid>
          </Dialog.Body>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
}
