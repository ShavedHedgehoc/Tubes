import { Button } from "@/shared/ui";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export function BackButton() {
  const router = useRouter();
  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => router.back()}
      className="shrink-0"
    >
      <ChevronLeft className="h-4 w-4" />
    </Button>
  );
}
