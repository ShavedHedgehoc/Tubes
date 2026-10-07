"use client";

import { RankEntity } from "@/entities/rank";
import ResetButton from "./reset-button";
import ValueInput from "./value-input";
import DescriptionInput from "./description-input";
import RankCombobox from "./rank-combobox";
import PostCombobox from "./post-combox";
import { PostEntity } from "@/entities/post";
import ActiveSelector from "./active-selector";

type Props = {
  rankListItems: RankEntity[];
  postListItems: PostEntity[];
  actions?: React.ReactNode;
};

export function OperationsFilter({
  rankListItems,
  postListItems,
  actions,
}: Props) {
  return (
    <div className="flex  mb-4 justify-between">
      <div className="flex justify-start gap-2">
        <div className="flex flex-row">
          <ValueInput />
          <DescriptionInput />
          <PostCombobox items={postListItems} />
          <RankCombobox items={rankListItems} />
          <ActiveSelector />
        </div>
        <ResetButton />
      </div>
      {actions}
    </div>
  );
}
