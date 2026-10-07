"use client";

import { ProductRow, useProductUiParams } from "@/entities/product";
import { useRoles } from "@/entities/user";

import {
  Button,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/ui";
import { CirclePlus, Pencil } from "lucide-react";

export function ChangeWeightButton({ product }: { product: ProductRow }) {
  const { isAllowSummaryEdit } = useRoles();
  const { setParams } = useProductUiParams();
  const weight = product.unit_weight;
  const handleClick = () => {
    setParams({ "change-product-weight": product.id.toString() });
  };

  if (!weight && !isAllowSummaryEdit)
    return <div className="text-center">-</div>;

  return (
    <TooltipProvider>
      <div className="flex justify-center items-center gap-1 ">
        {weight && <span>{weight} кг</span>}

        {isAllowSummaryEdit && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                className="h-8 w-8 p-0"
                onClick={handleClick}
              >
                {weight ? (
                  <Pencil className="h-4 w-4" />
                ) : (
                  <CirclePlus className="h-4 w-4" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{weight ? "Изменить вес" : "Добавить вес"}</p>
            </TooltipContent>
          </Tooltip>
        )}
      </div>
    </TooltipProvider>
  );
}
