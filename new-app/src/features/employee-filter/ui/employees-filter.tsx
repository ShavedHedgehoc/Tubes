"use client";

import { RankEntity } from "@/entities/rank";
import BannedSelector from "./banned-selector";
import NameInput from "./name-input";
import RankCombobox from "./rank-combobox";
import ResetButton from "./reset-button";
import PostCombobox from "./post-combobox";
import { PostEntity } from "@/entities/post";

type Props = {
  rankListItems: RankEntity[];
  postListItems: PostEntity[];
  actions?: React.ReactNode;
};

export function EmployeesFilter({
  rankListItems,
  postListItems,
  actions,
}: Props) {
  return (
    <div className="flex  mb-4 justify-between">
      <div className="flex justify-start gap-2">
        <div className="flex flex-row">
          <NameInput />
          <BannedSelector rankListItems={rankListItems} />
          <PostCombobox items={postListItems} />
          <RankCombobox items={rankListItems} />
        </div>
        <ResetButton />
      </div>
      {actions}
    </div>
  );
}
