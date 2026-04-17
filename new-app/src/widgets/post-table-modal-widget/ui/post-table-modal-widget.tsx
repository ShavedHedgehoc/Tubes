import { PostTableModal } from "@/features/post-table";
import { StatusActionButton } from "@/features/status-actions";

export function PostTableModalWidget() {
    return (
        <PostTableModal renderRowAction={(row) => <StatusActionButton row={row} />} />
    )
}