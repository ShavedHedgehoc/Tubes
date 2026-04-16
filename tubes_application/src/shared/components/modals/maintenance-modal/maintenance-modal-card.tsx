import type { IMaintenanceLog } from "@/shared/api/services/summary-service";
import {
  Badge,
  Button,
  Card,
  Circle,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { CheckIcon, PlayIcon, Square } from "lucide-react";

export function MaintenanceModalCard({
  item,
  prevItem,
  startTask,
  endTask,
}: {
  item: IMaintenanceLog;
  prevItem: IMaintenanceLog | null;
  startTask: ({ id, time }: { id: number; time: Date }) => void;
  endTask: ({ id, time }: { id: number; time: Date }) => void;
}) {
  const isStartDisabled = prevItem !== null && !prevItem.end_time;
  const isCompleted = !!item.end_time;
  const isActive = !!item.start_time && !item.end_time;

  const handleStart = () => {
    const now = new Date();
    startTask({ id: item.id, time: now });
  };

  const handleStop = () => {
    const now = new Date();
    endTask({ id: item.id, time: now });
  };

  return (
    <Card.Root
      variant={isActive ? "outline" : "subtle"}
      borderColor={isActive ? "gray.600" : "transparent"}
      bg={isCompleted ? "bg.subtle" : "bg.panel"}
      mb={3}
      transition="all 0.2s"
    >
      <Card.Body padding="4">
        <HStack justify="space-between" align="center" gap={4}>
          <HStack gap={6}>
            <Circle
              size="8"
              bg={
                // isCompleted ? "green.100" : isActive ? "green.100" : "gray.100"
                isCompleted ? "green.100" : "gray.100"
              }
              color={
                // isCompleted ? "green.600" : isActive ? "green.600" : "gray.400"
                isCompleted ? "green.600" : "gray.400"
              }
            >
              {
                isCompleted ? (
                  <CheckIcon size={16} />
                ) : (
                  <Text fontSize="md" fontWeight="bold" color="bg">
                    {item.order ?? "-"}
                  </Text>
                )
                //   isActive ? (
                //     <Box animation="breath 2s ease-in-out infinite">
                //       <PlayIcon size={16} />
                //     </Box>
                //   ) : (
                //     <Text fontSize="md" fontWeight="bold" color="bg">
                //       {item.order ?? "-"}
                //     </Text>
                //   )
              }
            </Circle>
            <VStack align="start" gap={0}>
              <Text
                fontWeight="semibold"
                color={isCompleted ? "fg.subtle" : "fg"}
              >
                {item.title}
              </Text>
              {isStartDisabled && (
                <Text fontSize="xs" color="orange.500">
                  Ожидает завершения предыдущего шага
                </Text>
              )}
              {isActive && (
                <Badge colorPalette="green" variant="solid" size="sm">
                  Выполняется
                </Badge>
              )}
            </VStack>
          </HStack>

          <HStack gap={2}>
            {!isCompleted ? (
              <>
                <Button
                  size="sm"
                  colorPalette="green"
                  variant={isActive ? "ghost" : "solid"}
                  disabled={isStartDisabled || isActive}
                  onClick={handleStart}
                >
                  <PlayIcon />
                  Начать
                </Button>
                <Button
                  size="sm"
                  colorPalette="red"
                  variant={!isActive ? "ghost" : "solid"}
                  disabled={!isActive}
                  onClick={handleStop}
                >
                  <Square />
                  Завершить
                </Button>
              </>
            ) : (
              <Badge colorPalette="green" variant="subtle" size="sm">
                Выполнено
              </Badge>
            )}
          </HStack>
        </HStack>
      </Card.Body>
    </Card.Root>
  );
}
