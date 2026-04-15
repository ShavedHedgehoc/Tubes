import type { IEmployee } from "@/shared/api/services/employee-service";
import type {
  IMaintenance,
  IMaintenanceSession,
  ISummary,
} from "@/shared/api/services/summary-service";
import {
  Box,
  Heading,
  ScrollArea,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useShallow } from "zustand/shallow";
import NotFound from "../info/not-found-full-screen";
import Info from "../info/info";
import { AppMessages } from "@/shared/resources/app-messages";
import MaintenanceCard from "../cards/maintenance-card";
import Loader from "../info/loader";
import MaintenanceModal from "../modals/maintenance-modal/maintenance-modal";

export interface MaintenanceHookReturn {
  items: IMaintenance[];
  setSelectedMaintenance: (item: IMaintenance | null) => void;
  employee: IEmployee | null;
  selectedMaintenance: IMaintenance | null;
  handleCloseClick: () => void;
  isPending: boolean;
  isRedirecting: boolean;
  startTask: ({ id, time }: { id: number; time: Date }) => Promise<void> | void;
  endTask: ({ id, time }: { id: number; time: Date }) => Promise<void> | void;
}

export type MaintenanceHookFn = (args: {
  summaryData: ISummary | null;
}) => MaintenanceHookReturn;

export interface MaintenanceStore {
  open: boolean;
  setOpen: (open: boolean) => void;
}

interface GenericMaintenanceProps {
  summaryData: ISummary | null;
  type: "extrusion" | "varnish" | "offset" | "sealant";
  useContentHook: MaintenanceHookFn;
  useModalStore: <T>(selector: (state: MaintenanceStore) => T) => T;
}

export default function MaintenancePostContentLayout({
  summaryData,
  type,
  useContentHook,
  useModalStore,
}: GenericMaintenanceProps) {
  const setOpenModal = useModalStore(useShallow((state) => state.setOpen));
  const openModal = useModalStore(useShallow((state) => state.open));

  const {
    items,
    setSelectedMaintenance,
    employee,
    selectedMaintenance,
    handleCloseClick,
    isPending,
    startTask,
    endTask,
    isRedirecting,
  } = useContentHook({ summaryData });

  const postData = summaryData
    ? {
        status: summaryData[`${type}Status` as keyof ISummary],
        maintenances: summaryData[`${type}Maintenances` as keyof ISummary],
        session: summaryData[`${type}MaintenanceSession` as keyof ISummary],
      }
    : null;

  const currentStatus = postData?.status as
    | { state: string; maintenance_session_id?: number | null }
    | undefined;
  const currentMaintenances = (postData?.maintenances || []) as IMaintenance[];
  const currentSession = (postData?.session || null) as IMaintenanceSession;

  useEffect(() => {
    const isIdleWithSession =
      currentStatus?.state === "idle" &&
      !!currentStatus?.maintenance_session_id;
    setOpenModal(isIdleWithSession);
  }, [
    currentStatus?.state,
    currentStatus?.maintenance_session_id,
    setOpenModal,
  ]);

  if (!employee) return <NotFound message={AppMessages.NOT_AUTHORIZED} />;
  if (!summaryData)
    return <NotFound message={AppMessages.ACTIVE_SUMMARY_NOT_FOUND} />;
  if (!currentMaintenances.length)
    return <Info message={AppMessages.OPERATIONS_LIST_NOT_FOUND} />;

  const content = {
    idle: <></>,
    working: (
      <VStack h="full" gap={12}>
        <Heading fontSize="3xl" color="fg.subtle">
          Статус поста - работает
        </Heading>
        <Text color="fg.subtle" textStyle="xl">
          {selectedMaintenance
            ? `Выбран вид ТО: ${selectedMaintenance.description}`
            : "Выберите вид ТО"}
        </Text>
        <ScrollArea.Root height="full" variant="always">
          <ScrollArea.Viewport>
            <ScrollArea.Content paddingEnd="3">
              <SimpleGrid columns={4} gap={2}>
                {items.map((item: IMaintenance) => (
                  <MaintenanceCard
                    key={item.id}
                    maintenance={item}
                    onClick={() => setSelectedMaintenance(item)}
                    selected={selectedMaintenance?.id === item.id}
                    disabled={
                      !employee?.rank ||
                      employee.rank.val < item.min_rank ||
                      item.task_count === 0
                    }
                  />
                ))}
              </SimpleGrid>
            </ScrollArea.Content>
          </ScrollArea.Viewport>
          <ScrollArea.Scrollbar />
        </ScrollArea.Root>
      </VStack>
    ),
    finished: <></>,
  }[currentStatus?.state || "idle"];

  return (
    <Box h="full" w="full" px={16}>
      {isPending || isRedirecting ? (
        <VStack h="full" justify="center" gap={12}>
          <Heading fontSize="3xl" color="fg.subtle">
            Обновление данных
          </Heading>
          <Loader />
        </VStack>
      ) : (
        content
      )}
      <MaintenanceModal
        open={openModal}
        setOpen={setOpenModal}
        isPending={isPending}
        handleClose={handleCloseClick}
        startTask={startTask}
        endTask={endTask}
        data={currentSession ?? null}
      />
    </Box>
  );
}
