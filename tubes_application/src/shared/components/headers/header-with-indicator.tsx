import { Heading, Grid, Box } from "@chakra-ui/react";

export default function HeaderWithIndicatorComponent({
  conveyorName,
  postName,
  postIndicator,
}: {
  conveyorName: string;
  postName: string;
  postIndicator: React.ReactNode;
}) {
  return (
    <Grid h="full" templateColumns="1fr auto 1fr" alignItems="center" px={4}>
      <Box justifySelf="start">{postIndicator}</Box>
      <Heading size="2xl" color="fg.subtle" textAlign="center">
        {`Конвейер ${conveyorName}. ${postName}`}
      </Heading>
      <Box />
    </Grid>
  );
}
