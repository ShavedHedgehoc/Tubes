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

const BUTTONS = [
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
  { label: "0" },
  { label: "OK", action: "close" },
];

export interface DefectInputModalProps {
  open: boolean;
  data: string | null | undefined;
  setOpen: (val: boolean) => void;
  clearData: () => void;
  changeData: (val: string) => void;
  sliceData: () => void;
  roundData: () => void;
}

export default function DefectInputModal(props: DefectInputModalProps) {
  const handleOpenchange = (e: DialogOpenChangeDetails) => {
    props.setOpen(e.open);
    props.roundData();
  };

  const handleAction = (btn: (typeof BUTTONS)[0]) => {
    if (btn.action === "clear") return props.clearData();
    if (btn.action === "slice") return props.sliceData();
    if (btn.action === "close") {
      props.setOpen(false);
      return props.roundData();
    }
    props.changeData(btn.label);
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
                  <Heading color="fg.muted">Количество брака</Heading>
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
                      {props.data ? props.data : "0"}
                    </Text>
                  </HStack>
                </Stack>
              </Stack>
            </Dialog.Title>
          </Dialog.Header>

          <Dialog.Body backgroundColor="bg.panel" rounded="lg">
            <Grid
              maxH="100%"
              w="100%"
              templateColumns="repeat(12, 1fr)"
              gap={2}
            >
              {BUTTONS.map((btn) => (
                <GridItem key={btn.label} colSpan={btn.col ?? 4}>
                  <Button
                    size="2xl"
                    width="full"
                    variant="outline"
                    onClick={() => handleAction(btn)}
                  >
                    {btn.label}
                  </Button>
                </GridItem>
              ))}
            </Grid>
          </Dialog.Body>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
}
