"use client";

import NameInput from "./name-input";
import ResetButton from "./reset-button";
import CodeInput from "./code-input";
import MarkingInput from "./marking-input";

type Props = {
  actions?: React.ReactNode;
};

export function ProductFilter({ actions }: Props) {
  return (
    <div className="flex  mb-4 justify-between">
      <div className="flex justify-start gap-2">
        <div className="flex flex-row">
          <CodeInput />
          <MarkingInput />
          <NameInput />
        </div>
        <ResetButton />
      </div>
      {actions}
    </div>
  );
}
