

import { useSummariesSearchParams, type SummaryRequestParams } from '@/entities/summary';
import { cn, getMonthBounds } from '@/shared/lib';
import {
    FilterDatePicker
} from '@/shared/ui';

import { throttle } from 'nuqs';
import React from 'react';


export function SummaryFilter() {

    const { params, setParams } = useSummariesSearchParams();
    const [open, setOpen] = React.useState(false);

    const isMounted = React.useSyncExternalStore(
        () => () => { },
        () => true,
        () => false,
    );

    if (!isMounted) return <div className="h-10" />;

    // const isDirty =
    //     params.startDate !== getMonthBounds().start ||
    //     params.endDate !== getMonthBounds().end

    const formatDate = (date: Date): string => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const handleDateChange = (type: 'start' | 'end', val: Date | undefined) => {
        if (!val) {
            setParams(
                { [type === 'start' ? 'startDate' : 'endDate']: null },
                { shallow: false },
            );
            return;
        }

        const stringToDate = formatDate(val)
        const updates: Partial<SummaryRequestParams> = {};

        if (type === 'start') {
            updates.startDate = stringToDate;
            if (params.endDate && val > parseStringToDate(params.endDate)) {
                updates.endDate = formatDate(val);
            }
        } else {
            updates.endDate = stringToDate;
            if (params.startDate && val < parseStringToDate(params.startDate)) {
                updates.startDate = formatDate(val);
            }

        }
        setParams(updates, { shallow: false });
    };

    const parseStringToDate = (dateString: string): Date => {
        // if (!dateString) return undefined;

        const [year, month, day] = dateString.split('-').map(Number);
        // Месяцы в JS начинаются с 0 (январь = 0), поэтому вычитаем 1
        return new Date(year, month - 1, day);
    };

    return (
        <div className="flex gap-2">
            <div className="grid grid-cols-2 gap-2">
                <FilterDatePicker

                    value={parseStringToDate(params.startDate)}
                    onChange={(val) => handleDateChange('start', val)}
                />
                <FilterDatePicker

                    value={parseStringToDate(params.endDate)}
                    onChange={(val) => handleDateChange('end', val)}
                />
            </div>
        </div>
    );
}