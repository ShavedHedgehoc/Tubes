import type { SummariesParams } from "./schema";

export interface PostStatus {
    postId: number;
    postName: string;
    postValue: number;
    isLocked: boolean;
}

export interface SummaryRow {
    id: number;
    conveyorName: string;
    productCode: string;
    productName: string;
    batchName: string;
    plan: number;
    isActive: boolean;
    isFinished: boolean;
    date: Date;
    shift: number;
    postStatuses: PostStatus[]
}

export interface SummaryResponseDto {
    summaries: SummaryRow[]
}
export type SummaryRequestParams = SummariesParams;
// export interface SummaryRequestParams {
//     startDate: string;
//     endDate: string;
//     productCode?: string;
//     batchName?: string;
//     conveyors?: string[];
// }