import { ProductEntity } from "@/entities/product";

export function FormHeader({ product }: { product: ProductEntity }) {
  return (
    <div className="flex flex-col text-xs text-muted-foreground">
      <div className="text-foreground font-semibold tracking-tight pb-0.5">
        {product.code} {product.marking}
      </div>
      <div>{product.name}</div>
    </div>
  );
}
