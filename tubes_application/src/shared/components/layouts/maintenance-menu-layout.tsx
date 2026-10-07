import type { ISummary } from "@/shared/api/services/summary-service";
import type { MenuButtonProps } from "../menu/menu-button";
import { TbSettingsAutomation, TbX } from "react-icons/tb";
import Menu from "../menu/menu";
import MenuButton from "../menu/menu-button";

export interface MaintenanceMenuHookReturn {
  handleSetClick: () => Promise<void> | void;
  handleExitClick: () => void;
  setButtonsVisibleCondition: boolean;
  setIdleButtonDisableCondition: boolean;
}

export type MaintenanceMenuHookFn = (args: {
  summaryData: ISummary | null;
}) => MaintenanceMenuHookReturn;

interface GenericMaintenanceMenuProps {
  summaryData: ISummary | null;
  useMenuHook: MaintenanceMenuHookFn;
}
export default function MaintenancePostMenuLayout({
  summaryData,
  useMenuHook,
}: GenericMaintenanceMenuProps) {
  const {
    handleExitClick,
    setIdleButtonDisableCondition,
    handleSetClick,
    setButtonsVisibleCondition,
  } = useMenuHook({ summaryData });

  const backButtonProps: MenuButtonProps = {
    title: "Закрыть",
    icon: <TbX />,
    disabled: false,
    action: () => handleExitClick(),
  };

  const setIdleButtonProps: MenuButtonProps = {
    title: "Начать",
    icon: <TbSettingsAutomation />,
    disabled: setIdleButtonDisableCondition,
    action: () => handleSetClick(),
  };

  return (
    <Menu>
      {setButtonsVisibleCondition && <MenuButton {...setIdleButtonProps} />}
      {setButtonsVisibleCondition && <MenuButton {...backButtonProps} />}
    </Menu>
  );
}
