import { useConveyorUiParams } from "@/entities/conveyor";
import { X } from "lucide-react";
import { PostCloseModal } from "./post-close-modal";
import { cn } from "@/shared/lib";

type Props = {
  summaryId: number;
  postId: number;
  postTitle: string;
};

export function PostCloseButton({ summaryId, postId, postTitle }: Props) {
  const { setParams } = useConveyorUiParams();
  const handleClick = () => {
    setParams({
      "summary-id": summaryId,
      "post-id": postId,
      "post-title": postTitle,
      "close-post": true,
    });
  };
  return (
    <div className="contents">
      <div className="absolute top-2 right-2 z-10">
        <button
          className={cn(
            "opacity-0 group-hover:opacity-60 hover:opacity-100! transition-all duration-200",
            "p-1 rounded-full hover:bg-black/10 dark:hover:bg-white/10",
          )}
          onClick={handleClick}
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      <PostCloseModal />
    </div>
  );
}
