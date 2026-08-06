import { useQuery } from '@tanstack/react-query';
import { getSummaries } from './summary.api';
import type { SummaryRequestParams } from '../model/types';


export const summaryKeys = {
    all: ['summaries'] as const,
    list: (filters: SummaryRequestParams) => [...summaryKeys.all, 'list', filters] as const,
};

export const useSummariesQuery = (filters: SummaryRequestParams) => {
    return useQuery({
        queryKey: summaryKeys.list(filters),
        queryFn: () => getSummaries(filters),
        placeholderData: (previousData) => previousData,
    });
};
