import { useQueryStates } from 'nuqs';
import { summariesParamsSchema } from '../model/schema';


export function useSummariesSearchParams() {
    const [params, setParams] = useQueryStates(summariesParamsSchema, {
        shallow: false,
        history: 'replace',
        clearOnDefault: true,
    });
    return { params, setParams };
}