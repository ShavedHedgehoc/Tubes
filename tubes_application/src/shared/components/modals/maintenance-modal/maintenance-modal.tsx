import type { IMaintenanceSession } from "@/shared/api/services/summary-service";
import {
  Box,
  Button,
  Dialog,
  HStack,
  ScrollArea,
  Text,
  VStack,
} from "@chakra-ui/react";
import { MaintenanceModalCard } from "./maintenance-modal-card";
import { CheckIcon } from "lucide-react";
import { TbInfoTriangle } from "react-icons/tb";

export interface MaintenenceModalProps {
  data: IMaintenanceSession | null;
  open: boolean;
  setOpen: (val: boolean) => void;
  handleClose: () => void;
  startTask: ({ id, time }: { id: number; time: Date }) => void;
  endTask: ({ id, time }: { id: number; time: Date }) => void;
  isPending: boolean;
}

export default function MaintenanceModal({
  data,
  open,
  setOpen,
  handleClose,
  startTask,
  endTask,
}: MaintenenceModalProps) {
  const allDone = data?.maintenance_logs.every((log) => !!log.end_time);
  return (
    <Dialog.Root
      closeOnInteractOutside={false}
      size="lg"
      placement="center"
      open={open}
      onOpenChange={(e) => setOpen(e.open)}
    >
      <Dialog.Positioner>
        <Dialog.Content borderRadius="xl" bg="gray.900">
          <Dialog.Header pb={2}>
            <VStack align="left">
              <Dialog.Title fontSize="xl">
                {data?.maintenance_description}
              </Dialog.Title>
              <Text color="fg.subtle">
                Окончание ТО возможно только после выполниния всех операций
              </Text>
            </VStack>
          </Dialog.Header>
          <Dialog.Body>
            <ScrollArea.Root height="400px" variant="hover">
              <ScrollArea.Viewport>
                <Box pr={4}>
                  {data?.maintenance_logs.map((item, index) => (
                    <MaintenanceModalCard
                      key={item.id || index}
                      item={item}
                      prevItem={
                        index > 0 ? data.maintenance_logs[index - 1] : null
                      }
                      startTask={startTask}
                      endTask={endTask}
                    />
                  ))}
                </Box>
              </ScrollArea.Viewport>
              <ScrollArea.Scrollbar>
                <ScrollArea.Thumb />
              </ScrollArea.Scrollbar>
            </ScrollArea.Root>
          </Dialog.Body>
          <Dialog.Footer borderBottomRadius="xl">
            <HStack width="full" justify="space-between">
              <Text fontSize="sm" fontWeight="bold" color="fg.subtle">
                {data?.maintenance_logs.filter((l) => l.end_time).length} из{" "}
                {data?.maintenance_logs.length} выполнено
              </Text>
              <HStack gap={1} justify={"flex-end"}>
                <Button
                  variant={!allDone ? "ghost" : "outline"}
                  size="md"
                  onClick={undefined}
                  disabled={true}
                >
                  <TbInfoTriangle />
                  Инфо
                </Button>
                <Button
                  variant={!allDone ? "ghost" : "outline"}
                  size="md"
                  disabled={!allDone}
                  onClick={handleClose}
                >
                  <CheckIcon size={16} />
                  Завершить ТО
                </Button>
              </HStack>
            </HStack>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
}
