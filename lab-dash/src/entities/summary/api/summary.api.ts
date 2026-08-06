import axios from 'axios';
import type { SummaryRequestParams, SummaryResponseDto } from '../model/types';

export const getSummaries = async (params: SummaryRequestParams): Promise<SummaryResponseDto> => {
    const cleanParams = Object.fromEntries(
        Object.entries(params).filter(([_, value]) => {
            if (Array.isArray(value)) return value.length > 0;
            return value !== undefined && value !== '';
        })
    );
    const { data } = await axios.get<SummaryResponseDto>('/public_api/summaries', {
        params: cleanParams,
        paramsSerializer: {
            indexes: null,
        },
    });
    return data;
};