import type { SummaryRow } from "@/entities/summary";
import { PostButton } from "./post-button";

interface PostColumnProps {
    row: SummaryRow
}

export function PostColumn({ row }: PostColumnProps) {
    return (
        <div
            className="flex flex-row"
        >
            {row.postStatuses.map((ps) =>
                <PostButton key={ps.postId} status={ps} />
            )}
        </div>
    )
}