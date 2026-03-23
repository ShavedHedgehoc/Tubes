import { galleryUiSchema } from "@/shared/lib";
import { useQueryStates } from "nuqs";

export function useGalleryUiParams() {
  const [params, setParams] = useQueryStates(galleryUiSchema, {
    shallow: false,
  });
  return { params, setParams };
}
