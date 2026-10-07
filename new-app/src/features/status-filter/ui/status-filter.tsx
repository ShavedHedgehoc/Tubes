import { SummaryReportBase } from "@/entities/status";
import { BackButton } from "./back-button";
import { PostEntity } from "@/entities/post";
import PostCombobox from "./post-combobox";
import { Header } from "./header";

interface Props {
  postListItems: PostEntity[];
  actions?: React.ReactNode;
  summaryData: SummaryReportBase | null;
}

export function StatusFilter({ postListItems, actions, summaryData }: Props) {
  return (
    <div className="flex  justify-between ">
      <div className="flex justify-start grow items-center gap-6">
        <BackButton />
        <div className="flex  items-center grow ">
          <Header data={summaryData} />
        </div>
        <div className="flex mr-16">
          <PostCombobox items={postListItems} />
        </div>
      </div>

      {actions}
    </div>
  );
}
