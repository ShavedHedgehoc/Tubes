// import { authConfig } from "@/configs/auth";
// import { getServerSession } from "next-auth/next";
import { Box, Text, VStack } from "@chakra-ui/react";

import Link from "next/link";
import UserPane from "./user-pane";

function SidebarContent() {
  return (
    <VStack align="stretch" p="4" gap="2">
      <Text fontSize="xl" fontWeight="bold" mb="6">
        Тубное производство
      </Text>
      <Link href="\">Home</Link>
      <Link href="\summary">Сводки</Link>
    </VStack>
  );
}
export default async function Sidebar() {
  // const session = await getServerSession(authConfig);
  return (
    <Box display={{ base: "none", md: "block" }} w="64" h="full" borderRightWidth="1px">
      <SidebarContent />
      <UserPane />
    </Box>
  );
}
