import type { ISummary } from "@/shared/api/services/summary-service";
import { Box, HStack, Text, VStack } from "@chakra-ui/react";

interface Props {
  postId: number;
  data: ISummary | null;
}

export default function PostIndicator({ postId, data }: Props) {
  const indicators = [
    { label: "Пост 1", state: data?.extrusionStatus.state ?? null },
    { label: "Пост 2", state: data?.varnishStatus.state ?? null },
    { label: "Пост 3", state: data?.offsetStatus.state ?? null },
    { label: "Пост 4", state: data?.sealantStatus.state ?? null },
  ];

  const stateColors: Record<string, string> = {
    working: "green.500",
    idle: "yellow.500",
    finished: "purple.500",
    error: "red.500",
  };
  return (
    <HStack gap={4} align={"flex-end"}>
      {indicators.map((item, index) => {
        const isActive = index === postId - 1;
        return (
          <VStack key={index} gap={1} align="center">
            <Box
              w={isActive ? "16px" : "12px"}
              h={isActive ? "16px" : "12px"}
              borderRadius="full"
              boxShadow={"0 0 8px var(--chakra-colors-blue-400)"}
              bg={item.state ? stateColors[item.state] : "gray.300"}
            />
            <Text
              fontSize="xs"
              fontWeight={isActive ? "bold" : "medium"}
              color={isActive ? "fg.default" : "fg.muted"}
            >
              {item.label}
            </Text>
          </VStack>
        );
      })}
    </HStack>
  );
}
