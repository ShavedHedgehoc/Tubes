import { useActiveSummary } from "@/shared/api/use-active-summary";
import { useConveyor } from "@/shared/api/use-conveyor";
import { useParams } from "react-router-dom";
import { useShallow } from "zustand/shallow";
import Loader from "../info/loader";
import NotFound from "../info/not-found-full-screen";
import { AppMessages } from "@/shared/resources/app-messages";
import type { MaintenancePageLayoutProps } from "./maintenance-page-layout";
import type { Params } from "@/shared/router/params";
import TimeComponent from "../lines/time-component";
import HeaderComponent from "../headers/header-component";
import UserComponent from "../lines/user-component";
import Info from "../info/info";
import { ColorModeProvider } from "@/components/ui/color-mode";
import { Theme } from "@chakra-ui/react";
import MaintenancePageLayout from "./maintenance-page-layout";
import type { ISummary } from "@/shared/api/services/summary-service";
import type { IEmployee } from "@/shared/api/services/employee-service";
import type { IConveyor } from "@/shared/api/services/conveyor-service";

interface PostConfig<T extends string> {
  postName: T;
  postNameTitle: string;
  useEmployeeStore: <U>(selector: (state: EmployeeStore<T>) => U) => U;
  useConveyorStore: <U>(selector: (state: ConveyorStore<T>) => U) => U;
  ContentComponent: React.ComponentType<{ summaryData: ISummary | null }>;
  MenuComponent: React.ComponentType<{ summaryData: ISummary | null }>;
}

export type EmployeeStore<T extends string> = {
  [K in `${Lowercase<T>}Employee`]: IEmployee | null;
} & { setEmployee: (e: IEmployee | null) => void };

export type ConveyorStore<T extends string> = {
  [K in `${Lowercase<T>}Conveyor`]: IConveyor | null;
} & { setConveyor: (c: IConveyor | null) => void };

export default function GenericMaintenancePageLayout<T extends string>({
  config,
}: {
  config: PostConfig<T>;
}) {
  const params = useParams<Params.CONVEYOR_NAME>();
  const { isPending } = useConveyor(params.conveyor_name ?? null);
  const postPrefix = config.postName.toLowerCase() as Lowercase<T>;
  // Динамические сторы
  const conveyor = config.useConveyorStore(
    useShallow(
      (state) =>
        state[
          `${postPrefix}Conveyor` as keyof ConveyorStore<T>
        ] as IConveyor | null,
    ),
  );
  const employee = config.useEmployeeStore(
    useShallow(
      (state) =>
        state[
          `${postPrefix}Employee` as keyof EmployeeStore<T>
        ] as IEmployee | null,
    ),
  );

  const {
    data: summaryData,
    isPending: isPendingSummary,
    isError,
  } = useActiveSummary(conveyor?.id ?? null);

  if (isPending) return <Loader />;
  if (!conveyor) return <NotFound message={AppMessages.CONVEYOR_NOT_EXISTS} />;

  const { ContentComponent, MenuComponent } = config;

  const pageLayoutProps: MaintenancePageLayoutProps = {
    timeComponent: <TimeComponent />,
    headerComponent: (
      <HeaderComponent
        conveyorName={conveyor.name}
        postName={config.postNameTitle}
      />
    ),
    maintenanceComponent: (
      <ContentComponent summaryData={summaryData ?? null} />
    ),
    menuComponent: <MenuComponent summaryData={summaryData ?? null} />,
    userComponent: <UserComponent employee={employee} />,
    loaderComponent: <Loader />,
    notFoundComponent: <Info message={AppMessages.ACTIVE_SUMMARY_NOT_FOUND} />,
    isLoading: isPendingSummary,
    isNotFound: isError,
  };

  return (
    <ColorModeProvider forcedTheme="dark">
      <Theme appearance="dark" colorPalette="gray">
        <MaintenancePageLayout {...pageLayoutProps} />
      </Theme>
    </ColorModeProvider>
  );
}
