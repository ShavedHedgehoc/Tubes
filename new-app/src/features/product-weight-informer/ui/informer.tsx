import { useRoles } from "@/entities/user";
import { cn } from "@/shared/lib";
import {
  Button,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/ui";
import { TriangleAlert } from "lucide-react";
import { useRouter } from "next/navigation";

export function Informer({ productCode }: { productCode: string }) {
  const { isAllowSummaryEdit } = useRoles();
  const router = useRouter();
  const handleClick = () =>
    isAllowSummaryEdit
      ? router.push(`products?code=${productCode}`)
      : undefined;
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            className={cn(
              "h-8 w-8 p-0",
              !isAllowSummaryEdit && "cursor-default hover:bg-transparent",
            )}
            onClick={handleClick}
          >
            <TriangleAlert />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Вес продукта не внесен!</p>
          {isAllowSummaryEdit && <p>Нажмите для перехода к продукту</p>}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
