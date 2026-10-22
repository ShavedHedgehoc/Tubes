import { Heading, Grid, Box } from '@chakra-ui/react';

export default function HeaderWithIndicatorComponent({
  conveyorName,
  postName,
  postIndicator,
  isSetup,
}: {
  conveyorName: string;
  postName: string;
  postIndicator: React.ReactNode;
  isSetup: boolean;
}) {
  return (
    <Grid h="full" templateColumns="1fr auto 1fr" alignItems="center" px={4}>
      <Box justifySelf="start">{postIndicator}</Box>
      <Heading size="2xl" color="fg.subtle" textAlign="center">
        {`Конвейер ${conveyorName}. ${postName} ${isSetup ? ' (ПЕРЕХОД)' : ''}`}
      </Heading>
      <Box />
    </Grid>
  );
}
