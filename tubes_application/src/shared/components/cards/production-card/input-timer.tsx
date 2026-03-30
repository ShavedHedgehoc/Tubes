import { formatTimeToString } from "@/shared/helpers/date-time-formatters";
import { useDate } from "@/shared/helpers/use-date";
import { VStack, Heading } from "@chakra-ui/react";
import { useMemo } from "react";

export default function InputTimer({
  date,
  idleTime,
  checkInterval,
}: {
  date: Date | undefined; // время псоледнего внесения параметров
  idleTime: number; // продолжительность последнего простоя
  checkInterval: number; // частота проверки в минутах
}) {
  const { today } = useDate();
  const notFoundString = "Данных о внесении параметров не найдено";
  const firstString = "Время внесения параметров: ";
  const secondString = "Следующее внесение через: ";
  const thirdString = "ВНЕСИТЕ ПАРАМЕТРЫ!";
  const fourthString = "Время простоя с последнего внесения: ";

  const { isOverdue, formattedTimeLeft, formattedIdle } = useMemo(() => {
    if (!date) return {};

    const now = today.getTime();
    const last = new Date(date).getTime();
    const deadline = last + checkInterval * 60 * 1000 + idleTime;

    const formatDuration = (ms: number) => {
      const seconds = Math.max(0, Math.floor((ms / 1000) % 60));
      const minutes = Math.max(0, Math.floor((ms / (1000 * 60)) % 60));
      const hours = Math.max(0, Math.floor(ms / (1000 * 60 * 60)));
      return [hours, minutes, seconds]
        .map((v) => v.toString().padStart(2, "0"))
        .join(":");
    };

    return {
      isOverdue: now > deadline,
      formattedTimeLeft: formatDuration(deadline - now),
      formattedIdle: formatDuration(idleTime),
    };
  }, [date, today, idleTime, checkInterval]);

  if (!date)
    return (
      <VStack>
        <Heading size="md" color="fg.subtle">
          {notFoundString}
        </Heading>
      </VStack>
    );
  return (
    <VStack justify="space-between">
      <Heading size="sm">{`${firstString} ${formatTimeToString(date)}`}</Heading>
      <Heading size="sm">{`${fourthString} ${formattedIdle}`}</Heading>
      <Heading
        size="sm"
        animation={isOverdue ? "colorCycle 2s infinite" : "none"}
        color={isOverdue ? "red.500" : "inherit"}
      >
        {isOverdue ? thirdString : `${secondString} ${formattedTimeLeft}`}
      </Heading>
    </VStack>
  );
}
