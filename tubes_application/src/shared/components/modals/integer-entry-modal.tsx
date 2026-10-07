import {
  Dialog,
  Grid,
  GridItem,
  HStack,
  Heading,
  Stack,
  Text,
  Button,
  Status,
} from "@chakra-ui/react";
import { type DialogOpenChangeDetails } from "@chakra-ui/react";
import type { DataFormField } from "../../helpers/data-form-field";

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
  { label: "0", col: 8 },
  { label: "OK", action: "close", col: 4 },
];

export interface IntegerEntryModalProps<T> {
  id: string;
  title: string;
  open: boolean;
  dataKey: T;
  data: string | null | undefined;
  minValue: number | null | undefined;
  maxValue: number | null | undefined;
  unit: string | null | undefined;
  setOpen: (val: boolean) => void;
  clearData: (val: Pick<DataFormField<T>, "key">) => void;
  changeData: (val: DataFormField<T>) => void;
  sliceData: (val: Pick<DataFormField<T>, "key">) => void;
  roundData: (val: Pick<DataFormField<T>, "key">) => void;
}

interface AddEntryModalButtonProps {
  value: string;
  onClick: (val: string) => void;
}

function AddEntryModalButton({ value, onClick }: AddEntryModalButtonProps) {
  return (
    <Button
      size="2xl"
      width="full"
      variant="outline"
      rounded="md"
      color="fg.subtle"
      onClick={() => onClick(value)}
    >
      {value}
    </Button>
  );
}

export default function IntegerEntryModal<T>(props: IntegerEntryModalProps<T>) {
  const handleOpenchange = (e: DialogOpenChangeDetails) => {
    props.setOpen(e.open);
    props.roundData({ key: props.dataKey });
  };

  const handleClose = () => {
    props.setOpen(false);
    props.roundData({ key: props.dataKey });
  };

  return (
    <Dialog.Root
      open={props.open}
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
                  <Heading color="fg.muted">{props.title}</Heading>
                  <Status.Root
                    colorPalette={
                      props.data !== null && props.data !== undefined
                        ? typeof props.maxValue === "number" &&
                          typeof props.minValue === "number"
                          ? Number(props.data) > props.maxValue ||
                            Number(props.data) < props.minValue
                            ? "red"
                            : "green"
                          : "gray"
                        : "yellow"
                    }
                    alignItems="end"
                    size="lg"
                  >
                    <Status.Indicator />
                  </Status.Root>
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
                      {props.data !== null && props.data !== undefined
                        ? props.data
                        : "0"}
                    </Text>
                  </HStack>
                  <Text textStyle="md" color="fg.subtle">
                    {props.minValue !== null && props.maxValue !== null
                      ? `Регламентные значения от ${props.minValue} до ${props.maxValue} ${props.unit ?? ""}`
                      : `Регламентные значения не заданы`}
                  </Text>
                </Stack>
              </Stack>
            </Dialog.Title>
          </Dialog.Header>
          <Dialog.Body backgroundColor="bg.panel" rounded="lg">
            <Grid w="100%" templateColumns="repeat(12, 1fr)" gap={2}>
              {BUTTON_LAYOUT.map((btn) => (
                <GridItem key={btn.label} colSpan={btn.col ?? 4}>
                  <AddEntryModalButton
                    value={btn.label}
                    onClick={(val) => {
                      if (btn.action === "clear")
                        return props.clearData({ key: props.dataKey });
                      if (btn.action === "slice")
                        return props.sliceData({ key: props.dataKey });
                      if (btn.action === "close") return handleClose();
                      props.changeData({ key: props.dataKey, value: val });
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
