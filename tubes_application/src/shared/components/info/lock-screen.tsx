import { AbsoluteCenter, VStack, Icon, Text } from "@chakra-ui/react";
import { Ban } from "lucide-react";

export default function LockScreen() {
  return (
    <AbsoluteCenter h="full" w="full">
      <VStack>
        <Icon size="2xl" color="tomato">
          <Ban />
        </Icon>
        <Text color="fg.subtle">Заблокировано лабораторией</Text>
      </VStack>
    </AbsoluteCenter>
  );
}
