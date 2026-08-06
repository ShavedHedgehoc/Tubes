import type { PostStatus } from "@/entities/summary";
import { Button } from "@/shared/ui";

interface PostButtonProps {
    status: PostStatus
}

export function PostButton({ status }: PostButtonProps) {
    return <Button>{status.postName}</Button>
}