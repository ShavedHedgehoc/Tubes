import type { IMaintenance } from "@/shared/api/services/summary-service";
import { Box, Stack, HStack, Text } from "@chakra-ui/react";

interface MaintenanceCardProps {
  maintenance: IMaintenance;
  disabled: boolean;
  selected: boolean;
  onClick: (maintenance: IMaintenance) => void;
}

export default function MaintenanceCard(props: MaintenanceCardProps) {
  return (
    <Box
      backgroundColor={
        props.disabled
          ? "red.muted"
          : props.selected
            ? "green.muted"
            : "bg.panel"
      }
      w="full"
      minH="120px"
      rounded="lg"
      py={4}
      px={6}
      alignItems="center"
      justifyContent="center"
      onClick={() =>
        props.disabled ? undefined : props.onClick(props.maintenance)
      }
    >
      <Stack h="full" justify="space-between">
        <Text
          textStyle="md"
          color={props.disabled ? "fg.subtle" : "fg.a"}
          w="full"
        >
          {props.maintenance.description}
        </Text>
        <HStack justify="left">
          {props.disabled && (
            <Text textStyle="sm" color="fg.a" alignItems="flex-end">
              {props.disabled
                ? props.maintenance.task_count > 0
                  ? "Вашей квалификации недостаточно!"
                  : "Задачи не определены"
                : " "}
            </Text>
          )}
        </HStack>
        <HStack justify="space-between">
          <Text
            textStyle="lg"
            color={props.disabled ? "fg.subtle" : "fg.muted"}
            alignItems="flex-end"
          >
            {`Разряд: ${props.maintenance.min_rank}`}
          </Text>

          <Text
            textStyle="lg"
            color={props.disabled ? "fg.subtle" : "fg.muted"}
            alignItems="flex-end"
          >
            {`Код: ${props.maintenance.value}`}
          </Text>
        </HStack>
      </Stack>
    </Box>
  );
}
