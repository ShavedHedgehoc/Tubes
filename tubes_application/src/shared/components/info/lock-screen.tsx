import {
  formatDateToString,
  formatTimeToString,
} from "@/shared/helpers/date-time-formatters";
import { AbsoluteCenter, VStack, Icon, Text } from "@chakra-ui/react";
import { Ban } from "lucide-react";

interface LockScreenProps {
  lockReason: string | null;
  labAssistant: string | null;
  lockDate: Date | null;
}

export default function LockScreen({
  lockReason,
  labAssistant,
  lockDate,
}: LockScreenProps) {
  const assistantText = labAssistant ? `${labAssistant}: ` : "";
  const dateText = lockDate
    ? ` (${formatDateToString(lockDate)} ${formatTimeToString(lockDate)})`
    : "";
  const fullLockMessage =
    `${assistantText}${lockReason ?? ""}${dateText}`.trim();
  return (
    <AbsoluteCenter h="full" w="full">
      <VStack gap={4}>
        <Icon size="2xl" color="tomato">
          <Ban />
        </Icon>
        <Text color="fg.subtle" fontSize="2xl" fontWeight="medium">
          Заблокировано лабораторией
        </Text>
        {fullLockMessage && <Text color="fg.muted">{fullLockMessage}</Text>}
      </VStack>
    </AbsoluteCenter>
  );
}
