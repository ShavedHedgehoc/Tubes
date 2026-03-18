import { fileParamsSchema } from "../model";
import { useQueryStates } from "nuqs";

export function useFilesSearchParams() {
    const [params, setParams] = useQueryStates(fileParamsSchema, {
        shallow: false,
    });
    return { params, setParams };
}
