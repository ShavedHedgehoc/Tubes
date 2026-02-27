import { Box } from "@chakra-ui/react";
import Sidebar from "@/components/sidebar";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Box minH="100dvh" display={"flex"} flexDirection={"row"}>
      <Sidebar />
      <Box
        className="mainContent"
        px={10}
        py={10}
        flex={1}
        display={"flex"}
        flexDirection={"column"}
        minWidth={0}
        height={"100dvh"}
        gap={1}
        backgroundColor={"gray"}
      >
        {children}
      </Box>
    </Box>
  );
}
