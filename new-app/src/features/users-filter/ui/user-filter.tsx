"use client";

import { RoleEntity } from "@/entities/roles";
import NameInput from "./name-input";
import ResetButton from "./reset-button";
import EmailInput from "./email-input";
import BannedSelector from "./banned-selector";
import RoleCombobox from "./role-combobox";

type Props = {
  roleListItems: RoleEntity[];
  actions?: React.ReactNode;
};

export function UsersFilter({ roleListItems, actions }: Props) {
  return (
    <div className="flex  mb-4 justify-between">
      <div className="flex justify-start gap-2">
        <div className="flex flex-row">
          <NameInput />
          <EmailInput />
          <BannedSelector roleListItems={roleListItems} />
          <RoleCombobox items={roleListItems} />
        </div>
        <ResetButton />
      </div>
      {actions}
    </div>
  );
}
