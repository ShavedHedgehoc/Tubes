import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ChangeProductWeightFormValues,
  changeProductWeightSchema,
  ProductEntity,
  useProductUiParams,
} from "@/entities/product";
import { useChangeProductWeight } from "./use-change-product-weight";

export const useChangeProductWeightForm = ({
  data,
}: {
  data: ProductEntity;
}) => {
  const { params, setParams } = useProductUiParams();

  const form = useForm<ChangeProductWeightFormValues>({
    resolver: zodResolver(changeProductWeightSchema),
    defaultValues: {
      weight: data.unit_weight ?? undefined,
    },
  });
  const { changeProductWeight, updatePending } = useChangeProductWeight();

  const productId = params["change-product-weight"];
  async function onSubmit(data: ChangeProductWeightFormValues) {
    if (productId) {
      changeProductWeight(
        { product_id: productId, ...data },
        {
          onSuccess: () => {
            form.reset();
            setParams({ "change-product-weight": null });
          },
        },
      );
    }
  }

  const handleClose = () => {
    form.reset();
    setParams({ "change-product-weight": null });
  };
  return { form, onSubmit, handleClose, updatePending };
};
