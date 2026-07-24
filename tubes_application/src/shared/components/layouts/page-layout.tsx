// import { Grid, GridItem, Theme } from "@chakra-ui/react";

// export interface PageLayoutProps {
//   timeComponent: React.ReactNode;
//   headerComponent: React.ReactNode;
//   parameterComponent: React.ReactNode;
//   materialPieChartComponent: React.ReactNode;
//   productionLineChartComponent: React.ReactNode;
//   productionCardComponent: React.ReactNode;
//   menuComponent: React.ReactNode;
//   userComponent: React.ReactNode;
//   loaderComponent: React.ReactNode;
//   notFoundComponent: React.ReactNode;
//   lockComponent: React.ReactNode;
//   isLoading: boolean;
//   isNotFound: boolean;
//   isLocked: boolean;
// }

// export default function PageLayout(props: PageLayoutProps) {

//   return (
//     <Theme appearance="dark" colorPalette="teal">
//       <Grid
//         h="100vh"
//         w="100vw"
//         templateRows="repeat(28, 1fr)"
//         templateColumns="repeat(24, 1fr)"
//         gap={2}
//       >
//         <GridItem rowSpan={1} colSpan={24}>
//           {props.timeComponent}
//         </GridItem>
//         <GridItem rowSpan={2} colSpan={24}>
//           {props.headerComponent}
//         </GridItem>
//         {!props.isLoading && !props.isNotFound && !props.isLocked && (
//           <>
//             <GridItem rowSpan={1} colSpan={24}></GridItem>
//             <GridItem rowSpan={12} colSpan={24}>
//               {props.parameterComponent}
//             </GridItem>
//             <GridItem rowSpan={8} colSpan={8}>
//               {props.materialPieChartComponent}
//             </GridItem>
//             <GridItem rowSpan={8} colSpan={8}>
//               {props.productionLineChartComponent}
//             </GridItem>
//             <GridItem rowSpan={8} colSpan={8}>
//               {props.productionCardComponent}
//             </GridItem>
//             <GridItem rowSpan={1} colSpan={24}></GridItem>
//             <GridItem rowSpan={2} colSpan={24}>
//               {props.menuComponent}
//             </GridItem>
//             <GridItem rowSpan={1} colSpan={24}>
//               {props.userComponent}
//             </GridItem>
//           </>
//         )}
//         {!props.isLoading && !props.isNotFound && props.isLocked && (

//           <GridItem rowSpan={25} colSpan={24}>
//             {props.lockComponent}
//           </GridItem>

//         )}
//         {props.isLoading && (
//           <GridItem rowSpan={25} colSpan={24}>
//             {props.loaderComponent}
//           </GridItem>
//         )}
//         {props.isNotFound && (
//           <GridItem rowSpan={25} colSpan={24}>
//             {props.notFoundComponent}
//           </GridItem>
//         )}
//       </Grid>
//     </Theme>
//   );
// }
import { Grid, GridItem, Theme, Box } from "@chakra-ui/react";

export interface PageLayoutProps {
  timeComponent: React.ReactNode;
  headerComponent: React.ReactNode;
  parameterComponent: React.ReactNode;
  materialPieChartComponent: React.ReactNode;
  productionLineChartComponent: React.ReactNode;
  productionCardComponent: React.ReactNode;
  menuComponent: React.ReactNode;
  userComponent: React.ReactNode;
  loaderComponent: React.ReactNode;
  notFoundComponent: React.ReactNode;
  lockComponent: React.ReactNode;
  isLoading: boolean;
  isNotFound: boolean;
  isLocked: boolean;
}

export default function PageLayout(props: PageLayoutProps) {
  return (
    <Theme appearance="dark" colorPalette="teal">
      {/* Контейнер position="relative" нужен для абсолютного позиционирования модалки */}
      <Box position="relative" w="100vw" h="100vh">
        <Grid
          h="100%"
          w="100%"
          templateRows="repeat(28, 1fr)"
          templateColumns="repeat(24, 1fr)"
          gap={2}
        >
          {/* Шапка рендерится всегда */}
          <GridItem rowSpan={1} colSpan={24}>
            {props.timeComponent}
          </GridItem>
          <GridItem rowSpan={2} colSpan={24}>
            {props.headerComponent}
          </GridItem>

          {/* ЛОУДЕР */}
          {props.isLoading && (
            <GridItem rowStart={4} rowSpan={25} colSpan={24}>
              {props.loaderComponent}
            </GridItem>
          )}

          {/* 404 NOT FOUND */}
          {!props.isLoading && props.isNotFound && (
            <GridItem rowStart={4} rowSpan={25} colSpan={24}>
              {props.notFoundComponent}
            </GridItem>
          )}

          {/* ОСНОВНОЙ КОНТЕНТ (Рендерится и в случае блокировки!) */}
          {!props.isLoading && !props.isNotFound && (
            <>
              <GridItem rowStart={4} rowSpan={1} colSpan={24}></GridItem>
              <GridItem rowStart={5} rowSpan={12} colSpan={24}>
                {props.parameterComponent}
              </GridItem>
              <GridItem rowStart={17} rowSpan={8} colSpan={8}>
                {props.materialPieChartComponent}
              </GridItem>
              <GridItem rowStart={17} rowSpan={8} colSpan={8}>
                {props.productionLineChartComponent}
              </GridItem>
              <GridItem rowStart={17} rowSpan={8} colSpan={8}>
                {props.productionCardComponent}
              </GridItem>
              <GridItem rowStart={25} rowSpan={1} colSpan={24}></GridItem>
              <GridItem rowStart={26} rowSpan={2} colSpan={24}>
                {props.menuComponent}
              </GridItem>
              <GridItem rowStart={28} rowSpan={1} colSpan={24}>
                {props.userComponent}
              </GridItem>
            </>
          )}
        </Grid>

        {/* МОДАЛЬНОЕ ОКНО БЛОКИРОВКИ ПОВЕРХ ВСЕГО */}
        {!props.isLoading && !props.isNotFound && props.isLocked && (
          <Box
            position="absolute"
            top={0}
            left={0}
            w="100vw"
            h="100vh"
            bg="blackAlpha.700" /* Полупрозрачный темный фон для эффекта модалки */
            backdropFilter="blur(4px)" /* Размытие заднего плана (опционально) */
            zIndex={10} /* Подымаем над Grid */
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            {props.lockComponent}
          </Box>
        )}
      </Box>
    </Theme>
  );
}
