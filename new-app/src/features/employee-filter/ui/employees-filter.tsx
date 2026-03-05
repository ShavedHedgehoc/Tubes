"use client";

import { RankEntity } from "@/entities/rank";
import BannedSelector from "./banned-selector";
import NameInput from "./name-input";
import RankCombobox from "./rank-combobox";
import ResetButton from "./reset-button";

type Props = {
  rankListItems: RankEntity[];
  actions?: React.ReactNode;
};

export function EmployeesFilter({ rankListItems, actions }: Props) {
  return (
    <div className="flex  mb-4 justify-between">
      <div className="flex justify-start gap-2">
        <div className="flex flex-row">
          <NameInput />
          <BannedSelector rankListItems={rankListItems} />
          <RankCombobox items={rankListItems} />
        </div>
        <ResetButton />
      </div>
      {actions}
    </div>
  );
}
